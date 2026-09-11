import { TRIP } from '../data/trip';
import {
  LAUNCH_FACTS,
  LAUNCH_MORNING,
  LAUNCH_PLAN_OPTIONS,
  LAUNCH_STATUS,
  NOISE_AND_BABY,
  POSTPONEMENT,
  VIEWING_SPOTS,
} from '../data/launch';
import { sourceById } from '../data/sources';
import { Countdown } from '../components/Countdown';
import { Callout, ConfidenceChip, Pill, SectionHeader } from '../components/ui';

const STROLLER_LABEL = { yes: 'Stroller OK', partial: 'Partial — carrier recommended', no: 'Not stroller-friendly' };
const ACCESS_TONE = { yes: 'good', partial: 'warn', no: 'bad' } as const;

export function Launch() {
  return (
    <div className="stack">
      <section className="launch-hero">
        <div className="launch-hero__left">
          <div className="eyebrow">Launch</div>
          <h1 className="launch-hero__title">Wenchang rocket launch</h1>
          <p className="launch-hero__sub">
            {TRIP.launch.site} · {TRIP.launch.siteArea}
          </p>
          <div className="launch-hero__date">
            <span>{TRIP.launch.dateLabel}</span>
            <span className="launch-hero__time">{TRIP.launch.timeLabel}</span>
          </div>
          <div className="launch-hero__pills">
            <Pill tone="warn">Tentative window</Pill>
            <Pill tone="sand">Last checked for sources: {LAUNCH_STATUS.verifiedAt}</Pill>
            <Pill tone="sand">Sunrise ~06:20 CST</Pill>
          </div>
        </div>
        <div className="launch-hero__right">
          <Countdown />
          <p className="launch-hero__note">Countdown to the planned 08:30 CST window on 17 September 2026.</p>
        </div>
      </section>

      <Callout tone="danger" title="Read this before booking anything">
        {LAUNCH_STATUS.detail}
      </Callout>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">Confirm the schedule here</h3>
          <ul className="channel-list">
            {LAUNCH_STATUS.officialChannels.map((c) => {
              const src = sourceById[c.id];
              return (
                <li key={c.id}>
                  <span className="channel-list__name">{c.label}</span>
                  {src?.url ? (
                    <a href={src.url} target="_blank" rel="noreferrer">
                      {src.publisher}
                    </a>
                  ) : (
                    <span className="channel-list__note">see Sources</span>
                  )}
                </li>
              );
            })}
          </ul>
          <h4 className="panel__subtitle">Before departure</h4>
          <ul className="bullets">
            {LAUNCH_STATUS.verifyBeforeBooking.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">The practical picture</h3>
          <ul className="fact-list">
            {LAUNCH_FACTS.map((f) => (
              <li key={f.label}>
                <div className="fact-list__head">
                  <span className="fact-list__label">{f.label}</span>
                  <ConfidenceChip level={f.confidence} compact />
                </div>
                <div className="fact-list__value">{f.value}</div>
                {f.note && <div className="fact-list__note">{f.note}</div>}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <SectionHeader
          eyebrow="Where to watch"
          title="Viewing spots, ranked for a family with a baby"
          lede="Distances and prices are estimates to be confirmed locally; the family suitability notes are our judgement. Launch-day access rules change per mission."
        />
        <div className="spots">
          {VIEWING_SPOTS.map((s) => (
            <article className="spot" key={s.id}>
              <header className="spot__head">
                <div>
                  <h3 className="spot__name">{s.name}</h3>
                  <div className="spot__cn">{s.cn}</div>
                </div>
                <span className={`pill pill--${ACCESS_TONE[s.stroller]}`}>{STROLLER_LABEL[s.stroller]}</span>
              </header>
              <dl className="spot__facts">
                <div>
                  <dt>Distance from pads</dt>
                  <dd>{s.distance}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd>{s.access}</dd>
                </div>
                <div>
                  <dt>Ticket</dt>
                  <dd>{s.ticket}</dd>
                </div>
              </dl>
              <p className="spot__good">{s.goodFor}</p>
              {s.caveat && <p className="spot__caveat">{s.caveat}</p>}
              <footer className="spot__foot">
                <ConfidenceChip level={s.confidence} compact />
                {s.sourceIds.map((id) => {
                  const src = sourceById[id];
                  return src ? (
                    <a key={id} href={src.url || undefined} target="_blank" rel="noreferrer" className="spot__source">
                      {src.publisher}
                    </a>
                  ) : null;
                })}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel--pad">
        <SectionHeader
          eyebrow="Launch morning"
          title="An 08:30 launch, planned backwards"
          lede="Built for a 3-year-old and an 8-month-old: late arrival is worse than an imperfect view, and shade beats proximity."
        />
        <ol className="launch-steps">
          {LAUNCH_MORNING.map((step) => (
            <li className={`launch-step launch-step--${step.tone ?? 'info'}`} key={step.time + step.label}>
              <span className="launch-step__time">{step.time}</span>
              <div className="launch-step__body">
                <h4 className="launch-step__label">{step.label}</h4>
                <p className="launch-step__detail">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid--3">
        {LAUNCH_PLAN_OPTIONS.map((p, i) => (
          <div className={`panel panel--pad${i === 0 ? ' panel--accent' : ''}`} key={p.id}>
            <h3 className="panel__title">{p.name}</h3>
            <p className="panel__text">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">Noise, ears and the 8-month-old</h3>
          <ul className="bullets">
            {NOISE_AND_BABY.map((n) => (
              <li key={n.title}>
                <strong>{n.title}</strong>
                <span className="bullet-detail">{n.detail}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel panel--pad">
          <h3 className="panel__title">If it is postponed</h3>
          <ul className="bullets">
            {POSTPONEMENT.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                <span className="bullet-detail">{p.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
