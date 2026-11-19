# ❤️ हमारा रसोई घर — Our Family Kitchen

**Jaunpur × Jaipur Family Kitchen** — a mobile-first, offline-capable vegetarian recipe website for Mom.

Built with plain HTML, CSS and JavaScript. No backend, no frameworks, no paid services.

## Features

- 227 unique vegetarian Indian recipes (Hindi + English)
- Hinglish/Hindi विधि (cooking steps) for easy reading
- Meal browsing: Breakfast, Lunch, Dinner, Snacks, Purvanchal, Rajasthani, Sweets
- **Separate Diabetes & Kidney Care module** (शुगर और किडनी स्पेशल) with suitability flags, configurable clinician limits, DK weekly planner — not a medical prescription
- Ingredient finder (match ANY / ALL vegetables on hand)
- Search across English, Hindi and aliases (e.g. matar / मटर / nimona)
- Recipe detail with scaled servings
- Easy cooking mode (one large step at a time)
- Favourites & recently cooked (localStorage)
- Weekly meal planner + shopping list
- Export / import personal backup JSON
- PWA install + service worker offline cache

## Local setup

1. Open a terminal in this folder (`family-kitchen`).
2. Start any static file server (required — `file://` will not load JSON):

```bash
# Python
python -m http.server 8080

# or Node
npx --yes serve -l 8080
```

3. Open [http://localhost:8080](http://localhost:8080) on your phone/computer.

## Regenerate / validate recipe data

```bash
node scripts/generate-all.js
node scripts/validate-data.js
```

Audit output:

- `data/audit-report.json`
- `data/AUDIT_REPORT.md`

## GitHub Pages deployment

1. Create a GitHub repository and push this `family-kitchen` folder as the repo root (or place these files at the repo root).
2. In GitHub: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (or `master`), folder: `/ (root)`.
5. Wait a minute, then open `https://<username>.github.io/<repo>/`.
6. On Mom’s phone: open the site in Chrome → **Add to Home Screen**.

HTTPS is required for the service worker. After the first successful online visit, core browsing/cooking works offline.

## Project structure

```
family-kitchen/
  index.html
  manifest.json
  service-worker.js
  README.md
  css/
  js/
  data/          # recipes.json (canonical DB), ingredients, categories, audit
  assets/icons/
  scripts/       # data generator + validator
```

## Limitations

- No food photographs (emoji / CSS placeholders by design — no external image APIs).
- Offline works only after the first successful load and cache.
- Shopping quantities from the planner are summed simply (not pantry-aware).
- Some Indo-Chinese items list “soy sauce” without a catalog ingredient id (still shown in the recipe text).

## For Mom

1. Open the site → tap **आज क्या बनाएं?** cards.
2. Or tap **सब्जी** and choose what is in the fridge.
3. Open a recipe → **Start Cooking** for big step-by-step text.
4. Heart recipes she likes — they stay on the phone.
