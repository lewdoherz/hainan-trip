import { ASSUMPTION_DEFS, ASSUMPTION_GROUPS } from '../data/assumptions';
import type { AssumptionDef } from '../data/types';
import { useTrip } from '../state';
import { ConfidenceChip } from './ui';

function isToggle(def: AssumptionDef): boolean {
  return def.unit === 'on/off';
}

export function AssumptionEditor() {
  const { assumptions, setAssumption, resetAssumptions } = useTrip();

  return (
    <div className="assume">
      <div className="assume__toolbar">
        <span className="assume__count">
          {ASSUMPTION_DEFS.filter((d) => assumptions[d.key] !== d.def).length} of {ASSUMPTION_DEFS.length} values
          changed from our defaults
        </span>
        <button type="button" className="btn btn--chip btn--chip-quiet" onClick={resetAssumptions}>
          Reset all
        </button>
      </div>

      {ASSUMPTION_GROUPS.map((group) => {
        const defs = ASSUMPTION_DEFS.filter((d) => d.group === group.id);
        if (defs.length === 0) return null;
        return (
          <section className="assume__group" key={group.id}>
            <header className="assume__group-head">
              <h4>{group.label}</h4>
              <p>{group.hint}</p>
            </header>
            <div className="assume__rows">
              {defs.map((def) => {
                const value = assumptions[def.key];
                const changed = value !== def.def;
                return (
                  <div className={`assume__row${changed ? ' assume__row--changed' : ''}`} key={def.key}>
                    <div className="assume__label">
                      <span>{def.label}</span>
                      <ConfidenceChip level={def.confidence} compact />
                    </div>

                    {isToggle(def) ? (
                      <div className="assume__toggle">
                        <button
                          type="button"
                          className={`switch${value ? ' switch--on' : ''}`}
                          role="switch"
                          aria-checked={value === 1}
                          aria-label={def.label}
                          onClick={() => setAssumption(def.key, value ? 0 : 1)}
                        >
                          <span className="switch__knob" />
                        </button>
                        <span className="assume__toggle-text">
                          {value ? def.onLabel ?? 'On' : def.offLabel ?? 'Off'}
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
                          aria-label={def.label}
                          onChange={(e) => {
                            const next = Number(e.target.value);
                            if (Number.isFinite(next)) setAssumption(def.key, next);
                          }}
                        />
                        <span className="assume__unit">{def.unit}</span>
                        {changed && (
                          <button
                            type="button"
                            className="assume__revert"
                            title={`Back to default (${def.def} ${def.unit})`}
                            onClick={() => setAssumption(def.key, def.def)}
                          >
                            ↺
                          </button>
                        )}
                      </div>
                    )}

                    {def.note && <p className="assume__note">{def.note}</p>}
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
