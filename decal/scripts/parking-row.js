// Where the truck is: the one script that reads the clock. It chooses a bay and
// nothing else: it never says open, closed or "now".
//
// It reads the week from the page: each stop is rendered with data-stop (its id),
// data-day (mon to sun), data-starts and data-ends (24-hour times) and data-off when
// it is off this week, its times shown inside as [data-time="starts"]… The truck's
// time zone is data-tz on the row or the strip (without it, the visitor's clock).
// It sets data-state on every element of a stop: "today" (the day's stop not yet
// over, the earlier of two), "next" (the stop after it, or the first one still to
// come), "past" (this week's stops already over); "home" on the home bay when the
// truck is not out. Once the week's last stop is over, the week starts again. The
// stylesheet shows the lines written for each state ([data-when~="today"]); the
// script only copies a stop's times into its empty slots ([data-slot="starts"]).
//
// In each parking row ([data-parking-row]) it parks the truck ([data-truck], in the
// home bay in the markup) in today's bay: when the row comes into view, the truck
// noses in from the lane. At home base it does not move.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const EASE = [0.22, 1, 0.36, 1];
/** How far behind its bay the truck waits in the lane, in pixels. */
const LANE = 64;

const minutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec((t || "").trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : undefined;
};

/** The day of the week (0 for Monday) and the minute of the day, in the truck's time zone. */
function clock(tz) {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz || undefined,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    return {
      day: DAYS.indexOf(get("weekday").slice(0, 3).toLowerCase()),
      at: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
    };
  } catch {
    return { day: (now.getDay() + 6) % 7, at: now.getHours() * 60 + now.getMinutes() };
  }
}

/** The week's stops, once each, in the week's order. */
function readStops() {
  const byId = new Map();
  for (const el of document.querySelectorAll("[data-stop]")) {
    if (byId.has(el.dataset.stop)) continue;
    const day = DAYS.indexOf(el.dataset.day);
    const starts = minutes(el.dataset.starts);
    const ends = minutes(el.dataset.ends);
    if (day < 0 || starts === undefined || ends === undefined) continue;
    byId.set(el.dataset.stop, {
      id: el.dataset.stop,
      off: el.hasAttribute("data-off"),
      from: day * 1440 + starts,
      to: day * 1440 + ends,
      day,
    });
  }
  return [...byId.values()].sort((a, b) => a.from - b.from);
}

/** Each stop's state, and the stop the truck is parked at today, if any. */
function readWeek() {
  const tz = document.querySelector("[data-tz]")?.dataset.tz;
  const { day, at } = clock(tz);
  let now = day * 1440 + at;
  const stops = readStops().filter((s) => !s.off);
  if (!stops.length) return { states: new Map(), today: undefined };
  // Once the week's last stop is over, the week starts again.
  if (stops.every((s) => s.to <= now)) now = -1;
  const states = new Map();
  for (const s of stops) if (s.to <= now) states.set(s.id, "past");
  const today = stops.find((s) => s.day === day && s.to > now);
  const next = today ? stops[(stops.indexOf(today) + 1) % stops.length] : stops.find((s) => s.to > now);
  if (next && next !== today) states.set(next.id, "next");
  if (today) states.set(today.id, "today");
  return { states, today: today?.id };
}

// ---- the lines ------------------------------------------------------------------

const filled = new Map();

function fill(el) {
  for (const slot of el.querySelectorAll("[data-slot]")) {
    if (!filled.has(slot)) filled.set(slot, slot.textContent);
    slot.textContent = el.querySelector(`[data-time="${slot.dataset.slot}"]`)?.textContent.trim() ?? "";
  }
}

function mark(week) {
  for (const el of document.querySelectorAll("[data-stop]")) {
    const state = week.states.get(el.dataset.stop);
    if (state) el.dataset.state = state;
    else delete el.dataset.state;
    fill(el);
  }
  for (const home of document.querySelectorAll("[data-home-bay]")) {
    if (week.today) delete home.dataset.state;
    else home.dataset.state = "home";
  }
  document.documentElement.dataset.week = "read";
}

// ---- the truck ------------------------------------------------------------------

const rows = new Map();

const facing = (spot) => Number.parseFloat(getComputedStyle(spot).getPropertyValue("--facing")) || 0;

/** The truck's transform in its bay, and where it waits in the lane before nosing in. */
function where(row, target) {
  const home = row.querySelector("[data-home-bay] [data-truck-spot]");
  const spot = target && row.querySelector(`[data-stop="${CSS.escape(target)}"] [data-truck-spot]`);
  if (!home || !spot) return undefined;
  const a = home.getBoundingClientRect();
  const b = spot.getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const angle = facing(spot);
  const turn = angle - facing(home);
  const rad = (angle * Math.PI) / 180;
  const ox = -LANE * Math.sin(rad);
  const oy = LANE * Math.cos(rad);
  return {
    parked: `translate(${dx}px, ${dy}px) rotate(${turn}deg)`,
    waiting: `translate(${dx + ox}px, ${dy + oy}px) rotate(${turn - 8}deg)`,
  };
}

function place(row) {
  const state = rows.get(row);
  if (!state || state.moving) return;
  const at = where(row, state.target);
  state.truck.style.transform = at ? (state.arrived || reduced() ? at.parked : at.waiting) : "";
}

function arrive(row) {
  const state = rows.get(row);
  if (!state || state.arrived) return;
  state.arrived = true;
  const at = where(row, state.target);
  if (!at || reduced()) return place(row);
  state.moving = Motion.animate(state.truck, { transform: [at.waiting, at.parked] }, { duration: 0.9, ease: EASE });
  state.moving.then(() => {
    state.moving = undefined;
    place(row);
    for (const tail of state.truck.querySelectorAll(".truck-tail"))
      state.tails.push(Motion.animate(tail, { opacity: [0.4, 1, 0.6] }, { duration: 0.4 }));
  });
}

function setUpRow(row, target) {
  const truck = row.querySelector("[data-truck]");
  if (!truck) return;
  if (rows.has(row)) {
    const state = rows.get(row);
    if (state.target !== target) {
      state.target = target;
      place(row);
    }
    return;
  }
  const state = { truck, target, arrived: false, moving: undefined, tails: [] };
  rows.set(row, state);
  place(row);
  const observer = new ResizeObserver(() => place(row));
  observer.observe(row);
  const stopView = Motion.inView(row, () => arrive(row), { amount: 0.25 });
  state.undo = () => {
    observer.disconnect();
    stopView();
    state.moving?.stop();
    for (const tail of state.tails) tail.stop();
    for (const tail of truck.querySelectorAll(".truck-tail")) tail.style.opacity = "";
    truck.style.transform = "";
  };
}

// ---- start and stop -----------------------------------------------------------------

let timer;

function update() {
  const week = readWeek();
  mark(week);
  for (const row of document.querySelectorAll("[data-parking-row]")) setUpRow(row, week.today);
}

export function start(_root) {
  update();
  clearInterval(timer);
  timer = setInterval(update, 60_000);
}

export function stop() {
  clearInterval(timer);
  timer = undefined;
  for (const state of rows.values()) state.undo?.();
  rows.clear();
  for (const [slot, text] of filled) slot.textContent = text;
  filled.clear();
  for (const el of document.querySelectorAll("[data-stop], [data-home-bay]")) delete el.dataset.state;
  delete document.documentElement.dataset.week;
}
