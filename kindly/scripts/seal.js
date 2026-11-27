// data-seal: the answer to the reply form. The fragment arrives as a sealed envelope; the
// script plays how it got there: a copy of the reply card (the same lines, aria-hidden)
// slides down into the open envelope, the flap closes over it, the seal drops and presses,
// then the thank-you line rises in. The copy is removed at the end. With no script, under
// reduced motion and in edit mode, the sealed envelope and the line.
import { animate } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

function seal(reply) {
  const stage = reply.querySelector(".sealed-stage");
  const flap = reply.querySelector(".sealed-flap");
  const wax = reply.querySelector(".sealed-seal");
  const lines = reply.querySelector("[data-seal-lines]");
  const thanks = reply.querySelector("[data-seal-thanks]");
  if (!stage || !flap || !lines) return;

  const copy = document.createElement("div");
  copy.className = "sealed-card";
  copy.setAttribute("aria-hidden", "true");
  for (const line of lines.children) copy.append(line.cloneNode(true));
  stage.append(copy);

  const controls = [];
  const timers = [];
  copy.style.transform = "translateY(-70%)";
  flap.style.transform = "perspective(1200px) rotateX(180deg)";
  flap.style.zIndex = "2";
  if (wax) {
    wax.style.opacity = "0";
    wax.style.transform = "scale(1.5)";
  }
  if (thanks) {
    thanks.style.opacity = "0";
    thanks.style.transform = "translateY(16px)";
  }

  controls.push(
    animate(copy, { y: ["-70%", "0%"] }, { duration: 0.7, ease: [0.45, 0, 0.2, 1], delay: 0.2 }),
    animate(
      flap,
      { transform: ["perspective(1200px) rotateX(180deg)", "perspective(1200px) rotateX(0deg)"] },
      { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.95 },
    ),
  );
  timers.push(setTimeout(() => (flap.style.zIndex = ""), 1250));
  if (wax)
    controls.push(
      animate(wax, { opacity: [0, 1] }, { duration: 0.15, delay: 1.55 }),
      animate(wax, { scale: [1.5, 0.92, 1] }, { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 1.55 }),
    );
  if (thanks)
    controls.push(
      animate(thanks, { opacity: [0, 1], y: [16, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.05 }),
    );

  const clean = () => {
    copy.remove();
    for (const el of [flap, wax, thanks].filter(Boolean)) {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.zIndex = "";
    }
  };
  timers.push(setTimeout(clean, 2950));
  stops.push(() => {
    for (const c of controls) c.cancel?.();
    for (const t of timers) clearTimeout(t);
    clean();
  });
}

export function start(root) {
  if (reduced()) return;
  for (const reply of within(root, "[data-seal]")) seal(reply);
}

export function stop() {
  for (const undo of stops) undo();
  stops = [];
}
