// The local time of the city in data-tz ("Europe/Lisbon"), written into
// data-clock-time, and whether it is working hours there: within data-hours
// ("09:00-18:00") on the days of data-days ("1-5", Monday to Friday), the line is
// marked data-at-work and data-clock-state says data-working, else data-away.
// Without this script the line shows only the city's name.
const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};
const WEEKDAYS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

let timer;

function update() {
  for (const line of document.querySelectorAll("[data-clock]")) {
    const zone = line.dataset.tz || undefined;
    const now = new Date();
    const lang = document.documentElement.lang || undefined;
    const time = line.querySelector("[data-clock-time]");
    if (time)
      time.textContent = new Intl.DateTimeFormat(lang, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: zone,
      }).format(now);
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: zone,
      })
        .formatToParts(now)
        .map((p) => [p.type, p.value]),
    );
    const day = WEEKDAYS[parts.weekday];
    const at = Number(parts.hour) * 60 + Number(parts.minute);
    const [from, to] = (line.dataset.hours || "").split("-").map(minutes);
    const [first, last] = (line.dataset.days || "1-7").split("-").map(Number);
    const working =
      from !== undefined && to !== undefined && day >= first && day <= (last || first) && at >= from && at < to;
    line.toggleAttribute("data-at-work", working);
    const state = line.querySelector("[data-clock-state]");
    if (state) state.textContent = working ? line.dataset.working || "" : line.dataset.away || "";
  }
}

export function start(root) {
  if (root !== document || timer) return;
  update();
  timer = setInterval(update, 15_000);
}

export function stop(root) {
  if (root !== document) return;
  clearInterval(timer);
  timer = undefined;
  for (const line of document.querySelectorAll("[data-clock]")) {
    line.removeAttribute("data-at-work");
    for (const el of line.querySelectorAll("[data-clock-time], [data-clock-state]")) el.textContent = "";
  }
}
