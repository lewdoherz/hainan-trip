import type { BudgetPackage, FlightQuote, LodgingOption } from './types';

/**
 * Everything in this file comes from the family's own booking-app screenshots
 * (11 images: Ctrip flight pages and Hainan hotel / villa listings for
 * 15–21 September 2026), read out with Windows OCR because this build
 * environment has no vision model.
 *
 * Digits are therefore REAL QUOTES but not independently confirmed — every
 * entry is labelled `screenshot` in the UI and every price is editable.
 */

// ---------------------------------------------------------------- flights ---

export const FLIGHTS: FlightQuote[] = [
  {
    id: 'out-hak-15',
    direction: 'out',
    date: '2026-09-15',
    fromCode: 'XMN',
    toCode: 'HAK',
    carrier: { en: 'Xiamen Airlines · 厦门航空', zh: '厦门航空' },
    depart: '12:50',
    arrive: '14:55',
    total: 2710,
    breakdown: {
      en: '2 adults + 1 child + 1 infant · economy, including airport and fuel fees',
      zh: '2 位成人 + 1 名儿童 + 1 名婴儿 · 经济舱，含机建燃油',
    },
    note: {
      en: 'Flight number is ambiguous in the screenshot (MF8541 / MF8341) — confirm when booking. Screenshot also shows optional 全能保障服务 at ¥48 and insurance at ¥40–50 per person.',
      zh: '截图中的航班号不清晰（MF8541 / MF8341），预订时请确认。截图还显示可选的全能保障服务 ¥48 及每人 ¥40–50 的保险。',
    },
    confidence: 'screenshot',
  },
  {
    id: 'out-syx-15',
    direction: 'out',
    date: '2026-09-15',
    fromCode: 'XMN',
    toCode: 'SYX',
    carrier: { en: 'Xiamen Airlines MF8397 · 厦门航空', zh: '厦门航空 MF8397' },
    depart: '08:40',
    arrive: '11:00',
    total: 2050,
    breakdown: {
      en: '2 adults + 1 child + 1 infant · economy, including airport and fuel fees',
      zh: '2 位成人 + 1 名儿童 + 1 名婴儿 · 经济舱，含机建燃油',
    },
    note: {
      en: 'Cheapest way in, and the flight number is now confirmed: MF8397 (the screenshot\'s “MF8597” is a Changsha–Korla service, so OCR misread it). Sanya is about 3 hours from Wenchang, so it means driving north for the launch.',
      zh: '最便宜的进岛方式，航班号已确认：MF8397（截图中的“MF8597”实为长沙—库尔勒航班，属 OCR 误读）。三亚距文昌约 3 小时车程，需要开车北上参加发射。',
    },
    confidence: 'screenshot',
  },
  {
    id: 'back-syx-20',
    direction: 'back',
    date: '2026-09-20',
    fromCode: 'SYX',
    toCode: 'XMN',
    carrier: { en: 'Sanya (SYX) → Xiamen (XMN), 11:20', zh: '三亚（SYX）→ 厦门（XMN），11:20' },
    depart: '11:20',
    total: 2194,
    breakdown: {
      en: 'Adult ¥550 · child ¥550 · infant ¥130 (2 adults = ¥1,100)',
      zh: '成人 ¥550 · 儿童 ¥550 · 婴儿 ¥130（2 位成人 = ¥1,100）',
    },
    note: {
      en: 'Leaves at 11:20, so the last morning is an airport morning, not a beach morning.',
      zh: '11:20 起飞，最后一天上午基本用于赶机场，无法下海。',
    },
    confidence: 'screenshot',
  },
  {
    id: 'back-hak-21',
    direction: 'back',
    date: '2026-09-21',
    fromCode: 'HAK',
    toCode: 'XMN',
    carrier: { en: 'Haikou (HAK) → Xiamen (XMN), 09:20 (unconfirmed)', zh: '海口（HAK）→ 厦门（XMN），09:20（未确认）' },
    depart: '09:20',
    total: 1854,
    breakdown: {
      en: 'Adult ¥440 · child ¥440 · infant ¥120 (2 adults = ¥880)',
      zh: '成人 ¥440 · 儿童 ¥440 · 婴儿 ¥120（2 位成人 = ¥880）',
    },
    note: {
      en: 'Cheapest return. Caution: the only daily HAK→XMN service I could verify in live schedules is HU7047 at 07:20–09:25, so the 09:20 time in your screenshot could not be confirmed — check it before planning the last morning. Either way you leave the beach the day before, or drive three hours from Clearwater Bay before dawn.',
      zh: '最便宜的返程。注意：我在实时航班数据中能核实的海口→厦门每日航班只有 HU7047（07:20–09:25），因此截图中的 09:20 无法确认 —— 安排最后一天前请先核实。无论如何，都需要提前一天离开海滩，或凌晨从清水湾开 3 小时车。',
    },
    confidence: 'screenshot',
  },
];

// ---------------------------------------------------------------- lodging ---

export const LODGING: LodgingOption[] = [
  {
    id: 'fulou',
    name: { en: 'Fulou Langyue Hotel (Longlou Space City)', zh: '福楼朗岳酒店' },
    cn: '福楼朗岳酒店（文昌龙楼航天城店）',
    area: 'wenchang',
    kind: 'hotel',
    roomsNeeded: 1,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 16–18 September in your screenshot — the only launch-dated price evidence you have. Opened 2025, a short walk from the space-city area, free cancellation until 18:00 on arrival day. If you would rather not pay launch-nights rates for the 15th as well, spend that first night in Wenchang city or Gaolong Bay and come here for the 16th and 17th; the budget prices whichever number of nights you set.',
      zh: '截图中的报价日期为 9 月 16–18 日 —— 这是你手上唯一带发射日期的价格证据。2025 年开业，步行可达航天城区域，入住当天 18:00 前可免费取消。若不想连 15 日也按发射期价格入住，可把第一晚放在文昌市区或高隆湾，16、17 日再来这里；预算会按你设定的晚数计算。',
    },
    rooms: [
      { id: 'fulou-xunxing', name: { en: 'Xunxing king room', zh: '闲逸·巡星大床房' }, price: 311, capacity: { en: '2 adults + 1 child free, 1.8 m bed', zh: '2 成人 + 1 儿童免费入住，1.8 米大床' } },
      { id: 'fulou-xunxing-nb', name: { en: 'Xunxing king room (no breakfast)', zh: '闲逸·巡星大床房（无早）' }, price: 279, capacity: { en: '2 adults + 1 child free', zh: '2 成人 + 1 儿童免费入住' } },
      { id: 'fulou-shuang', name: { en: 'Longlou twin room', zh: '街叙·龙楼双床房' }, price: 333, capacity: { en: '2 × 1.2 m beds, 2 adults + 1 child free', zh: '2 张 1.2 米单人床，2 成人 + 1 儿童免费入住' } },
      { id: 'fulou-shulang', name: { en: 'Shulang garden king room', zh: '疏朗·花庭大床房' }, price: 433, capacity: { en: '2 adults + 1 child free', zh: '2 成人 + 1 儿童免费入住' } },
      {
        id: 'fulou-family',
        name: { en: 'Nanyang family room', zh: '南洋·恬逸家庭房' },
        price: 468,
        capacity: { en: '1 king + 1 single · 3 adults + 1 child — sleeps the whole party in one room', zh: '1 张大床 + 1 张单人床 · 3 成人 + 1 儿童 —— 全家人可住一间' },
      },
      { id: 'fulou-hangtian', name: { en: 'Space-city view king room', zh: '航天城景大床房' }, price: 528, capacity: { en: '2 adults + 1 child free', zh: '2 成人 + 1 儿童免费入住' } },
      { id: 'fulou-lanshe', name: { en: 'Fulou Lanshe king room', zh: '福楼澜舍大床房' }, price: 570, capacity: { en: '2 adults + 1 child free', zh: '2 成人 + 1 儿童免费入住' } },
    ],
  },
  {
    id: 'hilton-wenchang',
    name: { en: 'Wenchang Hilton (Lüfa)', zh: '文昌绿发希尔顿酒店' },
    cn: '文昌绿发希尔顿酒店',
    area: 'wenchang',
    kind: 'hotel',
    roomsNeeded: 2,
    confidence: 'screenshot',
    sourceIds: ['wenchang-gov'],
    caveat: {
      en: 'Careful: this screenshot is priced for 12–13 September, not the launch nights — so ¥449–485 is a non-launch figure and 16–18 September will cost more. The hotel also lists a two-bedroom villa sleeping six, for which no launch-night price is published.',
      zh: '注意：这张截图的价格对应 9 月 12–13 日，并非发射期间 —— ¥449–485 属于非发射期价格，9 月 16–18 日会更贵。该酒店另有可住 6 人的两居室别墅，但未公布发射期间价格。',
    },
    note: {
      en: 'Opened 2015, kids club and play areas. The Hilton is on the 2022 CNSA list of official launch-viewing points.',
      zh: '2015 年开业，设有儿童乐园。该酒店在 2022 年国家航天局公布的官方观礼点名单中。',
    },
    rooms: [
      { id: 'hilton-twin', name: { en: 'Hilton twin room (garden view)', zh: '希尔顿客房双床房（花园景观）' }, price: 449, capacity: { en: '2 × 1.35 m beds, 2 adults', zh: '2 张 1.35 米双人床，2 成人' } },
      { id: 'hilton-king', name: { en: 'Hilton king room (garden view)', zh: '希尔顿客房大床房（花园景观）' }, price: 449, capacity: { en: '1 × 1.8 m bed, 2 adults', zh: '1 张 1.8 米大床，2 成人' } },
      { id: 'hilton-kids-twin', name: { en: 'Star Baby family twin room', zh: '星奇宝贝亲子双床房' }, price: 449, capacity: { en: 'Theme room for children', zh: '亲子主题房' } },
      { id: 'hilton-kids-king', name: { en: 'Star Baby family king room', zh: '星奇宝贝亲子大床房' }, price: 469, capacity: { en: 'Theme room for children', zh: '亲子主题房' } },
      { id: 'hilton-deluxe', name: { en: 'Deluxe view king room', zh: '豪华景观大床房' }, price: 469, capacity: { en: '2 adults', zh: '2 成人' } },
      { id: 'hilton-forest-twin', name: { en: 'Coconut-grove theme twin room', zh: '椰林秘寻主题双床房' }, price: 481, capacity: { en: '2 adults', zh: '2 成人' } },
      { id: 'hilton-space-twin', name: { en: 'Super Wings space theme twin room', zh: '超级飞侠太空主题双床房' }, price: 485, capacity: { en: '2 adults', zh: '2 成人' } },
    ],
  },
  {
    id: 'qinhe',
    name: { en: 'Qinhe Hotel, Clearwater Bay', zh: '陵水清水湾沁禾酒店' },
    cn: '陵水清水湾沁禾酒店（清水湾沙滩店）',
    area: 'beach',
    kind: 'hotel',
    roomsNeeded: 2,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 18–21 September. The cheapest credible beach option, and several room types state that two children stay free, so one room can hold the family of four.',
      zh: '截图中的报价日期为 9 月 18–21 日。性价比最高的海景选择，多个房型标注儿童免费入住，一间房即可住下四口之家。',
    },
    rooms: [
      { id: 'qinhe-tehui', name: { en: 'Elegant near-sea room (special rate)', zh: '雅致近海（特惠大床房）' }, price: 216, capacity: { en: '2 adults + 2 children free', zh: '2 成人 + 2 儿童免费入住' } },
      { id: 'qinhe-shushi', name: { en: 'Comfort king room', zh: '枕浪断海·舒适大床房' }, price: 244, capacity: { en: '2 adults + 2 children free', zh: '2 成人 + 2 儿童免费入住' } },
      { id: 'qinhe-suite', name: { en: 'Comfort king suite (living room, kitchen)', zh: '月升海岸·舒适大床套房（1 厅 1 卫 1 厨）' }, price: 249, capacity: { en: '2 adults + 2 children free · has a kitchen', zh: '2 成人 + 2 儿童免费入住 · 带厨房' } },
      { id: 'qinhe-suite-bedroom', name: { en: 'Comfort king suite with separate bedroom', zh: '漫步金沙·舒适大床套房带独立卧室' }, price: 272, note: { en: 'A separate bedroom for the grandmother.', zh: '有独立卧室，可给外婆住。' } },
      { id: 'qinhe-seaview', name: { en: 'Sea-view deluxe king room', zh: '推窗见海·观海豪华大床房' }, price: 290 },
      { id: 'qinhe-sunset', name: { en: 'Sunset sea-view deluxe king suite', zh: '欢乐海岸·长滩落日海景豪华大床套房' }, price: 290 },
      { id: 'qinhe-family-twin', name: { en: 'Family twin room with sea view', zh: '奇港湾·至海景家庭亲子双床房' }, price: 304, capacity: { en: 'Built for a family', zh: '家庭房型' } },
      { id: 'qinhe-frontline', name: { en: 'Front-line sea-view king suite', zh: '逐日长滩·一线海景大床套房' }, price: 313 },
    ],
  },
  {
    id: 'aloha',
    name: { en: 'Aloha Sea View Hotel, Clearwater Bay', zh: '海南清水湾阿罗哈海景酒店' },
    cn: '海南清水湾阿罗哈海景酒店',
    area: 'beach',
    kind: 'hotel',
    roomsNeeded: 2,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 18–21 September. The mid-range pick, with room types that include a washing machine and a balcony tub — genuinely useful with an 8-month-old.',
      zh: '截图中的报价日期为 9 月 18–21 日。中档之选，部分房型带洗衣机和阳台浴缸 —— 带 8 个月大的宝宝非常实用。',
    },
    rooms: [
      { id: 'aloha-garden-twin', name: { en: 'Garden twin room', zh: '园景双床房' }, price: 350 },
      { id: 'aloha-capybara-twin', name: { en: 'Capybara theme twin room', zh: '卡皮巴拉主题双床房' }, price: 343, capacity: { en: 'Theme room for children', zh: '亲子主题房' } },
      { id: 'aloha-capybara-king', name: { en: 'Capybara theme king room', zh: '卡皮巴拉主题大床房' }, price: 343, capacity: { en: 'Theme room for children', zh: '亲子主题房' } },
      { id: 'aloha-garden-king', name: { en: 'Garden king room', zh: '园景大床房' }, price: 378 },
      { id: 'aloha-sea-king', name: { en: 'Sea-view king room', zh: '海景大床房' }, price: 378 },
      { id: 'aloha-sea-twin', name: { en: 'Sea-view twin room', zh: '海景双床房' }, price: 378 },
      { id: 'aloha-garden-twin-laundry', name: { en: 'Lanhai garden twin room (washing machine + balcony tub)', zh: '揽海楼花园双床房（带洗衣机 + 阳台浴缸）' }, price: 430, note: { en: 'Washing machine in the room.', zh: '房间内带洗衣机。' } },
      { id: 'aloha-180', name: { en: '180° sea-view king room', zh: '180 度海景大床房' }, price: 460 },
      { id: 'aloha-180-twin', name: { en: 'Lanhai 180° sea-view twin room (laundry, balcony tub)', zh: '揽海楼 180 度海景双床房（洗衣机·阳台浴缸）' }, price: 519 },
    ],
  },
  {
    id: 'hyatt-rf',
    name: { en: 'Hyatt Regency, R&F Ocean Kingdom Resort', zh: '海南富力海洋欢乐世界度假区·凯悦酒店' },
    cn: '海南富力海洋欢乐世界度假区·凯悦酒店',
    area: 'beach',
    kind: 'hotel',
    roomsNeeded: 2,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 18–21 September. Part of the Ocean Kingdom theme-park resort, so there is a water park and a kids club on the doorstep — the most child-oriented base on this list.',
      zh: '截图中的报价日期为 9 月 18–21 日。属于海洋欢乐世界度假区，水上乐园与儿童乐园就在门口 —— 本清单中最适合孩子的住宿。',
    },
    rooms: [
      { id: 'hyatt-garden-king-nb', name: { en: 'Garden-view king room (no breakfast)', zh: '花园景观客房·特大床（无早）' }, price: 473 },
      { id: 'hyatt-garden-king', name: { en: 'Garden-view king room', zh: '花园景观客房·特大床' }, price: 558, note: { en: 'Includes 2 breakfasts.', zh: '含 2 份早餐。' } },
      { id: 'hyatt-garden-twin', name: { en: 'Garden-view twin room', zh: '花园景观客房·2 张单人床' }, price: 478 },
      { id: 'hyatt-bay-king', name: { en: 'Bay-view king room', zh: '海湾景客房·特大床' }, price: 528 },
      { id: 'hyatt-bay-twin', name: { en: 'Bay-view twin room', zh: '海湾景客房·2 张单人床' }, price: 528 },
      { id: 'hyatt-park-twin', name: { en: 'Park-view twin room (fireworks terrace)', zh: '乐园景双床房（烟花景观台）' }, price: 533 },
      { id: 'hyatt-park-king', name: { en: 'Park-view king room (fireworks terrace)', zh: '乐园景大床房（烟花景观台）' }, price: 552 },
      { id: 'hyatt-family-twin', name: { en: 'Deluxe family twin room (one large + one small bed)', zh: '豪华家庭双床房（一大一小床）' }, price: 578, capacity: { en: '2 adults + 2 children', zh: '2 成人 + 2 儿童' } },
      { id: 'hyatt-family-kids-king', name: { en: 'Playful family king room', zh: '童趣家庭大床房' }, price: 661 },
      { id: 'hyatt-family-kids-twin', name: { en: 'Park-view playful family twin room', zh: '乐园景童趣家庭双床房' }, price: 665 },
    ],
  },
  {
    id: 'vipers',
    name: { en: 'Vipers Hotel, Clearwater Bay', zh: '海南清水湾威珀斯酒店' },
    cn: '海南清水湾威珀斯酒店',
    area: 'beach',
    kind: 'hotel',
    roomsNeeded: 2,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 18–21 September. The premium hotel in Clearwater Bay: about twice the price of Aloha for the same three nights.',
      zh: '截图中的报价日期为 9 月 18–21 日。清水湾的高端选择：同样三晚，价格约为阿罗哈的两倍。',
    },
    rooms: [
      { id: 'vipers-elegant-twin-nb', name: { en: 'Elegant twin room (no breakfast)', zh: '雅致双床房（无早）' }, price: 693 },
      { id: 'vipers-elegant-king', name: { en: 'Elegant king room', zh: '雅致大床房' }, price: 693 },
      { id: 'vipers-elegant-twin', name: { en: 'Elegant twin room (2 breakfasts)', zh: '雅致双床房（含双早）' }, price: 844 },
      { id: 'vipers-deluxe-sea-twin', name: { en: 'Deluxe sea-view twin room', zh: '豪华海景双床房' }, price: 781 },
      { id: 'vipers-deluxe-sea-king', name: { en: 'Deluxe sea-view king room', zh: '豪华海景大床房' }, price: 781 },
      { id: 'vipers-preferred-sea-king', name: { en: 'Preferred sea-view king room', zh: '优选海景大床房' }, price: 988 },
      { id: 'vipers-preferred-sea-twin', name: { en: 'Preferred sea-view twin room', zh: '优选海景双床房' }, price: 988 },
      { id: 'vipers-premium-sea-king', name: { en: 'Premium sea-view king room', zh: '尊尚海景大床房' }, price: 1088 },
      { id: 'vipers-premium-sea-twin', name: { en: 'Premium sea-view twin room', zh: '尊尚海景双床房' }, price: 1088 },
    ],
  },
  {
    id: 'villa-huazhu',
    name: { en: 'Huazhu · Boya Meishu villa, Clearwater Bay', zh: '花筑·铂亚美墅民宿（清水湾）' },
    cn: '花筑·铂亚美墅民宿（陵水香水君澜店）',
    area: 'beach',
    kind: 'villa',
    roomsNeeded: 1,
    confidence: 'screenshot',
    sourceIds: ['user-screenshots'],
    note: {
      en: 'Quoted 18–21 September. Whole-villa rental with a private pool: the grandmother gets her own bedroom, and there is a kitchen and laundry. Opened 2023.',
      zh: '截图中的报价日期为 9 月 18–21 日。整栋别墅带私人泳池：外婆有自己的卧室，另有厨房和洗衣设施。2023 年开业。',
    },
    caveat: {
      en: 'A private pool with a 3-year-old and an 8-month-old is a serious drowning risk. Only book this with an agreed supervision rule and a host who can fence or cover the pool — see the safety note on this page.',
      zh: '带 3 岁和 8 个月大的孩子住私人泳池别墅，溺水风险很高。只有在明确看护规则、且房东能为泳池加围栏或加盖的情况下才值得预订 —— 请见本页安全提示。',
    },
    rooms: [
      { id: 'villa-1bed', name: { en: 'Chinese-style 1-bedroom pool villa', zh: '中式一房大床泳池别墅' }, price: 1193, bedrooms: 1, capacity: { en: '1 bedroom, living room, kitchen — 2 adults + 2 children', zh: '1 卧 1 厅 1 厨 —— 2 成人 + 2 儿童' } },
      { id: 'villa-2bed', name: { en: 'Chinese-style 2-bedroom pool villa', zh: '中式两居泳池别墅' }, price: 1300, bedrooms: 2, capacity: { en: '2 bedrooms, 2 living rooms, 2 bathrooms — sleeps 4–6', zh: '2 卧 2 厅 2 卫 —— 可住 4–6 人' } },
      { id: 'villa-2bed-kids', name: { en: 'Kids-play 2-bedroom pool villa', zh: '亲子乐园两房一厅泳池别墅' }, price: 1388, bedrooms: 2, capacity: { en: 'Play equipment for children', zh: '带儿童游乐设施' } },
      { id: 'villa-3bed-euro', name: { en: 'European-style 3-bedroom pool villa', zh: '欧式三房泳池别墅' }, price: 1424, bedrooms: 3, capacity: { en: '3 bedrooms, 2 living rooms, 2 bathrooms — sleeps 8', zh: '3 卧 2 厅 2 卫 —— 可住 8 人' } },
      { id: 'villa-3bed', name: { en: 'Chinese-style 3-bedroom pool villa (mahjong room)', zh: '中式三房泳池别墅（带麻将机）' }, price: 1624, bedrooms: 3, capacity: { en: '3 bedrooms — sleeps 8', zh: '3 卧 —— 可住 8 人' } },
      { id: 'villa-3bed-kids', name: { en: 'Kids 3-bedroom pool villa', zh: '亲子三房泳池别墅' }, price: 1724, bedrooms: 3 },
      { id: 'villa-4bed', name: { en: 'Chinese-style 4-bedroom pool villa', zh: '中式四房泳池别墅（带麻将机）' }, price: 1900, bedrooms: 4, capacity: { en: 'Sleeps 8', zh: '可住 8 人' } },
      { id: 'villa-3bed-luxe', name: { en: 'Deluxe 3-storey 3-bedroom pool villa', zh: '豪华 3 层大三居泳池别墅（含麻将机）' }, price: 2051, bedrooms: 3, capacity: { en: '5 bathrooms, sleeps 6', zh: '5 卫，可住 6 人' } },
      { id: 'villa-4bed-garden', name: { en: 'Sunny garden 4-bedroom near-sea pool villa', zh: '阳光花园四房泳池近海别墅' }, price: 2260, bedrooms: 4, capacity: { en: 'Sleeps 8', zh: '可住 8 人' } },
      { id: 'villa-4bed-luxe', name: { en: 'Deluxe detached 4-bedroom pool villa', zh: '豪华大四居独栋泳池别墅（麻将机）' }, price: 2486, bedrooms: 4, capacity: { en: 'Sleeps 10', zh: '可住 10 人' } },
    ],
  },
];

// --------------------------------------------------------------- packages ---

/**
 * Four concrete ways to assemble the trip from the quotes above. Everything is
 * derived from these configs, so you can also switch any single choice and the
 * totals recompute.
 */
export const BUDGET_PACKAGES: BudgetPackage[] = [
  {
    id: 'hotel-5n',
    name: { en: 'Hotels · 5 nights · home from Sanya', zh: '酒店方案 · 5 晚 · 三亚返程' },
    subtitle: { en: 'Fulou family room + 2 rooms at Aloha', zh: '福楼家庭房 + 阿罗哈 2 间房' },
    shape: {
      en: 'In via Haikou on the 15th, Wenchang for the launch, 2 beach nights, home from Sanya on the 20th.',
      zh: '15 日海口进岛，文昌看发射，海滩住 2 晚，20 日从三亚返程。',
    },
    driveNote: {
      en: 'One-way driving: Haikou → Wenchang → Clearwater Bay → Sanya. No backtracking.',
      zh: '单向行驶：海口 → 文昌 → 清水湾 → 三亚，全程不折返。',
    },
    config: {
      outFlightId: 'out-hak-15',
      backFlightId: 'back-syx-20',
      wenchangRoomId: 'fulou-family',
      beachRoomId: 'aloha-sea-twin',
      wenchangNights: 3,
      beachNights: 2,
      beachRooms: 2,
      foodMode: 'mixed',
      carClass: 'mpv',
    },
  },
  {
    id: 'hotel-6n',
    name: { en: 'Hotels · 6 nights · home from Haikou', zh: '酒店方案 · 6 晚 · 海口返程' },
    subtitle: { en: 'Fulou family room + 2 rooms at Aloha, one extra beach day', zh: '福楼家庭房 + 阿罗哈 2 间房，海滩多住一天' },
    shape: {
      en: 'In via Haikou, 3 beach nights, home from Haikou on the 21st — the cheapest flights, but you drive back north.',
      zh: '海口进岛，海滩住 3 晚，21 日从海口返程 —— 机票最便宜，但要开回北边。',
    },
    driveNote: {
      en: 'Adds a 3-hour drive back north to Haikou on the last day, with an 09:20 departure.',
      zh: '最后一天要往北开 3 小时回海口，且航班 09:20 起飞。',
    },
    tag: { en: 'Extra beach day', zh: '海滩多一天' },
    config: {
      outFlightId: 'out-hak-15',
      backFlightId: 'back-hak-21',
      wenchangRoomId: 'fulou-family',
      beachRoomId: 'aloha-sea-twin',
      wenchangNights: 3,
      beachNights: 3,
      beachRooms: 2,
      foodMode: 'mixed',
      carClass: 'mpv',
    },
  },
  {
    id: 'villa-5n',
    name: { en: 'Pool villa · 5 nights · home from Sanya', zh: '泳池别墅方案 · 5 晚 · 三亚返程' },
    subtitle: { en: '3-bedroom pool villa — grandmother gets her own room', zh: '三房泳池别墅 —— 外婆有独立房间' },
    shape: {
      en: 'In via Haikou, Wenchang for the launch, 2 nights in a whole villa, home from Sanya on the 20th.',
      zh: '海口进岛，文昌看发射，整栋别墅住 2 晚，20 日从三亚返程。',
    },
    driveNote: {
      en: 'Same one-way drive as the hotel plan, plus supermarket runs — a villa without a car does not work.',
      zh: '行驶路线与酒店方案相同，另需超市采购 —— 没有车住别墅不方便。',
    },
    tag: { en: 'Own room for grandma', zh: '外婆有独立房间' },
    config: {
      outFlightId: 'out-hak-15',
      backFlightId: 'back-syx-20',
      wenchangRoomId: 'fulou-family',
      beachRoomId: 'villa-3bed-euro',
      wenchangNights: 3,
      beachNights: 2,
      beachRooms: 1,
      foodMode: 'villa',
      carClass: 'mpv',
    },
  },
  {
    id: 'villa-6n',
    name: { en: 'Pool villa · 6 nights · home from Haikou', zh: '泳池别墅方案 · 6 晚 · 海口返程' },
    subtitle: { en: '3 beach nights in a villa, cheapest flights home', zh: '别墅住 3 晚，回程机票最便宜' },
    shape: {
      en: 'The most relaxed version: three beach nights in the villa, home from Haikou on the 21st.',
      zh: '最从容的版本：别墅住 3 晚海滩，21 日从海口返程。',
    },
    driveNote: {
      en: 'The 09:20 flight from Haikou after a 3-hour drive north means leaving Clearwater Bay before 04:30, or adding a last night near the airport.',
      zh: '从海口 09:20 起飞、且需北开 3 小时，意味着清水湾凌晨 4:30 前出发，或在机场附近加住一晚。',
    },
    tag: { en: 'Most relaxed', zh: '最从容' },
    config: {
      outFlightId: 'out-hak-15',
      backFlightId: 'back-hak-21',
      wenchangRoomId: 'fulou-family',
      beachRoomId: 'villa-3bed-euro',
      wenchangNights: 3,
      beachNights: 3,
      beachRooms: 1,
      foodMode: 'villa',
      carClass: 'mpv',
    },
  },
  {
    id: 'cheapest-flights',
    name: { en: 'Cheapest flights · in via Sanya, out via Haikou', zh: '最便宜机票 · 三亚进 / 海口出' },
    subtitle: { en: 'Hotels, 6 nights — saves ¥964 on airfare', zh: '酒店方案 6 晚 —— 机票省 ¥964' },
    shape: {
      en: 'In to Sanya on the 15th for two southern nights, drive north for the launch, then back south and out of Haikou on the 21st.',
      zh: '15 日飞三亚住两晚，北上参加发射，再南下，21 日从海口返程。',
    },
    driveNote: {
      en: 'Two long north–south legs add roughly 6 hours of driving with two small children — the saving buys kilometres, not comfort.',
      zh: '南北往返两次长途，带两个小孩约多出 6 小时车程 —— 省下的钱换来的是里程，不是舒适。',
    },
    tag: { en: 'Cheapest airfare', zh: '机票最便宜' },
    config: {
      outFlightId: 'out-syx-15',
      backFlightId: 'back-hak-21',
      wenchangRoomId: 'fulou-family',
      beachRoomId: 'qinhe-tehui',
      wenchangNights: 3,
      beachNights: 3,
      beachRooms: 2,
      foodMode: 'mixed',
      carClass: 'mpv',
    },
  },
];

// ------------------------------------------------------------------ notes ---

export const BUDGET_NOTES = {
  scope: {
    en: 'This budget covers the five of you travelling: flights for the four paying travellers, a room for the grandmother, the car, food and extras. Her own air ticket is excluded, as agreed.',
    zh: '本预算涵盖五人出行：四位付费旅客的机票、外婆的住宿、租车、餐饮与杂项。按约定，外婆的机票不计入。',
  },
  screenshotCaveat: {
    en: 'Every price tagged “from your screenshot” was read out of your 11 booking-app images with Windows OCR. The digits are real quotes from those screenshots, but OCR can misread a number — check each one in the itemised list.',
    zh: '所有标注“来自你的截图”的价格，都是通过 Windows OCR 从你的 11 张预订截图读取的。数字来自截图中的真实报价，但 OCR 可能识别错误 —— 请在明细中逐项核对。',
  },
  flightRules: {
    en: 'Behind the flight lines: a child aged 2–11 pays 50% of the adult fare and gets a seat, while a lap infant pays 10% with no seat and is exempt from the airport construction fee. The fuel surcharge since 5 August 2026 is ¥40 per adult on routes up to 800 km and ¥70 beyond, halved for children and waived for 10%-fare infants. Baggage: 20 kg each for adults and children; a lap infant has no allowance but one stroller or child car seat still flies free, and car seats must be checked in. Excess baggage costs 1.5% of the published economy fare per kilo — worth avoiding.',
    zh: '机票费用的依据：2–11 岁儿童按成人票价的 50% 计费并有座位；不占座婴儿按 10% 计费、免收机场建设费。自 2026 年 8 月 5 日起，燃油附加费为 800 公里以内每位成人 ¥40、超过 800 公里 ¥70，儿童减半，按 10% 计费的婴儿免收。行李：成人及儿童各 20 公斤；不占座婴儿没有免费额度，但仍可免费携带婴儿车或儿童安全座椅一件，安全座椅须托运。逾重行李按经济舱公布票价的 1.5%/公斤计收 —— 最好避免。',
  },
  rideshare: {
    en: 'If you would rather not drive: DiDi does book six-seat 商务车 at ¥25 base plus ¥4.9/km, which prices the key legs at roughly ¥480–650 for Meilan airport to Longlou, ¥900–1,100 for Wenchang to Clearwater Bay, and ¥250–330 for Clearwater Bay to Sanya airport. DiDi never supplies child seats, and the intercity legs have to be booked as a long-distance ride rather than hailed on the street.',
    zh: '如果不想自己开车：滴滴可以叫六座商务车，起步 ¥25 + ¥4.9/公里，主要路段大致为：美兰机场→龙楼 ¥480–650，文昌→清水湾 ¥900–1,100，清水湾→三亚机场 ¥250–330。滴滴不提供儿童座椅，跨城行程需按长途用车预约，无法路边随手叫车。',
  },
  poolSafety: {
    en: 'A private pool with a 3-year-old and an 8-month-old is the single biggest risk in this trip. Drowning is silent and takes seconds. If you take the villa: agree that one adult is always the pool watcher, ask the host in writing to fence or cover the pool, keep the doors to the pool deck locked, and never leave a child in the water or beside it alone — not even to answer the door.',
    zh: '带 3 岁和 8 个月大的孩子住带私人泳池的别墅，是本次行程中最大的风险。溺水是无声的，只需几秒。如果选择别墅：约定始终有一名大人专门看护泳池，以书面形式请房东加装围栏或池盖，通往外泳池的门保持上锁，绝不让孩子单独留在水中或池边 —— 哪怕只是去开门。',
  },
};
