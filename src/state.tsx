import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Assumptions, Bi, CategoryId, Lang } from './data/types';
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
import { fill, t as translate, tAll as translateAll, HTML_LANG } from './i18n/lang';
import { UI } from './i18n/ui';

interface TripState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Resolve a bilingual value to the active language. */
  t: (value: Bi | string | undefined) => string;
  tAll: (values: Bi[] | undefined) => string[];
  /** Substitute {placeholders} in an already-resolved template. */
  fmt: (template: string, vars: Record<string, string | number>) => string;
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
  const [lang, setLang] = usePersistentState<Lang>('lang', 'en');
  const [assumptions, setAssumptions, resetAssumptions] = usePersistentState<Assumptions>(
    'assumptions',
    DEFAULT_ASSUMPTIONS,
  );
  const [weights, setWeights, resetWeights] = usePersistentState<Weights>('weights', DEFAULT_WEIGHTS);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = `${translate(TRIP_TITLE, lang)} · ${translate(UI.overviewEyebrow, lang)}`;
  }, [lang]);

  const value = useMemo<TripState>(() => {
    const evaluations = evaluateOptions(TRANSPORT_OPTIONS, assumptions, weights, lang);
    return {
      lang,
      setLang,
      t: (v) => translate(v, lang),
      tAll: (v) => translateAll(v, lang),
      fmt: fill,
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
  }, [assumptions, weights, lang, setAssumptions, setWeights, resetAssumptions, resetWeights]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

const TRIP_TITLE: Bi = { en: 'Xiamen → Wenchang', zh: '厦门 → 文昌' };

export function useTrip(): TripState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTrip must be used inside <TripProvider>');
  return ctx;
}
