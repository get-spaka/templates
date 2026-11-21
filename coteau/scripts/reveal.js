// A section's main elements rise a little as they come into view (data-reveal);
// under data-reveal="stagger" its children rise one after another. The page is
// complete with no script: the hidden state is set here, just before rising.

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The elements matching `selector` in what is starting: the root itself included. */
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-reveal]")) {
    const items = el.dataset.reveal === "stagger" ? [...el.children] : [el];
    for (const item of items) {
      item.style.opacity = "0";
      item.style.transform = "translateY(16px)";
    }
    const running = [];
    stops.push(
      Motion.inView(
        el,
        () => {
          running.push(
            Motion.animate(
              items,
              { opacity: [0, 1], y: [16, 0] },
              { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Motion.stagger(0.08) },
            ),
          );
        },
        { amount: 0.05 },
      ),
      () => {
        for (const animation of running) animation.stop();
        for (const item of items) {
          item.style.opacity = "";
          item.style.transform = "";
        }
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
