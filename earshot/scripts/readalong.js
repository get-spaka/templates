// The read-along (data-readalong on a quote's text): its words light up one after another at
// the pace of speech, a caption marker sliding under the word being spoken, while the speaker's
// meter (data-level, in the same figure or line) moves. It plays once as it comes into view;
// pointing at a played quote, or focusing it, plays it again.
// The conversation (data-conversation on a container, data-turn="<speaker>" on each line,
// data-voice="<speaker>" on each portrait): its lines play one after another, and the portrait
// of whoever speaks gets data-speaking.
// With no script, under reduced motion and while editing, every word is simply there.
import { inView } from "motion";
import Splitting from "splitting";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DIM = "0.4";
let stops = [];

/** How long a word stays current: 110 ms plus 55 ms a letter, longer after a comma or a period. */
const duration = (word) => {
  const text = word.textContent.trim();
  let ms = 110 + 55 * text.replace(/[^\p{L}\p{N}]/gu, "").length;
  if (/[,;:]["'”’)]*$/.test(text)) ms += 250;
  else if (/[.?!…—–-]["'”’)]*$/.test(text)) ms += 450;
  return ms;
};

/** Splits a read-along into words, dims them, and keeps what to put back. */
function prepare(el) {
  const kept = { html: el.innerHTML, className: el.getAttribute("class"), style: el.getAttribute("style") };
  const words = Splitting({ target: el, by: "words" })[0]?.words ?? [];
  for (const word of words) word.style.opacity = DIM;
  const holder = el.closest("figure, [data-turn]") ?? el.parentElement;
  return { el, words, kept, level: holder?.querySelector("[data-level]"), timers: [], playing: false, played: false };
}

function cancel(item) {
  for (const timer of item.timers) clearTimeout(timer);
  item.timers = [];
  item.playing = false;
}

function restore(item) {
  cancel(item);
  const { el, kept } = item;
  el.innerHTML = kept.html;
  for (const [name, value] of [
    ["class", kept.className],
    ["style", kept.style],
  ])
    value === null ? el.removeAttribute(name) : el.setAttribute(name, value);
  el.removeAttribute("data-playing");
  el.removeAttribute("data-jump");
  item.level?.removeAttribute("data-speaking");
}

/** Places the marker (the element's ::before) behind a word. */
function mark(item, word) {
  const pad = parseFloat(getComputedStyle(item.el).fontSize) * 0.12;
  const s = item.el.style;
  // A new line: the marker jumps there rather than sliding across the text.
  const top = `${word.offsetTop}px`;
  if (s.getPropertyValue("--my") && s.getPropertyValue("--my") !== top) {
    item.el.setAttribute("data-jump", "");
    requestAnimationFrame(() => requestAnimationFrame(() => item.el.removeAttribute("data-jump")));
  }
  s.setProperty("--mx", `${word.offsetLeft - pad}px`);
  s.setProperty("--my", `${word.offsetTop}px`);
  s.setProperty("--mw", `${word.offsetWidth + pad * 2}px`);
  s.setProperty("--mh", `${word.offsetHeight}px`);
}

/** Plays a read-along, then calls done. */
function play(item, done = () => {}) {
  cancel(item);
  const { el, words } = item;
  if (!words.length) return done();
  item.playing = true;
  for (const word of words) word.style.opacity = DIM;
  el.setAttribute("data-playing", "");
  item.level?.setAttribute("data-speaking", "");
  let at = 0;
  words.forEach((word, i) => {
    item.timers.push(
      setTimeout(() => {
        words[i - 1]?.removeAttribute("data-now");
        word.style.opacity = "1";
        word.setAttribute("data-now", "");
        mark(item, word);
      }, at),
    );
    at += duration(word);
  });
  item.timers.push(
    setTimeout(() => {
      words.at(-1)?.removeAttribute("data-now");
      el.removeAttribute("data-playing");
      item.level?.removeAttribute("data-speaking");
      item.playing = false;
      item.played = true;
      done();
    }, at),
  );
}

export function start(root) {
  if (reduced()) return;

  for (const talk of within(root, "[data-conversation]")) {
    const lines = [...talk.querySelectorAll("[data-turn]")]
      .map((line) => ({ line, text: line.querySelector("[data-readalong]") }))
      .filter(({ text }) => text)
      .map((entry) => ({ ...entry, item: prepare(entry.text) }));
    if (!lines.length) continue;
    let timer;
    const voices = () => talk.querySelectorAll("[data-voice]");
    const quiet = () => {
      for (const voice of voices()) voice.removeAttribute("data-speaking");
    };
    const run = (i) => {
      quiet();
      if (i >= lines.length) {
        talk.removeAttribute("data-live");
        return;
      }
      talk.setAttribute("data-live", "");
      const turn = lines[i].line.dataset.turn;
      for (const voice of voices()) if (voice.dataset.voice === turn) voice.setAttribute("data-speaking", "");
      play(lines[i].item, () => {
        quiet();
        timer = setTimeout(() => run(i + 1), 450);
      });
    };
    const stopView = inView(
      talk,
      () => {
        stopView();
        timer = setTimeout(() => run(0), 250);
      },
      { amount: 0.35 },
    );
    stops.push(() => {
      stopView();
      clearTimeout(timer);
      quiet();
      talk.removeAttribute("data-live");
      for (const { item } of lines) restore(item);
    });
  }

  for (const el of within(root, "[data-readalong]")) {
    if (el.closest("[data-conversation]")) continue;
    const item = prepare(el);
    const holder = el.closest("figure") ?? el;
    const again = () => {
      if (item.played && !item.playing) play(item);
    };
    const stopView = inView(
      el,
      () => {
        stopView();
        play(item);
      },
      { amount: 0.6 },
    );
    holder.addEventListener("pointerenter", again);
    holder.addEventListener("focusin", again);
    stops.push(() => {
      stopView();
      holder.removeEventListener("pointerenter", again);
      holder.removeEventListener("focusin", again);
      restore(item);
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
