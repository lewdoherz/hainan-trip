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
  priceBand: number; // midpoint ¥/night for a family room, for the chart
  verdict: Bi;
  good: Bi;
  caveat: Bi;
  confidence: Confidence;
}

/** Candidate places to stay, judged only on how they serve this trip. */
export const BASES: Base[] = [
  {
    id: 'longlou',
    name: { en: 'Longlou Town', zh: '龙楼镇' },
    cn: '龙楼镇',
    driveToLonglou: {
      en: 'In town — the sanctioned points are 5–15 min away',
      zh: '就在镇内——官方许可的观测点车程 5–15 分钟',
    },
    beach: {
      en: 'Shanhaitian and Tongguling bays; Stone Park is rocky',
      zh: '山海天湾和铜鼓岭海湾；石头公园以礁石为主',
    },
    toddlerFit: 62,
    infantFit: 66,
    hotelPerNight: {
      en: '¥250–600; up to ~¥1,200 at the Hilton on launch nights',
      zh: '¥250–600；发射日前后希尔顿酒店最高约 ¥1,200',
    },
    priceBand: 700,
    verdict: {
      en: 'The only base that removes the launch-morning drive, and the smartest single decision in this plan if we can book a room at one of the two hotels that are themselves official viewing points.',
      zh: '唯一能省掉发射日清晨车程的落脚点；如果我们能订到那两家本身就是官方观测点的酒店之一，这会是整个计划里最明智的一个决定。',
    },
    good: {
      en: 'Walk or take a lift to a sanctioned viewing point; launch atmosphere; 90–95% occupancy means the town is genuinely busy, which the 3-year-old will love.',
      zh: '步行或搭车即可到达官方许可观测点；发射氛围浓厚；90–95% 的入住率说明镇上确实热闹，3 岁的孩子会很喜欢。',
    },
    caveat: {
      en: 'Locals call launch nights 一房难求 — one room, hard to find. Prices spike, quality varies between homestays, and the town is quiet between launches. Prices here are unverified estimates.',
      zh: '当地人用“一房难求”形容发射夜的住宿。价格暴涨，各民宿品质参差，而且两次发射之间镇上很冷清。这里的价格是未经核实的估算。',
    },
    confidence: 'estimate',
  },
  {
    id: 'wenchang-city',
    name: { en: 'Wenchang · Gaolong Bay / city', zh: '文昌市 · 高隆湾／市区' },
    cn: '文昌市 · 高隆湾',
    driveToLonglou: { en: '~35–45 min', zh: '约 35–45 分钟' },
    beach: {
      en: 'Good swimming beach and promenade',
      zh: '优质海滨浴场和滨海步道',
    },
    toddlerFit: 84,
    infantFit: 86,
    hotelPerNight: { en: '¥300–800', zh: '¥300–800' },
    priceBand: 500,
    verdict: {
      en: 'The best balance: a real beach and normal hotel prices, with a manageable pre-dawn drive on launch morning.',
      zh: '最均衡的选择：有正经的海滩和正常价位的酒店，发射日清晨的车程也还能接受。',
    },
    good: {
      en: 'Restaurants, supermarkets, pharmacies, an easy beach, and a genuine holiday feel for the children.',
      zh: '餐厅、超市、药店齐全，海滩方便，孩子们能感受到真正的度假氛围。',
    },
    caveat: {
      en: 'The launch is only visible as a distant plume from here — you still drive to Longlou for the real thing.',
      zh: '从这里只能看到远处的一缕尾迹——想真正看发射还是得开车去龙楼。',
    },
    confidence: 'estimate',
  },
  {
    id: 'haikou',
    name: { en: 'Haikou', zh: '海口' },
    cn: '海口',
    driveToLonglou: { en: '~1 h 15 m – 1 h 45 m', zh: '约 1 小时 15 分 – 1 小时 45 分' },
    beach: {
      en: 'City beaches, not the best in Hainan',
      zh: '城市海滩，不是海南最好的',
    },
    toddlerFit: 76,
    infantFit: 82,
    hotelPerNight: { en: '¥350–1,000', zh: '¥350–1,000' },
    priceBand: 600,
    verdict: {
      en: 'Convenient for the airport and for a city day, but the 1.5 h pre-dawn drive makes it a weak launch base.',
      zh: '机场和市区一日游都方便，但清晨 1.5 小时的车程让它不适合作为发射落脚点。',
    },
    good: {
      en: 'Best hospitals (文昌市人民医院 is closer), museums, the tropical wildlife park for the 3-year-old, and the easiest airport transfer.',
      zh: '医院条件最好（不过文昌市人民医院更近）、有博物馆、适合 3 岁孩子的热带野生动植物园，机场接送也最方便。',
    },
    caveat: {
      en: 'You are trading 3 hours of driving on launch morning for city comfort — do it only for the first or last night.',
      zh: '这是用发射日清晨 3 小时车程换城市舒适度——只适合安排在头一晚或最后一晚。',
    },
    confidence: 'estimate',
  },
  {
    id: 'qionghai',
    name: { en: 'Qionghai · Boao', zh: '琼海 · 博鳌' },
    cn: '琼海 · 博鳌',
    driveToLonglou: { en: '~1 h', zh: '约 1 小时' },
    beach: {
      en: 'Boao beaches and the river mouth',
      zh: '博鳌的海滩与河口',
    },
    toddlerFit: 78,
    infantFit: 80,
    hotelPerNight: { en: '¥350–900', zh: '¥350–900' },
    priceBand: 550,
    verdict: {
      en: 'A quiet, grown-up coast with resorts on the water, roughly halfway between Haikou and Wenchang.',
      zh: '一片安静、偏成人向的海岸，度假村临水而建，大致位于海口和文昌中间。',
    },
    good: {
      en: 'Calm resorts with pools, short drive to the launch, and Boao airport nearby if flights exist from Xiamen.',
      zh: '度假村安静且带泳池，到发射场车程短，附近还有博鳌机场（如果厦门有航班）。',
    },
    caveat: {
      en: 'Fewer toddler attractions than Haikou or Sanya, and the local airport has a thin route network.',
      zh: '适合幼儿的景点比海口或三亚少，而且当地机场航线很少。',
    },
    confidence: 'estimate',
  },
  {
    id: 'wanning',
    name: { en: 'Wanning · Shimei Bay / Riyue Bay', zh: '万宁 · 石梅湾／日月湾' },
    cn: '万宁 · 石梅湾 / 日月湾',
    driveToLonglou: { en: '~1 h 45 m', zh: '约 1 小时 45 分' },
    beach: {
      en: 'The best-kept beaches on the island',
      zh: '全岛保护得最好的海滩',
    },
    toddlerFit: 88,
    infantFit: 88,
    hotelPerNight: { en: '¥400–1,500', zh: '¥400–1,500' },
    priceBand: 800,
    verdict: {
      en: 'Our pick for the post-launch holiday: quiet, excellent resorts, and a shorter drive from Wenchang than Sanya — with the calm, shallow water an 8-month-old needs.',
      zh: '发射后度假我们选这里：安静、度假村出色，从文昌开车比去三亚更近，而且有 8 个月大婴儿需要的平静浅水。',
    },
    good: {
      en: 'Shimei Bay is calm and shallow, which is exactly what an 8-month-old needs; family resorts with kids’ pools, botanical gardens at Xinglong nearby, and none of the Sanya crowds.',
      zh: '石梅湾平静水浅，正是 8 个月大婴儿需要的；有带儿童泳池的亲子度假村，附近还有兴隆的热带植物园，而且完全没有三亚的人潮。',
    },
    caveat: {
      en: 'Thin restaurant choice outside the resorts. Riyue Bay, 20 minutes away, is a surf beach — good to watch, wrong water for a baby.',
      zh: '度假村外餐饮选择很少。20 分钟车程外的日月湾是冲浪海滩——看看浪不错，但水况不适合婴儿。',
    },
    confidence: 'estimate',
  },
  {
    id: 'lingshui',
    name: { en: 'Lingshui · Clearwater Bay', zh: '陵水 · 清水湾' },
    cn: '陵水 · 清水湾',
    driveToLonglou: { en: '~2 h 15 m', zh: '约 2 小时 15 分' },
    beach: {
      en: 'Long, calm, resort-lined bay',
      zh: '绵长平静、度假村林立的海湾',
    },
    toddlerFit: 85,
    infantFit: 87,
    hotelPerNight: { en: '¥400–1,400', zh: '¥400–1,400' },
    priceBand: 750,
    verdict: {
      en: 'Calm, clear, shallow water and a quieter alternative to Sanya — the best swimming for an infant, and only ~50 min from SYX for the flight home.',
      zh: '水清、平静、浅，是比三亚更清静的选择——最适合婴儿游泳，而且回程航班去 SYX 只要约 50 分钟。',
    },
    good: {
      en: 'Calm water, resort facilities for children, and only ~50 min from SYX.',
      zh: '水面平静，有适合儿童的度假村设施，到 SYX 仅约 50 分钟。',
    },
    caveat: {
      en: 'More spread out; you will use the car for everything.',
      zh: '区域比较分散，去哪里都得开车。',
    },
    confidence: 'estimate',
  },
  {
    id: 'sanya',
    name: { en: 'Sanya', zh: '三亚' },
    cn: '三亚',
    driveToLonglou: { en: '~2 h 45 m – 3 h 30 m', zh: '约 2 小时 45 分 – 3 小时 30 分' },
    beach: {
      en: 'The island’s best-known beaches',
      zh: '全岛最知名的海滩',
    },
    toddlerFit: 90,
    infantFit: 88,
    hotelPerNight: { en: '¥500–2,500', zh: '¥500–2,500' },
    priceBand: 1100,
    verdict: {
      en: 'The best holiday, the worst launch logistics. Right as the final stop before flying home, wrong as the launch base.',
      zh: '度假最好，发射后勤最差。作为回程前最后一站很合适，作为发射落脚点则不合适。',
    },
    good: {
      en: 'Yalong Bay and Haitang Bay resorts, aquariums, splash parks, restaurants and hospitals.',
      zh: '亚龙湾和海棠湾的度假村、水族馆、水上乐园、餐厅和医院。',
    },
    caveat: {
      en: 'Three hours from Wenchang and the highest prices in Hainan.',
      zh: '离文昌三小时车程，而且是海南物价最高的地方。',
    },
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
    ageFit: {
      en: '3-year-old yes; 8-month-old fine (air-conditioned, stroller OK)',
      zh: '3 岁孩子适合；8 个月婴儿也没问题（有空调，可推婴儿车）',
    },
    duration: { en: '2–3 h', zh: '2–3 小时' },
    cost: { en: '¥50–100 per adult', zh: '每名成人 ¥50–100' },
    verdict: {
      en: 'The one attraction that directly serves the trip — visit it the day before the launch so the 3-year-old understands what he is about to see.',
      zh: '唯一直接服务于这次行程的景点——在发射前一天去，好让 3 岁的孩子明白自己即将看到什么。',
    },
    suitable: 'great',
  },
  {
    id: 'gaolong-beach',
    name: { en: 'Gaolong Bay beach and promenade', zh: '高隆湾海滩和滨海步道' },
    cn: '高隆湾',
    where: { en: 'Wenchang city', zh: '文昌市' },
    ageFit: { en: 'Ideal for both', zh: '两个孩子都适合' },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: 'Free', zh: '免费' },
    verdict: {
      en: 'Warm shallow water, a promenade for the stroller and restaurants minutes away. Our default afternoon with an infant.',
      zh: '温暖浅水，滨海步道适合推婴儿车，餐厅就在几分钟路程内。带婴儿时我们默认的下午安排。',
    },
    suitable: 'great',
  },
  {
    id: 'shimei-bay',
    name: { en: 'Shimei Bay beach', zh: '石梅湾海滩' },
    cn: '石梅湾',
    where: { en: 'Wanning', zh: '万宁' },
    ageFit: { en: 'Ideal for both', zh: '两个孩子都适合' },
    duration: { en: 'A day or two', zh: '一两天' },
    cost: {
      en: 'Free (resort beach clubs charge for loungers)',
      zh: '免费（度假村海滩俱乐部的躺椅收费）',
    },
    verdict: {
      en: 'Quiet, wide and clean, with resorts that cater to families. The best beach base within two hours of Wenchang.',
      zh: '安静、宽阔、干净，有主打亲子的度假村。文昌两小时车程内最好的海滩落脚点。',
    },
    suitable: 'great',
  },
  {
    id: 'xinglong-gardens',
    name: { en: 'Xinglong Tropical Botanical Gardens', zh: '兴隆热带植物园' },
    cn: '兴隆热带植物园',
    where: { en: 'Wanning · Xinglong', zh: '万宁 · 兴隆' },
    ageFit: {
      en: '3-year-old yes; stroller-friendly for the baby',
      zh: '3 岁孩子适合；婴儿可推车',
    },
    duration: { en: '2–3 h', zh: '2–3 小时' },
    cost: { en: '~¥60–90 per adult', zh: '每名成人约 ¥60–90' },
    verdict: {
      en: 'Shaded paths, a small train and a coffee break — the easiest “real” excursion with two small children.',
      zh: '有树荫步道、小火车和咖啡休息——带两个小孩最容易实现的“正经”出游。',
    },
    suitable: 'great',
  },
  {
    id: 'wildlife-park',
    name: { en: 'Hainan Tropical Wildlife Park', zh: '海南热带野生动植物园' },
    cn: '海南热带野生动植物园',
    where: { en: 'Near Haikou', zh: '海口附近' },
    ageFit: {
      en: '3-year-old loves it; baby fine in a carrier',
      zh: '3 岁孩子会很喜欢；婴儿用背带没问题',
    },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: '~¥100–140 per adult', zh: '每名成人约 ¥100–140' },
    verdict: {
      en: 'Worth it on the way in or out of Haikou — drive-through sections mean minimal walking with the stroller.',
      zh: '进出海口时值得一去——有自驾游览区，推婴儿车走的路很少。',
    },
    suitable: 'ok',
  },
  {
    id: 'museum',
    name: { en: 'Hainan Museum', zh: '海南省博物馆' },
    cn: '海南省博物馆',
    where: { en: 'Haikou', zh: '海口' },
    ageFit: {
      en: 'Good rainy-day option for the 3-year-old',
      zh: '适合 3 岁孩子的雨天备选',
    },
    duration: { en: '2 h', zh: '2 小时' },
    cost: { en: 'Free with registration', zh: '预约后免费' },
    verdict: {
      en: 'Air-conditioned, stroller-friendly and free — a useful typhoon-day backup.',
      zh: '有空调、可推婴儿车、免费——台风天很实用的备选。',
    },
    suitable: 'ok',
  },
  {
    id: 'aquarium-sanya',
    name: { en: 'Sanya aquarium / resort splash parks', zh: '三亚水族馆／度假村水上乐园' },
    cn: '亚特兰蒂斯水世界等',
    where: { en: 'Sanya', zh: '三亚' },
    ageFit: {
      en: 'Splash areas fine for a toddler; not for an 8-month-old in the sun',
      zh: '戏水区适合幼儿；但 8 个月大的婴儿在太阳下不适合',
    },
    duration: { en: 'Half a day', zh: '半天' },
    cost: { en: '¥300–600 per adult', zh: '每名成人 ¥300–600' },
    verdict: {
      en: 'Expensive and busy, but a hit with the 3-year-old if we end the trip in Sanya. Take turns, one adult with each child.',
      zh: '又贵又挤，但如果行程最后到三亚，3 岁的孩子会玩得很开心。大人轮流陪，一人看一个孩子。',
    },
    suitable: 'ok',
  },
  {
    id: 'boundary-island',
    name: { en: 'Boundary Island / Wuzhizhou Island boat trips', zh: '分界洲岛／蜈支洲岛乘船游' },
    cn: '分界洲岛 / 蜈支洲岛',
    where: { en: 'Lingshui / Sanya', zh: '陵水／三亚' },
    ageFit: {
      en: 'Not with an 8-month-old in September heat',
      zh: '9 月高温下带着 8 个月大婴儿不适合',
    },
    duration: { en: 'Full day', zh: '一整天' },
    cost: { en: '¥150–400 per adult', zh: '每名成人 ¥150–400' },
    verdict: {
      en: 'Skip this trip: two ferry/boat rides, all-day sun and no shade, with an infant and a toddler who cannot swim.',
      zh: '这次跳过：要坐两趟渡轮／船，全天暴晒没遮阴，还带着一个婴儿和一个不会游泳的幼儿。',
    },
    suitable: 'wait',
  },
  {
    id: 'yanoda',
    name: { en: 'Yanoda Rainforest / forest parks', zh: '呀诺达热带雨林／森林公园' },
    cn: '呀诺达热带雨林',
    where: { en: 'Baoting / Sanya', zh: '保亭／三亚' },
    ageFit: {
      en: 'Hard with a stroller and impossible with a carrier for hours',
      zh: '推婴儿车很吃力，用背带背几个小时根本不可能',
    },
    duration: { en: 'Full day', zh: '一整天' },
    cost: { en: '¥120–200 per adult', zh: '每名成人 ¥120–200' },
    verdict: {
      en: 'Beautiful, but steep, humid and long. Leave it for a future trip without a baby.',
      zh: '风景很美，但坡陡、潮湿、路程长。留到以后没有婴儿的旅行再去吧。',
    },
    suitable: 'wait',
  },
];

export const FAMILY_LOGISTICS = [
  {
    title: { en: 'Typhoons and rain', zh: '台风与降雨' },
    detail: {
      en: 'Mid-September is both the peak of the typhoon season and the wettest stretch of the year: Hainan averages about two direct landfalls annually, with August and September carrying the largest share, and this season is forecast to be stronger than normal. Expect rain on most days (225–258 mm across 14–16 rainy days), an extreme UV index when the sun is out, and a real chance of a ferry or flight shutdown. The strait ferries and both airports are the first things suspended under orange or red warnings. Buy flexible tickets and keep one spare day before the launch.',
      zh: '9 月中旬既是台风季的高峰，也是一年中最多雨的时段：海南平均每年约两次台风直接登陆，其中 8 月和 9 月占的比例最大，而本季预报比常年更强。多数日子都会下雨（14–16 个雨日累计 225–258 毫米），太阳出来时紫外线指数达到极高水平，渡轮或航班停运的可能性真实存在。琼州海峡渡轮和两座机场是橙色或红色预警下最先停运的环节。机票要买可改签的，并在发射前留出一个备用日。',
    },
  },
  {
    title: { en: 'Sea temperature and swimming', zh: '海水温度与游泳' },
    detail: {
      en: 'September sea-surface temperatures sit around 29 °C — genuinely warm, which is good news for a toddler and means no wetsuit worries. The things to watch are surf and jellyfish: exposed south-facing beaches like Riyue Bay and parts of Haitang Bay are surf beaches and the wrong water for an 8-month-old, while Clearwater Bay and Shimei Bay are calmer.',
      zh: '9 月海表温度在 29 °C 左右——是真的温暖，对幼儿来说是好消息，也不用担心要不要穿潜水服。要注意的是浪和水母：日月湾、海棠湾部分区域这类朝南的开阔海滩是冲浪海滩，水况不适合 8 个月大的婴儿；而清水湾和石梅湾相对平静。',
    },
  },
  {
    title: { en: 'Child restraint law', zh: '儿童安全座椅法规' },
    detail: {
      en: 'Chinese law requires guardians to use child restraints for young children; the revised minors-protection law took effect in June 2021, but enforcement and specific provincial rules vary and Hainan’s exact requirement could not be verified. Rental fleets rarely include seats by default, so treat "we will get one at the desk" as a plan that can fail.',
      zh: '中国法律规定监护人应为低龄儿童使用安全座椅；修订后的未成年人保护法自 2021 年 6 月起施行，但执法力度和各省具体规定不一，海南的确切要求无法核实。租车行的车队通常不默认配备安全座椅，所以“到柜台再要一个”这种打算，要当成随时可能落空的计划。',
    },
  },
  {
    title: { en: 'Baby supplies', zh: '婴儿用品' },
    detail: {
      en: 'Diapers, formula, wipes and jar food are easy to find in Haikou, Wenchang and Sanya at large supermarkets and pharmacies; brand choice is narrower outside the cities. Bring enough for the first 24 hours and buy the rest there rather than flying it in.',
      zh: '尿布、奶粉、湿巾和辅食罐头在海口、文昌、三亚的大型超市和药店都很好买；出了城市品牌选择会少一些。带够头 24 小时的量，其余到当地再买，别都靠飞机运过去。',
    },
  },
  {
    title: { en: 'Strollers and pavements', zh: '婴儿车与人行道' },
    detail: {
      en: 'Resorts and promenades are stroller-friendly; old-town streets, beaches and scenic hills are not. A lightweight stroller plus a baby carrier is the practical combination.',
      zh: '度假村和滨海步道推婴儿车很方便；老城区街道、海滩和山景步道则不行。轻便婴儿车加婴儿背带是最实用的组合。',
    },
  },
  {
    title: { en: 'Health', zh: '医疗' },
    detail: {
      en: '文昌市人民医院 (Wenchang People’s Hospital) is the nearest general hospital to the launch area; Haikou and Sanya have the island’s largest hospitals. Check your travel insurance covers infants and that the policy is valid for the dates — and note the nearest clinic to each hotel before you need it.',
      zh: '文昌市人民医院是离发射区域最近的综合医院；海口和三亚有全岛最大的医院。确认旅行保险涵盖婴儿，且保单在出行日期内有效——并且在需要之前，先记下每家酒店最近的诊所。',
    },
  },
];
