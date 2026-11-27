// The product's window (data-window): tipped back in perspective, it lies flat
// as the page scrolls through its first screen, and when it comes into view its
// uptime bars (data-bars) fill one after another and its chart (data-spark)
// draws itself from left to right. With no script, under reduced motion and in
// edit mode, the window lies flat with its bars full.
import { animate, inView, scroll, stagger } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  if (reduced()) return;
  for (const win of within(root, "[data-window]")) {
    win.style.transform = "rotateX(24deg) scale(0.92)";
    const tilt = animate(win, { rotateX: [24, 0], scale: [0.92, 1] }, { ease: "linear" });
    undo.push(scroll(tilt, { target: win, offset: ["start end", "start 0.2"] }));
    undo.push(() => {
      win.style.transform = "";
    });

    const bars = [...win.querySelectorAll("[data-bars] > *")];
    const charts = [...win.querySelectorAll("[data-spark]")];
    for (const bar of bars) bar.style.transform = "scaleY(0)";
    for (const chart of charts) chart.style.clipPath = "inset(0 100% 0 0)";
    undo.push(() => {
      for (const bar of bars) bar.style.transform = "";
      for (const chart of charts) chart.style.clipPath = "";
    });
    undo.push(
      inView(
        win,
        () => {
          animate(bars, { scaleY: [0, 1] }, { duration: 0.5, delay: stagger(0.006), ease: [0.22, 1, 0.36, 1] });
          animate(
            charts,
            { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] },
            { duration: 1.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] },
          );
        },
        { amount: 0.25 },
      ),
    );
  }
}

export function stop() {
  for (const step of undo) step?.();
  undo = [];
}
