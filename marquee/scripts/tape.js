// The tape (data-tape) runs: each band's items are copied once so the loop is seamless,
// and the stylesheet moves it (data-reverse runs the other way). The maker edits one
// list; the copies are hidden from screen readers. Without this script, two still bands.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

export function start(root) {
  if (reduced()) return;
  for (const list of within(root, "[data-tape]")) {
    if (list.hasAttribute("data-looping")) continue;
    for (const item of [...list.children]) {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.setAttribute("data-tape-copy", "");
      list.append(copy);
    }
    list.setAttribute("data-looping", "");
  }
}

export function stop(root) {
  for (const list of within(root, "[data-tape]")) {
    for (const copy of list.querySelectorAll("[data-tape-copy]")) copy.remove();
    list.removeAttribute("data-looping");
  }
}
