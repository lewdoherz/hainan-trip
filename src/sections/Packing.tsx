import { useMemo, useRef, useState } from 'react';
import { PACKING_SECTIONS } from '../data/packing';
import type { PackTier } from '../data/types';
import { useTrip } from '../state';
import { usePersistentState } from '../lib/storage';
import { scrollToSection } from '../lib/header';
import { SectionHeader } from '../components/ui';
import { UI } from '../i18n/ui';

/** Legend order — most important first. */
const TIER_ORDER: PackTier[] = ['must', 'high', 'useful', 'optional', 'buy'];

/** The colour carries the meaning, so each tier needs a name in the legend. */
const TIER_KEY: Record<PackTier, keyof typeof UI> = {
  must: 'packTierMust',
  high: 'packTierHigh',
  useful: 'packTierUseful',
  optional: 'packTierOptional',
  buy: 'packTierBuy',
};

const SOURCE_URL = 'https://github.com/lewdoherz/hainan-trip/blob/main/packing-list.txt';

interface Counts {
  done: number;
  total: number;
}

function countItems(ids: string[], packed: Record<string, boolean>): Counts {
  let done = 0;
  for (const id of ids) if (packed[id]) done += 1;
  return { done, total: ids.length };
}

export function Packing() {
  const { t, fmt } = useTrip();
  const [packed, setPacked, clearPacked] = usePersistentState<Record<string, boolean>>('packed', {});
  const [hidePacked, setHidePacked] = useState(false);
  const [armed, setArmed] = useState(false);
  const armTimer = useRef<number | undefined>(undefined);

  /**
   * Every id, and the ids of each section, resolved once. The list never
   * changes at runtime, so this is stable for the life of the app.
   */
  const index = useMemo(() => {
    const perSection = new Map<string, string[]>();
    const all: string[] = [];
    for (const section of PACKING_SECTIONS) {
      const ids: string[] = [];
      for (const group of section.groups) {
        for (const item of group.items) {
          ids.push(item.id);
          all.push(item.id);
        }
      }
      perSection.set(section.id, ids);
    }
    return { perSection, all };
  }, []);

  const totals = useMemo(() => countItems(index.all, packed), [index, packed]);
  const pct = totals.total === 0 ? 0 : Math.round((totals.done / totals.total) * 100);
  const left = totals.total - totals.done;

  const toggle = (id: string) => setPacked({ ...packed, [id]: !packed[id] });

  const onReset = () => {
    if (!armed) {
      setArmed(true);
      window.clearTimeout(armTimer.current);
      armTimer.current = window.setTimeout(() => setArmed(false), 4000);
      return;
    }
    window.clearTimeout(armTimer.current);
    setArmed(false);
    clearPacked();
  };

  const jump = (id: string) => {
    const target = document.getElementById(`pack-${id}`);
    if (target) scrollToSection(target);
  };

  return (
    <section className="stack">
      <SectionHeader eyebrow={t(UI.packEyebrow)} title={t(UI.packTitle)} lede={t(UI.packLede)} />

      <div className="pack__layout">
        <aside className="pack__side">
          <div className="panel panel--pad pack__progress">
            <div className="pack__progress-head">
              <strong className="pack__progress-count">
                {fmt(t(UI.packProgress), { done: totals.done, total: totals.total })}
              </strong>
              <span className="pack__progress-left">
                {left === 0 ? t(UI.packAllDone) : fmt(t(UI.packSubProgress), { left })}
              </span>
            </div>
            <div
              className="pack__bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={totals.total}
              aria-valuenow={totals.done}
              aria-label={fmt(t(UI.packProgress), { done: totals.done, total: totals.total })}
            >
              <span className="pack__bar-fill" style={{ width: `${pct}%` }} />
            </div>

            <div className="pack__controls">
              <button
                type="button"
                className={`btn btn--chip${hidePacked ? ' btn--chip-active' : ''}`}
                aria-pressed={hidePacked}
                onClick={() => setHidePacked((v) => !v)}
              >
                {hidePacked ? t(UI.packShowPacked) : t(UI.packHidePacked)}
              </button>
              <button
                type="button"
                className={`btn btn--chip${armed ? ' btn--chip-danger' : ''}`}
                onClick={onReset}
              >
                {armed ? t(UI.packResetConfirm) : t(UI.packReset)}
              </button>
            </div>
          </div>

          <div className="panel panel--pad pack__legend">
            <span className="pack__legend-title">{t(UI.packLegendTitle)}</span>
            <ul className="pack__legend-list">
              {TIER_ORDER.map((tier) => (
                <li key={tier} className={`pack__legend-item pack-tier-${tier}`}>
                  <span className="pack__swatch" aria-hidden="true" />
                  {t(UI[TIER_KEY[tier]])}
                </li>
              ))}
            </ul>
          </div>

          <nav className="pack__jump" aria-label={t(UI.packJump)}>
            {PACKING_SECTIONS.map((section) => {
              const counts = countItems(index.perSection.get(section.id) ?? [], packed);
              const complete = counts.total > 0 && counts.done === counts.total;
              return (
                <button
                  key={section.id}
                  type="button"
                  className={`pack__jump-item${complete ? ' pack__jump-item--done' : ''}`}
                  onClick={() => jump(section.id)}
                >
                  <span className="pack__jump-label">{t(section.title)}</span>
                  {counts.total > 0 && (
                    <span className="pack__jump-count">
                      {counts.done}/{counts.total}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="pack__main">
          {PACKING_SECTIONS.map((section) => {
            const counts = countItems(index.perSection.get(section.id) ?? [], packed);
            const complete = counts.total > 0 && counts.done === counts.total;
            // A prose-only section (no items) is never hidden — there is nothing
            // about it that ticking could complete.
            if (hidePacked && complete) return null;

            return (
              <section
                key={section.id}
                id={`pack-${section.id}`}
                className={`panel pack-section${complete ? ' pack-section--done' : ''}`}
              >
                <header className="pack-section__head">
                  <h3 className="pack-section__title">{t(section.title)}</h3>
                  {counts.total > 0 && (
                    <span className="pack-section__count">
                      {complete
                        ? t(UI.packSectionDone)
                        : fmt(t(UI.packItemsCount), { n: counts.total })}
                      <span className="pack-section__count-num">
                        {counts.done}/{counts.total}
                      </span>
                    </span>
                  )}
                </header>

                {section.note && <p className="pack-section__note">{t(section.note)}</p>}

                {section.groups.map((group) => {
                  const items = hidePacked ? group.items.filter((i) => !packed[i.id]) : group.items;
                  if (items.length === 0) return null;
                  return (
                    <div className="pack-group" key={group.id}>
                      {group.title && <h4 className="pack-group__title">{t(group.title)}</h4>}
                      {group.note && <p className="pack-group__note">{t(group.note)}</p>}
                      <ul className="pack-list">
                        {items.map((item) => {
                          const isPacked = !!packed[item.id];
                          return (
                            <li
                              key={item.id}
                              className={`pack-item${isPacked ? ' pack-item--packed' : ''}`}
                            >
                              <label className={`pack-item__label pack-tier-${item.tier}`}>
                                <input
                                  type="checkbox"
                                  className="pack-item__box"
                                  checked={isPacked}
                                  onChange={() => toggle(item.id)}
                                />
                                <span className="pack-item__text">{t(item.text)}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </section>
            );
          })}

          <p className="pack__source">
            {t(UI.packSource)}{' '}
            <a href={SOURCE_URL} target="_blank" rel="noreferrer">
              packing-list.txt
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
