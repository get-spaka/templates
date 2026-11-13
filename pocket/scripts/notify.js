// The notification (data-notify): it drops from the phone's island with a spring when its band
// comes into view. With no script, under reduced motion and while editing, it sits in its place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const card of within(root, "[data-notify]")) {
    card.style.opacity = "0";
    card.style.transform = "translateY(-36px) scale(0.86)";
    const band = card.closest("section") ?? card;
    stops.push(
      Motion.inView(
        band,
        () => {
          Motion.animate(
            card,
            { opacity: [0, 1], y: [-36, 0], scale: [0.86, 1] },
            { delay: 0.5, type: "spring", stiffness: 260, damping: 18, opacity: { duration: 0.25, delay: 0.5 } },
          );
        },
        { amount: 0.2 },
      ),
      () => {
        card.style.opacity = "";
        card.style.transform = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
