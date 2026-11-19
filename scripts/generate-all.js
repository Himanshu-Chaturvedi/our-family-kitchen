/**
 * Combines all recipe parts and writes data/*.json
 * Run: node scripts/generate-all.js
 */
const fs = require("fs");
const path = require("path");
const { recipes: part1, INGREDIENTS, CATEGORIES, OUT } = require("./generate-data");
const { buildPart2 } = require("./recipes-part2");
const { buildPart3 } = require("./recipes-part3");
const { buildPart4 } = require("./recipes-part4");
const { buildPart5 } = require("./recipes-part5");
const { buildPart6 } = require("./recipes-part6");
const { buildPart7 } = require("./recipes-part7");
const { buildPart8 } = require("./recipes-part8");

function normalize(r) {
  if (!r.otherIngredients) r.otherIngredients = [];
  // Derive otherIngredients from ingredientIds not in main
  const mains = new Set(r.mainIngredients || []);
  const others = new Set();
  (r.ingredients || []).forEach((ing) => {
    if (ing.ingredientId && !mains.has(ing.ingredientId)) others.add(ing.ingredientId);
  });
  r.otherIngredients = [...others];
  // Ensure every ingredient has quantity/unit
  r.ingredients = (r.ingredients || []).map((ing) => ({
    name: ing.name,
    quantity: ing.quantity ?? 1,
    unit: ing.unit || "as needed",
    ingredientId: ing.ingredientId ?? null,
  }));
  if (!r.steps || r.steps.length < 3) {
    throw new Error(`Recipe ${r.id} has fewer than 3 steps`);
  }
  if (!r.nameHi) throw new Error(`Missing nameHi: ${r.id}`);
  return r;
}

const all = [
  ...part1,
  ...buildPart2(),
  ...buildPart3(),
  ...buildPart4(),
  ...buildPart5(),
  ...buildPart6(),
  ...buildPart7(),
  ...buildPart8(),
].map(normalize);

// Dedupe by id
const map = new Map();
for (const r of all) {
  if (map.has(r.id)) {
    console.warn("Duplicate id skipped (keeping first):", r.id);
    continue;
  }
  map.set(r.id, r);
}
const unique = [...map.values()];

if (unique.length < 200) {
  console.error("ERROR: Only", unique.length, "unique recipes — need >= 200");
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "recipes.json"), JSON.stringify({ recipes: unique }, null, 2));
fs.writeFileSync(path.join(OUT, "ingredients.json"), JSON.stringify({ ingredients: INGREDIENTS }, null, 2));
fs.writeFileSync(path.join(OUT, "categories.json"), JSON.stringify({ categories: CATEGORIES }, null, 2));

console.log("Wrote", unique.length, "recipes to data/recipes.json");
console.log("Ingredients:", INGREDIENTS.length);
console.log("Categories:", CATEGORIES.length);

// Quick category counts
const counts = {};
unique.forEach((r) => {
  (r.categories || []).forEach((c) => {
    counts[c] = (counts[c] || 0) + 1;
  });
});
console.log("Category tags:", counts);
