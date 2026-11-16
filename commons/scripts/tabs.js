// The tear-off tabs (data-tabs on a notice's fringe): as the notice comes into view,
// its tabs flutter once from their top edge, like paper in a draft from the door.
// With no script, under reduced motion and in edit mode they hang straight.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const fringe of within(root, "[data-tabs]")) {
    const tabs = [...fringe.querySelectorAll(".tab")];
    if (!tabs.length) continue;
    stops.push(
      Motion.inView(
        fringe,
        () => {
          tabs.forEach((tab, i) => {
            Motion.animate(
              tab,
              { rotate: [6 - (i % 2) * 3, 0] },
              { type: "spring", stiffness: 140, damping: 5, mass: 0.6, delay: 0.25 + i * 0.05 },
            );
          });
        },
        { amount: 0.6 },
      ),
      () => {
        for (const tab of tabs) tab.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
