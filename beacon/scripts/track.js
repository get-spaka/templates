// The launch track (data-track): when it comes into view, its lit line
// (data-track-lit, one piece after each milestone that is done) grows from the
// first milestone to the one marked now, piece after piece: sideways on a wide
// screen, downward on a phone. With no script, the line is lit up to now.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  if (reduced()) return;
  for (const track of within(root, "[data-track]")) {
    const lits = [...track.querySelectorAll("[data-track-lit]")];
    if (!lits.length) continue;
    const wide = matchMedia("(min-width: 48rem)").matches;
    const from = wide ? "scaleX(0)" : "scaleY(0)";
    for (const lit of lits) lit.style.transform = from;
    undo.push(() => {
      for (const lit of lits) lit.style.transform = "";
    });
    undo.push(
      inView(
        track,
        () => {
          lits.forEach((lit, i) => {
            animate(lit, wide ? { scaleX: [0, 1] } : { scaleY: [0, 1] }, {
              duration: 0.7,
              delay: 0.3 + i * 0.7,
              ease: "linear",
            });
          });
        },
        { amount: 0.4 },
      ),
    );
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
