// Hung (data-hang on each bay): when the wall comes into view, each frame comes down about
// 14 px onto its hook with a slight swing, the frames following each other 80 ms apart along
// the line, and each label ([data-hang-label]) fades in after its frame. With no script, under
// reduced motion and in edit mode, the frames are in place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

/** Its place along its wall, for the stagger. */
function rank(bay) {
  const wall = bay.closest("[data-hang-wall]");
  if (!wall) return 0;
  return Math.max(0, [...wall.querySelectorAll("[data-hang]")].indexOf(bay)) % 8;
}

export function start(root) {
  if (reduced()) return;
  for (const bay of within(root, "[data-hang]")) {
    const frame = bay.querySelector(".frame") || bay;
    const label = bay.closest(".bay-cell")?.querySelector("[data-hang-label]");
    frame.style.transformOrigin = "50% 0%";
    frame.style.opacity = "0";
    frame.style.transform = "translateY(-14px) rotate(1.2deg)";
    if (label) label.style.opacity = "0";
    const delay = rank(bay) * 0.08;
    stops.push(
      Motion.inView(
        bay,
        () => {
          Motion.animate(frame, { opacity: [0, 1] }, { duration: 0.35, delay });
          Motion.animate(
            frame,
            { transform: ["translateY(-14px) rotate(1.2deg)", "translateY(0px) rotate(0deg)"] },
            { type: "spring", stiffness: 180, damping: 14, mass: 1, delay },
          );
          if (label) Motion.animate(label, { opacity: [0, 1] }, { duration: 0.5, delay: delay + 0.3 });
        },
        { amount: 0.05 },
      ),
      () => {
        frame.style.opacity = "";
        frame.style.transform = "";
        frame.style.transformOrigin = "";
        if (label) label.style.opacity = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
