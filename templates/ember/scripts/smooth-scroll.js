// Smooth scrolling for the whole page, with Lenis, a little heavier than usual.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.08 });
}

export function stop(root) {
  if (root !== document) return;
  lenis?.destroy();
  lenis = undefined;
}
