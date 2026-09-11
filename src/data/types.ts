/**
 * Central data model. Every researched figure in this app carries its own
 * provenance so the UI can distinguish verified facts from estimates and
 * assumptions, and so values can be re-verified later without touching UI code.
 */

/** How much we trust a figure. */
export type Confidence = 'verified' | 'estimate' | 'assumption';

export type SourceKind = 'official' | 'operator' | 'platform' | 'secondary';

export interface Source {
  id: string;
  label: string;
  url: string;
  publisher: string;
  kind: SourceKind;
  /** ISO date the figure behind this source was last observed/verified. */
  verifiedAt?: string;
  note?: string;
}

/** A single researched number. `value` is the point estimate used in math. */
export interface Metric {
  value: number;
  unit: string;
  low?: number;
  high?: number;
  confidence: Confidence;
  sourceIds: string[];
  notes?: string;
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
  label: string;
  short: string;
  /** What a high score means, in family terms. */
  description: string;
  defaultWeight: number;
  derived: boolean;
  /**
   * For `time` and `cost`: how the derived penalty is computed.
   * ratio → score = 100 × (best / value), so "cheapest/fastest" = 100.
   */
  badge?: string;
}

// ---------------------------------------------------------------------------
// Costs
// ---------------------------------------------------------------------------

export interface CostLine {
  id: string;
  label: string;
  amount: number;
  /** Assumption keys this line is computed from, for "what drives this" hints. */
  drivenBy?: string[];
  confidence: Confidence;
  sourceIds?: string[];
  note?: string;
}

// ---------------------------------------------------------------------------
// Time model
// ---------------------------------------------------------------------------

export type SegmentKind = 'travel' | 'wait' | 'admin' | 'rest' | 'overnight';

export interface Segment {
  id: string;
  label: string;
  detail?: string;
  kind: SegmentKind;
  /**
   * Literal minutes, an assumption key (user-editable), or a compute key
   * (derived from several assumptions, e.g. km ÷ speed).
   */
  minutes: number | { assumption: string } | { compute: string };
  confidence: Confidence;
  /** Comfort note shown in the timeline, e.g. nap window. */
  note?: string;
}

/** A day/phase grouping of segments for the route timeline. */
export interface TimelineGroup {
  id: string;
  label: string;
  /** e.g. "Day 1 — Sep 15" */
  sublabel?: string;
  /** Local clock time the group starts at, e.g. "05:30" — drives the running clock. */
  start?: string;
  segments: Segment[];
  note?: string;
}

// ---------------------------------------------------------------------------
// Transport options
// ---------------------------------------------------------------------------

export interface ScoreRationale {
  score: number; // 0–100
  why: string;
}

export interface PracticalNote {
  label: string;
  value: string;
  tone?: 'good' | 'warn' | 'bad' | 'neutral';
}

export interface TransportOption {
  id: string;
  name: string;
  subtitle: string;
  cnName?: string;
  /** Short mode tag used on cards. */
  modeLabel: string;
  vehicle: string;
  /** One-line positioning of the option. */
  tagline: string;
  /** Longer narrative for the detail view. */
  verdict: string;
  accent: string;
  /** Hand-over points where luggage and children must be moved again. */
  transfers: number;
  staticScores: Record<StaticCategoryId, ScoreRationale>;
  costLines: (a: Assumptions) => CostLine[];
  /** Static timeline, or one built from the assumptions (the drive option). */
  timeline: TimelineGroup[] | ((a: Assumptions) => TimelineGroup[]);
  practical: PracticalNote[];
  pros: string[];
  cons: string[];
  /** Route legs for the map / route view. */
  legs: RouteLeg[];
  /** What to do if the plan breaks (launch slip, ferry weather, missed flight). */
  contingencies: string[];
  confidence: Confidence;
}

export interface RouteLeg {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  mode: 'car' | 'ferry' | 'plane' | 'train' | 'hsr' | 'bus' | 'taxi' | 'walk';
  /** Distance/time display strings (approximate, human readable). */
  distance: string;
  duration: string;
  note?: string;
}

export interface Place {
  id: string;
  name: string;
  cn: string;
  lat: number;
  lng: number;
  kind: 'origin' | 'hub' | 'port' | 'airport' | 'launch' | 'stay' | 'stop' | 'destination';
  note?: string;
}

// ---------------------------------------------------------------------------
// Editable assumptions
// ---------------------------------------------------------------------------

export type AssumptionGroup = 'drive' | 'ferry' | 'flight' | 'rental' | 'train' | 'family';

export interface AssumptionDef {
  key: string;
  label: string;
  group: AssumptionGroup;
  unit: string;
  /** Default value — every value here is an ESTIMATE unless labelled otherwise. */
  def: number;
  min: number;
  max: number;
  step: number;
  confidence: Confidence;
  sourceIds?: string[];
  note?: string;
  /** For unit 'on/off' toggles: what "on" means. */
  onLabel?: string;
  offLabel?: string;
}

export type Assumptions = Record<string, number>;

// ---------------------------------------------------------------------------
// Launch data
// ---------------------------------------------------------------------------

export interface ViewingSpot {
  id: string;
  name: string;
  cn: string;
  /** Direction/feel of the view, roughly how far from the pad. */
  distance: string;
  /** Is it freely accessible, or ticketed/restricted? */
  access: string;
  ticket: string;
  stroller: 'yes' | 'partial' | 'no';
  goodFor: string;
  caveat?: string;
  confidence: Confidence;
  sourceIds: string[];
}

export interface LaunchTimingStep {
  time: string;
  label: string;
  detail: string;
  tone?: 'info' | 'warn' | 'good';
}

// ---------------------------------------------------------------------------
// Itinerary
// ---------------------------------------------------------------------------

export interface ItineraryDay {
  date: string; // ISO
  dayLabel: string;
  title: string;
  base: string;
  drive: string;
  plan: string[];
  toddler: string;
  flexibility: 'fixed' | 'flexible' | 'buffer';
}

export interface ItineraryVariant {
  id: string;
  name: string;
  subtitle: string;
  recommended?: boolean;
  summary: string;
  days: ItineraryDay[];
}
