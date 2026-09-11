import { useEffect, useState } from 'react';
import { TRIP } from '../data/trip';
import { useTrip } from '../state';
import { UI } from '../i18n/ui';

function diffParts(target: number) {
  const ms = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    passed: ms === 0,
  };
}

export function Countdown({ showSeconds = true }: { showSeconds?: boolean }) {
  const { t } = useTrip();
  const target = new Date(TRIP.launch.startsAt).getTime();
  const [parts, setParts] = useState(() => diffParts(target));

  useEffect(() => {
    const id = window.setInterval(() => setParts(diffParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (parts.passed) {
    return (
      <div className="countdown countdown--passed">
        <span className="countdown__passed-text">{t(UI.cdPassed)}</span>
      </div>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: t(UI.cdDays), value: parts.days },
    { label: t(UI.cdHours), value: parts.hours },
    { label: t(UI.cdMinutes), value: parts.minutes },
  ];
  if (showSeconds) units.push({ label: t(UI.cdSeconds), value: parts.seconds });

  return (
    <div className="countdown" role="timer" aria-live="off">
      {units.map((u) => (
        <div className="countdown__unit" key={u.label}>
          <span className="countdown__value">{String(u.value).padStart(2, '0')}</span>
          <span className="countdown__label">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
