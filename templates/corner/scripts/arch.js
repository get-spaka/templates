// The photo in an arch (data-arch) settles from slightly close to its frame as the page scrolls past it.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const img of within(root, "[data-arch]")) {
    const zoom = Motion.animate(img, { scale: [1.12, 1] }, { ease: "linear" });
    stops.push(Motion.scroll(zoom, { target: img.parentElement, offset: ["start end", "end start"] }));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
