// The key board: data-keyboard on the board, data-key on each key, data-key-card on each room's
// card. Each key hangs from its hook (its origin, in the stylesheet). As the board comes into
// view the keys swing in turn, as if a door had opened down the corridor; the pointer entering
// a card, or the keyboard's focus reaching it, swings its key away from the side it came from.
// On a phone, each card's key swings as the card scrolls into view. data-key-once: a room's
// large key, which swings once as its page opens.
// Under reduced motion, with no script and while editing, the keys hang straight.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DRAFT = [0, 9, -6, 3.5, -1.5, 0];
let stops = [];
const playing = new Map();

/** Swings a key, stopping what it was doing first. */
function swing(key, rotate, options) {
  playing.get(key)?.stop();
  const animation = Motion.animate(key, { rotate }, options);
  playing.set(key, animation);
}

/** The draft from a door down the corridor. */
const draft = (key, delay = 0) => swing(key, DRAFT, { duration: 1.8, delay, ease: "easeInOut" });

/** A push from one side (-1: from the left, the key swings right), on a loose spring. */
function push(key, side) {
  swing(key, [0, 0], { type: "spring", velocity: side * 190, stiffness: 120, damping: 4.5, mass: 1 });
}

export function start(root) {
  if (reduced()) return;
  const mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wide = matchMedia("(min-width: 64rem)").matches;
  for (const board of within(root, "[data-keyboard]")) {
    const cards = [...board.querySelectorAll("[data-key-card]")];
    if (wide && mouse) {
      const keys = cards.map((card) => card.querySelector("[data-key]")).filter(Boolean);
      stops.push(Motion.inView(board, () => keys.forEach((key, i) => draft(key, i * 0.09)), { amount: 0.15 }));
    } else {
      for (const card of cards) {
        const key = card.querySelector("[data-key]");
        if (key) stops.push(Motion.inView(card, () => draft(key), { amount: 0.2 }));
      }
    }
    for (const card of cards) {
      const key = card.querySelector("[data-key]");
      if (!key) continue;
      const enter = (event) => {
        if (event.pointerType && event.pointerType !== "mouse") return;
        const box = card.getBoundingClientRect();
        push(key, event.clientX < box.left + box.width / 2 ? -1 : 1);
      };
      const focus = () => push(key, -1);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("focusin", focus);
      stops.push(() => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("focusin", focus);
      });
    }
  }
  for (const key of within(root, "[data-key-once]")) draft(key, 0.35);
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const [key, animation] of playing) {
    animation.stop();
    key.style.removeProperty("transform");
    key.style.removeProperty("rotate");
  }
  playing.clear();
}
