---
name: linen-design
description: The Linen template's design notes — read before changing this site's pages, sections, styles, rooms, keys or booking request.
---

# Linen

A guesthouse seen the way you wake in it: undyed linen, a sheer curtain moving over the window onto the courtyard, and the rooms hanging as keys on the reception's board, each dyed its own color. The pages are calm and generous, with crafted marks (a weave on the ground, stitched seams on the buttons, a thread sewn between chapters), and a request for your dates is never more than one scroll away.

## Type

- **Fraunces** for headings, light (300), soft and not wonky, in sentence case. A page title is `text-[clamp(3rem,7vw,7rem)] leading-[0.98] tracking-[-0.015em]`; a section title `text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.02]`.
- **One italic word or phrase per heading**, in an `<em>` ("Five rooms around a <em>courtyard</em>"): Fraunces Italic with its livelier shapes. `class="script"` sets any other text in it (a signature, a caption, a room's line).
- **Figures** (room numbers, the minutes from the door, the years): `class="figure"`, Fraunces 400 with lining figures.
- **Jost** for the body: running text with `prose-linen` (the ink at 80%, relaxed leading).
- **Labels, facts and prices**: `class="tag"` (small, uppercase, spaced). Not daisyUI's `label`, which is a form field's. A room's facts read "Sleeps 2 · King bed · Courtyard".
- The name in the header is Jost 500 in spaced capitals, like a linen tag.

## Color and shape

- The ground is undyed linen (`bg-base-100`) with its weave; oatmeal (`weave bg-base-200`) for quieter sections (the welcome, the table, the form's panel, questions). Give an oatmeal section the `weave` class too.
- **One deep band a page** on indigo (`bg-secondary text-secondary-content`), plus the indigo footer: the house on the home page, check-in on the rooms page, the whole house on the book page, the house through time, the mezcal hour, when to come. On indigo, labels and threads are marigold (`text-accent`), buttons `btn btn-accent`.
- Cochineal (`primary`) for buttons, links, labels and the thread on linen. Marigold is never text on linen.
- Small soft corners (`rounded-box`, 0.25 rem) on photos and panels; hairlines (`border-base-300`). Buttons carry a dashed seam inside their edge by themselves (every `.btn` but ghost and link).
- **A room's color**: `data-tint="primary|secondary|accent|neutral|linen"` on an element sets `--tint` and `--tint-content`; `class="dyed"` paints with them, `tint-dot` makes a swatch. Never write a room's color as a class name.
- **Photos** share one daylight: whitewashed and dyed walls, sun and shade, color in the walls and the cloth; no night shots, flash or faces outside the team. `data-sun` on a photo's frame (or the `<img>`) adds a touch of sepia and a little less color, so any set reads as one.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: everything is in its final place.

- **The sheer**: `<figure class="window …" data-sheer-window data-sun>` holding the `<img>` and `<canvas data-sheer aria-hidden="true"></canvas>`, inside a `<div class="casing">` (the double casing). Two panels of linen hang over the photo in WebGL, move in the breeze, part in gusts, ripple under the pointer and draw aside as the page scrolls; without WebGL, CSS panels do it. The `<img>` is what editing shows. Give the figure an aspect (`aspect-[4/5] sm:aspect-[16/9] md:aspect-[2.6/1]`), never a height in `vh`.
- **The keys**: `data-keyboard` on a list of rooms, `data-key-card` on each room's card, and `{% render 'key', room: room %}` for its key (`parts/key.liquid`: the iron in `currentColor`, the arched fob in the room's tint with its number and name). The keys swing in turn when the board comes into view, and one by one under the pointer or the keyboard's focus. `class="keyboard-rail"` on the list draws one rail across it on a wide screen; `class="key-rail"` on each card gives it its own length of rail below that. On a phone the board is one row that scrolls sideways, a card and a half to the screen. On a room's page, `{% render 'key', room: record, large: true %}` inside `<div class="hook-rail">` is the large key, which swings once.
- `data-settle` on a picture or a card: it settles as it comes into view, from a little lower and turned a degree, as if just hung on a nail. Put it on a block, not on every line.
- `data-stitch`: the thread between chapters, `{% render 'stitch' %}` on linen; the footer has its own in marigold. It lies still.
- **The weave** is on the page's ground and on `weave` sections; never on indigo.
- **The booking bar** (`parts/hero.liquid`) is a plain GET form to `/book#request`; `data-arrival` and `data-departure` keep the departure a day after the arrival, and on the book page the script copies `arrival`, `departure`, `guests`, `room` (a room's id), `for=house` and `note` from the address into the request (`data-request`). Any link can prefill it: `/book?room=indigo#request`, `/book?note=A%20seat%20at%20Thursday%20supper#request`.
- The header is transparent at the top of the page and turns to linen as it scrolls; smooth scrolling runs by itself.

## Lists

- `rooms`: one record per room, in `order`; `number` and `name` are on the fob, `tint` its color, `line` the room's one line, `photo` on the board and at the top of its page, `photo_2` and `photo_3` further down; `size`, `bed`, `sleeps`, `view`, `floor` and `price` (from, a night) are its facts; `amenities` what is in it; the text below is its page's. A room's page is `/rooms/<id>`.
- The request form (`parts/request.liquid`) has a card per room, written by hand with its `data-tint`, `value` (the name) and `data-room` (the id), and `data/stays/_datasource.yaml` lists the same names in `room`'s choices: when a room is added, renamed or removed, change `rooms`, the cards and the choices together.
- `places`: sorted by `minutes`, `by` on foot or by car; the home page shows the first four. `outings`: their `length` and `price` are written as they read ("A full day", "$95 a guest").
- `testimonials`: the guest's first name, where they live, their room and when. `team`: a portrait, or initials on their `tint`.
- The section lists (`home-table`, `rooms-every`, `book-steps`, `book-faq`, `story-milestones`, `story-makers`, `table-breakfast`, `table-supper`, `around-seasons`) belong to one section each. `table-breakfast` groups by `course` (kitchen, market, drinks), named in `parts/breakfast.liquid`.
- `stays` and `newsletter` collect the forms' answers; `stays` is answered by `fragments/stay-thanks.liquid`.
- Booking is a request: never add an availability calendar, a price total or a payment to the site.
