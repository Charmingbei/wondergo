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
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`${currentConfig.url}${path}`, {
        ...options,
        signal: controller.signal,
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
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("雲端連線逾時，請確認網路後重新註冊。");
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function accountEmail(account) {
    const normalizedAccount = account.trim().toLowerCase();
    const isSimpleAccount =
      /^[a-z0-9._-]+$/.test(normalizedAccount) && /[a-z0-9]/.test(normalizedAccount);
    const safeAccount = isSimpleAccount
      ? normalizedAccount
      : `user-${accountHash(normalizedAccount)}`;
    return `${safeAccount}@ugnqqrhzixrjpyqgpckz.supabase.co`;
  }

  function accountHash(value) {
    let hash = 2166136261;
    for (const character of value) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
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
    const [rows, learning] = await Promise.all([
      request(`/rest/v1/profiles?id=eq.${userId}&select=*`, { accessToken }),
      loadPlayerLearningData(accessToken),
    ]);
    if (!rows[0]) return null;
    return { ...mapProfile(rows[0]), ...learning };
  }

  async function loadPlayerLearningData(accessToken) {
    const session = getSession();
    const userId = session?.user?.id;
    if (!userId) return emptyPlayerLearningData();

    const monday = new Date();
    const day = monday.getDay();
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);
    const [progressRows, events] = await Promise.all([
      request(`/rest/v1/ability_progress?user_id=eq.${userId}&select=*`, { accessToken }),
      request(
        `/rest/v1/learning_events?user_id=eq.${userId}` +
          `&created_at=gte.${encodeURIComponent(monday.toISOString())}` +
          "&select=ability,score,xp_earned,duration_seconds,created_at&order=created_at.desc",
        { accessToken },
      ),
    ]);
    const progress = progressRows[0] || {};
    const abilityValues = {
      word: progress.word_power || 0,
      echo: progress.echo_sense || 0,
      story: progress.story_vision || 0,
      spell: progress.spell_craft || 0,
      voice: progress.voice_power || 0,
    };
    const abilityTrends = { word: 0, echo: 0, story: 0, spell: 0, voice: 0 };
    events.forEach((event) => {
      if (event.ability in abilityTrends) abilityTrends[event.ability] += 1;
    });
    const studyDays = new Set(
      events.map((event) => new Date(event.created_at).toISOString().slice(0, 10)),
    ).size;

    return {
      abilityValues,
      abilityTrends,
      weeklySummary: {
        studyDays,
        completedTasks: events.length,
        xpEarned: events.reduce((total, event) => total + (event.xp_earned || 0), 0),
      },
    };
  }

  function emptyPlayerLearningData() {
    return {
      abilityValues: { word: 0, echo: 0, story: 0, spell: 0, voice: 0 },
      abilityTrends: { word: 0, echo: 0, story: 0, spell: 0, voice: 0 },
      weeklySummary: { studyDays: 0, completedTasks: 0, xpEarned: 0 },
    };
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

  async function loadStaffDashboard() {
    const monday = new Date();
    const day = monday.getDay();
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);
    const since = encodeURIComponent(monday.toISOString());
    const [profiles, progress, events, attempts] = await Promise.all([
      request("/rest/v1/profiles?select=id,role,account,school,class_name,seat,real_name,display_name,xp,adventure_level,cefr_level,is_approved,created_at&order=created_at.desc"),
      request("/rest/v1/ability_progress?select=*"),
      request(`/rest/v1/learning_events?created_at=gte.${since}&select=user_id,ability,score,xp_earned,duration_seconds,created_at&order=created_at.desc`),
      request(`/rest/v1/question_attempts?created_at=gte.${since}&select=user_id,ability,question_type,vocabulary,prompt,is_correct,created_at&order=created_at.desc`),
    ]);
    const progressByUser = new Map(progress.map((item) => [item.user_id, item]));
    const eventsByUser = groupBy(events, "user_id");
    const attemptsByUser = groupBy(attempts, "user_id");
    const users = profiles.map((profile) => {
      const userEvents = eventsByUser.get(profile.id) || [];
      const userAttempts = attemptsByUser.get(profile.id) || [];
      const ability = progressByUser.get(profile.id) || {};
      const abilityValues = [
        ability.word_power || 0,
        ability.echo_sense || 0,
        ability.story_vision || 0,
        ability.spell_craft || 0,
        ability.voice_power || 0,
      ];
      const studyDays = new Set(
        userEvents.map((event) => new Date(event.created_at).toISOString().slice(0, 10)),
      ).size;
      const averageScore = userEvents.length
        ? Math.round(userEvents.reduce((sum, event) => sum + Number(event.score || 0), 0) / userEvents.length)
        : 0;
      const weakestIndex = abilityValues.indexOf(Math.min(...abilityValues));
      return {
        id: profile.id,
        role: profile.role,
        account: profile.account,
        name: profile.real_name,
        player: profile.account,
        school: profile.school,
        className: profile.class_name,
        seat: profile.seat || "",
        level: profile.cefr_level,
        xp: profile.xp,
        approved: profile.is_approved,
        createdAt: profile.created_at,
        days: studyDays,
        taskCount: userEvents.length,
        completion: Math.min(100, userEvents.length * 10),
        averageScore,
        focus: ["語彙能量", "聲音雷達", "解碼視野", "拼字工藝", "語音引擎"][weakestIndex],
        status: profile.role === "player" && (studyDays < 2 || (userEvents.length && averageScore < 60))
          ? "需要關注"
          : "穩定進步",
        abilities: abilityValues,
        attempts: userAttempts,
      };
    });
    const students = users.filter((user) => user.role === "player");
    const teachers = users.filter((user) => user.role === "teacher");
    const classes = buildClassSummaries(students, teachers);
    return {
      users,
      students,
      teachers,
      pendingTeachers: teachers.filter((teacher) => !teacher.approved),
      classes,
      errorAnalysis: summarizeErrors(students.flatMap((student) => student.attempts)),
    };
  }

  function groupBy(items, key) {
    const groups = new Map();
    items.forEach((item) => {
      const value = item[key];
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(item);
    });
    return groups;
  }

  function buildClassSummaries(students, teachers) {
    const classMap = new Map();
    [...students, ...teachers].forEach((user) => {
      const key = `${user.school}::${user.className}`;
      if (!classMap.has(key)) {
        classMap.set(key, {
          key,
          school: user.school,
          className: user.className,
          students: [],
          teachers: [],
        });
      }
      classMap.get(key)[user.role === "player" ? "students" : "teachers"].push(user);
    });
    return [...classMap.values()].map((classroom) => {
      const count = classroom.students.length || 1;
      return {
        ...classroom,
        abilities: [0, 1, 2, 3, 4].map((index) =>
          Math.round(classroom.students.reduce((sum, student) => sum + student.abilities[index], 0) / count),
        ),
        attentionCount: classroom.students.filter((student) => student.status === "需要關注").length,
        errorAnalysis: summarizeErrors(classroom.students.flatMap((student) => student.attempts)),
      };
    });
  }

  function summarizeErrors(attempts) {
    const wrong = attempts.filter((attempt) => !attempt.is_correct);
    const countValues = (field) => {
      const counts = new Map();
      wrong.forEach((attempt) => {
        const value = attempt[field];
        if (value) counts.set(value, (counts.get(value) || 0) + 1);
      });
      return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, count]) => ({ label, count }));
    };
    return {
      totalAttempts: attempts.length,
      wrongCount: wrong.length,
      types: countValues("question_type"),
      vocabulary: countValues("vocabulary"),
    };
  }

  async function setTeacherApproval(teacherId, approved) {
    const rows = await request("/rest/v1/rpc/set_teacher_approval", {
      method: "POST",
      body: JSON.stringify({ p_teacher_id: teacherId, p_approved: approved }),
    });
    return Array.isArray(rows) ? rows[0] : rows;
  }

  async function recordLearning(ability, xpEarned, score = 100, attempts = []) {
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
    const profile = Array.isArray(rows) ? rows[0] : rows;
    if (attempts.length) {
      try {
        await request("/rest/v1/rpc/record_question_attempts", {
          method: "POST",
          body: JSON.stringify({ p_attempts: attempts }),
        });
      } catch (error) {
        console.warn("Question analytics sync failed", error);
      }
    }
    return { ...profile, ...(await loadPlayerLearningData()) };
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
    loadStaffDashboard,
    loadPlayerLearningData,
    setTeacherApproval,
    recordLearning,
    logout,
  };
})();
