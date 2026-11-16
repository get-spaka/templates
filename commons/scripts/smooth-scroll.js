// Smooth scrolling for the whole page, with Lenis as it comes.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true });
}

export function stop(root) {
  if (root !== document) return;
  lenis?.destroy();
  lenis = undefined;
}
