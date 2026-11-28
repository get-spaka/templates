// The hills (data-hill) and the ranges (data-range): Liquid drew each wine at the
// year the page was rendered. In visitor mode this sets the visitor's day on them
// (--now, --year), puts right a stage passed since the site was published, and,
// when a hill comes into view, walks its marker up the slope from the vintage to
// today. Under reduced motion the marker stands at today without walking.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The elements matching `selector` in what is starting: the root itself included. */
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

/** This year to the day, as a number: 2026.89 in late November. */
function today() {
  const d = new Date();
  const from = new Date(d.getFullYear(), 0, 1);
  const to = new Date(d.getFullYear() + 1, 0, 1);
  return d.getFullYear() + (d - from) / (to - from);
}

/** A wine's stage at `now`, from its years "vintage ready best by" (data-years). */
function stageAt(years, now) {
  const [, ready, best, by] = years.trim().split(/\s+/).map(Number);
  if (![ready, best, by].every(Number.isFinite)) return null;
  if (now < ready) return "keep";
  if (now < best) return "open";
  if (now < by) return "drink-up";
  return "past";
}

const cssNumber = (el, name) => Number.parseFloat(getComputedStyle(el).getPropertyValue(name));

let stops = [];

/** Sets the stage of every element with its years, keeping the one Liquid wrote. */
function restage(root, now) {
  for (const el of within(root, "[data-years][data-stage]")) {
    const written = el.dataset.stage;
    const stage = stageAt(el.dataset.years, now);
    if (!stage || stage === written) continue;
    el.dataset.stage = stage;
    stops.push(() => {
      el.dataset.stage = written;
    });
  }
}

/** Puts the day on an element and walks --at from `from` to it once it is in view. */
function walk(el, from, now, line) {
  el.style.setProperty("--now", String(now));
  el.style.setProperty("--year", String(Math.floor(now)));
  const clear = () => {
    el.style.removeProperty("--now");
    el.style.removeProperty("--year");
    el.style.removeProperty("--at");
    if (line) {
      line.style.opacity = "";
      line.style.transform = "";
    }
  };
  if (reduced() || !Number.isFinite(from) || from >= now) {
    stops.push(clear);
    return;
  }
  el.style.setProperty("--at", String(from));
  if (line) line.style.opacity = "0";
  const running = [];
  const stopView = inView(
    el,
    () => {
      running.push(
        animate(from, now, {
          duration: 1.4,
          ease: [0.33, 1, 0.68, 1],
          onUpdate: (at) => el.style.setProperty("--at", String(at)),
        }),
      );
      if (line) {
        running.push(
          animate(line, { opacity: [0, 1], y: [8, 0] }, { duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }),
        );
      }
    },
    { amount: 0.4 },
  );
  stops.push(() => {
    stopView();
    for (const animation of running) animation.stop();
    clear();
  });
}

export function start(root) {
  const now = today();
  restage(root, now);
  for (const hill of within(root, "[data-hill]")) {
    walk(hill, cssNumber(hill, "--vintage"), now, hill.querySelector(":scope > .hill-line"));
  }
  for (const range of within(root, "[data-range]")) {
    walk(range, cssNumber(range, "--from"), now, null);
  }
}

export function stop() {
  for (const stop of stops.reverse()) stop();
  stops = [];
}
