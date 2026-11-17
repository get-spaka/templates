// data-diecut: a photograph's die-cut window opens as it comes into view, from a small
// rounded window in the middle to the whole shape (its arch, pebble or scallop stays), while
// the image inside eases from 1.12 to 1. With no script, under reduced motion and in edit
// mode, the full die-cut.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
const CLOSED = "inset(32% 26% round 999px)";
const OPEN = "inset(0% 0% round 0px)";
let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const cut of within(root, "[data-diecut]")) {
    const img = cut.querySelector("img");
    cut.style.clipPath = CLOSED;
    if (img) img.style.transform = "scale(1.12)";
    stops.push(
      Motion.inView(
        cut,
        () => {
          Motion.animate(cut, { clipPath: [CLOSED, OPEN] }, { duration: 1, ease: EASE }).finished.then(() => {
            cut.style.clipPath = "";
          });
          if (img) Motion.animate(img, { scale: [1.12, 1] }, { duration: 1.2, ease: EASE });
        },
        { amount: 0.15 },
      ),
      () => {
        cut.style.clipPath = "";
        if (img) img.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const undo of stops) undo();
  stops = [];
}
