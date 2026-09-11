# Xiamen → Wenchang: family travel decision dashboard

A static web app that answers one question:

> **What is the best overall way for a family of four with a 3-year-old and an 8-month-old to travel from Xiamen to Wenchang, Hainan for the September 2026 rocket launch?**

It compares five realistic strategies — drive + ferry with our own car, fly to Haikou + rent, fly to Sanya + rent, HSR + the Qiongzhou Strait rail-ferry sleeper + rent, and a one-way fly-in-Haikou/fly-out-Sanya hybrid — across cost, door-to-door time, toddler comfort, reliability, transfers, island mobility, luggage capacity and stress.

Everything is adjustable: weights, prices and durations are live inputs, and the recommendation, rankings and badges recalculate instantly. All edits persist in `localStorage`.

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
| `src/data/transport-options.ts` | The five options: route legs, cost-line formulas, timelines, scores with written justifications, pros/cons and contingencies. |
| `src/data/launch.ts` | Launch status and caveats, viewing spots, the launch-morning plan, noise guidance, postponement mechanics. |
| `src/data/itinerary.ts` | The recommended six-night itinerary (and the own-car variant), plus the launch-slip contingency plan. |
| `src/data/bases.ts` | Where to stay, activities with age suitability, and family logistics. |
| `src/data/sources.ts` | Every source with its verification date, plus the honest statement of what could not be verified. |
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

## Confidence labels

Every figure is labelled **Verified**, **Estimate** or **Assumption**, and the labels are visible in the UI. Verified means it comes from a named source listed in the Sources tab — for example the ferry fare of ¥415.50 for a car plus driver, children under 1.2 m travelling free, the 1,183 km / ¥638-toll drive to Xuwen Port, the absence of any through train from Xiamen, and the ¥27 / 28-minute Haikou East → Wenchang HSR hop.

**No figure here is a live quote.** Airfare and rental-rate pages block automated access, so those remain researched ranges by design — replace them in the Costs tab.

## What still needs verification before booking

These are the items where the app deliberately cannot promise anything:

1. **The launch date and time.** The 17 September 2026 08:30–08:54 CST window could not be confirmed against an official schedule. Check CNSA / CMSA / CASC notices and the Wenchang government channel (文昌发布).
2. **Launch-day access.** Road closures around 龙楼镇, whether official viewing tickets exist for this mission, and how early the perimeter closes.
3. **Ferry booking.** Sailings, prices and the check-in cut-off change; confirm in the 琼州海峡轮渡管家 mini-program. Reservation is mandatory — there is no ticket office at the port, and the presale window is 15 days.
4. **Airfares** for the exact dates, including infant and child tickets and baggage rules.
5. **Rental rates**, the one-way drop-off fee, and — critically — whether an infant car seat can actually be reserved.
6. **Rail tickets.** 12306 opens sales 15 days ahead; Guangzhou Baiyun → Haikou sleeper berths sell out quickly.
7. **Typhoon risk.** Mid-September is peak season; a warning changes both the ferry and the flight picture (check 中国天气网).

## Design notes

- React 18 + TypeScript + Vite, no UI framework and no runtime dependencies beyond React. All styling is hand-written CSS with design tokens in `src/styles.css`.
- The map is a hand-built SVG schematic with real coordinates, so it works offline and needs no API key or tile server; each place links out to Amap and Google Maps.
- Section state is kept in the URL hash (`#costs`), so a tab can be linked or refreshed.
- Responsive down to 390 px, with a wrapping tab bar on small screens.
