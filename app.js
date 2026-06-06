const STORAGE_KEY = "wondergo-prototype-v1";

const abilities = [
  { id: "word", name: "語彙能量", en: "Word Power", icon: "◆", color: "#6c4ee3", value: 82, trend: "+6%" },
  { id: "echo", name: "聲音雷達", en: "Echo Sense", icon: "◖", color: "#22b8ae", value: 64, trend: "+12%" },
  { id: "story", name: "解碼視野", en: "Story Vision", icon: "◉", color: "#4e8cf7", value: 76, trend: "+5%" },
  { id: "spell", name: "拼字工藝", en: "Spell Craft", icon: "✦", color: "#ef9f2f", value: 71, trend: "+3%" },
  { id: "voice", name: "語音引擎", en: "Voice Power", icon: "◍", color: "#f06d73", value: 48, trend: "+8%" },
];

const demoStudents = [
  { name: "林小晴", player: "晴空飛行員", seat: "08", level: "A1-2", days: 5, time: "2h 18m", completion: 86, focus: "語音引擎", status: "穩定進步" },
  { name: "陳宇恩", player: "宇宙解碼員", seat: "12", level: "Pre-A1", days: 3, time: "1h 12m", completion: 62, focus: "聲音雷達", status: "需要關注" },
  { name: "王語芯", player: "晶石收藏家", seat: "03", level: "A1-2", days: 6, time: "3h 06m", completion: 94, focus: "極限挑戰", status: "穩定進步" },
  { name: "張凱翔", player: "閃電探險家", seat: "17", level: "A1-1", days: 4, time: "1h 46m", completion: 75, focus: "拼字工藝", status: "穩定進步" },
  { name: "李可欣", player: "彩虹導航員", seat: "21", level: "A1-1", days: 1, time: "0h 22m", completion: 28, focus: "回歸任務", status: "需要關注" },
];

const defaultData = {
  users: [
    {
      role: "player",
      account: "player",
      password: "1234",
      school: "WonderGo 國小",
      className: "六年一班",
      seat: "08",
      realName: "林小晴",
      displayName: "player",
      xp: 1380,
      level: 12,
    },
    {
      role: "teacher",
      account: "teacher",
      password: "1234",
      school: "WonderGo 國小",
      className: "六年一班",
      realName: "陳老師",
    },
  ],
  currentUser: null,
};

let data = loadData();
let authRole = "player";
let authMode = "login";
let currentPage = "home";
let selectedStudent = 0;
let cloudStudents = [];

if (Cloud.isConfigured() && data.currentUser) {
  const cloudUser = data.users.find(
    (user) =>
      user.cloud &&
      user.account === data.currentUser.account &&
      user.role === data.currentUser.role,
  );
  if (!cloudUser) {
    data.currentUser = null;
    saveData();
  }
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : structuredClone(defaultData);
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function currentUser() {
  return data.users.find((user) => user.account === data.currentUser?.account && user.role === data.currentUser?.role);
}

function activeStudents() {
  return currentUser()?.cloud ? cloudStudents : demoStudents;
}

async function refreshTeacherStudents(user) {
  if (!user?.cloud || user.role !== "teacher") return;
  try {
    cloudStudents = await Cloud.loadClassStudents(user.school, user.className);
  } catch (error) {
    toast(`學生資料同步失敗：${error.message}`);
  }
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2300);
}

function render() {
  const root = document.getElementById("app");
  root.innerHTML = data.currentUser ? renderApp() : renderAuth();
  bindEvents();
}

function renderAuth() {
  const isTeacher = authRole === "teacher";
  const isRegister = authMode === "register";
  const cloudReady = Cloud.isConfigured();
  return `
    <main class="auth-shell">
      <section class="brand-stage">
        <div class="logo"><span class="logo-mark">W</span> WonderGo <small>玩得夠</small></div>
        <div class="hero-copy">
          <span class="eyebrow">Toki 陪你展開英語冒險</span>
          <h1>WonderGo<span>勇敢開口，玩出英語力！</span></h1>
          <p>每天完成一點任務，累積五大能力，和 Toki 一起解鎖充滿故事的英語新世界。</p>
          <div class="hero-pills"><span>五大能力訓練館</span><span>每週成長報告</span><span>情境冒險闖關</span></div>
        </div>
        <img class="toki-hero" src="assets/toki.png" alt="WonderGo 冒險夥伴 Toki" />
      </section>
      <section class="auth-panel">
        <div class="auth-card">
          <h2>${isRegister ? `建立${isTeacher ? "教師" : "玩家"}帳號` : "歡迎回來！"}</h2>
          <p>${isRegister ? "填寫基本資料，準備展開 WonderGo 旅程。" : "登入後從上一次的冒險紀錄繼續。"}</p>
          <div class="role-switch">
            <button data-role="player" class="${!isTeacher ? "active" : ""}">玩家入口</button>
            <button data-role="teacher" class="${isTeacher ? "active" : ""}">教師入口</button>
          </div>
          <div class="auth-switch">
            <button data-mode="login" class="${!isRegister ? "active" : ""}">登入</button>
            <button data-mode="register" class="${isRegister ? "active" : ""}">第一次註冊</button>
          </div>
          ${isRegister ? renderRegisterForm(isTeacher) : renderLoginForm(isTeacher)}
          <div class="demo-note" style="color:${cloudReady ? "#24855e" : "#a36b10"}">
            ${cloudReady ? "● 雲端資料庫已連線，帳號與學習紀錄會跨裝置同步。" : "○ 尚未設定 Supabase，目前使用本機原型資料。"}
          </div>
          <div class="demo-note">
            快速體驗：${isTeacher ? "教師帳號" : "玩家帳號"} <b>${isTeacher ? "teacher" : "player"}</b>，密碼 <b>${cloudReady ? "Wonder1234" : "1234"}</b>。<br />
            ${cloudReady ? "雲端帳號可在不同裝置登入。" : "新註冊資料會保存在這台裝置的瀏覽器中。"}
          </div>
        </div>
      </section>
    </main>`;
}

function renderLoginForm(isTeacher) {
  return `
    <form id="login-form">
      <div class="field">
        <label>${isTeacher ? "教師帳號" : "玩家帳號"}</label>
        <input name="account" autocomplete="username" placeholder="請輸入帳號" required />
      </div>
      <div class="field">
        <label>密碼</label>
        <input name="password" type="password" autocomplete="current-password" placeholder="請輸入密碼" required />
      </div>
      <button class="primary-btn wide" type="submit">登入，繼續冒險</button>
    </form>`;
}

function renderRegisterForm(isTeacher) {
  return `
    <form id="register-form">
      <div class="form-grid">
        <div class="field full"><label>學校</label><input name="school" placeholder="例：晨光國小" required /></div>
        <div class="field"><label>${isTeacher ? "教學班級" : "班級"}</label><input name="className" placeholder="例：六年一班" required /></div>
        ${isTeacher ? "" : '<div class="field"><label>座號</label><input name="seat" placeholder="例：08" required /></div>'}
        <div class="field ${isTeacher ? "" : ""}"><label>真實姓名</label><input name="realName" placeholder="僅教師與管理員可見" required /></div>
        <div class="field ${isTeacher ? "" : "full"}">
          <label>${isTeacher ? "教師帳號" : "玩家帳號"}</label>
          <input name="account" autocomplete="username" placeholder="設定下次登入帳號" required />
          ${isTeacher ? "" : '<small style="color:var(--muted)">玩家帳號將直接作為遊戲中的公開顯示名稱。</small>'}
        </div>
        <div class="field"><label>密碼</label><input name="password" type="password" autocomplete="new-password" minlength="${Cloud.isConfigured() ? 8 : 4}" placeholder="至少 ${Cloud.isConfigured() ? 8 : 4} 個字元" required /></div>
        <div class="field full"><label>再次確認密碼</label><input name="confirmPassword" type="password" autocomplete="new-password" required /></div>
      </div>
      <button class="primary-btn wide" type="submit">完成註冊，進入 WonderGo</button>
    </form>`;
}

function renderApp() {
  const user = currentUser();
  const isTeacher = user.role === "teacher";
  return `
    <div class="app-shell">
      ${renderSidebar(user, isTeacher)}
      <main class="main">
        ${isTeacher ? renderTeacherPage(user) : renderPlayerPage(user)}
      </main>
    </div>`;
}

function renderSidebar(user, isTeacher) {
  const playerNav = [
    ["home", "⌂", "冒險首頁"],
    ["training", "✦", "五大訓練館"],
    ["ability", "◈", "我的能力"],
    ["world", "◎", "世界地圖"],
    ["report", "▤", "托奇週報"],
  ];
  const teacherNav = [
    ["overview", "▦", "班級總覽"],
    ["students", "♙", "學生學習狀況"],
    ["missions", "✓", "指派任務"],
    ["content", "◇", "教材管理"],
    ["analytics", "⌁", "教學成效"],
  ];
  const nav = isTeacher ? teacherNav : playerNav;
  return `
    <aside class="sidebar">
      <div class="logo"><span class="logo-mark">W</span> WonderGo</div>
      <nav class="nav">
        ${nav.map(([id, icon, label]) => `<button data-page="${id}" class="${currentPage === id || (currentPage === "home" && id === "overview" && isTeacher) ? "active" : ""}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}
        <button id="logout"><span class="nav-icon">↪</span>登出</button>
      </nav>
      <div class="sidebar-user">
        <span class="avatar">${escapeHTML((isTeacher ? user.realName : user.account).slice(0, 1))}</span>
        <div><strong>${escapeHTML(isTeacher ? user.realName : user.account)}</strong><small>${isTeacher ? `${user.className} 教師` : `Lv.${user.level || 1} 探索者`}</small></div>
      </div>
    </aside>`;
}

function playerHeader(user, title, subtitle) {
  return `
    <header class="topbar">
      <div><h1>${title}</h1><p>${subtitle}</p></div>
      <div class="top-stats">
        <span class="stat-pill">🔥 連續 5 天</span>
        <span class="stat-pill">⚡ ${user.xp || 0} XP</span>
        <span class="stat-pill">🏅 Lv.${user.level || 1}</span>
      </div>
    </header>`;
}

function renderPlayerPage(user) {
  if (currentPage === "training") return renderTraining(user);
  if (currentPage === "ability") return renderAbility(user);
  if (currentPage === "world") return renderComingSoon(user, "世界地圖", "第一站：晨光鎮", "完成五大能力任務，修復失落的語言之鑰。", "🗺️");
  if (currentPage === "report") return renderReport(user);
  return renderPlayerHome(user);
}

function renderPlayerHome(user) {
  return `
    ${playerHeader(user, `嗨，${escapeHTML(user.account)}！`, "今天也和 Toki 一起前進一點吧。")}
    <section class="dashboard-grid">
      <article class="card hero-card">
        <span class="eyebrow">今日主線任務</span>
        <h2>晨光鎮的招呼聲消失了！</h2>
        <p>學會 5 個問候語，聽懂鎮民的線索，最後勇敢開口啟動第一道城門。</p>
        <button class="primary-btn start-game">開始今日冒險 ＋80 XP</button>
        <img src="assets/toki.png" alt="Toki" />
      </article>
      <article class="card week-card">
        <h3>本週成長目標</h3>
        <div class="ring" style="--value:68"><strong>68%</strong></div>
        <div class="week-days">
          ${["一", "二", "三", "四", "五", "六", "日"].map((day, i) => `<span class="day ${i < 5 ? "done" : ""}"><i>${i < 5 ? "✓" : i + 1}</i>${day}</span>`).join("")}
        </div>
        <p style="text-align:center;color:var(--muted);font-size:12px;margin:16px 0 0">再完成 2 次學習，本週目標就達成！</p>
      </article>
    </section>
    ${renderTrainingSection()}
    ${renderMissions()}`;
}

function renderTrainingSection() {
  return `
    <div class="section-title">
      <div><h2>五大能力訓練館</h2><p>選擇今天想加強的英語能力。</p></div>
      <button class="ghost-btn" data-page="training">查看全部 →</button>
    </div>
    <section class="training-overview">
      <div class="training-grid">
        ${abilities.map((a) => `
          <button class="training-card start-game" style="color:${a.color}">
            <span class="ability-icon" style="background:${a.color}">${a.icon}</span>
            <h3>${a.name}</h3><small>${a.en}</small>
            <div class="mini-progress"><span style="width:${a.value}%"></span></div>
            <footer><span>能力值 ${a.value}</span><span>本週 ${a.trend}</span></footer>
          </button>`).join("")}
      </div>
      ${renderRadarCard("語力探測雷達", "掃描五大能力，鎖定下一個升級方向")}
    </section>`;
}

function renderMissions() {
  const missions = [
    ["主線任務", "失落的招呼聲", "完成新內容，推進晨光鎮的故事。", "＋80 XP"],
    ["補強任務", "勇敢開口", "再完成 2 次短句跟讀，補充語音引擎。", "＋50 XP"],
    ["極限挑戰", "晶石快手", "用最強的語彙能量挑戰限時關卡。", "神秘寶箱"],
  ];
  return `
    <div class="section-title"><div><h2>今日推薦</h2><p>Toki 根據你的能力表現安排了三項任務。</p></div></div>
    <section class="mission-grid">
      ${missions.map((m) => `<article class="card mission"><div class="mission-head"><span class="mission-tag">${m[0]}</span><b>${m[3]}</b></div><h3>${m[1]}</h3><p>${m[2]}</p><button class="secondary-btn start-game">前往任務</button></article>`).join("")}
    </section>`;
}

function renderTraining(user) {
  return `
    ${playerHeader(user, "五大能力訓練館", "自由練習、弱項補強與教師指定任務都在這裡。")}
    ${renderTrainingSection()}
    ${renderMissions()}`;
}

function radarSVG(values = abilities) {
  const center = 150;
  const maxRadius = 92;
  const pointAt = (index, radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / 5;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  };
  const polygonPoints = (radius) => values
    .map((_, index) => {
      const point = pointAt(index, radius);
      return `${point.x},${point.y}`;
    })
    .join(" ");
  const rings = [0.25, 0.5, 0.75, 1]
    .map((ratio) => `<polygon class="grid-line" points="${polygonPoints(maxRadius * ratio)}" />`)
    .join("");
  const axes = values
    .map((_, index) => {
      const point = pointAt(index, maxRadius);
      return `<line class="axis-line" x1="${center}" y1="${center}" x2="${point.x}" y2="${point.y}" />`;
    })
    .join("");
  const dataPoints = values
    .map((ability, index) => {
      const point = pointAt(index, maxRadius * (ability.value / 100));
      return `${point.x},${point.y}`;
    })
    .join(" ");
  const dots = values
    .map((ability, index) => {
      const point = pointAt(index, maxRadius * (ability.value / 100));
      return `<circle class="data-point" cx="${point.x}" cy="${point.y}" r="5" fill="${ability.color}" />`;
    })
    .join("");
  const labels = values
    .map((ability, index) => {
      const point = pointAt(index, 123);
      const anchor = point.x < center - 20 ? "end" : point.x > center + 20 ? "start" : "middle";
      const valueY = point.y + (point.y < center ? 15 : -13);
      return `
        <text class="radar-label" x="${point.x}" y="${point.y}" text-anchor="${anchor}">${ability.name}</text>
        <text class="radar-value" x="${point.x}" y="${valueY}" text-anchor="${anchor}">${ability.value}</text>`;
    })
    .join("");
  return `
    <svg class="ability-radar" viewBox="0 0 300 300" role="img" aria-label="五大能力雷達圖">
      ${rings}${axes}
      <polygon class="data-shape" points="${dataPoints}" />
      ${dots}${labels}
    </svg>`;
}

function renderRadarCard(title, subtitle, values = abilities) {
  return `
    <article class="card radar-card">
      <h3>${title}</h3>
      <p>${subtitle}</p>
      ${radarSVG(values)}
      <span class="radar-caption">↑ 本週整體語力提升 8%</span>
    </article>`;
}

function renderAbility(user) {
  return `
    ${playerHeader(user, "我的能力", "看見自己的強項，也知道下一步可以怎麼進步。")}
    <section class="ability-page">
      <article class="card profile-card">
        <div class="profile-orb"><img src="assets/toki.png" alt="Toki 夥伴" /></div>
        <h2>${escapeHTML(user.account)}</h2>
        <p style="color:var(--muted)">Lv.${user.level}｜城市探索者｜CEFR A1-2</p>
        <div class="radar-wrap">${radarSVG()}</div>
        <b>本週整體語力提升 8%</b>
      </article>
      <div>
        <article class="card report-card">
          <h2>五大冒險能力</h2>
          <div class="ability-list">
            ${abilities.map((a) => `<div class="ability-row"><span class="ability-icon" style="background:${a.color}">${a.icon}</span><div><h4>${a.name}</h4><p>${a.en}｜本週 ${a.trend}</p></div><strong>${a.value}</strong></div>`).join("")}
          </div>
        </article>
        <article class="card report-card" style="margin-top:20px">
          <h2>Toki 的學習分析</h2>
          <div class="insight good"><span>✨</span><div><b>你的語彙能量是目前最強能力！</b><p>你已掌握 186 個單字，而且一週後仍能記得 82%。本週又收集了 18 顆語彙晶石。</p></div></div>
          <div class="insight focus"><span>⚡</span><div><b>語音引擎需要補充能量</b><p>你認得多數句子，但本週只開口練習兩次。每天完成一次「勇敢開口」，預計兩週可提升流暢度。</p></div></div>
        </article>
      </div>
    </section>`;
}

function renderReport(user) {
  return `
    ${playerHeader(user, "托奇週報", "每週六發送，讓每一點努力都看得見。")}
    <section class="metric-grid">
      <article class="card metric"><span>本週學習天數</span><strong>5 天</strong><small>比上週多 1 天</small></article>
      <article class="card metric"><span>完成任務</span><strong>12 項</strong><small>完成率 86%</small></article>
      <article class="card metric"><span>本週學習時間</span><strong>2h 18m</strong><small>保持穩定節奏</small></article>
    </section>
    <section class="card report-card" style="margin-top:20px">
      <h2>本週成長摘要</h2>
      <div class="insight good"><span>🏆</span><div><b>本週進步最多：聲音雷達＋12%</b><p>你已更能聽懂日常問候與人物介紹，但數字和時間仍容易混淆。</p></div></div>
      <div class="insight focus"><span>🎯</span><div><b>下週成長方向：語音引擎</b><p>建議每天完成一次短對話，累積 5 次即可提升一階。</p></div></div>
    </section>
    ${renderMissions()}`;
}

function renderComingSoon(user, title, subtitle, body, icon) {
  return `
    ${playerHeader(user, title, subtitle)}
    <section class="card empty-page"><div><div class="big-icon">${icon}</div><h2>${subtitle}</h2><p style="color:var(--muted)">${body}</p><button class="primary-btn start-game">進入第一道關卡</button></div></section>`;
}

function teacherHeader(user, title, subtitle) {
  return `
    <header class="topbar">
      <div><h1>${title}</h1><p>${escapeHTML(user.school)}・${escapeHTML(user.className)}｜${subtitle}</p></div>
      <button class="primary-btn mission-action">＋ 指派新任務</button>
    </header>`;
}

function renderTeacherPage(user) {
  if (currentPage === "students") return renderStudents(user);
  if (currentPage === "missions") return renderTeacherPlaceholder(user, "指派任務", "為全班或個別學生安排主線、補強與極限挑戰。", "✓");
  if (currentPage === "content") return renderTeacherPlaceholder(user, "教材管理", "建立世界、章節、關卡、題目、提示與獎勵。", "◇");
  if (currentPage === "analytics") return renderTeacherPlaceholder(user, "教學成效", "追蹤答錯率、完成率與教材調整前後的學習變化。", "⌁");
  return renderTeacherOverview(user);
}

function renderTeacherOverview(user) {
  const students = activeStudents();
  const activeCount = students.filter((student) => student.days > 0).length;
  const averageCompletion = students.length
    ? Math.round(students.reduce((sum, student) => sum + student.completion, 0) / students.length)
    : 0;
  return `
    ${teacherHeader(user, "班級學習總覽", "本週整體使用與學習狀況")}
    <section class="metric-grid">
      <article class="card metric"><span>班級學生</span><strong>${students.length} 人</strong><small>本週活躍 ${activeCount} 人</small></article>
      <article class="card metric"><span>本週登入率</span><strong>${students.length ? Math.round((activeCount / students.length) * 100) : 0}%</strong><small>依雲端學習事件統計</small></article>
      <article class="card metric"><span>任務完成率</span><strong>${averageCompletion}%</strong><small>${students.filter((student) => student.completion >= 80).length} 人達成本週目標</small></article>
    </section>
    <div class="section-title"><div><h2>班級五大能力</h2><p>本週平均表現與成長趨勢</p></div></div>
    <section class="training-grid">
      ${abilities.map((a) => `<article class="training-card" style="color:${a.color}"><span class="ability-icon" style="background:${a.color}">${a.icon}</span><h3>${a.name}</h3><small>班級平均</small><div class="mini-progress"><span style="width:${Math.max(a.value - 8, 30)}%"></span></div><footer><span>${Math.max(a.value - 8, 30)} 分</span><span>${a.trend}</span></footer></article>`).join("")}
    </section>
    <div class="teacher-layout" style="margin-top:24px">
      ${studentTable()}
      <article class="card panel"><h2 class="card-title">需要關注</h2><div class="insight focus"><span>!</span><div><b>4 位學生本週使用下降</b><p>建議安排短版回歸任務，協助重新建立學習節奏。</p></div></div><div class="insight"><span>↻</span><div><b>時間與數字題答錯率 38%</b><p>高於其他內容，建議增加聲音雷達補強任務。</p></div></div></article>
    </div>`;
}

function studentTable() {
  const students = activeStudents();
  return `
    <article class="card panel">
      <div class="section-title" style="margin:0 0 10px"><div><h2>學生近況</h2><p>點選學生查看個人學習檔案</p></div></div>
      <div class="table-wrap"><table>
        <thead><tr><th>學生</th><th>程度</th><th>本週</th><th>完成率</th><th>狀態</th></tr></thead>
        <tbody>${students.length ? students.map((s, i) => `<tr class="student-row" data-student="${i}"><td><span class="student-name"><i class="small-avatar">${s.name[0]}</i>${s.name}<small>${s.seat}號</small></span></td><td>${s.level}</td><td>${s.days} 天</td><td>${s.completion}%</td><td><span class="status ${s.status.includes("關注") ? "warn" : ""}">${s.status}</span></td></tr>`).join("") : '<tr><td colspan="5" style="text-align:center;color:var(--muted)">目前班級尚無玩家</td></tr>'}</tbody>
      </table></div>
    </article>`;
}

function renderStudents(user) {
  const students = activeStudents();
  const s = students[selectedStudent] || students[0];
  if (!s) {
    return `
      ${teacherHeader(user, "學生學習狀況", "挑選個別使用者，查看完整學習分析")}
      <section class="card empty-page"><div><div class="big-icon">♙</div><h2>目前班級尚無玩家</h2><p style="color:var(--muted)">玩家使用相同學校與班級完成註冊後，就會出現在這裡。</p></div></section>`;
  }
  const studentAbilities = s.abilities || abilities.map((ability, index) => Math.max(36, ability.value - index * 2));
  return `
    ${teacherHeader(user, "學生學習狀況", "挑選個別使用者，查看完整學習分析")}
    <section class="teacher-layout">
      ${studentTable()}
      <article class="card panel student-detail">
        <header><span class="avatar">${s.name[0]}</span><div><h3>${s.name}</h3><p>${s.player}｜${s.level}</p></div></header>
        <div class="detail-stat"><label><span>本週任務完成率</span><b>${s.completion}%</b></label><div class="bar"><span style="width:${s.completion}%"></span></div></div>
        ${abilities.map((a, i) => `<div class="detail-stat"><label><span>${a.name}</span><b>${studentAbilities[i]} ${a.trend}</b></label><div class="bar"><span style="width:${studentAbilities[i]}%;background:${a.color}"></span></div></div>`).join("")}
        <div class="insight ${s.status.includes("關注") ? "focus" : "good"}"><span>✦</span><div><b>系統建議</b><p>${s.status.includes("關注") ? `優先安排「${s.focus}」，以 5 分鐘短任務協助恢復節奏。` : `學習節奏穩定，可安排「${s.focus}」延伸任務。`}</p></div></div>
        <button class="primary-btn mission-action">為 ${s.name.slice(1)} 指派任務</button>
      </article>
    </section>`;
}

function renderTeacherPlaceholder(user, title, body, icon) {
  return `
    ${teacherHeader(user, title, "WonderGo 教師管理中心")}
    <section class="card empty-page"><div><div class="big-icon">${icon}</div><h2>${title}</h2><p style="color:var(--muted)">${body}</p><button class="primary-btn mission-action">建立第一項內容</button></div></section>`;
}

function gameModal() {
  return `
    <div class="game-modal" id="game-modal">
      <article class="game-card">
        <header><span class="mission-tag">語彙能量館</span><button class="ghost-btn" id="close-game">✕</button></header>
        <div class="game-progress"><span></span></div>
        <div class="question-image">🍎</div>
        <h2>哪一個單字是「蘋果」？</h2>
        <div class="options">
          <button class="option wrong-answer">orange</button>
          <button class="option correct-answer">apple</button>
          <button class="option wrong-answer">grape</button>
          <button class="option wrong-answer">banana</button>
        </div>
      </article>
    </div>`;
}

function bindEvents() {
  document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => {
    authRole = button.dataset.role;
    render();
  }));
  document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => {
    authMode = button.dataset.mode;
    render();
  }));

  document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (Cloud.isConfigured()) {
      try {
        const user = await Cloud.login(form.get("account"), form.get("password"));
        if (user.role !== authRole) {
          await Cloud.logout();
          return toast(`這不是${authRole === "teacher" ? "教師" : "玩家"}帳號。`);
        }
        if (user.role === "teacher" && !user.approved) {
          await Cloud.logout();
          return toast("教師帳號已建立，需由管理員核准後才能查看班級資料。");
        }
        data.users = data.users.filter(
          (item) => !(item.account === user.account && item.role === user.role),
        );
        data.users.push(user);
        data.currentUser = { account: user.account, role: user.role };
        currentPage = user.role === "teacher" ? "overview" : "home";
        saveData();
        await refreshTeacherStudents(user);
        render();
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const user = data.users.find((item) => item.role === authRole && item.account === form.get("account") && item.password === form.get("password"));
    if (!user) return toast("帳號或密碼不正確，請再試一次。");
    data.currentUser = { account: user.account, role: user.role };
    currentPage = user.role === "teacher" ? "overview" : "home";
    saveData();
    render();
  });

  document.getElementById("register-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (values.password !== values.confirmPassword) return toast("兩次輸入的密碼不一致。");
    if (Cloud.isConfigured()) {
      try {
        const user = await Cloud.register(values, authRole);
        if (user.role === "teacher" && !user.approved) {
          await Cloud.logout();
          authMode = "login";
          render();
          setTimeout(() => toast("教師帳號已送出，管理員核准後即可登入。"), 50);
          return;
        }
        data.users = data.users.filter(
          (item) => !(item.account === user.account && item.role === user.role),
        );
        data.users.push(user);
        data.currentUser = { account: user.account, role: user.role };
        currentPage = user.role === "teacher" ? "overview" : "home";
        saveData();
        await refreshTeacherStudents(user);
        render();
        setTimeout(() => toast("雲端註冊成功，歡迎來到 WonderGo！"), 50);
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    if (data.users.some((user) => user.account === values.account)) return toast("這個帳號已有人使用。");
    delete values.confirmPassword;
    const user = { ...values, role: authRole, xp: 0, level: 1 };
    data.users.push(user);
    data.currentUser = { account: user.account, role: user.role };
    currentPage = user.role === "teacher" ? "overview" : "home";
    saveData();
    render();
    setTimeout(() => toast("註冊成功，歡迎來到 WonderGo！"), 50);
  });

  document.querySelectorAll("[data-page]").forEach((button) => button.addEventListener("click", () => {
    currentPage = button.dataset.page;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  document.getElementById("logout")?.addEventListener("click", async () => {
    if (currentUser()?.cloud) await Cloud.logout();
    data.currentUser = null;
    saveData();
    currentPage = "home";
    render();
  });

  document.querySelectorAll(".start-game").forEach((button) => button.addEventListener("click", () => {
    document.body.insertAdjacentHTML("beforeend", gameModal());
    document.getElementById("close-game").addEventListener("click", () => document.getElementById("game-modal").remove());
    document.querySelector(".correct-answer").addEventListener("click", async () => {
      const user = currentUser();
      user.xp = (user.xp || 0) + 20;
      saveData();
      if (user.cloud) {
        try {
          await Cloud.recordLearning("word", 20);
        } catch {
          toast("答題完成，但雲端同步暫時失敗。");
        }
      }
      document.getElementById("game-modal").remove();
      render();
      toast("答對了！語彙能量＋1，獲得 20 XP");
    });
    document.querySelectorAll(".wrong-answer").forEach((option) => option.addEventListener("click", () => {
      option.style.borderColor = "#f06d73";
      option.style.background = "#fff0f1";
      toast("差一點！Toki 提示：開頭是 a。");
    }));
  }));

  document.querySelectorAll(".student-row").forEach((row) => row.addEventListener("click", () => {
    selectedStudent = Number(row.dataset.student);
    currentPage = "students";
    render();
  }));

  document.querySelectorAll(".mission-action").forEach((button) => button.addEventListener("click", () => {
    toast("原型已記錄操作：任務編輯器將在下一版串接。");
  }));
}

render();

if (currentUser()?.cloud && currentUser()?.role === "teacher") {
  refreshTeacherStudents(currentUser()).then(render);
}
