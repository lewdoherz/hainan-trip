import type { OptionEvaluation } from '../lib/scoring';
import { formatCny } from '../lib/format';
import { ConfidenceChip } from './ui';

export function CostTable({
  evaluations,
  selectedId,
  onSelect,
}: {
  evaluations: OptionEvaluation[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = evaluations.find((e) => e.option.id === selectedId) ?? evaluations[0];
  const maxTotal = Math.max(...evaluations.map((e) => e.cost));

  return (
    <div className="costs">
      <div className="costs__picker">
        {evaluations.map((e) => (
          <button
            type="button"
            key={e.option.id}
            className={`costs__pick${e.option.id === selected.option.id ? ' costs__pick--active' : ''}`}
            style={{ ['--accent' as string]: e.option.accent }}
            onClick={() => onSelect(e.option.id)}
          >
            <span className="costs__pick-name">{e.option.name}</span>
            <span className="costs__pick-value">{formatCny(e.cost)}</span>
          </button>
        ))}
      </div>

      <div className="costs__bars">
        {evaluations.map((e) => (
          <div className="costs__bar-row" key={e.option.id}>
            <span className="costs__bar-label">{e.option.name}</span>
            <div className="costs__bar-track">
              <div
                className="costs__bar-fill"
                style={{ width: `${(e.cost / maxTotal) * 100}%`, background: e.option.accent }}
              />
            </div>
            <span className="costs__bar-value">{formatCny(e.cost)}</span>
          </div>
        ))}
      </div>

      <table className="cost-table">
        <thead>
          <tr>
            <th>Line item</th>
            <th className="cost-table__num">Amount</th>
            <th className="cost-table__conf">Basis</th>
          </tr>
        </thead>
        <tbody>
          {selected.costLines.map((line) => (
            <tr key={line.id}>
              <td>
                <span className="cost-table__label">{line.label}</span>
                {line.note && <span className="cost-table__note">{line.note}</span>}
              </td>
              <td className="cost-table__num">{formatCny(line.amount)}</td>
              <td className="cost-table__conf">
                <ConfidenceChip level={line.confidence} compact />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total · {selected.option.name}</td>
            <td className="cost-table__num">{formatCny(selected.cost)}</td>
            <td className="cost-table__conf">estimate</td>
          </tr>
        </tfoot>
      </table>
      <p className="costs__foot">
        Transport only — it includes road hotels while driving, ferry tickets, airfares, rental and airport access, but
        not Hainan resort nights, food or tickets. Every line is driven by the assumptions above.
      </p>
    </div>
  );
}
