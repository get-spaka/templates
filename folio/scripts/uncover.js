// The image of each figure marked data-uncover is uncovered from the bottom as
// the figure comes into view, settling from a little larger. The image is
// clipped, not the figure: what is clipped to nothing is never seen to come
// into view.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const figure of within(root, "[data-uncover]")) {
    const img = figure.querySelector("img");
    if (!img) continue;
    img.style.clipPath = "inset(100% 0% 0% 0%)";
    stops.push(
      inView(
        figure,
        () => {
          animate(
            img,
            { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], scale: [1.15, 1] },
            { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
          );
        },
        { amount: 0.1 },
      ),
    );
  }
}

export function stop(root) {
  for (const stop of stops) stop();
  stops = [];
  for (const figure of within(root, "[data-uncover]")) {
    const img = figure.querySelector("img");
    if (img) {
      img.style.clipPath = "";
      img.style.transform = "";
    }
  }
}
