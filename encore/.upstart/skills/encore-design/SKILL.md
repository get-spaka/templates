---
name: encore-design
description: The Encore template's design notes — read before changing this site's pages, sections or styles, its records and their sleeves, its shows board, videos or press kit.
---

# Encore

A band's website as a record shop and a tour board. The stage is dark graphite under one aqua light; every record is a square sleeve with a black disc inside that slides out and turns, and opens onto its own page whose back, on paper, gives the tracklist and the notes; the shows flip into place on a departure board. Photos are black and white with a fine grain, so the only color on the stage is the records' covers and the aqua.

## Type

- **Big Shoulders** for the name and headings, heavy and in capitals, set tight (`leading-[0.9]`). The name and page titles are `poster` (900) at `text-[clamp(4.5rem,13vw,12rem)] leading-[0.82] tracking-tight`; a section title `text-[clamp(3rem,7vw,6rem)]`; a record's title on its page as large as the name. `class="display"` sets any other text in it (a card's title, a wordmark, the members' names).
- **Host Grotesk** for the body; running text gets `class="copy"` (the text at 82%, relaxed leading).
- **Azeret Mono** for the board, the tracklists, the catalog numbers and every label: `class="mono"` (500, spaced capitals, even figures): "Album · 2026", "A3 · 4:12", "VF-005". On a heading, put it on a `<span>` inside (`<h3><span class="mono">Side A</span></h3>`), or the heading font wins. Not daisyUI's `label`, which is a form field's.

## Color and shape

- Graphite (`bg-base-100`) is the stage; the lighter graphite (`bg-base-200`) holds the records' row, the quotes and the board's tiles; the record's black (`bg-neutral text-neutral-content`) is the mailing list, the mobile menu and the footer. `class="stage-light"` lays the aqua wash from above on a page's first section.
- **Aqua** (`primary`) is the one light: the Listen buttons, links, a hovered row of the board, the "Out now" dot. **Signal red** (`accent`) is for marks and short labels only, never text on paper: "Sold out", "Few left", the "On tour" dot.
- **Paper** (`class="paper"`, the bone `secondary` with its ink) is the back of a sleeve: a record's tracklist, credits and notes, the press bios, the promoters' list. Never more than one paper band in a row.
- `class="dot"` is the aqua dot before a label; `dot dot-accent` the red one.
- Buttons and fields are pills; sleeves and tiles have a hair of rounding (`rounded-box`); hairlines are `border-base-300`.

## Effects, and what turns each on

Nothing moves while editing or under reduced motion: everything is in its final place, and every disc sits 18% out of its sleeve, still.

- **The sleeve**: `{% render 'sleeve', release: release %}` draws a record (`parts/sleeve.liquid`): its cover, and behind it the disc drawn in CSS from the theme (grooves from the neutral color, the sheen from its content color, the cover again as the round label). Put it inside the record's link. `place: 'list'` (the default) slides the disc 55% out and turns it when the link is pointed or focused (its foot shows on a phone); `place: 'hero'` slides it out on load and turns it while it is in view; `place: 'page'` rolls it out with the scroll (down on a phone). A single (`type: Single`) turns at 45 rpm, the others at 33⅓. The sleeve keeps room for its disc, so give its column the width you want the whole.
- **The flight**: `flight: true` gives the sleeve `view-transition-name: sleeve-<id>`, and the cover flies from the list to the top of its page. A name may be given only once per page: on the home page the hero's sleeve carries it and the same record in the row below does not.
- **The board**: `data-board` on a list of shows, `data-board-row` on each row and `data-flap` on each cell (`class="flap"`); `{% render 'show-row', show: show %}` writes a row (`details: true` adds doors, the opening act and the price). The letters flip into place when the board comes into view, or on load with `data-board="load"` (the hero's next show). A row with a ticket link turns aqua under the pointer.
- **Black and white**: `data-bw` on a photo's frame turns it gray with a fine moving grain. Never on a cover: the covers are the only pictures in color. A video card's poster takes its color back under the pointer.
- `data-reveal` on a heading, a row or a card: it rises into place as it comes into view. Put it on blocks, not on every line, and never on a board's rows.
- The header is see-through over the stage and turns to the record's black as the page scrolls; smooth scrolling runs by itself.

## Lists

- **`releases`**, newest first (`sort: -date`): one record each, with its `type` (Album, EP, Single, Live), `cover` (square, in color), `formats`, `side_a` and `side_b` (one track a line, "Title · 4:12"; an empty `side_b` gives one list, "Tracks"), `credits` ("Role · Name"), `listen` (one link per service: only those filled show), `buy`, `summary`, the liner notes as its text, and `featured` for the hero (the first record otherwise). Each has its page at `/music/<id>`; the header's Listen leads to the featured record's `#listen`.
- **`events`**, by date: the city as `title`, `region`, `date`, `time` (doors), `place` (the venue), `summary` (who opens, ages), `price`, `status` (On sale, Few left, Sold out, Free) and `booking` (the ticket page; none for a sold-out show). A show is upcoming from its date on, past before it, compared with today's date when the page is served.
- **`videos`**, newest first: `kind`, `runtime`, `poster` (a photo, shown in black and white), `url` (YouTube or Vimeo, opened in a new tab), `release` (a record's id, which shows the video on that record's page), `director`, `featured` for the videos page's large one. Videos are never embedded.
- **`team`** (the members, their instruments and a photo), **`quotes`** (from the press, with publication, writer and link), **`press-photos`** (with their photographer's credit; each downloads), **`contacts`** (by purpose: booking, press, management, a general address), **`contact-rider`** (for promoters).
- **`navigation`**: `place` is `both`, `header` or `footer` for the pages, `listen` for the band's profile on each service (the footer's Listen column and the music page's wordmarks) and `social` for its social pages.
- `bookings` collects the booking form and `newsletter` the mailing list (an email and a city).

## Rules for the site's whole life

- Only the covers are in color; every other photo carries `data-bw`.
- One aqua light: a single primary button per section; red only for marks.
- No audio or video in the page: listen and watch links go out, in a new tab.
- The board and the labels stay in Azeret Mono capitals; the headings in Big Shoulders capitals.
- Write the band's sound in words, never by naming other artists.
