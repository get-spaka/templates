// data-reveal: a section's main element rises into view; data-reveal="stagger" on a list rises
// its children 70 ms apart. data-reveal-bars: a sound print's bars grow from a tenth of their
// height, left to right, as it comes into view. With no script everything stands as written.
import { animate, inView, stagger } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const items = el.dataset.reveal === "stagger" ? [...el.children] : [el];
    for (const item of items) {
      item.style.opacity = "0";
      item.style.transform = "translateY(24px)";
    }
    stops.push(
      inView(
        el,
        () => {
          for (const [i, item] of items.entries())
            animate(item, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: EASE, delay: i * 0.07 });
        },
        { amount: 0.05 },
      ),
      () => {
        for (const item of items) {
          item.style.opacity = "";
          item.style.transform = "";
        }
      },
    );
  }
  for (const el of within(root, "[data-reveal-bars]")) {
    const bars = [...el.querySelectorAll("i")];
    for (const bar of bars) bar.style.transform = "scaleY(0.1)";
    stops.push(
      inView(
        el,
        () => {
          animate(bars, { scaleY: [0.1, 1] }, { duration: 0.6, ease: EASE, delay: stagger(0.012) });
        },
        { amount: 0.3 },
      ),
      () => {
        for (const bar of bars) bar.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
