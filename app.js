const STORAGE_KEY = "wondergo-prototype-v1";

const abilities = [
  { id: "word", name: "語彙晶石礦場", shortName: "語彙能量", en: "Word Power", icon: "◆", scene: "💎", color: "#6c4ee3", value: 82, trend: "+6%", description: "收集單字晶石，啟動冒險裝備" },
  { id: "echo", name: "回音雷達塔", shortName: "聲音雷達", en: "Echo Sense", icon: "◖", scene: "📡", color: "#22b8ae", value: 64, trend: "+12%", description: "接收英語訊號，辨識聲音線索" },
  { id: "story", name: "故事解碼森林", shortName: "解碼視野", en: "Story Vision", icon: "◉", scene: "📜", color: "#4e8cf7", value: 76, trend: "+5%", description: "閱讀地圖與故事，破解任務密碼" },
  { id: "spell", name: "魔法拼字工坊", shortName: "拼字工藝", en: "Spell Craft", icon: "✦", scene: "⚙️", color: "#ef9f2f", value: 71, trend: "+3%", description: "組合字母零件，修復語言機關" },
  { id: "voice", name: "勇者語音競技場", shortName: "語音引擎", en: "Voice Power", icon: "◍", scene: "🎙️", color: "#f06d73", value: 48, trend: "+8%", description: "開口回應角色，啟動語音引擎" },
];

const curriculumCompetencies = [
  {
    ability: "echo",
    domain: "聽力理解",
    codes: "1-Ⅲ-6、1-Ⅲ-9、1-Ⅲ-10",
    statement: "能聽懂課堂字詞、簡易句型與日常生活對話。",
    content: "Ab-Ⅲ 語音、Ac-Ⅲ 字詞與生活用語",
    activity: "安排短句聽辨、關鍵字圈選與日常對話配對；同一語料採慢速、正常速度兩輪練習。",
  },
  {
    ability: "voice",
    domain: "口語表達",
    codes: "2-Ⅲ-2、2-Ⅲ-6、2-Ⅲ-7",
    statement: "能說出所學字詞，使用日常生活用語並作簡易回答與描述。",
    content: "B-Ⅲ-2 國小階段字詞及句型的生活溝通",
    activity: "以句型支架進行兩人問答、圖片描述及角色扮演，每次練習保留一次重新錄音機會。",
  },
  {
    ability: "story",
    domain: "閱讀理解",
    codes: "3-Ⅲ-1、3-Ⅲ-4、3-Ⅲ-6",
    statement: "能辨識所學字詞，看懂課堂句子及簡易短文主要內容。",
    content: "Ac-Ⅲ-4 國小階段所學字詞、Ae-Ⅲ-1 簡易短文與故事",
    activity: "先用圖片與標題預測，再進行主旨、細節及句意配對；錯題回到原句標記關鍵線索。",
  },
  {
    ability: "spell",
    domain: "拼寫與書寫",
    codes: "4-Ⅲ-3、4-Ⅲ-4、5-Ⅲ-10",
    statement: "能拼寫基本常用字詞，依圖示填寫字詞並運用拼讀規則拼寫。",
    content: "Ab-Ⅲ-5 字母拼讀規則、Ac-Ⅲ-4 國小階段所學字詞",
    activity: "將易錯字依音節切分，進行聽音選字、缺字填空與完整拼寫，隔日再做一次延宕複習。",
  },
  {
    ability: "word",
    domain: "字詞與綜合應用",
    codes: "5-Ⅲ-1、5-Ⅲ-3、7-Ⅲ-1",
    statement: "能認讀與聽寫國小字詞，理解基本句型並運用字詞聯想學習新詞。",
    content: "Ac-Ⅲ-4 國小階段所學字詞、B-Ⅲ-2 生活溝通",
    activity: "依主題建立字詞網絡，搭配圖像、例句與分類任務；新詞須放入簡易句型再次運用。",
  },
];

const textbookBookUnits = {
  "第 1 冊": ["Starter Unit 字母與問候", "Unit 1 自我介紹", "Unit 2 教室物品", "Unit 3 顏色與數字", "Review 1", "Unit 4 動物", "Unit 5 家人", "Review 2", "Culture / Festival 文化節慶"],
  "第 2 冊": ["Starter Unit 複習與暖身", "Unit 1 學用品與位置", "Unit 2 食物與喜好", "Unit 3 身體部位", "Review 1", "Unit 4 能力與動作", "Unit 5 服裝與顏色", "Review 2", "Culture / Festival 文化節慶"],
  "第 3 冊": ["Starter Unit 日常問候", "Unit 1 人物與朋友", "Unit 2 年齡與數字", "Unit 3 家人與職業", "Review 1", "Unit 4 房間與居家", "Unit 5 天氣", "Review 2", "Culture / Festival 文化節慶"],
  "第 4 冊": ["Starter Unit 句型複習", "Unit 1 時間與作息", "Unit 2 星期與活動", "Unit 3 地點與方向", "Review 1", "Unit 4 食物與點餐", "Unit 5 動物與特徵", "Review 2", "Culture / Festival 文化節慶"],
  "第 5 冊": ["Starter Unit 基礎句型整合", "Unit 1 個性與外貌", "Unit 2 校園生活", "Unit 3 休閒活動", "Review 1", "Unit 4 交通工具", "Unit 5 社區場所", "Review 2", "Culture / Festival 文化節慶"],
  "第 6 冊": ["Starter Unit 生活英語暖身", "Unit 1 國家與城市", "Unit 2 日期與節日", "Unit 3 健康與感受", "Review 1", "Unit 4 購物與價格", "Unit 5 旅行與計畫", "Review 2", "Culture / Festival 文化節慶"],
  "第 7 冊": ["Starter Unit 國中銜接複習", "Unit 1 自我與校園", "Unit 2 家庭與日常", "Unit 3 食物與健康", "Review 1", "Unit 4 地點與交通", "Unit 5 興趣與活動", "Review 2", "Reading Challenge 閱讀挑戰"],
  "第 8 冊": ["Starter Unit 進階句型暖身", "Unit 1 過去經驗", "Unit 2 未來計畫", "Unit 3 比較與描述", "Review 1", "Unit 4 文化與節慶", "Unit 5 專題任務", "Review 2", "Graduation Project 畢業任務"],
};

const textbookCatalog = {
  康軒: textbookBookUnits,
  翰林: textbookBookUnits,
  何嘉仁: textbookBookUnits,
  自編教材: {
    "主題課程": ["主題式單字", "生活情境對話", "閱讀與故事", "跨領域任務", "專題發表"],
  },
};

const levelMilestones = [
  { level: 1, xp: 0, title: "初航探索者" },
  { level: 2, xp: 200, title: "晶石收集員" },
  { level: 3, xp: 500, title: "回音偵察員" },
  { level: 4, xp: 900, title: "故事解碼員" },
  { level: 5, xp: 1400, title: "語宙冒險家" },
  { level: 6, xp: 2100, title: "星際領航員" },
  { level: 7, xp: 3000, title: "Wonder 大師" },
];

const worldThemes = [
  {
    id: "colors", name: "顏色國", en: "Color Kingdom", icon: "🎨", color: "#f06d73",
    description: "讓彩虹重新發光，學會描述身邊的顏色。",
    words: [["🔴", "red", "紅色"], ["🔵", "blue", "藍色"], ["🟡", "yellow", "黃色"], ["🟢", "green", "綠色"], ["🟠", "orange", "橘色"], ["🟣", "purple", "紫色"], ["⚫", "black", "黑色"], ["⚪", "white", "白色"], ["🩷", "pink", "粉紅色"], ["🤎", "brown", "棕色"]],
  },
  {
    id: "animals", name: "動物王國", en: "Animal Kingdom", icon: "🦁", color: "#ef9f2f",
    description: "聽懂動物朋友的名字，完成森林觀察任務。",
    words: [["🐶", "dog", "狗"], ["🐱", "cat", "貓"], ["🐰", "rabbit", "兔子"], ["🐦", "bird", "鳥"], ["🐟", "fish", "魚"], ["🐘", "elephant", "大象"], ["🦁", "lion", "獅子"], ["🐵", "monkey", "猴子"], ["🐼", "panda", "貓熊"], ["🐯", "tiger", "老虎"]],
  },
  {
    id: "family", name: "家人島", en: "Family Island", icon: "🏡", color: "#e46f9b",
    description: "拜訪溫暖的家人島，練習介紹自己的家人。",
    words: [["👩", "mother", "媽媽"], ["👨", "father", "爸爸"], ["👧", "sister", "姊妹"], ["👦", "brother", "兄弟"], ["👵", "grandmother", "祖母"], ["👴", "grandfather", "祖父"], ["👶", "baby", "嬰兒"], ["👨‍👩‍👧", "family", "家人"], ["🧒", "child", "孩子"], ["👫", "parents", "父母"]],
  },
  {
    id: "school", name: "校園城", en: "School City", icon: "🏫", color: "#6c4ee3",
    description: "探索教室與校園，收集每天都會用到的單字。",
    words: [["📘", "book", "書"], ["✏️", "pencil", "鉛筆"], ["📏", "ruler", "尺"], ["🎒", "schoolbag", "書包"], ["🪑", "chair", "椅子"], ["🖥️", "computer", "電腦"], ["🧑‍🏫", "teacher", "老師"], ["🧑‍🎓", "student", "學生"], ["📚", "library", "圖書館"], ["🏫", "classroom", "教室"]],
  },
  {
    id: "food", name: "美食樂園", en: "Food Land", icon: "🍔", color: "#f08b3e",
    description: "走進香氣滿滿的市集，用英語選出喜歡的食物。",
    words: [["🍎", "apple", "蘋果"], ["🍌", "banana", "香蕉"], ["🍚", "rice", "米飯"], ["🍞", "bread", "麵包"], ["🥛", "milk", "牛奶"], ["🥚", "egg", "蛋"], ["🍕", "pizza", "披薩"], ["🍔", "hamburger", "漢堡"], ["🍜", "noodles", "麵"], ["🥤", "juice", "果汁"]],
  },
  {
    id: "body", name: "身體星球", en: "Body Planet", icon: "🖐️", color: "#22b8ae",
    description: "啟動健康掃描器，認識身體各部位的英文。",
    words: [["🙂", "head", "頭"], ["👀", "eyes", "眼睛"], ["👂", "ears", "耳朵"], ["👃", "nose", "鼻子"], ["👄", "mouth", "嘴巴"], ["🖐️", "hand", "手"], ["🦶", "foot", "腳"], ["💪", "arm", "手臂"], ["🦵", "leg", "腿"], ["🦷", "teeth", "牙齒"]],
  },
  {
    id: "weather", name: "天氣天空城", en: "Weather Sky", icon: "🌤️", color: "#4e8cf7",
    description: "讀懂天空訊號，成為能預報天氣的小小觀測員。",
    words: [["☀️", "sunny", "晴朗的"], ["🌧️", "rainy", "下雨的"], ["☁️", "cloudy", "多雲的"], ["💨", "windy", "有風的"], ["❄️", "snowy", "下雪的"], ["🥵", "hot", "炎熱的"], ["🥶", "cold", "寒冷的"], ["🌡️", "warm", "溫暖的"], ["🍃", "cool", "涼爽的"], ["🌈", "rainbow", "彩虹"]],
  },
  {
    id: "home", name: "居家小鎮", en: "Home Town", icon: "🛋️", color: "#9a6ad8",
    description: "走訪每個房間，用英語找到家中的物品與空間。",
    words: [["🛏️", "bedroom", "臥室"], ["🍳", "kitchen", "廚房"], ["🛁", "bathroom", "浴室"], ["🛋️", "living room", "客廳"], ["🚪", "door", "門"], ["🪟", "window", "窗戶"], ["🛏️", "bed", "床"], ["🪑", "table", "桌子"], ["💡", "lamp", "燈"], ["🏠", "house", "房子"]],
  },
  {
    id: "transport", name: "交通港", en: "Transport Harbor", icon: "🚂", color: "#2b9cb8",
    description: "取得各種交通工具的通行證，準備環遊 WonderGo。",
    words: [["🚗", "car", "汽車"], ["🚌", "bus", "公車"], ["🚲", "bike", "腳踏車"], ["🚂", "train", "火車"], ["✈️", "airplane", "飛機"], ["🚢", "ship", "船"], ["🚕", "taxi", "計程車"], ["🛵", "scooter", "機車"], ["🚇", "subway", "捷運"], ["🚶", "walk", "走路"]],
  },
  {
    id: "time", name: "時間之塔", en: "Time Tower", icon: "🕰️", color: "#7368c9",
    description: "修復時間之塔，學會數字、星期與日常時間。",
    words: [["🌅", "morning", "早上"], ["☀️", "afternoon", "下午"], ["🌙", "evening", "傍晚"], ["🌌", "night", "夜晚"], ["📅", "Monday", "星期一"], ["🗓️", "Friday", "星期五"], ["⏰", "o'clock", "整點"], ["🕐", "one", "一"], ["🕖", "seven", "七"], ["🕛", "twelve", "十二"]],
  },
];

const worldStages = [
  { id: "listen", name: "聲音偵察", label: "聽", icon: "🎧", ability: "echo", description: "聽英語，找出正確單字" },
  { id: "speak", name: "勇敢開口", label: "說", icon: "🎙️", ability: "voice", description: "選出情境句，跟著大聲說" },
  { id: "read", name: "圖文解碼", label: "讀", icon: "📖", ability: "story", description: "看圖片與中文，辨認英文" },
  { id: "write", name: "拼字工坊", label: "寫", icon: "✏️", ability: "spell", description: "辨認正確拼字，修復文字" },
];

const cefrProgression = [
  { level: "Pre-A1", title: "啟航新手", target: "聽懂與認讀國小基礎單字、問候語和短句。", xp: 0 },
  { level: "A1", title: "日常溝通者", target: "能用簡短句子完成自我介紹、喜好、家庭與校園情境。", xp: 500 },
  { level: "A2", title: "任務冒險家", target: "能理解較長指令與短文，並用句型完成生活任務。", xp: 1400 },
  { level: "B1", title: "故事探索者", target: "能整理資訊、描述經驗，並進行簡短說明與發表。", xp: 3000 },
  { level: "B2", title: "語宙領航員", target: "能跨主題整合閱讀、聽力與口說，表達較完整觀點。", xp: 5200 },
];

const autonomousChallengeRoutes = [
  { id: "echo", label: "聽力挑戰", action: "聽懂訊號", icon: "🎧", reward: "回音偵察徽章", copy: "辨識單字、句子與角色指令，提升聲音雷達。" },
  { id: "voice", label: "口說挑戰", action: "勇敢開口", icon: "🎙️", reward: "勇敢開口徽章", copy: "跟著情境句開口說，累積語音引擎能量。" },
  { id: "story", label: "閱讀挑戰", action: "破解線索", icon: "📖", reward: "故事解碼徽章", copy: "讀圖片、短句與故事線索，強化解碼視野。" },
  { id: "spell", label: "拼寫挑戰", action: "修復文字", icon: "✏️", reward: "拼字工藝徽章", copy: "辨認正確拼字與句型，修復語言裝置。" },
  { id: "word", label: "單字挑戰", action: "收集晶石", icon: "💎", reward: "語彙晶石徽章", copy: "收集國小核心字詞，讓 Word Power 穩定升級。" },
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
let recoveryToken = "";
let currentPage = "home";
let selectedStudent = -1;
let selectedAnalyticsStudent = -1;
let selectedClassKey = "";
let cloudStudents = [];
let staffDashboard = null;
let adminAccountFilter = "all";
let gameState = null;
let selectedWorldCountry = null;
let selectedPrepVersion = "康軒";
let selectedPrepBook = Object.keys(textbookCatalog["康軒"])[0];
let selectedPrepUnit = textbookCatalog["康軒"][selectedPrepBook][0];
let prepSourceText = "";
let selectedPreviewStudent = 0;
let selectedCoursePackId = "";
let teacherContent = { materials: [], assignments: [], packs: [] };
let playerAssignments = [];

const recoveryParams = new URLSearchParams(window.location.hash.slice(1));
if (recoveryParams.get("type") === "recovery" && recoveryParams.get("access_token")) {
  recoveryToken = recoveryParams.get("access_token");
  authMode = "reset";
  window.history.replaceState({}, document.title, window.location.pathname);
}

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

function isStaffRole(role) {
  return role === "teacher" || role === "admin";
}

function emptyAbilityValues() {
  return { word: 0, echo: 0, story: 0, spell: 0, voice: 0 };
}

function playerAbilities(user = currentUser()) {
  const values = user?.abilityValues || emptyAbilityValues();
  const trends = user?.abilityTrends || emptyAbilityValues();
  return abilities.map((ability) => ({
    ...ability,
    name: ability.shortName,
    value: Math.max(0, Math.min(100, Number(values[ability.id]) || 0)),
    trendValue: Number(trends[ability.id]) || 0,
  }));
}

async function refreshPlayerLearning(user) {
  if (!user?.cloud || user.role !== "player") return;
  try {
    const [learning, assignments] = await Promise.all([
      Cloud.loadPlayerLearningData(),
      Cloud.loadPlayerAssignments(),
    ]);
    Object.assign(user, learning);
    playerAssignments = assignments;
    saveData();
  } catch (error) {
    toast(`能力資料同步失敗：${error.message}`);
  }
}

function activeStudents() {
  if (!currentUser()?.cloud) return demoStudents;
  const classroom = selectedTeacherClass();
  return classroom ? classroom.students : cloudStudents;
}

function teacherClasses() {
  return staffDashboard?.classes || [];
}

function selectedTeacherClass() {
  const classes = teacherClasses();
  if (!classes.length) return null;
  const user = currentUser();
  const defaultKey = `${user?.school || ""}::${user?.className || ""}`;
  return classes.find((classroom) => classroom.key === selectedClassKey)
    || classes.find((classroom) => classroom.key === defaultKey)
    || classes[0];
}

async function refreshTeacherStudents(user) {
  if (!user?.cloud || !isStaffRole(user.role)) return;
  try {
    staffDashboard = await Cloud.loadStaffDashboard();
    cloudStudents = staffDashboard.students;
    if (!selectedClassKey) selectedClassKey = selectedTeacherClass()?.key || "";
  } catch (error) {
    toast(`學生資料同步失敗：${error.message}`);
    return;
  }
  if (user.role === "teacher") {
    try {
      teacherContent = await Cloud.loadTeacherContent();
    } catch (error) {
      teacherContent = { materials: [], assignments: [], packs: [] };
      toast(`教材資料同步失敗：${error.message}`);
    }
  }
}

async function refreshUserCloudData(user) {
  return isStaffRole(user?.role)
    ? refreshTeacherStudents(user)
    : refreshPlayerLearning(user);
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
  const isForgot = authMode === "forgot";
  const isReset = authMode === "reset";
  const cloudReady = Cloud.isConfigured();
  return `
    <main class="auth-shell ${isRegister || isForgot || isReset ? "auth-register" : ""}">
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
          <h2>${isReset ? "設定新密碼" : isForgot ? "忘記密碼" : isRegister ? `建立${isTeacher ? "教師" : "玩家"}帳號` : "歡迎回來！"}</h2>
          <p>${isReset ? "請設定一組新的安全密碼。" : isForgot ? "輸入教師註冊時使用的信箱，我們會寄送安全重設連結。" : isRegister ? "填寫基本資料，準備展開 WonderGo 旅程。" : "登入後從上一次的冒險紀錄繼續。"}</p>
          <div class="role-switch ${isReset ? "hidden" : ""}">
            <button data-role="player" class="${!isTeacher ? "active" : ""}">玩家入口</button>
            <button data-role="teacher" class="${isTeacher ? "active" : ""}">教師入口</button>
          </div>
          <div class="auth-switch ${isForgot || isReset ? "hidden" : ""}">
            <button data-mode="login" class="${!isRegister ? "active" : ""}">登入</button>
            <button data-mode="register" class="${isRegister ? "active" : ""}">第一次註冊</button>
          </div>
          ${isReset ? renderResetPasswordForm() : isForgot ? renderForgotPasswordForm() : isRegister ? renderRegisterForm(isTeacher) : renderLoginForm(isTeacher)}
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
        <label>${isTeacher ? "教師帳號或註冊信箱" : "玩家帳號"}</label>
        <input name="account" autocomplete="username" placeholder="${isTeacher ? "新教師請使用註冊信箱" : "請輸入帳號"}" required />
      </div>
      <div class="field">
        <label>密碼</label>
        <input name="password" type="password" autocomplete="current-password" placeholder="請輸入密碼" required />
      </div>
      <button class="primary-btn wide" type="submit">登入，繼續冒險</button>
      <button class="text-button" type="button" data-mode="forgot">忘記密碼？使用註冊信箱重設</button>
    </form>`;
}

function renderForgotPasswordForm() {
  return `
    <form id="forgot-password-form">
      <div class="field">
        <label>教師註冊信箱</label>
        <input name="email" type="email" autocomplete="email" placeholder="teacher@example.com" required />
        <small class="field-help">為保護帳號，無論信箱是否存在都會顯示相同完成訊息。</small>
      </div>
      <button class="primary-btn wide" id="forgot-submit" type="submit">寄送密碼重設信</button>
      <button class="text-button" type="button" data-mode="login">返回登入</button>
    </form>`;
}

function renderResetPasswordForm() {
  return `
    <form id="reset-password-form">
      <div class="field">
        <label>新密碼</label>
        <input name="password" type="password" autocomplete="new-password" minlength="8" maxlength="72" placeholder="至少 8 個字元" required />
      </div>
      <div class="field">
        <label>再次確認新密碼</label>
        <input name="confirmPassword" type="password" autocomplete="new-password" minlength="8" maxlength="72" required />
      </div>
      <button class="primary-btn wide" id="reset-submit" type="submit">更新密碼</button>
    </form>`;
}

function renderRegisterForm(isTeacher) {
  const minimumPasswordLength = Cloud.isConfigured() ? 8 : 4;
  return `
    <form id="register-form">
      <div class="form-grid">
        <div class="field full"><label>學校</label><input name="school" placeholder="例：晨光國小" required /></div>
        <div class="field"><label>${isTeacher ? "教學班級" : "班級"}</label><input name="className" placeholder="例：六年一班" required /></div>
        ${isTeacher ? "" : '<div class="field"><label>座號</label><input name="seat" placeholder="例：08" required /></div>'}
        <div class="field ${isTeacher ? "" : ""}"><label>真實姓名</label><input name="realName" placeholder="僅教師與管理員可見" required /></div>
        ${isTeacher ? '<div class="field full"><label>教師信箱</label><input name="email" type="email" autocomplete="email" placeholder="用於登入及忘記密碼" required /><small class="field-help">註冊完成後，請使用此信箱登入。</small></div>' : ""}
        <div class="field ${isTeacher ? "" : "full"}">
          <label>${isTeacher ? "教師帳號" : "玩家帳號"}</label>
          <input name="account" autocomplete="username" placeholder="設定下次登入帳號" required />
          ${isTeacher ? "" : '<small style="color:var(--muted)">玩家帳號將直接作為遊戲中的公開顯示名稱。</small>'}
        </div>
        <div class="field full">
          <label for="register-password">密碼</label>
          <div class="password-field">
            <input id="register-password" name="password" type="password" autocomplete="new-password" minlength="${minimumPasswordLength}" maxlength="72" placeholder="至少 ${minimumPasswordLength} 個字元" aria-describedby="password-help" required />
            <button class="password-toggle" type="button" data-password-toggle="register-password" aria-label="顯示密碼">顯示</button>
          </div>
          <small id="password-help" class="field-help">請輸入至少 ${minimumPasswordLength} 個字元。</small>
        </div>
        <div class="field full">
          <label for="register-confirm-password">再次確認密碼</label>
          <div class="password-field">
            <input id="register-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" minlength="${minimumPasswordLength}" maxlength="72" aria-describedby="password-match-help" required />
            <button class="password-toggle" type="button" data-password-toggle="register-confirm-password" aria-label="顯示確認密碼">顯示</button>
          </div>
          <small id="password-match-help" class="field-help">請再次輸入相同密碼。</small>
        </div>
      </div>
      <button class="primary-btn wide" id="register-submit" type="submit">完成註冊，進入 WonderGo</button>
    </form>`;
}

function renderApp() {
  const user = currentUser();
  const isTeacher = isStaffRole(user.role);
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
    ["world", "◎", "世界地圖"],
    ["wrongbook", "▣", "我的錯題本"],
    ["report", "▤", "托奇週報"],
  ];
  const teacherNav = [
    ["overview", "▦", "班級總覽"],
    ["students", "♙", "學生學習狀況"],
    ["prep", "▧", "備課中心"],
    ["library", "▤", "教材管理"],
    ["content", "✓", "任務派發中心"],
    ["preview", "◉", "學生端預覽"],
    ["analytics", "⌁", "教學成效"],
  ];
  const adminNav = [
    ["overview", "▦", "平台總覽"],
    ["accounts", "♙", "帳號與申請"],
    ["classes", "⌂", "班級配對"],
    ["analytics", "⌁", "全平台學習成效"],
  ];
  const nav = user.role === "admin" ? adminNav : isTeacher ? teacherNav : playerNav;
  return `
    <aside class="sidebar">
      <div class="logo"><span class="logo-mark">W</span> WonderGo</div>
      <nav class="nav">
        ${nav.map(([id, icon, label]) => `<button data-page="${id}" class="${currentPage === id || (currentPage === "home" && id === "overview" && isTeacher) ? "active" : ""}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}
        <button id="logout"><span class="nav-icon">↪</span>登出</button>
      </nav>
      <div class="sidebar-user">
        <span class="avatar">${escapeHTML((isTeacher ? user.realName : user.account).slice(0, 1))}</span>
        <div><strong>${escapeHTML(isTeacher ? user.realName : user.account)}</strong><small>${isTeacher ? (user.role === "admin" ? "WonderGo 管理員" : `${user.className} 教師`) : `Lv.${levelForXp(user.xp || 0).level} 探索者`}</small></div>
      </div>
    </aside>`;
}

function playerHeader(user, title, subtitle) {
  const weeklyPoints = user.weeklySummary?.xpEarned || 0;
  const streak = user.streakDays || 0;
  const derivedLevel = levelForXp(user.xp || 0).level;
  return `
    <header class="topbar">
      <div><h1>${title}</h1><p>${subtitle}</p></div>
      <div class="top-stats">
        <span class="stat-pill">🔥 連續 ${streak} 天</span>
        <span class="stat-pill">✦ 本週 ${weeklyPoints} 分</span>
        <span class="stat-pill">🏅 Lv.${derivedLevel}</span>
      </div>
    </header>`;
}

function renderPlayerPage(user) {
  if (currentPage === "training") return renderTraining(user);
  if (currentPage === "ability") return renderPlayerHome(user);
  if (currentPage === "world") return renderWorldPage(user);
  if (currentPage === "wrongbook") return renderWrongBook(user);
  if (currentPage === "report") return renderReport(user);
  return renderPlayerHome(user);
}

function renderPlayerHome(user) {
  return `
    ${playerHeader(user, `嗨，${escapeHTML(user.account)}！`, "今天也和 Toki 一起前進一點吧。")}
    ${renderPlayerMomentum(user)}
    ${renderLevelJourney(user)}
    ${renderAutonomousChallengeHub(user)}
    ${renderTrainingMap(user)}
    ${renderPlayerAssignments()}
    ${renderMissions()}
    ${renderAbilityDashboard(user)}
    ${renderThemeBadges(user)}`;
}

function levelForXp(xp) {
  return [...levelMilestones].reverse().find((milestone) => xp >= milestone.xp)
    || levelMilestones[0];
}

function renderPlayerMomentum(user) {
  const streak = user.streakDays || 0;
  const weeklyPoints = user.weeklySummary?.xpEarned || 0;
  return `
    <section class="momentum-strip">
      <article><span>🔥</span><div><small>連續學習</small><strong>${streak} 天</strong></div><p>${streak ? "保持節奏，明天再來延續紀錄！" : "今天完成一項任務就能開始累積。"}</p></article>
      <article><span>✦</span><div><small>本週積分</small><strong>${weeklyPoints} 分</strong></div><p>答對題目與完成任務都會累積本週積分。</p></article>
    </section>`;
}

function renderLevelJourney(user) {
  const xp = Number(user.xp || 0);
  const current = levelForXp(xp);
  const next = levelMilestones.find((milestone) => milestone.xp > xp);
  const progress = next
    ? Math.max(0, Math.min(100, ((xp - current.xp) / (next.xp - current.xp)) * 100))
    : 100;
  return `
    <section class="level-journey compact">
      <div class="level-current">
        <span class="level-current-mark">★</span>
        <div><small>目前等級</small><strong>Lv.${current.level} ${current.title}</strong></div>
      </div>
      <div class="level-number-line">
        <div class="level-line-labels"><span>${current.xp} XP</span><b>${xp} XP</b><span>${next ? `${next.xp} XP` : "MAX"}</span></div>
        <div class="level-progress-track"><span style="width:${progress}%"></span><i style="left:${progress}%"></i></div>
        <p>${next ? `再累積 ${next.xp - xp} XP，即可晉級 Lv.${next.level} ${next.title}` : "你已抵達目前最高階，繼續累積新的冒險紀錄！"}</p>
      </div>
      <div class="level-next"><small>下一階</small><strong>${next ? `Lv.${next.level}` : "最高階"}</strong><span>${next?.title || current.title}</span></div>
    </section>`;
}

function renderThemeBadges(user) {
  const completed = new Set(user.completedThemeIds || []);
  return `
    <section class="theme-badge-section">
      <div class="section-title">
        <div><span class="quest-eyebrow">MISSION BADGES</span><h2>主題任務獎章</h2><p>完成主題國家的聽、說、讀、寫四座關卡，即可解鎖專屬獎章。</p></div>
        <span class="quest-reward">${completed.size}／${worldThemes.length} 已獲得</span>
      </div>
      <div class="theme-badge-grid">
        ${worldThemes.map((theme) => {
          const unlocked = completed.has(theme.id);
          return `
            <article class="theme-badge ${unlocked ? "unlocked" : "locked"}" style="--badge-color:${theme.color}">
              <div class="badge-medallion"><span>${theme.icon}</span><i>✦</i></div>
              <strong>${theme.name}徽章</strong>
              <small>${unlocked ? "已解鎖" : "完成主題關卡解鎖"}</small>
            </article>`;
        }).join("")}
      </div>
    </section>`;
}

function normalizedCefrLevel(user) {
  const raw = String(user?.cefrLevel || "Pre-A1").toUpperCase();
  if (raw.startsWith("PRE")) return "Pre-A1";
  return cefrProgression.find((item) => raw.startsWith(item.level))?.level || "Pre-A1";
}

function cefrStepFor(user) {
  const currentLevel = normalizedCefrLevel(user);
  const index = cefrProgression.findIndex((item) => item.level === currentLevel);
  return {
    current: cefrProgression[Math.max(0, index)],
    next: cefrProgression[Math.min(cefrProgression.length - 1, index + 1)],
    index: Math.max(0, index),
  };
}

function renderTaskBadges(user, actualAbilities) {
  const badgeLevels = [
    { key: "bronze", label: "任務徽章", threshold: 20 },
    { key: "silver", label: "進階徽章", threshold: 50 },
    { key: "gold", label: "精熟徽章", threshold: 80 },
  ];
  return `
    <div class="task-badge-row">
      ${autonomousChallengeRoutes.map((route) => {
        const ability = actualAbilities.find((item) => item.id === route.id);
        const unlocked = badgeLevels.filter((badge) => (ability?.value || 0) >= badge.threshold);
        const nextBadge = badgeLevels.find((badge) => (ability?.value || 0) < badge.threshold);
        return `
          <article class="task-badge ${unlocked.length ? "unlocked" : ""}" style="--badge-color:${ability?.color || "#6c4ee3"}">
            <span>${route.icon}</span>
            <div><b>${route.reward}</b><small>${nextBadge ? `能力值 ${nextBadge.threshold} 解鎖${nextBadge.label}` : "三階徽章已集滿"}</small></div>
            <em>${unlocked.length}/3</em>
          </article>`;
      }).join("")}
    </div>`;
}

function renderAutonomousChallengeHub(user) {
  const actualAbilities = playerAbilities(user);
  const weakest = [...actualAbilities].sort((a, b) => a.value - b.value)[0];
  const cefrStep = cefrStepFor(user);
  return `
    <section class="autonomy-hub">
      <div class="autonomy-hero">
        <div>
          <span class="quest-eyebrow">DAILY SKILL QUEST</span>
          <h2>自主挑戰航線</h2>
          <p>每天從下方的五大能力訓練館地圖出發，選一座場館挑戰 10 題。題目依你的 CEFR 程度逐步變難，答題紀錄會同步成為老師端的學習診斷證據。</p>
          <div class="autonomy-actions">
            <button class="primary-btn autonomy-start" data-ability="${weakest.id}">直接挑戰今日建議：${weakest.name}</button>
            <button class="secondary-btn" data-page="world">前往主題國家收集徽章</button>
          </div>
        </div>
        <div class="cefr-route-card">
          <small>目前英語階段</small>
          <strong>${cefrStep.current.level}｜${cefrStep.current.title}</strong>
          <p>${cefrStep.current.target}</p>
          <div class="cefr-ladder">
            ${cefrProgression.map((step, index) => `<span class="${index <= cefrStep.index ? "active" : ""}">${step.level}</span>`).join("")}
          </div>
          <em>${cefrStep.current.level === "B2" ? "已到目前最高分級，繼續挑戰高難度整合題。" : `下一階：${cefrStep.next.level}｜${cefrStep.next.title}`}</em>
        </div>
      </div>
      <div class="autonomy-badges">
        <div><h3>任務徽章進度</h3><p>能力值達 20、50、80 會解鎖三階徽章；主題徽章則在世界地圖完成主題聽說讀寫四關後取得。</p></div>
        ${renderTaskBadges(user, actualAbilities)}
      </div>
    </section>`;
}

function renderPlayerAssignments() {
  if (!playerAssignments.length) return "";
  const pending = playerAssignments.filter((item) => !item.completion);
  const completed = playerAssignments.filter((item) => item.completion);
  return `
    <section class="assigned-quest-panel">
      <div class="section-title">
        <div><span class="quest-eyebrow">TEACHER QUEST</span><h2>老師指派任務</h2><p>${pending.length ? `還有 ${pending.length} 項任務等待完成。` : "本次指派任務都完成了！"}</p></div>
        <span class="quest-reward">${completed.length}／${playerAssignments.length} 已完成</span>
      </div>
      <div class="assigned-quest-grid">
        ${playerAssignments.map((assignment) => {
          const material = assignment.material;
          const ability = abilities.find((item) => item.id === material.ability);
          const due = assignment.dueAt
            ? new Date(assignment.dueAt).toLocaleDateString("zh-TW")
            : "無期限";
          return `
            <article class="assigned-quest ${assignment.completion ? "completed" : ""}" style="--assignment-color:${ability.color}">
              <span class="assigned-icon">${ability.scene}</span>
              <div>
                <span class="mission-tag">${escapeHTML(material.cefrLevel)}・${ability.shortName}</span>
                <h3>${escapeHTML(assignment.title)}</h3>
                <p>${escapeHTML(assignment.instructions || material.description || "完成老師準備的英語挑戰。")}</p>
                <small>截止：${due}・獎勵 ${assignment.xpReward} XP</small>
              </div>
              ${assignment.completion
                ? `<span class="assignment-done">✓ 已完成 ${Math.round(assignment.completion.score)} 分</span>`
                : `<button class="primary-btn assigned-game" data-assignment="${assignment.id}">開始任務</button>`}
            </article>`;
        }).join("")}
      </div>
    </section>`;
}

function renderTrainingMap(user) {
  return `
    <section class="training-map">
      <div class="map-sky" aria-hidden="true">
        <span class="map-sun">☀</span>
        <span class="map-cloud cloud-one"></span>
        <span class="map-cloud cloud-two"></span>
        <span class="map-star star-one">✦</span>
        <span class="map-star star-two">✦</span>
      </div>
      <div class="map-heading">
        <div>
          <span class="mission-tag">WonderGo 冒險區域</span>
          <h2>五大能力訓練館</h2>
          <p>Toki 已依照你的 ${escapeHTML(user.cefrLevel || "Pre-A1")} 程度準備今日題組。每天更新，完成 10 題即可獲得 XP！</p>
        </div>
        <div class="toki-guide">
          <span>選一座場館出發吧！</span>
          <img src="assets/toki.png" alt="Toki 指引訓練館地圖" />
        </div>
      </div>
      <div class="map-land land-left" aria-hidden="true"></div>
      <div class="map-land land-right" aria-hidden="true"></div>
      <div class="map-path" aria-hidden="true"></div>
      <div class="map-locations">
        ${abilities.map((ability, index) => `
          <button class="map-location location-${index + 1}" data-ability="${ability.id}" style="--hall-color:${ability.color}">
            <span class="hall-island" aria-hidden="true"></span>
            <span class="map-pin">${index + 1}</span>
            <span class="hall-art"><i>${ability.scene}</i></span>
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
    <section class="daily-quests">
      <div class="section-title">
        <div><span class="quest-eyebrow">TODAY'S QUEST</span><h2>今日推薦</h2><p>依你的程度每日更新三組不同能力題目。</p></div>
        <span class="quest-reward">完成任務賺取 XP ✦</span>
      </div>
      <div class="mission-grid">
        ${missions.map((mission, index) => `<article class="card mission mission-${index + 1}"><span class="mission-number">0${index + 1}</span><div class="mission-head"><span class="mission-tag">${mission[1]}</span><b>${mission[4]}</b></div><h3>${mission[2]}</h3><p>${mission[3]}</p><button class="secondary-btn mission-game" data-mission="${mission[0]}">前往任務 <span>→</span></button></article>`).join("")}
      </div>
    </section>`;
}

function renderTraining(user) {
  return `
    ${playerHeader(user, "五大能力訓練館", "每座場館依照你的程度提供 10 題國小英語練習。")}
    ${renderMissions()}
    ${renderTrainingMap(user)}`;
}

function renderWorldPage(user) {
  const country = worldThemes.find((item) => item.id === selectedWorldCountry);
  return country ? renderWorldCountry(user, country) : renderWorldMap(user);
}

function renderWorldMap(user) {
  return `
    ${playerHeader(user, "WonderGo 世界航圖", "探索十個英語主題國家，收集單字並完成聽、說、讀、寫挑戰。")}
    <section class="world-map">
      <div class="world-map-heading">
        <div>
          <span class="world-kicker">TOKI'S WORLD ROUTE</span>
          <h2>選一個國家，開始主題冒險！</h2>
          <p>每個國家都有 10 個圖像單字與 4 座能力關卡，完成任一關卡都能獲得 XP。</p>
        </div>
        <img src="assets/toki.png" alt="Toki 帶領玩家探索世界地圖" />
      </div>
      <div class="world-ocean" aria-hidden="true">
        <span class="world-compass">✦<small>N</small></span>
        <span class="world-ship">⛵</span>
        <span class="world-whale">🐋</span>
        <span class="world-route route-one"></span>
        <span class="world-route route-two"></span>
      </div>
      <div class="world-countries">
        ${worldThemes.map((theme, index) => `
          <button class="world-country country-${index + 1}" data-country="${theme.id}" style="--country-color:${theme.color}">
            <span class="country-number">${String(index + 1).padStart(2, "0")}</span>
            <span class="country-icon">${theme.icon}</span>
            <span class="country-copy"><strong>${theme.name}</strong><small>${theme.en}</small></span>
            <span class="country-enter">探索 →</span>
          </button>`).join("")}
      </div>
    </section>`;
}

function renderWorldCountry(user, country) {
  return `
    ${playerHeader(user, country.name, `${country.en}｜${country.description}`)}
    <button class="world-back" id="world-back">← 返回世界航圖</button>
    <section class="country-hero" style="--country-color:${country.color}">
      <div class="country-hero-icon">${country.icon}</div>
      <div>
        <span class="world-kicker">THEME COUNTRY</span>
        <h2>${country.name} <small>${country.en}</small></h2>
        <p>${country.description} 先認識圖像單字，再選擇關卡出發。</p>
      </div>
      <div class="country-level">適合 ${escapeHTML(user.cefrLevel || "Pre-A1")}</div>
    </section>
    <section class="country-section">
      <div class="section-title">
        <div><h2>單字探索圖鑑</h2><p>點一下卡片，可以聽到標準英語發音。</p></div>
        <span class="word-count">10 WORDS</span>
      </div>
      <div class="world-word-grid">
        ${country.words.map(([icon, english, chinese]) => `
          <button class="world-word" data-word="${escapeHTML(english)}">
            <span>${icon}</span><strong>${english}</strong><small>${chinese}</small><i>🔊</i>
          </button>`).join("")}
      </div>
    </section>
    <section class="country-section">
      <div class="section-title">
        <div><h2>聽說讀寫關卡</h2><p>每關 10 題，完成即可領取 XP；同日重複挑戰 XP 折半。</p></div>
      </div>
      <div class="world-stage-grid">
        ${worldStages.map((stage, index) => `
          <article class="world-stage stage-${stage.id}">
            <span class="stage-order">0${index + 1}</span>
            <div class="stage-icon">${stage.icon}</div>
            <div><span>${stage.label}力關卡</span><h3>${stage.name}</h3><p>${stage.description}</p></div>
            <button class="primary-btn world-stage-start" data-country="${country.id}" data-stage="${stage.id}">開始挑戰</button>
          </article>`).join("")}
      </div>
    </section>`;
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
      const visualValue = Math.max(ability.value, 12);
      const point = pointAt(index, maxRadius * (visualValue / 100));
      return `${point.x},${point.y}`;
    })
    .join(" ");
  const dots = values
    .map((ability, index) => {
      const visualValue = Math.max(ability.value, 12);
      const point = pointAt(index, maxRadius * (visualValue / 100));
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
    <svg class="ability-radar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="五大能力雷達圖">
      ${rings}${axes}
      <circle class="radar-origin" cx="${center}" cy="${center}" r="4" />
      <polygon class="data-shape" points="${dataPoints}" />
      ${dots}${labels}
    </svg>`;
}

function renderRadarCard(title, subtitle, values = playerAbilities()) {
  const weeklyGrowth = values.reduce((sum, ability) => sum + ability.trendValue, 0);
  return `
    <article class="card radar-card">
      <h3>${title}</h3>
      <p>${subtitle}</p>
      ${radarSVG(values)}
      <span class="radar-caption">${weeklyGrowth ? `↑ 本週完成 ${weeklyGrowth} 次能力訓練` : "本週尚未完成能力訓練"}</span>
    </article>`;
}

function renderAbility(user) {
  const actualAbilities = playerAbilities(user);
  const weeklyGrowth = actualAbilities.reduce((sum, ability) => sum + ability.trendValue, 0);
  const strongest = [...actualAbilities].sort((a, b) => b.value - a.value)[0];
  const weakest = [...actualAbilities].sort((a, b) => a.value - b.value)[0];
  const hasLearningData = actualAbilities.some((ability) => ability.value > 0);
  return `
    ${playerHeader(user, "我的能力", "看見自己的強項，也知道下一步可以怎麼進步。")}
    <section class="ability-page">
      <article class="card profile-card">
        <span class="quest-eyebrow">ABILITY RADAR</span>
        <h2>我的學習能力雷達圖</h2>
        <p style="color:var(--muted)">${escapeHTML(user.account)}｜Lv.${levelForXp(user.xp || 0).level}｜CEFR ${escapeHTML(user.cefrLevel || "Pre-A1")}</p>
        <div class="radar-wrap">${radarSVG(actualAbilities)}</div>
        <b>${weeklyGrowth ? `本週完成 ${weeklyGrowth} 次能力訓練` : "本週尚未開始能力訓練"}</b>
      </article>
      <div>
        <article class="card report-card">
          <h2>五大冒險能力</h2>
          <div class="ability-list">
            ${actualAbilities.map((a) => `<div class="ability-row"><span class="ability-icon" style="background:${a.color}">${a.icon}</span><div><h4>${a.name}</h4><p>${a.en}｜本週完成 ${a.trendValue} 次</p></div><strong>${a.value}</strong></div>`).join("")}
          </div>
        </article>
        <article class="card report-card" style="margin-top:20px">
          <h2>學習分析</h2>
          ${hasLearningData ? `
            <div class="insight good"><span>✨</span><div><b>${strongest.name}是目前最強能力！</b><p>目前能力值為 ${strongest.value}，本週完成 ${strongest.trendValue} 次相關訓練。繼續挑戰可以讓優勢更穩定。</p></div></div>
            <div class="insight focus"><span>⚡</span><div><b>${weakest.name}是下一個補強方向</b><p>目前能力值為 ${weakest.value}。建議今天先完成一次「${weakest.name}」場館任務，逐步補足能力。</p></div></div>
          ` : `
            <div class="insight focus"><span>✦</span><div><b>完成第一座訓練館，啟動能力分析</b><p>目前五項能力尚無學習紀錄。完成任一場館的 10 題練習後，雷達圖與建議會依你的實際表現更新。</p></div></div>
          `}
        </article>
      </div>
    </section>`;
}

function renderAbilityDashboard(user) {
  const actualAbilities = playerAbilities(user);
  const weeklyGrowth = actualAbilities.reduce((sum, ability) => sum + ability.trendValue, 0);
  const strongest = [...actualAbilities].sort((a, b) => b.value - a.value)[0];
  const weakest = [...actualAbilities].sort((a, b) => a.value - b.value)[0];
  const hasLearningData = actualAbilities.some((ability) => ability.value > 0);
  return `
    <section class="home-ability-section">
      <div class="section-title">
        <div><span class="quest-eyebrow">ADVENTURE STATUS</span><h2>我的能力</h2><p>依照實際學習紀錄，即時更新五大冒險能力。</p></div>
        <span class="quest-reward">${weeklyGrowth ? `本週完成 ${weeklyGrowth} 次訓練` : "完成訓練啟動分析"}</span>
      </div>
      <section class="ability-page">
        <article class="card profile-card">
          <span class="quest-eyebrow">ABILITY RADAR</span>
          <h2>我的學習能力雷達圖</h2>
          <p style="color:var(--muted)">${escapeHTML(user.account)}｜Lv.${levelForXp(user.xp || 0).level}｜CEFR ${escapeHTML(user.cefrLevel || "Pre-A1")}</p>
          <div class="radar-wrap">${radarSVG(actualAbilities)}</div>
          <b>${weeklyGrowth ? `本週完成 ${weeklyGrowth} 次能力訓練` : "本週尚未開始能力訓練"}</b>
        </article>
        <div>
          <article class="card report-card">
            <h2>五大冒險能力</h2>
            <div class="ability-list">
              ${actualAbilities.map((ability) => `<div class="ability-row"><span class="ability-icon" style="background:${ability.color}">${ability.icon}</span><div><h4>${ability.name}</h4><p>${ability.en}｜本週完成 ${ability.trendValue} 次</p></div><strong>${ability.value}</strong></div>`).join("")}
            </div>
          </article>
          <article class="card report-card" style="margin-top:20px">
            <h2>學習分析</h2>
            ${hasLearningData ? `
              <div class="insight good"><span>✨</span><div><b>${strongest.name}是目前最強能力</b><p>目前能力值 ${strongest.value}，持續挑戰能讓優勢更穩定。</p></div></div>
              <div class="insight focus"><span>⚡</span><div><b>下一步補強 ${weakest.name}</b><p>目前能力值 ${weakest.value}，建議今天完成一次相關場館任務。</p></div></div>
            ` : '<div class="insight focus"><span>✦</span><div><b>完成第一座訓練館，啟動能力分析</b><p>完成任一場館的 10 題練習後，雷達圖會依實際表現更新。</p></div></div>'}
          </article>
        </div>
      </section>
    </section>`;
}

function wrongBookItems(user) {
  return user.wrongBook || [];
}

function spellingVariants(word) {
  const clean = String(word || "").trim();
  return [
    clean,
    clean.length > 3 ? `${clean.slice(0, 1)}${clean[2]}${clean[1]}${clean.slice(3)}` : `${clean}e`,
    clean.length > 4 ? `${clean.slice(0, -1)}${clean.at(-2)}` : `${clean}${clean.at(-1)}`,
    clean.replace(/[aeiou]/i, (vowel) => vowel === "a" ? "e" : "a"),
  ].filter(Boolean);
}

function isSingleEnglishWord(value) {
  return /^[A-Za-z]+(?:[-'][A-Za-z]+)?$/.test(String(value || "").trim());
}

function wrongBookQuizQuestions(user) {
  const items = wrongBookItems(user).slice(0, 10);
  const answerPool = [...new Set(items.flatMap((item) =>
    [item.correct_answer, item.selected_answer].filter(Boolean)))];
  return items.map((item, index) => {
    const originalCorrect = String(item.correct_answer || "").trim();
    const vocabulary = String(item.vocabulary || "").trim();
    const spellingWord = isSingleEnglishWord(vocabulary) ? vocabulary
      : isSingleEnglishWord(originalCorrect) ? originalCorrect : "";
    let correct = originalCorrect;
    let prompt = `再挑戰一次：${item.prompt}`;
    let visual = "🔁";
    let speech = "";
    let options = [
      correct,
      ...answerPool.filter((answer) =>
        answer !== correct &&
        (spellingWord ? isSingleEnglishWord(answer) : !isSingleEnglishWord(answer))),
      "I am fine.",
      "Thank you.",
      "Good morning.",
      "See you.",
    ].slice(0, 4);
    if (spellingWord) {
      if (index % 3 === 0) {
        prompt = `選出「${spellingWord}」的正確拼字。`;
        visual = "✏️";
        correct = spellingWord;
        options = spellingVariants(spellingWord);
      } else if (index % 3 === 1) {
        prompt = "聽一聽，選出你聽到的單字。";
        visual = "🎧";
        correct = spellingWord;
        speech = spellingWord;
        options = [
          spellingWord,
          ...answerPool.filter((answer) =>
            isSingleEnglishWord(answer) && answer !== spellingWord),
          ...["book", "friend", "school", "happy"].filter((answer) =>
            answer !== spellingWord),
        ].slice(0, 4);
      }
    } else if (index % 2 === 1) {
      prompt = "聽一聽，選出正確的句子。";
      visual = "🎧";
      speech = originalCorrect;
    }
    const unique = [...new Set(options)];
    const fallbackAnswers = spellingWord
      ? ["review", "practice", "lesson", "answer"]
      : ["I am ready.", "Please try again.", "This is my book.", "It is sunny."];
    fallbackAnswers.forEach((answer) => {
      if (unique.length < 4 && answer !== correct && !unique.includes(answer)) {
        unique.push(answer);
      }
    });
    return shuffleQuestionOptions({
      visual,
      prompt,
      options: unique.slice(0, 4),
      answer: unique.indexOf(correct) >= 0 ? unique.indexOf(correct) : 0,
      speech,
    }, `wrongbook:${item.question_key}:${index}`);
  });
}

function renderWrongBook(user) {
  const items = wrongBookItems(user);
  const reviewed = new Set(user.reviewedQuestionKeys || []);
  const reviewedCount = items.filter((item) => reviewed.has(item.question_key)).length;
  const types = new Set(items.map((item) => item.question_type).filter(Boolean)).size;
  return `
    ${playerHeader(user, "我的錯題本", "把不熟悉的題型與單字收進來，今天複習一點，明天更有把握。")}
    <section class="metric-grid wrongbook-metrics">
      <article class="card metric"><span>待複習錯題</span><strong>${items.length} 題</strong><small>依最近實際答錯紀錄</small></article>
      <article class="card metric"><span>今日已複習</span><strong id="wrong-reviewed-count">${reviewedCount} 題</strong><small id="wrong-reviewed-percent">${items.length ? Math.round(reviewedCount / items.length * 100) : 0}% 完成</small></article>
      <article class="card metric"><span>錯誤題型</span><strong>${types} 種</strong><small>換題型再次檢核</small></article>
    </section>
    ${items.length ? `
      <section class="wrongbook-action card">
        <div><span class="quest-eyebrow">MASTERY CHECK</span><h2>用錯題內容重新組題</h2><p>系統會把原本的單字或答案換成拼字、聽力、閱讀等不同形式，確認是否真正精熟。</p></div>
        <button class="primary-btn" id="start-wrongbook-quiz">用錯題考考我・完成得 5 XP</button>
      </section>
      <div class="wrongbook-list">
        ${items.map((item, index) => {
          const isReviewed = reviewed.has(item.question_key);
          const ability = abilities.find((entry) => entry.id === item.ability);
          return `
            <article class="card wrongbook-card ${isReviewed ? "reviewed" : ""}">
              <header><span class="wrongbook-number">${String(index + 1).padStart(2, "0")}</span><div><span class="mission-tag">${escapeHTML(item.question_type || ability?.shortName || "綜合練習")}</span><h3>${escapeHTML(item.prompt)}</h3></div></header>
              <div class="wrongbook-answer-grid">
                <div class="wrong-answer"><small>上次誤選</small><b>${escapeHTML(item.selected_answer || "未作答")}</b></div>
                <div class="correct-answer"><small>正確答案</small><b>${escapeHTML(item.correct_answer)}</b></div>
              </div>
              <label class="review-check"><input class="wrong-review-check" type="checkbox" data-wrong-index="${index}" ${isReviewed ? "checked" : ""} /><span><b>${isReviewed ? "✓ 今天已複習完成" : "今日複習完成"}</b><small>${isReviewed ? "可再次點選取消" : "點這裡或方框打勾"}</small></span></label>
            </article>`;
        }).join("")}
      </div>
    ` : '<section class="card empty-page"><div><div class="big-icon">✓</div><h2>目前沒有錯題</h2><p style="color:var(--muted)">完成訓練與教師任務後，答錯的題型和單字會自動收進這裡。</p><button class="primary-btn" data-page="training">前往訓練館</button></div></section>'}`;
}

function startWrongBookQuiz() {
  const user = currentUser();
  const questions = wrongBookQuizQuestions(user);
  if (!questions.length) return toast("目前沒有可重新組題的錯題。");
  gameState = {
    mode: "wrongbook",
    id: "review",
    ability: "word",
    title: "錯題變形精熟測驗",
    color: "#6c4ee3",
    taskKey: "wrongbook:review",
    questions,
    index: 0,
    correct: 0,
    answered: false,
    selected: null,
    synced: false,
    attempts: [],
    returnPage: "wrongbook",
  };
  document.body.insertAdjacentHTML("beforeend", renderGameModal());
  bindGameModalEvents();
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
  const scope = user.role === "admin"
    ? "全平台管理中心"
    : `${escapeHTML(user.school)}・${escapeHTML(user.className)}`;
  return `
    <header class="topbar">
      <div><h1>${title}</h1><p>${scope}｜${subtitle}</p></div>
      ${user.role === "admin" ? "" : '<button class="primary-btn mission-action">＋ 指派新任務</button>'}
    </header>`;
}

function renderTeacherPage(user) {
  if (user.role === "admin") return renderAdminPage(user);
  if (currentPage === "students") return renderStudents(user);
  if (currentPage === "library") return renderCoursePackLibrary(user);
  if (currentPage === "missions") return renderMaterialManager(user);
  if (currentPage === "content") return renderMaterialManager(user);
  if (currentPage === "prep") return renderPrepCenter(user);
  if (currentPage === "preview") return renderStudentPreview(user);
  if (currentPage === "analytics") return renderTeacherAnalytics(user);
  return renderTeacherOverview(user);
}

function materialStatusLabel(status) {
  return { draft: "草稿", published: "已發布", archived: "已封存" }[status] || status;
}

function renderMaterialManager(user) {
  const materials = teacherContent.materials || [];
  const assignments = teacherContent.assignments || [];
  const published = materials.filter((item) => item.status === "published").length;
  return `
    ${teacherHeader(user, "任務派發中心", "建立學生題組，發布後派發給全班、個別學生或小組")}
    <section class="metric-grid">
      <article class="card metric"><span>可派發題組</span><strong>${published} 份</strong><small>學生學習單與課程檢核</small></article>
      <article class="card metric"><span>已派發任務</span><strong>${assignments.length} 項</strong><small>全班、個別與小組任務</small></article>
      <article class="card metric"><span>完成紀錄</span><strong>${assignments.reduce((sum, item) => sum + item.completions.length, 0)} 人次</strong><small>學生任務完成紀錄</small></article>
    </section>
    <div class="section-title material-heading">
      <div><h2>學生任務題組</h2><p>可從教材管理的課程包轉入學習單，也可以在此手動建立題組。</p></div>
      <div class="heading-actions"><button class="secondary-btn open-assignment-editor" ${published ? "" : "disabled"}>＋ 派發任務</button><button class="primary-btn open-material-editor">＋ 手動建立題組</button></div>
    </div>
    ${materials.length ? `
      <section class="material-grid">
        ${materials.map((material) => {
          const ability = abilities.find((item) => item.id === material.ability);
          return `
            <article class="card material-card ${material.status}" style="--material-color:${ability.color}">
              <header><span class="material-icon">${ability.scene}</span><span class="status material-status">${materialStatusLabel(material.status)}</span></header>
              <span class="mission-tag">${escapeHTML(material.cefrLevel)}・${ability.shortName}</span>
              <h3>${escapeHTML(material.title)}</h3>
              <p>${escapeHTML(material.description || "尚未填寫教材說明")}</p>
              <div class="material-meta"><span>${material.questions.length} 題</span><span>更新 ${new Date(material.updatedAt).toLocaleDateString("zh-TW")}</span></div>
              <footer>
                <button class="secondary-btn edit-material" data-material="${material.id}">編輯題組</button>
                ${material.status === "published" ? `<button class="primary-btn assign-material" data-material="${material.id}">派發任務</button>` : ""}
                ${material.status === "draft" ? `<button class="primary-btn publish-material" data-material="${material.id}">發布並指派</button>` : ""}
                ${material.status !== "archived" ? `<button class="ghost-btn archive-material" data-material="${material.id}">封存</button>` : ""}
              </footer>
            </article>`;
        }).join("")}
      </section>
    ` : `
      <section class="card empty-page"><div><div class="big-icon">✓</div><h2>建立第一份學生題組</h2><p style="color:var(--muted)">可由課程包轉入，或手動輸入題目後派發。</p><button class="primary-btn open-material-editor">建立題組</button></div></section>
    `}`;
}

function renderCoursePackLibrary(user) {
  const packs = teacherContent.packs || [];
  return `
    ${teacherHeader(user, "教材管理", "以版本、單元或課程名稱整理教師備課資料與課程包")}
    <section class="course-library-hero">
      <div><span class="quest-eyebrow">COURSE PACK LIBRARY</span><h2>我的備課資料夾</h2><p>備課中心挑選的上課素材、學習單與檢核題，都能整理到對應課程包。</p></div>
      <button class="primary-btn open-course-pack-editor">＋ 新增課程包資料夾</button>
    </section>
    <section class="course-pack-grid">
      ${packs.length ? packs.map((pack) => {
        const teachingCount = pack.resources.filter((item) => item.resourceType === "teaching_material").length;
        const studentCount = pack.resources.length - teachingCount;
        return `<article class="course-pack-folder">
          <header><span class="folder-icon">▰</span><button class="ghost-btn delete-course-pack" data-pack="${pack.id}">刪除</button></header>
          <span class="mission-tag">${escapeHTML(pack.textbookVersion || "自編課程")}・${escapeHTML(pack.unitName || "未設定單元")}</span>
          <h3>${escapeHTML(pack.courseName || pack.title)}</h3>
          <p>${escapeHTML(pack.description || "尚未加入課程說明")}</p>
          <div class="pack-counts"><span>上課素材 ${teachingCount}</span><span>學習／檢核 ${studentCount}</span></div>
          <footer><button class="secondary-btn open-course-pack" data-pack="${pack.id}">開啟課程包</button><button class="primary-btn add-manual-resource" data-pack="${pack.id}">＋ 新增資源</button></footer>
        </article>`;
      }).join("") : `<article class="card empty-page course-pack-empty"><div><div class="big-icon">▤</div><h2>建立第一個課程包</h2><p>可依教科書版本、單元或自訂課程名稱建立資料夾。</p><button class="primary-btn open-course-pack-editor">新增課程包資料夾</button></div></article>`}
    </section>`;
}

function renderCoursePackEditor(pack = null) {
  return `<div class="game-modal admin-edit-modal" id="course-pack-editor-modal">
    <article class="game-card admin-edit-card">
      <header><div><span class="mission-tag">課程包資料夾</span><h2>${pack ? "編輯課程包" : "新增課程包"}</h2></div><button class="ghost-btn close-course-pack-editor">✕</button></header>
      <form id="course-pack-form">
        <input type="hidden" name="id" value="${pack?.id || ""}" />
        <div class="form-grid">
          <div class="field full"><label>資料夾名稱</label><input name="title" value="${escapeHTML(pack?.title || `${selectedPrepVersion} ${selectedPrepBook} ${selectedPrepUnit}`)}" required /></div>
          <div class="field"><label>教科書版本</label><input name="textbookVersion" value="${escapeHTML(pack?.textbookVersion || selectedPrepVersion)}" /></div>
          <div class="field"><label>冊數</label><input name="bookName" value="${escapeHTML(selectedPrepBook)}" disabled /></div>
          <div class="field"><label>單元</label><input name="unitName" value="${escapeHTML(pack?.unitName || `${selectedPrepBook}｜${selectedPrepUnit}`)}" /></div>
          <div class="field full"><label>課程名稱</label><input name="courseName" value="${escapeHTML(pack?.courseName || selectedPrepUnit)}" placeholder="例：Unit 1 自我介紹課程包" required /></div>
          <div class="field full"><label>課程說明</label><textarea name="description" rows="3" placeholder="本課的學習目標與使用方式">${escapeHTML(pack?.description || "")}</textarea></div>
        </div>
        <div class="editor-actions"><button class="ghost-btn close-course-pack-editor" type="button">取消</button><button class="primary-btn" type="submit">儲存課程包</button></div>
      </form>
    </article>
  </div>`;
}

function renderAddToCoursePackModal(resourceKey) {
  const packs = teacherContent.packs || [];
  const files = prepResourceFiles(resourceKey, prepUnitProfile(selectedPrepVersion, selectedPrepUnit));
  return `<div class="game-modal admin-edit-modal" id="add-to-pack-modal">
    <article class="game-card admin-edit-card">
      <header><div><span class="mission-tag">加入課程包</span><h2>${resourceKey === "differentiated" ? "加入三份差異化學習單" : escapeHTML(files[0].title.split("｜").pop())}</h2></div><button class="ghost-btn close-add-to-pack">✕</button></header>
      ${packs.length ? `<form id="add-to-pack-form">
        <input type="hidden" name="resourceKey" value="${resourceKey}" />
        <div class="field"><label>選擇課程包資料夾</label><select name="packId">${packs.map((pack) => `<option value="${pack.id}" ${pack.id === selectedCoursePackId ? "selected" : ""}>${escapeHTML(pack.textbookVersion)}・${escapeHTML(pack.unitName)}｜${escapeHTML(pack.courseName || pack.title)}</option>`).join("")}</select></div>
        <div class="pack-file-preview">${files.map((file) => `<div><span>${file.icon}</span><p><b>${escapeHTML(file.title.split("｜").pop())}</b><small>${resourceTypeLabel(file.resourceType)}・${file.content.questions?.length || 0} 題</small></p></div>`).join("")}</div>
        <div class="editor-actions"><button class="ghost-btn close-add-to-pack" type="button">取消</button><button class="primary-btn" type="submit">加入所選課程包</button></div>
      </form>` : `<div class="empty-hint pack-modal-empty"><p>目前還沒有課程包資料夾，請先建立一個。</p><button class="primary-btn create-pack-from-prep">＋ 建立課程包</button></div>`}
    </article>
  </div>`;
}

function renderResourcePreviewModal(resourceKey) {
  const files = prepResourceFiles(resourceKey, prepUnitProfile(selectedPrepVersion, selectedPrepUnit));
  return `<div class="game-modal admin-edit-modal" id="resource-preview-modal">
    <article class="game-card admin-edit-card resource-preview-card">
      <header><div><span class="mission-tag">課程資源預覽</span><h2>${resourceKey === "differentiated" ? "差異化課程包：三份課程檔案" : escapeHTML(files[0].title.split("｜").pop())}</h2></div><button class="ghost-btn close-resource-preview">✕</button></header>
      <div class="resource-file-tabs">
        ${files.map((file, index) => `<article class="resource-file-detail">
          <div class="resource-file-heading"><span>${file.icon}</span><div><small>${resourceTypeLabel(file.resourceType)}</small><h3>${escapeHTML(file.title.split("｜").pop())}</h3></div></div>
          ${renderResourceContent(file.content)}
        </article>`).join("")}
      </div>
      <div class="editor-actions"><button class="ghost-btn close-resource-preview">關閉</button><button class="primary-btn preview-add-to-pack" data-resource-key="${resourceKey}">加入課程包</button></div>
    </article>
  </div>`;
}

function renderCoursePackDetail(pack) {
  return `<div class="game-modal admin-edit-modal" id="course-pack-detail-modal">
    <article class="game-card admin-edit-card course-pack-detail-card">
      <header><div><span class="mission-tag">${escapeHTML(pack.textbookVersion)}・${escapeHTML(pack.unitName)}</span><h2>${escapeHTML(pack.courseName || pack.title)}</h2></div><button class="ghost-btn close-course-pack-detail">✕</button></header>
      <div class="course-pack-detail-toolbar"><p>${escapeHTML(pack.description || "此課程包尚未填寫說明。")}</p><button class="primary-btn add-manual-resource" data-pack="${pack.id}">＋ 手動新增課程資源</button></div>
      <div class="course-resource-list">
        ${pack.resources.length ? pack.resources.map((resource) => `<article class="course-resource-row">
          <span class="course-resource-icon">${resource.audience === "teacher" ? "🧑‍🏫" : resource.resourceType === "assessment" ? "✅" : "📝"}</span>
          <div><small>${resourceTypeLabel(resource.resourceType)}</small><h3>${escapeHTML(resource.title)}</h3><p>${escapeHTML(resource.content.goal || resource.content.instructions || resource.content.teacherGuide || "")}</p></div>
          <div class="course-resource-actions"><button class="secondary-btn view-saved-resource" data-resource="${resource.id}">查看內容</button>${resource.audience === "student" ? `<button class="primary-btn convert-resource-task" data-resource="${resource.id}">建立派發題組</button>` : ""}<button class="ghost-btn delete-course-resource" data-resource="${resource.id}">移除</button></div>
        </article>`).join("") : `<div class="empty-hint"><p>此課程包尚未加入資源，可回到備課中心挑選，或手動新增。</p></div>`}
      </div>
    </article>
  </div>`;
}

function renderManualResourceEditor(packId) {
  return `<div class="game-modal admin-edit-modal" id="manual-resource-modal">
    <article class="game-card admin-edit-card">
      <header><div><span class="mission-tag">手動新增</span><h2>新增課程資源</h2></div><button class="ghost-btn close-manual-resource">✕</button></header>
      <form id="manual-resource-form">
        <input type="hidden" name="packId" value="${packId}" />
        <div class="form-grid">
          <div class="field full"><label>資源名稱</label><input name="title" required placeholder="例：Unit 1 上課簡報重點" /></div>
          <div class="field"><label>資源類型</label><select name="resourceType"><option value="teaching_material">教師上課素材</option><option value="worksheet">學生學習單</option><option value="assessment">學習檢核</option></select></div>
          <div class="field"><label>使用對象</label><select name="audience"><option value="teacher">教師使用</option><option value="student">學生使用／可轉任務</option></select></div>
          <div class="field full"><label>內容</label><textarea name="content" rows="8" required placeholder="輸入教學步驟、學習單內容、題目或檢核說明"></textarea></div>
        </div>
        <div class="editor-actions"><button class="ghost-btn close-manual-resource" type="button">取消</button><button class="primary-btn" type="submit">新增至課程包</button></div>
      </form>
    </article>
  </div>`;
}

function findCoursePackResource(resourceId) {
  return (teacherContent.packs || [])
    .flatMap((pack) => pack.resources)
    .find((resource) => resource.id === resourceId);
}

function renderSavedResourcePreview(resource) {
  return `<div class="game-modal admin-edit-modal" id="saved-resource-modal">
    <article class="game-card admin-edit-card resource-preview-card">
      <header><div><span class="mission-tag">${resourceTypeLabel(resource.resourceType)}</span><h2>${escapeHTML(resource.title)}</h2></div><button class="ghost-btn close-saved-resource">✕</button></header>
      <article class="resource-file-detail">${renderResourceContent(resource.content)}</article>
      <div class="editor-actions"><button class="ghost-btn close-saved-resource">關閉</button>${resource.audience === "student" ? `<button class="primary-btn convert-resource-task" data-resource="${resource.id}">建立派發題組</button>` : ""}</div>
    </article>
  </div>`;
}

function prepUnitProfile(version, unit) {
  const joined = `${version} ${unit}`;
  const has = (...patterns) => patterns.some((pattern) => joined.includes(pattern));
  const theme = has("基礎句型整合") ? "basicPatterns"
    : has("生活英語暖身") ? "dailyWarmup"
      : has("進階句型暖身") ? "advancedPatterns"
        : has("主題式單字") ? "thematicWords"
          : has("生活情境對話") ? "dialogue"
            : has("跨領域任務") ? "crossCurricular"
              : has("家庭與日常") ? "familyDaily"
                : has("Review", "複習") ? "review"
                  : has("Culture", "文化", "節慶", "Festival", "日期與節日") ? "festival"
                    : has("Reading", "閱讀") ? "reading"
                      : has("專題", "畢業") ? "project"
                        : has("過去經驗") ? "past"
                          : has("未來計畫", "旅行與計畫") ? "future"
                            : has("比較", "描述") ? "compare"
                              : has("購物", "價格") ? "shopping"
                                : has("健康", "感受") ? "feelings"
                                  : has("國家", "城市") ? "countries"
                                    : has("交通") ? "transport"
                                      : has("社區", "地點", "方向") ? "places"
                                        : has("休閒", "興趣", "星期與活動") ? "activities"
                                          : has("校園生活") ? "schoolLife"
                                            : has("個性", "外貌") ? "appearance"
                                              : has("天氣") ? "weather"
                                                : has("房間", "居家") ? "home"
                                                  : has("服裝") ? "clothes"
                                                    : has("能力", "動作") ? "actions"
                                                      : has("身體") ? "body"
                                                        : has("食物", "點餐") ? "food"
                                                          : has("家人", "職業") ? "family"
                                                            : has("動物") ? "animals"
                                                              : has("顏色", "數字", "年齡") ? "colorsNumbers"
                                                                : has("教室", "學用品") ? "school"
                                                                  : has("時間", "作息") ? "time"
                                                                    : has("字母") ? "alphabet"
                                                                      : has("朋友", "人物", "問候", "自我", "介紹", "Starter") ? "intro"
                                                                        : "daily";
  const profiles = {
    alphabet: {
      topic: "字母與問候",
      goal: "能辨識英文字母與基礎問候語，建立開口說英語的課堂例行。",
      vocabulary: "A, B, C, hello, hi, goodbye",
      sentence: "Hello! / Goodbye!",
      focus: "以字母音名、招呼語與課堂回應建立英語學習安全感。",
      warmup: "用字母卡與招呼手勢進行快速配對，讓學生邊看邊說。",
      task: "學生抽字母卡向同學問候，完成三次交換與回應。",
    },
    food: {
      topic: "食物與喜好",
      goal: "能辨識常見食物字詞，使用 I like... / Do you like...? 表達喜好。",
      vocabulary: "apple, banana, rice, bread, milk, juice",
      sentence: "I like ___. / Do you like ___? Yes, I do.",
      focus: "從食物字詞進入喜好表達，練習問答中的肯定與否定回應。",
      warmup: "用食物圖片進行 30 秒快速命名，再讓學生選出自己喜歡的食物。",
      task: "兩人一組完成餐點喜好調查，最後用英語報告一位同學的答案。",
    },
    family: {
      topic: "家人與職業",
      goal: "能介紹家人與職業，使用 This is my... / He or She is a...。",
      vocabulary: "mother, father, sister, brother, teacher, doctor",
      sentence: "This is my ___. / He is a ___.",
      focus: "連結人物關係與職業稱謂，建立 he/she 與 my 的基礎使用。",
      warmup: "出示角色卡，請學生猜人物關係並說出已知單字。",
      task: "製作迷你家庭角色卡，以兩句英語完成介紹。",
    },
    familyDaily: {
      topic: "家庭與日常",
      goal: "能介紹家庭成員與日常活動，使用 This is... / I usually... 描述生活。",
      vocabulary: "family, home, dinner, homework, help, together",
      sentence: "This is my ___. / I usually ___ at home.",
      focus: "連結家庭角色與日常活動，練習介紹家人和描述例行生活。",
      warmup: "看家庭日常圖片，學生說出人物關係和正在做的事。",
      task: "完成家庭日常小書，向同學介紹一位家人與一件日常活動。",
    },
    school: {
      topic: "教室與學用品",
      goal: "能辨識教室物品並使用 What's this? / It's a... 進行問答。",
      vocabulary: "book, pencil, ruler, desk, chair, schoolbag",
      sentence: "What's this? / It's a ___.",
      focus: "聚焦物品辨識、單複數初步概念與 this/it 的問答替換。",
      warmup: "教室尋寶：教師說單字，學生快速指出對應物品。",
      task: "小組輪流抽物品卡，以完整問答句完成配對。",
    },
    time: {
      topic: "時間與作息",
      goal: "能聽懂並表達整點時間與簡易日常作息。",
      vocabulary: "morning, afternoon, evening, o'clock",
      sentence: "What time is it? / It's ___ o'clock.",
      focus: "將數字與作息情境結合，讓學生能聽懂並回答時間。",
      warmup: "用時鐘圖片快速複習數字，猜測 Toki 的作息時間。",
      task: "完成一日作息時間軸，和同伴進行時間問答。",
    },
    intro: {
      topic: "問候與自我介紹",
      goal: "能使用問候語、自我介紹並詢問姓名或基本資料。",
      vocabulary: "hello, name, friend, student, teacher",
      sentence: "What's your name? / My name is ___.",
      focus: "建立初次見面情境，練習姓名問答與自然回應。",
      warmup: "播放角色見面情境，學生找出聽到的問候語。",
      task: "進行角色交換卡活動，和三位同學完成英語自我介紹。",
    },
    basicPatterns: {
      topic: "基礎句型整合",
      goal: "能整合已學的問答句型，穩定使用完整句回答課堂問題。",
      vocabulary: "question, answer, sentence, word, yes, no",
      sentence: "Can you say ___? / Yes, I can.",
      focus: "回收前面學過的基本問答，讓學生從單字回答進步到完整句表達。",
      warmup: "用句型拼圖卡重組問句與答句，快速確認學生熟悉度。",
      task: "小組抽任務卡，完成三組問答並把答案改寫成完整句。",
    },
    dailyWarmup: {
      topic: "生活英語暖身",
      goal: "能在課堂與日常情境中使用常見英語指令、請求與回應。",
      vocabulary: "hello, please, thanks, help, wait, ready",
      sentence: "Are you ready? / Yes, I am.",
      focus: "把禮貌語、課堂指令與即時回應變成學生每天敢開口的例行語。",
      warmup: "教師說出生活情境，學生用對應英語短句快速回應。",
      task: "兩人一組完成生活英語情境卡，練習請求、道謝與回應。",
    },
    advancedPatterns: {
      topic: "進階句型暖身",
      goal: "能複習並連結進階句型，嘗試加入原因、時間或個人想法。",
      vocabulary: "because, before, after, usually, want, can",
      sentence: "I can ___ because ___.",
      focus: "協助學生把短句延伸成有理由、有時間線或有個人選擇的表達。",
      warmup: "出示半句提示，學生補上原因或時間，組成較完整的句子。",
      task: "完成 Toki 任務選擇單，用 because 說明自己的任務選擇。",
    },
    colorsNumbers: {
      topic: "顏色、數字與年齡",
      goal: "能辨識顏色與數字，並用 I am... / It is... 描述年齡、數量或顏色。",
      vocabulary: "red, blue, yellow, green, one, ten",
      sentence: "How old are you? / I am ___.",
      focus: "結合顏色與數字，練習形容詞放在名詞前與年齡問答。",
      warmup: "用彩色數字卡進行快問快答，學生說出顏色與數字。",
      task: "完成顏色與年齡訪問表，向同學提問並記錄答案。",
    },
    animals: {
      topic: "動物與特徵",
      goal: "能說出常見動物名稱，並用 It is... / I see... 描述動物特徵。",
      vocabulary: "dog, cat, bird, fish, rabbit, elephant",
      sentence: "What do you see? / I see a ___.",
      focus: "從動物字詞延伸到大小、顏色與簡短描述。",
      warmup: "播放動物聲音或展示局部圖片，學生猜出動物名稱。",
      task: "完成動物觀察卡，向同伴介紹一種動物。",
    },
    body: {
      topic: "身體部位",
      goal: "能辨識身體部位，並依指令做出 touch / show 等課堂反應。",
      vocabulary: "head, eyes, ears, nose, mouth, hands",
      sentence: "Touch your ___. / This is my ___.",
      focus: "以 TPR 全身反應法建立聽力理解與身體部位詞彙。",
      warmup: "進行 Simon Says，學生聽指令觸碰對應部位。",
      task: "小組設計三個身體部位指令並帶領同學完成。",
    },
    actions: {
      topic: "能力與動作",
      goal: "能辨識常見動作，並用 can / can't 表達自己會做的事。",
      vocabulary: "run, jump, swim, sing, dance, draw",
      sentence: "Can you ___? / Yes, I can.",
      focus: "建立 can 問答與動作動詞，鼓勵學生以動作輔助口說。",
      warmup: "教師做動作，學生猜動詞並跟著做。",
      task: "完成能力賓果，訪問同學會做哪些動作。",
    },
    clothes: {
      topic: "服裝與顏色",
      goal: "能說出服裝字詞，並用顏色描述穿著。",
      vocabulary: "shirt, T-shirt, skirt, pants, shoes, jacket",
      sentence: "What are you wearing? / I am wearing ___.",
      focus: "整合服裝與顏色形容，練習 wearing 的生活化表達。",
      warmup: "用服裝圖片和顏色卡配對，快速說出 blue shirt 等詞組。",
      task: "設計 Toki 的冒險穿搭，並用兩句英語介紹。",
    },
    home: {
      topic: "房間與居家",
      goal: "能辨識家中空間與物品，使用 Where is...? / It is in... 描述位置。",
      vocabulary: "bedroom, kitchen, bathroom, living room, door, window",
      sentence: "Where is the ___? / It is in the ___.",
      focus: "連結空間字詞與位置問答，建立 in/on/under 的初步理解。",
      warmup: "看房屋平面圖找物品，學生說出所在房間。",
      task: "完成迷你房屋地圖，和同伴互問物品位置。",
    },
    weather: {
      topic: "天氣",
      goal: "能聽懂天氣字詞，並使用 How's the weather? / It's... 回答。",
      vocabulary: "sunny, rainy, cloudy, windy, hot, cold",
      sentence: "How's the weather? / It's ___.",
      focus: "從天氣觀察進入形容詞描述，搭配日常穿著或活動選擇。",
      warmup: "看天氣圖示猜今天的天氣，學生舉牌回答。",
      task: "完成一週天氣小報，向同學報告一天的天氣。",
    },
    activities: {
      topic: "星期與休閒活動",
      goal: "能說出星期與活動字詞，並表達自己在某天做的活動。",
      vocabulary: "Monday, Friday, play, read, watch TV, ride a bike",
      sentence: "What do you do on ___? / I ___.",
      focus: "整合星期、活動動詞與 on 的時間用法。",
      warmup: "用星期卡排序，再配對學生常做的活動。",
      task: "完成週計畫表，訪問同學星期幾做什麼活動。",
    },
    places: {
      topic: "地點、方向與社區",
      goal: "能辨識社區地點並使用 Where is...? 問路或描述位置。",
      vocabulary: "park, library, hospital, supermarket, left, right",
      sentence: "Where is the ___? / Turn ___.",
      focus: "結合地點名詞與方向指令，練習地圖閱讀與簡易問路。",
      warmup: "看社區地圖指出地點，教師用 left/right 下指令。",
      task: "兩人一組完成地圖尋寶，使用英語指路到指定地點。",
    },
    schoolLife: {
      topic: "校園生活",
      goal: "能描述校園活動與課堂物品，使用 I have... / I like... 表達學校生活。",
      vocabulary: "class, English, music, PE, lunch, homework",
      sentence: "What class do you have? / I have ___.",
      focus: "從學生真實課表切入，練習科目與校園日常表達。",
      warmup: "看課表圖卡猜科目，學生說出自己喜歡的課。",
      task: "完成我的一天課表，和同伴進行課堂問答。",
    },
    appearance: {
      topic: "個性與外貌",
      goal: "能用形容詞描述人物外貌或個性，並介紹自己或朋友。",
      vocabulary: "tall, short, strong, kind, funny, smart",
      sentence: "He is ___. / She is ___.",
      focus: "練習 he/she 代名詞與形容詞描述，避免只背單字。",
      warmup: "用角色剪影猜人物特徵，學生說出一個形容詞。",
      task: "製作朋友介紹卡，以三句英語描述人物。",
    },
    transport: {
      topic: "交通工具",
      goal: "能辨識交通工具並說明上學或旅行的交通方式。",
      vocabulary: "bus, car, bike, train, airplane, walk",
      sentence: "How do you go to school? / I go by ___.",
      focus: "建立 by + 交通工具的表達，連結真實通勤經驗。",
      warmup: "用交通聲音或圖片猜交通工具，學生模仿並說出單字。",
      task: "完成交通調查表，統計同學如何到校。",
    },
    countries: {
      topic: "國家與城市",
      goal: "能辨識國家或城市名稱，並介紹來自哪裡或想去的地方。",
      vocabulary: "Taiwan, Japan, Korea, the USA, city, country",
      sentence: "Where are you from? / I am from ___.",
      focus: "連結地圖、國家名稱與 from 的來源表達。",
      warmup: "看國旗或地圖猜國家，學生說出已知地名。",
      task: "選一個想去的國家，完成簡短旅行介紹。",
    },
    festival: {
      topic: "節慶與文化",
      goal: "能理解節慶字詞與日期，說出節慶活動或祝福語。",
      vocabulary: "festival, Halloween, Christmas, New Year, date, card",
      sentence: "Happy ___! / When is ___?",
      focus: "以文化情境帶入節慶詞彙、日期與祝福語。",
      warmup: "展示節慶物品或圖片，學生猜節慶名稱。",
      task: "設計節慶卡片，向同學說一句祝福語。",
    },
    feelings: {
      topic: "健康與感受",
      goal: "能表達身體狀況與感受，使用 I feel... / I have...。",
      vocabulary: "happy, sad, tired, sick, hungry, thirsty",
      sentence: "How do you feel? / I feel ___.",
      focus: "結合感受形容詞與健康情境，練習同理回應。",
      warmup: "看表情卡猜感受，學生用臉部表情回應。",
      task: "完成健康小對話，詢問同學感覺並給予建議。",
    },
    shopping: {
      topic: "購物與價格",
      goal: "能詢問價格並完成簡易購物對話。",
      vocabulary: "dollar, cheap, expensive, buy, want, shop",
      sentence: "How much is it? / It's ___ dollars.",
      focus: "練習價格、數字與禮貌購物語句的整合。",
      warmup: "用商品卡猜價格，學生說出數字。",
      task: "小組開設迷你商店，完成買賣角色扮演。",
    },
    future: {
      topic: "旅行與未來計畫",
      goal: "能說出旅行或未來計畫，使用 I want to... / I am going to...。",
      vocabulary: "travel, visit, plan, tomorrow, next week, vacation",
      sentence: "I am going to ___. / I want to ___.",
      focus: "從計畫情境進入未來表達，練習活動與時間副詞搭配。",
      warmup: "看旅行圖片選目的地，學生說出想做的事。",
      task: "規劃 Toki 的週末旅行，向同學分享兩個計畫。",
    },
    past: {
      topic: "過去經驗",
      goal: "能理解簡易過去式語句，說出曾經做過的活動。",
      vocabulary: "went, played, visited, watched, yesterday, last week",
      sentence: "I went to ___. / I played ___.",
      focus: "以時間線建立過去概念，先理解再嘗試簡短表達。",
      warmup: "看昨天活動圖片排序，學生猜角色做了什麼。",
      task: "完成我的昨天活動卡，用兩句英語分享。",
    },
    compare: {
      topic: "比較與描述",
      goal: "能用形容詞比較人物或物品，理解 bigger / smaller 等比較級。",
      vocabulary: "big, small, tall, short, long, fast",
      sentence: "A is ___ than B.",
      focus: "用視覺比較建立 than 的概念，避免抽象文法講解過多。",
      warmup: "展示兩張圖片，學生用手勢表示大小或長短。",
      task: "完成比較任務卡，介紹兩個角色或物品的差異。",
    },
    reading: {
      topic: "閱讀挑戰",
      goal: "能閱讀簡短故事或短文，找出主旨、細節與關鍵字。",
      vocabulary: "story, title, character, place, problem, answer",
      sentence: "The story is about ___.",
      focus: "訓練看標題預測、圈關鍵字與用證據回答問題。",
      warmup: "只看標題和圖片，學生預測故事內容。",
      task: "完成故事線索表，說出一個角色、一個地點與一個重點。",
    },
    project: {
      topic: "專題任務",
      goal: "能整合已學字詞與句型，完成簡短介紹、海報或口頭發表。",
      vocabulary: "poster, report, topic, idea, practice, present",
      sentence: "My topic is ___. / I want to share ___.",
      focus: "重視任務產出與口說表達，把已學語料放進真實作品。",
      warmup: "觀看範例作品，學生找出可使用的英語句型。",
      task: "完成一份迷你專題作品，向同學進行 30 秒發表。",
    },
    thematicWords: {
      topic: "主題式單字",
      goal: "能依主題分類、記憶並運用核心單字，建立可延伸的字詞網絡。",
      vocabulary: "topic, word, picture, group, match, review",
      sentence: "This word is ___. / It goes with ___.",
      focus: "用分類、圖像與聯想建立字詞網絡，避免只背單字表。",
      warmup: "出示混合字卡，學生依主題快速分類並說出分類理由。",
      task: "小組建立一張主題字詞地圖，並用兩句英語介紹分類方式。",
    },
    dialogue: {
      topic: "生活情境對話",
      goal: "能理解並演練常見生活情境中的問答、請求與禮貌回應。",
      vocabulary: "please, thank you, sorry, help, ask, answer",
      sentence: "Can I ___? / Yes, please.",
      focus: "以真實情境和角色扮演練習禮貌表達與即時回應。",
      warmup: "播放或示範一段短對話，學生找出禮貌用語與關鍵句。",
      task: "兩人一組抽情境卡，改編並演出三句以上的生活對話。",
    },
    crossCurricular: {
      topic: "跨領域任務",
      goal: "能使用英語完成跨領域觀察、分類、整理或簡短發表。",
      vocabulary: "science, art, map, data, idea, project",
      sentence: "I found ___. / My idea is ___.",
      focus: "讓英語成為完成任務的工具，結合觀察、整理與表達。",
      warmup: "看圖片或資料卡，學生說出可用的英語關鍵字。",
      task: "完成一個跨領域小任務，整理資料後用英語分享發現。",
    },
    review: {
      topic: "複習整合",
      goal: "能統整前面單元的核心字詞與句型，完成跨單元任務。",
      vocabulary: "review, word, sentence, question, answer, mission",
      sentence: "I can say ___. / I can answer ___.",
      focus: "以錯題與任務表現回顧弱點，安排跨題型複習。",
      warmup: "用前幾課圖卡進行分類與快速回想。",
      task: "完成跨單元闖關任務，檢核自己最熟與最需要補強的內容。",
    },
    daily: {
      topic: "生活英語",
      goal: "能理解本單元核心字詞與句型，並在生活情境中完成簡易溝通。",
      vocabulary: "hello, goodbye, please, thanks, yes, no",
      sentence: "Hello! / Thank you.",
      focus: "以高頻生活用語建立聽說信心，再逐步延伸到完整句。",
      warmup: "以圖片、動作或情境問題喚起先備知識。",
      task: "設計兩人資訊差任務，讓學生必須使用目標句型完成挑戰。",
    },
  };
  return profiles[theme];
}

function prepBooks(version = selectedPrepVersion) {
  return Object.keys(textbookCatalog[version] || {});
}

function prepUnits(version = selectedPrepVersion, book = selectedPrepBook) {
  return textbookCatalog[version]?.[book] || [];
}

function prepLessonTerms(profile, useUploadedSource = false) {
  const uploadedTerms = useUploadedSource ? teachingTermsFromText(prepSourceText).slice(0, 10) : [];
  if (uploadedTerms.length) return uploadedTerms;
  return profile.vocabulary
    .split(",")
    .map((word) => word.trim())
    .filter((word) => /^[A-Za-z][A-Za-z '-]+$/.test(word))
    .map((english) => ({ english, meaning: "" }));
}

function prepWordVisual(word) {
  const commonVisuals = {
    hello: "👋",
    hi: "👋",
    goodbye: "🌇",
    bye: "🌇",
    please: "🙏",
    thanks: "💝",
    thank: "💝",
    yes: "✅",
    no: "❌",
    friend: "🤝",
    teacher: "🧑‍🏫",
    student: "🧑‍🎓",
    school: "🏫",
    book: "📘",
  };
  const normalized = word.toLowerCase().trim();
  if (commonVisuals[normalized]) return commonVisuals[normalized];
  const themedWord = worldThemes
    .flatMap((theme) => theme.words)
    .find((item) => item[1].toLowerCase() === normalized);
  return themedWord?.[0] || "🔤";
}

function prepQuestionOptions(answer, lessonWords, fallbackWords) {
  return [...new Set([
    answer,
    ...lessonWords.filter((word) => word !== answer),
    ...fallbackWords.filter((word) => word !== answer),
  ])].slice(0, 4);
}

function prepResourceMaterial(resourceKey, profile, useUploadedSource = false) {
  const terms = prepLessonTerms(profile, useUploadedSource);
  const lessonWords = terms.map((term) => term.english).filter(Boolean);
  const topic = profile.topic || "本課";
  const fallbackWords = ["hello", "friend", "school", "teacher", "book", "apple"];
  const usableWords = [...new Set([...lessonWords, ...fallbackWords])].slice(0, 10);
  const makeWordQuestion = (word, index, mode = "image") => {
    const options = prepQuestionOptions(word, usableWords, fallbackWords);
    const shuffled = seededShuffle(options, `${resourceKey}:${word}:${index}`);
    return {
      visual: mode === "listen" ? "🎧" : prepWordVisual(word),
      prompt: mode === "listen"
        ? "聽一聽，選出你聽到的本課單字。"
        : `看圖選出本課單字「${word}」。`,
      options: shuffled,
      answer: shuffled.indexOf(word),
      speech: mode === "listen" ? word : "",
    };
  };
  const wordQuestions = usableWords.slice(0, 6).map((word, index) =>
    makeWordQuestion(word, index, resourceKey === "listening" ? "listen" : "image"));
  const sentenceAnswer = profile.sentence.split("/")[0].trim();
  const sentenceOptions = [
    sentenceAnswer,
    "Hello! Nice to meet you.",
    "This is my school.",
    "I can see a book.",
  ];
  const sentenceQuestions = usableWords.slice(0, 4).map((word, index) => {
    const answer = sentenceAnswer.replace("___", word);
    const options = [
      answer,
      ...sentenceOptions.map((sentence) => sentence.replace("___", usableWords[(index + 1) % usableWords.length])),
    ].filter((option, optionIndex, all) => option && all.indexOf(option) === optionIndex).slice(0, 4);
    while (options.length < 4) options.push(`I know ${usableWords[options.length]}.`);
    const shuffled = seededShuffle(options, `${resourceKey}:sentence:${word}`);
    return {
      visual: resourceKey === "listening" ? "🎧" : "📝",
      prompt: resourceKey === "listening"
        ? "聽完本課句型後，選出相同的句子。"
        : `選出能正確運用「${word}」的本課句型。`,
      options: shuffled,
      answer: shuffled.indexOf(answer),
      speech: resourceKey === "listening" ? answer : "",
    };
  });
  const resources = {
    flashcards: {
      title: "圖像字卡包",
      description: `${topic}單元的 ${lessonWords.slice(0, 8).join("、")} 圖像字卡與辨識練習，可用於暖身、配對及口頭抽問。`,
      ability: "word",
      icon: "🖼️",
      highlights: [`${topic}核心字詞圖卡`, `搭配「${profile.sentence}」替換練習`, `${topic}暖身配對任務`],
      questions: wordQuestions,
    },
    listening: {
      title: "聽力任務包",
      description: `使用${topic}字詞與句型，從單字辨音、句子理解到情境回應逐步練習。`,
      ability: "echo",
      icon: "🎧",
      highlights: [`${topic}關鍵字聽辨`, `聽懂「${profile.sentence}」句型`, "情境回應挑戰題"],
      questions: [...wordQuestions, ...sentenceQuestions].slice(0, 10),
    },
    differentiated: {
      title: "差異化課程包",
      description: `依${topic}單元內容分成需要支持、符合程度與進階挑戰三種層次，提供可直接調整的差異化學習單。`,
      ability: "story",
      icon: "🧩",
      highlights: [`支持版：${topic}圖像與二選一`, `標準版：${profile.sentence}應用`, "挑戰版：延伸到自主表達"],
      questions: [...wordQuestions.slice(0, 3), ...sentenceQuestions].slice(0, 7),
    },
    checkup: {
      title: "課程檢核區",
      description: `整合${topic}字詞與句型複習題，可直接發布派發，也可先進入教材編輯器調整。`,
      ability: "word",
      icon: "✅",
      highlights: [`${topic}課後複習題`, "答對率與易錯題檢核", "可直接派發或編輯"],
      questions: [...wordQuestions, ...sentenceQuestions].slice(0, 10),
    },
  };
  const resource = resources[resourceKey] || resources.checkup;
  return {
    ...resource,
    title: `${selectedPrepVersion} ${selectedPrepBook} ${selectedPrepUnit}｜${resource.title}`,
    description: `${profile.goal} ${resource.description}`,
    cefrLevel: "Pre-A1",
    status: "draft",
  };
}

function prepResourceFiles(resourceKey, profile, useUploadedSource = false) {
  const material = prepResourceMaterial(resourceKey, profile, useUploadedSource);
  const words = prepLessonTerms(profile, useUploadedSource).map((term) => term.english).filter(Boolean);
  const topic = profile.topic || "本課";
  const baseContent = {
    goal: profile.goal,
    vocabulary: words,
    sentence: profile.sentence,
    questions: material.questions,
  };
  if (resourceKey === "differentiated") {
    return [
      {
        ...material,
        resourceKey: "differentiated-support",
        title: "需要支持版學習單",
        resourceType: "worksheet",
        audience: "student",
        icon: "🌱",
        content: {
          ...baseContent,
          level: "需要支持",
          teacherGuide: `先教 4 個${topic}核心字詞，逐張指圖示範，保留中文提示與句首。`,
          activities: [`看圖圈選${topic}正確單字`, `${topic}單字與圖片連線`, `跟讀後替換一個${topic}字詞完成句子`],
          check: `能辨識 4 個${topic}核心字詞，並在提示下完成 1 句口語表達。`,
          questions: material.questions.slice(0, 4),
        },
      },
      {
        ...material,
        resourceKey: "differentiated-standard",
        title: "符合程度版學習單",
        resourceType: "worksheet",
        audience: "student",
        icon: "🚀",
        content: {
          ...baseContent,
          level: "符合程度",
          teacherGuide: `提供${topic}關鍵字但不提供完整答案，安排兩人資訊差與三輪問答。`,
          activities: [`完成${topic}字詞分類`, "依圖片寫出完整句", `與同學完成三次「${profile.sentence}」問答並記錄答案`],
          check: `能正確使用${topic}核心字詞，並以完整句完成問答。`,
          questions: material.questions.slice(0, 7),
        },
      },
      {
        ...material,
        resourceKey: "differentiated-challenge",
        title: "進階挑戰版學習單",
        resourceType: "worksheet",
        audience: "student",
        icon: "🏆",
        content: {
          ...baseContent,
          level: "進階挑戰",
          teacherGuide: `移除${topic}句型支架，要求加入原因、數量、時間或第三人稱資訊。`,
          activities: [`自行設計兩個${topic}訪問題目`, "訪問兩位同學並整理結果", "使用 2–3 句英語口頭報告"],
          check: `能靈活替換${topic}語料、補充新訊息並完成自主表達。`,
          questions: material.questions,
        },
      },
    ];
  }
  const definitions = {
    flashcards: {
      resourceType: "teaching_material",
      audience: "teacher",
      content: {
        ...baseContent,
        usage: [`暖身：快速閃卡命名${topic}字詞`, `分組：${topic}圖卡與字卡配對`, `口說：抽卡後套用「${profile.sentence}」句型`],
        cards: words.map((word) => ({ word, visual: prepWordVisual(word) })),
      },
    },
    listening: {
      resourceType: "teaching_material",
      audience: "teacher",
      content: {
        ...baseContent,
        usage: [`第一輪只聽${topic}單字並指圖`, `第二輪聽「${profile.sentence}」句子選答案`, `第三輪兩人互相朗讀${topic}句子並判斷`],
        audioScript: material.questions.map((question) => question.speech).filter(Boolean),
      },
    },
    checkup: {
      resourceType: "assessment",
      audience: "student",
      content: {
        ...baseContent,
        instructions: `完成${topic}字詞與句型複習題，教師可查看答對率與易錯內容。`,
        check: `80% 以上表示達成${topic}單元目標；未達 80% 建議改派支持版學習單。`,
      },
    },
  };
  const definition = definitions[resourceKey] || definitions.checkup;
  return [{
    ...material,
    resourceKey,
    ...definition,
  }];
}

function resourceTypeLabel(type) {
  return {
    teaching_material: "教師上課素材",
    worksheet: "學生學習單",
    assessment: "學習檢核",
  }[type] || "課程資源";
}

function renderResourceContent(content = {}) {
  const list = (items) => items?.length
    ? `<ul>${items.map((item) => `<li>${escapeHTML(typeof item === "string" ? item : item.word || "")}</li>`).join("")}</ul>`
    : "";
  return `
    ${content.level ? `<div class="resource-detail-row"><b>適用層次</b><p>${escapeHTML(content.level)}</p></div>` : ""}
    ${content.goal ? `<div class="resource-detail-row"><b>學習目標</b><p>${escapeHTML(content.goal)}</p></div>` : ""}
    ${content.vocabulary?.length ? `<div class="resource-detail-row"><b>核心字詞</b><div class="prep-term-list">${content.vocabulary.map((word) => `<span>${escapeHTML(word)}</span>`).join("")}</div></div>` : ""}
    ${content.sentence ? `<div class="resource-detail-row"><b>核心句型</b><p>${escapeHTML(content.sentence)}</p></div>` : ""}
    ${content.teacherGuide ? `<div class="resource-detail-row"><b>教師操作方式</b><p>${escapeHTML(content.teacherGuide)}</p></div>` : ""}
    ${content.usage?.length ? `<div class="resource-detail-row"><b>上課使用步驟</b>${list(content.usage)}</div>` : ""}
    ${content.cards?.length ? `<div class="resource-detail-row"><b>圖像字卡</b><div class="resource-card-sheet">${content.cards.map((card) => `
      <article>
        <span>${escapeHTML(card.visual || "🔤")}</span>
        <strong>${escapeHTML(card.word || "")}</strong>
        ${card.meaning ? `<small>${escapeHTML(card.meaning)}</small>` : ""}
      </article>`).join("")}</div></div>` : ""}
    ${content.activities?.length ? `<div class="resource-detail-row"><b>學生學習內容</b>${list(content.activities)}</div>` : ""}
    ${content.audioScript?.length ? `<div class="resource-detail-row"><b>聽力素材腳本</b>${list(content.audioScript)}</div>` : ""}
    ${content.check ? `<div class="resource-detail-row"><b>學習檢核標準</b><p>${escapeHTML(content.check)}</p></div>` : ""}
    ${content.questions?.length ? `<div class="resource-detail-row"><b>內含題目</b><ol>${content.questions.slice(0, 10).map((question) => `<li>${escapeHTML(question.prompt)}</li>`).join("")}</ol></div>` : ""}`;
}

function prepSourceInsights(profile, useUploadedSource = false) {
  const hasUploadedSource = useUploadedSource && Boolean(prepSourceText);
  const terms = prepLessonTerms(profile, useUploadedSource);
  const termLabels = terms.map((term) =>
    `<span>${escapeHTML(term.english)}${term.meaning ? `・${escapeHTML(term.meaning)}` : ""}</span>`,
  ).join("");
  return `
    <section class="card prep-insight">
      <div class="prep-insight-heading">
        <div><span class="quest-eyebrow">SMART CO-PLANNING</span><h2>${hasUploadedSource ? "教材共備摘要" : "單元備課重點"}</h2></div>
        <span class="status ${hasUploadedSource ? "success" : ""}">${hasUploadedSource ? "已讀取教師教材" : "版本單元建議"}</span>
      </div>
      <div class="prep-insight-grid">
        <div><b>本課核心語料</b><div class="prep-term-list">${termLabels || "<span>上傳教材後自動整理</span>"}</div></div>
        <div><b>本課教學重點</b><p>${escapeHTML(profile.focus || "依本課核心字詞與句型安排理解、操練與應用任務。")}</p></div>
        <div><b>教學調整建議</b><p>${hasUploadedSource
          ? "先用教材中的原句做理解輸入，再將核心字詞放入圖片辨識、聽力選擇與口說任務；離堂前以不同題型再次檢核。"
          : "先確認學生能辨識核心字詞，再進入完整句型；同一語料至少安排一次理解任務與一次表達任務。"}</p></div>
        <div><b>共備提醒</b><p>${hasUploadedSource
          ? `已讀取 ${prepSourceText.length.toLocaleString()} 字。建議從上方語料挑選 6–10 個核心字詞，避免單節課負荷過高。`
          : "此區依目前選擇的教科書版本、冊數與單元產生，可作為 AI 備課包的課程核心。"}</p></div>
      </div>
    </section>`;
}

function renderTeacherOwnedMaterialPanel(profile) {
  const uploadedTerms = teachingTermsFromText(prepSourceText).slice(0, 10);
  const termLabels = uploadedTerms.map((term) =>
    `<span>${escapeHTML(term.english)}${term.meaning ? `・${escapeHTML(term.meaning)}` : ""}</span>`,
  ).join("");
  return `
    <section class="card prep-owned-panel">
      <div class="prep-panel-heading">
        <div><span class="quest-eyebrow">TEACHER MATERIALS</span><h2>教師自有教材</h2><p>上傳老師自己的講義、簡報、PDF、試算表、圖片或文字教材後，系統會擷取核心語料並產生題目草稿。</p></div>
        <label class="primary-btn teaching-file-button">上傳教材並分析<input id="prep-material-file" type="file" /></label>
      </div>
      <div class="owned-material-result ${prepSourceText ? "ready" : ""}">
        ${prepSourceText ? `
          <div><b>已讀取教材</b><p id="prep-file-status">已分析 ${prepSourceText.length.toLocaleString()} 字，可用於出題。</p></div>
          <div><b>擷取語料</b><div class="prep-term-list">${termLabels || "<span>尚未擷取到英文單字，仍可手動命題。</span>"}</div></div>
          <div class="owned-material-actions">
            <button class="secondary-btn clear-owned-material" type="button">清除重傳</button>
            <button class="primary-btn generate-owned-material-quiz" type="button">用自有教材產生題組</button>
          </div>
        ` : `
          <div><b>尚未上傳教材</b><p id="prep-file-status">請先選擇檔案。檔案只在瀏覽器中解析，產生題目後仍可逐題修改。</p></div>
          <ul>
            <li>適合：教師授課簡報、單元講義、單字表、閱讀文本、學習單。</li>
            <li>用途：自動整理核心字詞，產生選擇、聽力、閱讀或拼字題草稿。</li>
          </ul>
        `}
      </div>
    </section>`;
}

function renderPrepCenter(user) {
  const books = prepBooks(selectedPrepVersion);
  if (!books.includes(selectedPrepBook)) selectedPrepBook = books[0];
  const units = prepUnits(selectedPrepVersion, selectedPrepBook);
  if (!units.includes(selectedPrepUnit)) selectedPrepUnit = units[0];
  const profile = prepUnitProfile(selectedPrepVersion, selectedPrepUnit);
  return `
    ${teacherHeader(user, "備課中心", "上傳自有教材命題，或使用 AI 備課包快速產出課程規劃")}
    <section class="prep-hero">
      <div><span class="quest-eyebrow">LESSON LAB</span><h2>把備課分成兩條清楚路線</h2><p>教師自有教材用來上傳命題；AI 備課包依教科書版本、冊數與單元產出學習目標、教學流程、重點與素材包。</p></div>
      <img src="assets/toki.png" alt="Toki 備課夥伴" />
    </section>
    ${renderTeacherOwnedMaterialPanel(profile)}
    <section class="card ai-prep-panel">
      <div class="prep-panel-heading">
        <div><span class="quest-eyebrow">AI LESSON PACK</span><h2>AI 備課包</h2><p>選擇教科書版本、冊數與單元後，自動產出對應的學習目標、教學流程與重點，以及上課素材與教材資源包。</p></div>
      </div>
      <div class="prep-controls">
        <div class="field"><label>教科書版本</label><select id="prep-version">${Object.keys(textbookCatalog).map((version) => `<option ${version === selectedPrepVersion ? "selected" : ""}>${version}</option>`).join("")}</select></div>
        <div class="field"><label>冊數</label><select id="prep-book">${books.map((book) => `<option ${book === selectedPrepBook ? "selected" : ""}>${book}</option>`).join("")}</select></div>
        <div class="field"><label>單元</label><select id="prep-unit">${units.map((unit) => `<option ${unit === selectedPrepUnit ? "selected" : ""}>${unit}</option>`).join("")}</select></div>
      </div>
    </section>
    ${prepSourceInsights(profile, false)}
    <section class="prep-plan-grid">
      <article class="card prep-plan-card goal"><span>01</span><h3>學習目標</h3><p>${profile.goal}</p><b>本課重點</b><small>${profile.focus}</small><b>核心字詞</b><small>${profile.vocabulary}</small><b>核心句型</b><small>${profile.sentence}</small></article>
      <article class="card prep-plan-card flow"><span>02</span><h3>40 分鐘課程流程</h3><ol><li>暖身 5 分：${profile.warmup}</li><li>字詞輸入 10 分：圖像、發音、動作三路輸入。</li><li>句型操練 10 分：先全班、再同桌問答。</li><li>任務應用 12 分：${profile.task}</li><li>離堂檢核 3 分：一題聽力＋一題口說。</li></ol></article>
      <article class="card prep-plan-card differentiation"><span>03</span><h3>差異化教學建議做法</h3>
        <div><b>需要支持｜圖像與口語支架</b><p><strong>教師做法：</strong>先示範 4 個核心字詞，提供圖片、中文提示與句首。<br><strong>學生任務：</strong>完成看圖二選一，再跟讀並替換 1 個字詞。<br><strong>檢核：</strong>能指出圖片並說出單字，即完成基礎目標。</p></div>
        <div><b>符合程度｜完整問答與合作</b><p><strong>教師做法：</strong>保留關鍵字提示，安排同桌資訊差活動。<br><strong>學生任務：</strong>使用「${escapeHTML(profile.sentence)}」完成 3 次完整問答。<br><strong>檢核：</strong>字詞正確且能以完整句回應。</p></div>
        <div><b>進階挑戰｜延伸與自主表達</b><p><strong>教師做法：</strong>移除句型支架，加入原因、數量或第三人稱條件。<br><strong>學生任務：</strong>自行設計 2 題詢問同學，並用 2–3 句報告結果。<br><strong>檢核：</strong>能靈活替換字詞並補充新訊息。</p></div>
      </article>
    </section>
    <div class="section-title"><div><h2>上課素材與教材資源包</h2><p>可直接搭配目前單元使用，再依班級狀況微調。</p></div></div>
    <section class="resource-pack-grid">
      ${["flashcards", "listening", "differentiated", "checkup"].map((resourceKey) => {
        const files = prepResourceFiles(resourceKey, profile);
        const resource = files[0];
        const displayTitle = resourceKey === "differentiated" ? "差異化課程包" : resource.title.split("｜").pop();
        return `<article class="card resource-pack">
          <span>${resource.icon}</span><h3>${displayTitle}</h3><p>${escapeHTML(resource.description.split("。").slice(-2).join("。"))}</p>
          <ul>${resource.highlights.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          <small>${resourceKey === "differentiated" ? "內含 3 份不同程度學習單" : `已依 ${escapeHTML(selectedPrepUnit)} 產生完整內容`}</small>
          <div class="resource-pack-actions">
            <button class="secondary-btn prep-resource-preview" data-resource-key="${resourceKey}">查看實際內容</button>
            <button class="primary-btn prep-resource-add" data-resource-key="${resourceKey}">加入課程包</button>
          </div>
        </article>`;
      }).join("")}
    </section>`;
}

function ownedMaterialDraftFromUpload() {
  const profile = prepUnitProfile(selectedPrepVersion, selectedPrepUnit);
  const material = prepResourceMaterial("checkup", profile, true);
  return {
    title: `自有教材題組｜${new Date().toLocaleDateString("zh-TW")}`,
    description: prepSourceText
      ? `依教師上傳教材擷取核心語料產生，來源約 ${prepSourceText.length.toLocaleString()} 字。`
      : "依教師自有教材建立的題組草稿。",
    ability: "word",
    cefrLevel: "Pre-A1",
    status: "draft",
    questions: material.questions,
  };
}

function renderStudentPreview(user) {
  const students = activeStudents();
  if (selectedPreviewStudent >= students.length) selectedPreviewStudent = 0;
  const previewStudent = students[selectedPreviewStudent];
  const previewUser = {
    account: previewStudent?.player || "學生玩家",
    xp: previewStudent?.xp || 0,
    cefrLevel: previewStudent?.level || "Pre-A1",
    abilityValues: previewStudent ? Object.fromEntries(
      abilities.map((ability, index) => [ability.id, previewStudent.abilities?.[index] || 0]),
    ) : emptyAbilityValues(),
    abilityTrends: emptyAbilityValues(),
    weeklySummary: {
      studyDays: previewStudent?.days || 0,
      xpEarned: previewStudent?.weeklyXp || 0,
      completedTasks: previewStudent?.taskCount || 0,
    },
    streakDays: previewStudent?.streakDays || 0,
    completedThemeIds: previewStudent?.completedThemeIds || [],
  };
  return `
    ${teacherHeader(user, "學生端預覽", "確認學生登入後看到的首頁、任務、晉級與能力資訊")}
    <section class="preview-toolbar card">
      <div class="field preview-student-field"><label>預覽學生</label><select id="preview-student">${students.map((student, index) => `<option value="${index}" ${index === selectedPreviewStudent ? "selected" : ""}>${escapeHTML(student.name)}（${escapeHTML(student.seat)}號）</option>`).join("") || '<option>目前沒有學生</option>'}</select></div>
      <div><b>預覽身分：${escapeHTML(previewStudent?.name || "示範學生")}</b><p>此畫面為唯讀預覽，顯示目前已設定任務與學生實際能力，不會產生學習紀錄。</p></div>
      <button class="secondary-btn" data-page="content">前往任務派發中心微調</button>
    </section>
    <section class="device-preview">
      <div class="device-preview-bar"><span></span><b>WonderGo 學生首頁</b><em>唯讀預覽</em></div>
      <div class="student-preview-content">
        ${playerHeader(previewUser, `嗨，${escapeHTML(previewUser.account)}！`, "今天也和 Toki 一起前進一點吧。")}
        ${renderPlayerMomentum(previewUser)}
        ${renderPreviewAssignments(previewStudent)}
        ${renderMissions()}
        ${renderLevelJourney(previewUser)}
        ${renderThemeBadges(previewUser)}
        ${renderAbilityDashboard(previewUser)}
      </div>
    </section>`;
}

function renderPreviewAssignments(student) {
  if (!student) return "";
  const assignments = (teacherContent.assignments || []).filter((assignment) =>
    !assignment.studentId || assignment.studentId === student.id);
  if (!assignments.length) return "";
  return `
    <section class="assigned-quest-panel preview-assignment-panel">
      <div class="section-title">
        <div><span class="quest-eyebrow">TEACHER QUEST</span><h2>老師指派任務</h2><p>以下為此學生目前會看到的任務。</p></div>
        <span class="quest-reward">${assignments.length} 項</span>
      </div>
      <div class="assigned-quest-grid">
        ${assignments.slice(0, 5).map((assignment) => {
          const material = teacherContent.materials.find((item) =>
            item.id === assignment.materialId);
          const ability = abilities.find((item) => item.id === material?.ability);
          return `
            <article class="assigned-quest" style="--assignment-color:${ability?.color || "#6c4ee3"}">
              <span class="assigned-icon">${ability?.scene || "📝"}</span>
              <div><span class="mission-tag">${escapeHTML(material?.cefrLevel || student.level || "Pre-A1")}</span><h3>${escapeHTML(assignment.title)}</h3><p>${escapeHTML(assignment.instructions || material?.description || "完成老師安排的學習任務。")}</p><small>獎勵 ${assignment.xpReward} XP</small></div>
              <button class="primary-btn" disabled>開始任務</button>
            </article>`;
        }).join("")}
      </div>
    </section>`;
}

function questionsToText(questions = []) {
  return questions.map((question) => [
    question.visual || "📝",
    question.prompt,
    question.options?.[question.answer] || "",
    ...question.options.filter((_, index) => index !== question.answer).slice(0, 3),
    question.speech || "",
  ].join(" | ")).join("\n");
}

function parseMaterialQuestions(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length) throw new Error("請至少輸入一題教材題目。");
  if (lines.length > 20) throw new Error("每份教材最多 20 題。");
  return lines.map((line, index) => {
    const parts = line.split(/[|｜]/).map((part) => part.trim());
    if (parts.length < 6 || parts.slice(1, 6).some((part) => !part)) {
      throw new Error(`第 ${index + 1} 題格式不完整，請確認題目與四個答案選項。`);
    }
    return {
      visual: parts[0] || "📝",
      prompt: parts[1],
      options: [parts[2], parts[3], parts[4], parts[5]],
      answer: 0,
      speech: parts[6] || "",
    };
  });
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field.trim());
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(field.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  row.push(field.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function parseMaterialCsv(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) throw new Error("CSV 內沒有題目，請先下載範例檔確認格式。");
  const headers = rows[0].map((header) => header.toLowerCase().replace(/\s/g, ""));
  const findColumn = (...names) => headers.findIndex((header) =>
    names.some((name) => header === name.toLowerCase().replace(/\s/g, "")));
  const columns = {
    visual: findColumn("圖片", "圖片/emoji", "visual"),
    prompt: findColumn("題目", "prompt"),
    correct: findColumn("正確答案", "correctanswer", "answer"),
    option2: findColumn("選項2", "option2"),
    option3: findColumn("選項3", "option3"),
    option4: findColumn("選項4", "option4"),
    speech: findColumn("播放語音", "speech"),
  };
  if ([columns.prompt, columns.correct, columns.option2, columns.option3, columns.option4].some((index) => index < 0)) {
    throw new Error("CSV 欄位不完整，請使用 WonderGo 範例檔。");
  }
  const questions = rows.slice(1).filter((row) => row.some(Boolean)).map((row, index) => {
    const value = (column) => column >= 0 ? (row[column] || "").trim() : "";
    const options = [
      value(columns.correct),
      value(columns.option2),
      value(columns.option3),
      value(columns.option4),
    ];
    if (!value(columns.prompt) || options.some((option) => !option)) {
      throw new Error(`CSV 第 ${index + 2} 列不完整，請確認題目與四個答案。`);
    }
    return {
      visual: value(columns.visual) || "📝",
      prompt: value(columns.prompt),
      options,
      answer: 0,
      speech: value(columns.speech),
    };
  });
  if (!questions.length) throw new Error("CSV 內沒有可匯入的題目。");
  if (questions.length > 20) throw new Error("每份教材最多 20 題，請分成不同教材匯入。");
  return questions;
}

function loadPublicGoogleSheet(sheetUrl) {
  const id = sheetUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!id) return Promise.reject(new Error("請貼上 Google 試算表的完整分享網址。"));
  const gid = sheetUrl.match(/[?#&]gid=(\d+)/)?.[1] || "0";
  return new Promise((resolve, reject) => {
    const callbackName = `wonderGoSheet${Date.now()}`;
    const script = document.createElement("script");
    const cleanup = () => {
      script.remove();
      delete window[callbackName];
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("讀取逾時，請確認試算表已開放「知道連結的使用者可查看」。"));
    }, 15000);
    window[callbackName] = (result) => {
      window.clearTimeout(timeout);
      try {
        if (result.status === "error" || !result.table) {
          throw new Error("無法讀取試算表，請確認分享權限及工作表網址。");
        }
        const headers = result.table.cols.map((column) => column.label || column.id || "");
        const rows = result.table.rows.map((row) =>
          headers.map((_, index) => row.c?.[index]?.v ?? ""));
        const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`;
        resolve([headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"));
      } catch (error) {
        reject(error);
      } finally {
        cleanup();
      }
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("Google 試算表讀取失敗，請稍後再試。"));
    };
    script.src = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=responseHandler:${callbackName}&gid=${gid}`;
    document.head.appendChild(script);
  });
}

function teachingTermsFromText(text) {
  const terms = text.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const englishFirst = line.match(/^([A-Za-z][A-Za-z '\-]{1,40})\s*[,，\t:：|｜]\s*(.+)$/);
      if (englishFirst) return { english: englishFirst[1].trim(), meaning: englishFirst[2].trim() };
      const chineseFirst = line.match(/^(.+?)\s*[,，\t:：|｜]\s*([A-Za-z][A-Za-z '\-]{1,40})$/);
      if (chineseFirst) return { english: chineseFirst[2].trim(), meaning: chineseFirst[1].trim() };
      return null;
    })
    .filter(Boolean);
  return [...new Map(terms.map((term) => [term.english.toLowerCase(), term])).values()];
}

const externalScriptPromises = new Map();

function loadExternalScript(src, globalName) {
  if (globalName && window[globalName]) return Promise.resolve(window[globalName]);
  if (externalScriptPromises.has(src)) return externalScriptPromises.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(globalName ? window[globalName] : true);
    script.onerror = () => reject(new Error("文件解析元件載入失敗，請確認網路後重試。"));
    document.head.appendChild(script);
  });
  externalScriptPromises.set(src, promise);
  return promise;
}

function normalizedFileExtension(fileName) {
  return fileName.toLowerCase().split(".").pop() || "";
}

function extractXmlText(xml) {
  const spacedXml = xml
    .replace(/<\/(?:w:p|a:p|text:p|table:table-row)>/g, "\n")
    .replace(/<\/(?:w:tc|a:r|table:table-cell)>/g, "\t");
  const documentNode = new DOMParser().parseFromString(spacedXml, "application/xml");
  return documentNode.documentElement?.textContent
    ?.replace(/[ \f\v]+/g, " ")
    .replace(/\t+/g, "\t")
    .replace(/\n\s*/g, "\n")
    .replace(/([.!?。！？])\s*/g, "$1\n")
    .trim() || "";
}

async function extractZipDocumentText(file, extension) {
  await loadExternalScript(
    "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",
    "JSZip",
  );
  const archive = await window.JSZip.loadAsync(await file.arrayBuffer());
  let paths = [];
  if (extension === "docx") paths = ["word/document.xml"];
  if (extension === "pptx") {
    paths = Object.keys(archive.files)
      .filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path))
      .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
  }
  if (extension === "odt") paths = ["content.xml"];
  const parts = await Promise.all(paths.map(async (path) => {
    const entry = archive.file(path);
    return entry ? extractXmlText(await entry.async("text")) : "";
  }));
  return parts.filter(Boolean).join("\n");
}

async function extractSpreadsheetText(file) {
  await loadExternalScript(
    "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
    "XLSX",
  );
  const workbook = window.XLSX.read(await file.arrayBuffer());
  return workbook.SheetNames.map((name) => {
    const csv = window.XLSX.utils.sheet_to_csv(workbook.Sheets[name]);
    return csv ? `【${name}】\n${csv}` : "";
  }).filter(Boolean).join("\n\n");
}

async function extractPdfText(file) {
  const pdfjs = await import(
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.mjs"
  );
  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.mjs";
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }
  return pages.join("\n");
}

async function extractImageText(file, onProgress) {
  await loadExternalScript(
    "https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/tesseract.min.js",
    "Tesseract",
  );
  const result = await window.Tesseract.recognize(file, "eng+chi_tra", {
    logger: (message) => {
      if (message.status === "recognizing text") {
        onProgress?.(`圖片文字辨識中 ${Math.round((message.progress || 0) * 100)}%`);
      }
    },
  });
  return result.data.text;
}

async function extractTeachingMaterialText(file, onProgress) {
  const extension = normalizedFileExtension(file.name);
  const textExtensions = new Set(["txt", "csv", "tsv", "md", "json", "html", "htm", "xml", "srt"]);
  const spreadsheetExtensions = new Set(["xlsx", "xls", "xlsb", "ods", "numbers"]);
  const zipDocumentExtensions = new Set(["docx", "pptx", "odt"]);
  const imageExtensions = new Set(["png", "jpg", "jpeg", "webp", "bmp", "gif", "tif", "tiff"]);
  if (file.size > 25 * 1024 * 1024) {
    throw new Error("檔案超過 25 MB，請先壓縮圖片或分成較小的教材檔案。");
  }
  if (textExtensions.has(extension) || file.type.startsWith("text/")) return file.text();
  if (extension === "pdf" || file.type === "application/pdf") {
    onProgress?.("正在讀取 PDF 文字...");
    return extractPdfText(file);
  }
  if (spreadsheetExtensions.has(extension)) {
    onProgress?.("正在讀取試算表...");
    return extractSpreadsheetText(file);
  }
  if (zipDocumentExtensions.has(extension)) {
    onProgress?.(`正在讀取 ${extension.toUpperCase()} 文件...`);
    return extractZipDocumentText(file, extension);
  }
  if (imageExtensions.has(extension) || file.type.startsWith("image/")) {
    onProgress?.("準備進行圖片文字辨識...");
    return extractImageText(file, onProgress);
  }
  const fallbackText = await file.text();
  const readableCharacters = [...fallbackText.slice(0, 2000)]
    .filter((character) => /[\p{L}\p{N}\p{P}\p{Z}\r\n\t]/u.test(character)).length;
  if (fallbackText.length && readableCharacters / Math.min(fallbackText.length, 2000) > 0.75) {
    return fallbackText;
  }
  throw new Error("此格式無法直接擷取文字。請匯出為 PDF、Word、PowerPoint、Excel、圖片或文字檔後再上傳。");
}

function spellingDistractors(word) {
  const clean = word.trim();
  const candidates = [
    clean.length > 3 ? `${clean.slice(0, 1)}${clean[2]}${clean[1]}${clean.slice(3)}` : `${clean}e`,
    clean.length > 3 ? `${clean.slice(0, -1)}${clean.at(-2)}` : `${clean.slice(0, -1)}`,
    `${clean.slice(0, 1)}${clean.slice(1).replace(/[aeiou]/i, "a")}`,
    `${clean}${clean.at(-1)}`,
  ].filter((item) => item && item.toLowerCase() !== clean.toLowerCase());
  return [...new Set(candidates)].slice(0, 3);
}

function generateQuestionsFromTeachingText(text, type, requestedCount) {
  const terms = teachingTermsFromText(text);
  if (terms.length < 4) {
    throw new Error("授課資料至少需要 4 組「英文、中文」內容，每組一行。");
  }
  const count = Math.min(Number(requestedCount) || 10, terms.length, 20);
  return terms.slice(0, count).map((term, index) => {
    const distractorTerms = terms.filter((item) => item !== term)
      .slice(index % Math.max(1, terms.length - 3))
      .concat(terms)
      .filter((item, itemIndex, list) =>
        item !== term && list.findIndex((candidate) => candidate.english === item.english) === itemIndex)
      .slice(0, 3);
    let prompt = `「${term.meaning}」的英文是什麼？`;
    let options = [term.english, ...distractorTerms.map((item) => item.english)];
    let speech = "";
    if (type === "listen") {
      prompt = "聽一聽，選出正確單字。";
      speech = term.english;
    } else if (type === "spell") {
      prompt = `選出「${term.meaning}」的正確拼字。`;
      const spellingOptions = spellingDistractors(term.english);
      options = [term.english, ...spellingOptions, ...distractorTerms.map((item) => item.english)].slice(0, 4);
    } else if (type === "read") {
      prompt = `Which word means「${term.meaning}」?`;
    } else if (type === "speak") {
      prompt = `看提示選出正確英文，並跟著說：「${term.meaning}」`;
      speech = term.english;
    }
    return {
      visual: { listen: "🎧", spell: "✏️", read: "📖", speak: "🎙️" }[type] || "💎",
      prompt,
      options,
      answer: 0,
      speech,
    };
  });
}

function emptyMaterialQuestion() {
  return {
    visual: "📝",
    prompt: "",
    options: ["", "", "", ""],
    answer: 0,
    speech: "",
  };
}

function renderQuestionEditorCard(question = emptyMaterialQuestion(), index = 0) {
  const normalized = normalizeQuestion(question);
  const correctAnswer = normalized.options[normalized.answer] || "";
  const wrongAnswers = normalized.options
    .filter((_, optionIndex) => optionIndex !== normalized.answer)
    .slice(0, 3);
  while (wrongAnswers.length < 3) wrongAnswers.push("");
  return `
    <article class="question-editor-card" data-question-index="${index}">
      <header>
        <span class="question-number">第 ${index + 1} 題</span>
        <div>
          <button class="question-move" type="button" data-direction="up" aria-label="題目上移">↑</button>
          <button class="question-move" type="button" data-direction="down" aria-label="題目下移">↓</button>
          <button class="question-remove" type="button">刪除</button>
        </div>
      </header>
      <div class="question-editor-grid">
        <div class="field question-visual-field"><label>圖片／Emoji</label><input data-question-field="visual" value="${escapeHTML(normalized.visual || "📝")}" placeholder="🍎" /></div>
        <div class="field question-prompt-field"><label>題目</label><input data-question-field="prompt" value="${escapeHTML(normalized.prompt || "")}" placeholder="哪一個單字是「蘋果」？" required /></div>
        <div class="field correct-answer-field"><label>正確答案</label><input data-question-field="correct" value="${escapeHTML(correctAnswer)}" placeholder="apple" required /></div>
        ${wrongAnswers.map((answer, wrongIndex) => `
          <div class="field"><label>其他選項 ${wrongIndex + 1}</label><input data-question-field="wrong-${wrongIndex + 1}" value="${escapeHTML(answer)}" placeholder="請輸入完整選項" required /></div>`).join("")}
        <div class="field full"><label>播放語音（選填）</label><input data-question-field="speech" value="${escapeHTML(normalized.speech || "")}" placeholder="需要聽力題時，輸入要播放的英文" /></div>
      </div>
    </article>`;
}

function renderQuestionEditorList(questions = []) {
  const source = questions.length ? questions : [emptyMaterialQuestion()];
  return source.map(renderQuestionEditorCard).join("");
}

function collectQuestionEditorData() {
  const cards = [...document.querySelectorAll(".question-editor-card")];
  if (!cards.length) throw new Error("請至少建立一題教材題目。");
  if (cards.length > 20) throw new Error("每份教材最多 20 題。");
  return cards.map((card, index) => {
    const value = (field) =>
      card.querySelector(`[data-question-field="${field}"]`)?.value.trim() || "";
    const prompt = value("prompt");
    const options = [value("correct"), value("wrong-1"), value("wrong-2"), value("wrong-3")];
    if (!prompt || options.some((option) => !option)) {
      throw new Error(`第 ${index + 1} 題尚未填完整，請確認題目與四個答案選項。`);
    }
    if (new Set(options.map((option) => option.toLowerCase())).size < 4) {
      throw new Error(`第 ${index + 1} 題有重複選項，請改成四個不同答案。`);
    }
    return {
      visual: value("visual") || "📝",
      prompt,
      options,
      answer: 0,
      speech: value("speech"),
    };
  });
}

function renderMaterialEditor(material = null) {
  const sample = [
    "🍎 | 哪一個單字是「蘋果」？ | apple | banana | orange | grape | apple",
    "🐶 | 聽一聽，選出正確單字。 | dog | cat | bird | fish | dog",
  ].join("\n");
  return `
    <div class="game-modal admin-edit-modal" id="material-editor-modal">
      <article class="game-card admin-edit-card material-editor-card">
        <header>
          <div><span class="mission-tag">教材編輯器</span><h2>${material ? "編輯教材" : "建立新教材"}</h2></div>
          <button class="ghost-btn close-material-editor" type="button">✕</button>
        </header>
        <form id="material-form">
          <input type="hidden" name="id" value="${material?.id || ""}" />
          <div class="form-grid">
            <div class="field full"><label>教材名稱</label><input name="title" maxlength="100" value="${escapeHTML(material?.title || "")}" placeholder="例：食物單字大挑戰" required /></div>
            <div class="field full"><label>教材說明</label><textarea name="description" rows="2" placeholder="說明本教材的學習目標">${escapeHTML(material?.description || "")}</textarea></div>
            <div class="field"><label>五大能力</label><select name="ability">${abilities.map((ability) => `<option value="${ability.id}" ${material?.ability === ability.id ? "selected" : ""}>${ability.shortName}</option>`).join("")}</select></div>
            <div class="field"><label>適用程度</label><select name="cefrLevel">${["Pre-A1", "A1", "A2", "B1", "B2"].map((level) => `<option ${material?.cefrLevel === level ? "selected" : ""}>${level}</option>`).join("")}</select></div>
            <div class="field full"><label>發布狀態</label><select name="status"><option value="draft" ${material?.status === "draft" ? "selected" : ""}>草稿</option><option value="published" ${!material || material.status === "published" ? "selected" : ""}>發布，可供指派</option><option value="archived" ${material?.status === "archived" ? "selected" : ""}>封存</option></select></div>
            <div class="field full">
              <div class="question-editor-heading">
                <div><label>教材題目</label><small class="field-help">逐題填寫，最多 20 題；可拖曳概念改用上下按鈕調整順序。</small></div>
                <div><button class="ai-btn" id="open-ai-generator" type="button">✦ 智慧命題</button><button class="secondary-btn" id="open-batch-import" type="button">試算表批次匯入</button><button class="primary-btn" id="add-question" type="button">＋ 逐題新增</button></div>
              </div>
              <div class="question-editor-list" id="question-editor-list">${renderQuestionEditorList(material?.questions || [])}</div>
            </div>
          </div>
          <div class="editor-actions"><button class="ghost-btn close-material-editor" type="button">取消</button><button class="secondary-btn" id="save-material" name="saveIntent" value="save" type="submit">儲存教材</button><button class="primary-btn" id="publish-and-assign" name="saveIntent" value="assign" type="submit">發布並前往指派</button></div>
        </form>
      </article>
    </div>
    <div class="game-modal batch-import-modal hidden" id="ai-generator-modal">
      <article class="game-card batch-import-card">
        <header><div><span class="mission-tag">智慧題目助手</span><h2>從授課資料快速產生題目</h2></div><button class="ghost-btn" id="close-ai-generator" type="button">✕</button></header>
        <div class="ai-generator-intro"><b>1. 上傳或貼上授課資料</b><p>支援 PDF、Word、PowerPoint、Excel、CSV、TXT、Markdown、網頁文字與常見圖片；其他格式也可選取，系統會嘗試辨識。</p></div>
        <label class="secondary-btn teaching-file-button">選擇任何授課檔案<input id="teaching-material-file" type="file" /></label>
        <small id="teaching-file-status" class="field-help">單檔上限 25 MB，也可以直接貼到下方文字框</small>
        <textarea class="question-source" id="teaching-material-source" rows="9" placeholder="apple, 蘋果&#10;banana, 香蕉&#10;orange, 柳橙&#10;grape, 葡萄"></textarea>
        <div class="form-grid ai-generator-options">
          <div class="field"><label>選擇題型</label><select id="ai-question-type"><option value="word">單字辨識</option><option value="listen">聽力理解</option><option value="read">閱讀理解</option><option value="spell">拼字工藝</option><option value="speak">口說跟讀</option></select></div>
          <div class="field"><label>產生題數</label><select id="ai-question-count"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></div>
        </div>
        <div class="ai-generator-note">檔案內容只在目前瀏覽器中解析，不會另外儲存原始檔。系統會先產生題目草稿，教師仍可逐題修改後再發布。</div>
        <div class="editor-actions"><button class="ghost-btn" id="cancel-ai-generator" type="button">取消</button><button class="primary-btn" id="generate-ai-questions" type="button">分析教材並產生題目</button></div>
      </article>
    </div>
    <div class="game-modal batch-import-modal hidden" id="batch-import-modal">
      <article class="game-card batch-import-card">
        <header><div><span class="mission-tag">快速匯入</span><h2>選擇最方便的上傳方式</h2></div><button class="ghost-btn" id="close-batch-import" type="button">✕</button></header>
        <div class="import-method-grid">
          <section class="import-method featured">
            <span class="import-step">推薦</span>
            <h3>上傳範例檔</h3>
            <p>先下載 CSV 範例，在 Excel 或 Google 試算表填寫後上傳。</p>
            <div class="import-method-actions">
              <a class="secondary-btn" href="assets/wondergo-question-template.csv" download>1. 下載範例 CSV</a>
              <label class="primary-btn file-upload-button">2. 選擇 CSV<input id="question-file-input" type="file" accept=".csv,text/csv" /></label>
            </div>
            <small id="question-file-status">尚未選擇檔案</small>
          </section>
          <section class="import-method">
            <span class="import-step">Google</span>
            <h3>直接讀取 Google 試算表</h3>
            <p>使用 WonderGo 範例欄位建立試算表，設為「知道連結的使用者可查看」，再貼上分享網址。</p>
            <div class="google-sheet-import"><input id="google-sheet-url" type="url" placeholder="貼上 Google 試算表分享網址" /><button class="secondary-btn" id="read-google-sheet" type="button">讀取題目</button></div>
            <small>Google 表單回覆也可先連結試算表，再用此方式讀取。</small>
          </section>
        </div>
        <details class="paste-import-details">
          <summary>或直接貼上多題文字</summary>
          <p>每行一題，使用直線「｜」或鍵盤的「|」分隔欄位。</p>
          <textarea class="question-source" id="batch-question-source" rows="10" placeholder="${escapeHTML(sample)}">${escapeHTML(material ? questionsToText(material.questions) : "")}</textarea>
          <small class="field-help">格式：圖片｜題目｜正確答案｜選項2｜選項3｜選項4｜播放語音（選填）</small>
        </details>
        <div class="editor-actions"><button class="ghost-btn" id="cancel-batch-import" type="button">取消</button><button class="primary-btn" id="apply-batch-import" type="button">轉成題目卡片</button></div>
      </article>
    </div>`;
}

function renderAssignmentManager(user) {
  const materials = teacherContent.materials.filter((item) => item.status === "published");
  const drafts = teacherContent.materials.filter((item) => item.status === "draft");
  const assignments = teacherContent.assignments || [];
  return `
    ${teacherHeader(user, "指派任務", "將已發布教材指派給全班、個別學生或自選小組")}
    <section class="metric-grid">
      <article class="card metric"><span>已指派任務</span><strong>${assignments.length} 項</strong><small>目前班級的任務紀錄</small></article>
      <article class="card metric"><span>可用教材</span><strong>${materials.length} 份</strong><small>已發布教材</small></article>
      <article class="card metric"><span>完成紀錄</span><strong>${assignments.reduce((sum, item) => sum + item.completions.length, 0)} 人次</strong><small>學生已完成的任務</small></article>
    </section>
    <div class="section-title material-heading">
      <div><h2>班級任務</h2><p>可指派全班、單一學生，或勾選多位學生組成這次任務小組。</p></div>
      <button class="primary-btn open-assignment-editor" ${materials.length ? "" : "disabled"}>＋ 指派任務</button>
    </div>
    ${materials.length ? "" : `<div class="insight focus"><span>!</span><div><b>${drafts.length ? `已有 ${drafts.length} 份草稿題組，尚未發布` : "請先建立學生題組"}</b><p>題組必須發布後才能指派給學生。</p><button class="secondary-btn go-material-manager">前往任務派發中心發布</button></div></div>`}
    <section class="assignment-list">
      ${assignments.length ? assignments.map((assignment) => {
        const material = teacherContent.materials.find((item) => item.id === assignment.materialId);
        const target = assignment.studentId
          ? cloudStudents.find((student) => student.id === assignment.studentId)?.name || "個別學生"
          : "全班";
        return `
          <article class="card assignment-row">
            <div class="assignment-main">
              <span class="assigned-icon">${abilities.find((item) => item.id === material?.ability)?.scene || "📝"}</span>
              <div><span class="mission-tag">${escapeHTML(target)}</span><h3>${escapeHTML(assignment.title)}</h3><p>${escapeHTML(material?.title || "教材")}・${assignment.xpReward} XP${assignment.dueAt ? `・截止 ${new Date(assignment.dueAt).toLocaleDateString("zh-TW")}` : ""}</p></div>
            </div>
            <div class="assignment-progress"><strong>${assignment.completions.length}</strong><span>人完成</span></div>
            <button class="ghost-btn delete-assignment" data-assignment="${assignment.id}">刪除</button>
          </article>`;
      }).join("") : '<section class="card empty-page"><div><div class="big-icon">✓</div><h2>尚未指派任務</h2><p style="color:var(--muted)">選擇已發布教材，安排給全班或個別學生。</p></div></section>'}
    </section>`;
}

function renderAssignmentEditor(user, targetStudentId = "", preferredMaterialId = "") {
  const materials = teacherContent.materials.filter((item) => item.status === "published");
  const initialMaterial = materials.find((item) => item.id === preferredMaterialId) || materials[0];
  const assignmentStudents = activeStudents();
  const assignmentClass = selectedTeacherClass();
  const initialMode = targetStudentId ? "individual" : "class";
  return `
    <div class="game-modal admin-edit-modal" id="assignment-editor-modal">
      <article class="game-card admin-edit-card">
        <header><div><span class="mission-tag">任務指派器</span><h2>建立班級任務</h2></div><button class="ghost-btn close-assignment-editor" type="button">✕</button></header>
        <form id="assignment-form">
          <div class="form-grid">
            <div class="field full"><label>選擇教材</label><select name="materialId" id="assignment-material" required>${materials.map((item) => `<option value="${item.id}" ${item.id === initialMaterial?.id ? "selected" : ""}>${escapeHTML(item.title)}（${item.cefrLevel}・${item.questions.length} 題）</option>`).join("")}</select></div>
            <div class="field full"><label>任務名稱</label><input name="title" maxlength="120" value="${escapeHTML(initialMaterial?.title || "")}" required /></div>
            <div class="field full">
              <label>派發方式</label>
              <div class="target-mode-switch">
                <label><input type="radio" name="targetMode" value="class" ${initialMode === "class" ? "checked" : ""} /> 全班派發</label>
                <label><input type="radio" name="targetMode" value="individual" ${initialMode === "individual" ? "checked" : ""} /> 個別派發</label>
                <label><input type="radio" name="targetMode" value="group" /> 小組派發</label>
              </div>
            </div>
            <div class="field full assignment-target-panel ${initialMode === "individual" ? "" : "hidden"}" data-target-panel="individual">
              <label>選擇一位學生</label>
              <select name="individualStudentId">${assignmentStudents.map((student) => `<option value="${student.id}" ${student.id === targetStudentId ? "selected" : ""}>${escapeHTML(student.name)}（${escapeHTML(student.seat)}號）</option>`).join("")}</select>
            </div>
            <div class="field full assignment-target-panel hidden" data-target-panel="group">
              <label>勾選小組成員</label>
              <div class="group-student-picker">
                ${assignmentStudents.map((student) => `
                  <label>
                    <input type="checkbox" name="groupStudentId" value="${student.id}" />
                    <span><b>${escapeHTML(student.name)}</b><small>${escapeHTML(student.seat)}號・${escapeHTML(student.level)}</small></span>
                  </label>`).join("") || '<p class="empty-hint">目前班級沒有可選擇的學生。</p>'}
              </div>
              <small class="field-help">至少選擇 2 位學生；本次派發後，每位組員會收到自己的任務。</small>
            </div>
            <div class="field"><label>截止日期</label><input name="dueAt" type="date" /></div>
            <div class="field"><label>完成獎勵 XP</label><input name="xpReward" type="number" min="10" max="200" value="50" required /></div>
            <div class="field full"><label>任務說明</label><textarea name="instructions" rows="3" placeholder="例：完成後請複習答錯的單字。"></textarea></div>
          </div>
          <input type="hidden" name="school" value="${escapeHTML(assignmentClass?.school || user.school)}" />
          <input type="hidden" name="className" value="${escapeHTML(assignmentClass?.className || user.className)}" />
          <div class="editor-actions"><button class="ghost-btn close-assignment-editor" type="button">取消</button><button class="primary-btn" id="save-assignment" type="submit">送出指派</button></div>
        </form>
      </article>
    </div>`;
}

function renderAdminPage(user) {
  if (currentPage === "accounts") return renderAdminAccounts(user);
  if (currentPage === "classes") return renderAdminClasses(user);
  if (currentPage === "analytics") return renderAdminAnalytics(user);
  return renderAdminOverview(user);
}

function renderAdminOverview(user) {
  const dashboard = staffDashboard || {
    students: [], teachers: [], pendingTeachers: [], classes: [], errorAnalysis: {},
  };
  return `
    ${teacherHeader(user, "平台管理總覽", "所有帳號、教師申請與班級學習狀況")}
    <section class="metric-grid admin-metrics">
      <article class="card metric"><span>學生使用者</span><strong>${dashboard.students.length} 人</strong><small>已建立玩家帳號</small></article>
      <article class="card metric"><span>教師使用者</span><strong>${dashboard.teachers.length} 人</strong><small>${dashboard.teachers.filter((teacher) => teacher.approved).length} 人已核准</small></article>
      <article class="card metric"><span>待審核申請</span><strong>${dashboard.pendingTeachers.length} 筆</strong><small>${dashboard.pendingTeachers.length ? "請儘速確認教師身分" : "目前皆已處理"}</small></article>
      <article class="card metric"><span>班級數</span><strong>${dashboard.classes.length} 班</strong><small>依學校與班級自動配對</small></article>
    </section>
    ${renderPendingTeachers(dashboard.pendingTeachers)}
    <div class="section-title"><div><h2>各班學習概況</h2><p>教師、學生與五大能力平均</p></div></div>
    ${renderClassCards(dashboard.classes)}`;
}

function renderPendingTeachers(teachers) {
  return `
    <article class="card panel pending-panel">
      <div class="section-title" style="margin:0 0 10px"><div><h2>待審核教師申請</h2><p>核准後，教師才能查看自己班級的學生資料。</p></div><span class="status ${teachers.length ? "warn" : ""}">${teachers.length} 筆</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>申請人</th><th>帳號</th><th>學校</th><th>教學班級</th><th>申請時間</th><th>操作</th></tr></thead>
        <tbody>${teachers.length ? teachers.map((teacher) => `
          <tr>
            <td><b>${escapeHTML(teacher.name)}</b></td>
            <td>${escapeHTML(teacher.account)}</td>
            <td>${escapeHTML(teacher.school)}</td>
            <td>${escapeHTML(teacher.className)}</td>
            <td>${new Date(teacher.createdAt).toLocaleDateString("zh-TW")}</td>
            <td><button class="secondary-btn approve-teacher" data-teacher="${teacher.id}">核准教師</button></td>
          </tr>`).join("") : '<tr><td colspan="6" class="empty-cell">目前沒有待審核申請</td></tr>'}</tbody>
      </table></div>
    </article>`;
}

function renderAdminAccounts(user) {
  const dashboard = staffDashboard || { users: [], pendingTeachers: [] };
  const filteredUsers = dashboard.users.filter((account) =>
    adminAccountFilter === "all" ||
    (adminAccountFilter === "teacher" && account.role === "teacher") ||
    (adminAccountFilter === "player" && account.role === "player"),
  );
  return `
    ${teacherHeader(user, "帳號與申請", "查看所有學生、教師及管理員帳號")}
    ${renderPendingTeachers(dashboard.pendingTeachers)}
    <article class="card panel" style="margin-top:20px">
      <div class="section-title account-list-heading" style="margin:0 0 10px">
        <div><h2>所有使用者</h2><p>目前顯示 ${filteredUsers.length} 個帳號</p></div>
        <div class="filter-buttons">
          <button data-account-filter="all" class="${adminAccountFilter === "all" ? "active" : ""}">全部</button>
          <button data-account-filter="teacher" class="${adminAccountFilter === "teacher" ? "active" : ""}">教師</button>
          <button data-account-filter="player" class="${adminAccountFilter === "player" ? "active" : ""}">學生</button>
        </div>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>身分</th><th>姓名／玩家</th><th>帳號</th><th>信箱</th><th>學校</th><th>班級</th><th>密碼狀態</th><th>狀態</th><th>操作</th></tr></thead>
        <tbody>${filteredUsers.map((account) => `
          <tr>
            <td><span class="status role-${account.role}">${account.role === "player" ? "學生" : account.role === "teacher" ? "教師" : "管理員"}</span></td>
            <td><b>${escapeHTML(account.name)}</b></td>
            <td>${escapeHTML(account.account)}</td>
            <td>${account.email ? escapeHTML(account.email) : "未設定"}</td>
            <td>${escapeHTML(account.school)}</td>
            <td>${escapeHTML(account.className)}</td>
            <td><span class="password-status">••••••••</span><small class="password-date">${account.passwordChangedAt ? `更新：${new Date(account.passwordChangedAt).toLocaleDateString("zh-TW")}` : "尚無更新紀錄"}</small></td>
            <td><span class="status ${account.role === "teacher" && !account.approved ? "warn" : ""}">${account.role === "teacher" && !account.approved ? "待審核" : "可使用"}</span></td>
            <td><button class="secondary-btn edit-user" data-user="${account.id}">編輯資料</button></td>
          </tr>`).join("") || '<tr><td colspan="9" class="empty-cell">此分類目前沒有使用者</td></tr>'}</tbody>
      </table></div>
    </article>`;
}

function renderUserEditor(account) {
  const roleLabel = account.role === "player" ? "學生" : account.role === "teacher" ? "教師" : "管理員";
  return `
    <div class="game-modal admin-edit-modal" id="admin-edit-modal">
      <article class="game-card admin-edit-card">
        <header>
          <div><span class="mission-tag">${roleLabel}資料</span><h2>編輯 ${escapeHTML(account.account)}</h2></div>
          <button class="ghost-btn" id="close-user-editor" type="button" aria-label="關閉">✕</button>
        </header>
        <form id="admin-user-form">
          <input type="hidden" name="userId" value="${account.id}" />
          <div class="form-grid">
            <div class="field full"><label>帳號</label><input value="${escapeHTML(account.account)}" disabled /><small class="field-help">帳號為登入識別，不開放直接修改。</small></div>
            <div class="field"><label>身分</label><input value="${roleLabel}" disabled /></div>
            <div class="field"><label>真實姓名</label><input name="realName" value="${escapeHTML(account.name)}" required /></div>
            <div class="field"><label>學校</label><input name="school" value="${escapeHTML(account.school)}" required /></div>
            <div class="field"><label>班級</label><input name="className" value="${escapeHTML(account.className)}" required /></div>
            ${account.role === "player" ? `
              <div class="field"><label>座號</label><input name="seat" value="${escapeHTML(account.seat)}" required /></div>
              <div class="field"><label>英語程度</label><select name="cefrLevel">${["Pre-A1", "A1", "A2", "B1", "B2"].map((level) => `<option ${account.level === level ? "selected" : ""}>${level}</option>`).join("")}</select></div>
            ` : `
              <div class="field full"><label>信箱</label><input name="email" type="email" value="${escapeHTML(account.email)}" placeholder="補登登入及忘記密碼信箱" /></div>
              ${account.role === "teacher" ? `<label class="approval-check"><input name="approved" type="checkbox" ${account.approved ? "checked" : ""} /> 核准教師查看班級資料</label>` : ""}
            `}
          </div>
          <div class="editor-actions">
            <button class="ghost-btn" id="cancel-user-editor" type="button">取消</button>
            <button class="primary-btn" id="save-user-editor" type="submit">儲存修改</button>
          </div>
        </form>
      </article>
    </div>`;
}

function renderAdminClasses(user) {
  const classes = staffDashboard?.classes || [];
  return `
    ${teacherHeader(user, "班級配對", "依學校與班級查看教師、學生及能力分布")}
    ${renderClassCards(classes)}`;
}

function renderClassCards(classes) {
  if (!classes.length) return '<section class="card empty-page"><div><h2>目前沒有班級資料</h2></div></section>';
  return `<section class="class-grid">${classes.map((classroom) => `
    <article class="card class-card">
      <header><div><span class="mission-tag">${escapeHTML(classroom.school)}</span><h3>${escapeHTML(classroom.className)}</h3></div><b>${classroom.students.length} 位學生</b></header>
      <p><strong>教師：</strong>${classroom.teachers.length ? classroom.teachers.map((teacher) => `${escapeHTML(teacher.name)}${teacher.approved ? "" : "（待審核）"}`).join("、") : "尚未配對"}</p>
      <div class="class-ability-list">
        ${abilities.map((ability, index) => `<div><span>${ability.shortName}</span><div class="bar"><span style="width:${classroom.abilities[index]}%;background:${ability.color}"></span></div><b>${classroom.abilities[index]}</b></div>`).join("")}
      </div>
      <footer><span>${classroom.attentionCount} 位需要關注</span><span>本週錯題 ${classroom.errorAnalysis.wrongCount || 0} 題</span></footer>
    </article>`).join("")}</section>`;
}

function renderAdminAnalytics(user) {
  const dashboard = staffDashboard || { classes: [], errorAnalysis: {} };
  return `
    ${teacherHeader(user, "全平台學習成效", "跨班級查看五大能力與常見錯誤")}
    ${renderErrorAnalysis(dashboard.errorAnalysis)}
    <div class="section-title"><div><h2>班級能力比較</h2><p>各班目前五大能力平均</p></div></div>
    ${renderClassCards(dashboard.classes)}`;
}

function curriculumAchievement(score, attempts) {
  if (attempts < 5) return {
    status: "證據不足",
    statusKey: "insufficient",
    explanation: `至少需要 5 題，目前只有 ${attempts} 題，暫不判定達成與否。`,
  };
  if (score >= 80) return {
    status: "已達成",
    statusKey: "achieved",
    explanation: "本週答對率達 80% 以上，已達本平台形成性評量門檻。",
  };
  if (score >= 60) return {
    status: "接近達成",
    statusKey: "approaching",
    explanation: "本週答對率為 60–79%，已有基礎，但仍需練習後再次檢核。",
  };
  return {
    status: "尚未達成",
    statusKey: "not-achieved",
    explanation: "本週答對率低於 60%，建議先進行基礎補救與短題組重測。",
  };
}

function curriculumPerformance(classroom, studentRecord = null) {
  const students = studentRecord ? [studentRecord] : (classroom?.students || []);
  return curriculumCompetencies.map((competency) => {
    const abilityIndex = abilities.findIndex((ability) => ability.id === competency.ability);
    const attempts = students.flatMap((student) => student.attempts || [])
      .filter((attempt) => attempt.ability === competency.ability);
    const correct = attempts.filter((attempt) => attempt.is_correct).length;
    const score = attempts.length ? Math.round((correct / attempts.length) * 100) : null;
    const abilityValue = studentRecord
      ? Number(studentRecord.abilities?.[abilityIndex] || 0)
      : Number(classroom?.abilities?.[abilityIndex] || 0);
    const needsSupport = students.filter((student) =>
      Number(student.abilities?.[abilityIndex] || 0) < 60).length;
    return {
      ...competency,
      score,
      abilityValue,
      ...curriculumAchievement(score || 0, attempts.length),
      attempts: attempts.length,
      correct,
      needsSupport,
    };
  });
}

function renderTeacherAnalytics(user) {
  const classes = teacherClasses();
  const classroom = selectedTeacherClass();
  const students = classroom?.students || [];
  const studentRecord = selectedAnalyticsStudent >= 0
    ? students[selectedAnalyticsStudent] || null
    : null;
  const subjectStudents = studentRecord ? [studentRecord] : students;
  const subjectLabel = studentRecord ? studentRecord.name : (classroom?.className || "全班");
  const performance = curriculumPerformance(classroom, studentRecord);
  const assessed = performance.filter((item) => item.statusKey !== "insufficient");
  const overall = assessed.length
    ? Math.round(assessed.reduce((sum, item) => sum + item.score, 0) / assessed.length)
    : null;
  const strongest = [...assessed].sort((a, b) => b.score - a.score)[0] || null;
  const priority = [...assessed].sort((a, b) => a.score - b.score)[0] || null;
  const achievedCount = assessed.filter((item) => item.statusKey === "achieved").length;
  const totalAttempts = subjectStudents.reduce((sum, student) => sum + (student.attempts?.length || 0), 0);
  const studyDays = subjectStudents.length
    ? Math.round(subjectStudents.reduce((sum, student) => sum + student.days, 0) / subjectStudents.length * 10) / 10
    : 0;
  return `
    ${teacherHeader(user, "課綱能力診斷", "切換全班或個別學生，查看明確的指標達成狀況與教學建議")}
    <section class="card learning-filter-bar analytics-filter">
      <div class="field"><label>診斷班級</label><select id="analytics-class-filter">${classes.map((item) => `<option value="${escapeHTML(item.key)}" ${item.key === classroom?.key ? "selected" : ""}>${escapeHTML(item.school)}・${escapeHTML(item.className)}</option>`).join("")}</select></div>
      <div class="field"><label>診斷對象</label><select id="analytics-student-filter"><option value="-1">全班整體表現</option>${students.map((student, index) => `<option value="${index}" ${index === selectedAnalyticsStudent ? "selected" : ""}>${escapeHTML(student.name)}（${escapeHTML(student.seat)}號）</option>`).join("")}</select></div>
    </section>
    <section class="card achievement-guide">
      <div><b>判定方式</b><span>每項至少完成 5 題才判定</span></div>
      <span class="achievement-badge achieved">✓ 已達成：80–100%</span>
      <span class="achievement-badge approaching">△ 接近達成：60–79%</span>
      <span class="achievement-badge not-achieved">! 尚未達成：0–59%</span>
      <span class="achievement-badge insufficient">? 證據不足：少於 5 題</span>
      <a href="https://www.naer.edu.tw/PageSyllabus?fid=177" target="_blank" rel="noopener">正式課綱來源</a>
    </section>
    <section class="metric-grid curriculum-metrics">
      <article class="card metric"><span>${escapeHTML(subjectLabel)}整體答對率</span><strong>${overall === null ? "—" : `${overall}%`}</strong><small>${overall === null ? "目前證據不足" : "僅計入已有足夠證據的指標"}</small></article>
      <article class="card metric"><span>已達成課綱面向</span><strong>${achievedCount}／5</strong><small>${assessed.length} 項已完成判定，${5 - assessed.length} 項證據不足</small></article>
      <article class="card metric"><span>本週診斷證據</span><strong>${totalAttempts} 題</strong><small>${studentRecord ? "該生實際作答" : `${students.length} 位學生的實際作答`}</small></article>
      <article class="card metric"><span>${studentRecord ? "本週學習天數" : "班級平均學習天數"}</span><strong>${studyDays} 天</strong><small>搭配作答表現判讀</small></article>
    </section>
    ${students.length ? `
      ${strongest && priority ? `<section class="curriculum-summary-grid">
        <article class="card curriculum-summary strength">
          <span>已觀察到的優勢</span><h2>${strongest.domain}｜${strongest.score}%</h2>
          <p>${strongest.statement}</p><b>建議：增加跨情境應用與整合挑戰。</b>
        </article>
        <article class="card curriculum-summary priority">
          <span>${priority.statusKey === "achieved" ? "下一個深化面向" : "下一個教學重點"}</span>
          <h2>${priority.domain}｜${priority.status}</h2>
          <p>${priority.statement}</p><b>建議：${priority.activity}</b>
        </article>
      </section>` : '<div class="insight focus"><span>?</span><div><b>目前尚無足夠題目可判定達成狀況</b><p>每項課綱面向至少完成 5 題後，才會顯示已達成、接近達成或尚未達成。</p></div></div>'}
      <div class="section-title"><div><h2>${escapeHTML(subjectLabel)}課綱指標判定</h2><p>每張卡片直接標示是否達成；「證據不足」不代表未達成。</p></div></div>
      <section class="curriculum-diagnostic-list">
        ${performance.map((item) => {
          const ability = abilities.find((entry) => entry.id === item.ability);
          return `
            <article class="card curriculum-diagnostic status-${item.statusKey}" style="--curriculum-color:${ability.color}">
              <div class="curriculum-score">
                <span>${ability.scene}</span>
                <strong>${item.score === null ? "—" : `${item.score}%`}</strong>
                <small class="achievement-badge ${item.statusKey}">${item.status}</small>
              </div>
              <div class="curriculum-detail">
                <div class="curriculum-title"><div><span class="mission-tag">${item.codes}</span><h3>${item.domain}</h3></div><b>${item.attempts ? `${item.correct}／${item.attempts} 題答對` : "尚無本週作答"}</b></div>
                <p class="curriculum-statement">${item.statement}</p>
                <div class="achievement-result ${item.statusKey}"><b>判定結果：${item.status}</b><span>${item.explanation}</span></div>
                <p class="curriculum-content"><b>對應學習內容：</b>${item.content}</p>
                <div class="curriculum-evidence"><span>本週證據 ${item.attempts} 題</span><span>${studentRecord ? `目前能力值 ${item.abilityValue}` : `${item.needsSupport} 位學生能力值低於 60`}</span></div>
                <div class="curriculum-bar"><span style="width:${item.score || 0}%"></span></div>
                <div class="teaching-recommendation"><b>${studentRecord ? "個別學習建議" : "班級教學建議"}</b><p>${item.statusKey === "achieved" ? "此項已達成，可增加新情境與整合應用，不必重複大量基礎題。" : item.activity}</p></div>
              </div>
            </article>`;
        }).join("")}
      </section>
      ${priority ? `<section class="card teaching-plan">
        <div><span class="quest-eyebrow">NEXT TEACHING CYCLE</span><h2>下一輪教學調整建議</h2></div>
        <ol>
          <li><b>課前診斷：</b>先用 5 題「${priority.domain}」短測確認錯誤類型。</li>
          <li><b>課中介入：</b>${priority.activity}</li>
          <li><b>${studentRecord ? "個別任務" : "差異化分組"}：</b>${studentRecord ? `安排「${priority.domain}」基礎任務，完成後再以不同題目重測。` : `將 ${priority.needsSupport} 位尚需支持的學生安排基礎任務，其餘學生進行情境應用挑戰。`}</li>
          <li><b>課後檢核：</b>隔 2 至 3 天以不同題目重測；正確率達 80% 再進入下一學習內容。</li>
        </ol>
      </section>` : ""}
    ` : '<section class="card empty-page"><div><div class="big-icon">⌁</div><h2>此班級尚無可診斷資料</h2><p style="color:var(--muted)">學生完成訓練或教師任務後，系統會自動對照課綱能力並提出教學建議。</p></div></section>'}`;
}

function renderTeacherOverview(user) {
  const students = activeStudents();
  const classroom = selectedTeacherClass();
  const activeCount = students.filter((student) => student.days > 0).length;
  const averageCompletion = students.length
    ? Math.round(students.reduce((sum, student) => sum + student.completion, 0) / students.length)
    : 0;
  const classAbilities = [0, 1, 2, 3, 4].map((index) => students.length
    ? Math.round(students.reduce((sum, student) => sum + (student.abilities?.[index] || 0), 0) / students.length)
    : 0);
  const attentionStudents = students.filter((student) => student.status === "需要關注");
  const errorAnalysis = classroom?.errorAnalysis || staffDashboard?.errorAnalysis || {};
  return `
    ${teacherHeader(user, "班級學習總覽", "本週整體使用與學習狀況")}
    <section class="metric-grid">
      <article class="card metric"><span>班級學生</span><strong>${students.length} 人</strong><small>本週活躍 ${activeCount} 人</small></article>
      <article class="card metric"><span>本週登入率</span><strong>${students.length ? Math.round((activeCount / students.length) * 100) : 0}%</strong><small>依雲端學習事件統計</small></article>
      <article class="card metric"><span>任務完成率</span><strong>${averageCompletion}%</strong><small>${students.filter((student) => student.completion >= 80).length} 人達成本週目標</small></article>
    </section>
    <div class="section-title"><div><h2>班級五大能力</h2><p>本週平均表現與成長趨勢</p></div></div>
    <section class="training-grid">
      ${abilities.map((a, index) => `<article class="training-card" style="color:${a.color}"><span class="ability-icon" style="background:${a.color}">${a.icon}</span><h3>${a.shortName}</h3><small>班級實際平均</small><div class="mini-progress"><span style="width:${classAbilities[index]}%"></span></div><footer><span>${classAbilities[index]} 分</span><span>${students.length} 人</span></footer></article>`).join("")}
    </section>
    <div class="teacher-layout" style="margin-top:24px">
      ${studentTable()}
      <article class="card panel"><h2 class="card-title">需要關注</h2>
        ${attentionStudents.length ? attentionStudents.slice(0, 5).map((student) => `<div class="insight focus"><span>!</span><div><b>${escapeHTML(student.name)}｜${student.focus}</b><p>本週學習 ${student.days} 天、平均答題 ${student.averageScore || 0} 分，建議安排短版補強任務。</p></div></div>`).join("") : '<div class="insight good"><span>✓</span><div><b>本週沒有需要特別關注的學生</b><p>全班目前保持穩定學習節奏。</p></div></div>'}
      </article>
    </div>
    ${renderErrorAnalysis(errorAnalysis)}`;
}

function renderErrorAnalysis(analysis = {}) {
  const types = analysis.types || [];
  const vocabulary = analysis.vocabulary || [];
  const concepts = analysis.concepts || [];
  return `
    <section class="error-analysis">
      <div class="section-title"><div><h2>班級易錯內容</h2><p>依本週每題實際作答紀錄統計</p></div></div>
      <div class="error-grid error-grid-three">
        <article class="card panel">
          <h3>易錯題型</h3>
          ${types.length ? types.map((item, index) => `<div class="error-rank"><b>${index + 1}</b><span>${escapeHTML(item.label)}</span><em>${item.count} 次答錯</em></div>`).join("") : '<p class="empty-hint">尚未累積逐題錯題紀錄，學生完成新版任務後會自動呈現。</p>'}
        </article>
        <article class="card panel">
          <h3>易混淆觀念／題目</h3>
          ${concepts.length ? concepts.map((item, index) => `<div class="error-rank"><b>${index + 1}</b><span>${escapeHTML(item.label)}</span><em>${item.count} 次答錯</em></div>`).join("") : '<p class="empty-hint">目前沒有反覆出錯的觀念。</p>'}
        </article>
        <article class="card panel">
          <h3>易錯單字／答案</h3>
          ${vocabulary.length ? vocabulary.map((item, index) => `<div class="error-rank"><b>${index + 1}</b><span>${escapeHTML(item.label)}</span><em>${item.count} 次答錯</em></div>`).join("") : '<p class="empty-hint">目前沒有可統計的易錯單字。</p>'}
        </article>
      </div>
    </section>`;
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

function summarizeStudentErrors(student) {
  const wrong = (student?.attempts || []).filter((attempt) => !attempt.is_correct);
  const count = (getLabel) => {
    const values = new Map();
    wrong.forEach((attempt) => {
      const label = getLabel(attempt);
      if (label) values.set(label, (values.get(label) || 0) + 1);
    });
    return [...values.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, total]) => ({ label, count: total }));
  };
  return {
    types: count((attempt) => attempt.question_type),
    vocabulary: count((attempt) => attempt.vocabulary || attempt.correct_answer),
    concepts: count((attempt) => attempt.prompt
      ? `${attempt.prompt}｜誤選：${attempt.selected_answer || "未作答"}`
      : ""),
  };
}

function renderLearningErrorCards(analysis, scopeLabel) {
  const sections = [
    ["不熟悉題型", analysis.types || [], "目前沒有重複答錯的題型。"],
    ["易混淆觀念／題目", analysis.concepts || [], "目前沒有反覆出錯的觀念。"],
    ["易錯單字／答案", analysis.vocabulary || [], "目前沒有易錯單字紀錄。"],
  ];
  return `
    <section class="student-error-section">
      <div class="section-title"><div><h2>${escapeHTML(scopeLabel)}學習診斷</h2><p>依本週實際答錯紀錄整理，可直接作為補強任務依據。</p></div></div>
      <div class="student-error-grid">
        ${sections.map(([title, items, empty]) => `
          <article class="card panel">
            <h3>${title}</h3>
            ${items.length ? items.map((item, index) => `<div class="error-rank"><b>${index + 1}</b><span>${escapeHTML(item.label)}</span><em>${item.count} 次</em></div>`).join("") : `<p class="empty-hint">${empty}</p>`}
          </article>`).join("")}
      </div>
    </section>`;
}

function renderStudents(user) {
  const students = activeStudents();
  const classes = teacherClasses();
  const classroom = selectedTeacherClass();
  const s = selectedStudent >= 0 ? students[selectedStudent] : null;
  const classAbilities = classroom?.abilities || [0, 0, 0, 0, 0];
  const activeCount = students.filter((student) => student.days > 0).length;
  const averageScore = students.length
    ? Math.round(students.reduce((sum, student) => sum + (student.averageScore || 0), 0) / students.length)
    : 0;
  const studentAbilities = s?.abilities || [0, 0, 0, 0, 0];
  return `
    ${teacherHeader(user, "學生學習狀況", "先挑選班級，再查看全班或個別學生學習分析")}
    <section class="card learning-filter-bar">
      <div class="field"><label>挑選班級</label><select id="learning-class-filter">${classes.map((item) => `<option value="${escapeHTML(item.key)}" ${item.key === classroom?.key ? "selected" : ""}>${escapeHTML(item.school)}・${escapeHTML(item.className)}</option>`).join("")}</select></div>
      <div class="field"><label>挑選學生</label><select id="learning-student-filter"><option value="-1">查看全班學習狀況</option>${students.map((student, index) => `<option value="${index}" ${index === selectedStudent ? "selected" : ""}>${escapeHTML(student.name)}（${escapeHTML(student.seat)}號）</option>`).join("")}</select></div>
    </section>
    ${!students.length ? `
      <section class="card empty-page"><div><div class="big-icon">♙</div><h2>此班級目前沒有學生</h2><p style="color:var(--muted)">學生使用相同學校與班級註冊後，就會出現在這裡。</p></div></section>
    ` : s ? `
      <section class="teacher-layout student-learning-layout">
        ${studentTable()}
        <article class="card panel student-detail">
          <header><span class="avatar">${escapeHTML(s.name[0])}</span><div><h3>${escapeHTML(s.name)}</h3><p>${escapeHTML(s.player)}｜${escapeHTML(s.level)}</p></div></header>
          <div class="detail-stat"><label><span>本週任務完成率</span><b>${s.completion}%</b></label><div class="bar"><span style="width:${s.completion}%"></span></div></div>
          ${abilities.map((ability, index) => `<div class="detail-stat"><label><span>${ability.shortName}</span><b>${studentAbilities[index]}</b></label><div class="bar"><span style="width:${studentAbilities[index]}%;background:${ability.color}"></span></div></div>`).join("")}
          <div class="insight ${s.status.includes("關注") ? "focus" : "good"}"><span>✦</span><div><b>系統建議</b><p>${s.status.includes("關注") ? `優先安排「${s.focus}」，以短任務協助補強。` : `學習節奏穩定，可安排「${s.focus}」延伸任務。`}</p></div></div>
          <button class="primary-btn mission-action" data-target-student="${s.id || ""}">為學生指派任務</button>
        </article>
      </section>
      ${renderLearningErrorCards(summarizeStudentErrors(s), `${s.name}的`)}
    ` : `
      <section class="metric-grid">
        <article class="card metric"><span>班級學生</span><strong>${students.length} 人</strong><small>本週活躍 ${activeCount} 人</small></article>
        <article class="card metric"><span>平均答題表現</span><strong>${averageScore} 分</strong><small>依本週學習紀錄</small></article>
        <article class="card metric"><span>需要關注</span><strong>${students.filter((student) => student.status === "需要關注").length} 人</strong><small>可安排補強任務</small></article>
      </section>
      <div class="section-title"><div><h2>${escapeHTML(classroom?.className || "班級")}五大能力</h2><p>全班目前能力平均</p></div></div>
      <section class="training-grid">
        ${abilities.map((ability, index) => `<article class="training-card" style="color:${ability.color}"><span class="ability-icon" style="background:${ability.color}">${ability.icon}</span><h3>${ability.shortName}</h3><div class="mini-progress"><span style="width:${classAbilities[index]}%"></span></div><footer><span>${classAbilities[index]} 分</span><span>${students.length} 人</span></footer></article>`).join("")}
      </section>
      <div class="teacher-layout" style="margin-top:20px">${studentTable()}<article class="card panel"><h2 class="card-title">班級觀察</h2><p>從左側選擇學生，可查看個人能力、易錯題型、混淆觀念與單字。</p></article></div>
      ${renderErrorAnalysis(classroom?.errorAnalysis || {})}
    `}`;
}

function renderTeacherPlaceholder(user, title, body, icon) {
  return `
    ${teacherHeader(user, title, "WonderGo 教師管理中心")}
    <section class="card empty-page"><div><div class="big-icon">${icon}</div><h2>${title}</h2><p style="color:var(--muted)">${body}</p><button class="primary-btn mission-action">建立第一項內容</button></div></section>`;
}

function getLevelKey(user) {
  return String(user.cefrLevel || "Pre-A1").startsWith("Pre") ? "preA1" : "a1";
}

function getDailyKey() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

function dailyTaskStorageKey(user, taskKey) {
  return `wondergo-task:${getDailyKey()}:${user.account}:${taskKey}`;
}

function getLocalDailyTaskCount(user, taskKey) {
  return Number(localStorage.getItem(dailyTaskStorageKey(user, taskKey))) || 0;
}

function calculateAwardedXp(baseXp, completionCount) {
  return completionCount >= 1 ? Math.floor(baseXp / 2) : baseXp;
}

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seedText) {
  const shuffled = [...items];
  const random = seededRandom(hashSeed(seedText));
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function normalizeQuestion(question) {
  if (!Array.isArray(question)) {
    return {
      visual: question.visual || "📝",
      prompt: question.prompt,
      options: question.options,
      answer: Number(question.answer) || 0,
      speech: question.speech || "",
    };
  }
  return {
    visual: question[0],
    prompt: question[1],
    options: question[2],
    answer: question[3],
    speech: question[4] || "",
  };
}

function shuffleQuestionOptions(question, seedText) {
  const normalized = normalizeQuestion(question);
  const correctAnswer = normalized.options[normalized.answer];
  normalized.options = seededShuffle(normalized.options, `${seedText}:options`);
  normalized.answer = normalized.options.indexOf(correctAnswer);
  return normalized;
}

function dailyAbilityQuestions(user, ability, seedSuffix) {
  const levelKey = getLevelKey(user);
  const bank = questionBanks[ability];
  const source = levelKey === "preA1"
    ? bank.preA1
    : [...bank.a1, ...bank.preA1];
  const seed = `${getDailyKey()}:${user.account}:${user.cefrLevel}:${ability}:${seedSuffix}`;
  return seededShuffle(source, seed)
    .slice(0, 10)
    .map((question, index) => shuffleQuestionOptions(question, `${seed}:${index}`));
}

function questionTypeFor(ability, prompt) {
  if (ability === "word") return "單字辨識";
  if (ability === "echo") return "聽力理解";
  if (ability === "spell") return "拼字";
  if (ability === "voice") return "情境口說";
  if (prompt.includes("重新組合") || prompt.includes("用法")) return "句型與語序";
  return "閱讀理解";
}

function vocabularyFor(question) {
  const answer = question.options[question.answer] || "";
  return answer
    .replace(/[.!?,'"]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join(" ");
}

function worldSentence(theme, english) {
  const article = /^[aeiou]/i.test(english) ? "an" : "a";
  const pluralBodyWords = new Set(["eyes", "ears", "teeth"]);
  const templates = {
    colors: `It is ${english}.`,
    animals: `I see ${article} ${english}.`,
    family: english === "parents" ? "These are my parents." : `This is my ${english}.`,
    school: `I see ${article} ${english}.`,
    food: `I like ${english}.`,
    body: pluralBodyWords.has(english) ? `These are my ${english}.` : `This is my ${english}.`,
    weather: english === "rainbow" ? "I see a rainbow." : `It is ${english}.`,
    home: `This is the ${english}.`,
    transport: english === "walk" ? "I walk to school." : `I go by ${english}.`,
    time: `It is ${english}.`,
  };
  return templates[theme.id];
}

function worldStageQuestions(user, theme, stage) {
  const seed = `${getDailyKey()}:${user.account}:${user.cefrLevel}:${theme.id}:${stage.id}`;
  const orderedWords = seededShuffle(theme.words, seed);
  return orderedWords.map((word, index) => {
    const [icon, english, chinese] = word;
    const distractors = seededShuffle(
      theme.words.filter((item) => item[1] !== english),
      `${seed}:distractors:${index}`,
    ).slice(0, 3);
    let question;
    if (stage.id === "listen") {
      question = [icon, "聽一聽，選出你聽到的單字。", [english, ...distractors.map((item) => item[1])], 0, english];
    } else if (stage.id === "speak") {
      const sentence = worldSentence(theme, english);
      question = [
        icon,
        `看圖選出正確句子，再跟著大聲說。`,
        [sentence, ...distractors.map((item) => worldSentence(theme, item[1]))],
        0,
        sentence,
      ];
    } else if (stage.id === "write") {
      question = [
        icon,
        `看圖選出「${chinese}」的正確英文單字。`,
        [english, ...distractors.map((item) => item[1])],
        0,
      ];
    } else {
      question = [icon, `圖片是「${chinese}」，英文怎麼說？`, [english, ...distractors.map((item) => item[1])], 0];
    }
    return shuffleQuestionOptions(question, `${seed}:${index}`);
  });
}

function startWorldStage(countryId, stageId) {
  const user = currentUser();
  const theme = worldThemes.find((item) => item.id === countryId);
  const stage = worldStages.find((item) => item.id === stageId);
  if (!theme || !stage) return;
  const abilityInfo = abilities.find((item) => item.id === stage.ability);
  gameState = {
    mode: "world",
    id: `${countryId}:${stageId}`,
    ability: stage.ability,
    title: `${theme.name}・${stage.name}`,
    color: theme.color,
    taskKey: `ability:${countryId}${stageId}`,
    questions: worldStageQuestions(user, theme, stage),
    index: 0,
    correct: 0,
    answered: false,
    selected: null,
    synced: false,
    attempts: [],
    returnPage: "world",
    returnCountry: countryId,
    abilityName: abilityInfo.shortName,
  };
  document.body.insertAdjacentHTML("beforeend", renderGameModal());
  bindGameModalEvents();
}

function startAssignedGame(assignmentId) {
  const assignment = playerAssignments.find((item) => item.id === assignmentId);
  if (!assignment || assignment.completion) return;
  const material = assignment.material;
  const abilityInfo = abilities.find((item) => item.id === material.ability);
  const seed = `${getDailyKey()}:${currentUser().account}:assignment:${assignment.id}`;
  const questions = seededShuffle(material.questions, seed)
    .map((question, index) => shuffleQuestionOptions(question, `${seed}:${index}`));
  gameState = {
    mode: "assignment",
    id: assignment.id,
    assignmentId: assignment.id,
    ability: material.ability,
    title: assignment.title,
    color: abilityInfo.color,
    taskKey: `assignment:${assignment.id}`,
    questions,
    index: 0,
    correct: 0,
    answered: false,
    selected: null,
    synced: false,
    attempts: [],
    baseXp: assignment.xpReward,
    returnPage: "home",
  };
  document.body.insertAdjacentHTML("beforeend", renderGameModal());
  bindGameModalEvents();
}

function startGame(mode, id) {
  const user = currentUser();
  const isMission = mode === "mission";
  const ability = isMission
    ? { main: "story", support: "echo", challenge: "spell" }[id]
    : id;
  const abilityInfo = abilities.find((item) => item.id === ability);
  const source = isMission
    ? dailyAbilityQuestions(user, ability, `mission:${id}`)
    : dailyAbilityQuestions(user, ability, `hall:${id}`);

  gameState = {
    mode,
    id,
    ability,
    title: isMission
      ? { main: "晨光鎮通行考驗", support: "回音訊號救援", challenge: "語序機關迷宮" }[id]
      : abilityInfo.name,
    color: abilityInfo.color,
    taskKey: `${mode}:${id}`,
    questions: source,
    index: 0,
    correct: 0,
    answered: false,
    selected: null,
    synced: false,
    attempts: [],
    returnPage: "home",
  };
  document.body.insertAdjacentHTML("beforeend", renderGameModal());
  bindGameModalEvents();
}

function renderGameModal() {
  return `<div class="game-modal" id="game-modal">${renderGameCard()}</div>`;
}

function renderGameCard() {
  if (gameState.index >= gameState.questions.length) {
    const isAssignment = gameState.mode === "assignment";
    const isWrongBook = gameState.mode === "wrongbook";
    const baseXp = isAssignment ? gameState.baseXp : 20 + gameState.correct * 5;
    const assignmentXp = isAssignment
      ? Math.floor(baseXp * (gameState.correct / gameState.questions.length))
      : baseXp;
    const user = currentUser();
    const completionCount = isAssignment ? 0 : getLocalDailyTaskCount(user, gameState.taskKey);
    const expectedXp = isWrongBook ? 5
      : isAssignment ? assignmentXp : calculateAwardedXp(baseXp, completionCount);
    const score = Math.round((gameState.correct / gameState.questions.length) * 100);
    const abilityGain = Math.min(5, Math.max(0, Math.round(score / 20)));
    const abilityName = abilities.find((ability) => ability.id === gameState.ability)?.shortName;
    return `
      <article class="game-card result-card">
        <div class="result-burst">🏆</div>
        <span class="mission-tag">訓練完成</span>
        <h2>${gameState.title}過關！</h2>
        <p>你完成了 ${gameState.questions.length} 題練習，答對 <strong>${gameState.correct}</strong> 題。</p>
        <div class="result-xp">${isWrongBook ? "＋5 XP" : `＋${expectedXp} XP`}</div>
        ${isWrongBook ? "" : `<p class="ability-gain-note">${escapeHTML(abilityName || "冒險能力")}＋${abilityGain}｜本次答對率 ${score}%</p>`}
        ${isWrongBook ? `<p class="repeat-xp-note">完成錯題精熟檢核，答對 ${gameState.correct}／${gameState.questions.length} 題。</p>` : ""}
        ${isAssignment ? '<p class="repeat-xp-note">教師任務依答對比例發放經驗值，答錯題不會獲得 XP。</p>' : ""}
        ${!isAssignment && !isWrongBook && completionCount >= 1 ? '<p class="repeat-xp-note">今日重複挑戰：本次經驗值折半</p>' : ""}
        <button class="primary-btn wide" id="claim-result">${isWrongBook ? "完成複習" : "領取經驗值"}</button>
      </article>`;
  }

  const question = gameState.questions[gameState.index];
  const progress = ((gameState.index + 1) / gameState.questions.length) * 100;
  const needsAudio = Boolean(question.speech);
  return `
    <article class="game-card" style="--game-color:${gameState.color}">
      <header>
        <div><span class="mission-tag">${gameState.title}</span><small>第 ${gameState.index + 1}／${gameState.questions.length} 題</small></div>
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
        <button class="primary-btn wide" id="next-question">${gameState.index === gameState.questions.length - 1 ? "查看訓練成果" : "下一題"}</button>
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

function revealNextQuestionButton() {
  if (!window.matchMedia("(max-width: 700px)").matches) return;
  window.requestAnimationFrame(() => {
    document.getElementById("next-question")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  });
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
  const isAssignment = gameState.mode === "assignment";
  const isWrongBook = gameState.mode === "wrongbook";
  const assignmentXp = Math.floor(
    (gameState.baseXp || 0) * (gameState.correct / gameState.questions.length),
  );
  const baseXp = isAssignment ? assignmentXp : 20 + gameState.correct * 5;
  const score = Math.round((gameState.correct / gameState.questions.length) * 100);
  let abilityGain = Math.min(5, Math.max(0, Math.round(score / 20)));

  try {
    if (isWrongBook) {
      const awardedXp = 5;
      if (user.cloud) {
        const updated = await Cloud.completeWrongBookReview();
        user.xp = updated.xp;
        user.abilityValues = updated.abilityValues;
        user.abilityTrends = updated.abilityTrends;
        user.weeklySummary = updated.weeklySummary;
        user.streakDays = updated.streakDays;
      } else {
        user.xp = (user.xp || 0) + awardedXp;
        user.weeklySummary ||= { studyDays: 0, completedTasks: 0, xpEarned: 0 };
        user.weeklySummary.xpEarned += awardedXp;
        saveData();
      }
      currentPage = "wrongbook";
      document.getElementById("game-modal")?.remove();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast(`錯題複習完成，獲得 ${awardedXp} XP！`);
      return;
    }
    let awardedXp = baseXp;
    if (isAssignment && user.cloud) {
      const updated = await Cloud.completeAssignment(
        gameState.assignmentId,
        score,
        gameState.attempts,
      );
      user.xp = updated.xp;
      awardedXp = updated.awardedXp;
      abilityGain = updated.abilityGain ?? abilityGain;
      user.abilityValues = updated.abilityValues;
      user.abilityTrends = updated.abilityTrends;
      user.weeklySummary = updated.weeklySummary;
      playerAssignments = await Cloud.loadPlayerAssignments();
    } else if (user.cloud) {
      const updated = await Cloud.recordLearning(
        gameState.taskKey,
        gameState.ability,
        baseXp,
        score,
        gameState.attempts,
      );
      user.xp = updated.xp;
      awardedXp = updated.awardedXp;
      abilityGain = updated.abilityGain ?? abilityGain;
      user.abilityValues = updated.abilityValues;
      user.abilityTrends = updated.abilityTrends;
      user.weeklySummary = updated.weeklySummary;
    } else {
      const completionCount = getLocalDailyTaskCount(user, gameState.taskKey);
      awardedXp = calculateAwardedXp(baseXp, completionCount);
      user.xp = (user.xp || 0) + awardedXp;
      user.abilityValues ||= emptyAbilityValues();
      user.abilityTrends ||= emptyAbilityValues();
      user.abilityValues[gameState.ability] = Math.min(
        100,
        (user.abilityValues[gameState.ability] || 0) + abilityGain,
      );
      user.abilityTrends[gameState.ability] =
        (user.abilityTrends[gameState.ability] || 0) + 1;
    }
    if (!isAssignment) {
      localStorage.setItem(
        dailyTaskStorageKey(user, gameState.taskKey),
        String(getLocalDailyTaskCount(user, gameState.taskKey) + 1),
      );
    }
    saveData();
    currentPage = gameState.returnPage || "home";
    selectedWorldCountry = gameState.returnCountry || null;
    document.getElementById("game-modal")?.remove();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const ability = abilities.find((item) => item.id === gameState.ability);
    toast(`訓練完成！獲得 ${awardedXp} XP，${ability?.shortName || "能力值"}＋${abilityGain}${!isAssignment && awardedXp < baseXp ? "（今日重複挑戰折半）" : ""}`);
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
    const question = gameState.questions[gameState.index];
    gameState.selected = selected;
    gameState.answered = true;
    if (selected === question.answer) gameState.correct += 1;
    gameState.attempts.push({
      ability: gameState.ability,
      question_key: `${getDailyKey()}:${gameState.mode}:${gameState.id}:${gameState.index}`,
      prompt: question.prompt,
      question_type: questionTypeFor(gameState.ability, question.prompt),
      vocabulary: vocabularyFor(question),
      selected_answer: question.options[selected],
      correct_answer: question.options[question.answer],
      is_correct: selected === question.answer,
    });
    refreshGameModal();
    revealNextQuestionButton();
  }));
  document.getElementById("next-question")?.addEventListener("click", () => {
    gameState.index += 1;
    gameState.answered = false;
    gameState.selected = null;
    refreshGameModal();
  });
  document.getElementById("claim-result")?.addEventListener("click", claimGameResult);
}

function closeMaterialEditor() {
  document.getElementById("material-editor-modal")?.remove();
  document.getElementById("ai-generator-modal")?.remove();
  document.getElementById("batch-import-modal")?.remove();
}

function bindMaterialEditorEvents() {
  document.querySelectorAll(".close-material-editor").forEach((button) => {
    button.addEventListener("click", closeMaterialEditor);
  });
  const questionList = document.getElementById("question-editor-list");
  const refreshQuestionCards = (questions) => {
    questionList.innerHTML = renderQuestionEditorList(questions);
  };
  const currentQuestionDrafts = () => [...questionList.querySelectorAll(".question-editor-card")]
    .map((card) => {
      const value = (field) =>
        card.querySelector(`[data-question-field="${field}"]`)?.value || "";
      return {
        visual: value("visual"),
        prompt: value("prompt"),
        options: [value("correct"), value("wrong-1"), value("wrong-2"), value("wrong-3")],
        answer: 0,
        speech: value("speech"),
      };
    });
  document.getElementById("add-question")?.addEventListener("click", () => {
    const questions = currentQuestionDrafts();
    if (questions.length >= 20) return toast("每份教材最多 20 題。");
    questions.push(emptyMaterialQuestion());
    refreshQuestionCards(questions);
    questionList.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  questionList?.addEventListener("click", (event) => {
    const card = event.target.closest(".question-editor-card");
    if (!card) return;
    const questions = currentQuestionDrafts();
    const index = [...questionList.children].indexOf(card);
    if (event.target.closest(".question-remove")) {
      if (questions.length === 1) return toast("教材至少需要保留一題。");
      questions.splice(index, 1);
      refreshQuestionCards(questions);
      return;
    }
    const moveButton = event.target.closest(".question-move");
    if (!moveButton) return;
    const targetIndex = moveButton.dataset.direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= questions.length) return;
    [questions[index], questions[targetIndex]] = [questions[targetIndex], questions[index]];
    refreshQuestionCards(questions);
    questionList.children[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  const batchModal = document.getElementById("batch-import-modal");
  const closeBatchImport = () => batchModal?.classList.add("hidden");
  const aiModal = document.getElementById("ai-generator-modal");
  const closeAiGenerator = () => aiModal?.classList.add("hidden");
  document.getElementById("open-ai-generator")?.addEventListener("click", () => {
    aiModal?.classList.remove("hidden");
  });
  document.getElementById("close-ai-generator")?.addEventListener("click", closeAiGenerator);
  document.getElementById("cancel-ai-generator")?.addEventListener("click", closeAiGenerator);
  document.getElementById("teaching-material-file")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const status = document.getElementById("teaching-file-status");
    const source = document.getElementById("teaching-material-source");
    if (status) status.textContent = `正在分析 ${file.name}...`;
    try {
      const text = await extractTeachingMaterialText(file, (message) => {
        if (status) status.textContent = `${message}｜${file.name}`;
      });
      if (!text.trim()) {
        throw new Error("檔案內沒有可擷取的文字。若是掃描 PDF，請改上傳頁面圖片進行 OCR。");
      }
      source.value = text.trim();
      if (status) {
        status.textContent =
          `已讀取 ${file.name}（${text.trim().length.toLocaleString()} 字），請確認內容並選擇題型。`;
      }
    } catch (error) {
      if (status) status.textContent = `無法讀取 ${file.name}`;
      toast(error.message);
    }
  });
  document.getElementById("generate-ai-questions")?.addEventListener("click", () => {
    try {
      const questions = generateQuestionsFromTeachingText(
        document.getElementById("teaching-material-source").value,
        document.getElementById("ai-question-type").value,
        document.getElementById("ai-question-count").value,
      );
      refreshQuestionCards(questions);
      closeAiGenerator();
      toast(`已產生 ${questions.length} 題草稿，請逐題確認後發布。`);
    } catch (error) {
      toast(error.message);
    }
  });
  document.getElementById("open-batch-import")?.addEventListener("click", () => {
    document.getElementById("batch-question-source").value =
      questionsToText(currentQuestionDrafts());
    batchModal?.classList.remove("hidden");
  });
  document.getElementById("close-batch-import")?.addEventListener("click", closeBatchImport);
  document.getElementById("cancel-batch-import")?.addEventListener("click", closeBatchImport);
  document.getElementById("question-file-input")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    const status = document.getElementById("question-file-status");
    if (!file) return;
    if (status) status.textContent = `正在讀取 ${file.name}...`;
    try {
      const questions = parseMaterialCsv(await file.text());
      refreshQuestionCards(questions);
      if (status) status.textContent = `已匯入 ${file.name}，共 ${questions.length} 題`;
      closeBatchImport();
      toast(`已從 CSV 匯入 ${questions.length} 題，請確認內容後儲存。`);
    } catch (error) {
      if (status) status.textContent = "匯入失敗，請檢查檔案格式";
      toast(error.message);
    }
  });
  document.getElementById("read-google-sheet")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "讀取中...";
    try {
      const questions = parseMaterialCsv(
        await loadPublicGoogleSheet(document.getElementById("google-sheet-url").value),
      );
      refreshQuestionCards(questions);
      closeBatchImport();
      toast(`已從 Google 試算表匯入 ${questions.length} 題。`);
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新讀取";
      toast(error.message);
    }
  });
  document.getElementById("apply-batch-import")?.addEventListener("click", () => {
    try {
      const questions = parseMaterialQuestions(
        document.getElementById("batch-question-source").value,
      );
      refreshQuestionCards(questions);
      closeBatchImport();
      toast(`已匯入 ${questions.length} 題，請確認內容後儲存。`);
    } catch (error) {
      toast(error.message);
    }
  });
  document.getElementById("material-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const intent = event.submitter?.value || "save";
    const button = event.submitter || document.getElementById("save-material");
    let questions;
    try {
      questions = collectQuestionEditorData();
    } catch (error) {
      return toast(error.message);
    }
    button.disabled = true;
    button.textContent = intent === "assign" ? "正在發布..." : "教材儲存中...";
    try {
      await Cloud.saveMaterial({
        id: form.get("id") || "",
        title: form.get("title").trim(),
        description: form.get("description").trim(),
        ability: form.get("ability"),
        cefrLevel: form.get("cefrLevel"),
        status: intent === "assign" ? "published" : form.get("status"),
        questions,
      });
      await refreshTeacherStudents(currentUser());
      closeMaterialEditor();
      if (intent === "assign") currentPage = "content";
      render();
      if (intent === "assign") {
        document.body.insertAdjacentHTML("beforeend", renderAssignmentEditor(currentUser()));
        bindAssignmentEditorEvents();
        toast("教材已發布，請選擇派發對象。");
      } else {
        toast("教材已儲存。");
      }
    } catch (error) {
      button.disabled = false;
      button.textContent = intent === "assign" ? "重新發布並指派" : "重新儲存";
      toast(`教材儲存失敗：${error.message}`);
    }
  });
}

function closeAssignmentEditor() {
  document.getElementById("assignment-editor-modal")?.remove();
}

function bindAssignmentEditorEvents() {
  document.querySelectorAll(".close-assignment-editor").forEach((button) => {
    button.addEventListener("click", closeAssignmentEditor);
  });
  const materialSelect = document.getElementById("assignment-material");
  materialSelect?.addEventListener("change", () => {
    const material = teacherContent.materials.find((item) => item.id === materialSelect.value);
    const titleInput = document.querySelector('#assignment-form [name="title"]');
    if (material && titleInput) titleInput.value = material.title;
  });
  const syncTargetPanels = () => {
    const mode = document.querySelector('#assignment-form [name="targetMode"]:checked')?.value;
    document.querySelectorAll(".assignment-target-panel").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.targetPanel !== mode);
    });
  };
  document.querySelectorAll('#assignment-form [name="targetMode"]').forEach((radio) => {
    radio.addEventListener("change", syncTargetPanels);
  });
  syncTargetPanels();
  document.getElementById("assignment-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = document.getElementById("save-assignment");
    const targetMode = form.get("targetMode");
    let studentIds = [];
    if (targetMode === "individual") {
      const studentId = form.get("individualStudentId");
      if (!studentId) return toast("請選擇一位學生。");
      studentIds = [studentId];
    }
    if (targetMode === "group") {
      studentIds = form.getAll("groupStudentId");
      if (studentIds.length < 2) return toast("小組派發請至少選擇 2 位學生。");
    }
    button.disabled = true;
    button.textContent = targetMode === "group" ? `正在派發給 ${studentIds.length} 位學生...` : "任務指派中...";
    try {
      await Cloud.createAssignments({
        materialId: form.get("materialId"),
        studentIds,
        school: form.get("school"),
        className: form.get("className"),
        title: form.get("title").trim(),
        instructions: form.get("instructions").trim(),
        dueAt: form.get("dueAt")
          ? new Date(`${form.get("dueAt")}T23:59:59+08:00`).toISOString()
          : null,
        xpReward: form.get("xpReward"),
      });
      await refreshTeacherStudents(currentUser());
      closeAssignmentEditor();
      render();
      toast(targetMode === "class" ? "任務已派發給全班。" : targetMode === "group" ? `任務已派發給 ${studentIds.length} 位小組成員。` : "任務已派發給指定學生。");
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新指派";
      toast(`指派失敗：${error.message}`);
    }
  });
}

function bindCoursePackEvents(root = document) {
  const close = (selector) => document.querySelector(selector)?.remove();
  root.querySelectorAll(".open-course-pack-editor").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML("beforeend", renderCoursePackEditor());
      bindCoursePackEvents(document.getElementById("course-pack-editor-modal"));
    });
  });
  root.querySelectorAll(".close-course-pack-editor").forEach((button) =>
    button.addEventListener("click", () => close("#course-pack-editor-modal")));
  root.querySelector("#course-pack-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = event.currentTarget.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = "儲存中...";
    try {
      const pack = await Cloud.saveCoursePack({
        id: form.get("id"),
        title: form.get("title").trim(),
        textbookVersion: form.get("textbookVersion").trim(),
        unitName: form.get("unitName").trim(),
        courseName: form.get("courseName").trim(),
        description: form.get("description").trim(),
      });
      selectedCoursePackId = pack.id;
      await refreshTeacherStudents(currentUser());
      document.getElementById("course-pack-editor-modal")?.remove();
      currentPage = "library";
      render();
      toast("課程包資料夾已建立。");
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新儲存";
      toast(`課程包儲存失敗：${error.message}`);
    }
  });
  root.querySelectorAll(".create-pack-from-prep").forEach((button) =>
    button.addEventListener("click", () => {
      document.getElementById("add-to-pack-modal")?.remove();
      document.body.insertAdjacentHTML("beforeend", renderCoursePackEditor());
      bindCoursePackEvents(document.getElementById("course-pack-editor-modal"));
    }));
  root.querySelectorAll(".close-add-to-pack").forEach((button) =>
    button.addEventListener("click", () => close("#add-to-pack-modal")));
  root.querySelector("#add-to-pack-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = event.currentTarget.querySelector('[type="submit"]');
    const resourceKey = form.get("resourceKey");
    const packId = form.get("packId");
    const files = prepResourceFiles(
      resourceKey,
      prepUnitProfile(selectedPrepVersion, selectedPrepUnit),
    );
    button.disabled = true;
    button.textContent = `正在加入 ${files.length} 份檔案...`;
    try {
      for (const file of files) {
        await Cloud.saveCoursePackResource({
          packId,
          resourceKey: file.resourceKey,
          title: file.title.split("｜").pop(),
          resourceType: file.resourceType,
          audience: file.audience,
          content: file.content,
        });
      }
      selectedCoursePackId = packId;
      await refreshTeacherStudents(currentUser());
      document.getElementById("add-to-pack-modal")?.remove();
      document.getElementById("resource-preview-modal")?.remove();
      toast(`${files.length} 份課程資源已加入課程包。`);
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新加入";
      toast(`加入失敗：${error.message}`);
    }
  });
  root.querySelectorAll(".close-resource-preview").forEach((button) =>
    button.addEventListener("click", () => close("#resource-preview-modal")));
  root.querySelectorAll(".preview-add-to-pack").forEach((button) =>
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderAddToCoursePackModal(button.dataset.resourceKey),
      );
      bindCoursePackEvents(document.getElementById("add-to-pack-modal"));
    }));
  root.querySelectorAll(".open-course-pack").forEach((button) => {
    button.addEventListener("click", () => {
      const pack = (teacherContent.packs || []).find((item) => item.id === button.dataset.pack);
      if (!pack) return;
      selectedCoursePackId = pack.id;
      document.body.insertAdjacentHTML("beforeend", renderCoursePackDetail(pack));
      bindCoursePackEvents(document.getElementById("course-pack-detail-modal"));
    });
  });
  root.querySelectorAll(".close-course-pack-detail").forEach((button) =>
    button.addEventListener("click", () => close("#course-pack-detail-modal")));
  root.querySelectorAll(".add-manual-resource").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderManualResourceEditor(button.dataset.pack),
      );
      bindCoursePackEvents(document.getElementById("manual-resource-modal"));
    });
  });
  root.querySelectorAll(".close-manual-resource").forEach((button) =>
    button.addEventListener("click", () => close("#manual-resource-modal")));
  root.querySelector("#manual-resource-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = event.currentTarget.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      await Cloud.saveCoursePackResource({
        packId: form.get("packId"),
        resourceKey: `manual-${Date.now()}`,
        title: form.get("title").trim(),
        resourceType: form.get("resourceType"),
        audience: form.get("audience"),
        content: {
          goal: form.get("content").trim(),
          instructions: form.get("content").trim(),
          questions: [],
        },
      });
      await refreshTeacherStudents(currentUser());
      document.getElementById("manual-resource-modal")?.remove();
      document.getElementById("course-pack-detail-modal")?.remove();
      const pack = teacherContent.packs.find((item) => item.id === form.get("packId"));
      if (pack) {
        document.body.insertAdjacentHTML("beforeend", renderCoursePackDetail(pack));
        bindCoursePackEvents(document.getElementById("course-pack-detail-modal"));
      }
      toast("課程資源已新增。");
    } catch (error) {
      button.disabled = false;
      toast(`新增失敗：${error.message}`);
    }
  });
  root.querySelectorAll(".view-saved-resource").forEach((button) => {
    button.addEventListener("click", () => {
      const resource = findCoursePackResource(button.dataset.resource);
      if (!resource) return;
      document.body.insertAdjacentHTML("beforeend", renderSavedResourcePreview(resource));
      bindCoursePackEvents(document.getElementById("saved-resource-modal"));
    });
  });
  root.querySelectorAll(".close-saved-resource").forEach((button) =>
    button.addEventListener("click", () => close("#saved-resource-modal")));
  root.querySelectorAll(".convert-resource-task").forEach((button) => {
    button.addEventListener("click", () => {
      const resource = findCoursePackResource(button.dataset.resource);
      if (!resource) return;
      const questions = resource.content.questions || [];
      document.body.insertAdjacentHTML("beforeend", renderMaterialEditor({
        title: resource.title,
        description: resource.content.goal || resource.content.instructions || "",
        ability: resource.resourceType === "assessment" ? "word" : "story",
        cefrLevel: "Pre-A1",
        status: "draft",
        questions,
      }));
      bindMaterialEditorEvents();
      if (!questions.length) toast("此手動資源尚無題目，請在題組編輯器中新增題目後發布。");
    });
  });
  root.querySelectorAll(".delete-course-resource").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm("確定從課程包移除這份資源嗎？")) return;
      await Cloud.deleteCoursePackResource(button.dataset.resource);
      await refreshTeacherStudents(currentUser());
      document.getElementById("course-pack-detail-modal")?.remove();
      render();
      toast("課程資源已移除。");
    });
  });
  root.querySelectorAll(".delete-course-pack").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm("確定刪除整個課程包資料夾嗎？其中資源也會一併刪除。")) return;
      await Cloud.deleteCoursePack(button.dataset.pack);
      await refreshTeacherStudents(currentUser());
      render();
      toast("課程包已刪除。");
    });
  });
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

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      button.textContent = shouldShow ? "隱藏" : "顯示";
      button.setAttribute("aria-label", shouldShow ? "隱藏密碼" : "顯示密碼");
      input.focus();
    });
  });

  const registerPassword = document.getElementById("register-password");
  const registerConfirmPassword = document.getElementById("register-confirm-password");
  const passwordHelp = document.getElementById("password-help");
  const passwordMatchHelp = document.getElementById("password-match-help");
  const updatePasswordStatus = () => {
    if (!registerPassword || !registerConfirmPassword) return;
    const minimumLength = Number(registerPassword.minLength);
    const isLongEnough = registerPassword.value.length >= minimumLength;
    passwordHelp.textContent = registerPassword.value
      ? isLongEnough
        ? "密碼長度符合要求。"
        : `還需要 ${minimumLength - registerPassword.value.length} 個字元。`
      : `請輸入至少 ${minimumLength} 個字元。`;
    passwordHelp.className = `field-help ${registerPassword.value ? (isLongEnough ? "valid" : "invalid") : ""}`;

    const hasConfirmation = Boolean(registerConfirmPassword.value);
    const passwordsMatch = registerPassword.value === registerConfirmPassword.value;
    registerConfirmPassword.setCustomValidity(
      hasConfirmation && !passwordsMatch ? "兩次輸入的密碼不一致。" : "",
    );
    passwordMatchHelp.textContent = hasConfirmation
      ? passwordsMatch
        ? "兩次密碼一致。"
        : "兩次輸入的密碼不一致。"
      : "請再次輸入相同密碼。";
    passwordMatchHelp.className = `field-help ${hasConfirmation ? (passwordsMatch ? "valid" : "invalid") : ""}`;
  };
  registerPassword?.addEventListener("input", updatePasswordStatus);
  registerConfirmPassword?.addEventListener("input", updatePasswordStatus);

  document.getElementById("forgot-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("forgot-submit");
    const email = new FormData(event.currentTarget).get("email");
    button.disabled = true;
    button.textContent = "重設信寄送中...";
    try {
      await Cloud.requestPasswordReset(email);
      authMode = "login";
      authRole = "teacher";
      render();
      setTimeout(() => toast("若此信箱已註冊，密碼重設信會在幾分鐘內送達。"), 50);
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新寄送密碼重設信";
      toast(`寄送失敗：${error.message}`);
    }
  });

  document.getElementById("reset-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (values.password !== values.confirmPassword) {
      return toast("兩次輸入的新密碼不一致。");
    }
    const button = document.getElementById("reset-submit");
    button.disabled = true;
    button.textContent = "密碼更新中...";
    try {
      await Cloud.updateRecoveredPassword(recoveryToken, values.password);
      recoveryToken = "";
      authMode = "login";
      authRole = "teacher";
      render();
      setTimeout(() => toast("密碼已更新，請使用新密碼登入。"), 50);
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新更新密碼";
      toast(error.message);
    }
  });

  document.getElementById("login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (Cloud.isConfigured()) {
      try {
        const user = await Cloud.login(form.get("account"), form.get("password"));
        const roleMatches = authRole === "teacher"
          ? isStaffRole(user.role)
          : user.role === "player";
        if (!roleMatches) {
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
        currentPage = isStaffRole(user.role) ? "overview" : "home";
        saveData();
        await refreshUserCloudData(user);
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
    currentPage = isStaffRole(user.role) ? "overview" : "home";
    saveData();
    render();
  });

  document.getElementById("register-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    updatePasswordStatus();
    if (!event.currentTarget.reportValidity()) return;
    const submitButton = document.getElementById("register-submit");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    values.account = values.account.trim();
    if (values.password !== values.confirmPassword) {
      registerConfirmPassword?.focus();
      return toast("兩次輸入的密碼不一致。");
    }
    submitButton.disabled = true;
    submitButton.textContent = "帳號建立中，請稍候...";
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
        currentPage = isStaffRole(user.role) ? "overview" : "home";
        saveData();
        await refreshUserCloudData(user);
        render();
        setTimeout(() => toast("雲端註冊成功，歡迎來到 WonderGo！"), 50);
        return;
      } catch (error) {
        toast(error.message);
        submitButton.disabled = false;
        submitButton.textContent = "重新註冊";
        return;
      }
    }
    if (data.users.some((user) => user.account === values.account)) {
      submitButton.disabled = false;
      submitButton.textContent = "重新註冊";
      return toast("這個帳號已有人使用。");
    }
    delete values.confirmPassword;
    const user = { ...values, role: authRole, xp: 0, level: 1 };
    data.users.push(user);
    data.currentUser = { account: user.account, role: user.role };
    currentPage = isStaffRole(user.role) ? "overview" : "home";
    saveData();
    render();
    setTimeout(() => toast("註冊成功，歡迎來到 WonderGo！"), 50);
  });

  document.querySelectorAll("[data-page]").forEach((button) => button.addEventListener("click", () => {
    currentPage = button.dataset.page;
    selectedWorldCountry = null;
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

  document.querySelectorAll(".autonomy-start").forEach((button) => button.addEventListener("click", () => {
    startGame("ability", button.dataset.ability);
  }));

  document.querySelectorAll(".mission-game").forEach((button) => button.addEventListener("click", () => {
    startGame("mission", button.dataset.mission);
  }));

  document.querySelectorAll(".assigned-game").forEach((button) => button.addEventListener("click", () => {
    startAssignedGame(button.dataset.assignment);
  }));

  document.querySelectorAll(".world-country").forEach((button) => button.addEventListener("click", () => {
    selectedWorldCountry = button.dataset.country;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  document.getElementById("world-back")?.addEventListener("click", () => {
    selectedWorldCountry = null;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".world-word").forEach((button) => button.addEventListener("click", () => {
    speakEnglish(button.dataset.word);
  }));

  document.querySelectorAll(".world-stage-start").forEach((button) => button.addEventListener("click", () => {
    startWorldStage(button.dataset.country, button.dataset.stage);
  }));

  document.querySelectorAll(".student-row").forEach((row) => row.addEventListener("click", () => {
    selectedStudent = Number(row.dataset.student);
    currentPage = "students";
    render();
  }));

  document.getElementById("learning-class-filter")?.addEventListener("change", (event) => {
    selectedClassKey = event.target.value;
    selectedStudent = -1;
    render();
  });

  document.getElementById("learning-student-filter")?.addEventListener("change", (event) => {
    selectedStudent = Number(event.target.value);
    render();
  });

  document.getElementById("analytics-class-filter")?.addEventListener("change", (event) => {
    selectedClassKey = event.target.value;
    selectedAnalyticsStudent = -1;
    render();
  });

  document.getElementById("analytics-student-filter")?.addEventListener("change", (event) => {
    selectedAnalyticsStudent = Number(event.target.value);
    render();
  });

  document.getElementById("prep-version")?.addEventListener("change", (event) => {
    selectedPrepVersion = event.target.value;
    selectedPrepBook = prepBooks(selectedPrepVersion)[0];
    selectedPrepUnit = prepUnits(selectedPrepVersion, selectedPrepBook)[0];
    render();
  });

  document.getElementById("prep-book")?.addEventListener("change", (event) => {
    selectedPrepBook = event.target.value;
    selectedPrepUnit = prepUnits(selectedPrepVersion, selectedPrepBook)[0];
    render();
  });

  document.getElementById("prep-unit")?.addEventListener("change", (event) => {
    selectedPrepUnit = event.target.value;
    render();
  });

  document.getElementById("preview-student")?.addEventListener("change", (event) => {
    selectedPreviewStudent = Number(event.target.value);
    render();
  });

  document.getElementById("prep-material-file")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    const status = document.getElementById("prep-file-status");
    if (!file) return;
    if (status) status.textContent = `正在分析 ${file.name}...`;
    try {
      prepSourceText = (await extractTeachingMaterialText(file, (message) => {
        if (status) status.textContent = `${message}｜${file.name}`;
      })).trim();
      render();
      toast(`已讀取 ${file.name}，可用自有教材產生題組。`);
    } catch (error) {
      if (status) status.textContent = "教材讀取失敗";
      toast(error.message);
    }
  });

  document.querySelector(".clear-owned-material")?.addEventListener("click", () => {
    prepSourceText = "";
    render();
    toast("已清除自有教材，可重新上傳。");
  });

  document.querySelector(".generate-owned-material-quiz")?.addEventListener("click", () => {
    const draft = ownedMaterialDraftFromUpload();
    document.body.insertAdjacentHTML("beforeend", renderMaterialEditor(draft));
    bindMaterialEditorEvents();
    toast("已依自有教材產生題組草稿，可逐題修改後發布。");
  });

  document.querySelectorAll(".prep-resource-preview").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderResourcePreviewModal(button.dataset.resourceKey),
      );
      bindCoursePackEvents(document.getElementById("resource-preview-modal"));
    });
  });

  document.querySelectorAll(".prep-resource-add").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderAddToCoursePackModal(button.dataset.resourceKey),
      );
      bindCoursePackEvents(document.getElementById("add-to-pack-modal"));
    });
  });

  document.getElementById("start-wrongbook-quiz")?.addEventListener("click", startWrongBookQuiz);

  document.querySelectorAll(".wrong-review-check").forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const user = currentUser();
      const item = wrongBookItems(user)[Number(checkbox.dataset.wrongIndex)];
      if (!item) return;
      const questionKey = item.question_key;
      const card = checkbox.closest(".wrongbook-card");
      const label = checkbox.closest(".review-check");
      const labelTitle = label?.querySelector("b");
      const labelHelp = label?.querySelector("small");
      card?.classList.toggle("reviewed", checkbox.checked);
      if (labelTitle) labelTitle.textContent = checkbox.checked
        ? "✓ 今天已複習完成" : "今日複習完成";
      if (labelHelp) labelHelp.textContent = checkbox.checked
        ? "可再次點選取消" : "點這裡或方框打勾";
      checkbox.disabled = true;
      try {
        if (user.cloud) {
          await Cloud.setWrongQuestionReviewed(questionKey, checkbox.checked);
        }
        const reviewed = new Set(user.reviewedQuestionKeys || []);
        if (checkbox.checked) reviewed.add(questionKey);
        else reviewed.delete(questionKey);
        user.reviewedQuestionKeys = [...reviewed];
        saveData();
        const reviewedCount = wrongBookItems(user)
          .filter((wrongItem) => reviewed.has(wrongItem.question_key)).length;
        const countElement = document.getElementById("wrong-reviewed-count");
        const percentElement = document.getElementById("wrong-reviewed-percent");
        if (countElement) countElement.textContent = `${reviewedCount} 題`;
        if (percentElement) {
          percentElement.textContent = `${wrongBookItems(user).length
            ? Math.round(reviewedCount / wrongBookItems(user).length * 100)
            : 0}% 完成`;
        }
        checkbox.disabled = false;
        toast(checkbox.checked ? "已記錄今天完成複習。" : "已取消今日複習紀錄。");
      } catch (error) {
        checkbox.checked = !checkbox.checked;
        card?.classList.toggle("reviewed", checkbox.checked);
        if (labelTitle) labelTitle.textContent = checkbox.checked
          ? "✓ 今天已複習完成" : "今日複習完成";
        if (labelHelp) labelHelp.textContent = checkbox.checked
          ? "可再次點選取消" : "點這裡或方框打勾";
        checkbox.disabled = false;
        toast(`更新失敗：${error.message}`);
      }
    });
  });

  document.querySelectorAll(".mission-action").forEach((button) => button.addEventListener("click", () => {
    if (currentUser()?.role === "teacher" && teacherContent.materials.some((item) => item.status === "published")) {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderAssignmentEditor(currentUser(), button.dataset.targetStudent || ""),
      );
      bindAssignmentEditorEvents();
    } else {
      toast("請先在任務派發中心發布一份學生題組。");
    }
  }));

  document.querySelectorAll(".open-material-editor").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML("beforeend", renderMaterialEditor());
      bindMaterialEditorEvents();
    });
  });

  document.querySelectorAll(".edit-material").forEach((button) => {
    button.addEventListener("click", () => {
      const material = teacherContent.materials.find((item) => item.id === button.dataset.material);
      if (!material) return;
      document.body.insertAdjacentHTML("beforeend", renderMaterialEditor(material));
      bindMaterialEditorEvents();
    });
  });

  document.querySelectorAll(".archive-material").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await Cloud.archiveMaterial(button.dataset.material);
        await refreshTeacherStudents(currentUser());
        render();
        toast("教材已封存，既有完成紀錄仍會保留。");
      } catch (error) {
        button.disabled = false;
        toast(`封存失敗：${error.message}`);
      }
    });
  });

  document.querySelectorAll(".publish-material").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      button.textContent = "發布中...";
      try {
        await Cloud.publishMaterial(button.dataset.material);
        await refreshTeacherStudents(currentUser());
        currentPage = "content";
        render();
        document.body.insertAdjacentHTML("beforeend", renderAssignmentEditor(currentUser()));
        bindAssignmentEditorEvents();
        toast("教材已發布，請選擇派發對象。");
      } catch (error) {
        button.disabled = false;
        button.textContent = "重新發布";
        toast(`發布失敗：${error.message}`);
      }
    });
  });

  document.querySelectorAll(".go-material-manager").forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = "content";
      render();
    });
  });

  document.querySelectorAll(".assign-material").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.insertAdjacentHTML(
        "beforeend",
        renderAssignmentEditor(currentUser(), "", button.dataset.material),
      );
      bindAssignmentEditorEvents();
    });
  });

  document.querySelectorAll(".open-assignment-editor").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      document.body.insertAdjacentHTML("beforeend", renderAssignmentEditor(currentUser()));
      bindAssignmentEditorEvents();
    });
  });

  document.querySelectorAll(".delete-assignment").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!window.confirm("確定刪除這項指派任務嗎？已完成紀錄也會一併移除。")) return;
      button.disabled = true;
      try {
        await Cloud.deleteAssignment(button.dataset.assignment);
        await refreshTeacherStudents(currentUser());
        render();
        toast("指派任務已刪除。");
      } catch (error) {
        button.disabled = false;
        toast(`刪除失敗：${error.message}`);
      }
    });
  });

  bindCoursePackEvents();

  document.querySelectorAll(".approve-teacher").forEach((button) => {
    button.addEventListener("click", async () => {
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = "核准中...";
      try {
        await Cloud.setTeacherApproval(button.dataset.teacher, true);
        await refreshTeacherStudents(currentUser());
        render();
        toast("教師帳號已核准，可使用教師入口登入。");
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText;
        toast(`核准失敗：${error.message}`);
      }
    });
  });

  document.querySelectorAll("[data-account-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      adminAccountFilter = button.dataset.accountFilter;
      render();
    });
  });

  document.querySelectorAll(".edit-user").forEach((button) => {
    button.addEventListener("click", () => {
      const account = staffDashboard?.users.find((item) => item.id === button.dataset.user);
      if (!account) return toast("找不到此使用者資料。");
      document.body.insertAdjacentHTML("beforeend", renderUserEditor(account));
      bindUserEditorEvents(account);
    });
  });
}

function bindUserEditorEvents(account) {
  const closeEditor = () => document.getElementById("admin-edit-modal")?.remove();
  document.getElementById("close-user-editor")?.addEventListener("click", closeEditor);
  document.getElementById("cancel-user-editor")?.addEventListener("click", closeEditor);
  document.getElementById("admin-edit-modal")?.addEventListener("click", (event) => {
    if (event.target.id === "admin-edit-modal") closeEditor();
  });
  document.getElementById("admin-user-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("save-user-editor");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form);
    values.approved = form.get("approved") === "on";
    values.email ||= "";
    values.seat ||= "";
    values.cefrLevel ||= account.level || "Pre-A1";
    button.disabled = true;
    button.textContent = "儲存中...";
    try {
      await Cloud.updateUserAsAdmin(values);
      await refreshTeacherStudents(currentUser());
      closeEditor();
      render();
      toast("使用者資料已更新，班級配對也已重新整理。");
    } catch (error) {
      button.disabled = false;
      button.textContent = "重新儲存";
      toast(error.message);
    }
  });
}

render();

if (currentUser()?.cloud) {
  const user = currentUser();
  const refresh = refreshUserCloudData(user);
  refresh.then(render);
}
