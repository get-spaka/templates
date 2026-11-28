// Light smooth scrolling (Lenis), which also makes the shadows turn smoothly;
// anchored sections carry scroll-margin-top for the sticky header.
import Lenis from "lenis";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis = null;

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -88 } });
}

export function stop(root) {
  if (root !== document || !lenis) return;
  lenis.destroy();
  lenis = null;
}
