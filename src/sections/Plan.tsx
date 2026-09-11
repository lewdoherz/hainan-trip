import { useState } from 'react';
import { ACTIVITIES, BASES, FAMILY_LOGISTICS } from '../data/bases';
import { DELAY_PLAN, ITINERARIES } from '../data/itinerary';
import { Callout, Pill, SectionHeader } from '../components/ui';
import { formatDate } from '../lib/format';

const FLEX_LABEL: Record<string, string> = {
  fixed: 'Fixed date',
  flexible: 'Flexible',
  buffer: 'Buffer day',
};

const SUITABLE_LABEL: Record<string, string> = {
  great: 'Great fit',
  ok: 'Worth it',
  wait: 'Skip this trip',
};

export function Plan() {
  const [variantId, setVariantId] = useState(ITINERARIES[0].id);
  const variant = ITINERARIES.find((v) => v.id === variantId) ?? ITINERARIES[0];
  const maxBand = Math.max(...BASES.map((b) => b.priceBand));

  return (
    <div className="stack">
      <SectionHeader
        eyebrow="Hainan plan"
        title="Five to seven days, built around the launch"
        lede="The itinerary is deliberately front-loaded: two days of buffer before the launch, and the holiday afterwards. If the launch slips, the second half absorbs it."
      />

      <div className="chips">
        {ITINERARIES.map((v) => (
          <button
            type="button"
            key={v.id}
            className={`btn btn--chip${v.id === variant.id ? ' btn--chip-active' : ''}`}
            onClick={() => setVariantId(v.id)}
          >
            {v.name}
            {v.recommended && <span className="chips__flag">recommended</span>}
          </button>
        ))}
      </div>

      <section className="panel panel--pad">
        <div className="panel__head">
          <div>
            <h3 className="panel__title">{variant.name}</h3>
            <p className="panel__text panel__text--tight">{variant.subtitle}</p>
          </div>
          {variant.recommended && <Pill tone="good">Recommended itinerary</Pill>}
        </div>
        <p className="plan__summary">{variant.summary}</p>

        <ol className="day-list">
          {variant.days.map((d) => (
            <li className={`day day--${d.flexibility}`} key={d.date}>
              <div className="day__date">
                <span className="day__daylabel">{d.dayLabel}</span>
                <span className="day__datevalue">{formatDate(d.date, { year: undefined, weekday: undefined })}</span>
                <span className={`day__flex day__flex--${d.flexibility}`}>{FLEX_LABEL[d.flexibility]}</span>
              </div>
              <div className="day__body">
                <h4 className="day__title">{d.title}</h4>
                <div className="day__meta">
                  <span className="day__meta-item">
                    <strong>Base</strong> {d.base}
                  </span>
                  <span className="day__meta-item">
                    <strong>Driving</strong> {d.drive}
                  </span>
                </div>
                <ul className="day__plan">
                  {d.plan.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="day__toddler">
                  <span className="day__toddler-tag">With the children</span>
                  {d.toddler}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">If the launch moves</h3>
        <div className="delay-grid">
          {DELAY_PLAN.map((d) => (
            <div className="delay" key={d.when}>
              <div className="delay__when">{d.when}</div>
              <div className="delay__do">{d.do}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Where to stay"
          title="Bases compared for this trip"
          lede="Judged only on how well each place serves a launch plus a toddler beach holiday — not as a general Hainan guide."
        />
        <div className="ctable-wrap">
          <table className="ctable ctable--bases">
            <thead>
              <tr>
                <th>Base</th>
                <th>Drive to Longlou</th>
                <th>Toddler fit</th>
                <th>Infant fit</th>
                <th>Family room / night</th>
              </tr>
            </thead>
            <tbody>
              {BASES.map((b) => (
                <tr key={b.id}>
                  <th scope="row">
                    <span className="base__name">{b.name}</span>
                    <span className="base__cn">{b.cn}</span>
                  </th>
                  <td>{b.driveToLonglou}</td>
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
                      <span>{b.hotelPerNight}</span>
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
                {b.name} <span className="panel__cn">{b.cn}</span>
              </h3>
              <p className="panel__text">{b.verdict}</p>
              <p className="panel__text panel__text--good">{b.good}</p>
              <p className="panel__text panel__text--warn">{b.caveat}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Things to actually do"
          title="Activities that work with a 3-year-old and an 8-month-old"
          lede="With a short honest note on the ones that do not, so we do not waste a day learning it the hard way."
        />
        <div className="activities">
          {ACTIVITIES.map((a) => (
            <article className={`activity activity--${a.suitable}`} key={a.id}>
              <header className="activity__head">
                <div>
                  <h3 className="activity__name">{a.name}</h3>
                  <div className="activity__cn">
                    {a.cn} · {a.where}
                  </div>
                </div>
                <span className={`pill pill--${a.suitable}`}>{SUITABLE_LABEL[a.suitable]}</span>
              </header>
              <div className="activity__meta">
                <span>{a.ageFit}</span>
                <span>{a.duration}</span>
                <span>{a.cost}</span>
              </div>
              <p className="activity__verdict">{a.verdict}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">Family logistics worth knowing before you go</h3>
        <ul className="bullets bullets--wide">
          {FAMILY_LOGISTICS.map((f) => (
            <li key={f.title}>
              <strong>{f.title}</strong>
              <span className="bullet-detail">{f.detail}</span>
            </li>
          ))}
        </ul>
        <Callout tone="info" title="Verify locally">
          Child-restraint rules, hospital details and supply availability are the kind of thing that varies by
          district and changes over time. Treat these as planning notes, not legal or medical advice.
        </Callout>
      </section>
    </div>
  );
}
