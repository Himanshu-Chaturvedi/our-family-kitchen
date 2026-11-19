const { R, sabzi, dalRecipe, spiceBase } = require("./generate-data");

function buildPart6() {
  const recipes = [];

  // ===== DALS =====
  recipes.push(
    dalRecipe("dal-tadka", "Dal Tadka", "दाल तड़का", "toor-dal", "Toor dal", {
      aliases: ["Tadka Dal", "Arhar Dal Tadka"],
      steps: [
        "Wash and pressure cook toor dal with turmeric and salt until soft (3–4 whistles). Mash lightly.",
        "In a pan heat ghee, add cumin, hing, garlic, dried red chilli and onion; sauté until golden.",
        "Add tomato and chilli powder; cook briefly.",
        "Pour tadka over dal. Simmer 5 minutes. Adjust consistency with hot water.",
        "Finish with coriander and a spoon of ghee. Serve with rice or roti.",
      ],
    })
  );

  recipes.push(
    dalRecipe("dal-fry", "Dal Fry", "दाल फ्राई", "toor-dal", "Toor dal", {
      aliases: ["Restaurant Dal Fry"],
      steps: [
        "Cook toor dal until soft.",
        "Prepare a thicker onion-tomato base fried well in ghee/oil with ginger-garlic.",
        "Add dal into the masala (unlike tadka poured on top) and simmer 8–10 minutes.",
        "The dal should be slightly thicker than home tadka dal.",
        "Garnish with coriander and serve with jeera rice.",
      ],
      tips: ["Dal fry = dal cooked into the fried masala."],
    })
  );

  recipes.push(
    dalRecipe("dal-makhani", "Dal Makhani", "दाल मखनी", "urad-dal", "Whole urad dal", {
      aliases: ["Maa ki Dal"],
      mainIngredients: ["urad-dal", "rajma"],
      extraIngredients: [
        { name: "Rajma", quantity: 0.25, unit: "cup", ingredientId: "rajma" },
        { name: "Butter", quantity: 3, unit: "tbsp", ingredientId: "butter" },
        { name: "Cream", quantity: 3, unit: "tbsp", ingredientId: "cream" },
      ],
      prepTime: 20,
      cookTime: 60,
      difficulty: "Medium",
      steps: [
        "Soak whole urad and few rajma overnight. Pressure cook until very soft (6–8 whistles); mash some against the pot.",
        "Prepare tomato puree cooked in butter with ginger-garlic and spices.",
        "Add cooked dal; simmer on low at least 20–30 minutes, stirring often.",
        "Add butter and cream; simmer 5 more minutes.",
        "Serve with naan or rice. Slow cooking is the secret.",
      ],
      tips: ["Overnight soak and long simmer make restaurant-style creaminess."],
      region: ["Punjab", "North India"],
    })
  );

  recipes.push(
    dalRecipe("moong-dal", "Moong Dal", "मूंग दाल", "moong-dal", "Yellow moong dal", {
      aliases: ["Moong Ki Dal"],
      steps: [
        "Wash moong dal; cook with turmeric until soft (it cooks faster than toor).",
        "Temper ghee with cumin, hing, green chilli and garlic.",
        "Add to dal with salt; simmer 5 minutes.",
        "Optional: add chopped spinach for dal palak style later.",
        "Serve with rice — light and easy to digest.",
      ],
    })
  );

  recipes.push(
    dalRecipe("masoor-dal", "Masoor Dal", "मसूर दाल", "masoor-dal", "Red masoor dal", {
      steps: [
        "Cook masoor dal with turmeric until soft and creamy.",
        "Temper mustard oil or ghee with cumin, garlic and onion.",
        "Add tomato and spices; mix into dal.",
        "Simmer briefly.",
        "Serve with rice or roti.",
      ],
      region: ["Purvanchal", "North India"],
    })
  );

  recipes.push(
    dalRecipe("chana-dal-recipe", "Chana Dal", "चना दाल", "chana-dal", "Chana dal", {
      aliases: ["Chane Ki Dal"],
      steps: [
        "Soak chana dal 30 minutes. Pressure cook until soft but grainy.",
        "Temper ghee with cumin, hing and whole red chilli.",
        "Add onion, ginger and tomato; cook into masala.",
        "Mix dal; add garam masala. Simmer 8 minutes.",
        "Serve thick with roti — classic North Indian.",
      ],
      cookTime: 35,
    })
  );

  recipes.push(
    dalRecipe("urad-dal-recipe", "Urad Dal", "उड़द दाल", "urad-dal", "Split urad dal", {
      aliases: ["Dhuli Urad"],
      steps: [
        "Wash split urad; cook carefully (it froths) with turmeric until soft.",
        "Temper generously with ghee, cumin, hing and garlic.",
        "Add to dal with salt and chilli.",
        "Simmer; consistency should be creamy.",
        "Serve with rice or bajra roti.",
      ],
      tips: ["Watch the cooker — urad froths and can block the vent."],
    })
  );

  recipes.push(
    dalRecipe("mix-dal", "Mix Dal", "मिक्स दाल", "toor-dal", "Mixed dals", {
      mainIngredients: ["toor-dal", "moong-dal", "masoor-dal", "chana-dal"],
      extraIngredients: [
        { name: "Moong dal", quantity: 0.25, unit: "cup", ingredientId: "moong-dal" },
        { name: "Masoor dal", quantity: 0.25, unit: "cup", ingredientId: "masoor-dal" },
        { name: "Chana dal", quantity: 0.25, unit: "cup", ingredientId: "chana-dal" },
      ],
      steps: [
        "Mix equal parts of 3–4 dals; soak 20 minutes; pressure cook with turmeric.",
        "Prepare onion-tomato tadka in ghee.",
        "Combine and simmer 10 minutes for flavours to blend.",
        "Adjust thickness.",
        "Serve with jeera rice or roti.",
      ],
    })
  );

  recipes.push(
    dalRecipe("panchmel-dal", "Panchmel Dal", "पंचमेल दाल", "toor-dal", "Five dals mix", {
      aliases: ["Panchratna Dal", "Five Lentil Dal"],
      region: ["Rajasthan", "Jaipur"],
      categories: ["Lunch", "Dinner", "Rajasthani Special"],
      mainIngredients: ["toor-dal", "moong-dal", "chana-dal", "urad-dal", "masoor-dal"],
      extraIngredients: [
        { name: "Moong", quantity: 0.2, unit: "cup", ingredientId: "moong-dal" },
        { name: "Chana", quantity: 0.2, unit: "cup", ingredientId: "chana-dal" },
        { name: "Urad", quantity: 0.2, unit: "cup", ingredientId: "urad-dal" },
        { name: "Masoor", quantity: 0.2, unit: "cup", ingredientId: "masoor-dal" },
      ],
      steps: [
        "Combine five dals; soak; pressure cook until soft.",
        "Make a Rajasthani-style tadka with ghee, cumin, cloves and red chilli.",
        "Add to dal with coriander powder and garam masala; simmer.",
        "Should be thick enough to eat with baati.",
        "Serve with dal baati churma or plain rice.",
      ],
    })
  );

  recipes.push(
    dalRecipe("dal-palak", "Dal Palak", "दाल पालक", "toor-dal", "Toor or moong dal", {
      mainIngredients: ["toor-dal", "spinach"],
      extraIngredients: [{ name: "Spinach, chopped", quantity: 2, unit: "cups", ingredientId: "spinach" }],
      steps: [
        "Cook dal until soft.",
        "Add chopped spinach and simmer 5–7 minutes.",
        "Temper garlic and cumin in ghee; pour over.",
        "Adjust salt and chilli.",
        "Nutritious everyday dal.",
      ],
    })
  );

  recipes.push(
    dalRecipe("lahsun-dal", "Lahsun Dal", "लहसुन दाल", "toor-dal", "Toor dal", {
      aliases: ["Garlic Dal"],
      extraIngredients: [{ name: "Extra garlic", quantity: 12, unit: "cloves", ingredientId: "garlic" }],
      steps: [
        "Cook toor dal soft and mashy.",
        "Heat ghee; fry lots of sliced garlic until golden (not burnt).",
        "Add dried red chilli and cumin; pour over dal.",
        "Simmer 3 minutes so garlic flavour infuses.",
        "Serve hot with steamed rice — monsoon comfort food.",
      ],
      tips: ["Golden garlic, not bitter black garlic."],
    })
  );

  // Chole, rajma, lobia, kadhi
  recipes.push(
    sabzi(
      "punjabi-chole",
      "Punjabi Chole",
      "पंजाबी छोले",
      ["chickpea"],
      [
        { name: "Chickpeas, soaked overnight", quantity: 2, unit: "cups", ingredientId: "chickpea" },
        { name: "Tea bag or tea leaves for colour", quantity: 1, unit: "piece", ingredientId: null },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
        { name: "Chole masala", quantity: 2, unit: "tbsp", ingredientId: "garam-masala" },
        { name: "Ginger-garlic", quantity: 1, unit: "tbsp", ingredientId: "ginger" },
        { name: "Amchur", quantity: 1, unit: "tsp", ingredientId: "amchur" },
      ],
      [
        "Pressure cook chickpeas with salt and tea until soft; reserve stock.",
        "Prepare onion-tomato masala; add chole masala and amchur.",
        "Add chole with stock; mash a few for thickness. Simmer 15 minutes.",
        "Finish with ginger juliennes and coriander.",
        "Serve with bhature, puri or rice.",
      ],
      { aliases: ["Chole", "Chana Masala"], region: ["Punjab", "North India"], cookTime: 45, difficulty: "Medium" }
    )
  );

  recipes.push(
    sabzi(
      "pindi-chole",
      "Pindi Chole",
      "पिंडी छोले",
      ["chickpea"],
      [
        { name: "Chickpeas, soaked", quantity: 2, unit: "cups", ingredientId: "chickpea" },
        { name: "Anardana / amchur", quantity: 1, unit: "tbsp", ingredientId: "amchur" },
        { name: "Tea for colour", quantity: 1, unit: "bag", ingredientId: null },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
      ],
      [
        "Cook chole with tea and spices until dark and soft.",
        "Dry out most liquid; toss with oil, crushed spices and anardana for a dryish finish.",
        "No heavy onion-tomato gravy — spice-forward dry style.",
        "Rest 10 minutes before serving.",
        "Classic with kulcha.",
      ],
      { region: ["Punjab", "Rawalpindi style"], categories: ["Lunch", "Dinner"], difficulty: "Medium" }
    )
  );

  recipes.push(
    R({
      id: "chole-chawal",
      name: "Chole Chawal",
      nameHi: "छोले चावल",
      aliases: ["Chana Rice Plate"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["chickpea", "rice"],
      ingredients: [
        { name: "Prepared Punjabi chole", quantity: 3, unit: "cups", ingredientId: "chickpea" },
        { name: "Steamed rice", quantity: 3, unit: "cups", ingredientId: "rice" },
        { name: "Onion rings & lemon", quantity: 1, unit: "serving", ingredientId: "onion" },
      ],
      prepTime: 10,
      cookTime: 40,
      steps: [
        "Prepare Punjabi chole as in that recipe.",
        "Cook plain steamed rice.",
        "Serve chole over or beside rice with onion and lemon.",
        "Optional: add a spoon of ghee on rice.",
        "Complete comforting meal plate.",
      ],
      tips: ["Make chole slightly thinner for rice."],
    })
  );

  recipes.push(
    sabzi(
      "kala-chana-masala",
      "Kala Chana Masala",
      "काला चना मसाला",
      ["kala-chana"],
      [
        { name: "Kala chana, soaked", quantity: 1.5, unit: "cups", ingredientId: "kala-chana" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Pressure cook kala chana until soft.",
        "Make onion-tomato masala; add chana and simmer 12 minutes.",
        "Mash a few for body.",
        "Finish with garam masala.",
        "Serve with rice or roti — also used as navratri/prasad style dry sometimes.",
      ],
      {}
    )
  );

  recipes.push(
    sabzi(
      "kala-chana-ghugni",
      "Kala Chana Ghugni",
      "काला चना घुघनी",
      ["kala-chana"],
      [
        { name: "Kala chana", quantity: 1.5, unit: "cups", ingredientId: "kala-chana" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
      ],
      [
        "Same family as chana ghugni — spicy, mustard-oil forward, breakfast/snack style.",
        "Cook chana soft; prepare onion-tomato mustard oil masala.",
        "Simmer together; keep slightly thick.",
        "Top with chopped onion and lemon.",
        "Serve in bowls with puffed rice optional.",
      ],
      {
        region: ["Purvanchal", "Bihar"],
        categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
        tips: ["Closely related to chana-ghugni; slightly masala-heavier snack version."],
      }
    )
  );

  recipes.push(
    sabzi(
      "rajma-masala",
      "Rajma Masala",
      "राजमा मसाला",
      ["rajma"],
      [
        { name: "Rajma, soaked overnight", quantity: 2, unit: "cups", ingredientId: "rajma" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
        { name: "Ginger-garlic", quantity: 1, unit: "tbsp", ingredientId: "ginger" },
      ],
      [
        "Pressure cook soaked rajma until very soft (critical).",
        "Prepare deep brown onion-tomato gravy.",
        "Add rajma with cooking water; simmer 15–20 minutes; mash a few beans.",
        "Finish with garam masala and coriander.",
        "Serve with hot rice.",
      ],
      { region: ["Punjab", "North India", "Kashmir influenced homes"], cookTime: 50, difficulty: "Medium" }
    )
  );

  recipes.push(
    R({
      id: "rajma-chawal",
      name: "Rajma Chawal",
      nameHi: "राजमा चावल",
      aliases: ["Rajma Rice"],
      region: ["North India", "Punjab", "Delhi"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rajma", "rice"],
      ingredients: [
        { name: "Prepared rajma masala", quantity: 3, unit: "cups", ingredientId: "rajma" },
        { name: "Steamed rice", quantity: 3, unit: "cups", ingredientId: "rice" },
        { name: "Ghee", quantity: 1, unit: "tsp", ingredientId: "ghee" },
      ],
      prepTime: 10,
      cookTime: 50,
      steps: [
        "Cook rajma masala until thick and creamy.",
        "Plate steamed rice with a ladle of rajma.",
        "Add a touch of ghee on rice.",
        "Serve with onion salad.",
        "Sunday favourite across North India.",
      ],
      tips: ["Rajma must be melt-soft."],
    })
  );

  recipes.push(
    sabzi(
      "kashmiri-rajma",
      "Kashmiri Rajma",
      "कश्मीरी राजमा",
      ["rajma"],
      [
        { name: "Small Kashmiri rajma", quantity: 2, unit: "cups", ingredientId: "rajma" },
        { name: "Fennel powder", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Ginger powder", quantity: 0.5, unit: "tsp", ingredientId: "ginger" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Use small red Kashmiri beans if available; cook until soft.",
        "Gravy is lighter on garam masala, with fennel and dry ginger notes.",
        "Simmer long for a silky broth.",
        "Serve with rice.",
        "Distinct from Punjabi restaurant rajma.",
      ],
      { region: ["Kashmir", "North India"], cookTime: 55 }
    )
  );

  recipes.push(
    sabzi(
      "lobia-curry",
      "Lobia Curry",
      "लोबिया करी",
      ["lobia"],
      [
        { name: "Lobia, soaked", quantity: 1.5, unit: "cups", ingredientId: "lobia" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Pressure cook lobia until soft.",
        "Make onion-tomato curry base; add lobia and simmer.",
        "Adjust to medium gravy.",
        "Finish with garam masala.",
        "Serve with roti or rice.",
      ],
      { aliases: ["Black Eyed Peas Curry"] }
    )
  );

  recipes.push(
    sabzi(
      "lobia-masala",
      "Lobia Masala",
      "लोबिया मसाला",
      ["lobia"],
      [
        { name: "Lobia", quantity: 1.5, unit: "cups", ingredientId: "lobia" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Capsicum optional", quantity: 1, unit: "small", ingredientId: "capsicum" },
      ],
      [
        "Cook lobia soft. Prepare a thicker masala than curry style.",
        "Add lobia; cook until gravy clings to beans.",
        "Optional capsicum for crunch.",
        "Serve with roti.",
        "Semi-dry finish.",
      ],
      {}
    )
  );

  function kadhi(id, name, nameHi, extras) {
    return R({
      id,
      name,
      nameHi,
      aliases: extras.aliases || [],
      region: extras.region || ["North India"],
      categories: extras.categories || ["Lunch", "Dinner"],
      mainIngredients: ["curd", "besan"],
      ingredients: [
        { name: "Sour curd", quantity: 2, unit: "cups", ingredientId: "curd" },
        { name: "Besan", quantity: 0.5, unit: "cup", ingredientId: "besan" },
        { name: "Water", quantity: 3, unit: "cups", ingredientId: null },
        { name: "Oil/ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Mustard seeds / cumin", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Curry leaves or hing", quantity: 1, unit: "pinch", ingredientId: "asafoetida" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
        { name: "Salt", quantity: 1.5, unit: "tsp", ingredientId: "salt" },
        ...(extras.extraIngredients || []),
      ],
      prepTime: extras.prepTime || 20,
      cookTime: extras.cookTime || 35,
      difficulty: "Medium",
      steps: extras.steps,
      tips: extras.tips || ["Whisk besan into curd smoothly before heating to avoid lumps."],
      season: ["All"],
    });
  }

  recipes.push(
    kadhi("punjabi-kadhi-pakora", "Punjabi Kadhi Pakora", "पंजाबी कढ़ी पकोड़ा", {
      aliases: ["Kadhi Pakora"],
      region: ["Punjab", "North India"],
      extraIngredients: [
        { name: "Besan for pakora", quantity: 1, unit: "cup", ingredientId: "besan" },
        { name: "Onion for pakora", quantity: 1, unit: "medium", ingredientId: "onion" },
      ],
      steps: [
        "Whisk curd and besan with water, turmeric and salt. Cook on medium, stirring, until it boils and thickens 15–20 minutes.",
        "Make onion pakoras from besan batter; deep fry until golden.",
        "Prepare tadka with ghee, cumin, hing, chilli; pour into kadhi.",
        "Add pakoras; simmer 5 minutes so they soak slightly.",
        "Serve with steamed rice.",
      ],
    })
  );

  recipes.push(
    kadhi("rajasthani-kadhi", "Rajasthani Kadhi", "राजस्थानी कढ़ी", {
      region: ["Rajasthan", "Jaipur"],
      categories: ["Lunch", "Dinner", "Rajasthani Special"],
      aliases: ["Kadhi Rajasthani"],
      steps: [
        "Make a thinner sour kadhi with besan-curd; cook well.",
        "Temper with ghee, cumin, cloves, mustard and red chilli — more aromatic and sharp.",
        "Usually without large pakoras, or with small gatte/boondi.",
        "Should taste distinctly sour and spicy.",
        "Serve with bajra roti or rice.",
      ],
      tips: ["Sour curd is important for Rajasthani kadhi."],
    })
  );

  recipes.push(
    kadhi("up-style-kadhi", "UP Style Kadhi", "यूपी स्टाइल कढ़ी", {
      region: ["Uttar Pradesh", "Purvanchal"],
      categories: ["Lunch", "Dinner", "Purvanchal Special"],
      aliases: ["Uttar Pradesh Kadhi"],
      steps: [
        "Whisk besan-curd thinner than Punjabi kadhi; cook until it no longer tastes raw.",
        "Pakoras are optional; many homes serve plain kadhi.",
        "Tadka with mustard oil or ghee, cumin, hing and dried red chilli.",
        "Slightly lighter body than Punjabi version.",
        "Serve with rice and aloo chokha optional.",
      ],
    })
  );

  recipes.push(
    R({
      id: "kadhi-chawal",
      name: "Kadhi Chawal",
      nameHi: "कढ़ी चावल",
      aliases: ["Kadhi Rice"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["curd", "besan", "rice"],
      ingredients: [
        { name: "Prepared kadhi", quantity: 4, unit: "cups", ingredientId: "curd" },
        { name: "Steamed rice", quantity: 3, unit: "cups", ingredientId: "rice" },
      ],
      prepTime: 10,
      cookTime: 40,
      steps: [
        "Prepare Punjabi or UP kadhi.",
        "Cook plain rice.",
        "Serve kadhi generously over rice.",
        "Add ghee on top if desired.",
        "Comfort meal for rainy days.",
      ],
      tips: ["Slightly thinner kadhi pours better over rice."],
    })
  );

  recipes.push(
    kadhi("boondi-kadhi", "Boondi Kadhi", "बूंदी कढ़ी", {
      aliases: ["Kadhi Boondi"],
      extraIngredients: [{ name: "Plain boondi", quantity: 1, unit: "cup", ingredientId: "boondi" }],
      steps: [
        "Prepare kadhi base and cook thoroughly.",
        "Add tadka.",
        "Soak boondi briefly in warm water, squeeze, and add to kadhi 5 minutes before serving.",
        "Do not over-soak or boondi turns mushy.",
        "Serve with rice.",
      ],
      prepTime: 15,
      cookTime: 30,
    })
  );

  return recipes;
}

module.exports = { buildPart6 };
