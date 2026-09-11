import { useTrip } from '../state';
import { TRIP } from '../data/trip';
import { LAUNCH_STATUS } from '../data/launch';
import { Countdown } from '../components/Countdown';
import { OptionCard } from '../components/OptionCard';
import { RecommendationBanner } from '../components/RecommendationBanner';
import { Callout, Pill, SectionHeader } from '../components/ui';
import { formatDate } from '../lib/format';
import { UI } from '../i18n/ui';

const HIGHLIGHT_KEYS = ['bestOverall', 'cheapest', 'fastest', 'easiest', 'mostFlexible'] as const;

export function Overview({ onOpenOption }: { onOpenOption: (id: string) => void }) {
  const { t, fmt, lang, evaluations, highlights, weights } = useTrip();
  const dateRange = `${formatDate(TRIP.tripStart, lang, { year: undefined })} – ${formatDate(TRIP.tripEnd, lang, { year: undefined })}`;

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero__text">
          <div className="eyebrow">{t(UI.overviewEyebrow)}</div>
          <h1 className="hero__title">
            {t(TRIP.title).split('→')[0].trim()} <span className="hero__arrow">→</span>{' '}
            {t(TRIP.title).split('→')[1]?.trim()}
          </h1>
          <p className="hero__lede">{t(UI.heroLede)}</p>
          <div className="hero__meta">
            <Pill tone="teal">{fmt(t(UI.adultsPill), { n: TRIP.travelers.adults })}</Pill>
            <Pill tone="coral">{t(UI.kidsPill)}</Pill>
            <Pill tone="sand">{fmt(t(UI.nightsPill), { n: TRIP.nightsInHainan })}</Pill>
            <Pill tone="sand">{dateRange}</Pill>
          </div>
        </div>

        <div className="hero__launch">
          <div className="hero__launch-head">
            <span className="hero__launch-tag">{t(TRIP.launch.mission)}</span>
            <Pill tone="warn">{t(UI.notAnnounced)}</Pill>
          </div>
          <div className="hero__launch-date">{t(TRIP.launch.dateLabel)}</div>
          <div className="hero__launch-time">{t(TRIP.launch.timeLabel)}</div>
          <Countdown />
          <p className="hero__launch-note">
            {fmt(t(UI.windowLabel), { window: '08:25–08:54', t0: '08:30' })} · {t(TRIP.launch.pad)}
          </p>
          <p className="hero__launch-note">{t(UI.corroboratedNote)}</p>
          <span className="hero__verified">
            {fmt(t(UI.lastChecked), { date: LAUNCH_STATUS.verifiedAt })}
          </span>
        </div>
      </section>

      <Callout tone="warn" title={t(UI.launchCaveatTitle)}>
        {t(UI.launchCaveatText)} <strong>{t(UI.navLaunch)}</strong> — {t(UI.launchCaveatTail)}
      </Callout>

      <RecommendationBanner
        evaluations={evaluations}
        weights={weights}
        winnerId={highlights.bestOverall}
        onOpen={onOpenOption}
      />

      <section>
        <SectionHeader eyebrow={t(UI.shortlistEyebrow)} title={t(UI.shortlistTitle)} lede={t(UI.shortlistLede)} />
        <div className="cards">
          {evaluations.map((ev) => (
            <OptionCard
              key={ev.option.id}
              ev={ev}
              highlights={highlights}
              focused={highlights.bestOverall === ev.option.id}
              onOpen={() => onOpenOption(ev.option.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow={t(UI.howToRead)} title={t(UI.howToReadTitle)} lede={t(UI.howToReadLede)} />
        <div className="grid grid--3">
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--verified" /> {t(UI.verified)}
            </h3>
            <p className="panel__text">{t(UI.verifiedPanel)}</p>
          </div>
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--estimate" /> {t(UI.estimate)}
            </h3>
            <p className="panel__text">{t(UI.estimatePanel)}</p>
          </div>
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--assumption" /> {t(UI.assumption)}
            </h3>
            <p className="panel__text">{t(UI.assumptionPanel)}</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader eyebrow={t(UI.navCompare)} title={t(UI.whereEachWins)} lede={t(UI.whereEachWinsLede)} />
        <div className="badge-board">
          {evaluations.map((ev) => {
            const wins = HIGHLIGHT_KEYS.filter((k) => highlights[k] === ev.option.id);
            return (
              <button
                type="button"
                key={ev.option.id}
                className="badge-board__row"
                style={{ ['--accent' as string]: ev.option.accent }}
                onClick={() => onOpenOption(ev.option.id)}
              >
                <span className="badge-board__name">{t(ev.option.name)}</span>
                <span className="badge-board__tags">
                  {wins.length === 0 ? (
                    <em className="badge-board__none">{t(UI.noOutrightWin)}</em>
                  ) : (
                    wins.map((k) => (
                      <span className={`badge badge--${k}`} key={k}>
                        {t(UI[k])}
                      </span>
                    ))
                  )}
                </span>
                <span className="badge-board__score">{Math.round(ev.weighted)}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
