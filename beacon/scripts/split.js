// Each heading marked data-split has its words come out of a blur one after
// another when the page opens (Splitting cuts it into words, Motion moves them).
// The heading's own markup is kept and put back as it was when the script stops.
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
    const [result] = Splitting({ target: heading, by: "words" });
    if (!result) continue;
    result.words.forEach((word, i) => {
      word.style.opacity = "0";
      word.style.filter = "blur(8px)";
      word.style.transform = "translateY(0.25em)";
      Motion.animate(
        word,
        { opacity: 1, filter: ["blur(8px)", "blur(0px)"], y: ["0.25em", "0em"] },
        { duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
      );
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
