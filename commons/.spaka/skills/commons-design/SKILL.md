---
name: commons-design
description: The Commons template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Commons

A neighborhood noticeboard made into a website: big, friendly type on newsprint paper, flat bright colors, notices torn from a pad with tear-off tabs at their foot, figures on slips of colored paper, and a few lines written by hand. It is warm and plain, like a flyer printed at the library: never glossy, never corporate. Giving, volunteering and the next event are always one tap away.

## Type

- Gabarito for headings, the wordmark and every figure; Public Sans for everything else; Caveat for handwritten notes and the tabs' labels. All three are files of the site (`fonts/`), declared in `styles/site.css`.
- Headings are sentence case and tight; the stylesheet sets their weight and leading. `poster` is the hero's and the footer's size (`clamp(3rem, 9vw, 8.5rem)`), `page-title` a page's title, `text-5xl md:text-7xl` a section's title, with a `kicker` above it.
- `kicker`: small bold capitals for an eyebrow, a label, a date or an hour (`<p class="kicker text-base-content/70">Our programs</p>`).
- `figure`: a number at poster size, Gabarito 800 with tabular figures (`<p class="figure text-[clamp(4rem,11vw,9rem)]">7,412</p>`). Figures are always the real text: nothing counts up.
- `hand`: a line written by hand, tilted -2°, at 1.75rem; `hand-lg` (2rem) and `hand-xl` (3rem) make it larger, since Tailwind's `text-*` sizes do not reach it. At most one per section, and never the only place a fact is said ("that's 4.1 tons kept out of the landfill!" under a figure that is also on the about page). The give page's dollar bar is the one exception: its labels are handwritten.
- Body text is `text-lg text-base-content/80`; on tomato, sky or marigold, keep text at full ink, never faded.

## Color and shape

- Newsprint (`bg-base-100`) for most sections, kraft (`bg-base-200`) for a quiet band, a card or a field. Ink (`base-content`) for all text, outlines and rules, 2 px.
- Three flat brights, each with its job: tomato (`primary`) for the Donate button, the "Lend a hand" door and a program's color; sky (`secondary`) for the "Take what you need" door, the noticeboard's band and a program's color; marigold (`accent`) for the jar's fill, "Free" tags and the footer's notice. Tomato on paper is only for display sizes (the wordmark's ampersand, a quotation mark), never for running text.
- One sky band per page at most (the noticeboard, or a program's next event), and one deep ink (`bg-neutral`) footer.
- `data-tone="tomato|sky|marigold|kraft|ink"` gives an element a flyer's color and its ink (`--tone` and `--on-tone` for its children); the lists' `tone` fields feed it.
- Cards and doors are slightly rounded (`rounded-box`); buttons and fields are pills; no shadows, no relief.

## Effects, and the attribute that turns each on

Each is turned on by an attribute, so a new section can have it. In edit mode nothing moves and everything is in its final place: both doors the same width, the jar at its level, every tab hanging straight. Under reduced motion likewise, but for the doors' fade.

- `data-reveal` on a section's heading block and on each card, slip or notice: it rises into view (`scripts/reveal.js`); siblings follow each other 0.08 s apart.
- `data-torn="top|bottom|both"`: paper torn along that edge, a mask from `styles/edges/`. `data-tear="1|2|3"` chooses which of three tears (neighbors should not tear alike; without it, the element's place among its siblings chooses). Photos in cards are torn at the bottom (on the wrapper, not the `<img>`), notices and slips at the top, the noticeboard's band at both, the footer at the top. A smaller tear: `style="--tear: 0.5rem; --tear-tile: 8rem"`.
- `data-doors` on the hero's row of two `.door`s (each with `data-tone`, a `.door-photo` and `.door-way` links numbered by `style="--i: 0"`): from 1024 px the door under the pointer or holding the focus opens wider, its photo comes forward, its links slide toward the center and its arrow (`.door-arrow`) moves on, while the other steps back. CSS only.
- `data-jar` on `.jar` with `style="--level: 62%"` (computed in Liquid from the `appeal` record): an ink jar filled with marigold to its level, the goal at its brim (`.jar-goal`), where it stands beside it (`.jar-mark`). When it comes into view, the fill rises from empty with a spring and its surface sways; `[data-jar-note]` (the handwritten "62% there!") fades in last (`scripts/jar.js`).
- `.notice` (with `data-tone`): a notice torn from the pad, its `.notice-sheet` torn at the top above a dashed cut, then `{% render 'tabs', href: …, label: …, aria: … %}`: a fringe of five tabs that are one link, `data-tabs`. They flutter once as the notice comes into view (`scripts/tabs.js`); the tab under the pointer lifts away. `parts/notice.liquid` draws an event's notice.
- `.ink-link`: a text link whose underline thickens and comes closer on hover; `.nav-link` in the header, whose underline appears on hover and stays under the current page.
- `.quote-mark`: Gabarito's huge quotation mark in tomato, above a quote. A blockquote in a record's text (`.story-text`) becomes a pull quote with it.
- Smooth scrolling runs on every page by itself (`scripts/smooth-scroll.js`). There is no page transition.
- Nothing is hidden by the stylesheet: a script hides what it animates only once it starts. Keep it so in new styles.

## Lists

- `programs`: `tone` is the program's color everywhere (its card, its page's band, the step squares, its slip, the "Next" band); `steps` is a list of short sentences; the record's text is the page's long text, with `##` headings. The order is the maker's (`order`); the first two are the home page's wide cards.
- `appeal`: one record. `goal`, `raised` and `donors` are numbers; `parts/dollars.liquid` writes them as dollars with a comma. `link` is the donation page every Donate button opens in a new tab; empty, they lead to `/give`.
- `home-figures` and `about-figures`: `figure` is text ("52,600"), `tone` its slip's color, `note` an optional handwritten line (one per list).
- `stories`: `featured` tells the home page which to tell large; `program` ties a story to a program's page.
- `events`: sorted by date; `program` ties an event to a program's page, `kind` Orientation feeds the volunteer page; an empty `price` shows "Free".
- `news`: newest first. `team`: `group` is staff or board; `initials` and `tone` stand in until a `photo` is given.
- `give-levels`, `give-things`, `give-ways`, `give-spending` (its `cents` add up to 100), `volunteer-roles`, `volunteer-steps`, `volunteer-faq`, `about-milestones`, `about-logos` and `hours` are the sections' own lists.
- `volunteers`, `rsvps` (with the event's title and date in hidden fields), `contact` and `newsletter` collect the forms; each answers with its fragment, a slip of marigold.

## Rules for the site's whole life

- Every color comes from the theme, the jar's and the notices' included: the Theme tab restyles all of it.
- Keep Donate and Volunteer in the header on every page, and the next event never more than one tap away.
- Photos are documentary, in daylight and natural color: people at work, from behind, at a distance, or as hands. No posed smiles, no filters, no duotones; the torn edges and the colors make them one set.
- Never invent a figure, a quote or an amount for a real organization.
- No map embedded, no video, no carousel, no counters that count up.
- A crisis line or a "quick exit" button, if the maker's work calls for one (a shelter, a helpline): put it first in the header, on deep ink, on every page; the quick exit replaces the page with a neutral site (`location.replace`) in a small `scripts/quick-exit.js`.
