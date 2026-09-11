import type { TransportOption } from './types';
import { DRIVE_FERRY } from './options/drive-ferry';
import { FLY_RENT_HAK } from './options/fly-rent-hak';
import { FLY_RENT_SYX } from './options/fly-rent-syx';
import { TRAIN_RENT } from './options/train-rent';
import { FLY_IN_OUT } from './options/fly-in-out';

/**
 * The competing strategies.
 *
 * CONVENTIONS
 *  • Times describe the OUTBOUND journey only (Xiamen → Hainan), because that is
 *    the leg that has to land before the launch.
 *  • Costs are ROUND TRIP, because that is what the family actually pays.
 *  • Static scores (family, reliability, transfers, mobility, luggage, stress)
 *    are researched judgements, each with a written justification. Cost and
 *    travel time are derived live by the scoring engine.
 */
export const TRANSPORT_OPTIONS: TransportOption[] = [
  DRIVE_FERRY,
  FLY_RENT_HAK,
  FLY_RENT_SYX,
  TRAIN_RENT,
  FLY_IN_OUT,
];
