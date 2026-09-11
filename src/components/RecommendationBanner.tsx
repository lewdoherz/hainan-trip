import type { OptionEvaluation } from '../lib/scoring';
import { CATEGORIES, DEFAULT_WEIGHTS, type Weights } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';
import { Callout } from './ui';

export function RecommendationBanner({
  evaluations,
  weights,
  winnerId,
  onOpen,
}: {
  evaluations: OptionEvaluation[];
  weights: Weights;
  winnerId: string;
  onOpen: (id: string) => void;
}) {
  const { t, fmt, lang } = useTrip();
  const winner = evaluations.find((e) => e.option.id === winnerId) ?? evaluations[0];
  const others = evaluations.filter((e) => e.option.id !== winner.option.id);
  const runnerUp = others.reduce((best, e) => (e.weighted > best.weighted ? e : best), others[0]);
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  const contributions = CATEGORIES.map((c) => ({
    category: c,
    share: ((weights[c.id] ?? 0) / weightSum) * (winner.scores[c.id] ?? 0),
  })).sort((a, b) => b.share - a.share);

  const why = contributions.slice(0, 4);
  const tradeoff = contributions[contributions.length - 1];
  const customised = CATEGORIES.some((c) => Math.round(weights[c.id]) !== Math.round(DEFAULT_WEIGHTS[c.id]));
  const margin = winner.weighted - (runnerUp?.weighted ?? 0);

  return (
    <section className="reco" style={{ ['--accent' as string]: winner.option.accent }}>
      <div className="reco__head">
        <div className="reco__eyebrow">
          {t(UI.bestOverall)}
          {customised && <span className="reco__custom">{t(UI.recoCustom)}</span>}
        </div>
        <h2 className="reco__title">{t(winner.option.name)}</h2>
        <p className="reco__sub">{t(winner.option.subtitle)}</p>
      </div>

      <div className="reco__numbers">
        <div className="reco__number">
          <span className="reco__number-value">{formatCny(winner.cost, lang)}</span>
          <span className="reco__number-label">{t(UI.statRoundTrip)}</span>
        </div>
        <div className="reco__number">
          <span className="reco__number-value">{formatDuration(winner.time.totalMinutes, lang)}</span>
          <span className="reco__number-label">{t(UI.doorToDoor)}</span>
        </div>
        <div className="reco__number">
          <span className="reco__number-value">{Math.round(winner.weighted)}/100</span>
          <span className="reco__number-label">
            {t(UI.weightedScore)}
            {margin > 0.5 ? ` · +${margin.toFixed(0)} ${t(UI.wins)}` : ''}
          </span>
        </div>
      </div>

      <div className="reco__body">
        <div className="reco__col">
          <h3 className="reco__col-title">{t(UI.inFavour)}</h3>
          <ul className="reco__why">
            {why.map(({ category }) => (
              <li key={category.id}>
                <span className="reco__why-label">{t(category.short)}</span>
                <span className="reco__why-text">{winner.rationale[category.id]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reco__col">
          <h3 className="reco__col-title">{t(UI.against)}</h3>
          <Callout tone="warn" title={fmt(t(UI.recoTradeoff), { label: t(tradeoff.category.short) })}>
            {winner.rationale[tradeoff.category.id]}
          </Callout>
          <ul className="reco__cons">
            {winner.option.cons.slice(0, 3).map((c, i) => (
              <li key={i}>{t(c)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="reco__foot">
        <button type="button" className="btn btn--primary" onClick={() => onOpen(winner.option.id)}>
          {t(UI.recoSeeRoute)}
        </button>
        <span className="reco__runner">
          {fmt(t(UI.recoRunnerUp), { name: t(runnerUp.option.name), tagline: t(runnerUp.option.tagline) })}
        </span>
      </div>
    </section>
  );
}
