---
name: seam-design
description: The Seam template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Seam

A clothing label's site made from its cutting table: unbleached calico, ink and claret, pattern paper, manila hang tags in typewriter type, swatches cut with pinking shears, and the photographer's contact sheet. Quiet and current: big photographs carrying almost nothing, tiny interface type, and one narrow serif at poster size. Nothing shouts; the clothes and the hand that made them do the talking.

## Type

- Libre Caslon Condensed for headings, statements, the wordmark and names at poster size; Mona Sans for body and interface; Courier Prime for everything a tag or a ticket would carry. All three are files of the site (`fonts/`), declared in `styles/site.css`.
- `poster`: a collection's name (`clamp(5rem, 17vw, 17rem)`, leading 0.82). `page-title`: a page's title. `heading`: a section's title (2.25 to 4 rem). `statement`: a sentence or three in the serif at 2 to 2.75 rem, at most about 24 characters a line (`max-w-[24ch]`). Headings are sentence case and never bold.
- `type`: Courier Prime at 0.8125 rem, for labels above headings, numbers ("Look 03", "07—03"), prices, sizes, seasons, dates and the pattern's marks. Put it on a `<p>` or `<span>`, never on a heading (the runtime gives headings the serif).
- `ui`: Mona Sans 500 in spaced capitals, for the header's links and jump links; buttons have it by themselves.
- `wordmark`: the serif in spaced capitals (`tracking 0.32em`). The footer's fills its width (`wordmark-fill`).
- Body text is `body-text` (80 % of the text's color), `leading-relaxed`.

## Color and shape

- Calico (`bg-base-100`) for most of the page; manila (`bg-base-200`) for the hang tags, the swatch cards, the forms' panels and the team's initials; ink (`bg-neutral`) for the contact sheet, "Worn in", the next collection and the footer. Claret (`primary`) for buttons, links, the tags' strings, the printed pattern pieces and the notches. Powder blue (`bg-secondary`), tailor's chalk, for one band per page at most (how to buy, how it's made, mended for life). China-marker rose (`accent`) only for small marks: the grease-pencil loops, the "To order" dot, a frame's hover outline.
- Everything is square (radius 0): photos, cards, buttons, fields. Borders are 1 px hairlines in `base-300`. No shadows.
- `pattern-paper` on a section draws the dot-and-cross grid behind it (in ink on powder blue).
- `notch-rule`: a hairline marked with a single and a double notch in claret, between looks, steps and groups.
- `data-pinked="top"` cuts an element's top edge with pinking shears (the footer); `data-pinked="all"` cuts every edge (a swatch).
- `data-print` on an `<img>` gives it the shared print: a little less color, a little more contrast. Put it on every photograph.
- The hang tag: `<span class="tag" style="--tilt: -4deg"><span class="tag-card"><span class="tag-name">Name</span>…<span class="tag-rule"></span>…</span></span>`. It hangs still at its tilt from a claret string (`--string`, its length), and straightens when its card or link is hovered; `tag-sm` is the small one. On a card's photo it sits in the top corner, outside the photo's `overflow-hidden` box.
- `parts/pattern-piece.liquid` draws a printed pattern piece (`shape`: shirt-front, cutting-layout, sleeve, hem) in claret, with its notches, grain line and marks. They are printed and still: they never draw themselves.

## Effects, and the attribute that turns each on

In edit mode nothing moves and everything is in its final place: the photos lie flat and the picks are circled. Under reduced motion likewise.

- `data-pleat` on a `<figure>` holding one `<img>` (and nothing else; the figure sized, the image `size-full object-cover`): the photo arrives pleated in six strips (four on a phone), turned and shaded, which open flat one after another from the left (`scripts/pleats.js`). `data-pleat="load"` opens at load (the hero's two photos, one after the other); any other value as it comes into view. Use it on the hero, the looks, collection covers, journal covers and the studio's wide photo; never on small pictures or cards.
- `data-mark` on a contact sheet: each pick's loop (an SVG `<path data-mark-path pathLength="1">` in `frame-mark`) draws itself in grease pencil as the sheet comes into view (`scripts/marks.js`). A look's `pick` field adds the loop.
- `data-reveal`: a text rises a little into view (`scripts/reveal.js`); siblings follow 0.08 s apart.
- A piece's card (`piece-card`) wipes from the worn photo to the close-up of its cloth (`piece-detail`) on hover and focus.
- A contact sheet's frame (`frame`) lifts slightly on hover and takes a rose outline.
- The header gains its calico and hairline as the page scrolls; pages cross-fade (`@view-transition`), the header staying in place. Smooth scrolling is Lenis, light.

## How the lists work

- `pieces`, `collections`, `looks` and `fabrics` point to each other by ids, never by links: a piece's `collection` and `fabric`, a look's `collection` and `pieces`. When a record is renamed or removed, change the ids that name it.
- `looks` are ordered newest collection first: the home page's contact sheet shows the first twelve. A collection's page shows its own looks, `id="look-<number>"`, which the frames link to.
- A piece's `made` (made to order, in stock, last few, sold out, one of a kind) writes its tag through `parts/made-label.liquid`. Sold-out pieces stay listed; their page offers "Ask when it's back" instead of the request.
- `featured` puts a piece on the home page's table (six at most). `shop_link`, when filled, turns a piece's button into "Buy at the shop".
- `making` feeds the home page's steps and the studio's rows; its `pattern` chooses the printed piece beside each.

## Rules for the site's whole life

- One powder-blue band per page at most; one ink footer; rose only for marks.
- Photographs carry almost nothing: a name, a line, a tag. Never a paragraph over a photo.
- Prices, sizes, numbers and dates are always in `type`; names always in the serif.
- Keep the header's links short enough to sit on one line (`whitespace-nowrap`); the menu takes over below 1280 px.
