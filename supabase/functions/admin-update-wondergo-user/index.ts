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

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response(405, { message: "僅支援更新請求。" });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const authorization = request.headers.get("Authorization");
    if (!supabaseUrl || !anonKey || !serviceRoleKey || !authorization) {
      return response(401, { message: "管理員驗證失敗。" });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: authData, error: authError } = await userClient.auth.getUser();
    if (authError || !authData.user) return response(401, { message: "登入已失效，請重新登入。" });

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: caller } = await admin
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();
    if (caller?.role !== "admin") return response(403, { message: "僅管理員可修改使用者資料。" });

    const body = await request.json();
    const userId = String(body.userId ?? "");
    const realName = String(body.realName ?? "").trim();
    const school = String(body.school ?? "").trim();
    const className = String(body.className ?? "").trim();
    const seat = String(body.seat ?? "").trim();
    const cefrLevel = String(body.cefrLevel ?? "Pre-A1");
    const email = String(body.email ?? "").trim().toLowerCase();
    const approved = Boolean(body.approved);

    const { data: target } = await admin
      .from("profiles")
      .select("id,role,account,contact_email")
      .eq("id", userId)
      .single();
    if (!target) return response(404, { message: "找不到此使用者。" });
    if (!realName || !school || !className) {
      return response(400, { message: "姓名、學校與班級不可空白。" });
    }
    if (target.role === "player" && !seat) {
      return response(400, { message: "學生座號不可空白。" });
    }
    if (target.role !== "player" && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response(400, { message: "請輸入有效的教師信箱。" });
    }

    if (target.role !== "player" && email && email !== target.contact_email) {
      const { error: emailError } = await admin.auth.admin.updateUserById(userId, {
        email,
        email_confirm: true,
        user_metadata: { contact_email: email },
      });
      if (emailError) {
        const duplicate = emailError.message.toLowerCase().includes("already");
        return response(400, {
          message: duplicate ? "此信箱已被其他帳號使用。" : `信箱更新失敗：${emailError.message}`,
        });
      }
    }

    const updates: Record<string, unknown> = {
      real_name: realName,
      school,
      class_name: className,
      updated_at: new Date().toISOString(),
    };
    if (target.role === "player") {
      updates.seat = seat;
      updates.cefr_level = cefrLevel;
    } else {
      updates.contact_email = email || null;
      if (target.role === "teacher") updates.is_approved = approved;
    }

    const { data: profile, error: updateError } = await admin
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();
    if (updateError) return response(400, { message: `資料更新失敗：${updateError.message}` });
    return response(200, { profile });
  } catch (error) {
    console.error("Admin user update failed", error);
    return response(500, { message: "更新服務暫時發生錯誤，請稍後再試。" });
  }
});
