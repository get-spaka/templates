// "Read one at random": a link marked data-lucky-dip goes to one of the letters whose
// addresses are in its data-posts, chosen at the click. It does not move. With no
// script, the link goes to the letter written in its href.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  for (const link of within(root, "[data-lucky-dip]")) {
    const posts = (link.dataset.posts || "").split(/\s+/).filter((p) => p.startsWith("/"));
    if (posts.length < 2) continue;
    const go = (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
      event.preventDefault();
      const others = posts.filter((p) => p !== location.pathname);
      location.href = others[Math.floor(Math.random() * others.length)];
    };
    link.addEventListener("click", go);
    undo.push(() => link.removeEventListener("click", go));
  }
}

export function stop() {
  for (const fn of undo) fn();
  undo = [];
}
