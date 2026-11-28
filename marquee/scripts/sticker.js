// Stickers (data-sticker) are slapped on as they come into view: from a little larger
// and turned 12° further, to the place and tilt their classes give them. With no
// script, under reduced motion and while editing, they are simply in place.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  within(root, "[data-sticker]").forEach((el, i) => {
    el.style.opacity = "0";
    stops.push(
      inView(
        el,
        () => {
          animate(
            el,
            { opacity: [0, 1], scale: [1.3, 1], rotate: [12, 0] },
            { duration: 0.45, delay: 0.25 + (i % 4) * 0.12, ease: [0.34, 1.56, 0.64, 1] },
          );
        },
        { amount: 0.4 },
      ),
    );
    stops.push(() => {
      el.style.opacity = "";
      el.style.transform = "";
    });
  });
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
