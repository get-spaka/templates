// The ribbon (data-ribbon) loops sideways: its items are copied once so the loop
// is seamless, and the stylesheet moves it. The maker edits one list; without
// this script it is a still strip.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

export function start(root) {
  if (reduced()) return;
  for (const list of within(root, "[data-ribbon]")) {
    if (list.hasAttribute("data-looping")) continue;
    for (const item of [...list.children]) {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.setAttribute("data-ribbon-copy", "");
      list.append(copy);
    }
    list.setAttribute("data-looping", "");
  }
}

export function stop(root) {
  for (const list of within(root, "[data-ribbon]")) {
    for (const copy of list.querySelectorAll("[data-ribbon-copy]")) copy.remove();
    list.removeAttribute("data-looping");
  }
}
