import type { OptionEvaluation } from '../lib/scoring';
import { formatCny } from '../lib/format';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';
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
  const { t, fmt, lang } = useTrip();
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
            <span className="costs__pick-name">{t(e.option.name)}</span>
            <span className="costs__pick-value">{formatCny(e.cost, lang)}</span>
          </button>
        ))}
      </div>

      <div className="costs__bars">
        {evaluations.map((e) => (
          <div className="costs__bar-row" key={e.option.id}>
            <span className="costs__bar-label">{t(e.option.name)}</span>
            <div className="costs__bar-track">
              <div
                className="costs__bar-fill"
                style={{ width: `${(e.cost / maxTotal) * 100}%`, background: e.option.accent }}
              />
            </div>
            <span className="costs__bar-value">{formatCny(e.cost, lang)}</span>
          </div>
        ))}
      </div>

      <table className="cost-table">
        <thead>
          <tr>
            <th>{t(UI.lineItem)}</th>
            <th className="cost-table__num">{t(UI.amount)}</th>
            <th className="cost-table__conf">{t(UI.basis)}</th>
          </tr>
        </thead>
        <tbody>
          {selected.costLines.map((line) => (
            <tr key={line.id}>
              <td>
                <span className="cost-table__label">{t(line.label)}</span>
                {line.note && <span className="cost-table__note">{t(line.note)}</span>}
              </td>
              <td className="cost-table__num">{formatCny(line.amount, lang)}</td>
              <td className="cost-table__conf">
                <ConfidenceChip level={line.confidence} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{fmt(t(UI.totalOf), { name: t(selected.option.name) })}</td>
            <td className="cost-table__num">{formatCny(selected.cost, lang)}</td>
            <td className="cost-table__conf">{t(UI.estimateSuffix)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="costs__foot">{t(UI.costsFootnote)}</p>
    </div>
  );
}
