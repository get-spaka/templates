// The index of projects (data-index, its rows data-index-row with the image in
// data-image). With a mouse, the hovered row's own image follows the cursor,
// tilting a little with its movement, and the rows' thumbnails step aside;
// on a touch screen, the row nearest the middle of the screen is marked data-current.
// Without this script every row shows its thumbnail.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const mouse = () => matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let undo = [];

function follow(index) {
  const figure = document.createElement("figure");
  figure.className = "folio-preview";
  figure.setAttribute("aria-hidden", "true");
  const img = document.createElement("img");
  img.alt = "";
  figure.style.opacity = "0";
  figure.append(img);
  document.body.append(figure);
  index.setAttribute("data-previewing", "");
  const thumbs = [...index.querySelectorAll("[data-thumb]")];
  for (const thumb of thumbs) thumb.style.visibility = "hidden";

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let at = { x, y, tilt: 0 };
  let frame = 0;
  let shown = false;
  const tick = () => {
    const dx = x - at.x;
    at = {
      x: at.x + dx * 0.16,
      y: at.y + (y - at.y) * 0.16,
      tilt: at.tilt + (Math.max(-8, Math.min(8, dx * 0.08)) - at.tilt) * 0.12,
    };
    figure.style.transform = `translate(${at.x}px, ${at.y}px) translate(-50%, -50%) rotate(${at.tilt}deg)`;
    frame = requestAnimationFrame(tick);
  };
  const move = (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!shown) at = { x, y, tilt: 0 };
  };
  const enter = (event) => {
    const row = event.target.closest("[data-index-row]");
    if (!row?.dataset.image) return;
    img.src = row.dataset.image;
    figure.setAttribute("data-shown", "");
    figure.style.opacity = "1";
    shown = true;
  };
  const leave = (event) => {
    if (event.relatedTarget && index.contains(event.relatedTarget) && event.relatedTarget.closest("[data-index-row]"))
      return;
    figure.removeAttribute("data-shown");
    figure.style.opacity = "0";
    shown = false;
  };
  // The page transition takes the picture under the cursor into the project's page.
  const click = (event) => {
    const row = event.target.closest("[data-index-row]");
    if (row && shown) figure.style.viewTransitionName = `project-${row.dataset.id}`;
  };
  index.addEventListener("pointerover", enter);
  index.addEventListener("pointerout", leave);
  index.addEventListener("click", click);
  addEventListener("pointermove", move, { passive: true });
  frame = requestAnimationFrame(tick);
  undo.push(() => {
    cancelAnimationFrame(frame);
    index.removeEventListener("pointerover", enter);
    index.removeEventListener("pointerout", leave);
    index.removeEventListener("click", click);
    removeEventListener("pointermove", move);
    index.removeAttribute("data-previewing");
    for (const thumb of thumbs) thumb.style.visibility = "";
    figure.remove();
  });
}

function current(index) {
  const rows = [...index.querySelectorAll("[data-index-row]")];
  let frame = 0;
  const mark = () => {
    frame = 0;
    const middle = innerHeight / 2;
    let nearest;
    let distance = Number.POSITIVE_INFINITY;
    for (const row of rows) {
      const box = row.getBoundingClientRect();
      const away = Math.abs(box.top + box.height / 2 - middle);
      if (away < distance && box.bottom > 0 && box.top < innerHeight) [nearest, distance] = [row, away];
    }
    for (const row of rows) row.toggleAttribute("data-current", row === nearest && distance < box(row));
  };
  const box = (row) => Math.max(row.offsetHeight, innerHeight * 0.2);
  const later = () => {
    frame ||= requestAnimationFrame(mark);
  };
  addEventListener("scroll", later, { passive: true });
  addEventListener("resize", later);
  mark();
  undo.push(() => {
    cancelAnimationFrame(frame);
    removeEventListener("scroll", later);
    removeEventListener("resize", later);
    for (const row of rows) row.removeAttribute("data-current");
  });
}

export function start(root) {
  for (const index of within(root, "[data-index]")) {
    if (index.hasAttribute("data-previewing")) continue;
    if (mouse() && !reduced()) follow(index);
    else current(index);
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
