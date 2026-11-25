---
name: mend-design
description: The Mend template's design notes — read before changing this site's pages, sections, styles, body areas, first visit steps, fees or forms.
---

# Mend

A practice that explains before it treats. Calm and warm, never clinical: a soft, generous serif on warm white, one deep lake blue, and a terracotta dot that marks where it hurts. A faceless jointed figure, drawn in a fine line like an artist's wooden mannequin, answers the patient's first question ("Can they help with my knee?"); the first visit is an hour divided into its steps; fees and insurance are said plainly. Motion is quiet: a joint moving at the pace of an exercise, a slow breath, an hour that fills in, soft reveals.

## Type

- **Young Serif** for headings, the name and large figures. It has one weight (400) and no italic: never `font-bold` or `italic` on a heading, never italic accent words. Sentence case. A page title is `text-[clamp(2.5rem,4vw+1rem,4.5rem)] leading-[1.05] tracking-[-0.015em] text-balance` (the home page's `<h1>` goes to 5rem); a section title `text-[clamp(1.875rem,2.5vw+1rem,3rem)] leading-[1.1]`; small headings `text-[1.375rem]`.
- Large figures (prices, step numbers, the hour's "60", minutes) take `class="display"`: Young Serif with tabular figures.
- **Inclusive Sans** for everything else: running text at `text-lg leading-relaxed text-base-content/80`, at most `max-w-[62ch]`. Its italic is there for emphasis in long text.
- Labels, prices and hours take `class="tag"`: 13 px, semibold, sentence case, slightly open, tabular figures. Never spaced capitals. It is not daisyUI's `label`, which is a form field's. A label over a section title is `tag text-primary`.
- A long text written in Markdown (a treatment, a practitioner's words, an advice note, an answer) goes in `class="prose-mend"`.

## Color and shape

- Warm white (`bg-base-100`) for most sections; oat (`bg-base-200`) for one band at a time (the figure's panel, the patients' words, the areas, the insurance) and for cards on warm white (the fee card, the form's aside); clay (`bg-secondary`) for the first visit's band and an initials portrait; lake at night (`bg-neutral`) for the request band and the footer only.
- The lake blue (`primary`) is for buttons, links and labels. The terracotta (`accent`) is for marks only: the dot after the name, the lit joints, the dots before a list item or an area, the step numbers. Never small text in terracotta on oat.
- Soft, large corners (`rounded-box`, 1.5 rem) on photos, panels and cards; fields and buttons at the default `rounded-field`. Hairlines between rows (`border-base-300`, `divide-base-300`) rather than boxes. No shadows.
- The figure's panel and the request band are inset panels (`px-3 md:px-5` around a `max-w-[90rem] rounded-box`), not full-bleed bands.
- **Photos** are daylight, soft natural color and calm: warm rather than blue, uncluttered, no logos or watermarks, no skeletons or spine renders, no posed stock smiles, no faces but the team's. No filter is applied.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: the figure stands still with the first area open and its joints lit, the ring is whole, everything is where the stylesheet puts it.

- **The jointed figure**: `data-body-map` on the panel, holding the figure's SVG (`parts/body-map.liquid`) and a list of `<details name="body-areas" data-area="…">`, one per `areas` record, the first `open`. The joints of the open area, and of an area under the pointer or focused, are lit in terracotta (CSS `:has()`, no script). The SVG's joints are `<g class="joint" data-joint="…">`, the moving pieces `<g data-part="…">`: leave the SVG as it is. `data-area` takes one of six values, which are the figure's joints and its movements: `head-neck`, `shoulder-arm`, `back`, `hip-pelvis`, `knee`, `ankle-foot`.
- `data-move` on the panel: the figure moves the open area's joint through its range, once every eight seconds (the head turns, the arm rises, the trunk bends, the leg lifts, the knees bend, the figure rises onto its toes).
- `data-breath` on the panel: the lit joints breathe, a soft halo three seconds in and five out. On a `<span class="breath-dot" data-breath aria-hidden="true"></span>` beside a line ("We reply within one working day"), the dot breathes the same way.
- `scripts/body-map.js`: a click on a joint opens its area; on a phone, the area scrolls into view. The list works without it and is what screen readers use.
- **The hour**: `data-hour` on the section (`parts/first-hour.liquid`): its ring is drawn from `first-visit-steps`, an arc per step (`data-arc`, in the step's shade, `tone-1` to `tone-0`), each step of the list `data-step` with `tabindex="0"`. As the section comes into view, the arcs fill in turn; a step under the pointer or focused thickens its arc and dims the others. The center shows the minutes added up. `{% render 'first-hour', full: true %}` shows the long texts and a larger ring (the first visit page).
- `data-reveal` on a section's main element: it rises a little into view. `data-reveal="stagger"` on a list or grid: its children rise 80 ms apart. Put them on every new section.
- **The request filled in from the link**: `data-prefill` on the request form. `/book?with=<practitioner id>`, `?treatment=<treatment id>` and `?area=<joint>` check the option whose `data-key` holds that word (a treatment card's `data-key` lists every treatment id it covers).
- Smooth scrolling runs by itself; links to an anchor (`#where-it-hurts`) glide to it. The header is sticky on warm white and does not change as you scroll.

## Lists

- `treatments`: the home page's rows, the treatments page and a page each (`/treatments/<id>`). `price_from` is written with its currency ("$125"). Their order is the definition's `order`.
- `areas`: one per area of the figure, in the order of the figure from head to foot; `joint` decides which joints light up and how the figure moves, so keep the six values and at most one area per joint. `conditions` are short, in the patients' words; `links` lead to treatment pages, and a treatment's page lists the areas that link to it.
- `team`: the practitioners; `treats` holds treatment names exactly as in `treatments` (a treatment's page lists the practitioners whose `treats` contains its name); `bio` is the "Sees most" line; `body` their words in the first person. An advice note's `author` is a practitioner's full name, which links it to their page.
- `first-visit-steps`: the hour's steps, shared by the home and first visit pages. Their `minutes` add up to the ring's total: keep them adding up to the visit's length.
- `fees`: grouped by `treatment` on the prices page, in order; `featured` puts one on the home page's fee card (four).
- `testimonials`, `promises`, `what-to-bring`, `first-visit-faq`, `prices-faq`, `hours`, `home-features` (the hero's four reassurances), `blog` (the advice notes, newest first) and `navigation`.
- `bookings` collects the request form. Its `treatment`, `visit` and `when` choices are written in the form (`parts/request-form.liquid`) and in `data/bookings/_datasource.yaml`: change both together. The practitioners and the areas come from `team` and `areas`.

## Rules for the site's whole life

- The form asks only what it takes to arrange a visit: never add medical history, medication, diagnosis or insurance number fields to it.
- Say plainly that an appointment is a request until the practice confirms it, wherever there is a booking button or form.
- Keep the footer's line "Not an emergency service: in an emergency, call 911" (or the country's number).
- One terracotta mark per item at most, and no colors of the site's own: everything comes from the theme, so the Theme tab restyles it all, the figure's line (`currentColor`) and lit joints (`accent`) included.
