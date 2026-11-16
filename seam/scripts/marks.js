// data-mark: the contact sheet's picks are circled in grease pencil. Each loop is an SVG path
// marked data-mark-path, with pathLength="1"; as the sheet comes into view they draw
// themselves one after another (0.6 s each, 0.25 s apart).
// With no script, under reduced motion and in edit mode, the loops are drawn.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const sheet of within(root, "[data-mark]")) {
    const paths = [...sheet.querySelectorAll("[data-mark-path]")];
    if (!paths.length) continue;
    for (const path of paths) {
      path.style.strokeDasharray = "1 1";
      path.style.strokeDashoffset = "1";
    }
    stops.push(
      Motion.inView(
        sheet,
        () => {
          paths.forEach((path, i) => {
            Motion.animate(
              path,
              { strokeDashoffset: [1, 0] },
              { duration: 0.6, delay: 0.2 + i * 0.25, ease: "easeInOut" },
            );
          });
        },
        { amount: 0.1 },
      ),
      () => {
        for (const path of paths) {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
        }
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
