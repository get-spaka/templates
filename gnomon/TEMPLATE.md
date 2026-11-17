# Gnomon

A website for an architecture practice, lit by the desert sun: the practice's name, the headings, the main buttons and the photographs stand a little off a plaster wall and each casts a hard, earth-brown shadow that swings and stretches as the visitor scrolls past it. Projects sit in deep openings punched through a thick earth wall, each with its plaque; the approach is told as five hours of a summer day, each with a small solid model of a house and its shadow at that hour; bands of rammed-earth strata settle between the parts of a page. It was written for Ocampo Hale Architects, a practice of six in a 1928 adobe ice house in Tucson, Arizona, designing houses, restorations, small public buildings and shade for the Sonoran Desert. It suits a residential architect, a landscape architect, an interior or garden designer, a design-build firm, a passive-house consultant, or a small engineering or planning office: any practice whose work is buildings or places, shown project by project. Rewrite the projects, the hours of the day, the people and the place; keep the shadows, the openings, the plaques and the plain, first-hand voice.

## How it is made

- Every page has the header (`parts/header.liquid`: the name casting its shadow, the links, "Start a project" and the sundial mark; a full-screen menu on a phone) and the footer (`parts/footer.liquid`: a stratum, the address, visits by appointment, the sunset line, the links, the newsletter strip in `parts/newsletter.liquid` and the registration line). The brief band (`parts/brief-band.liquid`, on monsoon blue) closes most pages; every "Start a project" leads to `/contact#brief`.
- The lists: `projects` (the home page's hero and wall, the projects page, a page each, the news notes' project plaque), `services` (the home page's "What we design" and the projects page's chips; each service's `types` lists the project types it counts, so the counts are worked out from `projects`), `home-day` and `practice-day` (the five hours, short on the home page, longer on the practice page), `home-stats`, `people`, `practice-milestones`, `practice-stages` and `recognition` (the practice page), `testimonials` (the home page's clients' words; a project's own words are in its record), `news` (the home page's latest lines, the news page, a page each), `hours` and `contact-faq` (the contact page) and `navigation` (the header and the footer). `enquiries` collects the brief and `newsletter` the footer's sign-ups.
- A news note names its project by the project's id (`project: wash-house`). A project's `type` must be one of the `types` of a service for the chips to count it.

## When adapting

- The practice's name is in the header (and its phone menu), the footer, every `<title>` and description, the home page's practice paragraph (`parts/practice-in-brief.liquid`) and the practice page; the address, phone and email in the footer, the contact page's studio section and its "Get directions" link (an OpenStreetMap search for the address). The partners' names sign `parts/practice-in-brief.liquid`.
- **The sun follows the place.** The sunset line (`parts/sunset-line.liquid`) holds the studio's `data-lat`, `data-lng` and `data-tz` (an IANA time zone, America/Phoenix for Tucson) and its words, "Sunset in Tucson today", and the plain line shown with no script ("Studio open weekdays 8:30 to 5:30"): set all three to the maker's city. The five hours, the facts on the sun and the texts speak of a hot, dry climate; for a practice elsewhere rewrite what each hour does (a cold climate's hours are about letting the sun in) and keep the hours and the models.
- **The photographs are the maker's.** The template's photos are found ones standing in for the practice's work: never leave them on a maker's project as if they had built it. Until the maker gives their own, set a project's `cover` and `photo_1` to `photo_4` empty: each shows an empty opening in rammed earth with "Photograph to come", plaque and all. Say so to the maker.
- **Registration and awards are the maker's.** "Arizona registered architects", "AIA", each person's `credentials` and the `recognition` list are invented: ask for the real ones, or leave them out; never invent a license number or an award.
- The portraits are initials in an opening of rammed earth until the maker gives photos: put them in each `people` record's `portrait`.
- The figures (`home-stats`), the fees paragraph on the practice page, the site study's price ($850, in the brief band, the contact page's answer fragment `fragments/enquiries-thanks.liquid` and the practice page) and the questions' prices are the template's: ask for the maker's.

## Pages

### Home (`/`)

The statement casting its shadow beside the lead project in a deep opening, the practice in brief with four figures, a stratum, the wall of openings (the featured projects), a summer day in five hours on palo verde, what the practice designs with its counts, a client's words, the latest news and the brief band.

#### How does a client begin a project?

- **A brief, through the form** (as built): "Start a project" in the header, the hero and the brief band (on most pages) leads to the brief on the contact page (`/contact#brief`); briefs arrive in the Content tab and the practice answers by email.
- **A first call, booked on the practice's scheduling page**: ask for its address. Change every `href="/contact#brief"` (in `parts/header.liquid`, its phone menu included, `parts/hero.liquid` and `parts/brief-band.liquid`) to it, and their labels to "Book a first call". The contact page keeps the studio and the questions, `{% render 'brief-form' %}` goes with `parts/brief-form.liquid`, `data/enquiries/` and `fragments/enquiries-thanks.liquid`, and the line under its title says what the call covers (its own turn).
- **By email or phone**: every "Start a project" becomes "Write to us" with `href="mailto:…"`; the contact page sets the email and phone large in place of the brief (its own turn), and `data/enquiries/`, `parts/brief-form.liquid` and `fragments/enquiries-thanks.liquid` go.

#### What does the practice design?

- **Buildings, around the sun** (as built): the five hours of the approach, the facts on the sun on each project and the shadows stay as they are.
- **Interiors**: the five hours become the light in a room through a day (rewrite `home-day` and `practice-day`; the models stay), the services become the kinds of rooms or projects, and on each project page "The sun" becomes "The room": light, materials and makers (`faces`, `shade`, `energy`, `walls` relabeled in `data/projects/_datasource.yaml` and in `pages/projects/[projects].liquid`); `area` is the room's.
- **Landscapes and gardens**: the hours follow a garden's shade and water, the services become gardens, courtyards and public landscapes, and the sun's facts become planting, water and shade; `area` is the site's.

### Projects (`/projects`)

The title with the count, a stratum, then the wall of openings: chips to show one kind of project (from `services`), every project as an opening whose shape is its record's `opening` (tall, square, wide), its plaque and its idea; then the brief band. Each project has its page: its name at poster size casting its shadow with its status, the cover in a deep opening, the building's facts and the sun's facts as ruled plaques, the story in three parts, four photographs in openings, the client's words, the next project and the brief band.

#### Which projects does the list show?

- **Built and unbuilt, each with its status** (as built): `status` built, on-site or in-design, with its dot; the chips filter by kind.
- **Grouped by status**: in `parts/project-wall.liquid` replace the chips with three walls one after another, "Built", "On site" and "On the drawing table", each looping over `data.projects | where: "status", …`.
- **Built work only**: remove the status dots and the status words from `parts/plaque.liquid`, `pages/projects/[projects].liquid` and `parts/hero.liquid`, and `status` from the definition and records; the title's line says "buildings".

#### What does a project's page tell about the climate?

- **The facts on the sun** (as built): faces, shade, energy and walls, from the maker's own figures; ask for them.
- **The building's facts only**: for a practice that does not measure its buildings. Remove the "The sun" column from `pages/projects/[projects].liquid` and the four fields from the definition and records; the story keeps "How it lives through the day".

When removed: the home page's wall shows the projects without links: in `parts/wall.liquid` replace each `<a href="/projects/…">` with a `<div>` and remove "All projects"; delete `pages/projects/`, `parts/project-wall.liquid` and the Projects navigation record; point the hero's "See the projects" to `/#work`; remove the project plaque from `pages/news/[news].liquid`.

### Practice (`/practice`)

The statement "We design for the sun we have." and a lead paragraph, the ice house in an opening beside four dated lines, a summer day in five hours (longer texts), the people as portraits in small openings, how a project goes in six numbered stages, the fees in one paragraph, the recognition by year and the brief band.

#### Who is the practice?

- **Two partners and a team** (as built): the partners sign the home page's paragraph; `people` shows everyone.
- **One architect**: rewrite the texts in the first person singular ("I"); in `pages/practice.liquid` replace the people grid with one portrait in a larger opening beside a longer bio; `people` keeps one record; the home page's signature is one name.
- **A larger studio**: in `pages/practice.liquid` show the people as ruled rows by role (partners, associates, studio) without openings; the partners' portraits move to the home page's practice paragraph.

#### How does the practice speak of its fees?

- **One paragraph on how fees work** (as built): a percentage of the cost of building, then a fixed fee, with the site study credited. Ask for the maker's own terms.
- **A fee for each stage**: add a `fee` text field to `data/practice-stages/_datasource.yaml`, show it under each stage's duration, and remove the fees section.
- **Not on the site**: remove the fees section; add a question to `contact-faq` saying fees are given after the site study.

When removed: delete `pages/practice.liquid`, `data/practice-day/`, `data/people/`, `data/practice-milestones/`, `data/practice-stages/`, `data/recognition/` and the Practice navigation record; point "About the practice" in `parts/practice-in-brief.liquid` to `/#practice`. The five hours stay on the home page.

### News (`/news`)

The notes as a ruled list: date, kind (Project, Award, Talk, Studio), title, a line and a small opening for those with a cover. Each note has its page: kind and date, title, a line, its cover in an opening, the text, the project it is about as a plaque, and the other notes.

#### What does the news hold?

- **Notes with a page each** (as built): projects begun and finished, awards, talks and the studio's own news.
- **Press and awards only, linking out**: add a `link` field to `data/news/_datasource.yaml`; in `parts/news-lines.liquid` make each line link to `{{ note.link }}`; delete `pages/news/[news].liquid` and the notes' text and covers.

When removed: delete `pages/news/`, `parts/news-lines.liquid`, `parts/latest-news.liquid`, `data/news/` and the News navigation record, and remove `{% render 'latest-news' %}` from the home page. Recognition stays on the practice page.

### Contact (`/contact`)

The title "Start a project", a stratum, the brief in three numbered parts on rammed earth with its index (the site, the project, you), the studio's address with "Get directions", the hours and the sunset line, and the questions clients ask first.

Its brief follows how a client begins, chosen with the home page.

#### What does the brief ask first?

- **The site** (as built): the site, then the project, then you, since the practice designs from the site.
- **The project**: for a practice whose clients often have no site yet. In `parts/brief-form.liquid` move the "The project" fieldset first and renumber the parts and the index; remove `required` from the site's input and from `site` in `data/enquiries/_datasource.yaml`.

When removed: delete `pages/contact.liquid`, `parts/brief-form.liquid`, `data/enquiries/`, `data/hours/`, `data/contact-faq/`, `fragments/enquiries-thanks.liquid` and the Contact navigation record; point every "Start a project" to the practice's email (`mailto:`); the footer keeps the address.
