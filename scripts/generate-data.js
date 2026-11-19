/**
 * Generates recipes.json, ingredients.json, categories.json
 * Run: node scripts/generate-data.js
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "data");

const INGREDIENTS = [
  { id: "potato", name: "Potato", nameHi: "आलू", category: "Potato" },
  { id: "paneer", name: "Paneer", nameHi: "पनीर", category: "Paneer" },
  { id: "green-peas", name: "Green Peas", nameHi: "मटर", category: "Matar" },
  { id: "bhindi", name: "Okra", nameHi: "भिंडी", category: "Bhindi" },
  { id: "lauki", name: "Bottle Gourd", nameHi: "लौकी", category: "Lauki" },
  { id: "cauliflower", name: "Cauliflower", nameHi: "गोभी", category: "Gobhi" },
  { id: "eggplant", name: "Eggplant", nameHi: "बैंगन", category: "Baingan" },
  { id: "tinda", name: "Tinda", nameHi: "टिंडा", category: "Tinda" },
  { id: "parwal", name: "Pointed Gourd", nameHi: "परवल", category: "Parwal" },
  { id: "pumpkin", name: "Pumpkin", nameHi: "कद्दू", category: "Kaddu" },
  { id: "karela", name: "Bitter Gourd", nameHi: "करेला", category: "Karela" },
  { id: "spinach", name: "Spinach", nameHi: "पालक", category: "Palak" },
  { id: "methi", name: "Fenugreek Leaves", nameHi: "मेथी", category: "Methi" },
  { id: "mushroom", name: "Mushroom", nameHi: "मशरूम", category: "Mushroom" },
  { id: "chickpea", name: "Chickpeas", nameHi: "चना", category: "Chana" },
  { id: "kala-chana", name: "Black Chickpeas", nameHi: "काला चना", category: "Chana" },
  { id: "chana-dal", name: "Chana Dal", nameHi: "चना दाल", category: "Dal" },
  { id: "rajma", name: "Kidney Beans", nameHi: "राजमा", category: "Rajma" },
  { id: "lobia", name: "Black-eyed Peas", nameHi: "लोबिया", category: "Lobia" },
  { id: "sattu", name: "Roasted Gram Flour", nameHi: "सत्तू", category: "Sattu" },
  { id: "rice", name: "Rice", nameHi: "चावल", category: "Rice" },
  { id: "toor-dal", name: "Toor Dal", nameHi: "अरहर दाल", category: "Dal" },
  { id: "moong-dal", name: "Moong Dal", nameHi: "मूंग दाल", category: "Dal" },
  { id: "masoor-dal", name: "Masoor Dal", nameHi: "मसूर दाल", category: "Dal" },
  { id: "urad-dal", name: "Urad Dal", nameHi: "उड़द दाल", category: "Dal" },
  { id: "wheat-flour", name: "Wheat Flour", nameHi: "गेहूं का आटा", category: "Seasonal vegetables" },
  { id: "besan", name: "Gram Flour", nameHi: "बेसन", category: "Dal" },
  { id: "onion", name: "Onion", nameHi: "प्याज", category: "Seasonal vegetables" },
  { id: "tomato", name: "Tomato", nameHi: "टमाटर", category: "Seasonal vegetables" },
  { id: "carrot", name: "Carrot", nameHi: "गाजर", category: "Seasonal vegetables" },
  { id: "radish", name: "Radish", nameHi: "मूली", category: "Seasonal vegetables" },
  { id: "cabbage", name: "Cabbage", nameHi: "पत्ता गोभी", category: "Seasonal vegetables" },
  { id: "capsicum", name: "Capsicum", nameHi: "शिमला मिर्च", category: "Seasonal vegetables" },
  { id: "beans", name: "French Beans", nameHi: "बीन्स", category: "Seasonal vegetables" },
  { id: "corn", name: "Corn", nameHi: "मक्का", category: "Seasonal vegetables" },
  { id: "soya", name: "Soya Chunks", nameHi: "सोया", category: "Seasonal vegetables" },
  { id: "poha", name: "Flattened Rice", nameHi: "पोहा", category: "Rice" },
  { id: "suji", name: "Semolina", nameHi: "सूजी", category: "Seasonal vegetables" },
  { id: "vermicelli", name: "Vermicelli", nameHi: "सेवई", category: "Seasonal vegetables" },
  { id: "daliya", name: "Broken Wheat", nameHi: "दलिया", category: "Seasonal vegetables" },
  { id: "bread", name: "Bread", nameHi: "ब्रेड", category: "Seasonal vegetables" },
  { id: "bajra", name: "Pearl Millet Flour", nameHi: "बाजरा आटा", category: "Seasonal vegetables" },
  { id: "curd", name: "Curd", nameHi: "दही", category: "Seasonal vegetables" },
  { id: "milk", name: "Milk", nameHi: "दूध", category: "Seasonal vegetables" },
  { id: "ghee", name: "Ghee", nameHi: "घी", category: "Seasonal vegetables" },
  { id: "mustard-oil", name: "Mustard Oil", nameHi: "सरसों का तेल", category: "Seasonal vegetables" },
  { id: "oil", name: "Cooking Oil", nameHi: "तेल", category: "Seasonal vegetables" },
  { id: "ginger", name: "Ginger", nameHi: "अदरक", category: "Seasonal vegetables" },
  { id: "garlic", name: "Garlic", nameHi: "लहसुन", category: "Seasonal vegetables" },
  { id: "green-chilli", name: "Green Chilli", nameHi: "हरी मिर्च", category: "Seasonal vegetables" },
  { id: "coriander", name: "Coriander Leaves", nameHi: "धनिया", category: "Seasonal vegetables" },
  { id: "cumin", name: "Cumin Seeds", nameHi: "जीरा", category: "Seasonal vegetables" },
  { id: "turmeric", name: "Turmeric", nameHi: "हल्दी", category: "Seasonal vegetables" },
  { id: "red-chilli", name: "Red Chilli Powder", nameHi: "लाल मिर्च", category: "Seasonal vegetables" },
  { id: "garam-masala", name: "Garam Masala", nameHi: "गरम मसाला", category: "Seasonal vegetables" },
  { id: "coriander-powder", name: "Coriander Powder", nameHi: "धनिया पाउडर", category: "Seasonal vegetables" },
  { id: "amchur", name: "Dry Mango Powder", nameHi: "अमचूर", category: "Seasonal vegetables" },
  { id: "asafoetida", name: "Asafoetida", nameHi: "हींग", category: "Seasonal vegetables" },
  { id: "mustard-seeds", name: "Mustard Seeds", nameHi: "राई", category: "Seasonal vegetables" },
  { id: "ajwain", name: "Carom Seeds", nameHi: "अजवाइन", category: "Seasonal vegetables" },
  { id: "kasuri-methi", name: "Dried Fenugreek", nameHi: "कसूरी मेथी", category: "Methi" },
  { id: "cream", name: "Fresh Cream", nameHi: "मलाई", category: "Seasonal vegetables" },
  { id: "butter", name: "Butter", nameHi: "मक्खन", category: "Seasonal vegetables" },
  { id: "cashew", name: "Cashew", nameHi: "काजू", category: "Seasonal vegetables" },
  { id: "sugar", name: "Sugar", nameHi: "चीनी", category: "Seasonal vegetables" },
  { id: "jaggery", name: "Jaggery", nameHi: "गुड़", category: "Seasonal vegetables" },
  { id: "salt", name: "Salt", nameHi: "नमक", category: "Seasonal vegetables" },
  { id: "lemon", name: "Lemon", nameHi: "नींबू", category: "Seasonal vegetables" },
  { id: "peanuts", name: "Peanuts", nameHi: "मूंगफली", category: "Seasonal vegetables" },
  { id: "coconut", name: "Coconut", nameHi: "नारियल", category: "Seasonal vegetables" },
  { id: "sev", name: "Sev", nameHi: "सेव", category: "Seasonal vegetables" },
  { id: "papad", name: "Papad", nameHi: "पापड़", category: "Seasonal vegetables" },
  { id: "ker", name: "Ker Berries", nameHi: "केर", category: "Seasonal vegetables" },
  { id: "sangri", name: "Sangri Beans", nameHi: "सांगरी", category: "Seasonal vegetables" },
  { id: "mangodi", name: "Mangodi", nameHi: "मंगोड़ी", category: "Dal" },
  { id: "badi", name: "Urad Badi", nameHi: "बड़ी", category: "Dal" },
  { id: "boondi", name: "Boondi", nameHi: "बूंदी", category: "Seasonal vegetables" },
  { id: "pav", name: "Pav Buns", nameHi: "पाव", category: "Seasonal vegetables" },
  { id: "noodles", name: "Noodles", nameHi: "नूडल्स", category: "Seasonal vegetables" },
  { id: "maida", name: "Refined Flour", nameHi: "मैदा", category: "Seasonal vegetables" },
  { id: "yeast", name: "Yeast / Idli Rice Batter", nameHi: "खमीर / बैटर", category: "Seasonal vegetables" },
  { id: "idli-rice", name: "Idli Rice", nameHi: "इडली चावल", category: "Rice" },
  { id: "tamarind", name: "Tamarind", nameHi: "इमली", category: "Seasonal vegetables" },
  { id: "curry-leaves", name: "Curry Leaves", nameHi: "करी पत्ता", category: "Seasonal vegetables" },
  { id: "fennel", name: "Fennel Seeds", nameHi: "सौंफ", category: "Seasonal vegetables" },
  { id: "cardamom", name: "Cardamom", nameHi: "इलायची", category: "Seasonal vegetables" },
  { id: "cinnamon", name: "Cinnamon", nameHi: "दालचीनी", category: "Seasonal vegetables" },
  { id: "clove", name: "Cloves", nameHi: "लौंग", category: "Seasonal vegetables" },
  { id: "bay-leaf", name: "Bay Leaf", nameHi: "तेज पत्ता", category: "Seasonal vegetables" },
  { id: "saffron", name: "Saffron", nameHi: "केसर", category: "Seasonal vegetables" },
  { id: "raisins", name: "Raisins", nameHi: "किशमिश", category: "Seasonal vegetables" },
  { id: "almonds", name: "Almonds", nameHi: "बादाम", category: "Seasonal vegetables" },
  { id: "khoya", name: "Khoya", nameHi: "खोया", category: "Seasonal vegetables" },
  { id: "hung-curd", name: "Hung Curd", nameHi: "छाछ/गाढ़ा दही", category: "Seasonal vegetables" },
  { id: "chutney", name: "Chutney Ingredients", nameHi: "चटनी सामग्री", category: "Seasonal vegetables" },
  { id: "pickle-masala", name: "Pickle Masala", nameHi: "अचार मसाला", category: "Seasonal vegetables" },
  { id: "wheat-dough", name: "Wheat Dough", nameHi: "आटे का आटा", category: "Seasonal vegetables" },
];

const CATEGORIES = [
  { id: "Breakfast", name: "Breakfast", nameHi: "नाश्ता", icon: "🌅" },
  { id: "Lunch", name: "Lunch", nameHi: "दोपहर का खाना", icon: "☀️" },
  { id: "Dinner", name: "Dinner", nameHi: "रात का खाना", icon: "🌙" },
  { id: "Evening Snacks", name: "Evening Snacks", nameHi: "शाम का नाश्ता", icon: "🫖" },
  { id: "Purvanchal Special", name: "Purvanchal Special", nameHi: "हमारा खास खाना", icon: "🏡" },
  { id: "Rajasthani Special", name: "Rajasthani Special", nameHi: "राजस्थानी स्पेशल", icon: "🏜️" },
  { id: "Sweets", name: "Sweets", nameHi: "मिठाई", icon: "🍮" },
  { id: "Diabetes Special", name: "Diabetes Special", nameHi: "डायबिटीज स्पेशल", icon: "🩺" },
  { id: "Traditional", name: "Traditional", nameHi: "पारंपरिक", icon: "🪔" },
];

function R(def) {
  return {
    aliases: [],
    region: ["North India"],
    categories: ["Lunch", "Dinner"],
    otherIngredients: [],
    tips: [],
    season: ["All"],
    diet: "Vegetarian",
    difficulty: "Easy",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    ...def,
  };
}

function spiceBase() {
  return [
    { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
    { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
    { name: "Red chilli powder", quantity: 1, unit: "tsp", ingredientId: "red-chilli" },
    { name: "Coriander powder", quantity: 1, unit: "tsp", ingredientId: "coriander-powder" },
  ];
}

function paratha(id, name, nameHi, filling, mainIng, extras = {}) {
  const fillSteps = filling.steps || [];
  return R({
    id,
    name,
    nameHi,
    aliases: extras.aliases || [],
    region: extras.region || ["North India", "Uttar Pradesh"],
    categories: extras.categories || ["Breakfast"],
    mainIngredients: mainIng,
    ingredients: [
      { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
      ...filling.ingredients,
      { name: "Oil or ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
      { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      { name: "Water", quantity: 0.75, unit: "cup", ingredientId: null },
    ],
    servings: 4,
    prepTime: extras.prepTime || 20,
    cookTime: extras.cookTime || 25,
    difficulty: extras.difficulty || "Easy",
    steps: [
      "Mix wheat flour with a pinch of salt and knead a soft dough with water. Cover and rest 15 minutes.",
      ...fillSteps,
      "Divide dough into equal balls. Roll one ball lightly, place stuffing in the centre, seal edges and flatten gently.",
      "Dust with flour and roll into a round paratha of even thickness. Avoid tearing.",
      "Heat a tawa on medium flame. Cook the paratha on both sides, applying ghee, until golden brown spots appear.",
      "Serve hot with curd, pickle or butter.",
    ],
    tips: extras.tips || ["Keep stuffing dry so the paratha does not break while rolling."],
    season: extras.season || ["All"],
  });
}

function sabzi(id, name, nameHi, mainIng, ingredients, steps, extras = {}) {
  return R({
    id,
    name,
    nameHi,
    aliases: extras.aliases || [],
    region: extras.region || ["North India", "Uttar Pradesh"],
    categories: extras.categories || ["Lunch", "Dinner"],
    mainIngredients: mainIng,
    ingredients: [
      ...ingredients,
      ...spiceBase(),
      { name: "Mustard oil or cooking oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
      { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
    ],
    servings: extras.servings || 4,
    prepTime: extras.prepTime || 15,
    cookTime: extras.cookTime || 25,
    difficulty: extras.difficulty || "Easy",
    steps,
    tips: extras.tips || ["Adjust water for dry or gravy style as preferred at home."],
    season: extras.season || ["All"],
  });
}

function paneerGravy(id, name, nameHi, extras = {}) {
  return R({
    id,
    name,
    nameHi,
    aliases: extras.aliases || [],
    region: extras.region || ["North India", "Punjab"],
    categories: extras.categories || ["Lunch", "Dinner"],
    mainIngredients: extras.mainIngredients || ["paneer"],
    ingredients: [
      { name: "Paneer", quantity: 250, unit: "g", ingredientId: "paneer" },
      { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
      { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
      { name: "Ginger-garlic paste", quantity: 1, unit: "tbsp", ingredientId: "ginger" },
      { name: "Cashews (optional)", quantity: 8, unit: "pieces", ingredientId: "cashew" },
      { name: "Fresh cream or milk", quantity: 2, unit: "tbsp", ingredientId: "cream" },
      { name: "Butter or oil", quantity: 2, unit: "tbsp", ingredientId: "butter" },
      { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      { name: "Kasuri methi", quantity: 1, unit: "tsp", ingredientId: "kasuri-methi" },
      ...spiceBase(),
      ...(extras.extraIngredients || []),
    ],
    servings: 4,
    prepTime: 15,
    cookTime: extras.cookTime || 30,
    difficulty: extras.difficulty || "Medium",
    steps: extras.steps,
    tips: extras.tips || ["Add paneer at the end so it stays soft."],
    season: extras.season || ["All"],
  });
}

function dalRecipe(id, name, nameHi, dalId, dalName, extras = {}) {
  return R({
    id,
    name,
    nameHi,
    aliases: extras.aliases || [],
    region: extras.region || ["North India"],
    categories: extras.categories || ["Lunch", "Dinner"],
    mainIngredients: extras.mainIngredients || [dalId],
    ingredients: [
      { name: dalName, quantity: 1, unit: "cup", ingredientId: dalId },
      { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
      { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" },
      { name: "Ginger", quantity: 1, unit: "inch", ingredientId: "ginger" },
      { name: "Garlic", quantity: 4, unit: "cloves", ingredientId: "garlic" },
      { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
      { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
      { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
      { name: "Asafoetida", quantity: 1, unit: "pinch", ingredientId: "asafoetida" },
      ...spiceBase(),
      ...(extras.extraIngredients || []),
    ],
    servings: 4,
    prepTime: extras.prepTime || 10,
    cookTime: extras.cookTime || 30,
    difficulty: "Easy",
    steps: extras.steps,
    tips: extras.tips || ["Consistency should be pourable, not too thick."],
    season: extras.season || ["All"],
  });
}

const recipes = [];

// ===== PARATHAS =====
recipes.push(
  paratha(
    "aloo-paratha",
    "Aloo Paratha",
    "आलू पराठा",
    {
      ingredients: [
        { name: "Boiled potatoes", quantity: 3, unit: "medium", ingredientId: "potato" },
        { name: "Green chilli, chopped", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Amchur", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
      ],
      steps: [
        "Mash boiled potatoes. Mix green chilli, coriander, ajwain, amchur, salt and chilli powder into a smooth stuffing.",
      ],
    },
    ["potato", "wheat-flour"],
    { aliases: ["Aalu Paratha", "Potato Paratha"], tips: ["Mash potatoes while warm and dry them on the flame briefly if watery."] }
  )
);

recipes.push(
  paratha(
    "paneer-paratha",
    "Paneer Paratha",
    "पनीर पराठा",
    {
      ingredients: [
        { name: "Grated paneer", quantity: 1.5, unit: "cups", ingredientId: "paneer" },
        { name: "Onion, finely chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      steps: ["Mix grated paneer with onion, chilli, coriander, garam masala and salt."],
    },
    ["paneer", "wheat-flour"],
    { aliases: ["Cottage Cheese Paratha"] }
  )
);

recipes.push(
  paratha(
    "gobhi-paratha",
    "Gobhi Paratha",
    "गोभी पराठा",
    {
      ingredients: [
        { name: "Grated cauliflower", quantity: 2, unit: "cups", ingredientId: "cauliflower" },
        { name: "Ginger, grated", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander powder", quantity: 1, unit: "tsp", ingredientId: "coriander-powder" },
        { name: "Amchur", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
      ],
      steps: [
        "Squeeze excess water from grated cauliflower. Mix with ginger, chilli, spices and salt. Lightly sauté 2 minutes if very moist.",
      ],
    },
    ["cauliflower", "wheat-flour"],
    { aliases: ["Gobi Paratha", "Cauliflower Paratha"], categories: ["Breakfast", "Lunch"] }
  )
);

recipes.push(
  paratha(
    "mooli-paratha",
    "Mooli Paratha",
    "मूली पराठा",
    {
      ingredients: [
        { name: "Grated radish", quantity: 2, unit: "cups", ingredientId: "radish" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
      ],
      steps: [
        "Squeeze grated radish firmly to remove water. Mix with chilli, coriander, ajwain and salt. Use the squeezed water in dough if needed.",
      ],
    },
    ["radish", "wheat-flour"],
    { aliases: ["Radish Paratha", "Muli Paratha"], season: ["Winter"] }
  )
);

recipes.push(
  paratha(
    "methi-paratha",
    "Methi Paratha",
    "मेथी पराठा",
    {
      ingredients: [
        { name: "Fresh methi leaves, chopped", quantity: 1.5, unit: "cups", ingredientId: "methi" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Turmeric", quantity: 0.25, unit: "tsp", ingredientId: "turmeric" },
        { name: "Red chilli powder", quantity: 0.5, unit: "tsp", ingredientId: "red-chilli" },
      ],
      steps: [
        "Knead chopped methi, ajwain and spices directly into the flour dough with a little water. No separate stuffing needed.",
      ],
    },
    ["methi", "wheat-flour"],
    {
      aliases: ["Fenugreek Paratha"],
      season: ["Winter"],
      stepsOverride: true,
      tips: ["If methi is bitter, soak chopped leaves in salted water 10 minutes, then squeeze."],
    }
  )
);
// Fix methi-paratha steps - kneaded style
recipes[recipes.length - 1].steps = [
  "Wash methi leaves thoroughly and chop finely. If bitter, soak in salted water 10 minutes and squeeze dry.",
  "Mix flour, chopped methi, ajwain, turmeric, chilli powder and salt. Knead a soft dough with water. Rest 15 minutes.",
  "Divide into balls and roll into medium-thick parathas.",
  "Cook on a hot tawa with ghee until both sides are golden and crisp at the edges.",
  "Serve with curd or white butter.",
];

recipes.push(
  paratha(
    "palak-paratha",
    "Palak Paratha",
    "पालक पराठा",
    {
      ingredients: [
        { name: "Spinach, blanched and pureed", quantity: 1, unit: "cup", ingredientId: "spinach" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Cumin powder", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
      ],
      steps: ["Knead flour with spinach puree, chilli and spices into a soft green dough."],
    },
    ["spinach", "wheat-flour"],
    { aliases: ["Spinach Paratha"] }
  )
);
recipes[recipes.length - 1].steps = [
  "Blanch spinach 2 minutes, cool, and grind with green chilli into a smooth puree.",
  "Knead wheat flour with spinach puree, cumin powder and salt into a soft dough. Rest 10 minutes.",
  "Roll into parathas of even thickness.",
  "Cook on tawa with ghee until light brown spots appear on both sides.",
  "Serve hot with pickle or raita.",
];

recipes.push(
  paratha(
    "sattu-paratha",
    "Sattu Paratha",
    "सत्तू पराठा",
    {
      ingredients: [
        { name: "Sattu", quantity: 1, unit: "cup", ingredientId: "sattu" },
        { name: "Mustard oil", quantity: 1, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Onion, finely chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Garlic, chopped", quantity: 3, unit: "cloves", ingredientId: "garlic" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Pickle masala or amchur", quantity: 1, unit: "tsp", ingredientId: "pickle-masala" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
      ],
      steps: [
        "Mix sattu with mustard oil, onion, garlic, chilli, pickle masala, ajwain and salt. Add a spoon of water only if too dry.",
      ],
    },
    ["sattu", "wheat-flour"],
    {
      aliases: ["Satto Paratha", "Roasted Gram Paratha"],
      region: ["Purvanchal", "Jaunpur", "Bihar", "Uttar Pradesh"],
      categories: ["Breakfast", "Purvanchal Special", "Lunch"],
      tips: ["Authentic Purvanchal stuffing uses raw mustard oil and garlic for a sharp taste."],
    }
  )
);

recipes.push(
  paratha(
    "dal-paratha",
    "Dal Paratha",
    "दाल पराठा",
    {
      ingredients: [
        { name: "Cooked chana dal (thick)", quantity: 1, unit: "cup", ingredientId: "chana-dal" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      steps: [
        "Mash cooked chana dal. Mix ginger, chilli, garam masala and salt. Cook on low flame 2–3 minutes to dry excess moisture.",
      ],
    },
    ["chana-dal", "wheat-flour"],
    { aliases: ["Lentil Paratha"] }
  )
);

recipes.push(
  paratha(
    "pyaz-paratha",
    "Pyaz Paratha",
    "प्याज पराठा",
    {
      ingredients: [
        { name: "Onion, finely chopped", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
      ],
      steps: ["Mix chopped onion with chilli, coriander, ajwain and salt just before stuffing so onions do not release water."],
    },
    ["onion", "wheat-flour"],
    { aliases: ["Onion Paratha"] }
  )
);

recipes.push(
  paratha(
    "mix-veg-paratha",
    "Mix Veg Paratha",
    "मिक्स वेज पराठा",
    {
      ingredients: [
        { name: "Boiled mixed vegetables (carrot, peas, beans, potato), mashed", quantity: 1.5, unit: "cups", ingredientId: "potato" },
        { name: "Green peas", quantity: 0.25, unit: "cup", ingredientId: "green-peas" },
        { name: "Carrot", quantity: 1, unit: "small", ingredientId: "carrot" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Amchur", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
      ],
      steps: ["Mash boiled vegetables, mix spices and salt into a firm stuffing."],
    },
    ["potato", "green-peas", "carrot", "wheat-flour"],
    { aliases: ["Vegetable Paratha"] }
  )
);

recipes.push(
  paratha(
    "gajar-paratha",
    "Gajar Paratha",
    "गाजर पराठा",
    {
      ingredients: [
        { name: "Grated carrot", quantity: 1.5, unit: "cups", ingredientId: "carrot" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander leaves", quantity: 1, unit: "tbsp", ingredientId: "coriander" },
        { name: "Cumin powder", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
      ],
      steps: ["Squeeze grated carrot lightly. Mix with chilli, coriander, cumin and salt."],
    },
    ["carrot", "wheat-flour"],
    { aliases: ["Carrot Paratha"], season: ["Winter"] }
  )
);

recipes.push(
  paratha(
    "besan-paratha",
    "Besan Paratha",
    "बेसन पराठा",
    {
      ingredients: [
        { name: "Besan", quantity: 0.75, unit: "cup", ingredientId: "besan" },
        { name: "Onion, chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Red chilli powder", quantity: 0.5, unit: "tsp", ingredientId: "red-chilli" },
      ],
      steps: [
        "Mix besan with onion, ajwain, chilli and salt. Sprinkle a few drops of water and oil to make a crumbly stuffing.",
      ],
    },
    ["besan", "wheat-flour"],
    { aliases: ["Gram Flour Paratha"] }
  )
);

recipes.push(
  R({
    id: "plain-paratha",
    name: "Plain Paratha",
    nameHi: "सादा पराठा",
    aliases: ["Sada Paratha", "Laccha Paratha simple"],
    region: ["North India"],
    categories: ["Breakfast", "Lunch", "Dinner"],
    mainIngredients: ["wheat-flour"],
    ingredients: [
      { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
      { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      { name: "Ghee or oil", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
      { name: "Water", quantity: 0.75, unit: "cup", ingredientId: null },
    ],
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    steps: [
      "Knead a soft dough with flour, salt and water. Rest 15 minutes.",
      "Divide into balls. Roll each into a circle, brush ghee, fold into a triangle or roll like a spiral for layers.",
      "Roll again gently to medium thickness.",
      "Cook on a hot tawa, applying ghee on both sides, until golden and flaky.",
      "Serve with sabzi, dal or curd.",
    ],
    tips: ["Apply ghee between layers for flaky laccha-style paratha."],
  })
);

recipes.push(
  paratha(
    "ajwain-paratha",
    "Ajwain Paratha",
    "अजवाइन पराठा",
    {
      ingredients: [
        { name: "Ajwain", quantity: 1.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Oil", quantity: 1, unit: "tbsp", ingredientId: "oil" },
      ],
      steps: ["Crush ajwain lightly between palms and knead into the dough with oil and salt."],
    },
    ["ajwain", "wheat-flour"],
    { aliases: ["Carom Seed Paratha"], tips: ["Good for digestion; serve with curd."] }
  )
);
recipes[recipes.length - 1].steps = [
  "Crush ajwain lightly and knead into flour with salt, oil and water to a soft dough. Rest 15 minutes.",
  "Roll into medium-thick discs.",
  "Cook on tawa with ghee until both sides are spotted golden.",
  "Serve hot with curd or pickle.",
  "Store leftover dough covered for same-day use.",
];

recipes.push(
  R({
    id: "thepla",
    name: "Thepla",
    nameHi: "थेपला",
    aliases: ["Methi Thepla", "Gujarati Thepla"],
    region: ["Gujarat", "Rajasthan"],
    categories: ["Breakfast", "Evening Snacks"],
    mainIngredients: ["methi", "wheat-flour", "besan"],
    ingredients: [
      { name: "Wheat flour", quantity: 1.5, unit: "cups", ingredientId: "wheat-flour" },
      { name: "Besan", quantity: 0.5, unit: "cup", ingredientId: "besan" },
      { name: "Fresh methi, chopped", quantity: 1, unit: "cup", ingredientId: "methi" },
      { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
      { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
      { name: "Red chilli powder", quantity: 1, unit: "tsp", ingredientId: "red-chilli" },
      { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
      { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
      { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
    ],
    prepTime: 20,
    cookTime: 25,
    steps: [
      "Mix flour, besan, methi, curd, spices, salt and oil. Knead a soft dough; add a spoon of water only if needed.",
      "Rest 10 minutes. Divide into balls and roll thin theplas.",
      "Cook on a tawa on medium flame with little oil until both sides are golden.",
      "Cool completely if packing for travel; they stay soft for a day.",
      "Serve with curd, pickle or chai.",
    ],
    tips: ["Curd keeps theplas soft for longer journeys."],
    season: ["Winter", "All"],
  })
);

console.log("Parathas done:", recipes.length);

// Continue in part 2 - write remaining recipes to same array via require of parts
module.exports = { recipes, INGREDIENTS, CATEGORIES, OUT, R, sabzi, paneerGravy, dalRecipe, spiceBase, paratha };
