import type {
  Assumptions,
  Category,
  CategoryId,
  CostLine,
  Lang,
  TransportOption,
} from '../data/types';
import { computeValues, groupMinutes, resolveTimeline, sumTimes, type OptionTime } from './compute';
import { formatCny, formatDuration } from './format';
import { fill, t } from '../i18n/lang';
import { UI } from '../i18n/ui';

export const CATEGORIES: Category[] = [
  {
    id: 'family',
    label: UI.catFamily,
    short: UI.catFamilyShort,
    description: UI.catFamilyDesc,
    defaultWeight: 22,
    derived: false,
  },
  {
    id: 'time',
    label: UI.catTime,
    short: UI.catTimeShort,
    description: UI.catTimeDesc,
    defaultWeight: 16,
    derived: true,
  },
  {
    id: 'reliability',
    label: UI.catReliability,
    short: UI.catReliabilityShort,
    description: UI.catReliabilityDesc,
    defaultWeight: 14,
    derived: false,
  },
  {
    id: 'cost',
    label: UI.catCost,
    short: UI.catCostShort,
    description: UI.catCostDesc,
    defaultWeight: 16,
    derived: true,
  },
  {
    id: 'transfers',
    label: UI.catTransfers,
    short: UI.catTransfersShort,
    description: UI.catTransfersDesc,
    defaultWeight: 10,
    derived: false,
  },
  {
    id: 'mobility',
    label: UI.catMobility,
    short: UI.catMobilityShort,
    description: UI.catMobilityDesc,
    defaultWeight: 10,
    derived: false,
  },
  {
    id: 'luggage',
    label: UI.catLuggage,
    short: UI.catLuggageShort,
    description: UI.catLuggageDesc,
    defaultWeight: 6,
    derived: false,
  },
  {
    id: 'stress',
    label: UI.catStress,
    short: UI.catStressShort,
    description: UI.catStressDesc,
    defaultWeight: 6,
    derived: false,
  },
];

export type Weights = Record<CategoryId, number>;

export const DEFAULT_WEIGHTS: Weights = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.defaultWeight]),
) as Weights;

export interface OptionEvaluation {
  option: TransportOption;
  cost: number;
  costLines: CostLine[];
  time: OptionTime;
  scores: Record<CategoryId, number>;
  /** Resolved, ready to render, in the active language. */
  rationale: Record<CategoryId, string>;
  /** Weight-normalised 0–100 total. */
  weighted: number;
}

/** Relative score: best value scores 100, everything else scales by ratio. */
function relativeScore(best: number, value: number, floor = 12): number {
  if (value <= 0) return 100;
  return Math.max(floor, Math.min(100, (best / value) * 100));
}

export function evaluateOptions(
  options: TransportOption[],
  a: Assumptions,
  weights: Weights,
  lang: Lang,
): OptionEvaluation[] {
  const computed = computeValues(a);

  const base = options.map((option) => {
    const costLines = option.costLines(a);
    const cost = costLines.reduce((sum, l) => sum + l.amount, 0);
    const time = sumTimes(resolveTimeline(option, a).map((g) => groupMinutes(g, a, computed)));
    return { option, costLines, cost, time };
  });

  const cheapest = Math.min(...base.map((b) => b.cost));
  const fastest = Math.min(...base.map((b) => b.time.totalMinutes));
  const cheapestName = t(base.find((b) => b.cost === cheapest)?.option.name, lang);
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  return base.map(({ option, costLines, cost, time }) => {
    const scores = {} as Record<CategoryId, number>;
    const rationale = {} as Record<CategoryId, string>;

    for (const c of CATEGORIES) {
      if (c.id === 'cost') {
        scores.cost = Math.round(relativeScore(cheapest, cost));
        const delta = cost - cheapest;
        rationale.cost =
          delta <= 1
            ? fill(t(UI.rationaleCostCheapest, lang), { cost: formatCny(cost, lang) })
            : fill(t(UI.rationaleCostMore, lang), {
                cost: formatCny(cost, lang),
                pct: Math.round((delta / cheapest) * 100),
                name: cheapestName,
                cheapest: formatCny(cheapest, lang),
              });
      } else if (c.id === 'time') {
        scores.time = Math.round(relativeScore(fastest, time.totalMinutes));
        const delta = time.totalMinutes - fastest;
        rationale.time =
          delta <= 1
            ? fill(t(UI.rationaleTimeFastest, lang), { duration: formatDuration(time.totalMinutes, lang) })
            : fill(t(UI.rationaleTimeLonger, lang), {
                duration: formatDuration(time.totalMinutes, lang),
                delta: formatDuration(delta, lang),
              });
      } else {
        const s = option.staticScores[c.id];
        scores[c.id] = s.score;
        rationale[c.id] = t(s.why, lang);
      }
    }

    const weighted =
      CATEGORIES.reduce((sum, c) => sum + (weights[c.id] ?? 0) * (scores[c.id] ?? 0), 0) / weightSum;

    return { option, costLines, cost, time, scores, rationale, weighted };
  });
}

export interface Highlights {
  bestOverall: string;
  cheapest: string;
  fastest: string;
  easiest: string;
  mostFlexible: string;
}

const pick = (items: OptionEvaluation[], score: (o: OptionEvaluation) => number): string =>
  items.reduce((best, o) => (score(o) > score(best) ? o : best), items[0]).option.id;

export function pickHighlights(items: OptionEvaluation[]): Highlights {
  if (items.length === 0) {
    return { bestOverall: '', cheapest: '', fastest: '', easiest: '', mostFlexible: '' };
  }
  return {
    bestOverall: pick(items, (o) => o.weighted),
    cheapest: pick(items, (o) => -o.cost),
    fastest: pick(items, (o) => -o.time.totalMinutes),
    easiest: pick(
      items,
      (o) => o.scores.family * 0.55 + o.scores.transfers * 0.2 + o.scores.stress * 0.15 + o.scores.luggage * 0.1,
    ),
    mostFlexible: pick(
      items,
      (o) => o.scores.mobility * 0.5 + o.scores.luggage * 0.25 + o.scores.reliability * 0.25,
    ),
  };
}
