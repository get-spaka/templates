// On a letter's page, its cover and pictures (data-develop, and an image alone in a
// paragraph of the text) start printed in the green ink and develop into full color
// as they come into view. The inked state is set here: with no script, under reduced
// motion and while editing, they are in full color. The change itself is a CSS
// transition of the frame (styles/site.css), started by taking data-inked away.
import { inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const FRAMES = "[data-develop], [data-letter] p:has(> img)";
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const frame of within(root, FRAMES)) {
    frame.setAttribute("data-inked", "");
    stops.push(
      inView(
        frame,
        () => {
          // A moment in view first, so that the ink is seen before it develops.
          setTimeout(() => frame.removeAttribute("data-inked"), 250);
        },
        { amount: 0.08 },
      ),
    );
  }
}

export function stop(root) {
  for (const stop of stops) stop();
  stops = [];
  for (const frame of within(root, FRAMES)) frame.removeAttribute("data-inked");
}
