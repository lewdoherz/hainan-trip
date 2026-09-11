import type { Confidence, LaunchTimingStep, ViewingSpot } from './types';

export interface LaunchFact {
  label: string;
  value: string;
  confidence: Confidence;
  note?: string;
}

/**
 * The launch window we are planning around. This is OUR plan, not a confirmed
 * mission schedule — see `LAUNCH_STATUS` for what we could and could not verify.
 */
export const LAUNCH_STATUS = {
  state: 'unverified',
  headline: 'Planned window: Thursday 17 September 2026, 08:30–08:54 CST',
  confidence: 'assumption' as Confidence,
  verifiedAt: '2026-09-11',
  detail:
    'Wenchang launch dates are normally published only weeks ahead and move often — weather scrubs are routine and a slip of one or more days is common. This build environment had no working web search, so the 17 September window could NOT be independently confirmed against an official schedule. Treat it as a target, not a fact, and re-check the official channels below before paying for anything non-refundable.',
  officialChannels: [
    { id: 'cnsa', label: 'China National Space Administration (国家航天局) — mission notices' },
    { id: 'cmse', label: 'China Manned Space Agency (中国载人航天工程办公室) — crewed and cargo missions' },
    { id: 'wenchang-gov', label: 'Wenchang Municipal Government (文昌市人民政府) — local access and viewing notices' },
    { id: 'spacechina', label: 'CASC (中国航天科技集团) — launcher and mission news' },
  ],
  verifyBeforeBooking: [
    'Confirm the mission, the date and the window against an official notice.',
    'Confirm whether Longlou and the 航天大道 will be closed, and for how many hours.',
    'Confirm whether official viewing tickets are required this time — rules change per mission.',
    'Check for typhoon warnings: September is the peak of the season (中国天气网).',
    'Book accommodation and flights with free cancellation until 48 h before.',
  ],
};

export const LAUNCH_FACTS: LaunchFact[] = [
  {
    label: 'Launch site',
    value: 'Wenchang Space Launch Site · 文昌航天发射场',
    confidence: 'verified',
    note: 'On the coast at Longlou Town, in the north-east of Hainan. Used for Long March 5, 7 and 8 class missions; a separate commercial launch complex sits nearby.',
  },
  {
    label: 'Nearest town',
    value: 'Longlou Town (龙楼镇) — 10–15 min from the pad',
    confidence: 'verified',
    note: 'This is where viewing, hotels and food concentrate on launch day.',
  },
  {
    label: 'Wenchang city centre',
    value: '~35–45 min drive from Longlou',
    confidence: 'estimate',
    note: 'More hotel choice and normal prices, at the cost of an early start.',
  },
  { label: 'Haikou', value: '~1 h 15 m – 1 h 45 m drive', confidence: 'estimate' },
  { label: 'Sanya', value: '~2 h 45 m – 3 h 30 m drive', confidence: 'estimate' },
  {
    label: 'Sunrise, mid-September',
    value: '~06:20 CST',
    confidence: 'estimate',
    note: 'An 08:30 launch happens in full daylight with the sun to the east — bring hats and shade, and expect glare towards the coast.',
  },
  {
    label: 'Typical conditions at 08:30',
    value: '~28–31 °C, high humidity, very strong UV',
    confidence: 'estimate',
    note: 'September is also the peak of the typhoon season, which is why scrubs are common.',
  },
  {
    label: 'Traffic after lift-off',
    value: '1–3 hours to clear the Longlou area',
    confidence: 'estimate',
    note: 'Everyone leaves at once on the same two roads. Being on foot with a stroller and leaving late is usually faster than queuing.',
  },
];

export const VIEWING_SPOTS: ViewingSpot[] = [
  {
    id: 'space-center',
    name: 'Wenchang Space Science Centre',
    cn: '文昌航天科普中心',
    distance: '~5–7 km from the pads',
    access: 'Ticketed attraction, open on launch days',
    ticket: 'Museum entry, roughly ¥50–100',
    stroller: 'yes',
    goodFor: 'Families who want toilets, shade, food and a museum to fill the waiting hours with the 3-year-old.',
    caveat: 'You watch the launch from its grounds/roof area rather than a wilderness viewpoint; get there very early on launch morning.',
    confidence: 'estimate',
    sourceIds: ['wenchang-gov'],
  },
  {
    id: 'shitou-park',
    name: 'Shitou Park (Stone Park)',
    cn: '石头公园',
    distance: '~5–8 km',
    access: 'Public coastal park, free',
    ticket: 'Free',
    stroller: 'partial',
    goodFor: 'The classic view across the water towards the pad — close, dramatic, but rocky.',
    caveat: 'Uneven rocks, no shade and no facilities: hard with an 8-month-old in arms and a 3-year-old who wants to climb. Go early for parking.',
    confidence: 'estimate',
    sourceIds: [],
  },
  {
    id: 'tongguling',
    name: 'Tongguling',
    cn: '铜鼓岭',
    distance: '~8–12 km',
    access: 'Scenic area with ticket and shuttle to the ridge',
    ticket: 'Approx. ¥50–95 including the shuttle',
    stroller: 'no',
    goodFor: 'The best panoramic view of the coastline and the pads on a clear morning.',
    caveat: 'Requires a shuttle and a walk; not workable with a stroller and a baby carrier is essential. Often closes in high winds.',
    confidence: 'estimate',
    sourceIds: [],
  },
  {
    id: 'qishuiwan',
    name: 'Qishuiwan / Yueliang Bay beaches',
    cn: '淇水湾 / 月亮湾',
    distance: '~8–15 km',
    access: 'Open beaches, free',
    ticket: 'Free',
    stroller: 'partial',
    goodFor: 'Sand for the 3-year-old, space for a picnic mat and shade tent, and a clear line of sight to the coast.',
    caveat: 'Soft sand defeats a stroller; carry the baby and use a beach mat instead. Bring everything — there are no shops on the sand.',
    confidence: 'estimate',
    sourceIds: [],
  },
  {
    id: 'longlou-rooftop',
    name: 'Longlou Town rooftops and homestays',
    cn: '龙楼镇观礼民宿 / 楼顶观礼',
    distance: '~5–10 km',
    access: 'Private rooftops, usually paid, sold locally and online',
    ticket: 'Roughly ¥100–300 per person on launch days',
    stroller: 'yes',
    goodFor: 'The most family-friendly compromise: shade, a toilet, water and a seat, with the baby able to nap indoors while one adult keeps watch.',
    caveat: 'Quality varies wildly and prices spike on launch dates — book the room, not just the rooftop.',
    confidence: 'estimate',
    sourceIds: [],
  },
  {
    id: 'official-grandstand',
    name: 'Official viewing area (观礼点)',
    cn: '官方观礼点',
    distance: 'Varies by mission; often a few km',
    access: 'Ticketed, registered in advance, capacity limited',
    ticket: 'Approximately ¥200–600 when sold publicly; sometimes free with registration',
    stroller: 'yes',
    goodFor: 'The safest, most controlled option with facilities, if tickets exist for this mission.',
    caveat: 'Whether tickets are sold at all changes from mission to mission and is announced late — check the Wenchang government channels.',
    confidence: 'assumption',
    sourceIds: ['wenchang-gov'],
  },
  {
    id: 'gaolong-bay',
    name: 'Gaolong Bay / Wenchang city beach',
    cn: '高隆湾',
    distance: '~20–25 km',
    access: 'Public beach, free',
    ticket: 'Free',
    stroller: 'yes',
    goodFor: 'The easiest option with an infant: a proper beach, promenade, restaurants and hotels minutes away, and the launch still visible as a bright plume and smoke trail on the horizon.',
    caveat: 'You will not see the pad itself — much less dramatic than Longlou, and the sound arrives late and muted.',
    confidence: 'estimate',
    sourceIds: [],
  },
  {
    id: 'haikou-view',
    name: 'Haikou (city)',
    cn: '海口',
    distance: '~90–110 km',
    access: 'No practical pad view',
    ticket: 'Free',
    stroller: 'yes',
    goodFor: 'Not a viewing spot — relevant only as a fallback base if Longlou is fully booked.',
    caveat: 'You would need to drive 1.5 h+ before dawn, or accept watching a livestream.',
    confidence: 'estimate',
    sourceIds: [],
  },
];

export const LAUNCH_MORNING: LaunchTimingStep[] = [
  {
    time: 'T-1 night',
    label: 'Pack the launch bag the night before',
    detail:
      'Ear defenders for both children (the 8-month-old included), two changes of clothes, nappy kit, formula/feeding gear, 2 L of water, hats, sunscreen, a picnic mat, snacks, cash, power bank, and a light carrier for the baby. Charge everything.',
    tone: 'info',
  },
  {
    time: '04:45',
    label: 'Wake the children and dress them',
    detail:
      'Dress for heat but bring a light layer — pre-dawn is the coolest part of the day. Feed the baby now rather than in the crowd, and change nappies before leaving.',
    tone: 'warn',
  },
  {
    time: '05:15',
    label: 'Leave the Wenchang-area hotel',
    detail:
      'If we sleep in Haikou instead, leave at 03:30 — and expect the children to be miserable. From Wenchang city allow ~45 min; from Longlou, 15 min.',
    tone: 'info',
  },
  {
    time: '05:45',
    label: 'Park outside the closed zone and walk or shuttle in',
    detail:
      '航天大道 and the roads into Longlou are normally controlled hours before a launch. Private cars are usually stopped at a perimeter; parking is on roadside lots and in the town. Plan to walk 10–30 min with the stroller.',
    tone: 'warn',
  },
  {
    time: '06:20',
    label: 'Sunrise — set up base',
    detail:
      'Choose shade, not the closest point. Mat down, water open, ear defenders visible so the children get used to them. Find the nearest toilet before the 3-year-old asks.',
    tone: 'info',
  },
  {
    time: '07:00',
    label: 'Breakfast, toilets, leg-stretching',
    detail:
      'This is the long, boring stretch for a toddler. The science centre, a beach walk or the rooftop breakfast are the things that keep everyone sane.',
    tone: 'info',
  },
  {
    time: '08:00',
    label: 'In position, phones ready',
    detail:
      'Check the official channel one last time for a hold or a scrub. Have the livestream open as a backup feed so we know exactly what is happening.',
    tone: 'warn',
  },
  {
    time: '08:15',
    label: 'Ear defenders on, children held',
    detail:
      'Lift-off noise is far louder than anyone expects. Put the defenders on the 8-month-old before ignition, hold her close, and expect the 3-year-old to want to be carried.',
    tone: 'warn',
  },
  {
    time: '08:30',
    label: 'Launch window opens — lift-off',
    detail:
      'Sound reaches us several seconds after the light. Keep ear protection on for at least 30 seconds after lift-off, including during the cheering.',
    tone: 'good',
  },
  {
    time: '08:35',
    label: 'Do not rush the exit',
    detail:
      'Traffic peaks immediately. Sit down, have a second breakfast, let the queues drain for 60–90 min; or walk out with the stroller and skip the car park entirely.',
    tone: 'info',
  },
];

export const POSTPONEMENT = [
  {
    title: 'Scrubs are normal, and usually decided late',
    detail:
      'Weather (upper-level winds, lightning, thick cloud), a technical hold or a range issue can stop a countdown at T-0 or minutes before. Sometimes it is announced hours ahead; sometimes it is a hold that lasts all morning.',
  },
  {
    title: 'The next attempt is often 24 hours later',
    detail:
      'Most Wenchang scrubs turn into a T+1 attempt at a similar time of day, but multi-day slips happen. Plan at least one spare day, and never book the flight home for the day after the launch.',
  },
  {
    title: 'How we would find out',
    detail:
      'Official government and space-agency notices, plus the local Wenchang government channel (文昌发布). On the day, livestreams from spaceflight media are the fastest signal that the count has stopped.',
  },
  {
    title: 'Tickets and bookings',
    detail:
      'Official viewing tickets are usually refunded or carried over to the new date, but this varies by seller — confirm the policy when buying. Hotels and flights are the real risk: book free-cancellation rates.',
  },
  {
    title: 'Our plan if it slips by a day',
    detail:
      'Stay an extra night near Wenchang (the rental car makes this painless), move the beach days later, and keep the return flight flexible. A one-way rental HAK → SYX means the rest of the itinerary can simply shift south.',
  },
];

export const NOISE_AND_BABY = [
  {
    title: 'Ear protection is not optional for children',
    detail:
      'A Long March 5-class lift-off is one of the loudest things a human can stand near. Even 5–10 km away it is loud enough to hurt a small child. Bring properly fitted ear defenders/earmuffs for both children — the 8-month-old included — and test them at home first.',
  },
  {
    title: 'Distance is the best protection for an infant',
    detail:
      'At 20 km (Gaolong Bay) the launch is a bright plume and a rumble rather than a physical shock. If we want the pad in the frame with an 8-month-old, favour a fenced rooftop with shade and a door to close rather than an open rocky shore.',
  },
  {
    title: 'Crowds are the other hazard',
    detail:
      'Launch day draws tens of thousands of people onto a small coastline. Keep the baby in a carrier or a stroller with the 3-year-old in a wrist link or on shoulders, and agree a meeting point in advance.',
  },
  {
    title: 'Heat, shade and hydration',
    detail:
      'By 08:30 it is already ~30 °C with strong UV. Shade, hats, water and a mat matter more than the perfect camera angle — for the children, sitting still in shade beats being carried to the front.',
  },
  {
    title: 'Feeding and nappies',
    detail:
      'Expect no quiet, clean space in the crush. A carrier, a muslin, a flask and a nappy kit in one small backpack let us handle both children while keeping the big bag in the car.',
  },
];

export const LAUNCH_PLAN_OPTIONS = [
  {
    id: 'family-safe',
    name: 'Plan A · Family-safe (recommended)',
    detail:
      'Stay in Longlou or Wenchang city; watch from a paid rooftop or the space science centre, arrive by 06:00 by car, leave late. Shade, toilets and a door to close with a baby — at the cost of a slightly less dramatic view.',
  },
  {
    id: 'beach-close',
    name: 'Plan B · Beach-close',
    detail:
      'Qishuiwan / Yueliang Bay with the stroller parked at the edge. Closer and more open, but no shade, no toilets and soft sand. Only with a second adult free to carry the baby and the toddler separately.',
  },
  {
    id: 'remote-calm',
    name: 'Plan C · Remote and calm',
    detail:
      'Watch from Gaolong Bay near the hotel — 20 km away, no traffic, no crowd, beach and breakfast. Least spectacular, least stressful, most likely to be remembered fondly by the children.',
  },
];
