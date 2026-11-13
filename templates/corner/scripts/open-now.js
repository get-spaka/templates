// "Open now · until 7 pm": each data-open-now line says whether the shop is open,
// read from the hours rows on the page (data-hours-row, with data-weekday,
// data-opens and data-closes in 24 h). Its sentences are the line's own
// data-open, data-later and data-next attributes, so they are in the site's
// language; the line's own text stays as written wherever no hours are shown.
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};
const clock = (t) => {
  const [h, m] = t.split(":").map(Number);
  const at = new Date();
  at.setHours(h, m, 0, 0);
  const lang = document.documentElement.lang || undefined;
  return new Intl.DateTimeFormat(lang, m ? { hour: "numeric", minute: "2-digit" } : { hour: "numeric" }).format(at);
};
const fill = (sentence, values) => (sentence || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

let timer;
const written = new Map();

function update() {
  const rows = [...document.querySelectorAll("[data-hours-row]")];
  if (!rows.length) return;
  const byDay = new Map(rows.map((row) => [row.dataset.weekday, row]));
  const now = new Date();
  const today = DAYS[now.getDay()];
  const at = now.getHours() * 60 + now.getMinutes();
  for (const row of rows) row.toggleAttribute("data-today", row.dataset.weekday === today);

  const row = byDay.get(today);
  const opens = minutes(row?.dataset.opens);
  const closes = minutes(row?.dataset.closes);
  let state;
  if (opens !== undefined && closes !== undefined && at >= opens && at < closes)
    state = { key: "open", values: { time: clock(row.dataset.closes) }, open: true };
  else if (opens !== undefined && at < opens) state = { key: "later", values: { time: clock(row.dataset.opens) } };
  else
    for (let i = 1; i <= 7 && !state; i++) {
      const next = byDay.get(DAYS[(now.getDay() + i) % 7]);
      if (minutes(next?.dataset.opens) !== undefined)
        state = { key: "next", values: { day: next.dataset.day, time: clock(next.dataset.opens) } };
    }
  if (!state) return;

  for (const line of document.querySelectorAll("[data-open-now]")) {
    const text = line.querySelector("[data-open-now-text]");
    const sentence = line.dataset[state.key];
    if (!text || !sentence) continue;
    if (!written.has(text)) written.set(text, text.textContent);
    text.textContent = fill(sentence, state.values);
    line.toggleAttribute("data-closed", !state.open);
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
  for (const [text, original] of written) text.textContent = original;
  written.clear();
  for (const el of document.querySelectorAll("[data-today], [data-closed]")) {
    el.removeAttribute("data-today");
    el.removeAttribute("data-closed");
  }
}
