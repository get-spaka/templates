// data-reveal: headings, rows and cards rise into place as they come into view.
// The script sets where they start from, just before; with no script, under reduced motion
// and while editing, they are in place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];
let touched = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    touched.push(el);
    stops.push(
      Motion.inView(
        el,
        () => {
          Motion.animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const el of touched) {
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
  }
  touched = [];
}
