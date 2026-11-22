// data-reveal: a section's main elements rise a little into view (y 16 → 0, with their
// opacity, 0.7 s). data-reveal="stagger" on a list does the same for its children,
// 70 ms apart among those that come into view together. Under reduced motion and in
// edit mode, everything is in place.
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
    let batch = [];
    let frame;
    for (const item of items) {
      item.style.opacity = "0";
      item.style.transform = "translateY(16px)";
      // Each item is watched on its own, so a long list on a phone rises as it scrolls;
      // those that come into view in the same frame rise one after another.
      stops.push(
        Motion.inView(
          item,
          () => {
            batch.push(item);
            if (frame) return;
            frame = requestAnimationFrame(() => {
              batch.forEach((it, i) => {
                Motion.animate(it, { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, delay: i * 0.07, ease: EASE });
              });
              batch = [];
              frame = undefined;
            });
          },
          { amount: 0.05 },
        ),
        () => {
          if (frame) cancelAnimationFrame(frame);
          frame = undefined;
          item.style.opacity = "";
          item.style.transform = "";
        },
      );
    }
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
