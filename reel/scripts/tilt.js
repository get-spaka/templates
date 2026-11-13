// Tilted slabs (data-tilt, the tilt itself a class such as -rotate-3): each drops in from
// 12° further than its tilt and settles at it as it comes into view. With no script,
// under reduced motion and while editing, it simply sits at its tilt.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const slab of within(root, "[data-tilt]")) {
    if (running.has(slab)) continue;
    // Further in the direction it already leans (its CSS rotate), counterclockwise if flat.
    const tilt = parseFloat(getComputedStyle(slab).rotate) || 0;
    const extra = tilt > 0 ? 12 : -12;
    Motion.animate(slab, { rotate: extra, y: -56 }, { duration: 0 });
    const stopView = Motion.inView(
      slab,
      () => {
        Motion.animate(slab, { rotate: [extra, 0], y: [-56, 0] }, { type: "spring", bounce: 0.3, duration: 0.9 });
      },
      { amount: 0.05 },
    );
    running.set(slab, () => {
      stopView();
      slab.style.transform = "";
    });
  }
}

export function stop(root) {
  for (const slab of within(root, "[data-tilt]")) {
    running.get(slab)?.();
    running.delete(slab);
  }
}
