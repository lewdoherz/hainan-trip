import type { Assumptions, Segment, TimelineGroup, TransportOption } from './types';

/**
 * The competing strategies. Every money figure is produced by a function of the
 * user's editable assumptions — nothing is hard-coded — and every time figure is
 * a list of segments that either reference an assumption or a computed value.
 *
 * CONVENTIONS
 *  • Times describe the OUTBOUND journey only (Xiamen → Hainan), because that is
 *    the leg that has to land before the launch.
 *  • Costs are ROUND TRIP, because that is what the family actually pays.
 *  • Static scores (family, reliability, transfers, mobility, luggage, stress)
 *    are researched judgements, each with a written justification. Cost and
 *    travel time are derived live by the scoring engine.
 */

/* -------------------------------------------------------------- drive --- */

/**
 * The drive is the only option whose length is a user choice, so its timeline is
 * generated: one driving day per `driveNights + 1`, with the ferry, the island
 * leg and the hotel check-in appended to the final day.
 */
function driveTimeline(a: Assumptions): TimelineGroup[] {
  const days = Math.max(1, Math.round(a.driveNights)) + 1;
  const groups: TimelineGroup[] = [];

  for (let i = 0; i < days; i += 1) {
    const last = i === days - 1;
    const segments: Segment[] = [];

    if (i === 0) {
      segments.push({
        id: 'd0-pack',
        label: 'Finish loading the car',
        detail: 'Child seats already fitted, stroller, cot and bags packed the night before.',
        kind: 'admin',
        minutes: 30,
        confidence: 'assumption',
      });
    }

    segments.push({
      id: `d${i}-drive`,
      label: last ? 'Driving to Xuwen Port' : `Driving day ${i + 1}`,
      detail: last
        ? 'Final stretch down the Leizhou peninsula; the expressway spur runs to the port gate.'
        : 'Coastal expressways towards Guangdong — roughly 1/3 of the mainland distance each driving day.',
      kind: 'travel',
      minutes: { compute: 'driveDayMin' },
      confidence: 'verified',
      note: i === 0 ? 'The 1,183 km route is 14 h 18 m of pure driving; we break it up.' : undefined,
    });

    segments.push({
      id: `d${i}-breaks`,
      label: 'Breaks, meals, nappy changes',
      detail: 'Roughly 2 h driving then a 20–30 min stop: about four stops per 500 km with an infant.',
      kind: 'rest',
      minutes: { assumption: 'driveBreakBuffer' },
      confidence: 'assumption',
    });

    if (last) {
      segments.push(
        {
          id: 'ferry-checkin',
          label: 'Xuwen Port: vehicle lane, security, boarding',
          detail: 'Trunk inspected at the gate; passengers and car must be on the same booking.',
          kind: 'wait',
          minutes: { assumption: 'ferryWait' },
          confidence: 'verified',
          note: 'Full online reservation is mandatory — there is no ticket office at the port, and the gate closes 20 minutes before departure. Dedicated car-only sailings have run at 11:05 and 14:05 from Xuwen; 海安新港 → 秀英港 is the slower overflow route, and 徐闻北港 → 海口南港 is the railway ferry.',
        },
        {
          id: 'ferry-cross',
          label: 'Crossing the Qiongzhou Strait',
          detail: '12 nautical miles, about 60 minutes at sea. All passengers must leave the car; luggage stays locked on the vehicle deck.',
          kind: 'travel',
          minutes: { assumption: 'ferryCrossing' },
          confidence: 'verified',
          note: 'Keep nappies, formula, water and a change of clothes in a day bag — you cannot get back into the car.',
        },
        {
          id: 'ferry-arrive',
          label: 'Disembark at Haikou New Port',
          detail: 'Reunite the family with the car and clear the port.',
          kind: 'wait',
          minutes: 40,
          confidence: 'assumption',
        },
        {
          id: 'drive-wenchang',
          label: 'Drive to Wenchang',
          detail: 'Toll-free island expressways.',
          kind: 'travel',
          minutes: { compute: 'driveHainanMin' },
          confidence: 'verified',
        },
      );
    } else {
      segments.push({
        id: `d${i}-hotel`,
        label: 'Hotel stop',
        detail: 'Family room, dinner, early night — no overnight driving with two small children.',
        kind: 'overnight',
        minutes: 600,
        confidence: 'assumption',
      });
    }

    groups.push({
      id: `day-${i + 1}`,
      label: last ? `Day ${i + 1} · Xuwen Port → ferry → Wenchang` : `Day ${i + 1} · driving south`,
      sublabel: i === 0 ? 'Xiamen → Guangdong' : undefined,
      start: last ? '07:00' : '08:00',
      segments,
    });
  }

  groups.push({
    id: 'arrive',
    label: 'Arrival · Wenchang',
    start: '21:00',
    segments: [
      {
        id: 'checkin',
        label: 'Check in and unpack',
        detail: 'Be in Wenchang or Longlou by the evening of 16 September — never travel on launch day itself.',
        kind: 'admin',
        minutes: 45,
        confidence: 'assumption',
      },
    ],
    note: 'The return trip mirrors this: 2 road nights, the same ferry, 1,183 km back.',
  });

  return groups;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  // ------------------------------------------------------------------ A ---
  {
    id: 'drive-ferry',
    name: 'Drive + ferry',
    subtitle: 'Our own car across the Qiongzhou Strait',
    cnName: '自驾 + 琼州海峡轮渡',
    modeLabel: 'Own car',
    vehicle: 'Own car',
    accent: '#0f3d3e',
    tagline: 'Roughly 1,183 km and a ferry each way — but the car seats, cot and luggage never get repacked.',
    verdict:
      '1,183 km of expressway to Xuwen Port, a mandatory-reservation vehicle ferry across the Qiongzhou Strait, then ~100 km up the island to Wenchang. Done as three days each way it is survivable; the price is that four of the trip days become travel days, the family arrives tired, and the strait can close in a typhoon or fog — one past suspension stranded some 21,000 vehicles at Xuwen. The car, the child seats and the luggage load are the compensating prize.',
    transfers: 1,
    staticScores: {
      family: {
        score: 60,
        why: 'Our own car and our own child seats, a familiar space where the toddler can nap, and the freedom to stop whenever the baby needs it. Against that: two or three consecutive driving days, and a 1.5–2 h port wait followed by a crossing where every passenger must leave the car and sit in a ferry cabin.',
      },
      reliability: {
        score: 50,
        why: 'The strait suspends sailings at force-9 wind and goes intermittent in fog — and mid-September is typhoon season. A single past suspension left ~21,000 vehicles stranded at Xuwen. Sailings are auto-rebooked by SMS, but a closure costs a day, not an hour.',
      },
      transfers: {
        score: 66,
        why: 'One real hand-over per crossing: the ferry, where passengers leave the car and luggage stays locked inside. Compare that with a rail chain that moves every bag four times.',
      },
      mobility: {
        score: 100,
        why: 'Maximum. Own car, own seats fitted at home, no rental counter, no deposit, no drop-off deadline, no mileage limits, and the ability to reach any beach or change plans the same day.',
      },
      luggage: {
        score: 100,
        why: 'A car boot has no baggage allowance: stroller, cot, steriliser, a fortnight of nappies, beach gear and souvenirs. This is the single biggest advantage of driving, and it matters most with an 8-month-old.',
      },
      stress: {
        score: 40,
        why: 'Four travel days inside a seven-day window, plus the fatigue of the drive, the port and the crossing. The parents arrive noticeably more tired than they would after a flight — right before an 08:30 launch.',
      },
    },
    costLines: (a) => {
      const nights = a.driveNights * 2;
      return [
        {
          id: 'fuel-mainland',
          label: 'Petrol · mainland (return, 2 × 1,183 km)',
          amount: ((a.driveKmMainland * 2) / 100) * a.fuelEfficiency * a.fuelPriceMainland,
          drivenBy: ['driveKmMainland', 'fuelEfficiency', 'fuelPriceMainland'],
          confidence: 'estimate',
          note: 'Fill up in Xuwen before boarding — Hainan fuel carries the road-toll levy instead of tolls.',
        },
        {
          id: 'fuel-hainan',
          label: 'Petrol · Hainan (return)',
          amount: ((a.driveKmHainan * 2) / 100) * a.fuelEfficiency * a.fuelPriceHainan,
          drivenBy: ['driveKmHainan', 'fuelEfficiency', 'fuelPriceHainan'],
          confidence: 'estimate',
          note: 'Hainan 92# is ~¥1.10/L dearer than Guangdong, of which ¥1.05/L is the levy that replaces tolls.',
        },
        {
          id: 'tolls',
          label: 'Expressway tolls (mainland, return)',
          amount: a.driveKmMainland * 2 * a.tollRatePerKm,
          drivenBy: ['driveKmMainland', 'tollRatePerKm'],
          confidence: 'estimate',
          note: '¥638 each way for a class-1 car; Hainan island roads are toll-free.',
        },
        {
          id: 'road-hotels',
          label: `Road hotel · ${nights} nights (out and back)`,
          amount: nights * a.driveHotelPerNight,
          drivenBy: ['driveNights', 'driveHotelPerNight'],
          confidence: 'estimate',
          note: 'Three driving days each way with two small children. Sleeping near Xuwen before an early sailing is worth it.',
        },
        {
          id: 'ferry',
          label: 'Qiongzhou Strait ferry · car + driver + 1 adult (return)',
          amount: (a.ferryCarDriver + a.ferryAdult + a.ferryChild + a.ferryInfant) * 2,
          drivenBy: ['ferryCarDriver', 'ferryAdult', 'ferryChild', 'ferryInfant'],
          confidence: 'verified',
          note: '¥415.50 for the car and driver plus ¥41.50 for the second adult; both children travel free under 1.2 m with a zero-fare ticket on the same order.',
        },
      ];
    },
    timeline: driveTimeline,
    practical: [
      { label: 'Child seats', value: 'Our own, fitted at home — nothing to rent or trust', tone: 'good' },
      { label: 'Luggage', value: 'Unlimited; whatever fits in the car', tone: 'good' },
      { label: 'Best port pairing', value: 'Xuwen Port → Haikou New Port: 12 nm, ~60 min, up to 71 sailings a day, 24 h', tone: 'good' },
      { label: 'Booking', value: 'Reservation is mandatory online, 15 days ahead; no ticket office at the port', tone: 'warn' },
      { label: 'Ferry crossing', value: '~60 min at sea, 2.5–4 h door to door; passengers leave the car', tone: 'warn' },
      { label: 'Fuel tip', value: 'Fill up in Xuwen — Hainan fuel carries the toll levy, but island roads are toll-free', tone: 'good' },
      { label: 'Weather risk', value: 'Strait closes at force-9 wind and in fog — September is typhoon season', tone: 'bad' },
      { label: 'Arrival condition', value: 'Four travel days and ~2,400 km before the holiday starts', tone: 'bad' },
    ],
    pros: [
      'Child seats, stroller, cot and the whole luggage load travel once, untouched',
      'Own car on Hainan: no rental counter, deposit, mileage cap or drop-off deadline',
      'Total cost is largely fixed and knowable in advance — fuel, tolls, ferry and hotels',
      'Hainan expressways are toll-free and fuel is the only running cost on the island',
      'Complete freedom to change plans mid-trip, including following better weather',
    ],
    cons: [
      'Roughly 1,183 km and 14+ hours of driving each way, split over two to three days',
      'Mandatory ferry reservation with a hard 20-minute gate cut-off, and 1.5–2 h of port waiting',
      'All passengers must leave the car for the crossing — hardest with a sleeping baby',
      'The strait closes in typhoons and fog, with documented multi-day strandings',
      'Four of the trip days become travel days, and the parents arrive tired before an 08:30 launch',
    ],
    legs: [
      { id: 'l1', fromId: 'xiamen', toId: 'shantou', label: 'Xiamen → Shantou', mode: 'car', distance: '~250 km', duration: '~3 h' },
      { id: 'l2', fromId: 'shantou', toId: 'huizhou', label: 'Shantou → Huizhou / Dongguan', mode: 'car', distance: '~250 km', duration: '~3 h' },
      { id: 'l3', fromId: 'huizhou', toId: 'guangzhou', label: 'Huizhou → Guangzhou ring road', mode: 'car', distance: '~180 km', duration: '~2 h' },
      { id: 'l4', fromId: 'guangzhou', toId: 'yangjiang', label: 'Guangzhou → Yangjiang', mode: 'car', distance: '~230 km', duration: '~2 h 45 m' },
      { id: 'l5', fromId: 'yangjiang', toId: 'zhanjiang', label: 'Yangjiang → Zhanjiang', mode: 'car', distance: '~230 km', duration: '~2 h 45 m' },
      { id: 'l6', fromId: 'zhanjiang', toId: 'xuwen-port', label: 'Zhanjiang → Xuwen Port', mode: 'car', distance: '~160 km', duration: '~2 h' },
      { id: 'l7', fromId: 'xuwen-port', toId: 'new-haikou-port', label: 'Qiongzhou Strait vehicle ferry', mode: 'ferry', distance: '12 nm / ~22 km', duration: '~60 min at sea' },
      { id: 'l8', fromId: 'new-haikou-port', toId: 'wenchang', label: 'Haikou New Port → Wenchang', mode: 'car', distance: '~100 km', duration: '~1 h 30 m' },
      { id: 'l9', fromId: 'wenchang', toId: 'longlou', label: 'Wenchang → Longlou (launch viewing)', mode: 'car', distance: '~40 km', duration: '~40 min' },
    ],
    contingencies: [
      'Sailing cancelled: the booking system rebooks you onto the nearest available sailing by SMS. Xuwen Port hotline 0759-4663889; the rail-ferry north port is on 0898-31684464.',
      'Stuck on the mainland side: Xuwen county town is 10–15 km from the port with cheap hotels, and the port runs 24 h — sleep there rather than driving a dawn run from Zhanjiang with a baby.',
      'Launch slips by a day: we have the car, so we simply stay an extra night and drive anywhere on the island.',
      'Breakdown on the mainland: this plan has no redundancy. Service the car beforehand and check insurance covers vehicle repatriation.',
      'Running late on launch morning: leaving a Wenchang hotel by car at 05:15 is the most flexible position of any option.',
    ],
    confidence: 'estimate',
  },

  // ------------------------------------------------------------------ B ---
  {
    id: 'fly-rent-hak',
    name: 'Fly + rent',
    subtitle: 'XMN → Haikou (HAK), then a rental car',
    cnName: '飞机到海口 + 租车',
    modeLabel: 'Fly + rent',
    vehicle: 'Rental car (Haikou)',
    accent: '#c2553f',
    tagline: 'A ~1 h 40 m flight, then Wenchang is barely 1.5 hours up the coast.',
    verdict:
      'Haikou is the right airport: the flight from Xiamen takes 1 h 40 m – 2 h 25 m with 19 weekly departures across Xiamen Airlines, Hainan Airlines and China Southern, the airport has its own HSR station for a 10-minute run to Haikou East, and Wenchang is ~100 km up the toll-free east-coast expressway. The whole outbound journey becomes one morning instead of two or three days. The price is luggage: two child seats, a stroller and a cot become a baggage problem rather than a boot full of stuff.',
    transfers: 3,
    staticScores: {
      family: {
        score: 88,
        why: 'A ~1 h 40 m flight fits inside a nap window and the family is at the hotel by mid-afternoon. The friction is the airport (check-in, security, gate-checked stroller) and the rental counter — but an 8-month-old on a lap and a 3-year-old with a tablet handle two hours far better than two days of driving.',
      },
      reliability: {
        score: 78,
        why: 'Roughly seven XMN → HAK departures a day means a cancellation can usually be absorbed the same day. Typhoons still ground aircraft, but airports recover faster than ferry ports and there are more fallbacks than the drive or rail options.',
      },
      transfers: {
        score: 48,
        why: 'Three hand-overs: home to airport, aircraft to carousel to rental desk, then car to hotel. Each one means moving two children, a stroller and four bags.',
      },
      mobility: {
        score: 88,
        why: 'A rental car collected at the airport gives nearly the freedom of our own car, minus our own child seats and with a drop-off deadline. One-way HAK → SYX is available if we want to end in the south.',
      },
      luggage: {
        score: 54,
        why: 'The real weak point: checked allowances plus a stroller plus car seats and a cot. Bringing our own seats is possible but bulky, and may need an extra checked bag.',
      },
      stress: {
        score: 84,
        why: 'One travel morning, no driving fatigue, and two clear days before the launch. The residual stress is airport logistics with a baby and a delayed flight eating the buffer.',
      },
    },
    costLines: (a) => {
      const parkingDays = a.tripNightsHainan + 1;
      return [
        {
          id: 'air-adults',
          label: 'Airfare · 2 adults (return)',
          amount: a.adultsCount * 2 * a.airAdult,
          drivenBy: ['adultsCount', 'airAdult'],
          confidence: 'estimate',
          note: 'Fares swing widely and near a launch date they move fast — check live prices for the exact dates.',
        },
        {
          id: 'air-child',
          label: 'Airfare · 3-year-old (return, child fare)',
          amount: 2 * a.airAdult * a.airChildRatio,
          drivenBy: ['airAdult', 'airChildRatio'],
          confidence: 'verified',
          note: 'Chinese carriers charge a child with their own seat roughly half the adult fare, plus surcharges.',
        },
        {
          id: 'air-infant',
          label: 'Airfare · 8-month-old (return, lap infant)',
          amount: 2 * a.airInfantFee,
          drivenBy: ['airInfantFee'],
          confidence: 'estimate',
          note: 'Lap infants are charged a small percentage of the adult fare plus surcharges. An infant seat can be booked instead if we want the space.',
        },
        {
          id: 'parking',
          label: `Airport parking · ${parkingDays} days (if we leave the car)`,
          amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
          drivenBy: ['airportParkingPerDay', 'parkAtAirport', 'tripNightsHainan'],
          confidence: 'estimate',
        },
        {
          id: 'taxis',
          label: 'Taxis · home ↔ XMN (return, if we do not park)',
          amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
          drivenBy: ['taxiToAirport', 'parkAtAirport'],
          confidence: 'estimate',
        },
        {
          id: 'rental',
          label: `Rental car · ${a.rentalDays} days`,
          amount: a.rentalDaily * a.rentalDays,
          drivenBy: ['rentalDaily', 'rentalDays'],
          confidence: 'estimate',
          note: 'Mid-size SUV or MPV with room for two child seats and the luggage.',
        },
        {
          id: 'child-seats',
          label: 'Child seat rental (unless we bring ours)',
          amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
          drivenBy: ['childSeatPerDay', 'childSeats', 'rentalDays', 'bringOwnSeats'],
          confidence: 'estimate',
          note: 'Book the infant carrier explicitly — Hainan desks do not reliably hold them, and a rear-facing seat for an 8-month-old is not something to improvise.',
        },
        {
          id: 'bags',
          label: 'Extra checked baggage (return)',
          amount: 2 * a.checkedBagFee,
          drivenBy: ['checkedBagFee'],
          confidence: 'assumption',
          note: 'Set this above zero if our own seats or the cot push us past the free allowance.',
        },
        {
          id: 'rental-fuel',
          label: 'Petrol in Hainan',
          amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan,
          drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'],
          confidence: 'estimate',
          note: 'No tolls on Hainan, but the fuel carries the levy.',
        },
        {
          id: 'oneway',
          label: 'One-way drop-off fee (if returning from another city)',
          amount: a.rentalOneWayFee * a.rentalOneWay,
          drivenBy: ['rentalOneWayFee', 'rentalOneWay'],
          confidence: 'estimate',
        },
      ];
    },
    timeline: [
      {
        id: 'fly-out',
        label: 'Travel day · Xiamen → Wenchang',
        sublabel: 'One morning, one flight',
        start: '07:30',
        segments: [
          { id: 'home-car', label: 'Leave home for XMN', detail: 'Taxi, or our car to the airport car park.', kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
          { id: 'checkin', label: 'Check-in, bags, security, stroller', detail: 'Gate-check the stroller and carry the baby in a sling through security.', kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
          { id: 'flight', label: 'Flight XMN → HAK', detail: 'About seven departures a day; pick a mid-morning slot.', kind: 'travel', minutes: { assumption: 'flightBlockXmnHak' }, confidence: 'verified', note: 'Nothing before 08:00 with an 8-month-old, and we want daylight at both ends of the day.' },
          { id: 'bags', label: 'Land, collect stroller and bags', detail: 'Baby changing room before leaving the terminal.', kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
          { id: 'rental', label: 'Collect the rental car', detail: 'Shuttle to the lot, paperwork, fit and check both child seats before driving off.', kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
          { id: 'drive-wc', label: 'Drive HAK → Wenchang', detail: 'East-coast expressway, toll-free on the island.', kind: 'travel', minutes: { assumption: 'hakToWenchang' }, confidence: 'estimate' },
          { id: 'hotel', label: 'Check in, unpack, beach or pool', detail: 'Half the afternoon left — the children get to swim.', kind: 'admin', minutes: 45, confidence: 'assumption' },
        ],
        note: 'The return mirrors this: drop the car ~2 h before departure, fly, taxi home. HAK also has its own HSR station (美兰站, 10 min to Haikou East, 22 trains a day) if we ever want to do a leg without the car.',
      },
    ],
    practical: [
      { label: 'Child seats', value: 'Reserve an infant carrier at booking, or check our own in', tone: 'warn' },
      { label: 'Luggage', value: 'Allowance-limited; stroller + cot + seats is a squeeze', tone: 'warn' },
      { label: 'Transfers', value: '3 (home→airport, airport→car, car→hotel)', tone: 'neutral' },
      { label: 'Arrival condition', value: 'Rested, with two clear days before the launch', tone: 'good' },
      { label: 'Airport → Wenchang', value: '~100 km, 1.5 h by car; 10-min HSR to Haikou East', tone: 'good' },
      { label: 'Flights', value: '19 weekly: Xiamen Airlines 8, Hainan Airlines 7, China Southern 4', tone: 'good' },
      { label: 'Baggage', value: '20 kg each for adults and children; one folding stroller free, even for the infant', tone: 'neutral' },
      { label: 'Excess baggage', value: 'About ¥25/kg on this distance band — set the extra-bag line in Costs if needed', tone: 'warn' },
    ],
    pros: [
      'The outbound journey is one morning instead of two or three days',
      'Parents arrive rested, two days before an 08:30 launch',
      'HAK is the correct airport for Wenchang: the closest, with flights spread through the day',
      'A rental car from the airport keeps island freedom, including one-way HAK → SYX',
      '~7 daily departures mean a cancellation can often be absorbed the same day',
    ],
    cons: [
      'Two child seats, a stroller, a cot and all luggage have to fly',
      'Child and infant tickets add up, and fares near a launch date can spike',
      'Airport and rental-counter handling with a baby is its own kind of tiring',
      'Infant car-seat availability in Hainan is not guaranteed — book it explicitly or bring ours',
      'One-way rentals across the island carry a drop-off fee',
    ],
    legs: [
      { id: 'b1', fromId: 'xiamen', toId: 'xmn', label: 'Home → XMN airport', mode: 'taxi', distance: '~12 km', duration: '~30 min' },
      { id: 'b2', fromId: 'xmn', toId: 'hak', label: 'Flight XMN → HAK', mode: 'plane', distance: '~880 km', duration: '~1 h 40 m' },
      { id: 'b3', fromId: 'hak', toId: 'wenchang', label: 'Rental car HAK → Wenchang', mode: 'car', distance: '~100 km', duration: '~1 h 30 m' },
      { id: 'b4', fromId: 'wenchang', toId: 'longlou', label: 'Wenchang → Longlou (launch viewing)', mode: 'car', distance: '~40 km', duration: '~40 min' },
    ],
    contingencies: [
      'Flight cancelled: the airline rebooks on the next XMN → HAK departure. Travelling on the 15th for a 17th launch gives a full buffer day.',
      'Launch slips: the rental car means we can extend and move anywhere on the island without rebooking transport.',
      'Stroller or bags delayed: buy a cheap stroller in Haikou rather than waiting at the airport — they are widely available.',
      'HAK sold out or absurdly priced: the same plan works into Sanya with a three-hour drive. Boao (BAR) is closest to Wenchang, but it has had no direct Xiamen service since Hebei Airlines withdrew in January 2023, so it is not a real alternative.',
    ],
    confidence: 'estimate',
  },

  // ------------------------------------------------------------------ C ---
  {
    id: 'fly-rent-syx',
    name: 'Fly to Sanya + rent',
    subtitle: 'XMN → SYX, then a 3-hour drive north',
    cnName: '飞机到三亚 + 租车',
    modeLabel: 'Fly + rent',
    vehicle: 'Rental car (Sanya)',
    accent: '#d99b34',
    tagline: 'Best resorts, worst geography — and a thinner flight schedule.',
    verdict:
      'Only worth it if the holiday matters more than the launch. Sanya has the island’s best beaches and family resorts, but it is roughly 250 km and three hours from Wenchang — and the route from Xiamen is flown only by Xiamen Airlines, one or two times a day, which means fewer cheap seats and less resilience than Haikou. Treat it as a holiday-first plan, or as the second half of a two-base trip with a one-way rental.',
    transfers: 3,
    staticScores: {
      family: {
        score: 80,
        why: 'The flight is short and the resorts are the most child-friendly on the island, but the 2.5–3.5 h drive north after landing — or before dawn on launch morning — is a real burden with an 8-month-old.',
      },
      reliability: {
        score: 74,
        why: 'Flights are frequent, but the launch-day drive adds a long, weather-sensitive link on mountain expressways in typhoon season.',
      },
      transfers: {
        score: 46,
        why: 'Same three hand-overs as the Haikou flight, plus a much longer car leg with a baby.',
      },
      mobility: {
        score: 84,
        why: 'Full car freedom once collected, and a one-way SYX → HAK drop-off is possible if we finish in the north.',
      },
      luggage: {
        score: 52,
        why: 'Same airline baggage constraints as the Haikou flight.',
      },
      stress: {
        score: 62,
        why: 'The long drive is the stress, especially at 04:30 on launch morning after an early start.',
      },
    },
    costLines: (a) => {
      const parkingDays = a.tripNightsHainan + 1;
      return [
        {
          id: 'air-adults',
          label: 'Airfare · 2 adults to Sanya (return)',
          amount: a.adultsCount * 2 * a.airAdultSanya,
          drivenBy: ['adultsCount', 'airAdultSanya'],
          confidence: 'estimate',
          note: 'Sanya is a premium leisure destination; fares usually run above Haikou.',
        },
        { id: 'air-child', label: 'Airfare · 3-year-old (return, child fare)', amount: 2 * a.airAdultSanya * a.airChildRatio, drivenBy: ['airAdultSanya', 'airChildRatio'], confidence: 'verified' },
        { id: 'air-infant', label: 'Airfare · 8-month-old (return, lap infant)', amount: 2 * a.airInfantFee, drivenBy: ['airInfantFee'], confidence: 'estimate' },
        {
          id: 'parking',
          label: `Airport parking · ${parkingDays} days (if we leave the car)`,
          amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
          drivenBy: ['airportParkingPerDay', 'parkAtAirport'],
          confidence: 'estimate',
        },
        {
          id: 'taxis',
          label: 'Taxis · home ↔ XMN (return, if we do not park)',
          amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
          drivenBy: ['taxiToAirport', 'parkAtAirport'],
          confidence: 'estimate',
        },
        { id: 'rental', label: `Rental car · ${a.rentalDays} days`, amount: a.rentalDaily * a.rentalDays, drivenBy: ['rentalDaily', 'rentalDays'], confidence: 'estimate' },
        {
          id: 'child-seats',
          label: 'Child seat rental (unless we bring ours)',
          amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
          drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
          confidence: 'estimate',
        },
        { id: 'bags', label: 'Extra checked baggage (return)', amount: 2 * a.checkedBagFee, drivenBy: ['checkedBagFee'], confidence: 'assumption' },
        { id: 'rental-fuel', label: 'Petrol in Hainan (extra distance Sanya ↔ Wenchang)', amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan, drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'], confidence: 'estimate' },
        { id: 'oneway', label: 'One-way drop-off fee (if returning from Haikou)', amount: a.rentalOneWayFee * a.rentalOneWay, drivenBy: ['rentalOneWayFee', 'rentalOneWay'], confidence: 'estimate' },
      ];
    },
    timeline: [
      {
        id: 'syx-day',
        label: 'Travel day · Xiamen → Sanya → north',
        start: '06:00',
        segments: [
          { id: 'home', label: 'Leave home for XMN', kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
          { id: 'checkin', label: 'Check-in, bags, security', kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
          { id: 'flight', label: 'Flight XMN → SYX', kind: 'travel', minutes: { assumption: 'flightBlockXmnSyx' }, confidence: 'estimate' },
          { id: 'bags', label: 'Land, collect bags and stroller', kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
          { id: 'rental', label: 'Collect the rental car', kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
          { id: 'drive', label: 'Drive SYX → Wenchang', detail: 'Ring-road expressway up the east coast, toll-free.', kind: 'travel', minutes: { assumption: 'syxToWenchang' }, confidence: 'estimate', note: 'Roughly 250 km. This is the leg that makes Sanya a holiday-first choice.' },
          { id: 'hotel', label: 'Check in near Wenchang', kind: 'admin', minutes: 45, confidence: 'assumption' },
        ],
        note: 'The alternative — staying in Sanya and driving up before dawn on launch morning — means leaving at about 04:30 with two small children. We do not recommend it.',
      },
    ],
    practical: [
      { label: 'Child seats', value: 'Rent or check in, as with the Haikou flight', tone: 'warn' },
      { label: 'Luggage', value: 'Allowance-limited', tone: 'warn' },
      { label: 'Drive to launch', value: '~250 km, 2 h 30 m – 3 h 30 m', tone: 'bad' },
      { label: 'Resorts', value: 'The best on the island for young children', tone: 'good' },
      { label: 'Return options', value: 'Fly home from SYX, or drop the car at HAK one-way', tone: 'neutral' },
    ],
    pros: [
      'The best beaches and family resorts on the island',
      'Direct XMN → SYX flights are available',
      'Works well as the second half of a two-base trip: launch in the north, relax in the south',
    ],
    cons: [
      'Roughly 250 km and three hours from Wenchang — the single biggest drawback',
      'Sanya fares and hotels are the most expensive in Hainan',
      'Launch morning would start before 05:00 if we sleep in Sanya',
      'Duplicates driving if we also stay near Wenchang before the launch',
    ],
    legs: [
      { id: 'c1', fromId: 'xiamen', toId: 'xmn', label: 'Home → XMN airport', mode: 'taxi', distance: '~12 km', duration: '~30 min' },
      { id: 'c2', fromId: 'xmn', toId: 'syx', label: 'Flight XMN → SYX', mode: 'plane', distance: '~1,100 km', duration: '~2 h 35 m' },
      { id: 'c3', fromId: 'syx', toId: 'wenchang', label: 'Rental car SYX → Wenchang', mode: 'car', distance: '~250 km', duration: '~3 h' },
      { id: 'c4', fromId: 'wenchang', toId: 'longlou', label: 'Wenchang → Longlou (launch viewing)', mode: 'car', distance: '~40 km', duration: '~40 min' },
    ],
    contingencies: [
      'Launch slips: we are on the island with a car, so hotel nights can shift in either direction.',
      'Traffic after the launch: driving back to Sanya the same day is slow — plan a night in Wenchang or Wanning instead.',
    ],
    confidence: 'estimate',
  },

  // ------------------------------------------------------------------ D ---
  {
    id: 'train-rent',
    name: 'Train + sleeper + rent',
    subtitle: 'HSR to Guangzhou, the Qiongzhou Strait rail-ferry sleeper, rental car in Haikou',
    cnName: '高铁 + 粤海铁路轮渡 + 租车',
    modeLabel: 'Train + rent',
    vehicle: 'Rental car (Haikou)',
    accent: '#6b5a8e',
    tagline: 'An overnight train with beds — 22 hours door to door, but nobody has to drive.',
    verdict:
      'There is no through train from Xiamen to Hainan — a live timetable search for 17 September 2026 returns transfer plans only. The realistic chain is Xiamen North → Guangzhou South by HSR, across Guangzhou to Baiyun, then the overnight sleeper that is shunted onto the Qiongzhou Strait rail ferry and arrives at Haikou station in the morning, then a rental car to Wenchang. The sleeper gives the family a four-berth compartment that closes: a real bed for the 8-month-old and no hotel night. The costs are a cross-city transfer, 12+ hours confined with two children, ~30 minutes of the crossing with the power and air-conditioning cut, and sleeper berths that sell out fast.',
    transfers: 3,
    staticScores: {
      family: {
        score: 52,
        why: 'A private four-berth compartment with real beds is genuinely good for an infant, and trains have space to walk and a toilet on board. Against it: 12+ hours confined in one small room, a cross-city transfer in Guangzhou with all the bags, and a 30-minute stretch mid-crossing with the air-conditioning off in September heat.',
      },
      reliability: {
        score: 70,
        why: 'Rail itself is punctual and the rail ferry runs in most weather, but this is a chained itinerary: a missed HSR connection in Guangzhou means missing the only sleeper of the night. Sleepers also sell out within days of the 15-day window opening.',
      },
      transfers: {
        score: 30,
        why: 'Three hand-overs, each with the stroller, the cot and four bags: Xiamen North, Guangzhou South → Baiyun, and Haikou station → car pickup. Foldable strollers travel free and stations have lifts, but nobody helps you carry anything.',
      },
      mobility: {
        score: 80,
        why: 'A rental car collected in Haikou restores island freedom — just a day later, and with the family more tired than after a flight.',
      },
      luggage: {
        score: 58,
        why: 'No baggage allowance to fight and strollers go free, which is a plus. But everything must be physically moved three times, including on and off a train, which is hard with an infant in arms.',
      },
      stress: {
        score: 46,
        why: 'A night train with a baby is either wonderful or awful, with little middle ground: no driving fatigue, but a fixed departure, unfamiliar beds and a 10:20 arrival with a full day still ahead.',
      },
    },
    costLines: (a) => [
      {
        id: 'rail-hsr',
        label: 'HSR · Xiamen North → Guangzhou South (2 adults, return)',
        amount: a.adultsCount * 2 * a.trainHsrLeg1,
        drivenBy: ['adultsCount', 'trainHsrLeg1'],
        confidence: 'verified',
        note: 'Second class, 3 h 21 m – 4 h 39 m. Under-sixes travel free without their own seat.',
      },
      {
        id: 'rail-hsr-child',
        label: 'HSR · 3-year-old (return, child fare)',
        amount: 2 * a.trainHsrLeg1 * a.trainChildRatio,
        drivenBy: ['trainHsrLeg1', 'trainChildRatio'],
        confidence: 'verified',
        note: 'A seat for the 3-year-old; the 8-month-old rides free on a lap.',
      },
      {
        id: 'rail-city',
        label: 'Guangzhou South → Baiyun transfer (2 adults, return)',
        amount: a.adultsCount * 2 * a.trainCityTransfer,
        drivenBy: ['adultsCount', 'trainCityTransfer'],
        confidence: 'assumption',
        note: 'Taxi is easier than the metro with a stroller and four bags.',
      },
      {
        id: 'rail-sleeper',
        label: `Sleeper berths · Guangzhou Baiyun → Haikou (${a.trainSleeperBerths} berths × 2)`,
        amount: a.trainSleeperBerths * 2 * a.trainSleeperBerth,
        drivenBy: ['trainSleeperBerths', 'trainSleeperBerth'],
        confidence: 'estimate',
        note: 'A soft-sleeper compartment has four berths; booking all four gives the family a door that closes. The fare includes the rail-ferry crossing.',
      },
      {
        id: 'rail-haikou',
        label: 'Haikou station → city / car pickup (return)',
        amount: 2 * a.trainHaikouTransfer,
        drivenBy: ['trainHaikouTransfer'],
        confidence: 'verified',
        note: 'The sleeper arrives at Haikou station in Xiuying, 26 km west of Haikou East.',
      },
      { id: 'rental', label: `Rental car in Haikou · ${a.rentalDays} days`, amount: a.rentalDaily * a.rentalDays, drivenBy: ['rentalDaily', 'rentalDays'], confidence: 'estimate' },
      {
        id: 'child-seats',
        label: 'Child seat rental (unless we bring ours)',
        amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
        drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
        confidence: 'estimate',
      },
      { id: 'rental-fuel', label: 'Petrol in Hainan', amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan, drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'], confidence: 'estimate' },
      {
        id: 'no-hotel',
        label: 'Road hotel (none needed — the night is spent on the train)',
        amount: 0,
        confidence: 'assumption',
        note: 'The sleeper replaces a hotel night each way, which is part of why this option is not as expensive as it looks.',
      },
    ],
    timeline: [
      {
        id: 'rail-day-1',
        label: 'Day 1 · Xiamen → Guangzhou → sleeper train',
        sublabel: 'Afternoon departure',
        start: '14:00',
        segments: [
          { id: 'to-station', label: 'Home → Xiamen North station', kind: 'travel', minutes: 40, confidence: 'assumption' },
          { id: 'buf1', label: 'Station: tickets, platform, luggage', detail: 'Mother-and-baby waiting rooms exist, and priority boarding can be requested in advance on 12306.', kind: 'admin', minutes: { assumption: 'trainStationBuffer' }, confidence: 'assumption' },
          { id: 'leg1', label: 'HSR · Xiamen North → Guangzhou South', detail: 'Second class, roughly 4 hours.', kind: 'travel', minutes: 250, confidence: 'verified' },
          { id: 'change1', label: 'Cross Guangzhou to Baiyun station', detail: 'Metro or taxi, 45–60 minutes. This is the risky connection of the day.', kind: 'travel', minutes: { assumption: 'trainCityTransferMin' }, confidence: 'assumption' },
          { id: 'board', label: 'Board the Haikou sleeper', detail: 'Settle into the four-berth compartment, bed the children down.', kind: 'admin', minutes: 60, confidence: 'assumption' },
          {
            id: 'overnight',
            label: 'Overnight on the train, including the rail-ferry crossing',
            detail: 'The train is shunted aboard the ferry in sections and the crossing takes about three hours. Passengers stay in their carriage; power and air-conditioning are cut for roughly 30 minutes while loading.',
            kind: 'overnight',
            minutes: 780,
            confidence: 'verified',
            note: 'Keep the baby’s water, milk and a muslin within reach of the berth — you cannot move around while the train is being shunted.',
          },
        ],
      },
      {
        id: 'rail-day-2',
        label: 'Day 2 · Haikou → Wenchang',
        start: '10:20',
        segments: [
          { id: 'arrive-hk', label: 'Arrive Haikou station, disembark', detail: 'Xiuying district, west of the city; lifts down from the platform.', kind: 'wait', minutes: 45, confidence: 'assumption' },
          { id: 'taxi', label: 'Taxi to the rental depot / Haikou East', kind: 'travel', minutes: { assumption: 'trainHaikouTransferMin' }, confidence: 'verified' },
          { id: 'pickup', label: 'Collect the rental car', kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
          { id: 'drive', label: 'Drive Haikou → Wenchang', kind: 'travel', minutes: { assumption: 'hakToWenchang' }, confidence: 'estimate' },
          { id: 'hotel', label: 'Check in near Wenchang', kind: 'admin', minutes: 45, confidence: 'assumption' },
        ],
        note: 'Skipping the car for this leg: the island HSR runs Haikou East → Wenchang in 28 minutes for ¥27, with 36 departures a day.',
      },
    ],
    practical: [
      { label: 'Direct train?', value: 'None exists from Xiamen — this is a chained itinerary', tone: 'bad' },
      { label: 'Beds', value: 'Four-berth soft sleeper gives the family a door that closes', tone: 'good' },
      { label: 'Booking window', value: '15 days ahead; sleeper berths sell out fast', tone: 'warn' },
      { label: 'Luggage', value: 'No allowance limit, strollers free — but carried three times', tone: 'neutral' },
      { label: 'Crossing', value: '~3 h with power and A/C cut for ~30 min; confined to the carriage', tone: 'warn' },
      { label: 'Arrival', value: '10:20 at Haikou station, 26 km west of the city', tone: 'neutral' },
    ],
    pros: [
      'A real bed for the children on the overnight leg, and no hotel bill for that night',
      'No baggage allowance, and foldable strollers travel free',
      'Trains have space to walk, toilets and a table — easier than a car seat for a restless toddler',
      'Rail does not sit in traffic, and the rail ferry runs in most weather',
      'Priority boarding and mother-and-baby waiting rooms can be requested in advance',
    ],
    cons: [
      'No through service: this is four legs and three transfers chained together',
      '22–30 hours door to door, with a cross-city transfer in Guangzhou with all the luggage',
      'About 30 minutes of the crossing with the air-conditioning off, in September heat',
      'The Guangzhou connection has no slack — miss it and the family is stranded overnight',
      'Sleeper berths are released only 15 days ahead and sell out quickly around holidays',
    ],
    legs: [
      { id: 'd1', fromId: 'xiamen', toId: 'xiamen-north', label: 'Home → Xiamen North', mode: 'taxi', distance: '~20 km', duration: '~40 min' },
      { id: 'd2', fromId: 'xiamen-north', toId: 'guangzhou', label: 'HSR Xiamen North → Guangzhou South', mode: 'hsr', distance: '~600 km', duration: '~4 h' },
      { id: 'd3', fromId: 'guangzhou', toId: 'guangzhou', label: 'Cross Guangzhou to Baiyun station', mode: 'taxi', distance: '~25 km', duration: '~1 h' },
      { id: 'd4', fromId: 'guangzhou', toId: 'new-haikou-port', label: 'Sleeper train + rail ferry across the strait', mode: 'train', distance: '~600 km', duration: '~13 h' },
      { id: 'd5', fromId: 'new-haikou-port', toId: 'haikou', label: 'Haikou station → city / car pickup', mode: 'taxi', distance: '~26 km', duration: '~45 min' },
      { id: 'd6', fromId: 'haikou', toId: 'wenchang', label: 'Rental car Haikou → Wenchang', mode: 'car', distance: '~100 km', duration: '~1 h 30 m' },
    ],
    contingencies: [
      'Missed connection into Baiyun: the rail chain has no slack. Recovery means a taxi across the city and, if the sleeper is gone, a hotel in Guangzhou and a fresh booking the next night.',
      'Rail ferry suspended by weather: the train waits or is rescheduled; ask at the station before boarding. This is much rarer than a strait vehicle-ferry closure.',
      'Honest fallback: if the plan is looking fragile, abandon the rail legs and fly XMN → HAK instead — that is the whole point of keeping the flight option in the comparison.',
      'Sleepers sold out: book the moment the 15-day window opens, or split the family across two compartments.',
    ],
    confidence: 'estimate',
  },

  // ------------------------------------------------------------------ E ---
  {
    id: 'fly-in-out',
    name: 'Fly in to Haikou, out of Sanya',
    subtitle: 'One-way rental — launch north, relax south',
    cnName: '海口进 / 三亚出 + 异地还车',
    modeLabel: 'Fly + one-way rent',
    vehicle: 'Rental car (HAK → SYX)',
    accent: '#2f7f8f',
    tagline: 'No backtracking: launch in the north, then drift south down the coast to fly home.',
    verdict:
      'The best-fitting shape for a 5–7 day trip that has to serve both the launch and a holiday. Fly into Haikou, stay north for the launch, then drive south to Wanning or Sanya and fly home from SYX. It costs a one-way rental fee but removes both the pre-dawn drive of the Sanya-only plan and the pointless drive back north at the end.',
    transfers: 3,
    staticScores: {
      family: {
        score: 85,
        why: 'The same short first flight as the Haikou plan, but the trip flows in one direction: no long drive on launch morning and no backtrack at the end. Days 5–7 are pure beach with a car already packed.',
      },
      reliability: {
        score: 78,
        why: 'Two airports to rebook from, and the car makes the middle of the trip flexible if the launch moves. The one-way rental agreement is the only rigid element.',
      },
      transfers: {
        score: 48,
        why: 'Three hand-overs out and three back, but no duplicated north–south driving to add fatigue.',
      },
      mobility: {
        score: 92,
        why: 'The most freedom of the flying options: the whole island becomes a one-way drive, and the itinerary can be reshuffled without re-booking transport.',
      },
      luggage: {
        score: 55,
        why: 'The same airline baggage pressure, though a mid-trip stop lets us leave gear at the hotel rather than carrying it.',
      },
      stress: {
        score: 82,
        why: 'One travel morning each way, both airports close to the coast road, and launch day spent 40 minutes from the pad rather than three hours away.',
      },
    },
    costLines: (a) => {
      const parkingDays = a.tripNightsHainan + 1;
      return [
        { id: 'air-out-adults', label: 'Airfare · 2 adults XMN → HAK (outbound)', amount: a.adultsCount * a.airAdult, drivenBy: ['adultsCount', 'airAdult'], confidence: 'estimate' },
        {
          id: 'air-back-adults',
          label: 'Airfare · 2 adults SYX → XMN (return)',
          amount: a.adultsCount * a.airAdultSanya,
          drivenBy: ['adultsCount', 'airAdultSanya'],
          confidence: 'estimate',
          note: 'Flying home from Sanya usually costs a little more than from Haikou.',
        },
        { id: 'air-child', label: 'Airfare · 3-year-old (both directions, child fare)', amount: (a.airAdult + a.airAdultSanya) * a.airChildRatio, drivenBy: ['airAdult', 'airAdultSanya', 'airChildRatio'], confidence: 'verified' },
        { id: 'air-infant', label: 'Airfare · 8-month-old (both directions, lap infant)', amount: 2 * a.airInfantFee, drivenBy: ['airInfantFee'], confidence: 'estimate' },
        {
          id: 'parking',
          label: `Airport parking · ${parkingDays} days (if we leave the car at XMN)`,
          amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
          drivenBy: ['airportParkingPerDay', 'parkAtAirport'],
          confidence: 'estimate',
        },
        {
          id: 'taxis',
          label: 'Taxis · home ↔ XMN (return, if we do not park)',
          amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
          drivenBy: ['taxiToAirport', 'parkAtAirport'],
          confidence: 'estimate',
        },
        { id: 'rental', label: `Rental car · ${a.rentalDays} days (one-way HAK → SYX)`, amount: a.rentalDaily * a.rentalDays, drivenBy: ['rentalDaily', 'rentalDays'], confidence: 'estimate' },
        {
          id: 'oneway',
          label: 'One-way drop-off fee (HAK pick-up, SYX drop-off)',
          amount: a.rentalOneWayFee,
          drivenBy: ['rentalOneWayFee'],
          confidence: 'estimate',
          note: 'The price of not driving back north. Often ¥300–800; confirm with the rental company.',
        },
        {
          id: 'child-seats',
          label: 'Child seat rental (unless we bring ours)',
          amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
          drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
          confidence: 'estimate',
        },
        { id: 'bags', label: 'Extra checked baggage (return)', amount: 2 * a.checkedBagFee, drivenBy: ['checkedBagFee'], confidence: 'assumption' },
        { id: 'rental-fuel', label: 'Petrol in Hainan (north → south drive)', amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan, drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'], confidence: 'estimate' },
      ];
    },
    timeline: [
      {
        id: 'out',
        label: 'Outbound · Xiamen → Haikou → Wenchang',
        start: '07:30',
        segments: [
          { id: 'home', label: 'Leave home for XMN', kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
          { id: 'checkin', label: 'Check-in, security, stroller', kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
          { id: 'flight', label: 'Flight XMN → HAK', kind: 'travel', minutes: { assumption: 'flightBlockXmnHak' }, confidence: 'verified' },
          { id: 'bags', label: 'Land, collect bags', kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
          { id: 'rental', label: 'Collect the one-way rental car', kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
          { id: 'drive', label: 'Drive HAK → Wenchang', kind: 'travel', minutes: { assumption: 'hakToWenchang' }, confidence: 'estimate' },
          { id: 'hotel', label: 'Check in near Wenchang / Gaolong Bay', kind: 'admin', minutes: 45, confidence: 'assumption' },
        ],
        note: 'The timeline shows the outbound journey only, like every other option. After the launch: stay in the Wenchang / Gaolong Bay area one more night, drive south to Wanning or Lingshui (~2 h, toll-free expressway), spend the remaining days at the beach, then drive to SYX and drop the car — the one-way rental means the order can be changed freely, including a second run north if the launch slips.',
      },
    ],
    practical: [
      { label: 'Child seats', value: 'Reserve at HAK on booking, or check ours in', tone: 'warn' },
      { label: 'Luggage', value: 'Flown, but only handled twice', tone: 'neutral' },
      { label: 'Launch-day drive', value: '~40 min from a Wenchang-area hotel', tone: 'good' },
      { label: 'One-way fee', value: 'Extra cost, but it buys back a day of driving', tone: 'neutral' },
      { label: 'Return flight', value: 'SYX → XMN, usually a little pricier than HAK', tone: 'neutral' },
    ],
    pros: [
      'No backtracking: north for the launch, south for the beach, home from Sanya',
      'Short outbound flight, and the launch is only ~100 km from the arrival airport',
      'The car makes the whole middle of the trip rearrangeable if the launch slips',
      'Two Hainan airports to fall back on if one has cancellations',
      'Matches the recommended six-night itinerary exactly',
    ],
    cons: [
      'One-way drop-off fee, and a more expensive Sanya departure',
      'The same airline baggage pressure as the other flying options',
      'Infant car seats still need to be reserved explicitly',
    ],
    legs: [
      { id: 'e1', fromId: 'xiamen', toId: 'xmn', label: 'Home → XMN airport', mode: 'taxi', distance: '~12 km', duration: '~30 min' },
      { id: 'e2', fromId: 'xmn', toId: 'hak', label: 'Flight XMN → HAK', mode: 'plane', distance: '~880 km', duration: '~1 h 40 m' },
      { id: 'e3', fromId: 'hak', toId: 'wenchang', label: 'Rental car HAK → Wenchang', mode: 'car', distance: '~100 km', duration: '~1 h 30 m' },
      { id: 'e4', fromId: 'wenchang', toId: 'longlou', label: 'Launch viewing at Longlou', mode: 'car', distance: '~40 km', duration: '~40 min' },
      { id: 'e5', fromId: 'wenchang', toId: 'wanning', label: 'South to Wanning / Shimei Bay', mode: 'car', distance: '~110 km', duration: '~1 h 30 m' },
      { id: 'e6', fromId: 'wanning', toId: 'syx', label: 'Continue to Sanya, drop the car', mode: 'car', distance: '~140 km', duration: '~2 h' },
      { id: 'e7', fromId: 'syx', toId: 'xiamen', label: 'Flight SYX → XMN', mode: 'plane', distance: '~1,100 km', duration: '~2 h 35 m' },
    ],
    contingencies: [
      'Launch slips by 1–2 days: stay north an extra night and compress the southern stay — the one-way car makes this free to change.',
      'Launch slips by more: reverse the order, relax south first, drive back north for the new window, and fly out of HAK by re-pricing the return leg.',
      'Flight home cancelled: HAK is about three hours away; a one-way rental makes switching airports possible at short notice.',
    ],
    confidence: 'estimate',
  },
];
