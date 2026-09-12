import type {
  Assumptions,
  Bi,
  BudgetConfig,
  BudgetLine,
  BudgetPackage,
  Lang,
  LodgingOption,
  RoomType,
} from '../data/types';
import { BUDGET_PACKAGES, FLIGHTS, LODGING } from '../data/budget';
import { t } from '../i18n/lang';
import { UI } from '../i18n/ui';

export const lodgingById: Record<string, LodgingOption> = Object.fromEntries(LODGING.map((l) => [l.id, l]));
export const flightById: Record<string, (typeof FLIGHTS)[number]> = Object.fromEntries(FLIGHTS.map((f) => [f.id, f]));

/** Room ids are unique across properties, so one lookup finds the property too. */
function lodgingForRoom(roomId: string): LodgingOption | null {
  return LODGING.find((l) => l.rooms.some((r) => r.id === roomId)) ?? null;
}

const roomsLabel = (n: number): Bi => ({ en: n > 1 ? `${n} rooms` : '1 room', zh: `${n} 间房` });

/** Where the grandmother sleeps — the whole point of the villa question. */
export type Privacy = 'own-bedroom' | 'own-room' | 'shared';

export interface BudgetFlags {
  privacy: Privacy;
  /** The car has to come back north, wasting a day's driving. */
  backtrack: boolean;
  /** Implied pre-dawn or very early departure on the way home. */
  earlyStart: boolean;
  beachNights: number;
  villa: boolean;
}

export interface BudgetResult {
  config: BudgetConfig;
  lines: BudgetLine[];
  groups: Record<BudgetLine['group'], number>;
  total: number;
  nights: number;
  perDay: number;
  /** Split across all five travellers. */
  perPerson: number;
  flags: BudgetFlags;
  /** 0–100: 60 points for cost position, 40 for how well the shape works. */
  valueScore: number;
  wenchangStay: { lodging: LodgingOption; room: RoomType } | null;
  beachStay: { lodging: LodgingOption; room: RoomType } | null;
}

const FOOD_KEY = {
  villa: 'blFoodVilla',
  mixed: 'blFoodMixed',
  restaurant: 'blFoodRestaurant',
} as const;

const FOOD_PER_DAY_KEY = {
  villa: 'foodSelfCateringPerDay',
  mixed: 'foodMixedPerDay',
  restaurant: 'foodRestaurantPerDay',
} as const;

const CAR_LABEL = { suv: 'classSuv', mpv: 'classMpv' } as const;

export function computeBudget(config: BudgetConfig, a: Assumptions): BudgetResult {
  const lines: BudgetLine[] = [];
  const out = flightById[config.outFlightId];
  const back = flightById[config.backFlightId];
  const wenchangLodging = lodgingForRoom(config.wenchangRoomId);
  const beachLodging = lodgingForRoom(config.beachRoomId);
  const wenchangRoom = wenchangLodging?.rooms.find((r) => r.id === config.wenchangRoomId) ?? null;
  const beachRoom = beachLodging?.rooms.find((r) => r.id === config.beachRoomId) ?? null;

  // ---------------------------------------------------------------- flights
  if (out) {
    lines.push({
      id: 'flight-out',
      group: 'flights',
      label: {
        en: `Flights out · ${t(out.carrier, 'en')}`,
        zh: `去程机票 · ${t(out.carrier, 'zh')}`,
      },
      amount: out.total,
      confidence: out.confidence,
      note: out.breakdown,
    });
  }
  if (back) {
    lines.push({
      id: 'flight-back',
      group: 'flights',
      label: {
        en: `Flights home · ${t(back.carrier, 'en')}`,
        zh: `返程机票 · ${t(back.carrier, 'zh')}`,
      },
      amount: back.total,
      confidence: back.confidence,
      note: back.breakdown,
    });
  }

  // ---------------------------------------------------------------- lodging
  if (wenchangLodging && wenchangRoom) {
    const rooms = wenchangLodging.roomsNeeded;
    lines.push({
      id: 'stay-wenchang',
      group: 'stay',
      label: {
        en: `${t(wenchangLodging.name, 'en')} · ${config.wenchangNights} nights, ${t(roomsLabel(rooms), 'en')}`,
        zh: `${t(wenchangLodging.name, 'zh')} · ${config.wenchangNights} 晚，${t(roomsLabel(rooms), 'zh')}`,
      },
      amount: wenchangRoom.price * rooms * config.wenchangNights,
      confidence: wenchangLodging.confidence,
      note: wenchangRoom.name,
    });
  }
  if (beachLodging && beachRoom) {
    const units = beachLodging.kind === 'villa' ? 1 : config.beachRooms;
    lines.push({
      id: 'stay-beach',
      group: 'stay',
      label: {
        en: `${t(beachLodging.name, 'en')} · ${config.beachNights} nights, ${
          beachLodging.kind === 'villa' ? 'whole villa' : t(roomsLabel(units), 'en')
        }`,
        zh: `${t(beachLodging.name, 'zh')} · ${config.beachNights} 晚，${
          beachLodging.kind === 'villa' ? '整栋别墅' : t(roomsLabel(units), 'zh')
        }`,
      },
      amount: beachRoom.price * units * config.beachNights,
      confidence: beachLodging.confidence,
      note: beachRoom.name,
    });
  }

  // -------------------------------------------------------------------- car
  const carDays = Math.round(a.carDays);
  lines.push({
    id: 'car-rental',
    group: 'car',
    label: {
      en: `Car hire · ${carDays} days, ${t(UI[CAR_LABEL[config.carClass]], 'en')}`,
      zh: `租车 · ${carDays} 天，${t(UI[CAR_LABEL[config.carClass]], 'zh')}`,
    },
    amount: (config.carClass === 'mpv' ? a.carDailyMpv : a.rentalDaily) * carDays,
    confidence: 'estimate',
  });
  lines.push({
    id: 'car-seats',
    group: 'car',
    label: {
      en: `Child seats · ${a.childSeats} seats × ${carDays} days`,
      zh: `儿童座椅 · ${a.childSeats} 个 × ${carDays} 天`,
    },
    amount: a.childSeats * a.childSeatPerDay * carDays,
    confidence: 'estimate',
  });
  if (a.rentalInsurancePerDay > 0) {
    lines.push({
      id: 'car-insurance',
      group: 'car',
      label: {
        en: `Zero-excess rental cover · ${carDays} days`,
        zh: `租车不计免赔 · ${carDays} 天`,
      },
      amount: a.rentalInsurancePerDay * carDays,
      confidence: 'verified',
    });
  }
  lines.push({
    id: 'car-fuel',
    group: 'car',
    label: {
      en: `Petrol · ${a.budgetDriveKm} km in Hainan`,
      zh: `油费 · 海南行驶 ${a.budgetDriveKm} 公里`,
    },
    amount: (a.budgetDriveKm / 100) * a.fuelEfficiency * a.fuelPriceHainan,
    confidence: 'estimate',
    note: {
      en: 'Hainan has no expressway tolls; the levy is inside the fuel price instead.',
      zh: '海南高速不收费，相关费用已含在油价中。',
    },
  });
  if (out && back && out.toCode !== back.fromCode) {
    lines.push({
      id: 'car-oneway',
      group: 'car',
      label: { en: 'One-way drop-off fee', zh: '异地还车费' },
      amount: a.rentalOneWayFee,
      confidence: 'estimate',
      note: {
        en: `Picked up at ${out.toCode}, dropped at ${back.fromCode}.`,
        zh: `在 ${out.toCode} 取车，在 ${back.fromCode} 还车。`,
      },
    });
  }

  // ------------------------------------------------------------------- food
  const foodDays = config.wenchangNights + config.beachNights;
  lines.push({
    id: 'food',
    group: 'food',
    label: {
      en: `${t(UI[FOOD_KEY[config.foodMode]], 'en')} · ${foodDays} days`,
      zh: `${t(UI[FOOD_KEY[config.foodMode]], 'zh')} · ${foodDays} 天`,
    },
    amount: a[FOOD_PER_DAY_KEY[config.foodMode]] * foodDays,
    confidence: 'estimate',
  });

  // ----------------------------------------------------------------- extras
  lines.push({
    id: 'insurance',
    group: 'extras',
    label: { en: 'Travel insurance · 4 travellers', zh: '旅行保险 · 4 位付费旅客' },
    amount: a.insurancePerPerson * 4,
    confidence: 'estimate',
    note: {
      en: 'The grandmother covers her own insurance and ticket, as agreed.',
      zh: '按约定，外婆自行承担保险与机票。',
    },
  });
  if (beachLodging?.kind === 'villa') {
    lines.push({
      id: 'villa-clean',
      group: 'extras',
      label: { en: 'Villa cleaning fee', zh: '别墅清洁费' },
      amount: a.villaCleaningFee,
      confidence: 'assumption',
    });
  }
  if (a.attractionsOnce > 0) {
    lines.push({
      id: 'attractions',
      group: 'extras',
      label: { en: 'Attractions and entry tickets', zh: '景点门票' },
      amount: a.attractionsOnce,
      confidence: 'estimate',
    });
  }
  if (a.launchTicketPerPerson > 0) {
    lines.push({
      id: 'launch-tickets',
      group: 'extras',
      label: { en: 'Launch viewing tickets · 5 people', zh: '发射观礼门票 · 5 人' },
      amount: a.launchTicketPerPerson * 5,
      confidence: 'assumption',
    });
  }
  const sundryDays = foodDays + 1;
  lines.push({
    id: 'sundries',
    group: 'extras',
    label: { en: `Sundries · ${sundryDays} days`, zh: `杂项 · ${sundryDays} 天` },
    amount: a.sundriesPerDay * sundryDays,
    confidence: 'assumption',
  });
  lines.push({
    id: 'souvenirs',
    group: 'extras',
    label: { en: 'Souvenirs and extras', zh: '纪念品与临时支出' },
    amount: a.souvenirsOnce,
    confidence: 'assumption',
  });

  // --------------------------------------------------------- airport access
  if (a.parkAtAirport === 1) {
    lines.push({
      id: 'airport-parking',
      group: 'extras',
      label: { en: `Airport parking · ${sundryDays} days`, zh: `机场停车 · ${sundryDays} 天` },
      amount: a.airportParkingPerDay * sundryDays,
      confidence: 'estimate',
    });
  } else {
    lines.push({
      id: 'airport-taxis',
      group: 'extras',
      label: { en: 'Taxis · home ↔ XMN, both ways', zh: '往返机场打车 · 家 ↔ 厦门机场' },
      amount: a.taxiToAirport * 2,
      confidence: 'estimate',
    });
  }

  const groups: BudgetResult['groups'] = { flights: 0, stay: 0, car: 0, food: 0, extras: 0 };
  for (const line of lines) groups[line.group] += line.amount;
  const total = groups.flights + groups.stay + groups.car + groups.food + groups.extras;
  const nights = config.wenchangNights + config.beachNights;

  const villa = beachLodging?.kind === 'villa';
  const bedrooms = beachRoom?.bedrooms ?? 1;
  const privacy: Privacy = villa
    ? bedrooms >= 2
      ? 'own-bedroom'
      : 'shared'
    : config.beachRooms >= 2
      ? 'own-room'
      : 'shared';

  const flags: BudgetFlags = {
    privacy,
    backtrack: !(out?.toCode === 'HAK' && back?.fromCode === 'SYX'),
    earlyStart: back?.fromCode === 'HAK' && back?.depart < '12:00',
    beachNights: config.beachNights,
    villa,
  };

  return {
    config,
    lines,
    groups,
    total,
    nights,
    perDay: total / Math.max(1, nights),
    perPerson: total / 5,
    flags,
    valueScore: 0,
    wenchangStay: wenchangLodging && wenchangRoom ? { lodging: wenchangLodging, room: wenchangRoom } : null,
    beachStay: beachLodging && beachRoom ? { lodging: beachLodging, room: beachRoom } : null,
  };
}

/**
 * Value = 50 points for the cost position (cheapest scores 50, dearest 0) plus
 * up to 50 for the things that make the trip actually work: a private space for
 * the grandmother, no wasted driving, no pre-dawn departure, more beach.
 *
 * The split is deliberately even rather than cost-dominant: across the five
 * shapes the spread is only a few percent of the total, so the decision is
 * really about comfort, and the score should say so.
 */
function valueScoreFor(result: BudgetResult, cheapest: number, dearest: number): number {
  const spread = Math.max(1, dearest - cheapest);
  const costPoints = 50 * (1 - (result.total - cheapest) / spread);
  const comfortPoints =
    (result.flags.privacy === 'own-bedroom' ? 16 : result.flags.privacy === 'own-room' ? 10 : 0) +
    (result.flags.backtrack ? 0 : 12) +
    (result.flags.earlyStart ? 0 : 12) +
    Math.min(6, Math.max(0, (result.flags.beachNights - 2) * 3));
  return Math.max(0, Math.min(100, costPoints + comfortPoints));
}

export interface RankedBudget {
  pkg: BudgetPackage;
  result: BudgetResult;
}

export interface BudgetPicks {
  cheapest: RankedBudget;
  bestValue: RankedBudget;
  mostComfortable: RankedBudget;
}

export function rankBudgets(assumptions: Assumptions): { rows: RankedBudget[]; picks: BudgetPicks } {
  const rows: RankedBudget[] = BUDGET_PACKAGES.map((pkg) => ({
    pkg,
    result: computeBudget(pkg.config, assumptions),
  }));
  const totals = rows.map((r) => r.result.total);
  const cheapest = Math.min(...totals);
  const dearest = Math.max(...totals);
  for (const row of rows) {
    row.result.valueScore = Math.round(valueScoreFor(row.result, cheapest, dearest));
  }

  const comfortOf = (r: RankedBudget) =>
    (r.result.flags.privacy === 'own-bedroom' ? 3 : r.result.flags.privacy === 'own-room' ? 2 : 0) +
    (r.result.flags.backtrack ? 0 : 2) +
    (r.result.flags.earlyStart ? 0 : 2) +
    r.result.flags.beachNights;

  const byTotal = [...rows].sort((x, y) => x.result.total - y.result.total);
  const byValue = [...rows].sort((x, y) => y.result.valueScore - x.result.valueScore);
  const byComfort = [...rows].sort((x, y) => comfortOf(y) - comfortOf(x));

  return { rows, picks: { cheapest: byTotal[0], bestValue: byValue[0], mostComfortable: byComfort[0] } };
}

/** One sentence explaining how a package scores on the comfort flags. */
export function explainFlags(result: BudgetResult, lang: Lang): string {
  const { privacy, backtrack, earlyStart } = result.flags;
  const privacyText =
    privacy === 'own-bedroom' ? UI.whyOwnBedroom : privacy === 'own-room' ? UI.whyOwnRoom : UI.whyShared;
  return [t(privacyText, lang), t(backtrack ? UI.whyBacktrack : UI.whyNoBacktrack, lang), t(earlyStart ? UI.whyEarlyStart : UI.whyNoEarlyStart, lang)].join(
    ' ',
  );
}
