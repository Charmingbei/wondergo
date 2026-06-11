const Cloud = (() => {
  const SESSION_KEY = "wondergo-cloud-session";
  let sessionRefreshPromise = null;

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

  async function refreshSession() {
    const currentConfig = config();
    const session = getSession();
    if (!currentConfig || !session?.refresh_token) {
      setSession(null);
      throw new Error("登入已逾時，請重新登入。");
    }
    if (!sessionRefreshPromise) {
      sessionRefreshPromise = fetch(
        `${currentConfig.url}/auth/v1/token?grant_type=refresh_token`,
        {
          method: "POST",
          headers: {
            apikey: currentConfig.key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: session.refresh_token }),
        },
      )
        .then(async (response) => {
          const body = await response.json();
          if (!response.ok) {
            setSession(null);
            throw new Error("登入已逾時，請重新登入。");
          }
          setSession(body);
          return body;
        })
        .finally(() => {
          sessionRefreshPromise = null;
        });
    }
    return sessionRefreshPromise;
  }

  async function request(path, options = {}) {
    const currentConfig = config();
    if (!currentConfig) throw new Error("尚未設定 Supabase 連線");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const send = async (accessToken) => {
        const response = await fetch(`${currentConfig.url}${path}`, {
          ...options,
          signal: controller.signal,
          headers: {
            apikey: currentConfig.key,
            Authorization: `Bearer ${accessToken || currentConfig.key}`,
            "Content-Type": "application/json",
            ...options.headers,
          },
        });
        const responseText = response.status === 204 ? "" : await response.text();
        const body = responseText.trim() ? JSON.parse(responseText) : null;
        return { response, body };
      };
      const session = getSession();
      let result = await send(options.accessToken || session?.access_token);
      if (
        result.response.status === 401 &&
        !options.accessToken &&
        session?.refresh_token &&
        !path.startsWith("/auth/v1/token")
      ) {
        const refreshed = await refreshSession();
        result = await send(refreshed.access_token);
      }
      const { response, body } = result;
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
        email: values.email || "",
        displayName: role === "player" ? values.account : "",
      }),
    });
    return login(role === "teacher" ? values.email : values.account, values.password);
  }

  async function login(identifier, password) {
    const email = identifier.includes("@")
      ? identifier.trim().toLowerCase()
      : accountEmail(identifier);
    const result = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setSession(result);
    return loadCurrentProfile(result.access_token);
  }

  async function requestPasswordReset(email) {
    await request("/auth/v1/recover", {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        redirect_to: "https://charmingbei.github.io/wondergo/",
      }),
    });
  }

  async function updateRecoveredPassword(accessToken, password) {
    const currentConfig = config();
    if (!currentConfig) throw new Error("尚未設定 Supabase 連線");
    const response = await fetch(`${currentConfig.url}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: currentConfig.key,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body?.message || body?.error_description || "密碼更新失敗");
    }
    setSession({ access_token: accessToken, user: body });
    await request("/rest/v1/rpc/mark_password_changed", {
      method: "POST",
      accessToken,
      body: "{}",
    });
    setSession(null);
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
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const [progressRows, allEvents, wrongAttempts, reviews] = await Promise.all([
      request(`/rest/v1/ability_progress?user_id=eq.${userId}&select=*`, { accessToken }),
      request(
        `/rest/v1/learning_events?user_id=eq.${userId}` +
          "&select=ability,event_type,score,xp_earned,duration_seconds,created_at&order=created_at.desc&limit=500",
        { accessToken },
      ),
      request(
        `/rest/v1/question_attempts?user_id=eq.${userId}&is_correct=eq.false` +
          "&select=question_key,ability,prompt,question_type,vocabulary,selected_answer,correct_answer,created_at&order=created_at.desc&limit=100",
        { accessToken },
      ),
      request(
        `/rest/v1/wrong_question_reviews?user_id=eq.${userId}&review_date=eq.${today}` +
          "&select=question_key,review_date,reviewed_at",
        { accessToken },
      ),
    ]);
    const events = allEvents.filter((event) => new Date(event.created_at) >= monday);
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
      if (
        event.event_type !== "review:wrongbook" &&
        event.ability in abilityTrends
      ) abilityTrends[event.ability] += 1;
    });
    const studyDays = new Set(
      events.map((event) => new Date(event.created_at).toISOString().slice(0, 10)),
    ).size;
    const eventDates = new Set(allEvents.map((event) =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(event.created_at))));
    let streakDays = 0;
    const cursor = new Date();
    while (eventDates.has(new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(cursor))) {
      streakDays += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    const themeStages = new Map();
    allEvents.forEach((event) => {
      const match = event.event_type?.match(
        /^task:ability:([a-z]+?)(listen|speak|read|write)$/,
      );
      if (!match) return;
      if (!themeStages.has(match[1])) themeStages.set(match[1], new Set());
      themeStages.get(match[1]).add(match[2]);
    });
    const completedThemeIds = [...themeStages.entries()]
      .filter(([, stages]) => stages.size === 4)
      .map(([themeId]) => themeId);
    const uniqueWrongAttempts = [...new Map(
      wrongAttempts.map((attempt) => [
        `${attempt.prompt}::${attempt.correct_answer}`,
        attempt,
      ]),
    ).values()];

    return {
      abilityValues,
      abilityTrends,
      weeklySummary: {
        studyDays,
        completedTasks: events.length,
        xpEarned: events.reduce((total, event) => total + (event.xp_earned || 0), 0),
      },
      streakDays,
      completedThemeIds,
      wrongBook: uniqueWrongAttempts,
      reviewedQuestionKeys: reviews.map((review) => review.question_key),
    };
  }

  function emptyPlayerLearningData() {
    return {
      abilityValues: { word: 0, echo: 0, story: 0, spell: 0, voice: 0 },
      abilityTrends: { word: 0, echo: 0, story: 0, spell: 0, voice: 0 },
      weeklySummary: { studyDays: 0, completedTasks: 0, xpEarned: 0 },
      streakDays: 0,
      completedThemeIds: [],
      wrongBook: [],
      reviewedQuestionKeys: [],
    };
  }

  async function setWrongQuestionReviewed(questionKey, reviewed) {
    const session = getSession();
    const userId = session?.user?.id;
    if (!userId) throw new Error("請先登入。");
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    if (!reviewed) {
      await request(
        `/rest/v1/wrong_question_reviews?user_id=eq.${userId}` +
          `&question_key=eq.${encodeURIComponent(questionKey)}&review_date=eq.${today}`,
        { method: "DELETE", headers: { Prefer: "return=minimal" } },
      );
      return;
    }
    await request("/rest/v1/wrong_question_reviews", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ user_id: userId, question_key: questionKey, review_date: today }),
    });
  }

  async function completeWrongBookReview() {
    const result = await request("/rest/v1/rpc/complete_wrongbook_review", {
      method: "POST",
      body: "{}",
    });
    return {
      ...result.profile,
      awardedXp: result.awarded_xp,
      ...(await loadPlayerLearningData()),
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
      request("/rest/v1/profiles?select=id,role,account,school,class_name,seat,real_name,display_name,contact_email,password_changed_at,xp,adventure_level,cefr_level,is_approved,created_at&order=created_at.desc"),
      request("/rest/v1/ability_progress?select=*"),
      request(`/rest/v1/learning_events?created_at=gte.${since}&select=user_id,ability,score,xp_earned,duration_seconds,created_at&order=created_at.desc`),
      request(`/rest/v1/question_attempts?created_at=gte.${since}&select=user_id,ability,question_type,vocabulary,prompt,selected_answer,correct_answer,is_correct,created_at&order=created_at.desc`),
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
      const eventDates = new Set(userEvents.map((event) =>
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Taipei",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(event.created_at))));
      let streakDays = 0;
      const streakCursor = new Date();
      while (eventDates.has(new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(streakCursor))) {
        streakDays += 1;
        streakCursor.setDate(streakCursor.getDate() - 1);
      }
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
        email: profile.contact_email || "",
        passwordChangedAt: profile.password_changed_at,
        createdAt: profile.created_at,
        days: studyDays,
        streakDays,
        weeklyXp: userEvents.reduce((sum, event) => sum + Number(event.xp_earned || 0), 0),
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
      concepts: countValues("prompt"),
    };
  }

  async function setTeacherApproval(teacherId, approved) {
    const rows = await request("/rest/v1/rpc/set_teacher_approval", {
      method: "POST",
      body: JSON.stringify({ p_teacher_id: teacherId, p_approved: approved }),
    });
    return Array.isArray(rows) ? rows[0] : rows;
  }

  async function updateUserAsAdmin(values) {
    return request("/functions/v1/admin-update-wondergo-user", {
      method: "POST",
      body: JSON.stringify(values),
    });
  }

  async function loadTeacherContent() {
    const [materials, assignments, completions] = await Promise.all([
      request("/rest/v1/learning_materials?select=*&order=updated_at.desc"),
      request("/rest/v1/learning_assignments?select=*&order=created_at.desc"),
      request("/rest/v1/assignment_completions?select=*&order=completed_at.desc"),
    ]);
    return {
      materials: materials.map(mapMaterial),
      assignments: assignments.map((assignment) => ({
        ...mapAssignment(assignment),
        completions: completions
          .filter((item) => item.assignment_id === assignment.id)
          .map(mapCompletion),
      })),
    };
  }

  async function saveMaterial(values) {
    const session = getSession();
    const payload = {
      teacher_id: session.user.id,
      title: values.title,
      description: values.description || "",
      ability: values.ability,
      cefr_level: values.cefrLevel,
      questions: values.questions,
      status: values.status,
      updated_at: new Date().toISOString(),
    };
    const path = values.id
      ? `/rest/v1/learning_materials?id=eq.${values.id}`
      : "/rest/v1/learning_materials";
    const rows = await request(path, {
      method: values.id ? "PATCH" : "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    return mapMaterial(rows[0]);
  }

  async function archiveMaterial(materialId) {
    const rows = await request(`/rest/v1/learning_materials?id=eq.${materialId}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        status: "archived",
        updated_at: new Date().toISOString(),
      }),
    });
    return mapMaterial(rows[0]);
  }

  async function publishMaterial(materialId) {
    const rows = await request(`/rest/v1/learning_materials?id=eq.${materialId}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        status: "published",
        updated_at: new Date().toISOString(),
      }),
    });
    return mapMaterial(rows[0]);
  }

  async function createAssignments(values) {
    const session = getSession();
    const studentIds = values.studentIds?.length ? values.studentIds : [null];
    const payload = studentIds.map((studentId) => ({
      teacher_id: session.user.id,
      material_id: values.materialId,
      student_id: studentId,
      school: values.school,
      class_name: values.className,
      title: values.title,
      instructions: values.instructions || "",
      due_at: values.dueAt || null,
      xp_reward: Number(values.xpReward),
    }));
    const rows = await request("/rest/v1/learning_assignments", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    return rows.map(mapAssignment);
  }

  async function deleteAssignment(assignmentId) {
    await request(`/rest/v1/learning_assignments?id=eq.${assignmentId}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
  }

  async function loadPlayerAssignments() {
    const session = getSession();
    if (!session?.user?.id) return [];
    const [assignments, materials, completions] = await Promise.all([
      request("/rest/v1/learning_assignments?select=*&order=created_at.desc"),
      request("/rest/v1/learning_materials?status=eq.published&select=*"),
      request(`/rest/v1/assignment_completions?student_id=eq.${session.user.id}&select=*`),
    ]);
    const materialsById = new Map(materials.map((item) => [item.id, mapMaterial(item)]));
    const completionByAssignment = new Map(
      completions.map((item) => [item.assignment_id, mapCompletion(item)]),
    );
    return assignments
      .map((assignment) => ({
        ...mapAssignment(assignment),
        material: materialsById.get(assignment.material_id),
        completion: completionByAssignment.get(assignment.id) || null,
      }))
      .filter((assignment) => assignment.material);
  }

  async function completeAssignment(assignmentId, score, attempts = []) {
    const result = await request("/rest/v1/rpc/complete_learning_assignment", {
      method: "POST",
      body: JSON.stringify({
        p_assignment_id: assignmentId,
        p_score: score,
      }),
    });
    if (attempts.length) {
      try {
        await request("/rest/v1/rpc/record_question_attempts", {
          method: "POST",
          body: JSON.stringify({ p_attempts: attempts }),
        });
      } catch (error) {
        console.warn("Assignment analytics sync failed", error);
      }
    }
    return {
      ...result.profile,
      awardedXp: result.awarded_xp,
      abilityGain: result.ability_gain,
      ...(await loadPlayerLearningData()),
    };
  }

  async function recordLearning(taskKey, ability, baseXp, score = 100, attempts = []) {
    const result = await request("/rest/v1/rpc/record_task_completion", {
      method: "POST",
      body: JSON.stringify({
        p_task_key: taskKey,
        p_ability: ability,
        p_score: score,
        p_base_xp: baseXp,
        p_duration_seconds: 0,
      }),
    });
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
    return {
      ...result.profile,
      awardedXp: result.awarded_xp,
      abilityGain: result.ability_gain,
      baseXp: result.base_xp,
      repeatCount: result.repeat_count,
      isRepeat: result.is_repeat,
      ...(await loadPlayerLearningData()),
    };
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
      email: profile.contact_email || "",
      displayName: profile.role === "player" ? profile.account : profile.display_name,
      xp: profile.xp,
      level: profile.adventure_level,
      cefrLevel: profile.cefr_level,
      approved: profile.is_approved,
      passwordChangedAt: profile.password_changed_at,
      cloud: true,
    };
  }

  function mapMaterial(material) {
    return {
      id: material.id,
      teacherId: material.teacher_id,
      title: material.title,
      description: material.description,
      ability: material.ability,
      cefrLevel: material.cefr_level,
      questions: material.questions || [],
      status: material.status,
      createdAt: material.created_at,
      updatedAt: material.updated_at,
    };
  }

  function mapAssignment(assignment) {
    return {
      id: assignment.id,
      teacherId: assignment.teacher_id,
      materialId: assignment.material_id,
      studentId: assignment.student_id,
      school: assignment.school,
      className: assignment.class_name,
      title: assignment.title,
      instructions: assignment.instructions,
      dueAt: assignment.due_at,
      xpReward: assignment.xp_reward,
      createdAt: assignment.created_at,
    };
  }

  function mapCompletion(completion) {
    return {
      assignmentId: completion.assignment_id,
      studentId: completion.student_id,
      score: Number(completion.score),
      xpEarned: completion.xp_earned,
      completedAt: completion.completed_at,
    };
  }

  return {
    isConfigured,
    register,
    login,
    requestPasswordReset,
    updateRecoveredPassword,
    restoreSession,
    loadClassStudents,
    loadStaffDashboard,
    loadPlayerLearningData,
    setTeacherApproval,
    updateUserAsAdmin,
    loadTeacherContent,
    saveMaterial,
    publishMaterial,
    archiveMaterial,
    createAssignments,
    deleteAssignment,
    loadPlayerAssignments,
    completeAssignment,
    recordLearning,
    completeWrongBookReview,
    setWrongQuestionReviewed,
    logout,
  };
})();
