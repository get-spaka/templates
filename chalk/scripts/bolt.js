// Bolted on: the holds of a data-bolt group come in one by one, from a 0.4 scale
// and a quarter turn back to their resting turn, overshooting a little, as if
// screwed onto the wall. data-bolt="load" starts on load (the hero's); the others
// as they come into view. With no script, in edit mode and under reduced motion,
// the holds are simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const group of within(root, "[data-bolt]")) {
    const holds = [...group.querySelectorAll(".hold")];
    if (!holds.length) continue;
    for (const hold of holds) {
      hold.style.opacity = "0";
      hold.style.transform = "scale(0.4) rotate(-90deg)";
    }
    const go = () => {
      holds.forEach((hold, i) => {
        const delay = 0.12 + i * 0.09;
        Motion.animate(hold, { opacity: [0, 1] }, { duration: 0.2, delay });
        Motion.animate(hold, { scale: [0.4, 1], rotate: [-90, 0] }, { type: "spring", stiffness: 260, damping: 13, delay });
      });
    };
    if (group.getAttribute("data-bolt") === "load") go();
    else stops.push(Motion.inView(group, go, { amount: 0.1 }));
    stops.push(() => {
      for (const hold of holds) {
        hold.style.opacity = "";
        hold.style.transform = "";
      }
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
