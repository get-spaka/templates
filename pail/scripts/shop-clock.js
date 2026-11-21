// The shop's clock: the one script that reads the time. It draws no picture of the
// time of day: it only chooses among the template's own lines and marks a month.
//
// It reads the week from the footer, which renders each record of `hours` as a row
// with data-hours-row, data-weekday, data-day, data-opens, data-closes, data-delivers
// and data-cutoff (24-hour times), each time also shown inside it ([data-time="cutoff"],
// [data-time="closes"]), and the shop's time zone from data-tz (without it, the
// visitor's own clock).
//
// It sets on <html>:
// - data-deliver: today (a delivery day, before its cutoff), tomorrow (the next delivery
//   is tomorrow), later-pickup (the next delivery is later, and the shop is still open
//   today) or later;
// - data-month: jan to dec.
// The stylesheet shows the lines written for that state ([data-when~="today"]). It writes
// no sentence: it copies today's cutoff and closing time and the next delivery day, as
// the footer shows them, into the lines' empty slots ([data-slot="cutoff"], "closes",
// "next_day"). It also opens the current month on the season page ([data-month-row]).
const WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};

/** The weekday, the minute of the day and the month in the shop's own time zone. */
function clock(tz) {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz || undefined,
      weekday: "long",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    return {
      day: get("weekday").toLowerCase(),
      at: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
      month: MONTHS[Number(get("month")) - 1],
    };
  } catch {
    return { day: WEEK[now.getDay()], at: now.getHours() * 60 + now.getMinutes(), month: MONTHS[now.getMonth()] };
  }
}

const shown = (row, field) => row?.querySelector(`[data-time="${field}"]`)?.textContent.trim() ?? "";
const delivers = (row) => row?.dataset.delivers === "true";

function readState() {
  const rows = [...document.querySelectorAll("[data-hours-row]")];
  const tz = document.querySelector("[data-tz]")?.dataset.tz;
  const { day, at, month } = clock(tz);
  if (!rows.length) return { month };
  const byDay = new Map(rows.map((row) => [row.dataset.weekday, row]));
  const row = byDay.get(day);
  const cutoff = minutes(row?.dataset.cutoff);
  const closes = minutes(row?.dataset.closes);
  const slots = { cutoff: shown(row, "cutoff"), closes: shown(row, "closes") };

  if (delivers(row) && cutoff !== undefined && at < cutoff) return { deliver: "today", month, slots };

  const first = WEEK.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const next = byDay.get(WEEK[(first + i) % 7]);
    if (!delivers(next)) continue;
    slots.next_day = next.dataset.day || "";
    if (i === 1) return { deliver: "tomorrow", month, slots };
    const open = minutes(row?.dataset.opens) !== undefined && closes !== undefined && at < closes;
    return { deliver: open ? "later-pickup" : "later", month, slots };
  }
  return { month };
}

const filled = new Map();

function fill(slots) {
  for (const slot of document.querySelectorAll("[data-slot]")) {
    if (slot.closest("[data-zip-check]")) continue;
    if (!filled.has(slot)) filled.set(slot, slot.textContent);
    slot.textContent = slots[slot.dataset.slot] ?? "";
  }
}

/** The month rows opened by the script, to fold again in stop. */
const opened = new Set();

function openMonth(month) {
  for (const row of document.querySelectorAll("details[data-month-row]")) {
    if (row.dataset.monthRow === month && !row.open) {
      row.open = true;
      opened.add(row);
    }
  }
}

let timer;

function update() {
  const state = readState();
  const html = document.documentElement;
  if (state.deliver) {
    html.dataset.deliver = state.deliver;
    fill(state.slots);
  } else delete html.dataset.deliver;
  if (state.month) {
    html.dataset.month = state.month;
    openMonth(state.month);
  }
}

export function start() {
  update();
  clearInterval(timer);
  timer = setInterval(update, 60_000);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  const html = document.documentElement;
  delete html.dataset.deliver;
  delete html.dataset.month;
  for (const [slot, text] of filled) slot.textContent = text;
  filled.clear();
  for (const row of opened) row.open = false;
  opened.clear();
}
