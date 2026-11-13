// The evening (data-evening, with its hour in data-evening-hour and its moments in
// data-evening-moment, each with its time in data-evening-time): as the page scrolls,
// Motion's scroll follows the moments, and the one coming level with the pinned hour
// writes its own time into it, which changes with a short blur. The
// background's deepening to night is the stylesheet's, down the section's length.
// With no script, under reduced motion and while editing, the hour shows the first
// moment's time and every moment shows its own.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-evening]")) {
    if (running.has(section)) continue;
    const hour = section.querySelector("[data-evening-hour]");
    const moments = [...section.querySelectorAll("[data-evening-moment]")];
    const written = hour?.textContent;
    let shown = 0;
    section.setAttribute("data-evening-on", "");

    const stopScroll = Motion.scroll(
      () => {
        if (!hour || !moments.length) return;
        // The moment that has come level with the pinned hour (or the middle of the
        // screen, where the hour is not shown) is the one it tells.
        const box = hour.getBoundingClientRect();
        const level = box.height ? box.top + box.height / 2 : innerHeight / 2;
        let current = 0;
        moments.forEach((moment, i) => {
          if (moment.getBoundingClientRect().top < level) current = i;
        });
        if (current === shown) return;
        shown = current;
        const time = moments[current].querySelector("[data-evening-time]")?.textContent.trim();
        if (!time) return;
        hour.textContent = time;
        Motion.animate(
          hour,
          { opacity: [0.2, 1], filter: ["blur(10px)", "blur(0px)"] },
          { duration: 0.55, ease: "easeOut" },
        );
      },
      { target: section, offset: ["start 0.6", "end 0.6"] },
    );

    running.set(section, () => {
      stopScroll();
      section.removeAttribute("data-evening-on");
      if (hour && written !== undefined) {
        hour.textContent = written;
        hour.style.removeProperty("opacity");
        hour.style.removeProperty("filter");
      }
    });
  }
}

export function stop(root) {
  for (const section of within(root, "[data-evening]")) {
    running.get(section)?.();
    running.delete(section);
  }
}
