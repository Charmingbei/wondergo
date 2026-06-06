const Cloud = (() => {
  const SESSION_KEY = "wondergo-cloud-session";

  function config() {
    const value = window.WONDERGO_CLOUD;
    if (!value?.supabaseUrl || !value?.supabaseAnonKey) return null;
    if (value.supabaseUrl.includes("YOUR_PROJECT_ID")) return null;
    return {
      url: value.supabaseUrl.replace(/\/$/, ""),
      key: value.supabaseAnonKey,
    };
  }

  function isConfigured() {
    return Boolean(config());
  }

  function getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function setSession(session) {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  }

  async function request(path, options = {}) {
    const currentConfig = config();
    if (!currentConfig) throw new Error("尚未設定 Supabase 連線");
    const session = getSession();
    const response = await fetch(`${currentConfig.url}${path}`, {
      ...options,
      headers: {
        apikey: currentConfig.key,
        Authorization: `Bearer ${options.accessToken || session?.access_token || currentConfig.key}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    const body = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      throw new Error(body?.msg || body?.message || body?.error_description || "雲端服務發生錯誤");
    }
    return body;
  }

  function accountEmail(account) {
    const safeAccount = account.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    return `${safeAccount}@ugnqqrhzixrjpyqgpckz.supabase.co`;
  }

  async function register(values, role) {
    await request("/functions/v1/register-wondergo-user", {
      method: "POST",
      body: JSON.stringify({
        account: values.account,
        password: values.password,
        role,
        school: values.school,
        className: values.className,
        seat: values.seat || "",
        realName: values.realName,
        displayName: role === "player" ? values.account : "",
      }),
    });
    return login(values.account, values.password);
  }

  async function login(account, password) {
    const result = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify({ email: accountEmail(account), password }),
    });
    setSession(result);
    return loadCurrentProfile(result.access_token);
  }

  async function loadCurrentProfile(accessToken) {
    const session = getSession();
    const userId = session?.user?.id;
    if (!userId) return null;
    const rows = await request(`/rest/v1/profiles?id=eq.${userId}&select=*`, { accessToken });
    if (!rows[0]) return null;
    return mapProfile(rows[0]);
  }

  async function restoreSession() {
    const session = getSession();
    if (!session?.access_token) return null;
    try {
      return await loadCurrentProfile(session.access_token);
    } catch {
      setSession(null);
      return null;
    }
  }

  async function loadClassStudents(school, className) {
    const monday = new Date();
    const day = monday.getDay();
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);
    const profileQuery =
      `/rest/v1/profiles?role=eq.player` +
      `&school=eq.${encodeURIComponent(school)}` +
      `&class_name=eq.${encodeURIComponent(className)}` +
      "&select=id,account,real_name,display_name,seat,cefr_level,xp";
    const [profiles, progress, events] = await Promise.all([
      request(profileQuery),
      request("/rest/v1/ability_progress?select=*"),
      request(
        `/rest/v1/learning_events?created_at=gte.${encodeURIComponent(monday.toISOString())}` +
          "&select=user_id,ability,score,xp_earned,duration_seconds,created_at&order=created_at.desc",
      ),
    ]);
    const progressByUser = new Map(progress.map((item) => [item.user_id, item]));

    return profiles.map((profile) => {
      const studentEvents = events.filter((event) => event.user_id === profile.id);
      const studyDays = new Set(
        studentEvents.map((event) => new Date(event.created_at).toISOString().slice(0, 10)),
      ).size;
      const totalSeconds = studentEvents.reduce(
        (total, event) => total + (event.duration_seconds || 0),
        0,
      );
      const ability = progressByUser.get(profile.id) || {};
      const abilityValues = [
        ability.word_power || 0,
        ability.echo_sense || 0,
        ability.story_vision || 0,
        ability.spell_craft || 0,
        ability.voice_power || 0,
      ];
      const weakestIndex = abilityValues.indexOf(Math.min(...abilityValues));

      return {
        id: profile.id,
        account: profile.account,
        name: profile.real_name,
        player: profile.account,
        seat: profile.seat,
        level: profile.cefr_level,
        xp: profile.xp,
        days: studyDays,
        time: `${Math.floor(totalSeconds / 3600)}h ${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")}m`,
        completion: Math.min(100, studentEvents.length * 10),
        focus: ["語彙能量", "聲音雷達", "解碼視野", "拼字工藝", "語音引擎"][weakestIndex],
        status: studyDays >= 3 ? "穩定進步" : "需要關注",
        abilities: abilityValues,
      };
    });
  }

  async function recordLearning(ability, xpEarned, score = 100) {
    const rows = await request("/rest/v1/rpc/record_learning_event", {
      method: "POST",
      body: JSON.stringify({
        p_ability: ability,
        p_event_type: "practice_answer",
        p_score: score,
        p_xp_earned: xpEarned,
        p_duration_seconds: 0,
      }),
    });
    return Array.isArray(rows) ? rows[0] : rows;
  }

  async function logout() {
    const session = getSession();
    if (session?.access_token) {
      try {
        await request("/auth/v1/logout", { method: "POST" });
      } catch {
        // Clear the local session even if the network is unavailable.
      }
    }
    setSession(null);
  }

  function mapProfile(profile) {
    return {
      id: profile.id,
      role: profile.role,
      account: profile.account,
      school: profile.school,
      className: profile.class_name,
      seat: profile.seat,
      realName: profile.real_name,
      displayName: profile.role === "player" ? profile.account : profile.display_name,
      xp: profile.xp,
      level: profile.adventure_level,
      cefrLevel: profile.cefr_level,
      approved: profile.is_approved,
      cloud: true,
    };
  }

  return {
    isConfigured,
    register,
    login,
    restoreSession,
    loadClassStudents,
    recordLearning,
    logout,
  };
})();
