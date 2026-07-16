const STORAGE_KEY = "wondergo-pwa-records-v1";

const abilityMap = [
  { id: "word", name: "語彙晶石", short: "單字", icon: "💎", color: "#7b61ff" },
  { id: "echo", name: "聲音雷達", short: "聽力", icon: "🎧", color: "#31b7b0" },
  { id: "story", name: "故事解碼", short: "閱讀", icon: "📖", color: "#4d8df7" },
  { id: "spell", name: "拼字工坊", short: "拼字", icon: "✏️", color: "#f5a623" },
  { id: "voice", name: "語音引擎", short: "口說", icon: "🎙️", color: "#f26f88" },
];

const levelBands = [
  {
    level: 1,
    cefr: "Pre-A1",
    grade: "國小中低年級起步",
    source: "教育部 600 字基礎入門",
    xp: 0,
    title: "啟航新手",
    goal: "能聽懂、認讀生活中最常見的單字與問候句。",
  },
  {
    level: 2,
    cefr: "Pre-A1",
    grade: "國小中年級",
    source: "教育部 600 字核心",
    xp: 180,
    title: "晶石收集員",
    goal: "能用簡單句型介紹自己、顏色、數字、物品與家人。",
  },
  {
    level: 3,
    cefr: "A1",
    grade: "國小高年級",
    source: "教育部 1200 字基礎",
    xp: 460,
    title: "日常任務員",
    goal: "能理解課本常見句型，完成學校、食物、作息等任務。",
  },
  {
    level: 4,
    cefr: "A1",
    grade: "國小高年級進階",
    source: "教育部 1200 字延伸",
    xp: 860,
    title: "故事解碼員",
    goal: "能閱讀短句與簡短段落，並用英語完成生活情境表達。",
  },
  {
    level: 5,
    cefr: "A2",
    grade: "國中銜接",
    source: "教育部 3000 字入門段",
    xp: 1400,
    title: "語宙冒險家",
    goal: "能整合聽說讀寫，理解較長指令與短文內容。",
  },
  {
    level: 6,
    cefr: "B1",
    grade: "進階挑戰",
    source: "教育部 3000 字進階段",
    xp: 2200,
    title: "Wonder 領航員",
    goal: "能整理資訊、表達想法，完成更完整的主題任務。",
  },
];

const wordBanks = {
  600: [
    ["apple", "蘋果", "🍎"], ["book", "書", "📘"], ["cat", "貓", "🐱"], ["dog", "狗", "🐶"],
    ["red", "紅色", "🔴"], ["blue", "藍色", "🔵"], ["mother", "媽媽", "👩"], ["father", "爸爸", "👨"],
    ["school", "學校", "🏫"], ["seven", "七", "7️⃣"], ["milk", "牛奶", "🥛"], ["sunny", "晴朗的", "☀️"],
  ],
  1200: [
    ["breakfast", "早餐", "🍳"], ["Wednesday", "星期三", "📅"], ["library", "圖書館", "📚"],
    ["bedroom", "臥室", "🛏️"], ["thirsty", "口渴的", "🥤"], ["airport", "機場", "✈️"],
    ["basketball", "籃球", "🏀"], ["vegetables", "蔬菜", "🥦"], ["homework", "作業", "📝"],
    ["weather", "天氣", "🌤️"], ["doctor", "醫生", "🩺"], ["station", "車站", "🚉"],
  ],
  3000: [
    ["experience", "經驗", "🧭"], ["environment", "環境", "🌱"], ["important", "重要的", "⭐"],
    ["practice", "練習", "🎯"], ["describe", "描述", "🗣️"], ["compare", "比較", "⚖️"],
    ["journey", "旅程", "🛤️"], ["culture", "文化", "🏮"], ["healthy", "健康的", "💪"],
    ["prepare", "準備", "🎒"], ["information", "資訊", "💡"], ["challenge", "挑戰", "🏁"],
  ],
};

const patterns = {
  1: ["Hello. I am ___.", "It is ___.", "I like ___."],
  2: ["This is my ___.", "I have a ___.", "What color is it?"],
  3: ["What do you want for ___?", "Where is the ___?", "I go to school by ___."],
  4: ["He likes ___ after school.", "There is a ___ near my home.", "How much is the ___?"],
  5: ["I want to ___ because it is important.", "Please describe your favorite ___.", "What did you do on your journey?"],
  6: ["Compare two ideas and explain why.", "Share your experience in three sentences.", "Use information to solve the challenge."],
};

let state = loadState();
let screen = state.currentStudent ? "student" : "entry";
let selectedAbility = null;
let installPrompt = null;

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { students: [], currentStudent: null };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function currentStudent() {
  return state.students.find((student) => student.key === state.currentStudent) || null;
}

function levelForXp(xp) {
  return [...levelBands].reverse().find((band) => xp >= band.xp) || levelBands[0];
}

function nextLevel(xp) {
  return levelBands.find((band) => band.xp > xp);
}

function wordSourceForLevel(level) {
  if (level <= 2) return "600";
  if (level <= 4) return "1200";
  return "3000";
}

function wordsForStudent(student) {
  return wordBanks[wordSourceForLevel(levelForXp(student.xp).level)];
}

function abilityScore(student, abilityId) {
  return student.abilities?.[abilityId] || 0;
}

function makeQuestion(student, abilityId, index) {
  const level = levelForXp(student.xp).level;
  const words = wordsForStudent(student);
  const word = words[(index + level) % words.length];
  const options = [word[0], ...words.filter((item) => item[0] !== word[0]).slice(index % 4, index % 4 + 3).map((item) => item[0])];
  const shuffled = options.sort((a, b) => a.localeCompare(b)).slice(0, 4);
  const answerIndex = shuffled.indexOf(word[0]);
  const pattern = patterns[level][index % patterns[level].length];
  const prompts = {
    word: [`${word[2]} 哪一個英文是「${word[1]}」？`, shuffled, answerIndex],
    echo: [`Toki 發出聲音訊號：「${word[0]}」。請選出你聽到的單字。`, shuffled, answerIndex],
    story: [`閱讀任務：${pattern.replace("___", word[0])} 這句最接近哪個重點單字？`, shuffled, answerIndex],
    spell: [`選出「${word[1]}」的正確拼字。`, shuffled, answerIndex],
    voice: [`開口任務：用「${word[0]}」完成一句話。先選出關鍵字，再大聲說一次。`, shuffled, answerIndex],
  };
  return { abilityId, visual: word[2], word: word[0], meaning: word[1], prompt: prompts[abilityId][0], options: prompts[abilityId][1], answer: prompts[abilityId][2] };
}

function render() {
  const app = document.getElementById("app");
  if (screen === "teacher") app.innerHTML = renderTeacher();
  else if (screen === "play") app.innerHTML = renderGame();
  else if (screen === "student" && currentStudent()) app.innerHTML = renderStudent();
  else app.innerHTML = renderEntry();
  bindEvents();
}

function renderEntry() {
  return `
    <main class="entry-shell">
      <section class="entry-card">
        <div class="brand">
          <img src="../assets/ip-avatar.png" alt="WonderGo 個人 IP 冒險導師" />
          <div><span>WonderGo PWA</span><h1>不用註冊，也能延續闖關紀錄</h1></div>
        </div>
        <p class="lead">由 WonderGo 冒險導師陪孩子出發。學生只需輸入班級碼與學習代號，系統以代號保存紀錄；教師可掌握班級學習狀況，學生端不公開真實姓名。</p>
        <form id="student-login" class="login-form">
          <label>班級碼<input name="classCode" placeholder="例：WG601" required /></label>
          <label>學習代號<input name="learningId" placeholder="例：601-12 或 S012" required /></label>
          <label>角色暱稱<input name="nickname" placeholder="例：星星Leo" required /></label>
          <button class="primary-btn">開始冒險</button>
        </form>
        <div class="entry-actions">
          <button class="ghost-btn" id="open-teacher">教師後台示範</button>
          <button class="ghost-btn" id="install-app">加入主畫面</button>
        </div>
      </section>
      <section class="privacy-card">
        <h2>資安隱私設計</h2>
        <ul>
          <li>學生端不需要信箱、電話或密碼。</li>
          <li>以班級碼＋學習代號追蹤學習，不公開真實姓名。</li>
          <li>教師若需姓名，可另行在後台匯入對照表。</li>
          <li>目前原型先存在本裝置；正式版可接 Supabase 匿名班級資料表。</li>
        </ul>
      </section>
    </main>`;
}

function renderStudent() {
  const student = currentStudent();
  const level = levelForXp(student.xp);
  const next = nextLevel(student.xp);
  const progress = next ? Math.round((student.xp - level.xp) / (next.xp - level.xp) * 100) : 100;
  return `
    <main class="app-shell">
      <header class="student-hero">
        <div>
          <span class="eyebrow">${student.classCode}｜${student.learningId}</span>
          <h1>${escapeHTML(student.nickname)}，今天跟著冒險導師從哪座場域出發？</h1>
          <p>前台顯示 Level ${level.level}，後台對應 ${level.cefr}。題目依教育部 ${level.source} 與年級課綱概念逐步變難。</p>
        </div>
        <img src="../assets/ip-guide.png" alt="WonderGo 個人 IP 冒險導師" />
      </header>
      <section class="progress-panel">
        <article><small>目前等級</small><strong>Level ${level.level}</strong><span>${level.title}</span></article>
        <article><small>後台對應</small><strong>${level.cefr}</strong><span>${level.grade}</span></article>
        <article><small>總經驗值</small><strong>${student.xp} XP</strong><span>${next ? `距離 Level ${next.level} 還差 ${next.xp - student.xp} XP` : "已達目前最高階"}</span></article>
        <div class="level-line"><span style="width:${progress}%"></span></div>
      </section>
      <section class="daily-map">
        <div class="section-title">
          <div><span class="eyebrow">SKILL MAP</span><h2>聽說讀寫場域</h2><p>每座場域完成 5 題即可獲得 XP，答題紀錄會更新能力值。</p></div>
        </div>
        <div class="ability-grid">
          ${abilityMap.map((ability) => `
            <button class="ability-card" data-ability="${ability.id}" style="--color:${ability.color}">
              <span>${ability.icon}</span>
              <strong>${ability.name}</strong>
              <small>${ability.short}能力 ${abilityScore(student, ability.id)}</small>
            </button>`).join("")}
        </div>
      </section>
      <section class="diagnosis-panel">
        <h2>我的學習雷達</h2>
        <div class="radar-bars">
          ${abilityMap.map((ability) => `<label><b>${ability.name}</b><span><i style="width:${abilityScore(student, ability.id)}%; background:${ability.color}"></i></span><em>${abilityScore(student, ability.id)}</em></label>`).join("")}
        </div>
      </section>
      <footer class="bottom-actions">
        <button class="ghost-btn" id="switch-user">切換學生</button>
        <button class="ghost-btn" id="teacher-view">教師後台</button>
      </footer>
    </main>`;
}

function renderGame() {
  const student = currentStudent();
  const ability = abilityMap.find((item) => item.id === selectedAbility) || abilityMap[0];
  const questions = Array.from({ length: 5 }, (_, index) => makeQuestion(student, ability.id, index));
  window.currentQuestions = questions;
  return `
    <main class="game-shell">
      <header class="game-head">
        <button class="ghost-btn" id="back-home">← 回首頁</button>
        <div><span class="eyebrow">${ability.short}挑戰</span><h1>${ability.name}</h1><p>完成本場域可獲得 XP，口說題會鼓勵學生開口練習。</p></div>
      </header>
      <form id="game-form" class="question-list">
        ${questions.map((question, index) => `
          <article class="question-card">
            <span class="question-visual">${question.visual}</span>
            <h2>第 ${index + 1} 題</h2>
            <p>${escapeHTML(question.prompt)}</p>
            <div class="option-grid">
              ${question.options.map((option, optionIndex) => `
                <label><input type="radio" name="q${index}" value="${optionIndex}" required />${escapeHTML(option)}</label>
              `).join("")}
            </div>
          </article>`).join("")}
        <button class="primary-btn wide">完成挑戰，領取經驗值</button>
      </form>
    </main>`;
}

function renderTeacher() {
  const students = state.students;
  const classes = [...new Set(students.map((student) => student.classCode))];
  return `
    <main class="app-shell">
      <header class="teacher-hero">
        <div><span class="eyebrow">TEACHER DASHBOARD</span><h1>班級學習狀況</h1><p>免註冊版本以班級碼與學習代號彙整紀錄；正式雲端版可匯入姓名對照，但學生端不公開姓名。</p></div>
        <button class="ghost-btn" id="teacher-back">回學生端</button>
      </header>
      <section class="teacher-summary">
        <article><small>班級數</small><strong>${classes.length}</strong></article>
        <article><small>學生代號</small><strong>${students.length}</strong></article>
        <article><small>總 XP</small><strong>${students.reduce((sum, item) => sum + item.xp, 0)}</strong></article>
      </section>
      ${classes.map((classCode) => {
        const classStudents = students.filter((student) => student.classCode === classCode);
        return `
          <section class="class-panel">
            <div class="section-title"><div><h2>${classCode}</h2><p>只呈現學習代號與暱稱，保留姓名匯入彈性。</p></div></div>
            <div class="student-table">
              ${classStudents.map((student) => {
                const level = levelForXp(student.xp);
                const weakest = abilityMap.map((ability) => ({ ...ability, score: abilityScore(student, ability.id) })).sort((a, b) => a.score - b.score)[0];
                return `
                  <article>
                    <b>${escapeHTML(student.learningId)}｜${escapeHTML(student.nickname)}</b>
                    <span>Level ${level.level}／${level.cefr}｜${student.xp} XP</span>
                    <em>建議關注：${weakest.name}</em>
                  </article>`;
              }).join("")}
            </div>
          </section>`;
      }).join("") || `<section class="empty"><h2>尚無學生紀錄</h2><p>請先用學生端輸入班級碼與學習代號。</p></section>`}
    </main>`;
}

function bindEvents() {
  document.getElementById("student-login")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const classCode = String(form.get("classCode")).trim().toUpperCase();
    const learningId = String(form.get("learningId")).trim();
    const nickname = String(form.get("nickname")).trim();
    const key = `${classCode}:${learningId}`;
    let student = state.students.find((item) => item.key === key);
    if (!student) {
      student = {
        key, classCode, learningId, nickname,
        xp: 0,
        abilities: Object.fromEntries(abilityMap.map((ability) => [ability.id, 0])),
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      state.students.push(student);
    } else {
      student.nickname = nickname || student.nickname;
      student.lastActiveAt = new Date().toISOString();
    }
    state.currentStudent = key;
    saveState();
    screen = "student";
    render();
    toast("登入成功，紀錄會在這台裝置延續。");
  });

  document.querySelectorAll("[data-ability]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAbility = button.dataset.ability;
      screen = "play";
      render();
      scrollTo(0, 0);
    });
  });

  document.getElementById("game-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const student = currentStudent();
    const form = new FormData(event.currentTarget);
    const questions = window.currentQuestions || [];
    const correct = questions.reduce((sum, question, index) => sum + (Number(form.get(`q${index}`)) === question.answer ? 1 : 0), 0);
    const xp = 10 + correct * 8;
    student.xp += xp;
    student.abilities[selectedAbility] = Math.min(100, (student.abilities[selectedAbility] || 0) + 4 + correct * 2);
    student.lastActiveAt = new Date().toISOString();
    student.lastStudyDate = todayKey();
    saveState();
    screen = "student";
    render();
    toast(`完成挑戰！答對 ${correct}/${questions.length}，獲得 ${xp} XP。`);
  });

  document.getElementById("back-home")?.addEventListener("click", () => {
    screen = "student";
    render();
  });
  document.getElementById("switch-user")?.addEventListener("click", () => {
    state.currentStudent = null;
    saveState();
    screen = "entry";
    render();
  });
  document.getElementById("teacher-view")?.addEventListener("click", () => {
    screen = "teacher";
    render();
  });
  document.getElementById("open-teacher")?.addEventListener("click", () => {
    screen = "teacher";
    render();
  });
  document.getElementById("teacher-back")?.addEventListener("click", () => {
    screen = currentStudent() ? "student" : "entry";
    render();
  });
  document.getElementById("install-app")?.addEventListener("click", async () => {
    if (!installPrompt) return toast("若使用手機瀏覽器，可透過分享選單加入主畫面。");
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2600);
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

render();
