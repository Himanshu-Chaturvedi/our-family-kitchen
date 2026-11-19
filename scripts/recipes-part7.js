const { R, sabzi, spiceBase } = require("./generate-data");

function buildPart7() {
  const recipes = [];

  // ===== RICE & COMPLETE MEALS =====
  recipes.push(
    R({
      id: "vegetable-pulao",
      name: "Vegetable Pulao",
      nameHi: "वेजिटेबल पुलाव",
      aliases: ["Veg Pulao"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice", "carrot", "green-peas", "beans"],
      ingredients: [
        { name: "Basmati rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Mixed vegetables", quantity: 1.5, unit: "cups", ingredientId: "carrot" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
        { name: "Whole spices", quantity: 1, unit: "tsp", ingredientId: "bay-leaf" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 25,
      steps: [
        "Soak rice 20 minutes. Heat ghee; fry bay, cumin, clove; sauté onion.",
        "Add vegetables; sauté 2 minutes. Add rice; coat in ghee.",
        "Add 2.75 cups water and salt. Cook covered on low until done.",
        "Rest 5 minutes; fluff with fork.",
        "Serve with raita or curry.",
      ],
      tips: ["Do not stir vigorously after adding water."],
    })
  );

  recipes.push(
    R({
      id: "jeera-rice",
      name: "Jeera Rice",
      nameHi: "जीरा राइस",
      aliases: ["Cumin Rice"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice", "cumin"],
      ingredients: [
        { name: "Basmati rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Cumin seeds", quantity: 2, unit: "tsp", ingredientId: "cumin" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 20,
      steps: [
        "Soak rice 15 minutes. Heat ghee; crackle cumin until aromatic and lightly browned.",
        "Add drained rice; sauté 1 minute.",
        "Add water and salt; cook until fluffy.",
        "Rest and fluff.",
        "Perfect with dal makhani or shahi paneer.",
      ],
      tips: ["Brown cumin lightly without burning."],
    })
  );

  recipes.push(
    R({
      id: "paneer-pulao",
      name: "Paneer Pulao",
      nameHi: "पनीर पुलाव",
      aliases: ["Paneer Rice"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice", "paneer"],
      ingredients: [
        { name: "Basmati rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Paneer cubes", quantity: 200, unit: "g", ingredientId: "paneer" },
        { name: "Peas", quantity: 0.5, unit: "cup", ingredientId: "green-peas" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
        { name: "Whole spices", quantity: 1, unit: "tsp", ingredientId: "bay-leaf" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 25,
      steps: [
        "Lightly pan-fry paneer cubes; keep aside.",
        "Make pulao base with spices, peas and rice.",
        "Cook rice; gently fold in paneer at the end.",
        "Rest 5 minutes.",
        "Serve with raita.",
      ],
      tips: ["Add paneer late so it stays soft."],
    })
  );

  recipes.push(
    R({
      id: "kashmiri-pulao",
      name: "Kashmiri Pulao",
      nameHi: "कश्मीरी पुलाव",
      aliases: ["Sweet Pulao"],
      region: ["Kashmir", "North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice"],
      ingredients: [
        { name: "Basmati rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Milk", quantity: 0.5, unit: "cup", ingredientId: "milk" },
        { name: "Saffron", quantity: 1, unit: "pinch", ingredientId: "saffron" },
        { name: "Dry fruits & raisins", quantity: 0.5, unit: "cup", ingredientId: "raisins" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
        { name: "Sugar", quantity: 1, unit: "tsp", ingredientId: "sugar" },
        { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Soak saffron in warm milk.",
        "Fry dry fruits in ghee; keep aside. Cook rice with whole spices, salt and a touch of sugar.",
        "When almost done, add saffron milk and fried dry fruits.",
        "Dum for 5 minutes.",
        "Serve mildly sweet aromatic pulao with spicy curry.",
      ],
      tips: ["Balance salt and slight sweetness carefully."],
    })
  );

  recipes.push(
    R({
      id: "vegetable-biryani",
      name: "Vegetable Biryani",
      nameHi: "वेजिटेबल बिरयानी",
      aliases: ["Veg Biryani"],
      region: ["Hyderabad influenced", "North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice", "potato", "carrot", "green-peas"],
      ingredients: [
        { name: "Basmati rice", quantity: 2, unit: "cups", ingredientId: "rice" },
        { name: "Mixed vegetables", quantity: 2, unit: "cups", ingredientId: "potato" },
        { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
        { name: "Fried onions", quantity: 0.5, unit: "cup", ingredientId: "onion" },
        { name: "Biryani spices / garam masala", quantity: 2, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Mint & coriander", quantity: 0.5, unit: "cup", ingredientId: "coriander" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Saffron milk", quantity: 3, unit: "tbsp", ingredientId: "saffron" },
        { name: "Salt", quantity: 2, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 35,
      cookTime: 45,
      difficulty: "Medium",
      steps: [
        "Parboil rice with whole spices until 70% cooked; drain.",
        "Cook vegetables in curd-spice masala until semi-done and aromatic.",
        "Layer vegetable masala and rice in a heavy pot; sprinkle fried onion, mint, saffron milk and ghee.",
        "Seal and dum-cook on low 20 minutes.",
        "Rest 10 minutes; gently mix and serve with raita.",
      ],
      tips: ["Rice must be only 70% cooked before dum."],
    })
  );

  recipes.push(
    R({
      id: "paneer-biryani",
      name: "Paneer Biryani",
      nameHi: "पनीर बिरयानी",
      aliases: ["Paneer Dum Biryani"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["rice", "paneer"],
      ingredients: [
        { name: "Basmati rice", quantity: 2, unit: "cups", ingredientId: "rice" },
        { name: "Paneer", quantity: 250, unit: "g", ingredientId: "paneer" },
        { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
        { name: "Fried onions", quantity: 0.5, unit: "cup", ingredientId: "onion" },
        { name: "Biryani masala", quantity: 2, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Mint", quantity: 0.25, unit: "cup", ingredientId: "coriander" },
        { name: "Salt", quantity: 2, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 35,
      cookTime: 45,
      difficulty: "Medium",
      steps: [
        "Marinate paneer in curd and spices 20 minutes; shallow fry lightly.",
        "Parboil rice. Layer paneer masala and rice with fried onion and mint.",
        "Dum-cook 20 minutes on low.",
        "Rest and serve with salan or raita.",
        "Handle layers gently when serving.",
      ],
      tips: ["Do not overcook paneer in marinade pan."],
    })
  );

  recipes.push(
    R({
      id: "veg-fried-rice",
      name: "Veg Fried Rice",
      nameHi: "वेज फ्राइड राइस",
      aliases: ["Indo-Chinese Fried Rice"],
      region: ["Indo-Chinese"],
      categories: ["Lunch", "Dinner", "Evening Snacks"],
      mainIngredients: ["rice", "cabbage", "carrot", "beans"],
      ingredients: [
        { name: "Cooked leftover rice", quantity: 3, unit: "cups", ingredientId: "rice" },
        { name: "Mixed veg (carrot, beans, cabbage, capsicum)", quantity: 2, unit: "cups", ingredientId: "cabbage" },
        { name: "Soy sauce", quantity: 1, unit: "tbsp", ingredientId: null },
        { name: "Vinegar", quantity: 1, unit: "tsp", ingredientId: "lemon" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Garlic", quantity: 6, unit: "cloves", ingredientId: "garlic" },
        { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 15,
      steps: [
        "Use cold leftover rice for best texture.",
        "Heat oil on high; stir-fry garlic and vegetables quickly.",
        "Add rice, soy sauce, vinegar, salt and pepper; toss on high flame.",
        "Do not mash rice.",
        "Serve with chilli paneer or manchurian.",
      ],
      tips: ["High flame and cold rice prevent sogginess."],
    })
  );

  recipes.push(
    R({
      id: "lemon-rice",
      name: "Lemon Rice",
      nameHi: "लेमन राइस",
      aliases: ["Chitranna", "Nimbu Rice"],
      region: ["South India"],
      categories: ["Lunch", "Breakfast"],
      mainIngredients: ["rice", "lemon"],
      ingredients: [
        { name: "Cooked rice", quantity: 3, unit: "cups", ingredientId: "rice" },
        { name: "Lemon juice", quantity: 2, unit: "tbsp", ingredientId: "lemon" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Chana dal & urad dal", quantity: 1, unit: "tsp", ingredientId: "chana-dal" },
        { name: "Peanuts", quantity: 2, unit: "tbsp", ingredientId: "peanuts" },
        { name: "Curry leaves", quantity: 10, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 10,
      steps: [
        "Temper mustard, dals, peanuts, curry leaves and green chilli in oil.",
        "Add turmeric; switch off flame; add lemon juice and salt.",
        "Mix into cooled cooked rice gently.",
        "Adjust lemon to taste.",
        "Serve with curd or papad.",
      ],
      tips: ["Add lemon off the flame to keep brightness."],
    })
  );

  recipes.push(
    R({
      id: "tomato-rice",
      name: "Tomato Rice",
      nameHi: "टमाटर राइस",
      aliases: ["Thakkali Sadam"],
      region: ["South India", "North India"],
      categories: ["Lunch"],
      mainIngredients: ["rice", "tomato"],
      ingredients: [
        { name: "Rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Tomato", quantity: 4, unit: "medium", ingredientId: "tomato" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Mustard & curry leaves", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 25,
      steps: [
        "Temper spices; sauté onion and tomatoes with chilli powder and salt until jammy.",
        "Add soaked rice and water; cook until done.",
        "Or mix tomato masala into leftover rice.",
        "Rest and fluff.",
        "Serve with curd.",
      ],
      tips: ["Ripe tomatoes give better colour and tang."],
    })
  );

  recipes.push(
    sabzi(
      "vegetable-tahri",
      "Vegetable Tahri",
      "वेजिटेबल तहरी",
      ["rice", "potato", "cauliflower", "green-peas"],
      [
        { name: "Rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Cauliflower & peas", quantity: 1.5, unit: "cups", ingredientId: "cauliflower" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
      ],
      [
        "Heat mustard oil; fry potato and gobhi lightly.",
        "Add spices, peas and soaked rice.",
        "Add water; cook like tahri until everything is done.",
        "Rest and serve with pickle and papad.",
        "One-pot Awadhi/Purvanchal meal.",
      ],
      {
        aliases: ["Veg Tehri"],
        region: ["Purvanchal", "Awadh", "Uttar Pradesh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
      }
    )
  );

  // Khichdis
  const khichdis = [
    ["moong-dal-khichdi", "Moong Dal Khichdi", "मूंग दाल खिचड़ी", "moong-dal",
      ["Wash moong dal and rice together (1:1.5 dal:rice or equal).",
       "Temper ghee with cumin and hing; add dal-rice, turmeric, salt and water (about 4 cups for 1 cup mix).",
       "Pressure cook 3–4 whistles until soft and porridge-like.",
       "Add more ghee on top.",
       "Serve with kaddu sabzi, papad and pickle."]],
    ["vegetable-khichdi", "Vegetable Khichdi", "वेजिटेबल खिचड़ी", "carrot",
      ["Same as moong khichdi but add mixed vegetables with the rice-dal.",
       "Cook until soft.",
       "Temper with ghee and cumin.",
       "Comforting one-pot meal.",
       "Adjust water for softer or grainier texture."]],
    ["masala-khichdi", "Masala Khichdi", "मसाला खिचड़ी", "toor-dal",
      ["Sauté onion, tomato and spices before adding rice and dal.",
       "Add vegetables optional.",
       "Pressure cook until soft.",
       "More robustly spiced than plain khichdi.",
       "Serve with curd."]],
    ["bajra-khichdi", "Bajra Khichdi", "बाजरा खिचड़ी", "bajra",
      ["Use bajra (pearl millet) with moong dal.",
       "Soak bajra longer; cook with extra water until soft.",
       "Ghee-cumin tadka.",
       "Winter Rajasthani/North Indian special.",
       "Serve with kadhi or ghee."]],
    ["palak-khichdi", "Palak Khichdi", "पालक खिचड़ी", "spinach",
      ["Add pureed or chopped spinach to moong-rice khichdi while cooking.",
       "Cook until soft and green.",
       "Garlic-ghee tadka.",
       "Nutritious and mild.",
       "Serve with curd or papad."]],
  ];

  khichdis.forEach(([id, name, nameHi, main, steps], idx) => {
    recipes.push(
      R({
        id,
        name,
        nameHi,
        aliases: [],
        region: id.includes("bajra") ? ["Rajasthan", "North India"] : ["North India"],
        categories: id.includes("bajra")
          ? ["Lunch", "Dinner", "Rajasthani Special"]
          : ["Lunch", "Dinner", "Breakfast"],
        mainIngredients: [main, "rice"].filter(Boolean),
        ingredients: [
          { name: "Rice", quantity: 0.75, unit: "cup", ingredientId: "rice" },
          { name: "Dal (moong/toor)", quantity: 0.75, unit: "cup", ingredientId: "moong-dal" },
          { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
          { name: "Cumin", quantity: 1, unit: "tsp", ingredientId: "cumin" },
          { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
          { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
          ...(id.includes("bajra")
            ? [{ name: "Bajra", quantity: 0.75, unit: "cup", ingredientId: "bajra" }]
            : []),
          ...(id.includes("palak")
            ? [{ name: "Spinach", quantity: 1, unit: "cup", ingredientId: "spinach" }]
            : []),
          ...(id.includes("vegetable")
            ? [{ name: "Mixed vegetables", quantity: 1, unit: "cup", ingredientId: "carrot" }]
            : []),
        ],
        prepTime: 10,
        cookTime: 30,
        steps,
        tips: ["More water = softer hospital-style khichdi."],
        season: id.includes("bajra") ? ["Winter"] : ["All"],
      })
    );
  });

  // ===== PURVANCHAL REMAINING =====
  recipes.push(
    sabzi(
      "banarasi-aloo-tamatar",
      "Banarasi Aloo Tamatar",
      "बनारसी आलू टमाटर",
      ["potato", "tomato"],
      [
        { name: "Potato", quantity: 4, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 4, unit: "medium", ingredientId: "tomato" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
      ],
      [
        "Temper cumin and hing in mustard oil. Add tomatoes; cook to a mash.",
        "Add spices and potato; add water for a bright red rasedar gravy.",
        "Simmer until potato is soft.",
        "Slightly tangy — Banaras home style.",
        "Serve with plain rice or roti.",
      ],
      {
        region: ["Banaras", "Purvanchal", "Uttar Pradesh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
      }
    )
  );

  recipes.push(
    R({
      id: "banarasi-tamatar-chaat",
      name: "Banarasi Tamatar Chaat",
      nameHi: "बनारसी टमाटर चाट",
      aliases: ["Tomato Chaat Banaras"],
      region: ["Banaras", "Purvanchal"],
      categories: ["Evening Snacks", "Purvanchal Special"],
      mainIngredients: ["tomato"],
      ingredients: [
        { name: "Ripe tomatoes", quantity: 4, unit: "large", ingredientId: "tomato" },
        { name: "Boiled potato", quantity: 1, unit: "medium", ingredientId: "potato" },
        { name: "Chaat masala", quantity: 1, unit: "tsp", ingredientId: "amchur" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Butter or oil", quantity: 1, unit: "tbsp", ingredientId: "butter" },
        { name: "Sev", quantity: 0.25, unit: "cup", ingredientId: "sev" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 15,
      steps: [
        "Chop tomatoes; cook on a tawa with butter, chilli, salt and chaat masala until soft but not fully sauce.",
        "Add boiled potato cubes; mash lightly with tomatoes.",
        "The mixture should be tangy, spicy and slightly mushy.",
        "Top with sev and coriander.",
        "Serve hot as Banarasi street-style chaat.",
      ],
      tips: ["Use ripe red tomatoes for authentic tang."],
    })
  );

  recipes.push(
    R({
      id: "tamatar-chokha",
      name: "Tamatar Chokha",
      nameHi: "टमाटर चोखा",
      aliases: ["Tomato Chokha"],
      region: ["Purvanchal", "Bihar", "Jaunpur"],
      categories: ["Lunch", "Dinner", "Purvanchal Special", "Breakfast"],
      mainIngredients: ["tomato"],
      ingredients: [
        { name: "Tomatoes", quantity: 4, unit: "medium", ingredientId: "tomato" },
        { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Garlic", quantity: 3, unit: "cloves", ingredientId: "garlic" },
        { name: "Mustard oil", quantity: 1, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 5,
      cookTime: 15,
      steps: [
        "Roast tomatoes on flame until charred and soft. Peel.",
        "Mash with onion, garlic, chilli, salt and mustard oil.",
        "Serve with litti or rice.",
        "No cooking in pan needed after roasting.",
        "Smoky flavour is key.",
      ],
      tips: ["Flame roast for authentic taste."],
    })
  );

  recipes.push(
    R({
      id: "mix-chokha",
      name: "Mix Chokha",
      nameHi: "मिक्स चोखा",
      aliases: ["Aloo Baingan Tamatar Chokha"],
      region: ["Purvanchal", "Bihar", "Jaunpur"],
      categories: ["Lunch", "Dinner", "Purvanchal Special"],
      mainIngredients: ["potato", "eggplant", "tomato"],
      ingredients: [
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Baingan", quantity: 1, unit: "large", ingredientId: "eggplant" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Garlic", quantity: 5, unit: "cloves", ingredientId: "garlic" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 30,
      steps: [
        "Flame-roast baingan, tomato and boil/roast potato.",
        "Peel and mash all together with onion, garlic, chilli, salt and mustard oil.",
        "Mix vigorously.",
        "Serve as a trio chokha plate with litti or sattu paratha.",
        "Adjust mustard oil to taste.",
      ],
      tips: ["Each vegetable can also be served separately."],
    })
  );

  recipes.push(
    R({
      id: "sattu-drink-namkeen",
      name: "Sattu Drink – Namkeen",
      nameHi: "नमकीन सत्तू शरबत",
      aliases: ["Sattu Sharbat Salted", "Satto Drink"],
      region: ["Purvanchal", "Bihar", "Jaunpur"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["sattu"],
      ingredients: [
        { name: "Sattu", quantity: 4, unit: "tbsp", ingredientId: "sattu" },
        { name: "Cold water", quantity: 2, unit: "cups", ingredientId: null },
        { name: "Mustard oil", quantity: 0.5, unit: "tsp", ingredientId: "mustard-oil" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
        { name: "Roasted cumin powder", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
        { name: "Black salt / salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
        { name: "Chopped onion & chilli optional", quantity: 1, unit: "tbsp", ingredientId: "onion" },
      ],
      prepTime: 5,
      cookTime: 0,
      servings: 2,
      steps: [
        "Add sattu to a glass; slowly mix with a little water to make a lump-free paste.",
        "Add remaining cold water, salt, cumin, lemon and a drop of mustard oil.",
        "Optional: onion and green chilli for Jaunpur-style punch.",
        "Stir well and drink immediately.",
        "Cooling summer staple across Purvanchal.",
      ],
      tips: ["Mix paste first to avoid lumps."],
      season: ["Summer"],
    })
  );

  recipes.push(
    R({
      id: "sattu-drink-sweet",
      name: "Sattu Drink – Sweet",
      nameHi: "मीठा सत्तू शरबत",
      aliases: ["Sweet Sattu Sharbat"],
      region: ["Purvanchal", "Bihar"],
      categories: ["Breakfast", "Purvanchal Special", "Sweets"],
      mainIngredients: ["sattu"],
      ingredients: [
        { name: "Sattu", quantity: 4, unit: "tbsp", ingredientId: "sattu" },
        { name: "Cold water or milk", quantity: 2, unit: "cups", ingredientId: "milk" },
        { name: "Jaggery or sugar", quantity: 2, unit: "tbsp", ingredientId: "jaggery" },
        { name: "Cardamom optional", quantity: 1, unit: "pinch", ingredientId: "cardamom" },
      ],
      prepTime: 5,
      cookTime: 0,
      servings: 2,
      steps: [
        "Make a smooth sattu paste with little liquid.",
        "Add water or milk and dissolve jaggery/sugar.",
        "Add cardamom if using.",
        "Serve chilled.",
        "Energy drink for hot afternoons.",
      ],
      tips: ["Milk version is richer; water is lighter."],
      season: ["Summer"],
    })
  );

  recipes.push(
    R({
      id: "bedmi-puri-aloo",
      name: "Bedmi Puri with Aloo Sabzi",
      nameHi: "बेडमी पूरी आलू सब्ज़ी",
      aliases: ["Bedmi Aloo Plate"],
      region: ["Purvanchal", "Banaras", "Uttar Pradesh"],
      categories: ["Breakfast", "Purvanchal Special"],
      mainIngredients: ["urad-dal", "potato", "wheat-flour"],
      ingredients: [
        { name: "Bedmi puris", quantity: 8, unit: "pieces", ingredientId: "urad-dal" },
        { name: "Aloo tamatar rasedar", quantity: 3, unit: "cups", ingredientId: "potato" },
      ],
      prepTime: 40,
      cookTime: 40,
      difficulty: "Medium",
      steps: [
        "Prepare bedmi puri as in Bedmi Puri recipe.",
        "Prepare aloo tamatar rasedar sabzi.",
        "Serve hot puris with a bowl of spicy aloo.",
        "Add pickle and fried green chilli on the side.",
        "Iconic Purvanchal breakfast plate.",
      ],
      tips: ["Fry puris fresh and serve immediately."],
    })
  );

  recipes.push(
    R({
      id: "puri-kaddu-sabzi",
      name: "Puri with Kaddu Sabzi",
      nameHi: "पूरी कद्दू सब्ज़ी",
      aliases: ["Puri Kaddu"],
      region: ["Purvanchal", "Uttar Pradesh"],
      categories: ["Breakfast", "Lunch", "Purvanchal Special"],
      mainIngredients: ["wheat-flour", "pumpkin"],
      ingredients: [
        { name: "Wheat flour for puri", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Kaddu sabzi", quantity: 3, unit: "cups", ingredientId: "pumpkin" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 25,
      cookTime: 35,
      steps: [
        "Knead firm dough; roll and deep fry puris until puffed.",
        "Prepare UP-style kaddu sabzi (sweet-tangy).",
        "Serve puris with kaddu.",
        "Common festive and Sunday breakfast in Jaunpur homes.",
        "Eat hot.",
      ],
      tips: ["Kaddu should be soft and lightly mashed."],
    })
  );

  return recipes;
}

module.exports = { buildPart7 };
