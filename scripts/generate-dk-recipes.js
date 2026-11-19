/**
 * Generates data/dk-recipes.json — Diabetes & Kidney Care module only.
 * Nutrition fields are null / unavailable unless explicitly noted.
 * Run: node scripts/generate-dk-recipes.js
 */
const fs = require("fs");
const path = require("path");

function nutUnavailable() {
  return {
    calories: null,
    carbs_g: null,
    protein_g: null,
    sodium_mg: null,
    potassium_mg: null,
    phosphorus_mg: null,
    status: "unavailable",
    label: "Nutrition estimate unavailable",
  };
}

function R(def) {
  return {
    module: "diabetes-kidney-care",
    aliases: [],
    diet: "Vegetarian",
    difficulty: "Easy",
    servings: 2,
    prepTime: 15,
    cookTime: 20,
    noAddedSugar: true,
    noPackagedDefaults: true,
    substitutions: [],
    portionGuidance: "Serve the stated portion only. Do not double roti/rice without clinician advice.",
    dietaryNotes: "No added sugar. Keep salt low. Confirm protein/potassium/phosphorus fit with current kidney advice.",
    suitabilityDefault: "requires-renal-dietitian-review",
    nutrition: nutUnavailable(),
    medicalDisclaimer: true,
    ...def,
    flags: {
      lowAddedSugar: true,
      controlledCarbs: true,
      lowSodium: true,
      proteinConscious: true,
      potassiumConscious: !!def.flags?.potassiumConscious,
      phosphorusConscious: !!def.flags?.phosphorusConscious,
      ...(def.flags || {}),
    },
  };
}

const recipes = [];

// ===== A. BREAKFAST =====
recipes.push(
  R({
    id: "dk-veg-besan-chilla",
    name: "Vegetable Besan Chilla (DK)",
    nameHi: "सब्ज़ी बेसन चीला (शुगर-किडनी)",
    dkCategories: ["Diabetes-Friendly Breakfast", "Healthy Snacks"],
    mealSlots: ["Breakfast", "Evening snack"],
    mainIngredients: ["besan", "onion", "tomato"],
    ingredients: [
      { name: "Besan", quantity: 4, unit: "tbsp", ingredientId: "besan" },
      { name: "Onion, finely chopped", quantity: 2, unit: "tbsp", ingredientId: "onion" },
      { name: "Tomato, finely chopped", quantity: 2, unit: "tbsp", ingredientId: "tomato" },
      { name: "Coriander leaves", quantity: 1, unit: "tbsp", ingredientId: "coriander" },
      { name: "Ajwain", quantity: 1, unit: "pinch", ingredientId: "ajwain" },
      { name: "Turmeric", quantity: 1, unit: "pinch", ingredientId: "turmeric" },
      { name: "Oil (for greasing)", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Salt", quantity: 1, unit: "small pinch", ingredientId: "salt" },
      { name: "Water", quantity: 5, unit: "tbsp", ingredientId: null },
    ],
    servings: 1,
    prepTime: 10,
    cookTime: 10,
    steps: [
      "Mix besan with water to a smooth pourable batter.",
      "Add vegetables, ajwain, turmeric and a very small pinch of salt.",
      "Cook one thin chilla on a non-stick/lightly greased tawa.",
      "Do not add sugar, sauce or pickle.",
      "Eat as one breakfast portion with cucumber slices if advised.",
    ],
    stepsHi: [
      "बेसन और पानी मिलाकर चिकना बैटर बनाएं।",
      "सब्ज़ी, अजवाइन, हल्दी और बहुत कम नमक मिलाएं।",
      "हल्के तेल वाले तवे पर एक पतला चीला पकाएं।",
      "चीनी, सॉस या अचार न लें।",
      "नाश्ते का एक पोर्शन — चाहें तो खीरा साथ में।",
    ],
    substitutions: ["If besan portion feels heavy on protein advice, make half chilla and add more salad vegetables."],
    portionGuidance: "1 medium chilla per meal unless dietitian sets otherwise.",
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { potassiumConscious: true, phosphorusConscious: true, proteinConscious: true, controlledCarbs: true, lowSodium: true },
  })
);

recipes.push(
  R({
    id: "dk-moong-cheela-portion",
    name: "Portion-Controlled Moong Dal Cheela (DK)",
    nameHi: "मापी हुई मूंग दाल चीला",
    dkCategories: ["Diabetes-Friendly Breakfast", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Breakfast", "Dinner"],
    mainIngredients: ["moong-dal"],
    ingredients: [
      { name: "Moong dal (soaked), measured dry before soak", quantity: 3, unit: "tbsp", ingredientId: "moong-dal" },
      { name: "Ginger", quantity: 0.5, unit: "tsp", ingredientId: "ginger" },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Oil", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Salt", quantity: 1, unit: "small pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Use only the measured dal — do not increase 'for softness'.",
      "Grind with ginger and little water; keep batter thickish.",
      "Cook 1 cheela with minimal oil.",
      "Protein is present — follow clinician protein limit; do not add paneer topping.",
      "Pair with cucumber, not with sweet chutney.",
    ],
    stepsHi: [
      "सिर्फ मापी हुई दाल लें — मात्रा न बढ़ाएं।",
      "अदरक और थोड़े पानी से पीसकर गाढ़ा बैटर बनाएं।",
      "बहुत कम तेल में एक चीला पकाएं।",
      "पनीर टॉपिंग न डालें — प्रोटीन डॉक्टर/डाइटिशियन की सलाह से।",
      "खीरे के साथ खाएं, मीठी चटनी नहीं।",
    ],
    portionGuidance: "1 cheela from 3 tbsp dry moong. Do not make a second by default.",
    suitabilityDefault: "requires-renal-dietitian-review",
    dietaryNotes: "Legume protein + potassium/phosphorus may need individual clearance in advanced CKD.",
    flags: { proteinConscious: true, phosphorusConscious: true, potassiumConscious: true, controlledCarbs: true, lowSodium: true },
  })
);

recipes.push(
  R({
    id: "dk-veg-oats-controlled",
    name: "Vegetable Oats (Controlled Portion, DK)",
    nameHi: "सब्ज़ी ओट्स (नियंत्रित पोर्शन)",
    dkCategories: ["Diabetes-Friendly Breakfast"],
    mealSlots: ["Breakfast"],
    mainIngredients: ["carrot"],
    ingredients: [
      { name: "Rolled oats", quantity: 3, unit: "tbsp", ingredientId: null },
      { name: "Bottle gourd or cabbage, finely chopped", quantity: 0.5, unit: "cup", ingredientId: "lauki" },
      { name: "Onion", quantity: 1, unit: "tbsp", ingredientId: "onion" },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Oil", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Water", quantity: 0.75, unit: "cup", ingredientId: null },
      { name: "Salt", quantity: 1, unit: "small pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Temper cumin in 1/2 tsp oil; sauté onion and vegetables briefly.",
      "Add measured oats and water; cook until soft.",
      "Do not add sugar, honey, dried fruit or nuts by default.",
      "Eat as one bowl breakfast only.",
      "If phosphorus advice is strict, confirm oats with dietitian before regular use.",
    ],
    stepsHi: [
      "आधा छोटा चम्मच तेल में जीरा, प्याज और सब्ज़ी हल्के भूनें।",
      "मापी हुई ओट्स और पानी डालकर नरम पकाएं।",
      "चीनी, शहद, मेवे या किशमिश न डालें।",
      "एक कटोरी नाश्ता — दोबारा न बढ़ाएं।",
      "किडनी फॉस्फोरस सख्त हो तो डाइटिशियन से ओट्स पूछ लें।",
    ],
    substitutions: ["If oats not cleared, use vegetable daliya in the same measured spoon portion."],
    suitabilityDefault: "requires-ingredient-substitution",
    dietaryNotes: "Oats can be useful for diabetes but may need renal clearance for phosphorus.",
    flags: { controlledCarbs: true, lowSodium: true, potassiumConscious: true, phosphorusConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-veg-daliya-controlled",
    name: "Vegetable Daliya (Controlled Portion, DK)",
    nameHi: "सब्ज़ी दलिया (नियंत्रित)",
    dkCategories: ["Diabetes-Friendly Breakfast", "Diabetes-Friendly Dinner"],
    mealSlots: ["Breakfast", "Dinner"],
    mainIngredients: ["daliya", "lauki"],
    ingredients: [
      { name: "Daliya (broken wheat)", quantity: 3, unit: "tbsp", ingredientId: "daliya" },
      { name: "Lauki, finely chopped", quantity: 0.5, unit: "cup", ingredientId: "lauki" },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Oil/ghee", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Water", quantity: 1, unit: "cup", ingredientId: null },
      { name: "Salt", quantity: 1, unit: "small pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Roast measured daliya lightly.",
      "Cook with lauki, cumin, tiny oil and water until soft.",
      "Keep salt minimal; no pickle on the side.",
      "One measured bowl only — carbohydrate portion control.",
      "Do not add sugar or jaggery.",
    ],
    stepsHi: [
      "मापी हुई दलिया हल्की भूनें।",
      "लौकी, जीरा, बहुत कम तेल और पानी के साथ नरम पकाएं।",
      "नमक कम; अचार साथ में न दें।",
      "एक मापा हुआ कटोरा ही लें।",
      "चीनी या गुड़ न डालें।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { controlledCarbs: true, lowSodium: true, potassiumConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-low-salt-veg-poha",
    name: "Low-Salt Vegetable Poha (DK)",
    nameHi: "कम नमक सब्ज़ी पोहा",
    dkCategories: ["Diabetes-Friendly Breakfast"],
    mealSlots: ["Breakfast"],
    mainIngredients: ["poha", "cabbage"],
    ingredients: [
      { name: "Thick poha (measured after fluffing)", quantity: 0.5, unit: "cup", ingredientId: "poha" },
      { name: "Cabbage, finely chopped", quantity: 0.33, unit: "cup", ingredientId: "cabbage" },
      { name: "Capsicum or beans, chopped", quantity: 2, unit: "tbsp", ingredientId: "capsicum" },
      { name: "Mustard seeds", quantity: 1, unit: "pinch", ingredientId: "mustard-seeds" },
      { name: "Curry leaves", quantity: 3, unit: "leaves", ingredientId: "curry-leaves" },
      { name: "Oil", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Lemon", quantity: 0.5, unit: "tsp", ingredientId: "lemon" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
      { name: "Turmeric", quantity: 1, unit: "pinch", ingredientId: "turmeric" },
    ],
    servings: 1,
    steps: [
      "Rinse and drain measured poha; keep fluffy, not soggy.",
      "Temper mustard and curry leaves in 1/2 tsp oil; add vegetables.",
      "Add poha, turmeric, tiny salt; mix gently.",
      "Finish with few drops lemon — no sugar, no sev, no peanuts by default.",
      "Eat one portion only.",
    ],
    stepsHi: [
      "मापा हुआ पोहा धोकर सुखा-फुला रखें।",
      "आधा छोटा चम्मच तेल में राई-करी पत्ता, फिर सब्ज़ी।",
      "पोहा, हल्दी, बहुत कम नमक मिलाएं।",
      "थोड़ा नींबू — चीनी, सेव, मूंगफली डिफ़ॉल्ट में नहीं।",
      "एक पोर्शन ही खाएं।",
    ],
    substitutions: ["Skip peanuts/sev always in this DK version.", "If potassium advice is strict, prefer cabbage over tomato."],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { controlledCarbs: true, lowSodium: true, potassiumConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-small-veg-upma",
    name: "Small Portion Vegetable Upma (DK)",
    nameHi: "छोटा पोर्शन सब्ज़ी उपमा",
    dkCategories: ["Diabetes-Friendly Breakfast"],
    mealSlots: ["Breakfast"],
    mainIngredients: ["suji"],
    ingredients: [
      { name: "Suji (rava)", quantity: 3, unit: "tbsp", ingredientId: "suji" },
      { name: "Mixed vegetables (lauki/cabbage/beans)", quantity: 0.5, unit: "cup", ingredientId: "lauki" },
      { name: "Mustard seeds", quantity: 1, unit: "pinch", ingredientId: "mustard-seeds" },
      { name: "Oil", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Water", quantity: 0.75, unit: "cup", ingredientId: null },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Dry roast measured suji; keep aside.",
      "Temper and cook vegetables; add water and tiny salt.",
      "Add suji; cook until just done — do not add sugar.",
      "One small bowl only.",
      "No coconut garnish unless cleared.",
    ],
    stepsHi: [
      "मापी सूजी भूनकर रखें।",
      "सब्ज़ी पकाएं, पानी और बहुत कम नमक डालें।",
      "सूजी मिलाकर सिर्फ पकने तक पकाएं — चीनी नहीं।",
      "एक छोटी कटोरी।",
      "नारियल गार्निश डॉक्टर सलाह के बिना न डालें।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { controlledCarbs: true, lowSodium: true },
  })
);

recipes.push(
  R({
    id: "dk-stuffed-veg-roti",
    name: "Suitable Stuffed Vegetable Roti (DK)",
    nameHi: "भरवा सब्ज़ी रोटी (नियंत्रित)",
    dkCategories: ["Diabetes-Friendly Breakfast", "Diabetes-Friendly Lunch"],
    mealSlots: ["Breakfast", "Lunch"],
    mainIngredients: ["wheat-flour", "cabbage", "lauki"],
    ingredients: [
      { name: "Wheat flour", quantity: 3, unit: "tbsp", ingredientId: "wheat-flour" },
      { name: "Grated lauki or cabbage (squeezed)", quantity: 3, unit: "tbsp", ingredientId: "lauki" },
      { name: "Cumin powder", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Oil/ghee for cooking", quantity: 0.5, unit: "tsp", ingredientId: "ghee" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Knead flour with tiny salt and water for 1 roti dough.",
      "Mix squeezed grated veg with cumin for light stuffing or knead veg into dough.",
      "Cook 1 roti with 1/2 tsp fat total.",
      "Do not serve with pickle or papad.",
      "One roti = one carb portion for that meal unless advised otherwise.",
    ],
    stepsHi: [
      "3 बड़े चम्मच आटे से एक रोटी का आटा गूंदें।",
      "निचोड़ी सब्ज़ी हल्के मसाले के साथ भरें या आटे में मिलाएं।",
      "आधा छोटा चम्मच घी/तेल में एक रोटी पकाएं।",
      "अचार-पापड़ न दें।",
      "एक रोटी = उस भोजन का कार्ब पोर्शन।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { controlledCarbs: true, lowSodium: true, potassiumConscious: true },
  })
);

// ===== B. LUNCH =====
const lunchSabzis = [
  ["dk-lauki-tamatar-light", "Light Lauki Tamatar", "हल्की लौकी टमाटर", "lauki", "Lauki and tomato cooked with minimal oil and salt.", true],
  ["dk-tinda-sabzi", "Tinda Sabzi (DK)", "टिंडा सब्ज़ी", "tinda", "Peel and cook tinda with cumin, tiny salt, minimal oil.", true],
  ["dk-bhindi-dry", "Dry Bhindi (Low Salt DK)", "सूखी भिंडी (कम नमक)", "bhindi", "Dry-cook bhindi well to reduce stickiness; keep salt very low.", false],
  ["dk-cabbage-sabzi", "Cabbage Sabzi (DK)", "पत्ता गोभी सब्ज़ी", "cabbage", "Cook cabbage open-pan so water dries; low salt.", true],
];

lunchSabzis.forEach(([id, name, nameHi, main, tip, kCare]) => {
  recipes.push(
    R({
      id,
      name,
      nameHi,
      dkCategories: ["Diabetes-Friendly Lunch", "Diabetes-Friendly Dinner", "Special Kidney-Conscious Recipes"],
      mealSlots: ["Lunch", "Dinner"],
      mainIngredients: [main],
      ingredients: [
        { name: name.split("(")[0].trim() + " vegetable", quantity: 1.5, unit: "cups", ingredientId: main },
        { name: "Onion (optional, small)", quantity: 1, unit: "tbsp", ingredientId: "onion" },
        { name: "Tomato (optional, small)", quantity: 1, unit: "tbsp", ingredientId: "tomato" },
        { name: "Cumin", quantity: 0.25, unit: "tsp", ingredientId: "cumin" },
        { name: "Turmeric", quantity: 1, unit: "pinch", ingredientId: "turmeric" },
        { name: "Oil", quantity: 1, unit: "tsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
      ],
      servings: 2,
      cookTime: 20,
      steps: [
        tip,
        "Temper cumin in 1 tsp oil; add optional onion/tomato sparingly.",
        "Add vegetable, turmeric and tiny salt; cover-cook until just done.",
        "No cream, no cashew, no packaged masala mixes.",
        "Serve with 1 thin roti (measured) if that meal includes carbs.",
      ],
      stepsHi: [
        tip,
        "1 छोटा चम्मच तेल में जीरा तड़कें; प्याज/टमाटर बहुत कम।",
        "सब्ज़ी, हल्दी, बहुत कम नमक डालकर सिर्फ पकने तक पकाएं।",
        "मलाई, काजू या पैकेट मसाला न डालें।",
        "अगर कार्ब लेना है तो 1 पतली रोटी के साथ।",
      ],
      portionGuidance: "About 3/4–1 cup cooked sabzi per person. Do not add papad/pickle.",
      suitabilityDefault: "suitable-with-portion-adjustment",
      flags: { lowSodium: true, controlledCarbs: true, potassiumConscious: kCare, phosphorusConscious: true, proteinConscious: true },
    })
  );
});

recipes.push(
  R({
    id: "dk-moong-dal-thin",
    name: "Thin Moong Dal (Protein-Conscious DK)",
    nameHi: "पतली मूंग दाल (प्रोटीन-सावधान)",
    dkCategories: ["Diabetes-Friendly Lunch", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["moong-dal"],
    ingredients: [
      { name: "Moong dal (dry measure)", quantity: 2, unit: "tbsp", ingredientId: "moong-dal" },
      { name: "Turmeric", quantity: 1, unit: "pinch", ingredientId: "turmeric" },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Ginger", quantity: 0.5, unit: "tsp", ingredientId: "ginger" },
      { name: "Ghee/oil", quantity: 0.5, unit: "tsp", ingredientId: "ghee" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
      { name: "Water", quantity: 1.5, unit: "cups", ingredientId: null },
    ],
    servings: 2,
    steps: [
      "Cook only the measured dal until soft; keep it thin/soupy.",
      "Temper with 1/2 tsp ghee, cumin and ginger — low salt.",
      "Do not combine with paneer, extra dal tadka oil, or fried toppings.",
      "Share between 2 as a small dal portion with sabzi + 1 roti if planned.",
      "Protein amount must match current renal advice — review before daily use.",
    ],
    stepsHi: [
      "सिर्फ मापी दाल उबालें — पतली/सूप जैसी रखें।",
      "आधा छोटा चम्मच घी में जीरा-अदरक तड़का; नमक बहुत कम।",
      "पनीर या भारी तड़का न जोड़ें।",
      "2 लोगों में बाँटें; रोटी/सब्ज़ी प्लान के अनुसार।",
      "रोज़ इस्तेमाल से पहले किडनी डाइट सलाह ज़रूरी।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    dietaryNotes: "CKD often needs controlled protein — this recipe is portioned small on purpose.",
    flags: { proteinConscious: true, phosphorusConscious: true, potassiumConscious: true, lowSodium: true, controlledCarbs: true },
  })
);

recipes.push(
  R({
    id: "dk-roti-sabzi-plate",
    name: "Roti + Sabzi Balanced Plate (DK)",
    nameHi: "रोटी-सब्ज़ी बैलेंस्ड प्लेट",
    dkCategories: ["Diabetes-Friendly Lunch", "Diabetes-Friendly Dinner"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["wheat-flour", "lauki"],
    ingredients: [
      { name: "Thin phulka", quantity: 1, unit: "piece", ingredientId: "wheat-flour" },
      { name: "DK lauki/cabbage/bhindi sabzi", quantity: 1, unit: "cup", ingredientId: "lauki" },
      { name: "Cucumber salad", quantity: 0.5, unit: "cup", ingredientId: null },
      { name: "Thin moong dal (optional, if protein allowed)", quantity: 0.33, unit: "cup", ingredientId: "moong-dal" },
    ],
    servings: 1,
    prepTime: 20,
    cookTime: 25,
    steps: [
      "Build the plate: 1 thin roti + 1 cup low-salt sabzi + salad.",
      "Add dal only if the treating team allows that protein portion.",
      "No rice on the same plate by default.",
      "No pickle, papad, fried snack or sweet.",
      "This is a meal pattern, not a fixed medical prescription.",
    ],
    stepsHi: [
      "प्लेट: 1 पतली रोटी + 1 कटोरी कम-नमक सब्ज़ी + सलाद।",
      "दाल तभी जब प्रोटीन की अनुमति हो।",
      "डिफ़ॉल्ट में उसी प्लेट पर चावल न रखें।",
      "अचार, पापड़, तलना या मीठा नहीं।",
      "यह भोजन का ढांचा है — डॉक्टर की डाइट जगह नहीं लेता।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { controlledCarbs: true, lowSodium: true, proteinConscious: true, potassiumConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-seasonal-mix-veg-light",
    name: "Seasonal Mix Veg Light (DK)",
    nameHi: "हल्की मौसमी मिक्स सब्ज़ी",
    dkCategories: ["Diabetes-Friendly Lunch", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["lauki", "beans", "cabbage"],
    ingredients: [
      { name: "Lauki", quantity: 0.75, unit: "cup", ingredientId: "lauki" },
      { name: "Beans", quantity: 0.5, unit: "cup", ingredientId: "beans" },
      { name: "Cabbage", quantity: 0.5, unit: "cup", ingredientId: "cabbage" },
      { name: "Oil", quantity: 1, unit: "tsp", ingredientId: "oil" },
      { name: "Cumin", quantity: 0.25, unit: "tsp", ingredientId: "cumin" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
    ],
    servings: 2,
    steps: [
      "Prefer lower-potassium seasonal mix when advised (lauki, cabbage, beans over tomato-heavy mixes).",
      "Cook with 1 tsp oil and tiny salt.",
      "Do not add potato by default (carb load).",
      "Serve measured portion with 1 roti if needed.",
      "Avoid spinach/tomato overload unless cleared for potassium.",
    ],
    stepsHi: [
      "किडनी सलाह के हिसाब से लौकी/पत्ता गोभी/बीन्स जैसे विकल्प चुनें।",
      "1 छोटा चम्मच तेल और बहुत कम नमक।",
      "डिफ़ॉल्ट में आलू न डालें।",
      "मापी मात्रा में 1 रोटी के साथ यदि ज़रूरत हो।",
      "पालक/टमाटर ज्यादा न करें जब तक पोटैशियम Cleared न हो।",
    ],
    suitabilityDefault: "requires-ingredient-substitution",
    flags: { potassiumConscious: true, lowSodium: true, controlledCarbs: true, phosphorusConscious: true },
  })
);

// ===== C. DINNER =====
recipes.push(
  R({
    id: "dk-light-khichdi-controlled",
    name: "Controlled-Portion Soft Khichdi (DK)",
    nameHi: "नियंत्रित पोर्शन खिचड़ी",
    dkCategories: ["Diabetes-Friendly Dinner", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Dinner"],
    mainIngredients: ["rice", "moong-dal"],
    ingredients: [
      { name: "Rice", quantity: 2, unit: "tbsp", ingredientId: "rice" },
      { name: "Moong dal", quantity: 1, unit: "tbsp", ingredientId: "moong-dal" },
      { name: "Lauki, chopped", quantity: 0.5, unit: "cup", ingredientId: "lauki" },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Ghee", quantity: 0.5, unit: "tsp", ingredientId: "ghee" },
      { name: "Water", quantity: 1.25, unit: "cups", ingredientId: null },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
    ],
    servings: 1,
    steps: [
      "Use only measured rice + dal — this is a small dinner portion.",
      "Cook soft with lauki; temper 1/2 tsp ghee and cumin.",
      "Do not add papad, pickle, or fried toppings.",
      "If protein must be lower, reduce/omit dal after clinician advice.",
      "One bowl dinner; no sweet after.",
    ],
    stepsHi: [
      "सिर्फ मापा चावल + दाल — छोटी डिनर पोर्शन।",
      "लौकी के साथ नरम पकाएं; आधा छोटा चम्मच घी-जीरा।",
      "पापड़-अचार-तलना नहीं।",
      "प्रोटीन कम रखना हो तो डाइटिशियन सलाह से दाल घटाएं।",
      "एक कटोरी; बाद में मीठा नहीं।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { controlledCarbs: true, proteinConscious: true, lowSodium: true, phosphorusConscious: true, potassiumConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-lauki-soup-meal",
    name: "Lauki Soup with Light Meal (DK)",
    nameHi: "लौकी सूप के साथ हल्का खाना",
    dkCategories: ["Diabetes-Friendly Dinner"],
    mealSlots: ["Dinner"],
    mainIngredients: ["lauki"],
    ingredients: [
      { name: "Lauki", quantity: 2, unit: "cups", ingredientId: "lauki" },
      { name: "Ginger", quantity: 0.5, unit: "tsp", ingredientId: "ginger" },
      { name: "Black pepper", quantity: 1, unit: "pinch", ingredientId: null },
      { name: "Cumin", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
      { name: "Water", quantity: 2, unit: "cups", ingredientId: null },
      { name: "Thin roti (optional carb)", quantity: 1, unit: "piece", ingredientId: "wheat-flour" },
    ],
    servings: 1,
    steps: [
      "Boil lauki with ginger/cumin; blend smooth; no cream/cornflour.",
      "Season with tiny salt and pepper.",
      "If fluid is restricted, count the soup volume into daily fluid allowance.",
      "Optional: 1 thin roti — not both rice and roti.",
      "Not a treatment for creatinine/eGFR — only a light meal idea.",
    ],
    stepsHi: [
      "लौकी अदरक-जीरे के साथ उबालकर पीसें — मलाई/कॉर्नफ्लोर नहीं।",
      "बहुत कम नमक और काली मिर्च।",
      "अगर पानी की मात्रा सीमित है तो सूप को फ़्लूइड गिनती में रखें।",
      "चाहें तो 1 पतली रोटी — रोटी और चावल दोनों नहीं।",
      "यह इलाज नहीं, सिर्फ हल्के खाने का विकल्प है।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    dietaryNotes: "Fluid restriction is individual — configure with clinician guidance.",
    flags: { lowSodium: true, potassiumConscious: true, controlledCarbs: true, proteinConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-dinner-cheela-light",
    name: "Light Dinner Besan Cheela (DK)",
    nameHi: "हल्की रात की बेसन चीला",
    dkCategories: ["Diabetes-Friendly Dinner", "Healthy Snacks"],
    mealSlots: ["Dinner", "Evening snack"],
    mainIngredients: ["besan", "cabbage"],
    ingredients: [
      { name: "Besan", quantity: 3, unit: "tbsp", ingredientId: "besan" },
      { name: "Grated cabbage", quantity: 3, unit: "tbsp", ingredientId: "cabbage" },
      { name: "Oil", quantity: 0.5, unit: "tsp", ingredientId: "oil" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
      { name: "Water", quantity: 4, unit: "tbsp", ingredientId: null },
    ],
    servings: 1,
    steps: [
      "Make one small cheela with measured besan and cabbage.",
      "Keep oil minimal; no chutney with salt/sugar.",
      "Protein/phosphorus from besan — use only if suitable under current advice.",
      "Add cucumber on the side for volume without extra carbs.",
      "Do not stack with roti/rice in the same meal by default.",
    ],
    stepsHi: [
      "मापे बेसन और पत्ता गोभी से एक छोटा चीला।",
      "तेल कम; नमकीन/मीठी चटनी नहीं।",
      "बेसन का प्रोटीन/फॉस्फोरस — मौजूदा सलाह से ही।",
      "खीरा साथ में रख सकते हैं।",
      "डिफ़ॉल्ट में उसी खाने में रोटी/चावल न जोड़ें।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { controlledCarbs: true, proteinConscious: true, phosphorusConscious: true, lowSodium: true, potassiumConscious: true },
  })
);

// ===== D. SNACKS =====
recipes.push(
  R({
    id: "dk-cucumber-snack",
    name: "Cucumber Snack Plate (DK)",
    nameHi: "खीरा स्नैक प्लेट",
    dkCategories: ["Healthy Snacks", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Mid-morning snack", "Evening snack"],
    mainIngredients: ["tomato"],
    ingredients: [
      { name: "Cucumber", quantity: 1, unit: "medium", ingredientId: null },
      { name: "Lemon", quantity: 0.5, unit: "tsp", ingredientId: "lemon" },
      { name: "Roasted cumin powder", quantity: 1, unit: "pinch", ingredientId: "cumin" },
      { name: "Black salt / salt", quantity: 0, unit: "prefer none or tiny pinch", ingredientId: "salt" },
    ],
    servings: 1,
    cookTime: 0,
    prepTime: 5,
    steps: [
      "Slice cucumber; add lemon and pinch cumin.",
      "Prefer no salt, or absolute minimum if taste needs it.",
      "Do not add chaat masala packets (high sodium).",
      "Controlled vegetable snack — not unlimited quantities.",
      "If potassium is high on labs, confirm cucumber portion with dietitian.",
    ],
    stepsHi: [
      "खीरा काटें; नींबू और चुटकी जीरा।",
      "नमक जितना हो सके कम/बिना।",
      "चाट मसाला पैकेट न डालें।",
      "मापी सब्ज़ी स्नैक — अनलिमिटेड नहीं।",
      "पोटैशियम रिपोर्ट ऊँची हो तो मात्रा पूछ लें।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { lowAddedSugar: true, lowSodium: true, potassiumConscious: true, controlledCarbs: true, proteinConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-roasted-chana-controlled",
    name: "Roasted Chana (Strict Portion DK)",
    nameHi: "भुना चना (सख्त पोर्शन)",
    dkCategories: ["Healthy Snacks"],
    mealSlots: ["Mid-morning snack", "Evening snack"],
    mainIngredients: ["chickpea"],
    ingredients: [
      { name: "Unsalted roasted chana", quantity: 1, unit: "tbsp", ingredientId: "chickpea" },
    ],
    servings: 1,
    cookTime: 0,
    prepTime: 1,
    steps: [
      "Measure 1 tablespoon only — do not eat from the jar.",
      "Must be unsalted; no spicy packaged chana.",
      "Protein and potassium/phosphorus relevant — often needs review in CKD.",
      "Skip entirely if clinician advised low protein snack.",
      "No tea biscuits or sugary drink with it.",
    ],
    stepsHi: [
      "सिर्फ 1 बड़ा चम्मच नापकर खाएं।",
      "बिना नमक; पैकेट मसालेदार चना नहीं।",
      "किडनी में अक्सर रिव्यू ज़रूरी।",
      "लो-प्रोटीन सलाह हो तो छोड़ दें।",
      "साथ में बिस्किट/मीठा ड्रिंक नहीं।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { lowAddedSugar: true, proteinConscious: true, phosphorusConscious: true, potassiumConscious: true, lowSodium: true },
  })
);

recipes.push(
  R({
    id: "dk-homemade-veg-snack",
    name: "Homemade Steamed Vegetable Snack (DK)",
    nameHi: "घर की स्टीम्ड सब्ज़ी स्नैक",
    dkCategories: ["Healthy Snacks"],
    mealSlots: ["Mid-morning snack", "Evening snack"],
    mainIngredients: ["cabbage", "carrot"],
    ingredients: [
      { name: "Cabbage strips", quantity: 0.5, unit: "cup", ingredientId: "cabbage" },
      { name: "Carrot sticks (small portion)", quantity: 0.25, unit: "cup", ingredientId: "carrot" },
      { name: "Lemon", quantity: 0.5, unit: "tsp", ingredientId: "lemon" },
      { name: "Black pepper", quantity: 1, unit: "pinch", ingredientId: null },
    ],
    servings: 1,
    cookTime: 8,
    steps: [
      "Steam vegetables lightly; keep crunch.",
      "Season with lemon and pepper — little or no salt.",
      "Carrot portion kept small for carbohydrate awareness.",
      "No fried coating, no mayonnaise, no ketchup.",
      "One cup-level snack, not unlimited grazing.",
    ],
    stepsHi: [
      "सब्ज़ी हल्की स्टीम करें।",
      "नींबू-काली मिर्च; नमक बहुत कम/नहीं।",
      "गाजर की मात्रा छोटी रखें।",
      "तलना, मेयो, केचप नहीं।",
      "एक कप जितना स्नैक — बार-बार नहीं।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { lowAddedSugar: true, lowSodium: true, controlledCarbs: true, potassiumConscious: true },
  })
);

// ===== E. SPECIAL KIDNEY-CONSCIOUS COMBOS =====
recipes.push(
  R({
    id: "dk-low-sodium-plate",
    name: "Low-Sodium Day Plate Pattern (DK)",
    nameHi: "कम सोडियम दिन की प्लेट",
    dkCategories: ["Special Kidney-Conscious Recipes", "Diabetes-Friendly Lunch"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["lauki", "wheat-flour"],
    ingredients: [
      { name: "Low-salt lauki or cabbage sabzi", quantity: 1, unit: "cup", ingredientId: "lauki" },
      { name: "Thin roti", quantity: 1, unit: "piece", ingredientId: "wheat-flour" },
      { name: "Cucumber", quantity: 0.5, unit: "cup", ingredientId: null },
      { name: "Lemon", quantity: 1, unit: "tsp", ingredientId: "lemon" },
    ],
    servings: 1,
    steps: [
      "Cook without packaged spices, soup cubes, pickle, papad or bakery bread.",
      "Use lemon/herbs/ginger for flavour instead of extra salt.",
      "Do not use potassium-based salt substitutes.",
      "Keep the plate simple and measured.",
      "Adjust further only with current sodium and fluid advice.",
    ],
    stepsHi: [
      "पैकेट मसाला, सूप क्यूब, अचार, पापड़, बेकरी ब्रेड न डालें।",
      "स्वाद के लिए नींबू/अदरक/हरा धनिया — अतिरिक्त नमक नहीं।",
      "पोटैशियम वाला नमक विकल्प (salt substitute) न डालें।",
      "प्लेट सादी और मापी रखें।",
      "सोडियम/पानी की मौजूदा सलाह से और एडजस्ट करें।",
    ],
    suitabilityDefault: "suitable-with-portion-adjustment",
    flags: { lowSodium: true, potassiumConscious: true, controlledCarbs: true, proteinConscious: true, phosphorusConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-potassium-conscious-sabzi",
    name: "Potassium-Conscious Sabzi Bowl (DK)",
    nameHi: "पोटैशियम-सावधान सब्ज़ी बाउल",
    dkCategories: ["Special Kidney-Conscious Recipes", "Diabetes-Friendly Dinner"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["cabbage", "lauki", "beans"],
    ingredients: [
      { name: "Cabbage", quantity: 0.75, unit: "cup", ingredientId: "cabbage" },
      { name: "Lauki", quantity: 0.75, unit: "cup", ingredientId: "lauki" },
      { name: "Beans", quantity: 0.5, unit: "cup", ingredientId: "beans" },
      { name: "Oil", quantity: 1, unit: "tsp", ingredientId: "oil" },
      { name: "Cumin", quantity: 0.25, unit: "tsp", ingredientId: "cumin" },
      { name: "Salt", quantity: 1, unit: "tiny pinch", ingredientId: "salt" },
    ],
    servings: 2,
    steps: [
      "Prefer cabbage/lauki/beans style mixes when potassium needs caution.",
      "Avoid default large portions of tomato, spinach, or fried potato.",
      "If leaching vegetables was advised by the renal dietitian, follow their method — do not invent one here.",
      "Cook low salt; serve measured bowl.",
      "Status depends on latest potassium lab + clinician plan.",
    ],
    stepsHi: [
      "पोटैशियम सावधानी हो तो पत्ता गोभी/लौकी/बीन्स जैसे विकल्प।",
      "बड़े पोर्शन टमाटर, पालक, तला आलू डिफ़ॉल्ट न रखें।",
      "सब्ज़ी भिगोने/उबाल-पानी फेंकने का तरीका डाइटिशियन बताए तो वही अपनाएं।",
      "कम नमक; मापा कटोरा।",
      "नवीनतम पोटैशियम रिपोर्ट और डॉक्टर प्लान पर निर्भर।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { potassiumConscious: true, lowSodium: true, controlledCarbs: true, phosphorusConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-phosphorus-conscious-meal",
    name: "Phosphorus-Conscious Simple Meal (DK)",
    nameHi: "फॉस्फोरस-सावधान सरल खाना",
    dkCategories: ["Special Kidney-Conscious Recipes"],
    mealSlots: ["Lunch", "Dinner"],
    mainIngredients: ["wheat-flour", "lauki"],
    ingredients: [
      { name: "Thin roti", quantity: 1, unit: "piece", ingredientId: "wheat-flour" },
      { name: "Lauki sabzi (low salt)", quantity: 1, unit: "cup", ingredientId: "lauki" },
      { name: "Cucumber", quantity: 0.5, unit: "cup", ingredientId: null },
    ],
    servings: 1,
    steps: [
      "Skip nuts, seeds, cheese, excess milk, cola and packaged snacks.",
      "Keep dal/paneer off this plate unless cleared and portioned.",
      "One roti + vegetable + salad pattern.",
      "No commercial baking powder-heavy snacks.",
      "Requires matching with phosphorus binders/medicine schedule if prescribed — ask the treating team.",
    ],
    stepsHi: [
      "मेवे, बीज, चीज़, ज़्यादा दूध, कोल्ड ड्रिंक, पैकेट स्नैक छोड़ें।",
      "दाल/पनीर तभी जब अनुमति और माप हो।",
      "1 रोटी + सब्ज़ी + सलाद।",
      "बाज़ारू बेकरी स्नैक नहीं।",
      "फॉस्फोरस दवा/बाइंडर का समय डॉक्टर टीम से मिलाएं।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { phosphorusConscious: true, proteinConscious: true, lowSodium: true, controlledCarbs: true, potassiumConscious: true },
  })
);

recipes.push(
  R({
    id: "dk-combo-breakfast-safe-pattern",
    name: "DK Breakfast Pattern (Configurable)",
    nameHi: "डीके नाश्ता पैटर्न",
    dkCategories: ["Diabetes-Friendly Breakfast", "Special Kidney-Conscious Recipes"],
    mealSlots: ["Breakfast"],
    mainIngredients: ["besan", "lauki"],
    ingredients: [
      { name: "Choose ONE: veg besan chilla OR controlled daliya OR low-salt poha", quantity: 1, unit: "portion", ingredientId: "besan" },
      { name: "Cucumber or steamed cabbage", quantity: 0.5, unit: "cup", ingredientId: "cabbage" },
      { name: "Unsweetened fluids as per fluid advice", quantity: 1, unit: "glass max if allowed", ingredientId: null },
    ],
    servings: 1,
    steps: [
      "Pick only one carb base for breakfast.",
      "Add non-fried vegetables for volume.",
      "No juice, no sweet tea with sugar, no biscuits.",
      "Distribute carbs across the day — do not front-load huge portions.",
      "Final choice must match current labs and clinician instructions.",
    ],
    stepsHi: [
      "नाश्ते में एक ही कार्ब बेस चुनें।",
      "तलन-रहित सब्ज़ी से पेट भरे।",
      "जूस, चीनी वाली चाय, बिस्किट नहीं।",
      "दिन भर कार्ब बाँटें — सुबह बहुत ज़्यादा न लें।",
      "रिपोर्ट और डॉक्टर/डाइटिशियन निर्देश अंतिम हैं।",
    ],
    suitabilityDefault: "requires-renal-dietitian-review",
    flags: { controlledCarbs: true, lowAddedSugar: true, lowSodium: true, proteinConscious: true },
  })
);

// Fix accidental Chinese characters in steps if any
recipes.forEach((r) => {
  r.steps = r.steps.map((s) => s.replace(/n用/g, "न डालें").replace(/用/g, ""));
  r.stepsHi = r.stepsHi.map((s) => s.replace(/n用/g, "न डालें").replace(/用/g, ""));
});

const out = {
  module: "diabetes-kidney-care",
  title: "Diabetes & Kidney Care",
  titleHi: "शुगर और किडनी स्पेशल",
  historicalContextNote:
    "Earlier shared values (historical, not current labs): HbA1c ~11, creatinine 3.39, eGFR 20, urea 155.2, potassium 4.06, sodium 131, weight ~90 kg. Always use the latest reports and clinician advice.",
  medicalSafety:
    "This module is a cooking and meal-planning assistant only. It does not diagnose, treat, reverse diabetes, improve eGFR, or repair kidneys. Protein, potassium, phosphorus, sodium and fluid targets must be set from current labs and the treating nephrologist/renal dietitian. Do not use potassium-based salt substitutes unless explicitly prescribed.",
  categories: [
    { id: "Diabetes-Friendly Breakfast", name: "Diabetes-Friendly Breakfast", nameHi: "डायबिटीज नाश्ता" },
    { id: "Diabetes-Friendly Lunch", name: "Diabetes-Friendly Lunch", nameHi: "डायबिटीज दोपहर" },
    { id: "Diabetes-Friendly Dinner", name: "Diabetes-Friendly Dinner", nameHi: "डायबिटीज रात का खाना" },
    { id: "Healthy Snacks", name: "Healthy Snacks", nameHi: "स्वस्थ स्नैक्स" },
    { id: "Special Kidney-Conscious Recipes", name: "Special Kidney-Conscious Recipes", nameHi: "किडनी-सावधान रेसिपी" },
  ],
  suitabilityLabels: {
    "suitable-within-limits": "Suitable within configured dietary limits",
    "suitable-with-portion-adjustment": "Suitable with portion adjustment",
    "requires-ingredient-substitution": "Requires ingredient substitution",
    "requires-renal-dietitian-review": "Requires renal dietitian review",
    "not-recommended": "Not recommended under current configured restrictions",
  },
  defaultLimits: {
    configured: false,
    maxSodiumMgPerDay: null,
    maxProteinGPerDay: null,
    maxPotassiumMgPerDay: null,
    maxPhosphorusMgPerDay: null,
    maxCarbsGPerMeal: null,
    maxFluidMlPerDay: null,
    notes: "",
  },
  recipes,
};

const dest = path.join(__dirname, "..", "data", "dk-recipes.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log("Wrote", recipes.length, "DK recipes to", dest);
