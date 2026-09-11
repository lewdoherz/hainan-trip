import type { Assumptions, Segment, TimelineGroup, TransportOption } from '../data/types';

/**
 * Derived values that depend on more than one assumption. Segment definitions
 * reference these by key so a user editing "our car's fuel use" or "average
 * speed" immediately moves every timeline that depends on it.
 */
export function computeValues(a: Assumptions): Record<string, number> {
  const speed = Math.max(a.avgDriveSpeed, 1);
  const driveMainlandMin = (a.driveKmMainland / speed) * 60;
  const driveHainanMin = (a.driveKmHainan / speed) * 60;
  const driveTotalMin = driveMainlandMin + driveHainanMin;
  const driveDays = Math.max(a.driveNights + 1, 1);

  return {
    driveMainlandMin,
    driveHainanMin,
    driveTotalMin,
    /** Driving minutes per driving day, for the day-by-day timeline. */
    driveDayMin: driveTotalMin / driveDays,
    driveDayKm: (a.driveKmMainland + a.driveKmHainan) / driveDays,
    fuelCostMainland: (a.driveKmMainland / 100) * a.fuelEfficiency * a.fuelPriceMainland,
    fuelCostHainan: (a.driveKmHainan / 100) * a.fuelEfficiency * a.fuelPriceHainan,
    tollCostMainland: a.driveKmMainland * a.tollRatePerKm,
    ferryRoundTripVehicle: a.ferryCarDriver * 2,
  };
}

/** Resolves a static timeline or one generated from the live assumptions. */
export function resolveTimeline(option: TransportOption, a: Assumptions): TimelineGroup[] {
  return typeof option.timeline === 'function' ? option.timeline(a) : option.timeline;
}

/** Minutes a segment takes, resolving assumption and compute references. */
export function segmentMinutes(
  segment: Segment,
  a: Assumptions,
  computed: Record<string, number>,
): number {
  const m = segment.minutes;
  if (typeof m === 'number') return m;
  if ('assumption' in m) return a[m.assumption] ?? 0;
  return computed[m.compute] ?? 0;
}

export interface OptionTime {
  /** Door-to-door elapsed time, including overnight hotel stays. */
  totalMinutes: number;
  /** Everything except overnight sleep — the "awake" load of the trip. */
  activeMinutes: number;
  travelMinutes: number;
  waitMinutes: number;
  adminMinutes: number;
  restMinutes: number;
  overnightMinutes: number;
}

const EMPTY_TIME: OptionTime = {
  totalMinutes: 0,
  activeMinutes: 0,
  travelMinutes: 0,
  waitMinutes: 0,
  adminMinutes: 0,
  restMinutes: 0,
  overnightMinutes: 0,
};

export function groupMinutes(
  group: TimelineGroup,
  a: Assumptions,
  computed: Record<string, number>,
): OptionTime {
  const acc: OptionTime = { ...EMPTY_TIME };
  for (const s of group.segments) {
    const mins = segmentMinutes(s, a, computed);
    acc.totalMinutes += mins;
    if (s.kind === 'overnight') acc.overnightMinutes += mins;
    else acc.activeMinutes += mins;
    if (s.kind === 'travel') acc.travelMinutes += mins;
    else if (s.kind === 'wait') acc.waitMinutes += mins;
    else if (s.kind === 'admin') acc.adminMinutes += mins;
    else if (s.kind === 'rest') acc.restMinutes += mins;
  }
  return acc;
}

export function sumTimes(times: OptionTime[]): OptionTime {
  return times.reduce<OptionTime>(
    (acc, t) => ({
      totalMinutes: acc.totalMinutes + t.totalMinutes,
      activeMinutes: acc.activeMinutes + t.activeMinutes,
      travelMinutes: acc.travelMinutes + t.travelMinutes,
      waitMinutes: acc.waitMinutes + t.waitMinutes,
      adminMinutes: acc.adminMinutes + t.adminMinutes,
      restMinutes: acc.restMinutes + t.restMinutes,
      overnightMinutes: acc.overnightMinutes + t.overnightMinutes,
    }),
    { ...EMPTY_TIME },
  );
}
