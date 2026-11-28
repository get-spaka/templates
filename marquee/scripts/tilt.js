// The passes (each <li> of data-tilt): with a mouse, a hovered stub leans toward the
// cursor in 3D, 8° at most, and settles back when it leaves. With no script, under
// reduced motion and while editing, the stubs sit flat at their own slight angle.
import { animate } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const MAX = 8;
let stops = [];

export function start(root) {
  if (reduced() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  for (const list of within(root, "[data-tilt]")) {
    for (const item of list.children) {
      const stub = item.firstElementChild;
      if (!stub) continue;
      const move = (event) => {
        const box = item.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        animate(
          stub,
          {
            transform: `perspective(900px) rotateX(${(-y * MAX * 2).toFixed(2)}deg) rotateY(${(x * MAX * 2).toFixed(2)}deg)`,
          },
          { duration: 0.25, ease: "easeOut" },
        );
      };
      const leave = () => {
        animate(stub, { transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" }, { duration: 0.5 });
      };
      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", leave);
      stops.push(() => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
        stub.style.transform = "";
      });
    }
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
