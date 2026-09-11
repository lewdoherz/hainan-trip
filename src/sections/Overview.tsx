import { useTrip } from '../state';
import { TRIP } from '../data/trip';
import { LAUNCH_STATUS } from '../data/launch';
import { Countdown } from '../components/Countdown';
import { OptionCard } from '../components/OptionCard';
import { RecommendationBanner } from '../components/RecommendationBanner';
import { Callout, Pill, SectionHeader } from '../components/ui';
import { formatDate } from '../lib/format';

export function Overview({ onOpenOption }: { onOpenOption: (id: string) => void }) {
  const { evaluations, highlights, weights } = useTrip();

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero__text">
          <div className="eyebrow">Family travel decision dashboard</div>
          <h1 className="hero__title">
            Xiamen <span className="hero__arrow">→</span> Wenchang
          </h1>
          <p className="hero__lede">
            Two adults, a 3-year-old and an 8-month-old. One rocket launch, one Hainan holiday, and a car that has to
            be waiting on the island either way. Everything below compares the three realistic ways to get there — and
            what the day actually feels like with two small children.
          </p>
          <div className="hero__meta">
            <Pill tone="teal">{TRIP.travelers.adults} adults</Pill>
            <Pill tone="coral">3-year-old + 8-month-old</Pill>
            <Pill tone="sand">{TRIP.nightsInHainan} nights in Hainan</Pill>
            <Pill tone="sand">
              {formatDate(TRIP.tripStart, { year: undefined })} – {formatDate(TRIP.tripEnd, { year: undefined })}
            </Pill>
          </div>
        </div>

        <div className="hero__launch">
          <div className="hero__launch-head">
            <span className="hero__launch-tag">Wenchang rocket launch</span>
            <Pill tone="warn">Tentative</Pill>
          </div>
          <div className="hero__launch-date">{TRIP.launch.dateLabel}</div>
          <div className="hero__launch-time">{TRIP.launch.timeLabel}</div>
          <Countdown />
          <p className="hero__launch-note">
            Countdown to the planned window. {LAUNCH_STATUS.detail.split('—')[0].trim()}
          </p>
          <span className="hero__verified">Last checked for sources: {LAUNCH_STATUS.verifiedAt}</span>
        </div>
      </section>

      <Callout tone="danger" title="The launch date is a target, not a confirmed schedule">
        Wenchang launch dates are published late and move often — weather scrubs are routine. This app could not
        confirm the 17 September 2026 window against an official schedule (no working search in the build
        environment). Verify it and re-check the launch-day rules before buying anything non-refundable. All launch
        details live in the <strong>Launch</strong> tab.
      </Callout>

      <RecommendationBanner
        evaluations={evaluations}
        weights={weights}
        winnerId={highlights.bestOverall}
        onOpen={onOpenOption}
      />

      <section>
        <SectionHeader
          eyebrow="The shortlist"
          title="Five ways to get there"
          lede="Estimates update live from the calculator — change a price or a weight and every card moves."
        />
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
        <SectionHeader
          eyebrow="How to read this"
          title="What this app does and does not claim"
          lede="Nothing here is a live quote. Every number carries its own confidence label."
        />
        <div className="grid grid--3">
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--verified" /> Verified
            </h3>
            <p className="panel__text">
              Taken from a named official or operator source listed in the Sources tab — the existence of the ferry,
              the launch site location, child-fare rules, the absence of a through train.
            </p>
          </div>
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--estimate" /> Estimate
            </h3>
            <p className="panel__text">
              A researched range for something that changes constantly: fares, ferry prices, driving times. Shown as a
              default value you are expected to replace with a real quote in the Costs tab.
            </p>
          </div>
          <div className="panel">
            <h3 className="panel__title">
              <span className="dot dot--assumption" /> Assumption
            </h3>
            <p className="panel__text">
              A planning choice, not a fact — one hotel night on the road, two child seats, parking the car at XMN.
              Wrong assumption, wrong answer: edit it.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="The whole picture"
          title="Where each option wins"
          lede="Tap through to the badge table on the Compare tab, or adjust what matters most to you."
        />
        <div className="badge-board">
          {evaluations.map((ev) => {
            const wins = (Object.keys(highlights) as (keyof typeof highlights)[]).filter(
              (k) => highlights[k] === ev.option.id,
            );
            return (
              <button
                type="button"
                key={ev.option.id}
                className="badge-board__row"
                style={{ ['--accent' as string]: ev.option.accent }}
                onClick={() => onOpenOption(ev.option.id)}
              >
                <span className="badge-board__name">{ev.option.name}</span>
                <span className="badge-board__tags">
                  {wins.length === 0 ? (
                    <em className="badge-board__none">no outright win</em>
                  ) : (
                    wins.map((k) => (
                      <span className={`badge badge--${k}`} key={k}>
                        {k === 'bestOverall'
                          ? 'Best overall'
                          : k === 'cheapest'
                            ? 'Cheapest'
                            : k === 'fastest'
                              ? 'Fastest'
                              : k === 'easiest'
                                ? 'Easiest with toddlers'
                                : 'Most flexible'}
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
