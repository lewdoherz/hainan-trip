import type { Bi, Confidence } from './types';

export interface Base {
  id: string;
  name: Bi;
  cn: string;
  driveToLonglou: Bi;
  beach: Bi;
  toddlerFit: number; // 0–100
  infantFit: number;
  hotelPerNight: Bi;
  priceBand: number; // midpoint ¥/night for a family, for the chart
  verdict: Bi;
  good: Bi;
  caveat: Bi;
  confidence: Confidence;
  sourceIds?: string[];
}

/**
 * Candidate places to stay, judged only on how they serve this trip: a launch
 * at Wenchang on the 17th, then a few beach days with an 8-month-old, a
 * 3-year-old and a grandmother.
 */
export const BASES: Base[] = [
  {
    id: 'longlou',
    name: { en: 'Longlou Town', zh: '龙楼镇' },
    cn: '龙楼镇',
    driveToLonglou: { en: 'In town — the sanctioned viewing points are 5–15 min away', zh: '就在镇内 —— 距官方观礼点 5–15 分钟' },
    beach: { en: 'Shanhaitian and Tongguling bays; Stone Park is rocky', zh: '山海天与铜鼓岭海湾；石头公园为礁石海岸' },
    toddlerFit: 62,
    infantFit: 66,
    hotelPerNight: { en: '¥279–570 in your screenshots; the Hilton runs higher', zh: '你的截图中为 ¥279–570；希尔顿更高' },
    priceBand: 480,
    verdict: {
      en: 'The only base that removes the launch-morning drive, and the right call for the nights of 15–17 September. Longlou runs at over 90% occupancy on launch nights, so book early.',
      zh: '唯一能省掉发射当天车程的落脚点，9 月 15–17 日住这里最合适。发射期间龙楼入住率高达 over 90%，务必尽早预订。',
    },
    good: {
      en: 'Walk or take a lift to a viewing point; launch atmosphere; the space science centre is here; the Wenchang hospital is the spaceport’s designated 三级甲等 facility.',
      zh: '步行或乘电梯即可到观礼点；发射氛围浓厚；航天科普中心就在这里；文昌市人民医院是发射场指定的三级甲等医院。',
    },
    caveat: {
      en: 'Locals call launch nights 一房难求. Quality varies between homestays, the town is quiet between launches, and Wenchang is the island’s typhoon corridor — most typhoons that reach Hainan make landfall here.',
      zh: '本地人说发射期间“一房难求”。民宿品质参差，平时镇上很安静；文昌还是全岛的台风走廊 —— 登陆海南的台风多数从这里上岸。',
    },
    confidence: 'screenshot',
    sourceIds: ['user-screenshots', 'hinews'],
  },
  {
    id: 'wenchang-city',
    name: { en: 'Wenchang · Gaolong Bay / city', zh: '文昌市 · 高隆湾' },
    cn: '文昌市 · 高隆湾',
    driveToLonglou: { en: '~30–40 min', zh: '约 30–40 分钟' },
    beach: {
      en: 'The calmest officially monitored swimming beach in Hainan: a 4A bay with a flat, sandy bottom, swim season April–October',
      zh: '海南最平缓的官方监测海水浴场之一：4A 级海湾，沙底平缓，游泳季为 4–10 月',
    },
    toddlerFit: 86,
    infantFit: 88,
    hotelPerNight: { en: '¥280–500', zh: '¥280–500' },
    priceBand: 400,
    verdict: {
      en: 'A genuinely calm swimming beach 30–40 minutes from the pad, with the island’s best hospital for this trip. Underrated as a post-launch base if you would rather not drive far.',
      zh: '距发射场 30–40 分钟，海水相对平静，而且拥有本次行程最合适的医院。如果不愿长途驾车，作为发射后的落脚点被低估了。',
    },
    good: {
      en: '风平浪缓、水洁沙白的天然泳场 — monitored under the national bathing-beach water-quality programme, so the water quality is actually checked.',
      zh: '“风平浪缓、水洁沙白的天然泳场” —— 纳入全国海水浴场水质监测，水质有实际监管。',
    },
    caveat: {
      en: 'Wenchang takes the largest share of Hainan’s typhoon landfalls (75% of storms affecting the island) and has the wettest September of any base here: 354 mm over 18 rain-days. The waterfront is older apartment stock rather than resort polish.',
      zh: '文昌是台风登陆最集中的地区（影响海南的台风约 75% 在此登陆），九月降雨也是各选项中最多的：354 毫米、18 个雨日。滨海以较早的公寓楼盘为主，度假氛围一般。',
    },
    confidence: 'verified',
    sourceIds: ['beach-bases', 'hinews'],
  },
  {
    id: 'clearwater',
    name: { en: 'Lingshui · Clearwater Bay', zh: '陵水 · 清水湾' },
    cn: '陵水 · 清水湾',
    driveToLonglou: { en: '~2 h (162 km)', zh: '约 2 小时（162 公里）' },
    beach: {
      en: 'The gentlest water in Hainan: you can wade about 200 m out and still be under 2 m deep, with Class I seawater',
      zh: '海南最平缓的海水：向外走约 200 米水深仍不足 2 米，水质为一类海水',
    },
    toddlerFit: 94,
    infantFit: 96,
    hotelPerNight: { en: '¥216–676 hotel rooms; ¥1,193–2,486 for a whole pool villa', zh: '酒店房间 ¥216–676；整栋泳池别墅 ¥1,193–2,486' },
    priceBand: 500,
    verdict: {
      en: 'The best beach base for this family, and the one your screenshots were already circling. Shallow, calm, flat — the only water here an 8-month-old can genuinely paddle in. It is also the only base where the villa option is both available and priced.',
      zh: '对本行程而言最合适的海滩落脚点，也正是你截图在看的地方。水浅、平静、沙底平缓 —— 是本次唯一真正适合 8 个月宝宝下水的海域。也是唯一既能订到别墅、价格又合理的落脚点。',
    },
    good: {
      en: '~50–60 min from Sanya airport for the flight home; a private-pool villa gives the grandmother her own bedroom; the Lingshui ocean theme park and duty-free mall give you a wet-day plan.',
      zh: '距三亚机场约 50–60 分钟，方便返程；私人泳池别墅让外婆有独立卧室；陵水海洋欢乐世界与免税店可作雨天备选。',
    },
    caveat: {
      en: 'The nearest top-tier (3A) hospital is 301 Hainan in Haitang Bay, 30–40 minutes away — Lingshui’s own hospital is only 二级甲等, so for anything serious you drive. The bay is 12 km of gated compounds: you need the car for everything.',
      zh: '最近的三甲医院是海棠湾的解放军总医院海南分院，车程 30–40 分钟 —— 陵水县医院仅为二级甲等，遇重症需要开车前往。海湾长达 12 公里、以封闭小区为主，去哪儿都要用车。',
    },
    confidence: 'verified',
    sourceIds: ['beach-bases', 'user-screenshots'],
  },
  {
    id: 'wanning-shimei',
    name: { en: 'Wanning · Shimei Bay', zh: '万宁 · 石梅湾' },
    cn: '万宁 · 石梅湾',
    driveToLonglou: { en: '~1 h 40 m', zh: '约 1 小时 40 分' },
    beach: {
      en: 'Beautiful, but a high-energy coast with mapped rip currents',
      zh: '景色优美，但属于离岸流风险较高的海岸',
    },
    toddlerFit: 70,
    infantFit: 58,
    hotelPerNight: { en: '¥140–570', zh: '¥140–570' },
    priceBand: 400,
    verdict: {
      en: 'The best-known resort coast, and a reasonable second choice — but not somewhere to let small children into the sea.',
      zh: '最知名的度假海岸，作为第二选择尚可 —— 但不适合让幼儿下海。',
    },
    good: { en: 'Quiet, wide sand and good resorts with kids’ pools; two hours from the launch site.', zh: '沙滩宽阔安静，度假村儿童泳池不错；距发射场约 2 小时。' },
    caveat: {
      en: 'A tourist drowned here in August 2025 and lifeguards pulled 17 people out in July 2025 alone, which is why a watchtower with a jet-ski and drone was built. Swimming is pool-only with a baby.',
      zh: '2025 年 8 月有游客在此溺亡，仅 2025 年 7 月救生队就救起 17 人，因而增建了配备摩托艇与无人机的瞭望塔。带婴儿时只能下泳池。',
    },
    confidence: 'verified',
    sourceIds: ['beach-bases'],
  },
  {
    id: 'wanning-riyue',
    name: { en: 'Wanning · Riyue Bay', zh: '万宁 · 日月湾' },
    cn: '万宁 · 日月湾',
    driveToLonglou: { en: '~1 h 40 m', zh: '约 1 小时 40 分' },
    beach: { en: 'National surf training base: average waves of 1–2 m', zh: '国家冲浪训练基地：平均浪高 1–2 米' },
    toddlerFit: 40,
    infantFit: 28,
    hotelPerNight: { en: '¥140–570', zh: '¥140–570' },
    priceBand: 350,
    verdict: {
      en: 'Rule it out for this trip. It is a surf beach — the water is the wrong shape for a toddler, let alone an infant.',
      zh: '本次行程直接排除。这里是冲浪海滩 —— 水况对幼儿不合适，更不用说婴儿。',
    },
    good: { en: 'Great to watch surfers from the sand with a coffee, with the 3-year-old.', zh: '适合端着咖啡在沙滩上看冲浪，3 岁的孩子也会觉得有趣。' },
    caveat: { en: 'Average wave height 1–2 m and the same rip-current regime as Shimei Bay.', zh: '平均浪高 1–2 米，离岸流风险与石梅湾相同。' },
    confidence: 'verified',
    sourceIds: ['beach-bases'],
  },
  {
    id: 'boao',
    name: { en: 'Qionghai · Boao', zh: '琼海 · 博鳌' },
    cn: '琼海 · 博鳌',
    driveToLonglou: { en: '~1 h 20 m', zh: '约 1 小时 20 分' },
    beach: {
      en: 'Yudai Beach is a sand spit with swimming explicitly banned',
      zh: '玉带滩为沙洲，明令禁止下海游泳',
    },
    toddlerFit: 62,
    infantFit: 52,
    hotelPerNight: { en: '¥150–330', zh: '¥150–330' },
    priceBand: 300,
    verdict: {
      en: 'The best town for a grandmother to stroll in — riverside, restaurants, two 3A hospitals — but it is not a beach holiday, because you cannot swim.',
      zh: '最适合外婆散步的小镇 —— 河边步道、餐馆众多、两家三甲医院 —— 但算不上海滩度假，因为不能下海。',
    },
    good: { en: 'Walkability, food, and the best medical cluster outside Haikou and Sanya (琼海市人民医院 and 瑞金医院海南医院, both 3A).', zh: '步道、餐饮，以及海口三亚之外最好的医疗资源（琼海市人民医院、瑞金医院海南医院，均为三甲）。' },
    caveat: {
      en: 'Signage at 玉带滩 reads 海浪危险，严禁下海游泳; the outer side is a documented rip-current zone with drownings every year, including three tourists in February 2024.',
      zh: '玉带滩的告示写着“海浪危险，严禁下海游泳”；外侧是记录在案的离岸流高发区，每年都有溺水事故，2024 年 2 月曾有三名游客被卷走。',
    },
    confidence: 'verified',
    sourceIds: ['beach-bases'],
  },
  {
    id: 'sanya',
    name: { en: 'Sanya (Yalong / Haitang Bay)', zh: '三亚（亚龙湾 / 海棠湾）' },
    cn: '三亚 · 亚龙湾 / 海棠湾',
    driveToLonglou: { en: '~3 h', zh: '约 3 小时' },
    beach: {
      en: 'Managed hotel beaches with real swell; the hotel pools are where small children actually swim',
      zh: '酒店管理的沙滩，仍有明显海浪；幼儿实际是在酒店泳池里玩水',
    },
    toddlerFit: 88,
    infantFit: 84,
    hotelPerNight: { en: '¥110–1,600; Atlantis-class from about ¥1,600', zh: '¥110–1,600；亚特兰蒂斯级别约 ¥1,600 起' },
    priceBand: 900,
    verdict: {
      en: 'The best facilities and hospitals, the most expensive, and three hours from the launch. Right as the final stop before flying home, wrong as the launch base.',
      zh: '设施与医院最好、价格最高，且距发射场 3 小时。作为返程前的最后一站合适，作为发射落脚点不合适。',
    },
    good: {
      en: '301 Hainan hospital is in Haitang district; duty-free mall, aquarium, splash parks and the most child-oriented resorts on the island; 35–45 minutes from SYX.',
      zh: '301 海南医院位于海棠区；免税城、水族馆、水上乐园，以及全岛最适合儿童的度假村；距三亚机场 35–45 分钟。',
    },
    caveat: {
      en: '42.8 km of exposed beach still carries ocean swell and rip currents, so a child’s water time is pool-only here too — which the Clearwater Bay villa already gives you for a third of the price. Swimming is restricted in much of Sanya city since 2023.',
      zh: '42.8 公里的开阔海岸仍有海浪与离岸流，孩子同样只能玩泳池 —— 而清水湾的别墅以约三分之一的价格就能提供同样条件。2023 年起三亚市区多处海域限制游泳。',
    },
    confidence: 'verified',
    sourceIds: ['beach-bases'],
  },
  {
    id: 'haikou',
    name: { en: 'Haikou', zh: '海口' },
    cn: '海口',
    driveToLonglou: { en: '~1 h 20 m – 2 h', zh: '约 1 小时 20 分 – 2 小时' },
    beach: { en: 'City beaches, not the best on the island', zh: '城市海滩，并非全岛最佳' },
    toddlerFit: 76,
    infantFit: 80,
    hotelPerNight: { en: '¥350–900', zh: '¥350–900' },
    priceBand: 600,
    verdict: {
      en: 'Convenient for the airport and the last night before a morning flight, but a weak launch base and a weak beach.',
      zh: '机场便利，适合早班机前一晚；但作为发射落脚点和海滩都不理想。',
    },
    good: { en: 'Best hospitals on the island, museums, the tropical wildlife park, and the shortest transfer from HAK.', zh: '全岛最好的医院、博物馆、热带野生动植物园，且距美兰机场最近。' },
    caveat: { en: 'Six nights here would waste the trip; use it for a first or last night only.', zh: '在这里住六晚会浪费行程；只适合住第一晚或最后一晚。' },
    confidence: 'estimate',
  },
];

export interface Activity {
  id: string;
  name: Bi;
  cn: string;
  where: Bi;
  ageFit: Bi;
  duration: Bi;
  cost: Bi;
  verdict: Bi;
  suitable: 'great' | 'ok' | 'wait';
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'space-center',
    name: { en: 'Wenchang Space Science Centre', zh: '文昌航天科普中心' },
    cn: '文昌航天科普中心',
    where: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
    ageFit: { en: '3-year-old yes; 8-month-old fine — air-conditioned and stroller-friendly', zh: '3 岁适合；8 个月也可以 —— 有空调，可推婴儿车' },
    duration: { en: '2–3 h', zh: '2–3 小时' },
    cost: { en: 'Around ¥100 as a combo with Tongguling', zh: '与铜鼓岭联票约 ¥100' },
    verdict: {
      en: 'The one attraction that directly serves this trip — visit it the day before the launch so the 3-year-old understands what he is about to see.',
      zh: '唯一与本次行程直接相关的景点 —— 发射前一天去，让 3 岁的孩子明白明天要看的是什么。',
    },
    suitable: 'great',
  },
  {
    id: 'gaolong-beach',
    name: { en: 'Gaolong Bay beach and promenade', zh: '高隆湾海滩与滨海步道' },
    cn: '高隆湾',
    where: { en: 'Wenchang city', zh: '文昌市区' },
    ageFit: { en: 'Ideal for both', zh: '两个孩子都适合' },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: 'Free', zh: '免费' },
    verdict: {
      en: 'Warm, calm, officially monitored water with a promenade for the stroller and seafood minutes away — the most underrated swimming beach for this trip.',
      zh: '水温适宜、水面平静、有官方水质监测，步道可推婴儿车，附近就有海鲜 —— 本次行程中最被低估的海水浴场。',
    },
    suitable: 'great',
  },
  {
    id: 'clearwater-beach',
    name: { en: 'Clearwater Bay beach', zh: '清水湾海滩' },
    cn: '清水湾',
    where: { en: 'Lingshui', zh: '陵水' },
    ageFit: { en: 'The best water here for an 8-month-old and a toddler', zh: '本次最适合 8 个月宝宝和幼儿的海域' },
    duration: { en: 'A day or two', zh: '一两天' },
    cost: { en: 'Free', zh: '免费' },
    verdict: {
      en: 'Wade 200 m out and it is still under 2 m deep, with Class I seawater — the reason Clearwater Bay wins as the beach base.',
      zh: '向外走 200 米水深仍不足 2 米，水质为一类海水 —— 这就是清水湾胜出的原因。',
    },
    suitable: 'great',
  },
  {
    id: 'ocean-park',
    name: { en: 'Hainan Lingshui Ocean Paradise theme park', zh: '海南陵水海洋欢乐世界' },
    cn: '海南陵水海洋欢乐世界',
    where: { en: 'Lingshui (the Hyatt Regency sits on it)', zh: '陵水（凯悦酒店即建在园区内）' },
    ageFit: { en: '3-year-old great; the 8-month-old sits most of it out', zh: '3 岁很适合；8 个月的宝宝大部分项目只能旁观' },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: 'About ¥246–298 per adult, under-1 m free', zh: '成人约 ¥246–298，1 米以下免费' },
    verdict: {
      en: 'The wet-day plan in Lingshui, and a genuine hit with the 3-year-old. Stay at the Hyatt and you are inside the resort.',
      zh: '陵水的雨天备选，3 岁的孩子会非常喜欢。住凯悦就等于住在园区里。',
    },
    suitable: 'ok',
  },
  {
    id: 'xinglong-gardens',
    name: { en: 'Xinglong Tropical Botanical Gardens', zh: '兴隆热带植物园' },
    cn: '兴隆热带植物园',
    where: { en: 'Wanning · Xinglong', zh: '万宁 · 兴隆' },
    ageFit: { en: '3-year-old yes; stroller-friendly for the baby', zh: '3 岁适合；可推婴儿车' },
    duration: { en: '2–3 h', zh: '2–3 小时' },
    cost: { en: 'Around ¥60–90 per adult', zh: '成人约 ¥60–90' },
    verdict: {
      en: 'Shaded paths, a small train and a coffee stop — the easiest “real” excursion with two small children, and on the way south.',
      zh: '有树荫步道、小火车和咖啡休憩点 —— 带两个小孩最容易成行的“正经”游玩项目，且顺路南下。',
    },
    suitable: 'great',
  },
  {
    id: 'wildlife-park',
    name: { en: 'Hainan Tropical Wildlife Park', zh: '海南热带野生动植物园' },
    cn: '海南热带野生动植物园',
    where: { en: 'Near Haikou', zh: '海口附近' },
    ageFit: { en: 'The 3-year-old loves it; the baby travels in a carrier', zh: '3 岁的孩子很喜欢；婴儿用背带' },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: 'Around ¥100–140 per adult', zh: '成人约 ¥100–140' },
    verdict: {
      en: 'Worth it on the way in or out of Haikou — the drive-through sections mean very little walking with the stroller.',
      zh: '进出海口时顺路可去 —— 有自驾游览区，推婴儿车步行的距离很短。',
    },
    suitable: 'ok',
  },
  {
    id: 'tongguling',
    name: { en: 'Tongguling', zh: '铜鼓岭' },
    cn: '铜鼓岭',
    where: { en: 'Wenchang · Longlou', zh: '文昌 · 龙楼镇' },
    ageFit: { en: 'A shuttle and a short walk; no stroller', zh: '需乘观光车并步行一段；不适合婴儿车' },
    duration: { en: '2 h', zh: '2 小时' },
    cost: { en: '¥50 plus ¥30–45 shuttle, or ¥100 combo with the science centre', zh: '门票 ¥50，观光车 ¥30–45，与科普中心联票 ¥100' },
    verdict: {
      en: 'The best panorama of the coast and both launch complexes — do it on the 16th, not on launch morning.',
      zh: '俯瞰海岸线与两个发射场的最佳视角 —— 安排在 16 日，而不是发射当天早上。',
    },
    suitable: 'ok',
  },
  {
    id: 'islands',
    name: { en: 'Boundary Island / Wuzhizhou Island boat trips', zh: '分界洲岛 / 蜈支洲岛' },
    cn: '分界洲岛 / 蜈支洲岛',
    where: { en: 'Lingshui / Sanya', zh: '陵水 / 三亚' },
    ageFit: { en: 'Not with an 8-month-old in September heat', zh: '九月高温下不适合带 8 个月的宝宝' },
    duration: { en: 'Full day', zh: '一整天' },
    cost: { en: '¥150–400 per adult', zh: '成人 ¥150–400' },
    verdict: {
      en: 'Skip this trip: two boat rides, all-day sun and no shade, with an infant and a toddler who cannot swim.',
      zh: '这次先跳过：两趟船程、全天暴晒且缺少遮阴，还要带不会游泳的幼儿和婴儿。',
    },
    suitable: 'wait',
  },
  {
    id: 'yanoda',
    name: { en: 'Yanoda Rainforest / forest parks', zh: '呀诺达热带雨林' },
    cn: '呀诺达热带雨林',
    where: { en: 'Baoting / Sanya', zh: '保亭 / 三亚' },
    ageFit: { en: 'Steep and humid — hard with a stroller, impossible with a carrier for hours', zh: '坡陡湿闷 —— 推车困难，长时间背抱更不现实' },
    duration: { en: 'Full day', zh: '一整天' },
    cost: { en: '¥120–200 per adult', zh: '成人 ¥120–200' },
    verdict: { en: 'Beautiful, but leave it for a future trip without a baby.', zh: '景色很好，但留到以后不带婴儿的行程再去。' },
    suitable: 'wait',
  },
];

export const FAMILY_LOGISTICS = [
  {
    title: { en: 'Rip currents are the real sea hazard', zh: '离岸流才是真正的海上风险' },
    detail: {
      en: 'Hainan has formally surveyed rip-current risk along 112 km of sandy coast — 35 segments and 66 bathing beaches — and the incidents are documented, not rare: a drowning at Shimei Bay in August 2025, 17 rescues there in July 2025 alone, three tourists swept away at Boao in February 2024. Swim at monitored beaches only (Clearwater Bay, Gaolong Bay), keep both children within arm’s reach, and never let a child into the sea on a beach with no flag system.',
      zh: '海南已对 112 公里砂质海岸（35 个岸段、66 处海水浴场）正式普查离岸流风险，事故并非偶发：2025 年 8 月石梅湾有游客溺亡，仅 2025 年 7 月当地救起 17 人，2024 年 2 月博鳌有三名游客被卷走。只在有监测的海滩下水（清水湾、高隆湾），两个孩子始终保持在伸手可及范围内，无旗语系统的海滩绝不让孩子下海。',
    },
  },
  {
    title: { en: 'Private pools and very small children', zh: '私人泳池与幼儿' },
    detail: {
      en: 'A villa pool is realistic but high-consequence: an infant drowns silently, in seconds, in a few centimetres of water. China has no mandatory barrier code for private villa pools (France does), so this is a request-the-host question: ask in writing for 泳池护栏 (fence), 泳池盖 (cover) or 泳池报警器 (alarm) and get photos before booking. Mesh fencing sells for about ¥69 a metre if you buy it yourself. Otherwise nominate one adult as pool watcher — no phone, eyes on the water — and consider learning infant CPR before you fly.',
      zh: '别墅泳池现实可行，但后果严重：婴儿溺水是无声的，只需几秒、几厘米水深。中国对私人别墅泳池没有强制防护法规（法国有），因此必须主动向房东确认：预订前以书面形式要求泳池护栏、泳池盖或泳池报警器，并索取照片。自己买护栏网约 ¥69/米。否则就要指定一名大人专职看护 —— 不看手机、视线不离水面 —— 并考虑出发前学习婴儿心肺复苏。',
    },
  },
  {
    title: { en: 'Typhoons and rain', zh: '台风与降雨' },
    detail: {
      en: 'September averages 1.7 tropical cyclones affecting Hainan province and 0.5 landfalls on the island (maximum two); September–October together average 3.3, with around one landfall. Autumn storms skew stronger: Typhoon Yagi made landfall in Wenchang in September 2024 as the strongest September typhoon ever recorded for the island. September rainfall: Wenchang 354 mm over 18 rain-days, Wanning 372 mm, Lingshui 324 mm, Sanya 249 mm — Sanya is roughly a third drier. Ferries and both airports are the first systems suspended. Keep two indoor days in reserve and book free-cancellation rates.',
      zh: '九月平均有 1.7 个热带气旋影响海南省、0.5 个登陆海南岛（最多 2 个）；九至十月合计平均 3.3 个、约 1 个登陆。秋季台风往往更强：2024 年 9 月的台风“摩羯”在文昌登陆，是有记录以来登陆海南最强的九月台风。九月降雨：文昌 354 毫米／18 个雨日，万宁 372 毫米，陵水 324 毫米，三亚 249 毫米 —— 三亚约少三分之一。轮渡与两个机场最先停运。预留两个室内日，并订可免费取消的价格。',
    },
  },
  {
    title: { en: 'Hospitals, by base', zh: '各落脚点的医院' },
    detail: {
      en: 'Wenchang People’s Hospital (同济文昌医院) is 三级甲等 and is the spaceport’s designated medical-support hospital — the best option near the launch. Lingshui’s own hospital is only 二级甲等, so from Clearwater Bay the nearest top-tier care is 301 Hainan (解放军总医院海南分院) in Haitang Bay, 30–40 minutes by car: pre-book a car and driver rather than relying on a taxi at night. Boao has the best medical cluster outside Haikou and Sanya (琼海市人民医院 and 瑞金医院海南医院, both 3A).',
      zh: '文昌市人民医院（同济文昌医院）为三级甲等，是发射场指定的医疗救护医院 —— 发射期间附近最好的选择。陵水县医院仅为二级甲等，因此在清水湾如需高水平医疗，最近的是海棠湾的解放军总医院海南分院（301 海南医院），车程 30–40 分钟：建议提前包车配司机，不要指望夜里临时打车。博鳌拥有海口、三亚之外最好的医疗资源（琼海市人民医院、瑞金医院海南医院，均为三甲）。',
    },
  },
  {
    title: { en: 'Dates are in the pre-holiday trough', zh: '这段时间正好在假期前的空档' },
    detail: {
      en: 'Mid-Autumn Festival 2026 falls on 25–27 September and National Day on 1–7 October, so the shoulder-season prices in your screenshots are real: Hainan’s peak season starts on 1 October. Note also that Sunday 20 September 2026 is a national make-up workday, which suppresses that weekend’s domestic travel — good news for quiet beaches, less good if you wanted hotel events.',
      zh: '2026 年中秋节为 9 月 25–27 日，国庆为 10 月 1–7 日，因此你截图中的淡旺季价格是真实的：海南的旺季从 10 月 1 日开始。另外，2026 年 9 月 20 日（周日）为全国调休上班日，会压低那个周末的国内出行 —— 好处是海滩更清静，代价是酒店活动较少。',
    },
  },
  {
    title: { en: 'Child restraint law', zh: '儿童安全座椅法规' },
    detail: {
      en: 'Chinese law requires guardians to use child restraints for young children; the revised minors-protection law took effect in June 2021, but enforcement and provincial rules vary and Hainan’s exact requirement could not be verified. Rental fleets rarely include seats by default, so treat “we will get one at the desk” as a plan that can fail.',
      zh: '中国法律规定监护人应为幼儿使用安全座椅；修订后的未成年人保护法自 2021 年 6 月起施行，但执法力度与各省规定不一，海南的具体要求未能核实。租车公司通常不默认配座椅，因此不要把“到柜台再拿一个”当作可靠计划。',
    },
  },
  {
    title: { en: 'Baby supplies', zh: '婴儿用品' },
    detail: {
      en: 'Diapers, formula, wipes and jar food are easy to find in Haikou, Wenchang and Sanya at large supermarkets and pharmacies; brand choice is narrower in Lingshui. Formula runs ¥190–450 per 800 g tin and nappies about ¥1.1–1.2 each, so ¥60–120 a day is a realistic consumables budget. Bring enough for the first 24 hours and buy the rest there.',
      zh: '在海口、文昌、三亚的大型超市和药店很容易买到尿布、奶粉、湿巾和辅食；陵水的品牌选择较少。奶粉每罐 800 克约 ¥190–450，尿片每片约 ¥1.1–1.2，因此每天 ¥60–120 的消耗预算是合理的。带够头 24 小时的量，其余在当地购买。',
    },
  },
  {
    title: { en: 'Strollers and pavements', zh: '婴儿车与人行道' },
    detail: {
      en: 'Resorts and promenades are stroller-friendly; old-town streets, beaches and scenic hills are not. A lightweight stroller plus a baby carrier is the practical combination.',
      zh: '度假村和滨海步道适合推车；老城区街道、沙滩和山景步道则不适合。轻便婴儿车加背带是最实用的组合。',
    },
  },
];
