// The opening of a page. data-flicker on the name: its letters come up from a blur in a
// random order over about 1.4 s, like candles being lit. data-fade-in on the hero's photo:
// it comes up from black and settles from 1.1 to 1.04, like a projector warming up.
// With no script, under reduced motion and while editing, both are simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let animations = [];
const split = new Map();

export function start(root) {
  if (reduced()) return;
  for (const el of within(root, "[data-fade-in]")) {
    el.style.opacity = "0";
    animations.push(
      Motion.animate(el, { opacity: [0, 1], scale: [1.1, 1.04] }, { duration: 1.6, ease: [0.16, 1, 0.3, 1] }),
    );
  }
  for (const el of within(root, "[data-flicker]")) {
    if (!split.has(el)) split.set(el, el.innerHTML);
    const chars = Splitting({ target: el, by: "chars" })[0]?.chars ?? [];
    const lit = chars.map((char) => {
      char.style.opacity = "0";
      const animation = Motion.animate(
        char,
        { opacity: [0, 0.75, 0.35, 1], filter: ["blur(14px)", "blur(4px)", "blur(2px)", "blur(0px)"] },
        { duration: 0.6, delay: 0.25 + Math.random() * 0.8, ease: "easeOut" },
      );
      animations.push(animation);
      return animation;
    });
    // Once every letter is lit, the name is plain text again, with its kerning.
    Promise.all(lit.map((animation) => animation.finished ?? animation))
      .then(() => {
        if (!split.has(el)) return;
        el.innerHTML = split.get(el);
        el.classList.remove("splitting", "words", "chars");
        for (const name of ["--word-total", "--char-total"]) el.style.removeProperty(name);
      })
      .catch(() => {});
  }
}

export function stop(root) {
  for (const animation of animations) animation.stop?.();
  animations = [];
  for (const el of within(root, "[data-fade-in]")) {
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
  }
  for (const [el, html] of split) {
    if (root !== document && !root.contains(el)) continue;
    el.innerHTML = html;
    el.classList.remove("splitting", "words", "chars");
    for (const name of ["--word-total", "--char-total"]) el.style.removeProperty(name);
    split.delete(el);
  }
}
