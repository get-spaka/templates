// data-suite: the weekend's cards are dealt as the fan comes into view. From lg up the
// script gathers them into a neat stack in the middle, then deals each to its place in the
// fan, 0.09 s apart, with a spring; on a phone each card swings to its tilt and rises 24 px
// as it enters. The fan itself is CSS: with no script, under reduced motion and in edit
// mode, every card is in its place.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

function tiltOf(card) {
  return Number.parseFloat(getComputedStyle(card).rotate) || 0;
}

function deal(suite) {
  const cards = [...suite.children];
  if (!cards.length) return;
  const wide = matchMedia("(min-width: 64rem)").matches;
  const reset = () => {
    for (const card of cards) {
      card.style.transform = "";
      card.style.opacity = "";
    }
  };
  if (wide) {
    const box = suite.getBoundingClientRect();
    const middle = box.left + box.width / 2;
    const offsets = cards.map((card) => {
      const r = card.getBoundingClientRect();
      return middle - (r.left + r.width / 2);
    });
    cards.forEach((card, i) => {
      card.style.transform = `translateX(${offsets[i]}px) rotate(${-tiltOf(card)}deg)`;
    });
    stops.push(
      inView(
        suite,
        () => {
          cards.forEach((card, i) => {
            const tilt = tiltOf(card);
            animate(
              card,
              { x: [offsets[i], 0], rotate: [-tilt, 0] },
              { type: "spring", stiffness: 170, damping: 17, delay: 0.25 + i * 0.09 },
            ).finished.then(() => {
              card.style.transform = "";
            });
          });
        },
        { amount: 0.35 },
      ),
      reset,
    );
  } else {
    for (const card of cards) {
      const tilt = tiltOf(card);
      card.style.transform = `translateY(24px) rotate(${-tilt}deg)`;
      stops.push(
        inView(
          card,
          () => {
            animate(
              card,
              { y: [24, 0], rotate: [-tilt, 0] },
              { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            ).finished.then(() => {
              card.style.transform = "";
            });
          },
          { amount: 0.3 },
        ),
      );
    }
    stops.push(reset);
  }
}

export function start(root) {
  if (reduced()) return;
  for (const suite of within(root, "[data-suite]")) deal(suite);
}

export function stop() {
  for (const undo of stops) undo();
  stops = [];
}
