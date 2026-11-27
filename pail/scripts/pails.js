// The pails: as each pail of a shelf ([data-pails]) comes into view, its stem is lowered into
// its pail, as if set there from the van (y -28 → 0 with its opacity, 0.7 s; pails seen together go 80 ms
// apart from the left); the pails themselves never move. The sway on hover and the lift
// of a picked stem are the stylesheet's (CSS transitions on `translate` and `rotate`,
// which compose with the transform set here). Under reduced motion and in edit mode,
// every stem is in its pail.
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
  for (const shelf of within(root, "[data-pails]")) {
    const pails = [...shelf.querySelectorAll("[data-pail]")];
    const stems = pails.map((pail) => pail.querySelector(".pail-stem")).filter(Boolean);
    for (const stem of stems) {
      stem.style.opacity = "0";
      stem.style.transform = "translateY(-28px)";
    }
    // Each pail is watched on its own, so a long shelf on a phone (two pails a row) lowers
    // the stems on the screen; the pails that come into view together go 80 ms apart.
    let batch = 0;
    let frame = 0;
    const timers = new Set();
    const stopView = inView(
      pails,
      (pail) => {
        const stem = pail.querySelector(".pail-stem");
        if (!stem) return;
        const i = batch++;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          batch = 0;
        });
        // Motion writes its last values just after it finishes: clear them a moment later,
        // so the stylesheet's own transforms (a picked stem's lift) stay alone.
        animate(stem, { opacity: [0, 1], y: [-28, 0] }, { duration: 0.7, delay: i * 0.08, ease: EASE })
          .finished.then(() => {
            const timer = setTimeout(() => {
              timers.delete(timer);
              stem.style.opacity = "";
              stem.style.transform = "";
            }, 80);
            timers.add(timer);
          })
          .catch(() => {});
      },
      { amount: 0.3 },
    );
    stops.push(() => {
      stopView();
      cancelAnimationFrame(frame);
      for (const timer of timers) clearTimeout(timer);
      for (const stem of stems) {
        stem.style.opacity = "";
        stem.style.transform = "";
      }
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
