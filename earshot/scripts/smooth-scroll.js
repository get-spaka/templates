// Light smooth scrolling (Lenis), left out under reduced motion.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;

export function start(root) {
  if (root !== document || reduced() || lenis || typeof Lenis !== "function") return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
}

export function stop() {
  lenis?.destroy();
  lenis = undefined;
}
