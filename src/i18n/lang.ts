import type { Bi, Lang } from '../data/types';

export type { Bi, Lang };

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'zh', label: '中文', short: '中文' },
];

export const LANG_STORAGE_KEY = 'lang';

/** Resolve a bilingual value. Missing sides fall back to the other language. */
export function t(value: Bi | string | undefined, lang: Lang): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || value.zh || '';
}

/** Resolve a list of bilingual values. */
export function tAll(values: Bi[] | undefined, lang: Lang): string[] {
  return (values ?? []).map((v) => t(v, lang));
}

/** Replace {placeholders} in a resolved template. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

/** For `document.documentElement.lang`. */
export const HTML_LANG: Record<Lang, string> = { en: 'en', zh: 'zh-CN' };

/** Locale used for dates and number formatting. */
export const LOCALE: Record<Lang, string> = { en: 'en-GB', zh: 'zh-CN' };
