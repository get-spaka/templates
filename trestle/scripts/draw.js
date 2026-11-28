// The dimension lines (data-measure), the drive-time rings (data-rings) and the
// build rulers (data-ruler) draw themselves as they come into view. The drawing
// is CSS (styles/site.css); this only holds it ("wait") until the element is on
// the screen, then lets it run ("go"). With no script, in edit mode and under
// reduced motion, everything is simply drawn.
import { inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-measure]:not([data-measure-on]), [data-rings], [data-ruler]")) {
    el.setAttribute("data-draw", "wait");
    stops.push(
      inView(
        el,
        () => {
          el.setAttribute("data-draw", "go");
        },
        { amount: 0.15 },
      ),
      () => el.removeAttribute("data-draw"),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
