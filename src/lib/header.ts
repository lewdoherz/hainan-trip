/**
 * The app header can tuck itself away while you read a long list. It owns that
 * state, so anything that scrolls the page on the user's behalf has to tell it
 * what to do — otherwise a jump could land a heading underneath a header that
 * reappeared mid-scroll.
 */

export const HEADER_LOCK_EVENT = 'app:lock-header';

export interface HeaderLockDetail {
  hidden: boolean;
}

function cssPx(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

/**
 * Scroll to an element, keeping its top edge clear of the sticky header.
 *
 * The header's measured height and its hidden state are read from CSS at call
 * time rather than from React state, so the landing position cannot be stale
 * while a state update is still in flight.
 */
export function scrollToSection(el: HTMLElement): void {
  // Anything above the viewport top means the page is about to scroll up, and
  // an upward scroll brings the header back.
  const goingUp = el.getBoundingClientRect().top < 0;
  window.dispatchEvent(
    new CustomEvent<HeaderLockDetail>(HEADER_LOCK_EVENT, { detail: { hidden: !goingUp } }),
  );
  const headerHeight = goingUp ? cssPx('--app-header-height', 0) : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
