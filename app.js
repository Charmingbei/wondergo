const STORAGE_KEY = "wondergo-prototype-v1";

const abilities = [
  { id: "word", name: "語彙晶石礦場", shortName: "語彙能量", en: "Word Power", icon: "◆", scene: "💎", color: "#6c4ee3", value: 82, trend: "+6%", description: "收集單字晶石，啟動冒險裝備" },
  { id: "echo", name: "回音雷達塔", shortName: "聲音雷達", en: "Echo Sense", icon: "◖", scene: "📡", color: "#22b8ae", value: 64, trend: "+12%", description: "接收英語訊號，辨識聲音線索" },
  { id: "story", name: "故事解碼森林", shortName: "解碼視野", en: "Story Vision", icon: "◉", scene: "📜", color: "#4e8cf7", value: 76, trend: "+5%", description: "閱讀地圖與故事，破解任務密碼" },
  { id: "spell", name: "魔法拼字工坊", shortName: "拼字工藝", en: "Spell Craft", icon: "✦", scene: "⚙️", color: "#ef9f2f", value: 71, trend: "+3%", description: "組合字母零件，修復語言機關" },
  { id: "voice", name: "勇者語音競技場", shortName: "語音引擎", en: "Voice Power", icon: "◍", scene: "🎙️", color: "#f06d73", value: 48, trend: "+8%", description: "開口回應角色，啟動語音引擎" },
];

const questionBanks = {
  word: {
    preA1: [
      ["🍎", "哪一個單字是「蘋果」？", ["apple", "orange", "banana", "grape"], 0],
      ["🐱", "哪一個單字是「貓」？", ["dog", "bird", "cat", "fish"], 2],
      ["🔵", "哪一個單字是「藍色」？", ["red", "blue", "green", "black"], 1],
      ["👩", "哪一個單字是「媽媽」？", ["mother", "father", "brother", "sister"], 0],
      ["📘", "哪一個單字是「書」？", ["pen", "desk", "book", "bag"], 2],
      ["7️⃣", "數字 7 的英文是？", ["six", "seven", "eight", "nine"], 1],
      ["🍚", "哪一個單字是「米飯」？", ["rice", "milk", "juice", "cake"], 0],
      ["☀️", "哪一個單字是「晴天」？", ["rainy", "windy", "sunny", "cloudy"], 2],
      ["✋", "哪一個單字是「手」？", ["head", "hand", "foot", "eye"], 1],
      ["🏫", "哪一個單字是「學校」？", ["park", "home", "store", "school"], 3],
    ],
    a1: [
      ["🕗", "哪一個單字表示「早餐」？", ["breakfast", "lunch", "dinner", "snack"], 0],
      ["🚲", "哪一個單字是「腳踏車」？", ["train", "bike", "bus", "car"], 1],
      ["📅", "星期三的英文是？", ["Monday", "Tuesday", "Wednesday", "Thursday"], 2],
      ["👨‍⚕️", "哪一個單字是「醫生」？", ["teacher", "doctor", "farmer", "cook"], 1],
      ["🛏️", "哪一個單字是「臥室」？", ["kitchen", "bathroom", "bedroom", "living room"], 2],
      ["🐘", "哪一個單字表示「高大的」？", ["short", "tall", "thin", "small"], 1],
      ["🥤", "哪一個單字是「口渴的」？", ["hungry", "tired", "thirsty", "angry"], 2],
      ["🎹", "哪一個單字是「鋼琴」？", ["violin", "guitar", "drum", "piano"], 3],
      ["🌸", "春天的英文是？", ["spring", "summer", "fall", "winter"], 0],
      ["✈️", "哪一個單字是「機場」？", ["station", "airport", "hospital", "library"], 1],
    ],
  },
  echo: {
    preA1: [
      ["🔊", "聽一聽，選出你聽到的單字。", ["book", "bag", "ball", "box"], 0, "book"],
      ["🔊", "聽一聽，選出你聽到的顏色。", ["green", "red", "blue", "white"], 2, "blue"],
      ["🔊", "聽一聽，選出你聽到的數字。", ["three", "five", "eight", "ten"], 1, "five"],
      ["🔊", "聽一聽，這是哪一位家人？", ["father", "mother", "sister", "brother"], 3, "brother"],
      ["🔊", "聽一聽，這是什麼動物？", ["cat", "dog", "fish", "bird"], 1, "dog"],
      ["🔊", "聽一聽，選出正確的食物。", ["cake", "rice", "egg", "milk"], 2, "egg"],
      ["🔊", "聽一聽，選出正確的教室物品。", ["chair", "desk", "pen", "ruler"], 3, "ruler"],
      ["🔊", "聽一聽，選出正確的天氣。", ["sunny", "rainy", "windy", "cloudy"], 1, "rainy"],
      ["🔊", "聽一聽，選出正確的身體部位。", ["eyes", "ears", "nose", "mouth"], 2, "nose"],
      ["🔊", "聽一聽，選出正確的招呼語。", ["Good morning.", "Good night.", "Goodbye.", "Thank you."], 0, "Good morning."],
    ],
    a1: [
      ["🔊", "聽一聽，他幾點起床？", ["six o'clock", "seven o'clock", "eight o'clock", "nine o'clock"], 1, "I get up at seven o'clock."],
      ["🔊", "聽一聽，她喜歡什麼？", ["baseball", "basketball", "soccer", "tennis"], 2, "She likes soccer."],
      ["🔊", "聽一聽，今天是星期幾？", ["Monday", "Tuesday", "Friday", "Sunday"], 2, "Today is Friday."],
      ["🔊", "聽一聽，他想吃什麼？", ["noodles", "rice", "pizza", "salad"], 0, "I want some noodles."],
      ["🔊", "聽一聽，東西在哪裡？", ["on the desk", "under the desk", "in the bag", "by the door"], 1, "It is under the desk."],
      ["🔊", "聽一聽，誰會游泳？", ["Amy", "Ben", "Cindy", "David"], 0, "Amy can swim."],
      ["🔊", "聽一聽，天氣如何？", ["hot", "cold", "warm", "cool"], 3, "It is cool today."],
      ["🔊", "聽一聽，他怎麼去學校？", ["by bus", "by bike", "on foot", "by car"], 0, "He goes to school by bus."],
      ["🔊", "聽一聽，這件衣服多少錢？", ["fifty dollars", "sixty dollars", "seventy dollars", "eighty dollars"], 2, "It is seventy dollars."],
      ["🔊", "聽一聽，她正在做什麼？", ["reading", "singing", "cooking", "drawing"], 3, "She is drawing a picture."],
    ],
  },
  story: {
    preA1: [
      ["👋", "A: Hello!  B: ______", ["Hello!", "Thank you.", "Good night.", "Sorry."], 0],
      ["🙂", "A: How are you?  B: ______", ["I'm fine.", "I'm seven.", "It's blue.", "Goodbye."], 0],
      ["🎂", "A: How old are you?  B: ______", ["I'm Amy.", "I'm nine.", "I'm happy.", "I'm here."], 1],
      ["🧒", "My name ______ Tom.", ["am", "are", "is", "be"], 2],
      ["🐶", "This is my dog. ______ name is Lucky.", ["My", "Your", "Its", "His"], 2],
      ["🎨", "The sun is ______.", ["yellow", "purple", "black", "pink"], 0],
      ["🏫", "I am a student. I go to ______.", ["school", "hospital", "farm", "zoo"], 0],
      ["🍕", "I like pizza. Pizza is my favorite ______.", ["color", "animal", "food", "number"], 2],
      ["👨‍👩‍👧", "This is my mother. She is my ______.", ["family", "teacher", "friend", "classmate"], 0],
      ["🌙", "It is time to sleep. We say ______.", ["Good morning.", "Good afternoon.", "Good night.", "Hello."], 2],
    ],
    a1: [
      ["🏀", "Kevin plays basketball after school. What does Kevin do after school?", ["He reads.", "He plays basketball.", "He swims.", "He cooks."], 1],
      ["🕖", "Mia gets up at seven. What time does Mia get up?", ["At six.", "At seven.", "At eight.", "At nine."], 1],
      ["🍜", "Leo is hungry. He wants noodles. What does Leo want?", ["Rice.", "Bread.", "Noodles.", "Soup."], 2],
      ["☔", "It is rainy today. Anna takes an umbrella. Why does she take it?", ["It is hot.", "It is rainy.", "It is windy.", "It is snowy."], 1],
      ["📚", "The library is next to the park. Where is the library?", ["Behind the school.", "Next to the park.", "In the zoo.", "Under the bridge."], 1],
      ["🐼", "Pandas are black and white. What color are pandas?", ["Brown.", "Black and white.", "Yellow.", "Gray."], 1],
      ["🎵", "Sam can sing, but he cannot dance. What can Sam do?", ["Dance.", "Swim.", "Sing.", "Cook."], 2],
      ["🚌", "We go to the museum by bus. How do we go there?", ["By train.", "By bus.", "By bike.", "On foot."], 1],
      ["🥛", "There are two bottles of milk on the table. How many bottles are there?", ["One.", "Two.", "Three.", "Four."], 1],
      ["👕", "This T-shirt is too small. I need a bigger one. What does the speaker need?", ["A smaller T-shirt.", "A bigger T-shirt.", "A hat.", "A jacket."], 1],
    ],
  },
  spell: {
    preA1: [
      ["🐶", "選出「狗」的正確拼字。", ["dgo", "dog", "god", "doog"], 1],
      ["📘", "選出「書」的正確拼字。", ["book", "boko", "bok", "boak"], 0],
      ["🔴", "選出「紅色」的正確拼字。", ["rade", "reed", "red", "rid"], 2],
      ["✏️", "選出「鉛筆」的正確拼字。", ["pencil", "pensil", "pencel", "pencill"], 0],
      ["🐟", "選出「魚」的正確拼字。", ["fesh", "fish", "fich", "fihs"], 1],
      ["3️⃣", "選出數字 3 的正確拼字。", ["tree", "three", "there", "thre"], 1],
      ["👧", "選出「姊妹」的正確拼字。", ["sister", "sistar", "sisetr", "sistor"], 0],
      ["🥛", "選出「牛奶」的正確拼字。", ["malk", "melk", "milk", "milc"], 2],
      ["🏠", "選出「房子」的正確拼字。", ["hause", "house", "houes", "hous"], 1],
      ["😊", "選出「快樂的」正確拼字。", ["happy", "hapy", "heppy", "happi"], 0],
    ],
    a1: [
      ["🍳", "選出「早餐」的正確拼字。", ["breakfest", "brekfast", "breakfast", "breakfasst"], 2],
      ["🌤️", "選出「天氣」的正確拼字。", ["whether", "weather", "wether", "weater"], 1],
      ["📚", "選出「圖書館」的正確拼字。", ["library", "libary", "librery", "libarary"], 0],
      ["🗓️", "選出「星期四」的正確拼字。", ["Thurday", "Thursday", "Thusday", "Thersday"], 1],
      ["🍝", "選出「餐廳」的正確拼字。", ["restaurant", "restarant", "restaurent", "resturant"], 0],
      ["🏊", "選出「游泳」的正確拼字。", ["swiming", "swimming", "swimingg", "swemming"], 1],
      ["🐘", "選出「大象」的正確拼字。", ["elefant", "elephent", "elephant", "elphant"], 2],
      ["🧥", "選出「夾克」的正確拼字。", ["jacket", "jaket", "jackit", "jackat"], 0],
      ["🌍", "選出「世界」的正確拼字。", ["world", "wordl", "werld", "wrold"], 0],
      ["🧑‍🏫", "選出「老師」的正確拼字。", ["techer", "teacher", "teachar", "teecher"], 1],
    ],
  },
  voice: {
    preA1: [
      ["🎙️", "遇到新朋友時，應該說哪一句？", ["Hello! My name is Amy.", "Good night.", "I'm hungry.", "It's a dog."], 0, "Hello! My name is Amy."],
      ["🎙️", "別人問 How are you?，你可以怎麼回答？", ["I'm fine, thank you.", "I'm eight.", "It's red.", "Goodbye."], 0, "I'm fine, thank you."],
      ["🎙️", "想介紹自己的年齡，應該說？", ["I am nine years old.", "I have nine books.", "It is nine.", "Nine is blue."], 0, "I am nine years old."],
      ["🎙️", "想說「這是我的媽媽」，應該說？", ["She is a teacher.", "This is my mother.", "I like my mother.", "Her name is Amy."], 1, "This is my mother."],
      ["🎙️", "想表達喜歡蘋果，應該說？", ["I see apples.", "I like apples.", "I have apples.", "I want red."], 1, "I like apples."],
      ["🎙️", "想詢問物品顏色，應該說？", ["What is this?", "How old are you?", "What color is it?", "Where are you?"], 2, "What color is it?"],
      ["🎙️", "想向別人道謝，應該說？", ["Sorry.", "Please.", "Thank you.", "Excuse me."], 2, "Thank you."],
      ["🎙️", "睡前應該說哪一句？", ["Good morning.", "Good afternoon.", "Good evening.", "Good night."], 3, "Good night."],
      ["🎙️", "想問「這是什麼？」，應該說？", ["Who is he?", "What is this?", "Where is it?", "How is it?"], 1, "What is this?"],
      ["🎙️", "離開時可以說哪一句？", ["Goodbye!", "Welcome!", "Come in!", "Sit down!"], 0, "Goodbye!"],
    ],
    a1: [
      ["🎙️", "想詢問現在時間，應該說？", ["What day is today?", "What time is it?", "How old are you?", "Where is it?"], 1, "What time is it?"],
      ["🎙️", "在餐廳想點一份漢堡，應該說？", ["I like hamburgers.", "I have a hamburger.", "I'd like a hamburger, please.", "The hamburger is big."], 2, "I'd like a hamburger, please."],
      ["🎙️", "想問洗手間在哪裡，應該說？", ["Where is the restroom?", "What is the restroom?", "Who is in the restroom?", "How is the restroom?"], 0, "Where is the restroom?"],
      ["🎙️", "想表達自己會游泳，應該說？", ["I like swimming.", "I can swim.", "I am swimming.", "I swim yesterday."], 1, "I can swim."],
      ["🎙️", "想問一件衣服多少錢，應該說？", ["How old is it?", "How many is it?", "How much is it?", "How tall is it?"], 2, "How much is it?"],
      ["🎙️", "想邀請朋友一起打球，應該說？", ["Let's play ball.", "I play ball.", "Do you have a ball?", "The ball is big."], 0, "Let's play ball."],
      ["🎙️", "想說今天是晴天，應該說？", ["It is Sunday.", "It is sunny today.", "I like the sun.", "Today is hot food."], 1, "It is sunny today."],
      ["🎙️", "想問對方最喜歡的科目，應該說？", ["What is your favorite subject?", "Where is your subject?", "Who is your teacher?", "When is your class?"], 0, "What is your favorite subject?"],
      ["🎙️", "想說自己每天七點起床，應該說？", ["I get up at seven every day.", "I go to bed at seven.", "I eat seven breakfasts.", "Seven is my number."], 0, "I get up at seven every day."],
      ["🎙️", "聽不清楚時，可以禮貌地說？", ["Speak now.", "Say it.", "Could you say that again?", "You are wrong."], 2, "Could you say that again?"],
    ],
  },
};

const missionBanks = {
  main: [
    ["🏫", "A: What's your name?  B: ______", ["I'm ten.", "My name is Leo.", "I'm fine.", "It's Leo's."], 1],
    ["👨‍👩‍👧", "This is my sister. ______ name is Tina.", ["His", "Her", "Its", "Your"], 1],
    ["🟢", "The frog is ______.", ["green", "purple", "white", "orange"], 0],
    ["📚", "I have two ______.", ["book", "books", "bookes", "a book"], 1],
    ["🕘", "It is nine ______.", ["clock", "o'clock", "time", "hour"], 1],
    ["🥪", "A: What do you want?  B: ______", ["I want a sandwich.", "I'm a sandwich.", "It is sandwich.", "I can sandwich."], 0],
    ["☀️", "A: How's the weather?  B: ______", ["It's sunny.", "It's Monday.", "It's yellow.", "It's five."], 0],
    ["⚽", "I can ______ soccer.", ["play", "plays", "playing", "played"], 0],
    ["🚌", "I go to school ______ bus.", ["in", "on", "by", "at"], 2],
    ["📍", "The ball is ______ the box.", ["under", "happy", "seven", "drink"], 0],
  ],
  support: [
    ["🔊", "選出正確的問候回應。", ["Good morning!", "I'm a book.", "It is five.", "Blue."], 0, "Good morning!"],
    ["🔊", "選出正確的自我介紹。", ["My name is Ben.", "This is red.", "I have seven.", "It is sunny."], 0, "My name is Ben."],
    ["🔊", "選出正確的年齡回答。", ["I'm happy.", "I'm ten years old.", "I'm a student desk.", "It's ten cats."], 1, "I'm ten years old."],
    ["🔊", "選出正確的喜好表達。", ["I like pizza.", "I am pizza.", "Pizza can swim.", "I pizza at seven."], 0, "I like pizza."],
    ["🔊", "選出正確的能力表達。", ["I can sing.", "I am sing.", "I singing can.", "Sing is me."], 0, "I can sing."],
    ["🔊", "選出正確的位置問句。", ["Where is my bag?", "What color old?", "How bag are?", "Who seven?"], 0, "Where is my bag?"],
    ["🔊", "選出正確的時間問句。", ["What time is it?", "What it time?", "How time are?", "Where clock?"], 0, "What time is it?"],
    ["🔊", "選出正確的點餐句。", ["I'd like some rice.", "Rice is I.", "I rice can.", "Some like rice I."], 0, "I'd like some rice."],
    ["🔊", "選出正確的道謝回應。", ["You're welcome.", "You are ten.", "It is welcome book.", "Welcome is blue."], 0, "You're welcome."],
    ["🔊", "選出禮貌請求重說的句子。", ["Could you say that again?", "Say again you could?", "Again is it?", "You say no."], 0, "Could you say that again?"],
  ],
  challenge: [
    ["🧩", "重新組合：is / Where / library / the / ?", ["Where the library is?", "Where is the library?", "The library where is?", "Is where the library?"], 1],
    ["🧩", "重新組合：do / What / like / you / ?", ["What you do like?", "Do what you like?", "What do you like?", "You like what do?"], 2],
    ["🧩", "重新組合：at / get / seven / I / up", ["I get up at seven.", "At seven up I get.", "I at seven get up.", "Get I up seven at."], 0],
    ["🧩", "選出 can 後方動詞使用正確的句子。", ["She can sings.", "She can sing.", "She cans sing.", "She sing can."], 1],
    ["🧩", "選出 doesn't 用法正確的句子。", ["He don't like milk.", "He doesn't likes milk.", "He doesn't like milk.", "He not like milk."], 2],
    ["🧩", "選出 There are 用法正確的句子。", ["There are two cats.", "There is two cats.", "There two cats are.", "Two cat there is."], 0],
    ["🧩", "想詢問衣服價格，選出正確問句。", ["How much is the T-shirt?", "How many is the T-shirt?", "How old T-shirt?", "What much it is?"], 0],
    ["🧩", "回答 What are you doing?，選出正確句子。", ["I read every day.", "I am reading.", "I can reading.", "I reading am."], 1],
    ["🧩", "介紹爸爸的職業，選出正確句子。", ["My father is a doctor.", "My father are doctor.", "My father a doctor is.", "My father be doctor."], 0],
    ["🧩", "想詢問生日日期，選出正確問句。", ["When is your birthday?", "When your birthday is?", "Is when birthday?", "Your birthday when?"], 0],
  ],
};

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
let gameState = null;

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
    ${renderTrainingMap(user)}
    ${renderMissions()}`;
}

function renderTrainingMap(user) {
  return `
    <section class="training-map">
      <div class="map-heading">
        <div>
          <span class="mission-tag">WonderGo 冒險區域</span>
          <h2>五大能力訓練館</h2>
          <p>Toki 已依照你的 ${escapeHTML(user.cefrLevel || "Pre-A1")} 程度準備任務。選一座場館，完成 10 題獲得 XP！</p>
        </div>
        <img src="assets/toki.png" alt="Toki 指引訓練館地圖" />
      </div>
      <div class="map-path" aria-hidden="true"></div>
      <div class="map-locations">
        ${abilities.map((ability, index) => `
          <button class="map-location location-${index + 1}" data-ability="${ability.id}" style="--hall-color:${ability.color}">
            <span class="map-pin">${index + 1}</span>
            <span class="hall-art">${ability.scene}</span>
            <span class="hall-copy">
              <strong>${ability.name}</strong>
              <small>${ability.description}</small>
              <em>進入場館・10 題</em>
            </span>
          </button>`).join("")}
      </div>
    </section>`;
}

function renderMissions() {
  const missions = [
    ["main", "主線任務", "晨光鎮通行考驗", "運用國小常見單字與句型，修復城鎮通道。", "句型綜合題"],
    ["support", "補強任務", "回音訊號救援", "聽懂並選出正確的日常對話，補充聲音雷達。", "聽說應用題"],
    ["challenge", "極限挑戰", "語序機關迷宮", "重新組合句子，破解高難度的語言機關。", "句型排列題"],
  ];
  return `
    <div class="section-title"><div><h2>今日推薦</h2><p>Toki 根據你的能力表現安排了三組不同題目。</p></div></div>
    <section class="mission-grid">
      ${missions.map((mission) => `<article class="card mission"><div class="mission-head"><span class="mission-tag">${mission[1]}</span><b>${mission[4]}</b></div><h3>${mission[2]}</h3><p>${mission[3]}</p><button class="secondary-btn mission-game" data-mission="${mission[0]}">前往任務</button></article>`).join("")}
    </section>`;
}

function renderTraining(user) {
  return `
    ${playerHeader(user, "五大能力訓練館", "每座場館依照你的程度提供 10 題國小英語練習。")}
    ${renderTrainingMap(user)}
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
    <section class="card empty-page"><div><div class="big-icon">${icon}</div><h2>${subtitle}</h2><p style="color:var(--muted)">${body}</p><button class="primary-btn" data-page="training">前往五大訓練館</button></div></section>`;
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

function getLevelKey(user) {
  return String(user.cefrLevel || "Pre-A1").startsWith("Pre") ? "preA1" : "a1";
}

function normalizeQuestion(question) {
  return {
    visual: question[0],
    prompt: question[1],
    options: question[2],
    answer: question[3],
    speech: question[4] || "",
  };
}

function startGame(mode, id) {
  const user = currentUser();
  const isMission = mode === "mission";
  const ability = isMission
    ? { main: "story", support: "echo", challenge: "spell" }[id]
    : id;
  const abilityInfo = abilities.find((item) => item.id === ability);
  const source = isMission
    ? missionBanks[id]
    : questionBanks[id][getLevelKey(user)];

  gameState = {
    mode,
    id,
    ability,
    title: isMission
      ? { main: "晨光鎮通行考驗", support: "回音訊號救援", challenge: "語序機關迷宮" }[id]
      : abilityInfo.name,
    color: abilityInfo.color,
    questions: source.slice(0, 10).map(normalizeQuestion),
    index: 0,
    correct: 0,
    answered: false,
    selected: null,
    synced: false,
  };
  document.body.insertAdjacentHTML("beforeend", renderGameModal());
  bindGameModalEvents();
}

function renderGameModal() {
  return `<div class="game-modal" id="game-modal">${renderGameCard()}</div>`;
}

function renderGameCard() {
  if (gameState.index >= gameState.questions.length) {
    const xp = 20 + gameState.correct * 5;
    return `
      <article class="game-card result-card">
        <div class="result-burst">🏆</div>
        <span class="mission-tag">訓練完成</span>
        <h2>${gameState.title}過關！</h2>
        <p>你完成了 10 題練習，答對 <strong>${gameState.correct}</strong> 題。</p>
        <div class="result-xp">＋${xp} XP</div>
        <button class="primary-btn wide" id="claim-result">領取經驗值</button>
      </article>`;
  }

  const question = gameState.questions[gameState.index];
  const progress = ((gameState.index + 1) / gameState.questions.length) * 100;
  const needsAudio = Boolean(question.speech);
  return `
    <article class="game-card" style="--game-color:${gameState.color}">
      <header>
        <div><span class="mission-tag">${gameState.title}</span><small>第 ${gameState.index + 1}／10 題</small></div>
        <button class="ghost-btn" id="close-game" aria-label="離開題目">✕</button>
      </header>
      <div class="game-progress"><span style="width:${progress}%;background:${gameState.color}"></span></div>
      <div class="question-image">${question.visual}</div>
      ${needsAudio ? `<button class="listen-button" id="play-question" data-speech="${escapeHTML(question.speech)}">🔊 播放英語</button>` : ""}
      <h2>${question.prompt}</h2>
      <div class="options">
        ${question.options.map((option, index) => {
          let stateClass = "";
          if (gameState.answered && index === question.answer) stateClass = "correct";
          if (gameState.answered && index === gameState.selected && index !== question.answer) stateClass = "wrong";
          return `<button class="option answer-option ${stateClass}" data-answer="${index}" ${gameState.answered ? "disabled" : ""}>${option}</button>`;
        }).join("")}
      </div>
      ${gameState.answered ? `
        <div class="answer-feedback ${gameState.selected === question.answer ? "success" : "retry"}">
          <b>${gameState.selected === question.answer ? "答對了！" : "再記一次就會了！"}</b>
          <span>正確答案：${question.options[question.answer]}</span>
        </div>
        <button class="primary-btn wide" id="next-question">${gameState.index === 9 ? "查看訓練成果" : "下一題"}</button>
      ` : ""}
    </article>`;
}

function speakEnglish(text) {
  if (!("speechSynthesis" in window)) return toast("這個瀏覽器暫不支援語音播放。");
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function refreshGameModal() {
  const modal = document.getElementById("game-modal");
  if (!modal) return;
  modal.innerHTML = renderGameCard();
  bindGameModalEvents();
}

async function claimGameResult() {
  if (gameState.synced) return;
  gameState.synced = true;
  const claimButton = document.getElementById("claim-result");
  if (claimButton) {
    claimButton.disabled = true;
    claimButton.textContent = "經驗值領取中...";
  }
  const user = currentUser();
  const xp = 20 + gameState.correct * 5;
  const score = gameState.correct * 10;

  try {
    if (user.cloud) {
      const updated = await Cloud.recordLearning(gameState.ability, xp, score);
      user.xp = updated.xp;
    } else {
      user.xp = (user.xp || 0) + xp;
    }
    saveData();
    currentPage = "home";
    document.getElementById("game-modal")?.remove();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast(`訓練完成！獲得 ${xp} XP`);
  } catch {
    gameState.synced = false;
    if (claimButton) {
      claimButton.disabled = false;
      claimButton.textContent = "重新領取經驗值";
    }
    toast("成績已保留，但雲端同步暫時失敗。");
  }
}

function bindGameModalEvents() {
  document.getElementById("close-game")?.addEventListener("click", () => {
    window.speechSynthesis?.cancel();
    document.getElementById("game-modal")?.remove();
  });
  document.getElementById("play-question")?.addEventListener("click", (event) => {
    speakEnglish(event.currentTarget.dataset.speech);
  });
  document.querySelectorAll(".answer-option").forEach((button) => button.addEventListener("click", () => {
    if (gameState.answered) return;
    const selected = Number(button.dataset.answer);
    gameState.selected = selected;
    gameState.answered = true;
    if (selected === gameState.questions[gameState.index].answer) gameState.correct += 1;
    refreshGameModal();
  }));
  document.getElementById("next-question")?.addEventListener("click", () => {
    gameState.index += 1;
    gameState.answered = false;
    gameState.selected = null;
    refreshGameModal();
  });
  document.getElementById("claim-result")?.addEventListener("click", claimGameResult);
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

  document.querySelectorAll(".map-location").forEach((button) => button.addEventListener("click", () => {
    startGame("ability", button.dataset.ability);
  }));

  document.querySelectorAll(".mission-game").forEach((button) => button.addEventListener("click", () => {
    startGame("mission", button.dataset.mission);
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
