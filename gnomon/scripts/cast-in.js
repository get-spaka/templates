// The shadows grow out of their letters on load: --light, which every shadow's
// length and opacity are multiplied by, goes from 0 to 1 over 1.4 s. Nothing is
// hidden and the light on the plaster stays the same; with no script and under
// reduced motion, --light stays at the stylesheet's value, 1.
import { animate } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let animation = null;

export function start(root) {
  if (root !== document || reduced()) return;
  const html = document.documentElement;
  animation = animate(html, { "--light": [0, 1] }, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
}

export function stop(root) {
  if (root !== document) return;
  animation?.stop();
  animation = null;
  document.documentElement.style.removeProperty("--light");
}
