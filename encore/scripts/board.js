// data-board: the shows on a departure board. Each cell (data-flap) is split into letters,
// which the stylesheet turns into tiles once the board has data-board-on; when the board comes
// into view (or on load, with data-board="load"), each tile flips through a few letters before
// its own, left to right, a row after the other. The page's text never changes: only each
// tile's data-glyph does, which a ::before shows over the letter while it flips.
// With no script, while editing and under reduced motion, each cell is a plain strip.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const ROW_GAP = 80; // ms between rows
const ROW_TIME = 900; // ms for a row, left to right
const STEP = 60; // ms a letter shows while flipping

let stops = [];

const random = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function flip(char, delay, timers) {
  const steps = 3 + Math.floor(Math.random() * 6); // three to eight letters before its own
  char.setAttribute("data-glyph", random());
  for (let i = 0; i <= steps; i++) {
    timers.push(
      setTimeout(
        () => {
          if (i < steps) char.setAttribute("data-glyph", random());
          else char.removeAttribute("data-glyph");
          Motion.animate(char, { rotateX: [-80, 0] }, { duration: STEP / 1000, ease: "easeOut" });
        },
        delay + i * STEP,
      ),
    );
  }
}

export function start(root) {
  if (reduced()) return;
  for (const board of within(root, "[data-board]")) {
    const rows = [...board.querySelectorAll("[data-board-row]")];
    if (board.matches("[data-board-row]")) rows.unshift(board);
    const cells = [...board.querySelectorAll("[data-flap]")];
    const kept = cells.map((cell) => cell.innerHTML);
    const labelled = rows.map((row) => [row, row.getAttribute("aria-label")]);
    // The row is read whole, from its own text.
    for (const row of rows) row.setAttribute("aria-label", row.textContent.replace(/\s+/g, " ").trim());
    for (const cell of cells) Splitting({ target: cell, by: "chars" });
    board.setAttribute("data-board-on", "");

    const timers = [];
    const play = () => {
      rows.forEach((row, r) => {
        const chars = [...row.querySelectorAll("[data-flap] .char")];
        chars.forEach((char, i) => {
          const at = r * ROW_GAP + (chars.length > 1 ? (i / (chars.length - 1)) * (ROW_TIME - 8 * STEP) : 0);
          flip(char, at, timers);
        });
      });
    };
    // Every tile shows another letter until its turn comes.
    for (const char of board.querySelectorAll("[data-flap] .char")) char.setAttribute("data-glyph", random());
    let stopView = () => {};
    if (board.getAttribute("data-board") === "load") timers.push(setTimeout(play, 250));
    else stopView = Motion.inView(board, play, { amount: 0.05 });

    stops.push(() => {
      stopView();
      for (const t of timers) clearTimeout(t);
      board.removeAttribute("data-board-on");
      cells.forEach((cell, i) => {
        cell.innerHTML = kept[i];
        cell.classList.remove("splitting", "chars", "words");
        cell.style.removeProperty("--char-total");
        cell.style.removeProperty("--word-total");
      });
      for (const [row, label] of labelled) {
        if (label === null) row.removeAttribute("aria-label");
        else row.setAttribute("aria-label", label);
      }
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
