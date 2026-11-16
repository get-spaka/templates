// Fresh and coming down: beside a date written in the page, the script adds how
// long ago or how soon it is, in the page's language. <time datetime="2026-11-13"
// data-since> (a problem's set date) gets "3 days ago", and with data-new="New" a
// tag in the card's [data-new-slot] when it was set within the week; <time
// data-until> (a wall's next reset) gets "in 5 days". With no script, the dates as
// written. The site's own texts are never touched.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));
const DAY = 86400000;

let added = [];

const day = (text) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(text ?? "");
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : undefined;
};

export function start(root) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let words;
  try {
    words = new Intl.RelativeTimeFormat(document.documentElement.lang || "en", { numeric: "auto" });
  } catch {
    words = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  }
  for (const el of within(root, "time[data-since], time[data-until]")) {
    const date = day(el.getAttribute("datetime"));
    if (!date) continue;
    const days = Math.round((date - today) / DAY);
    const since = el.hasAttribute("data-since");
    if (since ? days > 0 : days < 0) continue;
    const note = document.createElement("span");
    note.className = "fresh-note";
    note.textContent = ` · ${words.format(days, "day")}`;
    el.after(note);
    added.push(note);
    const label = el.getAttribute("data-new");
    if (since && label && days > -7) {
      const slot = el.closest("[data-problem], li, article")?.querySelector("[data-new-slot]");
      if (slot) {
        const tag = document.createElement("span");
        tag.className = "tag-new";
        tag.textContent = label;
        slot.append(tag);
        added.push(tag);
      }
    }
  }
}

export function stop() {
  for (const el of added) el.remove();
  added = [];
}
