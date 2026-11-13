---
name: pocket-design
description: The Pocket template's design notes — read before changing this site's pages, sections, styles, phone screens or plants.
---

# Pocket

An app's site where the app itself does the talking: its screens are built in the page, in HTML from the theme, inside phone frames, never screenshots. Three phones fan out over a soft living glow; then one phone stays in place while the page scrolls and its screen changes with each chapter of the story. It is light, rounded and friendly, with small things a visitor can touch (a plant in the Today screen can be ticked as watered).

It was written for Fernway, a houseplant care app; it suits any consumer app: a habit tracker, a budget, a language course, a sleep, recipe or fitness app. Rewrite the texts, the screens' parts and the records that fill them, and keep the shapes.

## Type

- **Headings** (`h1`, `h2`, `h3`) are Fredoka, semibold, a little narrow and packed tight (the stylesheet sets them). A section title is `text-[clamp(2.5rem,5.5vw,4.5rem)] text-balance`; the hero's `text-[clamp(3rem,8vw,7.5rem)]`.
- **The marker**: one word or two of a heading in `<mark>` sit on a soft pill from the second color to the third: `Every plant, <mark>on time</mark>` (no period right after the pill). One per heading at most, never a whole line.
- **Big figures and chapter numbers**: `class="numeral"` ("01", "4.8", "$29.99").
- **Labels**: `class="kicker"` (small, bold, uppercase, spaced), for the line above a heading and badges such as "Most popular". It is not daisyUI's `label`, a form field's.
- **Body** is Figtree, `text-lg` for running text.
- **Inside the phones**, sizes are in pixels (`text-[11px]` to `text-[17px]`), to read like a system interface.

## Color and shape

- Light first: `bg-base-100` (cool white) and `bg-base-200` (pale sky) alternate; `bg-secondary` (mint) marks the plan to choose and ticks; `bg-accent` (lilac) the chapter numbers and notices; `bg-neutral` (ink-plum) is the phones' bodies, the store buttons and the footer; `text-primary` (lagoon teal) the buttons, links and rings.
- Soft cards: `rounded-box` and `soft-shadow` (a shadow made from the neutral color), pill buttons and fields. `lift` makes a card or button rise a little on hover.
- **The glow**: a section with `class="glow relative overflow-hidden"` shows three soft lights in the second color, the alternate surface and the third color. Add `<canvas data-aurora aria-hidden="true"></canvas>` as its first child to make them drift and lean toward the cursor (WebGL); keep its content in a `relative` wrapper. The hero, the download band and the pages' title bands use it; a title band sits under the floating header with `-mt-[4.75rem] md:-mt-20` and a large top padding.

## The phones

- `{% render 'phone', screen: 'today', tilt: true %}` draws a phone (bezel, island, "9:41" status bar, tab bar) around one of the screens: `today`, `plant`, `light`, `doctor` or `home`. Each screen is a part of its own (`parts/screen-today.liquid`…): change what it shows there, with the theme's classes only. A new screen is a new part `screen-<name>.liquid` whose root is `<div class="screen …" data-screen="<name>">`, added to the `case` in `parts/phone.liquid`.
- The screens read the `plants` list: Today shows the first three as due today and the next three as later this week, Plant shows the first plant, Light the ones that like medium or bright light. For another app, rewrite `plants` (and its fields) as that app's own things, and the screens with them.
- **The watering tick** (`data-water` on a `<label>` around a checkbox, in a ring): ticked, the ring fills and a drop falls; it works with no script. Keep the `aria-label` on each checkbox.
- `tilt: true` turns the phone toward the cursor, 6° at most, on a desktop.
- The phones keep their own sizes (16.5 rem wide, 15.5 on a phone): do not make them wider than the screen.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: everything is where the stylesheet puts it.

- `data-fan` on the hero's phones: three `.fan-slot`s (`fan-left`, `fan-right`, `fan-middle`, each with a `.fan-move` around a `.fan-rise`) rise from a stack into the fan when the page opens, and the side ones slide behind the middle one as it scrolls. The side phones are `aria-hidden="true"`.
- `data-phone-story` on the story: each `<li>` of `.story-list` holds a `.story-text` (with `data-chapter`) and a `.story-phone` around a `.story-sticky` around a phone. On a desktop, the screens are gathered into the first phone, which stays while each chapter's screen slides in; the rail of numbers (`.story-rail-wrap`) follows. Keep one phone per chapter and the rail's links in the same order.
- `data-reveal` on a section's main elements: they rise into view.
- `data-count` on an element holding only a figure ("4.8", "21,400", "310k", "9 in 10"): it counts up to it.
- `data-marquee` on each review row (`.review-row`, the second also `data-reverse`): the cards drift in opposite directions and pause on hover; with no script they scroll sideways.
- `data-notify` on the notification card of the download band: it drops in with a spring.
- In CSS: `needle-sway` makes the light meter's needle sway, `scan-sweep` the doctor's scan line move; the billing switch shows one price or the other with no script.
- Smooth scrolling runs by itself.

## Lists

- `stores`: one record per store, `store` app-store or google-play (it chooses the glyph and "Download on the" or "Get it on"); `url` the app's page in that store. The buttons are the template's own pills: never put the stores' official badges in their place unless the maker gives theirs.
- `home-chapters`: kicker, title, a two-sentence text and the `screen` its phone shows. `home-figures` (figures with a label and a note), `home-features` (`size` wide or square: alternate them so the rows of three columns fill; `visual` chooses the small piece of interface drawn in the tile), `reviews` (shown in two rows, alternately), `plans` (the home page and the pricing page, `highlighted` marks the one on mint), `pricing-compare` (`free` and `plus`: "yes", "no" or a short text), `home-faq`, `pricing-faq`, `help-articles` (by `topic`, each with its page at `/help/<id>`), `privacy-points` (`kind` keep or never; the home page shows three of the "never" ones), `privacy-sections` (the policy, with its table of contents), and `support`, the support form's messages.

## When adapting

- The app's name is in the header, the footer and every `<title>`; its rating ("4.8", "21,400 ratings") in `parts/rating.liquid` and the reviews' heading; its prices in `plans`, the pricing heading, the comparison's note and the billing questions. Ratings, prices and privacy promises are the maker's: ask for them or leave them out rather than guess.
- The privacy page's policy is a sample: tell the maker it must be checked against what their app really does.
