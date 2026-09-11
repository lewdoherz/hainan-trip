import { useEffect, useState } from 'react';
import { TRIP } from '../data/trip';

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
  const target = new Date(TRIP.launch.startsAt).getTime();
  const [parts, setParts] = useState(() => diffParts(target));

  useEffect(() => {
    const id = window.setInterval(() => setParts(diffParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (parts.passed) {
    return (
      <div className="countdown countdown--passed">
        <span className="countdown__passed-text">Launch window reached — check the live schedule</span>
      </div>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: 'days', value: parts.days },
    { label: 'hours', value: parts.hours },
    { label: 'minutes', value: parts.minutes },
  ];
  if (showSeconds) units.push({ label: 'seconds', value: parts.seconds });

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
