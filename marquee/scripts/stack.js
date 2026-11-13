// The day flyers (data-stack) pile up: the script sets data-stacking on the list, which
// makes each card stick a little lower than the one before, so it slides over it like
// a flyer pasted on a wall; a card being covered shrinks a little. With no script, under
// reduced motion and while editing, the cards are a plain column, each slightly askew.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const list of within(root, "[data-stack]")) {
    const cards = [...list.children];
    cards.forEach((card, i) => {
      card.style.setProperty("--i", String(i));
    });
    list.setAttribute("data-stacking", "");
    cards.slice(0, -1).forEach((card, i) => {
      const next = cards[i + 1];
      stops.push(
        Motion.scroll(Motion.animate(card, { scale: [1, 0.94] }, { ease: "linear" }), {
          target: next,
          offset: ["start end", "start start"],
        }),
      );
    });
    stops.push(() => {
      list.removeAttribute("data-stacking");
      for (const card of cards) {
        card.style.removeProperty("--i");
        card.style.transform = "";
      }
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
