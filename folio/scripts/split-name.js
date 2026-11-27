// Each heading marked data-split has its letters rise one after another when the
// page opens (Splitting cuts it into words and letters, Motion moves them). The
// heading's text is kept and put back as it was when the script stops.
import { animate } from "motion";
import Splitting from "splitting";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const written = new Map();

export function start(root) {
  if (reduced()) return;
  for (const heading of within(root, "[data-split]")) {
    if (written.has(heading)) continue;
    written.set(heading, heading.innerHTML);
    const [result] = Splitting({ target: heading, by: "chars" });
    if (!result) continue;
    for (const word of result.words) word.setAttribute("data-split-word", "");
    result.chars.forEach((char, i) => {
      char.style.display = "inline-block";
      char.style.transform = "translateY(105%)";
      animate(char, { y: ["105%", "0%"] }, { duration: 0.9, delay: 0.1 + i * 0.035, ease: [0.22, 1, 0.36, 1] });
    });
  }
}

export function stop(root) {
  for (const heading of within(root, "[data-split]")) {
    if (!written.has(heading)) continue;
    heading.innerHTML = written.get(heading);
    heading.classList.remove("splitting");
    written.delete(heading);
  }
}
