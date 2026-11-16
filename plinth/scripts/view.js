// The wall and the checklist (data-view): two radio buttons switch the works between the hang
// and the rows in CSS, with no script. This wraps the switch in a View Transition, so that each
// work glides from its frame to its row and back; under reduced motion the views switch at once.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced() || !document.startViewTransition) return;
  for (const view of within(root, "[data-view]")) {
    const radios = [...view.querySelectorAll('input[type="radio"][name][value]')].filter(
      (input) => input.value === "wall" || input.value === "list",
    );
    const onClick = (event) => {
      const input = event.target.closest('input[type="radio"]');
      if (!input || !radios.includes(input) || input.checked) return;
      // The browser checks it after the click: undo, then check it inside the transition.
      event.preventDefault();
      document.startViewTransition(() => {
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    };
    view.addEventListener("click", onClick);
    stops.push(() => view.removeEventListener("click", onClick));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
