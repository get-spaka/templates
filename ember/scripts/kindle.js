// data-kindle: the words of a statement light up one by one as they cross the middle of
// the screen. Splitting cuts it into words, the script dims each to 25% and Motion's scroll
// brings them up in turn. With no script, under reduced motion and while editing, every
// word is at full.
import { scroll } from "motion";
import Splitting from "splitting";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-kindle]")) {
    if (running.has(el)) continue;
    const html = el.innerHTML;
    const words = Splitting({ target: el, by: "words" })[0]?.words ?? [];
    for (const word of words) word.style.opacity = "0.25";
    const stopScroll = scroll(
      (progress) => {
        const lit = progress * (words.length + 2);
        words.forEach((word, i) => {
          word.style.opacity = String(0.25 + 0.75 * Math.min(1, Math.max(0, lit - i)));
        });
      },
      { target: el, offset: ["start 0.85", "end 0.55"] },
    );
    running.set(el, () => {
      stopScroll();
      el.innerHTML = html;
      el.classList.remove("splitting", "words");
      for (const name of ["--word-total", "--char-total"]) el.style.removeProperty(name);
    });
  }
}

export function stop(root) {
  for (const el of within(root, "[data-kindle]")) {
    running.get(el)?.();
    running.delete(el);
  }
}
