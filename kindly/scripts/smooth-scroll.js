// Light smooth scrolling with Lenis, left out under reduced motion.
let lenis = null;

export function start(root) {
  if (root !== document || lenis) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
}

export function stop(root) {
  if (root !== document || !lenis) return;
  lenis.destroy();
  lenis = null;
}
