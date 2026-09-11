import { useTrip } from '../state';
import { ComparisonTable } from '../components/ComparisonTable';
import { WeightPanel } from '../components/WeightPanel';
import { CostTable } from '../components/CostTable';
import { SectionHeader, Callout } from '../components/ui';
import { CATEGORIES } from '../lib/scoring';
import { UI } from '../i18n/ui';

export function Compare({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { t, fmt, evaluations, highlights, weights, setWeight, resetWeights, byId } = useTrip();
  const focus = byId[selectedOptionId] ?? evaluations[0];
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  return (
    <div className="stack">
      <SectionHeader eyebrow={t(UI.compareEyebrow)} title={t(UI.compareTitle)} lede={t(UI.compareLede)} />

      <div className="grid grid--sidebar">
        <div className="panel panel--pad">
          <WeightPanel
            weights={weights}
            setWeight={setWeight}
            resetWeights={resetWeights}
            applyPreset={(w) => {
              for (const c of CATEGORIES) setWeight(c.id, w[c.id]);
            }}
          />
        </div>
        <div className="panel panel--pad">
          <h3 className="panel__title">{t(UI.howScoringWorks)}</h3>
          <ul className="bullets">
            <li>{t(UI.scoringBullet1)}</li>
            <li>{t(UI.scoringBullet2)}</li>
            <li>{t(UI.scoringBullet3)}</li>
            <li>{t(UI.scoringBullet4)}</li>
          </ul>
        </div>
      </div>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.sideBySide)}</h3>
        <ComparisonTable evaluations={evaluations} highlights={highlights} weights={weights} />
      </section>

      <section>
        <SectionHeader eyebrow={t(UI.whyTheseScores)} title={t(UI.whyTheseScoresTitle)} lede={t(UI.whyTheseScoresLede)} />
        <div className="chips">
          {evaluations.map((ev) => (
            <button
              type="button"
              key={ev.option.id}
              className={`btn btn--chip${ev.option.id === focus.option.id ? ' btn--chip-active' : ''}`}
              style={{ ['--accent' as string]: ev.option.accent }}
              onClick={() => onSelectOption(ev.option.id)}
            >
              {t(ev.option.name)}
            </button>
          ))}
        </div>

        <div className="grid grid--2">
          {CATEGORIES.map((c) => (
            <div className="reason" key={c.id}>
              <div className="reason__head">
                <span className="reason__label">{t(c.label)}</span>
                <span className="reason__score">{Math.round(focus.scores[c.id])}</span>
              </div>
              <div className="reason__bar">
                <div
                  className="reason__fill"
                  style={{ width: `${focus.scores[c.id]}%`, background: focus.option.accent }}
                />
              </div>
              <p className="reason__text">{focus.rationale[c.id]}</p>
              <div className="reason__meta">
                <span>{fmt(t(UI.weightLabel), { pct: Math.round(((weights[c.id] ?? 0) / weightSum) * 100) })}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.costLinesBehind)}</h3>
        <p className="panel__text">{t(UI.costLinesBehindText)}</p>
        <CostTable evaluations={evaluations} selectedId={focus.option.id} onSelect={onSelectOption} />
      </section>

      <Callout tone="info" title={t(UI.costConvention)}>
        {t(UI.costConventionText)}
      </Callout>
    </div>
  );
}
