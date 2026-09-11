import type { TransportOption } from '../types';

/** Option D. Prose lives here; every number comes from the assumptions. */
export const TRAIN_RENT: TransportOption = {
  id: 'train-rent',
  name: { en: 'Train + sleeper + rent', zh: '火车 + 卧铺 + 租车' },
  subtitle: {
    en: 'HSR to Guangzhou, the Qiongzhou Strait rail-ferry sleeper, rental car in Haikou',
    zh: '高铁到广州，琼州海峡铁路轮渡卧铺，海口租车',
  },
  cnName: '高铁 + 粤海铁路轮渡 + 租车',
  modeLabel: { en: 'Train + rent', zh: '火车 + 租车' },
  vehicle: { en: 'Rental car (Haikou)', zh: '租车（海口）' },
  accent: '#6b5a8e',
  tagline: {
    en: 'An overnight train with beds — 22 hours door to door, but nobody has to drive.',
    zh: '卧铺夜行火车——门到门 22 小时，但不用自己开车。',
  },
  verdict: {
    en: 'There is no through train from Xiamen to Hainan — a live timetable search for 17 September 2026 returns transfer plans only. The realistic chain is Xiamen North → Guangzhou South by HSR, across Guangzhou to Baiyun, then the overnight sleeper that is shunted onto the Qiongzhou Strait rail ferry and arrives at Haikou station in the morning, then a rental car to Wenchang. The sleeper gives the family a four-berth compartment that closes: a real bed for the 8-month-old and no hotel night. The costs are a cross-city transfer, 12+ hours confined with two children, ~30 minutes of the crossing with the power and air-conditioning cut, and sleeper berths that sell out fast.',
    zh: '厦门到海南没有直达列车——实时查询 2026 年 9 月 17 日的时刻表，只有需要换乘的方案。现实可行的链条是：乘高铁从厦门北站到广州南站，穿过广州市区到广州白云站，再乘坐夜间卧铺列车，列车会被分解后装上琼州海峡的铁路轮渡，第二天早上抵达海口站，最后租车前往文昌。卧铺让一家人有一个能关门的四铺包间：8 个月大的宝宝有真正的床，还能省下一晚酒店。代价是跨城换乘、带着两个孩子被困 12 个多小时、过海途中约 30 分钟断电停空调，而且卧铺票很快就卖光。',
  },
  transfers: 3,
  staticScores: {
    family: {
      score: 52,
      why: {
        en: 'A private four-berth compartment with real beds is genuinely good for an infant, and trains have space to walk and a toilet on board. Against it: 12+ hours confined in one small room, a cross-city transfer in Guangzhou with all the bags, and a 30-minute stretch mid-crossing with the air-conditioning off in September heat.',
        zh: '带独立四铺包间和真正的床，对婴儿来说确实很友好，火车上还有走动空间和卫生间。不利之处：在小包间里被困 12 个多小时、带着所有行李在广州跨城换乘，以及过海途中约 30 分钟停空调，而九月的天气依然炎热。',
      },
    },
    reliability: {
      score: 70,
      why: {
        en: 'Rail itself is punctual and the rail ferry runs in most weather, but this is a chained itinerary: a missed HSR connection in Guangzhou means missing the only sleeper of the night. Sleepers also sell out within days of the 15-day window opening.',
        zh: '铁路本身准点，铁路轮渡在大多数天气下都能运行，但这是一段环环相扣的行程：在广州错过高铁接驳，就意味着错过当晚唯一一班卧铺。卧铺票在 15 天预售期开放后的几天内就会卖完。',
      },
    },
    transfers: {
      score: 30,
      why: {
        en: 'Three hand-overs, each with the stroller, the cot and four bags: Xiamen North, Guangzhou South → Baiyun, and Haikou station → car pickup. Foldable strollers travel free and stations have lifts, but nobody helps you carry anything.',
        zh: '三次交接，每次都要带着婴儿车、婴儿床和四件行李：厦门北站、广州南站 → 广州白云站，以及海口站 → 取车点。折叠婴儿车免费携带，车站也有电梯，但没有人会帮你搬东西。',
      },
    },
    mobility: {
      score: 80,
      why: {
        en: 'A rental car collected in Haikou restores island freedom — just a day later, and with the family more tired than after a flight.',
        zh: '在海口取到租车后，岛上的出行自由就回来了——只是晚了一天，而且一家人比坐飞机更疲惫。',
      },
    },
    luggage: {
      score: 58,
      why: {
        en: 'No baggage allowance to fight and strollers go free, which is a plus. But everything must be physically moved three times, including on and off a train, which is hard with an infant in arms.',
        zh: '不用和行李额度较劲，婴儿车也免费，这是加分项。但所有东西都必须亲手搬三次，包括上下火车，怀里还抱着婴儿，非常吃力。',
      },
    },
    stress: {
      score: 46,
      why: {
        en: 'A night train with a baby is either wonderful or awful, with little middle ground: no driving fatigue, but a fixed departure, unfamiliar beds and a 10:20 arrival with a full day still ahead.',
        zh: '带宝宝坐夜车，要么非常美好，要么非常糟糕，几乎没有中间状态：不用疲劳驾驶，但发车时间固定、床铺陌生，而且 10:20 才到站，一整天还在后面等着。',
      },
    },
  },
  costLines: (a) => [
    {
      id: 'rail-hsr',
      label: {
        en: 'HSR · Xiamen North → Guangzhou South (2 adults, return)',
        zh: '高铁 · 厦门北站 → 广州南站（2 位成人，往返）',
      },
      amount: a.adultsCount * 2 * a.trainHsrLeg1,
      drivenBy: ['adultsCount', 'trainHsrLeg1'],
      confidence: 'verified',
      note: {
        en: 'Second class, 3 h 21 m – 4 h 39 m. Under-sixes travel free without their own seat.',
        zh: '二等座，3 小时 21 分 – 4 小时 39 分。六岁以下儿童不单独占座可免费乘车。',
      },
    },
    {
      id: 'rail-hsr-child',
      label: {
        en: 'HSR · 3-year-old (return, child fare)',
        zh: '高铁 · 3 岁儿童（往返，儿童票）',
      },
      amount: 2 * a.trainHsrLeg1 * a.trainChildRatio,
      drivenBy: ['trainHsrLeg1', 'trainChildRatio'],
      confidence: 'verified',
      note: {
        en: 'A seat for the 3-year-old; the 8-month-old rides free on a lap.',
        zh: '给 3 岁的孩子一个座位；8 个月大的宝宝由大人抱着免费乘车。',
      },
    },
    {
      id: 'rail-city',
      label: {
        en: 'Guangzhou South → Baiyun transfer (2 adults, return)',
        zh: '广州南站 → 广州白云站换乘（2 位成人，往返）',
      },
      amount: a.adultsCount * 2 * a.trainCityTransfer,
      drivenBy: ['adultsCount', 'trainCityTransfer'],
      confidence: 'assumption',
      note: {
        en: 'Taxi is easier than the metro with a stroller and four bags.',
        zh: '推着婴儿车、带着四件行李，打车比坐地铁轻松。',
      },
    },
    {
      id: 'rail-sleeper',
      label: {
        en: `Sleeper berths · Guangzhou Baiyun → Haikou (${a.trainSleeperBerths} berths × 2)`,
        zh: `卧铺 · 广州白云站 → 海口（${a.trainSleeperBerths} 铺 × 2）`,
      },
      amount: a.trainSleeperBerths * 2 * a.trainSleeperBerth,
      drivenBy: ['trainSleeperBerths', 'trainSleeperBerth'],
      confidence: 'estimate',
      note: {
        en: 'A soft-sleeper compartment has four berths; booking all four gives the family a door that closes. The fare includes the rail-ferry crossing.',
        zh: '软卧包间有四个铺位；把四个铺位全部订下，一家人就有一扇能关上的门。车票已包含铁路轮渡的费用。',
      },
    },
    {
      id: 'rail-haikou',
      label: {
        en: 'Haikou station → city / car pickup (return)',
        zh: '海口站 → 市区 / 取车点（往返）',
      },
      amount: 2 * a.trainHaikouTransfer,
      drivenBy: ['trainHaikouTransfer'],
      confidence: 'verified',
      note: {
        en: 'The sleeper arrives at Haikou station in Xiuying, 26 km west of Haikou East.',
        zh: '卧铺列车抵达位于秀英区的海口站，在海口东站以西 26 公里。',
      },
    },
    {
      id: 'rental',
      label: {
        en: `Rental car in Haikou · ${a.rentalDays} days`,
        zh: `海口租车 · ${a.rentalDays} 天`,
      },
      amount: a.rentalDaily * a.rentalDays,
      drivenBy: ['rentalDaily', 'rentalDays'],
      confidence: 'estimate',
    },
    {
      id: 'child-seats',
      label: {
        en: 'Child seat rental (unless we bring ours)',
        zh: '儿童安全座椅租赁（除非我们自己带）',
      },
      amount: a.childSeatPerDay * a.childSeats * a.rentalDays * (1 - a.bringOwnSeats),
      drivenBy: ['childSeatPerDay', 'childSeats', 'bringOwnSeats'],
      confidence: 'estimate',
    },
    {
      id: 'rental-fuel',
      label: { en: 'Petrol in Hainan', zh: '海南油费' },
      amount: (a.rentalHainanKm / 100) * a.fuelEfficiency * a.fuelPriceHainan,
      drivenBy: ['rentalHainanKm', 'fuelEfficiency', 'fuelPriceHainan'],
      confidence: 'estimate',
    },
    {
      id: 'no-hotel',
      label: {
        en: 'Road hotel (none needed — the night is spent on the train)',
        zh: '路上的酒店（无需——这一夜在火车上度过）',
      },
      amount: 0,
      confidence: 'assumption',
      note: {
        en: 'The sleeper replaces a hotel night each way, which is part of why this option is not as expensive as it looks.',
        zh: '卧铺往返各替代一晚酒店，这也是这个方案没有看上去那么贵的原因之一。',
      },
    },
  ],
  timeline: [
    {
      id: 'rail-day-1',
      label: { en: 'Day 1 · Xiamen → Guangzhou → sleeper train', zh: '第 1 天 · 厦门 → 广州 → 卧铺列车' },
      sublabel: { en: 'Afternoon departure', zh: '下午出发' },
      start: '14:00',
      segments: [
        {
          id: 'to-station',
          label: { en: 'Home → Xiamen North station', zh: '家 → 厦门北站' },
          kind: 'travel',
          minutes: 40,
          confidence: 'assumption',
        },
        {
          id: 'buf1',
          label: { en: 'Station: tickets, platform, luggage', zh: '车站：取票、站台、行李' },
          detail: {
            en: 'Mother-and-baby waiting rooms exist, and priority boarding can be requested in advance on 12306.',
            zh: '车站设有母婴候车室，还可以提前在 12306 上申请优先检票。',
          },
          kind: 'admin',
          minutes: { assumption: 'trainStationBuffer' },
          confidence: 'assumption',
        },
        {
          id: 'leg1',
          label: { en: 'HSR · Xiamen North → Guangzhou South', zh: '高铁 · 厦门北站 → 广州南站' },
          detail: { en: 'Second class, roughly 4 hours.', zh: '二等座，约 4 小时。' },
          kind: 'travel',
          minutes: 250,
          confidence: 'verified',
        },
        {
          id: 'change1',
          label: { en: 'Cross Guangzhou to Baiyun station', zh: '穿过广州前往广州白云站' },
          detail: {
            en: 'Metro or taxi, 45–60 minutes. This is the risky connection of the day.',
            zh: '地铁或打车，45–60 分钟。这是当天最紧张的换乘。',
          },
          kind: 'travel',
          minutes: { assumption: 'trainCityTransferMin' },
          confidence: 'assumption',
        },
        {
          id: 'board',
          label: { en: 'Board the Haikou sleeper', zh: '登上开往海口的卧铺列车' },
          detail: {
            en: 'Settle into the four-berth compartment, bed the children down.',
            zh: '安顿进四铺包间，把孩子哄睡。',
          },
          kind: 'admin',
          minutes: 60,
          confidence: 'assumption',
        },
        {
          id: 'overnight',
          label: {
            en: 'Overnight on the train, including the rail-ferry crossing',
            zh: '在火车上过夜，包括铁路轮渡过海',
          },
          detail: {
            en: 'The train is shunted aboard the ferry in sections and the crossing takes about three hours. Passengers stay in their carriage; power and air-conditioning are cut for roughly 30 minutes while loading.',
            zh: '列车会被分解成几段推上轮渡，过海大约需要三个小时。乘客留在自己的车厢里；装船期间会断电并停空调约 30 分钟。',
          },
          kind: 'overnight',
          minutes: 780,
          confidence: 'verified',
          note: {
            en: 'Keep the baby’s water, milk and a muslin within reach of the berth — you cannot move around while the train is being shunted.',
            zh: '把宝宝的水、奶和一块纱布巾放在铺位随手可及的地方——列车编组时无法走动。',
          },
        },
      ],
    },
    {
      id: 'rail-day-2',
      label: { en: 'Day 2 · Haikou → Wenchang', zh: '第 2 天 · 海口 → 文昌' },
      start: '10:20',
      segments: [
        {
          id: 'arrive-hk',
          label: { en: 'Arrive Haikou station, disembark', zh: '抵达海口站，下车' },
          detail: {
            en: 'Xiuying district, west of the city; lifts down from the platform.',
            zh: '位于市区以西的秀英区；从站台乘电梯下楼。',
          },
          kind: 'wait',
          minutes: 45,
          confidence: 'assumption',
        },
        {
          id: 'taxi',
          label: { en: 'Taxi to the rental depot / Haikou East', zh: '打车前往租车点 / 海口东站' },
          kind: 'travel',
          minutes: { assumption: 'trainHaikouTransferMin' },
          confidence: 'verified',
        },
        {
          id: 'pickup',
          label: { en: 'Collect the rental car', zh: '取租车' },
          kind: 'admin',
          minutes: { assumption: 'rentalPickup' },
          confidence: 'estimate',
        },
        {
          id: 'drive',
          label: { en: 'Drive Haikou → Wenchang', zh: '自驾 海口 → 文昌' },
          kind: 'travel',
          minutes: { assumption: 'hakToWenchang' },
          confidence: 'estimate',
        },
        {
          id: 'hotel',
          label: { en: 'Check in near Wenchang', zh: '在文昌附近办理入住' },
          kind: 'admin',
          minutes: 45,
          confidence: 'assumption',
        },
      ],
      note: {
        en: 'Skipping the car for this leg: the island HSR runs Haikou East → Wenchang in 28 minutes for ¥27, with 36 departures a day.',
        zh: '这一段可以不用车：海南环岛高铁从海口东站到文昌只需 28 分钟，票价 ¥27，每天 36 班。',
      },
    },
  ],
  practical: [
    {
      label: { en: 'Direct train?', zh: '有直达火车吗？' },
      value: { en: 'None exists from Xiamen — this is a chained itinerary', zh: '厦门出发没有直达车——这是需要换乘的串联行程' },
      tone: 'bad',
    },
    {
      label: { en: 'Beds', zh: '床铺' },
      value: {
        en: 'Four-berth soft sleeper gives the family a door that closes',
        zh: '四铺软卧包间让一家人有一扇能关上的门',
      },
      tone: 'good',
    },
    {
      label: { en: 'Booking window', zh: '预售期' },
      value: { en: '15 days ahead; sleeper berths sell out fast', zh: '提前 15 天；卧铺票卖得很快' },
      tone: 'warn',
    },
    {
      label: { en: 'Luggage', zh: '行李' },
      value: {
        en: 'No allowance limit, strollers free — but carried three times',
        zh: '没有额度限制，婴儿车免费——但要搬三次',
      },
      tone: 'neutral',
    },
    {
      label: { en: 'Crossing', zh: '过海' },
      value: {
        en: '~3 h with power and A/C cut for ~30 min; confined to the carriage',
        zh: '约 3 小时，其中约 30 分钟断电停空调；只能待在车厢内',
      },
      tone: 'warn',
    },
    {
      label: { en: 'Arrival', zh: '抵达' },
      value: {
        en: '10:20 at Haikou station, 26 km west of the city',
        zh: '10:20 到海口站，位于市区以西 26 公里',
      },
      tone: 'neutral',
    },
  ],
  pros: [
    {
      en: 'A real bed for the children on the overnight leg, and no hotel bill for that night',
      zh: '夜行段孩子们有真正的床，而且当晚不用付酒店钱',
    },
    {
      en: 'No baggage allowance, and foldable strollers travel free',
      zh: '没有行李额度限制，折叠婴儿车免费携带',
    },
    {
      en: 'Trains have space to walk, toilets and a table — easier than a car seat for a restless toddler',
      zh: '火车上有走动空间、卫生间和桌子——对好动的幼儿来说比安全座椅舒服',
    },
    {
      en: 'Rail does not sit in traffic, and the rail ferry runs in most weather',
      zh: '铁路不会堵在路上，铁路轮渡在大多数天气下都能运行',
    },
    {
      en: 'Priority boarding and mother-and-baby waiting rooms can be requested in advance',
      zh: '可以提前申请优先检票和母婴候车室',
    },
  ],
  cons: [
    {
      en: 'No through service: this is four legs and three transfers chained together',
      zh: '没有直达服务：这是四段行程、三次换乘串联起来的',
    },
    {
      en: '22–30 hours door to door, with a cross-city transfer in Guangzhou with all the luggage',
      zh: '门到门 22–30 小时，还要带着所有行李在广州跨城换乘',
    },
    {
      en: 'About 30 minutes of the crossing with the air-conditioning off, in September heat',
      zh: '过海途中约 30 分钟停空调，而九月的天气依然炎热',
    },
    {
      en: 'The Guangzhou connection has no slack — miss it and the family is stranded overnight',
      zh: '广州的接驳没有任何余量——一旦错过，一家人就要滞留一晚',
    },
    {
      en: 'Sleeper berths are released only 15 days ahead and sell out quickly around holidays',
      zh: '卧铺票只提前 15 天放票，节假日前后很快就会售罄',
    },
  ],
  legs: [
    {
      id: 'd1',
      fromId: 'xiamen',
      toId: 'xiamen-north',
      label: { en: 'Home → Xiamen North', zh: '家 → 厦门北站' },
      mode: 'taxi',
      distance: { en: '~20 km', zh: '约 20 公里' },
      duration: { en: '~40 min', zh: '约 40 分钟' },
    },
    {
      id: 'd2',
      fromId: 'xiamen-north',
      toId: 'guangzhou',
      label: { en: 'HSR Xiamen North → Guangzhou South', zh: '高铁 厦门北站 → 广州南站' },
      mode: 'hsr',
      distance: { en: '~600 km', zh: '约 600 公里' },
      duration: { en: '~4 h', zh: '约 4 小时' },
    },
    {
      id: 'd3',
      fromId: 'guangzhou',
      toId: 'guangzhou',
      label: { en: 'Cross Guangzhou to Baiyun station', zh: '穿过广州前往广州白云站' },
      mode: 'taxi',
      distance: { en: '~25 km', zh: '约 25 公里' },
      duration: { en: '~1 h', zh: '约 1 小时' },
    },
    {
      id: 'd4',
      fromId: 'guangzhou',
      toId: 'new-haikou-port',
      label: { en: 'Sleeper train + rail ferry across the strait', zh: '卧铺列车 + 铁路轮渡跨越海峡' },
      mode: 'train',
      distance: { en: '~600 km', zh: '约 600 公里' },
      duration: { en: '~13 h', zh: '约 13 小时' },
    },
    {
      id: 'd5',
      fromId: 'new-haikou-port',
      toId: 'haikou',
      label: { en: 'Haikou station → city / car pickup', zh: '海口站 → 市区 / 取车点' },
      mode: 'taxi',
      distance: { en: '~26 km', zh: '约 26 公里' },
      duration: { en: '~45 min', zh: '约 45 分钟' },
    },
    {
      id: 'd6',
      fromId: 'haikou',
      toId: 'wenchang',
      label: { en: 'Rental car Haikou → Wenchang', zh: '租车自驾 海口 → 文昌' },
      mode: 'car',
      distance: { en: '~100 km', zh: '约 100 公里' },
      duration: { en: '~1 h 30 m', zh: '约 1 小时 30 分' },
    },
  ],
  contingencies: [
    {
      en: 'Missed connection into Baiyun: the rail chain has no slack. Recovery means a taxi across the city and, if the sleeper is gone, a hotel in Guangzhou and a fresh booking the next night.',
      zh: '错过前往广州白云站的接驳：这条铁路链条没有任何余量。补救办法是打车横穿市区；如果卧铺已经开走，就在广州住一晚，第二天晚上重新订票。',
    },
    {
      en: 'Rail ferry suspended by weather: the train waits or is rescheduled; ask at the station before boarding. This is much rarer than a strait vehicle-ferry closure.',
      zh: '铁路轮渡因天气停运：列车会等待或改期；上车前先到车站询问。这种情况比海峡汽车轮渡停运少见得多。',
    },
    {
      en: 'Honest fallback: if the plan is looking fragile, abandon the rail legs and fly XMN → HAK instead — that is the whole point of keeping the flight option in the comparison.',
      zh: '务实的后备方案：如果这个计划看起来不牢靠，就放弃铁路段，改乘 XMN → HAK 航班——这正是把航班方案留在对比里的意义。',
    },
    {
      en: 'Sleepers sold out: book the moment the 15-day window opens, or split the family across two compartments.',
      zh: '卧铺售罄：在 15 天预售期开放的第一时间订票，或者把一家人分到两个包间。',
    },
  ],
  confidence: 'estimate',
};
