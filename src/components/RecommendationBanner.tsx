import type { OptionEvaluation } from '../lib/scoring';
import { CATEGORIES, DEFAULT_WEIGHTS, type Weights } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';
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
          Best overall for your family
          {customised && <span className="reco__custom">based on your weights</span>}
        </div>
        <h2 className="reco__title">{winner.option.name}</h2>
        <p className="reco__sub">{winner.option.subtitle}</p>
      </div>

      <div className="reco__numbers">
        <div className="reco__number">
          <span className="reco__number-value">{formatCny(winner.cost)}</span>
          <span className="reco__number-label">estimated round-trip transport</span>
        </div>
        <div className="reco__number">
          <span className="reco__number-value">{formatDuration(winner.time.totalMinutes)}</span>
          <span className="reco__number-label">door to door, outbound</span>
        </div>
        <div className="reco__number">
          <span className="reco__number-value">{Math.round(winner.weighted)}/100</span>
          <span className="reco__number-label">
            weighted score{margin > 0.5 ? `, +${margin.toFixed(0)} over ${runnerUp.option.name}` : ''}
          </span>
        </div>
      </div>

      <div className="reco__body">
        <div className="reco__col">
          <h3 className="reco__col-title">Why</h3>
          <ul className="reco__why">
            {why.map(({ category }) => (
              <li key={category.id}>
                <span className="reco__why-label">{category.short}</span>
                <span className="reco__why-text">{winner.rationale[category.id]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reco__col">
          <h3 className="reco__col-title">Main trade-off</h3>
          <Callout tone="warn" title={`Weakest area: ${tradeoff.category.short}`}>
            {winner.rationale[tradeoff.category.id]}
          </Callout>
          <ul className="reco__cons">
            {winner.option.cons.slice(0, 3).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="reco__foot">
        <button type="button" className="btn btn--primary" onClick={() => onOpen(winner.option.id)}>
          See the full route, timeline and costs →
        </button>
        <span className="reco__runner">
          Runner-up: <strong>{runnerUp.option.name}</strong> — {runnerUp.option.tagline}
        </span>
      </div>
    </section>
  );
}
