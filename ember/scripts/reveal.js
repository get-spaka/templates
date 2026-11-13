// data-reveal: a section's main elements rise slowly out of a blur as they come into view.
// data-curtain: a large image opens from its middle outward. Both are set and played by
// the script, with Motion's inView; with no script, under reduced motion and while editing,
// everything is in its place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const ease = [0.16, 1, 0.3, 1];
let stops = [];
let touched = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.filter = "blur(6px)";
    touched.push(el);
    stops.push(
      Motion.inView(
        el,
        () => {
          Motion.animate(el, { opacity: 1, y: [32, 0], filter: ["blur(6px)", "blur(0px)"] }, { duration: 1.2, ease });
        },
        { amount: 0.05 },
      ),
    );
  }
  for (const el of within(root, "[data-curtain]")) {
    // The frame is watched, its content clipped: a box clipped to nothing is never seen.
    const content = [...el.children];
    for (const child of content) {
      child.style.clipPath = "inset(0% 50% 0% 50%)";
      touched.push(child);
    }
    stops.push(
      Motion.inView(
        el,
        () => {
          for (const child of content)
            child
              .animate([{ clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)" }], {
                duration: 1400,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              })
              .finished.then(() => child.style.removeProperty("clip-path"))
              .catch(() => {});
        },
        { amount: 0.05 },
      ),
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const el of touched)
    for (const name of ["opacity", "transform", "filter", "clip-path"]) el.style.removeProperty(name);
  touched = [];
}
