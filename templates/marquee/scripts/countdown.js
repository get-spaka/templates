// "238 days to go": each data-countdown (the opening, in ISO 8601 with its time zone)
// writes how far off it is, in the site's language, from its own attributes:
// data-days ("{n} days to go"), data-on ("It's on…", from the opening to data-until)
// and data-over (once data-until has passed). Its written text, the dates, is what
// shows with no script and while editing, and comes back when the script stops.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DAY = 24 * 60 * 60 * 1000;
const written = new Map();

function sentence(el) {
  const opens = Date.parse(el.dataset.countdown);
  if (Number.isNaN(opens)) return undefined;
  const until = Date.parse(el.dataset.until ?? "") || opens + 3 * DAY;
  const now = Date.now();
  if (now >= until) return el.dataset.over;
  if (now >= opens) return el.dataset.on;
  const days = Math.ceil((opens - now) / DAY);
  return (el.dataset.days || "").replace(
    "{n}",
    new Intl.NumberFormat(document.documentElement.lang || undefined).format(days),
  );
}

export function start(root) {
  for (const el of within(root, "[data-countdown]")) {
    const text = sentence(el);
    if (!text) continue;
    if (!written.has(el)) written.set(el, el.textContent);
    el.textContent = text;
  }
}

export function stop(root) {
  for (const el of within(root, "[data-countdown]")) {
    if (!written.has(el)) continue;
    el.textContent = written.get(el);
    written.delete(el);
  }
}
