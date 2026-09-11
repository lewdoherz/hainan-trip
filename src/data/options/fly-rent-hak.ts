import type { TransportOption } from '../types';

/** Option B. Prose lives here; every number comes from the assumptions. */
export const FLY_RENT_HAK: TransportOption = {
  id: 'fly-rent-hak',
  name: { en: 'Fly + rent', zh: '飞机 + 租车' },
  subtitle: { en: 'XMN → Haikou (HAK), then a rental car', zh: '厦门 XMN → 海口（HAK），再租车自驾' },
  cnName: '飞机到海口 + 租车',
  modeLabel: { en: 'Fly + rent', zh: '飞机 + 租车' },
  vehicle: { en: 'Rental car (Haikou)', zh: '租车（海口）' },
  accent: '#c2553f',
  tagline: { en: 'A ~1 h 40 m flight, then Wenchang is barely 1.5 hours up the coast.', zh: '约 1 小时 40 分的航程，之后沿东海岸开不到 1.5 小时就到文昌。' },
  verdict:
    { en: 'Haikou is the right airport: the flight from Xiamen takes 1 h 40 m – 2 h 25 m with 19 weekly departures across Xiamen Airlines, Hainan Airlines and China Southern, the airport has its own HSR station for a 10-minute run to Haikou East, and Wenchang is ~100 km up the toll-free east-coast expressway. The whole outbound journey becomes one morning instead of two or three days. The price is luggage: two child seats, a stroller and a cot become a baggage problem rather than a boot full of stuff.', zh: '海口是最合适的机场：从厦门出发的航班飞行 1 小时 40 分至 2 小时 25 分，每周 19 班，由厦门航空、海南航空和南方航空执飞；机场自带高铁站，到海口东站只需 10 分钟；文昌就在约 100 公里外的东海岸高速沿线，全程免过路费。整段去程只需一个上午，而不是两三天。代价在行李：两个儿童安全座椅、一辆婴儿车和一张婴儿床，都变成了托运行李的难题，而不是塞满后备箱的轻松。' },
  transfers: 3,
  staticScores: {
    family: {
      score: 88,
      why: { en: 'A ~1 h 40 m flight fits inside a nap window and the family is at the hotel by mid-afternoon. The friction is the airport (check-in, security, gate-checked stroller) and the rental counter — but an 8-month-old on a lap and a 3-year-old with a tablet handle two hours far better than two days of driving.', zh: '约 1 小时 40 分的航程正好落在一个午睡时段里，一家人下午三四点前就能到酒店。麻烦在于机场（值机、安检、登机口托运婴儿车）和租车柜台——但让 8 个月大的宝宝坐在腿上、3 岁的孩子拿着平板，熬两个小时，比开两天车要好得多。' },
    },
    reliability: {
      score: 78,
      why: { en: 'Roughly seven XMN → HAK departures a day means a cancellation can usually be absorbed the same day. Typhoons still ground aircraft, but airports recover faster than ferry ports and there are more fallbacks than the drive or rail options.', zh: '厦门 → 海口每天约有 7 个航班，航班取消通常当天就能改签消化。台风仍会导致停飞，但机场恢复得比渡轮码头快，可替代的选择也比自驾或火车更多。' },
    },
    transfers: {
      score: 48,
      why: { en: 'Three hand-overs: home to airport, aircraft to carousel to rental desk, then car to hotel. Each one means moving two children, a stroller and four bags.', zh: '三次交接：从家到机场、从飞机到行李转盘再到租车柜台、最后从车到酒店。每一次都要搬动两个孩子、一辆婴儿车和四件行李。' },
    },
    mobility: {
      score: 88,
      why: { en: 'A rental car collected at the airport gives nearly the freedom of our own car, minus our own child seats and with a drop-off deadline. One-way HAK → SYX is available if we want to end in the south.', zh: '在机场取到的租车几乎有着和自家车一样的自由度，只是没有自己的儿童座椅，而且有还车时限。如果想在南边结束行程，可以异地还车，从海口 HAK 开到三亚 SYX。' },
    },
    luggage: {
      score: 54,
      why: { en: 'The real weak point: checked allowances plus a stroller plus car seats and a cot. Bringing our own seats is possible but bulky, and may need an extra checked bag.', zh: '真正的短板：托运行李额度之外，还要加上婴儿车、儿童座椅和婴儿床。自带座椅可行，但很占地方，可能还需要额外买一件托运行李。' },
    },
    stress: {
      score: 84,
      why: { en: 'One travel morning, no driving fatigue, and two clear days before the launch. The residual stress is airport logistics with a baby and a delayed flight eating the buffer.', zh: '只需一个上午赶路，没有驾驶疲劳，发射前还有整整两天。剩下的压力来自带婴儿的机场流程，以及航班延误吃掉预留的缓冲时间。' },
    },
  },
  costLines: (a) => {
    const parkingDays = a.tripNightsHainan + 1;
    return [
      {
        id: 'air-adults',
        label: { en: 'Airfare · 2 adults (return)', zh: '机票 · 2 名成人（往返）' },
        amount: a.adultsCount * 2 * a.airAdult,
        drivenBy: ['adultsCount', 'airAdult'],
        confidence: 'estimate',
        note: { en: 'Fares swing widely and near a launch date they move fast — check live prices for the exact dates.', zh: '票价波动很大，临近发射日期时涨得更快——请按具体出行日期查询实时价格。' },
      },
      {
        id: 'air-child',
        label: { en: 'Airfare · 3-year-old (return, child fare)', zh: '机票 · 3 岁儿童（往返，儿童票）' },
        amount: 2 * a.airAdult * a.airChildRatio,
        drivenBy: ['airAdult', 'airChildRatio'],
        confidence: 'verified',
        note: { en: 'Chinese carriers charge a child with their own seat roughly half the adult fare, plus surcharges.', zh: '国内航空公司对占用独立座位的儿童大约按成人票价的一半收费，另加附加费。' },
      },
      {
        id: 'air-infant',
        label: { en: 'Airfare · 8-month-old (return, lap infant)', zh: '机票 · 8 个月婴儿（往返，怀抱婴儿）' },
        amount: 2 * a.airInfantFee,
        drivenBy: ['airInfantFee'],
        confidence: 'estimate',
        note: { en: 'Lap infants are charged a small percentage of the adult fare plus surcharges. An infant seat can be booked instead if we want the space.', zh: '怀抱婴儿按成人票价的一小部分收费，另加附加费。如果想要更多空间，也可以改订婴儿占座票。' },
      },
      {
        id: 'parking',
        label: { en: `Airport parking · ${parkingDays} days (if we leave the car)`, zh: `机场停车 · ${parkingDays} 天（如果我们把车留在机场）` },
        amount: a.airportParkingPerDay * parkingDays * a.parkAtAirport,
        drivenBy: ['airportParkingPerDay', 'parkAtAirport', 'tripNightsHainan'],
        confidence: 'estimate',
      },
      {
        id: 'taxis',
        label: { en: 'Taxis · home ↔ XMN (return, if we do not park)', zh: '出租车 · 家 ↔ 厦门机场 XMN（往返，如果不开车去机场）' },
        amount: 2 * a.taxiToAirport * (1 - a.parkAtAirport),
        drivenBy: ['taxiToAirport', 'parkAtAirport'],
        confidence: 'estimate',
      },
      {
        id: 'rental',
        label: { en: `Rental car · ${a.rentalDays} days`, zh: `租车 · ${a.rentalDays} 天` },
        amount: a.rentalDaily * a.rentalDays,
        drivenBy: ['rentalDaily', 'rentalDays'],
        confidence: 'estimate',
        note: { en: 'Mid-size SUV or MPV with room for two child seats and the luggage.', zh: '中型 SUV 或 MPV，能放下两个儿童座椅和全部行李。' },
      },
      {
        id: 'child-seats',
        label: { en: 'Child seat rental (unless we bring ours)', zh: '儿童座椅租赁（除非我们自带）' },
        amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
        drivenBy: ['childSeatPerDay', 'childSeats', 'rentalDays', 'bringOwnSeats'],
        confidence: 'estimate',
        note: { en: 'Book the infant carrier explicitly — Hainan desks do not reliably hold them, and a rear-facing seat for an 8-month-old is not something to improvise.', zh: '婴儿提篮务必单独预订——海南的租车柜台不一定备有，8 个月大婴儿用的反向安装座椅更不能临时将就。' },
      },
      {
        id: 'bags',
        label: { en: 'Extra checked baggage (return)', zh: '额外托运行李（往返）' },
        amount: 2 * a.checkedBagFee,
        drivenBy: ['checkedBagFee'],
        confidence: 'assumption',
        note: { en: 'Set this above zero if our own seats or the cot push us past the free allowance.', zh: '如果自带座椅或婴儿床超出免费额度，就把这一项设为大于零。' },
      },
      {
        id: 'rental-fuel',
        label: { en: 'Petrol in Hainan', zh: '海南油费' },
        amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan,
        drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'],
        confidence: 'estimate',
        note: { en: 'No tolls on Hainan, but the fuel carries the levy.', zh: '海南不收过路费，但燃油里含附加费。' },
      },
      {
        id: 'oneway',
        label: { en: 'One-way drop-off fee (if returning from another city)', zh: '异地还车费（如果从其他城市还车）' },
        amount: a.rentalOneWayFee * a.rentalOneWay,
        drivenBy: ['rentalOneWayFee', 'rentalOneWay'],
        confidence: 'estimate',
      },
    ];
  },
  timeline: [
    {
      id: 'fly-out',
      label: { en: 'Travel day · Xiamen → Wenchang', zh: '出行日 · 厦门 → 文昌' },
      sublabel: { en: 'One morning, one flight', zh: '一个上午，一班飞机' },
      start: '07:30',
      segments: [
        { id: 'home-car', label: { en: 'Leave home for XMN', zh: '从家出发去厦门机场 XMN' }, detail: { en: 'Taxi, or our car to the airport car park.', zh: '打车，或者开自家车到机场停车场。' }, kind: 'travel', minutes: { assumption: 'homeToXmn' }, confidence: 'assumption' },
        { id: 'checkin', label: { en: 'Check-in, bags, security, stroller', zh: '值机、托运、安检、婴儿车' }, detail: { en: 'Gate-check the stroller and carry the baby in a sling through security.', zh: '婴儿车在登机口托运，过安检时用背带抱着宝宝。' }, kind: 'admin', minutes: { assumption: 'xmnAirportLead' }, confidence: 'estimate' },
        { id: 'flight', label: { en: 'Flight XMN → HAK', zh: '航班 XMN → HAK' }, detail: { en: 'About seven departures a day; pick a mid-morning slot.', zh: '每天约 7 个航班；选上午偏中间的时段。' }, kind: 'travel', minutes: { assumption: 'flightBlockXmnHak' }, confidence: 'verified', note: { en: 'Nothing before 08:00 with an 8-month-old, and we want daylight at both ends of the day.', zh: '带着 8 个月大的宝宝，不要选 08:00 之前的航班，而且我们希望两头都是白天。' } },
        { id: 'bags', label: { en: 'Land, collect stroller and bags', zh: '落地，取婴儿车和行李' }, detail: { en: 'Baby changing room before leaving the terminal.', zh: '离开航站楼前先去母婴室换尿布。' }, kind: 'wait', minutes: { assumption: 'baggageWait' }, confidence: 'estimate' },
        { id: 'rental', label: { en: 'Collect the rental car', zh: '取租车' }, detail: { en: 'Shuttle to the lot, paperwork, fit and check both child seats before driving off.', zh: '坐摆渡车到停车场，办手续，出发前装好并检查两个儿童座椅。' }, kind: 'admin', minutes: { assumption: 'rentalPickup' }, confidence: 'estimate' },
        { id: 'drive-wc', label: { en: 'Drive HAK → Wenchang', zh: '自驾 HAK → 文昌' }, detail: { en: 'East-coast expressway, toll-free on the island.', zh: '走东海岸高速，岛内免过路费。' }, kind: 'travel', minutes: { assumption: 'hakToWenchang' }, confidence: 'estimate' },
        { id: 'hotel', label: { en: 'Check in, unpack, beach or pool', zh: '入住、收拾行李、去海滩或泳池' }, detail: { en: 'Half the afternoon left — the children get to swim.', zh: '下午还剩一半——孩子们可以游泳。' }, kind: 'admin', minutes: 45, confidence: 'assumption' },
      ],
      note: { en: 'The return mirrors this: drop the car ~2 h before departure, fly, taxi home. HAK also has its own HSR station (美兰站, 10 min to Haikou East, 22 trains a day) if we ever want to do a leg without the car.', zh: '回程与此相同：起飞前约 2 小时还车、乘飞机、打车回家。海口美兰机场也自带高铁站（美兰站，到海口东站 10 分钟，每天 22 班），如果哪一段不想开车，可以改乘高铁。' },
    },
  ],
  practical: [
    { label: { en: 'Child seats', zh: '儿童座椅' }, value: { en: 'Reserve an infant carrier at booking, or check our own in', zh: '预订时预约婴儿提篮，或者托运我们自己的座椅' }, tone: 'warn' },
    { label: { en: 'Luggage', zh: '行李' }, value: { en: 'Allowance-limited; stroller + cot + seats is a squeeze', zh: '受免费额度限制；婴儿车 + 婴儿床 + 座椅会比较紧张' }, tone: 'warn' },
    { label: { en: 'Transfers', zh: '交接次数' }, value: { en: '3 (home→airport, airport→car, car→hotel)', zh: '3 次（家→机场、机场→车、车→酒店）' }, tone: 'neutral' },
    { label: { en: 'Arrival condition', zh: '抵达状态' }, value: { en: 'Rested, with two clear days before the launch', zh: '精力充沛，发射前还有整整两天' }, tone: 'good' },
    { label: { en: 'Airport → Wenchang', zh: '机场 → 文昌' }, value: { en: '~100 km, 1.5 h by car; 10-min HSR to Haikou East', zh: '约 100 公里，开车 1.5 小时；乘高铁 10 分钟到海口东站' }, tone: 'good' },
    { label: { en: 'Flights', zh: '航班' }, value: { en: '19 weekly: Xiamen Airlines 8, Hainan Airlines 7, China Southern 4', zh: '每周 19 班：厦门航空 8 班、海南航空 7 班、南方航空 4 班' }, tone: 'good' },
    { label: { en: 'Baggage', zh: '行李额度' }, value: { en: '20 kg each for adults and children; one folding stroller free, even for the infant', zh: '成人和儿童每人 20 公斤；可免费携带一辆折叠婴儿车，婴儿也算' }, tone: 'neutral' },
    { label: { en: 'Excess baggage', zh: '超重行李' }, value: { en: 'About ¥25/kg on this distance band — set the extra-bag line in Costs if needed', zh: '这一距离区间约 ¥25/公斤——如有需要，在费用里调整额外行李那一项' }, tone: 'warn' },
  ],
  pros: [
    { en: 'The outbound journey is one morning instead of two or three days', zh: '去程只需一个上午，而不是两三天' },
    { en: 'Parents arrive rested, two days before an 08:30 launch', zh: '父母抵达时精力充沛，距 08:30 发射还有两天' },
    { en: 'HAK is the correct airport for Wenchang: the closest, with flights spread through the day', zh: '海口 HAK 是去文昌最合适的机场：距离最近，航班全天都有' },
    { en: 'A rental car from the airport keeps island freedom, including one-way HAK → SYX', zh: '在机场租车保留了岛上的自由度，还可以异地还车走 HAK → SYX' },
    { en: '~7 daily departures mean a cancellation can often be absorbed the same day', zh: '每天约 7 个航班，取消通常当天就能改签消化' },
  ],
  cons: [
    { en: 'Two child seats, a stroller, a cot and all luggage have to fly', zh: '两个儿童座椅、一辆婴儿车、一张婴儿床和全部行李都得随机托运' },
    { en: 'Child and infant tickets add up, and fares near a launch date can spike', zh: '儿童票和婴儿票加起来不少，临近发射日期票价还可能大涨' },
    { en: 'Airport and rental-counter handling with a baby is its own kind of tiring', zh: '带着婴儿在机场和租车柜台之间折腾，本身就是一种消耗' },
    { en: 'Infant car-seat availability in Hainan is not guaranteed — book it explicitly or bring ours', zh: '海南的婴儿安全座椅不一定有货——务必单独预订，或者自带' },
    { en: 'One-way rentals across the island carry a drop-off fee', zh: '环岛异地还车要收异地还车费' },
  ],
  legs: [
    { id: 'b1', fromId: 'xiamen', toId: 'xmn', label: { en: 'Home → XMN airport', zh: '家 → 厦门机场 XMN' }, mode: 'taxi', distance: { en: '~12 km', zh: '约 12 公里' }, duration: { en: '~30 min', zh: '约 30 分钟' } },
    { id: 'b2', fromId: 'xmn', toId: 'hak', label: { en: 'Flight XMN → HAK', zh: '航班 XMN → HAK' }, mode: 'plane', distance: { en: '~880 km', zh: '约 880 公里' }, duration: { en: '~1 h 40 m', zh: '约 1 小时 40 分' } },
    { id: 'b3', fromId: 'hak', toId: 'wenchang', label: { en: 'Rental car HAK → Wenchang', zh: '租车自驾 HAK → 文昌' }, mode: 'car', distance: { en: '~100 km', zh: '约 100 公里' }, duration: { en: '~1 h 30 m', zh: '约 1 小时 30 分' } },
    { id: 'b4', fromId: 'wenchang', toId: 'longlou', label: { en: 'Wenchang → Longlou (launch viewing)', zh: '文昌 → 龙楼镇（看发射）' }, mode: 'car', distance: { en: '~40 km', zh: '约 40 公里' }, duration: { en: '~40 min', zh: '约 40 分钟' } },
  ],
  contingencies: [
    { en: 'Flight cancelled: the airline rebooks on the next XMN → HAK departure. Travelling on the 15th for a 17th launch gives a full buffer day.', zh: '航班取消：航空公司会改签到下一班厦门 → 海口的航班。15 日出发、17 日发射，就有一整天的缓冲。' },
    { en: 'Launch slips: the rental car means we can extend and move anywhere on the island without rebooking transport.', zh: '发射推迟：有租车在手，我们可以续租，在岛上想去哪就去哪，不用重新订交通。' },
    { en: 'Stroller or bags delayed: buy a cheap stroller in Haikou rather than waiting at the airport — they are widely available.', zh: '婴儿车或行李晚到：与其在机场干等，不如在海口买一辆便宜的婴儿车——到处都能买到。' },
    { en: 'HAK sold out or absurdly priced: the same plan works into Sanya with a three-hour drive. Boao (BAR) is closest to Wenchang, but it has had no direct Xiamen service since Hebei Airlines withdrew in January 2023, so it is not a real alternative.', zh: '海口 HAK 没票或价格离谱：同样的方案也可以飞到三亚，再多开三个小时车。博鳌（BAR）离文昌最近，但自 2023 年 1 月河北航空退出后就没有厦门直飞航班了，所以算不上真正的备选。' },
  ],
  confidence: 'estimate',
};
