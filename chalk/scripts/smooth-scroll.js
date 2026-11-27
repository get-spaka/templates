// Smooth scrolling for the whole page, light, with Lenis, so the route draws evenly.
import Lenis from "lenis";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
}

export function stop(root) {
  if (root !== document) return;
  lenis?.destroy();
  lenis = undefined;
}
