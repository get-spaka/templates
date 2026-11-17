---
name: codicil-design
description: The Codicil template's design notes — read before changing this site's pages, sections, styles, practice areas, people, articles, fees or forms.
---

# Codicil

A small firm that writes the law in plain English. The site reads like a well-kept file: a Baskerville on bond paper, a blue-black ink, manila folders and one red pen. Where a lawyer's phrase would go, the site strikes it through in red and writes the plain words in after it. Nothing is loud: square corners, hairlines instead of shadows, quiet reveals, a steady header.

## Type

- **Baskervville** for headings, at 400 and never bold (500 at most for the smallest). Sentence case. A page title is `text-[clamp(2.5rem,4vw+1rem,4.5rem)] leading-[1.04] tracking-[-0.01em] text-balance` (the home page's `<h1>` goes to 5.25rem); a section title `text-[clamp(2rem,2.5vw+1rem,3.25rem)] leading-[1.08] tracking-[-0.01em]`; small headings `text-[1.375rem]`. Its italic is kept for the redline's new words and for the clients' own words ("When to call us", situations), in quotation marks.
- **Baskervville SC**, its small capitals, with `class="sc"`: eyebrows, the memo's labels, the index's tabs, labels over a list ("We handle", "Admitted"). Never spaced capitals made with `uppercase`.
- **IBM Plex Sans** for the text, 1.0625rem, `leading-relaxed text-base-content/80`, at most `max-w-[64ch]`. `class="meta"` sets labels, fees, dates and hours: 0.8125rem, 500, tabular figures, sentence case.
- A long text written in Markdown (an area, a person's words, an article) goes in `class="prose-codicil"`.

## Color and shape

- Bond paper (`bg-base-100`) for most sections; pale manila (`bg-base-200`) for one band at a time, the memo slips and the request's aside; manila (`bg-secondary`) for the process and the firm's promises, and for a portrait's initials; ink night (`bg-neutral`) for the request band and the footer only.
- Blue-black (`primary`) for buttons, links and the chosen tab's edge. The red pen (`accent`) only ever marks: the redline's strike and rule, the section signs, list squares, the form's step numbers, the focus ring. Never small text in red, and never red on manila or ink night except a section sign or a line.
- Square corners everywhere (`--theme-radius: 0`); only the index's tabs round their tops a little (`calc(var(--radius-box) + 0.25rem)`). Photos sit in a frame: a `border border-base-300 p-2.5` around the image. Hairlines between rows (`border-base-300`), no shadows (relief off).
- **Photos** are daylight, warm walls, brick, dark wood and paper: the place, and the work without people. No gavels, scales, columns, handshakes or glass boardrooms, and no faces outside the firm. Portraits are the firm's own people; until there are photos, initials in Baskervville on manila.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: every redline is struck and written in, the first tab's sheet is in front, every section is shown.

- **Clauses**: `data-clause` on a section and `class="sc clause"` on its eyebrow print `§ 3 · ` before it, counted by CSS down the page; a section added with `data-clause` is numbered too. A record's page uses `class="sc clause-mark"` for a § without a number. The hero and the request band carry no clause.
- **The redline**: `data-redline` on a heading holding `<del aria-hidden="true">the lawyer's phrase</del> <ins>the plain words</ins>`. The `<del>` is struck in red, the `<ins>` set in italic with a red rule; as the line comes into view the strike draws across, then the new words write themselves in (`scripts/redline.js`). `data-redline="load"` plays as the page opens (the hero). At most one per section, and three per page: the hero, the request band and one more.
- **The tabbed index**: `data-index` on the section (`parts/practice-index.liquid`), CSS only. For each `practice-areas` record, in this order: a radio (`index-input sr-only`), its tab (`<label class="index-tab">`) and its sheet (`<article class="index-sheet">`); the first radio is checked. The checked radio's sheet comes to the front, rising into place for visitors; `style="--tabs: N"` on `.index-file` sets how many tabs share the row on wide screens (the number of areas). Keep the three elements together and in that order.
- **Memo slips**: `{% render 'memo-slip', post: post, summary: true %}` writes an article as a slip (Re, From, Date) on pale manila. Inside `class="slip-pile"` three slips overlap a little and tilt like papers on a desk on wide screens.
- **The memo heading**: `<dl class="memo-head">` with `<dt>To</dt>`, `From`, `Re`, `Date`, above a double rule (an article's page).
- **Fees**: `class="fee-row"` holding the name, `<span class="leader">` and `<span class="fee">`: a dotted leader runs to the figure.
- **The articles' chips** (`pages/articles/index.liquid`): `data-chips` on the section; each chip is a radio (`chip-input sr-only`, `data-n` its area's place among `practice-areas`, from 1) then its `<label class="chip">`; each article carries `data-topic`, its area's place. Up to eight areas.
- `data-reveal` on a section's main element rises it a little into view; `data-reveal="stagger"` on a list rises its children 70 ms apart. Put them on every new section.
- **The request, filled in from the link**: `data-prefill` on the form. `/consultation?area=<area id>` and `?with=<person id>` check the option whose `data-key` is that id.
- The header is sticky on paper at 95% with a hairline; it doesn't change as you scroll. No smooth scrolling, no page transitions, no parallax.

## Lists

- `practice-areas`: the index (home and practice pages), a page each (`/practice/<id>`), the situations list, the form's first step and the articles' chips. `lead` is the leading partner's name exactly as in `team`, which links their card; `fee_from` is the whole line ("From $1,800, fixed"). Their order is the definition's `order`.
- `team`: `partner` marks the partners (home page, People's first rows, the form's "Who you'd like to see"); the others are associates. `admitted` starts with the main admission ("Virginia, 2004"). An article's `author` is a person's full name.
- `fees`: `area` is an area's name exactly; `kind` is `fixed`, `from` or `hourly`; `featured` puts a fee on the home page (five).
- `blog`: the articles, newest first; `category` is an area's name exactly; `to` is the memo's To line.
- `process` (four, numbered 1.1 to 1.4), `home-facts` (the hero's ruled row, four), `firm-staff`, `milestones`, `promises`, `memberships`, `consultation-faq`, `hours` and `navigation`.
- `bookings` collects the request form. Its `area`, `meeting`, `when` and `reply` choices are written in `data/bookings/_datasource.yaml`; the areas and partners in the form come from `practice-areas` and `team`, so an area renamed is also renamed in the definition's `area` choices.

## Rules for the site's whole life

- The form asks only what it takes to arrange a meeting and check for conflicts: never fields for account numbers, dates of birth, Social Security numbers, documents or the facts of a dispute.
- Keep the footer's notice (attorney advertising, writing does not make us your lawyers, no confidential details until we confirm), with the maker's own bar's wording.
- No star ratings, testimonials, case results, award badges or rankings unless the maker types them in and their bar allows them; never invent a credential or an admission.
- One red pen: the accent marks, it never fills. No colors of the site's own: everything comes from the theme, so the Theme tab restyles it all.
