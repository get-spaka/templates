// The plates: as a list of dishes ([data-plates]) comes into view, each round photo in it
// ([data-plate]) is set down on the table in turn, as if served: it settles from a little
// larger and turned, 90 ms after the one before. The hero's plate ([data-plate="load"]) is
// set down the same way when the page loads. With no script, under reduced motion and in
// edit mode, every plate is in place and still.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const SET_DOWN = { scale: [1.06, 1], rotate: [-8, 0], opacity: [0, 1] };
const EASE = [0.22, 1, 0.36, 1];
let stops = [];

function hide(plate) {
  plate.style.opacity = "0";
  plate.style.transform = "scale(1.06) rotate(-8deg)";
  stops.push(() => {
    plate.style.opacity = "";
    plate.style.transform = "";
  });
}

export function start(root) {
  if (reduced()) return;
  for (const plate of within(root, '[data-plate="load"]')) {
    hide(plate);
    Motion.animate(plate, SET_DOWN, { duration: 0.9, delay: 0.15, ease: EASE });
  }
  for (const list of within(root, "[data-plates]")) {
    const plates = [...list.querySelectorAll('[data-plate]:not([data-plate="load"])')];
    if (!plates.length) continue;
    plates.forEach(hide);
    stops.push(
      Motion.inView(
        list,
        () => {
          plates.forEach((plate, i) => {
            Motion.animate(plate, SET_DOWN, { duration: 0.7, delay: i * 0.09, ease: EASE });
          });
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
