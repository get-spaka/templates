// A section's main elements, marked data-reveal, rise into view.
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
          Motion.animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.08 },
      ),
      () => {
        el.style.opacity = "";
        el.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
