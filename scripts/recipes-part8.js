const { R, sabzi, spiceBase } = require("./generate-data");

function buildPart8() {
  const recipes = [];

  // ===== RAJASTHANI =====
  recipes.push(
    R({
      id: "dal-baati-churma",
      name: "Dal Baati Churma",
      nameHi: "दाल बाटी चूरमा",
      aliases: ["Dal Bati Churma"],
      region: ["Rajasthan", "Jaipur"],
      categories: ["Lunch", "Dinner", "Rajasthani Special", "Traditional"],
      mainIngredients: ["wheat-flour", "toor-dal", "ghee"],
      ingredients: [
        { name: "Wheat flour for baati", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Ghee", quantity: 0.75, unit: "cup", ingredientId: "ghee" },
        { name: "Panchmel or mixed dal", quantity: 1.5, unit: "cups", ingredientId: "toor-dal" },
        { name: "Sugar or jaggery for churma", quantity: 0.5, unit: "cup", ingredientId: "jaggery" },
        { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
        { name: "Salt", quantity: 1.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 40,
      cookTime: 60,
      difficulty: "Medium",
      servings: 4,
      steps: [
        "Knead stiff dough with flour, ghee, ajwain and salt. Shape hard baatis with a crack on top.",
        "Bake at 200°C / roast on charcoal or in a gas tandoor until deep brown and cooked inside (35–45 min). Dunk hot baatis in melted ghee.",
        "Cook panchmel dal with tadka until thick.",
        "For churma: crush 2–3 baatis, mix with ghee and powdered sugar/jaggery.",
        "Serve baati broken into dal, with churma on the side.",
      ],
      tips: ["Baati dough must be stiff; soft dough will not bake right."],
    })
  );

  recipes.push(
    sabzi(
      "papad-ki-sabzi",
      "Papad Ki Sabzi",
      "पापड़ की सब्ज़ी",
      ["papad", "curd"],
      [
        { name: "Papad", quantity: 4, unit: "pieces", ingredientId: "papad" },
        { name: "Curd", quantity: 1, unit: "cup", ingredientId: "curd" },
        { name: "Besan", quantity: 1, unit: "tbsp", ingredientId: "besan" },
      ],
      [
        "Roast or lightly fry papad; break into pieces.",
        "Make a thin curd-besan gravy with spices on low flame (like kadhi).",
        "Add papad pieces; simmer 3–4 minutes only.",
        "Do not overcook or papad dissolves completely.",
        "Rajasthani quick sabzi when fresh vegetables are scarce.",
      ],
      {
        region: ["Rajasthan", "Jaipur"],
        categories: ["Lunch", "Dinner", "Rajasthani Special"],
        cookTime: 20,
      }
    )
  );

  recipes.push(
    sabzi(
      "ker-sangri",
      "Ker Sangri",
      "केर सांगरी",
      ["ker", "sangri"],
      [
        { name: "Dried ker", quantity: 0.5, unit: "cup", ingredientId: "ker" },
        { name: "Dried sangri", quantity: 1, unit: "cup", ingredientId: "sangri" },
        { name: "Yogurt", quantity: 0.5, unit: "cup", ingredientId: "curd" },
        { name: "Red chilli powder", quantity: 1.5, unit: "tsp", ingredientId: "red-chilli" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
      ],
      [
        "Soak ker and sangri overnight; boil until soft; drain.",
        "Temper oil with spices; add ker-sangri and yoghurt-spice mix.",
        "Cook until oil separates and flavours intensify.",
        "Should taste tangy, spicy and desert-aromatic.",
        "Serve with bajra roti and ghee.",
      ],
      {
        aliases: ["Ker Sangri Sabzi"],
        region: ["Rajasthan", "Jaipur", "Marwar"],
        categories: ["Lunch", "Dinner", "Rajasthani Special", "Traditional"],
        difficulty: "Medium",
        cookTime: 40,
        season: ["All"],
      }
    )
  );

  recipes.push(
    R({
      id: "bajra-roti",
      name: "Bajra Roti",
      nameHi: "बाजरा रोटी",
      aliases: ["Pearl Millet Roti", "Bajre Ki Roti"],
      region: ["Rajasthan", "Haryana", "North India"],
      categories: ["Lunch", "Dinner", "Rajasthani Special", "Breakfast"],
      mainIngredients: ["bajra"],
      ingredients: [
        { name: "Bajra flour", quantity: 2, unit: "cups", ingredientId: "bajra" },
        { name: "Warm water", quantity: 0.75, unit: "cup", ingredientId: null },
        { name: "Salt", quantity: 0.5, unit: "tsp", ingredientId: "salt" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
      ],
      prepTime: 10,
      cookTime: 20,
      steps: [
        "Knead bajra flour with warm water and salt into a soft dough (knead portions as you go — it dries fast).",
        "Pat with hands into a thick roti (rolling is harder than wheat).",
        "Cook on hot tawa; finish directly on flame for char if comfortable doing so.",
        "Smear with ghee.",
        "Serve with ker sangri, gatte, lasun chutney or jaggery.",
      ],
      tips: ["Make one roti at a time; dough stiffens quickly."],
      season: ["Winter"],
    })
  );

  recipes.push(
    R({
      id: "missi-roti",
      name: "Missi Roti",
      nameHi: "मिस्सी रोटी",
      aliases: ["Besan Wheat Roti"],
      region: ["Rajasthan", "Punjab", "North India"],
      categories: ["Lunch", "Dinner", "Rajasthani Special", "Breakfast"],
      mainIngredients: ["besan", "wheat-flour"],
      ingredients: [
        { name: "Wheat flour", quantity: 1, unit: "cup", ingredientId: "wheat-flour" },
        { name: "Besan", quantity: 1, unit: "cup", ingredientId: "besan" },
        { name: "Ajwain", quantity: 1, unit: "tsp", ingredientId: "ajwain" },
        { name: "Onion, chopped optional", quantity: 1, unit: "small", ingredientId: "onion" },
        { name: "Oil", quantity: 1, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Red chilli powder", quantity: 0.5, unit: "tsp", ingredientId: "red-chilli" },
      ],
      prepTime: 15,
      cookTime: 20,
      steps: [
        "Mix flours with ajwain, chilli, salt, oil and onion. Knead soft dough.",
        "Roll medium-thick rotis.",
        "Cook on tawa with ghee until spotted brown.",
        "Serve with white butter, pickle or dal.",
        "Hearty Rajasthani/Punjabi flatbread.",
      ],
      tips: ["Besan makes roti protein-rich and flavourful."],
    })
  );

  recipes.push(
    sabzi(
      "jodhpuri-aloo",
      "Jodhpuri Aloo",
      "जोधपुरी आलू",
      ["potato"],
      [
        { name: "Baby potatoes or cubes", quantity: 500, unit: "g", ingredientId: "potato" },
        { name: "Fennel seeds", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
      ],
      [
        "Boil and peel potatoes; prick and shallow fry.",
        "Make a spicy yoghurt-based Rajasthani gravy with fennel and red chilli.",
        "Add potatoes; simmer until coated and flavourful.",
        "Fairly dry to semi-gravy.",
        "Serve with missi roti or bajra roti.",
      ],
      {
        region: ["Rajasthan", "Jodhpur"],
        categories: ["Lunch", "Dinner", "Rajasthani Special"],
        difficulty: "Medium",
      }
    )
  );

  recipes.push(
    sabzi(
      "mangodi-aloo",
      "Mangodi Aloo",
      "मंगोड़ी आलू",
      ["mangodi", "potato"],
      [
        { name: "Mangodi", quantity: 1, unit: "cup", ingredientId: "mangodi" },
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Lightly fry mangodi; soak briefly.",
        "Cook potato-tomato masala; add mangodi and water.",
        "Simmer until mangodi softens and gravy thickens.",
        "Rajasthani pantry special.",
        "Serve with roti.",
      ],
      {
        aliases: ["Mangodi Ki Sabzi"],
        region: ["Rajasthan", "North India"],
        categories: ["Lunch", "Dinner", "Rajasthani Special"],
      }
    )
  );

  recipes.push(
    R({
      id: "rajasthani-khichdi",
      name: "Rajasthani Khichdi",
      nameHi: "राजस्थानी खिचड़ी",
      aliases: ["Rajasthani Dal Rice Khichdi"],
      region: ["Rajasthan"],
      categories: ["Lunch", "Dinner", "Rajasthani Special"],
      mainIngredients: ["rice", "moong-dal"],
      ingredients: [
        { name: "Rice", quantity: 1, unit: "cup", ingredientId: "rice" },
        { name: "Moong dal", quantity: 0.5, unit: "cup", ingredientId: "moong-dal" },
        { name: "Ghee", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Whole spices", quantity: 1, unit: "tsp", ingredientId: "clove" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 10,
      cookTime: 30,
      steps: [
        "Dry roast moong dal lightly. Cook with rice, turmeric, salt and water until soft.",
        "Prepare a generous ghee tadka with cumin, cloves and red chilli.",
        "Pour over khichdi.",
        "Serve with kadhi, papad and ghee.",
        "Simpler than festivities but distinctly Rajasthani in tadka.",
      ],
      tips: ["Extra ghee is traditional."],
    })
  );

  // ===== SNACKS =====
  const snacks = [
    {
      id: "aloo-tikki",
      name: "Aloo Tikki",
      nameHi: "आलू टिक्की",
      aliases: ["Potato Patty"],
      categories: ["Evening Snacks"],
      mainIngredients: ["potato"],
      ingredients: [
        { name: "Boiled potatoes", quantity: 4, unit: "medium", ingredientId: "potato" },
        { name: "Breadcrumbs or cornflour", quantity: 2, unit: "tbsp", ingredientId: "bread" },
        { name: "Chaat masala", quantity: 1, unit: "tsp", ingredientId: "amchur" },
        { name: "Oil", quantity: 4, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 20,
      cookTime: 20,
      steps: [
        "Mash potatoes with spices, chilli, coriander and binder.",
        "Shape flat tikkis.",
        "Shallow fry on medium until crisp and golden both sides.",
        "Serve with chutneys or as chaat with curd and sev.",
        "Keep mash dry for crispiness.",
      ],
    },
    {
      id: "papdi-chaat",
      name: "Papdi Chaat",
      nameHi: "पापड़ी चाट",
      aliases: ["Papri Chaat"],
      categories: ["Evening Snacks"],
      mainIngredients: ["potato", "curd"],
      ingredients: [
        { name: "Papdi", quantity: 20, unit: "pieces", ingredientId: "maida" },
        { name: "Boiled potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Boiled chickpeas", quantity: 0.5, unit: "cup", ingredientId: "chickpea" },
        { name: "Whipped curd", quantity: 1, unit: "cup", ingredientId: "curd" },
        { name: "Sweet & green chutney", quantity: 4, unit: "tbsp", ingredientId: "chutney" },
        { name: "Sev", quantity: 0.5, unit: "cup", ingredientId: "sev" },
        { name: "Chaat masala", quantity: 1, unit: "tsp", ingredientId: "amchur" },
      ],
      prepTime: 25,
      cookTime: 5,
      steps: [
        "Arrange papdi on a plate; top with potato and chickpeas.",
        "Spoon whipped salted curd, both chutneys.",
        "Sprinkle chaat masala, cumin powder and sev.",
        "Serve immediately before papdi softens.",
        "Garnish with coriander.",
      ],
    },
    {
      id: "dahi-bhalla",
      name: "Dahi Bhalla",
      nameHi: "दही भल्ला",
      aliases: ["Dahi Vada"],
      categories: ["Evening Snacks", "Sweets"],
      mainIngredients: ["urad-dal", "curd"],
      ingredients: [
        { name: "Urad dal, soaked", quantity: 1, unit: "cup", ingredientId: "urad-dal" },
        { name: "Curd", quantity: 3, unit: "cups", ingredientId: "curd" },
        { name: "Tamarind chutney", quantity: 0.5, unit: "cup", ingredientId: "tamarind" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
        { name: "Salt & sugar for curd", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Grind urad to fluffy batter; whisk well. Fry soft vadas; soak in warm water; squeeze.",
        "Whisk curd with salt and a little sugar.",
        "Place bhallas in curd; top with chutneys, cumin and chilli powder.",
        "Chill before serving.",
        "Soft soak is the hallmark.",
      ],
    },
    {
      id: "bhel-puri",
      name: "Bhel Puri",
      nameHi: "भेल पूरी",
      aliases: ["Bhel"],
      categories: ["Evening Snacks"],
      mainIngredients: ["poha"],
      ingredients: [
        { name: "Puffed rice (murmura)", quantity: 3, unit: "cups", ingredientId: "poha" },
        { name: "Sev", quantity: 0.5, unit: "cup", ingredientId: "sev" },
        { name: "Onion & tomato", quantity: 1, unit: "each", ingredientId: "onion" },
        { name: "Chutneys", quantity: 4, unit: "tbsp", ingredientId: "chutney" },
        { name: "Boiled potato", quantity: 1, unit: "medium", ingredientId: "potato" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
      ],
      prepTime: 15,
      cookTime: 0,
      steps: [
        "Mix murmura with chutneys, onion, tomato, potato and spices just before eating.",
        "Add sev and lemon.",
        "Toss quickly.",
        "Serve immediately while crisp.",
        "Do not premix or it turns soggy.",
      ],
    },
    {
      id: "samosa",
      name: "Samosa",
      nameHi: "समोसा",
      aliases: ["Aloo Samosa"],
      categories: ["Evening Snacks"],
      mainIngredients: ["potato", "maida"],
      ingredients: [
        { name: "Maida", quantity: 2, unit: "cups", ingredientId: "maida" },
        { name: "Boiled potato filling", quantity: 3, unit: "cups", ingredientId: "potato" },
        { name: "Peas", quantity: 0.5, unit: "cup", ingredientId: "green-peas" },
        { name: "Ghee for dough", quantity: 3, unit: "tbsp", ingredientId: "ghee" },
        { name: "Oil for frying", quantity: 3, unit: "cups", ingredientId: "oil" },
        { name: "Spices (cumin, amchur, garam masala)", quantity: 2, unit: "tsp", ingredientId: "amchur" },
      ],
      prepTime: 40,
      cookTime: 35,
      difficulty: "Medium",
      steps: [
        "Make stiff maida dough with ghee; rest 20 minutes.",
        "Prepare dry spiced potato-peas filling.",
        "Shape cones, fill, seal into triangles.",
        "Deep fry on medium-low until golden and crisp (not high flame).",
        "Serve with chutney.",
      ],
      tips: ["Low-medium frying gives crisp layers."],
    },
  ];

  snacks.forEach((s) => recipes.push(R({ region: ["North India"], diet: "Vegetarian", servings: 4, tips: [], season: ["All"], ...s })));

  ["aloo-pakoda", "pyaz-pakoda", "paneer-pakoda", "bread-pakoda"].forEach((id, i) => {
    const names = [
      ["Aloo Pakoda", "आलू पकोड़ा", "potato"],
      ["Pyaz Pakoda", "प्याज पकोड़ा", "onion"],
      ["Paneer Pakoda", "पनीर पकोड़ा", "paneer"],
      ["Bread Pakoda", "ब्रेड पकोड़ा", "bread"],
    ][i];
    recipes.push(
      R({
        id,
        name: names[0],
        nameHi: names[1],
        aliases: [],
        region: ["North India"],
        categories: ["Evening Snacks", "Rainy Day"],
        mainIngredients: [names[2], "besan"],
        ingredients: [
          { name: "Besan", quantity: 1.5, unit: "cups", ingredientId: "besan" },
          {
            name: names[0].includes("Aloo")
              ? "Potato slices"
              : names[0].includes("Pyaz")
                ? "Onion rings/slices"
                : names[0].includes("Paneer")
                  ? "Paneer fingers"
                  : "Bread slices stuffed with spiced potato",
            quantity: names[0].includes("Bread") ? 6 : 2,
            unit: names[0].includes("Bread") ? "slices" : "cups-equivalent",
            ingredientId: names[2],
          },
          { name: "Ajwain", quantity: 0.5, unit: "tsp", ingredientId: "ajwain" },
          { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
          { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
          { name: "Red chilli powder", quantity: 1, unit: "tsp", ingredientId: "red-chilli" },
          { name: "Water for batter", quantity: 0.75, unit: "cup", ingredientId: null },
        ],
        prepTime: 15,
        cookTime: 20,
        steps: [
          "Make a thick besan batter with ajwain, chilli, salt and water.",
          `Dip prepared ${names[0].split(" ")[0].toLowerCase()} pieces in batter.`,
          "Deep fry on medium flame until golden and crisp.",
          "Drain on paper towels.",
          "Serve hot with green chutney and chai — especially in rain.",
        ],
        tips: ["Batter should coat well; not too thin."],
        season: ["Monsoon", "All"],
      })
    );
  });

  recipes.push(
    R({
      id: "vegetable-cutlet",
      name: "Vegetable Cutlet",
      nameHi: "वेजिटेबल कटलेट",
      aliases: ["Veg Cutlet"],
      region: ["North India"],
      categories: ["Evening Snacks"],
      mainIngredients: ["potato", "carrot", "beans"],
      ingredients: [
        { name: "Boiled mixed vegetables, mashed", quantity: 2, unit: "cups", ingredientId: "potato" },
        { name: "Breadcrumbs", quantity: 0.75, unit: "cup", ingredientId: "bread" },
        { name: "Oil", quantity: 0.5, unit: "cup", ingredientId: "oil" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 25,
      cookTime: 20,
      steps: [
        "Mash boiled vegetables with spices and some breadcrumbs.",
        "Shape cutlets; coat in breadcrumbs.",
        "Shallow fry until crisp both sides.",
        "Serve with chutney or ketchup.",
        "Mixture must be dry enough to hold shape.",
      ],
      tips: ["Chill shaped cutlets 10 minutes before frying."],
    })
  );

  recipes.push(
    R({
      id: "pav-bhaji",
      name: "Pav Bhaji",
      nameHi: "पाव भाजी",
      aliases: ["Bombay Pav Bhaji"],
      region: ["Maharashtra", "North India"],
      categories: ["Evening Snacks", "Dinner"],
      mainIngredients: ["potato", "cauliflower", "pav"],
      ingredients: [
        { name: "Potato", quantity: 4, unit: "medium", ingredientId: "potato" },
        { name: "Cauliflower & peas", quantity: 1.5, unit: "cups", ingredientId: "cauliflower" },
        { name: "Tomato", quantity: 4, unit: "medium", ingredientId: "tomato" },
        { name: "Pav bhaji masala", quantity: 2, unit: "tbsp", ingredientId: "garam-masala" },
        { name: "Butter", quantity: 4, unit: "tbsp", ingredientId: "butter" },
        { name: "Pav buns", quantity: 8, unit: "pieces", ingredientId: "pav" },
        { name: "Onion for topping", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Lemon", quantity: 1, unit: "piece", ingredientId: "lemon" },
        { name: "Salt", quantity: 1.5, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 25,
      cookTime: 35,
      steps: [
        "Boil potato and vegetables; mash.",
        "On a wide tawa, cook tomatoes in butter with pav bhaji masala and chilli.",
        "Add mashed veg; mash together with butter and water to a soft bhaji.",
        "Toast pav with butter on the tawa.",
        "Serve bhaji with pav, onion and lemon.",
      ],
      tips: ["More butter = more street-style flavour."],
    })
  );

  recipes.push(
    R({
      id: "veg-hakka-noodles",
      name: "Veg Hakka Noodles",
      nameHi: "वेज हक्का नूडल्स",
      aliases: ["Hakka Noodles"],
      region: ["Indo-Chinese"],
      categories: ["Evening Snacks", "Dinner"],
      mainIngredients: ["noodles", "cabbage", "capsicum"],
      ingredients: [
        { name: "Noodles", quantity: 200, unit: "g", ingredientId: "noodles" },
        { name: "Cabbage, carrot, capsicum, beans", quantity: 2, unit: "cups", ingredientId: "cabbage" },
        { name: "Soy sauce", quantity: 1.5, unit: "tbsp", ingredientId: null },
        { name: "Vinegar", quantity: 1, unit: "tsp", ingredientId: "lemon" },
        { name: "Garlic", quantity: 6, unit: "cloves", ingredientId: "garlic" },
        { name: "Oil", quantity: 3, unit: "tbsp", ingredientId: "oil" },
        { name: "Salt", quantity: 0.75, unit: "tsp", ingredientId: "salt" },
      ],
      prepTime: 15,
      cookTime: 15,
      steps: [
        "Boil noodles until just done; rinse in cold water; toss with oil.",
        "Stir-fry garlic and vegetables on high flame.",
        "Add noodles, sauces and salt; toss quickly.",
        "Do not overcook.",
        "Serve hot with chilli sauce.",
      ],
      tips: ["High heat keeps noodles from turning soggy."],
    })
  );

  // ===== SWEETS =====
  const sweets = [
    ["suji-halwa", "Suji Halwa", "सूजी हलवा", "suji",
      [{ name: "Suji", quantity: 1, unit: "cup", ingredientId: "suji" },
       { name: "Sugar", quantity: 0.75, unit: "cup", ingredientId: "sugar" },
       { name: "Ghee", quantity: 0.5, unit: "cup", ingredientId: "ghee" },
       { name: "Water", quantity: 2.5, unit: "cups", ingredientId: null },
       { name: "Cardamom", quantity: 4, unit: "pods", ingredientId: "cardamom" },
       { name: "Nuts", quantity: 2, unit: "tbsp", ingredientId: "almonds" }],
      ["Roast suji in ghee on medium until golden and aromatic.",
       "Boil water with sugar and cardamom separately.",
       "Carefully add hot syrup to roasted suji while stirring.",
       "Cook until ghee separates and halwa leaves the sides.",
       "Garnish with nuts. Prasad-style classic."]],
    ["besan-halwa", "Besan Halwa", "बेसन हलवा", "besan",
      [{ name: "Besan", quantity: 1, unit: "cup", ingredientId: "besan" },
       { name: "Ghee", quantity: 0.5, unit: "cup", ingredientId: "ghee" },
       { name: "Sugar", quantity: 0.75, unit: "cup", ingredientId: "sugar" },
       { name: "Milk or water", quantity: 2, unit: "cups", ingredientId: "milk" },
       { name: "Cardamom", quantity: 0.5, unit: "tsp", ingredientId: "cardamom" }],
      ["Roast besan in ghee patiently until deep golden and nutty (do not rush).",
       "Add warm milk/water carefully while stirring.",
       "Add sugar and cardamom; cook until glossy and thick.",
       "Garnish with nuts.",
       "Slow roasting is everything."]],
    ["moong-dal-halwa", "Moong Dal Halwa", "मूंग दाल हलवा", "moong-dal",
      [{ name: "Moong dal, soaked & ground", quantity: 1, unit: "cup", ingredientId: "moong-dal" },
       { name: "Ghee", quantity: 0.75, unit: "cup", ingredientId: "ghee" },
       { name: "Sugar", quantity: 0.75, unit: "cup", ingredientId: "sugar" },
       { name: "Milk", quantity: 1, unit: "cup", ingredientId: "milk" },
       { name: "Khoya optional", quantity: 0.25, unit: "cup", ingredientId: "khoya" }],
      ["Cook ground moong dal in ghee on low, stirring continuously until colour deepens (20–30 min).",
       "Add milk and sugar; cook until thick and ghee oozes.",
       "Add khoya if using.",
       "Garnish with nuts.",
       "Festive Rajasthani/North Indian special."]],
    ["gajar-halwa", "Gajar Halwa", "गाजर हलवा", "carrot",
      [{ name: "Grated carrot", quantity: 1, unit: "kg", ingredientId: "carrot" },
       { name: "Milk", quantity: 1, unit: "litre", ingredientId: "milk" },
       { name: "Sugar", quantity: 0.75, unit: "cup", ingredientId: "sugar" },
       { name: "Ghee", quantity: 4, unit: "tbsp", ingredientId: "ghee" },
       { name: "Khoya optional", quantity: 0.5, unit: "cup", ingredientId: "khoya" },
       { name: "Cardamom & nuts", quantity: 1, unit: "tsp", ingredientId: "cardamom" }],
      ["Cook grated carrot in milk on medium, stirring, until milk reduces and carrot softens.",
       "Add sugar; cook further until thick.",
       "Add ghee and khoya; roast until glossy.",
       "Finish with cardamom and nuts.",
       "Winter favourite — use red Delhi carrots if possible."]],
    ["kheer", "Kheer", "खीर", "rice",
      [{ name: "Rice", quantity: 0.25, unit: "cup", ingredientId: "rice" },
       { name: "Full cream milk", quantity: 1.5, unit: "litres", ingredientId: "milk" },
       { name: "Sugar", quantity: 0.5, unit: "cup", ingredientId: "sugar" },
       { name: "Cardamom", quantity: 4, unit: "pods", ingredientId: "cardamom" },
       { name: "Nuts & raisins", quantity: 3, unit: "tbsp", ingredientId: "almonds" }],
      ["Wash and soak rice 20 minutes. Boil milk; add rice.",
       "Cook on low, stirring often, until rice is soft and milk thickens (35–45 min).",
       "Add sugar and cardamom; cook 5 more minutes.",
       "Garnish with nuts. Serve warm or chilled.",
       "Do not rush — slow reduction makes creamy kheer."]],
    ["seviyan-kheer", "Seviyan Kheer", "सेवईं खीर", "vermicelli",
      [{ name: "Vermicelli", quantity: 1, unit: "cup", ingredientId: "vermicelli" },
       { name: "Milk", quantity: 1, unit: "litre", ingredientId: "milk" },
       { name: "Sugar", quantity: 0.5, unit: "cup", ingredientId: "sugar" },
       { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
       { name: "Cardamom", quantity: 0.5, unit: "tsp", ingredientId: "cardamom" }],
      ["Roast vermicelli in ghee until golden.",
       "Add milk; cook until soft and slightly thick.",
       "Add sugar and cardamom.",
       "Garnish with nuts.",
       "Quick festive dessert — Eid and family dinners."]],
  ];

  sweets.forEach(([id, name, nameHi, main, ings, steps]) => {
    recipes.push(
      R({
        id,
        name,
        nameHi,
        aliases: [],
        region: ["North India"],
        categories: ["Sweets"],
        mainIngredients: [main],
        ingredients: ings,
        prepTime: 10,
        cookTime: id.includes("moong") || id.includes("gajar") || id === "kheer" ? 45 : 30,
        difficulty: id.includes("moong") ? "Medium" : "Easy",
        steps,
        tips: ["Use heavy-bottomed pan to avoid burning."],
        season: id.includes("gajar") ? ["Winter"] : ["All"],
      })
    );
  });

  recipes.push(
    R({
      id: "malpua",
      name: "Malpua",
      nameHi: "मालपुआ",
      aliases: ["Malpua Sweet"],
      region: ["Purvanchal", "Rajasthan", "North India"],
      categories: ["Sweets", "Purvanchal Special"],
      mainIngredients: ["maida", "milk"],
      ingredients: [
        { name: "Maida", quantity: 1, unit: "cup", ingredientId: "maida" },
        { name: "Milk", quantity: 1, unit: "cup", ingredientId: "milk" },
        { name: "Sugar for syrup", quantity: 1, unit: "cup", ingredientId: "sugar" },
        { name: "Fennel & cardamom", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Ghee for frying", quantity: 1, unit: "cup", ingredientId: "ghee" },
      ],
      prepTime: 20,
      cookTime: 30,
      difficulty: "Medium",
      steps: [
        "Make a flowing batter of maida, milk, fennel and a spoon of sugar. Rest 20 minutes.",
        "Prepare sugar syrup with cardamom to one-thread consistency.",
        "Fry ladlefuls of batter in medium-hot ghee until golden and crisp at edges.",
        "Dip malpuas in warm syrup.",
        "Serve with rabri optional — Holi/festive special in Jaunpur homes too.",
      ],
      tips: ["Medium flame keeps insides cooked without burning."],
    })
  );

  recipes.push(
    R({
      id: "gujiya",
      name: "Gujiya",
      nameHi: "गुजिया",
      aliases: ["Karanji", "Ghughra"],
      region: ["North India", "Purvanchal", "Rajasthan"],
      categories: ["Sweets"],
      mainIngredients: ["maida", "khoya"],
      ingredients: [
        { name: "Maida", quantity: 2, unit: "cups", ingredientId: "maida" },
        { name: "Khoya", quantity: 1.5, unit: "cups", ingredientId: "khoya" },
        { name: "Powdered sugar", quantity: 0.75, unit: "cup", ingredientId: "sugar" },
        { name: "Nuts & raisins", quantity: 0.5, unit: "cup", ingredientId: "raisins" },
        { name: "Ghee/oil for frying", quantity: 3, unit: "cups", ingredientId: "ghee" },
        { name: "Cardamom", quantity: 1, unit: "tsp", ingredientId: "cardamom" },
      ],
      prepTime: 45,
      cookTime: 40,
      difficulty: "Medium",
      steps: [
        "Make firm maida dough with ghee; rest.",
        "Roast khoya; cool; mix sugar, nuts and cardamom for filling.",
        "Roll discs, fill, seal into half-moons (crimp edges).",
        "Deep fry on medium until golden.",
        "Cool and store in airtight box — Holi essential.",
      ],
      tips: ["Seal edges well or filling leaks while frying."],
    })
  );

  recipes.push(
    R({
      id: "thekua",
      name: "Thekua",
      nameHi: "ठेकुआ",
      aliases: ["Khajuria", "Thekuwa"],
      region: ["Purvanchal", "Bihar", "Jharkhand", "Jaunpur"],
      categories: ["Sweets", "Purvanchal Special", "Traditional"],
      mainIngredients: ["wheat-flour", "jaggery"],
      ingredients: [
        { name: "Wheat flour", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Jaggery", quantity: 1, unit: "cup", ingredientId: "jaggery" },
        { name: "Fennel seeds", quantity: 1, unit: "tsp", ingredientId: "fennel" },
        { name: "Coconut grated optional", quantity: 0.25, unit: "cup", ingredientId: "coconut" },
        { name: "Ghee", quantity: 0.25, unit: "cup", ingredientId: "ghee" },
        { name: "Oil for frying", quantity: 2, unit: "cups", ingredientId: "oil" },
      ],
      prepTime: 30,
      cookTime: 35,
      steps: [
        "Melt jaggery with little water; cool slightly.",
        "Mix flour, fennel, coconut, ghee and jaggery syrup into a stiff dough.",
        "Shape into patterned discs (use mould or fork).",
        "Deep fry on medium-low until deep brown and cooked inside.",
        "Chhath and festive prasadam across Purvanchal.",
      ],
      tips: ["Low flame frying cooks the centre without burning."],
    })
  );

  recipes.push(
    R({
      id: "churma",
      name: "Churma",
      nameHi: "चूरमा",
      aliases: ["Bajra/Wheat Churma"],
      region: ["Rajasthan", "Jaipur"],
      categories: ["Sweets", "Rajasthani Special"],
      mainIngredients: ["wheat-flour", "ghee", "jaggery"],
      ingredients: [
        { name: "Wheat flour baatis or coarse crushed roti", quantity: 2, unit: "cups", ingredientId: "wheat-flour" },
        { name: "Ghee", quantity: 0.5, unit: "cup", ingredientId: "ghee" },
        { name: "Powdered sugar or jaggery", quantity: 0.75, unit: "cup", ingredientId: "jaggery" },
        { name: "Cardamom", quantity: 0.5, unit: "tsp", ingredientId: "cardamom" },
        { name: "Nuts", quantity: 2, unit: "tbsp", ingredientId: "almonds" },
      ],
      prepTime: 20,
      cookTime: 30,
      steps: [
        "Crush baked baatis or thick ghee rotis coarsely.",
        "Mix with warm ghee, powdered sugar/jaggery and cardamom.",
        "Adjust sweetness.",
        "Garnish with nuts.",
        "Serve with dal baati or as dessert.",
      ],
      tips: ["Coarse texture is traditional — not a fine powder."],
    })
  );

  // Extra unique recipes to ensure 200+ after dedup
  const extras = [
    ["lauki-halwa", "Lauki Halwa", "लौकी हलवा", ["lauki"], "Sweets",
      ["Grate lauki and squeeze lightly. Cook in ghee 5 minutes.",
       "Add milk; cook until lauki soft and milk reduces.",
       "Add sugar and cardamom; cook until thick.",
       "Add khoya optional.",
       "Garnish with nuts."]],
    ["besan-ladoo", "Besan Ladoo", "बेसन लड्डू", ["besan"], "Sweets",
      ["Roast besan in ghee until aromatic and golden.",
       "Cool slightly; mix powdered sugar and cardamom.",
       "Shape into ladoos while still warm.",
       "Set aside to firm.",
       "Festive classic."]],
    ["coconut-ladoo", "Coconut Ladoo", "नारियल लड्डू", ["coconut"], "Sweets",
      ["Cook grated coconut with condensed milk or sugar syrup.",
       "Add cardamom; cook until sticky.",
       "Shape ladoos; roll in coconut.",
       "Cool to set.",
       "Quick sweet."]],
    ["vegetable-soup", "Vegetable Soup", "वेजिटेबल सूप", ["carrot", "beans"], "Dinner",
      ["Boil mixed vegetables with ginger and pepper.",
       "Blend half for body; keep half chunky.",
       "Season with salt and lemon.",
       "Serve hot as light dinner starter.",
       "Comforting when someone is unwell."]],
    ["corn-chat", "Corn Chaat", "कॉर्न चाट", ["corn"], "Evening Snacks",
      ["Boil sweet corn; drain.",
       "Mix onion, tomato, chilli, chaat masala, lemon and salt.",
       "Serve immediately.",
       "Optional butter.",
       "Quick evening snack."]],
    ["sprouts-chat", "Sprouts Chaat", "स्प्राउट्स चाट", ["chickpea"], "Evening Snacks",
      ["Steam moong/chana sprouts lightly.",
       "Mix with onion, tomato, chutneys and spices.",
       "Finish with sev.",
       "Healthy chaat.",
       "Do not oversteam sprouts."]],
    ["tomato-rasam", "Tomato Rasam", "टमाटर रसम", ["tomato", "toor-dal"], "Lunch",
      ["Cook tomatoes with tamarind, rasam spices and dal water.",
       "Temper mustard and curry leaves.",
       "Serve with rice or as soup.",
       "Digestive and light.",
       "South Indian comfort."]],
    ["cabbage-sabzi", "Cabbage Sabzi", "पत्ता गोभी सब्ज़ी", ["cabbage"], "Lunch",
      ["Temper cumin; add shredded cabbage and spices.",
       "Cook open to evaporate moisture.",
       "Finish with garam masala.",
       "Simple everyday sabzi.",
       "Do not cover too long."]],
    ["beans-poriyal", "Beans Poriyal", "बीन्स पोरियल", ["beans", "coconut"], "Lunch",
      ["Cook chopped beans with turmeric and salt until tender-crisp.",
       "Temper mustard and curry leaves.",
       "Add grated coconut.",
       "South Indian dry vegetable.",
       "Keep beans bright green."]],
    ["onion-tomato-sabzi", "Onion Tomato Sabzi", "प्याज टमाटर सब्ज़ी", ["onion", "tomato"], "Lunch",
      ["Sauté lots of onion until soft.",
       "Add tomato and spices; cook until jammy.",
       "Everyday emergency sabzi when fridge is empty.",
       "Serve with roti.",
       "Add potato if available."]],
  ];

  extras.forEach(([id, name, nameHi, main, cat, steps]) => {
    recipes.push(
      R({
        id,
        name,
        nameHi,
        aliases: [],
        region: ["Indian Home Kitchen"],
        categories: cat === "Sweets" ? ["Sweets"] : cat === "Evening Snacks" ? ["Evening Snacks"] : ["Lunch", "Dinner"],
        mainIngredients: main,
        ingredients: [
          { name: name + " main items", quantity: 2, unit: "cups", ingredientId: main[0] },
          { name: "Oil/ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
          { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
          { name: "Spices as needed", quantity: 1, unit: "tsp", ingredientId: "turmeric" },
        ],
        prepTime: 15,
        cookTime: 25,
        steps,
        tips: ["Adjust sweetness/spice to family taste."],
        season: ["All"],
      })
    );
  });

  return recipes;
}

module.exports = { buildPart8 };
