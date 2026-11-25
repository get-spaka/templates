# Trestle

Trestle is the website of a trade that shows its work before and after and travels to its clients, laid out like a measured drawing: light type on a limewash page, dimension lines along the photos, each project with its own page, its weeks and its client's words, and the area served drawn as rings of driving time. It was written for Ostrom & Kemp, a joinery and renovation firm of nine people in a carriage barn in Hudson, New York; it suits a builder, a carpenter, a cabinetmaker, a kitchen maker, a window restorer, a stonemason, a timber framer, a painter and decorator, or a landscaper who builds. Keep the structure and rewrite the projects, the services, the towns and the people.

## How it is made

- Every page shares the header (its top strip holds the phone, the area served and the office hours) and the footer, drawn as a drawing's title block. Every page but the request page ends with the request band (`parts/request.liquid`).
- The home page's sections are parts of their own in `parts/`; the request page reuses the steps (`parts/steps.liquid`) and the rings (`parts/rings.liquid`).
- The lists: `projects` (the home page's before and after band and selected work, the work page, a page per project, the services page), `services` (the home page's two columns and the services page), `testimonials` (the home page's quotes and the reviews page), `area` (the rings), `process` (the steps), `hours` (the footer and the request page), `home-figures`, `team`, `workshop-story`, `workshop-woods`, `credentials`, `services-faq` and `navigation`; `quote-requests` collects the request form. The design notes say how each works.

## When adapting

- The name appears in the header, the footer's title block and every page's title; the address (61 Union Street, Hudson) in the footer and `parts/visit-workshop.liquid`, with its "Get directions" link; the phone and email in the header's strip and menu, the footer, `parts/request-form.liquid` and `fragments/quote-thanks.liquid`; the area ("Hudson, NY, and 45 minutes around", shorter on a phone) in the header's strip and `parts/rings.liquid`; the booking season in the hero.
- The hero's photo has its caption and its two dimension lines (`3′ 10″`, `7′ 2″`): rewrite them for the maker's photo, with its real measures if they are known, else the measures of what it shows; never leave a caption that describes another photo.
- Before and after photos and details are where the maker's own photos matter most: ask for them.
- Facts to ask or leave out rather than guess: the prices and ranges, the booking season, the drive times and bearings of the towns, the license, insurance and certifications, the reviews' ratings, the people's names. The services page's "What we don't do" names other firms: replace them with the maker's own recommendations or remove the section.
- The rings place each town by its minutes and its compass bearing from the workshop: work both out from a map for the maker's own towns (minutes by road, bearing in degrees from north).

## Pages

### Home (`/`)

The hero (the headline, the booking line and the measured photograph), a project before and after on bog oak, four selected projects, what the firm does in two columns, the workshop and its figures, how it works along a ruler, clients' words, the area served as rings of driving time, and the request band.

#### How do clients ask for a quote?

- **They request a site visit with the form** (as built): a request in four parts on the request page; requests arrive in Spaka's Content tab. Keep `parts/request-form.liquid` and `data/quote-requests/`; every "Request a visit" button points to `/quote#request`.
- **They call first**: the phone number set large with a call button in place of the form. Replace the form in `parts/request-form.liquid` with the number and a `tel:` button (keep its title and "What happens next"), point the header's button, the hero's, the request band's and the footer's to `tel:`, and delete `data/quote-requests/` and `fragments/quote-thanks.liquid`. The request page changes in its turn.
- **Through their own booking page elsewhere**: every request button links out to it. Point the header's, the hero's, the request band's and the footer's buttons to the maker's address, remove the form from `parts/request-form.liquid` (keep its title, "What happens next" and a button out), and delete `data/quote-requests/` and `fragments/quote-thanks.liquid`.

#### Do you show your work before and after?

- **Before and after** (as built): each project has a photo before as well as after. Keep `parts/before-after.liquid` and each project's scribe; the slider shows only where `same_view` is on.
- **Finished work only**: no before photos. In `parts/before-after.liquid` show the first project's finished photo alone, full width, with a dimension line (`data-measure`) above it giving its weeks, and drop its "Before and after" label; on the project pages show the after photo alone (the `{% elsif record.after %}` branch); remove the `before` and `same_view` fields from `data/projects/_datasource.yaml` and from the records.

#### Is there a workshop?

- **A workshop where the pieces are made** (as built): the home page's workshop section, the services in two columns (made in the workshop, done in your house) and the Workshop page.
- **On site only** (a builder, a window restorer, a painter): in `parts/workshop.liquid` the section becomes the crew (a photo of the team at work, "Who comes to your house"), its figures their own; the services stand in one column (set every service's `made` to `on site` and change the column's heading in `parts/services.liquid`); the Workshop page becomes About at `/about` (rename `pages/workshop.liquid` to `pages/about.liquid`, keep the story and the people, drop the wood unless the maker works with chosen materials) and its navigation record follows.
- **The workshop only** (a cabinetmaker, a kitchen maker who fits what they make): remove the whole-house, porch and window services and those types from the `kind` choices and the work page's chips (and their rules in `styles/site.css`); set the area's note on the last town to say that pieces are delivered and fitted further away.

### Work (`/work`)

The title, the type chips, every project with its photo, its weeks on a dimension line, its town and year, then the request band; each project opens on its own page with its spec as a title block, its before and after, its story beside the build ruler, its details, its client's words and the next project.

#### A page for each project?

- **Yes, a page each** (as built): each project opens on its own page. Keep `pages/work/[projects].liquid`.
- **The gallery only**: the projects with their photos and spec lines, and no pages. Delete `pages/work/[projects].liquid`; in `pages/work.liquid`, `parts/selected-work.liquid`, `parts/before-after.liquid` and the services page, the cards are no longer links (`<div>` in place of `<a href>`, and no "See the project" button); the record's text and `stages` go, and each card shows its `summary` under its photo.

When removed: delete `pages/work.liquid`, `pages/work/` and the `work` navigation record. The home page's before and after band and selected work keep `projects`, without their links to the work page or to the projects' pages ("All projects", "See the project", the cards' links); the services page's projects of each kind are no longer links.

### Services (`/services`)

The title and a line, each service with its photo, what it includes as a ruled list, how long it usually takes, its typical range and up to three projects of its type, what the firm does not do and who to call, the questions, the request band.

#### Do you show what the work usually costs?

- **A typical range for each service** (as built): "Kitchens usually run from $60,000 to $140,000.", with the maker's real figures, asked once the page is built. Keep each record's `range`.
- **No prices**: each service says how it is priced ("A written price after the visit"). Write that line in each record's `range` and relabel the cell "How it is priced" in `pages/services.liquid`, or remove the cell and the `range` field.

When removed: delete `pages/services.liquid` and the `services` navigation record; the home page's services (`parts/services.liquid`) link to `/quote#request` instead of `/services#…`; render `parts/questions.liquid` on the request page, below the steps; `data/services/` stays for the home page.

### Request a visit (`/quote`)

The request in four numbered parts (the work, the house, the timing and budget, the visitor) beside what happens next, then the steps, the area served and the workshop's address and hours.

Its request section follows how clients ask for a quote, chosen with the home page: as built, the form posting to `quote-requests`; by phone, the number set large with a call button; through a booking page elsewhere, a button out.

When removed: delete `pages/quote.liquid`, `parts/request-form.liquid`, `parts/visit-workshop.liquid`, `data/quote-requests/`, `fragments/quote-thanks.liquid` and the `request-a-visit` navigation record; point every "Request a visit" button (`/quote#request`: header, hero, request band, footer) to the phone (`tel:`) or the email (`mailto:`). The area stays on the home page; the address and the hours stay in the footer.

### Reviews (`/reviews`)

The average and the count, every review with its stars, headline, words, name, town and project and date, a link to the firm's reviews on Google, the request band.

#### Where do the reviews come from?

- **Chosen by the maker** (as built): clients' words the maker copies in, with their permission, in the Content tab (`testimonials`), with a link to the firm's page on Google or Houzz. Ask for the link, or remove the button.
- **Clients leave them on the site**: a form with stars below the reviews posts to a collected `reviews` datasource with `review: true`, so the maker approves each one before it shows; add it from the gallery's `forms-reviews-stars` block, show `data.reviews` after `data.testimonials`, and write three test records.
- **Only a link out**: three chosen quotes and a button to the firm's page on Google or Houzz. Keep three `testimonials`, remove the average and the stars from `pages/reviews.liquid`, and set the button large under the quotes.

When removed: delete `pages/reviews.liquid` and the `reviews` navigation record. The home page's quotes keep `testimonials`; their "All reviews" link goes from `parts/quotes.liquid`.

### Workshop (`/workshop`)

The title over a wide photo of the bench room, the firm's story in dated steps, the people, the wood and where it comes from, what clients can count on, the request band.

#### Who appears on the page?

- **The whole team** (as built): a portrait each, or initials on sage until the maker sends photos. Keep `data/team/` with the maker's people.
- **The founders only**: one or two people shown large with a word each. Replace the people section of `pages/workshop.liquid` with the gallery's `team-founder-featured` block and keep only the founders in `team`.
- **Nobody by name**: the story, the wood and the credentials only. Remove the people section from `pages/workshop.liquid`, delete `data/team/`, and take the names out of the story, `parts/request-form.liquid` ("What happens next") and `fragments/quote-thanks.liquid`.

When removed: delete `pages/workshop.liquid`, `data/team/`, `data/workshop-story/`, `data/workshop-woods/` and the `workshop` navigation record. The home page's workshop section (`parts/workshop.liquid`) keeps its photo and figures and loses its "Visit the workshop" button; the credentials move to the request page (render them below the form, from `data/credentials/`).
