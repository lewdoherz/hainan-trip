import { useTrip } from '../state';
import { AssumptionEditor } from '../components/AssumptionEditor';
import { CostTable } from '../components/CostTable';
import { Callout, SectionHeader, Stat } from '../components/ui';
import { formatCny, formatDuration } from '../lib/format';
import { ASSUMPTION_DEFS } from '../data/assumptions';
import { UI } from '../i18n/ui';

export function Costs({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { t, fmt, lang, evaluations, byId, assumptions, resetAssumptions } = useTrip();
  const focus = byId[selectedOptionId] ?? evaluations[0];
  const changed = ASSUMPTION_DEFS.filter((d) => assumptions[d.key] !== d.def);
  const totals = evaluations.map((e) => e.cost);
  const min = Math.min(...totals);
  const max = Math.max(...totals);
  const cheapestName = t(evaluations.find((e) => e.cost === min)?.option.name);
  const priciestName = t(evaluations.find((e) => e.cost === max)?.option.name);

  return (
    <div className="stack">
      <SectionHeader eyebrow={t(UI.navCosts)} title={t(UI.costsTitle)} lede={t(UI.costsLede)} />

      <div className="stats-row">
        <Stat label={t(UI.cheapestOption)} value={formatCny(min, lang)} sub={cheapestName} tone="good" />
        <Stat label={t(UI.mostExpensive)} value={formatCny(max, lang)} sub={priciestName} />
        <Stat label={t(UI.spreadBetween)} value={formatCny(max - min, lang)} sub={t(UI.spreadSub)} />
        <Stat
          label={t(UI.valuesChanged)}
          value={String(changed.length)}
          sub={fmt(t(UI.ofDefaults), { total: ASSUMPTION_DEFS.length })}
          tone={changed.length > 0 ? 'warn' : undefined}
        />
      </div>

      <div className="panel panel--pad">
        <h3 className="panel__title">{t(UI.costsPickerHeading)}</h3>
        <CostTable evaluations={evaluations} selectedId={focus.option.id} onSelect={onSelectOption} />
      </div>

      <div className="grid grid--2">
        <div className="panel panel--pad">
          <div className="panel__head">
            <h3 className="panel__title">{t(UI.tripTotalsNow)}</h3>
            <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetAssumptions}>
              {t(UI.resetEverything)}
            </button>
          </div>
          <table className="mini-table">
            <thead>
              <tr>
                <th>{t(UI.optionCol)}</th>
                <th className="num">{t(UI.roundTripCost)}</th>
                <th className="num">{t(UI.outboundTime)}</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((e) => (
                <tr key={e.option.id}>
                  <td>
                    <span className="mini-table__accent" style={{ background: e.option.accent }} />
                    {t(e.option.name)}
                  </td>
                  <td className="num">{formatCny(e.cost, lang)}</td>
                  <td className="num">{formatDuration(e.time.totalMinutes, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Callout tone="info" title={t(UI.whatIsNotIncluded)}>
            {t(UI.whatIsNotIncludedText)}
          </Callout>
        </div>

        <div className="panel panel--pad">
          <h3 className="panel__title">{t(UI.changedValues)}</h3>
          {changed.length === 0 ? (
            <p className="panel__text">{t(UI.changedValuesEmpty)}</p>
          ) : (
            <ul className="changed-list">
              {changed.map((d) => (
                <li key={d.key}>
                  <span className="changed-list__label">{t(d.label)}</span>
                  <span className="changed-list__values">
                    {d.def} {t(d.unit)} →{' '}
                    <strong>
                      {assumptions[d.key]} {t(d.unit)}
                    </strong>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section>
        <SectionHeader eyebrow={t(UI.navCosts)} title={t(UI.assumptionsTitle)} lede={t(UI.assumptionsLede)} />
        <AssumptionEditor />
      </section>
    </div>
  );
}
