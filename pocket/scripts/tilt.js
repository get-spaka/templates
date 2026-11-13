// Tilt (data-tilt on a phone): with a mouse, the phone turns toward the cursor in 3D, 6° at
// most, while the cursor is over its section, and settles back when it leaves. No tilt on a
// touch screen, under reduced motion or while editing.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const MAX = 6;
let stops = [];

export function start(root) {
  if (reduced() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  for (const phone of within(root, "[data-tilt]")) {
    const area = phone.closest("section") ?? phone.parentElement;
    const turn = (x, y, duration) =>
      Motion.animate(
        phone,
        { transform: `perspective(1200px) rotateX(${(-y * MAX).toFixed(2)}deg) rotateY(${(x * MAX).toFixed(2)}deg)` },
        { duration, ease: "easeOut" },
      );
    const move = (event) => {
      const box = phone.getBoundingClientRect();
      const half = area.getBoundingClientRect();
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      const x = clamp((event.clientX - (box.left + box.width / 2)) / (half.width / 2));
      const y = clamp((event.clientY - (box.top + box.height / 2)) / (half.height / 2));
      turn(x, y, 0.35);
    };
    const leave = () => turn(0, 0, 0.6);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    stops.push(() => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      phone.style.transform = "";
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
