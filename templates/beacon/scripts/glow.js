// A card marked data-glow lights up where the pointer is: this sets --glow-x
// and --glow-y on it as the pointer moves, and the stylesheet draws a soft
// violet light at that point, on the card and its border. Without a mouse, the
// card stays a plain hairline card. It is not movement, so it runs under
// reduced motion too.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  for (const card of within(root, "[data-glow]")) {
    const lit = card.hasAttribute("data-lit");
    const move = (event) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--glow-x", `${event.clientX - box.left}px`);
      card.style.setProperty("--glow-y", `${event.clientY - box.top}px`);
    };
    const leave = () => {
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
    };
    card.addEventListener("pointermove", move);
    if (!lit) card.addEventListener("pointerleave", leave);
    undo.push(() => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      leave();
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
