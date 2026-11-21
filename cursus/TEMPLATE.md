# Cursus

A résumé site that is the résumé: one person's career, shown as a profile for people who browse (what they do, what they are open to, the proof, the career at a glance) and as a typeset sheet that folds from its full length to a one-page CV with one switch and prints, or saves as a PDF, exactly as it is shown. A cool white sheet on a pale blue-grey desk, one deep indigo ink, a mint panel for the terms. It was written for Hollis Amadi, an operations lead in Cincinnati, Ohio, looking for a head of operations or COO role; it suits anyone whose career is the thing to show: a nurse or a nurse manager, a teacher or a school leader, a project or product manager, a chef, an engineer, a lawyer, an accountant, a researcher, a writer, a site manager, a translator, a graduate looking for a first job, and a freelancer or consultant who sells their experience. Rewrite the terms, the career, the figures, the highlights and the skills; keep the sheet, the fold, the spans and the plain, factual tone.

## How it is made

- The header (the monogram, the name, the trade, the links and "Get in touch") and the footer (on night: the name, the availability, the contact line, the links and the update date) are on every page.
- One set of records is shown twice: `experience`, `education` and `skills` make the résumé's sheet (`parts/sheet.liquid`, on `/resume` and small in the home page's hero) and the home page's ledger and skills. `terms` (what the person is open to) is the mint panel on the home and contact pages and the line in the sheet's head (`parts/terms.liquid`). `highlights` (the home page's rows, `/highlights` and a page each), `testimonials` (the home and highlights pages), `home-figures`, `contact-faq` and `navigation`. `contact` collects the contact form.
- The name and the contact line (city, email, the site's address, LinkedIn) are written once, in `parts/contact-line.liquid`; the update date once, in `parts/updated.liquid`.

## When adapting

- The name is in `parts/contact-line.liquid` and in every page's `<title>` and descriptions; the initials in the monogram (`HA`, in `parts/header.liquid`, `parts/footer.liquid` and `parts/sheet.liquid`); the trade ("Operations lead") in the header, the hero's label, the sheet's headline and the titles; the availability in the footer's line ("Open to work from February 2027"); the email also in `parts/take-away.liquid`.
- Roles, dates, figures, schools, credentials, the start date and the places are facts: take them from the maker's CV or messages, and leave out what they do not give rather than guess. An invented figure on a CV is worse than none: leave a highlight or a point without a figure rather than make one up, and ask for the real ones at the end.
- Never publish a home address, a birth date, a phone number or a photo unless the maker asks: the city is enough. References are not published: the site says they are given on request.
- Each record says what folds on one page: `one_page` on an experience (full, line, out), on education (full, line, out) and on a skill (true or false). After rewriting, check that the one-page form still fits: the page count in the résumé's toolbar says "Fits on one page" once the visitor view counts it, and the dashed line "End of page 1" is drawn on the sheet while editing. To fit, fold an older role to a line, leave out a contract or a volunteer role, or shorten a summary; each role keeps its first two points on one page, so put the strongest first.
- The datasources have no links between them: the résumé's anchors are the `experience` records' ids (`/resume#hearthline`, from the home page's ledger and from each highlight), and an experience's `highlights` lists the ids of its `highlights` records. Keep them in step when you rename or add a record.
- When the maker gives no figures for the home page's "In figures", leave the section out rather than invent them.
- Dates follow the site's language: the months in `parts/when.liquid` come from Liquid's date filter ("Mar 2022"); for another language write them out with a `case` on the month, and translate "now", "yr", "yrs", "mo" and "mos" there.

## Pages

### Home (`/`)

The hero's sentence beside the small one-page sheet, the terms on mint, four figures, the career as a ledger of spans, four highlights led by their figures, the skills with their evidence, colleagues' words, and a contact band to take the résumé away.

#### What are you looking for?

- **A job** (as built): the terms say the role, the kind of work, from when and where; "Read the résumé" leads the hero, and the contact form's first reason is "A role". Keep `data/terms/`, rewriting each record.
- **Clients and projects** (a freelancer or consultant): rewrite `data/terms/` as "Taking on", "Booking from", "Where" and "How I work" (remote or on site, rates "on request"); add a services section after the figures on the home page and before the form on the contact page, from the gallery's `services-two-columns` over `services` (three to five services, each with its length and "from" price or "on request"); in `parts/contact-form.liquid` put "A project" first among the reasons (and first in `data/contact/_datasource.yaml`'s choices); in `parts/hero.liquid` swap the buttons so "Get in touch" leads; the terms panel's button (`parts/terms.liquid`) says "Ask about a project"; the footer's line says "Taking on projects from …".
- **Both**: keep the role's terms and add an "Also" record for projects (as built has one); add the services section on the contact page only.
- **Not looking, a standing profile**: rewrite `data/terms/` as "Currently" (role and organization) and "Happy to talk about" (speaking, advising, mentoring), and set their `on_sheet` to false; remove "Open to work…" from the footer's line in `parts/footer.liquid` and the `{% render 'terms' … variant: 'line' %}` from `parts/sheet.liquid`; the terms panel's button says "Get in touch"; the form's reasons become speaking, advice and something else.

#### Which paper, and which word?

- **US Letter, "Résumé"** (as built): no change.
- **A4, "CV"** (the UK, Europe, most of the world): in `styles/site.css` set `--paper-w: 210mm; --paper-h: 297mm; --margin-y: 14mm; --margin-x: 15mm;` on `[data-sheet]` and `@page { size: A4; margin: 14mm 15mm; }`; in `parts/toolbar.liquid` write "A4 · lines mark each page's end"; write "CV" in place of "Résumé" in `data/navigation/resume.md`, the pages' titles, the buttons and links ("Read the CV", "Save the one-page CV"), the sheet's `aria-label` and the footer; the route stays `/resume` unless the maker asks. Full dates are written day-month.
- **A4, "CV", with a photo** (as is usual in Germany, Austria, France or Spain): as above, and the portrait in the sheet's head in place of the monogram (`<img src="/media/…" class="size-[0.9in] rounded-[3pt] object-cover" data-photo>` in `parts/sheet.liquid`; it prints too), from a photo the maker gives; the header and footer keep the monogram.

### Résumé (`/resume`)

The toolbar (the fold switch, "Print or save as PDF", the page count and the update date) above the typeset sheet: the head with the contact line and the terms in a line, then the summary, experience, skills, education and credentials, and references.

#### Who can read the full résumé?

- **Anyone** (as built): the fold switch, both lengths on the page, both printable.
- **One page only**: remove the fieldset `[data-fold-switch]` from `parts/toolbar.liquid`; with the maker's leave, delete from the records what folds (the points after the second, the roles and skills marked to leave out, the folded roles' summaries) and set every remaining `one_page` to full, so the sheet is the one page; remove the References section from `parts/sheet.liquid`. Keep the page count line, for the maker.
- **On request**: on the sheet, remove the email from `parts/contact-line.liquid`'s use in `parts/sheet.liquid` (write the line without it there); set every `one_page` so that the sheet as built is the one-page form, and remove the switch; under the sheet in `pages/resume.liquid` write "The full résumé, with references, on request", linking to `/contact`, and put "The full résumé" first among the form's reasons.

When removed: delete `pages/resume.liquid`, `parts/toolbar.liquid`, `scripts/fold.js` and `scripts/print.js` and the résumé's navigation record; in `parts/hero.liquid` remove the small sheet's column (the `[data-sheet-mini]` block) so the sentence takes the width, and point "Read the résumé" to `/#career`; remove "Save the one-page résumé" from `parts/take-away.liquid` and the mint band of `pages/highlights/index.liquid`; in `parts/ledger.liquid` and on each highlight's page the links to `/resume#…` become `/#career`. Keep `parts/sheet.liquid` only if nothing else renders it.

### Highlights (`/highlights`)

Every highlight as a row led by its figure, one colleague's words, and a mint band to save the one-page résumé; a page each telling the situation, what was done, what changed and who saw it.

#### How are your highlights told?

- **As stories, each with its page** (as built).
- **As rows on the home page only**: delete `pages/highlights/` and the highlights' navigation record; in `parts/highlight-rows.liquid` remove the links ("How" and the `<a>` around the title, figure and cover); remove `situation`, `changed`, `quote`, `quote_by`, `quote_relation` and the records' text from `data/highlights/`; the home page's "All highlights" link goes.
- **Pictures first** (for work that is seen: a chef, a carpenter, a site manager, an architect): in `parts/highlight-rows.liquid` show each record's `cover` as a wide picture leading the row (`aspect-[16/10] w-full rounded-box object-cover`) above the figure, and on `pages/highlights/[highlights].liquid` open on the cover at full width with the figure under it; a highlight without a cover keeps its figure first. Ask the maker for their own pictures of their work.

When removed: delete `pages/highlights/`, `data/highlights/`, `parts/highlight-rows.liquid` and the highlights' navigation record; remove the highlights section from `pages/index.liquid` and the `highlights` field from `data/experience/_datasource.yaml` and its records. The home page's figures stay.

### Contact (`/contact`)

The terms on mint, the contact line and how references work beside the contact form (name, email, organization, what it is about, when, the message), and the questions people ask first.

#### How do people reach you?

- **With the form, and an email to write to** (as built): messages arrive in the Content tab.
- **By email only**: delete `parts/contact-form.liquid` and its render, `data/contact/` and `fragments/contact-thanks.liquid`; in their place, a section with the email set large (as in `parts/take-away.liquid`) and "I answer within two working days".
- **By booking a call**: add a "Book a 20-minute call" button linking to the maker's own scheduling page (it leaves the site) in `parts/contact-form.liquid`'s left column and in `parts/take-away.liquid`; the form stays for longer messages.

When removed: delete `pages/contact.liquid`, `parts/contact-form.liquid`, `parts/contact-faq.liquid`, `data/contact-faq/`, `data/contact/`, `fragments/contact-thanks.liquid` and the contact's navigation record; every link to `/contact` ("Get in touch" in the header, the hero and the contact band, "Ask about a role" in `parts/terms.liquid`, the line under the sheet) becomes `mailto:` with the maker's email; the terms stay on the home page.
