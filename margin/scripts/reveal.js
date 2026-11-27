// Each element marked data-reveal (a row of letters, a heading) rises a little into view as the page scrolls to it.
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
    el.style.transform = "translateY(12px)";
    stops.push(
      inView(
        el,
        () => {
          animate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop(root) {
  for (const stop of stops) stop();
  stops = [];
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "";
    el.style.transform = "";
  }
}
