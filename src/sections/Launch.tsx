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
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

const STROLLER_KEY = {
  yes: 'strollerYes',
  partial: 'strollerPartial',
  no: 'strollerNo',
} as const;

const STROLLER_TONE = { yes: 'good', partial: 'warn', no: 'bad' } as const;

export function Launch() {
  const { t, fmt } = useTrip();

  return (
    <div className="stack">
      <section className="launch-hero">
        <div className="launch-hero__left">
          <div className="eyebrow">{t(UI.launchEyebrow)}</div>
          <h1 className="launch-hero__title">{t(TRIP.launch.mission)}</h1>
          <p className="launch-hero__sub">
            {t(TRIP.launch.site)} · {t(TRIP.launch.pad)}
          </p>
          <div className="launch-hero__date">
            <span>{t(TRIP.launch.dateLabel)}</span>
            <span className="launch-hero__time">{t(TRIP.launch.timeLabel)}</span>
          </div>
          <div className="launch-hero__pills">
            <Pill tone="good">{t(UI.dateCorroborated)}</Pill>
            <Pill tone="warn">{t(UI.notAnnounced)}</Pill>
            <Pill tone="sand">{fmt(t(UI.windowPill), { window: '08:25–08:54', t0: '08:30' })}</Pill>
            <Pill tone="sand">{fmt(t(UI.lastChecked), { date: LAUNCH_STATUS.verifiedAt })}</Pill>
          </div>
        </div>
        <div className="launch-hero__right">
          <Countdown />
          <p className="launch-hero__note">{fmt(t(UI.countdownNote), { t0: '08:30' })}</p>
        </div>
      </section>

      <div className="grid grid--2">
        <Callout tone="warn" title={t(UI.howSolid)}>
          {t(LAUNCH_STATUS.detail)}
        </Callout>
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.whatCouldChange)}</h3>
          <ul className="bullets bullets--bad">
            {LAUNCH_STATUS.caveats.map((c, i) => (
              <li key={i}>{t(c)}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.confirmSchedule)}</h3>
          <ul className="channel-list">
            {LAUNCH_STATUS.officialChannels.map((c) => {
              const src = sourceById[c.id];
              return (
                <li key={c.id}>
                  <span className="channel-list__name">{t(c.label)}</span>
                  {src?.url ? (
                    <a href={src.url} target="_blank" rel="noreferrer">
                      {src.publisher}
                    </a>
                  ) : (
                    <span className="channel-list__note">{t(UI.navSources)}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <h4 className="panel__subtitle">{t(UI.beforeDeparture)}</h4>
          <ul className="bullets">
            {LAUNCH_STATUS.verifyBeforeBooking.map((v, i) => (
              <li key={i}>{t(v)}</li>
            ))}
          </ul>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.practicalPicture)}</h3>
          <ul className="fact-list">
            {LAUNCH_FACTS.map((f, i) => (
              <li key={i}>
                <div className="fact-list__head">
                  <span className="fact-list__label">{t(f.label)}</span>
                  <ConfidenceChip level={f.confidence} />
                </div>
                <div className="fact-list__value">{t(f.value)}</div>
                {f.note && <div className="fact-list__note">{t(f.note)}</div>}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <SectionHeader eyebrow={t(UI.whereToWatch)} title={t(UI.viewingTitle)} lede={t(UI.viewingLede)} />
        <div className="spots">
          {VIEWING_SPOTS.map((s) => (
            <article className="spot" key={s.id}>
              <header className="spot__head">
                <div>
                  <h3 className="spot__name">{t(s.name)}</h3>
                  <div className="spot__cn">{s.cn}</div>
                </div>
                <span className={`pill pill--${STROLLER_TONE[s.stroller]}`}>{t(UI[STROLLER_KEY[s.stroller]])}</span>
              </header>
              <dl className="spot__facts">
                <div>
                  <dt>{t(UI.distanceFromPads)}</dt>
                  <dd>{t(s.distance)}</dd>
                </div>
                <div>
                  <dt>{t(UI.access)}</dt>
                  <dd>{t(s.access)}</dd>
                </div>
                <div>
                  <dt>{t(UI.ticket)}</dt>
                  <dd>{t(s.ticket)}</dd>
                </div>
              </dl>
              <p className="spot__good">{t(s.goodFor)}</p>
              {s.caveat && <p className="spot__caveat">{t(s.caveat)}</p>}
              <footer className="spot__foot">
                <ConfidenceChip level={s.confidence} />
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
        <SectionHeader eyebrow={t(UI.launchMorning)} title={t(UI.launchMorningTitle)} lede={t(UI.launchMorningLede)} />
        <ol className="launch-steps">
          {LAUNCH_MORNING.map((step, i) => (
            <li className={`launch-step launch-step--${step.tone ?? 'info'}`} key={i}>
              <span className="launch-step__time">{t(step.time)}</span>
              <div className="launch-step__body">
                <h4 className="launch-step__label">{t(step.label)}</h4>
                <p className="launch-step__detail">{t(step.detail)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid--3">
        {LAUNCH_PLAN_OPTIONS.map((p, i) => (
          <div className={`panel panel--pad${i === 0 ? ' panel--accent' : ''}`} key={p.id}>
            <h3 className="panel__title">{t(p.name)}</h3>
            <p className="panel__text">{t(p.detail)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.noiseEars)}</h3>
          <ul className="bullets">
            {NOISE_AND_BABY.map((n, i) => (
              <li key={i}>
                <strong>{t(n.title)}</strong>
                <span className="bullet-detail">{t(n.detail)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.ifPostponed)}</h3>
          <ul className="bullets">
            {POSTPONEMENT.map((p, i) => (
              <li key={i}>
                <strong>{t(p.title)}</strong>
                <span className="bullet-detail">{t(p.detail)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
