// A <mark> in a text marked data-highlight has its fern highlight swept in from the
// left once it is in view. The unswept state is set here: with no script, under
// reduced motion and while editing, it is simply highlighted.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const mark of within(root, "[data-highlight] mark")) {
    mark.style.backgroundSize = "0% 100%";
    stops.push(
      Motion.inView(
        mark,
        () => {
          Motion.animate(
            mark,
            { backgroundSize: ["0% 100%", "100% 100%"] },
            { duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] },
          );
        },
        { amount: 0.6 },
      ),
    );
  }
}

export function stop(root) {
  for (const stop of stops) stop();
  stops = [];
  for (const mark of within(root, "[data-highlight] mark")) mark.style.backgroundSize = "";
}
