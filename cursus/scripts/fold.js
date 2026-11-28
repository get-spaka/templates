// The résumé's fold. The state is CSS (the "length" radios of [data-fold-switch]); this module
// animates the change, opens /resume#one-page folded, and counts the sheet's pages for the toolbar.
import { animate } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const paper = () => matchMedia("(min-width: 64rem)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.65, 0, 0.35, 1];
let stops = [];

/** The blocks that move, none inside another: the head, labels, entries and rows of the sheet. */
const MOVING = "[data-sheet-body] > header, .sheet-label, .sheet-sublabel, .sheet-text, .entry, .sheet-row";
/** What may close or open: the blocks, and what folds inside them. */
const FOLDING = `${MOVING}, [data-fold], [data-fold-detail], [data-points] > li`;
const tracked = (sheet) => [...sheet.querySelectorAll(FOLDING)];
const shown = (el) => el.getClientRects().length > 0;

function measure(sheet) {
  const map = new Map();
  for (const el of tracked(sheet)) if (shown(el)) map.set(el, el.getBoundingClientRect());
  return { items: map, height: sheet.getBoundingClientRect().height };
}

function count(sheet, toolbarSlot) {
  if (!paper()) {
    delete sheet.dataset.pages;
    return;
  }
  const body = sheet.querySelector("[data-sheet-body]");
  const page = sheet.querySelector(".page-end");
  if (!body || !page) return;
  // One page of text is the distance from the body's top to the first page end, as zoomed.
  const top = body.getBoundingClientRect().top;
  const perPage = page.getBoundingClientRect().top - top;
  if (perPage <= 0) return;
  const pages = Math.max(1, Math.ceil(body.getBoundingClientRect().height / perPage - 0.01));
  sheet.dataset.pages = String(pages);
  if (toolbarSlot) toolbarSlot.textContent = String(pages);
}

export function start(root) {
  for (const control of within(root, "[data-fold-switch]")) {
    const sheet = document.querySelector("[data-sheet]:not([data-sheet='one'])");
    if (!sheet) continue;
    const slot = document.querySelector("[data-count='more'] [data-slot='pages']");
    const radios = [...control.querySelectorAll("input[name='length']")];
    const one = radios.find((r) => r.value === "one");
    let animations = [];
    let timer;

    if (location.hash === "#one-page" && one) one.checked = true;

    const settle = () => {
      for (const a of animations) a.cancel?.();
      animations = [];
      clearTimeout(timer);
      sheet.style.height = "";
      sheet.style.overflow = "";
      for (const el of tracked(sheet)) {
        el.style.transform = "";
        el.style.opacity = "";
      }
    };

    const onChange = async (event) => {
      const now = event.target.value;
      const before = now === "one" ? "full" : "one";
      history.replaceState(null, "", now === "one" ? "#one-page" : location.pathname + location.search);
      settle();
      if (reduced()) {
        count(sheet, slot);
        return;
      }
      // What was there, held in the former state while it is measured.
      sheet.dataset.hold = before;
      const first = measure(sheet);
      if (now === "one") {
        // The closing points and entries fade out first, still in place.
        const leaving = [...first.items.keys()];
        delete sheet.dataset.hold;
        const last = measure(sheet);
        const gone = leaving.filter((el) => !last.items.has(el));
        sheet.dataset.hold = before;
        await Promise.all(
          gone.map((el) => animate(el, { opacity: [1, 0] }, { duration: 0.2, ease: "easeOut" }).finished),
        );
        for (const el of gone) el.style.opacity = "";
      }
      delete sheet.dataset.hold;
      const last = measure(sheet);
      // Rects are measured as zoomed; a transform or a height inside the sheet is in its own units.
      const zoom = Number.parseFloat(getComputedStyle(sheet).zoom) || 1;
      // Every element still shown moves from where it was to where it is now; the sheet shrinks or grows.
      // What opens fades in, only the outermost of what appeared.
      const appeared = [...last.items.keys()].filter((el) => !first.items.has(el));
      const outermost = new Set(appeared.filter((el) => !appeared.some((o) => o !== el && o.contains(el))));
      for (const [el, rect] of last.items) {
        const was = first.items.get(el);
        if (!was) {
          if (!outermost.has(el)) continue;
          el.style.opacity = "0";
          animations.push(animate(el, { opacity: [0, 1] }, { duration: 0.3, delay: 0.3, ease: "easeOut" }));
          continue;
        }
        if (!el.matches(MOVING)) continue;
        const dy = (was.top - rect.top) / zoom;
        if (Math.abs(dy) < 0.5) continue;
        el.style.transform = `translateY(${dy}px)`;
        animations.push(animate(el, { y: [dy, 0] }, { duration: 0.45, ease: EASE }));
      }
      sheet.style.overflow = "clip";
      animations.push(
        animate(
          sheet,
          { height: [`${first.height / zoom}px`, `${last.height / zoom}px`] },
          { duration: 0.45, ease: EASE },
        ),
      );
      const done = animations.map((a) => a.finished);
      Promise.all(done)
        .then(() => {
          // Motion writes its last values just after it finishes: clear them a moment later.
          timer = setTimeout(() => {
            settle();
            count(sheet, slot);
          }, 80);
        })
        .catch(() => {});
    };

    for (const radio of radios) radio.addEventListener("change", onChange);
    const observer = new ResizeObserver(() => count(sheet, slot));
    observer.observe(sheet);
    count(sheet, slot);

    stops.push(() => {
      for (const radio of radios) radio.removeEventListener("change", onChange);
      observer.disconnect();
      settle();
      delete sheet.dataset.pages;
      delete sheet.dataset.hold;
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
