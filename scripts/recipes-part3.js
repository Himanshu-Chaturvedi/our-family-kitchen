const { R, sabzi, paneerGravy, dalRecipe, spiceBase } = require("./generate-data");

function buildPart3() {
  const recipes = [];

  // ===== OTHER BREAKFAST =====
  const breakfasts = [
    {
      id: "vegetable-poha",
      name: "Vegetable Poha",
      nameHi: "वेजिटेबल पोहा",
      aliases: ["Poha", "Kande Pohe veg"],
      region: ["Maharashtra", "North India"],
      categories: ["Breakfast"],
      mainIngredients: ["poha"],
      ingredients: [
        { name: "Thick poha", quantity: 2, unit: "cups", ingredientId: "poha" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Potato, cubed", quantity: 1, unit: "small", ingredientId: "potato" },
        { name: "Peanuts", quantity: 2, unit: "tbsp", ingredientId: "peanuts" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 8, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Sugar", quantity: 0.5, unit: "tsp", ingredientId: "sugar" },
      ],
      prepTime: 10,
      cookTime: 15,
      steps: [
        "Rinse poha in a colander, drain and fluff. Sprinkle salt, turmeric and sugar; rest 5 minutes.",
        "Heat oil, add mustard seeds, curry leaves and peanuts; roast peanuts lightly.",
        "Add onion and potato; cook until potato is soft.",
        "Add poha, mix gently on low flame 2–3 minutes.",
        "Finish with lemon juice and coriander. Serve hot.",
      ],
      tips: ["Do not soak poha in water or it turns mushy."],
    },
    {
      id: "kanda-poha",
      name: "Kanda Poha",
      nameHi: "कांदा पोहा",
      aliases: ["Onion Poha", "Maharashtrian Poha"],
      region: ["Maharashtra"],
      categories: ["Breakfast"],
      mainIngredients: ["poha", "onion"],
      ingredients: [
        { name: "Thick poha", quantity: 2, unit: "cups", ingredientId: "poha" },
        { name: "Onion, sliced", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Peanuts", quantity: 3, unit: "tbsp", ingredientId: "peanuts" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 10, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Sugar", quantity: 1, unit: "tsp", ingredientId: "sugar" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
      ],
      prepTime: 10,
      cookTime: 12,
      steps: [
        "Rinse and drain poha; season with salt, turmeric and sugar.",
        "Temper mustard, curry leaves, peanuts and lots of onion until soft and sweet.",
        "Add green chilli, then poha. Mix gently.",
        "Cover 1 minute on low flame.",
        "Serve with lemon, coriander and optionally sev.",
      ],
      tips: ["Onion-forward is the hallmark of kanda poha."],
    },
    {
      id: "indori-poha",
      name: "Indori Poha",
      nameHi: "इंदौरी पोहा",
      aliases: ["Indore Poha"],
      region: ["Madhya Pradesh", "Indore"],
      categories: ["Breakfast"],
      mainIngredients: ["poha"],
      ingredients: [
        { name: "Thick poha", quantity: 2, unit: "cups", ingredientId: "poha" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Jeeravan masala or garam masala", quantity: 1, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Sev", quantity: 0.5, unit: "cup", ingredientId: "sev" },
        { name: "Pomegranate (optional)", quantity: 2, unit: "tbsp", ingredientId: null },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Sugar", quantity: 1, unit: "tsp", ingredientId: "sugar" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
      ],
      prepTime: 10,
      cookTime: 12,
      steps: [
        "Prepare seasoned poha as usual with onion tempering.",
        "Sprinkle jeeravan or garam masala while mixing.",
        "Plate poha, top generously with nylon sev.",
        "Add chopped onion, coriander, lemon and pomegranate if available.",
        "Serve immediately so sev stays crisp.",
      ],
      tips: ["Sev on top is essential for Indori style."],
    },
  ];
  breakfasts.forEach((b) => recipes.push(R(b)));

  recipes.push(
    R({
      id: "vegetable-upma",
      name: "Vegetable Upma",
      nameHi: "वेजिटेबल उपमा",
      aliases: ["Suji Upma", "Uppittu"],
      region: ["South India", "North India"],
      categories: ["Breakfast"],
      mainIngredients: ["suji"],
      ingredients: [
        { name: "Suji (rava)", quantity: 1, unit: "cup", ingredientId: "suji" },
        { name: "Mixed vegetables (carrot, beans, peas)", quantity: 1, unit: "cup", ingredientId: "carrot" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 8, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Water", quantity: 2.5, unit: "cups", ingredientId: null },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 20,
      steps: [
        "Dry roast suji on medium flame until aromatic; keep aside.",
        "Temper mustard, curry leaves, chilli and onion. Add vegetables; sauté 3 minutes.",
        "Add water and salt; bring to a boil.",
        "Lower flame, add roasted suji gradually while stirring to avoid lumps.",
        "Cover 2 minutes. Fluff and serve with coconut chutney or lemon.",
      ],
      tips: ["Roasting suji prevents raw taste and stickiness."],
    })
  );

  recipes.push(
    R({
      id: "vermicelli-upma",
      name: "Vermicelli Upma",
      nameHi: "सेवई उपमा",
      aliases: ["Semiya Upma", "Seviyan Upma"],
      region: ["South India", "North India"],
      categories: ["Breakfast"],
      mainIngredients: ["vermicelli"],
      ingredients: [
        { name: "Vermicelli", quantity: 1.5, unit: "cups", ingredientId: "vermicelli" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Carrot & beans", quantity: 0.75, unit: "cup", ingredientId: "carrot" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 8, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Water", quantity: 2, unit: "cups", ingredientId: null },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 15,
      steps: [
        "Roast vermicelli in a spoon of oil until light golden.",
        "Temper spices and sauté onion with vegetables.",
        "Add water and salt; bring to boil.",
        "Add vermicelli, cook on low until water is absorbed and strands are soft.",
        "Serve hot with coconut chutney.",
      ],
      tips: ["Use slightly less water than suji upma."],
    })
  );

  function chilla(id, name, nameHi, batterIng, main, steps, extras = {}) {
    return R({
      id,
      name,
      nameHi,
      aliases: extras.aliases || [],
      region: extras.region || ["North India"],
      categories: ["Breakfast", "Evening Snacks"],
      mainIngredients: main,
      ingredients: batterIng,
      prepTime: extras.prepTime || 15,
      cookTime: extras.cookTime || 20,
      steps,
      tips: extras.tips || ["Spread thin for crisp edges."],
      season: extras.season || ["All"],
    });
  }

  recipes.push(
    chilla(
      "besan-chilla",
      "Besan Chilla",
      "बेसन चीला",
      [
        { name: "Besan", quantity: 1.5, unit: "cups", ingredientId: "besan" },
        { name: "Onion, chopped", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Tomato, chopped", quantity: 1, unit: "small", ingredientId: "tomato" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Turmeric", quantity: 0.25, unit: "tsp", ingredientId: "turmeric" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Water", quantity: 1.25, unit: "cups", ingredientId: null },
      ],
      ["besan"],
      [
        "Whisk besan with water to a lump-free batter of pouring consistency.",
        "Add onion, tomato, chilli, ajwain, turmeric and salt.",
        "Heat a tawa, grease lightly, pour a ladle and spread into a thin circle.",
        "Drizzle oil, cook both sides until golden and cooked in the centre.",
        "Serve with green chutney or tomato ketchup.",
      ],
      { aliases: ["Besan Cheela", "Gram Flour Pancake"] }
    )
  );

  recipes.push(
    chilla(
      "moong-dal-cheela",
      "Moong Dal Cheela",
      "मूंग दाल चीला",
      [
        { name: "Moong dal, soaked 3 hours", quantity: 1.5, unit: "cups", ingredientId: "moong-dal" },
        { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Cumin seeds", quantity: 0.5, unit: "tsp", ingredientId: "cumin" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      ["moong-dal"],
      [
        "Grind soaked moong dal with ginger, chilli and cumin to a slightly coarse batter. Add salt.",
        "Heat non-stick or well-seasoned tawa. Pour and spread medium-thick cheela.",
        "Cook both sides with little oil until light brown spots appear.",
        "Optionally sprinkle chopped onion or paneer on top while cooking.",
        "Serve with mint chutney.",
      ],
      { aliases: ["Moong Cheela", "Green Gram Pancake"], tips: ["Do not make batter too watery."] }
    )
  );

  recipes.push(
    chilla(
      "paneer-chilla",
      "Paneer Chilla",
      "पनीर चीला",
      [
        { name: "Besan", quantity: 1, unit: "cup", ingredientId: "besan" },
        { name: "Grated paneer", quantity: 0.75, unit: "cup", ingredientId: "paneer" },
        { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Water", quantity: 1, unit: "cup", ingredientId: null },
      ],
      ["besan", "paneer"],
      [
        "Make besan batter. Mix in grated paneer, onion, chilli and salt.",
        "Spread on hot tawa and cook both sides with oil until golden.",
        "Press gently so paneer cooks into the chilla.",
        "Cut into wedges if large.",
        "Serve hot with chutney.",
      ],
      { aliases: ["Cottage Cheese Chilla"] }
    )
  );

  recipes.push(
    chilla(
      "suji-chilla",
      "Suji Chilla",
      "सूजी चीला",
      [
        { name: "Suji", quantity: 1, unit: "cup", ingredientId: "suji" },
        { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
        { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Carrot, grated", quantity: 0.25, unit: "cup", ingredientId: "carrot" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Water", quantity: 0.5, unit: "cup", ingredientId: null },
      ],
      ["suji"],
      [
        "Mix suji, curd and water; rest 15 minutes so suji softens.",
        "Add vegetables, chilli and salt.",
        "Spread on greased tawa; cook both sides until crisp.",
        "Serve immediately.",
        "Batter thickens on standing — loosen with a spoon of water if needed.",
      ],
      { aliases: ["Rava Chilla"] }
    )
  );

  // South Indian breakfast
  recipes.push(
    R({
      id: "idli-sambhar",
      name: "Idli Sambhar",
      nameHi: "इडली सांभर",
      aliases: ["Idli Sambar"],
      region: ["South India"],
      categories: ["Breakfast"],
      mainIngredients: ["idli-rice", "urad-dal", "toor-dal"],
      ingredients: [
        { name: "Idli batter (rice + urad)", quantity: 4, unit: "cups", ingredientId: "idli-rice" },
        { name: "Toor dal", quantity: 0.75, unit: "cup", ingredientId: "toor-dal" },
        { name: "Tamarind", quantity: 1, unit: "lemon-sized", ingredientId: "tamarind" },
        { name: "Sambar onions / onion", quantity: 10, unit: "pieces", ingredientId: "onion" },
        { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" },
        { name: "Sambar powder", quantity: 2, unit: "tbsp", ingredientId: "coriander-powder" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 10, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 2, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 35,
      difficulty: "Medium",
      steps: [
        "Grease idli moulds, pour fermented batter and steam 10–12 minutes until a toothpick comes out clean.",
        "Pressure cook toor dal until soft. Mash lightly.",
        "In a pot, sauté onion and tomato, add sambar powder, tamarind water and salt. Boil 5 minutes.",
        "Add dal and simmer. Temper mustard seeds and curry leaves in oil; pour over sambar.",
        "Serve soft idlis with hot sambar and coconut chutney.",
      ],
      tips: ["Use well-fermented batter for soft idlis."],
    })
  );

  recipes.push(
    R({
      id: "masala-dosa",
      name: "Masala Dosa",
      nameHi: "मसाला डोसा",
      aliases: ["Masale Dosa"],
      region: ["South India", "Karnataka"],
      categories: ["Breakfast"],
      mainIngredients: ["idli-rice", "potato"],
      ingredients: [
        { name: "Dosa batter", quantity: 3, unit: "cups", ingredientId: "idli-rice" },
        { name: "Boiled potatoes", quantity: 4, unit: "medium", ingredientId: "potato" },
        { name: "Onion, sliced", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 10, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Turmeric", quantity: 0.5, unit: "tsp", ingredientId: "turmeric" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Oil", quantity: 4, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 25,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Prepare potato masala: temper mustard and curry leaves, sauté onion and chilli, add turmeric and mashed potato with salt.",
        "Heat a flat tawa. Spread dosa batter thinly in a circle. Drizzle oil.",
        "When the underside is golden, place potato masala in the centre.",
        "Fold the dosa and roast a few more seconds.",
        "Serve with coconut chutney and sambar.",
      ],
      tips: ["Tawa must be hot, then slightly cooled before spreading batter."],
    })
  );

  recipes.push(
    R({
      id: "plain-dosa",
      name: "Plain Dosa",
      nameHi: "सादा डोसा",
      aliases: ["Sada Dosa", "Dosa"],
      region: ["South India"],
      categories: ["Breakfast"],
      mainIngredients: ["idli-rice", "urad-dal"],
      ingredients: [
        { name: "Dosa batter", quantity: 3, unit: "cups", ingredientId: "idli-rice" },
        { name: "Oil or ghee", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 5,
      cookTime: 20,
      steps: [
        "Stir fermented batter; adjust salt and a splash of water if thick.",
        "Heat tawa, spread thin dosa, drizzle oil on edges.",
        "Cook until crisp and golden; flip briefly if needed.",
        "Fold and serve hot.",
        "Pair with chutney and sambar.",
      ],
      tips: ["For crisp dosa, batter should be slightly thin."],
    })
  );

  recipes.push(
    R({
      id: "rava-dosa",
      name: "Rava Dosa",
      nameHi: "रवा डोसा",
      aliases: ["Suji Dosa", "Crispy Rava Dosa"],
      region: ["South India"],
      categories: ["Breakfast"],
      mainIngredients: ["suji", "rice"],
      ingredients: [
        { name: "Suji", quantity: 1, unit: "cup", ingredientId: "suji" },
        { name: "Rice flour", quantity: 0.5, unit: "cup", ingredientId: "rice" },
        { name: "Maida", quantity: 0.25, unit: "cup", ingredientId: "maida" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Onion, chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Oil", quantity: 4, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Water", quantity: 3, unit: "cups", ingredientId: null },
      ],
      prepTime: 20,
      cookTime: 25,
      steps: [
        "Mix suji, rice flour, maida, cumin, chilli, onion, salt and water into a thin watery batter. Rest 20 minutes.",
        "Heat tawa very hot. Pour batter from height in a lace pattern — do not spread with ladle.",
        "Drizzle oil in the holes; cook until crisp and golden.",
        "Fold and serve immediately.",
        "Stir batter each time before pouring.",
      ],
      tips: ["Batter must be thin for the classic lace texture."],
    })
  );

  recipes.push(
    R({
      id: "uttapam",
      name: "Uttapam",
      nameHi: "उत्तपम",
      aliases: ["Uthappam", "Onion Uttapam"],
      region: ["South India"],
      categories: ["Breakfast"],
      mainIngredients: ["idli-rice", "onion"],
      ingredients: [
        { name: "Idli/dosa batter", quantity: 2, unit: "cups", ingredientId: "idli-rice" },
        { name: "Onion, chopped", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Tomato, chopped", quantity: 1, unit: "small", ingredientId: "tomato" },
        { name: "Green chilli", quantity: 1, unit: "piece", ingredientId: "green-chilli" },
        { name: "Coriander", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 20,
      steps: [
        "Pour a thick circle of batter on a medium-hot tawa — thicker than dosa.",
        "Sprinkle onion, tomato, chilli and coriander on top; press lightly.",
        "Drizzle oil around edges. Cook until base is golden.",
        "Flip carefully and cook the topped side 1–2 minutes.",
        "Serve with sambar and chutney.",
      ],
      tips: ["Medium flame keeps the centre cooked without burning."],
    })
  );

  recipes.push(
    R({
      id: "appe",
      name: "Appe",
      nameHi: "आप्पे",
      aliases: ["Paniyaram", "Paddu", "Guliappa"],
      region: ["South India", "Maharashtra"],
      categories: ["Breakfast", "Evening Snacks"],
      mainIngredients: ["idli-rice"],
      ingredients: [
        { name: "Idli batter", quantity: 2, unit: "cups", ingredientId: "idli-rice" },
        { name: "Onion, finely chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Carrot, grated", quantity: 0.25, unit: "cup", ingredientId: "carrot" },
        { name: "Mustard seeds", quantity: 0.5, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 6, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 20,
      steps: [
        "Mix vegetables and tempering into idli batter.",
        "Heat appe mould, add few drops oil in each cavity.",
        "Pour batter three-quarters full. Cover and cook 2–3 minutes.",
        "Flip each appe with a skewer; cook until golden on both sides.",
        "Serve with coconut chutney.",
      ],
      tips: ["Appe mould must be well heated before pouring."],
    })
  );

  recipes.push(
    R({
      id: "dhokla",
      name: "Dhokla",
      nameHi: "ढोकला",
      aliases: ["Khaman Dhokla", "Besan Dhokla"],
      region: ["Gujarat"],
      categories: ["Breakfast", "Evening Snacks"],
      mainIngredients: ["besan"],
      ingredients: [
        { name: "Besan", quantity: 1.5, unit: "cups", ingredientId: "besan" },
        { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
        { name: "Eno / fruit salt", quantity: 1, unit: "tsp", ingredientId: null },
        { name: "Turmeric", quantity: 0.25, unit: "tsp", ingredientId: "turmeric" },
        { name: "Green chilli-ginger paste", quantity: 1, unit: "tsp", ingredientId: "ginger" },
        { name: "Sugar", quantity: 1, unit: "tsp", ingredientId: "sugar" },
        { name: "Lemon", quantity: 1, unit: "tsp", ingredientId: "lemon" },
        { name: "Mustard seeds", quantity: 1, unit: "tsp", ingredientId: "mustard-seeds" },
        { name: "Curry leaves", quantity: 8, unit: "leaves", ingredientId: "curry-leaves" },
        { name: "Oil", quantity: 2, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Water", quantity: 0.75, unit: "cup", ingredientId: null },
      ],
      prepTime: 15,
      cookTime: 25,
      steps: [
        "Whisk besan, curd, water, turmeric, chilli-ginger, sugar, lemon and salt into a smooth batter.",
        "Add Eno, mix briefly until frothy. Pour into a greased steamer tray immediately.",
        "Steam 15–18 minutes until a knife comes out clean. Cool slightly and cut squares.",
        "Temper mustard seeds, curry leaves and slit chilli in oil; add a little water and sugar, pour over dhokla.",
        "Garnish with coriander and serve.",
      ],
      tips: ["Add Eno only just before steaming."],
    })
  );

  recipes.push(
    R({
      id: "vegetable-daliya",
      name: "Vegetable Daliya",
      nameHi: "वेजिटेबल दलिया",
      aliases: ["Broken Wheat Porridge", "Dalia"],
      region: ["North India"],
      categories: ["Breakfast"],
      mainIngredients: ["daliya"],
      ingredients: [
        { name: "Daliya (broken wheat)", quantity: 1, unit: "cup", ingredientId: "daliya" },
        { name: "Mixed vegetables", quantity: 1, unit: "cup", ingredientId: "carrot" },
        { name: "Onion", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Tomato", quantity: 1, unit: "small", ingredientId: "tomato" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Ghee", quantity: 1, unit: "tbsp", ingredientId: "ghee" },
        { name: "Water", quantity: 3, unit: "cups", ingredientId: null },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 25,
      steps: [
        "Dry roast daliya until aromatic.",
        "In a pressure cooker, heat ghee, add cumin, onion, tomato and vegetables.",
        "Add daliya, water and salt. Pressure cook 3 whistles.",
        "Rest 5 minutes, open and fluff.",
        "Serve with curd or pickle.",
      ],
      tips: ["For softer daliya use more water."],
    })
  );

  recipes.push(
    R({
      id: "paneer-sandwich",
      name: "Paneer Sandwich",
      nameHi: "पनीर सैंडविच",
      aliases: ["Cottage Cheese Sandwich"],
      region: ["North India"],
      categories: ["Breakfast", "Evening Snacks"],
      mainIngredients: ["paneer", "bread"],
      ingredients: [
        { name: "Bread slices", quantity: 8, unit: "slices", ingredientId: "bread" },
        { name: "Grated paneer", quantity: 1, unit: "cup", ingredientId: "paneer" },
        { name: "Capsicum, chopped", quantity: 0.5, unit: "cup", ingredientId: "capsicum" },
        { name: "Onion, chopped", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Chaat masala", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
        { name: "Butter", quantity: 2, unit: "tbsp", ingredientId: "butter" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 10,
      steps: [
        "Mix paneer, capsicum, onion, chaat masala and salt.",
        "Butter bread slices, spread filling, close sandwich.",
        "Toast on a sandwich maker or tawa until golden.",
        "Cut diagonally and serve hot.",
        "Optional: add green chutney inside.",
      ],
      tips: ["Do not overfill or filling spills while toasting."],
    })
  );

  recipes.push(
    R({
      id: "vegetable-sandwich",
      name: "Vegetable Sandwich",
      nameHi: "वेजिटेबल सैंडविच",
      aliases: ["Bombay Sandwich"],
      region: ["Maharashtra", "North India"],
      categories: ["Breakfast", "Evening Snacks"],
      mainIngredients: ["bread", "potato"],
      ingredients: [
        { name: "Bread slices", quantity: 8, unit: "slices", ingredientId: "bread" },
        { name: "Boiled potato, sliced", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Cucumber / tomato slices", quantity: 1, unit: "medium", ingredientId: "tomato" },
        { name: "Onion slices", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Green chutney", quantity: 4, unit: "tbsp", ingredientId: "chutney" },
        { name: "Butter", quantity: 2, unit: "tbsp", ingredientId: "butter" },
        { name: "Chaat masala", quantity: 0.5, unit: "tsp", ingredientId: "amchur" },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 5,
      steps: [
        "Butter bread and spread green chutney on both slices.",
        "Layer potato, onion, tomato; sprinkle chaat masala and salt.",
        "Close sandwich; toast lightly or serve fresh Bombay style.",
        "Cut into triangles.",
        "Serve with ketchup.",
      ],
      tips: ["Boil potatoes in advance for quick assembly."],
    })
  );

  // ===== PANEER CURRIES =====
  const paneerDishes = [
    {
      id: "shahi-paneer",
      name: "Shahi Paneer",
      nameHi: "शाही पनीर",
      aliases: ["Royal Paneer"],
      steps: [
        "Soak cashews 15 minutes; grind with tomato into a smooth paste (or boil onion-tomato and blend).",
        "Heat butter/ghee, add whole spices (bay, cardamom). Sauté paste until oil separates.",
        "Add chilli powder, salt and a little water; simmer into a rich gravy.",
        "Add paneer cubes and cream. Simmer 5 minutes on low — do not boil hard.",
        "Finish with garam masala and kasuri methi. Serve with naan or roti.",
      ],
      tips: ["White/shahi gravy uses more cashew and less red chilli for a milder look."],
      extraIngredients: [{ name: "Cardamom", quantity: 2, unit: "pods", ingredientId: "cardamom" }],
    },
    {
      id: "matar-paneer",
      name: "Matar Paneer",
      nameHi: "मटर पनीर",
      aliases: ["Mutter Paneer", "Peas Paneer"],
      mainIngredients: ["paneer", "green-peas"],
      season: ["Winter", "All"],
      extraIngredients: [{ name: "Green peas", quantity: 1.5, unit: "cups", ingredientId: "green-peas" }],
      steps: [
        "Make onion-tomato masala with ginger-garlic until oil separates.",
        "Add spices and peas; sauté 2 minutes. Add water and cook peas until soft.",
        "Add paneer cubes and simmer 5–7 minutes.",
        "Finish with garam masala and coriander.",
        "Serve with roti, paratha or jeera rice.",
      ],
    },
    {
      id: "palak-paneer",
      name: "Palak Paneer",
      nameHi: "पालक पनीर",
      aliases: ["Spinach Paneer"],
      mainIngredients: ["paneer", "spinach"],
      extraIngredients: [{ name: "Spinach", quantity: 1, unit: "bunch", ingredientId: "spinach" }],
      steps: [
        "Blanch spinach 2 minutes in boiling water, cool in ice water, grind to a smooth puree.",
        "Sauté onion, ginger-garlic and tomato; add spices.",
        "Add spinach puree and simmer 5 minutes. Adjust salt.",
        "Add paneer cubes; cook 4–5 minutes on low.",
        "Optional: swirl cream. Serve with roti or jeera rice.",
      ],
      tips: ["Blanching keeps the palak bright green."],
    },
    {
      id: "paneer-butter-masala",
      name: "Paneer Butter Masala",
      nameHi: "पनीर बटर मसाला",
      aliases: ["PBM", "Butter Paneer"],
      steps: [
        "Blend boiled tomatoes with cashews into a smooth puree; strain if desired.",
        "Heat butter, add cumin, then puree. Cook until thick and glossy with spices.",
        "Add salt, sugar pinch, chilli powder and kasuri methi.",
        "Add paneer and cream; simmer gently 5 minutes.",
        "Finish with a dollop of butter. Serve with naan or jeera rice.",
      ],
      tips: ["A pinch of sugar balances tomato tang."],
    },
    {
      id: "kadai-paneer",
      name: "Kadai Paneer",
      nameHi: "कड़ाही पनीर",
      aliases: ["Karahi Paneer"],
      mainIngredients: ["paneer", "capsicum"],
      extraIngredients: [
        { name: "Capsicum, cubed", quantity: 2, unit: "medium", ingredientId: "capsicum" },
        { name: "Coarsely crushed coriander seeds", quantity: 1, unit: "tbsp", ingredientId: "coriander-powder" },
      ],
      steps: [
        "Dry roast coriander seeds and red chillies; crush coarsely for kadai masala.",
        "Sauté onion petals and capsicum on high flame; keep slightly crunchy. Remove.",
        "In same pan make onion-tomato gravy; add kadai masala and spices.",
        "Add paneer, capsicum and onion; toss on high flame 3–4 minutes.",
        "Finish with garam masala and ginger juliennes.",
      ],
      tips: ["High flame toss keeps capsicum crisp."],
    },
  ];

  paneerDishes.forEach((p) => {
    recipes.push(
      paneerGravy(p.id, p.name, p.nameHi, {
        aliases: p.aliases,
        mainIngredients: p.mainIngredients,
        extraIngredients: p.extraIngredients,
        steps: p.steps,
        tips: p.tips,
        season: p.season,
      })
    );
  });

  recipes.push(
    paneerGravy("paneer-bhurji", "Paneer Bhurji", "पनीर भुर्जी", {
      aliases: ["Scrambled Paneer"],
      difficulty: "Easy",
      cookTime: 20,
      steps: [
        "Crumble paneer with hands.",
        "Heat oil, add cumin, onion and green chilli; sauté until translucent.",
        "Add tomato and spices; cook until soft.",
        "Add crumbled paneer, mix on medium flame 3–4 minutes. Do not overcook.",
        "Garnish with coriander. Serve with pav, roti or as sandwich filling.",
      ],
      tips: ["Overcooking makes bhurji rubbery."],
    })
  );

  recipes.push(
    paneerGravy("paneer-do-pyaza", "Paneer Do Pyaza", "पनीर दो प्याज़ा", {
      aliases: ["Paneer Dopyaza"],
      extraIngredients: [{ name: "Extra onions (petals + sliced)", quantity: 3, unit: "large", ingredientId: "onion" }],
      steps: [
        "Separate onion into petals; sauté on high flame and keep aside.",
        "Make a tomato-onion gravy with spices.",
        "Add paneer and the sautéed onion petals.",
        "Simmer 5 minutes so onions stay chunky (do pyaza style).",
        "Finish with garam masala and coriander.",
      ],
    })
  );

  recipes.push(
    paneerGravy("paneer-lababdar", "Paneer Lababdar", "पनीर लबाबदार", {
      aliases: ["Lababdar Paneer"],
      steps: [
        "Prepare a rich onion-tomato-cashew gravy; blend smooth.",
        "Cook gravy with butter until oil separates; add spices and kasuri methi.",
        "Add paneer cubes and a little cream; simmer gently.",
        "Optionally add grated paneer into gravy for texture.",
        "Serve with butter naan or laccha paratha.",
      ],
    })
  );

  recipes.push(
    paneerGravy("achari-paneer", "Achari Paneer", "अचारी पनीर", {
      aliases: ["Pickle Spice Paneer"],
      extraIngredients: [
        { name: "Pickle masala / mustard-fennel-nigella mix", quantity: 1.5, unit: "tbsp", ingredientId: "pickle-masala" },
        { name: "Mustard oil", quantity: 2, unit: "tbsp", ingredientId: "mustard-oil" },
      ],
      steps: [
        "Heat mustard oil to smoking point, cool slightly. Add achari spices.",
        "Sauté onion and tomato; add pickle masala and regular spices.",
        "Add paneer and a splash of water; coat well and simmer 5 minutes.",
        "Finish with coriander and lemon.",
        "Serve with missi roti or plain roti.",
      ],
      tips: ["Mustard oil gives authentic achari aroma."],
      region: ["North India", "Punjab", "Uttar Pradesh"],
    })
  );

  recipes.push(
    paneerGravy("methi-paneer", "Methi Paneer", "मेथी पनीर", {
      aliases: ["Fenugreek Paneer"],
      mainIngredients: ["paneer", "methi"],
      season: ["Winter"],
      extraIngredients: [{ name: "Fresh methi leaves", quantity: 1.5, unit: "cups", ingredientId: "methi" }],
      steps: [
        "Wash methi, chop, and sauté 3–4 minutes until wilted and aroma mellows.",
        "Make onion-tomato gravy separately.",
        "Combine methi and gravy; simmer 3 minutes.",
        "Add paneer cubes; cook 5 minutes on low.",
        "Serve with roti or paratha.",
      ],
      tips: ["Sauté methi well to reduce bitterness."],
    })
  );

  recipes.push(
    R({
      id: "paneer-kofta",
      name: "Paneer Kofta",
      nameHi: "पनीर कोफ्ता",
      aliases: ["Malai Kofta Paneer"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["paneer", "potato"],
      ingredients: [
        { name: "Paneer, grated", quantity: 200, unit: "g", ingredientId: "paneer" },
        { name: "Boiled potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Cornflour or besan", quantity: 2, unit: "tbsp", ingredientId: "besan" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
        { name: "Cashews", quantity: 10, unit: "pieces", ingredientId: "cashew" },
        { name: "Cream", quantity: 2, unit: "tbsp", ingredientId: "cream" },
        { name: "Oil for frying", quantity: 1.5, unit: "cups", ingredientId: "oil" },
        ...spiceBase(),
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      prepTime: 30,
      cookTime: 40,
      difficulty: "Medium",
      steps: [
        "Mash paneer and potato with salt, chilli and cornflour. Shape into smooth koftas.",
        "Deep fry or shallow fry until golden. Keep aside.",
        "Prepare smooth onion-tomato-cashew gravy; cook with spices until rich.",
        "Add cream. Just before serving, place koftas in gravy (do not boil long or they break).",
        "Garnish with cream and coriander. Serve with naan.",
      ],
      tips: ["Add koftas only at serving time."],
    })
  );

  recipes.push(
    paneerGravy("paneer-capsicum", "Paneer Capsicum", "पनीर शिमला मिर्च", {
      aliases: ["Paneer Shimla Mirch"],
      mainIngredients: ["paneer", "capsicum"],
      extraIngredients: [{ name: "Capsicum, cubed", quantity: 2, unit: "medium", ingredientId: "capsicum" }],
      steps: [
        "Sauté capsicum on high flame; keep crisp. Keep aside.",
        "Make a semi-dry onion-tomato masala with spices.",
        "Add paneer and capsicum; toss 4–5 minutes.",
        "Finish with amchur and garam masala.",
        "Serve as a dry sabzi with roti.",
      ],
    })
  );

  recipes.push(
    paneerGravy("paneer-jalfrezi", "Paneer Jalfrezi", "पनीर झलफ़्रेज़ी", {
      aliases: ["Jalfrezi Paneer"],
      mainIngredients: ["paneer", "capsicum"],
      extraIngredients: [
        { name: "Capsicum", quantity: 1, unit: "large", ingredientId: "capsicum" },
        { name: "Carrot, julienned", quantity: 1, unit: "small", ingredientId: "carrot" },
      ],
      steps: [
        "Stir-fry onion, capsicum and carrot on high flame; keep crunchy.",
        "Add tomato and spices for a semi-dry sauce.",
        "Add paneer strips; toss quickly.",
        "Finish with vinegar or lemon and garam masala.",
        "Serve hot with roti or as a side.",
      ],
      tips: ["Jalfrezi is quick-cooked — keep vegetables crisp."],
    })
  );

  recipes.push(
    paneerGravy("paneer-handi", "Paneer Handi", "पनीर हांडी", {
      aliases: ["Handi Paneer"],
      steps: [
        "Prepare a yogurt and onion-tomato based gravy with aromatic spices.",
        "Cook in a heavy-bottomed handi or pot on low flame.",
        "Add paneer and simmer covered 8–10 minutes so flavours infuse.",
        "Finish with cream and kasuri methi.",
        "Serve with naan or rice.",
      ],
    })
  );

  recipes.push(
    paneerGravy("paneer-makhani", "Paneer Makhani", "पनीर मखनी", {
      aliases: ["Makhani Paneer"],
      steps: [
        "Make a smooth tomato-cashew makhani base cooked in butter.",
        "Add Kashmiri chilli for colour, salt and a pinch of sugar.",
        "Add paneer and simmer gently with cream and kasuri methi.",
        "Do not over-boil after adding cream.",
        "Serve with butter naan or jeera rice.",
      ],
      tips: ["Similar to butter masala; makhani leans more tomato-butter forward."],
    })
  );

  recipes.push(
    R({
      id: "paneer-pasanda",
      name: "Paneer Pasanda",
      nameHi: "पनीर पसंदा",
      aliases: ["Stuffed Paneer Pasanda"],
      region: ["North India", "Awadh"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["paneer"],
      ingredients: [
        { name: "Paneer slabs", quantity: 300, unit: "g", ingredientId: "paneer" },
        { name: "Khoya or chopped nuts for stuffing", quantity: 0.5, unit: "cup", ingredientId: "khoya" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
        { name: "Cashews", quantity: 12, unit: "pieces", ingredientId: "cashew" },
        { name: "Cream", quantity: 3, unit: "tbsp", ingredientId: "cream" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        ...spiceBase(),
      ],
      prepTime: 30,
      cookTime: 35,
      difficulty: "Medium",
      steps: [
        "Slice paneer into thick rectangles; slit to make a pocket. Stuff with sweetened khoya/nuts mix; secure with toothpick if needed.",
        "Lightly pan-fry stuffed paneer; keep aside.",
        "Prepare rich onion-tomato-cashew gravy.",
        "Place pasanda pieces in gravy; simmer gently 5 minutes.",
        "Finish with cream and serve with sheermal or naan.",
      ],
      tips: ["Handle stuffed paneer gently so filling does not fall out."],
    })
  );

  recipes.push(
    paneerGravy("paneer-tikka-masala", "Paneer Tikka Masala", "पनीर टिक्का मसाला", {
      aliases: ["Tikka Masala Paneer"],
      extraIngredients: [
        { name: "Hung curd for marinade", quantity: 0.5, unit: "cup", ingredientId: "hung-curd" },
        { name: "Capsicum & onion for tikka", quantity: 1, unit: "cup", ingredientId: "capsicum" },
      ],
      steps: [
        "Marinate paneer cubes in hung curd, chilli, garam masala, salt and oil for 30 minutes. Grill or pan-sear with capsicum and onion.",
        "Prepare a tomato-butter masala gravy separately.",
        "Add grilled paneer tikka pieces into the gravy.",
        "Simmer 3–4 minutes so smoky flavour mixes in.",
        "Serve with naan or pulao.",
      ],
      tips: ["Char the tikka slightly for restaurant-style flavour."],
      difficulty: "Medium",
      cookTime: 40,
    })
  );

  recipes.push(
    paneerGravy("methi-matar-malai", "Methi Matar Malai", "मेथी मटर मलाई", {
      aliases: ["Methi Mutter Malai"],
      mainIngredients: ["methi", "green-peas", "cream"],
      season: ["Winter"],
      extraIngredients: [
        { name: "Fresh methi", quantity: 1, unit: "cup", ingredientId: "methi" },
        { name: "Green peas", quantity: 1.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Fresh cream", quantity: 0.5, unit: "cup", ingredientId: "cream" },
      ],
      steps: [
        "Sauté chopped methi until raw smell goes. Boil peas until soft.",
        "Make a white gravy: sauté onion, cashew, ginger; grind smooth. Cook with little milk.",
        "Add methi, peas, salt and mild spices (go easy on turmeric).",
        "Add cream and simmer 5 minutes on low.",
        "Serve with naan or paratha.",
      ],
      tips: ["Mild, creamy and slightly sweet — avoid heavy red chilli."],
    })
  );

  return recipes;
}

module.exports = { buildPart3 };
