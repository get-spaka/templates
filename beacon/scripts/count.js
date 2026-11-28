// A figure marked data-count counts up to its own text when it comes into view
// ("4,100", "38 s", "$19"), then shows that text exactly as written. With no
// script, and under reduced motion, it is simply its text.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-count]")) {
    const text = el.textContent;
    const match = /\d[\d,]*(?:\.\d+)?/.exec(text);
    if (!match) continue;
    const target = Number(match[0].replace(/,/g, ""));
    if (!target) continue;
    const decimals = (match[0].split(".")[1] ?? "").length;
    const grouped = match[0].includes(",");
    const write = (value) => {
      const number = value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      });
      el.textContent = text.slice(0, match.index) + number + text.slice(match.index + match[0].length);
    };
    write(0);
    let controls;
    const stopView = inView(
      el,
      () => {
        controls = animate(0, target, {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (value) => write(value),
          onComplete: () => {
            el.textContent = text;
          },
        });
      },
      { amount: 0.6 },
    );
    undo.push(() => {
      stopView();
      controls?.stop();
      el.textContent = text;
    });
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
