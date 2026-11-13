// Open tonight (data-tonight): the script reads the hours on the page (each row's
// data-hours-row with data-weekday, data-day, data-opens, data-kitchen and data-closes in
// 24 h; a closing at or before the opening, such as 00:00, is after midnight) and writes
// one of the line's own sentences into its data-tonight-text: data-open ("Open now ·
// kitchen until {kitchen}"), data-bar (the kitchen closed, the bar still open), data-later
// ("Open tonight from {opens}") or data-next ("Closed tonight · back {day} at {opens}");
// data-midnight is the line's word for a closing at 00:00 ("midnight").
// With no script the line says what is written in the page.
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};
const clock = (t) => {
  const [h, m] = t.split(":").map(Number);
  const at = new Date();
  at.setHours(h % 24, m, 0, 0);
  const lang = document.documentElement.lang || "en";
  const text = new Intl.DateTimeFormat(lang, m ? { hour: "numeric", minute: "2-digit" } : { hour: "numeric" }).format(
    at,
  );
  // "5 PM" reads "5 pm", as the site writes it.
  return /^en/.test(lang) ? text.replace(/\s?([AP])\.?M\.?$/i, (_, p) => ` ${p.toLowerCase()}m`) : text;
};
const fill = (sentence, values) => (sentence || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

let timer;
const written = new Map();

/** A day's service as minutes from that day's midnight, the closing after the opening. */
function service(row) {
  const opens = minutes(row?.dataset.opens);
  let closes = minutes(row?.dataset.closes);
  let kitchen = minutes(row?.dataset.kitchen);
  if (opens === undefined || closes === undefined) return undefined;
  if (closes <= opens) closes += 24 * 60;
  if (kitchen !== undefined && kitchen <= opens) kitchen += 24 * 60;
  return { opens, closes, kitchen: kitchen ?? closes, row };
}

function state(byDay, now) {
  const day = now.getDay();
  const at = now.getHours() * 60 + now.getMinutes();
  // Still last night's service, after midnight?
  const last = service(byDay.get(DAYS[(day + 6) % 7]));
  if (last && at + 24 * 60 < last.closes) return open(last, at + 24 * 60);
  const today = service(byDay.get(DAYS[day]));
  if (today && at >= today.opens && at < today.closes) return open(today, at);
  if (today && at < today.opens) return { key: "later", values: { opens: clock(today.row.dataset.opens) } };
  for (let i = 1; i <= 7; i++) {
    const next = service(byDay.get(DAYS[(day + i) % 7]));
    if (next) return { key: "next", values: { day: next.row.dataset.day, opens: clock(next.row.dataset.opens) } };
  }
  return undefined;
}

function open(today, at) {
  const values = {
    kitchen: clock(today.row.dataset.kitchen || today.row.dataset.closes),
    closes: clock(today.row.dataset.closes),
  };
  const midnight = minutes(today.row.dataset.closes) % (24 * 60) === 0;
  return { key: at < today.kitchen ? "open" : "bar", values, open: true, midnight };
}

function update() {
  const rows = [...document.querySelectorAll("[data-hours-row]")];
  if (!rows.length) return;
  const byDay = new Map();
  for (const row of rows) if (!byDay.has(row.dataset.weekday)) byDay.set(row.dataset.weekday, row);
  const now = new Date();
  const today = DAYS[now.getDay()];
  for (const row of rows) row.toggleAttribute("data-today", row.dataset.weekday === today);
  const found = state(byDay, now);
  if (!found) return;
  for (const line of document.querySelectorAll("[data-tonight]")) {
    const text = line.querySelector("[data-tonight-text]");
    const sentence = line.dataset[found.key] || (found.key === "bar" ? line.dataset.open : undefined);
    if (!text || !sentence) continue;
    if (!written.has(text)) written.set(text, text.textContent);
    // A closing at midnight reads as the line's own word for it (data-midnight), if it has one.
    const values = { ...found.values };
    if (line.dataset.midnight && found.midnight) values.closes = line.dataset.midnight;
    text.textContent = fill(sentence, values);
    line.toggleAttribute("data-closed", !found.open);
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
