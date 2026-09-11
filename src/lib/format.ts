import type { Lang } from '../data/types';
import { LOCALE } from '../i18n/lang';

export function formatCny(value: number, lang: Lang): string {
  const rounded = Math.round(value);
  return lang === 'zh' ? `¥${rounded.toLocaleString('zh-CN')}` : `¥${rounded.toLocaleString('en-US')}`;
}

/** "7 h 45 m" / "7 小时 45 分", or "2 d 6 h" / "2 天 6 小时". */
export function formatDuration(minutes: number, lang: Lang): string {
  const m = Math.max(0, Math.round(minutes));
  const zh = lang === 'zh';
  if (m < 60) return zh ? `${m} 分钟` : `${m} min`;
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  if (hours < 24) {
    if (mins === 0) return zh ? `${hours} 小时` : `${hours} h`;
    return zh ? `${hours} 小时 ${mins} 分` : `${hours} h ${mins} m`;
  }
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  if (remHours === 0) return zh ? `${days} 天` : `${days} d`;
  return zh ? `${days} 天 ${remHours} 小时` : `${days} d ${remHours} h`;
}

export function formatDate(iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions = {}): string {
  const text = new Date(iso).toLocaleDateString(LOCALE[lang], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  });
  // zh-CN renders "2026年9月17日周四" — give the weekday a space.
  return lang === 'zh' ? text.replace(/(周[一二三四五六日天])/, ' $1') : text;
}

export function formatDateShort(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short' });
}
