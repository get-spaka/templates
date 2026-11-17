// Light smooth scrolling (Lenis), stopped while the menu is open.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
let off = () => {};

export function start(root) {
  if (root !== document || reduced() || lenis || typeof Lenis === "undefined") return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  const toggle = (event) => {
    if (!event.target.matches?.(".site-menu")) return;
    if (event.target.open) lenis.stop();
    else lenis.start();
  };
  document.addEventListener("toggle", toggle, true);
  off = () => document.removeEventListener("toggle", toggle, true);
}

export function stop(root) {
  if (root && root !== document) return;
  off();
  off = () => {};
  lenis?.destroy();
  lenis = null;
}
