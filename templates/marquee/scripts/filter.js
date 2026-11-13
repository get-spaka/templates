// The lineup's day buttons (data-filter inside data-filters): a button shows only the
// cards whose data-day is its own (all of them for an empty one). Without this script
// every act shows.
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
      for (const card of document.querySelectorAll("[data-day]"))
        card.hidden = Boolean(wanted) && card.dataset.day !== wanted;
    };
    group.addEventListener("click", show);
    undo.push(() => {
      group.removeEventListener("click", show);
      for (const card of document.querySelectorAll("[data-day]")) card.hidden = false;
      for (const button of group.querySelectorAll("[data-filter]"))
        button.setAttribute("aria-pressed", String(!button.dataset.filter));
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
