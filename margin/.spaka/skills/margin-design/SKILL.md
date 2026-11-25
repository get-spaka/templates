---
name: margin-design
description: The Margin template's design notes — read before changing this site's pages, sections, styles, letters or topics.
---

# Margin

A small publication that people actually read: one writer (or a few), a numbered letter every week, and a letter's page built for reading, with a serif made for long text, notes in the margin and pull quotes. One green in several strengths, hairlines between rows, no cards and no shadows. Every picture on the lists is printed in one green ink, so any photo the maker adds belongs to the set; on a letter's own page, its pictures develop into full color. The newsletter is the main call, said plainly and never in a popup.

## Type

- Everything reads in **Literata**, the theme's heading and body font; it picks its optical size from the font size by itself. Titles are `font-medium` (500), the masthead and page titles `font-normal`, both `tracking-tight`. Never italic in a heading, never bold for emphasis in one.
- **Labels and interface** are in Schibsted Grotesk, the class `font-sans`: a label is `font-sans text-xs font-semibold tracking-[0.08em] uppercase`, with `text-secondary` (moss) for a category or a letter's number, `text-base-content/65` otherwise. Buttons, fields, the navigation and dates take the grotesk by themselves.
- Running text has old-style figures; put `lining-nums` on a label holding numbers ("No. 142", "9 min"), as the existing ones have.
- Secondary text is `text-base-content/75`, never lighter than `/65`.

## Color and shape

- `bg-base-100` for nearly every section; `bg-base-200` (sage) inside a rounded band (`rounded-box`) for the letterbox and the now list; `bg-neutral text-neutral-content` (forest) for the footer only.
- `primary` (fir) is for links, buttons, the drop cap, the reading rule, the pictures' ink and titles on hover (`group-hover:text-primary`); `secondary` (moss) for labels and note numbers; `accent` (fern) for a `<mark>` and the writer's initials.
- Rows are separated by `border-b border-base-300`; a list starts under `border-b border-base-content`. Corners are square except the bands and the pictures (`rounded-box`).

## Effects, and what turns each on

- **Ink**, `data-ink` on the frame of a picture (`<span class="block aspect-[4/3] rounded-box" data-ink><img src="…" class="size-full object-cover"></span>`): the picture is printed in fir on sage, in CSS. Put it on every picture of a list or a card. When the frame is inside a link, hovering the link on a desktop brings its color back once the page moves (never while editing).
- With a portrait of the writer, replace the initials' square on the home page and the about page by `<span class="block aspect-[4/5] w-40 rounded-box md:w-full" data-ink><img src="…" class="size-full object-cover"></span>`, keeping its place in the grid.
- **Develop**, `data-develop` on the frame of a large picture on a record's page (a letter's cover, a topic's plate): it starts inked and develops into color as it comes into view. An image alone in a paragraph of a letter's text (`![alt](/media/…)` on its own line) does the same. With no script, under reduced motion and in edit mode they are in full color.
- **Reveal**, `data-reveal` on a row, a heading or a form: it rises a little into view. Put it on the elements of every new section.
- **The reading rule**: `{% render 'header', progress: true %}` gives the compact header a fir rule that fills from left to right as the page is read. Only a letter's page has it.
- **Highlights**: a `<mark>` in a text marked `data-highlight` (a letter's body has it) has its fern swept in as it comes into view.
- **Read one at random**: a link with `data-lucky-dip` and every letter's address in `data-posts` (`{% for item in data.blog %}/blog/{{ item.id }} {% endfor %}`) goes to one at random; its `href` is the letter it goes to without a script.
- Don't add smooth scrolling, page transitions, carousels, popups, share buttons or view counts: reading wants a still page.

## A letter's text (the `body` of `blog`)

Write it in Markdown; the page sets it:

- the first paragraph gets a drop cap: begin with a real sentence, not a heading;
- `## A subheading` for its parts, two or three in a long letter;
- `> A sentence of the letter, repeated` is a pull quote: one per letter, a sentence worth reading twice;
- `<mark>a few words</mark>` for one highlight at most;
- **a margin note**: `<aside>The note's text.</aside>` on its own line, after a blank line, just after the paragraph it belongs to. The paragraph gets its number at its end; the note sits in the right margin on a wide screen and under the paragraph on a phone. Two or three per letter, a sentence or two each, plain text;
- an image alone in its paragraph, `![What it shows](/media/…)`, as wide as the text.

## Letters, topics and the home page

- `blog` holds the letters, newest first (`sort: -date`); each has its page at `/blog/<id>` (`pages/blog/[blog].liquid`), and `/blog` lists them all, labelled "Letters" in the navigation: keep these addresses, which the gallery's blog blocks link to. `number` is the letter's number, `season` its season (a choice: add the next ones to the definition as they come), `topics` a list of the titles of `topics` records, `minutes` its reading time, `featured` the lead letter on the home page.
- The home page shows the lead letter, the next five as "This season", then the three after those "From the archive": nine letters fill it. The masthead's dateline and the "All 142 letters" link take the latest letter's number and season by themselves.
- `topics` holds the five topics, each with its page at `/topics/<id>` listing the letters whose `topics` holds its title. Renaming a topic means changing its title in the letters too. Their plates are old maps and engravings: for another city, find old maps or prints of it, or plain photographs; the ink makes them one set.
- The letters page groups them by year by itself.
- Each letter keeps its writer in `author`; with several writers, the sign-off (`parts/sign-off.liquid`) says `{{ record.author }}`.
