/**
 * Data validation + audit report
 * Run: node scripts/validate-data.js
 */
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const recipes = JSON.parse(fs.readFileSync(path.join(dataDir, "recipes.json"), "utf8")).recipes;
const ingredients = JSON.parse(fs.readFileSync(path.join(dataDir, "ingredients.json"), "utf8")).ingredients;
const ingIds = new Set(ingredients.map((i) => i.id));

const report = {
  generatedAt: new Date().toISOString(),
  totalUniqueRecipes: recipes.length,
  byPrimaryCategory: {},
  byAnyCategory: {},
  purvanchalCount: 0,
  rajasthaniCount: 0,
  missingFields: [],
  duplicateIds: [],
  duplicateNameWarnings: [],
  invalidIngredientRefs: [],
  shortSteps: [],
  missingQuantities: [],
  seedCoverage: { found: [], missing: [] },
  passed: true,
};

const idSet = new Set();
const nameMap = new Map();

recipes.forEach((r) => {
  if (idSet.has(r.id)) report.duplicateIds.push(r.id);
  idSet.add(r.id);

  const key = (r.name || "").toLowerCase().trim();
  if (nameMap.has(key)) report.duplicateNameWarnings.push(`${r.id} ~ ${nameMap.get(key)}`);
  else nameMap.set(key, r.id);

  const cats = r.categories || [];
  if (cats[0]) report.byPrimaryCategory[cats[0]] = (report.byPrimaryCategory[cats[0]] || 0) + 1;
  cats.forEach((c) => {
    report.byAnyCategory[c] = (report.byAnyCategory[c] || 0) + 1;
  });
  if (cats.includes("Purvanchal Special") || (r.region || []).some((x) => /purvanchal|jaunpur|banaras|bihar/i.test(x)))
    report.purvanchalCount += 1;
  if (cats.includes("Rajasthani Special") || (r.region || []).some((x) => /rajasthan|jaipur/i.test(x)))
    report.rajasthaniCount += 1;

  const required = ["id", "name", "nameHi", "ingredients", "steps", "servings", "prepTime", "cookTime", "categories"];
  required.forEach((f) => {
    if (r[f] === undefined || r[f] === null || r[f] === "" || (Array.isArray(r[f]) && !r[f].length)) {
      report.missingFields.push(`${r.id}.${f}`);
    }
  });

  if (!r.steps || r.steps.length < 3) report.shortSteps.push(r.id);

  (r.ingredients || []).forEach((ing, idx) => {
    if (ing.quantity === undefined || ing.quantity === null || !ing.unit) {
      report.missingQuantities.push(`${r.id}#${idx}`);
    }
    if (ing.ingredientId && !ingIds.has(ing.ingredientId)) {
      report.invalidIngredientRefs.push(`${r.id}:${ing.ingredientId}`);
    }
  });

  (r.mainIngredients || []).forEach((id) => {
    if (!ingIds.has(id)) report.invalidIngredientRefs.push(`${r.id}:main:${id}`);
  });
});

// Seed checklist (deduped names from prompt)
const seedNames = [
  "Aloo Paratha","Paneer Paratha","Gobhi Paratha","Mooli Paratha","Methi Paratha","Palak Paratha","Sattu Paratha","Dal Paratha","Pyaz Paratha","Mix Veg Paratha","Gajar Paratha","Besan Paratha","Plain Paratha","Ajwain Paratha","Thepla",
  "Bedmi Puri","Dal Puri","Urad Dal Kachori","Matar Kachori","Aloo Kachori","Sattu Puri","Aloo Puri","Chooda Matar","Chana Ghugni","Matar Ghugni","Sattu Litti","Litti Chokha","Dal Pitha","Fara / Gojha","Bafauri",
  "Vegetable Poha","Kanda Poha","Indori Poha","Vegetable Upma","Vermicelli Upma","Besan Chilla","Moong Dal Cheela","Paneer Chilla","Suji Chilla","Idli Sambhar","Masala Dosa","Plain Dosa","Rava Dosa","Uttapam","Appe","Dhokla","Vegetable Daliya","Paneer Sandwich","Vegetable Sandwich",
  "Shahi Paneer","Matar Paneer","Palak Paneer","Paneer Butter Masala","Kadai Paneer","Paneer Bhurji","Paneer Do Pyaza","Paneer Lababdar","Achari Paneer","Methi Paneer","Paneer Kofta","Paneer Capsicum","Paneer Jalfrezi","Paneer Handi","Paneer Makhani","Paneer Pasanda","Paneer Tikka Masala","Methi Matar Malai",
  "Aloo Gobhi","Aloo Matar","Aloo Baingan","Aloo Methi","Aloo Beans","Aloo Capsicum","Aloo Tamatar Rasedar","Dum Aloo","Jeera Aloo","Aloo Palak","Aloo Gajar","Aloo Parwal","Aloo Lauki","Aloo Tinda","Aloo Kaddu","Aloo Pyaz","Aloo Chokha","Aloo Tahri",
  "Matar Nimona","Aloo Matar Nimona","Matar Nimona with Badi","Matar Mushroom","Matar Masala","Matar Pulao","Matar Tahri","Matar Kofta","Matar Aloo Rasedar",
  "Bhindi Masala","Bhindi Do Pyaza","Kurkuri Bhindi","Aloo Bhindi","Bharwa Bhindi","Dahi Bhindi","Gobhi Matar","Gobhi Masala","Gobhi Do Pyaza","Baingan Bharta","Baingan Chokha","Bharwa Baingan","Baingan Masala","Lauki Chana Dal","Lauki Kofta","Lauki Tamatar","Lauki Aloo","Tinda Masala","Bharwa Tinda","Parwal Aloo","Bharwa Parwal","Parwal Masala","UP Style Kaddu Sabzi","Khatti Meethi Kaddu","Bharwa Karela","Karela Pyaz","Cabbage Matar","Gajar Matar","Mooli Aloo","Palak Corn","Palak Aloo","Palak Chana","Methi Aloo","Mushroom Masala","Soya Matar","Stuffed Capsicum","Tawa Mix Veg","Vegetable Korma","Gatte Ki Sabzi",
  "Dal Tadka","Dal Fry","Dal Makhani","Moong Dal","Masoor Dal","Chana Dal","Urad Dal","Mix Dal","Panchmel Dal","Dal Palak","Lahsun Dal","Punjabi Chole","Pindi Chole","Chole Chawal","Kala Chana Masala","Kala Chana Ghugni","Rajma Masala","Rajma Chawal","Kashmiri Rajma","Lobia Curry","Lobia Masala","Punjabi Kadhi Pakora","Rajasthani Kadhi","UP Style Kadhi","Kadhi Chawal","Boondi Kadhi",
  "Vegetable Pulao","Jeera Rice","Paneer Pulao","Kashmiri Pulao","Vegetable Biryani","Paneer Biryani","Veg Fried Rice","Lemon Rice","Tomato Rice","Vegetable Tahri","Moong Dal Khichdi","Vegetable Khichdi","Masala Khichdi","Bajra Khichdi","Palak Khichdi",
  "Banarasi Aloo Tamatar","Banarasi Tamatar Chaat","Tamatar Chokha","Mix Chokha","Sattu Drink – Namkeen","Sattu Drink – Sweet","Bedmi Puri with Aloo Sabzi","Puri with Kaddu Sabzi",
  "Dal Baati Churma","Papad Ki Sabzi","Ker Sangri","Bajra Roti","Missi Roti","Jodhpuri Aloo","Mangodi Aloo","Rajasthani Khichdi",
  "Aloo Tikki","Papdi Chaat","Dahi Bhalla","Bhel Puri","Samosa","Aloo Pakoda","Pyaz Pakoda","Paneer Pakoda","Bread Pakoda","Vegetable Cutlet","Pav Bhaji","Veg Hakka Noodles","Suji Halwa","Besan Halwa","Moong Dal Halwa","Gajar Halwa","Kheer","Seviyan Kheer","Malpua","Gujiya","Thekua","Churma",
];

const recipeNames = new Set(recipes.map((r) => r.name.toLowerCase()));
const aliases = new Set();
recipes.forEach((r) => (r.aliases || []).forEach((a) => aliases.add(a.toLowerCase())));

seedNames.forEach((n) => {
  const ln = n.toLowerCase();
  const found =
    recipeNames.has(ln) ||
    aliases.has(ln) ||
    [...recipeNames].some((x) => x.includes(ln) || ln.includes(x)) ||
    recipes.some((r) => (r.nameHi && n.includes(r.name)) || SearchLike(r, n));
  if (found) report.seedCoverage.found.push(n);
  else report.seedCoverage.missing.push(n);
});

function SearchLike(r, n) {
  const blob = `${r.name} ${r.nameHi} ${(r.aliases || []).join(" ")}`.toLowerCase();
  return blob.includes(n.toLowerCase().split("–")[0].trim()) || blob.includes(n.toLowerCase().replace("–", "-").trim());
}

if (recipes.length < 200) report.passed = false;
if (report.duplicateIds.length) report.passed = false;
if (report.missingFields.length) report.passed = false;
if (report.shortSteps.length) report.passed = false;
if (report.missingQuantities.length) report.passed = false;
if (report.seedCoverage.missing.length) report.passed = false;
// invalid ingredient refs warn but null ids are ok; only fail on unknown non-null
const realInvalid = report.invalidIngredientRefs.filter((x) => !x.includes("null"));
if (realInvalid.length) report.passed = false;
report.invalidIngredientRefs = realInvalid;

const out = path.join(dataDir, "audit-report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));

const md = `# Recipe Data Audit Report

Generated: ${report.generatedAt}

## Summary
- **Total unique recipes:** ${report.totalUniqueRecipes}
- **Purvanchal-tagged / region:** ${report.purvanchalCount}
- **Rajasthani-tagged / region:** ${report.rajasthaniCount}
- **Seed list found:** ${report.seedCoverage.found.length}
- **Seed list missing:** ${report.seedCoverage.missing.length}
- **Validation passed:** ${report.passed ? "YES ✅" : "NO ❌"}

## Counts by any category tag
${Object.entries(report.byAnyCategory)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}

## Issues
- Duplicate IDs: ${report.duplicateIds.length ? report.duplicateIds.join(", ") : "none"}
- Missing fields: ${report.missingFields.length}
- Short steps (<3): ${report.shortSteps.length}
- Missing quantities: ${report.missingQuantities.length}
- Invalid ingredient refs: ${report.invalidIngredientRefs.length}
- Duplicate name warnings: ${report.duplicateNameWarnings.length}
- Missing seed recipes: ${report.seedCoverage.missing.length ? report.seedCoverage.missing.join("; ") : "none"}
`;

fs.writeFileSync(path.join(dataDir, "AUDIT_REPORT.md"), md);
console.log(md);
process.exit(report.passed ? 0 : 1);
