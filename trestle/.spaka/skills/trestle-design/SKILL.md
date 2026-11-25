---
name: trestle-design
description: The Trestle template's design notes — read before changing this site's pages, sections, styles or projects.
---

# Trestle

A joiner's drawing laid over the work: calm, light type on a limewash page, fine dimension lines drawn along the photos with their figures in a small mono, each project before and after under one line the visitor moves. Quiet and exact, like the work: few colors, thin rules, nothing loud.

## Type

- Chivo for headings and text, Chivo Mono for everything a drawing would letter: labels, specs, captions, dimensions, minutes, weeks and large figures. Both are files of the site (`fonts/`), declared in `styles/site.css`.
- Headings are sentence case and never bold: `font-light` at display sizes (a page title `text-[clamp(2.75rem,6vw,5.5rem)] font-light`, a section heading `text-4xl font-light md:text-6xl`), regular weight below 2.5 rem. The stylesheet gives them their tight leading and tracking.
- `mono`: the small mono capitals for an eyebrow above a heading, a spec line, a caption. Use it on a `<p>` or a `<span>`: `<p class="mono text-base-content/70">What we do</p>`. Never the daisyUI `label` class for this.
- `figure`: a large mono figure in light weight (a project's weeks, the workshop's figures, a step's number): `<p class="figure text-6xl">11</p>`.
- Body text is `text-lg text-base-content/80`, never smaller than `text-sm`.

## Color and shape

- Limewash (`bg-base-100`) for most sections, separated by a hairline (`border-t border-base-300`); raw plaster (`bg-base-200`) for spec cells, the form's panel and a quiet section.
- One band of each color per page at most: bog oak (`bg-neutral`) for the before and after band and the footer; pale sage (`bg-secondary`) for the area served; olive (`bg-primary`) for the request band at the foot of each page.
- Raw oak (`accent`) marks lines, ticks, the scribe's handle, the stars and the booking dot. On limewash it is for lines and large figures only, never small text; on bog oak it may be text.
- Corners are an eased arris (`--theme-radius: 0.125rem`), never rounded; relief is off. Photos are square-cornered, mostly tall (`aspect-[3/4]`, `aspect-[4/5]`) or 3:2 for the before and after.
- Every color comes from the theme: the lines, rings and rulers are drawn from it too, so the Theme tab restyles all of it.

## Effects, and the attribute that turns each on

Each is turned on by an attribute, so a new section can have it. In edit mode nothing moves and everything is drawn; under reduced motion likewise.

- `data-reveal` on a section's main elements: they rise a little into view (`scripts/reveal.js`). Put it on each new section's heading block and on each card.
- `data-measure`: a dimension line, a fine line with a tick at each end and its text in the middle (`<p data-measure class="text-base-content/70">11 weeks</p>`). `data-measure="side"` stands it up along a photo's side, its text reading from the bottom. Empty (`<span data-measure class="w-16" aria-hidden="true"></span>`), it is a short ruled mark before a name. It draws from its middle as it comes into view (`scripts/draw.js`); `data-measure-on="load"` makes it draw once on load instead (the hero's).
- `data-scribe` on a `<figure>` holding `data-scribe-frame`, then a `<figure data-scribe-before>` (its `<img data-before>` and a "Before" caption) and a `<figure data-scribe-after>` (its image and an "After" caption): the house before and after. With `data-same-view` (from the project's "same spot" box), the script lays the after over the before under a line with a raw-oak handle that the visitor drags or moves with the arrow keys, after one sweep from the house as found to the middle. Its accessible name is the figure's `data-scribe-label`. Without `data-same-view` the two stand side by side. Both photos must have the same proportions (`aspect-[3/2]` or `aspect-[4/3]`).
- `[data-before]` on any image shows it a little faded: the house as found.
- `data-rings`: the area served as rings of 15, 30 and 45 minutes (`.rings-ring` with `style="--ring: 15"`), each town a `.rings-town` placed by `style="--min: 25; --deg: 60"` (minutes from the workshop, compass bearing: 0 north, 90 east). The 45-minute ring is the outer edge: a town farther than 45 minutes falls outside it. The rings grow and the towns appear nearest first as it comes into view.
- `data-ruler`: a tape measure. `class="ruler-steps"` on an `<ol>` spaces its `<li>` steps evenly along it (`style="--steps: 5"` on the list, `--step: 0…` on each), across from 1024 px, down the side on a phone. `class="ruler-weeks"` places a project's stages at their week (`style="--weeks: 11"` on the list, `--week: 3` on each). It draws itself as it comes into view.
- `data-hairline` on the header: its hairline below appears once the page is scrolled.
- The header is sticky; its top strip (phone, area, hours) scrolls away and the navigation stays.
- The work page's type chips are radio buttons in a `data-filter` section; each project card carries `data-kind`. `styles/site.css` holds one rule per type (kitchen, built-ins, stairs-doors, windows, porch, whole-house): a new type needs a chip and a rule there.
- Smooth scrolling runs on every page by itself (`scripts/smooth-scroll.js`).
- Nothing is hidden by the stylesheet: a script hides what it animates only once it starts. Keep it so in new styles.

## Lists

- `projects`: one page each at `/work/<id>`. `kind` is one of the six types (the filter and the services page match on it); `featured` puts a project on the home page (four at most); `same_view` says the before and after photos were taken from the same spot, which turns the slider on and lets the home page's band choose it (the first such project, else the first project). `stages` are texts "week · stage" ("3 · Cabinets begun at the bench"), the last at the project's `weeks`; keep stages at least a week apart, two weeks on a long job. The story is the record's text, in three parts under `##` headings.
- `services`: `made` is `workshop` or `on site` (the home page's two columns), `kind` as the projects' (the services page shows up to three projects of that kind), `included` a list of short lines.
- `area`: sorted by minutes; the first town is the workshop's, drawn at the center in raw oak with 0 minutes.
- `process`: the steps of the ruler, on the home and request pages. `testimonials`: newest first; the first is the home page's long quote.
- `hours` feeds the footer and the request page; `home-figures` the home page's figures; `team`, `workshop-story`, `workshop-woods` and `credentials` the workshop page; `services-faq` the questions.
- `quote-requests` collects the request form; its answer is `fragments/quote-thanks.liquid`.

## Rules for the site's whole life

- Show a house before and after wherever the maker has both photos; turn `same_view` on only when they were taken from the same spot, or the slider shows two rooms cut together.
- Keep one dimension line per photo or figure, with a real measure (a length, weeks, a year): never decoration on every element.
- No stock contractor pictures (hard hats, handshakes, posed tools), no badges or "free quote" bursts, no chat button, no map embed.
- Every "Request a visit" button points to `/quote#request`.
