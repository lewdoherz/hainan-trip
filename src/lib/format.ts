export function formatCny(value: number, opts: { compact?: boolean } = {}): string {
  const rounded = Math.round(value);
  if (opts.compact && Math.abs(rounded) >= 10000) {
    return `¥${(rounded / 10000).toFixed(1)}万`;
  }
  return `¥${rounded.toLocaleString('en-US')}`;
}

/** "7 h 45 m" or "2 d 6 h". Uses one significant unit below the top one. */
export function formatDuration(minutes: number): string {
  const m = Math.max(0, Math.round(minutes));
  if (m < 60) return `${m} min`;
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  if (hours < 24) return mins === 0 ? `${hours} h` : `${hours} h ${mins} m`;
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return remHours === 0 ? `${days} d` : `${days} d ${remHours} h`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export const CONFIDENCE_LABEL: Record<string, string> = {
  verified: 'Verified',
  estimate: 'Estimate',
  assumption: 'Assumption',
};

export const CONFIDENCE_HINT: Record<string, string> = {
  verified: 'Checked against a named source — see Sources.',
  estimate: 'Best researched range; indicative only — confirm before booking.',
  assumption: 'A planning choice, not a researched fact. Edit it to match reality.',
};
