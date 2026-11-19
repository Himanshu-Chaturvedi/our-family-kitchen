const { R, sabzi, dalRecipe, spiceBase } = require("./generate-data");

function buildPart4() {
  const recipes = [];

  function drySabzi(id, name, nameHi, main, vegLines, steps, extras = {}) {
    return sabzi(id, name, nameHi, main, vegLines, steps, extras);
  }

  // ===== POTATO =====
  const potatoList = [
    ["aloo-gobhi", "Aloo Gobhi", "आलू गोभी", ["potato", "cauliflower"],
      [{ name: "Potato, cubed", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Cauliflower florets", quantity: 1, unit: "medium", ingredientId: "cauliflower" },
       { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" }],
      ["Heat oil, temper cumin. Add potato and gobhi; sauté on medium-high 4 minutes.",
       "Add turmeric, chilli, coriander powder and salt. Mix well.",
       "Cover and cook on low, stirring occasionally, until both are tender (12–15 min).",
       "Finish with garam masala and amchur. Optional: tomato for slight gravy.",
       "Garnish with coriander. Serve with roti."],
      { aliases: ["Aloo Gobi"] }],
    ["aloo-matar", "Aloo Matar", "आलू मटर", ["potato", "green-peas"],
      [{ name: "Potato, cubed", quantity: 3, unit: "medium", ingredientId: "potato" },
       { name: "Green peas", quantity: 1.5, unit: "cups", ingredientId: "green-peas" },
       { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
       { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" }],
      ["Sauté onion in oil with cumin until golden. Add tomato and spices; cook until soft.",
       "Add potato; sauté 3 minutes. Add peas and water.",
       "Cover and cook until potato is soft and gravy thickens.",
       "Add garam masala.",
       "Serve with roti or rice."],
      { aliases: ["Aloo Mutter"], season: ["Winter", "All"] }],
    ["aloo-baingan", "Aloo Baingan", "आलू बैंगन", ["potato", "eggplant"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Baingan, cubed", quantity: 3, unit: "medium", ingredientId: "eggplant" },
       { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
       { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" }],
      ["Heat mustard oil, add cumin and onion.",
       "Add potato first; cook 5 minutes. Add baingan, tomato and spices.",
       "Cover and cook on low until both are soft, stirring gently so baingan does not mash too early.",
       "Finish with coriander.",
       "Serve with roti or dal-chawal."],
      { region: ["Purvanchal", "Uttar Pradesh", "North India"] }],
    ["aloo-methi", "Aloo Methi", "आलू मेथी", ["potato", "methi"],
      [{ name: "Potato, cubed", quantity: 3, unit: "medium", ingredientId: "potato" },
       { name: "Fresh methi leaves", quantity: 2, unit: "cups", ingredientId: "methi" }],
      ["Sauté methi in little oil until wilted; keep aside.",
       "In same pan temper cumin, add potato and spices; cover-cook until almost done.",
       "Add methi, mix and cook 5 more minutes.",
       "Finish dry or semi-dry as preferred.",
       "Serve with dal and roti."],
      { season: ["Winter"], tips: ["Sauté methi to cut bitterness."] }],
    ["aloo-beans", "Aloo Beans", "आलू बीन्स", ["potato", "beans"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "French beans, chopped", quantity: 2, unit: "cups", ingredientId: "beans" }],
      ["Temper cumin in oil. Add potato and beans with spices.",
       "Add splash of water, cover and cook until tender but beans retain bite.",
       "Finish with amchur.",
       "Garnish with coriander.",
       "Serve with roti."], {}],
    ["aloo-capsicum", "Aloo Capsicum", "आलू शिमला मिर्च", ["potato", "capsicum"],
      [{ name: "Potato", quantity: 3, unit: "medium", ingredientId: "potato" },
       { name: "Capsicum, cubed", quantity: 2, unit: "medium", ingredientId: "capsicum" }],
      ["Cook potato with spices until almost done.",
       "Add capsicum; cook on medium-high so it stays slightly crunchy.",
       "Add amchur and garam masala.",
       "Toss well 2 minutes.",
       "Serve as dry sabzi with roti."], {}],
    ["aloo-tamatar-rasedar", "Aloo Tamatar Rasedar", "आलू टमाटर रसेदार", ["potato", "tomato"],
      [{ name: "Potato", quantity: 4, unit: "medium", ingredientId: "potato" },
       { name: "Tomato", quantity: 3, unit: "medium", ingredientId: "tomato" },
       { name: "Ginger", quantity: 1, unit: "tsp", ingredientId: "ginger" }],
      ["Heat mustard oil, add cumin and hing. Add tomato and cook to a mash.",
       "Add spices and potato cubes; mix.",
       "Add 1.5 cups water; simmer until potato is soft and gravy is pourable.",
       "This is classic UP-style rasedar aloo for puri.",
       "Finish with coriander and garam masala."],
      { aliases: ["Aloo Tamatar Curry", "Puri Wale Aloo"], region: ["Purvanchal", "Uttar Pradesh"], categories: ["Lunch", "Dinner", "Breakfast", "Purvanchal Special"] }],
    ["dum-aloo", "Dum Aloo", "दम आलू", ["potato"],
      [{ name: "Baby potatoes or regular", quantity: 500, unit: "g", ingredientId: "potato" },
       { name: "Curd", quantity: 0.5, unit: "cup", ingredientId: "curd" },
       { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
       { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
       { name: "Cashews", quantity: 8, unit: "pieces", ingredientId: "cashew" }],
      ["Boil potatoes, peel, prick with fork and shallow fry until golden.",
       "Make onion-tomato-cashew gravy; add beaten curd carefully on low flame.",
       "Add fried potatoes and spices; add little water.",
       "Cover and dum-cook on low 15 minutes.",
       "Serve with naan or rice."],
      { difficulty: "Medium", cookTime: 45 }],
    ["jeera-aloo", "Jeera Aloo", "जीरा आलू", ["potato", "cumin"],
      [{ name: "Boiled potato, cubed", quantity: 4, unit: "medium", ingredientId: "potato" },
       { name: "Cumin seeds", quantity: 2, unit: "tsp", ingredientId: "cumin" }],
      ["Heat oil/ghee, add generous cumin until it crackles and browns lightly.",
       "Add boiled potato, turmeric, chilli, salt and amchur.",
       "Toss on medium-high until edges crisp slightly.",
       "Finish with coriander.",
       "Excellent with kadhi or dal."],
      { prepTime: 10, cookTime: 15 }],
    ["aloo-palak", "Aloo Palak", "आलू पालक", ["potato", "spinach"],
      [{ name: "Potato", quantity: 3, unit: "medium", ingredientId: "potato" },
       { name: "Spinach, chopped", quantity: 1, unit: "bunch", ingredientId: "spinach" }],
      ["Sauté potato with spices until half cooked.",
       "Add chopped spinach; cook until wilted and potato is done.",
       "Can be dry or with little water.",
       "Finish with garlic tadka optional.",
       "Serve with roti or rice."], {}],
    ["aloo-gajar", "Aloo Gajar", "आलू गाजर", ["potato", "carrot"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Carrot, cubed", quantity: 3, unit: "medium", ingredientId: "carrot" }],
      ["Temper cumin; add potato and carrot with spices.",
       "Cover-cook until soft. Slight natural sweetness from carrot.",
       "Add peas optionally in winter.",
       "Finish with amchur.",
       "Serve with roti."],
      { season: ["Winter"] }],
    ["aloo-parwal", "Aloo Parwal", "आलू परवल", ["potato", "parwal"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Parwal, sliced", quantity: 250, unit: "g", ingredientId: "parwal" }],
      ["Sauté parwal and potato in mustard oil with spices.",
       "Cover and cook until parwal is tender but not mushy.",
       "Finish with amchur.",
       "Common UP summer sabzi.",
       "Serve with dal-roti."],
      { region: ["Uttar Pradesh", "Purvanchal"], season: ["Summer", "Monsoon"] }],
    ["aloo-lauki", "Aloo Lauki", "आलू लौकी", ["potato", "lauki"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Lauki, cubed", quantity: 3, unit: "cups", ingredientId: "lauki" },
       { name: "Tomato", quantity: 1, unit: "medium", ingredientId: "tomato" }],
      ["Temper cumin and hing. Add potato, then lauki and tomato with spices.",
       "Add little water; cover-cook until soft.",
       "Light home-style sabzi.",
       "Finish with coriander.",
       "Serve with roti."], {}],
    ["aloo-tinda", "Aloo Tinda", "आलू टिंडा", ["potato", "tinda"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Tinda, cubed", quantity: 6, unit: "pieces", ingredientId: "tinda" }],
      ["Peel and cube tinda. Cook with potato, spices and tomato.",
       "Cover until tender. Do not overcook or tinda becomes mushy.",
       "Finish with amchur.",
       "Serve with roti.",
       "Popular North Indian summer dish."],
      { season: ["Summer"] }],
    ["aloo-kaddu", "Aloo Kaddu", "आलू कद्दू", ["potato", "pumpkin"],
      [{ name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
       { name: "Kaddu (pumpkin)", quantity: 3, unit: "cups", ingredientId: "pumpkin" }],
      ["Temper fenugreek seeds and cumin in oil.",
       "Add potato and kaddu with turmeric, chilli, coriander, salt.",
       "Cook covered; mash lightly for a soft texture.",
       "Add amchur or lemon for tang.",
       "Serve with roti or puri."],
      { region: ["Uttar Pradesh"] }],
    ["aloo-pyaz", "Aloo Pyaz", "आलू प्याज", ["potato", "onion"],
      [{ name: "Potato", quantity: 4, unit: "medium", ingredientId: "potato" },
       { name: "Onion, petals", quantity: 3, unit: "medium", ingredientId: "onion" }],
      ["Fry onion petals until edges brown; keep aside.",
       "Cook potato with spices until done.",
       "Mix onions back; toss on high flame.",
       "Finish with amchur.",
       "Serve dry with dal."], {}],
  ];

  potatoList.forEach(([id, name, nameHi, main, ings, steps, extras]) => {
    recipes.push(drySabzi(id, name, nameHi, main, ings, steps, extras));
  });

  recipes.push(
    R({
      id: "aloo-chokha",
      name: "Aloo Chokha",
      nameHi: "आलू चोखा",
      aliases: ["Aloo Bharta UP", "Potato Chokha"],
      region: ["Purvanchal", "Bihar", "Jaunpur"],
      categories: ["Lunch", "Dinner", "Purvanchal Special", "Breakfast"],
      mainIngredients: ["potato"],
      ingredients: [
        { name: "Potato", quantity: 4, unit: "medium", ingredientId: "potato" },
        { name: "Onion, finely chopped", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Garlic, crushed", quantity: 4, unit: "cloves", ingredientId: "garlic" },
        { name: "Green chilli", quantity: 2, unit: "pieces", ingredientId: "green-chilli" },
        { name: "Mustard oil", quantity: 1.5, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Salt", quantity: 1, unit: "tsp", ingredientId: "salt" },
        { name: "Coriander", quantity: 2, unit: "tbsp", ingredientId: "coriander" },
      ],
      prepTime: 10,
      cookTime: 25,
      steps: [
        "Boil or flame-roast potatoes until soft. Peel and mash roughly while warm.",
        "Add raw onion, garlic, green chilli, salt and mustard oil.",
        "Mix vigorously so oil emulsifies into the mash.",
        "Garnish with coriander.",
        "Serve with litti, dal-chawal or roti.",
      ],
      tips: ["Raw mustard oil is essential for authentic chokha taste."],
    })
  );

  recipes.push(
    sabzi(
      "aloo-tahri",
      "Aloo Tahri",
      "आलू तहरी",
      ["potato", "rice"],
      [
        { name: "Rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Potato, large cubes", quantity: 3, unit: "medium", ingredientId: "potato" },
        { name: "Onion", quantity: 1, unit: "medium", ingredientId: "onion" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Bay leaf", quantity: 1, unit: "piece", ingredientId: "bay-leaf" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      [
        "Wash and soak rice 20 minutes.",
        "Heat mustard oil, add bay leaf and cumin. Fry potato cubes until lightly golden.",
        "Add onion, turmeric, chilli, coriander powder and salt.",
        "Add drained rice; sauté 1 minute. Add 3 cups water. Cook covered until rice and potato are done (or 1 whistle).",
        "Rest 5 minutes. Fluff and serve with pickle or curd — classic Purvanchal one-pot meal.",
      ],
      {
        aliases: ["Aloo Tehri", "UP Tahri"],
        region: ["Purvanchal", "Jaunpur", "Uttar Pradesh", "Awadh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
        tips: ["Mustard oil and big potato chunks define home-style tahri."],
      }
    )
  );

  // ===== MATAR SPECIALS =====
  recipes.push(
    sabzi(
      "matar-nimona",
      "Matar Nimona",
      "मटर का निमोना",
      ["green-peas", "potato"],
      [
        { name: "Fresh green peas", quantity: 2.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Ginger", quantity: 1, unit: "inch", ingredientId: "ginger" },
        { name: "Garlic", quantity: 5, unit: "cloves", ingredientId: "garlic" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Cumin seeds", quantity: 1, unit: "tsp", ingredientId: "cumin" },
        { name: "Garam masala", quantity: 0.5, unit: "tsp", ingredientId: "garam-masala" },
      ],
      [
        "Coarsely grind fresh peas (keep texture — not a fine paste).",
        "Heat mustard oil to smoking point, cool slightly. Add cumin, ginger-garlic; sauté.",
        "Add tomato and spices; cook until oil separates.",
        "Add potato cubes and ground peas. Sauté 4–5 minutes. Add water for a thick gravy.",
        "Simmer until potatoes are soft and nimona thickens. Finish with garam masala. Serve with plain rice — Jaunpur winter classic.",
      ],
      {
        aliases: ["Green Peas Nimona", "Mattar Nimona", "Nimona"],
        region: ["Purvanchal", "Jaunpur", "Uttar Pradesh", "Awadh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special", "Traditional"],
        season: ["Winter"],
        tips: ["Fresh winter peas are non-negotiable for real nimona flavour."],
      }
    )
  );

  recipes.push(
    sabzi(
      "aloo-matar-nimona",
      "Aloo Matar Nimona",
      "आलू मटर निमोना",
      ["green-peas", "potato"],
      [
        { name: "Fresh green peas", quantity: 2, unit: "cups", ingredientId: "green-peas" },
        { name: "Potato", quantity: 3, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
        { name: "Ginger-garlic", quantity: 1, unit: "tbsp", ingredientId: "ginger" },
      ],
      [
        "Grind peas coarsely. Follow nimona method but keep potato as a prominent chunky element.",
        "Fry potato cubes first until lightly coloured before adding pea paste.",
        "Add tomato masala, spices and water.",
        "Simmer until thick and aromatic.",
        "Serve with steamed rice.",
      ],
      {
        aliases: ["Potato Peas Nimona"],
        region: ["Purvanchal", "Jaunpur", "Uttar Pradesh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
        season: ["Winter"],
      }
    )
  );

  recipes.push(
    sabzi(
      "matar-nimona-badi",
      "Matar Nimona with Badi",
      "बड़ी वाला मटर निमोना",
      ["green-peas", "badi"],
      [
        { name: "Fresh green peas", quantity: 2, unit: "cups", ingredientId: "green-peas" },
        { name: "Urad badi", quantity: 8, unit: "pieces", ingredientId: "badi" },
        { name: "Potato", quantity: 1, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
      ],
      [
        "Fry dried urad badis until reddish; soak in warm water 5 minutes; squeeze.",
        "Prepare nimona base with ground peas and tomato masala.",
        "Add badis and potato; simmer gently so badis absorb gravy without breaking.",
        "Adjust salt and chilli.",
        "Serve with rice — a hearty Purvanchal variation.",
      ],
      {
        region: ["Purvanchal", "Uttar Pradesh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
        season: ["Winter"],
      }
    )
  );

  recipes.push(
    sabzi(
      "matar-mushroom",
      "Matar Mushroom",
      "मटर मशरूम",
      ["green-peas", "mushroom"],
      [
        { name: "Mushroom, halved", quantity: 250, unit: "g", ingredientId: "mushroom" },
        { name: "Green peas", quantity: 1, unit: "cup", ingredientId: "green-peas" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Clean mushrooms; sauté on high flame until moisture evaporates.",
        "Make onion-tomato gravy; add spices.",
        "Add peas and mushrooms; simmer 8–10 minutes.",
        "Finish with garam masala and cream optional.",
        "Serve with roti or jeera rice.",
      ],
      { aliases: ["Mushroom Matar"] }
    )
  );

  recipes.push(
    sabzi(
      "matar-masala",
      "Matar Masala",
      "मटर मसाला",
      ["green-peas"],
      [
        { name: "Green peas", quantity: 2.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Make a thick onion-tomato masala.",
        "Add peas and little water; cook until soft and gravy coats the peas.",
        "Add garam masala.",
        "Garnish with coriander.",
        "Serve with paratha or puri.",
      ],
      { season: ["Winter"] }
    )
  );

  recipes.push(
    sabzi(
      "matar-pulao",
      "Matar Pulao",
      "मटर पुलाव",
      ["green-peas", "rice"],
      [
        { name: "Basmati rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Green peas", quantity: 1, unit: "cup", ingredientId: "green-peas" },
        { name: "Ghee", quantity: 2, unit: "tbsp", ingredientId: "ghee" },
        { name: "Whole spices (bay, cumin, clove)", quantity: 1, unit: "tsp", ingredientId: "bay-leaf" },
        { name: "Onion, sliced", quantity: 1, unit: "medium", ingredientId: "onion" },
      ],
      [
        "Soak rice 20 minutes. Heat ghee, fry whole spices and onion until golden.",
        "Add peas; sauté 1 minute. Add drained rice; coat in ghee.",
        "Add 2.75 cups water and salt. Cook covered on low until done (or pressure 1 whistle).",
        "Rest 5 minutes; fluff.",
        "Serve with raita or curry.",
      ],
      { categories: ["Lunch", "Dinner"], season: ["Winter", "All"] }
    )
  );

  recipes.push(
    sabzi(
      "matar-tahri",
      "Matar Tahri",
      "मटर तहरी",
      ["green-peas", "rice", "potato"],
      [
        { name: "Rice", quantity: 1.5, unit: "cups", ingredientId: "rice" },
        { name: "Green peas", quantity: 1, unit: "cup", ingredientId: "green-peas" },
        { name: "Potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Mustard oil", quantity: 3, unit: "tbsp", ingredientId: "mustard-oil" },
      ],
      [
        "Like aloo tahri, but add fresh peas with the potato.",
        "Fry potato in mustard oil, add spices, peas and rice.",
        "Add water and cook until fluffy.",
        "Rest and serve with mango pickle.",
        "Winter favourite across Awadh and Purvanchal.",
      ],
      {
        aliases: ["Peas Tehri"],
        region: ["Purvanchal", "Awadh", "Uttar Pradesh"],
        categories: ["Lunch", "Dinner", "Purvanchal Special"],
        season: ["Winter"],
      }
    )
  );

  recipes.push(
    R({
      id: "matar-kofta",
      name: "Matar Kofta",
      nameHi: "मटर कोफ्ता",
      aliases: ["Peas Kofta"],
      region: ["North India"],
      categories: ["Lunch", "Dinner"],
      mainIngredients: ["green-peas", "potato"],
      ingredients: [
        { name: "Green peas, boiled & mashed", quantity: 1.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Boiled potato", quantity: 2, unit: "medium", ingredientId: "potato" },
        { name: "Besan", quantity: 2, unit: "tbsp", ingredientId: "besan" },
        { name: "Onion", quantity: 2, unit: "medium", ingredientId: "onion" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
        { name: "Oil for frying", quantity: 1, unit: "cup", ingredientId: "oil" },
        ...spiceBase(),
      ],
      prepTime: 25,
      cookTime: 35,
      difficulty: "Medium",
      steps: [
        "Mix mashed peas, potato, besan, salt and chilli; shape koftas and fry until golden.",
        "Prepare onion-tomato gravy.",
        "Add koftas just before serving; simmer 3 minutes.",
        "Garnish with coriander.",
        "Serve with roti or pulao.",
      ],
      tips: ["Add koftas late so they do not break."],
      season: ["Winter"],
    })
  );

  recipes.push(
    sabzi(
      "matar-aloo-rasedar",
      "Matar Aloo Rasedar",
      "मटर आलू रसेदार",
      ["green-peas", "potato"],
      [
        { name: "Green peas", quantity: 1.5, unit: "cups", ingredientId: "green-peas" },
        { name: "Potato", quantity: 3, unit: "medium", ingredientId: "potato" },
        { name: "Tomato", quantity: 2, unit: "medium", ingredientId: "tomato" },
      ],
      [
        "Make tomato-based thin gravy with cumin tadka.",
        "Add potato and peas; add enough water for a rasedar (soupy) consistency.",
        "Simmer until soft.",
        "Finish with garam masala.",
        "Serve with plain rice or puri.",
      ],
      { season: ["Winter"], region: ["Uttar Pradesh", "North India"] }
    )
  );

  return recipes;
}

module.exports = { buildPart4 };
