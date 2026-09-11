import type { Highlights, OptionEvaluation } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';
import { Pips } from './ui';

const HIGHLIGHT_KEYS: (keyof Highlights)[] = ['bestOverall', 'cheapest', 'fastest', 'easiest', 'mostFlexible'];

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
  const { t, fmt, lang } = useTrip();
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
          <div className="option-card__mode">{t(opt.modeLabel)}</div>
          <h3 className="option-card__name">{t(opt.name)}</h3>
          <div className="option-card__sub">{t(opt.subtitle)}</div>
        </div>
        <div className="option-card__total">
          <span className="option-card__rank">{Math.round(ev.weighted)}</span>
          <span className="option-card__rank-label">{t(UI.score)}</span>
        </div>
      </header>

      {badges.length > 0 && (
        <div className="option-card__badges">
          {badges.map((b) => (
            <span className={`badge badge--${b}`} key={b}>
              {t(UI[b])}
            </span>
          ))}
        </div>
      )}

      <div className="option-card__stats">
        <div className="option-card__stat">
          <span className="option-card__stat-label">{t(UI.cost)}</span>
          <span className="option-card__stat-value">{formatCny(ev.cost, lang)}</span>
          <span className="option-card__stat-sub">
            {fmt('{vehicle} · {estimate}', { vehicle: t(opt.vehicle), estimate: t(UI.estimateSuffix) })}
          </span>
        </div>
        <div className="option-card__stat">
          <span className="option-card__stat-label">{t(UI.doorToDoor)}</span>
          <span className="option-card__stat-value">{formatDuration(ev.time.totalMinutes, lang)}</span>
          <span className="option-card__stat-sub">
            {fmt(t(UI.awakeOfIt), { d: formatDuration(ev.time.activeMinutes, lang) })}
          </span>
        </div>
      </div>

      <div className="option-card__ratings">
        <div className="option-card__rating">
          <span>{t(UI.toddlerComfort)}</span>
          <Pips score={ev.scores.family} />
        </div>
        <div className="option-card__rating">
          <span>{t(UI.flexibility)}</span>
          <Pips score={ev.scores.mobility} />
        </div>
        <div className="option-card__rating">
          <span>{t(UI.lowStress)}</span>
          <Pips score={ev.scores.stress} />
        </div>
        <div className="option-card__rating">
          <span>{t(UI.reliability)}</span>
          <Pips score={ev.scores.reliability} />
        </div>
      </div>

      <p className="option-card__tagline">{t(opt.tagline)}</p>

      <div className="option-card__foot">
        <span className="option-card__transfers">
          {opt.transfers === 0
            ? t(UI.noTransfers)
            : fmt(t(opt.transfers > 1 ? UI.transfersCountPlural : UI.transfersCount), { n: opt.transfers })}
        </span>
        <button type="button" className="btn btn--ghost" onClick={onOpen}>
          {t(UI.viewDetails)}
        </button>
      </div>
    </article>
  );
}
