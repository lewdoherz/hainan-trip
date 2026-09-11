import type { Confidence, LaunchTimingStep, ViewingSpot } from './types';

export interface LaunchFact {
  label: string;
  value: string;
  confidence: Confidence;
  note?: string;
}

/**
 * Launch status. The window is NOTAM-derived and corroborated by an official
 * Wenchang no-fly notice, but it is not part of an official mission
 * announcement — and the notice history proves this schedule moves.
 */
export const LAUNCH_STATUS = {
  state: 'notam-derived',
  headline: 'Thursday 17 September 2026 · 08:30 CST (window 08:25–08:54)',
  mission: 'Long March 12 · 长征十二号',
  confidence: 'verified' as Confidence,
  identityConfidence: 'estimate' as Confidence,
  verifiedAt: '2026-09-11',
  detail:
    'The date and time check out: two independent launch databases derived from airspace notices (NOTAMs) both give a Long March 12 lifting off from Commercial LC-2 at Wenchang at 08:30 CST on 17 September, in a window of 08:25–08:54. An official Wenchang City Government no-fly notice corroborates it: notice 文府函〔2026〕441号 closes the airspace over Longlou, Dongjiao and Wenjiao from 08:00 on 14 September until 12:00 on 17 September.',
  caveats: [
    'Not officially announced. CMSA, CNSA and CASC have not published a mission notice for this flight. Wenchang launches are routinely only visible through airspace notices and local media until the day.',
    'The schedule already moved once. The previous notice, 文府函〔2026〕430号, bracketed 9–12 September; it was replaced by the 14–17 September window — a five-day slip. An earlier August notice gave barely one day of warning.',
    'Vehicle and payload are uncertain. The databases flag the payload identity as unconfirmed; all five previous Long March 12 flights carried batches of Guowang (卫星互联网) low-orbit satellites.',
    'Refund rules for viewing tickets and hotels after a scrub could not be verified — assume nothing and ask before paying.',
  ],
  officialChannels: [
    { id: 'wenchang-gov', label: 'Wenchang Municipal Government (文昌市人民政府) — no-fly and access notices, the best real-time signal' },
    { id: 'cnsa', label: 'China National Space Administration (国家航天局) — mission notices' },
    { id: 'cmse', label: 'China Manned Space Agency (中国载人航天工程办公室) — crewed and cargo missions' },
    { id: 'spacechina', label: 'CASC (中国航天科技集团) — launcher and mission news' },
  ],
  verifyBeforeBooking: [
    'Re-check the Wenchang no-fly notice for the final window — it is the document that actually moves.',
    'Confirm whether official viewing tickets are on sale for this mission, and their child and infant rules.',
    'Confirm road closures and whether private cars can enter Longlou on launch morning.',
    'Check typhoon and thunderstorm forecasts: September is peak season, and scrubs are usually weather-driven.',
    'Book hotels and flights with free cancellation, and never plan to fly home the day after the launch.',
  ],
};

export const LAUNCH_FACTS: LaunchFact[] = [
  {
    label: 'What is flying',
    value: 'Long March 12 (长征十二号) — likely another Guowang satellite batch',
    confidence: 'estimate',
    note: 'A two-stage kerolox launcher. All five previous flights from this pad carried nine Guowang (卫星互联网) low-orbit satellites each. The launch databases explicitly flag the payload identity as unconfirmed.',
  },
  {
    label: 'Launch site',
    value: 'Hainan Commercial Space Launch Site · 海南商业航天发射场',
    confidence: 'verified',
    note: 'Commercial LC-2 at roughly 19.5976 N, 110.9365 E, in the Longlou / Dongjiao area of north-east Wenchang. This is the commercial complex next to the national Wenchang site (whose pads LC-101 and LC-201 sit about 2 km away).',
  },
  {
    label: 'Launch window',
    value: '08:25–08:54 CST, lift-off listed at 08:30',
    confidence: 'verified',
    note: 'Airspace notice window 00:25–00:54 UTC. Morning daylight, sun in the east.',
  },
  {
    label: 'How the date was established',
    value: 'Two independent NOTAM-derived databases + an official no-fly notice',
    confidence: 'verified',
    note: 'The Launch Library 2 API and spacelaunchschedule.com agree; Wenchang notice 文府函〔2026〕441号 closes the airspace from 14 September 08:00 to 17 September 12:00.',
  },
  {
    label: 'Slip risk',
    value: 'High — the window already moved five days',
    confidence: 'verified',
    note: 'Notice 430号 bracketed 9–12 September before being replaced by 14–17 September. Treat the launch as a moving target, not an appointment.',
  },
  {
    label: 'Launch cadence at Wenchang',
    value: '21 launches from both sites in 2025',
    confidence: 'verified',
    note: 'Wenchang now launches roughly monthly, so a slip usually resolves within days rather than weeks — and another launch is rarely far away.',
  },
  {
    label: 'Sunrise, mid-September',
    value: '~06:29 CST',
    confidence: 'estimate',
    note: 'Two hours of daylight before the window opens. Bring hats and shade — and expect the sun to be in the east, roughly behind the pad from most viewing spots.',
  },
  {
    label: 'Launch-day accommodation',
    value: 'Longlou has 150+ hotels and homestays, at 90–95%+ occupancy',
    confidence: 'verified',
    note: 'Locals describe launch nights as 一房难求 — "one room hard to find". Book now, and book a rate you can cancel, because a slip strands a non-refundable room.',
  },
  {
    label: 'Traffic after lift-off',
    value: 'Expect 1–3 hours to clear the Longlou area',
    confidence: 'assumption',
    note: 'Everyone leaves at once on the same few roads. Leaving on foot with the stroller and walking out late is usually faster than queueing.',
  },
  {
    label: 'Weather specifics for the day',
    value: 'Not verified',
    confidence: 'assumption',
    note: 'No reliable long-range source was reachable from this build. Check 中国天气网 in the week before departure for typhoon and thunderstorm warnings.',
  },
];

export const VIEWING_SPOTS: ViewingSpot[] = [
  {
    id: 'viewing-centre',
    name: 'Wenchang Space Viewing Centre (Moon and Sun Towers)',
    cn: '文昌航天观礼中心 · 月之塔 / 日之塔',
    distance: '~2 km straight line from Commercial LC-2',
    access: 'Officially ticketed, seated stands for 1,000+',
    ticket: 'Ticketed — price not verifiable from this build',
    stroller: 'yes',
    goodFor:
      'The best option with two small children: reserved seats, an organised launch-day operation and the shortest walk of any spot. 1,900 people watched the 16 August 2026 launch from here.',
    caveat:
      'Tickets sell out, child and infant rules could not be verified, and seats are ~2 km from the pad — loud, but far less than the shoreline spots.',
    confidence: 'verified',
    sourceIds: ['hinews', 'wenchang-gov'],
  },
  {
    id: 'yaoguang-platform',
    name: 'Yaoguang Viewing Platform',
    cn: '瑶光观礼平台',
    distance: '~2 km straight line',
    access: 'Ticketed; crowds arrive hours early',
    ticket: 'Ticketed — price not verifiable from this build',
    stroller: 'yes',
    goodFor: 'A second official platform at the same ~2 km standoff, with a similar organised setup.',
    caveat: 'Arrive early: crowds queue for hours to hold a place, which is hard on an infant.',
    confidence: 'estimate',
    sourceIds: ['hinews'],
  },
  {
    id: 'qishuiwan',
    name: 'Qishuiwan beach and balcony viewing',
    cn: '淇水湾',
    distance: '~4–5 km (estimate)',
    access: 'Free — beach, plus guesthouse balconies',
    ticket: 'Free',
    stroller: 'partial',
    goodFor:
      'The local family favourite: sand for the 3-year-old, space for a picnic mat and shade tent, and a clear line down the coast to the pad.',
    caveat: 'Soft sand defeats a stroller and there are no shops on the beach — carry everything in, and carry the baby.',
    confidence: 'estimate',
    sourceIds: ['hinews'],
  },
  {
    id: 'shitou-park',
    name: 'Shitou Park (Stone Park)',
    cn: '石头公园',
    distance: '~11 km (estimate)',
    access: 'Free coastal rock park',
    ticket: 'Free',
    stroller: 'no',
    goodFor: 'The classic rocky-shore view of the coast and the smoke trail — dramatic and free.',
    caveat: 'Uneven rocks, no shade, no facilities. Hard with a stroller and a baby in arms; parking fills early.',
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'tongguling',
    name: 'Tongguling',
    cn: '铜鼓岭',
    distance: '~12 km (estimate)',
    access: 'Ticketed scenic area with a shuttle and a climb to 338 m',
    ticket: 'Ticketed — approx. ¥50–95 including shuttle',
    stroller: 'no',
    goodFor: 'The best panoramic view of the coastline and both launch complexes.',
    caveat: 'A shuttle plus a climb, and it often closes in high wind. Not workable with a stroller; a carrier is essential.',
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'northern-bays',
    name: 'Yueliang Bay and Gaolong Bay beaches',
    cn: '月亮湾 / 高隆湾',
    distance: '~16 km (estimate)',
    access: 'Free public beaches',
    ticket: 'Free',
    stroller: 'yes',
    goodFor:
      'The calm option with an infant: a real beach, promenade and hotels minutes away, with the launch visible as a bright plume and smoke trail on the horizon.',
    caveat: 'You will not see the pad itself — much less dramatic, and the sound arrives late and muted.',
    confidence: 'assumption',
    sourceIds: [],
  },
  {
    id: 'science-centre',
    name: 'Wenchang Space Science Centre (museum, not a pad view)',
    cn: '文昌航天科普中心',
    distance: 'Not a viewing spot — 6,700 m² museum, six halls',
    access: 'Ticketed attraction, air-conditioned',
    ticket: 'Ticketed — approx. ¥50–100',
    stroller: 'yes',
    goodFor:
      'The right thing to do on 16 September, not on launch morning: it explains what the 3-year-old is about to see, in air conditioning, with toilets.',
    caveat: 'It does not overlook the pads. Do not plan to watch the launch from the museum itself.',
    confidence: 'verified',
    sourceIds: ['hinews'],
  },
  {
    id: 'longlou-rooftop',
    name: 'Longlou Town rooftops and homestays',
    cn: '龙楼镇楼顶观礼',
    distance: '~3–8 km depending on the building',
    access: 'Private rooftops, usually sold with a room or a day ticket',
    ticket: 'Not verified — prices spike on launch nights',
    stroller: 'yes',
    goodFor:
      'The best baby compromise: shade, a toilet, water and a bed indoors, so the 8-month-old can nap while one adult keeps watch from the roof.',
    caveat: 'Quality varies wildly, and 90–95% occupancy means the town is effectively full on launch nights — book the room, not just the rooftop.',
    confidence: 'assumption',
    sourceIds: ['hinews'],
  },
];

export const LAUNCH_MORNING: LaunchTimingStep[] = [
  {
    time: 'T-1 night',
    label: 'Pack the launch bag the night before',
    detail:
      'Ear defenders for both children (the 8-month-old included), two changes of clothes, nappy kit, formula or feeding gear, 2 L of water, hats, sunscreen, a picnic mat, snacks, cash, a power bank and a light carrier for the baby. Charge everything.',
    tone: 'info',
  },
  {
    time: 'Two routes',
    label: 'Decide now: ticketed seats or a free beach',
    detail:
      'With reserved seats at the viewing centre, arriving two hours early is enough. At a free spot you are queuing for a position and a parking space — for that, arrive three to four hours early. Everything below assumes the ticketed option; the free-spot variant is noted on each step.',
    tone: 'warn',
  },
  {
    time: '04:30',
    label: 'Wake and dress (free-spot plan)',
    detail:
      'Feed and change the baby before leaving, and dress for heat with one light layer for the pre-dawn hour. For the free-spot plan, leave by 05:00; for the ticketed platform, sleep until 05:30.',
    tone: 'warn',
  },
  {
    time: '06:00',
    label: 'Arrive and set up base',
    detail:
      'Ticketed seats: be in place by 06:00–06:30, well before the 08:25 window. Free spots: be parked by 04:30–05:00. Choose shade over proximity, mat down, water open, ear defenders out so the children get used to them, and find the nearest toilet before the 3-year-old asks.',
    tone: 'info',
  },
  {
    time: '06:29',
    label: 'Sunrise — the long stretch begins',
    detail:
      'This is the boring part that decides whether the morning works: a beach walk, breakfast from a flask, or a slow walk around the platform. Keep the 8-month-old in the shade and off the sun.',
    tone: 'info',
  },
  {
    time: '08:00',
    label: 'In position, feed open on the phone',
    detail:
      'Re-check the Wenchang no-fly notice and a live stream one last time in case of a hold or scrub. Have the livestream open as a backup feed so you know exactly what is happening.',
    tone: 'warn',
  },
  {
    time: '08:20',
    label: 'Ear defenders on, children held',
    detail:
      'Lift-off noise is far louder than anyone expects. Put the defenders on the 8-month-old before ignition, hold her close, and expect the 3-year-old to want carrying. If either child is distressed, watch from inside the car with the windows up — that is a perfectly good outcome.',
    tone: 'warn',
  },
  {
    time: '08:25',
    label: 'Window opens — lift-off listed at 08:30',
    detail:
      'Sound arrives several seconds after the light. Keep ear protection on for at least 30 seconds after lift-off, through the cheering and the smoke.',
    tone: 'good',
  },
  {
    time: '08:35',
    label: 'Do not rush the exit',
    detail:
      'Traffic peaks immediately and takes one to three hours to clear. Sit down, have a second breakfast and let the queues drain for 60–90 minutes — or walk out with the stroller and skip the car park entirely.',
    tone: 'info',
  },
];

export const POSTPONEMENT = [
  {
    title: 'The window moved five days, and it could move again',
    detail:
      'Wenchang notice 430号 bracketed 9–12 September; notice 441号 replaced it with 14–17 September. An August notice gave barely one day of warning. This is the normal rhythm here, not an unusual event.',
  },
  {
    title: 'Scrubs are usually decided late and often weather-driven',
    detail:
      'Upper-level winds, lightning and thick cloud can stop a countdown minutes before lift-off. September is the peak of the typhoon season, which is exactly why the airspace notice window is several days wide.',
  },
  {
    title: 'How we would find out',
    detail:
      'The Wenchang government no-fly notice is the document that actually changes, and local media (海南日报 / 南海网) follow it. On the day, spaceflight live streams are the fastest signal that the count has stopped.',
  },
  {
    title: 'The good news about cadence',
    detail:
      'Wenchang launched 21 times across its two sites in 2025 and is now roughly monthly, so a scrub usually means another attempt within a day or two — and there is very likely another launch inside a longer holiday.',
  },
  {
    title: 'Our plan if it slips',
    detail:
      'Extend one night near Wenchang with the rental car, compress the beach days, and keep the return flight flexible. A one-way HAK → SYX rental means the rest of the trip simply shifts south instead of unravelling.',
  },
];

export const NOISE_AND_BABY = [
  {
    title: 'Ear protection is not optional for children',
    detail:
      'Even at the official platforms, roughly 2 km out, expect a Long March 12 to peak around 90–110 dB (our estimate — no measured figure was available). That is loud enough to hurt a small child. Bring fitted defenders for both children, including infant-size muffs for the 8-month-old, and try them on at home first.',
  },
  {
    title: 'Distance is the best protection for an infant',
    detail:
      'At ~16 km (Gaolong Bay) the launch is a bright plume and a rumble rather than a physical shock. If the baby is sound-sensitive, watching from a beach bay or from inside a car is a better decision than a front-row seat.',
  },
  {
    title: 'Crowds are the other hazard',
    detail:
      'Longlou runs at 90–95% occupancy on launch nights, and the platforms and beaches fill hours early. Keep the baby in a carrier or a stroller, agree a meeting point in advance, and put your phone number on the 3-year-old.',
  },
  {
    title: 'Heat, shade and hydration',
    detail:
      'Two hours of daylight pass before the window opens, and by 08:30 it is hot with strong UV. Shade, hats, water and a mat matter more than the perfect camera angle — for children, sitting still in shade beats being carried to the front.',
  },
  {
    title: 'Feeding and nappies',
    detail:
      'Expect no quiet, clean space in the crush. A carrier, a muslin, a flask and a nappy kit in one small backpack let us handle both children while the big bag stays in the car.',
  },
];

export const LAUNCH_PLAN_OPTIONS = [
  {
    id: 'ticketed-platform',
    name: 'Plan A · Ticketed platform (recommended)',
    detail:
      'Book seats at the 文昌航天观礼中心 or 瑶光观礼平台: ~2 km from the pad, seated, organised, with a short walk. Pitch up around 06:00 for the 08:25 window. Best odds of a happy 3-year-old and a calm baby.',
  },
  {
    id: 'beach-close',
    name: 'Plan B · Beach close-in',
    detail:
      'Qishuiwan beach with the stroller parked at the edge: free, closer to the water, and the local family choice. No shade, no toilets and soft sand — only with a second adult free to carry the baby and the toddler separately.',
  },
  {
    id: 'remote-calm',
    name: 'Plan C · Remote and calm',
    detail:
      'Watch from Gaolong Bay near the hotel, ~16 km away: no traffic, no crowd, beach and breakfast after. Least spectacular, least stressful, and the version the children are most likely to remember fondly.',
  },
];
