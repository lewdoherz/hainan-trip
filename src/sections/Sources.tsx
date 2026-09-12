import { DATA_STATUS, SOURCES } from '../data/sources';
import { ASSUMPTION_DEFS } from '../data/assumptions';
import { Callout, ConfidenceChip, SectionHeader } from '../components/ui';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

const KIND_KEY = {
  official: 'kindOfficial',
  operator: 'kindOperator',
  platform: 'kindPlatform',
  secondary: 'kindSecondary',
} as const;

const KIND_ORDER = ['official', 'operator', 'platform', 'secondary'] as const;

export function Sources() {
  const { t, fmt } = useTrip();
  const counts = {
    estimate: ASSUMPTION_DEFS.filter((d) => d.confidence === 'estimate').length,
    assumption: ASSUMPTION_DEFS.filter((d) => d.confidence === 'assumption').length,
    verified: ASSUMPTION_DEFS.filter((d) => d.confidence === 'verified').length,
  };

  return (
    <div className="stack">
      <SectionHeader eyebrow={t(UI.sourcesEyebrow)} title={t(UI.sourcesTitle)} lede={t(UI.sourcesLede)} />

      <div className="grid grid--2">
        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.howBuilt)}</h3>
          <p className="panel__text">{t(DATA_STATUS.method)}</p>
          <Callout tone="warn" title={t(UI.honestLimitation)}>
            {t(DATA_STATUS.limitation)}
          </Callout>
          <p className="panel__text">
            <strong>{fmt(t(UI.builtOn), { date: DATA_STATUS.builtAt })}</strong> ·{' '}
            {fmt(t(UI.assumptionsInModel), { total: ASSUMPTION_DEFS.length })} —{' '}
            {fmt(t(UI.countsBreakdown), counts)}
          </p>
        </section>

        <section className="panel panel--pad">
          <h3 className="panel__title">{t(UI.whatToRecheck)}</h3>
          <ul className="bullets">
            {DATA_STATUS.howToVerify.map((h, i) => (
              <li key={i}>{t(h)}</li>
            ))}
          </ul>
          <h4 className="panel__subtitle">{t(UI.confidenceLabels)}</h4>
          <ul className="legend">
            <li>
              <ConfidenceChip level="verified" />
              <span>{t(UI.legendVerified)}</span>
            </li>
            <li>
              <ConfidenceChip level="screenshot" />
              <span>{t(UI.screenshotHint)}</span>
            </li>
            <li>
              <ConfidenceChip level="estimate" />
              <span>{t(UI.legendEstimate)}</span>
            </li>
            <li>
              <ConfidenceChip level="assumption" />
              <span>{t(UI.legendAssumption)}</span>
            </li>
          </ul>
        </section>
      </div>

      {KIND_ORDER.map((kind) => {
        const list = SOURCES.filter((s) => s.kind === kind);
        if (list.length === 0) return null;
        return (
          <section key={kind}>
            <SectionHeader eyebrow={fmt(t(UI.sourcesCount), { n: list.length })} title={t(UI[KIND_KEY[kind]])} />
            <div className="sources">
              {list.map((s) => (
                <article className="source" key={s.id}>
                  <div className="source__head">
                    <h3 className="source__label">{t(s.label)}</h3>
                    {s.verifiedAt && (
                      <span className="source__date">{fmt(t(UI.checkedOn), { date: s.verifiedAt })}</span>
                    )}
                  </div>
                  <div className="source__publisher">{s.publisher}</div>
                  {s.url ? (
                    <a className="source__link" href={s.url} target="_blank" rel="noreferrer">
                      {s.url}
                    </a>
                  ) : (
                    <span className="source__nolink">{t(UI.noPublicSite)}</span>
                  )}
                  {s.note && <p className="source__note">{t(s.note)}</p>}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <Callout tone="info" title={t(UI.editingData)}>
        {t(UI.editingDataText)}
      </Callout>
    </div>
  );
}
