// The appeal's jar (data-jar): the page sets its level in the style attribute
// (--level: 62%) and the stylesheet fills it there. When the jar comes into view,
// the script empties it and raises the fill to its level with a spring; the
// handwritten note ([data-jar-note]) fades in last. With no script, under reduced
// motion and in edit mode, the jar stands at its level.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  if (reduced()) return;
  for (const jar of within(root, "[data-jar]")) {
    const fill = jar.querySelector(".jar-fill");
    const notes = [...jar.querySelectorAll("[data-jar-note]")];
    if (!fill) continue;
    const depth = () => fill.getBoundingClientRect().height || 1;
    fill.style.transform = `translateY(${depth()}px)`;
    for (const note of notes) note.style.opacity = "0";
    stops.push(
      Motion.inView(
        jar,
        () => {
          jar.setAttribute("data-filling", "");
          Motion.animate(fill, { y: [depth(), 0] }, { type: "spring", duration: 1.4, bounce: 0.28 });
          for (const note of notes) Motion.animate(note, { opacity: [0, 1] }, { duration: 0.5, delay: 1.2 });
        },
        { amount: 0.5 },
      ),
      () => {
        jar.removeAttribute("data-filling");
        fill.style.transform = "";
        for (const note of notes) note.style.opacity = "";
      },
    );
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
