// data-candle: a soft amber light that follows the pointer over a dark section (the
// stylesheet draws it, from --cx and --cy, once data-candle-on is set). On a touch screen
// it drifts slowly by itself while the section is in view. With no script, under reduced
// motion and while editing, there is no light.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  for (const section of within(root, "[data-candle]")) {
    if (running.has(section)) continue;
    section.setAttribute("data-candle-on", "");
    let frame;
    const place = (x, y) => {
      section.style.setProperty("--cx", `${x.toFixed(1)}px`);
      section.style.setProperty("--cy", `${y.toFixed(1)}px`);
    };
    const onMove = (event) => {
      const box = section.getBoundingClientRect();
      place(event.clientX - box.left, event.clientY - box.top);
      section.style.setProperty("--candle-o", "1");
    };
    const onLeave = () => section.style.setProperty("--candle-o", "0");
    let seen;
    if (fine) {
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);
    } else {
      const began = performance.now();
      const tick = (time) => {
        const t = (time - began) / 1000;
        const box = section.getBoundingClientRect();
        place(box.width * (0.5 + 0.3 * Math.sin(t * 0.4)), box.height * (0.5 + 0.25 * Math.cos(t * 0.3)));
        frame = requestAnimationFrame(tick);
      };
      seen = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !frame) {
          section.style.setProperty("--candle-o", "1");
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = undefined;
        }
      });
      seen.observe(section);
    }
    running.set(section, () => {
      if (frame) cancelAnimationFrame(frame);
      seen?.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeAttribute("data-candle-on");
      for (const name of ["--cx", "--cy", "--candle-o"]) section.style.removeProperty(name);
    });
  }
}

export function stop(root) {
  for (const section of within(root, "[data-candle]")) {
    running.get(section)?.();
    running.delete(section);
  }
}
