---
name: folio-design
description: The Folio template's design notes — read before changing this site's pages, sections, styles or projects.
---

# Folio

A quiet, editorial portfolio: the work first, the person close behind. Off-white, near-black and one vermilion; light type at very different sizes; square corners; lots of space. Its home page is a numbered index of projects rather than a grid of cards. Small signs say that someone is there: the local time, whether they are at work, when they take new commissions.

## Type

- Headings and statements are light (`font-light`, the stylesheet sets 300) with tight tracking (`tracking-tight`, `tracking-tighter` for the largest). Never bold: a heading stands out by its size alone.
- A page title is one or two words at poster size: `text-[clamp(4rem,15vw,14rem)] leading-[0.85] font-light tracking-tighter`. The name on the home page is two `<span>`s inside the `<h1>` (`flex justify-between`): first name at the left edge, surname at the right. A longer name still fits; a studio's name can be one span.
- **A few words of a heading or statement in `<em>`**: the stylesheet sets them in the book serif's italic ("Photographs of buildings, rooms <em>and the light in them.</em>"). At most one `<em>` per heading, at its end.
- Every number, place, year, label and caption is in the mono face, small and uppercase: `font-mono text-[0.7rem] tracking-[0.12em] uppercase text-base-content/60`.
- Body text is `text-lg` at most, `text-base-content/80`.

## Color and shape

- `bg-base-100` for most sections, `bg-base-200` for the info page's lists, `bg-neutral text-neutral-content` for the contact band and the footer, which join.
- `primary` (vermilion) is the only color: the availability dot, the clock's dot in working hours, links and rows on hover (`hover:text-primary`), the row in view on a phone, the enquiry button, the initials' square. Use it on small things only; never as a section's background.
- Hairlines separate everything: `border-b border-base-300` between rows, `border-base-content` above a list. No cards, no shadows, no rounded corners (the theme's radius is 0).
- Images are never cropped into shapes: plain rectangles. Only the index's thumbnails and the strip crop them (`object-cover`); a project's page shows each whole.

## Effects, and the attribute that turns each on

- `data-split` on a page title (`<h1>`): its letters rise one after another when the page opens. Put it on every new page's title; not on smaller headings.
- `data-reveal` on a section's main elements (its label, its heading, its text, a list): they rise into view. Put it on every new section's elements too.
- `data-uncover` on a `<figure class="overflow-hidden">` around a large image: it is uncovered from the bottom as it comes into view. A project page's images all have it.
- `data-index` on the `<ol>` of the index, `data-index-row` on each row's link with the project's image in `data-image` and its id in `data-id`, `data-thumb` on the row's small image: with a mouse, the picture follows the cursor and tilts a little; on a phone, the row in the middle of the screen turns vermilion. Keep each row a link to `/work/<id>`.
- The thumbnails carry `style="view-transition-name: project-<id>"`, and the project page's cover the same: going from the index to a project, its picture grows into place. Keep the name the same in both places, and unique on a page.
- `data-strip` on the strip's `<ul>` (inside its `data-strip-track`): its images loop sideways, pausing under the mouse. The list is written once; the script copies it while the page moves. Each `<li>` has `pr-3 md:pr-4` and the list no gap, so the loop is seamless. All images of the strip are the same height (`h-56 md:h-80 w-auto`).
- `data-clock` on the header's line: it writes the time of `data-tz` (an IANA zone, "Europe/Lisbon") into `data-clock-time`, and within `data-hours` ("09:00-18:00") on `data-days` ("1-5", Monday to Friday) turns its dot vermilion. `data-working` and `data-away` are what a screen reader hears, in the site's language. Change the city's name, the zone and the hours together when the person lives elsewhere.
- `data-filters` on the work page's buttons, each with its category in `data-filter` (empty for All), and `data-category` on each row: a button shows only its category. Keep the buttons' categories the same as the `category` choices of `projects`.
- Smooth scrolling runs on every page by itself.

## Projects

- `projects` holds the work; each record has its page at `/work/<id>`, from `pages/work/[projects].liquid`. `featured` puts a project in the home page's index (six at most reads best). The order of the datasource is the order of the index and its numbers: newest first.
- A project's page shows `cover` large, then `image_2` and `image_3` side by side (portrait images read best there), `image_4` narrower, `image_5` large again; each is optional. They keep their own proportions, never cropped: the work is shown as it was taken. Its text is about eighty words, in the first person.
- `category` is one of four choices. For another kind of work, change the choices in `data/projects/_datasource.yaml`, the categories on the work page's buttons and each record together.

## When adapting

- The person's name is in the header, the hero, the footer and every page's `<title>`; their email in the contact band and the info page; their city in the header's clock and the hero's line.
- The availability line ("Booking commissions from March 2027") and the reply time ("within two working days") are the site's promises: ask for them or leave them out rather than guess.
- With a portrait of the person, replace the initials' square on the info page by `<img src="…" class="aspect-[4/5] w-40 object-cover md:w-full">`, keeping its place in the grid.
