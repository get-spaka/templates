---
name: reel-design
description: The Reel template's design notes — read before changing this site's pages, sections, styles, cases, services or team.
---

# Reel

A loud, confident studio site where the work moves sideways. Heavy extended capitals on a near-black ground, slabs of the main color (chartreuse) that tilt and overlap the headlines, and a home page whose case studies run past as a reel when you scroll down. Each case opens onto a page in its own color, and everything ends on one question, "Got a brief?", with a form that asks for one.

It was written for Halfvolt, a brand, motion and film studio in Rotterdam. It suits a branding or design agency, a motion or animation studio, a film production company, an architecture collective, or a freelancer who wants to look bigger: rewrite the cases, the services, the people and the lists, and keep the shapes.

## Type

One family, Archivo, in three widths, plus a mono face for labels.

- **Headlines** (`h1`, `h2`, `h3`): the stylesheet makes them Archivo at its widest (`font-stretch: 125%`), weight 800 (900 for `h1`), uppercase, `leading-[0.82]`, `tracking-[-0.02em]`. Page titles are `text-[clamp(3.25rem,12.5vw,12rem)]` or close; a section title `text-[clamp(2.75rem,8vw,7.5rem)]`. Keep words short: each line of a page title must fit a 390 px phone (about eight letters at most).
- **Widths as classes**: `wide` (125, for shouting: the wordmark, the footer's question, client names), `normal-width` (100, for a heading meant to be read, such as the statement or a quote), `narrow` (75, for big numbers: case numbers, figures, years). Use them on any element; never set `font-stretch` by hand.
- **Body**: Archivo at normal width, 1.0625 rem, `leading-relaxed`; `text-xl` to `text-2xl font-semibold` for a lead.
- **Labels and metadata** (`class="meta"`): Fragment Mono, 0.75 rem uppercase with a little tracking, 13 px at least on a desktop. Disciplines, years, credits, the form's labels, the "Now booking" chip, small section names ("Selected work"). It is not daisyUI's `label`, which is a form field's.
- **Buttons** are pills (`btn btn-primary`, `btn btn-neutral`, `btn btn-outline`), their text bold and uppercase by the stylesheet.

## Color and shape

- The ground is `bg-base-100` (near-black) on every page; `bg-base-200` (graphite) for fields, the jobs rows and a graphite panel; `bg-neutral` (the deepest black) for the header bar.
- `bg-primary` (chartreuse, black text `text-primary-content`) is the loud color: the slabs, the main buttons, the cursor disc, the service fill, the footer band. Chartreuse text only ever sits on black (`text-primary` on base-100 or base-200): never on bone or acid yellow.
- `bg-secondary` (bone) is the quote slab and a panel color; `bg-accent` (acid yellow) a panel color, the "Now booking" chip and the "Hiring" tag.
- **Tones**: `cases` and `team` have a `tone` (lime, yellow, bone, graphite) that sets each panel's colors: lime `bg-primary text-primary-content`, yellow `bg-accent text-accent-content`, bone `bg-secondary text-secondary-content`, graphite `bg-base-200 text-base-content`. The pages write it as a `{% case item.tone %}`; copy that line to give a new card its tone. Alternate them so two neighbors never share one.
- Corners are barely softened (`rounded-box`), borders are 2 px (`border-t-2 border-base-content` on rows, `border-base-300` for hairlines).

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: everything is where the stylesheet puts it, every slab at its tilt, the reel a plain row.

- **The reel** (`data-reel` on the section, `data-reel-stage` on the box inside it, `data-reel-track` on the `<ul>` of panels, `data-reel-progress` on an empty line with one `<span>`): from 1024 px wide the section is pinned and the row slides left as the page scrolls, a chartreuse line filling with progress, the panels leaning with the speed. Narrower, it is a row that scrolls sideways with snapping; on a phone a vertical stack. Panels are `clamp(19rem, 34vw, 34rem)` wide; add `class="reel-wide"` on the track for wider images (the case page). Keep the panels' content short enough to fit the screen's height.
- **Kinetic headline** (`data-kinetic` on a heading, one `<span data-drift="left">` or `"right"` per line): the letters rise line after line when the page opens, and the lines slide apart as it scrolls. Every page's title has it; alternate left and right, and keep a section that holds one `overflow-x-clip`.
- **Tilted slabs** (`data-tilt` with a tilt class, written phone first: `-rotate-[1.5deg] md:-rotate-3`): it drops in from 12° further and settles at its tilt as it comes into view. A slab is `class="slab bg-primary text-primary-content p-7 md:p-14"`; it overlaps the headline above it with a negative top margin from `md:` only (`md:-mt-20`), never on a phone. Works on images too (the hero's still, the studio photo).
- **The cursor** (`data-cursor="View"`, `"Drag"` or `"Next"`, or any short word): with a mouse, a chartreuse disc reading that word follows the pointer over the element. On the reel's panels, the work tiles ("View") and the next-case band ("Next").
- **Acid smoke**: a section with `data-smoke` and `<canvas data-shader aria-hidden="true"></canvas>` as its first child gets a slow WebGL ink in the main color; without the canvas or without WebGL it shows a CSS glow of the same color. Keep it to the hero: once per page at most.
- **Cover zoom** (`data-zoom` on an image's frame, which needs a size, such as `aspect-[21/9]`): the image goes from 1.12 to 1 as the page scrolls past.
- **Hover fills**, in CSS: `class="fill-row"` on a row (the services' `<summary>`) fills it with chartreuse from the left; `fill-muted` on a colored child turns it black with the rest. `class="flip"` on a word (the client names) turns it into a chartreuse block. `class="pile"` on a list of team cards tilts them alternately from 1024 px and straightens the hovered one.
- **Filter on Work** (`data-filters` around the buttons, each with a discipline in `data-filter`, empty for all; `data-disciplines="{{ item.disciplines | join: '|' }}"` on each tile).
- Pages change with a sideways wipe, and smooth scrolling (Lenis) runs, by themselves.

## Lists

- `cases`: each with its page at `/work/<id>`. `disciplines` from Brand, Motion, Film, Digital (the Work page's filter buttons are the same four: change them together); `featured` puts it in the home page's reel (four to six is right); `tone` its color. `results` are up to three lines written `figure / what it counts` ("+41% / riders in the first year"): the page splits them at " / ". `credits` one line each, "Role · Name". The body has three short parts under `### The brief`, `### The idea`, `### What happened`, set in two columns. A cover and four images: the four run in the case page's reel.
- `services`: four rows; `deliverables` five short lines each.
- `clients`: names only, set as type. Six to twelve.
- `testimonials`: the first is the large quote on the bone slab, the next two sit below it.
- `home-figures` and `studio-figures`: four each, the figure short (`140+`, `620 m²`) and its label a sentence.
- `studio-principles`: three. `team`: six cards; without a photo a card shows the initials on its tone; with photos, use people at work, from behind or at a distance. `awards`: newest first, the category hidden on a phone; `jobs`: each a row that opens, its text ending with how to apply.
- `briefs`: what the contact form collects. Its choices (needs, budget, timing) are written twice, in the definition and in `parts/brief-form.liquid`: change them together.

## When adapting

- The studio's name is in the header, the footer and every `<title>`; the address, email and phone in the footer and the contact page; the new-business lead in the footer band, the contact page and the thank-you fragment.
- "Now booking spring 2027" in the header and the contact page is a date: update it or remove it.
- Awards, figures and results are the business's own: ask for them or leave them out rather than invent them. Never name a real award show beside a project that did not win there.
