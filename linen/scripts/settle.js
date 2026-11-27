// data-settle: pictures and cards settle as they come into view, as if just hung on a nail:
// from a little lower and turned a degree, around their top. The script sets where they start
// from, just before; with no script, under reduced motion and while editing, they are in place.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];
let touched = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-settle]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px) rotate(-1.2deg)";
    touched.push(el);
    stops.push(
      inView(
        el,
        () => {
          animate(el, { opacity: [0, 1], y: [20, 0], rotate: [-1.2, 0] }, { duration: 1, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const el of touched) {
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
  }
  touched = [];
}
