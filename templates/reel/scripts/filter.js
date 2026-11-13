// The work filter's buttons (data-filter inside data-filters): a button shows only the
// tiles whose disciplines (data-disciplines, separated by |) include its own; the empty
// one shows them all. Without this script every case shows.
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
      for (const tile of document.querySelectorAll("[data-disciplines]")) {
        const has = tile.dataset.disciplines.split("|").map((d) => d.trim());
        tile.hidden = Boolean(wanted) && !has.includes(wanted);
      }
    };
    group.addEventListener("click", show);
    undo.push(() => {
      group.removeEventListener("click", show);
      for (const tile of document.querySelectorAll("[data-disciplines]")) tile.hidden = false;
      for (const button of group.querySelectorAll("[data-filter]"))
        button.setAttribute("aria-pressed", String(!button.dataset.filter));
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
