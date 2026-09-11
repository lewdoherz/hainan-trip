import type { TransportOption } from '../types';

/** Option E. Prose lives here; every number comes from the assumptions. */
export const FLY_IN_OUT: TransportOption = {
  id: 'fly-in-out',
  name: { en: 'Fly in to Haikou, out of Sanya', zh: '飞抵海口，从三亚返程' },
  subtitle: { en: 'One-way rental — launch north, relax south', zh: '异地还车 —— 北边看发射，南边享度假' },
  cnName: '海口进 / 三亚出 + 异地还车',
  modeLabel: { en: 'Fly + one-way rent', zh: '飞机 + 异地还车' },
  vehicle: { en: 'Rental car (HAK → SYX)', zh: '租车（HAK → SYX）' },
  accent: '#2f7f8f',
  tagline: { en: 'No backtracking: launch in the north, then drift south down the coast to fly home.', zh: '不走回头路：在北边看完发射，再沿着海岸一路南下，最后坐飞机回家。' },
  verdict:
    { en: 'The best-fitting shape for a 5–7 day trip that has to serve both the launch and a holiday. Fly into Haikou, stay north for the launch, then drive south to Wanning or Sanya and fly home from SYX. It costs a one-way rental fee but removes both the pre-dawn drive of the Sanya-only plan and the pointless drive back north at the end.', zh: '对既要看发射、又要度假的 5–7 天行程来说，这是最合适的方案。飞抵海口，在北部看完发射，再一路南下到万宁或三亚，从 SYX 飞回家。虽然要付一笔异地还车费，但既免去了“只飞三亚”方案凌晨摸黑赶路之苦，也省掉了最后那段毫无意义的北上返程。' },
  transfers: 3,
  staticScores: {
    family: {
      score: 85,
      why: { en: 'The same short first flight as the Haikou plan, but the trip flows in one direction: no long drive on launch morning and no backtrack at the end. Days 5–7 are pure beach with a car already packed.', zh: '第一段航程和“海口方案”一样短，但整趟行程是单向推进：发射当天早上不用长途赶路，结束时也不用折返。第 5–7 天纯粹泡海滩，车早已收拾妥当。' },
    },
    reliability: {
      score: 78,
      why: { en: 'Two airports to rebook from, and the car makes the middle of the trip flexible if the launch moves. The one-way rental agreement is the only rigid element.', zh: '有两个机场可以改签，万一发射时间变动，有车也让行程中段更灵活。唯一的硬性约束是异地还车协议。' },
    },
    transfers: {
      score: 48,
      why: { en: 'Three hand-overs out and three back, but no duplicated north–south driving to add fatigue.', zh: '去程三次交接，回程三次，但不会有南北往返的重复驾驶额外增加疲劳。' },
    },
    mobility: {
      score: 92,
      why: { en: 'The most freedom of the flying options: the whole island becomes a one-way drive, and the itinerary can be reshuffled without re-booking transport.', zh: '所有飞机方案里自由度最高的：全岛就是一段单向自驾，行程可以随意重排，无需重新订交通。' },
    },
    luggage: {
      score: 55,
      why: { en: 'The same airline baggage pressure, though a mid-trip stop lets us leave gear at the hotel rather than carrying it.', zh: '航空行李的压力和其他方案一样，不过中途落脚可以把装备留在酒店，不必一路背着。' },
    },
    stress: {
      score: 82,
      why: { en: 'One travel morning each way, both airports close to the coast road, and launch day spent 40 minutes from the pad rather than three hours away.', zh: '往返各只有一个赶路的早晨，两个机场都紧邻滨海公路，发射当天离发射台只有 40 分钟车程，而不是三个小时。' },
    },
  },
  costLines: (a) => {
    const parkingDays = a.tripNightsHainan + 1;
    return [
      { id: 'air-out-adults', label: { en: 'Airfare · 2 adults XMN → HAK (outbound)', zh: '机票 · 2 名成人 XMN → HAK（去程）' }, amount: a.adultsCount * a.airAdult, drivenBy: ['adultsCount', 'airAdult'], confidence: 'estimate' },
      {
        id: 'air-back-adults',
        label: { en: 'Airfare · 2 adults SYX → XMN (return)', zh: '机票 · 2 名成人 SYX → XMN（返程）' },
        amount: a.adultsCount * a.airAdultSanya,
        drivenBy: ['adultsCount', 'airAdultSanya'],
        confidence: 'estimate',
        note: { en: 'Flying home from Sanya usually costs a little more than from Haikou.', zh: '从三亚飞回通常比从海口出发略贵一些。' },
      },
      { id: 'air-child', label: { en: 'Airfare · 3-year-old (both directions, child fare)', zh: '机票 · 3 岁儿童（往返双程，儿童票）' }, amount: (a.airAdult + a.airAdultSanya) * a.airChildRatio, drivenBy: ['airAdult', 'airAdultSanya', 'airChildRatio'], confidence: 'verified' },
      { id: 'air-infant', label: { en: 'Airfare · 8-month-old (both directions, lap infant)', zh: '机票 · 8 个月婴儿（往返双程，不占座婴儿票）' }, amount: 2 * a.airInfantFee, drivenBy: ['airInfantFee'], confidence: 'estimate' },
      {
        id: 'parking',
        label: { en: `Airport parking · ${parkingDays} days (if we leave the car at XMN)`, zh: `机场停车 · ${parkingDays} 天（若把车留在 XMN）` },
        amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
        drivenBy: ['airportParkingPerDay', 'parkAtAirport'],
        confidence: 'estimate',
      },
      {
        id: 'taxis',
        label: { en: 'Taxis · home ↔ XMN (return, if we do not park)', zh: '出租车 · 家 ↔ XMN（往返，若不在机场停车）' },
        amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
        drivenBy: ['taxiToAirport', 'parkAtAirport'],
        confidence: 'estimate',
      },
      { id: 'rental', label: { en: `Rental car · ${a.rentalDays} days (one-way HAK → SYX)`, zh: `租车 · ${a.rentalDays} 天（异地还车 HAK → SYX）` }, amount: a.rentalDaily * a.rentalDays, drivenBy: ['rentalDaily', 'rentalDays'], confidence: 'estimate' },
      {
        id: 'oneway',
        label: { en: 'One-way drop-off fee (HAK pick-up, SYX drop-off)', zh: '异地还车费（HAK 提车，SYX 还车）' },
        amount: a.rentalOneWayFee,
        drivenBy: ['rentalOneWayFee'],
        confidence: 'estimate',
        note: { en: 'The price of not driving back north. Often ¥300–800; confirm with the rental company.', zh: '这是免去北上返程所付的代价。通常为 ¥300–800，请与租车公司确认。' },
      },
      {
        id: 'child-seats',
        label: { en: 'Child seat rental (unless we bring ours)', zh: '儿童座椅租赁（除非自带）' },
        amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
        drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
        confidence: 'estimate',
      },
      { id: 'bags', label: { en: 'Extra checked baggage (return)', zh: '额外托运行李（返程）' }, amount: 2 * a.checkedBagFee, drivenBy: ['checkedBagFee'], confidence: 'assumption' },
      { id: 'rental-fuel', label: { en: 'Petrol in Hainan (north → south drive)', zh: '海南境内油费（北→南自驾）' }, amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan, drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'], confidence: 'estimate' },
    ];
  },
  timeline: [
    {
      id: 'out',
      label: { en: 'Outbound · Xiamen → Haikou → Wenchang', zh: '去程 · 厦门 → 海口 → 文昌' },
      start: '07:30',
      segments: [
        { id: 'home', label: { en: 'Leave home for XMN', zh: '出发前往 XMN' }, kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
        { id: 'checkin', label: { en: 'Check-in, security, stroller', zh: '值机、安检、婴儿车' }, kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
        { id: 'flight', label: { en: 'Flight XMN → HAK', zh: '航班 XMN → HAK' }, kind: 'travel', minutes: { assumption: 'flightBlockXmnHak' }, confidence: 'verified' },
        { id: 'bags', label: { en: 'Land, collect bags', zh: '落地，提取行李' }, kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
        { id: 'rental', label: { en: 'Collect the one-way rental car', zh: '提取异地还车的租赁车辆' }, kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
        { id: 'drive', label: { en: 'Drive HAK → Wenchang', zh: '驾车 HAK → 文昌' }, kind: 'travel', minutes: { assumption: 'hakToWenchang' }, confidence: 'estimate' },
        { id: 'hotel', label: { en: 'Check in near Wenchang / Gaolong Bay', zh: '入住文昌 / 高隆湾附近酒店' }, kind: 'admin', minutes: 45, confidence: 'assumption' },
      ],
      note: { en: 'The timeline shows the outbound journey only, like every other option. After the launch: stay in the Wenchang / Gaolong Bay area one more night, drive south to Wanning or Lingshui (~2 h, toll-free expressway), spend the remaining days at the beach, then drive to SYX and drop the car — the one-way rental means the order can be changed freely, including a second run north if the launch slips.', zh: '和其他方案一样，时间轴只展示去程。发射之后：在文昌 / 高隆湾一带再住一晚，南下前往万宁或陵水（约 2 小时，高速免费），剩下的日子泡在海滩，然后驾车前往 SYX 还车 —— 因为是异地还车，顺序可以随意调整，包括发射推迟时再北上跑一趟。' },
    },
  ],
  practical: [
    { label: { en: 'Child seats', zh: '儿童座椅' }, value: { en: 'Reserve at HAK on booking, or check ours in', zh: '预订时在 HAK 预订，或把我们自己的托运' }, tone: 'warn' },
    { label: { en: 'Luggage', zh: '行李' }, value: { en: 'Flown, but only handled twice', zh: '随机托运，但全程只需搬运两次' }, tone: 'neutral' },
    { label: { en: 'Launch-day drive', zh: '发射当天车程' }, value: { en: '~40 min from a Wenchang-area hotel', zh: '距文昌一带酒店约 40 分钟' }, tone: 'good' },
    { label: { en: 'One-way fee', zh: '异地还车费' }, value: { en: 'Extra cost, but it buys back a day of driving', zh: '额外支出，但省回一天的驾驶' }, tone: 'neutral' },
    { label: { en: 'Return flight', zh: '返程航班' }, value: { en: 'SYX → XMN, usually a little pricier than HAK', zh: 'SYX → XMN，通常比从 HAK 出发略贵' }, tone: 'neutral' },
  ],
  pros: [
    { en: 'No backtracking: north for the launch, south for the beach, home from Sanya', zh: '不走回头路：北边看发射，南边泡海滩，从三亚回家' },
    { en: 'Short outbound flight, and the launch is only ~100 km from the arrival airport', zh: '去程航班短，发射场距抵达机场仅约 100 公里' },
    { en: 'The car makes the whole middle of the trip rearrangeable if the launch slips', zh: '万一发射推迟，有车就能把行程中段整体重排' },
    { en: 'Two Hainan airports to fall back on if one has cancellations', zh: '海南有两个机场，其中一个取消航班时还有另一个可选' },
    { en: 'Matches the recommended six-night itinerary exactly', zh: '与推荐的六晚行程完全吻合' },
  ],
  cons: [
    { en: 'One-way drop-off fee, and a more expensive Sanya departure', zh: '需付异地还车费，且从三亚出发的机票更贵' },
    { en: 'The same airline baggage pressure as the other flying options', zh: '和其他飞机方案一样有航空行李的压力' },
    { en: 'Infant car seats still need to be reserved explicitly', zh: '婴儿安全座椅仍需单独预订' },
  ],
  legs: [
    { id: 'e1', fromId: 'xiamen', toId: 'xmn', label: { en: 'Home → XMN airport', zh: '家 → XMN 机场' }, mode: 'taxi', distance: { en: '~12 km', zh: '约 12 公里' }, duration: { en: '~30 min', zh: '约 30 分钟' } },
    { id: 'e2', fromId: 'xmn', toId: 'hak', label: { en: 'Flight XMN → HAK', zh: '航班 XMN → HAK' }, mode: 'plane', distance: { en: '~880 km', zh: '约 880 公里' }, duration: { en: '~1 h 40 m', zh: '约 1 小时 40 分' } },
    { id: 'e3', fromId: 'hak', toId: 'wenchang', label: { en: 'Rental car HAK → Wenchang', zh: '租车自驾 HAK → 文昌' }, mode: 'car', distance: { en: '~100 km', zh: '约 100 公里' }, duration: { en: '~1 h 30 m', zh: '约 1 小时 30 分' } },
    { id: 'e4', fromId: 'wenchang', toId: 'longlou', label: { en: 'Launch viewing at Longlou', zh: '在龙楼镇观看发射' }, mode: 'car', distance: { en: '~40 km', zh: '约 40 公里' }, duration: { en: '~40 min', zh: '约 40 分钟' } },
    { id: 'e5', fromId: 'wenchang', toId: 'wanning', label: { en: 'South to Wanning / Shimei Bay', zh: '南下万宁 / 石梅湾' }, mode: 'car', distance: { en: '~110 km', zh: '约 110 公里' }, duration: { en: '~1 h 30 m', zh: '约 1 小时 30 分' } },
    { id: 'e6', fromId: 'wanning', toId: 'syx', label: { en: 'Continue to Sanya, drop the car', zh: '继续前往三亚，还车' }, mode: 'car', distance: { en: '~140 km', zh: '约 140 公里' }, duration: { en: '~2 h', zh: '约 2 小时' } },
    { id: 'e7', fromId: 'syx', toId: 'xiamen', label: { en: 'Flight SYX → XMN', zh: '航班 SYX → XMN' }, mode: 'plane', distance: { en: '~1,100 km', zh: '约 1,100 公里' }, duration: { en: '~2 h 35 m', zh: '约 2 小时 35 分' } },
  ],
  contingencies: [
    { en: 'Launch slips by 1–2 days: stay north an extra night and compress the southern stay — the one-way car makes this free to change.', zh: '发射推迟 1–2 天：在北部多住一晚，压缩南部的停留 —— 异地还车让改行程无需额外代价。' },
    { en: 'Launch slips by more: reverse the order, relax south first, drive back north for the new window, and fly out of HAK by re-pricing the return leg.', zh: '发射推迟更久：调换顺序，先去南部度假，等新的时间窗口确定后再北上，并重新询价返程航段，改从 HAK 飞回。' },
    { en: 'Flight home cancelled: HAK is about three hours away; a one-way rental makes switching airports possible at short notice.', zh: '返程航班取消：HAK 距此约三小时车程；异地租车让我们可以临时改换机场。' },
  ],
  confidence: 'estimate',
};
