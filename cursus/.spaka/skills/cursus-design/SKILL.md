---
name: cursus-design
description: The Cursus template's design notes — read before changing this site's pages, sections, styles, résumé, terms, career, highlights or skills.
---

# Cursus

A résumé site that is the résumé. It reads first as a document: a cool white sheet on a pale blue-grey desk, one deep indigo ink like a fountain pen's, and a mint panel for what the person is open to. Its motion is quiet and useful: the résumé folds from its full length to one page under the visitor's hand, the sheet shows where each printed page ends, and each role is drawn as a span of time. Facts, figures and colleagues' words carry it; nothing is decorative.

## Type

- **Hedvig Letters Serif** (its one weight, never bold) for the name and headings, sentence case. A page title is `text-[clamp(2.5rem,4.5vw+1rem,5rem)] leading-[1.04] tracking-[-0.015em]`; a section title `text-[clamp(1.75rem,2.2vw+1rem,3rem)] leading-[1.08] tracking-[-0.01em]`; a highlight's figure `text-[clamp(3.5rem,5vw+1rem,4.75rem)] text-primary`.
- **Radio Canada Big** for reading: 1.0625rem, `leading-relaxed text-base-content/80`, at most `max-w-[62ch]`; role titles and buttons in 600 (`font-semibold`; a heading in it takes `font-body`); its italic for a colleague's words.
- **Google Sans Code**, `class="mono"`: dates, labels above headings ("Career", "In figures"), the terms' labels, the switch and "Updated November 2026". Sentence case, never spaced capitals, except the sheet's section labels.
- A long text written in Markdown (a highlight's story) goes in `class="prose-cursus"`.

## Color and shape

- Sheet white (`bg-base-100`) for most sections; the desk (`bg-base-200`) under the hero, the résumé, the highlights and the contact page's head; mint (`bg-secondary`) for the terms panel and one light band per page at most; night (`bg-neutral`) for the contact band and the footer only.
- Indigo (`primary`) for buttons, links, the switch's chosen side, the sheet's section labels and its rule under the name, a highlight's figure and the current role's span. Fern (`accent`) only for small marks: the terms' checks, "now" in the ledger. On night, links are mint (`text-secondary`), never indigo.
- Small corners (`rounded-box` 0.5rem on panels and photos, `rounded-field` on buttons and fields), hairlines (`border-base-300`) between rows, no relief. Only the sheet has a soft shadow.
- **Photos** are optional: the site looks finished with none. They show the work and the places (a warehouse, a dock, a cold room), share one treatment (`data-photo`: a little less saturation, a little more contrast) and sit in small squares beside a highlight's row, or beside its title on its page. Until there is a portrait, the person is their initials in the serif on an indigo square (`class="monogram"`).

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: the switch shows Full, every entry is open, the page-end lines are drawn, the small sheet is in place and every span is at its full length.

- **The sheet** (`parts/sheet.liquid`, `data-sheet` on the article): typeset in points at the size of a US Letter page (`--paper-w`, `--paper-h`, `--margin-y`, `--margin-x` in `styles/site.css`, with `@page` beside them), shown larger on wide screens; on a phone it becomes the page itself, in rem. `.page-end` lines mark where each printed page's text ends ("End of page 1"), CSS only, so the maker sees while editing whether it still fits. Classes: `sheet-section`, `sheet-label` (the mono capitals in indigo), `entry` (dates in the left column, then `entry-main`), `entry-role`, `entry-org`, `entry-summary`, `entry-points`, `sheet-row` with a `sheet-k` label, `dot-list` (items divided by middle dots).
- **The fold**: the two radios named `length` in `[data-fold-switch]` (`parts/toolbar.liquid`). The state is CSS: with "One page" checked, on the sheet, `data-fold="out"` leaves an element out, `data-fold="line"` keeps an entry's line and hides its `data-fold-detail` parts, an entry's points after the second go, and the credentials run in one line. A folded entry keeps a double hairline like a crease. `scripts/fold.js` animates the change, opens `/resume#one-page` folded and writes the page count (`data-pages` on the sheet; the toolbar's `data-count` lines). The records say what folds (`one_page`), so the maker decides in the Content tab; a new section of the sheet that should go on one page gets `data-fold="out"`.
- **The small sheet** (`data-sheet-mini` in the hero): the same part rendered with `mini: true` (`data-sheet="one"`), always folded, inert, linked as a whole to `/resume#one-page`; it rises from the desk as the page opens and lifts on hover.
- **Print**: `@media print` in `styles/site.css` prints the sheet alone, in ink on white, as shown (full or one page), with no header, footer (nor its credits link), toolbar, buttons or forms; `data-print-hide` leaves anything else out of print, `data-print-flat` removes a wrapper's padding and background. `data-print` on a button opens the print dialog (`scripts/print.js`). Another page prints its content in the same type.
- **Spans** (`parts/ledger.liquid`): `data-ledger` holds the axis (`--axis-from`, `--axis-to`, months counted from year zero), each role's bar `data-span` its `--from` and `--to`, computed in Liquid from `start` and `end` (an empty end is today); the current job's bar is indigo (`data-now`), contracts and volunteering thinner (`data-kind`). Each bar grows from its start as the ledger comes into view (CSS).
- `data-reveal` on a section's main element rises it a little into view; `data-reveal="stagger"` on a list rises its children 70 ms apart (`scripts/reveal.js`). Never on the sheet, which must be there at once.
- The header is sticky on the sheet's white with a hairline; it doesn't change as you scroll. No smooth scrolling, no page transitions.

## Lists

- `experience`: one record per role, newest first by `start`; an empty `end` means it lasts. `kind` (job, contract, volunteer): jobs first on the sheet and in the ledger, then contracts and volunteering with a small tag. `points` the strongest first, since one page keeps two. `one_page`: full, line or out. `highlights`: the ids of its `highlights` records. The record's id is its anchor on the résumé (`/resume#<id>`).
- `education`: `kind` degree or credential; credentials run as one list; `one_page` as above.
- `skills`: `group` known-for, tools or languages (the home page's three columns and the sheet's rows); `evidence` is a line on where, or how well; `one_page` true or false.
- `terms`: what the person is open to: the mint panel, and the sheet's head line for those marked `on_sheet`; `accepted` draws a check before the words.
- `highlights`: in the order the maker sets; `featured` puts one on the home page; `figure` and `figure_label` lead its row; its page tells `situation`, the record's text (what was done), `changed` (three facts) and the `quote` with `quote_by` and `quote_relation`.
- `testimonials` (newest first, the first one large), `home-figures`, `contact-faq` and `navigation`. `contact` collects the contact form; its `about` choices are written in `data/contact/_datasource.yaml` and in the form's options.

## Rules for the site's whole life

- Nothing invented: no figure, credential, employer or quote the maker has not given. A highlight without a figure leads with its title instead.
- No skill bars, percentages, stars or charts of skills; no typing headline, no terminal look, no "hire me" badge, no clock or "available" dot: availability is written in the terms.
- The city only: no home address, birth date or phone number unless the maker asks.
- Keep the one-page form on one page: after a change to the records, look at the résumé in visitor mode for "Fits on one page", or at the dashed "End of page 1" line while editing.
- One indigo ink and one mint panel per page; no colors of the site's own: everything comes from the theme, so the Theme tab restyles the sheet, the desk, the spans and the terms too.
