/**
 * Adds stepsHi (Hinglish विधि) + Diabetes Special tags.
 * Run: node scripts/enrich-recipes.js
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "recipes.json");
const catFile = path.join(__dirname, "..", "data", "categories.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const DIABETES_IDS = new Set([
  "bharwa-karela", "karela-pyaz", "methi-paratha", "methi-aloo", "aloo-methi", "methi-paneer",
  "lauki-chana-dal", "lauki-tamatar", "lauki-aloo", "bhindi-masala", "bhindi-do-pyaza", "kurkuri-bhindi",
  "moong-dal", "moong-dal-cheela", "moong-dal-khichdi", "dal-palak", "mix-dal", "masoor-dal",
  "lahsun-dal", "dal-tadka", "chana-dal-recipe", "urad-dal-recipe",
  "palak-paneer", "palak-aloo", "palak-chana", "palak-khichdi", "palak-paratha", "palak-corn",
  "bajra-roti", "bajra-khichdi", "missi-roti", "besan-chilla", "suji-chilla",
  "vegetable-soup", "sprouts-chat", "corn-chat", "cabbage-sabzi", "cabbage-matar",
  "jeera-aloo", "tinda-masala", "parwal-masala", "parwal-aloo", "up-kaddu-sabzi",
  "sattu-drink-namkeen", "sattu-paratha", "sattu-litti", "bafauri", "dal-pitha",
  "vegetable-daliya", "vegetable-upma", "vermicelli-upma", "idli-sambhar",
  "lobia-curry", "lobia-masala", "kala-chana-masala", "rajma-masala",
  "baingan-bharta", "baingan-chokha", "aloo-chokha", "tamatar-chokha",
  "gatte-ki-sabzi", "rajasthani-kadhi", "up-style-kadhi", "boondi-kadhi",
  "beans-poriyal", "onion-tomato-sabzi", "mushroom-masala", "soya-matar",
  "plain-paratha", "ajwain-paratha", "thepla", "vegetable-khichdi", "masala-khichdi",
  "lemon-rice", "jeera-rice", "tomato-rasam",
]);

const DIABETES_NEW = [
  {
    id: "cucumber-tomato-salad",
    name: "Cucumber Tomato Salad",
    nameHi: "खीरा टमाटर सलाद",
    aliases: ["Kheera Salad", "Diabetes Salad"],
    region: ["North India"],
    categories: ["Lunch", "Dinner", "Diabetes Special", "Evening Snacks"],
    mainIngredients: ["tomato"],
    ingredients: [
      { name: "Cucumber", quantity: 2, unit: "medium", ingredientId: null },
      { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
      { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
      { name: "Roasted cumin powder", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
      { name: "Black salt / salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      { name: "Coriander", quantity: 1, unit: "tbsp", ingredientId: "coriander" },
    ],
    servings: 2,
    prepTime: 10,
    cookTime: 0,
    difficulty: "Easy",
    steps: [
      "Wash and chop cucumber, tomato and onion into small pieces.",
      "Mix with lemon juice, roasted cumin, salt and coriander.",
      "Eat fresh as a side with dal-roti — light for blood sugar control.",
      "Do not add sugar or sweet chutney.",
      "Optional: add soaked sprouts for more fibre.",
    ],
    stepsHi: [
      "खीरा, टमाटर और प्याज धोकर छोटे टुकड़ों में काट लें।",
      "नींबू, भुना जीरा, नमक और धनिया मिलाकर अच्छी तरह मिक्स करें।",
      "दाल-रोटी के साथ तुरंत खाएं — शुगर कंट्रोल के लिए हल्का और अच्छा।",
      "चीनी या मीठी चटनी बिल्कुल न डालें।",
      "चाहें तो भीगे हुए स्प्राउट्स भी मिला सकते हैं — फाइबर बढ़ जाएगा।",
    ],
    tips: ["Papa ke liye best side dish — no frying, no sugar."],
    tipsHi: ["पापा के लिए बेस्ट साइड डिश — बिना तलन, बिना चीनी।"],
    season: ["Summer", "All"],
    diet: "Vegetarian",
    diabetesNotes: "Very low GI side. Pair with dal and 1-2 rotis.",
  },
  {
    id: "methi-daliya",
    name: "Methi Daliya",
    nameHi: "मेथी दलिया",
    aliases: ["Fenugreek Dalia", "Diabetes Daliya"],
    region: ["North India"],
    categories: ["Breakfast", "Lunch", "Diabetes Special"],
    mainIngredients: ["daliya", "methi"],
    ingredients: [
      { name: "Daliya (broken wheat)", quantity: 1, unit: "cup", ingredientId: "daliya" },
      { name: "Fresh methi leaves", quantity: 1, unit: "cup", ingredientId: "methi" },
      { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
      { name: "Tomato", quantity: 1, unit: "small", ingredientId: "tomato" },
      { name: "Ghee or oil", quantity: 1, unit: "tsp", ingredientId: "ghee" },
      { name: "Cumin", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
      { name: "Water", quantity: 3, unit: "cups", ingredientId: null },
      { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
    ],
    servings: 2,
    prepTime: 10,
    cookTime: 25,
    difficulty: "Easy",
    steps: [
      "Dry roast daliya lightly. Heat 1 tsp ghee, add cumin and onion.",
      "Add tomato, methi and spices; sauté 2 minutes.",
      "Add daliya, water and salt. Pressure cook 2–3 whistles.",
      "Serve warm — keep oil minimal for diabetes plate.",
      "Pair with plain curd (unsweetened).",
    ],
    stepsHi: [
      "दलिया हल्का भून लें। 1 छोटा चम्मच घी में जीरा और प्याज तड़कें।",
      "टमाटर, मेथी और मसाले डालकर 2 मिनट भूनें।",
      "दलिया, पानी और नमक डालकर 2–3 सीटी तक पकाएं।",
      "गर्म-गर्म परोसें — डायबिटीज के लिए तेल कम रखें।",
      "बिना चीनी वाले सादे दही के साथ खाएं।",
    ],
    tips: ["Methi helps; keep ghee to 1 tsp."],
    tipsHi: ["मेथी फायदेमंद है; घी सिर्फ 1 छोटा चम्मच रखें।"],
    season: ["Winter", "All"],
    diet: "Vegetarian",
    diabetesNotes: "High fibre breakfast. Avoid potato in this version.",
  },
  {
    id: "lauki-soup",
    name: "Lauki Soup",
    nameHi: "लौकी सूप",
    aliases: ["Bottle Gourd Soup", "Diabetes Soup"],
    region: ["North India"],
    categories: ["Dinner", "Lunch", "Diabetes Special"],
    mainIngredients: ["lauki"],
    ingredients: [
      { name: "Lauki, cubed", quantity: 3, unit: "cups", ingredientId: "lauki" },
      { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
      { name: "Black pepper", quantity: 0.5, unit: "tsp", ingredientId: null },
      { name: "Cumin", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
      { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
      { name: "Water", quantity: 3, unit: "cups", ingredientId: null },
      { name: "Lemon", quantity: 0.5, unit: "piece", ingredientId: "lemon" },
    ],
    servings: 2,
    prepTime: 10,
    cookTime: 20,
    difficulty: "Easy",
    steps: [
      "Boil lauki with ginger, cumin and salt until soft.",
      "Blend smooth (or keep slightly chunky).",
      "Simmer 2 minutes; add pepper and lemon.",
      "No cream, no cornflour — keep it light.",
      "Good light dinner option for Papa.",
    ],
    stepsHi: [
      "लौकी को अदरक, जीरा और नमक के साथ उबालें जब तक नरम हो जाए।",
      "मिक्सी में महीन पीस लें (या थोड़ा मोटा रख सकते हैं)।",
      "2 मिनट हल्की आंच पर पकाएं; काली मिर्च और नींबू डालें।",
      "मलाई या कॉर्नफ्लोर बिल्कुल न डालें — हल्का रखें।",
      "पापा के लिए रात का हल्का खाना बहुत अच्छा है।",
    ],
    tips: ["Add a spoon of moong dal while boiling for more protein."],
    tipsHi: ["प्रोटीन के लिए उबालते समय 1 चम्मच मूंग दाल मिला सकते हैं।"],
    season: ["All"],
    diet: "Vegetarian",
    diabetesNotes: "Hydrating, low calorie, low GI.",
  },
  {
    id: "moong-sprouts-salad",
    name: "Moong Sprouts Salad",
    nameHi: "मूंग स्प्राउट्स सलाद",
    aliases: ["Sprouted Moong Salad"],
    region: ["North India"],
    categories: ["Breakfast", "Evening Snacks", "Diabetes Special", "Lunch"],
    mainIngredients: ["moong-dal"],
    ingredients: [
      { name: "Sprouted moong", quantity: 1.5, unit: "cups", ingredientId: "moong-dal" },
      { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
      { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" },
      { name: "Cucumber", quantity: 1, unit: "small", ingredientId: null },
      { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
      { name: "Chaat masala / roasted cumin", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
      { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
    ],
    servings: 2,
    prepTime: 10,
    cookTime: 5,
    difficulty: "Easy",
    steps: [
      "Steam sprouts 3–4 minutes or use raw if soft.",
      "Mix chopped onion, tomato, cucumber, lemon, spices and salt.",
      "Serve immediately — no frying.",
      "Excellent high-protein diabetes snack.",
      "Avoid sev and sweet chutney.",
    ],
    stepsHi: [
      "स्प्राउट्स को 3–4 मिनट हल्का स्टीम करें, या नरम हों तो कच्चे भी चला सकते हैं।",
      "प्याज, टमाटर, खीरा, नींबू, मसाले और नमक मिलाएं।",
      "तुरंत परोसें — बिल्कुल न तलें।",
      "डायबिटीज के लिए हाई-प्रोटीन और बहुत अच्छा स्नैक।",
      "सेव और मीठी चटनी मत डालें।",
    ],
    tips: ["Sprout moong at home overnight for best freshness."],
    tipsHi: ["घर पर मूंग अंकुरित करें — ताज़ा और सस्ता।"],
    season: ["All"],
    diet: "Vegetarian",
    diabetesNotes: "Protein + fibre snack between meals.",
  },
  {
    id: "tawa-fish-free-plate",
    name: "Diabetes Thali Plate (Veg)",
    nameHi: "डायबिटीज थाली प्लेट",
    aliases: ["Papa Diabetes Plate", "Balanced Veg Plate"],
    region: ["North India", "Jaunpur", "Jaipur"],
    categories: ["Lunch", "Dinner", "Diabetes Special"],
    mainIngredients: ["toor-dal", "lauki", "wheat-flour"],
    ingredients: [
      { name: "Dal (moong/toor)", quantity: 1, unit: "bowl", ingredientId: "toor-dal" },
      { name: "Lauki or bhindi sabzi", quantity: 1, unit: "bowl", ingredientId: "lauki" },
      { name: "Phulka / missi roti", quantity: 2, unit: "pieces", ingredientId: "wheat-flour" },
      { name: "Salad", quantity: 1, unit: "bowl", ingredientId: "tomato" },
      { name: "Plain curd (unsweetened)", quantity: 0.5, unit: "cup", ingredientId: "curd" },
    ],
    servings: 1,
    prepTime: 20,
    cookTime: 30,
    difficulty: "Easy",
    steps: [
      "Cook a simple dal with less oil and a fibre-rich sabzi (lauki/bhindi/karela/methi).",
      "Make 1–2 thin rotis (prefer missi/bajra sometimes).",
      "Add a big salad and unsweetened curd.",
      "Skip rice on most days; if rice, use small portion and add extra sabzi.",
      "No sweet dish after meals — walk 10 minutes if possible.",
    ],
    stepsHi: [
      "कम तेल वाली दाल और फाइबर वाली सब्ज़ी बनाएं (लौकी/भिंडी/करेला/मेथी)।",
      "1–2 पतली रोटी लगाएं (कभी-कभी मिस्सी या बाजरा बेहतर)।",
      "बड़ा सलाद और बिना चीनी वाला दही ज़रूर रखें।",
      "अक्सर चावल छोड़ दें; अगर खाएं तो थोड़ा सा और सब्ज़ी ज्यादा।",
      "खाने के बाद मीठा नहीं — हो सके तो 10 मिनट टहल लें।",
    ],
    tips: ["This is a template plate for Papa — swap sabzi by season."],
    tipsHi: ["पापा के लिए आसान प्लेट टेम्पलेट — मौसम के हिसाब से सब्ज़ी बदलें।"],
    season: ["All"],
    diet: "Vegetarian",
    diabetesNotes: "Balanced plate: protein + fibre + controlled carbs.",
  },
];

function toHinglish(step) {
  let s = String(step);
  const pairs = [
    [/Pressure cook (\d+)[–-](\d+) whistles?/gi, "$1–$2 सीटी तक प्रेशर कुक करें"],
    [/Pressure cook/gi, "प्रेशर कुक करें"],
    [/Heat (a )?tawa/gi, "तवा गर्म करें"],
    [/Heat oil\/ghee/gi, "तेल/घी गर्म करें"],
    [/Heat (mustard )?oil/gi, "तेल गर्म करें"],
    [/Heat ghee/gi, "घी गर्म करें"],
    [/Heat butter/gi, "मक्खन गर्म करें"],
    [/Deep fry/gi, "डीप फ्राई करें"],
    [/Shallow fry/gi, "थोड़ा तेल में तलें"],
    [/Stir-fry/gi, "तेज़ आंच पर भूनें"],
    [/Sauté/gi, "भूनें"],
    [/Cook covered/gi, "ढककर पकाएं"],
    [/Simmer/gi, "हल्की आंच पर पकाएं"],
    [/Bring to (a )?boil/gi, "उबाल आने दें"],
    [/Wash and /gi, "धोकर "],
    [/Wash /gi, "धो लें "],
    [/Mix /gi, "मिक्स करें "],
    [/Add /gi, "डालें "],
    [/Serve hot/gi, "गर्म-गर्म परोसें"],
    [/Serve immediately/gi, "तुरंत परोसें"],
    [/Serve with/gi, "के साथ परोसें"],
    [/Serve /gi, "परोसें "],
    [/Knead /gi, "गूंद लें "],
    [/Roll into/gi, "बेलकर "],
    [/Grind /gi, "पीस लें "],
    [/Mash /gi, "मैश करें "],
    [/Chop /gi, "काट लें "],
    [/Cover and cook/gi, "ढककर पकाएं"],
    [/on (a )?low flame/gi, "हल्की आंच पर"],
    [/on medium flame/gi, "मध्यम आंच पर"],
    [/on high flame/gi, "तेज़ आंच पर"],
    [/until golden/gi, "सुनहरा होने तक"],
    [/until soft/gi, "नरम होने तक"],
    [/minutes/gi, "मिनट"],
    [/Optional:/gi, "चाहें तो:"],
    [/Finish with/gi, "अंत में डालें"],
    [/Garnish with/gi, "सजावट के लिए डालें"],
    [/Rest (\d+) minutes/gi, "$1 मिनट ढक के रखें"],
    [/Do not /gi, "मत "],
    [/water/gi, "पानी"],
    [/salt/gi, "नमक"],
    [/onion/gi, "प्याज"],
    [/tomato/gi, "टमाटर"],
    [/potato/gi, "आलू"],
    [/spices/gi, "मसाले"],
    [/coriander/gi, "धनिया"],
    [/cumin/gi, "जीरा"],
    [/garlic/gi, "लहसुन"],
    [/ginger/gi, "अदरक"],
    [/dough/gi, "आटा/डो"],
    [/batter/gi, "बैटर"],
    [/gravy/gi, "ग्रेवी"],
    [/roti/gi, "रोटी"],
    [/rice/gi, "चावल"],
    [/curd/gi, "दही"],
    [/ghee/gi, "घी"],
  ];
  for (const [re, rep] of pairs) s = s.replace(re, rep);
  // If still mostly English, prefix with gentle Hinglish cue
  const hindiChars = (s.match(/[\u0900-\u097F]/g) || []).length;
  if (hindiChars < 8) {
    s = s + " (इसे ध्यान से करें)";
  }
  return s.trim();
}

function enrich(r) {
  if (!Array.isArray(r.stepsHi) || r.stepsHi.length < 3) {
    r.stepsHi = (r.steps || []).map(toHinglish);
  }
  if (!Array.isArray(r.tipsHi)) {
    r.tipsHi = (r.tips || []).map((t) => {
      let x = String(t);
      x = x.replace(/Serve/gi, "परोसें").replace(/Best/gi, "बेस्ट");
      return x;
    });
  }
  if (DIABETES_IDS.has(r.id)) {
    if (!r.categories.includes("Diabetes Special")) r.categories.push("Diabetes Special");
    if (!r.diabetesNotes) {
      r.diabetesNotes = "Prefer less oil/ghee; watch portion of rice/roti; avoid sugar.";
    }
  }
  // Sweets generally not diabetes unless tagged specifically
  if ((r.categories || []).includes("Sweets") && r.id !== "sattu-drink-sweet") {
    r.categories = (r.categories || []).filter((c) => c !== "Diabetes Special");
  }
  return r;
}

data.recipes = data.recipes.map(enrich);

const existing = new Set(data.recipes.map((r) => r.id));
DIABETES_NEW.forEach((r) => {
  if (!existing.has(r.id)) {
    r.otherIngredients = [];
    data.recipes.push(r);
  }
});

const cats = JSON.parse(fs.readFileSync(catFile, "utf8"));
if (!cats.categories.some((c) => c.id === "Diabetes Special")) {
  cats.categories.push({
    id: "Diabetes Special",
    name: "Diabetes Special",
    nameHi: "डायबिटीज स्पेशल",
    icon: "🩺",
  });
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
fs.writeFileSync(catFile, JSON.stringify(cats, null, 2));

const diabetesCount = data.recipes.filter((r) => (r.categories || []).includes("Diabetes Special")).length;
const withHi = data.recipes.filter((r) => (r.stepsHi || []).length >= 3).length;
console.log("Recipes:", data.recipes.length);
console.log("With stepsHi:", withHi);
console.log("Diabetes Special:", diabetesCount);
