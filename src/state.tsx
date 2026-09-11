import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Assumptions, CategoryId } from './data/types';
import { DEFAULT_ASSUMPTIONS } from './data/assumptions';
import { TRANSPORT_OPTIONS } from './data/transport-options';
import {
  DEFAULT_WEIGHTS,
  evaluateOptions,
  pickHighlights,
  type Highlights,
  type OptionEvaluation,
  type Weights,
} from './lib/scoring';
import { usePersistentState } from './lib/storage';

interface TripState {
  assumptions: Assumptions;
  setAssumption: (key: string, value: number) => void;
  resetAssumptions: () => void;
  weights: Weights;
  setWeight: (id: CategoryId, value: number) => void;
  resetWeights: () => void;
  evaluations: OptionEvaluation[];
  byId: Record<string, OptionEvaluation>;
  highlights: Highlights;
}

const Ctx = createContext<TripState | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [assumptions, setAssumptions, resetAssumptions] = usePersistentState<Assumptions>(
    'assumptions',
    DEFAULT_ASSUMPTIONS,
  );
  const [weights, setWeights, resetWeights] = usePersistentState<Weights>('weights', DEFAULT_WEIGHTS);

  const value = useMemo<TripState>(() => {
    const evaluations = evaluateOptions(TRANSPORT_OPTIONS, assumptions, weights);
    return {
      assumptions,
      setAssumption: (key, v) => setAssumptions({ ...assumptions, [key]: v }),
      resetAssumptions,
      weights,
      setWeight: (id, v) => setWeights({ ...weights, [id]: v }),
      resetWeights,
      evaluations,
      byId: Object.fromEntries(evaluations.map((e) => [e.option.id, e])),
      highlights: pickHighlights(evaluations),
    };
  }, [assumptions, weights, setAssumptions, setWeights, resetAssumptions, resetWeights]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrip(): TripState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTrip must be used inside <TripProvider>');
  return ctx;
}
