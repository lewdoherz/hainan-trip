import type {
  Assumptions,
  Category,
  CategoryId,
  CostLine,
  TransportOption,
} from '../data/types';
import { computeValues, groupMinutes, resolveTimeline, sumTimes, type OptionTime } from './compute';
import { formatCny, formatDuration } from './format';

export const CATEGORIES: Category[] = [
  {
    id: 'family',
    label: 'Family & toddler comfort',
    short: 'Toddler comfort',
    description:
      'Nap windows, feeding and nappy stops, ability to move around, how survivable the day is with a 3-year-old and an 8-month-old.',
    defaultWeight: 22,
    derived: false,
  },
  {
    id: 'time',
    label: 'Door-to-door travel time',
    short: 'Travel time',
    description:
      'Home to hotel, including waits, transfers and overnight stops. Scored relative to the fastest option.',
    defaultWeight: 16,
    derived: true,
  },
  {
    id: 'reliability',
    label: 'Reliability & delay risk',
    short: 'Reliability',
    description:
      'How likely the plan survives contact with reality: weather, queues, cancellations, and how much slack it has.',
    defaultWeight: 14,
    derived: false,
  },
  {
    id: 'cost',
    label: 'Cost',
    short: 'Cost',
    description:
      'Total transport cost from the live calculator. Scored relative to the cheapest option; edit the assumptions to change it.',
    defaultWeight: 16,
    derived: true,
  },
  {
    id: 'transfers',
    label: 'Few transfers & baggage handling',
    short: 'Transfers',
    description:
      'How many times you repack, queue and carry two children, a stroller and the luggage.',
    defaultWeight: 10,
    derived: false,
  },
  {
    id: 'mobility',
    label: 'Car freedom in Hainan',
    short: 'Hainan mobility',
    description:
      'Whether you have a car from the moment you arrive, with car seats already fitted and no pick-up detour.',
    defaultWeight: 10,
    derived: false,
  },
  {
    id: 'luggage',
    label: 'Luggage & baby-gear capacity',
    short: 'Baby gear',
    description:
      'Room for a stroller, travel cot, diapers, formula and a cool bag — and the freedom to bring more home.',
    defaultWeight: 6,
    derived: false,
  },
  {
    id: 'stress',
    label: 'Low stress & driving fatigue',
    short: 'Low stress',
    description:
      'Physical tiredness for the adults the day before an 08:30 launch, including night driving risk.',
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
  const cheapestName = base.find((b) => b.cost === cheapest)?.option.name ?? '';

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
            ? `${formatCny(cost)} — the cheapest option in the comparison.`
            : `${formatCny(cost)} — ${Math.round((delta / cheapest) * 100)}% more than ${cheapestName} (${formatCny(cheapest)}).`;
      } else if (c.id === 'time') {
        scores.time = Math.round(relativeScore(fastest, time.totalMinutes));
        const delta = time.totalMinutes - fastest;
        rationale.time =
          delta <= 1
            ? `${formatDuration(time.totalMinutes)} door to door — the fastest option.`
            : `${formatDuration(time.totalMinutes)} door to door, ${formatDuration(delta)} longer than the fastest option.`;
      } else {
        const s = option.staticScores[c.id];
        scores[c.id] = s.score;
        rationale[c.id] = s.why;
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

export const HIGHLIGHT_LABEL: Record<keyof Highlights, string> = {
  bestOverall: 'Best overall',
  cheapest: 'Cheapest',
  fastest: 'Fastest',
  easiest: 'Easiest with toddlers',
  mostFlexible: 'Most flexible',
};
