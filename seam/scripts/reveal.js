// data-reveal: a text rises a little into view (y 20 → 0, with its opacity, 0.8 s).
// Siblings that reveal too follow each other 0.08 s apart.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

/** Its place among the siblings that reveal too, for the stagger. */
function rank(el) {
  const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal")) : [];
  return Math.max(0, siblings.indexOf(el)) % 6;
}

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const delay = rank(el) * 0.08;
    stops.push(
      inView(
        el,
        () => {
          animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.05 },
      ),
      () => {
        el.style.opacity = "";
        el.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
