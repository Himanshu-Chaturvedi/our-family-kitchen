/** Remaining recipes — required by generate-all.js */
const { R, sabzi, paneerGravy, dalRecipe } = require("./generate-data");

function buildPart2() {
  const recipes = [];

  // ===== PURVANCHAL BREAKFAST / SNACKS =====
  recipes.push(
    R({
      id: "bedmi-puri",
      name: "Bedmi Puri",
      nameHi: "बेडमी पूरी",
      aliases: ["Bedvi Puri", "Urad Dal Puri"],
      region: ["Purvanchal", "Jaunpur", "Banaras", "Uttar Pradesh"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["urad-dal", "wheat-flour"],
      ingredients: [
        { name: "Urad dal (soaked)", quantity: 0.75, unit: "cup", ingredientId: "urad-dal" },
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Fennel seeds", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Asafoetida", quantity: 1, unit: "pinch", ingredientId: "asafoetida" },
        { name: "Red chilli powder", quantity: 1, unit: "tsp", ingredientId: "red-chilli" },
        { name: "Oil for dough + frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Soak urad dal 4 hours. Grind coarsely with fennel, chilli, hing and salt — keep it thick, not watery.",
        "Mix the dal paste into wheat flour with 1 tbsp oil and knead a firm dough. Rest 20 minutes.",
        "Make small balls, roll into thick puris.",
        "Deep fry in hot oil on medium flame until puffed and golden.",
        "Serve with spicy aloo sabzi or kaddu sabzi.",
      ],
      tips: ["Dough should be firmer than chapati dough so puris puff well."],
    })
  );

  recipes.push(
    R({
      id: "dal-puri",
      name: "Dal Puri",
      nameHi: "दाल पूरी",
      aliases: ["Stuffed Dal Puri"],
      region: ["Purvanchal", "Uttar Pradesh", "Bihar"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["chana-dal", "wheat-flour"],
      ingredients: [
        { name: "Chana dal, soaked & boiled", quantity: 1, unit: "cup", ingredientId: "chana-dal" },
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Fennel powder", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 40,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Boil soaked chana dal until soft but not mushy. Drain and grind with ginger, chilli, fennel and salt to a thick paste.",
        "Cook paste on low flame 3–4 minutes to remove moisture. Cool.",
        "Knead soft dough. Stuff each dough ball with dal filling, seal and roll carefully.",
        "Deep fry until golden and crisp.",
        "Serve with aloo rasedar or plain curd.",
      ],
      tips: ["Dry the filling well or puris will open while frying."],
    })
  );

  recipes.push(
    R({
      id: "urad-dal-kachori",
      name: "Urad Dal Kachori",
      nameHi: "उड़द दाल कचौरी",
      aliases: ["Khasta Kachori", "Dal Kachori"],
      region: ["Purvanchal", "Uttar Pradesh", "Rajasthan"],
      categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
      mainIngredients: ["urad-dal", "maida"],
      ingredients: [
        { name: "Urad dal, soaked", quantity: 1, unit: "cup", ingredientId: "urad-dal" },
        { name: "Maida", quantity: 2, unit: "cups", ingredientId: "maida" },
        { name: "Fennel seeds", quantity: 1.5, unit: "tsp", ingredientId: "fennel" },
        { name: "Coriander seeds, crushed", quantity: 1, unit: "tsp", ingredientId: "coriander-powder" },
        { name: "Asafoetida", quantity: 1, unit: "pinch", ingredientId: "asafoetida" },
        { name: "Ghee for dough", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 45,
      cookTime: 35,
      difficulty: "Medium",
      steps: [
        "Grind soaked urad dal coarsely with fennel, crushed coriander, hing, chilli powder and salt. Cook filling until dry.",
        "Rub ghee into maida, knead a tight dough with little water. Rest 30 minutes.",
        "Stuff, seal and flatten into thick discs.",
        "Fry on low–medium flame for 8–10 minutes until crisp and layered.",
        "Serve with aloo sabzi and green chutney.",
      ],
      tips: ["Low flame frying gives the khasta texture."],
    })
  );

  recipes.push(
    R({
      id: "matar-kachori",
      name: "Matar Kachori",
      nameHi: "मटर कचौरी",
      aliases: ["Peas Kachori", "Mattar Kachori"],
      region: ["Purvanchal", "Uttar Pradesh"],
      categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
      mainIngredients: ["green-peas", "maida"],
      ingredients: [
        { name: "Fresh green peas", quantity: 1.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Maida", quantity: 2, unit: "cups", ingredientId: "maida" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Fennel seeds", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Amchur", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 35,
      cookTime: 30,
      season: ["Winter"],
      difficulty: "Medium",
      steps: [
        "Coarsely crush peas with ginger, chilli and fennel. Sauté in little oil with amchur and salt until dry.",
        "Make ghee-enriched maida dough. Rest 20 minutes.",
        "Stuff pea filling into dough balls, seal and flatten.",
        "Deep fry on medium-low heat until golden and crisp.",
        "Serve with green chutney or aloo sabzi.",
      ],
      tips: ["Winter peas make the best matar kachori."],
    })
  );

  recipes.push(
    R({
      id: "aloo-kachori",
      name: "Aloo Kachori",
      nameHi: "आलू कचौरी",
      aliases: ["Potato Kachori"],
      region: ["Purvanchal", "Uttar Pradesh"],
      categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
      mainIngredients: ["potato", "maida"],
      ingredients: [
        { name: "Boiled potatoes, mashed", quantity: 3, unit: "medium", ingredientId: "potato" },
        { name: "Maida", quantity: 2, unit: "cups", ingredientId: "maida" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Amchur", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Mix mashed potato with chilli, coriander, amchur, garam masala and salt.",
        "Prepare firm maida dough with ghee. Rest 20 minutes.",
        "Stuff, seal and flatten into kachoris.",
        "Fry on medium flame until crisp and golden.",
        "Serve with tamarind chutney or raita.",
      ],
      tips: ["Do not over-wet the potato filling."],
    })
  );

  recipes.push(
    R({
      id: "sattu-puri",
      name: "Sattu Puri",
      nameHi: "सत्तू पूरी",
      aliases: ["Sattu Stuffed Puri"],
      region: ["Purvanchal", "Jaunpur", "Bihar"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["sattu", "wheat-flour"],
      ingredients: [
        { name: "Sattu", quantity: 1, unit: "cup", ingredientId: "sattu" },
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Mustard oil", quantity: 1, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garlic, chopped", quantity: 4, unit: "cloves", ingredientId: "garlic" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Pickle masala", quantity: 1, unit: "tsp", ingredientId: "pickle-masala" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 25,
      cookTime: 25,
      steps: [
        "Mix sattu with mustard oil, garlic, chilli, pickle masala and salt for stuffing.",
        "Knead wheat dough. Stuff, seal and roll into thick puris.",
        "Deep fry until puffed and golden.",
        "Serve with aloo chokha or plain curd.",
        "Eat fresh for the best crunch.",
      ],
      tips: ["Same stuffing style as sattu paratha, but fried."],
    })
  );

  recipes.push(
    R({
      id: "aloo-puri",
      name: "Aloo Puri",
      nameHi: "आलू पूरी",
      aliases: ["Potato Puri", "Aloo Wali Puri"],
      region: ["North India", "Uttar Pradesh"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["potato", "wheat-flour"],
      ingredients: [
        { name: "Boiled mashed potato", quantity: 1, unit: "cup", ingredientId: "potato" },
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Turmeric", quantity: 0.25, unit: "tsp", ingredientId: "turmeric" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 25,
      steps: [
        "Knead flour with mashed potato, ajwain, turmeric, salt and little water into a soft dough.",
        "Roll into small puris.",
        "Deep fry until golden and puffed.",
        "Serve with chana or raita.",
        "Best eaten hot.",
      ],
      tips: ["Potato in dough keeps puris soft longer."],
    })
  );

  recipes.push(
    sabzi(
      "chooda-matar",
      "Chooda Matar",
      "चूड़ा मटर",
      ["poha", "green-peas"],
      [
        { name: "Thick poha (chooda)", quantity: 2, unit: "cups", ingredientId: "poha" },
        { name: "Fresh green peas", quantity: 1, unit: "cup", ingredientId: "green-peas" },
        { name: "Potato, cubed", quantity: 1, unit: "medium", ingredientId: "potato" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
      ],
      [
        "Rinse thick poha once and drain. Keep slightly moist, not soggy.",
        "Heat mustard oil, add cumin, onion and chilli. Sauté until onion softens.",
        "Add potato and peas with turmeric and salt. Cover and cook until soft.",
        "Add poha, mix gently on low flame 3–4 minutes so it absorbs flavours.",
        "Finish with coriander and a squeeze of lemon. Serve hot for breakfast.",
      ],
      {
        aliases: ["Chura Matar", "Poha Matar UP Style"],
        region: ["Purvanchal", "Jaunpur", "Uttar Pradesh"],
        categories: ["Breakfast", "Purvanchal Special"],
        season: ["Winter"],
        tips: ["Use thick chooda, not thin Indori poha."],
      }
    )
  );

  recipes.push(
    sabzi(
      "chana-ghugni",
      "Chana Ghugni",
      "चना घुघनी",
      ["kala-chana"],
      [
        { name: "Kala chana, soaked overnight", quantity: 1.5, unit: "cups", ingredientId: "kala-chana" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Ginger-garlic", quantity: 1, unit: "tbsp", ingredientId: "ginger" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      [
        "Pressure cook soaked kala chana with salt until soft but whole (3–4 whistles).",
        "Heat mustard oil, temper cumin, sauté onion till golden, add ginger-garlic.",
        "Add tomato and spices; cook until oil separates.",
        "Add boiled chana with some cooking water. Simmer 10 minutes.",
        "Garnish with onion rings and coriander. Serve as breakfast or snack.",
      ],
      {
        aliases: ["Black Chickpea Ghugni", "Ghugni Chana"],
        region: ["Purvanchal", "Bihar", "Jharkhand", "Uttar Pradesh"],
        categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
      }
    )
  );

  recipes.push(
    sabzi(
      "matar-ghugni",
      "Matar Ghugni",
      "मटर घुघनी",
      ["green-peas"],
      [
        { name: "Fresh green peas", quantity: 2, unit: "cups", ingredientId: "green-peas" },
        { name: "Potato, cubed", quantity: 1, unit: "medium", ingredientId: "potato" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      [
        "Heat mustard oil, add cumin, onion and green chilli. Sauté until soft.",
        "Add tomato and spices; cook till mushy.",
        "Add peas and potato with a little water. Cover and cook until tender.",
        "Simmer until a thick, spoonable gravy forms.",
        "Serve with kachori, puri or plain roti.",
      ],
      {
        aliases: ["Peas Ghugni", "Mattar Ghugni"],
        region: ["Purvanchal", "Jaunpur", "Uttar Pradesh"],
        categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
        season: ["Winter"],
      }
    )
  );

  recipes.push(
    R({
      id: "sattu-litti",
      name: "Sattu Litti",
      nameHi: "सत्तू लिट्टी",
      aliases: ["Litti", "Baati Litti Sattu"],
      region: ["Purvanchal", "Bihar", "Jharkhand", "Jaunpur"],
      categories: ["Lunch", "Dinner", "Purvanchal Special", "Traditional"],
      mainIngredients: ["sattu", "wheat-flour"],
      ingredients: [
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Sattu", quantity: 1.5, unit: "cups", ingredientId: "sattu" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garlic, chopped", quantity: 6, unit: "cloves", ingredientId: "garlic" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Ajwain", quantity: 1, unit: "tsp", ingredientId: "ajwain" },
        { name: "Pickle masala / mango pickle oil", quantity: 1, unit: "tbsp", ingredientId: "pickle-masala" },
        { name: "Lemon juice", quantity: 1, unit: "tbsp", ingredientId: "lemon" },
        { name: "Ghee for dipping", quantity: 4, unit: "tbsp", ingredientId: "ghee" },
        { name: "Salt", quantity: 1.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 30,
      cookTime: 40,
      difficulty: "Medium",
      steps: [
        "Mix sattu with mustard oil, garlic, ginger, chilli, ajwain, pickle masala, lemon and salt. Filling should be crumbly and aromatic.",
        "Knead firm wheat dough with salt and little oil. Rest 15 minutes.",
        "Stuff dough balls with sattu, seal into round littis.",
        "Roast on coal, in a tandoor, or bake at 200°C for 25–30 minutes, turning until cracked and browned. Alternatively cook on gas tandoor/grill.",
        "Crack open hot littis, dunk generously in ghee. Serve with chokha.",
      ],
      tips: ["Traditional taste needs raw mustard oil and garlic in the sattu."],
    })
  );

  recipes.push(
    R({
      id: "litti-chokha",
      name: "Litti Chokha",
      nameHi: "लिट्टी चोखा",
      aliases: ["Litti Chokha Platter"],
      region: ["Purvanchal", "Bihar", "Jaunpur"],
      categories: ["Lunch", "Dinner", "Purvanchal Special", "Traditional"],
      mainIngredients: ["sattu", "eggplant", "potato", "tomato"],
      ingredients: [
        { name: "Prepared sattu littis", quantity: 8, unit: "pieces", ingredientId: "sattu" },
        { name: "Baingan for bharta/chokha", quantity: 1, unit: "large", ingredientId: "eggplant" },
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Onion, chopped", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garlic", quantity: 4, unit: "cloves", ingredientId: "garlic" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 40,
      cookTime: 50,
      difficulty: "Medium",
      steps: [
        "Prepare sattu littis as in Sattu Litti recipe and keep warm in ghee.",
        "Roast baingan, tomato and potato directly on flame until charred and soft. Peel.",
        "Mash each separately or together with raw onion, garlic, chilli, mustard oil and salt — this is chokha.",
        "Arrange littis with baingan chokha, aloo chokha and tamatar chokha on a plate.",
        "Serve immediately with extra ghee and green chilli.",
      ],
      tips: ["Flame-roasting gives the authentic smoky chokha flavour."],
    })
  );

  recipes.push(
    R({
      id: "dal-pitha",
      name: "Dal Pitha",
      nameHi: "दाल पिठा",
      aliases: ["Pitha", "Steamed Dal Dumplings"],
      region: ["Purvanchal", "Bihar", "Jharkhand"],
      categories: ["Breakfast", "Lunch", "Purvanchal Special"],
      mainIngredients: ["chana-dal", "wheat-flour"],
      ingredients: [
        { name: "Chana dal, soaked", quantity: 1, unit: "cup", ingredientId: "chana-dal" },
        { name: "Wheat flour or rice flour", quantity: 1.5, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Mustard oil", quantity: 1, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 40,
      cookTime: 25,
      difficulty: "Medium",
      steps: [
        "Grind soaked chana dal with ginger, chilli, cumin and salt into a coarse stuffing. Sauté briefly in mustard oil to dry.",
        "Knead soft dough. Roll small discs, place stuffing, fold and seal like dumplings.",
        "Steam in a steamer or idli cooker for 15–18 minutes until cooked through.",
        "Optionally temper with mustard oil, garlic and chilli before serving.",
        "Serve hot with chutney or ghee.",
      ],
      tips: ["Do not overfill or pithas may open while steaming."],
    })
  );

  recipes.push(
    R({
      id: "fara-gojha",
      name: "Fara / Gojha",
      nameHi: "फरा / गोंझा",
      aliases: ["Fara", "Gojha", "Ghughni Fara"],
      region: ["Purvanchal", "Uttar Pradesh", "Bihar"],
      categories: ["Breakfast", "Lunch", "Purvanchal Special"],
      mainIngredients: ["chana-dal", "rice"],
      ingredients: [
        { name: "Rice flour", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Chana dal, soaked", quantity: 0.75, unit: "cup", ingredientId: "chana-dal" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Mustard oil for tempering", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Garlic", quantity: 4, unit: "cloves", ingredientId: "garlic" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 35,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Grind chana dal with ginger, chilli and cumin into stuffing; cook till dry.",
        "Knead hot-water rice flour dough. Make oval pockets, stuff and seal (gojha shape).",
        "Steam 15–20 minutes until firm.",
        "Slice steamed faras. Temper mustard oil with garlic and red chilli; toss slices until lightly crisp.",
        "Serve with green chutney.",
      ],
      tips: ["In Jaunpur homes, tempered fara is a rainy-day favourite."],
    })
  );

  recipes.push(
    R({
      id: "bafauri",
      name: "Bafauri",
      nameHi: "बफौरी",
      aliases: ["Steamed Chana Dal Pakora", "Baphouri"],
      region: ["Purvanchal", "Chhattisgarh", "Uttar Pradesh"],
      categories: ["Breakfast", "Evening Snacks", "Purvanchal Special"],
      mainIngredients: ["chana-dal"],
      ingredients: [
        { name: "Chana dal, soaked 3 hours", quantity: 1.5, unit: "cups", ingredientId: "chana-dal" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Garlic", quantity: 3, unit: "cloves", ingredientId: "garlic" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Coriander leaves", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Oil", quantity: 1, unit: "tsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 20,
      steps: [
        "Grind soaked chana dal coarsely with ginger, garlic, chilli and cumin — keep texture, not a fine paste.",
        "Mix salt and coriander. Shape into small freestyle dumplings with oiled hands.",
        "Steam 12–15 minutes until cooked and springy.",
        "Optionally pan-sear lightly in mustard oil.",
        "Serve with coriander chutney or tomato chutney.",
      ],
      tips: ["Healthier steamed cousin of dal pakora — popular in Purvanchal kitchens."],
    })
  );

  return recipes;
}

module.exports = { buildPart2 };
