// The on-air lamp (data-on-air="tuesday", the release day; several days space-separated):
// on that day, in the visitor's own time, the element gets data-live, which lights the lamp
// and shows its data-air="live" line instead of its data-air="usual" one. It writes no text.
// With no script and while editing, the usual line shows beside an outlined lamp.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let stops = [];

export function start(root) {
  const today = DAYS[new Date().getDay()];
  for (const el of within(root, "[data-on-air]")) {
    const days = el.dataset.onAir.toLowerCase().split(/[\s,]+/);
    if (!days.includes(today)) continue;
    el.setAttribute("data-live", "");
    stops.push(() => el.removeAttribute("data-live"));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
