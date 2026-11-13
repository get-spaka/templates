// The name stretches (data-stretch): Splitting cuts it into letters, each with its own
// width (--wdth, read by font-stretch). When the page opens they grow from width 50 to
// the name's own width one after another; then, with a mouse, the letters nearest the
// cursor widen while the others narrow so the word keeps its length; on a phone, the
// name narrows as the poster scrolls away. The heading's text is put back as written
// when the script stops, and with no script it is plain text at its own width.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const MIN = 50;
const MAX = 150;
const PUSH = 30; // how much wider the letters under the cursor get, at most
const clamp = (v) => Math.min(MAX, Math.max(MIN, v));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const heading of within(root, "[data-stretch]")) {
    if (running.has(heading)) continue;
    const written = heading.innerHTML;
    const rest = Number(getComputedStyle(heading).getPropertyValue("--wdth")) || 100;
    const [result] = Splitting({ target: heading, by: "chars" });
    if (!result) continue;
    const chars = result.chars;
    const opened = performance.now();
    const state = chars.map(() => ({ now: MIN, push: 0 }));
    for (const char of chars) char.style.setProperty("--wdth", String(MIN));
    let base = rest;
    let pointer;
    let frame;
    let alive = true;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onLeave = () => {
      pointer = undefined;
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    const stopScroll = fine
      ? undefined
      : Motion.scroll(
          (progress) => {
            base = rest - (rest - 60) * progress;
          },
          { target: heading.closest("section") ?? heading, offset: ["start start", "end start"] },
        );

    const tick = (time) => {
      if (!alive) return;
      // The pull of the cursor on each letter, close to 1 under it, 0 far away.
      let pulls = chars.map(() => 0);
      const box = heading.getBoundingClientRect();
      if (pointer && pointer.y > box.top - 160 && pointer.y < box.bottom + 160) {
        pulls = chars.map((char) => {
          const r = char.getBoundingClientRect();
          const dx = (r.left + r.width / 2 - pointer.x) / Math.max(120, box.width * 0.12);
          const dy = (r.top + r.height / 2 - pointer.y) / Math.max(160, r.height * 1.4);
          return Math.exp(-(dx * dx + dy * dy));
        });
      }
      const mean = pulls.reduce((a, b) => a + b, 0) / pulls.length;
      chars.forEach((char, i) => {
        // On load: each letter grows from width 50, one after another.
        const t = Math.min(1, Math.max(0, (time - opened - 120 - i * 55) / 750));
        const eased = 1 - (1 - t) ** 3;
        const target = MIN + (base - MIN) * eased;
        const s = state[i];
        s.push += ((pulls[i] - mean) * PUSH * 2.2 - s.push) * 0.12;
        const value = clamp(target + s.push);
        if (Math.abs(value - s.now) > 0.05) {
          s.now = value;
          char.style.setProperty("--wdth", value.toFixed(1));
        }
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    running.set(heading, () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      stopScroll?.();
      heading.innerHTML = written;
      heading.classList.remove("splitting");
      for (const name of ["--word-total", "--char-total"]) heading.style.removeProperty(name);
    });
  }
}

export function stop(root) {
  for (const heading of within(root, "[data-stretch]")) {
    running.get(heading)?.();
    running.delete(heading);
  }
}
