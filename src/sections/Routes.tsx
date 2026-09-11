import { useTrip } from '../state';
import { Timeline } from '../components/Timeline';
import { RouteMap } from '../components/RouteMap';
import { Callout, ConfidenceChip, ScoreBar, SectionHeader, Stat } from '../components/ui';
import { formatCny, formatDuration } from '../lib/format';
import { resolveTimeline } from '../lib/compute';

export function Routes({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { evaluations, byId, assumptions } = useTrip();
  const ev = byId[selectedOptionId] ?? evaluations[0];
  const opt = ev.option;

  const visiblePlaceIds = Array.from(
    new Set([...opt.legs.flatMap((l) => [l.fromId, l.toId]), 'launch-pad', 'longlou', 'wenchang']),
  );

  return (
    <div className="stack">
      <SectionHeader
        eyebrow="Routes"
        title="The journey, hour by hour"
        lede="Times are live: they recompute from the assumptions, so raising the ferry queue or the airport lead time immediately shows up here."
        aside={
          <div className="chips chips--right">
            {evaluations.map((e) => (
              <button
                type="button"
                key={e.option.id}
                className={`btn btn--chip${e.option.id === opt.id ? ' btn--chip-active' : ''}`}
                style={{ ['--accent' as string]: e.option.accent }}
                onClick={() => onSelectOption(e.option.id)}
              >
                {e.option.name}
              </button>
            ))}
          </div>
        }
      />

      <div className="stats-row">
        <Stat label="Round-trip transport" value={formatCny(ev.cost)} sub="Edit on the Costs tab" />
        <Stat label="Outbound, door to door" value={formatDuration(ev.time.totalMinutes)} sub={`${formatDuration(ev.time.overnightMinutes)} of it asleep`} />
        <Stat label="Awake travel time" value={formatDuration(ev.time.activeMinutes)} sub="The part that wears everyone down" />
        <Stat label="Transfers" value={String(opt.transfers)} sub="Luggage and children moved again" tone={opt.transfers > 2 ? 'warn' : undefined} />
      </div>

      <section className="panel panel--pad">
        <div className="panel__head">
          <h3 className="panel__title">{opt.name}</h3>
          <ConfidenceChip level={opt.confidence} />
        </div>
        <p className="route__verdict">{opt.verdict}</p>

        <div className="route__layout">
          <div className="route__map">
            <RouteMap legs={opt.legs} visiblePlaceIds={visiblePlaceIds} accent={opt.accent} />
          </div>
          <div className="route__legs">
            <h4 className="route__subtitle">Legs</h4>
            <ol className="leg-list">
              {opt.legs.map((leg) => (
                <li key={leg.id} className={`leg-list__item leg-list__item--${leg.mode}`}>
                  <div className="leg-list__head">
                    <span className="leg-list__label">{leg.label}</span>
                    <span className="leg-list__mode">{leg.mode}</span>
                  </div>
                  <div className="leg-list__meta">
                    {leg.distance} · {leg.duration}
                  </div>
                  {leg.note && <div className="leg-list__note">{leg.note}</div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">Timeline</h3>
        <Timeline groups={resolveTimeline(opt, assumptions)} assumptions={assumptions} />
      </section>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">Family reality check</h3>
          <div className="practical">
            {opt.practical.map((p) => (
              <div className={`practical__row practical__row--${p.tone ?? 'neutral'}`} key={p.label}>
                <span className="practical__label">{p.label}</span>
                <span className="practical__value">{p.value}</span>
              </div>
            ))}
          </div>
          <div className="score-stack">
            <ScoreBar score={ev.scores.family} label="Toddler comfort" tone="coral" />
            <ScoreBar score={ev.scores.reliability} label="Reliability" tone="teal" />
            <ScoreBar score={ev.scores.transfers} label="Few transfers" tone="gold" />
            <ScoreBar score={ev.scores.mobility} label="Car freedom" tone="sky" />
            <ScoreBar score={ev.scores.luggage} label="Baby gear capacity" tone="plum" />
            <ScoreBar score={ev.scores.stress} label="Low stress" tone="teal" />
          </div>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">Advantages and costs</h3>
          <div className="proscons">
            <div>
              <h4 className="proscons__title proscons__title--good">In favour</h4>
              <ul className="bullets bullets--good">
                {opt.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="proscons__title proscons__title--bad">Against</h4>
              <ul className="bullets bullets--bad">
                {opt.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="panel panel--pad">
        <h3 className="panel__title">If the plan breaks</h3>
        <ul className="contingencies">
          {opt.contingencies.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <Callout tone="warn" title="Nothing here is bookable">
          This is a decision aid, not a booking tool. Every price and duration is an estimate or an editable
          assumption — confirm on the operator's own channel before committing money.
        </Callout>
      </section>
    </div>
  );
}
