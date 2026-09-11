import type { OptionEvaluation, Highlights } from '../lib/scoring';
import { HIGHLIGHT_LABEL } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';
import { Pips } from './ui';

const HIGHLIGHT_KEYS = Object.keys(HIGHLIGHT_LABEL) as (keyof Highlights)[];

export function OptionCard({
  ev,
  highlights,
  onOpen,
  focused,
}: {
  ev: OptionEvaluation;
  highlights: Highlights;
  onOpen: () => void;
  focused?: boolean;
}) {
  const opt = ev.option;
  const badges = HIGHLIGHT_KEYS.filter((k) => highlights[k] === opt.id);
  const isBest = highlights.bestOverall === opt.id;

  return (
    <article
      className={`option-card${isBest ? ' option-card--best' : ''}${focused ? ' option-card--focused' : ''}`}
      style={{ ['--accent' as string]: opt.accent }}
    >
      <header className="option-card__head">
        <div>
          <div className="option-card__mode">{opt.modeLabel}</div>
          <h3 className="option-card__name">{opt.name}</h3>
          <div className="option-card__sub">{opt.subtitle}</div>
        </div>
        <div className="option-card__total">
          <span className="option-card__rank">{Math.round(ev.weighted)}</span>
          <span className="option-card__rank-label">score</span>
        </div>
      </header>

      {badges.length > 0 && (
        <div className="option-card__badges">
          {badges.map((b) => (
            <span className={`badge badge--${b}`} key={b}>
              {HIGHLIGHT_LABEL[b]}
            </span>
          ))}
        </div>
      )}

      <div className="option-card__stats">
        <div className="option-card__stat">
          <span className="option-card__stat-label">Cost</span>
          <span className="option-card__stat-value">{formatCny(ev.cost)}</span>
          <span className="option-card__stat-sub">
            {opt.vehicle} · estimate
          </span>
        </div>
        <div className="option-card__stat">
          <span className="option-card__stat-label">Door to door</span>
          <span className="option-card__stat-value">{formatDuration(ev.time.totalMinutes)}</span>
          <span className="option-card__stat-sub">
            {formatDuration(ev.time.activeMinutes)} of it awake
          </span>
        </div>
      </div>

      <div className="option-card__ratings">
        <div className="option-card__rating">
          <span>Toddler comfort</span>
          <Pips score={ev.scores.family} />
        </div>
        <div className="option-card__rating">
          <span>Flexibility</span>
          <Pips score={ev.scores.mobility} />
        </div>
        <div className="option-card__rating">
          <span>Low stress</span>
          <Pips score={ev.scores.stress} />
        </div>
        <div className="option-card__rating">
          <span>Reliability</span>
          <Pips score={ev.scores.reliability} />
        </div>
      </div>

      <p className="option-card__tagline">{opt.tagline}</p>

      <div className="option-card__foot">
        <span className="option-card__transfers">
          {opt.transfers === 0 ? 'No transfers' : `${opt.transfers} transfer${opt.transfers > 1 ? 's' : ''}`}
        </span>
        <button type="button" className="btn btn--ghost" onClick={onOpen}>
          View details →
        </button>
      </div>
    </article>
  );
}
