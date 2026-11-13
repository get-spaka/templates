// Review rows (data-marquee): the cards are copied as many times as the row needs to loop
// seamlessly, then the row is marked data-looping, which the stylesheet sets drifting (the
// second row, data-reverse, the other way) and pauses on hover or focus. With no script,
// under reduced motion and while editing, they are rows that scroll sideways.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const SPEED = 36; // pixels a second
const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const row of within(root, "[data-marquee]")) {
    const track = row.firstElementChild;
    if (running.has(row) || !track || !track.children.length) continue;
    const originals = [...track.children];
    const copies = [];
    const copy = () => {
      for (const item of originals) {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.inert = true;
        track.append(clone);
        copies.push(clone);
      }
    };
    copy();
    // One set's width, gaps included: from the first card to its first copy.
    const width = copies[0].offsetLeft - originals[0].offsetLeft;
    if (width <= 0) {
      for (const c of copies) c.remove();
      continue;
    }
    while (track.scrollWidth < row.clientWidth + width * 1.05) copy();
    track.style.setProperty("--loop", `${-width}px`);
    track.style.setProperty("--loop-time", `${(width / SPEED).toFixed(1)}s`);
    row.setAttribute("data-looping", "");
    running.set(row, () => {
      for (const c of copies) c.remove();
      row.removeAttribute("data-looping");
      track.style.removeProperty("--loop");
      track.style.removeProperty("--loop-time");
    });
  }
}

export function stop(root) {
  for (const row of within(root, "[data-marquee]")) {
    running.get(row)?.();
    running.delete(row);
  }
}
