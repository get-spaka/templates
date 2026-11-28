// The hour (data-hour): as the section comes into view, its ring's arcs empty
// and fill in turn, 0.5 s each, 0.1 s apart. With no script, under reduced
// motion and while editing, the ring is whole.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const hour of within(root, "[data-hour]")) {
    const arcs = [...hour.querySelectorAll("[data-arc]")];
    if (!arcs.length) continue;
    const dash = arcs.map((arc) => arc.getAttribute("stroke-dasharray"));
    const length = (i) => parseFloat(dash[i]) || 0;
    const whole = (arc) => arc.getAttribute("pathLength") || "60";
    for (const arc of arcs) arc.setAttribute("stroke-dasharray", `0 ${whole(arc)}`);
    const running = [];
    const stopView = inView(
      hour,
      () => {
        arcs.forEach((arc, i) => {
          running.push(
            animate(0, length(i), {
              duration: 0.5,
              delay: 0.15 + i * 0.6,
              ease: [0.65, 0, 0.35, 1],
              onUpdate: (v) => arc.setAttribute("stroke-dasharray", `${v.toFixed(2)} ${whole(arc)}`),
            }),
          );
        });
      },
      { amount: 0.1 },
    );
    stops.push(() => {
      stopView();
      for (const animation of running) animation.stop();
      for (const [i, arc] of arcs.entries()) arc.setAttribute("stroke-dasharray", dash[i]);
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
