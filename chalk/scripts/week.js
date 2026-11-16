// The week (data-week): the script marks today's column (data-today) and draws a
// "now" line across it at the current time; on a phone, it opens today in the day
// picker. With no script and in edit mode, the whole week, Monday open on a phone:
// the picker is radio buttons and works without it.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

let undo = [];

export function start(root) {
  const now = new Date();
  const today = DAYS[now.getDay()];
  const hour = now.getHours() + now.getMinutes() / 60;
  for (const week of within(root, "[data-week]")) {
    const column = week.querySelector(`[data-day="${today}"]`);
    if (column) {
      column.setAttribute("data-today", "");
      undo.push(() => column.removeAttribute("data-today"));
      const hours = column.querySelector(".week-hours");
      if (hours && hour >= 6 && hour < 22) {
        const line = document.createElement("span");
        line.className = "week-now";
        line.setAttribute("aria-hidden", "true");
        line.style.setProperty("--now", hour.toFixed(2));
        hours.append(line);
        undo.push(() => line.remove());
      }
    }
    const radio = week.querySelector(`input[type="radio"][value="${today}"]`);
    if (radio && !radio.checked) {
      const was = week.querySelector('input[type="radio"]:checked');
      radio.checked = true;
      undo.push(() => {
        if (was) was.checked = true;
      });
    }
  }
}

export function stop() {
  for (const step of undo) step();
  undo = [];
}
