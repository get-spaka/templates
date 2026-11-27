// A section's main elements rise a little as they come into view: data-reveal on an
// element, or data-reveal="stagger" on a list whose children rise 70 ms apart.
import { animate, inView } from "motion";

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
      item.style.transform = "translateY(12px)";
    }
    stops.push(
      inView(
        el,
        () => {
          for (const [i, item] of items.entries())
            animate(item, { opacity: [0, 1], y: [12, 0] }, { duration: 0.7, ease: EASE, delay: i * 0.07 });
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
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
