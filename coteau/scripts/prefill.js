// The requests, filled in from the link (data-prefill on a form): "Book the porch"
// leads to /visit?tasting=on-the-porch#book, a club size's button to
// /club?level=eight-bottles#join. Each option a link can choose says so with
// data-param and data-value (data-value="*" for any value: "An event" when an event
// is named). It writes no text and moves nothing; with no script nothing is chosen.

/** The elements matching `selector` in what is starting: the root itself included. */
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  const params = new URLSearchParams(location.search);
  if (!params.size) return;
  for (const form of within(root, "form[data-prefill]")) {
    for (const [name, value] of params) {
      for (const el of form.querySelectorAll(`[data-param="${CSS.escape(name)}"]`)) {
        if (el.dataset.value !== value && el.dataset.value !== "*") continue;
        if (el instanceof HTMLOptionElement) {
          const was = el.selected;
          el.selected = true;
          stops.push(() => {
            el.selected = was;
          });
        } else if (el instanceof HTMLInputElement) {
          const was = el.checked;
          el.checked = true;
          stops.push(() => {
            el.checked = was;
          });
        }
      }
    }
  }
}

export function stop() {
  for (const stop of stops.reverse()) stop();
  stops = [];
}
