---
name: beacon-design
description: The Beacon template's design notes — read before changing this site's pages, sections, styles or records.
---

# Beacon

A product's page in the weeks before and after its launch. Dark and precise, like the product's own interface, with one violet light. It makes one promise in a short sentence, shows the product working (drawn in HTML, never photographed), says what it does, how, who already uses it, where the launch stands, what it will cost and what people ask, and ends where it began: on the waitlist. An updates page proves that the team ships.

## Type

- Sora for everything written, Martian Mono for everything measured. Headings are Sora at 400 (`font-medium` only for a page's `<h1>` and the closing band), tight (`tracking-tight`, `leading-[1.02]` to `leading-[1.05]`). Never bold.
- **A two-part heading**: two short sentences, each with its period, the second in `<span class="text-base-content/45">`: "Quiet until it matters. <span class="text-base-content/45">Then it wakes the right person.</span>". Only on headings: the muted tone is too faint for body text.
- **Labels** in the mono face, small and uppercase: `font-mono text-[0.6875rem] tracking-[0.08em] uppercase`, `text-primary` above a section's heading, `text-base-content/50` elsewhere. Sections are labelled like figures in a notebook: "Fig. 07 · Six weeks of public beta". Keep the numbers in reading order when adding or removing a section.
- **Figures** (the proof row, the prices, the versions) in the mono face, light: `font-mono font-light tracking-[-0.04em]`.
- Body text `text-base-content/70`, `leading-relaxed`, never smaller than `text-sm`.

## Color and shape

- `bg-base-100` (blue-black) for most sections, `bg-base-200/40` with `border-y border-base-300` for every other band, `bg-neutral` for the closing waitlist and the footer, which join.
- `primary` (violet) is the one light: buttons, the sweep, the lit part of the track, the cards' glow, links on hover, section labels. `accent` (pale lilac) marks what is new or current: the "New in 0.9" pill, the founding offer, the "now" milestone. `secondary` is used only inside the glow gradients, never alone.
- Status colors for status: `bg-success` for up and "All systems normal", `bg-warning` for degraded, `bg-error` for down. Never colors of their own.
- Cards: `rounded-box border border-base-300 bg-base-200/60`, a hairline, no shadow. The only shadow is the window's violet glow.

## Effects, and the attribute or class that turns each on

- `data-split` on a page's `<h1>`: its words come out of a blur one after another when the page opens. Put it on every new page's title; not on smaller headings.
- `data-reveal` on a section's label, heading, text, cards and list items: they rise into view. Put it on every new section's elements too.
- **The aperture**: `<div class="beacon-aperture" aria-hidden="true">` holding `beacon-aperture-glow`, `beacon-aperture-sweep` with `data-sweep` (the conic sweep that turns once every 14 s) and the SVG `beacon-aperture-rings` (concentric circles; `beacon-aperture-blip` on a small circle makes it breathe). Place it with `top-[…]` inside a `relative` section; the hero's has `overflow-x-clip` and `[clip-path:inset(0_0_-80rem_0)]`, which clip it at the hero's top edge (under the header) while its glow reaches down behind the window, the closing band's `overflow-hidden`. Keep it `aria-hidden` and behind the text.
- **The window**: `data-window` on the frame (with `beacon-window`), inside a `beacon-stage` parent that gives it perspective. It is tipped back and lies flat as the page scrolls. Inside, `data-bars` on each row's group of bars (each bar an empty `<span>` with `bg-success/75`, `bg-warning` or `bg-error`; a phone shows the last fifteen), filled one after another when it comes into view, and `data-spark` on the chart's `<svg>`, drawn from left to right. To adapt it to another product, rewrite the sidebar, the title bar and the rows for what that product shows; or replace the window's inside with `<img src="/media/…" class="block w-full">` of a real screenshot, keeping the frame.
- `data-glow` on a card: a violet light follows the pointer over it, on the card and its border. Add `data-lit` to light one card for good (the highlighted plan).
- **The launch track**: `data-track` on the `<ol>`, with `style="--nodes: N"` (the number of milestones, set from the datasource's size). Each `<li>` has a `beacon-node` with `data-state` (done, now, next) and, except the last, a `data-track-seg` holding a `data-track-lit` when its milestone is done. The lit pieces grow from the first milestone to now when the track comes into view; the "now" node gives off a slow ring. Change a milestone's `state` in `home-milestones` to move "now".
- `data-count` on a figure: it counts up to its own text when it comes into view ("4,100", "38 s"), then shows that text exactly. Leave it off a figure that is not a number.
- The update pill and `beacon-arrow` on an arrow inside a `group` link: the arrow steps right on hover.
- Anchor links glide to their section; the sticky header leaves room for them (`scroll-padding-top` in the stylesheet).

## Lists

- `updates` holds the changelog, newest first by `date`; each has its page at `/updates/<id>`. Its body is Markdown: paragraphs, then `## Fixed` and a list; `code` shows as a chip. `tag` is New, Improved or Fixed. The home page shows the three newest; the hero's pill links to the one it names.
- `waitlist` is collected (email required, team size optional): the hero, the closing band and the updates page all post to it, each form with its own problems element (`#hero-waitlist-problems`, `#closing-waitlist-problems`, `#updates-waitlist-problems`). A new form needs a new id.
- `home-features` (six reads best; `wide` makes a card span two columns, two wide ones together), `home-steps` (three verbs that make the section's heading), `home-stats` (four), `testimonials` (five, uneven columns), `home-milestones`, `home-plans` (`highlighted` on one), `home-faq`, `home-logos` (typographic wordmarks unless a logo image is given).

## When adapting

- The product's name is in the header, the footer, the window's title bar and every page's `<title>`; its email in the FAQ and the privacy page; its launch date in the hero's status line, the closing band, the track and the updates page.
- The waitlist count ("2,418 teams on the list"), the founding offer and the figures are promises: ask the maker for them or leave them out rather than invent them.
- For a product that is not software (a book, a course, hardware taking pre-orders), keep the structure: the window becomes what the product shows (a contents page, a lesson, a spec sheet drawn in HTML), the steps its three verbs, the track its own milestones.
- The footer's last line holds the "Image credits" link itself (`<p data-up-credits>`), beside the social links: keep it there, so Upstart does not add another.
- Never a countdown timer, a pop-up or a chat widget: the launch date in words never goes stale.

## Template questions

The maker answered these on the start screen; the first message says how. Do what the answer says, then adapt the rest as usual.

### What do visitors sign up for?

- A waitlist: keep the three forms and `waitlist`.
- Pre-orders: the plans in `parts/pricing.liquid` become founding offers (one `data-lit`), each button "Reserve"; the hero's and closing band's forms say "Reserve yours" and `waitlist` gains a `plan` choice field with the plans' names. No payment is taken on the site: say that the maker will write to confirm.
- Already launched: replace each form (`parts/hero.liquid`, `parts/waitlist.liquid`, `pages/updates.liquid`) by a `btn btn-primary` "Start free" or "Sign up" link to the product's address (ask it, or `#` until given); the track's last milestone is the launch, done; delete `data/waitlist/`.

### Show pricing yet?

- Yes, the plans: keep `parts/pricing.liquid` and `home-plans`, with the maker's prices.
- Not yet: remove `{% render 'pricing' %}` from the home page, delete `data/home-plans/`, renumber the figures' labels, and add a question to `home-faq` saying pricing comes at launch.
