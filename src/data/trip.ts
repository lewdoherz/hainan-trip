import type { Place } from './types';

/**
 * Trip constants. The launch date/time is TENTATIVE — see data/launch.ts.
 */
export const TRIP = {
  title: 'Xiamen → Wenchang',
  subtitle: 'Rocket launch + Hainan family holiday',
  origin: 'Xiamen, Fujian · 厦门',
  destination: 'Wenchang, Hainan · 文昌',
  travelers: {
    adults: 2,
    children: [
      { id: 'toddler', label: '3-year-old', age: '3 years' },
      { id: 'infant', label: '8-month-old', age: '8 months' },
    ],
  },
  /** Planned launch window, China Standard Time (UTC+8). */
  launch: {
    /** ISO with offset — used for the countdown. */
    startsAt: '2026-09-17T08:30:00+08:00',
    endsAt: '2026-09-17T08:54:00+08:00',
    dateLabel: 'Thursday, 17 September 2026',
    timeLabel: '08:30 – 08:54 CST (UTC+8)',
    site: 'Hainan Commercial Space Launch Site · 海南商业航天发射场',
    pad: 'Commercial LC-2 · ~19.5976 N, 110.9365 E',
    mission: 'Long March 12 · 长征十二号',
    siteArea: 'Longlou / Dongjiao, Wenchang · 文昌市龙楼镇',
  },
  /** Travel window we plan around (arrive before the launch, relax after). */
  tripStart: '2026-09-15',
  tripEnd: '2026-09-21',
  nightsInHainan: 6,
} as const;

/**
 * Coordinates are APPROXIMATE (2–3 decimals) — good enough for the schematic
 * map, not for navigation. Map links use the place name instead of the pin.
 */
export const PLACES: Place[] = [
  {
    id: 'xiamen',
    name: 'Xiamen',
    cn: '厦门',
    lat: 24.4798,
    lng: 118.0894,
    kind: 'origin',
    note: 'Home. Gateway for all three options.',
  },
  { id: 'xmn', name: 'Xiamen Gaoqi Airport', cn: '厦门高崎国际机场 (XMN)', lat: 24.544, lng: 118.1277, kind: 'airport' },
  { id: 'xiamen-north', name: 'Xiamen North Station', cn: '厦门北站', lat: 24.629, lng: 118.05, kind: 'hub' },
  { id: 'shantou', name: 'Shantou', cn: '汕头', lat: 23.3541, lng: 116.6819, kind: 'stop', note: 'Possible day-1 overnight on the coastal drive.' },
  { id: 'huizhou', name: 'Huizhou', cn: '惠州', lat: 23.1115, lng: 114.416, kind: 'stop' },
  { id: 'guangzhou', name: 'Guangzhou', cn: '广州', lat: 23.1291, lng: 113.2644, kind: 'hub', note: 'Main HSR junction on the rail option.' },
  { id: 'shenzhen', name: 'Shenzhen', cn: '深圳', lat: 22.5431, lng: 114.0579, kind: 'hub' },
  { id: 'yangjiang', name: 'Yangjiang', cn: '阳江', lat: 21.8579, lng: 111.9822, kind: 'stop' },
  { id: 'zhanjiang', name: 'Zhanjiang', cn: '湛江', lat: 21.2707, lng: 110.3594, kind: 'hub', note: 'Last big city before the ferry ports.' },
  { id: 'xuwen-port', name: 'Xuwen Port', cn: '徐闻港', lat: 20.3017, lng: 110.1743, kind: 'port', note: 'Main vehicle ferry terminal for Haikou New Port.' },
  { id: 'haian-port', name: "Hai'an New Port", cn: '海安新港', lat: 20.2794, lng: 110.1817, kind: 'port', note: 'Alternative vehicle/passenger terminal.' },
  { id: 'new-haikou-port', name: 'Haikou New Port', cn: '海口新海港', lat: 20.0448, lng: 110.2153, kind: 'port' },
  { id: 'xiuying-port', name: 'Xiuying Port', cn: '海口秀英港', lat: 20.0351, lng: 110.2886, kind: 'port' },
  { id: 'haikou', name: 'Haikou', cn: '海口', lat: 20.0444, lng: 110.1997, kind: 'hub', note: 'Capital; closest big city to Wenchang (~1 h).' },
  { id: 'hak', name: 'Haikou Meilan Airport', cn: '海口美兰国际机场 (HAK)', lat: 19.9349, lng: 110.459, kind: 'airport', note: 'Best airport for Wenchang.' },
  { id: 'bar', name: 'Qionghai Boao Airport', cn: '琼海博鳌机场 (BAR)', lat: 19.141, lng: 110.454, kind: 'airport', note: 'Small airport, closest to Wenchang if flights exist.' },
  { id: 'wenchang', name: 'Wenchang', cn: '文昌市', lat: 19.5433, lng: 110.7977, kind: 'destination', note: 'Launch city; town is ~25 min from the pad.' },
  { id: 'longlou', name: 'Longlou Town', cn: '龙楼镇', lat: 19.6527, lng: 111.0063, kind: 'launch', note: 'Closest town to the launch site — where viewing happens.' },
  {
    id: 'launch-pad',
    name: 'Commercial Launch Pad LC-2',
    cn: '海南商业航天发射场 二号工位',
    lat: 19.5976,
    lng: 110.9365,
    kind: 'launch',
    note: 'The national Wenchang site (LC-101/LC-201) is about 2 km away and is the dot on most old maps.',
  },
  {
    id: 'viewing-centre',
    name: 'Wenchang Space Viewing Centre',
    cn: '文昌航天观礼中心',
    lat: 19.615,
    lng: 110.952,
    kind: 'stay',
    note: 'Approximate position — about 2 km from the commercial pad, with seated stands for 1,000+.',
  },
  { id: 'tongguling', name: 'Tongguling', cn: '铜鼓岭', lat: 19.606, lng: 111.077, kind: 'stay' },
  { id: 'shitou-park', name: 'Shitou Park', cn: '石头公园', lat: 19.633, lng: 111.027, kind: 'stay' },
  { id: 'gaolong-bay', name: 'Gaolong Bay', cn: '高隆湾', lat: 19.597, lng: 110.783, kind: 'stay' },
  { id: 'wanning', name: 'Wanning · Shimei Bay', cn: '万宁石梅湾', lat: 18.66, lng: 110.26, kind: 'stay', note: 'Quiet resort coast, ~1 h 45 m from Wenchang.' },
  { id: 'lingshui', name: 'Lingshui · Clearwater Bay', cn: '陵水清水湾', lat: 18.43, lng: 110.03, kind: 'stay' },
  { id: 'sanya', name: 'Sanya', cn: '三亚', lat: 18.2528, lng: 109.5119, kind: 'stay', note: 'Best resorts, but ~3 h from the launch site.' },
  { id: 'syx', name: 'Sanya Phoenix Airport', cn: '三亚凤凰国际机场 (SYX)', lat: 18.3029, lng: 109.4123, kind: 'airport' },
];
