import { useMemo } from 'react';
import { BUDGET_NOTES, FLIGHTS, LODGING } from '../data/budget';
import type { BudgetConfig, CarClass, FoodMode, LodgingOption } from '../data/types';
import { computeBudget, explainFlags, rankBudgets } from '../lib/budget';
import { formatCny, formatDate } from '../lib/format';
import { useTrip } from '../state';
import { usePersistentState } from '../lib/storage';
import { AssumptionEditor } from '../components/AssumptionEditor';
import { Callout, ConfidenceChip, Pill, SectionHeader, Stat } from '../components/ui';
import { UI } from '../i18n/ui';

const DEFAULT_CONFIG: BudgetConfig = {
  outFlightId: 'out-hak-15',
  backFlightId: 'back-syx-20',
  wenchangRoomId: 'fulou-family',
  beachRoomId: 'aloha-sea-twin',
  wenchangNights: 3,
  beachNights: 2,
  beachRooms: 2,
  foodMode: 'mixed',
  carClass: 'mpv',
};

const GROUP_KEY = {
  flights: 'breakdownFlights',
  stay: 'breakdownStay',
  car: 'breakdownCar',
  food: 'breakdownFood',
  extras: 'breakdownExtras',
} as const;

const FOOD_OPTIONS: { id: FoodMode; key: 'foodVillaOption' | 'foodMixedOption' | 'foodRestaurantOption' }[] = [
  { id: 'villa', key: 'foodVillaOption' },
  { id: 'mixed', key: 'foodMixedOption' },
  { id: 'restaurant', key: 'foodRestaurantOption' },
];

const CAR_OPTIONS: { id: CarClass; key: 'carSuvOption' | 'carMpvOption' }[] = [
  { id: 'suv', key: 'carSuvOption' },
  { id: 'mpv', key: 'carMpvOption' },
];

function RoomPicker({
  lodging,
  area,
  value,
  onChange,
  label,
}: {
  lodging: LodgingOption[];
  area: string;
  value: string;
  onChange: (roomId: string) => void;
  label: string;
}) {
  const { t, lang } = useTrip();
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="field__select" value={value} onChange={(e) => onChange(e.target.value)}>
        {lodging
          .filter((l) => (area === 'wenchang' ? l.area === 'wenchang' : l.area === 'beach'))
          .map((l) => (
            <optgroup key={l.id} label={t(l.name)}>
              {l.rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {t(r.name)} — {formatCny(r.price, lang)}
                </option>
              ))}
            </optgroup>
          ))}
      </select>
    </label>
  );
}

export function Budget() {
  const { t, fmt, lang, assumptions } = useTrip();
  const [config, setConfig] = usePersistentState<BudgetConfig>('budget-config', DEFAULT_CONFIG);

  const ranked = useMemo(() => rankBudgets(assumptions), [assumptions]);
  const mine = useMemo(() => computeBudget(config, assumptions), [config, assumptions]);
  const cheapestTotal = Math.min(...ranked.rows.map((r) => r.result.total));
  const maxGroup = Math.max(...Object.values(mine.groups));

  const dearestTotal = Math.max(...ranked.rows.map((r) => r.result.total));
  const patch = (part: Partial<BudgetConfig>) => setConfig({ ...config, ...part });

  // A shape can win more than one title; show it once, with all its badges.
  const pickGroups = (() => {
    const map = new Map<string, { row: (typeof ranked.rows)[number]; keys: ('pickCheapest' | 'pickBestValue' | 'pickMostComfortable')[] }>();
    const entries: { key: 'pickCheapest' | 'pickBestValue' | 'pickMostComfortable'; row: (typeof ranked.rows)[number] }[] = [
      { key: 'pickCheapest', row: ranked.picks.cheapest },
      { key: 'pickBestValue', row: ranked.picks.bestValue },
      { key: 'pickMostComfortable', row: ranked.picks.mostComfortable },
    ];
    for (const { key, row } of entries) {
      const seen = map.get(row.pkg.id);
      if (seen) seen.keys.push(key);
      else map.set(row.pkg.id, { row, keys: [key] });
    }
    return [...map.values()];
  })();

  const beachLodging = LODGING.filter((l) => l.area === 'beach');
  const wenchangLodging = LODGING.filter((l) => l.area === 'wenchang');

  return (
    <div className="stack">
      <SectionHeader
        eyebrow={t(UI.budgetEyebrow)}
        title={t(UI.budgetTitle)}
        lede={t(UI.budgetLede)}
        aside={
          <div className="hero__meta">
            <Pill tone="teal">{t(UI.budgetParty)}</Pill>
            <Pill tone="sand">{t(UI.budgetPartyDetail)}</Pill>
          </div>
        }
      />

      <Callout tone="warn" title={t(UI.screenshotsHeading)}>
        {t(UI.screenshotsHint)}
      </Callout>

      <Callout tone="info" title={t(UI.spreadTitle)}>
        {fmt(t(UI.spreadInsight), {
          spread: formatCny(dearestTotal - cheapestTotal, lang),
          pct: Math.round(((dearestTotal - cheapestTotal) / cheapestTotal) * 100),
        })}
      </Callout>

      {/* ---------------------------------------------------------- the picks */}
      <div className="picks">
        {pickGroups.map(({ row, keys }) => (
          <article className="pick" key={row.pkg.id}>
            <div className="pick__head">
              <span className="pick__label">{keys.map((k) => t(UI[k])).join(' · ')}</span>
              <span className="pick__value">{formatCny(row.result.total, lang)}</span>
            </div>
            <div className="pick__name">{t(row.pkg.name)}</div>
            <p className="pick__shape">{t(row.pkg.shape)}</p>
            <p className="pick__why">{explainFlags(row.result, lang)}</p>
            <div className="pick__foot">
              <span className="pick__meta">
                {fmt(t(UI.nightsLabelLong), { n: row.result.nights })} ·{' '}
                {formatCny(row.result.perDay, lang)} {t(UI.perDayLabel)}
              </span>
              <button type="button" className="btn btn--ghost" onClick={() => setConfig(row.pkg.config)}>
                {t(UI.loadThisShape)}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ------------------------------------------------------- your numbers */}
      <section className="panel panel--pad">
        <div className="panel__head">
          <h3 className="panel__title">{t(UI.buildYourOwn)}</h3>
          <span className="assume__count">
            {mine.total > cheapestTotal
              ? fmt(t(UI.deltaVsCheapest), { delta: formatCny(mine.total - cheapestTotal, lang) })
              : t(UI.deltaIsCheapest)}
          </span>
        </div>

        <div className="bigtotal">
          <div>
            <div className="bigtotal__label">{t(UI.totalLabel)}</div>
            <div className="bigtotal__value">{formatCny(mine.total, lang)}</div>
            <div className="bigtotal__meta">
              {fmt(t(UI.nightsLabelLong), { n: mine.nights })} · {formatCny(mine.perDay, lang)} {t(UI.perDayLabel)} ·{' '}
              {formatCny(mine.perPerson, lang)} {t(UI.perPersonLabel)}
            </div>
          </div>
          <div className="split-bars">
            {(Object.keys(mine.groups) as (keyof typeof mine.groups)[]).map((g) => (
              <div className="split-bar" key={g}>
                <span className="split-bar__label">{t(UI[GROUP_KEY[g]])}</span>
                <div className="split-bar__track">
                  <div
                    className={`split-bar__fill split-bar__fill--${g}`}
                    style={{ width: `${(mine.groups[g] / maxGroup) * 100}%` }}
                  />
                </div>
                <span className="split-bar__value">{formatCny(mine.groups[g], lang)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="builder">
          <div className="builder__col">
            <div className="field">
              <span className="field__label">{t(UI.flightOutHeading)}</span>
              <select className="field__select" value={config.outFlightId} onChange={(e) => patch({ outFlightId: e.target.value })}>
                {FLIGHTS.filter((f) => f.direction === 'out').map((f) => (
                  <option key={f.id} value={f.id}>
                    {formatDate(f.date, lang, { year: undefined })} · {f.fromCode} → {f.toCode} {f.depart} ·{' '}
                    {formatCny(f.total, lang)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <span className="field__label">{t(UI.flightBackHeading)}</span>
              <select className="field__select" value={config.backFlightId} onChange={(e) => patch({ backFlightId: e.target.value })}>
                {FLIGHTS.filter((f) => f.direction === 'back').map((f) => (
                  <option key={f.id} value={f.id}>
                    {formatDate(f.date, lang, { year: undefined })} · {f.fromCode} → {f.toCode} {f.depart} ·{' '}
                    {formatCny(f.total, lang)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="builder__col">
            <RoomPicker
              label={t(UI.wenchangStayHeading)}
              lodging={wenchangLodging}
              area="wenchang"
              value={config.wenchangRoomId}
              onChange={(roomId) => patch({ wenchangRoomId: roomId })}
            />
            <RoomPicker
              label={t(UI.beachStayHeading)}
              lodging={beachLodging}
              area="beach"
              value={config.beachRoomId}
              onChange={(roomId) => patch({ beachRoomId: roomId })}
            />
          </div>

          <div className="builder__col">
            <div className="field">
              <span className="field__label">{t(UI.nightsHeading)}</span>
              <div className="field__inline">
                <label className="field__num">
                  <span>{t(UI.wenchangStayHeading)}</span>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={config.wenchangNights}
                    onChange={(e) => patch({ wenchangNights: Number(e.target.value) })}
                  />
                </label>
                <label className="field__num">
                  <span>{t(UI.beachStayHeading)}</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={config.beachNights}
                    onChange={(e) => patch({ beachNights: Number(e.target.value) })}
                  />
                </label>
                <label className="field__num">
                  <span>{t(UI.roomsHeading)}</span>
                  <input
                    type="number"
                    min={1}
                    max={3}
                    value={config.beachRooms}
                    onChange={(e) => patch({ beachRooms: Number(e.target.value) })}
                  />
                </label>
              </div>
            </div>

            <div className="field">
              <span className="field__label">{t(UI.foodHeading)}</span>
              <div className="chips">
                {FOOD_OPTIONS.map((o) => (
                  <button
                    type="button"
                    key={o.id}
                    className={`btn btn--chip${config.foodMode === o.id ? ' btn--chip-active' : ''}`}
                    onClick={() => patch({ foodMode: o.id })}
                  >
                    {t(UI[o.key])}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="field__label">{t(UI.carHeading)}</span>
              <div className="chips">
                {CAR_OPTIONS.map((o) => (
                  <button
                    type="button"
                    key={o.id}
                    className={`btn btn--chip${config.carClass === o.id ? ' btn--chip-active' : ''}`}
                    onClick={() => patch({ carClass: o.id })}
                  >
                    {t(UI[o.key])}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {mine.beachStay?.lodging.caveat && (
          <Callout tone="warn" title={t(UI.poolSafetyTitle)}>
            {t(mine.beachStay.lodging.caveat)}
          </Callout>
        )}

        <h4 className="panel__subtitle">{t(UI.itemsHeading)}</h4>
        <table className="cost-table">
          <tbody>
            {mine.lines.map((line) => (
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
              <td>{t(UI.totalLabel)}</td>
              <td className="cost-table__num">{formatCny(mine.total, lang)}</td>
              <td className="cost-table__conf" />
            </tr>
          </tfoot>
        </table>
      </section>

      {/* ------------------------------------------------------- comparison */}
      <section className="panel panel--pad">
        <h3 className="panel__title">{t(UI.compareHeading)}</h3>
        <div className="ctable-wrap">
          <table className="ctable">
            <thead>
              <tr>
                <th>{t(UI.colShape)}</th>
                <th>{t(UI.colTotal)}</th>
                <th>{t(UI.colPerDay)}</th>
                <th>{t(UI.colNights)}</th>
                <th>{t(UI.colValue)}</th>
                <th>{t(UI.colDriving)}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ranked.rows.map(({ pkg, result }) => (
                <tr key={pkg.id}>
                  <th scope="row">
                    <span className="ctable__opt">{t(pkg.name)}</span>
                    <span className="ctable__opt-sub">{t(pkg.subtitle)}</span>
                    {pkg.tag && <span className="badge">{t(pkg.tag)}</span>}
                  </th>
                  <td className="ctable__best">{formatCny(result.total, lang)}</td>
                  <td>{formatCny(result.perDay, lang)}</td>
                  <td>{result.nights}</td>
                  <td>
                    <div className="meter">
                      <div className="meter__fill meter__fill--teal" style={{ width: `${result.valueScore}%` }} />
                      <span className="meter__value">{result.valueScore}</span>
                    </div>
                  </td>
                  <td className="ctable__drive">{t(pkg.driveNote)}</td>
                  <td>
                    <button type="button" className="btn btn--ghost" onClick={() => setConfig(pkg.config)}>
                      {t(UI.loadThisShape)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------ assumptions */}
      <section>
        <SectionHeader
          eyebrow={t(UI.navBudget)}
          title={t(UI.budgetAssumptionsHeading)}
          lede={t(UI.budgetAssumptionsLede)}
        />
        <AssumptionEditor groups={['budget']} />
      </section>

      {/* --------------------------------------------------------- notes */}
      <div className="grid grid--2">
        <Callout tone="danger" title={t(UI.poolSafetyTitle)}>
          {t(BUDGET_NOTES.poolSafety)}
        </Callout>
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.whatsIncludedTitle)}</h3>
          <p className="panel__text">{t(BUDGET_NOTES.scope)}</p>
          <p className="panel__text">{t(BUDGET_NOTES.screenshotCaveat)}</p>
          <div className="stats-row">
            <Stat label={t(UI.breakdownFlights)} value={formatCny(mine.groups.flights, lang)} />
            <Stat label={t(UI.breakdownStay)} value={formatCny(mine.groups.stay, lang)} />
            <Stat label={t(UI.breakdownCar)} value={formatCny(mine.groups.car, lang)} />
          </div>
        </section>
      </div>

      <div className="grid grid--2">
        <Callout tone="info" title={t(UI.flightRulesTitle)}>
          {t(BUDGET_NOTES.flightRules)}
        </Callout>
        <Callout tone="info" title={t(UI.rideshareTitle)}>
          {t(BUDGET_NOTES.rideshare)}
        </Callout>
      </div>
    </div>
  );
}
