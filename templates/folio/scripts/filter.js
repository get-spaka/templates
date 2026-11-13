// The buttons of data-filters show only the rows of the index whose
// data-category is the button's data-filter (all of them for an empty one).
// Without this script every project shows.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  for (const group of within(root, "[data-filters]")) {
    const show = (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      const wanted = button.dataset.filter;
      for (const other of group.querySelectorAll("[data-filter]"))
        other.setAttribute("aria-pressed", String(other === button));
      for (const row of document.querySelectorAll("[data-category]"))
        row.hidden = Boolean(wanted) && row.dataset.category !== wanted;
    };
    group.addEventListener("click", show);
    undo.push(() => {
      group.removeEventListener("click", show);
      for (const row of document.querySelectorAll("[data-category]")) row.hidden = false;
      for (const button of group.querySelectorAll("[data-filter]"))
        button.setAttribute("aria-pressed", String(!button.dataset.filter));
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
