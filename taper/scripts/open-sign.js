// The open sign (data-open-sign) and the week at the chair (data-week-chart).
//
// A sign carries the week as data-week ("tuesday 10:00 20:00, wednesday …", from the hours
// records) and the shop's time zone as data-tz. The script works out, in the shop's own time,
// not the visitor's, whether it is open, sets data-state="open" or "closed" on the sign, and
// data-current on the line written for that moment: [data-line="open"][data-for="tuesday"],
// [data-line="later"] (opens later today) or [data-line="closed"] (the next day it opens, also
// set as data-next). The stylesheet shows that line and turns the pole while it is open. With no
// script, the week's line shows and the pole stands still.
//
// A week chart's rows carry data-weekday: the script marks today's row (data-today) and sets
// --now on the chart (data-now), which draws the now line. It checks again every minute; stop
// clears the timer and everything it set.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/** "10:00" → 600; anything else (an empty field, "Closed") → null. */
const minutes = (text) => {
  const t = String(text || "").trim();
  if (!/^\d{1,2}(:\d{2})?$/.test(t)) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

/** The shop's own day of the week and minutes since midnight, in its time zone. */
function shopNow(tz) {
  let parts;
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz || undefined,
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
  } catch {
    parts = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
  }
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: WEEKDAYS.indexOf(get("weekday").toLowerCase()), now: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** data-week → { tuesday: { opens: 600, closes: 1200 }, … }, open days only. */
function readWeek(text) {
  const week = {};
  for (const item of String(text || "").split(",")) {
    const [day, opens, closes] = item.trim().split(/\s+/);
    const o = minutes(opens);
    const c = minutes(closes);
    if (day && o !== null && c !== null && c > o) week[day.toLowerCase()] = { opens: o, closes: c };
  }
  return week;
}

function clearSign(sign) {
  sign.removeAttribute("data-state");
  sign.removeAttribute("data-next");
  for (const line of sign.querySelectorAll("[data-current]")) line.removeAttribute("data-current");
}

function updateSign(sign) {
  const week = readWeek(sign.getAttribute("data-week"));
  const { day, now } = shopNow(sign.getAttribute("data-tz"));
  const todayName = WEEKDAYS[day];
  const today = week[todayName];
  let state = "closed";
  let line = null;
  if (today && now >= today.opens && now < today.closes) {
    state = "open";
    line = sign.querySelector(`[data-line="open"][data-for="${todayName}"]`);
  } else if (today && now < today.opens) {
    line = sign.querySelector(`[data-line="later"][data-for="${todayName}"]`);
  } else {
    for (let ahead = 1; ahead <= 7 && !line; ahead++) {
      const name = WEEKDAYS[(day + ahead) % 7];
      if (!week[name]) continue;
      line = sign.querySelector(`[data-line="closed"][data-for="${name}"]`);
      if (line) sign.setAttribute("data-next", name);
      break;
    }
  }
  for (const current of sign.querySelectorAll("[data-current]"))
    if (current !== line) current.removeAttribute("data-current");
  if (!line) {
    clearSign(sign);
    return;
  }
  line.setAttribute("data-current", "");
  sign.setAttribute("data-state", state);
}

function clearChart(chart) {
  chart.removeAttribute("data-now");
  chart.style.removeProperty("--now");
  for (const row of chart.querySelectorAll("[data-today]")) row.removeAttribute("data-today");
}

function updateChart(chart) {
  const { day, now } = shopNow(chart.getAttribute("data-tz"));
  const todayName = WEEKDAYS[day];
  for (const row of chart.querySelectorAll("[data-weekday]"))
    row.toggleAttribute("data-today", row.getAttribute("data-weekday") === todayName);
  const from = 480;
  const to = 1260;
  if (now >= from && now <= to) {
    chart.style.setProperty("--now", String(now));
    chart.setAttribute("data-now", "");
  } else {
    chart.removeAttribute("data-now");
    chart.style.removeProperty("--now");
  }
}

let stops = [];

export function start(root) {
  const signs = within(root, "[data-open-sign]");
  const charts = within(root, "[data-week-chart]");
  if (!signs.length && !charts.length) return;
  const update = () => {
    for (const sign of signs) {
      try {
        updateSign(sign);
      } catch {
        clearSign(sign);
      }
    }
    for (const chart of charts) {
      try {
        updateChart(chart);
      } catch {
        clearChart(chart);
      }
    }
  };
  update();
  const timer = setInterval(update, 60_000);
  stops.push(() => {
    clearInterval(timer);
    for (const sign of signs) clearSign(sign);
    for (const chart of charts) clearChart(chart);
  });
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
