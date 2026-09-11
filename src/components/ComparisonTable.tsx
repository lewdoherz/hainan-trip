import type { CategoryId, Lang } from '../data/types';
import type { Highlights, OptionEvaluation, Weights } from '../lib/scoring';
import { CATEGORIES } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

type Row =
  | { kind: 'group'; id: string; labelKey: keyof typeof UI; noteKey?: keyof typeof UI }
  | {
      kind: 'fact';
      id: string;
      labelKey: keyof typeof UI;
      hintKey?: keyof typeof UI;
      better: 'lower' | 'higher';
      value: (ev: OptionEvaluation) => number;
      display: (ev: OptionEvaluation, lang: Lang) => string;
    }
  | { kind: 'score'; id: CategoryId; better: 'higher' };

const HIGHLIGHT_KEYS: (keyof Highlights)[] = ['bestOverall', 'cheapest', 'fastest', 'easiest', 'mostFlexible'];

const ROWS: Row[] = [
  { kind: 'group', id: 'hard', labelKey: 'groupHardNumbers', noteKey: 'groupHardNumbersNote' },
  {
    kind: 'fact',
    id: 'cost',
    labelKey: 'rowCost',
    hintKey: 'rowCostHint',
    better: 'lower',
    value: (e) => e.cost,
    display: (e, lang) => formatCny(e.cost, lang),
  },
  {
    kind: 'fact',
    id: 'total',
    labelKey: 'rowTotal',
    hintKey: 'rowTotalHint',
    better: 'lower',
    value: (e) => e.time.totalMinutes,
    display: (e, lang) => formatDuration(e.time.totalMinutes, lang),
  },
  {
    kind: 'fact',
    id: 'awake',
    labelKey: 'rowAwake',
    hintKey: 'rowAwakeHint',
    better: 'lower',
    value: (e) => e.time.activeMinutes,
    display: (e, lang) => formatDuration(e.time.activeMinutes, lang),
  },
  {
    kind: 'fact',
    id: 'transfers',
    labelKey: 'rowTransfers',
    hintKey: 'rowTransfersHint',
    better: 'lower',
    value: (e) => e.option.transfers,
    display: (e) => String(e.option.transfers),
  },
  { kind: 'group', id: 'scores', labelKey: 'groupScores' },
  ...CATEGORIES.map((c): Row => ({ kind: 'score', id: c.id, better: 'higher' })),
];

export function ComparisonTable({
  evaluations,
  highlights,
  weights,
}: {
  evaluations: OptionEvaluation[];
  highlights: Highlights;
  weights: Weights;
}) {
  const { t, fmt, lang } = useTrip();
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  const columnCount = evaluations.length + 1;

  return (
    <div className="ctable-wrap">
      <table className="ctable">
        <thead>
          <tr>
            <th className="ctable__corner">{t(UI.criterion)}</th>
            {evaluations.map((e) => (
              <th key={e.option.id} style={{ ['--accent' as string]: e.option.accent }}>
                <span className="ctable__opt">{t(e.option.name)}</span>
                <span className="ctable__opt-sub">{t(e.option.vehicle)}</span>
                {highlights.bestOverall === e.option.id && (
                  <span className="badge badge--bestOverall">{t(UI.bestOverall)}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            if (row.kind === 'group') {
              return (
                <tr className="ctable__group" key={`group-${row.id}`}>
                  <td colSpan={columnCount}>
                    <span>{t(UI[row.labelKey])}</span>
                    {row.noteKey && <em>{t(UI[row.noteKey])}</em>}
                  </td>
                </tr>
              );
            }

            const category = row.kind === 'score' ? CATEGORIES.find((c) => c.id === row.id) : undefined;
            const label = category ? t(category.label) : row.kind === 'fact' ? t(UI[row.labelKey]) : '';
            const hint = category
              ? t(category.description)
              : row.kind === 'fact' && row.hintKey
                ? t(UI[row.hintKey])
                : undefined;
            const cellValue = (e: OptionEvaluation) => (row.kind === 'score' ? e.scores[row.id] : row.value(e));
            const values = evaluations.map(cellValue);
            const best = row.better === 'lower' ? Math.min(...values) : Math.max(...values);

            return (
              <tr key={`${row.kind}-${row.id}`}>
                <th scope="row" title={hint}>
                  {label}
                  {row.kind === 'score' && (
                    <span className="ctable__weight">
                      {fmt('{pct}%', { pct: Math.round(((weights[row.id] ?? 0) / weightSum) * 100) })}
                    </span>
                  )}
                </th>
                {evaluations.map((e) =>
                  row.kind === 'score' ? (
                    <td key={e.option.id} className={cellValue(e) === best ? 'ctable__best' : undefined}>
                      {Math.round(e.scores[row.id])}
                    </td>
                  ) : (
                    <td key={e.option.id} className={row.value(e) === best ? 'ctable__best' : undefined}>
                      {row.display(e, lang)}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
          <tr className="ctable__total">
            <th scope="row">{t(UI.weightedScore)}</th>
            {evaluations.map((e) => (
              <td key={e.option.id}>
                <strong>{Math.round(e.weighted)}</strong>
                <span>/100</span>
              </td>
            ))}
          </tr>
          <tr className="ctable__badges">
            <th scope="row">{t(UI.wins)}</th>
            {evaluations.map((e) => (
              <td key={e.option.id}>
                {HIGHLIGHT_KEYS.filter((k) => highlights[k] === e.option.id).map((k) => (
                  <span className={`badge badge--${k}`} key={k}>
                    {t(UI[k])}
                  </span>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
