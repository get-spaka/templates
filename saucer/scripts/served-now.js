// What is served now: the one script that reads the clock.
//
// It reads the hours from the page: the footer renders each record of `hours` as a
// row with data-hours-row, data-weekday, data-day, data-opens, data-lunch-from,
// data-kitchen-closes and data-closes (24-hour times), each time also shown inside
// it as [data-time="opens"]…, and the café's time zone from data-tz.
// It sets data-now on <html> (before, breakfast, lunch, coffee, after or closed)
// and data-today (the weekday); the stylesheet shows the lines written for that
// state ([data-when~="lunch"]). It writes no sentence: it copies the times shown in
// today's row into the lines' empty slots ([data-slot="until"]).
//
// It also turns the door cards ([data-door-card]) to the side that is true, and
// opens the menu ([data-served-now]) on the tab of the service of the hour.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const OPEN = new Set(["breakfast", "lunch", "coffee"]);
/** Which tab of the menu each state opens on. */
const TAB = {
  before: "breakfast",
  breakfast: "breakfast",
  lunch: "lunch",
  coffee: "drinks",
  after: "breakfast",
  closed: "breakfast",
};
const EASE = [0.65, 0, 0.35, 1];

const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};

/** The weekday and the minute of the day in the café's own time zone. */
function clock(tz) {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz || undefined,
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    return { day: get("weekday").toLowerCase(), at: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
  } catch {
    return { day: WEEK[now.getDay()], at: now.getHours() * 60 + now.getMinutes() };
  }
}

const shown = (row, field) => row?.querySelector(`[data-time="${field}"]`)?.textContent.trim() ?? "";

/** The state of the day, and the times its lines need. */
function readState() {
  const rows = [...document.querySelectorAll("[data-hours-row]")];
  if (!rows.length) return undefined;
  const byDay = new Map(rows.map((row) => [row.dataset.weekday, row]));
  const tz = document.querySelector("[data-tz]")?.dataset.tz;
  const { day, at } = clock(tz);
  const row = byDay.get(day);
  const opens = minutes(row?.dataset.opens);
  const lunch = minutes(row?.dataset.lunchFrom);
  const kitchen = minutes(row?.dataset.kitchenCloses);
  const closes = minutes(row?.dataset.closes);
  const slots = { opens: shown(row, "opens"), closes: shown(row, "closes") };

  let now;
  if (opens === undefined || closes === undefined) now = "closed";
  else if (at < opens) now = "before";
  else if (at >= closes) now = "after";
  else if (kitchen !== undefined && at >= kitchen) {
    now = "coffee";
    slots.until = shown(row, "closes");
  } else if (lunch !== undefined && at >= lunch) {
    now = "lunch";
    slots.until = shown(row, "kitchen-closes") || shown(row, "closes");
  } else {
    now = "breakfast";
    slots.until = lunch !== undefined ? shown(row, "lunch-from") : shown(row, "kitchen-closes") || shown(row, "closes");
  }

  // The next time the door opens: later today, or the next day it opens.
  const first = WEEK.indexOf(day);
  for (let i = now === "before" ? 0 : 1; i <= 7; i++) {
    const next = byDay.get(WEEK[(first + i) % 7]);
    if (minutes(next?.dataset.opens) === undefined) continue;
    slots.next_day = next.dataset.day || "";
    slots.next_opens = shown(next, "opens");
    break;
  }
  return { now, day, slots };
}

// ---- the lines -----------------------------------------------------------------

const filled = new Map();

function fill(slots) {
  for (const slot of document.querySelectorAll("[data-slot]")) {
    if (!filled.has(slot)) filled.set(slot, slot.textContent);
    slot.textContent = slots[slot.dataset.slot] ?? "";
  }
}

// ---- the door cards ---------------------------------------------------------------

const cards = new Map();

/** Says which side the card shows, for screen readers. */
function label(card, back) {
  const face = card.querySelector(back ? ".door-back .door-big" : ".door-front .door-big");
  if (face) card.setAttribute("aria-label", face.textContent.trim());
  card.setAttribute("aria-pressed", back ? "true" : "false");
}

function turn(card, back, duration) {
  const inner = card.querySelector("[data-door-card-inner]");
  const state = cards.get(card);
  if (!inner || !state) return;
  const from = state.back ? 180 : 0;
  const to = back ? 180 : 0;
  state.back = back;
  label(card, back);
  if (from === to) return;
  if (reduced() || !duration) {
    inner.style.transform = `rotateY(${to}deg)`;
    return;
  }
  state.animation?.stop();
  state.animation = animate(inner, { rotateY: [from, to] }, { duration, ease: EASE });
}

function setUpCard(card, open) {
  if (cards.has(card)) {
    const state = cards.get(card);
    state.open = open;
    if (state.seen && !state.byHand) turn(card, !open, 0.9);
    return;
  }
  const state = { back: false, open, seen: false, byHand: false };
  cards.set(card, state);
  label(card, false);
  const onTap = () => {
    state.byHand = true;
    turn(card, !state.back, 0.6);
  };
  card.addEventListener("click", onTap);
  const stopView = inView(
    card,
    () => {
      state.seen = true;
      if (!state.byHand) turn(card, !state.open, 0.9);
    },
    { amount: 0.4 },
  );
  state.undo = () => {
    card.removeEventListener("click", onTap);
    stopView();
    state.animation?.stop();
    const inner = card.querySelector("[data-door-card-inner]");
    if (inner) inner.style.transform = "";
    card.removeAttribute("aria-pressed");
    card.setAttribute("aria-label", card.dataset.label || "");
  };
}

// ---- the menu's tabs ------------------------------------------------------------

const checkedAtFirst = new Map();

function openMenu(now) {
  for (const menu of document.querySelectorAll("[data-served-now]")) {
    const inputs = [...menu.querySelectorAll("input[type=radio]")];
    if (!checkedAtFirst.has(menu))
      checkedAtFirst.set(
        menu,
        inputs.find((i) => i.checked),
      );
    if (menu.dataset.touched) continue;
    const tab = inputs.find((i) => i.dataset.service === TAB[now]);
    if (tab) tab.checked = true;
  }
}

function onMenuChange(event) {
  const menu = event.target.closest?.("[data-served-now]");
  if (menu && event.isTrusted) menu.dataset.touched = "1";
}

// ---- start and stop -----------------------------------------------------------------

let timer;

function update() {
  const state = readState();
  if (!state) return;
  const html = document.documentElement;
  html.dataset.now = state.now;
  html.dataset.today = state.day;
  fill(state.slots);
  openMenu(state.now);
  for (const card of document.querySelectorAll("[data-door-card]")) setUpCard(card, OPEN.has(state.now));
}

export function start(root) {
  for (const card of within(root, "[data-door-card]"))
    if (!card.dataset.label) card.dataset.label = card.getAttribute("aria-label") || "";
  update();
  document.addEventListener("change", onMenuChange);
  clearInterval(timer);
  timer = setInterval(update, 60_000);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  document.removeEventListener("change", onMenuChange);
  const html = document.documentElement;
  delete html.dataset.now;
  delete html.dataset.today;
  for (const [slot, text] of filled) slot.textContent = text;
  filled.clear();
  for (const state of cards.values()) state.undo?.();
  cards.clear();
  for (const [menu, input] of checkedAtFirst) {
    delete menu.dataset.touched;
    if (input) input.checked = true;
  }
  checkedAtFirst.clear();
}
