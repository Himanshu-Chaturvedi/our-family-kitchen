/**
 * Builds clear Hinglish/Hindi विधि for every recipe.
 * Run: node scripts/build-steps-hi.js
 */
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "data", "recipes.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const KEEP = new Set([
  "cucumber-tomato-salad",
  "methi-daliya",
  "lauki-soup",
  "moong-sprouts-salad",
  "tawa-fish-free-plate",
]);

const nameOf = {
  potato: "आलू",
  paneer: "पनीर",
  "green-peas": "मटर",
  bhindi: "भिंडी",
  lauki: "लौकी",
  cauliflower: "गोभी",
  eggplant: "बैंगन",
  spinach: "पालक",
  methi: "मेथी",
  karela: "करेला",
  rice: "चावल",
  sattu: "सत्तू",
  "wheat-flour": "आटा",
  "toor-dal": "अरहर दाल",
  "moong-dal": "मूंग दाल",
  "chana-dal": "चना दाल",
  chickpea: "चना",
  rajma: "राजमा",
  curd: "दही",
  besan: "बेसन",
  poha: "पोहा",
  suji: "सूजी",
  bajra: "बाजरा",
  mushroom: "मशरूम",
  pumpkin: "कद्दू",
  cabbage: "पत्ता गोभी",
  carrot: "गाजर",
};

function mainsHi(r) {
  return (r.mainIngredients || [])
    .map((id) => nameOf[id] || id)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");
}

const SPECIAL = {
  "matar-nimona": [
    "ताज़ा मटर धोकर मोटा-मोटा पीस लें — बिल्कुल महीन पेस्ट नहीं।",
    "सरसों तेल धुआं आने तक गरम करें, थोड़ा ठंडा करके जीरा-अदरक-लहसुन भूनें।",
    "टमाटर और मसाले डालकर भूनें। आलू और पिसे मटर डालकर 4–5 मिनट भूनें।",
    "पानी डालकर गाढ़ी ग्रेवी में पकाएं जब तक आलू नरम हो जाएं।",
    "गरम मसाला डालकर सादे चावल के साथ परोसें — जौनपुर की सर्दियों वाली क्लासिक।",
  ],
  "aloo-paratha": [
    "आटा नमक डालकर नरम गूंद लें। 15 मिनट ढककर रखें।",
    "उबले आलू मैश करके हरी मिर्च, धनिया, अजवाइन, अमचूर और मसाले मिलाकर भरवन बनाएं।",
    "लोई में भरवन रखें, बंद करें और हल्के हाथ से बेलें।",
    "तवे पर दोनों तरफ घी लगाकर सुनहरा स्पॉट आने तक पकाएं।",
    "गर्म-गर्म दही, मक्खन या अचार के साथ परोसें।",
  ],
  "litti-chokha": [
    "सत्तू लिट्टी तैयार रखें (सत्तू में सरसों तेल, लहसुन, अचार मसाला)।",
    "बैंगन, टमाटर, आलू सीधे आंच पर सेकें। छिलका उतारें।",
    "कच्चा प्याज-लहसुन-मिर्च, नमक और कच्चा सरसों तेल मिलाकर चोखा बनाएं।",
    "गर्म लिट्टी को घी में डुबोएं।",
    "लिट्टी के साथ तीनों चोखा प्लेट में परोसें।",
  ],
};

function build(r) {
  if (KEEP.has(r.id) && r.stepsHi && r.stepsHi.length >= 3) return r.stepsHi;
  if (SPECIAL[r.id]) return SPECIAL[r.id];

  const n = r.nameHi || r.name;
  const m = mainsHi(r) || "सामग्री";
  const cats = r.categories || [];
  const id = r.id;

  if (/paratha|thepla|missi-roti|bajra-roti|plain-paratha|ajwain/.test(id) || /paratha|thepla|roti/i.test(r.name)) {
    return [
      `${n} के लिए आटा नरम गूंद लें। 10–15 मिनट ढककर रख दें।`,
      `भरवन/मसाला तैयार करें — ${m} को मसाले और नमक के साथ मिलाएं (जहाँ भरवन हो)।`,
      `लोई बनाकर भरवन रखें, बंद करें और हल्के हाथ से बेलें। फटे नहीं, ध्यान रखें।`,
      `तवा गर्म करें। दोनों तरफ घी/तेल लगाकर सुनहरा होने तक पकाएं।`,
      `गर्म-गर्म दही, अचार या सब्ज़ी के साथ परोसें।`,
    ];
  }

  if (/puri|kachori|samosa|pakoda|tikki|cutlet|appe/.test(id)) {
    return [
      `${n} की डो/बैटर और भरवन तैयार कर लें। भरवन ज्यादा गीला न हो।`,
      `आकार बनाएं (पूरी/कचौरी/पकोड़ा)। किनारे अच्छी तरह बंद करें।`,
      `तेल मध्यम आंच पर गर्म करें — बहुत तेज़ आंच पर बाहर जल जाएगा, अंदर कच्चा रह सकता है।`,
      `सुनहरा और कुरकुरा होने तक तलें। पेपर पर निकालें।`,
      `चटनी, सब्ज़ी या चाय के साथ तुरंत परोसें।`,
    ];
  }

  if (/chilla|cheela|dosa|uttapam|poha|upma|dhokla|idli|daliya|sandwich/.test(id)) {
    return [
      `${n} का बैटर/मिक्स तैयार करें। नमक और मसाला चखकर ठीक करें।`,
      `तवा या बर्तन गर्म करें। जरूरत हो तो हल्का तेल लगाएं।`,
      `${m} और बाकी सामग्री डालकर मध्यम आंच पर पकाएं। बीच-बीच में हिलाएं/पलटें।`,
      `जब पक जाए और सुगंध आ जाए, आंच बंद करें।`,
      `चटनी, सांभर या दही के साथ गर्म परोसें।`,
    ];
  }

  if (/paneer|kofta|pasanda|tikka|lababdar|makhani|butter-masala|shahi|kadai|bhurji|handi|jalfrezi|do-pyaza|achari|methi-matar-malai/.test(id) && /paneer|malai|kofta/.test(id + (r.mainIngredients || []).join(","))) {
    return [
      `प्याज-टमाटर का मसाला भून लें। कश्मीरी मिर्च/मसाले डालकर तेल छूटने तक पकाएं।`,
      `ग्रेवी को जरूरत हो तो महीन पीस लें। नमक और गरम मसाला मिलाएं।`,
      `${m} डालें। पनीर को ज्यादा देर न उबालें — नरम रहेगा।`,
      `हल्की आंच पर 5–7 मिनट पकाएं। मलाई/कसूरी मेथी से फिनिश करें।`,
      `रोटी, नान या जीरा राइस के साथ परोसें।`,
    ];
  }

  if (/dal-|moong-dal|masoor|chana-dal|urad-dal|mix-dal|panchmel|lahsun|dal-palak|dal-tadka|dal-fry|dal-makhani/.test(id) || cats.includes("Lunch") && /dal/i.test(r.name) && !/puri|paratha|pitha/.test(id)) {
    return [
      `${m} धोकर हल्दी-नमक के साथ नरम होने तक उबालें/प्रेशर कुक करें। हल्के हाथ से मैश करें।`,
      `घी/तेल में जीरा, हींग, लहसुन-प्याज का तड़का लगाएं।`,
      `टमाटर और मसाले भूनकर दाल में मिलाएं।`,
      `गाढ़ापन देखकर पानी मिलाएं। 5–8 मिनट हल्की आंच पर पकाएं।`,
      `ऊपर से घी और धनिया डालकर चावल या रोटी के साथ परोसें।`,
    ];
  }

  if (/chole|rajma|lobia|kala-chana|ghugni/.test(id)) {
    return [
      `${m} रात भर भिगोकर नरम होने तक प्रेशर कुक करें।`,
      `प्याज-टमाटर का मसाला अच्छे से भूनें। मसाले डालें।`,
      `उबली हुई दाल/चना डालकर 10–15 मिनट धीमी आंच पर पकाएं। कुछ दाने मैश कर लें — ग्रेवी अच्छी बनेगी।`,
      `गरम मसाला और धनिया डालें।`,
      `रोटी, चावल या कुलचा/पुरी के साथ परोसें।`,
    ];
  }

  if (/kadhi/.test(id)) {
    return [
      `दही और बेसन को पानी में फेंटकर लम्प्स-फ्री बनाएं।`,
      `हल्की आंच पर लगातार हिलाते हुए उबालें — कच्चा स्वाद न रहे।`,
      `तड़का लगाएं (जीरा/राई/हींग/मिर्च)। पकोड़ा/बूंदी हो तो अंत में डालें।`,
      `नमक और खट्टापन चखकर ठीक करें।`,
      `गरम चावल के साथ परोसें।`,
    ];
  }

  if (/pulao|biryani|tahri|fried-rice|lemon-rice|tomato-rice|jeera-rice|khichdi/.test(id)) {
    return [
      `चावल धोकर 15–20 मिनट भिगो दें (खिचड़ी में दाल भी साथ धोएं)।`,
      `घी/तेल में खड़े मसाले और प्याज भूनें। ${m} डालकर हल्के से भूनें।`,
      `चावल डालें, पानी और नमक मिलाएं। ढककर धीमी आंच पर पकाएं।`,
      `पकने के बाद 5 मिनट ढककर रखें, फिर हल्के हाथ से फुलफुलाएं।`,
      `रायता, अचार या सब्ज़ी/दाल के साथ परोसें।`,
    ];
  }

  if (/halwa|kheer|ladoo|malpua|gujiya|thekua|churma|seviyan/.test(id) || cats.includes("Sweets")) {
    return [
      `${n} की मुख्य सामग्री (${m}) धीमी आंच पर घी में भूनें — कच्चा स्वाद न रहे।`,
      `चीनी/गुड़ और दूध/पानी सावधानी से मिलाएं। लगातार हिलाएं।`,
      `गाढ़ा और चमकदार होने तक पकाएं। इलायची डालें।`,
      `मेवे से सजाएं।`,
      `गर्म या ठंडा, परिवार के हिसाब से परोसें। (डायबिटीज में मात्रा कम रखें)`,
    ];
  }

  if (/litti|chokha|nimona|pitha|fara|bafauri|sattu/.test(id)) {
    return [
      `${n} की पारंपरिक तैयारी शुरू करें — ${m} तैयार रखें।`,
      `मसाला/भरवन में सरसों तेल, लहसुन, अदरक और मसाले अच्छी तरह मिलाएं।`,
      `पकाने का तरीका अपनाएं (सेकना/भाप/तड़का) — धीमी आंच पर पूरा पकने दें।`,
      `नमक और तीखापन चखकर ठीक करें।`,
      `घी या चोखा/चावल के साथ गरमागरम परोसें।`,
    ];
  }

  if (/soup|salad|chaat|rasam/.test(id)) {
    return [
      `सब्ज़ियाँ धोकर काट लें — ${m}।`,
      `हल्के मसाले, नींबू और नमक मिलाएं। तलना कम/नहीं।`,
      `जल्दी मिलाकर तुरंत परोसें ताकि कुरकुरा/ताज़गी बनी रहे।`,
      `मीठी चटनी या चीनी न डालें (खासकर डायबिटीज प्लेट में)।`,
      `दाल-रोटी या अलग स्नैक की तरह खाएं।`,
    ];
  }

  // Default sabzi / general
  return [
    `${n} के लिए ${m} धोकर काट लें।`,
    `तेल/सरसों तेल गर्म करके जीरा का तड़का लगाएं। प्याज-अदरक-लहसुन भूनें।`,
    `टमाटर और मसाले (हल्दी, मिर्च, धनिया) डालकर भूनें जब तक मसाला बैठ जाए।`,
    `सब्ज़ी डालकर ढककर पकाएं। बीच-बीच में हिलाएं। नमक और पानी जरूरत अनुसार डालें।`,
    `गरम मसाला/अमचूर और धनिया डालकर रोटी या चावल के साथ परोसें।`,
  ];
}

data.recipes.forEach((r) => {
  r.stepsHi = build(r);
  if (!r.tipsHi || !r.tipsHi.length) {
    r.tipsHi = (r.tips || []).map((t) => String(t));
  }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Updated stepsHi for", data.recipes.length, "recipes");
console.log("Sample aloo-paratha:\n", data.recipes.find((r) => r.id === "aloo-paratha").stepsHi.join("\n"));
console.log("Sample matar-nimona:\n", data.recipes.find((r) => r.id === "matar-nimona").stepsHi.join("\n"));
console.log("Sample dal-tadka:\n", data.recipes.find((r) => r.id === "dal-tadka").stepsHi.join("\n"));
