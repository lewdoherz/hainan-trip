import type { ItineraryVariant } from './types';

/**
 * Two versions of the same trip, matching the two shapes the Budget page
 * compares: five nights home from Sanya, or six nights home from Haikou.
 * Five travellers throughout — two parents, a 3-year-old, an 8-month-old and
 * the grandmother, who books her own flight.
 */
export const ITINERARIES: ItineraryVariant[] = [
  {
    id: 'five-nights',
    name: { en: 'Five nights · home from Sanya', zh: '5 晚 · 从三亚返程' },
    subtitle: {
      en: '15 – 20 September 2026 · 3 nights Wenchang, 2 nights Clearwater Bay · one-way drive, no backtracking',
      zh: '2026 年 9 月 15 – 20 日 · 文昌 3 晚，清水湾 2 晚 · 单向行驶，不折返',
    },
    recommended: true,
    summary: {
      en: 'The value pick from the budget page: three nights near the pad so the launch is never a dawn dash, then two beach nights, then home from Sanya with no wasted driving. Five nights is enough with an 8-month-old — the sixth night costs an extra hotel night plus three hours of driving back north.',
      zh: '预算页中最具性价比的方案：先在发射场附近住三晚，发射当天无需凌晨赶路；再去海边住两晚；最后从三亚返程，全程不折返。带 8 个月大的宝宝，5 晚已经足够 —— 第 6 晚要多付一晚房费，还要多开 3 小时回北边。',
    },
    days: [
      {
        date: '2026-09-15',
        dayLabel: { en: 'Day 1 · Tue', zh: '第 1 天 · 周二' },
        title: { en: 'Fly to Haikou, drive up to Wenchang', zh: '飞抵海口，驱车前往文昌' },
        base: { en: 'Wenchang · Longlou 龙楼镇', zh: '文昌 · 龙楼镇' },
        drive: { en: '~1 h 30 m from HAK', zh: '距海口美兰机场约 1 小时 30 分' },
        plan: [
          {
            en: '12:50 flight from Xiamen, landing at Meilan at 14:55 — after lunch, before the afternoon nap',
            zh: '12:50 从厦门起飞，14:55 抵达美兰机场 —— 午饭后出发，正好接上下午的小睡',
          },
          {
            en: 'Collect the car at the airport: an MPV, with both child seats fitted and checked before you drive off',
            zh: '在机场取车：商务车，两个儿童座椅装好并检查一遍再出发',
          },
          {
            en: 'Supermarket stop on the way north — nappies, formula, water, fruit, breakfast things for the launch morning',
            zh: '北上途中去超市 —— 尿布、奶粉、饮用水、水果，以及发射当天早上的早餐',
          },
          {
            en: 'Check in — Longlou if you want to settle, or Wenchang city / Gaolong Bay for a cheaper first night before moving to Longlou for the 16th and 17th',
            zh: '办理入住 —— 想省事就住龙楼；想省点钱，第一晚住文昌市区或高隆湾，16、17 日再搬到龙楼',
          },
        ],
        toddler: {
          en: 'Keep the flight inside the nap window and feed the baby on descent for her ears. The grandmother travels with you; give her the room furthest from the children.',
          zh: '把飞行安排在午睡时段，下降时给宝宝喂奶以缓解耳朵不适。外婆同行，把离孩子最远的房间给她。',
        },
        flexibility: 'fixed',
      },
      {
        date: '2026-09-16',
        dayLabel: { en: 'Day 2 · Wed', zh: '第 2 天 · 周三' },
        title: { en: 'Wenchang: science centre, then launch prep', zh: '文昌：航天科普中心与发射准备' },
        base: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
        drive: { en: 'Local only', zh: '仅市内短途' },
        plan: [
          {
            en: 'Morning at 文昌航天科普中心 — air-conditioned, toddler-friendly, and it explains what the children are about to see',
            zh: '上午去文昌航天科普中心 —— 有空调、适合幼儿，能让孩子明白明天要看的是什么',
          },
          {
            en: 'Afternoon at the hotel or the beach; both children nap',
            zh: '下午在酒店或海边，两个孩子都睡一觉',
          },
          {
            en: 'Reconnaissance: drive to the viewing area and work out where you will park on launch morning',
            zh: '提前探路：开车到观礼区域，确定发射当天早上停车的位置',
          },
          {
            en: 'Confirm the viewing tickets and re-read the no-fly notice window, then pack the launch bag and set a 04:30 alarm',
            zh: '确认观礼门票，再看一遍禁飞通告的时间窗口，然后收拾发射当天的背包，设 04:30 的闹钟',
          },
        ],
        toddler: {
          en: 'This is the calm day — do not schedule anything that needs a car at nap time, and let the grandmother have a slow afternoon too.',
          zh: '今天是轻松的一天 —— 午睡时间不要安排需要乘车的行程，也让外婆有个悠闲的下午。',
        },
        flexibility: 'flexible',
      },
      {
        date: '2026-09-17',
        dayLabel: { en: 'Day 3 · Thu · LAUNCH', zh: '第 3 天 · 周四 · 发射日' },
        title: { en: 'Rocket launch at Wenchang', zh: '文昌看火箭发射' },
        base: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
        drive: { en: '~15–40 min to the viewing area', zh: '距观礼区约 15–40 分钟' },
        plan: [
          {
            en: '04:45 wake and dress the children; feed and change the baby before leaving',
            zh: '04:45 叫醒孩子并穿衣；出发前喂奶、换尿布',
          },
          {
            en: 'From Longlou the drive is short, so you can leave at 05:30 rather than 05:15 — one of the reasons to sleep here',
            zh: '住在龙楼车程很短，可以 05:30 再出发而不是 05:15 —— 这也是住在这里的原因之一',
          },
          {
            en: '06:00 in place at the viewing platform or terrace; shade, water and ear defenders set up',
            zh: '06:00 到达观礼平台或露台，布置好遮阴、饮水和耳罩',
          },
          {
            en: '08:20 ear defenders on, children held; the window opens at 08:25 with lift-off listed at 08:30',
            zh: '08:20 戴好耳罩，抱稳孩子；08:25 窗口开启，起飞时间为 08:30',
          },
          {
            en: 'Do not rush the exit — breakfast in the shade while the traffic drains, then a quiet afternoon',
            zh: '不用急着离开 —— 在阴凉处吃个早餐，等车流散开，下午安静休息',
          },
        ],
        toddler: {
          en: 'Ear defenders for both children, water, shade, and a carrier for the baby. If either child is overwhelmed, watch from inside the car with the windows up — that is a perfectly good outcome. The grandmother can hold the 3-year-old while you carry the baby.',
          zh: '两个孩子都要戴耳罩，备好饮水和遮阴，婴儿用背带抱好。如果孩子不适，就回到车里关上窗户观看 —— 这完全可以接受。外婆可以牵着 3 岁的孩子，你抱着婴儿。',
        },
        flexibility: 'fixed',
      },
      {
        date: '2026-09-18',
        dayLabel: { en: 'Day 4 · Fri', zh: '第 4 天 · 周五' },
        title: { en: 'Buffer morning, then south to Clearwater Bay', zh: '上午留作缓冲，下午南下清水湾' },
        base: { en: 'Lingshui · Clearwater Bay 清水湾', zh: '陵水 · 清水湾' },
        drive: { en: '~2 h from Wenchang', zh: '距文昌约 2 小时' },
        plan: [
          {
            en: 'If the launch flew: a slow morning, then the drive south on toll-free expressways',
            zh: '如果发射顺利：上午慢慢来，然后走免费高速南下',
          },
          {
            en: 'If it was scrubbed: this is the spare morning for the next attempt, and the car means no rebooking',
            zh: '如果发射取消：这个上午就是下一次尝试的备用时间，有车就不用重新订票',
          },
          {
            en: 'Check in to the beach hotel or villa; first swim before the worst of the sun',
            zh: '入住海边酒店或别墅，趁阳光最烈之前先下水玩一会儿',
          },
        ],
        toddler: {
          en: 'Drive in the nap window. If you have taken the villa, agree the pool rule with everyone before the first swim.',
          zh: '把车程安排在午睡时段。如果住别墅，下水之前先和所有人约定好泳池看护规则。',
        },
        flexibility: 'buffer',
      },
      {
        date: '2026-09-19',
        dayLabel: { en: 'Day 5 · Sat', zh: '第 5 天 · 周六' },
        title: { en: 'Beach day at Clearwater Bay', zh: '清水湾海滩日' },
        base: { en: 'Lingshui · Clearwater Bay', zh: '陵水 · 清水湾' },
        drive: { en: 'Local only', zh: '仅市内短途' },
        plan: [
          {
            en: 'Morning on the sand — Clearwater Bay is calm and shallow, which is exactly what an 8-month-old needs',
            zh: '上午在沙滩上 —— 清水湾风浪小、水浅，正适合 8 个月大的宝宝',
          },
          {
            en: 'Lunch at the hotel, then the pool or a shaded nap for everyone',
            zh: '在酒店吃午饭，然后泡泳池，或在阴凉处午睡',
          },
          {
            en: 'Optional: 兴隆热带植物园 or the kids club, if the children need a change of scene',
            zh: '可选：兴隆热带植物园或儿童乐园，如果孩子需要换个环境',
          },
        ],
        toddler: {
          en: 'Jellyfish and strong sun are the two things to watch in September; ask at the hotel before swimming, and keep the baby in the shade between 11:00 and 15:00.',
          zh: '九月要留意水母和强烈日照；下水前先问一下酒店，11:00–15:00 之间让宝宝待在阴凉处。',
        },
        flexibility: 'flexible',
      },
      {
        date: '2026-09-20',
        dayLabel: { en: 'Day 6 · Sun', zh: '第 6 天 · 周日' },
        title: { en: 'Morning swim, then home from Sanya', zh: '早上玩水，然后从三亚返程' },
        base: { en: 'Home in Xiamen', zh: '回到厦门' },
        drive: { en: '~50 min to SYX', zh: '距三亚凤凰机场约 50 分钟' },
        plan: [
          {
            en: 'Early breakfast and a last paddle, then pack',
            zh: '早点吃早饭，最后再玩一次水，然后收拾行李',
          },
          {
            en: 'Leave for Sanya Phoenix with a wide margin — three hours at the airport with two children is realistic',
            zh: '留足时间前往三亚凤凰机场 —— 带两个孩子，预留 3 小时并不夸张',
          },
          {
            en: '11:20 flight home; drop the car at the airport',
            zh: '11:20 起飞回家，在机场还车',
          },
        ],
        toddler: {
          en: 'The 11:20 departure means no beach on the last morning unless you are up at dawn — plan the final swim for the evening before.',
          zh: '11:20 的航班意味着最后一天上午无法下海（除非天不亮就起来）—— 把最后一次玩水安排在头一天傍晚。',
        },
        flexibility: 'fixed',
      },
    ],
  },
  {
    id: 'six-nights',
    name: { en: 'Six nights · home from Haikou', zh: '6 晚 · 从海口返程' },
    subtitle: {
      en: '15 – 21 September 2026 · 3 nights Wenchang, 3 nights Clearwater Bay · cheapest flights, extra driving',
      zh: '2026 年 9 月 15 – 21 日 · 文昌 3 晚，清水湾 3 晚 · 机票最便宜，车程更长',
    },
    summary: {
      en: 'One extra beach day, and the cheapest pair of flights — but the return is from Haikou, three hours back up the island, for a 09:20 departure. That means either leaving Clearwater Bay before 04:30 with two small children, or adding a last night near the airport and losing the beach evening. The budget page prices both.',
      zh: '多住一晚海滩，而且机票最便宜 —— 但返程要从海口走，需要往北开 3 小时，且航班 09:20 起飞。这意味着要么带着两个小孩凌晨 4:30 前从清水湾出发，要么在机场附近多住一晚、牺牲海滩的最后一个傍晚。预算页对两种方案都做了测算。',
    },
    days: [
      {
        date: '2026-09-15',
        dayLabel: { en: 'Day 1 · Tue', zh: '第 1 天 · 周二' },
        title: { en: 'Fly to Haikou, drive up to Wenchang', zh: '飞抵海口，驱车前往文昌' },
        base: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
        drive: { en: '~1 h 30 m from HAK', zh: '距海口美兰机场约 1 小时 30 分' },
        plan: [
          { en: 'Land at 14:55, collect the MPV and both child seats, supermarket stop, then north to Longlou', zh: '14:55 落地，取商务车和两个儿童座椅，去超市采购，然后北上龙楼' },
          { en: 'Check in, walk the area, early night', zh: '办理入住，附近散步，早点休息' },
        ],
        toddler: { en: 'Same as the five-night plan: fly inside the nap window and feed the baby on descent.', zh: '与 5 晚方案相同：飞行安排在午睡时段，下降时给宝宝喂奶。' },
        flexibility: 'fixed',
      },
      {
        date: '2026-09-16',
        dayLabel: { en: 'Day 2 · Wed', zh: '第 2 天 · 周三' },
        title: { en: 'Wenchang: science centre, then launch prep', zh: '文昌：航天科普中心与发射准备' },
        base: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
        drive: { en: 'Local only', zh: '仅市内短途' },
        plan: [
          { en: '文昌航天科普中心 in the morning, beach or pool in the afternoon', zh: '上午去文昌航天科普中心，下午去海边或泳池' },
          { en: 'Scout the viewing area and parking, confirm tickets, pack the launch bag', zh: '探路观礼点和停车位置，确认门票，收拾发射背包' },
        ],
        toddler: { en: 'One quiet day before an early start. Let the grandmother rest in the afternoon too.', zh: '早起的发射日之前留一天轻松的安排。也让外婆下午休息一下。' },
        flexibility: 'flexible',
      },
      {
        date: '2026-09-17',
        dayLabel: { en: 'Day 3 · Thu · LAUNCH', zh: '第 3 天 · 周四 · 发射日' },
        title: { en: 'Rocket launch at Wenchang', zh: '文昌看火箭发射' },
        base: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
        drive: { en: '~15–40 min to the viewing area', zh: '距观礼区约 15–40 分钟' },
        plan: [
          { en: '04:45 wake, 05:30 leave, 06:00 in place with shade and water', zh: '04:45 起床，05:30 出发，06:00 到位并布置遮阴和饮水' },
          { en: '08:20 ear defenders on; window opens 08:25, lift-off listed 08:30', zh: '08:20 戴耳罩；08:25 窗口开启，起飞时间 08:30' },
          { en: 'Stay put for breakfast and let the traffic clear', zh: '留在原地吃早餐，等车流散去' },
        ],
        toddler: { en: 'The same launch-morning rules apply: ear defenders, shade, a carrier, and permission to retreat to the car.', zh: '发射当天早上的原则不变：耳罩、遮阴、背带，以及随时可以退回车里。' },
        flexibility: 'fixed',
      },
      {
        date: '2026-09-18',
        dayLabel: { en: 'Day 4 · Fri', zh: '第 4 天 · 周五' },
        title: { en: 'Buffer morning, then south to Clearwater Bay', zh: '上午留作缓冲，下午南下清水湾' },
        base: { en: 'Lingshui · Clearwater Bay', zh: '陵水 · 清水湾' },
        drive: { en: '~2 h from Wenchang', zh: '距文昌约 2 小时' },
        plan: [
          { en: 'Spare morning if the launch slipped; otherwise a slow start and the drive south', zh: '若发射延期，这个上午就是备用时间；否则慢慢出发，南下行驶' },
          { en: 'Check in, first swim before the peak sun', zh: '办理入住，趁阳光最烈前先下水' },
        ],
        toddler: { en: 'Drive during nap time; agree the pool rule before the first swim if you took the villa.', zh: '把车程安排在午睡时段；若住别墅，第一次下水前先约定泳池规则。' },
        flexibility: 'buffer',
      },
      {
        date: '2026-09-19',
        dayLabel: { en: 'Day 5 · Sat', zh: '第 5 天 · 周六' },
        title: { en: 'Beach day at Clearwater Bay', zh: '清水湾海滩日' },
        base: { en: 'Lingshui · Clearwater Bay', zh: '陵水 · 清水湾' },
        drive: { en: 'Local only', zh: '仅市内短途' },
        plan: [
          { en: 'Sand in the morning, pool after lunch, naps in the shade', zh: '上午玩沙，午饭后泡泳池，在阴凉处午睡' },
          { en: 'Optional excursion: 兴隆热带植物园 or the resort kids club', zh: '可选活动：兴隆热带植物园或度假村儿童乐园' },
        ],
        toddler: { en: 'Rash guards, hats and an infant sun tent matter more than the perfect spot on the sand.', zh: '防晒泳衣、帽子和婴儿遮阳帐篷，比在沙滩上占个好位置更重要。' },
        flexibility: 'flexible',
      },
      {
        date: '2026-09-20',
        dayLabel: { en: 'Day 6 · Sun', zh: '第 6 天 · 周日' },
        title: { en: 'A full beach day, and the long drive back north', zh: '整日海滩，晚上北返' },
        base: { en: 'Clearwater Bay, then north', zh: '清水湾，之后北上' },
        drive: { en: '~2 h 30 m – 3 h to Haikou', zh: '距海口约 2 小时 30 分 – 3 小时' },
        plan: [
          { en: 'A last full beach day — this is what the sixth night buys you', zh: '最后完整的一天海滩 —— 这就是第 6 晚换来的东西' },
          { en: 'Late afternoon: drive north to Haikou or the airport area, and sleep there', zh: '傍晚：北上前往海口或机场附近住宿' },
          { en: 'Alternative: stay on the beach and leave at 04:00 — with two children, do not', zh: '备选：留在海滩，凌晨 4:00 出发 —— 带两个孩子，不建议' },
        ],
        toddler: { en: 'Splitting the drive into a northward evening leg avoids a pre-dawn start, at the cost of the last beach evening.', zh: '把北返安排在傍晚，可以避免凌晨出发，代价是失去海滩的最后一个傍晚。' },
        flexibility: 'fixed',
      },
      {
        date: '2026-09-21',
        dayLabel: { en: 'Day 7 · Mon', zh: '第 7 天 · 周一' },
        title: { en: 'Fly home from Haikou', zh: '从海口飞回家' },
        base: { en: 'Home in Xiamen', zh: '回到厦门' },
        drive: { en: '~15 min to HAK', zh: '距海口美兰机场约 15 分钟' },
        plan: [
          { en: '09:20 departure — an easy morning if you slept near the airport', zh: '09:20 起飞 —— 住在机场附近的话，早上很从容' },
          { en: 'Return the car and fly home', zh: '还车，飞回家' },
        ],
        toddler: { en: 'The 09:20 flight is the cheapest of the four quotes and the kindest departure time if you reposition the night before.', zh: '09:20 的航班是四段报价中最便宜的，也是前一晚先转移住宿后最从容的起飞时间。' },
        flexibility: 'fixed',
      },
    ],
  },
];

export const DELAY_PLAN = [
  {
    when: { en: 'The launch slips by 24 hours', zh: '发射推迟 24 小时' },
    do: {
      en: 'Stay an extra night where you are and shunt everything one day later. Book a cancellable rate — Longlou runs at over 90% occupancy on launch nights, so a late rebooking is not guaranteed.',
      zh: '就地多住一晚，把后续行程整体后移一天。务必订可免费取消的价格 —— 发射期间龙楼入住率超过 90%，临时再订不一定有房。',
    },
  },
  {
    when: { en: 'The launch slips by 2–3 days', zh: '发射推迟 2–3 天' },
    do: {
      en: 'Swap the order: beach first, then drive back north for the new window. The one-way car hire makes this cheap to change; a fixed return flight is the only rigid cost.',
      zh: '调换顺序：先去海边，再北返迎接新的发射窗口。异地还车让改计划变得便宜，唯一硬性成本是已定的回程机票。',
    },
  },
  {
    when: { en: 'The launch slips past your dates', zh: '发射推迟到行程之后' },
    do: {
      en: 'Keep the holiday and watch the livestream. Wenchang launched 21 times in 2025, so there is usually another attempt within days — but do not chase it with an 8-month-old at the end of a long day.',
      zh: '照常度假，看直播就好。2025 年文昌发射了 21 次，通常几天内就有下一次 —— 但不要带着 8 个月大的宝宝在疲惫的一天末尾去追发射。',
    },
  },
  {
    when: { en: 'A typhoon warning is issued', zh: '发布台风预警' },
    do: {
      en: 'Orange or red warnings stop the Qiongzhou Strait ferries and then the airports. If you have not crossed yet, do not start; if you are on the island, sit tight — the car means you can move away from the worst of it.',
      zh: '橙色或红色预警会先停琼州海峡轮渡，随后影响机场。如果还没过海就不要出发；如果已经在岛上，就地等待 —— 有车可以带你们避开最严重的区域。',
    },
  },
];
