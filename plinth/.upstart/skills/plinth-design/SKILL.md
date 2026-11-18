---
name: plinth-design
description: The Plinth template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Plinth

An exhibition that hangs itself. The site opens nose to the canvas, on a detail of the lead work, and steps back as the visitor scrolls until the whole painting hangs on a white wall with its label. Every work is then shown whole, untinted, at its real size relative to the others, with its museum label, and the rooms are painted in their own wall colors. It is quiet, exact and typographic, like a good museum's wall texts: the works are the only images that matter, and the practical museum (open today, tickets, the program) is always one line away.

## Type

- Familjen Grotesk for headings, labels, numbers and all small UI; Source Serif 4 for running text, the curator's statement and the titles of works. Both are files of the site (`fonts/`), declared in `styles/site.css`.
- `poster-title`: the exhibition's title at poster size (Familjen 600, `clamp(4.5rem, 15vw, 14rem)`), one line on a wide screen and two on a phone, each word in a `.line` span. `page-title` is a page's title, `display` a section's (2.5 to 5 rem), `name-xl` an artist's name in a list. Headings are 500 and sentence case.
- `ui` (13 px) and `ui-lg` (16 px): Familjen 500 with tabular figures, for eyebrows, dates, prices, hours and labels. Buttons are Familjen, never uppercase.
- `numeral`: a room's or a catalogue number at poster size.
- `statement`: Source Serif light at its display optical size, for the curator's words and pull quotes; `pull` is a smaller one. `measure` keeps running text to about 34em; `copy` spaces a record's Markdown.
- Italics are for the titles of works and books only (`<i>`, `<cite>`), as in all writing about art: never an italic accent word in a heading.

## Color and shape

- The gallery's white wall (`bg-base-100`) and black ink (`base-content`) carry most of the site; putty (`bg-base-200`) is a quiet band, a plinth, a checklist row on hover.
- Dusk blue (`primary`) is for buttons and links; lamp yellow (`accent`) only for small marks: the open today dot, the center line's mark, focus rings. Night (`neutral`) is the footer and the Look closer view.
- Rooms are painted with `data-wall="base|alt|primary|secondary|neutral"`: the band takes the theme's pair of colors (`--wall`, `--on-wall`), so the Theme tab repaints every room. A room's wall is always one of these five names, never a color written in a record. On a painted wall, write muted text with `muted` (its own ink at 72%) rather than `text-base-content/70`, and outline buttons with `btn-wall`.
- Everything is square (`--theme-radius: 0`), flat and drawn with 1 px hairlines. No shadows, no frames: typography does the work frames usually do.

## The works

- A work is always shown whole and true: never cropped (`object-contain`, or the image's own proportions), tinted, graded, set in a mockup or used as a background. The step back's detail is the one exception, and it always ends on the whole work.
- `parts/plaque.liquid` is the museum label: the artist and dates first, then the title in italic and the year, then the medium, the size in centimeters and inches, and the collection (`full: true`); `number: true` adds the catalogue number. The labels name the collection a work belongs to, never a loan.
- `parts/hang.liquid` hangs works to scale on one center line: each bay is as tall as the tallest work on that wall, each frame sized from the record's `height` and `width` in centimeters (`--h`, `--w`) at `--cm` pixels a centimeter. `switch: true` adds the On the wall / As a list switch and the checklist; `rooms:` the room filter; `legend: true` the center line's height and a meter at scale; `skip:` leaves one work out; `links: false` stops the works linking to their pages.
- A work without an image keeps a placeholder frame in putty, at its proportions, with its label.

## Effects, and the attribute that turns each on

In edit mode nothing moves and everything is in its final place. Under reduced motion likewise.

- `data-step-back` on a hero (`scripts/step-back.js`), with `data-step-stage` on its stage, `data-focus="x% y%"` on its picture (the detail it starts from), `data-step-line` on each line of its title (each wrapping one inline-block span) and an optional `data-step-caption` (hidden in the page, shown while the detail fills the screen). The script makes the hero about 220svh tall (`data-step-back-on`), its stage sticky, and scales the picture from about 2.6 (2 on a phone) back to 1 over the first 120svh of scroll, never beyond the file's own pixels; the title's lines rise once the work is in place. It does nothing if the stage does not fit one screen. One per page, at the top.
- `data-hang` on each bay of a hang (`scripts/hang.js`): each frame comes down about 14 px onto its hook with a slight swing, 80 ms after the one before it, and its label (`data-hang-label`) fades in after it.
- `data-view` on a hang with its switch (`scripts/view.js`): the two radio buttons switch the wall and the checklist in CSS (`:has(:checked)`), which works with no script; the script wraps the switch in a View Transition, each work's frame and row sharing one `view-transition-name` (`--vt` on `data-vt`).
- `data-filter="<name>"` on a box of radio buttons named after it and of items carrying `data-keys` (`scripts/filter.js`): the works by room, the events by kind. With no script everything shows.
- `data-look` on a link to an image file (`scripts/look.js`): opens it at its full size in the page's `[data-look-dialog]` (`{% render 'look' %}`, before the footer), panned by dragging or scrolling, smooth scrolling paused. With no script, the link opens the image.
- `data-today` (`scripts/today.js`, `parts/today.liquid`): the open today line, read from the hours in the header (`data-today-hours`) in the museum's time zone (`data-tz`), said with the sentences of its `<template data-say>` elements; `data-last-day` adds the last days of the exhibition and its end. The line as written shows with no script.
- `data-rise` on a heading block or paragraph: it rises into view in CSS (`animation-timeline: view()`).
- `chip` on a painted band that links somewhere: it opens a little under the pointer.
- The header's hairline appears once the page scrolls (CSS). Smooth scrolling (Lenis) runs on every page by itself. Pages change plainly: no page transition.
- Nothing is hidden by the stylesheet: a script hides what it animates only once it starts. Keep it so in new styles.

## Lists

- `works`: sorted by `number`, the catalogue number, which is the order of the hang. `artist` and `room` are choices of the `artists` and `rooms` ids (datasources do not link: add the new id to the choices when adding an artist or a room). `height` and `width` are in centimeters; `focus` is the detail the step back would start from; `featured` puts a work on the home page's wall.
- `rooms`: in the maker's order; `wall` is one of the five theme names; the text is the room's wall text.
- `artists`: `initials` stand in on putty until a `portrait` is given; `portrait_label` is the portrait's own label.
- `events`: sorted by date; `kind` is talk, tour, family or evening; `repeats` ("Every Saturday") shows instead of the day; an empty `price` reads "Free with admission"; `work` is the work the event starts from, hung whole on its page.
- `hours`: one record a day; `opens` and `closes` on the 24-hour clock ("17:00"), empty when closed, which `parts/clock.liquid` writes as the museum says them ("5").
- `navigation`: `place` is both, header, footer, social, or tickets for the one ticketing link every Buy tickets button reads.
- `visit-admission`, `visit-access`, `visit-faq` and `exhibition-credits` are the visit and exhibition pages' own lists. `reservations`, `group-visits` and `newsletter` collect the forms.

## Rules for the site's whole life

- Every color comes from the theme, the painted rooms included.
- The open today line and Buy tickets stay in the header on every page.
- Works are shown whole and true; only the works are shown large. Other photographs (a gallery room, the river) stay small and documentary, with no recognizable visitor's face.
- Never fill a living artist's works with found images: until the maker gives them, keep the placeholder frame and the label.
- No loader, no cursor effect, no sideways scrolling, no WebGL, no video, no ticker, no giant wordmark.
