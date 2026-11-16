// Look closer (data-look on a link to the image's file): opens the image instead in the page's
// full-screen dialog ([data-look-dialog]) on night, at the file's full size, panned by dragging
// or scrolling. Escape or the close button closes it, focus returns to the link, and smooth
// scrolling stops while it is open. With no script, the link opens the image itself.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

function setUp(link, dialog) {
  const pan = dialog.querySelector("[data-look-pan]");
  if (!pan) return;
  // The picture is the script's own: the dialog holds no image while nothing is open.
  const made = !pan.querySelector("img");
  const img = pan.querySelector("img") || pan.appendChild(document.createElement("img"));

  const open = (event) => {
    event.preventDefault();
    img.src = link.getAttribute("href");
    // The alternative text Upstart gave the same image on the page.
    const same = [...document.images].find((i) => i !== img && i.getAttribute("src") === link.getAttribute("href"));
    img.alt = same?.alt || "";
    dialog.showModal();
    document.dispatchEvent(new Event("plinth:hold"));
    const center = () => {
      pan.scrollLeft = (pan.scrollWidth - pan.clientWidth) / 2;
      pan.scrollTop = (pan.scrollHeight - pan.clientHeight) / 2;
    };
    if (img.complete) center();
    else img.addEventListener("load", center, { once: true });
  };
  const onClose = () => {
    document.dispatchEvent(new Event("plinth:release"));
    link.focus();
  };

  // Drag to pan.
  let drag = null;
  const down = (event) => {
    if (event.button !== 0 || event.target.closest("button")) return;
    drag = { x: event.clientX, y: event.clientY, left: pan.scrollLeft, top: pan.scrollTop };
    pan.classList.add("is-dragging");
    pan.setPointerCapture(event.pointerId);
  };
  const move = (event) => {
    if (!drag) return;
    pan.scrollLeft = drag.left - (event.clientX - drag.x);
    pan.scrollTop = drag.top - (event.clientY - drag.y);
  };
  const up = () => {
    drag = null;
    pan.classList.remove("is-dragging");
  };
  const noDrag = (event) => event.preventDefault();

  link.addEventListener("click", open);
  dialog.addEventListener("close", onClose);
  pan.addEventListener("pointerdown", down);
  pan.addEventListener("pointermove", move);
  pan.addEventListener("pointerup", up);
  pan.addEventListener("pointercancel", up);
  img.addEventListener("dragstart", noDrag);

  stops.push(() => {
    link.removeEventListener("click", open);
    dialog.removeEventListener("close", onClose);
    pan.removeEventListener("pointerdown", down);
    pan.removeEventListener("pointermove", move);
    pan.removeEventListener("pointerup", up);
    pan.removeEventListener("pointercancel", up);
    img.removeEventListener("dragstart", noDrag);
    if (dialog.open) dialog.close();
    if (made) img.remove();
  });
}

export function start(root) {
  const dialog = document.querySelector("[data-look-dialog]");
  if (!dialog?.showModal) return;
  for (const link of within(root, "[data-look]")) setUp(link, dialog);
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
