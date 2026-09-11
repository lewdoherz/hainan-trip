import { useEffect, useState } from 'react';
import { TripProvider, useTrip } from './state';
import { Overview } from './sections/Overview';
import { Compare } from './sections/Compare';
import { Routes } from './sections/Routes';
import { Costs } from './sections/Costs';
import { Launch } from './sections/Launch';
import { Plan } from './sections/Plan';
import { Sources } from './sections/Sources';
import { TRIP } from './data/trip';
import { LANGS } from './i18n/lang';
import { UI } from './i18n/ui';
import type { Bi } from './data/types';

const TABS: { id: string; label: Bi }[] = [
  { id: 'overview', label: UI.navOverview },
  { id: 'compare', label: UI.navCompare },
  { id: 'routes', label: UI.navRoutes },
  { id: 'costs', label: UI.navCosts },
  { id: 'launch', label: UI.navLaunch },
  { id: 'plan', label: UI.navPlan },
  { id: 'sources', label: UI.navSources },
];

type TabId = (typeof TABS)[number]['id'];

const isTab = (value: string): value is TabId => TABS.some((t) => t.id === value);

function LanguageSwitch() {
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
          onClick={() => setLang(l.id)}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

function Shell() {
  const { t, fmt, highlights, lang } = useTrip();
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

  const go = (id: TabId) => {
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
      <header className="app__header">
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
            <LanguageSwitch />
          </div>
        </div>
      </header>

      <main className="app__main">
        <div className="container" lang={lang === 'zh' ? 'zh-CN' : undefined}>
          {tab === 'overview' && <Overview onOpenOption={openOption} />}
          {tab === 'compare' && <Compare selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'routes' && <Routes selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'costs' && <Costs selectedOptionId={focusId} onSelectOption={setSelectedOptionId} />}
          {tab === 'launch' && <Launch />}
          {tab === 'plan' && <Plan />}
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
