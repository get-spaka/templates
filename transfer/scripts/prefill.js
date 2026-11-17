// Filled in from the link: /book?artist=teo-marsh or /book?guest=paloma-ibarra
// chooses that person in the request form's select[data-prefill], whose
// options' values are the artists' and guests' ids. With no script, the
// visitor chooses.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  const params = new URLSearchParams(location.search);
  const wanted = params.get("artist") || params.get("guest");
  if (!wanted) return;
  for (const select of within(root, "select[data-prefill]")) {
    const option = [...select.options].find((o) => o.value === wanted);
    if (!option) continue;
    const before = select.value;
    select.value = option.value;
    stops.push(() => {
      select.value = before;
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
