---
name: marquee-design
description: The Marquee template's design notes — read before changing this site's pages, sections, styles, acts, days or passes.
---

# Marquee

A festival site that is its own poster: the name, the dates and the place are the headline, at poster size, in two loud inks (the main color and the second color) over a deep dark one. The letters of the name stretch as if the music pushed them, a field of halftone dots swells under the cursor, every photo is printed in two inks. The lineup reads like a bill, the days stack up like flyers, the passes are ticket stubs. Under the noise, the practical pages (timetable, getting there, access, questions) stay calm and complete.

## Type

One family, Anybody, whose **width** changes (from 50, very narrow, to 150, very wide): it is the template's voice. Width is one variable, `--wdth`, read by `font-stretch`; set it with `style="--wdth: 62"` on an element, never with `font-stretch` directly on a heading.

- **Poster type** (`class="poster"`): weight 900, uppercase, `leading-[0.8]`. The name at width 100 (the default), the dates at `--wdth: 62`, a day's name at 58. Sizes are in `vw` so a line fills the width: keep the name to two short words (it goes on two lines on a phone).
- **Headings** (`h2`, `h3`): the stylesheet makes them heavy, uppercase and narrow (width 70). A section title is `text-[clamp(3rem,9vw,8rem)]` with `data-rise`.
- **Labels, times and codes** (`class="tag"`): narrow (width 55 on a phone; from `md:` width 64 with a little more tracking, and `text-xs` and `text-sm` raised to 13 and 15 px on it), bold, uppercase, tabular figures: "FRI 09 · 23:30 · MACHINE HALL", "Gates 14:00", "No. 02". Use it for every small line, button and code; it is not daisyUI's `label`, which is a form field's.
- **Body** is Rethink Sans, `text-lg` at most for running text; `text-2xl font-semibold` for a day's line or an act's summary.

## Color and shape

- `bg-secondary` with `data-halftone` is the poster: the home page's hero and every page's title band. `bg-base-100` and `bg-base-200` (blush paper) for long sections; `bg-neutral` (plum) for getting there, the access tickets and the footer; `bg-primary` for the ticket alert. Never put the main color and the second color behind each other's text: they meet only in the dots and the tape.
- Outlines are drawn, not hinted: `border-2 border-base-content` on cards, photos and stubs, `divide-y-2` between rows. Chunky corners (`rounded-box`), pill buttons and fields.
- **Stickers** (`class="sticker tag"` with `rounded-full`, a size or padding and a tilt class such as `-rotate-6` or `rotate-3`): round or pill-shaped badges in the accent color with an inked outline, for a figure, a price, a day. Two or three per page at most. On a phone they sit in a row (`flex flex-wrap`); from `md:` they may sit over the poster (`md:absolute md:top-[22%] md:right-[5%]`), never over its text.
- **Two-ink photos**: wrap every `<img>` in `<div class="duotone …">` (main color as the light ink) or `duotone-secondary` (second color), with a size (`aspect-[4/3]`) and the image `size-full object-cover`. The stylesheet makes it grayscale and prints it in the theme's inks, so any photo and any palette match. Use `duotone-secondary` on a card of the main color, and alternate the two in a grid (`{% cycle 'duotone', 'duotone-secondary' %}`). Choose photos for strong light and shape (instruments, lights, crowds from behind, buildings), not for their colors.
- With portraits of the artists, use them as the acts' images: the two inks keep them in the design.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: everything is where the stylesheet puts it.

- `data-stretch` on a poster title (`<h1 class="poster">`): its letters grow from narrow to their width one after another when the page opens; with a mouse, the letters near the cursor widen while the others narrow; on a phone, the name narrows as the poster scrolls away. Every page's title has it.
- `data-halftone` on a section, with `<canvas data-shader="halftone" aria-hidden="true"></canvas>` as its first child: a WebGL field of dots in the main color swells under the cursor. Without the canvas (title bands), or with no WebGL, the section shows its printed CSS halftone. Keep its content in a `relative z-10` wrapper.
- `data-part` on the dates line, around three `<span class="inline-block">` (09 10 11): the outer numbers part as the poster scrolls away.
- `data-sticker` on a sticker: it is slapped on (from larger and turned) as it comes into view.
- `data-tape` on each band's `<ul>` (the second also `data-reverse`, and its band `aria-hidden="true"`): the words run in opposite directions. The list is written once in `home-tape`; each `<li>` ends with its ✺ and has `pr-6 md:pr-8`, no gap on the list, so the loop is seamless. The bands are `.tape-band` with `style="--tilt: -3deg"` (and `2deg`); the section's negative top margin lays them over the poster's lower edge.
- `data-stack` on the day cards' `<ul>`: the cards stick and pile up as the page scrolls, each covered one shrinking a little. Each `<li>` sets its slight angle, `style="--askew: -1.25deg"`.
- `data-bill` on the bill: a hovered name widens. Do not set `--wdth` inline on the bill's links.
- `data-tilt` on the passes' `<ul>`: a hovered stub leans toward the cursor. Each `<li>` holds `<div class="stub-turn">` (the alternate slight angles) around the `<article class="stub">` (the notches). The tear line (`.stub-tear`) sits under a top part of fixed height, `h-56`: the notches are cut at 14rem, so keep the two together.
- `data-rise` on a section title: it rises and widens as it comes into view.
- `data-countdown="2027-07-09T14:00:00+02:00"` (the opening, with its time zone) and `data-until` (the end): it writes how far off the event is from its own sentences, `data-days` ("{n} days to go"), `data-on` and `data-over`. Its written text, the dates, is what shows while editing. Change the dates and translate the sentences together.
- `data-filters` around the lineup's buttons, each with a day in `data-filter` (empty for all), and `data-day` on each act's card.
- Pages wipe in behind a diagonal edge, and smooth scrolling runs, by themselves.

## Lists

- `acts`: the main acts, each with its page at `/lineup/<id>`. `day` is one of the three choices, `stage` one of the four stage names, `start` and `end` in 24 h (`23:30`, `01:30`: a set after midnight belongs to the day before), `billing` headliner (one a day), main or support. `origin` is a city and a country code ("LAGOS NG"); the bio, about ninety words.
- `days`: one record per day; its `title` is the same word as the acts' `day`. `gates` and `curfew` in 24 h set the timetable's grid; `more` lists the "and also" names. For more or fewer days, change the `day` choices of `acts` too.
- The timetable places each set on a grid of quarter hours from the day's gates, one column per record of `stages`: keep each act's `stage` equal to a stage's `name`, and four stages at most side by side.
- `passes`: `status` is "on sale", "few left" (an accent stamp) or "sold out" (a grey stub with no button).
- `stages`, `travel` (`home` puts four of them on the home page), `access`, `faq` (by `topic`; the tickets page shows the Tickets topic), `partners` (`tier` sets the weight and width of each name, the presenting one larger), `home-tape`, and `alerts`, the ticket alert's sign-ups.
