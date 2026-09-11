import { CATEGORIES, DEFAULT_WEIGHTS, type Weights } from '../lib/scoring';
import type { CategoryId } from '../data/types';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

interface Preset {
  id: string;
  nameKey: keyof typeof UI;
  hintKey: keyof typeof UI;
  weights: Weights;
}

const PRESETS: Preset[] = [
  { id: 'balanced', nameKey: 'presetBalanced', hintKey: 'presetBalancedHint', weights: DEFAULT_WEIGHTS },
  {
    id: 'toddler',
    nameKey: 'presetToddler',
    hintKey: 'presetToddlerHint',
    weights: { family: 34, transfers: 16, stress: 14, luggage: 8, reliability: 10, time: 8, cost: 6, mobility: 4 },
  },
  {
    id: 'budget',
    nameKey: 'presetBudget',
    hintKey: 'presetBudgetHint',
    weights: { cost: 40, time: 20, reliability: 10, transfers: 8, family: 8, mobility: 6, luggage: 4, stress: 4 },
  },
  {
    id: 'fast',
    nameKey: 'presetFast',
    hintKey: 'presetFastHint',
    weights: { time: 40, transfers: 12, family: 12, cost: 12, reliability: 8, mobility: 6, luggage: 5, stress: 5 },
  },
  {
    id: 'flex',
    nameKey: 'presetFlex',
    hintKey: 'presetFlexHint',
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
  const { t, fmt } = useTrip();
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  return (
    <div className="weights">
      <div className="weights__presets">
        <span className="weights__presets-label">{t(UI.quickPresets)}</span>
        <div className="weights__presets-row">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.id}
              className="btn btn--chip"
              title={t(UI[p.hintKey])}
              onClick={() => applyPreset(p.weights)}
            >
              {t(UI[p.nameKey])}
            </button>
          ))}
          <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetWeights}>
            {t(UI.resetWeights)}
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
                <span className="weights__row-label" title={t(c.description)}>
                  {t(c.label)}
                  {c.derived && <em className="weights__derived">{t(UI.calculated)}</em>}
                </span>
                <span className="weights__row-value">{fmt('{pct}%', { pct: pct.toFixed(0) })}</span>
              </div>
              <input
                className="slider"
                type="range"
                min={0}
                max={40}
                step={1}
                value={raw}
                aria-label={fmt(t(UI.weightAria), { label: t(c.label) })}
                onChange={(e) => setWeight(c.id, Number(e.target.value))}
              />
            </div>
          );
        })}
      </div>
      <p className="weights__foot">
        {t(UI.weightsFoot1)} <em>{t(UI.catCostShort)}</em> {t(UI.weightsFoot2)}
      </p>
    </div>
  );
}
