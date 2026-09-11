import { useState } from 'react';
import { ACTIVITIES, BASES, FAMILY_LOGISTICS } from '../data/bases';
import { DELAY_PLAN, ITINERARIES } from '../data/itinerary';
import { Callout, Pill, SectionHeader } from '../components/ui';
import { formatDate } from '../lib/format';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

const FLEX_KEY = { fixed: 'flexFixed', flexible: 'flexFlexible', buffer: 'flexBuffer' } as const;
const SUITABLE_KEY = { great: 'fitGreat', ok: 'fitOk', wait: 'fitWait' } as const;

export function Plan() {
  const { t, lang } = useTrip();
  const [variantId, setVariantId] = useState(ITINERARIES[0].id);
  const variant = ITINERARIES.find((v) => v.id === variantId) ?? ITINERARIES[0];
  const maxBand = Math.max(...BASES.map((b) => b.priceBand));

  return (
    <div className="stack">
      <SectionHeader eyebrow={t(UI.planEyebrow)} title={t(UI.planTitle)} lede={t(UI.planLede)} />

      <div className="chips">
        {ITINERARIES.map((v) => (
          <button
            type="button"
            key={v.id}
            className={`btn btn--chip${v.id === variant.id ? ' btn--chip-active' : ''}`}
            onClick={() => setVariantId(v.id)}
          >
            {t(v.name)}
            {v.recommended && <span className="chips__flag">{t(UI.recommendedFlag)}</span>}
          </button>
        ))}
      </div>

      <section className="panel panel--pad">
        <div className="panel__head">
          <div>
            <h3 className="panel__title">{t(variant.name)}</h3>
            <p className="panel__text panel__text--tight">{t(variant.subtitle)}</p>
          </div>
          {variant.recommended && <Pill tone="good">{t(UI.recommendedItinerary)}</Pill>}
        </div>
        <p className="plan__summary">{t(variant.summary)}</p>

        <ol className="day-list">
          {variant.days.map((d) => (
            <li className={`day day--${d.flexibility}`} key={d.date}>
              <div className="day__date">
                <span className="day__daylabel">{t(d.dayLabel)}</span>
                <span className="day__datevalue">
                  {formatDate(d.date, lang, { year: undefined, weekday: undefined })}
                </span>
                <span className={`day__flex day__flex--${d.flexibility}`}>{t(UI[FLEX_KEY[d.flexibility]])}</span>
              </div>
              <div className="day__body">
                <h4 className="day__title">{t(d.title)}</h4>
                <div className="day__meta">
                  <span className="day__meta-item">
                    <strong>{t(UI.base)}</strong> {t(d.base)}
                  </span>
                  <span className="day__meta-item">
                    <strong>{t(UI.driving)}</strong> {t(d.drive)}
                  </span>
                </div>
                <ul className="day__plan">
                  {d.plan.map((p, i) => (
                    <li key={i}>{t(p)}</li>
                  ))}
                </ul>
                <p className="day__toddler">
                  <span className="day__toddler-tag">{t(UI.withChildren)}</span>
                  {t(d.toddler)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.ifLaunchMoves)}</h3>
        <div className="delay-grid">
          {DELAY_PLAN.map((d, i) => (
            <div className="delay" key={i}>
              <div className="delay__when">{t(d.when)}</div>
              <div className="delay__do">{t(d.do)}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow={t(UI.whereToStay)} title={t(UI.basesTitle)} lede={t(UI.basesLede)} />
        <div className="ctable-wrap">
          <table className="ctable ctable--bases">
            <caption className="ctable__caption">{t(UI.basesCaption)}</caption>
            <thead>
              <tr>
                <th>{t(UI.colBase)}</th>
                <th>{t(UI.colDriveToLonglou)}</th>
                <th>{t(UI.colToddlerFit)}</th>
                <th>{t(UI.colInfantFit)}</th>
                <th>{t(UI.colHotel)}</th>
              </tr>
            </thead>
            <tbody>
              {BASES.map((b) => (
                <tr key={b.id}>
                  <th scope="row">
                    <span className="base__name">{t(b.name)}</span>
                    <span className="base__cn">{b.cn}</span>
                  </th>
                  <td>{t(b.driveToLonglou)}</td>
                  <td>
                    <div className="meter">
                      <div className="meter__fill meter__fill--coral" style={{ width: `${b.toddlerFit}%` }} />
                      <span className="meter__value">{b.toddlerFit}</span>
                    </div>
                  </td>
                  <td>
                    <div className="meter">
                      <div className="meter__fill meter__fill--teal" style={{ width: `${b.infantFit}%` }} />
                      <span className="meter__value">{b.infantFit}</span>
                    </div>
                  </td>
                  <td>
                    <div className="price-band">
                      <span>{t(b.hotelPerNight)}</span>
                      <div className="price-band__bar" style={{ width: `${(b.priceBand / maxBand) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid--3">
          {BASES.slice(0, 6).map((b) => (
            <div className="panel panel--pad" key={b.id}>
              <h3 className="panel__title">
                {t(b.name)} <span className="panel__cn">{b.cn}</span>
              </h3>
              <p className="panel__text">{t(b.verdict)}</p>
              <p className="panel__text panel__text--good">{t(b.good)}</p>
              <p className="panel__text panel__text--warn">{t(b.caveat)}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow={t(UI.activitiesEyebrow)} title={t(UI.activitiesTitle)} lede={t(UI.activitiesLede)} />
        <div className="activities">
          {ACTIVITIES.map((a) => (
            <article className={`activity activity--${a.suitable}`} key={a.id}>
              <header className="activity__head">
                <div>
                  <h3 className="activity__name">{t(a.name)}</h3>
                  <div className="activity__cn">
                    {a.cn} · {t(a.where)}
                  </div>
                </div>
                <span className={`pill pill--${a.suitable}`}>{t(UI[SUITABLE_KEY[a.suitable]])}</span>
              </header>
              <div className="activity__meta">
                <span>{t(a.ageFit)}</span>
                <span>{t(a.duration)}</span>
                <span>{t(a.cost)}</span>
              </div>
              <p className="activity__verdict">{t(a.verdict)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.logistics)}</h3>
        <ul className="bullets bullets--wide">
          {FAMILY_LOGISTICS.map((f, i) => (
            <li key={i}>
              <strong>{t(f.title)}</strong>
              <span className="bullet-detail">{t(f.detail)}</span>
            </li>
          ))}
        </ul>
        <Callout tone="info" title={t(UI.verifyLocally)}>
          {t(UI.verifyLocallyText)}
        </Callout>
      </section>
    </div>
  );
}
