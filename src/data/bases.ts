import type { Confidence } from './types';

export interface Base {
  id: string;
  name: string;
  cn: string;
  driveToLonglou: string;
  beach: string;
  toddlerFit: number; // 0–100
  infantFit: number;
  hotelPerNight: string;
  priceBand: number; // midpoint ¥/night for a family room, for the chart
  verdict: string;
  good: string;
  caveat: string;
  confidence: Confidence;
}

/** Candidate places to stay, judged only on how they serve this trip. */
export const BASES: Base[] = [
  {
    id: 'longlou',
    name: 'Longlou Town',
    cn: '龙楼镇',
    driveToLonglou: 'In town — the sanctioned points are 5–15 min away',
    beach: 'Shanhaitian and Tongguling bays; Stone Park is rocky',
    toddlerFit: 62,
    infantFit: 66,
    hotelPerNight: '¥250–600; up to ~¥1,200 at the Hilton on launch nights',
    priceBand: 700,
    verdict: 'The only base that removes the launch-morning drive, and the smartest single decision in this plan if we can book a room at one of the two hotels that are themselves official viewing points.',
    good: 'Walk or take a lift to a sanctioned viewing point; launch atmosphere; 90–95% occupancy means the town is genuinely busy, which the 3-year-old will love.',
    caveat: 'Locals call launch nights 一房难求 — one room, hard to find. Prices spike, quality varies between homestays, and the town is quiet between launches. Prices here are unverified estimates.',
    confidence: 'estimate',
  },
  {
    id: 'wenchang-city',
    name: 'Wenchang · Gaolong Bay / city',
    cn: '文昌市 · 高隆湾',
    driveToLonglou: '~35–45 min',
    beach: 'Good swimming beach and promenade',
    toddlerFit: 84,
    infantFit: 86,
    hotelPerNight: '¥300–800',
    priceBand: 500,
    verdict: 'The best balance: a real beach and normal hotel prices, with a manageable pre-dawn drive on launch morning.',
    good: 'Restaurants, supermarkets, pharmacies, an easy beach, and a genuine holiday feel for the children.',
    caveat: 'The launch is only visible as a distant plume from here — you still drive to Longlou for the real thing.',
    confidence: 'estimate',
  },
  {
    id: 'haikou',
    name: 'Haikou',
    cn: '海口',
    driveToLonglou: '~1 h 15 m – 1 h 45 m',
    beach: 'City beaches, not the best in Hainan',
    toddlerFit: 76,
    infantFit: 82,
    hotelPerNight: '¥350–1,000',
    priceBand: 600,
    verdict: 'Convenient for the airport and for a city day, but the 1.5 h pre-dawn drive makes it a weak launch base.',
    good: 'Best hospitals (文昌市人民医院 is closer), museums, the tropical wildlife park for the 3-year-old, and the easiest airport transfer.',
    caveat: 'You are trading 3 hours of driving on launch morning for city comfort — do it only for the first or last night.',
    confidence: 'estimate',
  },
  {
    id: 'qionghai',
    name: 'Qionghai · Boao',
    cn: '琼海 · 博鳌',
    driveToLonglou: '~1 h',
    beach: 'Boao beaches and the river mouth',
    toddlerFit: 78,
    infantFit: 80,
    hotelPerNight: '¥350–900',
    priceBand: 550,
    verdict: 'A quiet, grown-up coast with resorts on the water, roughly halfway between Haikou and Wenchang.',
    good: 'Calm resorts with pools, short drive to the launch, and Boao airport nearby if flights exist from Xiamen.',
    caveat: 'Fewer toddler attractions than Haikou or Sanya, and the local airport has a thin route network.',
    confidence: 'estimate',
  },
  {
    id: 'wanning',
    name: 'Wanning · Shimei Bay / Riyue Bay',
    cn: '万宁 · 石梅湾 / 日月湾',
    driveToLonglou: '~1 h 45 m',
    beach: 'The best-kept beaches on the island',
    toddlerFit: 88,
    infantFit: 88,
    hotelPerNight: '¥400–1,500',
    priceBand: 800,
    verdict: 'Our pick for the post-launch holiday: quiet, excellent resorts, and a shorter drive from Wenchang than Sanya — with the calm, shallow water an 8-month-old needs.',
    good: 'Shimei Bay is calm and shallow, which is exactly what an 8-month-old needs; family resorts with kids’ pools, botanical gardens at Xinglong nearby, and none of the Sanya crowds.',
    caveat: 'Thin restaurant choice outside the resorts. Riyue Bay, 20 minutes away, is a surf beach — good to watch, wrong water for a baby.',
    confidence: 'estimate',
  },
  {
    id: 'lingshui',
    name: 'Lingshui · Clearwater Bay',
    cn: '陵水 · 清水湾',
    driveToLonglou: '~2 h 15 m',
    beach: 'Long, calm, resort-lined bay',
    toddlerFit: 85,
    infantFit: 87,
    hotelPerNight: '¥400–1,400',
    priceBand: 750,
    verdict: 'Calm, clear, shallow water and a quieter alternative to Sanya — the best swimming for an infant, and only ~50 min from SYX for the flight home.',
    good: 'Calm water, resort facilities for children, and only ~50 min from SYX.',
    caveat: 'More spread out; you will use the car for everything.',
    confidence: 'estimate',
  },
  {
    id: 'sanya',
    name: 'Sanya',
    cn: '三亚',
    driveToLonglou: '~2 h 45 m – 3 h 30 m',
    beach: 'The island’s best-known beaches',
    toddlerFit: 90,
    infantFit: 88,
    hotelPerNight: '¥500–2,500',
    priceBand: 1100,
    verdict: 'The best holiday, the worst launch logistics. Right as the final stop before flying home, wrong as the launch base.',
    good: 'Yalong Bay and Haitang Bay resorts, aquariums, splash parks, restaurants and hospitals.',
    caveat: 'Three hours from Wenchang and the highest prices in Hainan.',
    confidence: 'estimate',
  },
];

export interface Activity {
  id: string;
  name: string;
  cn: string;
  where: string;
  ageFit: string;
  duration: string;
  cost: string;
  verdict: string;
  suitable: 'great' | 'ok' | 'wait';
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'space-center',
    name: 'Wenchang Space Science Centre',
    cn: '文昌航天科普中心',
    where: 'Wenchang · Longlou',
    ageFit: '3-year-old yes; 8-month-old fine (air-conditioned, stroller OK)',
    duration: '2–3 h',
    cost: '¥50–100 per adult',
    verdict: 'The one attraction that directly serves the trip — visit it the day before the launch so the 3-year-old understands what he is about to see.',
    suitable: 'great',
  },
  {
    id: 'gaolong-beach',
    name: 'Gaolong Bay beach and promenade',
    cn: '高隆湾',
    where: 'Wenchang city',
    ageFit: 'Ideal for both',
    duration: 'Half a day',
    cost: 'Free',
    verdict: 'Warm shallow water, a promenade for the stroller and restaurants minutes away. Our default afternoon with an infant.',
    suitable: 'great',
  },
  {
    id: 'shimei-bay',
    name: 'Shimei Bay beach',
    cn: '石梅湾',
    where: 'Wanning',
    ageFit: 'Ideal for both',
    duration: 'A day or two',
    cost: 'Free (resort beach clubs charge for loungers)',
    verdict: 'Quiet, wide and clean, with resorts that cater to families. The best beach base within two hours of Wenchang.',
    suitable: 'great',
  },
  {
    id: 'xinglong-gardens',
    name: 'Xinglong Tropical Botanical Gardens',
    cn: '兴隆热带植物园',
    where: 'Wanning · Xinglong',
    ageFit: '3-year-old yes; stroller-friendly for the baby',
    duration: '2–3 h',
    cost: '~¥60–90 per adult',
    verdict: 'Shaded paths, a small train and a coffee break — the easiest “real” excursion with two small children.',
    suitable: 'great',
  },
  {
    id: 'wildlife-park',
    name: 'Hainan Tropical Wildlife Park',
    cn: '海南热带野生动植物园',
    where: 'Near Haikou',
    ageFit: '3-year-old loves it; baby fine in a carrier',
    duration: 'Half a day',
    cost: '~¥100–140 per adult',
    verdict: 'Worth it on the way in or out of Haikou — drive-through sections mean minimal walking with the stroller.',
    suitable: 'ok',
  },
  {
    id: 'museum',
    name: 'Hainan Museum',
    cn: '海南省博物馆',
    where: 'Haikou',
    ageFit: 'Good rainy-day option for the 3-year-old',
    duration: '2 h',
    cost: 'Free with registration',
    verdict: 'Air-conditioned, stroller-friendly and free — a useful typhoon-day backup.',
    suitable: 'ok',
  },
  {
    id: 'aquarium-sanya',
    name: 'Sanya aquarium / resort splash parks',
    cn: '亚特兰蒂斯水世界等',
    where: 'Sanya',
    ageFit: 'Splash areas fine for a toddler; not for an 8-month-old in the sun',
    duration: 'Half a day',
    cost: '¥300–600 per adult',
    verdict: 'Expensive and busy, but a hit with the 3-year-old if we end the trip in Sanya. Take turns, one adult with each child.',
    suitable: 'ok',
  },
  {
    id: 'boundary-island',
    name: 'Boundary Island / Wuzhizhou Island boat trips',
    cn: '分界洲岛 / 蜈支洲岛',
    where: 'Lingshui / Sanya',
    ageFit: 'Not with an 8-month-old in September heat',
    duration: 'Full day',
    cost: '¥150–400 per adult',
    verdict: 'Skip this trip: two ferry/boat rides, all-day sun and no shade, with an infant and a toddler who cannot swim.',
    suitable: 'wait',
  },
  {
    id: 'yanoda',
    name: 'Yanoda Rainforest / forest parks',
    cn: '呀诺达热带雨林',
    where: 'Baoting / Sanya',
    ageFit: 'Hard with a stroller and impossible with a carrier for hours',
    duration: 'Full day',
    cost: '¥120–200 per adult',
    verdict: 'Beautiful, but steep, humid and long. Leave it for a future trip without a baby.',
    suitable: 'wait',
  },
];

export const FAMILY_LOGISTICS = [
  {
    title: 'Typhoons and rain',
    detail:
      'Mid-September is both the peak of the typhoon season and the wettest stretch of the year: Hainan averages about two direct landfalls annually, with August and September carrying the largest share, and this season is forecast to be stronger than normal. Expect rain on most days (225–258 mm across 14–16 rainy days), an extreme UV index when the sun is out, and a real chance of a ferry or flight shutdown. The strait ferries and both airports are the first things suspended under orange or red warnings. Buy flexible tickets and keep one spare day before the launch.',
  },
  {
    title: 'Sea temperature and swimming',
    detail:
      'September sea-surface temperatures sit around 29 °C — genuinely warm, which is good news for a toddler and means no wetsuit worries. The things to watch are surf and jellyfish: exposed south-facing beaches like Riyue Bay and parts of Haitang Bay are surf beaches and the wrong water for an 8-month-old, while Clearwater Bay and Shimei Bay are calmer.',
  },
  {
    title: 'Child restraint law',
    detail:
      'Chinese law requires guardians to use child restraints for young children; the revised minors-protection law took effect in June 2021, but enforcement and specific provincial rules vary and Hainan’s exact requirement could not be verified. Rental fleets rarely include seats by default, so treat "we will get one at the desk" as a plan that can fail.',
  },
  {
    title: 'Baby supplies',
    detail:
      'Diapers, formula, wipes and jar food are easy to find in Haikou, Wenchang and Sanya at large supermarkets and pharmacies; brand choice is narrower outside the cities. Bring enough for the first 24 hours and buy the rest there rather than flying it in.',
  },
  {
    title: 'Strollers and pavements',
    detail:
      'Resorts and promenades are stroller-friendly; old-town streets, beaches and scenic hills are not. A lightweight stroller plus a baby carrier is the practical combination.',
  },
  {
    title: 'Health',
    detail:
      '文昌市人民医院 (Wenchang People’s Hospital) is the nearest general hospital to the launch area; Haikou and Sanya have the island’s largest hospitals. Check your travel insurance covers infants and that the policy is valid for the dates — and note the nearest clinic to each hotel before you need it.',
  },
];
