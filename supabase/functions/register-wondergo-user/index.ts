import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function response(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), { status, headers: corsHeaders });
}

function accountHash(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function accountEmail(account: string) {
  const normalizedAccount = account.trim().toLowerCase();
  const isSimpleAccount =
    /^[a-z0-9._-]+$/.test(normalizedAccount) && /[a-z0-9]/.test(normalizedAccount);
  const safeAccount = isSimpleAccount
    ? normalizedAccount
    : `user-${accountHash(normalizedAccount)}`;
  return `${safeAccount}@ugnqqrhzixrjpyqgpckz.supabase.co`;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return response(405, { message: "僅支援註冊請求。" });
  }

  try {
    const body = await request.json();
    const account = String(body.account ?? "").trim();
    const password = String(body.password ?? "");
    const role = body.role === "teacher" ? "teacher" : "player";
    const school = String(body.school ?? "").trim();
    const className = String(body.className ?? "").trim();
    const seat = String(body.seat ?? "").trim();
    const realName = String(body.realName ?? "").trim();

    if (account.length < 2 || account.length > 30) {
      return response(400, { message: "玩家帳號請輸入 2 至 30 個字元。" });
    }
    if (password.length < 8) {
      return response(400, { message: "密碼至少需要 8 個字元。" });
    }
    if (!school || !className || !realName) {
      return response(400, { message: "請完整填寫學校、班級與真實姓名。" });
    }
    if (role === "player" && !seat) {
      return response(400, { message: "請填寫座號。" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return response(500, { message: "雲端註冊服務尚未完成設定。" });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await admin.auth.admin.createUser({
      email: accountEmail(account),
      password,
      email_confirm: true,
      user_metadata: {
        account: account.toLowerCase(),
        role,
        school,
        class_name: className,
        seat,
        real_name: realName,
        display_name: role === "player" ? account : "",
      },
    });

    if (error) {
      const isDuplicate =
        error.message.toLowerCase().includes("already") ||
        error.message.toLowerCase().includes("registered") ||
        error.message.toLowerCase().includes("duplicate");
      return response(400, {
        message: isDuplicate ? "這個帳號已有人使用，請更換帳號。" : `註冊失敗：${error.message}`,
      });
    }

    return response(201, { userId: data.user.id });
  } catch (error) {
    console.error("Registration failed", error);
    return response(500, { message: "註冊服務暫時發生錯誤，請稍後再試。" });
  }
});
