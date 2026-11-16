// Smooth scrolling for the whole page, with Lenis, light (lerp 0.1). Look closer stops it while
// its dialog is open, with the plinth:hold and plinth:release events.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;
const hold = () => lenis?.stop();
const release = () => lenis?.start();

export function start(root) {
  if (root !== document || lenis || reduced()) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  document.addEventListener("plinth:hold", hold);
  document.addEventListener("plinth:release", release);
}

export function stop(root) {
  if (root !== document) return;
  document.removeEventListener("plinth:hold", hold);
  document.removeEventListener("plinth:release", release);
  lenis?.destroy();
  lenis = undefined;
}
