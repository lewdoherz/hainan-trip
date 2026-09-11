import { useTrip } from '../state';
import { Timeline } from '../components/Timeline';
import { RouteMap } from '../components/RouteMap';
import { Callout, ConfidenceChip, ScoreBar, SectionHeader, Stat } from '../components/ui';
import { formatCny, formatDuration } from '../lib/format';
import { resolveTimeline } from '../lib/compute';
import { UI } from '../i18n/ui';

export function Routes({
  selectedOptionId,
  onSelectOption,
}: {
  selectedOptionId: string;
  onSelectOption: (id: string) => void;
}) {
  const { t, fmt, lang, evaluations, byId, assumptions } = useTrip();
  const ev = byId[selectedOptionId] ?? evaluations[0];
  const opt = ev.option;

  const visiblePlaceIds = Array.from(
    new Set([...opt.legs.flatMap((l) => [l.fromId, l.toId]), 'launch-pad', 'longlou', 'wenchang']),
  );

  return (
    <div className="stack">
      <SectionHeader
        eyebrow={t(UI.routesEyebrow)}
        title={t(UI.routesTitle)}
        lede={t(UI.routesLede)}
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
                {t(e.option.name)}
              </button>
            ))}
          </div>
        }
      />

      <div className="stats-row">
        <Stat label={t(UI.statRoundTrip)} value={formatCny(ev.cost, lang)} sub={t(UI.statEditOnCosts)} />
        <Stat
          label={t(UI.doorToDoor)}
          value={formatDuration(ev.time.totalMinutes, lang)}
          sub={fmt(t(UI.statAsleep), { d: formatDuration(ev.time.overnightMinutes, lang) })}
        />
        <Stat
          label={t(UI.statAwake)}
          value={formatDuration(ev.time.activeMinutes, lang)}
          sub={t(UI.statAwakeSub)}
        />
        <Stat
          label={t(UI.statTransfers)}
          value={String(opt.transfers)}
          sub={t(UI.statTransfersSub)}
          tone={opt.transfers > 2 ? 'warn' : undefined}
        />
      </div>

      <section className="panel panel--pad">
        <div className="panel__head">
          <h3 className="panel__title">{t(opt.name)}</h3>
          <ConfidenceChip level={opt.confidence} />
        </div>
        <p className="route__verdict">{t(opt.verdict)}</p>

        <div className="route__layout">
          <div className="route__map">
            <RouteMap legs={opt.legs} visiblePlaceIds={visiblePlaceIds} accent={opt.accent} />
          </div>
          <div className="route__legs">
            <h4 className="route__subtitle">{t(UI.legs)}</h4>
            <ol className="leg-list">
              {opt.legs.map((leg) => (
                <li key={leg.id} className={`leg-list__item leg-list__item--${leg.mode}`}>
                  <div className="leg-list__head">
                    <span className="leg-list__label">{t(leg.label)}</span>
                    <span className="leg-list__mode">{leg.mode}</span>
                  </div>
                  <div className="leg-list__meta">
                    {t(leg.distance)} · {t(leg.duration)}
                  </div>
                  {leg.note && <div className="leg-list__note">{t(leg.note)}</div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.timeline)}</h3>
        <Timeline groups={resolveTimeline(opt, assumptions)} assumptions={assumptions} />
      </section>

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.familyReality)}</h3>
          <div className="practical">
            {opt.practical.map((p, i) => (
              <div className={`practical__row practical__row--${p.tone ?? 'neutral'}`} key={i}>
                <span className="practical__label">{t(p.label)}</span>
                <span className="practical__value">{t(p.value)}</span>
              </div>
            ))}
          </div>
          <div className="score-stack">
            <ScoreBar score={ev.scores.family} label={t(UI.toddlerComfort)} tone="coral" />
            <ScoreBar score={ev.scores.reliability} label={t(UI.reliability)} tone="teal" />
            <ScoreBar score={ev.scores.transfers} label={t(UI.scoreFewTransfers)} tone="gold" />
            <ScoreBar score={ev.scores.mobility} label={t(UI.scoreCarFreedom)} tone="sky" />
            <ScoreBar score={ev.scores.luggage} label={t(UI.scoreBabyGear)} tone="plum" />
            <ScoreBar score={ev.scores.stress} label={t(UI.lowStress)} tone="teal" />
          </div>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.advantagesCosts)}</h3>
          <div className="proscons">
            <div>
              <h4 className="proscons__title proscons__title--good">{t(UI.inFavour)}</h4>
              <ul className="bullets bullets--good">
                {opt.pros.map((p, i) => (
                  <li key={i}>{t(p)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="proscons__title proscons__title--bad">{t(UI.against)}</h4>
              <ul className="bullets bullets--bad">
                {opt.cons.map((c, i) => (
                  <li key={i}>{t(c)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.ifPlanBreaks)}</h3>
        <ul className="contingencies">
          {opt.contingencies.map((c, i) => (
            <li key={i}>{t(c)}</li>
          ))}
        </ul>
        <Callout tone="warn" title={t(UI.nothingBookable)}>
          {t(UI.nothingBookableText)}
        </Callout>
      </section>
    </div>
  );
}
