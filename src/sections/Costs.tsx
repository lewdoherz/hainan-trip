import { useTrip } from '../state';
import { AssumptionEditor } from '../components/AssumptionEditor';
import { CostTable } from '../components/CostTable';
import { Callout, SectionHeader, Stat } from '../components/ui';
import { formatCny, formatDuration } from '../lib/format';
import { ASSUMPTION_DEFS } from '../data/assumptions';

export function Costs({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { evaluations, byId, assumptions, resetAssumptions } = useTrip();
  const focus = byId[selectedOptionId] ?? evaluations[0];
  const changed = ASSUMPTION_DEFS.filter((d) => assumptions[d.key] !== d.def);
  const totals = evaluations.map((e) => e.cost);
  const spread = Math.max(...totals) - Math.min(...totals);

  return (
    <div className="stack">
      <SectionHeader
        eyebrow="Costs"
        title="Edit the assumptions, not the conclusions"
        lede="Defaults are researched ranges, not quotes. Replace them with real numbers from the ferry booking app, the airlines and the rental company — the comparison updates as you type."
      />

      <div className="stats-row">
        <Stat label="Cheapest option" value={formatCny(Math.min(...totals))} sub={evaluations.find((e) => e.cost === Math.min(...totals))?.option.name} tone="good" />
        <Stat label="Most expensive" value={formatCny(Math.max(...totals))} sub={evaluations.find((e) => e.cost === Math.max(...totals))?.option.name} />
        <Stat label="Spread between options" value={formatCny(spread)} sub="What the decision is worth" />
        <Stat label="Values changed" value={`${changed.length}`} sub={`of ${ASSUMPTION_DEFS.length} defaults`} tone={changed.length > 0 ? 'warn' : undefined} />
      </div>

      <div className="panel panel--pad">
        <h3 className="panel__title">Which option's costs?</h3>
        <CostTable evaluations={evaluations} selectedId={focus.option.id} onSelect={onSelectOption} />
      </div>

      <div className="grid grid--2">
        <div className="panel panel--pad">
          <div className="panel__head">
            <h3 className="panel__title">Trip totals right now</h3>
            <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetAssumptions}>
              Reset everything
            </button>
          </div>
          <table className="mini-table">
            <thead>
              <tr>
                <th>Option</th>
                <th className="num">Round-trip cost</th>
                <th className="num">Outbound door-to-door</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((e) => (
                <tr key={e.option.id}>
                  <td>
                    <span className="mini-table__accent" style={{ background: e.option.accent }} />
                    {e.option.name}
                  </td>
                  <td className="num">{formatCny(e.cost)}</td>
                  <td className="num">{formatDuration(e.time.totalMinutes)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Callout tone="info" title="What is not included">
            Hainan resort nights, food, launch-viewing tickets, travel insurance and attractions. This tab answers one
            question only: what does it cost to get there and back with a car available?
          </Callout>
        </div>

        <div className="panel panel--pad">
          <h3 className="panel__title">Changed values</h3>
          {changed.length === 0 ? (
            <p className="panel__text">
              Nothing changed yet — the app is using its researched defaults. The values most worth replacing first
              are the airfare, the ferry vehicle ticket and the rental daily rate.
            </p>
          ) : (
            <ul className="changed-list">
              {changed.map((d) => (
                <li key={d.key}>
                  <span className="changed-list__label">{d.label}</span>
                  <span className="changed-list__values">
                    {d.def} {d.unit} → <strong>{assumptions[d.key]} {d.unit}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section>
        <SectionHeader
          eyebrow="Assumptions"
          title="Every price the model uses"
          lede="Grouped so you can work through them in the order you would actually book things: ferry, flights, rental, rail, then the family-specific buffers."
        />
        <AssumptionEditor />
      </section>
    </div>
  );
}
