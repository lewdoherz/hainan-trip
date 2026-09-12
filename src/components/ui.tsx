import type { ReactNode } from 'react';
import type { Confidence } from '../data/types';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

const CONFIDENCE_KEY: Record<Confidence, { label: keyof typeof UI; hint: keyof typeof UI }> = {
  verified: { label: 'verified', hint: 'verifiedHint' },
  screenshot: { label: 'screenshot', hint: 'screenshotHint' },
  estimate: { label: 'estimate', hint: 'estimateHint' },
  assumption: { label: 'assumption', hint: 'assumptionHint' },
};

export function ConfidenceChip({ level }: { level: Confidence }) {
  const { t } = useTrip();
  const key = CONFIDENCE_KEY[level];
  return (
    <span className={`chip chip--${level}`} title={t(UI[key.hint])}>
      <span className="chip__dot" aria-hidden="true" />
      {t(UI[key.label])}
    </span>
  );
}

export function ScoreBar({
  score,
  label,
  tone = 'teal',
  suffix,
}: {
  score: number;
  label?: string;
  tone?: 'teal' | 'coral' | 'gold' | 'sky' | 'plum';
  suffix?: ReactNode;
}) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="scorebar">
      {label && (
        <div className="scorebar__head">
          <span className="scorebar__label">{label}</span>
          <span className="scorebar__value">
            {Math.round(score)}
            <span className="scorebar__max">/100</span>
            {suffix}
          </span>
        </div>
      )}
      <div className="scorebar__track">
        <div className={`scorebar__fill scorebar__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: 'good' | 'warn' | 'bad';
}) {
  return (
    <div className={`stat${tone ? ` stat--${tone}` : ''}`}>
      <div className="stat__label">{label}</div>
      <div className="stat__value">{value}</div>
      {sub && <div className="stat__sub">{sub}</div>}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="section-head">
      <div className="section-head__text">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="section-head__title">{title}</h2>
        {lede && <p className="section-head__lede">{lede}</p>}
      </div>
      {aside && <div className="section-head__aside">{aside}</div>}
    </header>
  );
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function Pips({ score, max = 5 }: { score: number; max?: number }) {
  const filled = Math.round((score / 100) * max);
  return (
    <span className="pips" title={`${Math.round(score)}/100`}>
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={`pips__dot${i < filled ? ' pips__dot--on' : ''}`} />
      ))}
      <span className="pips__num">
        {filled}/{max}
      </span>
    </span>
  );
}

export function Callout({
  children,
  tone = 'info',
  title,
  icon,
}: {
  children: ReactNode;
  tone?: 'info' | 'warn' | 'good' | 'danger';
  title?: string;
  icon?: string;
}) {
  return (
    <div className={`callout callout--${tone}`}>
      {icon && (
        <span className="callout__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="callout__body">
        {title && <div className="callout__title">{title}</div>}
        <div className="callout__text">{children}</div>
      </div>
    </div>
  );
}
