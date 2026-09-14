# Xiamen → Wenchang: family travel decision dashboard

A static web app that answers one question:

> **What is the best overall way for a family of four with a 3-year-old and an 8-month-old to travel from Xiamen to Wenchang, Hainan for the September 2026 rocket launch?**

It compares five realistic strategies — drive + ferry with our own car, fly to Haikou + rent, fly to Sanya + rent, HSR + the Qiongzhou Strait rail-ferry sleeper + rent, and a one-way fly-in-Haikou/fly-out-Sanya hybrid — across cost, door-to-door time, toddler comfort, reliability, transfers, island mobility, luggage capacity and stress.

**Available in English and Simplified Chinese** (English / 中文 switch in the header).

**Plus a Packing tab**: the family's own 314-row packing list as an interactive, colour-coded checklist.

Everything is adjustable: weights, prices and durations are live inputs, and the recommendation, rankings and badges recalculate instantly. All edits persist in `localStorage`.

## Languages / 语言

The header has an EN / 中文 switch. The choice is saved in `localStorage`, updates `<html lang>` and the document title, and applies to **everything** — interface chrome, the researched prose, cost-line labels, timeline segments, assumption labels and units, and the generated scoring sentences ("¥6,879 — 25% more than…" becomes 「¥6,879 —— 比自驾 + 轮渡（¥5,524）贵 25%。」).

Translations are structural, not best-effort. Every user-facing string is typed as:

```ts
export interface Bi { en: string; zh: string }
```

so a missing translation is a **compile error**, not a silent fallback to English.

To add a language (or fix a translation):

1. **Interface chrome** — `src/i18n/ui.ts` holds every label and generated template, keyed by name, with `{placeholders}` for interpolation.
2. **Data prose** — each module under `src/data/` (and `src/data/options/`) carries its own `{ en, zh }` values next to the numbers they describe.
3. Add the new language to the `Lang` union in `src/data/types.ts`, to `LANGS`/`HTML_LANG`/`LOCALE` in `src/i18n/lang.ts`, and TypeScript will point you at every remaining string.

Dates and durations are formatted per locale (`formatDate`, `formatDuration` in `src/lib/format.ts`), so English reads "1 d 22 h" where Chinese reads 「1 天 22 小时」.

## Run it locally

```bash
bun install
bun run dev        # http://localhost:5173
```

Other scripts:

```bash
bun run build      # type-check + production build into dist/
bun run preview    # serve the built site
bun run typecheck  # tsc only
```

No backend, no API keys, no runtime data fetching. The build output in `dist/` is a plain static site.

## Deploy

The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, and Vite is configured with `base: './'` so the site works at a project URL (`https://<user>.github.io/<repo>/`) as well as at a domain root.

> **Note on this repository.** It is currently **private**, and GitHub Pages on a private repository requires a paid plan — the API says so explicitly: *"Your current plan does not support GitHub Pages for this repository."* The first deploy therefore worked while the repository was public, and the deploy job will fail with a 404 from `actions/deploy-pages` until either the repository is made public or the account is upgraded.

**To publish it, pick one:**

1. **Make the repository public** — Settings → General → Danger Zone → Change visibility → Public. Then re-run the `Deploy to GitHub Pages` workflow (Actions → Deploy to GitHub Pages → Run workflow), and set Settings → Pages → Source to **GitHub Actions**. Free, and the workflow in the repo already does the rest.
2. **Keep it private and use a host that allows private repositories** — Cloudflare Pages, Netlify and Vercel all deploy private GitHub repos on their free tiers: connect the repo, set the build command to `bun run build` and the output directory to `dist`.
3. **Keep it private with no CI** — `bun run build`, then drag the `dist/` folder onto Netlify Drop or Cloudflare Pages' direct-upload page. No repository connection needed.

Local preview of the production build:

```bash
bun run build && bun run preview
```

## Where the data lives

Presentation and travel data are deliberately separated. To update the app for a new launch window or new prices, you normally touch only `src/data/`.

| File | What it holds |
| --- | --- |
| `src/data/trip.ts` | Trip constants: travellers, dates, launch window, and every place with coordinates for the schematic map. |
| `src/data/assumptions.ts` | **Every editable number** — fuel prices, tolls, ferry tickets, airfares, rental rates, child seats, buffers. Defaults carry a confidence label and a note saying what to replace them with. |
| `src/data/options/*.ts` | One file per transport option (drive + ferry, fly to Haikou, fly to Sanya, rail + rail-ferry sleeper, one-way hybrid): route legs, cost-line formulas, timelines, scores with written justifications, pros/cons and contingencies. `src/data/transport-options.ts` just collects them in order. |
| `src/data/launch.ts` | Launch status and caveats, viewing spots, the launch-morning plan, noise guidance, postponement mechanics. |
| `src/data/itinerary.ts` | Two itineraries for five travellers — five nights home from Sanya (recommended) and six nights home from Haikou — plus the launch-slip contingency plan. |
| `src/data/bases.ts` | Where to stay, activities with age suitability, and family logistics. |
| `src/data/budget.ts` | The trip budget: your four flight quotes, every Wenchang and Clearwater Bay room and villa price, and the five package shapes. |
| `src/data/packing/*.ts` | The family packing list, split by area (`documents`, `adults`, `children`, `bags`, `medical`, `practical`) and collected in the order of the original document by `index.ts`. Each row keeps the importance tier it had in the source; the UI renders that as text colour instead of a repeated label. |
| `src/data/sources.ts` | Every source with its verification date, plus the honest statement of what could not be verified. |
| `src/i18n/` | `ui.ts` (every interface label and generated sentence, in both languages) and `lang.ts` (the `Bi` resolver, `fill()` interpolation, locale map). |
| `src/lib/` | The engines: cost lines, time model, weighted scoring, **`budget.ts`** (trip totals and the value score), formatting, `localStorage` persistence. |

### Adding an editable number

Append to `ASSUMPTION_DEFS` in `src/data/assumptions.ts`:

```ts
{
  key: 'myNewCost',
  label: 'What it is',
  group: 'flight',              // drive | ferry | flight | rental | train | family
  unit: '¥',
  def: 250,                     // default used in the maths
  min: 0, max: 1000, step: 10,  // slider/input bounds
  confidence: 'estimate',       // verified | estimate | assumption
  note: 'Where this comes from and what to check.',
}
```

It then appears in the Costs tab automatically, and any option's `costLines` function can read it via `a.myNewCost`. `unit: 'on/off'` renders a toggle instead of a number.

### Scoring

- **Cost** and **travel time** are not hand-scored: they are computed from the calculator and scored relative to the best option (cheapest/fastest = 100, others scale by ratio, floored at 12).
- The other six categories are researched judgements (0–100) with a written reason attached to each.
- Weights are relative and normalised to 100%. Presets: Balanced, Toddler first, Cheapest, Shortest days, Max flexibility.
- Badges: Best overall (weighted), Cheapest, Fastest, Easiest with toddlers, Most flexible.

**Conventions:** costs are round trip (what the family actually pays); travel times are the outbound journey only (the leg that has to land before the launch), with overnight sleep reported separately as "awake travel time".

## What the app currently concludes

**Transport** (with the default weights):

| Option | Score | Wins |
| --- | --- | --- |
| Fly XMN → HAK + rent | 81 | Best overall, Fastest, Easiest with toddlers |
| Fly in to Haikou, out of Sanya (one-way rental) | 80 | — (a very close second; the one-way fee is the whole gap) |
| Fly to Sanya + rent | 72 | — |
| Drive + ferry (own car) | 64 | Cheapest, Most flexible |
| HSR + rail-ferry sleeper + rent | 55 | — |

**Trip budget** (five travellers, using your own screenshots for flights and accommodation):

| Shape | Total | Value | Note |
| --- | --- | --- | --- |
| Cheapest flights: in via Sanya, out via Haikou | **¥14,949** | 63 | Saves ¥1,000 on airfare but adds two long north–south drives and a pre-dawn start |
| **Hotels · 5 nights · home from Sanya** | **¥15,565** | **69** | Best value: one-way drive, 2 beach nights in hotel rooms, no backtracking |
| Pool villa · 5 nights · home from Sanya | ¥16,001 | 64 | ¥436 more than the hotel shape, buys a private pool, a kitchen and grandma her own bedroom |
| Hotels · 6 nights · home from Haikou | ¥16,081 | 35 | The extra beach night costs a 3-hour drive back north and a 09:20 departure |
| Pool villa · 6 nights · home from Haikou | ¥16,965 | 19 | Most comfortable on paper, worst on logistics and price |

The headline finding is that **the five shapes sit within ¥2,016 of each other — about 13% of the trip**. That is small enough that this should be a comfort decision rather than a price decision, which is why the value column weights cost and comfort equally (50/50) instead of letting the cheapest shape win by default.

The villa is the interesting case: over two beach nights it costs ¥436 more than two hotel rooms, and self-catering claws back roughly ¥1,100 in food — so it is close to break-even *and* gives the grandmother her own bedroom. Over three nights the villa's extra night rate outruns the food saving.

## How the screenshots were read

This build environment has no vision model, so the 11 booking-app screenshots were read with **Windows' built-in OCR engine** (`Windows.Media.Ocr`, zh-Hans, at 3× scale — see `.ocr/ocr2.ps1`). The extracted text is genuine, but OCR can misread a digit, so those figures carry their own confidence level — **“From your screenshot”** — distinct from Verified/Estimate/Assumption, and every one of them is editable in the Budget tab.

OCR is why some flight numbers are recorded as ambiguous (MF8541 / MF8341): the digits were not legible enough to be certain, and the app says so rather than picking one.

## Confidence labels

Every figure is labelled **Verified**, **Estimate** or **Assumption**, and the labels are visible in the UI. Verified means it comes from a named source listed in the Sources tab — for example the launch window corroborated by two airspace-notice databases, the ferry fare of ¥415.50 for a car plus driver, children under 1.2 m travelling free, the 1,183 km / ¥638-toll drive to Xuwen Port, the absence of any through train from Xiamen, the ¥27 / 28-minute Haikou East → Wenchang HSR hop, and the airlines' child-fare and baggage rules.

**No figure here is a live quote.** Airfare and rental-rate pages block automated access, so those remain researched ranges by design — replace them in the Costs tab.

## What still needs verification before booking

These are the items where the app deliberately cannot promise anything:

1. **The launch.** The 17 September 2026 08:30 CST window (08:25–08:54) is corroborated by two independent airspace-notice databases and by Wenchang no-fly notice 文府函〔2026〕441号 — but there is **no official mission announcement** from CMSA, CNSA or CASC, the payload identity is flagged as uncertain, and the same notice trail shows the window already slipped five days. Re-check the notice, and check CNSA / CMSA / CASC and the Wenchang government channel (文昌发布).
2. **Launch-day access and viewing tickets.** Whether tickets are on sale for this mission, child and infant ticket rules, road closures around 龙楼镇, parking and how early the perimeter closes.
3. **Ferry booking.** Sailings, prices and the check-in cut-off change; confirm in the 琼州海峡轮渡管家 mini-program. Reservation is mandatory — there is no ticket office at the port, and the presale window is 15 days.
4. **Airfares** for the exact dates, including infant and child tickets and baggage rules.
5. **Rental rates**, the one-way drop-off fee, and — critically — whether an infant car seat can actually be reserved.
6. **Rail tickets.** 12306 opens sales 15 days ahead; Guangzhou Baiyun → Haikou sleeper berths sell out quickly.
7. **Typhoon risk.** Mid-September is peak season; a warning changes both the ferry and the flight picture (check 中国天气网).
8. **Every price read out of your screenshots** — the four airfares, all the hotel and villa rates — because OCR can misread a digit. They are labelled “From your screenshot” and are editable in the Budget tab.
9. **Car hire for five.** Whether a 7-seat MPV is available at the rate assumed, and — critically — whether an infant car seat can actually be reserved in Hainan.
10. **Launch-night availability in Longlou.** The 90–95% occupancy figure is verified, and the Fulou rates in your screenshot are for 16–18 September, so book early.
11. **Whether launch viewing needs a ticket this time,** and whether children and infants are ticketed. The budget leaves a line for this, defaulted to zero.

## Packing checklist

The **Packing** tab is the family's own packing list (`packing-list.txt`, the source document kept in this repo) turned into an interactive checklist — 314 rows across 14 sections, in the order of the original.

- **The importance words are gone from the rows.** The source labelled every line `MUST BRING` / `HIGHLY USEFUL` / `USEFUL` / `OPTIONAL` / `BUY IN SANYA`; repeating those words 314 times was how the document read, and it made everything look the same. The label is now the **colour of the item text**, with the names appearing once, in the legend. The five colours are `--pack-must`, `--pack-high`, `--pack-useful`, `--pack-optional` and `--pack-buy` in `src/styles.css`, each chosen to clear WCAG AA (4.5:1) on white.
- **Ticks are keyed on stable item ids**, never on the text, so switching to 中文 keeps every tick — and a duplicate id is a build-time-visible error rather than two rows quietly sharing one checkbox (`src/data/packing/index.ts`).
- **State lives in `localStorage`** under `packed`, alongside the language and assumption state. There is a *Hide packed* filter and a two-step *Untick everything* (the second press confirms), because clearing 314 ticks by accident is unrecoverable.
- The layout is a sticky sidebar (progress, legend, section jump list) beside the panels on desktop, collapsing to a single column with a horizontally scrolling section bar on phones; row hit areas are ~63 px tall on a phone, and the section anchors are offset for the sticky header at each breakpoint.
- The list carries the source's own medical and safety notes (ORS and dehydration, weight-based dosing, the no-antimotility-drugs rule and its red flags, DEET/picaridin limits for under-3s, safer sleep for a 7-month-old, the CCC/3C power-bank rule). Those are the family's own document's words, not researched additions — the packing tab makes no external claims.

## Design notes

- React 18 + TypeScript + Vite, no UI framework and no runtime dependencies beyond React. All styling is hand-written CSS with design tokens in `src/styles.css`.
- Bilingual EN/中文 throughout, enforced by the `Bi` type rather than convention. Locale-aware date and duration formatting.
- The map is a hand-built SVG schematic with real coordinates, so it works offline and needs no API key or tile server; each place links out to Amap and Google Maps.
- **The header hides itself while you scroll down** and returns the moment you scroll up (or reach the top). On a phone it is 221 px of an 844 px viewport, which is a fifth of the screen lost to chrome while working through a 314-row packing list. It publishes `--app-header-height` (always the measured height, kept current by a `ResizeObserver`) and `--app-header-h` (the space it actually occupies, 0 while hidden); the packing sidebar, the section anchors and the jump links all position against the second one, so the space is genuinely reclaimed rather than just visually covered. A control that holds keyboard focus keeps the header on screen, and a tap on a header control drops focus so the header is free to hide again afterwards.
- Section state is kept in the URL hash (`#costs`), so a tab can be linked or refreshed, and the language choice is remembered separately in `localStorage`.
- Responsive down to 390 px, with a wrapping tab bar on small screens, verified in both languages.
