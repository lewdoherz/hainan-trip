import type { Place, RouteLeg } from '../data/types';
import { PLACES, TRIP } from '../data/trip';
import { amapSearch, gmapsPoint } from '../lib/links';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

const BOUNDS = { minLng: 108.3, maxLng: 119.9, minLat: 17.6, maxLat: 24.9 };
const W = 1000;
const H = 620;

function project(place: Place) {
  const x = ((place.lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W;
  const y = ((BOUNDS.maxLat - place.lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H;
  return { x, y };
}

const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p]));

const LEG_COLOR: Record<RouteLeg['mode'], string> = {
  car: '#0f3d3e',
  ferry: '#2f7f8f',
  plane: '#c2553f',
  train: '#6b5a8e',
  hsr: '#6b5a8e',
  bus: '#8a7c66',
  taxi: '#8a7c66',
  walk: '#8a7c66',
};

const LEG_DASH: Record<RouteLeg['mode'], string | undefined> = {
  car: undefined,
  ferry: '10 7',
  plane: '4 8',
  train: '14 6',
  hsr: '14 6',
  bus: '6 6',
  taxi: '6 6',
  walk: '3 5',
};

/** Curated label set — stopover cities would clutter the schematic map. */
const LABEL_IDS: Record<string, true> = {
  xiamen: true,
  xmn: true,
  'xiamen-north': true,
  shantou: true,
  guangzhou: true,
  zhanjiang: true,
  'xuwen-port': true,
  'new-haikou-port': true,
  haikou: true,
  hak: true,
  bar: true,
  wenchang: true,
  longlou: true,
  'launch-pad': true,
  'gaolong-bay': true,
  wanning: true,
  lingshui: true,
  sanya: true,
  syx: true,
};

const LAUNCH_ID = 'launch-pad';

export function RouteMap({
  legs,
  visiblePlaceIds,
  accent = '#0f3d3e',
  onSelect,
}: {
  legs: RouteLeg[];
  visiblePlaceIds: string[];
  accent?: string;
  onSelect?: (placeId: string) => void;
}) {
  const { t, fmt } = useTrip();
  const visible = new Set(visiblePlaceIds);
  const shown = PLACES.filter((p) => visible.has(p.id));
  const launch = placeById[LAUNCH_ID];

  return (
    <div className="rmap">
      <svg className="rmap__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t(UI.mapAria)}>
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(15,61,62,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="#f4f8f8" />
        <rect width={W} height={H} fill="url(#grid)" />

        <ellipse
          cx={project(placeById['wenchang']).x + 30}
          cy={project(placeById['wenchang']).y + 40}
          rx={150}
          ry={125}
          fill="#e2eeee"
        />
        <text
          x={project(placeById['wenchang']).x + 30}
          y={project(placeById['wenchang']).y + 150}
          className="rmap__water"
          textAnchor="middle"
        >
          琼州海峡 · Qiongzhou Strait
        </text>

        <circle cx={project(launch).x} cy={project(launch).y} r={26} fill="none" stroke="#c2553f" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx={project(launch).x} cy={project(launch).y} r={5} fill="#c2553f" />

        {legs.map((leg) => {
          const from = placeById[leg.fromId];
          const to = placeById[leg.toId];
          if (!from || !to) return null;
          const a = project(from);
          const b = project(to);
          return (
            <line
              key={leg.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={leg.mode === 'car' ? accent : LEG_COLOR[leg.mode]}
              strokeWidth={leg.mode === 'car' ? 4 : 3}
              strokeDasharray={LEG_DASH[leg.mode]}
              strokeLinecap="round"
              opacity={0.85}
            />
          );
        })}

        {shown.map((p) => {
          const { x, y } = project(p);
          const isLaunch = p.id === LAUNCH_ID;
          const r = isLaunch ? 7 : p.kind === 'origin' || p.kind === 'destination' ? 6 : 4.5;
          return (
            <g
              key={p.id}
              className="rmap__place"
              onClick={onSelect ? () => onSelect(p.id) : undefined}
              style={onSelect ? { cursor: 'pointer' } : undefined}
            >
              <circle cx={x} cy={y} r={r} fill={isLaunch ? '#c2553f' : accent} stroke="#fff" strokeWidth={1.5} />
              {LABEL_IDS[p.id] && (
                <text x={x + 10} y={y + 4} className="rmap__label">
                  {t(p.name)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="rmap__legend">
        <span className="rmap__legend-item">
          <i className="rmap__swatch" style={{ background: accent }} /> {t(UI.mapLegendRoad)}
        </span>
        <span className="rmap__legend-item">
          <i className="rmap__swatch rmap__swatch--dashed" /> {t(UI.mapLegendFerry)}
        </span>
        <span className="rmap__legend-item">
          <i className="rmap__swatch rmap__swatch--dot" /> {t(UI.mapLegendFlight)}
        </span>
        <span className="rmap__legend-item">
          <i className="rmap__swatch" style={{ background: '#6b5a8e' }} /> {t(UI.mapLegendRail)}
        </span>
        <span className="rmap__legend-note">
          {fmt(t(UI.mapNote), { area: t(TRIP.launch.siteArea) })}
        </span>
      </div>

      <ul className="rmap__links">
        {shown.map((p) => (
          <li key={p.id}>
            <span className="rmap__links-name">{t(p.name)}</span>
            <a href={amapSearch(p)} target="_blank" rel="noreferrer">
              {t(UI.mapAmap)}
            </a>
            <a href={gmapsPoint(p)} target="_blank" rel="noreferrer">
              {t(UI.mapGoogle)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
