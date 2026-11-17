// The fade (data-fade on a price grid) and the week at the chair (data-week-chart): once one
// enters the screen, the stylesheet plays it (data-play): the grid's steps darken in turn, the
// week's bars grow from opening to closing time. The waiting state (data-wait) is set here, so
// the page is complete with no script, and nothing waits under reduced motion.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced() || typeof IntersectionObserver === "undefined") return;
  const els = within(root, '[data-fade]:not([data-fade="band"]), [data-week-chart]');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.removeAttribute("data-wait");
        entry.target.setAttribute("data-play", "");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  for (const el of els) {
    el.removeAttribute("data-play");
    el.setAttribute("data-wait", "");
    observer.observe(el);
  }
  stops.push(() => {
    observer.disconnect();
    for (const el of els) {
      el.removeAttribute("data-wait");
      el.removeAttribute("data-play");
    }
  });
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
