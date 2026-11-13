// Each element marked data-reveal rises into view as the page scrolls to it.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    stops.push(
      Motion.inView(
        el,
        () => {
          Motion.animate(el, { opacity: 1, y: [24, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.15 },
      ),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
