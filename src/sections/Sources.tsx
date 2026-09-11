import { DATA_STATUS, SOURCES } from '../data/sources';
import { ASSUMPTION_DEFS } from '../data/assumptions';
import { Callout, ConfidenceChip, SectionHeader } from '../components/ui';

const KIND_LABEL: Record<string, string> = {
  official: 'Government / regulator',
  operator: 'Operator (airline, airport, port, rail, rental)',
  platform: 'Travel platform',
  secondary: 'News / secondary reporting',
};

const KIND_ORDER = ['official', 'operator', 'platform', 'secondary'];

export function Sources() {
  return (
    <div className="stack">
      <SectionHeader
        eyebrow="Sources"
        title="What is verified, what is estimated, and what still needs a phone call"
        lede="This app is used for a real trip, so every claim is labelled and every source is listed with the date it was checked."
      />

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">How this data was built</h3>
          <p className="panel__text">{DATA_STATUS.method}</p>
          <Callout tone="warn" title="Honest limitation">
            {DATA_STATUS.limitation}
          </Callout>
          <p className="panel__text">
            <strong>Built:</strong> {DATA_STATUS.builtAt} · <strong>Assumptions in the model:</strong>{' '}
            {ASSUMPTION_DEFS.length} ({ASSUMPTION_DEFS.filter((d) => d.confidence === 'estimate').length} estimates,{' '}
            {ASSUMPTION_DEFS.filter((d) => d.confidence === 'assumption').length} assumptions,{' '}
            {ASSUMPTION_DEFS.filter((d) => d.confidence === 'verified').length} verified)
          </p>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">What to re-check, and where</h3>
          <ul className="bullets">
            {DATA_STATUS.howToVerify.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h4 className="panel__subtitle">Confidence labels</h4>
          <ul className="legend">
            <li>
              <ConfidenceChip level="verified" />
              <span>Confirmed against a named source, or a stable established fact.</span>
            </li>
            <li>
              <ConfidenceChip level="estimate" />
              <span>A researched range that changes constantly — replace it with a live quote.</span>
            </li>
            <li>
              <ConfidenceChip level="assumption" />
              <span>A planning choice we made. If it is wrong, the comparison is wrong.</span>
            </li>
          </ul>
        </section>
      </div>

      {KIND_ORDER.map((kind) => {
        const list = SOURCES.filter((s) => s.kind === kind);
        if (list.length === 0) return null;
        return (
          <section key={kind}>
            <SectionHeader eyebrow={`${list.length} sources`} title={KIND_LABEL[kind]} />
            <div className="sources">
              {list.map((s) => (
                <article className="source" key={s.id}>
                  <div className="source__head">
                    <h3 className="source__label">{s.label}</h3>
                    {s.verifiedAt && <span className="source__date">checked {s.verifiedAt}</span>}
                  </div>
                  <div className="source__publisher">{s.publisher}</div>
                  {s.url ? (
                    <a className="source__link" href={s.url} target="_blank" rel="noreferrer">
                      {s.url}
                    </a>
                  ) : (
                    <span className="source__nolink">No public website — see the note</span>
                  )}
                  {s.note && <p className="source__note">{s.note}</p>}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <Callout tone="info" title="Editing the data">
        Trip facts live in <code>src/data/</code> — <code>trip.ts</code> (dates and places),{' '}
        <code>transport-options.ts</code> (routes, timelines, scores), <code>assumptions.ts</code> (every editable
        price and duration), <code>launch.ts</code>, <code>itinerary.ts</code>, <code>bases.ts</code> and{' '}
        <code>sources.ts</code>. Nothing else needs touching to update the app for a new launch window.
      </Callout>
    </div>
  );
}
