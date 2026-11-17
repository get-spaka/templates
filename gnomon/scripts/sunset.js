// Sunset today: data-sunset holds the studio's place (data-lat, data-lng, data-tz).
// The script works out today's sunset there with the usual solar formula, writes
// the time into [data-sunset-time] and shows the sunset line ([data-sunset-line])
// in place of the line written in the page ([data-sunset-plain]). Both lines are
// the page's own text; with no script the plain line stays.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const rad = Math.PI / 180;

/** Today's sunset at a place, as a Date, or null where the sun does not set. */
export function sunset(date, lat, lng) {
  const day = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const n = Math.round((day - Date.UTC(2000, 0, 1, 12)) / 86400000);
  const jStar = n - lng / 360;
  const m = (357.5291 + 0.98560028 * jStar) % 360;
  const c = 1.9148 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 0.0003 * Math.sin(3 * m * rad);
  const lambda = (m + c + 180 + 102.9372) % 360;
  const transit = 2451545 + jStar + 0.0053 * Math.sin(m * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const decl = Math.asin(Math.sin(lambda * rad) * Math.sin(23.4397 * rad));
  const cosW = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(decl)) / (Math.cos(lat * rad) * Math.cos(decl));
  if (cosW < -1 || cosW > 1) return null;
  const set = transit + Math.acos(cosW) / rad / 360;
  return new Date((set - 2440587.5) * 86400000);
}

const kept = [];

export function start(root) {
  for (const el of within(root, "[data-sunset]")) {
    const lat = Number(el.dataset.lat);
    const lng = Number(el.dataset.lng);
    const slot = el.querySelector("[data-sunset-time]");
    const line = el.querySelector("[data-sunset-line]");
    const plain = el.querySelector("[data-sunset-plain]");
    if (!slot || !line || !Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const when = sunset(new Date(), lat, lng);
    if (!when) continue;
    let time;
    try {
      time = new Intl.DateTimeFormat(document.documentElement.lang || "en", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: el.dataset.tz || undefined,
      }).format(when);
    } catch {
      continue;
    }
    kept.push({ slot, text: slot.textContent, line, plain });
    slot.textContent = time.replace(/\s?([AP])M$/i, (_, p) => ` ${p.toLowerCase()}m`);
    line.hidden = false;
    if (plain) plain.hidden = true;
  }
}

export function stop() {
  for (const { slot, text, line, plain } of kept.splice(0)) {
    slot.textContent = text;
    line.hidden = true;
    if (plain) plain.hidden = false;
  }
}
