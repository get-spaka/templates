// The bill (data-bill): with this script on, the stylesheet widens a hovered or
// focused name (data-live). While editing, the names stay at rest.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

export function start(root) {
  if (reduced()) return;
  for (const bill of within(root, "[data-bill]")) bill.setAttribute("data-live", "");
}

export function stop(root) {
  for (const bill of within(root, "[data-bill]")) bill.removeAttribute("data-live");
}
