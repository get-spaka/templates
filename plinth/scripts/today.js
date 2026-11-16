// Open today (data-today): reads the museum's hours written in the page ([data-day] with
// data-weekday, data-opens, data-closes and data-note) in the museum's own time zone (data-tz),
// so a visitor elsewhere reads the museum's day, and says it with the sentences the page holds
// in its <template data-say="…"> elements: open until, open tonight, opens at. From the
// exhibition's last day (data-last-day) it adds the days left in the final fortnight, and says
// when it has closed. With no script, the line written in the page shows.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let stops = [];

/** "17:00" → 1020 minutes. */
const minutes = (hhmm) => {
  const text = String(hhmm || "").trim();
  if (!/^\d{1,2}(:\d{2})?$/.test(text)) return null;
  const [h, m] = text.split(":").map(Number);
  return h * 60 + (m || 0);
};
/** 1020 → "5", 630 → "10:30": the clock as the museum says it. */
const clock = (total) => {
  const h = Math.floor(total / 60) % 12 || 12;
  const m = total % 60;
  return m ? `${h}:${String(m).padStart(2, "0")}` : String(h);
};

/** The museum's own day of the week, minutes since midnight and date, in its time zone. */
function museumNow(tz) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  return {
    day: WEEKDAYS.indexOf(parts.weekday.toLowerCase()),
    now: Number(parts.hour) * 60 + Number(parts.minute),
    date: `${parts.year}-${parts.month}-${parts.day}`,
  };
}

function say(line, name, values) {
  const template = line.querySelector(`template[data-say="${name}"]`);
  if (!template) return null;
  return template.innerHTML.trim().replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function update(line, text, hours) {
  const tz = line.getAttribute("data-tz") || undefined;
  const { day, now, date } = museumNow(tz);
  const days = hours
    .map((el) => ({
      weekday: WEEKDAYS.indexOf((el.getAttribute("data-weekday") || "").toLowerCase()),
      name: el.getAttribute("data-day") || "",
      opens: minutes(el.getAttribute("data-opens")),
      closes: minutes(el.getAttribute("data-closes")),
      note: el.getAttribute("data-note") || "",
    }))
    .filter((d) => d.weekday >= 0);
  const today = days.find((d) => d.weekday === day && d.opens !== null && d.closes !== null);
  let sentence;
  let open = false;
  if (today && now < today.closes) {
    open = now >= today.opens;
    const values = { opens: clock(today.opens), closes: clock(today.closes), note: today.note };
    if (!open) sentence = say(line, "later", values);
    else if (today.closes >= 18 * 60) sentence = say(line, "late", values);
    else sentence = say(line, "open", values);
  } else {
    for (let ahead = 1; ahead <= 7 && !sentence; ahead++) {
      const next = days.find((d) => d.weekday === (day + ahead) % 7 && d.opens !== null);
      if (next) sentence = say(line, ahead === 1 ? "tomorrow" : "next", { day: next.name, opens: clock(next.opens) });
    }
  }
  // The exhibition's last days, then its end.
  const last = line.getAttribute("data-last-day");
  if (last) {
    const left = Math.round((Date.parse(`${last}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86400000) + 1;
    if (left < 1) {
      sentence = say(line, "over", {}) ?? sentence;
      open = false;
    } else if (left <= 14) {
      const tail = say(line, "last", { days: String(left) });
      if (tail) sentence = sentence ? `${sentence} · ${tail}` : tail;
    }
  }
  if (sentence) text.innerHTML = sentence;
  line.setAttribute("data-state", open ? "open" : "closed");
}

export function start(root) {
  for (const line of within(root, "[data-today]")) {
    const text = line.querySelector("[data-today-text]");
    const hours = [...document.querySelectorAll("[data-today-hours] [data-weekday]")];
    if (!text || !hours.length) continue;
    const written = text.innerHTML;
    try {
      update(line, text, hours);
    } catch {
      continue;
    }
    const timer = setInterval(() => update(line, text, hours), 60_000);
    stops.push(() => {
      clearInterval(timer);
      text.innerHTML = written;
      line.removeAttribute("data-state");
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
