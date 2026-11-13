// The reel (data-reel on the section, data-reel-stage around what sticks, data-reel-track
// on the row of panels, data-reel-progress for the line that fills). From 1024 px wide,
// the script pins it (data-pinned): the section gets the height of the row's overflow,
// the stage sticks to the top, and the row slides left as the page scrolls down, each
// panel leaning (skewX, 3° at most) with the speed of the scroll. Below that width, with
// no script, under reduced motion and while editing, the stylesheet makes it a row that
// scrolls sideways (a stack on a phone).
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const WIDE = "(min-width: 64rem)";
const LEAN = 3; // degrees, at most
const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-reel]")) {
    if (running.has(section)) continue;
    const stage = section.querySelector("[data-reel-stage]");
    const track = section.querySelector("[data-reel-track]");
    if (!stage || !track) continue;
    const bar = section.querySelector("[data-reel-progress]");
    const wide = matchMedia(WIDE);
    let stopScroll;
    let frame;
    let x = 0;
    let lastX = 0;
    let lean = 0;

    const panels = () => [...track.children];
    const unpin = () => {
      stopScroll?.();
      stopScroll = undefined;
      if (frame) cancelAnimationFrame(frame);
      frame = undefined;
      section.removeAttribute("data-pinned");
      section.style.height = "";
      track.style.transform = "";
      bar?.style.removeProperty("--progress");
      for (const panel of panels()) panel.style.transform = "";
    };

    const tick = () => {
      const speed = x - lastX;
      lastX = x;
      const target = Math.max(-LEAN, Math.min(LEAN, speed * 0.12));
      lean += (target - lean) * 0.14;
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      const skew = Math.abs(lean) < 0.01 ? "" : `skewX(${lean.toFixed(2)}deg)`;
      for (const panel of panels()) panel.style.transform = skew;
      frame = requestAnimationFrame(tick);
    };

    const pin = () => {
      unpin();
      if (!wide.matches) return;
      section.setAttribute("data-pinned", "");
      const last = track.lastElementChild;
      // A stage held in place by someone else (an inline position, as a full-page
      // capture does) cannot stick: leave the row as it is with no script.
      if (!last || getComputedStyle(stage).position !== "sticky") return unpin();
      const end = last.getBoundingClientRect().right - track.getBoundingClientRect().left;
      const padding = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const distance = Math.max(0, end + padding - track.clientWidth);
      section.style.height = `${stage.offsetHeight + distance}px`;
      x = lastX = 0;
      stopScroll = Motion.scroll(
        (progress) => {
          x = -distance * progress;
          bar?.style.setProperty("--progress", progress.toFixed(4));
        },
        { target: section, offset: ["start start", "end end"] },
      );
      frame = requestAnimationFrame(tick);
    };

    let pending;
    const later = () => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(pin);
    };
    pin();
    wide.addEventListener("change", later);
    window.addEventListener("resize", later);
    // Images arriving late change the panels' heights, so measure again once they are in.
    for (const image of track.querySelectorAll("img"))
      if (!image.complete) image.addEventListener("load", later, { once: true });
    // The moment the stage is held in place from outside, give the page its plain height
    // back, before anything measures it.
    const held = new MutationObserver(() => {
      if (stage.style.position && section.hasAttribute("data-pinned")) unpin();
    });
    held.observe(stage, { attributes: true, attributeFilter: ["style"] });

    running.set(section, () => {
      held.disconnect();
      cancelAnimationFrame(pending);
      wide.removeEventListener("change", later);
      window.removeEventListener("resize", later);
      unpin();
    });
  }
}

export function stop(root) {
  for (const section of within(root, "[data-reel]")) {
    running.get(section)?.();
    running.delete(section);
  }
}
