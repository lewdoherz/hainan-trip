import type { CategoryId } from '../data/types';
import type { Highlights, OptionEvaluation, Weights } from '../lib/scoring';
import { CATEGORIES, HIGHLIGHT_LABEL } from '../lib/scoring';
import { formatCny, formatDuration } from '../lib/format';

type Row =
  | { kind: 'group'; label: string; note?: string }
  | {
      kind: 'fact' | 'score';
      id: string;
      label: string;
      better: 'lower' | 'higher';
      hint?: string;
      value: (ev: OptionEvaluation) => number;
      display: (ev: OptionEvaluation) => string;
      category?: CategoryId;
    };

const ROWS: Row[] = [
  { kind: 'group', label: 'The hard numbers', note: 'Cost and time come from the live calculator — edit assumptions on the Costs tab.' },
  {
    kind: 'fact',
    id: 'cost',
    label: 'Total transport cost',
    better: 'lower',
    value: (e) => e.cost,
    display: (e) => formatCny(e.cost),
    hint: 'Transport, road hotels and ferry/rental extras. Excludes Hainan resort nights.',
  },
  {
    kind: 'fact',
    id: 'total',
    label: 'Door-to-door time',
    better: 'lower',
    value: (e) => e.time.totalMinutes,
    display: (e) => formatDuration(e.time.totalMinutes),
    hint: 'Home to hotel, including waits, transfers and overnight sleep.',
  },
  {
    kind: 'fact',
    id: 'awake',
    label: 'Awake travel time',
    better: 'lower',
    value: (e) => e.time.activeMinutes,
    display: (e) => formatDuration(e.time.activeMinutes),
    hint: 'Everything except sleeping in a bed — the part that actually wears the family down.',
  },
  {
    kind: 'fact',
    id: 'transfers',
    label: 'Transfers / hand-overs',
    better: 'lower',
    value: (e) => e.option.transfers,
    display: (e) => String(e.option.transfers),
    hint: 'Each one means repacking, queueing and carrying children plus luggage again.',
  },
  { kind: 'group', label: 'Family scores (0–100, weighted by your sliders)' },
  ...CATEGORIES.map(
    (c): Row => ({
      kind: 'score',
      id: c.id,
      label: c.label,
      better: 'higher',
      hint: c.description,
      value: (e) => e.scores[c.id],
      display: (e) => `${Math.round(e.scores[c.id])}`,
      category: c.id,
    }),
  ),
];

const HIGHLIGHT_ORDER = Object.keys(HIGHLIGHT_LABEL) as (keyof Highlights)[];

export function ComparisonTable({
  evaluations,
  highlights,
  weights,
}: {
  evaluations: OptionEvaluation[];
  highlights: Highlights;
  weights: Weights;
}) {
  const weightSum = CATEGORIES.reduce((s, c) => s + (weights[c.id] ?? 0), 0) || 1;

  const bestFor = (row: Extract<Row, { kind: 'fact' | 'score' }>) => {
    const values = evaluations.map((e) => row.value(e));
    return row.better === 'lower' ? Math.min(...values) : Math.max(...values);
  };

  return (
    <div className="ctable-wrap">
      <table className="ctable">
        <thead>
          <tr>
            <th className="ctable__corner">Criterion</th>
            {evaluations.map((e) => (
              <th key={e.option.id} style={{ ['--accent' as string]: e.option.accent }}>
                <span className="ctable__opt">{e.option.name}</span>
                <span className="ctable__opt-sub">{e.option.vehicle}</span>
                {highlights.bestOverall === e.option.id && <span className="badge badge--bestOverall">Best overall</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            if (row.kind === 'group') {
              return (
                <tr className="ctable__group" key={`g-${i}`}>
                  <td colSpan={evaluations.length + 1}>
                    <span>{row.label}</span>
                    {row.note && <em>{row.note}</em>}
                  </td>
                </tr>
              );
            }
            const best = bestFor(row);
            return (
              <tr key={`${row.kind}-${row.id}`}>
                <th scope="row" title={row.hint}>
                  {row.label}
                  {row.kind === 'score' && row.category && (
                    <span className="ctable__weight">
                      {Math.round(((weights[row.category] ?? 0) / weightSum) * 100)}%
                    </span>
                  )}
                </th>
                {evaluations.map((e) => {
                  const isBest = row.value(e) === best;
                  return (
                    <td key={e.option.id} className={isBest ? 'ctable__best' : undefined}>
                      {row.display(e)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="ctable__total">
            <th scope="row">Weighted score</th>
            {evaluations.map((e) => (
              <td key={e.option.id}>
                <strong>{Math.round(e.weighted)}</strong>
                <span>/100</span>
              </td>
            ))}
          </tr>
          <tr className="ctable__badges">
            <th scope="row">Wins</th>
            {evaluations.map((e) => (
              <td key={e.option.id}>
                {HIGHLIGHT_ORDER.filter((k) => highlights[k] === e.option.id).map((k) => (
                  <span className={`badge badge--${k}`} key={k}>
                    {HIGHLIGHT_LABEL[k]}
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
