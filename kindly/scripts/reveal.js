// data-reveal: headings, paragraphs and cards rise into view (y 24 → 0 with their opacity,
// 0.8 s). Under reduced motion and in edit mode, everything is in place.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    stops.push(
      inView(
        el,
        () => {
          animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.1 },
      ),
      () => {
        el.style.opacity = "";
        el.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const undo of stops) undo();
  stops = [];
}
