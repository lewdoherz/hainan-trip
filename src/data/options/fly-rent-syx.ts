import type { TransportOption } from '../types';

/** Option C. Prose lives here; every number comes from the assumptions. */
export const FLY_RENT_SYX: TransportOption = {
  id: 'fly-rent-syx',
  name: { en: 'Fly to Sanya + rent', zh: '飞往三亚 + 租车' },
  subtitle: { en: 'XMN → SYX, then a 3-hour drive north', zh: 'XMN → SYX，随后向北自驾 3 小时' },
  cnName: '飞机到三亚 + 租车',
  modeLabel: { en: 'Fly + rent', zh: '飞机 + 租车' },
  vehicle: { en: 'Rental car (Sanya)', zh: '租车（三亚取车）' },
  accent: '#d99b34',
  tagline: { en: 'Best resorts, worst geography — and a thinner flight schedule.', zh: '度假村最好，地理位置最差——而且航班也更少。' },
  verdict: {
    en: 'Only worth it if the holiday matters more than the launch. Sanya has the island’s best beaches and family resorts, but it is roughly 250 km and three hours from Wenchang — and the route from Xiamen is flown only by Xiamen Airlines, one or two times a day, which means fewer cheap seats and less resilience than Haikou. Treat it as a holiday-first plan, or as the second half of a two-base trip with a one-way rental.',
    zh: '只有在这趟旅行比看发射更重要时才值得。三亚拥有全岛最好的海滩和亲子度假村，但距离文昌约 250 公里、车程三个小时——而且从厦门出发的航线只有厦门航空执飞，每天一两班，这意味着便宜座位更少、抗风险能力也不如海口。请把它当作以度假为主的方案，或者当作两地住宿行程的后半段，搭配异地还车。',
  },
  transfers: 3,
  staticScores: {
    family: {
      score: 80,
      why: { en: 'The flight is short and the resorts are the most child-friendly on the island, but the 2.5–3.5 h drive north after landing — or before dawn on launch morning — is a real burden with an 8-month-old.', zh: '航程短，度假村也是全岛最适合带小孩的，但落地后向北开 2.5–3.5 小时——或者发射日凌晨摸黑出发——对 8 个月大的宝宝来说是实实在在的负担。' },
    },
    reliability: {
      score: 74,
      why: { en: 'Flights are frequent, but the launch-day drive adds a long, weather-sensitive link on mountain expressways in typhoon season.', zh: '航班频次高，但发射当天还要在台风季沿山区高速开很长一段受天气影响的路程。' },
    },
    transfers: {
      score: 46,
      why: { en: 'Same three hand-overs as the Haikou flight, plus a much longer car leg with a baby.', zh: '和飞海口一样有三次交接，此外还要带着宝宝坐长得多的车程。' },
    },
    mobility: {
      score: 84,
      why: { en: 'Full car freedom once collected, and a one-way SYX → HAK drop-off is possible if we finish in the north.', zh: '取车后用车完全自由；如果最后在岛北结束，还可以 SYX → HAK 异地还车。' },
    },
    luggage: {
      score: 52,
      why: { en: 'Same airline baggage constraints as the Haikou flight.', zh: '行李额限制与飞海口相同。' },
    },
    stress: {
      score: 62,
      why: { en: 'The long drive is the stress, especially at 04:30 on launch morning after an early start.', zh: '主要压力来自长途驾驶，尤其是早起之后、发射日凌晨 04:30 还要开车。' },
    },
  },
  costLines: (a) => {
    const parkingDays = a.tripNightsHainan + 1;
    return [
      {
        id: 'air-adults',
        label: { en: 'Airfare · 2 adults to Sanya (return)', zh: '机票 · 2 名成人飞三亚（往返）' },
        amount: a.adultsCount * 2 * a.airAdultSanya,
        drivenBy: ['adultsCount', 'airAdultSanya'],
        confidence: 'estimate',
        note: { en: 'Sanya is a premium leisure destination; fares usually run above Haikou.', zh: '三亚是高端度假目的地，票价通常高于海口。' },
      },
      { id: 'air-child', label: { en: 'Airfare · 3-year-old (return, child fare)', zh: '机票 · 3 岁儿童（往返，儿童票）' }, amount: 2 * a.airAdultSanya * a.airChildRatio, drivenBy: ['airAdultSanya', 'airChildRatio'], confidence: 'verified' },
      { id: 'air-infant', label: { en: 'Airfare · 8-month-old (return, lap infant)', zh: '机票 · 8 个月婴儿（往返，不占座婴儿票）' }, amount: 2 * a.airInfantFee, drivenBy: ['airInfantFee'], confidence: 'estimate' },
      {
        id: 'parking',
        label: { en: `Airport parking · ${parkingDays} days (if we leave the car)`, zh: `机场停车 · ${parkingDays} 天（如果车留在机场）` },
        amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
        drivenBy: ['airportParkingPerDay', 'parkAtAirport'],
        confidence: 'estimate',
      },
      {
        id: 'taxis',
        label: { en: 'Taxis · home ↔ XMN (return, if we do not park)', zh: '出租车 · 家 ↔ XMN（往返，如果不把车停在机场）' },
        amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
        drivenBy: ['taxiToAirport', 'parkAtAirport'],
        confidence: 'estimate',
      },
      { id: 'rental', label: { en: `Rental car · ${a.rentalDays} days`, zh: `租车 · ${a.rentalDays} 天` }, amount: a.rentalDaily * a.rentalDays, drivenBy: ['rentalDaily', 'rentalDays'], confidence: 'estimate' },
      {
        id: 'child-seats',
        label: { en: 'Child seat rental (unless we bring ours)', zh: '儿童安全座椅租赁（除非我们自己带）' },
        amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
        drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
        confidence: 'estimate',
      },
      { id: 'bags', label: { en: 'Extra checked baggage (return)', zh: '额外托运行李（往返）' }, amount: 2 * a.checkedBagFee, drivenBy: ['checkedBagFee'], confidence: 'assumption' },
      { id: 'rental-fuel', label: { en: 'Petrol in Hainan (extra distance Sanya ↔ Wenchang)', zh: '海南油费（三亚 ↔ 文昌多出的里程）' }, amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan, drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'], confidence: 'estimate' },
      { id: 'oneway', label: { en: 'One-way drop-off fee (if returning from Haikou)', zh: '异地还车费（如果从海口返回）' }, amount: a.rentalOneWayFee * a.rentalOneWay, drivenBy: ['rentalOneWayFee', 'rentalOneWay'], confidence: 'estimate' },
    ];
  },
  timeline: [
    {
      id: 'syx-day',
      label: { en: 'Travel day · Xiamen → Sanya → north', zh: '出行日 · 厦门 → 三亚 → 北上' },
      start: '06:00',
      segments: [
        { id: 'home', label: { en: 'Leave home for XMN', zh: '出发前往 XMN' }, kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
        { id: 'checkin', label: { en: 'Check-in, bags, security', zh: '值机、托运行李、安检' }, kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
        { id: 'flight', label: { en: 'Flight XMN → SYX', zh: '航班 XMN → SYX' }, kind: 'travel', minutes: { assumption: 'flightBlockXmnSyx' }, confidence: 'estimate' },
        { id: 'bags', label: { en: 'Land, collect bags and stroller', zh: '落地，取行李和婴儿车' }, kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
        { id: 'rental', label: { en: 'Collect the rental car', zh: '提取租的车' }, kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
        { id: 'drive', label: { en: 'Drive SYX → Wenchang', zh: '自驾 SYX → 文昌' }, detail: { en: 'Ring-road expressway up the east coast, toll-free.', zh: '沿东海岸的环岛高速北上，免通行费。' }, kind: 'travel', minutes: { assumption: 'syxToWenchang' }, confidence: 'estimate', note: { en: 'Roughly 250 km. This is the leg that makes Sanya a holiday-first choice.', zh: '约 250 公里。正是这段路让三亚成为以度假为先的选择。' } },
        { id: 'hotel', label: { en: 'Check in near Wenchang', zh: '在文昌附近入住' }, kind: 'admin', minutes: 45, confidence: 'assumption' },
      ],
      note: { en: 'The alternative — staying in Sanya and driving up before dawn on launch morning — means leaving at about 04:30 with two small children. We do not recommend it.', zh: '另一种做法——住在三亚、发射日凌晨摸黑开车北上——意味着带着两个小孩大约 04:30 就得出门。我们不推荐。' },
    },
  ],
  practical: [
    { label: { en: 'Child seats', zh: '儿童安全座椅' }, value: { en: 'Rent or check in, as with the Haikou flight', zh: '和飞海口一样，或租或托运' }, tone: 'warn' },
    { label: { en: 'Luggage', zh: '行李' }, value: { en: 'Allowance-limited', zh: '受免费额度限制' }, tone: 'warn' },
    { label: { en: 'Drive to launch', zh: '前往发射场车程' }, value: { en: '~250 km, 2 h 30 m – 3 h 30 m', zh: '约 250 公里，2 小时 30 分 – 3 小时 30 分' }, tone: 'bad' },
    { label: { en: 'Resorts', zh: '度假村' }, value: { en: 'The best on the island for young children', zh: '全岛最适合幼儿的' }, tone: 'good' },
    { label: { en: 'Return options', zh: '返程选择' }, value: { en: 'Fly home from SYX, or drop the car at HAK one-way', zh: '从 SYX 飞回，或在 HAK 异地还车' }, tone: 'neutral' },
  ],
  pros: [
    { en: 'The best beaches and family resorts on the island', zh: '全岛最好的海滩和亲子度假村' },
    { en: 'Direct XMN → SYX flights are available', zh: '有 XMN → SYX 直飞航班' },
    { en: 'Works well as the second half of a two-base trip: launch in the north, relax in the south', zh: '很适合作为两地住宿行程的后半段：在岛北看发射，在岛南放松' },
  ],
  cons: [
    { en: 'Roughly 250 km and three hours from Wenchang — the single biggest drawback', zh: '距文昌约 250 公里、三个小时——这是最大的缺点' },
    { en: 'Sanya fares and hotels are the most expensive in Hainan', zh: '三亚的机票和酒店是海南最贵的' },
    { en: 'Launch morning would start before 05:00 if we sleep in Sanya', zh: '如果住在三亚，发射当天凌晨 05:00 前就得起床出发' },
    { en: 'Duplicates driving if we also stay near Wenchang before the launch', zh: '如果发射前也在文昌附近住宿，这段路就要重复开' },
  ],
  legs: [
    { id: 'c1', fromId: 'xiamen', toId: 'xmn', label: { en: 'Home → XMN airport', zh: '家 → XMN 机场' }, mode: 'taxi', distance: { en: '~12 km', zh: '约 12 公里' }, duration: { en: '~30 min', zh: '约 30 分钟' } },
    { id: 'c2', fromId: 'xmn', toId: 'syx', label: { en: 'Flight XMN → SYX', zh: '航班 XMN → SYX' }, mode: 'plane', distance: { en: '~1,100 km', zh: '约 1,100 公里' }, duration: { en: '~2 h 35 m', zh: '约 2 小时 35 分' } },
    { id: 'c3', fromId: 'syx', toId: 'wenchang', label: { en: 'Rental car SYX → Wenchang', zh: '自驾租车 SYX → 文昌' }, mode: 'car', distance: { en: '~250 km', zh: '约 250 公里' }, duration: { en: '~3 h', zh: '约 3 小时' } },
    { id: 'c4', fromId: 'wenchang', toId: 'longlou', label: { en: 'Wenchang → Longlou (launch viewing)', zh: '文昌 → 龙楼镇（观看发射）' }, mode: 'car', distance: { en: '~40 km', zh: '约 40 公里' }, duration: { en: '~40 min', zh: '约 40 分钟' } },
  ],
  contingencies: [
    { en: 'Launch slips: we are on the island with a car, so hotel nights can shift in either direction.', zh: '发射推迟：我们已经在岛上并有车，酒店住宿可以前后灵活调整。' },
    { en: 'Traffic after the launch: driving back to Sanya the same day is slow — plan a night in Wenchang or Wanning instead.', zh: '发射后交通：当天再开回三亚会很慢——不如改在文昌或万宁住一晚。' },
  ],
  confidence: 'estimate',
};
