// Light smooth scrolling (Lenis), so the neighborhoods' index glides to each one;
// anchored sections carry scroll-margin-top for the sticky header.
import Lenis from "lenis";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis = null;

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: { offset: -96 } });
}

export function stop(root) {
  if (root !== document || !lenis) return;
  lenis.destroy();
  lenis = null;
}
