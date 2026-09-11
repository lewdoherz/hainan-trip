import type { Assumptions, Segment, TimelineGroup } from '../data/types';
import { computeValues, segmentMinutes } from '../lib/compute';
import { formatDuration } from '../lib/format';
import { useTrip } from '../state';

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

export function Timeline({ groups, assumptions }: { groups: TimelineGroup[]; assumptions: Assumptions }) {
  const { t, lang } = useTrip();
  const computed = computeValues(assumptions);

  return (
    <div className="timeline">
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
                <h4 className="tl-group__title">{t(group.label)}</h4>
                {group.sublabel && <div className="tl-group__sub">{t(group.sublabel)}</div>}
              </div>
              <div className="tl-group__total">{formatDuration(groupTotal, lang)}</div>
            </div>
            <ol className="tl-list">
              {rows.map(({ s, minutes, at }) => (
                <li className={`tl-item tl-item--${s.kind}`} key={s.id}>
                  <span className="tl-item__rail" aria-hidden="true">
                    {KIND_ICON[s.kind]}
                  </span>
                  <div className="tl-item__body">
                    <div className="tl-item__top">
                      <span className="tl-item__label">{t(s.label)}</span>
                      <span className="tl-item__time">
                        {at && <span className="tl-item__clock">{at}</span>}
                        {formatDuration(minutes, lang)}
                      </span>
                    </div>
                    {s.detail && <div className="tl-item__detail">{t(s.detail)}</div>}
                    {s.note && <div className="tl-item__note">{t(s.note)}</div>}
                  </div>
                </li>
              ))}
            </ol>
            {group.note && <p className="tl-group__note">{t(group.note)}</p>}
          </section>
        );
      })}
    </div>
  );
}
