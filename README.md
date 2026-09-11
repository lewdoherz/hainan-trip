# Xiamen → Wenchang: family travel decision dashboard

A static web app that answers one question:

> **What is the best overall way for a family of four with a 3-year-old and an 8-month-old to travel from Xiamen to Wenchang, Hainan for the September 2026 rocket launch?**

It compares five realistic strategies — drive + ferry with our own car, fly to Haikou + rent, fly to Sanya + rent, HSR + the Qiongzhou Strait rail-ferry sleeper + rent, and a one-way fly-in-Haikou/fly-out-Sanya hybrid — across cost, door-to-door time, toddler comfort, reliability, transfers, island mobility, luggage capacity and stress.

**Available in English and Simplified Chinese** (English / 中文 switch in the header).

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

**GitHub Pages (default).** The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. Vite is configured with `base: './'`, so the site works at a project URL (`https://<user>.github.io/<repo>/`) as well as at a domain root.

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main` (or run the workflow manually). The site appears at the Pages URL.

**Anywhere else.** `bun run build` and upload `dist/` — Netlify, Vercel, Cloudflare Pages, S3, or a USB stick. Because the app is entirely client-side and reads no live data, there is nothing to configure.

## Where the data lives

Presentation and travel data are deliberately separated. To update the app for a new launch window or new prices, you normally touch only `src/data/`.

| File | What it holds |
| --- | --- |
| `src/data/trip.ts` | Trip constants: travellers, dates, launch window, and every place with coordinates for the schematic map. |
| `src/data/assumptions.ts` | **Every editable number** — fuel prices, tolls, ferry tickets, airfares, rental rates, child seats, buffers. Defaults carry a confidence label and a note saying what to replace them with. |
| `src/data/options/*.ts` | One file per transport option (drive + ferry, fly to Haikou, fly to Sanya, rail + rail-ferry sleeper, one-way hybrid): route legs, cost-line formulas, timelines, scores with written justifications, pros/cons and contingencies. `src/data/transport-options.ts` just collects them in order. |
| `src/data/launch.ts` | Launch status and caveats, viewing spots, the launch-morning plan, noise guidance, postponement mechanics. |
| `src/data/itinerary.ts` | The recommended six-night itinerary (and the own-car variant), plus the launch-slip contingency plan. |
| `src/data/bases.ts` | Where to stay, activities with age suitability, and family logistics. |
| `src/data/sources.ts` | Every source with its verification date, plus the honest statement of what could not be verified. |
| `src/i18n/` | `ui.ts` (every interface label and generated sentence, in both languages) and `lang.ts` (the `Bi` resolver, `fill()` interpolation, locale map). |
| `src/lib/` | The engines: cost lines, time model, weighted scoring, formatting, `localStorage` persistence. |

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

With the default weights and defaults, the ranking is:

| Option | Score | Wins |
| --- | --- | --- |
| Fly XMN → HAK + rent | 81 | Best overall, Fastest, Easiest with toddlers |
| Fly in to Haikou, out of Sanya (one-way rental) | 80 | — (a very close second; the one-way fee is the whole gap) |
| Fly to Sanya + rent | 72 | — |
| Drive + ferry (own car) | 64 | Cheapest, Most flexible |
| HSR + rail-ferry sleeper + rent | 55 | — |

That is a 2-point gap between the top two, which is noise — the app is meant to be argued with. Switching the preset to **Cheapest** still leaves the Haikou flight on top (a two-day drive buys almost nothing once the ferry, tolls, hotels and time are counted), and **Toddler first** widens the flight's lead. The genuine decision is *which airport and whether the car is one-way*, and the app lets you settle that with sliders rather than vibes.

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

## Design notes

- React 18 + TypeScript + Vite, no UI framework and no runtime dependencies beyond React. All styling is hand-written CSS with design tokens in `src/styles.css`.
- Bilingual EN/中文 throughout, enforced by the `Bi` type rather than convention. Locale-aware date and duration formatting.
- The map is a hand-built SVG schematic with real coordinates, so it works offline and needs no API key or tile server; each place links out to Amap and Google Maps.
- Section state is kept in the URL hash (`#costs`), so a tab can be linked or refreshed, and the language choice is remembered separately in `localStorage`.
- Responsive down to 390 px, with a wrapping tab bar on small screens, verified in both languages.
