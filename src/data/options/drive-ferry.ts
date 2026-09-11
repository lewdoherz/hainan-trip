import type { Assumptions, Segment, TimelineGroup, TransportOption } from '../types';

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
        label: { en: 'Finish loading the car', zh: '装车收尾' },
        detail: {
          en: 'Child seats already fitted, stroller, cot and bags packed the night before.',
          zh: '安全座椅已装好，婴儿车、婴儿床和行李前一晚就收拾妥当。',
        },
        kind: 'admin',
        minutes: 30,
        confidence: 'assumption',
      });
    }

    segments.push({
      id: `d${i}-drive`,
      label: last
        ? { en: 'Driving to Xuwen Port', zh: '驶往徐闻港' }
        : { en: `Driving day ${i + 1}`, zh: `第 ${i + 1} 天驾驶` },
      detail: last
        ? {
            en: 'Final stretch down the Leizhou peninsula; the expressway spur runs to the port gate.',
            zh: '沿雷州半岛的最后一段路程；高速公路支线直达港口闸口。',
          }
        : {
            en: 'Coastal expressways towards Guangdong — roughly 1/3 of the mainland distance each driving day.',
            zh: '沿海南下高速前往广东方向——每个驾驶日约走完大陆段里程的 1/3。',
          },
      kind: 'travel',
      minutes: { compute: 'driveDayMin' },
      confidence: 'verified',
      note:
        i === 0
          ? {
              en: 'The 1,183 km route is 14 h 18 m of pure driving; we break it up.',
              zh: '全程 1,183 公里，纯驾驶时间 14 小时 18 分钟；我们分段完成。',
            }
          : undefined,
    });

    segments.push({
      id: `d${i}-breaks`,
      label: { en: 'Breaks, meals, nappy changes', zh: '休息、吃饭、换尿布' },
      detail: {
        en: 'Roughly 2 h driving then a 20–30 min stop: about four stops per 500 km with an infant.',
        zh: '大约开 2 小时就停 20–30 分钟：带着婴儿每 500 公里约停四次。',
      },
      kind: 'rest',
      minutes: { assumption: 'driveBreakBuffer' },
      confidence: 'assumption',
    });

    if (last) {
      segments.push(
        {
          id: 'ferry-checkin',
          label: {
            en: 'Xuwen Port: vehicle lane, security, boarding',
            zh: '徐闻港：车辆通道、安检、登船',
          },
          detail: {
            en: 'Trunk inspected at the gate; passengers and car must be on the same booking.',
            zh: '闸口处检查后备箱；乘客与车辆必须在同一订单上。',
          },
          kind: 'wait',
          minutes: { assumption: 'ferryWait' },
          confidence: 'verified',
          note: {
            en: 'Full online reservation is mandatory — there is no ticket office at the port, and the gate closes 20 minutes before departure. Dedicated car-only sailings have run at 11:05 and 14:05 from Xuwen; 海安新港 → 秀英港 is the slower overflow route, and 徐闻北港 → 海口南港 is the railway ferry.',
            zh: '必须全程网上预约——港口没有售票窗口，且开车前 20 分钟停止检票。徐闻曾开行 11:05 和 14:05 的小车专船；海安新港 → 秀英港 是较慢的分流航线，徐闻北港 → 海口南港 是铁路轮渡。',
          },
        },
        {
          id: 'ferry-cross',
          label: { en: 'Crossing the Qiongzhou Strait', zh: '横渡琼州海峡' },
          detail: {
            en: '12 nautical miles, about 60 minutes at sea. All passengers must leave the car; luggage stays locked on the vehicle deck.',
            zh: '12 海里，海上约 60 分钟。所有乘客必须下车；行李留在锁好的车辆甲板上。',
          },
          kind: 'travel',
          minutes: { assumption: 'ferryCrossing' },
          confidence: 'verified',
          note: {
            en: 'Keep nappies, formula, water and a change of clothes in a day bag — you cannot get back into the car.',
            zh: '把尿布、奶粉、水和一套换洗衣物放在随身包里——途中无法回到车上。',
          },
        },
        {
          id: 'ferry-arrive',
          label: { en: 'Disembark at Haikou New Port', zh: '在海口新海港下船' },
          detail: {
            en: 'Reunite the family with the car and clear the port.',
            zh: '一家人与车会合，然后驶出港口。',
          },
          kind: 'wait',
          minutes: 40,
          confidence: 'assumption',
        },
        {
          id: 'drive-wenchang',
          label: { en: 'Drive to Wenchang', zh: '驾车前往文昌' },
          detail: { en: 'Toll-free island expressways.', zh: '岛内高速免费通行。' },
          kind: 'travel',
          minutes: { compute: 'driveHainanMin' },
          confidence: 'verified',
        },
      );
    } else {
      segments.push({
        id: `d${i}-hotel`,
        label: { en: 'Hotel stop', zh: '入住酒店' },
        detail: {
          en: 'Family room, dinner, early night — no overnight driving with two small children.',
          zh: '家庭房、吃晚饭、早点休息——带着两个年幼的孩子绝不夜间开车。',
        },
        kind: 'overnight',
        minutes: 600,
        confidence: 'assumption',
      });
    }

    groups.push({
      id: `day-${i + 1}`,
      label: last
        ? { en: `Day ${i + 1} · Xuwen Port → ferry → Wenchang`, zh: `第 ${i + 1} 天 · 徐闻港 → 轮渡 → 文昌` }
        : { en: `Day ${i + 1} · driving south`, zh: `第 ${i + 1} 天 · 南下驾驶` },
      sublabel: i === 0 ? { en: 'Xiamen → Guangdong', zh: '厦门 → 广东' } : undefined,
      start: last ? '07:00' : '08:00',
      segments,
    });
  }

  groups.push({
    id: 'arrive',
    label: { en: 'Arrival · Wenchang', zh: '抵达 · 文昌' },
    start: '21:00',
    segments: [
      {
        id: 'checkin',
        label: { en: 'Check in and unpack', zh: '入住并整理行李' },
        detail: {
          en: 'Be in Wenchang or Longlou by the evening of 16 September — never travel on launch day itself.',
          zh: '9 月 16 日傍晚前抵达文昌或龙楼镇——绝不要在发射当天赶路。',
        },
        kind: 'admin',
        minutes: 45,
        confidence: 'assumption',
      },
    ],
    note: {
      en: 'The return trip mirrors this: 2 road nights, the same ferry, 1,183 km back.',
      zh: '返程与此对称：2 晚路上住宿、同一班轮渡、原路 1,183 公里返回。',
    },
  });

  return groups;
}

/** Option A. Prose lives here; every number comes from the assumptions. */
export const DRIVE_FERRY: TransportOption = {
  id: 'drive-ferry',
  name: { en: 'Drive + ferry', zh: '自驾 + 轮渡' },
  subtitle: { en: 'Our own car across the Qiongzhou Strait', zh: '开自家车横渡琼州海峡' },
  cnName: '自驾 + 琼州海峡轮渡',
  modeLabel: { en: 'Own car', zh: '自家车' },
  vehicle: { en: 'Own car', zh: '自家车' },
  accent: '#0f3d3e',
  tagline: {
    en: 'Roughly 1,183 km and a ferry each way — but the car seats, cot and luggage never get repacked.',
    zh: '单程约 1,183 公里再加一趟轮渡——但安全座椅、婴儿床和行李全程都不用重新打包。',
  },
  verdict: {
    en:
      '1,183 km of expressway to Xuwen Port, a mandatory-reservation vehicle ferry across the Qiongzhou Strait, then ~100 km up the island to Wenchang. Done as three days each way it is survivable; the price is that four of the trip days become travel days, the family arrives tired, and the strait can close in a typhoon or fog — one past suspension stranded some 21,000 vehicles at Xuwen. The car, the child seats and the luggage load are the compensating prize.',
    zh: '1,183 公里高速到徐闻港，再乘必须预约的车辆轮渡横渡琼州海峡，然后沿岛北上约 100 公里到文昌。单程分三天走还撑得住；代价是七天行程里有四天变成赶路，一家人到得疲惫，而且海峡可能因台风或大雾封航——过去一次停航就把约 21,000 辆车滞留在徐闻。车辆、儿童安全座椅和随车行李就是这份辛苦的补偿。',
  },
  transfers: 1,
  staticScores: {
    family: {
      score: 60,
      why: {
        en: 'Our own car and our own child seats, a familiar space where the toddler can nap, and the freedom to stop whenever the baby needs it. Against that: two or three consecutive driving days, and a 1.5–2 h port wait followed by a crossing where every passenger must leave the car and sit in a ferry cabin.',
        zh: '自家车配自家儿童安全座椅，是孩子熟悉的空间，幼儿可以小睡，婴儿一有需要随时能停车。反面则是：连续两三天的驾驶，加上港口 1.5–2 小时的等待，之后过海时所有乘客都必须下车，坐进轮渡客舱。',
      },
    },
    reliability: {
      score: 50,
      why: {
        en: 'The strait suspends sailings at force-9 wind and goes intermittent in fog — and mid-September is typhoon season. A single past suspension left ~21,000 vehicles stranded at Xuwen. Sailings are auto-rebooked by SMS, but a closure costs a day, not an hour.',
        zh: '海峡在 9 级风时停航，起雾时也时断时续——而 9 月中旬正是台风季。过去一次停航就让约 21,000 辆车滞留在徐闻。船班可通过短信自动改签，但一次封航耽误的是一天，而不是一小时。',
      },
    },
    transfers: {
      score: 66,
      why: {
        en: 'One real hand-over per crossing: the ferry, where passengers leave the car and luggage stays locked inside. Compare that with a rail chain that moves every bag four times.',
        zh: '单程只有一次真正的转运：轮渡，乘客下车，行李锁在车内。相比之下，铁路联运要把每件行李搬四次。',
      },
    },
    mobility: {
      score: 100,
      why: {
        en: 'Maximum. Own car, own seats fitted at home, no rental counter, no deposit, no drop-off deadline, no mileage limits, and the ability to reach any beach or change plans the same day.',
        zh: '最强。自家车、自家安全座椅在家装好，不用去租车柜台、不用押金、没有还车时限、没有里程限制，还能当天到达任何一片海滩或临时改计划。',
      },
    },
    luggage: {
      score: 100,
      why: {
        en: 'A car boot has no baggage allowance: stroller, cot, steriliser, a fortnight of nappies, beach gear and souvenirs. This is the single biggest advantage of driving, and it matters most with an 8-month-old.',
        zh: '后备箱没有行李额度：婴儿车、婴儿床、消毒器、两周的尿布、海滩装备和纪念品都能带。这是自驾最大的优势，带着 8 个月大的宝宝时尤其重要。',
      },
    },
    stress: {
      score: 40,
      why: {
        en: 'Four travel days inside a seven-day window, plus the fatigue of the drive, the port and the crossing. The parents arrive noticeably more tired than they would after a flight — right before an 08:30 launch.',
        zh: '七天行程里有四天在赶路，再加上驾驶、港口和过海的疲劳。父母抵达时明显比坐飞机更累——而紧接着就是早上 08:30 的发射。',
      },
    },
  },
  costLines: (a) => {
    const nights = a.driveNights * 2;
    return [
      {
        id: 'fuel-mainland',
        label: { en: 'Petrol · mainland (return, 2 × 1,183 km)', zh: '汽油 · 大陆段（往返，2 × 1,183 公里）' },
        amount: ((a.driveKmMainland * 2) / 100) * a.fuelEfficiency * a.fuelPriceMainland,
        drivenBy: ['driveKmMainland', 'fuelEfficiency', 'fuelPriceMainland'],
        confidence: 'estimate',
        note: {
          en: 'Fill up in Xuwen before boarding — Hainan fuel carries the road-toll levy instead of tolls.',
          zh: '上船前在徐闻加满油——海南油价里含有替代过路费的通行附加费。',
        },
      },
      {
        id: 'fuel-hainan',
        label: { en: 'Petrol · Hainan (return)', zh: '汽油 · 海南段（往返）' },
        amount: ((a.driveKmHainan * 2) / 100) * a.fuelEfficiency * a.fuelPriceHainan,
        drivenBy: ['driveKmHainan', 'fuelEfficiency', 'fuelPriceHainan'],
        confidence: 'estimate',
        note: {
          en: 'Hainan 92# is ~¥1.10/L dearer than Guangdong, of which ¥1.05/L is the levy that replaces tolls.',
          zh: '海南 92# 汽油比广东贵约 ¥1.10/升，其中 ¥1.05/升是替代过路费的附加费。',
        },
      },
      {
        id: 'tolls',
        label: { en: 'Expressway tolls (mainland, return)', zh: '高速通行费（大陆段，往返）' },
        amount: a.driveKmMainland * 2 * a.tollRatePerKm,
        drivenBy: ['driveKmMainland', 'tollRatePerKm'],
        confidence: 'estimate',
        note: {
          en: '¥638 each way for a class-1 car; Hainan island roads are toll-free.',
          zh: '一类车单程 ¥638；海南岛内道路免费通行。',
        },
      },
      {
        id: 'road-hotels',
        label: { en: `Road hotel · ${nights} nights (out and back)`, zh: `公路旅馆 · ${nights} 晚（往返）` },
        amount: nights * a.driveHotelPerNight,
        drivenBy: ['driveNights', 'driveHotelPerNight'],
        confidence: 'estimate',
        note: {
          en: 'Three driving days each way with two small children. Sleeping near Xuwen before an early sailing is worth it.',
          zh: '带着两个年幼的孩子，单程分三天驾驶。早班船之前睡在徐闻附近是值得的。',
        },
      },
      {
        id: 'ferry',
        label: {
          en: 'Qiongzhou Strait ferry · car + driver + 1 adult (return)',
          zh: '琼州海峡轮渡 · 车辆 + 驾驶员 + 1 名成人（往返）',
        },
        amount: (a.ferryCarDriver + a.ferryAdult + a.ferryChild + a.ferryInfant) * 2,
        drivenBy: ['ferryCarDriver', 'ferryAdult', 'ferryChild', 'ferryInfant'],
        confidence: 'verified',
        note: {
          en: '¥415.50 for the car and driver plus ¥41.50 for the second adult; both children travel free under 1.2 m with a zero-fare ticket on the same order.',
          zh: '车辆加驾驶员 ¥415.50，第二名成人 ¥41.50；两名儿童身高不足 1.2 米，在同一订单里领取免费票即可免票乘船。',
        },
      },
    ];
  },
  timeline: driveTimeline,
  practical: [
    {
      label: { en: 'Child seats', zh: '安全座椅' },
      value: { en: 'Our own, fitted at home — nothing to rent or trust', zh: '自家的，在家就装好——不用租、也不用去信别人的' },
      tone: 'good',
    },
    {
      label: { en: 'Luggage', zh: '行李' },
      value: { en: 'Unlimited; whatever fits in the car', zh: '不限量；车里装得下多少就带多少' },
      tone: 'good',
    },
    {
      label: { en: 'Best port pairing', zh: '最佳港口组合' },
      value: {
        en: 'Xuwen Port → Haikou New Port: 12 nm, ~60 min, up to 71 sailings a day, 24 h',
        zh: '徐闻港 → 海口新海港：12 海里，约 60 分钟，每天最多 71 班，24 小时运营',
      },
      tone: 'good',
    },
    {
      label: { en: 'Booking', zh: '订票' },
      value: {
        en: 'Reservation is mandatory online, 15 days ahead; no ticket office at the port',
        zh: '必须提前 15 天网上预约；港口没有售票窗口',
      },
      tone: 'warn',
    },
    {
      label: { en: 'Ferry crossing', zh: '轮渡航程' },
      value: {
        en: '~60 min at sea, 2.5–4 h door to door; passengers leave the car',
        zh: '海上约 60 分钟，门到门 2.5–4 小时；乘客必须下车',
      },
      tone: 'warn',
    },
    {
      label: { en: 'Fuel tip', zh: '加油提示' },
      value: {
        en: 'Fill up in Xuwen — Hainan fuel carries the toll levy, but island roads are toll-free',
        zh: '在徐闻加满油——海南油价含通行费附加，但岛内道路免费',
      },
      tone: 'good',
    },
    {
      label: { en: 'Weather risk', zh: '天气风险' },
      value: {
        en: 'Strait closes at force-9 wind and in fog — September is typhoon season',
        zh: '9 级风和起雾时海峡封航——9 月是台风季',
      },
      tone: 'bad',
    },
    {
      label: { en: 'Arrival condition', zh: '抵达状态' },
      value: {
        en: 'Four travel days and ~2,400 km before the holiday starts',
        zh: '假期开始前先赶四天路、约 2,400 公里',
      },
      tone: 'bad',
    },
  ],
  pros: [
    {
      en: 'Child seats, stroller, cot and the whole luggage load travel once, untouched',
      zh: '安全座椅、婴儿车、婴儿床和全部行李一次装好，全程不用再动',
    },
    {
      en: 'Own car on Hainan: no rental counter, deposit, mileage cap or drop-off deadline',
      zh: '在海南也开自家车：不用租车柜台、不用押金、不限里程、没有还车时限',
    },
    {
      en: 'Total cost is largely fixed and knowable in advance — fuel, tolls, ferry and hotels',
      zh: '总花费基本固定、可以提前算清——油费、通行费、轮渡和住宿',
    },
    {
      en: 'Hainan expressways are toll-free and fuel is the only running cost on the island',
      zh: '海南高速免费，岛内唯一的使用成本就是油费',
    },
    {
      en: 'Complete freedom to change plans mid-trip, including following better weather',
      zh: '行程中可以完全自由地改计划，包括追着好天气走',
    },
  ],
  cons: [
    {
      en: 'Roughly 1,183 km and 14+ hours of driving each way, split over two to three days',
      zh: '单程约 1,183 公里、14 小时以上的驾驶，分成两到三天',
    },
    {
      en: 'Mandatory ferry reservation with a hard 20-minute gate cut-off, and 1.5–2 h of port waiting',
      zh: '轮渡必须预约，而且严格执行开车前 20 分钟停止检票，还要在港口等 1.5–2 小时',
    },
    {
      en: 'All passengers must leave the car for the crossing — hardest with a sleeping baby',
      zh: '过海时所有乘客都必须下车——宝宝正睡着时最难受',
    },
    {
      en: 'The strait closes in typhoons and fog, with documented multi-day strandings',
      zh: '台风和大雾会让海峡封航，有据可查的滞留曾持续多日',
    },
    {
      en: 'Four of the trip days become travel days, and the parents arrive tired before an 08:30 launch',
      zh: '七天里有四天变成赶路日，父母在早上 08:30 发射前就已经疲惫',
    },
  ],
  legs: [
    {
      id: 'l1',
      fromId: 'xiamen',
      toId: 'shantou',
      label: { en: 'Xiamen → Shantou', zh: '厦门 → 汕头' },
      mode: 'car',
      distance: { en: '~250 km', zh: '约 250 公里' },
      duration: { en: '~3 h', zh: '约 3 小时' },
    },
    {
      id: 'l2',
      fromId: 'shantou',
      toId: 'huizhou',
      label: { en: 'Shantou → Huizhou / Dongguan', zh: '汕头 → 惠州 / 东莞' },
      mode: 'car',
      distance: { en: '~250 km', zh: '约 250 公里' },
      duration: { en: '~3 h', zh: '约 3 小时' },
    },
    {
      id: 'l3',
      fromId: 'huizhou',
      toId: 'guangzhou',
      label: { en: 'Huizhou → Guangzhou ring road', zh: '惠州 → 广州绕城高速' },
      mode: 'car',
      distance: { en: '~180 km', zh: '约 180 公里' },
      duration: { en: '~2 h', zh: '约 2 小时' },
    },
    {
      id: 'l4',
      fromId: 'guangzhou',
      toId: 'yangjiang',
      label: { en: 'Guangzhou → Yangjiang', zh: '广州 → 阳江' },
      mode: 'car',
      distance: { en: '~230 km', zh: '约 230 公里' },
      duration: { en: '~2 h 45 m', zh: '约 2 小时 45 分钟' },
    },
    {
      id: 'l5',
      fromId: 'yangjiang',
      toId: 'zhanjiang',
      label: { en: 'Yangjiang → Zhanjiang', zh: '阳江 → 湛江' },
      mode: 'car',
      distance: { en: '~230 km', zh: '约 230 公里' },
      duration: { en: '~2 h 45 m', zh: '约 2 小时 45 分钟' },
    },
    {
      id: 'l6',
      fromId: 'zhanjiang',
      toId: 'xuwen-port',
      label: { en: 'Zhanjiang → Xuwen Port', zh: '湛江 → 徐闻港' },
      mode: 'car',
      distance: { en: '~160 km', zh: '约 160 公里' },
      duration: { en: '~2 h', zh: '约 2 小时' },
    },
    {
      id: 'l7',
      fromId: 'xuwen-port',
      toId: 'new-haikou-port',
      label: { en: 'Qiongzhou Strait vehicle ferry', zh: '琼州海峡车辆轮渡' },
      mode: 'ferry',
      distance: { en: '12 nm / ~22 km', zh: '12 海里 / 约 22 公里' },
      duration: { en: '~60 min at sea', zh: '海上约 60 分钟' },
    },
    {
      id: 'l8',
      fromId: 'new-haikou-port',
      toId: 'wenchang',
      label: { en: 'Haikou New Port → Wenchang', zh: '海口新海港 → 文昌' },
      mode: 'car',
      distance: { en: '~100 km', zh: '约 100 公里' },
      duration: { en: '~1 h 30 m', zh: '约 1 小时 30 分钟' },
    },
    {
      id: 'l9',
      fromId: 'wenchang',
      toId: 'longlou',
      label: { en: 'Wenchang → Longlou (launch viewing)', zh: '文昌 → 龙楼镇（观看发射）' },
      mode: 'car',
      distance: { en: '~40 km', zh: '约 40 公里' },
      duration: { en: '~40 min', zh: '约 40 分钟' },
    },
  ],
  contingencies: [
    {
      en: 'Sailing cancelled: the booking system rebooks you onto the nearest available sailing by SMS. Xuwen Port hotline 0759-4663889; the rail-ferry north port is on 0898-31684464.',
      zh: '船班取消：订票系统会通过短信把你改签到最近可用的船班。徐闻港热线 0759-4663889；铁路轮渡北港热线 0898-31684464。',
    },
    {
      en: 'Stuck on the mainland side: Xuwen county town is 10–15 km from the port with cheap hotels, and the port runs 24 h — sleep there rather than driving a dawn run from Zhanjiang with a baby.',
      zh: '被困在大陆一侧：徐闻县城离港口 10–15 公里，有便宜旅馆，而且港口 24 小时运行——与其带着婴儿从湛江凌晨赶路，不如就在那里睡一晚。',
    },
    {
      en: 'Launch slips by a day: we have the car, so we simply stay an extra night and drive anywhere on the island.',
      zh: '发射推迟一天：我们开着车，多住一晚、在岛上开到哪儿去都行。',
    },
    {
      en: 'Breakdown on the mainland: this plan has no redundancy. Service the car beforehand and check insurance covers vehicle repatriation.',
      zh: '在大陆段抛锚：这个方案没有冗余。出发前保养好车辆，并确认保险包含车辆运返。',
    },
    {
      en: 'Running late on launch morning: leaving a Wenchang hotel by car at 05:15 is the most flexible position of any option.',
      zh: '发射日早上出发晚了：从文昌的酒店 05:15 开车出发，是所有方案里最灵活的位置。',
    },
  ],
  confidence: 'estimate',
};
