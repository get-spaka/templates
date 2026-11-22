# Decal

Decal is the website of a food truck that answers the first thing everyone asks: where are you today? The week is drawn from above as parking bays on a band of asphalt, each day painted on the road, and a small yellow truck sits in the bay where it is parked today. The menu is the board beside the window, and booking the truck starts from its data plate and a request whose guest count works out the service time and the price. It was written for Pasada, a Filipino street-food truck in Durham, North Carolina, that parks at seven stops a week; it suits a taco, burger, pizza, barbecue, dumpling or coffee truck, an ice cream truck or a trailer, a cart that moves between markets, a pop-up kitchen with a weekly round of breweries, or a mobile bar. Keep the structure; rewrite the stops, the menu, the truck's facts, the event offers, the people and the town.

## How it is made

- Every page shares the header (`parts/header.liquid`: the name beside the truck seen from above, the links of `navigation`, a yellow "Book the truck" button; a Menu button below 1024 px) and the footer (`parts/footer.liquid`, on asphalt: "Follow the truck", the Monday email strip `parts/email-strip.liquid`, the booking phone and email, home base and the links).
- The week drives the site. `stops` holds the regular week; `parts/parking-row.liquid` draws it (home base, each day's stops in bays through `parts/bay.liquid`, a keep-clear box for a day with none), and `scripts/parking-row.js` reads it in the truck's time zone (`data-tz`) to park the truck in today's bay and mark the next stop. `parts/time.liquid` shows a stop's 24-hour times as visitors read them (11 am, 5 pm, noon); `parts/day-name.liquid` names the days.
- The lists: `stops` (the home page's row, the Where & when page, the menu page's strip), `menu` (the home page's board and photos, the menu page), `events` (the home page and Where & when), `where-features` and `where-faq` (Where & when), `book-plans`, `book-stats`, `book-steps`, `book-faq` and `testimonials` (Book the truck), `team` and `gallery` (Our story), `navigation`. `event-requests` collects the booking form and is answered by `fragments/event-requests-thanks.liquid`; `newsletter` collects the footer's sign-up, answered by `fragments/newsletter-thanks.liquid`.

## When adapting

- The name (Pasada) is in `parts/logo.liquid` (the header and the footer), on the truck's roof in `parts/truck.liquid` ("PASADA", in capitals, short enough to fit: a long name keeps only its first word), on the window's panel in `parts/window.liquid`, on the data plate (`parts/data-plate.liquid`), in `parts/footer.liquid` (the Instagram button and the last line), the story's texts and every page's title. The town is in the hero's label, the footer, the data plate's travel line and the page titles.
- Set `data-tz` in `parts/parking-row.liquid` and `parts/today-strip.liquid` to the maker's town's time zone ("America/Chicago", "Europe/Paris"), so the truck parks by the truck's clock, not the visitor's.
- The stops are facts: ask for them, or keep the example and say so. Write them in `data/stops/` only, with `starts` and `ends` in 24-hour form; the row, its lines and the strip follow. The plain lines written in words must say the same: the hero's sentence ("seven Durham stops a week"), "Tuesday to Saturday" in `parts/this-week.liquid`, the header's phone menu and `parts/today-strip.liquid`, and the keep-clear days' words in `parts/bay.liquid` (Monday's prep day, Sunday's family day).
- For a site in French, German or most of Europe, make `parts/time.liquid` write the time as it is (11:00, 17:00), and `parts/day-name.liquid` name the days in the site's language (the short form is the road paint's three letters).
- The truck's facts (its size, the space and power it needs, how many it feeds an hour, the travel radius and the minimums) are facts: they are written in `parts/data-plate.liquid` and, as numbers, on the form in `parts/request-form.liquid` (`data-per-hour`, `data-minimum-weekday`, `data-minimum-saturday`, and each package's `data-per-guest`, `data-min-guests`), and in the booking band (`parts/booking-band.liquid`): change them together, or leave the figures out rather than guess.
- Prices, the phone ((919) 555-0148) and the email (events@pasadatruck.com) are facts. The phone is in the window, the footer, the request's panel and the questions.
- The people, Lola Nena's story and the testimonials are invented: replace them with the maker's, or leave them out. Never keep the testimonials as they are, and never invent new ones; the crew shows initials until the maker sends photos.
- The events are invented, with placeholder links (example.org): ask for the maker's real ones, or remove them and `parts/events-list.liquid` from the pages.

## Pages

### Home (`/`)

The window with the headline, this week's parking row with the truck in today's bay, the board with three dishes in photos and the featured dishes, festivals and pop-ups, the booking band, and the story in short.

#### How do people order at a stop?

- **They walk up to the window** (as built): no ordering online. "Where we are this week" is the hero's first button. Nothing to change.
- **They can also order ahead for pickup**: the truck's own ordering page (Square, Toast, Hotplate…) is a link that leaves the site, never a widget. Add an "Order ahead" link to each stop's details in `parts/bay.liquid` (after Directions), an "Order ahead" link under the board in `parts/board-home.liquid` and `parts/menu-board.liquid`, and an "Order ahead" button beside "Book the truck" in `parts/header.liquid` (and its phone menu); the hero's second button becomes "Order ahead" (`parts/hero.liquid`); add a question to `data/where-faq/` on how pickup works at the window.
- **They pre-order, and pick up at the stop**: every stop gets "Pre-order for this stop" in `parts/bay.liquid`, a link to the truck's ordering page, with the cut-off time in each stop's `note` ("Order by 8 pm the night before"); `data/where-features/` says how pickup works in place of ordering at the window.

#### How does your week run?

- **The same stops every week** (as built): `stops` by weekday, the truck in today's bay.
- **A new schedule every week**: add a `date` field (kind date) to `data/stops/_datasource.yaml` in place of `day`, with `sort: date`; in `parts/parking-row.liquid` show the next seven days' records (a day without one hatched by `parts/bay.liquid`), and give each bay `data-date` for the script, which then compares dates instead of weekdays in `readStops` (`scripts/parking-row.js`). The footer's line becomes "This week's stops go up on Sunday nights", and tell the maker the row is refilled each week in the Content tab.
- **One spot most days** (a truck or trailer at a pod, a brewery or a market): keep one record per open day, all at the same place; name the place once above the row in `parts/this-week.liquid` with its address and "Directions", and drop the place and Directions from each bay in `parts/bay.liquid`, which then shows its hours only.

### Where & when (`/where`)

The regular week as a large parking row with each stop's address and note, how it works at the window, every festival and pop-up coming, and questions. Its row follows how the week runs, chosen with the home page.

When removed: delete `pages/where.liquid`, `parts/where-row.liquid`, `parts/at-the-window.liquid`, `data/where-features/`, `data/where-faq/` and the `where-and-when` navigation record; point "The whole week, with notes" (`parts/this-week.liquid`) and "Every date" (`parts/events-list.liquid`) to `/#week` and `/#events`, the strip's "See where" (`parts/today-strip.liquid`) and the header's phone menu button to `/#week`; give the home page's row `full: true` so it keeps every stop's address and note.

### Menu (`/menu`)

Today's stop in a slim yellow strip, the whole menu on the asphalt board by course with the week's special on its card, six dishes in photos, the allergy line and a pink band to book the truck.

#### Do the dishes have photos?

- **The dishes that have one** (as built): three on the home page above the board, six on the menu page; a dish without a photo is a line on the board only.
- **The board only**: remove the three photos from `parts/board-home.liquid` (its first `<ul>`) and `{% render 'dish-cards' %}` from `pages/menu.liquid`, and delete `parts/dish-cards.liquid`; the board keeps every dish, and the window's photo is the site's food picture.

#### Is it the same menu at every stop?

- **One menu all week** (as built), with the morning menu noted on the Saturday stop and in the page's title line.
- **A morning menu and a day menu**: add `served` to `data/menu/_datasource.yaml` (a choice: mornings, all day, afternoons) and set each dish's; in `parts/menu-board.liquid` give the board two tabs, Mornings and Lunch & evenings, as radio inputs each followed by its label and its panel (no script, the first checked), each panel filtering `data.menu` by `served`; add `menu` to `data/stops/_datasource.yaml` (a choice: morning, day) and show it on each stop's details in `parts/bay.liquid`.

When removed: delete `pages/menu.liquid`, `parts/menu-board.liquid`, `parts/dish-cards.liquid`, `parts/allergies.liquid`, `parts/crowd-band.liquid`, `parts/today-strip.liquid` and the `menu` navigation record; remove "The whole menu" from `parts/board-home.liquid`. The home page's board stays over `menu`.

### Book the truck (`/book`)

The truck's data plate (will it fit, will it feed us), three ways to serve with their prices, the truck's figures, how booking works in four steps, the request with its guest count, kind words and questions.

#### How do people book the truck?

- **A request form, answered with a quote** (as built): requests arrive in the Content tab; the guest count works out the service time and the price. Keep `parts/request-form.liquid`, `data/event-requests/`, `fragments/event-requests-thanks.liquid` and `scripts/headcount.js`; if the packages change, change the form's radios (with their `data-` figures) and the `package` choices together.
- **Through an outside booking page** (the truck's own catering page, ezCater, Roaming Hunger…): every "Book the truck" button links there and says "Book online" (the header, the hero, `parts/booking-band.liquid`, `parts/crowd-band.liquid`, and each plan's `href` in `data/book-plans/`); the plate, the packages and the steps stay. Remove `{% render 'request-form' %}` and delete `parts/request-form.liquid`, `data/event-requests/`, `fragments/event-requests-thanks.liquid` and `scripts/headcount.js`.
- **By phone or email**: in place of `{% render 'request-form' %}`, the phone and the email each on a card, adapted from the gallery's `contact-three-cards` (the third card for the area served), beside a short line on what to tell you; delete `data/event-requests/`, `fragments/event-requests-thanks.liquid` and `scripts/headcount.js`, and point each plan's `href` to `#contact`.

#### How are events charged?

- **Per guest, with a minimum** (as built): the three packages, and the guest count's price.
- **Guests pay at the window, the host guarantees a minimum**: replace `{% render 'plans' %}` with one sentence on the data plate's minimum cell ("Your guests order and pay at the window. If sales come in under $1,400, you cover the difference."); in `parts/request-form.liquid` remove the package radios (and `package` from `data/event-requests/_datasource.yaml`) and make the count line "About [duration] of service" only (drop the price and package slots); delete `parts/plans.liquid` and `data/book-plans/`.
- **On a quote only**: no price on the site. Remove the minimum cell from `parts/data-plate.liquid` and the price from each `data/book-plans/` record (`parts/plans.liquid` then shows what each includes), make the count line show the service time only, and take the prices out of the booking band and the page's description.

When removed: delete `pages/book.liquid`, `parts/data-plate.liquid`, `parts/plans.liquid`, `parts/figures.liquid`, `parts/steps.liquid`, `parts/request-form.liquid`, `parts/kind-words.liquid`, `data/book-plans/`, `data/book-stats/`, `data/book-steps/`, `data/book-faq/`, `data/event-requests/`, `data/testimonials/`, `fragments/event-requests-thanks.liquid`, `scripts/headcount.js` and the `book-the-truck` navigation record; the header's button and the hero's second button become "Where we are this week" (`/where`), the menu page's pink band goes, and on the home page replace `{% render 'booking-band' %}` with the footer's email strip set large.

### Our story (`/about`)

The title over a wide photo of the truck, the story in three short parts, the crew as round portraits or initials, and the truck's year in six photos.

#### Who appears on the page?

- **The crew by name** (as built): four round portraits, or their initials on yellow until the maker sends photos (`photo` in `data/team/`).
- **The founder only**: one person shown large in their own words, adapted from the gallery's `about-founder-note` in place of `{% render 'crew' %}`; `data/team/` keeps only them.
- **Nobody by name**: remove `{% render 'crew' %}` and delete `parts/crew.liquid` and `data/team/`; the story speaks of "we".

When removed: delete `pages/about.liquid`, `parts/about-story.liquid`, `parts/crew.liquid`, `parts/truck-year.liquid`, `data/team/`, `data/gallery/` and the `our-story` navigation record; remove the "Our story" button from `parts/story-short.liquid`, which keeps its two paragraphs.
