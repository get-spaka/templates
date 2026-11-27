// The kinetic headline (data-kinetic on a heading, one <span data-drift="left|right"> per
// line): Splitting cuts each line into letters, which rise from below their line's edge
// when the page opens, line after line; then, as the page scrolls, each line slides
// toward its side, 6vw at most. The heading is put back as written when the script
// stops; with no script, under reduced motion and while editing, the lines stand still.
import { animate, scroll, stagger } from "motion";
import Splitting from "splitting";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DRIFT = 6; // vw, at most
const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const heading of within(root, "[data-kinetic]")) {
    if (running.has(heading)) continue;
    const written = heading.innerHTML;
    const lines = [...heading.querySelectorAll("[data-drift]")];
    const stops = [];
    lines.forEach((line, i) => {
      const [result] = Splitting({ target: line, by: "chars" });
      const chars = result?.chars ?? [];
      // The line's lower edge is the mask the letters rise out of; caps may pass above it.
      line.style.clipPath = "inset(-0.4em -0.6em 0 -0.6em)";
      animate(chars, { y: "120%" }, { duration: 0 });
      animate(
        chars,
        { y: ["120%", "0%"] },
        { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: stagger(0.03, { startDelay: 0.15 + i * 0.16 }) },
      ).then(() => {
        line.style.clipPath = "";
      });
      const side = line.dataset.drift === "right" ? 1 : -1;
      stops.push(
        scroll(animate(line, { x: ["0vw", `${side * DRIFT}vw`] }, { ease: "linear" }), {
          target: heading,
          offset: ["start start", "end start"],
        }),
      );
    });
    running.set(heading, () => {
      for (const stop of stops) stop();
      heading.innerHTML = written;
      heading.classList.remove("splitting");
    });
  }
}

export function stop(root) {
  for (const heading of within(root, "[data-kinetic]")) {
    running.get(heading)?.();
    running.delete(heading);
  }
}
