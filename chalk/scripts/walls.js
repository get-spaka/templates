// The walls in section: each profile (data-angle, inside a data-walls drawing)
// starts upright and leans to its angle as the drawing comes into view, wall
// after wall. The angle itself is CSS (style="--angle: 140"): with no script,
// in edit mode and under reduced motion, each wall stands at its angle.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const drawing of within(root, "[data-walls]")) {
    const walls = [...drawing.querySelectorAll("[data-angle]")]
      .map((el) => ({ el, lean: Number(el.getAttribute("data-angle")) - 90 }))
      .filter((w) => Number.isFinite(w.lean) && w.lean !== 0);
    if (!walls.length) continue;
    for (const { el, lean } of walls) el.style.transform = `rotate(${-lean}deg)`;
    stops.push(
      Motion.inView(
        drawing,
        () => {
          walls.forEach(({ el, lean }, i) => {
            Motion.animate(el, { rotate: [-lean, 0] }, { type: "spring", stiffness: 90, damping: 11, delay: 0.15 + i * 0.14 });
          });
        },
        { amount: 0.2 },
      ),
      () => {
        for (const { el } of walls) el.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
