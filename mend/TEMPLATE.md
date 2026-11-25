# Mend

A website for a health practice that explains before it treats: calm and warm, never clinical, with a jointed figure that shows what is treated in each area of the body, the first visit as an hour divided into its steps, fees and insurance in plain words, and a request form that says when patients will hear back. It was written for Tern Physiotherapy & Osteopathy, a practice of four in Halifax, Nova Scotia; it suits a physiotherapy or osteopathy practice, a chiropractor, a sports medicine or rehabilitation clinic, a massage therapy practice, a pelvic health clinic, a podiatrist, or one practitioner working alone. Rewrite the treatments, the areas and their conditions, the people, the fees and how insurance works; keep the warm white, the one lake blue, the terracotta marks and the unhurried tone.

## How it is made

- The header and the footer are on every page; the footer holds the address, the phone and email, the hours and the navigation. The request band (`parts/request-band.liquid`) closes most pages.
- The lists: `areas` (the figure on the home page, the treatments page's areas, the form's "Where it hurts"), `treatments` (the home page's rows, the treatments page and a page each), `team` (the home page's people, the practitioners page and a page each, the form's "Who would you like to see?"), `first-visit-steps` (the hour, on the home and first visit pages), `fees` (the home page's fee card and the prices page), `testimonials`, `home-features` (the hero's four reassurances), `promises` (the practitioners page), `what-to-bring` and `first-visit-faq` (the first visit page), `prices-faq` (the prices page), `blog` (the advice pages, and the notes on a practitioner's page), `hours` (the footer and the form's aside) and `navigation` (the header and the footer). `bookings` collects the request form. The design notes say how each works.

## When adapting

- The name is in the header (`Tern` and its dot), the footer, the request form's "Have you been to Tern before?" and every `<title>`; the address, the phone and the email in the footer, the header, the request band, the form's aside and the finding us section (`parts/find-us.liquid`).
- The fees, the insurers and claims the practice handles, the practitioners' registrations and training, and the hours are the owner's: ask for them, or leave the examples and say so, rather than invent them.
- The three quotes of "In our patients' words" are invented and never stay: ask for real ones, given with the patients' permission, or replace the section with the promises (`{% render 'promises' %}`, or the `about-mend-promises` block), since some health regulators restrict testimonials.
- Never add medical history, medication or insurance number fields to the request form: the history is taken at the visit.
- Keep "Not an emergency service" in the footer and the emergency line in the form's aside, with the country's emergency number.

## Pages

### Home (`/`)

The hero (headline, two buttons, the reply line and a photo) with four reassurances, the jointed figure beside the areas of the body, the treatments, the first visit as an hour, the people you'll see, the fee card, patients' words and the request band.

#### How do patients book?

- **A request form, confirmed by the practice** (as built): requests arrive in Spaka's Content tab, and the practice calls or emails to set a time. Every booking button leads to `/book`, with the treatment, the practitioner or the area filled in from the link.
- **On the practice's own online booking page** (Jane, Cliniko, Acuity…): every booking button opens that page and says "Book online". Point every `href="/book…"` (header, hero, the areas, request band, treatment and practitioner pages, advice notes) to the booking page's address, and rename those buttons; the `/book` page changes in its turn.
- **By phone**: every booking button becomes a call button. Point every `href="/book…"` to `tel:` with the number and rename them "Call to book"; the `/book` page changes in its turn.

#### One practitioner, or a team?

- **A team** (as built): the practitioners page with a page each, the people section on the home page, and the form's "Who would you like to see?".
- **One practitioner**: the texts speak in the first person ("I", "my practice"). Replace `{% render 'people' %}` on the home page with a portrait beside a short note in their words (from the gallery's `about-founder-note`), keep one `team` record, and remove "Who would you like to see?" from `parts/request-form.liquid`. The practitioners page type becomes an About page in its turn.

#### Where do patients come?

- **One clinic** (as built).
- **Several clinics**: the address in the footer and on `/book` becomes a card per clinic (from the gallery's `contact-locations`); add "Which clinic?" to the form (a `clinic` choice in `data/bookings/_datasource.yaml` and its radio cards in step 1) and a `clinic` field to `hours`, shown in the footer.
- **At the clinic, or at home**: add "At the clinic or at home?" to the form's first step (a `place` choice in `data/bookings/_datasource.yaml`), and say on the first visit page how a home visit works and which neighborhoods it reaches.

#### How do visitors find what you treat?

- **The jointed figure** (as built): by area of the body. Rewrite the six `areas` for the practice; keep their `joint` values.
- **A plain list**: for a practice whose work does not map onto joints (pelvic health alone, massage therapy, counseling). Remove the figure's `<svg>` and its column from `parts/body-map.liquid`, and `data-body-map`, `data-breath` and `data-move` from its panel; delete `scripts/body-map.js`; the areas become concerns, shown as the list alone, and `joint` is no longer used (remove it from `data/areas/_datasource.yaml`, and `?area=` from the links).

### Request an appointment (`/book`)

The request form in four steps beside the hours and the phone, finding us, and how to cancel.

Its form follows how patients book and its finding us section where they come, chosen with the home page:
- online booking page: replace `{% render 'request-form' %}` with a short section: a large "Book online" button to the booking page, the phone and the hours; delete `data/bookings/`, `fragments/bookings-thanks.liquid` and `scripts/prefill.js`;
- by phone: replace it with the number set large (`display`), a call button and the hours to call; delete the same files.

When removed: delete `pages/book.liquid`, `parts/request-form.liquid`, `parts/find-us.liquid`, `data/bookings/`, `fragments/bookings-thanks.liquid`, `scripts/prefill.js` and its navigation record; point every booking button to the phone (`tel:`) or to the practice's booking page. The footer keeps the address, the hours and the phone.

### Treatments (`/treatments`)

The treatments one by one with their first visit, price and cover, everything treated by area, and each treatment's own page: what it is, what it helps with, a session, who does it and where it helps.

Its buttons follow how patients book, chosen with the home page.

When removed: delete `pages/treatments/`, `parts/treatment-rows.liquid`, `parts/by-area.liquid` and its navigation record. `treatments` stays for the home page's rows: in `parts/how-we-treat.liquid` replace the `<a href="/treatments/…">` around each row with a `<div>`. In `parts/body-map.liquid` show each area's `links` as plain text, and on the practitioners' pages their treatments need no links.

### Practitioners (`/team`)

The practitioners, each with what they see most, their days and languages, the practice's four promises, and a page each with their words, training and advice notes.

#### Do patients choose who they see?

- **Yes, by name** (as built): "Request an appointment with Maren" on each practitioner's row and page, and "Who would you like to see?" in the form, "No preference" first.
- **The practice matches them**: one "Request an appointment" button (`/book`) in place of each "with <name>" button, in `parts/practitioners.liquid`, `pages/team/[team].liquid` and `pages/advice/[blog].liquid`; remove "Who would you like to see?" from `parts/request-form.liquid` and `practitioner` from `data/bookings/_datasource.yaml`; the practitioners page's intro says how the practice chooses ("We'll match you with the right person for what's going on").

When removed: delete `pages/team/`, `parts/practitioners.liquid` and its navigation record (and `parts/promises.liquid` unless the home page uses it). On the home page, `parts/people.liquid` keeps the portraits without links (replace each `<a href="/team/…">` with a `<div>`), or goes if the maker shows no one; on treatment pages the practitioners' cards lose their links; advice notes keep their author's name as text.

### First visit (`/first-visit`)

The hour in full, step by step, what to wear and bring, and the questions people ask before they come.

#### How does a new patient start?

- **With an hour-long first visit** (as built).
- **With a free 15-minute call first**: add it to the form's first step as a card ("A free 15-minute call", and to `treatment`'s choices in `data/bookings/_datasource.yaml`), and rewrite the line before the steps in `parts/first-hour.liquid` ("Before: a free call…"). The steps stay the visit's; the home page's hour follows, since it is the same records.

When removed: delete `pages/first-visit.liquid`, `parts/what-to-bring.liquid`, `parts/visit-questions.liquid`, `data/what-to-bring/`, `data/first-visit-faq/` and its navigation record; the home page keeps its hour, without "More about your first visit" (in `parts/first-hour.liquid`).

### Prices & insurance (`/prices`)

The fees by treatment, how insurance pays (extended health plans, car accident claims, workplace injuries, paying yourself), cancelling and questions.

#### How do patients pay?

- **Per visit, with direct billing to insurers** (as built).
- **Per visit; patients claim themselves**: receipts by email for their claim. Remove the direct billing lines here (`parts/insurance.liquid`), in `home-features` ("Direct billing to most plans") and on the fee card (`parts/fee-card.liquid`).
- **Mostly with a prescription, through public or statutory insurance** (as in France, Germany or Belgium): lead `parts/insurance.liquid` with what a prescription covers and what remains to pay, then the private fees; rewrite the fee card's three lines; add the prescription to `what-to-bring`.
- **Self-pay only**: delete `parts/insurance.liquid` and the insurance questions in `prices-faq`; title the page "Prices", and rename its navigation record; the fee card's lines speak of paying at the clinic. Packs of visits can go in `fees`.

When removed: delete `pages/prices.liquid`, `parts/fees.liquid`, `parts/insurance.liquid`, `parts/price-questions.liquid`, `data/prices-faq/`, `data/fees/` and its navigation record. On the home page, replace `{% render 'fee-card' %}` with one line, "Ask us about fees and insurance when you call", and remove the prices from `parts/how-we-treat.liquid`, `parts/treatment-rows.liquid` and the treatment pages (`price_from`).

### Advice (`/advice`)

Notes written by the practitioners, each with its area, author and reading time, and a page each with the author's card and more notes.

When removed: delete `pages/advice/`, `parts/notes.liquid`, `data/blog/` and its navigation record, and the advice notes on a practitioner's page (`pages/team/[team].liquid`).
