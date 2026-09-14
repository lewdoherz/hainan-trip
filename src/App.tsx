import { useEffect, useRef, useState } from 'react';
import { TripProvider, useTrip } from './state';
import { HEADER_LOCK_EVENT, type HeaderLockDetail } from './lib/header';
import { Overview } from './sections/Overview';
import { Budget } from './sections/Budget';
import { Compare } from './sections/Compare';
import { Routes } from './sections/Routes';
import { Costs } from './sections/Costs';
import { Launch } from './sections/Launch';
import { Plan } from './sections/Plan';
import { Packing } from './sections/Packing';
import { Sources } from './sections/Sources';
import { TRIP } from './data/trip';
import { LANGS } from './i18n/lang';
import { UI } from './i18n/ui';
import type { Bi } from './data/types';

const TABS: { id: string; label: Bi }[] = [
  { id: 'overview', label: UI.navOverview },
  { id: 'budget', label: UI.navBudget },
  { id: 'compare', label: UI.navCompare },
  { id: 'routes', label: UI.navRoutes },
  { id: 'costs', label: UI.navCosts },
  { id: 'launch', label: UI.navLaunch },
  { id: 'plan', label: UI.navPlan },
  { id: 'packing', label: UI.navPacking },
  { id: 'sources', label: UI.navSources },
];

type TabId = (typeof TABS)[number]['id'];

const isTab = (value: string): value is TabId => TABS.some((t) => t.id === value);

function LanguageSwitch({ onActivate }: { onActivate: () => void }) {
  const { t, lang, setLang } = useTrip();
  return (
    <div className="lang" role="group" aria-label={t(UI.langSwitch)}>
      {LANGS.map((l) => (
        <button
          type="button"
          key={l.id}
          className={`lang__btn${lang === l.id ? ' lang__btn--active' : ''}`}
          aria-pressed={lang === l.id}
          title={`${t(UI.langLabel)}: ${l.label}`}
          onClick={() => {
            setLang(l.id);
            onActivate();
          }}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

/**
 * Tucks the sticky header away while the page is being scrolled through, and
 * brings it back the moment the user scrolls up — so a 314-row checklist gets
 * the whole screen on a phone (the header is 221px of an 844px viewport there).
 *
 * It publishes two custom properties: `--app-header-height` is always the real
 * measured height, `--app-header-h` is the space the header actually occupies
 * right now (0 while hidden). Layout code positions against the second one.
 */
function useAutoHideHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);
  const [height, setHeight] = useState(0);
  const lastY = useRef(0);
  const suppressUntil = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    lastY.current = window.scrollY;

    const measure = () => setHeight(el.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY.current;
        lastY.current = y;
        // A scroll we started ourselves must not be reinterpreted mid-flight.
        if (performance.now() < suppressUntil.current) return;
        const h = el.offsetHeight;
        if (y <= 8 || el.contains(document.activeElement)) setHidden(false);
        else if (delta > 6 && y > h + 24) setHidden(true);
        // Sticky on the way back: small upward jitter during momentum
        // scrolling should not pop the header in and out.
        else if (delta < -8) setHidden(false);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onLock = (event: Event) => {
      const detail = (event as CustomEvent<HeaderLockDetail>).detail;
      suppressUntil.current = performance.now() + 900;
      setHidden(detail?.hidden ?? false);
    };
    window.addEventListener(HEADER_LOCK_EVENT, onLock);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(HEADER_LOCK_EVENT, onLock);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--app-header-height', `${height}px`);
    root.setProperty('--app-header-h', hidden ? '0px' : `${height}px`);
  }, [height, hidden]);

  return { ref, hidden };
}

function Shell() {
  const { t, fmt, highlights, lang } = useTrip();
  const header = useAutoHideHeader();
  const lastPointer = useRef(0);
  const [tab, setTab] = useState<TabId>(() => {
    const hash = window.location.hash.replace('#', '');
    return isTab(hash) ? hash : 'overview';
  });
  const [selectedOptionId, setSelectedOptionId] = useState('');

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (isTab(hash)) setTab(hash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const focusId = selectedOptionId || highlights.bestOverall;

  /**
   * Tapping a header control leaves it focused, and a focused control has to
   * keep the header on screen — which would stop it ever hiding for the rest of
   * the session. Pointer activation therefore drops focus; keyboard activation
   * keeps it, so tabbing through the nav never scrolls it out of reach.
   */
  const dropPointerFocus = () => {
    if (performance.now() - lastPointer.current > 800) return;
    const active = document.activeElement as HTMLElement | null;
    if (active && active !== document.body) active.blur();
  };

  const go = (id: TabId) => {
    dropPointerFocus();
    setTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOption = (id: string) => {
    setSelectedOptionId(id);
    go('routes');
  };

  return (
    <div className="app">
      <header
        className={`app__header${header.hidden ? ' app__header--hidden' : ''}`}
        ref={header.ref}
        onPointerDown={() => {
          lastPointer.current = performance.now();
        }}
      >
        <div className="app__header-inner">
          <div className="brand">
            <span className="brand__mark" aria-hidden="true">
              ▲
            </span>
            <div>
              <div className="brand__title">{t(TRIP.title)}</div>
              <div className="brand__meta">
                {fmt(t(UI.brandMeta), {
                  date: t(TRIP.launch.dateLabel),
                  nights: TRIP.nightsInHainan,
                })}
              </div>
            </div>
          </div>
          <div className="app__header-right">
            <nav className="nav" aria-label={t(UI.navAria)}>
              {TABS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`nav__item${tab === item.id ? ' nav__item--active' : ''}`}
                  aria-current={tab === item.id ? 'page' : undefined}
                  onClick={() => go(item.id as TabId)}
                >
                  {t(item.label)}
                </button>
              ))}
            </nav>
            <LanguageSwitch onActivate={dropPointerFocus} />
          </div>
        </div>
      </header>

      <main className="app__main">
        <div className="container" lang={lang === 'zh' ? 'zh-CN' : undefined}>
          {tab === 'overview' && <Overview onOpenOption={openOption} onOpenBudget={() => go('budget')} />}
          {tab === 'budget' && <Budget />}
          {tab === 'compare' && <Compare selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'routes' && <Routes selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'costs' && <Costs selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'launch' && <Launch />}
          {tab === 'plan' && <Plan />}
          {tab === 'packing' && <Packing />}
          {tab === 'sources' && <Sources />}
        </div>
      </main>

      <footer className="app__footer">
        <div className="container app__footer-inner">
          <p>{t(UI.footerText)}</p>
          <button type="button" className="btn btn--chip" onClick={() => go('sources')}>
            {t(UI.footerCta)}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <Shell />
    </TripProvider>
  );
}
