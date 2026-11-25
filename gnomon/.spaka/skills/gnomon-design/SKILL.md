---
name: gnomon-design
description: The Gnomon template's design notes — read before changing this site's pages, sections, styles, projects, the five hours or the brief.
---

# Gnomon

A practice's site lit by one steady sun. The page is a plaster wall; what stands off it (the name, the headings, the main buttons, the photographs' openings) casts a hard earth-brown shadow that turns as the visitor walks past it, and the photographs sit in openings punched through a thick earth wall. Nothing else moves much: the light and the colors of the page never change with the scroll, and no hour is ever tied to it.

## Type

- **Darker Grotesque** for the statement, headings, project names and figures: 800 for a page's `<h1>` (`text-[clamp(3.5rem,11vw,10rem)] leading-[0.86] tracking-[-0.01em]`), 700 for section titles (`text-[clamp(2.75rem,6vw,5rem)] leading-[0.9]`) and names (1.5 to 2.25rem), sentence case, never italic. `class="figure"` (600, even tabular figures) for the hours, years and counts.
- **Instrument Sans** for the text: 1.0625rem, `leading-relaxed`, about 36em wide; leads and clients' words at 1.375 to 1.75rem `leading-snug`. `class="spec"` (width 85, 500, 0.75rem, uppercase, spaced, tabular) for labels, plaques, status and eyebrows. Buttons are 500, sentence case, never uppercase.
- Text written in Markdown (a project's story, a note, an answer) goes in `class="story"`: its `##` heads become small spec heads under a hairline.

## Colors and shapes

- Lime plaster (`bg-base-100`) for most of every page; rammed earth (`bg-base-200`) for the wall of openings, the project photos, the stages and the brief; palo verde (`bg-secondary`) for the five hours only, one band per page at most; monsoon blue (`bg-neutral`) for the brief band and the footer only, each with `class="on-dark"`.
- Adobe brown (`primary`) for buttons, links, the chosen chip and, mixed transparent, every shadow. The low sun (`accent`) only for small marks: the sundial's sun, the "On site" dot, focus rings, the models' sun, the button on monsoon blue; never text on plaster. Ironwood (`base-content`) for text.
- Everything is square (`--theme-radius: 0`): openings, buttons, fields, chips. Hairlines (`border-base-content/25`) rule plaques, lists and figures; no rounded cards, no soft shadows, no gradients.
- Photos: hard low sun, clear skies, earth and plaster walls, deep shade; no people pointing at models, no hard hats, no renderings. A project's photos are the maker's own; with none, the opening stays empty in rammed earth.

## Effects, and what turns each on

Each effect is an attribute or a class, so a new section gets it too. In edit mode, with no scroll-driven animations and under reduced motion, nothing moves: every shadow rests a little to the lower right, every photo still, every stratum settled.

- **The sun's angle**: `--sun` (registered, 0 to 1, resting at 0.35). Every `[data-cast]` and `[data-opening]` element runs its own `--sun` from 0.15 to 0.85 while it crosses the screen (`animation-timeline: view()`), so its shadow is long to the lower right as it comes up, short beneath it mid-screen and long to the lower left as it leaves. `--light` (0 to 1) grows every shadow out of its letters on load (`scripts/cast-in.js`).
- **A cast shadow**: `data-cast` on the statement, a heading, a project name, a large figure or a main button: a hard `drop-shadow` in `--shade` (adobe brown at 30%). Its stand-off is `--cast`: 0.5rem on buttons, 0.1em on `h2`/`h3`, 0.12em on `h1`, `style="--cast: 0.14em"` on a poster-size statement. Never on running text. Inside `class="on-dark"` the shadow is faint and fixed.
- **A deep opening**: `data-opening` on a `<figure>` (or `<div>`) with an aspect class and one `<img>` inside: the wall's thickness inside its edge, the reveal's shadow falling across one or two edges from the sun's side, and the picture shifting a little as you pass. Add `data-cast` to make the opening stand off the wall too. In Liquid: `{% render 'opening', src: …, class: "aspect-[4/3] w-full", cast: true %}`; an empty `src` shows the empty opening.
- **A plaque**: `{% render 'plaque', project: project, thesis: true %}` under an opening: number, place, type, status dot (`class="status-dot" data-status="built|on-site|in-design"`), year, name and idea.
- **The sundial**: `{% render 'sundial' %}`, the header's mark: a disc in rammed earth whose pin's shadow turns with the page's scroll. It shows no hour and no figure; never add a clock or a time beside it.
- **The models**: `{% render 'model', sun: day.sun %}` inside a card with `data-day-card tabindex="0"`: a small solid house in isometric view and its shadow at that hour; no `sun` is night (monsoon blue, one window lit). Hover or focus runs the card's sun through the day.
- **Strata**: `{% render 'strata' %}`, a band of rammed-earth layers that settles as it comes into view; between the parts of a page, never two in a row, and along the footer's top.
- **The project filter** (CSS only): `data-filter` on the section, radios `class="chip-input sr-only" data-n="<n>"` each followed by its `<label class="chip spec">`, and each item with `data-n` listing the chips it belongs to ("1 3"); "All" is `data-n="0"` and checked. Up to six chips.
- **Rises**: `data-rise` on a paragraph or a quote below the first screen rises it into view.
- **The sunset line**: `{% render 'sunset-line' %}`: `scripts/sunset.js` works out today's sunset at the studio's `data-lat`/`data-lng` and writes the time in its `data-tz`; with no script the plain line shows.
- Smooth scrolling (Lenis, light). The header is sticky on plaster; its hairline comes once the page scrolls. No page transitions, no loader, no carousel.

## Lists

- `projects`: `number` ("01"), `type` (house, addition, restoration, public, shade), `status` (built, on-site, in-design), `year`, `area` as written ("2,150 sq ft"), the sun's facts (`faces`, `shade`, `energy`, `walls`), `opening` (tall, square, wide: its shape on the projects page), `cover` and `photo_1` (wide), `photo_2` (narrow), `photo_3` (wide), `photo_4` (narrow); the story in three `##` parts. `featured` puts it on the home page's wall (five fit it best; the first is also the hero's photo).
- `services`: each counts the projects whose `type` is in its `types`; its order is the chips' order.
- `home-day` and `practice-day`: `hour` as written ("3 pm"), `sun` from 0 (sunrise) to 1 (sunset), empty at night.
- `news`: `kind` (Project, Award, Talk, Studio), `project` as a project's id.

## Rules for the site's whole life

- One sun: shadows are always adobe brown, hard, and turn only with the scroll. Never a second color of shadow, a blur, or a background that changes with the scroll.
- Keep palo verde to one band per page and monsoon blue to the brief band and the footer.
- No plans, sections or blueprint lines, no lines drawing themselves, no cursor effects, no giant wordmark in the footer, no italic accent words in headings.
- Never show found photographs as the maker's built work, and never invent a registration, a license number or an award.
