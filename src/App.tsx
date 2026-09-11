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

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'compare', label: 'Compare' },
  { id: 'routes', label: 'Routes' },
  { id: 'costs', label: 'Costs' },
  { id: 'launch', label: 'Launch' },
  { id: 'plan', label: 'Hainan plan' },
  { id: 'sources', label: 'Sources' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const isTab = (value: string): value is TabId => TABS.some((t) => t.id === value);

function Shell() {
  const { highlights } = useTrip();
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
              <div className="brand__title">Xiamen → Wenchang</div>
              <div className="brand__meta">
                {TRIP.launch.dateLabel} · launch window tentative · {TRIP.nightsInHainan} nights in Hainan
              </div>
            </div>
          </div>
          <nav className="nav" aria-label="Sections">
            {TABS.map((t) => (
              <button
                type="button"
                key={t.id}
                className={`nav__item${tab === t.id ? ' nav__item--active' : ''}`}
                aria-current={tab === t.id ? 'page' : undefined}
                onClick={() => go(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="app__main">
        <div className="container">
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
          <p>
            A family decision aid, not a booking engine. Prices and durations are estimates or editable assumptions —
            confirm them with the ferry operator, the airlines, the rental company and the official launch channels
            before spending money.
          </p>
          <button type="button" className="btn btn--chip" onClick={() => go('sources')}>
            See sources and verification status
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
