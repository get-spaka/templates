# Codicil

A website for a small law firm that writes the law in plain English: a Baskerville on bond paper, a blue-black ink, manila folders and one red pen that strikes a lawyer's phrase and writes the plain words in after it. The practice areas are a file of tabbed manila dividers, articles open as memos, and asking for a first meeting says up front what it costs and what happens next. It was written for Kesler Lund & Carrow, a firm of four partners in a townhouse in Church Hill, Richmond, Virginia; it suits any small or mid-sized firm with a few practice areas and named people: a law firm, an estate planning or family law practice, a notary or a solicitor's office, an immigration practice, an accounting or tax firm, a financial planner, a mediator, a patent agent, or one lawyer working alone. Rewrite the areas, the people and their admissions, the fees, the articles and the regulatory lines; keep the paper, the ink, the one red pen and the plain, careful tone.

## How it is made

- The header (a thin strip with the phone, the place and the hours, then the name and the links) and the footer (the address, the hours, the links and the firm's notice) are on every page. The request band (`parts/request-band.liquid`, on ink night, with its redline) closes most pages.
- The lists: `practice-areas` (the tabbed index on the home and practice pages, a page each, the situations, the form's first step, the articles' chips), `team` (the home page's partners, the People page and a page each, the form's "Who you'd like to see", the authors of articles), `firm-staff` (People), `fees` (the home page's featured fees and each area's page), `process` (the home page's four clauses), `home-facts` (the hero's ruled row), `blog` (the memo slips on the home, area, person and articles pages, and a page each), `milestones`, `promises` and `memberships` (the firm page), `consultation-faq` (the request page), `hours` (the footer and the request's aside) and `navigation` (the header and the footer). `bookings` collects the request form. The design notes say how each works.

## When adapting

- The firm's name is in the header, the footer, every `<title>` and description, and the request band; the address, the phone and the email in the header's strip, the footer, the request band, the request's aside, finding the office (`pages/consultation.liquid`) and the thank-you (`fragments/bookings-thanks.liquid`). The header's strip also writes the hours out: keep it in step with `hours`.
- The redlines are part of the voice: rewrite each (`<del>` the jargon, `<ins>` the plain words) in the maker's language and trade, never leave a struck phrase that makes no sense there.
- Admissions, bar numbers, fees, memberships and every regulatory line (attorney advertising, the footer's notice, what a first meeting means) are facts and rules of the maker's bar: ask for them, or keep the example and say so; never invent a credential, a ranking, an award or a case result. Testimonials and case results are left out on purpose, since many bars restrict them: add them only if the maker gives real ones and says their bar allows them.
- The portraits are initials on manila: ask the maker for photos of their own people first, and put them in each `team` record's `photo` (and the area's `lead_photo`).
- Never add fields for account numbers, dates of birth, Social Security numbers, documents or the facts of a dispute to the request form; keep "Who else is involved", which is how a firm checks for conflicts.
- In a country where lawyers are not called attorneys (a solicitor, a notaire, a Rechtsanwalt), rewrite "Attorneys at law", the admissions and the notice to that profession's words.

## Pages

### Home (`/`)

The hero with its redline and the townhouse's door over four facts, the tabbed index of the practice areas, how a matter works as four clauses, the partners, the latest articles as memo slips, fees in brief and the request band.

#### How do clients ask for a first meeting?

- **A request form, confirmed by the firm** (as built): requests arrive in Spaka's Content tab; the firm checks for conflicts and replies within a day. Every "Request a consultation" button leads to `/consultation`, the area or the partner filled in from the link.
- **They call first**: every request button becomes a call button (`tel:` with the number, "Call to arrange a meeting"): in `parts/header.liquid`, `parts/hero.liquid`, `parts/request-band.liquid`, `pages/practice/[practice-areas].liquid`, `pages/people/[team].liquid` and `pages/articles/[blog].liquid`; the request page changes in its turn, and the conflict-check line moves into the footer's notice.
- **Through the firm's own scheduling page elsewhere** (Clio Grow, Calendly, Lawmatics…): point every `href="/consultation…"` in the same files to that page's address and say "Book a consultation"; the request page changes in its turn.

#### What does the first meeting cost?

- **A fixed fee, credited to the work** (as built): "45 minutes, $150" in `home-facts`, the second `process` step, the request band's eyebrow, the request page's eyebrow and aside, the area pages' line and the questions; write the maker's figures in each.
- **A free short call**: "A free 20-minute call to see if we can help" in the same places; `consultation-faq` says when the first paid meeting comes, and `pages/firm.liquid`'s "What is paid when" drops the $150.
- **Not stated**: remove the fee from `home-facts`, the `process` step and the eyebrows; the request's aside says "We'll tell you the cost before we meet".

#### Do you show your fees?

- **Fixed fees, listed** (as built): the home page's fees (`parts/fees-brief.liquid`, the `featured` records), each area's fees and the firm page's "How we charge".
- **How we charge, in words only**: delete `parts/fees-brief.liquid` and its render, the "Its fees" section of `pages/practice/[practice-areas].liquid` and `data/fees/`; each area's `fee_from` says how it is billed ("A fixed fee, quoted at the first meeting"); "How we charge" stays on the firm page.

### Practice areas (`/practice`)

The tabbed index in full, every client situation linked to its area, what the firm doesn't do, and a page for each area with what it handles, the partner who leads it, its fees and its articles.

#### A page for each area?

- **Yes, a page each** (as built): each sheet of the index ends with "More about…", leading to the area's page.
- **The index only**: delete `pages/practice/[practice-areas].liquid`; in `parts/practice-index.liquid` the sheet's link becomes "Request a consultation about…" (`/consultation?area={{ area.id }}`), and in `parts/situations.liquid` each line links there too; remove `body` from `data/practice-areas/_datasource.yaml` and the records.

When removed: delete `pages/practice/`, `parts/situations.liquid` and its navigation record; the home page keeps its index, each sheet ending with "Request a consultation about…" (`/consultation?area={{ area.id }}`) in place of "More about…", and the hero's "See what we do" points to `#what-we-do`.

### People (`/people`)

The partners, then the associates, each in a row with their portrait, role, admissions and a line, the rest of the firm by name, and a page each with their facts, their words and their articles.

#### Who does the site present?

- **The partners first, then the other lawyers, each with a page** (as built).
- **One lawyer working alone**: on the home page replace `{% render 'partners' %}` with one large portrait beside their words (from the gallery's `team-founder-featured`); "we" becomes "I" through the site; keep one `team` record; remove "Who you'd like to see" from `parts/request-form.liquid`; the People page becomes About (`pages/about.liquid`, `/about`) with the firm page's story and promises, and The firm goes.
- **The partners only**: delete the associates' section and "Also at the firm" from `pages/people/index.liquid`, `data/firm-staff/`, and the associates' `team` records (reassign their articles' `author`).

When removed: delete `pages/people/`, `parts/people-rows.liquid`, `data/firm-staff/` and its navigation record; in `parts/partners.liquid` replace each `<a href="/people/…">` with a `<div>` and remove "Everyone at the firm"; areas and articles keep the partner's name without a link (they link only when a page exists, so remove the `<a>` around `record.lead` and `record.author` in `pages/practice/[practice-areas].liquid` and `pages/articles/[blog].liquid`).

### Articles (`/articles`)

Every article as a memo slip, filtered by area with chips, and a page each that opens as a memo (To, From, Re, Date) with the author's card.

#### Where are the articles published?

- **Here, each with its page** (as built): the memo slips lead to the articles' pages.
- **Elsewhere** (a newsletter, LinkedIn, JD Supra): add a `url` link field to `data/blog/_datasource.yaml` and to each record; in `parts/memo-slip.liquid` the slip's `href` becomes `{{ post.url }}`; delete `pages/articles/[blog].liquid` and the records' text. The list keeps its chips.

When removed: delete `pages/articles/`, `parts/firms-desk.liquid` and its render on the home page, `parts/memo-slip.liquid`, `data/blog/` and its navigation record, and the articles' sections of `pages/practice/[practice-areas].liquid` and `pages/people/[team].liquid`.

### Request a consultation (`/consultation`)

The request form in four numbered clauses (what it's about, who else is involved, how and when, you) beside the first meeting's cost, the hours and the phone; finding the office; questions.

Its form follows how clients ask for a first meeting, chosen with the home page:
- they call first: replace `{% render 'request-form' %}` with the number set large in Baskervville, a call button and the hours to call, keeping the aside's first meeting; delete `parts/request-form.liquid`, `data/bookings/`, `fragments/bookings-thanks.liquid` and `scripts/prefill.js`;
- a scheduling page elsewhere: replace it with a short section, a large "Book a consultation" button to that page, the phone and the hours; delete the same files.

When removed: delete `pages/consultation.liquid`, `parts/request-form.liquid`, `data/bookings/`, `data/consultation-faq/`, `fragments/bookings-thanks.liquid`, `scripts/prefill.js` and its navigation record; point every request button to the phone (`tel:`) or the email (`mailto:`), and move the first meeting's cost into the second `process` step. The footer keeps the address and the hours.

### The firm (`/firm`)

The townhouse, the firm's story year by year, five promises, how it charges, and the bar associations and clinic it belongs to.

When removed: delete `pages/firm.liquid`, `data/milestones/`, `data/promises/`, `data/memberships/` and its navigation record; the home page's process keeps how a matter works, and the fees' "How we charge" link in `parts/fees-brief.liquid` goes, its two lines saying it instead.
