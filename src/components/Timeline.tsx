import type { Assumptions, Segment, TimelineGroup } from '../data/types';
import { computeValues, segmentMinutes } from '../lib/compute';
import { formatDuration } from '../lib/format';

const KIND_ICON: Record<Segment['kind'], string> = {
  travel: '→',
  wait: '⋯',
  admin: '▣',
  rest: '☕',
  overnight: '☾',
};

function clock(start: string, offsetMinutes: number): string {
  const [h, m] = start.split(':').map(Number);
  const total = h * 60 + m + Math.round(offsetMinutes);
  const hh = Math.floor((total % 1440) / 60);
  const mm = Math.round(total % 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function Timeline({
  groups,
  assumptions,
  compact = false,
}: {
  groups: TimelineGroup[];
  assumptions: Assumptions;
  compact?: boolean;
}) {
  const computed = computeValues(assumptions);

  return (
    <div className={`timeline${compact ? ' timeline--compact' : ''}`}>
      {groups.map((group) => {
        let offset = 0;
        const rows = group.segments.map((s) => {
          const minutes = segmentMinutes(s, assumptions, computed);
          const at = group.start ? clock(group.start, offset) : null;
          offset += minutes;
          return { s, minutes, at };
        });
        const groupTotal = rows.reduce((sum, r) => sum + r.minutes, 0);

        return (
          <section className="tl-group" key={group.id}>
            <div className="tl-group__head">
              <div>
                <h4 className="tl-group__title">{group.label}</h4>
                {group.sublabel && <div className="tl-group__sub">{group.sublabel}</div>}
              </div>
              <div className="tl-group__total">{formatDuration(groupTotal)}</div>
            </div>
            <ol className="tl-list">
              {rows.map(({ s, minutes, at }) => (
                <li className={`tl-item tl-item--${s.kind}`} key={s.id}>
                  <span className="tl-item__rail" aria-hidden="true">
                    {KIND_ICON[s.kind]}
                  </span>
                  <div className="tl-item__body">
                    <div className="tl-item__top">
                      <span className="tl-item__label">{s.label}</span>
                      <span className="tl-item__time">
                        {at && <span className="tl-item__clock">{at}</span>}
                        {formatDuration(minutes)}
                      </span>
                    </div>
                    {s.detail && <div className="tl-item__detail">{s.detail}</div>}
                    {s.note && <div className="tl-item__note">{s.note}</div>}
                  </div>
                </li>
              ))}
            </ol>
            {group.note && <p className="tl-group__note">{group.note}</p>}
          </section>
        );
      })}
    </div>
  );
}
