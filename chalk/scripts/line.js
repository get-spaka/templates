// The route: a line climbs down the page through its holds as the visitor scrolls,
// the way a problem is read on the wall. data-line marks the container, data-hold
// each stop inside it (a nested data-line is a route of its own). The script
// measures the stops, draws a smooth path through them behind the content (down
// the gutters, crossing the page in the space above a heading, so never behind
// text) and draws it as the page scrolls: its tip reaches each stop as the stop
// crosses the middle of the screen, and the stop lights up (data-hold-on). Under
// reduced motion the whole route is drawn at once and stays still; with no
// script and in edit mode the holds are there, filled, with no line.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS = "http://www.w3.org/2000/svg";
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

/** How far above a stop the line crosses from one gutter to the other, in pixels. */
const BAND = 64;

let routes = [];

export function start(root) {
  for (const el of within(root, "[data-line]")) {
    if (routes.some((r) => r.el === el)) continue;
    routes.push(route(el));
  }
}

export function stop(root) {
  routes = routes.filter((r) => {
    if (root !== document && !root.contains(r.el)) return true;
    r.stop();
    return false;
  });
}

function route(el) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "route");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(NS, "path");
  svg.append(path);
  el.prepend(svg);
  el.setAttribute("data-line-on", "");

  let holds = [];
  let at = []; // the scroll position at which each stop is reached
  let lengths = []; // the path's length up to each stop
  let total = 0;
  let frame = 0;
  let stopped = false;

  const measure = () => {
    frame = 0;
    if (stopped) return;
    const box = el.getBoundingClientRect();
    svg.setAttribute("width", String(Math.round(box.width)));
    svg.setAttribute("height", String(Math.round(box.height)));
    const before = holds;
    holds = [...el.querySelectorAll("[data-hold]")].filter(
      (h) => h.closest("[data-line]") === el && h.getClientRects().length > 0,
    );
    for (const hold of before) if (!holds.includes(hold)) hold.removeAttribute("data-hold-on");
    if (holds.length < 2) {
      path.removeAttribute("d");
      for (const hold of holds) hold.setAttribute("data-hold-on", "");
      return;
    }
    const stops = holds.map((h) => {
      const r = h.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top, page: r.top + r.height / 2 + scrollY };
    });

    // The points the path goes through: each stop, and where it changes side, two
    // more just above the next stop's heading, where the page is empty.
    const points = [];
    const stopIndex = [];
    stops.forEach((s, i) => {
      const prev = stops[i - 1];
      if (prev && Math.abs(s.x - prev.x) > 24) {
        const cross = s.y - BAND;
        if (cross - 28 > prev.y + 28) points.push({ x: prev.x, y: cross - 28 }, { x: s.x, y: cross + 20 });
      }
      stopIndex.push(points.length);
      points.push(s);
    });

    // The curve never swings out of the gutters: a Bézier stays inside its
    // control points, so they are kept between the outermost stops.
    const xs = stops.map((s) => s.x);
    const left = Math.max(2, Math.min(...xs) - 8);
    const right = Math.min(box.width - 2, Math.max(...xs) + 8);
    const segments = bezier(points, left, right);
    const head = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    lengths = stopIndex.map((index) => {
      if (index === 0) return 0;
      path.setAttribute("d", `${head} ${segments.slice(0, index).join(" ")}`);
      return path.getTotalLength();
    });
    path.setAttribute("d", `${head} ${segments.join(" ")}`);
    total = path.getTotalLength();
    path.style.strokeDasharray = `${total} ${total}`;

    // Each stop is reached as it crosses the middle of the screen; the ones the
    // page cannot scroll that far share out the end of the scroll.
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    at = stops.map((s) => Math.min(max, Math.max(0, s.page - innerHeight / 2)));
    for (let i = 1; i < at.length; i++) at[i] = Math.max(at[i], at[i - 1]);
    const first = at.findIndex((t) => t >= max - 1);
    if (first > 0 && first < at.length - 1) {
      const from = at[first - 1];
      const count = at.length - first;
      for (let i = first; i < at.length; i++) at[i] = from + ((max - from) * (i - first + 1)) / count;
    }
    update();
  };

  const update = () => {
    if (stopped || !total) return;
    const y = reduced() ? Infinity : scrollY;
    let drawn = total;
    const last = at.length - 1;
    if (y <= at[0]) drawn = lengths[0];
    else if (y < at[last]) {
      let i = 0;
      while (at[i + 1] <= y) i++;
      const span = at[i + 1] - at[i];
      drawn = lengths[i] + (span > 0 ? ((lengths[i + 1] - lengths[i]) * (y - at[i])) / span : 0);
    }
    path.style.strokeDashoffset = String(Math.max(0, total - drawn));
    holds.forEach((hold, i) => {
      const on = y >= at[i] - 1;
      if (on !== hold.hasAttribute("data-hold-on")) hold.toggleAttribute("data-hold-on", on);
    });
  };

  const later = () => {
    if (!frame) frame = requestAnimationFrame(measure);
  };
  const observer = new ResizeObserver(later);
  observer.observe(el);
  addEventListener("resize", later);
  document.fonts?.ready.then(later);
  let unscroll = () => {};
  if (!reduced()) {
    if (globalThis.Motion?.scroll) unscroll = Motion.scroll(() => update());
    else {
      addEventListener("scroll", update, { passive: true });
      unscroll = () => removeEventListener("scroll", update);
    }
  }
  measure();

  return {
    el,
    stop() {
      stopped = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", later);
      unscroll();
      svg.remove();
      el.removeAttribute("data-line-on");
      for (const hold of holds) hold.removeAttribute("data-hold-on");
    },
  };
}

/** A centripetal Catmull-Rom curve through the points, as one cubic Bézier per span,
 * its control points kept between left and right. */
function bezier(points, left, right) {
  const out = [];
  const dist = (a, b) => Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y));
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const d1 = dist(p0, p1);
    const d2 = dist(p1, p2) || 1e-6;
    const d3 = dist(p2, p3);
    const c1 =
      d1 > 1e-6
        ? {
            x: (d1 * d1 * p2.x - d2 * d2 * p0.x + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1.x) / (3 * d1 * (d1 + d2)),
            y: (d1 * d1 * p2.y - d2 * d2 * p0.y + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1.y) / (3 * d1 * (d1 + d2)),
          }
        : { x: p1.x + (p2.x - p1.x) / 3, y: p1.y + (p2.y - p1.y) / 3 };
    const c2 =
      d3 > 1e-6
        ? {
            x: (d3 * d3 * p1.x - d2 * d2 * p3.x + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2.x) / (3 * d3 * (d3 + d2)),
            y: (d3 * d3 * p1.y - d2 * d2 * p3.y + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2.y) / (3 * d3 * (d3 + d2)),
          }
        : { x: p2.x - (p2.x - p1.x) / 3, y: p2.y - (p2.y - p1.y) / 3 };
    const f = (n) => n.toFixed(1);
    const x = (n) => f(Math.min(right, Math.max(left, n)));
    out.push(`C${x(c1.x)} ${f(c1.y)} ${x(c2.x)} ${f(c2.y)} ${f(p2.x)} ${f(p2.y)}`);
  }
  return out;
}
