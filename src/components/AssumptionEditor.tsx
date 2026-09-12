import { ASSUMPTION_DEFS, ASSUMPTION_GROUPS, isToggleDef } from '../data/assumptions';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';
import { ConfidenceChip } from './ui';

export function AssumptionEditor({ groups }: { groups?: string[] }) {
  const { t, fmt, assumptions, setAssumption, resetAssumptions } = useTrip();
  const defs = groups ? ASSUMPTION_DEFS.filter((d) => groups.includes(d.group)) : ASSUMPTION_DEFS;
  const shownGroups = groups ? ASSUMPTION_GROUPS.filter((g) => groups.includes(g.id)) : ASSUMPTION_GROUPS;

  return (
    <div className="assume">
      <div className="assume__toolbar">
        <span className="assume__count">
          {fmt(t(UI.assumeChangedCount), {
            n: defs.filter((d) => assumptions[d.key] !== d.def).length,
            total: defs.length,
          })}
        </span>
        <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetAssumptions}>
          {t(UI.resetAll)}
        </button>
      </div>

      {shownGroups.map((group) => {
        const groupDefs = defs.filter((d) => d.group === group.id);
        if (groupDefs.length === 0) return null;
        return (
          <section className="assume__group" key={group.id}>
            <header className="assume__group-head">
              <h4>{t(group.label)}</h4>
              <p>{t(group.hint)}</p>
            </header>
            <div className="assume__rows">
              {groupDefs.map((def) => {
                const value = assumptions[def.key];
                const changed = value !== def.def;
                const unit = t(def.unit);
                return (
                  <div className={`assume__row${changed ? ' assume__row--changed' : ''}`} key={def.key}>
                    <div className="assume__label">
                      <span>{t(def.label)}</span>
                      <ConfidenceChip level={def.confidence} />
                    </div>

                    {isToggleDef(def) ? (
                      <div className="assume__toggle">
                        <button
                          type="button"
                          className={`switch${value ? ' switch--on' : ''}`}
                          role="switch"
                          aria-checked={value === 1}
                          aria-label={t(def.label)}
                          onClick={() => setAssumption(def.key, value ? 0 : 1)}
                        >
                          <span className="switch__knob" />
                        </button>
                        <span className="assume__toggle-text">
                          {value ? t(def.onLabel) : t(def.offLabel)}
                        </span>
                      </div>
                    ) : (
                      <div className="assume__input">
                        <input
                          type="number"
                          value={value}
                          min={def.min}
                          max={def.max}
                          step={def.step}
                          aria-label={t(def.label)}
                          onChange={(e) => {
                            const next = Number(e.target.value);
                            if (Number.isFinite(next)) setAssumption(def.key, next);
                          }}
                        />
                        <span className="assume__unit">{unit}</span>
                        {changed && (
                          <button
                            type="button"
                            className="assume__revert"
                            title={fmt(t(UI.backToDefault), { value: `${def.def} ${unit}` })}
                            onClick={() => setAssumption(def.key, def.def)}
                          >
                            ↺
                          </button>
                        )}
                      </div>
                    )}

                    {def.note && <p className="assume__note">{t(def.note)}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
