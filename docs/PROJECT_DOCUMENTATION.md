# Our Family Kitchen — Complete Project Documentation

**हमारा रसोई घर · Jaunpur × Jaipur Family Kitchen**

| Item | Detail |
|------|--------|
| Live site | https://himanshu-chaturvedi.github.io/our-family-kitchen/ |
| Repository | https://github.com/Himanshu-Chaturvedi/our-family-kitchen |
| Type | Static PWA (Progressive Web App) |
| Stack | HTML5 · CSS3 · Vanilla JavaScript · JSON data |
| Backend | None (no API, no database server, no auth) |
| Hosting | GitHub Pages (free) |
| Offline | Service Worker caches app shell + recipe data |
| Primary users | Mother (simple cooking UI) · Father care via separate DK module |

---

## 1. Project purpose

A mobile-first family recipe website so Mom can:

1. Open the site on her phone (or install to home screen).
2. Tap Breakfast / Lunch / Dinner / regional specials.
3. Find dishes by vegetables she has.
4. Open a recipe with ingredients + Hinglish विधि.
5. Cook step-by-step in large-text cooking mode.
6. Save favourites, plan a week, make a shopping list.

Separately, a **Diabetes & Kidney Care** module helps the family pick more cautious recipes for Papa — without mixing those rules into everyday family cooking.

**Design goals:** large tap targets, Hindi + English labels, warm kitchen look, works offline after first load, zero paid services.

---

## 2. What’s included (feature inventory)

### 2.1 Family kitchen (main app)

| Feature | Description |
|---------|-------------|
| Home dashboard | “आज क्या बनाएं?” + meal / region cards |
| Meal categories | Breakfast, Lunch, Dinner, Evening Snacks |
| Regional | Purvanchal Special, Rajasthani Special |
| Sweets | मिठाई section |
| Diabetes Special (general) | Lighter tagged family recipes (not the medical care module) |
| Search | English, Hindi, aliases, ingredients |
| Ingredient finder | Multi-select sabzi · Match ANY / Match ALL |
| Recipe detail | Times, servings scaler, ingredients, Hinglish steps, tips |
| Cooking mode | One large step at a time · Previous / Next |
| Favourites | Heart recipes · stored in localStorage |
| Recently cooked | History of marked-cooked dishes |
| Random recipe | “आज कुछ अलग बनाएं” |
| Weekly planner | Mon–Sun · Breakfast / Lunch / Dinner |
| Shopping list | From planner + custom items + checklist |
| Serving adjuster | + / − servings scales quantities |
| Seasonal chip | Home suggestion by current season |
| Backup export/import | JSON backup of personal data |
| Reset preferences | Clears local favourites/planner/etc. |
| Offline + PWA | Installable · offline after first cache |
| In-app back | Stack resets on Home so old visits aren’t replayed |

### 2.2 Diabetes & Kidney Care module (separate)

| Feature | Description |
|---------|-------------|
| Separate hub | Home → ❤️ Diabetes & Kidney Care |
| Sub-sections | Breakfast, Lunch, Dinner, Snacks, Kidney-conscious |
| Suitable recipes | Filtered by suitability status |
| DK weekly planner | Breakfast · Mid-morning · Lunch · Evening · Dinner |
| DK shopping list | Generated from DK planner |
| Care filters | Low sugar, controlled carbs, low sodium, protein/K/P-conscious |
| Clinician limits | Optional local config (carbs/protein/Na/K/P/fluid) |
| Suitability badges | Within limits / portion adjust / substitution / dietitian review / not recommended |
| Nutrition display | Shows “Nutrition estimate unavailable” unless reliable data exists (no invented numbers) |
| Medical disclaimer | Not a treatment system; does not claim to reverse diabetes or repair kidneys |

---

## 3. Technology & constraints

### Used

- HTML5, CSS3, Vanilla JS (ES5+/modern browser)
- Local JSON datasets
- `localStorage` for personal preferences
- Service Worker + Web App Manifest (PWA)
- GitHub Pages + GitHub Actions deploy

### Explicitly not used

- No backend / API / DB server  
- No login / authentication  
- No React / Vue / other frameworks  
- No CDN libraries  
- No external image APIs / Google Fonts dependency  
- No paid services  

### Cost

**₹0** to host and run (GitHub free tier).

---

## 4. Repository structure

```
family-kitchen/
├── index.html                 # App shell + all main views
├── manifest.json              # PWA install manifest
├── service-worker.js          # Offline cache (versioned)
├── .nojekyll                  # Disable Jekyll on Pages
├── .gitignore
├── README.md                  # Short setup / deploy notes
├── docs/
│   └── PROJECT_DOCUMENTATION.md   # This file
├── css/
│   ├── style.css              # Theme, layout, DK styles
│   └── responsive.css         # Breakpoints / a11y motion
├── js/
│   ├── app.js                 # UI rendering + routing handlers
│   ├── router.js              # Hash router + back stack
│   ├── storage.js             # localStorage helpers + backup
│   ├── search.js              # Search + ingredient match
│   ├── filters.js             # Active filter state
│   ├── planner.js             # Family weekly planner
│   ├── shopping.js            # Shopping list builder
│   ├── cooking-mode.js        # Step-by-step cook UI state
│   └── dk-care.js             # Diabetes & Kidney Care logic
├── data/
│   ├── recipes.json           # Canonical family recipe DB
│   ├── ingredients.json       # Ingredient catalog
│   ├── categories.json        # Meal/region categories
│   ├── dk-recipes.json        # Separate DK care recipes
│   ├── AUDIT_REPORT.md        # Last validation summary
│   └── audit-report.json      # Machine-readable audit
├── assets/icons/
│   ├── icon-192.png
│   └── icon-512.png
├── scripts/                   # Data generation & validation (Node)
│   ├── generate-all.js
│   ├── generate-data.js
│   ├── generate-dk-recipes.js
│   ├── build-steps-hi.js
│   ├── enrich-recipes.js
│   ├── validate-data.js
│   └── recipes-part2.js … part8.js
└── .github/workflows/
    └── pages.yml              # Deploy to GitHub Pages
```

---

## 5. Data model

### 5.1 Family recipe (`data/recipes.json`)

Canonical list: **227 unique recipes** (seed list included; overlaps deduplicated).

```json
{
  "id": "matar-nimona",
  "name": "Matar Nimona",
  "nameHi": "मटर का निमोना",
  "aliases": ["Green Peas Nimona", "Mattar Nimona"],
  "region": ["Purvanchal", "Jaunpur", "Uttar Pradesh"],
  "categories": ["Lunch", "Dinner", "Purvanchal Special", "Traditional"],
  "mainIngredients": ["green-peas", "potato"],
  "otherIngredients": ["tomato", "mustard-oil", "..."],
  "ingredients": [
    { "name": "Fresh green peas", "quantity": 2.5, "unit": "cups", "ingredientId": "green-peas" }
  ],
  "servings": 4,
  "prepTime": 15,
  "cookTime": 25,
  "difficulty": "Easy",
  "steps": ["English step…"],
  "stepsHi": ["Hinglish/Hindi विधि…"],
  "tips": ["…"],
  "tipsHi": ["…"],
  "season": ["Winter"],
  "diet": "Vegetarian",
  "diabetesNotes": "Optional note when tagged Diabetes Special"
}
```

**Rules used while building the DB**

- One canonical `id` per dish (no duplicate inflation).  
- Overlapping seed names (e.g. Matar Paneer in multiple lists) share one record with multiple `categories`.  
- Every recipe has quantities, ≥3 meaningful steps, Hindi + English names.  
- UI prefers `stepsHi` / `tipsHi` when present.

### 5.2 Ingredients (`data/ingredients.json`)

~**97** ingredients with `id`, `name`, `nameHi`, `category` (Potato, Paneer, Matar, Dal, etc.) for the finder UI.

### 5.3 Categories (`data/categories.json`)

Breakfast, Lunch, Dinner, Evening Snacks, Purvanchal Special, Rajasthani Special, Sweets, Traditional, Diabetes Special.

### 5.4 DK care recipes (`data/dk-recipes.json`)

**24** recipes in a **separate** file/module so general family recipes are never treated as automatically “safe” for kidney impairment.

Important fields:

| Field | Purpose |
|-------|---------|
| `module` | Always `diabetes-kidney-care` |
| `dkCategories` | Breakfast / Lunch / Dinner / Snacks / Kidney-conscious |
| `mealSlots` | Planner slots |
| `flags` | lowAddedSugar, controlledCarbs, lowSodium, proteinConscious, potassiumConscious, phosphorusConscious |
| `suitabilityDefault` | Default badge before/without configured limits |
| `nutrition` | Usually `{ status: "unavailable", label: "Nutrition estimate unavailable" }` |
| `portionGuidance` | How much to serve |
| `substitutions` | Safer swaps where relevant |
| `dietaryNotes` | Care notes |
| `medicalDisclaimer` | true |

DK category IDs:

- Diabetes-Friendly Breakfast  
- Diabetes-Friendly Lunch  
- Diabetes-Friendly Dinner  
- Healthy Snacks  
- Special Kidney-Conscious Recipes  

### 5.5 Historical health context (DK module only)

Documented as **historical shared values**, not current labs / not fixed prescriptions:

- HbA1c ≈ 11  
- Creatinine 3.39  
- eGFR 20  
- Urea 155.2  
- Potassium 4.06  
- Sodium 131  
- Weight used earlier ≈ 90 kg  

Limits for Na / protein / K / P / carbs / fluid are **user-configurable locally** after clinician advice. The app does **not** invent fixed daily medical targets.

---

## 6. Application architecture

### 6.1 Routing

Hash router in `js/router.js`:

| Route | Screen |
|-------|--------|
| `#/home` | Dashboard |
| `#/category/<Name>` | Recipe list by category |
| `#/search/<query>` | Search results |
| `#/recipe/<id>` | Family recipe detail |
| `#/cooking/<id>` | Cooking mode |
| `#/finder` | Ingredient finder |
| `#/favourites` | Favourites |
| `#/recent` | Recently cooked |
| `#/random` | Random recipe redirect |
| `#/planner` | Family weekly planner |
| `#/shopping` | Shopping list |
| `#/settings` | Backup / reset |
| `#/all` | All family recipes |
| `#/dk` | DK Care hub |
| `#/dk/cat/<name>` | DK category list |
| `#/dk/recipe/<id>` | DK recipe detail |
| `#/dk/planner` | DK weekly planner |
| `#/dk/limits` | Clinician limits form |
| `#/dk/suitable` | Suitable DK recipes |

**Back behaviour**

- In-app back uses an internal stack (not endless browser history replay).  
- Landing on **Home** or bottom-nav tabs **clears** the stack.  
- Flow example: Home → Breakfast → Dish → Back → Breakfast → Back → Home → **stop** (does not reopen old Lunch visits).

### 6.2 Modules (JS)

| File | Responsibility |
|------|----------------|
| `app.js` | Load data, render all views, wire clicks, SW register |
| `router.js` | Navigation, stack, roots/reset |
| `storage.js` | Favourites, recent, planner, shopping, backup |
| `search.js` | Text scoring + ingredient ANY/ALL match |
| `planner.js` / `shopping.js` | Family meal plan + shop aggregation |
| `cooking-mode.js` | Step cursor (uses `stepsHi` when available) |
| `dk-care.js` | Limits, DK planner/shop, filters, suitability |

### 6.3 Persistence (`localStorage` keys)

| Key | Content |
|-----|---------|
| `ofk_favourites` | Favourite recipe ids |
| `ofk_recent` | Recently cooked `{id, at}` |
| `ofk_planner` | Family week plan |
| `ofk_shopping` | Family shopping items |
| `ofk_custom_shop` | Extra shopping lines |
| `ofk_dk_limits` | DK clinician limits |
| `ofk_dk_planner` | DK week plan (5 slots/day) |
| `ofk_dk_shop` | DK shopping checklist |
| `ofk_dk_filters` | DK filter chip state |

Backup export version includes family + DK keys (`version: 2`).

### 6.4 Offline / PWA

- `manifest.json` — name, icons, standalone, theme colours.  
- `service-worker.js` — versioned cache (`family-kitchen-v5` at time of writing).  
  - App shell / JS / CSS: network-first (updates aren’t stuck forever).  
  - Other assets: cache-friendly with network update.  
- After first successful online load, core browsing/cooking works offline.  
- HTTPS required (GitHub Pages provides this).

---

## 7. UI / UX notes (for Mom)

- Mobile-first, max width ~720px centered.  
- Cream background, soft green + orange accents.  
- Large cards and buttons.  
- Hindi labels next to English.  
- Recipe विधि shown in Hinglish/Hindi first.  
- Cooking mode: big step text, बड़े Previous/Next.  
- DK hub uses a distinct rose-tinted card style so it’s obviously separate.  
- No dependency on food photos (emoji / CSS placeholders).

---

## 8. Diabetes & Kidney Care — safety rules

This module is a **recipe & meal-planning assistant**, not medical treatment.

**Does**

- Keep DK recipes in a separate dataset/UI.  
- Prefer no added sugar; low-salt cooking style; controlled carb portions.  
- Avoid default recommendations for pickle, papad, packaged high-sodium snacks.  
- Avoid high-protein “push” diets; dal/paneer/nuts used cautiously with review flags.  
- Warn about potassium / phosphorus consciousness.  
- Forbid recommending potassium-based salt substitutes in copy.  
- Show suitability statuses; require dietitian review when limits/nutrition aren’t sufficient.

**Does not**

- Claim to reverse diabetes, improve eGFR, or repair kidneys.  
- Set fixed Na/K/P/protein/fluid targets without clinician configuration.  
- Invent nutrition numbers (shows unavailable instead).  
- Auto-label a recipe “safe” only because it has no sugar.

**Suitability statuses**

1. Suitable within configured dietary limits  
2. Suitable with portion adjustment  
3. Requires ingredient substitution  
4. Requires renal dietitian review  
5. Not recommended under current configured restrictions  

Without configured limits, recipes are never auto-promoted to “within limits.”

---

## 9. Local development

### Prerequisites

- Any modern browser  
- A static file server (required — `file://` cannot fetch JSON reliably)  
- Node.js (only for regenerating/validating data)

### Run locally

```bash
cd family-kitchen
python -m http.server 8080
# or: npx --yes serve -l 8080
```

Open http://localhost:8080

### Regenerate / validate family recipes

```bash
node scripts/generate-all.js      # rebuild recipes/ingredients/categories from generators
node scripts/build-steps-hi.js    # refresh Hinglish विधि
node scripts/enrich-recipes.js    # diabetes tags + extras (optional pipeline step)
node scripts/validate-data.js     # writes data/AUDIT_REPORT.md
```

### Regenerate DK recipes

```bash
node scripts/generate-dk-recipes.js
```

---

## 10. GitHub Pages deployment

### Current setup

1. Repo: `Himanshu-Chaturvedi/our-family-kitchen`  
2. Workflow: `.github/workflows/pages.yml`  
3. On push to `main`, GitHub Actions uploads the static site and deploys Pages.  
4. `.nojekyll` prevents Jekyll from breaking raw assets.

### Manual checklist if redeploying elsewhere

1. Push project to GitHub (site files at repo root).  
2. Enable Pages (Actions or branch deploy).  
3. Wait for green workflow.  
4. Open `https://<user>.github.io/<repo>/`.  
5. On phone: Chrome → Add to Home Screen.

### Force users to see updates

- Service worker cache version bump (already done on releases).  
- Script tags use `?v=N` query on `index.html`.  
- Mom may need one hard refresh or re-add the home-screen icon after big updates.

---

## 11. How Mom uses it (short guide)

1. Open the live link (or home-screen icon).  
2. Tap a meal card — e.g. नाश्ता / दोपहर.  
3. Or tap **सब्जी** and select vegetables at home.  
4. Open a dish → read सामग्री → tap **Start Cooking**.  
5. Heart ❤️ dishes she likes.  
6. Optional: Plan week → Generate shopping list.  
7. For Papa’s cautious cooking: open **Diabetes & Kidney Care** only (separate section).

---

## 12. How the family uses DK Care

1. Home → **Diabetes & Kidney Care**.  
2. Read the medical safety note.  
3. (Optional) **Configure dietary limits** only with nephrologist / renal dietitian numbers.  
4. Browse Breakfast / Lunch / Dinner / Snacks / Kidney-conscious.  
5. Check suitability badge + portion guidance.  
6. Use DK Weekly Planner + shopping list if helpful.  
7. Always cross-check with **latest** blood reports and the treating doctor.

---

## 13. Content counts (at documentation time)

| Dataset | Count |
|---------|------:|
| Family recipes | 227 |
| DK care recipes | 24 |
| Ingredients catalog | 97 |
| Family categories | 9 (incl. Traditional + Diabetes Special tag) |
| DK categories | 5 |

Exact audit details: `data/AUDIT_REPORT.md`.

---

## 14. Scripts reference

| Script | Output / effect |
|--------|-----------------|
| `generate-data.js` | Helpers + early paratha seed + ingredient/category defs |
| `recipes-part2.js` … `part8.js` | Rest of family recipe definitions |
| `generate-all.js` | Writes `recipes.json`, `ingredients.json`, `categories.json` |
| `build-steps-hi.js` | Fills/refreshes `stepsHi` |
| `enrich-recipes.js` | Diabetes Special tagging + a few extras |
| `generate-dk-recipes.js` | Writes `dk-recipes.json` |
| `validate-data.js` | Uniqueness, required fields, seed coverage, audit files |

---

## 15. Limitations (honest)

1. No professional food photography (emoji/CSS only).  
2. Hinglish steps are template-assisted for scale — signature dishes (e.g. nimona, aloo paratha) have stronger custom text; others follow solid home-style patterns.  
3. Nutrition macros for DK are intentionally **unavailable** unless reliable data is later added correctly.  
4. Shopping list sums planner ingredients simply (not pantry-aware).  
5. Offline needs one successful online visit first.  
6. DK module does **not** replace a renal dietitian.  
7. Old “Diabetes Special” family tags are lighter lifestyle tags — **not** the same as the DK Care module.  
8. Service-worker updates sometimes need a manual refresh on phones.

---

## 16. Acceptance mapping (original family kitchen brief)

| Requirement | Status |
|-------------|--------|
| Static HTML/CSS/JS + local JSON | Done |
| No backend / paid services / frameworks | Done |
| Mobile-first Hindi+English kitchen UI | Done |
| Home meal + regional cards | Done |
| 200+ unique complete recipes | Done (227) |
| Seed collection covered / deduped | Done (see audit) |
| Ingredient finder ANY/ALL | Done |
| Search EN/HI/aliases | Done |
| Recipe detail + cooking mode | Done |
| Favourites, recent, random | Done |
| Weekly planner + shopping | Done |
| Serving adjust + backup import/export | Done |
| PWA offline + Pages hosting | Done |
| Validation script + audit | Done |
| Separate Diabetes & Kidney Care module | Done (added later by family need) |

---

## 17. Maintenance cheat-sheet

**Add a family recipe**

1. Add to the appropriate `scripts/recipes-part*.js` (or extend generator).  
2. `node scripts/generate-all.js`  
3. `node scripts/build-steps-hi.js`  
4. `node scripts/validate-data.js`  
5. Commit + push `main` (Pages auto-deploys).

**Add a DK care recipe**

1. Edit `scripts/generate-dk-recipes.js`.  
2. `node scripts/generate-dk-recipes.js`  
3. Keep nutrition honest (unavailable unless verified).  
4. Push.

**Bump offline cache after big UI changes**

1. Raise `CACHE` in `service-worker.js` (e.g. v5 → v6).  
2. Raise `?v=` on script tags in `index.html`.  
3. Push.

---

## 18. Contacts / ownership

| Role | Notes |
|------|--------|
| Family kitchen content | Jaunpur × Jaipur home vegetarian cooking |
| Technical repo | GitHub `our-family-kitchen` |
| Live URL | GitHub Pages link above |
| Medical decisions | Treating physician / nephrologist / renal dietitian only |

---

## 19. License / privacy

- Personal family project source hosted publicly on GitHub Pages for easy phone access.  
- No user accounts; all personal data stays in the phone’s `localStorage`.  
- Clearing site data / reset preferences removes local favourites and plans.  
- Do not commit secrets (there are none required for this stack).

---

*Document generated for the Our Family Kitchen project. Keep this file updated when features or counts change.*
