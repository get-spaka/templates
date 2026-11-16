// Filters (data-filter): radio buttons named in data-filter choose which items show, each item
// carrying its keys in data-keys ("room-3", "talk"). The value "all" shows everything. With no
// script, everything shows. Inside a hang with a switch, the change runs as a View Transition.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const box of within(root, "[data-filter]")) {
    const name = box.getAttribute("data-filter");
    const items = [...box.querySelectorAll("[data-keys]")];
    const apply = () => {
      const chosen = box.querySelector(`input[name="${name}"]:checked`)?.value || "all";
      for (const item of items) {
        const keys = (item.getAttribute("data-keys") || "").split(/\s+/);
        item.hidden = chosen !== "all" && !keys.includes(chosen);
      }
    };
    const onChange = (event) => {
      if (event.target.name !== name) return;
      if (!reduced() && document.startViewTransition && box.closest("[data-view]")) document.startViewTransition(apply);
      else apply();
    };
    box.addEventListener("change", onChange);
    apply();
    stops.push(() => {
      box.removeEventListener("change", onChange);
      for (const item of items) item.hidden = false;
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
