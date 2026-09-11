import { CATEGORIES, DEFAULT_WEIGHTS, type Weights } from '../lib/scoring';
import type { CategoryId } from '../data/types';

const PRESETS: { id: string; name: string; hint: string; weights: Weights }[] = [
  { id: 'balanced', name: 'Balanced', hint: 'Our starting point — comfort first, but cost and time still matter.', weights: DEFAULT_WEIGHTS },
  {
    id: 'toddler',
    name: 'Toddler first',
    hint: 'Prioritise short awake days, few transfers and low stress above price.',
    weights: { family: 34, transfers: 16, stress: 14, luggage: 8, reliability: 10, time: 8, cost: 6, mobility: 4 },
  },
  {
    id: 'budget',
    name: 'Cheapest',
    hint: 'Cost dominates; comfort and speed become tie-breakers.',
    weights: { cost: 40, time: 20, reliability: 10, transfers: 8, family: 8, mobility: 6, luggage: 4, stress: 4 },
  },
  {
    id: 'fast',
    name: 'Shortest days',
    hint: 'Minimise door-to-door and awake travel time above all.',
    weights: { time: 40, transfers: 12, family: 12, cost: 12, reliability: 8, mobility: 6, luggage: 5, stress: 5 },
  },
  {
    id: 'flex',
    name: 'Max flexibility',
    hint: 'Whatever gives the most freedom to change plans once we are there.',
    weights: { mobility: 28, luggage: 14, family: 14, reliability: 12, time: 12, transfers: 8, cost: 6, stress: 6 },
  },
];

export function WeightPanel({
  weights,
  setWeight,
  resetWeights,
  applyPreset,
}: {
  weights: Weights;
  setWeight: (id: CategoryId, value: number) => void;
  resetWeights: () => void;
  applyPreset: (w: Weights) => void;
}) {
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  return (
    <div className="weights">
      <div className="weights__presets">
        <span className="weights__presets-label">Quick presets</span>
        <div className="weights__presets-row">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.id}
              className="btn btn--chip"
              title={p.hint}
              onClick={() => applyPreset(p.weights)}
            >
              {p.name}
            </button>
          ))}
          <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetWeights}>
            Reset weights
          </button>
        </div>
      </div>

      <div className="weights__list">
        {CATEGORIES.map((c) => {
          const raw = weights[c.id] ?? 0;
          const pct = (raw / weightSum) * 100;
          return (
            <div className="weights__row" key={c.id}>
              <div className="weights__row-head">
                <span className="weights__row-label" title={c.description}>
                  {c.label}
                  {c.derived && <em className="weights__derived">calculated</em>}
                </span>
                <span className="weights__row-value">{pct.toFixed(0)}%</span>
              </div>
              <input
                className="slider"
                type="range"
                min={0}
                max={40}
                step={1}
                value={raw}
                aria-label={`${c.label} weight`}
                onChange={(e) => setWeight(c.id, Number(e.target.value))}
              />
            </div>
          );
        })}
      </div>
      <p className="weights__foot">
        Weights are relative — the percentages always add to 100%, so moving one slider rebalances the rest.
        <em> Cost</em> and <em>Travel time</em> are scored against the other options, so they move whenever you edit a
        price or a duration.
      </p>
    </div>
  );
}

export { PRESETS };
