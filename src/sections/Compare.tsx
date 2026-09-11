import { useTrip } from '../state';
import { ComparisonTable } from '../components/ComparisonTable';
import { WeightPanel } from '../components/WeightPanel';
import { CostTable } from '../components/CostTable';
import { SectionHeader, Callout, ConfidenceChip } from '../components/ui';
import { CATEGORIES } from '../lib/scoring';

export function Compare({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { evaluations, highlights, weights, setWeight, resetWeights, byId } = useTrip();
  const focus = byId[selectedOptionId] ?? evaluations[0];

  return (
    <div className="stack">
      <SectionHeader
        eyebrow="Compare"
        title="Weights drive the answer"
        lede="The winner is a weighted score, not an opinion. Move the sliders and the ranking, badges and recommendation all recalculate immediately."
      />

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
          <h3 className="panel__title">How the scoring works</h3>
          <ul className="bullets">
            <li>
              <strong>Cost</strong> and <strong>travel time</strong> are not hand-scored — they are computed from the
              calculator and scored relative to the best option: the cheapest gets 100, and the others scale by ratio.
            </li>
            <li>
              The other six categories are researched judgements, each with a written reason you can read on the option
              cards and in the table below.
            </li>
            <li>
              Weights are relative: they are normalised to 100%, so nothing needs to add up to exactly 100 by hand.
            </li>
            <li>
              Scores are 0–100 and deliberately coarse. They are a conversation device, not precision engineering —
              a 3-point gap is noise, a 15-point gap is a real difference.
            </li>
          </ul>
        </div>
      </div>

      <section className="panel panel--pad">
        <h3 className="panel__title">Side by side</h3>
        <ComparisonTable evaluations={evaluations} highlights={highlights} weights={weights} />
      </section>

      <section>
        <SectionHeader
          eyebrow="Why these scores"
          title="The reasoning behind each number"
          lede="Pick an option to read the full justification for every category."
        />
        <div className="chips">
          {evaluations.map((ev) => (
            <button
              type="button"
              key={ev.option.id}
              className={`btn btn--chip${ev.option.id === focus.option.id ? ' btn--chip-active' : ''}`}
              style={{ ['--accent' as string]: ev.option.accent }}
              onClick={() => onSelectOption(ev.option.id)}
            >
              {ev.option.name}
            </button>
          ))}
        </div>

        <div className="grid grid--2">
          {CATEGORIES.map((c) => (
            <div className="reason" key={c.id}>
              <div className="reason__head">
                <span className="reason__label">{c.label}</span>
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
                <span>Weight {Math.round(((weights[c.id] ?? 0) / (CATEGORIES.reduce((s, x) => s + weights[x.id], 0) || 1)) * 100)}%</span>
                {c.derived && <ConfidenceChip level="assumption" compact />}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">Cost lines behind the score</h3>
        <p className="panel__text">
          Every line reacts to the assumptions on the Costs tab. Cheap-looking options here are often the ones that
          quietly require an extra hotel night.
        </p>
        <CostTable evaluations={evaluations} selectedId={focus.option.id} onSelect={onSelectOption} />
      </section>

      <Callout tone="info" title="Cost convention">
        Costs are <strong>round trip</strong> — what the family actually pays. Travel times are the{' '}
        <strong>outbound journey only</strong>, because that is the leg that has to land before the launch. Both
        conventions are applied identically to every option.
      </Callout>
    </div>
  );
}
