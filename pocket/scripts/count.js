// Counts (data-count): a figure counts up to the number written in the page as it comes into
// view ("4.8", "21,400", "310k", "9 in 10"), keeping its decimals, its commas and what follows.
// With no script, under reduced motion and while editing, the written figure shows.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-count]")) {
    if (running.has(el) || el.children.length) continue;
    const written = el.textContent;
    const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s.exec(written);
    if (!match) continue;
    const [, before, number, after] = match;
    const target = Number(number.replace(/,/g, ""));
    const decimals = number.includes(".") ? number.split(".")[1].length : 0;
    const commas = number.includes(",");
    const show = (value) => {
      const fixed = value.toFixed(decimals);
      const text = commas ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed;
      el.textContent = before + text + after;
    };
    show(0);
    let animation;
    const stopView = inView(
      el,
      () => {
        animation = animate(0, target, {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: show,
          onComplete: () => (el.textContent = written),
        });
      },
      { amount: 0.5 },
    );
    running.set(el, () => {
      stopView();
      animation?.stop();
      el.textContent = written;
    });
  }
}

export function stop(root) {
  for (const el of within(root, "[data-count]")) {
    running.get(el)?.();
    running.delete(el);
  }
}
