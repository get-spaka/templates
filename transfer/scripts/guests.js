// The guest chair, by today's date. On data-guests, each element with
// data-from and data-to (dates, YYYY-MM-DD) gets data-state: "now" while the
// guest is in the chair, "next" (or "tomorrow") for the first guest still to
// come, "past" once they have left, "later" otherwise; the stylesheet shows
// the matching [data-when] line ("In the chair now", "Arrives in 12 days",
// "Been and gone") and dims past guests. The number of days goes into
// [data-slot="days"]. The header's strip (data-guests-strip) holds one line
// per guest, all hidden but the one Liquid chose; the script shows the guest
// in the chair or the next one instead. Nothing moves; with no script the
// dates read as written.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DAY = 86400000;
let stops = [];

const today = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};
const day = (text) => {
  const [y, m, d] = String(text).split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** Each dated element's state, given today. */
function states(items) {
  const t = today().getTime();
  let next = null;
  const result = new Map();
  for (const el of items) {
    const from = day(el.dataset.from).getTime();
    const to = day(el.dataset.to || el.dataset.from).getTime();
    if (to < t) result.set(el, { state: "past" });
    else if (from <= t) result.set(el, { state: "now" });
    else {
      const days = Math.round((from - t) / DAY);
      if (!next || from < next.from) next = { el, from, days };
      result.set(el, { state: "later" });
    }
  }
  if (next) result.set(next.el, { state: next.days === 1 ? "tomorrow" : "next", days: next.days });
  return result;
}

export function start(root) {
  for (const sheet of within(root, "[data-guests]")) {
    const items = [...sheet.querySelectorAll("[data-from]")];
    for (const [el, { state, days }] of states(items)) {
      el.dataset.state = state;
      const slot = el.querySelector('[data-slot="days"]');
      if (slot && days) slot.textContent = String(days);
    }
    stops.push(() => {
      for (const el of items) {
        delete el.dataset.state;
        const slot = el.querySelector('[data-slot="days"]');
        if (slot) slot.textContent = "";
      }
    });
  }
  for (const strip of within(root, "[data-guests-strip]")) {
    const lines = [...strip.querySelectorAll("[data-from]")];
    if (!lines.length) continue;
    const was = lines.map((el) => el.hidden);
    const found = states(lines);
    const shown =
      lines.find((el) => found.get(el).state === "now") ??
      lines.find((el) => ["next", "tomorrow"].includes(found.get(el).state));
    if (shown) {
      for (const el of lines) el.hidden = el !== shown;
      shown.dataset.state = found.get(shown).state;
    }
    stops.push(() => {
      lines.forEach((el, i) => {
        el.hidden = was[i];
        delete el.dataset.state;
      });
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
