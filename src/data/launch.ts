import type { Confidence, LaunchFact, LaunchTimingStep, ViewingSpot } from './types';

/**
 * Launch status. The window is NOTAM-derived and corroborated by an official
 * Wenchang no-fly notice, but it is not part of an official mission
 * announcement — and the notice history proves this schedule moves.
 */
export const LAUNCH_STATUS = {
  state: 'notam-derived',
  headline: { en: 'Thursday 17 September 2026 · 08:30 CST (window 08:25–08:54)', zh: '2026 年 9 月 17 日（周四）· 北京时间 08:30（发射窗口 08:25–08:54）' },
  mission: { en: 'Long March 12 · 长征十二号', zh: '长征十二号' },
  confidence: 'verified' as Confidence,
  identityConfidence: 'estimate' as Confidence,
  verifiedAt: '2026-09-11',
  detail: {
    en: 'The date and time check out: two independent launch databases derived from airspace notices (NOTAMs) both give a Long March 12 lifting off from Commercial LC-2 at Wenchang at 08:30 CST on 17 September, in a window of 08:25–08:54. An official Wenchang City Government no-fly notice corroborates it: notice 文府函〔2026〕441号 closes the airspace over Longlou, Dongjiao and Wenjiao from 08:00 on 14 September until 12:00 on 17 September.',
    zh: '日期和时间都能对上：两个依据空域通告（NOTAM）推算的独立发射数据库都显示，一枚长征十二号将于 9 月 17 日北京时间 08:30 从文昌商业发射工位 LC-2 升空，发射窗口为 08:25–08:54。文昌市政府的一份官方禁飞通告也印证了这一点：文府函〔2026〕441号通告自 9 月 14 日 08:00 起至 9 月 17 日 12:00 止，关闭龙楼、东郊、文教上空空域。',
  },
  caveats: [
    { en: 'Not officially announced. CMSA, CNSA and CASC have not published a mission notice for this flight. Wenchang launches are routinely only visible through airspace notices and local media until the day.', zh: '尚未正式公布。中国载人航天工程办公室（CMSA）、国家航天局（CNSA）和中国航天科技集团（CASC）都没有就此次飞行发布任务通告。文昌发射在当天之前，通常只能通过空域通告和当地媒体得知。' },
    { en: 'The schedule already moved once. The previous notice, 文府函〔2026〕430号, bracketed 9–12 September; it was replaced by the 14–17 September window — a five-day slip. An earlier August notice gave barely one day of warning.', zh: '时间表已经变动过一次。此前的文府函〔2026〕430号通告把窗口定在 9 月 9–12 日，后来被 9 月 14–17 日的窗口取代——整整推迟了五天。更早的 8 月一份通告，只提前了不到一天。' },
    { en: 'Vehicle and payload are uncertain. The databases flag the payload identity as unconfirmed; all five previous Long March 12 flights carried batches of Guowang (卫星互联网) low-orbit satellites.', zh: '火箭和载荷都不确定。数据库把该载荷的身份标记为未经确认；此前五次长征十二号飞行，每次都搭载成批的国网（卫星互联网）低轨卫星。' },
    { en: 'Refund rules for viewing tickets and hotels after a scrub could not be verified — assume nothing and ask before paying.', zh: '发射取消后观礼门票和酒店的退款规则无法核实——不要想当然，付款前先问清楚。' },
  ],
  officialChannels: [
    { id: 'wenchang-gov', label: { en: 'Wenchang Municipal Government (文昌市人民政府) — no-fly and access notices, the best real-time signal', zh: '文昌市人民政府——禁飞与通行通告，最可靠的实时信号' } },
    { id: 'cnsa', label: { en: 'China National Space Administration (国家航天局) — mission notices', zh: '国家航天局——任务通告' } },
    { id: 'cmse', label: { en: 'China Manned Space Agency (中国载人航天工程办公室) — crewed and cargo missions', zh: '中国载人航天工程办公室——载人和货运任务' } },
    { id: 'spacechina', label: { en: 'CASC (中国航天科技集团) — launcher and mission news', zh: '中国航天科技集团——火箭与任务新闻' } },
  ],
  verifyBeforeBooking: [
    { en: 'Re-check the Wenchang no-fly notice for the final window — it is the document that actually moves.', zh: '再次核对文昌禁飞通告，确认最终发射窗口——真正会变动的是这份文件。' },
    { en: 'Confirm whether official viewing tickets are on sale for this mission, and their child and infant rules.', zh: '确认本次任务是否已开售官方观礼票，以及儿童和婴儿的入场规定。' },
    { en: 'Confirm road closures and whether private cars can enter Longlou on launch morning.', zh: '确认道路封闭情况，以及发射当天上午私家车能否进入龙楼。' },
    { en: 'Check typhoon and thunderstorm forecasts: September is peak season, and scrubs are usually weather-driven.', zh: '关注台风和雷暴预报：9 月是高峰期，发射取消通常由天气导致。' },
    { en: 'Book hotels and flights with free cancellation, and never plan to fly home the day after the launch.', zh: '酒店和机票都选可免费取消的，绝不要把返程航班安排在发射次日。' },
  ],
};

export const LAUNCH_FACTS: LaunchFact[] = [
  {
    label: { en: 'What is flying', zh: '发射什么' },
    value: { en: 'Long March 12 (长征十二号) — likely another Guowang satellite batch', zh: '长征十二号——很可能是又一批国网卫星' },
    confidence: 'estimate',
    note: { en: 'A two-stage kerolox launcher. All five previous flights from this pad carried nine Guowang (卫星互联网) low-orbit satellites each. The launch databases explicitly flag the payload identity as unconfirmed.', zh: '两级煤油液氧运载火箭。此前从该工位发射的五次飞行，每次都搭载九颗国网（卫星互联网）低轨卫星。发射数据库明确把该载荷身份标记为未经确认。' },
  },
  {
    label: { en: 'Launch site', zh: '发射场' },
    value: { en: 'Hainan Commercial Space Launch Site · 海南商业航天发射场', zh: '海南商业航天发射场' },
    confidence: 'verified',
    note: { en: 'Commercial LC-2 at roughly 19.5976 N, 110.9365 E, in the Longlou / Dongjiao area of north-east Wenchang. This is the commercial complex next to the national Wenchang site (whose pads LC-101 and LC-201 sit about 2 km away).', zh: '商业发射工位 LC-2，大致位于北纬 19.5976 度、东经 110.9365 度，在文昌东北部的龙楼／东郊一带。这是紧邻国家文昌发射场的商业发射区（后者的 LC-101 和 LC-201 工位距此约 2 公里）。' },
  },
  {
    label: { en: 'Launch window', zh: '发射窗口' },
    value: { en: '08:25–08:54 CST, lift-off listed at 08:30', zh: '北京时间 08:25–08:54，计划升空时间 08:30' },
    confidence: 'verified',
    note: { en: 'Airspace notice window 00:25–00:54 UTC. Morning daylight, sun in the east.', zh: '空域通告窗口为 UTC 00:25–00:54。清晨白昼，太阳位于东方。' },
  },
  {
    label: { en: 'How the date was established', zh: '日期是怎么确定的' },
    value: { en: 'Two independent NOTAM-derived databases + an official no-fly notice', zh: '两个独立的 NOTAM 推算数据库＋一份官方禁飞通告' },
    confidence: 'verified',
    note: { en: 'The Launch Library 2 API and spacelaunchschedule.com agree; Wenchang notice 文府函〔2026〕441号 closes the airspace from 14 September 08:00 to 17 September 12:00.', zh: 'Launch Library 2 API 与 spacelaunchschedule.com 给出的结果一致；文昌文府函〔2026〕441号通告自 9 月 14 日 08:00 至 9 月 17 日 12:00 关闭空域。' },
  },
  {
    label: { en: 'Slip risk', zh: '推迟风险' },
    value: { en: 'High — the window already moved five days', zh: '高——窗口已经推迟了五天' },
    confidence: 'verified',
    note: { en: 'Notice 430号 bracketed 9–12 September before being replaced by 14–17 September. Treat the launch as a moving target, not an appointment.', zh: '430号通告原本把窗口定在 9 月 9–12 日，后来被 9 月 14–17 日取代。要把这次发射当作不断变动的目标，而不是一个固定约会。' },
  },
  {
    label: { en: 'Launch cadence at Wenchang', zh: '文昌的发射频率' },
    value: { en: '21 launches from both sites in 2025', zh: '2025 年两个场区共发射 21 次' },
    confidence: 'verified',
    note: { en: 'Wenchang now launches roughly monthly, so a slip usually resolves within days rather than weeks — and another launch is rarely far away.', zh: '文昌现在大约每月发射一次，所以推迟通常几天内就能解决，而不是拖上几周——而且下一次发射往往也不远。' },
  },
  {
    label: { en: 'Sunrise, mid-September', zh: '9 月中旬日出' },
    value: { en: '~06:29 CST', zh: '约北京时间 06:29' },
    confidence: 'estimate',
    note: { en: 'Two hours of daylight before the window opens. Bring hats and shade — and expect the sun to be in the east, roughly behind the pad from most viewing spots.', zh: '窗口开启前还有两小时白昼。带上帽子和遮阳装备——而且太阳会在东方，从大多数观礼点看，大致就在发射工位后方。' },
  },
  {
    label: { en: 'Launch-day accommodation', zh: '发射当天住宿' },
    value: { en: 'Longlou has 150+ hotels and homestays, at 90–95%+ occupancy', zh: '龙楼有 150 多家酒店和民宿，入住率达 90–95% 以上' },
    confidence: 'verified',
    note: { en: 'Locals describe launch nights as 一房难求 — "one room hard to find". Book now, and book a rate you can cancel, because a slip strands a non-refundable room.', zh: '当地人形容发射当晚“一房难求”。现在就要预订，而且要订可取消的价格，因为一旦推迟，不可退款的房间就砸在手里了。' },
  },
  {
    label: { en: 'Traffic after lift-off', zh: '升空后的交通' },
    value: { en: 'Expect 1–3 hours to clear the Longlou area', zh: '驶离龙楼一带预计需要 1–3 小时' },
    confidence: 'assumption',
    note: { en: 'Everyone leaves at once on the same few roads. Leaving on foot with the stroller and walking out late is usually faster than queueing.', zh: '所有人同时涌上同样那几条路。推着婴儿车步行、晚一点再走，通常比排队开车更快。' },
  },
  {
    label: { en: 'September climate at Wenchang', zh: '文昌 9 月气候' },
    value: { en: '26.8–27.3 °C average, ~29.5 °C max, 84–85% humidity', zh: '平均气温 26.8–27.3 °C，最高约 29.5 °C，湿度 84–85%' },
    confidence: 'verified',
    note: { en: '1991–2021 normals for Hainan in September: 225–258 mm of rain spread over 14–16 rainy days, about nine hours of sun a day, and sea-surface temperatures around 29 °C — genuinely warm swimming water, but expect rain on most days and an extreme UV index.', zh: '海南 9 月 1991–2021 年的气候平均值：降雨量 225–258 毫米，分布在 14–16 个雨天，每天日照约九小时，海表温度约 29 °C——海水确实温暖适合游泳，但多数日子会下雨，紫外线指数极高。' },
  },
  {
    label: { en: 'Typhoon risk, September 2026', zh: '2026 年 9 月台风风险' },
    value: { en: 'Peak season: August and September carry the largest share of Hainan landfalls', zh: '高峰期：8 月和 9 月是海南登陆台风最多的时段' },
    confidence: 'verified',
    note: { en: 'The 2026 outlook forecasts 24–26 named storms basin-wide with 7–9 China landfalls and above-normal intensity, though El Niño shifts genesis east and lowers Hainan’s odds. Hainan averages about two direct landfalls a year, with the threat running July–October. Qiongzhou Strait ferries and both Hainan airports are the first systems suspended; orange or red warnings typically stop ferries outright.', zh: '2026 年展望预测全流域有 24–26 个命名风暴，其中 7–9 个登陆中国，强度高于常年，不过厄尔尼诺会使生成位置东移，降低海南受影响的概率。海南平均每年约两次直接登陆，威胁期为 7–10 月。琼州海峡轮渡和海南两个机场是最先停运的系统；橙色或红色预警通常会直接停航轮渡。' },
  },
  {
    label: { en: 'Official viewing points', zh: '官方观礼点' },
    value: { en: 'Eight sanctioned points at Longlou, capacity-managed on launch day', zh: '龙楼有八个获批观礼点，发射当天实行人流量管控' },
    confidence: 'verified',
    note: { en: 'CNSA’s published list: Stone Park, Qiaotou Park (293 cars / 4,000 people), the Aerospace Science Centre (674 cars / 3,000 people), Shanhaitian exhibition-centre beach (the largest, 7,000 people), Tianfu Yunlongwan Resort (the closest point of all), and two hotels — the Wenchang Hilton and the Luneng Shanhaitian. The list was published for the national launch site and dates from 2022 (page updated 2024), so treat the names as the local framework rather than this mission’s final arrangements.', zh: '国家航天局公布的名单：石头公园、桥头公园（293 辆车／4,000 人）、航天科普中心（674 辆车／3,000 人）、山海天会展中心海滩（容量最大，7,000 人）、天福云龙湾度假村（所有观礼点中距离最近），以及两家酒店——文昌希尔顿和鲁能山海天。该名单是为国家发射场公布的，始于 2022 年（页面 2024 年更新），所以这些名称只能视作当地的总体框架，而不是本次任务的最终安排。' },
  },
  {
    label: { en: 'Smartest place to sleep', zh: '最聪明的住宿选择' },
    value: { en: 'A hotel that is itself a sanctioned viewing point', zh: '一家本身就是获批观礼点的酒店' },
    confidence: 'estimate',
    note: { en: 'The Wenchang Hilton and the Luneng Shanhaitian are on the official list. Sleeping at one of them turns launch morning from a pre-dawn drive with two children into a lift ride — but confirm current arrangements, because the list is a few years old.', zh: '文昌希尔顿和鲁能山海天都在官方名单上。住在其中一家，发射当天早上就从带着两个孩子的凌晨赶路，变成坐一趟电梯——但要确认目前的安排，因为这份名单已经有好几年了。' },
  },
];

export const VIEWING_SPOTS: ViewingSpot[] = [
  {
    id: 'viewing-centre',
    name: { en: 'Wenchang Space Viewing Centre (Moon and Sun Towers)', zh: '文昌航天观礼中心（月之塔／日之塔）' },
    cn: '文昌航天观礼中心 · 月之塔 / 日之塔',
    distance: { en: '~2 km straight line from Commercial LC-2', zh: '距商业发射工位 LC-2 直线约 2 公里' },
    access: { en: 'Officially ticketed, seated stands for 1,000+', zh: '官方售票，设 1,000 多个座位' },
    ticket: { en: 'Ticketed — price not verifiable from this build', zh: '需购票——本次资料中无法核实票价' },
    stroller: 'yes',
    goodFor: {
      en: 'The best option with two small children: reserved seats, an organised launch-day operation and the shortest walk of any spot. 1,900 people watched the 16 August 2026 launch from here.',
      zh: '带两个小孩的最佳选择：有预留座位、发射当天组织有序，而且是所有观礼点中步行距离最短的。2026 年 8 月 16 日那次发射，有 1,900 人在此观看。',
    },
    caveat: {
      en: 'Tickets sell out, child and infant rules could not be verified, and seats are ~2 km from the pad — loud, but far less than the shoreline spots.',
      zh: '门票会售罄，儿童和婴儿的规定无法核实，而且座位距发射工位约 2 公里——声音很响，但比海岸边的观礼点小得多。',
    },
    confidence: 'verified',
    sourceIds: ['hinews', 'wenchang-gov'],
  },
  {
    id: 'yaoguang-platform',
    name: { en: 'Yaoguang Viewing Platform', zh: '瑶光观礼平台' },
    cn: '瑶光观礼平台',
    distance: { en: '~2 km straight line', zh: '直线约 2 公里' },
    access: { en: 'Ticketed; crowds arrive hours early', zh: '需购票；人群会提前数小时到达' },
    ticket: { en: 'Ticketed — price not verifiable from this build', zh: '需购票——本次资料中无法核实票价' },
    stroller: 'yes',
    goodFor: { en: 'A second official platform at the same ~2 km standoff, with a similar organised setup.', zh: '第二个官方观礼平台，与工位同样保持约 2 公里距离，组织方式也类似。' },
    caveat: { en: 'Arrive early: crowds queue for hours to hold a place, which is hard on an infant.', zh: '要早点到：人群会排队数小时占位，这对婴儿来说很辛苦。' },
    confidence: 'estimate',
    sourceIds: ['hinews'],
  },
  {
    id: 'shanhaitian-beach',
    name: { en: 'Shanhaitian exhibition-centre beach', zh: '山海天会展中心海滩' },
    cn: '山海天会展中心海滩',
    distance: { en: 'Sanctioned point — the largest capacity on the official list', zh: '获批观礼点——官方名单中容量最大' },
    access: { en: 'Public beach, capacity-managed on launch day (listed at 7,000 people)', zh: '公共海滩，发射当天实行人流管控（名单载明 7,000 人）' },
    ticket: { en: 'Free', zh: '免费' },
    stroller: 'partial',
    goodFor: {
      en: 'The biggest sanctioned viewing area, and the one that best tolerates a family arriving with a mat, a shade tent and two children — sand for the 3-year-old and room to spread out.',
      zh: '最大的获批观礼区，也最能容纳带着地垫、遮阳帐篷和两个孩子的家庭——3 岁的孩子有沙子玩，也有地方铺开。',
    },
    caveat: { en: 'Soft sand and no shade of its own; the official capacity figure is from a 2022 list, so check the current arrangements.', zh: '沙质松软，本身又没有遮阴；官方容量数字来自 2022 年的名单，请核实目前的安排。' },
    confidence: 'verified',
    sourceIds: ['cnsa-viewing'],
  },
  {
    id: 'tianfu-yunlongwan',
    name: { en: 'Tianfu Yunlongwan Resort (closest sanctioned point)', zh: '天福云龙湾度假村（距离最近的获批观礼点）' },
    cn: '天福云龙湾度假村',
    distance: { en: 'The closest point on the official list', zh: '官方名单中距离最近的点' },
    access: { en: 'Resort grounds, capacity-managed on launch day', zh: '度假村场地，发射当天实行人流管控' },
    ticket: { en: 'Not verified', zh: '未核实' },
    stroller: 'yes',
    goodFor: { en: 'The nearest sanctioned view if the priority is maximum drama and minimum walking.', zh: '如果最看重震撼效果、又想少走路，这里就是最近的获批观礼点。' },
    caveat: { en: 'Being closest also means the loudest — the worst spot for an 8-month-old without serious ear protection.', zh: '距离最近也意味着声音最响——对没有认真做护耳的 8 个月大婴儿来说，这是最糟的位置。' },
    confidence: 'verified',
    sourceIds: ['cnsa-viewing'],
  },
  {
    id: 'qiaotou-park',
    name: { en: 'Qiaotou Park', zh: '桥头公园' },
    cn: '桥头公园',
    distance: { en: 'Sanctioned point, listed at 293 cars / 4,000 people', zh: '获批观礼点，名单载明 293 辆车／4,000 人' },
    access: { en: 'Public park, capacity-managed on launch day', zh: '公共公园，发射当天实行人流管控' },
    ticket: { en: 'Free', zh: '免费' },
    stroller: 'yes',
    goodFor: { en: 'A park rather than a rock beach: level ground, some shade and a fenced feel, with parking counted at under 300 cars.', zh: '是公园而不是岩石海滩：地面平坦、有些遮阴，也有围起来的安全感，车位统计不足 300 个。' },
    caveat: { en: 'Only 293 cars on the official list — arrive early or expect to be turned away from the car park.', zh: '官方名单只有 293 个车位——要早点到，否则可能被挡在停车场外。' },
    confidence: 'verified',
    sourceIds: ['cnsa-viewing'],
  },
  {
    id: 'qishuiwan',
    name: { en: 'Qishuiwan beach and balcony viewing', zh: '淇水湾海滩及阳台观礼' },
    cn: '淇水湾',
    distance: { en: '~4–5 km (estimate)', zh: '约 4–5 公里（估计）' },
    access: { en: 'Free — beach, plus guesthouse balconies', zh: '免费——海滩，另有民宿阳台' },
    ticket: { en: 'Free', zh: '免费' },
    stroller: 'partial',
    goodFor: {
      en: 'The local family favourite: sand for the 3-year-old, space for a picnic mat and shade tent, and a clear line down the coast to the pad.',
      zh: '当地人最喜欢的亲子去处：3 岁的孩子有沙子玩，有地方铺野餐垫和遮阳帐篷，沿海岸线到发射工位的视线也很通透。',
    },
    caveat: { en: 'Soft sand defeats a stroller and there are no shops on the beach — carry everything in, and carry the baby.', zh: '沙质松软，婴儿车推不动，海滩上也没有商店——所有东西都得自己搬进去，孩子也得抱着。' },
    confidence: 'estimate',
    sourceIds: ['hinews'],
  },
  {
    id: 'shitou-park',
    name: { en: 'Shitou Park (Stone Park)', zh: '石头公园' },
    cn: '石头公园',
    distance: { en: '~11 km (estimate)', zh: '约 11 公里（估计）' },
    access: { en: 'Free coastal rock park', zh: '免费的海岸岩石公园' },
    ticket: { en: 'Free', zh: '免费' },
    stroller: 'no',
    goodFor: { en: 'The classic rocky-shore view of the coast and the smoke trail — dramatic and free.', zh: '经典的海岸岩石视角，可看海岸线和尾迹烟云——震撼且免费。' },
    caveat: { en: 'Uneven rocks, no shade, no facilities. Hard with a stroller and a baby in arms; parking fills early.', zh: '岩石高低不平，没有遮阴，也没有设施。推婴儿车、怀里还抱着孩子会很吃力；车位很早就满了。' },
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'tongguling',
    name: { en: 'Tongguling', zh: '铜鼓岭' },
    cn: '铜鼓岭',
    distance: { en: '~12 km (estimate)', zh: '约 12 公里（估计）' },
    access: { en: 'Ticketed scenic area with a shuttle and a climb to 338 m', zh: '收费景区，有接驳车，需登高至 338 米' },
    ticket: { en: 'Ticketed — approx. ¥50–95 including shuttle', zh: '需购票——含接驳车约 ¥50–95' },
    stroller: 'no',
    goodFor: { en: 'The best panoramic view of the coastline and both launch complexes.', zh: '俯瞰海岸线和两个发射场区的最佳全景视角。' },
    caveat: { en: 'A shuttle plus a climb, and it often closes in high wind. Not workable with a stroller; a carrier is essential.', zh: '要坐接驳车再爬一段，而且大风时经常关闭。推婴儿车不可行；背带是必需的。' },
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'northern-bays',
    name: { en: 'Yueliang Bay and Gaolong Bay beaches', zh: '月亮湾和高隆湾海滩' },
    cn: '月亮湾 / 高隆湾',
    distance: { en: '~16 km (estimate)', zh: '约 16 公里（估计）' },
    access: { en: 'Free public beaches', zh: '免费公共海滩' },
    ticket: { en: 'Free', zh: '免费' },
    stroller: 'yes',
    goodFor: {
      en: 'The calm option with an infant: a real beach, promenade and hotels minutes away, with the launch visible as a bright plume and smoke trail on the horizon.',
      zh: '带婴儿最省心的选择：真正的海滩、滨海步道，酒店就在几分钟路程内，发射时能看到地平线上一道明亮的尾焰和烟迹。',
    },
    caveat: { en: 'You will not see the pad itself — much less dramatic, and the sound arrives late and muted.', zh: '看不到发射工位本身——观感差很多，声音也来得又晚又闷。' },
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'science-centre',
    name: { en: 'Wenchang Space Science Centre (museum, not a pad view)', zh: '文昌航天科普中心（博物馆，看不到发射工位）' },
    cn: '文昌航天科普中心',
    distance: { en: 'Not a viewing spot — 6,700 m² museum, six halls', zh: '不是观礼点——6,700 平方米的博物馆，六个展厅' },
    access: { en: 'Ticketed attraction, air-conditioned', zh: '收费景点，有空调' },
    ticket: { en: 'Ticketed — approx. ¥50–100', zh: '需购票——约 ¥50–100' },
    stroller: 'yes',
    goodFor: {
      en: 'The right thing to do on 16 September, not on launch morning: it explains what the 3-year-old is about to see, in air conditioning, with toilets.',
      zh: '适合 9 月 16 日去，而不是发射当天早上：有空调、有洗手间，还能给 3 岁的孩子讲讲他即将看到的东西。',
    },
    caveat: { en: 'It does not overlook the pads. Do not plan to watch the launch from the museum itself.', zh: '这里看不到发射工位。不要打算在博物馆里观看发射。' },
    confidence: 'verified',
    sourceIds: ['hinews'],
  },
  {
    id: 'longlou-stay',
    name: { en: 'Stay where you watch: Longlou hotels and homestays', zh: '住在观礼处：龙楼的酒店和民宿' },
    cn: '龙楼镇酒店 / 民宿楼顶观礼',
    distance: { en: 'In town — the two listed hotels are official viewing points', zh: '位于镇上——名单上的两家酒店就是官方观礼点' },
    access: { en: 'Private rooftops, usually sold with a room or a day ticket; the Wenchang Hilton and Luneng Shanhaitian are on the sanctioned list', zh: '私人楼顶，通常随房间或当日票一并出售；文昌希尔顿和鲁能山海天都在获批名单上' },
    ticket: { en: 'Not verified — prices spike on launch nights', zh: '未核实——发射当晚价格会大幅上涨' },
    stroller: 'yes',
    goodFor: {
      en: 'The best option with a baby, and arguably the best decision in this whole plan: a room in Longlou — ideally one of the two hotels that are themselves sanctioned viewing points — means shade, a toilet and a bed, so the 8-month-old can nap while one adult watches from the roof.',
      zh: '带婴儿的最佳选择，也可以说是整个计划里最明智的决定：在龙楼订一间房——最好是本身即为获批观礼点的那两家酒店之一——就意味着有遮阴、有洗手间、有床，8 个月大的宝宝可以睡觉，一位大人上楼顶观礼即可。',
    },
    caveat: {
      en: 'Longlou runs at 90–95% occupancy on launch nights and locals describe it as 一房难求, so book early and book a cancellable rate. Rooftop quality varies wildly between buildings.',
      zh: '发射当晚龙楼入住率达 90–95%，当地人称“一房难求”，所以要尽早预订，并订可取消的价格。不同楼栋的楼顶条件差别很大。',
    },
    confidence: 'assumption',
    sourceIds: ['hinews', 'cnsa-viewing'],
  },
];

export const LAUNCH_MORNING: LaunchTimingStep[] = [
  {
    time: { en: 'T-1 night', zh: '发射前一晚' },
    label: { en: 'Pack the launch bag the night before', zh: '前一晚收拾好观礼包' },
    detail: {
      en: 'Ear defenders for both children (the 8-month-old included), two changes of clothes, nappy kit, formula or feeding gear, 2 L of water, hats, sunscreen, a picnic mat, snacks, cash, a power bank and a light carrier for the baby. Charge everything.',
      zh: '两个孩子（包括 8 个月大的宝宝）的防噪耳罩、两套换洗衣物、尿布包、奶粉或喂养用具、2 升水、帽子、防晒霜、野餐垫、零食、现金、充电宝，以及给宝宝的轻便背带。所有设备都充满电。',
    },
    tone: 'info',
  },
  {
    time: { en: 'Two routes', zh: '两条路线' },
    label: { en: 'Decide now: ticketed seats or a free beach', zh: '现在就决定：买票入座还是去免费海滩' },
    detail: {
      en: 'With reserved seats at the viewing centre, arriving two hours early is enough. At a free spot you are queuing for a position and a parking space — for that, arrive three to four hours early. Everything below assumes the ticketed option; the free-spot variant is noted on each step.',
      zh: '在观礼中心有预留座位的话，提前两小时到就够了。在免费观礼点，你是在排队抢位置和车位——那种情况要提前三到四小时到。以下内容都以买票方案为前提；每一步都会注明免费观礼点的不同做法。',
    },
    tone: 'warn',
  },
  {
    time: { en: '04:30', zh: '04:30' },
    label: { en: 'Wake and dress (free-spot plan)', zh: '起床更衣（免费观礼点方案）' },
    detail: {
      en: 'Feed and change the baby before leaving, and dress for heat with one light layer for the pre-dawn hour. For the free-spot plan, leave by 05:00; for the ticketed platform, sleep until 05:30.',
      zh: '出发前先喂奶、换尿布，按炎热天气穿衣，黎明前再备一件薄衣。免费观礼点方案 05:00 前出发；买票平台方案可以睡到 05:30。',
    },
    tone: 'warn',
  },
  {
    time: { en: '06:00', zh: '06:00' },
    label: { en: 'Arrive and set up base', zh: '到达并安顿好大本营' },
    detail: {
      en: 'Ticketed seats: be in place by 06:00–06:30, well before the 08:25 window. Free spots: be parked by 04:30–05:00. Choose shade over proximity, mat down, water open, ear defenders out so the children get used to them, and find the nearest toilet before the 3-year-old asks.',
      zh: '买票座位：06:00–06:30 前就位，远早于 08:25 的窗口。免费观礼点：04:30–05:00 前停好车。优先选有遮阴的地方，而不是离得最近的地方；铺好垫子，打开水，拿出防噪耳罩让孩子先适应，并在 3 岁孩子开口之前先找到最近的洗手间。',
    },
    tone: 'info',
  },
  {
    time: { en: '06:29', zh: '06:29' },
    label: { en: 'Sunrise — the long stretch begins', zh: '日出——漫长的等待开始了' },
    detail: {
      en: 'This is the boring part that decides whether the morning works: a beach walk, breakfast from a flask, or a slow walk around the platform. Keep the 8-month-old in the shade and off the sun.',
      zh: '这段无聊的时间决定了整个上午能否顺利：在海滩散步、用保温壶吃早餐，或绕着平台慢慢走走。让 8 个月大的宝宝待在阴凉处，别晒到太阳。',
    },
    tone: 'info',
  },
  {
    time: { en: '08:00', zh: '08:00' },
    label: { en: 'In position, feed open on the phone', zh: '就位，手机开着直播' },
    detail: {
      en: 'Re-check the Wenchang no-fly notice and a live stream one last time in case of a hold or scrub. Have the livestream open as a backup feed so you know exactly what is happening.',
      zh: '最后再核对一次文昌禁飞通告和直播，以防出现暂停或取消。把直播开着作为备用信号源，这样能确切知道发生了什么。',
    },
    tone: 'warn',
  },
  {
    time: { en: '08:20', zh: '08:20' },
    label: { en: 'Ear defenders on, children held', zh: '戴上防噪耳罩，抱好孩子' },
    detail: {
      en: 'Lift-off noise is far louder than anyone expects. Put the defenders on the 8-month-old before ignition, hold her close, and expect the 3-year-old to want carrying. If either child is distressed, watch from inside the car with the windows up — that is a perfectly good outcome.',
      zh: '升空的声响远比任何人预想的都要大。点火前给 8 个月大的宝宝戴上耳罩，把她抱紧，3 岁的孩子多半也会要人抱。如果哪个孩子受不了，就关上车窗在车里看——这完全是个好结果。',
    },
    tone: 'warn',
  },
  {
    time: { en: '08:25', zh: '08:25' },
    label: { en: 'Window opens — lift-off listed at 08:30', zh: '窗口开启——计划升空时间 08:30' },
    detail: {
      en: 'Sound arrives several seconds after the light. Keep ear protection on for at least 30 seconds after lift-off, through the cheering and the smoke.',
      zh: '声音比亮光晚几秒才到。升空后至少 30 秒内不要摘下耳罩，穿过欢呼声和烟雾都要戴着。',
    },
    tone: 'good',
  },
  {
    time: { en: '08:35', zh: '08:35' },
    label: { en: 'Do not rush the exit', zh: '别急着离场' },
    detail: {
      en: 'Traffic peaks immediately and takes one to three hours to clear. Sit down, have a second breakfast and let the queues drain for 60–90 minutes — or walk out with the stroller and skip the car park entirely.',
      zh: '交通会立刻达到高峰，需要一到三小时才能疏散。坐下来再吃一顿早餐，等车流散去 60–90 分钟——或者推着婴儿车走出去，完全不用理会停车场。',
    },
    tone: 'info',
  },
];

export const POSTPONEMENT = [
  {
    title: { en: 'The window moved five days, and it could move again', zh: '窗口推迟了五天，而且可能再次变动' },
    detail: {
      en: 'Wenchang notice 430号 bracketed 9–12 September; notice 441号 replaced it with 14–17 September. An August notice gave barely one day of warning. This is the normal rhythm here, not an unusual event.',
      zh: '文昌 430号通告原本把窗口定在 9 月 9–12 日；441号通告将其改为 9 月 14–17 日。8 月的一份通告只提前了不到一天。这是这里的常态，并非异常事件。',
    },
  },
  {
    title: { en: 'Scrubs are usually decided late and often weather-driven', zh: '取消通常到最后一刻才决定，而且多因天气' },
    detail: {
      en: 'Upper-level winds, lightning and thick cloud can stop a countdown minutes before lift-off. September is the peak of the typhoon season, which is exactly why the airspace notice window is several days wide.',
      zh: '高空风、闪电和厚云层都可能在升空前几分钟叫停倒计时。9 月是台风季高峰，这正是空域通告窗口长达好几天的原因。',
    },
  },
  {
    title: { en: 'How we would find out', zh: '我们会如何得知' },
    detail: {
      en: 'The Wenchang government no-fly notice is the document that actually changes, and local media (海南日报 / 南海网) follow it. On the day, spaceflight live streams are the fastest signal that the count has stopped.',
      zh: '真正会变动的是文昌市政府的禁飞通告，当地媒体（海南日报／南海网）会跟进报道。发射当天，航天直播是倒计时停止的最快信号。',
    },
  },
  {
    title: { en: 'The good news about cadence', zh: '关于发射频率的好消息' },
    detail: {
      en: 'Wenchang launched 21 times across its two sites in 2025 and is now roughly monthly, so a scrub usually means another attempt within a day or two — and there is very likely another launch inside a longer holiday.',
      zh: '2025 年文昌两个场区共发射 21 次，现在大约每月一次，所以取消通常意味着在一两天内还有一次机会——而且假期稍长一点，很可能还能赶上下一次发射。',
    },
  },
  {
    title: { en: 'Our plan if it slips', zh: '如果推迟，我们的方案' },
    detail: {
      en: 'Extend one night near Wenchang with the rental car, compress the beach days, and keep the return flight flexible. A one-way HAK → SYX rental means the rest of the trip simply shifts south instead of unravelling.',
      zh: '用租来的车在文昌附近多住一晚，压缩海滩行程，返程机票保持灵活。单程的 HAK → SYX 租车意味着后面的行程只是整体南移，而不会全盘打乱。',
    },
  },
];

export const NOISE_AND_BABY = [
  {
    title: { en: 'Ear protection is not optional for children', zh: '孩子必须做听力防护' },
    detail: {
      en: 'Even at the official platforms, roughly 2 km out, expect a Long March 12 to peak around 90–110 dB (our estimate — no measured figure was available). That is loud enough to hurt a small child. Bring fitted defenders for both children, including infant-size muffs for the 8-month-old, and try them on at home first.',
      zh: '即使在约 2 公里外的官方观礼平台，长征十二号的峰值也预计在 90–110 分贝左右（我们的估算——没有可用的实测数据）。这已经响到足以伤害幼儿。给两个孩子都带上贴合的防噪耳罩，8 个月大的宝宝要用婴儿尺寸的，并且在家先试戴一次。',
    },
  },
  {
    title: { en: 'Distance is the best protection for an infant', zh: '距离是对婴儿最好的保护' },
    detail: {
      en: 'At ~16 km (Gaolong Bay) the launch is a bright plume and a rumble rather than a physical shock. If the baby is sound-sensitive, watching from a beach bay or from inside a car is a better decision than a front-row seat.',
      zh: '在约 16 公里外（高隆湾），发射只是一道明亮的尾焰和一阵轰鸣，而不是身体上的冲击。如果宝宝对声音敏感，在海湾边或车里观看，比坐前排要好得多。',
    },
  },
  {
    title: { en: 'Crowds are the other hazard', zh: '人群是另一个风险' },
    detail: {
      en: 'Longlou runs at 90–95% occupancy on launch nights, and the platforms and beaches fill hours early. Keep the baby in a carrier or a stroller, agree a meeting point in advance, and put your phone number on the 3-year-old.',
      zh: '发射当晚龙楼入住率达 90–95%，观礼平台和海滩也会提前数小时挤满。让宝宝待在背带或婴儿车里，事先约定一个集合点，并把你的电话号码写在 3 岁孩子身上。',
    },
  },
  {
    title: { en: 'Heat, shade and hydration', zh: '高温、遮阴与补水' },
    detail: {
      en: 'Two hours of daylight pass before the window opens, and by 08:30 it is hot with strong UV. Shade, hats, water and a mat matter more than the perfect camera angle — for children, sitting still in shade beats being carried to the front.',
      zh: '窗口开启前要经过两小时的白昼，到 08:30 已经很热，紫外线很强。遮阴、帽子、水和垫子比完美的拍摄角度更重要——对孩子来说，安静地坐在阴凉处，胜过被抱到最前面。',
    },
  },
  {
    title: { en: 'Feeding and nappies', zh: '喂养与尿布' },
    detail: {
      en: 'Expect no quiet, clean space in the crush. A carrier, a muslin, a flask and a nappy kit in one small backpack let us handle both children while the big bag stays in the car.',
      zh: '人潮中别指望有安静干净的地方。把背带、纱布巾、保温壶和尿布包放进一个小背包，就能同时照料两个孩子，大包留在车里即可。',
    },
  },
];

export const LAUNCH_PLAN_OPTIONS = [
  {
    id: 'stay-in-longlou',
    name: { en: 'Plan A · Stay at a viewing point (recommended)', zh: '方案 A · 住在观礼点（推荐）' },
    detail: {
      en: 'Book a room in Longlou — ideally the Wenchang Hilton or the Luneng Shanhaitian, both on the official viewing-point list, or a homestay with rooftop access. Shade, a toilet and a bed for the 8-month-old replace a 04:30 drive, and one adult can watch while the other settles the baby. Book early and cancellable.',
      zh: '在龙楼订一间房——最好是官方观礼点名单上的文昌希尔顿或鲁能山海天，或者带楼顶观礼的民宿。有遮阴、有洗手间、有床给 8 个月大的宝宝，就不用在 04:30 开车赶路，一位大人观礼、另一位照看宝宝即可。尽早预订，并选可取消的。',
    },
  },
  {
    id: 'ticketed-platform',
    name: { en: 'Plan B · Ticketed platform', zh: '方案 B · 买票上观礼平台' },
    detail: {
      en: 'Seats at the 文昌航天观礼中心 or 瑶光观礼平台: roughly 2 km from the commercial pad, seated and organised, with the shortest walk of any spot. In place by about 06:00 for the 08:25 window. Best if the priority is the view and a calmer 3-year-old.',
      zh: '在文昌航天观礼中心或瑶光观礼平台入座：距商业发射工位约 2 公里，有座位、组织有序，也是所有观礼点中步行最短的。为 08:25 的窗口，约 06:00 前就位。如果最看重观感、也想让 3 岁孩子更安稳，这是最佳选择。',
    },
  },
  {
    id: 'beach-or-bay',
    name: { en: 'Plan C · Beach or bay', zh: '方案 C · 海滩或海湾' },
    detail: {
      en: 'The sanctioned Shanhaitian exhibition-centre beach has the largest capacity (7,000 on the official list) and room for a mat and a shade tent; Qishuiwan is the local family favourite; Gaolong Bay, ~16 km out, is the calmest of all. More room to run, no toilets, softer sand — and the sound is noticeably gentler the further out you are.',
      zh: '获批的山海天会展中心海滩容量最大（官方名单为 7,000 人），有地方铺垫子和遮阳帐篷；淇水湾是当地人最喜欢的亲子去处；约 16 公里外的高隆湾则最省心。空间更大、没有洗手间、沙子更软——而且离得越远，声音明显越轻。',
    },
  },
];
