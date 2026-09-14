/**
 * Central data model. Every researched figure in this app carries its own
 * provenance so the UI can distinguish verified facts from estimates and
 * assumptions, and so values can be re-verified later without touching UI code.
 *
 * Every user-facing string is bilingual. The `Bi` type makes that structural:
 * a missing translation is a compile error, not a silent fallback.
 */

export type Lang = 'en' | 'zh';

/** A string that exists in both languages. */
export interface Bi {
  en: string;
  zh: string;
}

/**
 * How much we trust a figure.
 * `screenshot` = read out of the user's own booking-app screenshots (via OCR),
 * so it is a real quote, but the digits have not been independently confirmed.
 */
export type Confidence = 'verified' | 'screenshot' | 'estimate' | 'assumption';

export type SourceKind = 'official' | 'operator' | 'platform' | 'secondary';

export interface Source {
  id: string;
  label: Bi;
  url: string;
  publisher: string;
  kind: SourceKind;
  /** ISO date the figure behind this source was last observed/verified. */
  verifiedAt?: string;
  note?: Bi;
}

/** A single researched number. `value` is the point estimate used in math. */
export interface Metric {
  value: number;
  unit: string;
  low?: number;
  high?: number;
  confidence: Confidence;
  sourceIds: string[];
  notes?: Bi;
}

// ---------------------------------------------------------------------------
// Scoring categories
// ---------------------------------------------------------------------------

export type CategoryId =
  | 'family'
  | 'time'
  | 'reliability'
  | 'cost'
  | 'transfers'
  | 'mobility'
  | 'luggage'
  | 'stress';

/** Categories whose score is derived from the live cost/time model. */
export type DerivedCategoryId = 'time' | 'cost';
export type StaticCategoryId = Exclude<CategoryId, DerivedCategoryId>;

export interface Category {
  id: CategoryId;
  label: Bi;
  short: Bi;
  /** What a high score means, in family terms. */
  description: Bi;
  defaultWeight: number;
  derived: boolean;
}

// ---------------------------------------------------------------------------
// Costs
// ---------------------------------------------------------------------------

export interface CostLine {
  id: string;
  label: Bi;
  amount: number;
  /** Assumption keys this line is computed from, for "what drives this" hints. */
  drivenBy?: string[];
  confidence: Confidence;
  sourceIds?: string[];
  note?: Bi;
}

// ---------------------------------------------------------------------------
// Time model
// ---------------------------------------------------------------------------

export type SegmentKind = 'travel' | 'wait' | 'admin' | 'rest' | 'overnight';

export interface Segment {
  id: string;
  label: Bi;
  detail?: Bi;
  kind: SegmentKind;
  /**
   * Literal minutes, an assumption key (user-editable), or a compute key
   * (derived from several assumptions, e.g. km ÷ speed).
   */
  minutes: number | { assumption: string } | { compute: string };
  confidence: Confidence;
  /** Comfort note shown in the timeline, e.g. nap window. */
  note?: Bi;
}

/** A day/phase grouping of segments for the route timeline. */
export interface TimelineGroup {
  id: string;
  label: Bi;
  /** e.g. "Day 1 — Sep 15" */
  sublabel?: Bi;
  /** Local clock time the group starts at, e.g. "05:30" — drives the running clock. */
  start?: string;
  segments: Segment[];
  note?: Bi;
}

// ---------------------------------------------------------------------------
// Transport options
// ---------------------------------------------------------------------------

export interface ScoreRationale {
  score: number; // 0–100
  why: Bi;
}

export interface PracticalNote {
  label: Bi;
  value: Bi;
  tone?: 'good' | 'warn' | 'bad' | 'neutral';
}

export interface TransportOption {
  id: string;
  name: Bi;
  subtitle: Bi;
  cnName?: string;
  /** Short mode tag used on cards. */
  modeLabel: Bi;
  vehicle: Bi;
  /** One-line positioning of the option. */
  tagline: Bi;
  /** Longer narrative for the detail view. */
  verdict: Bi;
  accent: string;
  /** Hand-over points where luggage and children must be moved again. */
  transfers: number;
  staticScores: Record<StaticCategoryId, ScoreRationale>;
  costLines: (a: Assumptions) => CostLine[];
  /** Static timeline, or one built from the assumptions (the drive option). */
  timeline: TimelineGroup[] | ((a: Assumptions) => TimelineGroup[]);
  practical: PracticalNote[];
  pros: Bi[];
  cons: Bi[];
  /** Route legs for the map / route view. */
  legs: RouteLeg[];
  /** What to do if the plan breaks (launch slip, ferry weather, missed flight). */
  contingencies: Bi[];
  confidence: Confidence;
}

export interface RouteLeg {
  id: string;
  fromId: string;
  toId: string;
  label: Bi;
  mode: 'car' | 'ferry' | 'plane' | 'train' | 'hsr' | 'bus' | 'taxi' | 'walk';
  /** Distance/time display strings (approximate, human readable). */
  distance: Bi;
  duration: Bi;
  note?: Bi;
}

export interface Place {
  id: string;
  name: Bi;
  cn: string;
  lat: number;
  lng: number;
  kind: 'origin' | 'hub' | 'port' | 'airport' | 'launch' | 'stay' | 'stop' | 'destination';
  note?: Bi;
}

// ---------------------------------------------------------------------------
// Editable assumptions
// ---------------------------------------------------------------------------

export type AssumptionGroup = 'drive' | 'ferry' | 'flight' | 'rental' | 'train' | 'family' | 'budget';

export interface AssumptionDef {
  key: string;
  label: Bi;
  group: AssumptionGroup;
  unit: Bi;
  /** Default value — every value here is an ESTIMATE unless labelled otherwise. */
  def: number;
  min: number;
  max: number;
  step: number;
  confidence: Confidence;
  sourceIds?: string[];
  note?: Bi;
  /** For unit 'on/off' toggles: what "on" means. */
  onLabel?: Bi;
  offLabel?: Bi;
}

export type Assumptions = Record<string, number>;

// ---------------------------------------------------------------------------
// Launch data
// ---------------------------------------------------------------------------

export interface ViewingSpot {
  id: string;
  name: Bi;
  cn: string;
  /** Direction/feel of the view, roughly how far from the pad. */
  distance: Bi;
  /** Is it freely accessible, or ticketed/restricted? */
  access: Bi;
  ticket: Bi;
  stroller: 'yes' | 'partial' | 'no';
  goodFor: Bi;
  caveat?: Bi;
  confidence: Confidence;
  sourceIds: string[];
}

export interface LaunchTimingStep {
  time: Bi;
  label: Bi;
  detail: Bi;
  tone?: 'info' | 'warn' | 'good';
}

export interface LaunchFact {
  label: Bi;
  value: Bi;
  confidence: Confidence;
  note?: Bi;
}

// ---------------------------------------------------------------------------
// Budget planner
// ---------------------------------------------------------------------------

export type StayArea = 'wenchang' | 'beach';

export interface RoomType {
  id: string;
  name: Bi;
  /** Nightly rate per room or per villa, from the source named on the stay. */
  price: number;
  bedrooms?: number;
  /** How many people the room happily holds, e.g. "2 adults + 2 children free". */
  capacity?: Bi;
  note?: Bi;
}

export interface LodgingOption {
  id: string;
  name: Bi;
  cn: string;
  area: StayArea;
  kind: 'hotel' | 'villa' | 'homestay';
  rooms: RoomType[];
  /** Rooms the family must book in this property to sleep five people. */
  roomsNeeded: number;
  note?: Bi;
  caveat?: Bi;
  confidence: Confidence;
  sourceIds: string[];
}

export interface FlightQuote {
  id: string;
  direction: 'out' | 'back';
  date: string;
  fromCode: string;
  toCode: string;
  carrier: Bi;
  depart: string;
  arrive?: string;
  /** Total for the four paying travellers (2 adults, 1 child, 1 infant). */
  total: number;
  breakdown?: Bi;
  note?: Bi;
  confidence: Confidence;
}

export interface BudgetLine {
  id: string;
  label: Bi;
  amount: number;
  confidence: Confidence;
  note?: Bi;
  /** Grouping for the itemised table. */
  group: 'flights' | 'stay' | 'car' | 'food' | 'extras';
}

export interface BudgetConfig {
  /** Ids of the chosen quotes; the grandmother's own ticket is excluded. */
  outFlightId: string;
  backFlightId: string;
  wenchangRoomId: string;
  beachRoomId: string;
  wenchangNights: number;
  beachNights: number;
  /** Rooms booked at the beach property, so the grandmother gets her own. */
  beachRooms: number;
  foodMode: FoodMode;
  carClass: CarClass;
}

export type FoodMode = 'villa' | 'mixed' | 'restaurant';
export type CarClass = 'suv' | 'mpv';

export interface BudgetPackage {
  id: string;
  name: Bi;
  subtitle: Bi;
  /** The shape of the trip in one line, e.g. "In via Haikou, out of Sanya, 5 nights". */
  shape: Bi;
  config: BudgetConfig;
  /** Driving burden this shape implies, for the trade-off note. */
  driveNote: Bi;
  tag?: Bi;
}


export interface ItineraryDay {
  date: string; // ISO
  dayLabel: Bi;
  title: Bi;
  base: Bi;
  drive: Bi;
  plan: Bi[];
  toddler: Bi;
  flexibility: 'fixed' | 'flexible' | 'buffer';
}

export interface ItineraryVariant {
  id: string;
  name: Bi;
  subtitle: Bi;
  recommended?: boolean;
  summary: Bi;
  days: ItineraryDay[];
}

// ---------------------------------------------------------------------------
// Packing list
// ---------------------------------------------------------------------------

/**
 * How much an item matters. The source list labelled every row in words
 * ("MUST BRING", "USEFUL", "OPTIONAL", …); the UI drops the label and encodes
 * the same meaning as the colour of the item text.
 */
export type PackTier = 'must' | 'high' | 'useful' | 'optional' | 'buy';

export interface PackItem {
  /** Stable across translations — checkbox state is keyed on this, never on the text. */
  id: string;
  text: Bi;
  tier: PackTier;
}

/** A subsection of the list, e.g. "Clothes" inside "Dad's suitcase". */
export interface PackGroup {
  id: string;
  /** Omitted when the source has no heading for this block. */
  title?: Bi;
  note?: Bi;
  items: PackItem[];
}

export interface PackSection {
  id: string;
  title: Bi;
  note?: Bi;
  /** Empty for prose-only sections such as the one-big-suitcase strategy. */
  groups: PackGroup[];
}
