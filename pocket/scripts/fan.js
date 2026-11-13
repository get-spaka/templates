// The fan (data-fan): when the page opens, the three phones rise from one stack into their fan,
// the middle one first, with a spring; as the page scrolls on, the side phones slide in behind
// the middle one. Each slot (.fan-slot) is placed and turned by the stylesheet, and holds a
// .fan-move (moved by the scroll) around a .fan-rise (the rise). With no script, under reduced
// motion and while editing, the fan is as the stylesheet places it.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

const center = (el) => {
  const box = el.getBoundingClientRect();
  return box.left + box.width / 2;
};

export function start(root) {
  if (reduced()) return;
  for (const fan of within(root, "[data-fan]")) {
    if (running.has(fan)) continue;
    const middle = fan.querySelector(".fan-middle");
    if (!middle) continue;
    const sides = [...fan.querySelectorAll(".fan-slot")].filter((slot) => slot !== middle);
    const undo = [];
    const rise = middle.querySelector(".fan-rise");
    if (rise) {
      rise.style.opacity = "0";
      rise.style.transform = "translateY(60px)";
      Motion.animate(
        rise,
        { opacity: 1, y: [60, 0] },
        { type: "spring", stiffness: 140, damping: 18, opacity: { duration: 0.4 } },
      );
      undo.push(() => (rise.style.cssText = ""));
    }
    const area = fan.closest("section") ?? fan;
    sides.forEach((slot, i) => {
      const dx = center(middle) - center(slot);
      const turned = Number.parseFloat(getComputedStyle(slot).rotate) || 0;
      const lift = slot.querySelector(".fan-rise");
      const move = slot.querySelector(".fan-move");
      if (lift) {
        // From the stack: straight, behind the middle phone, then out into the fan.
        lift.style.opacity = "0";
        lift.style.transform = `translateX(${dx}px) rotate(${-turned}deg) translateY(40px)`;
        Motion.animate(
          lift,
          { opacity: 1, x: [dx, 0], rotate: [-turned, 0], y: [40, 0] },
          {
            delay: 0.25 + i * 0.12,
            type: "spring",
            stiffness: 110,
            damping: 15,
            opacity: { duration: 0.3, delay: 0.2 },
          },
        );
        undo.push(() => (lift.style.cssText = ""));
      }
      if (move) {
        undo.push(
          Motion.scroll(Motion.animate(move, { x: [0, dx * 0.6] }, { ease: "linear" }), {
            target: area,
            offset: ["start start", "end start"],
          }),
          () => (move.style.cssText = ""),
        );
      }
    });
    running.set(fan, () => {
      for (const fn of undo) fn();
    });
  }
}

export function stop(root) {
  for (const fan of within(root, "[data-fan]")) {
    running.get(fan)?.();
    running.delete(fan);
  }
}
