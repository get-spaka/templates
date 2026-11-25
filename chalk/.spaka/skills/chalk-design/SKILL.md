---
name: chalk-design
description: The Chalk template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Chalk

A climbing gym's site drawn like one of its walls: chalk-white pages and birch-ply panels dotted with bolt holes, chunky holds in the circuit colors bolted onto them, and a violet line that climbs down every page from hold to hold, from START at the top to TOP in the footer, the way a problem is read on the wall. Loud type, plain words, nothing behind glass.

## Type

- Unbounded for headings, figures and buttons; Onest for text; Red Hat Mono (declared as `RedHatMono`) for labels, times, angles and setters. All three are files of the site (`fonts/`), declared in `styles/site.css`.
- Page and section titles are uppercase and heavy: a page title `text-[clamp(2.5rem,7vw,6rem)] uppercase`, a section title `<h2 class="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] uppercase">`. The home hero's headline is one short word a line (`Find<br>your<br>line.`), so it fits a phone. h3 and h4 are sentence case.
- `mono`: small mono capitals for an eyebrow above a heading, a time, a wall's angle, a setter (`<p class="mono text-base-content/70">The walls in section</p>`). On a heading, put it on a `<span>` inside it.
- `numeral`: a grade, a price or a day in Unbounded figures (`<p class="numeral text-6xl">$79</p>`). `display` gives any element the heading face.
- Buttons are pills in Unbounded; keep their labels on one line (`whitespace-nowrap`).

## Color and shape

- Chalk (`bg-base-100`) is the ground. Birch ply with its bolt holes is the class `ply` (the hero, the walls in section, the steps' panel, one panel per page at most besides the hero). Graphite (`bg-neutral`) for the price board and the footer; mint (`bg-accent`) for kids and groups; tape orange (`bg-secondary`) for the header's strip, "New" marks, START and TOP tape and one band at most.
- Violet (`primary`) is the line, the buttons and the purple circuit. It is never small text on ply or graphite: links there are the text color, underlined.
- **The circuits are the theme's colors**: yellow `warning`, green `success`, blue `info`, purple `primary`, red `error`, black `neutral`. A record's `tone` field holds one of these names and the element carries it as `data-tone="info"`; `styles/site.css` turns it into `--tone`, which the holds, tags and timetable blocks read. Never build a class name from a tone in Liquid.
- Corners are `rounded-box` (0.75rem) for cards and panels; buttons and fields are pills; borders are 2px. Photos are cut as climbing volumes: `volume-1` to `volume-4` (four polygon frames), never rounded.
- `data-grade` on every photo: a little more contrast and less color, so the photos read as one set.

## Effects, and the attribute that turns each on

In edit mode no script runs: every hold sits at its place, every wall at its angle, and there is no line. Under reduced motion the route is drawn at once and nothing else moves.

- **A hold**: `<span class="hold" data-tone="info" data-shape="2" style="--hold-size: 3rem; --turn: 20" aria-hidden="true"></span>`. Four shapes (`data-shape` 1 to 4: jug, rail, pinch, sloper), its size and its resting turn in degrees. Put a grade or a figure inside (`<span class="hold" …><span class="numeral text-lg">V4</span></span>`) and the bolt makes way; drop `aria-hidden` then. It turns 6° on hover.
- **The route** (`scripts/line.js`): `data-line` on `<body>` of every page, and `data-hold` on each stop. A stop sits in the gutter beside a section's heading: `<div class="relative"><span data-hold class="stop hold" data-side="left" data-tone="success" data-shape="3" style="--turn: 20" aria-hidden="true"></span>…heading…</div>`, inside the section's `.wrap`. `data-side="right"` puts it in the right gutter from 1024 px (left on smaller screens). Give each new section a stop, alternating sides; the page's first one carries the START tape (`<span class="tape">Start</span>`) and the footer's large hold (`hold hold-top`) is TOP. Never put a stop inside a `data-reveal` element: the line is measured from where the stops stand. The script draws a smooth line through the stops down the gutters, crossing the page in the empty space above a heading, and draws it as the page scrolls; each stop lights up as the line reaches it. A list can carry a short route of its own (`data-line` on the `<ol>`, `data-hold` on each step's hold), like the first-visit steps.
- **Sections stay above the line**: every section's content sits in `<div class="wrap …">`, whose side padding is the gutter the line runs down. Keep it on every new section.
- **Bolted on** (`scripts/bolt.js`): `data-bolt` on a group of holds; they come in one by one, from a quarter turn, as if screwed on. `data-bolt="load"` starts on load (the hero's), the others as they come into view.
- **The walls in section** (`scripts/walls.js`): a `walls-drawing` container with `data-walls`, holding `wall-bay` boxes, each with a `wall-mat` and a `wall-profile` carrying `data-angle="{{ wall.angle }}" style="--angle: {{ wall.angle }}; --feet: 15"`. The angle is CSS (90 is vertical, 75 a slab, 140 a steep cave); the script lets each wall lean from upright to its angle as it comes into view. `walls-drawing-one` draws one wall larger.
- **Fresh** (`scripts/fresh.js`): `<time datetime="2026-11-13" data-since data-new="New">Set Nov 13</time>` gets "3 days ago" beside it, and a "New" tag in the card's `<span data-new-slot></span>` when it is under a week old; `<time … data-until>` gets "in 5 days". The words come in the page's language; `data-new` holds the tag's word.
- **The week** (`scripts/week.js`, `parts/week.liquid`): `data-week` on the timetable. On a phone a day picker of radio buttons shows one day (Monday with no script); from 1024 px seven columns of hours, each session placed by its start and end. The script marks today and draws a "now" line.
- **The set's filter** (walls page): the circuit chips are radio buttons in the `data-set` section; each problem card carries `data-problem data-tone`. It works with no script.
- **Day bars** (`parts/quiet-hours.liquid`, the footer): `day-bar` holding a `day-open` and a `day-busy`, placed by `style="--from-h: 06; --from-m: 00; --to-h: 22; --to-m: 00"` on a 6 am to 10 pm scale.
- `data-reveal`: a section's heading block and cards rise into view (`scripts/reveal.js`).
- Smooth scrolling (Lenis) runs by itself, and pages change with the new page rising from below (CSS view transitions).
- `{% render 'clock', time: session.start %}` prints "18:30" as "6:30 pm".

## Lists

- `walls`: one record per wall, in the order they stand. `angle` in degrees (90 vertical), `height` as text ("15 ft", its number sizes the drawing), `problems`, `last_reset` and `next_reset` dates. The home page draws the first five side by side; the walls page draws them all, and its reset calendar sorts them by `next_reset` and links a reset to the event of kind `night` on that date.
- `problems`: newest first (`sort: -set_on`); `tone` is the circuit, `grade` the text on its hold, `note` the setter's one line. The home page shows the six newest.
- `circuits`: the six colors in order, easiest first, each with its grades and a few words.
- `sessions`: the timetable; `day` is the weekday, `start` and `end` 24-hour text ("07:00", "18:30"), `class` the id of a `classes` record or empty (the youth team, the kids' club, the women and nonbinary night). A class's page lists the sessions whose `class` is its id.
- `classes`: a page each at `/classes/<id>`; `featured` puts one on the home page (four at most).
- `plans`: `kind` is `membership` (giant numerals) or `pass` (the list with leaders); `featured` puts one on the home page's board (three).
- `programs` (kids and groups page, each with its anchor: `/groups#kids-club`), `events` (sorted by date, a page each at `/events/<id>`; `kind` gives its hold's tone), `team` (`role` setter or coach; initials on a hold in its `tone` until a `photo` is added), `hours` (the footer and the quiet hours), and the section lists `home-steps`, `first-visit-steps` (with an optional button), `prices-perks`, `groups-steps` and the four `*-faq`.
- The forms post to `first-visits`, `class-requests`, `memberships`, `group-inquiries`, `event-signups` and `newsletter`, each answered by its fragment in `fragments/`.

## Rules for the site's whole life

- One route per page, from START to TOP: every section with a heading gets a stop, and nothing else is drawn in the gutters.
- Holds are the site's only illustration: no icons, no stickers, no stock fitness photos. Photos show the walls and people climbing, from behind or at a distance.
- Nothing is paid on the site: every form is a request the gym confirms by email, paid at the desk. The waiver is a link to the gym's own waiver page, never a checkbox.
- The hours, busy times and the set are written by the gym, never shown as live.
