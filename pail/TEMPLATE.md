# Pail

Pail is the website of a flower shop that reads like its sidewalk on a market morning: this week's stems standing in a row of galvanized pails, each with its enamel plate giving the price of a stem, which a visitor picks for their bunch before sending the order; a line at the top of every page that says whether flowers ordered now go out today; a ZIP code check for delivery; and the year in stems, month by month. It was written for Incline Flowers, a flower shop and studio in an old butcher's shop on the South Side of Pittsburgh that delivers across the city in its own van, does weddings and events, runs standing orders and teaches a workshop a month; it suits a neighborhood florist, a flower studio that delivers, a flower farm's stand or shop, a plant and flower shop, a wedding and event florist with a counter, a dried flower studio, or a market flower stall with a website. Keep the structure; rewrite the stems and their months, the sizes and their prices, the zones and their ZIP codes, the growers, the people and the city.

## How it is made

- Every page shares the header (`parts/header.liquid`: a zinc strip with the order-by line and "Do we deliver to you?", the name "Incline" with "Flowers", the pages and an "Order flowers" button; a Menu button below 1280 px) and the footer (`parts/footer.liquid`, on zinc: the name, the order-by line, the week as rows with each day's cutoff, the address, phone, email and links).
- The opening hours drive the order-by line. The footer renders each record of `hours` as a row that `scripts/shop-clock.js` reads, in the time zone of `data-tz` on the footer; from it the script knows whether an order placed now goes out today, tomorrow or later, and shows the matching line of `parts/order-by.liquid` (in the header, the hero, the home page's zones, the order form's aside and the footer). `parts/time.liquid` shows a 24-hour time of the records as customers read it (1 pm).
- The lists: `stems` (the pails on the home page and the order form, the counter's price list, the season page and the weddings' swatches; `this_week` puts a stem in the pails), `months` (the season page's twelve lines), `sizes` (the home page and the order form), `zones` (the home page, the delivery page's ZIP check and table, the order form's aside), `hours` (the footer and the about page), `plans`, `standing-steps` (standing orders), `weddings` (the wedding book and a page per wedding), `wedding-steps`, `weddings-faq`, `workshops`, `growers`, `team`, `testimonials`, `home-doors`, `delivery-steps`, `delivery-notices`, `delivery-faq`, `flowers-faq`, `care-tips`, `navigation`. Four collected datasources take what visitors send: `orders` (answered by `fragments/orders-thanks.liquid`), `consultations`, `standing-orders` and `workshop-requests`, each with its thank-you fragment.

## When adapting

- The name (Incline Flowers) is in `parts/logo.liquid` (the wordmark "Incline" and the word "Flowers" beside it), every page's title, `parts/footer.liquid`'s last line and `parts/story.liquid`. The address (37 Mercer Steps, South Side, Pittsburgh, PA 15203) is in the header's phone menu, the footer and `parts/visit.liquid`, with "Get directions" links to a map search for it: change it in those links too. The phone ((412) 555-0147) and the email are in the footer, `parts/faq.liquid`, `parts/order-form.liquid`, `parts/zip-check.liquid`, `parts/visit.liquid` and `parts/private-workshops.liquid`.
- Set `data-tz` on the footer (`parts/footer.liquid`, and the footer block) to the maker's city's time zone ("Europe/Paris", "America/Chicago"), so the order-by line follows the shop's clock, not the visitor's.
- The hours, the delivery days and the cutoffs are facts: ask for them, or keep the example and say so. Write them in `data/hours/` only, in 24-hour form (`opens`, `closes`, `delivers`, `cutoff`); `hours` and `note` say the same in words for the about page. The line shown with no script ("Same-day delivery when you order by 1 pm, Tuesday to Saturday" in `parts/order-by.liquid`), the delivery page's intro, the zip answers ("when you order by 1 pm" in `parts/zip-check.liquid`), `parts/pickup.liquid` and `data/delivery-steps/` must say the same.
- For a site in French, German or most of Europe, make `parts/time.liquid` write the time as it is (13:00).
- The zones, their ZIP codes and fees are facts: ask for them. The ZIP check reads any code typed into a zone's `zips`; for a country with postcodes, list the postcode districts ("SE15", "N19"): the script also matches a code that starts with one of them.
- Prices (the sizes, a stem's price, the plans, the weddings' "from", the workshops) are facts: keep the examples only if the maker says so.
- The stems are the shop's real stock: keep the example stems for the season page if the maker grows or buys the same, and ask which are in this week (`this_week`). Their `months` must be true for the maker's region. Their photos should be tall and upright, one kind of flower each, so the crop reads as stems standing in a pail.
- The growers, the people (shown as initials until the maker sends photos), the weddings and the shop's story are invented: replace them with the maker's, or leave them out rather than invent others. Never name a real farm or wholesaler the maker did not give.
- The three quotes of "What people say" (`data/testimonials/`) are invented and never stay: ask for real ones, given with the customers' permission, or remove `{% render 'testimonials' %}` from the home page.

## Pages

### Home (`/`)

The headline and the order-by line beside three tall stems in their pails, this week's pails to pick a bunch from, the three sizes, today or tomorrow with the zones, four doors (weddings, standing orders, workshops, office flowers), a weddings band and what customers say.

#### How do customers order?

- **A request, confirmed by phone** (as built): the order form on `/flowers` takes the stems, the size, the day and the card; orders arrive in the Content tab and the shop calls back to take payment. Every "Order" button leads to `/flowers#order`.
- **On the shop's own online store**: ask for its address, never invent it. Every "Order flowers" and "Order an Armful" button (`parts/header.liquid`, `parts/hero.liquid`, `parts/sizes.liquid`, `parts/blush-band.liquid` on the standing orders page) links to it and says "Order online"; in `parts/this-week.liquid` the form becomes a plain `<div>`, its pails are rendered without `pick: true` and the button gives way to the line "Ask for these stems in your order notes". On `/flowers` replace `{% render 'order-form' %}` with a section holding the pails, the sizes and a large "Order online" button; delete `data/orders/`, `fragments/orders-thanks.liquid` and the stems' part of `scripts/prefill.js`.
- **By phone or text only**: every "Order" button becomes "Call to order" (`tel:`), with a "Text us" link (`sms:`) beside it; the pails stay, without `pick: true`, with "Tell us which ones when you call". Replace the order form with the phone set large and the sizes; delete `data/orders/`, `fragments/orders-thanks.liquid` and `scripts/prefill.js` (keep its workshop part if the workshops' form stays).

#### Do you deliver?

- **Yes, by zone, same day before a cutoff** (as built): the order-by line, the zones and the delivery page.
- **Yes, but next day only**: in `data/hours/` set `cutoff` to the time orders close for the next day and in `parts/order-by.liquid` make every line about tomorrow ("Order by 4 pm for delivery tomorrow"; the `today` line says "Order by <cutoff> for delivery tomorrow"); remove `same_day` from `data/zones/` and the "same day" wording of `parts/zones-band.liquid`, `parts/zip-check.liquid` and `parts/order-form.liquid`.
- **Pickup only**: the order-by line becomes "Order by noon to pick up today" (rewrite the lines of `parts/order-by.liquid` around `cutoff`); remove `{% render 'zones-band' %}` from the home page, delete the delivery page (see below), `data/zones/`, and the delivery fields of the order and standing order forms (and their fields in `data/orders/` and `data/standing-orders/`); "Do we deliver to you?" in the header becomes the address.

#### What do customers choose?

- **The florist's choice in three sizes, around the stems they pick** (as built).
- **The florist's choice in three sizes, without picking**: the pails become a plain row of what's in: render them without `pick: true`, remove the counter line under each shelf and the GET form of `parts/this-week.liquid`; the order form loses its first part; remove `stems` from `data/orders/_datasource.yaml`. For a shop that cannot promise any stem.
- **A few set bouquets, with their photos**: a `products` list adapted from the gallery's `products-tall-minimal`, four to six named bouquets with their prices, replaces `{% render 'sizes' %}` on the home page and the sizes of the order form, whose `size` becomes the bouquet (its choices the bouquets' ids); the pails stay as "In the shop this week".

### Flowers (`/flowers`)

The order form in four parts (the pails to pick from, the size, when and where, the sender and the card) beside the order-by line and the fees, the stems by the stem at the counter, notes on sympathy flowers and hospitals, and questions. Its form follows how customers order and what they choose, chosen with the home page.

#### Do you write the card?

- **Yes, by hand** (as built): the card's message in the form, "We'll handwrite it".
- **No card**: remove the card's field from `parts/order-form.liquid` and `card` from `data/orders/_datasource.yaml` (and its `body: card`), rename the fourth part "You", and delete `data/flowers-faq/chocolates.md` or rewrite it.

When removed: delete `pages/flowers.liquid`, `parts/order-form.liquid`, `parts/by-the-stem.liquid`, `parts/sympathy.liquid`, `data/orders/`, `fragments/orders-thanks.liquid`, `data/flowers-faq/` and the `flowers` navigation record; point every "Order flowers" and "Order an Armful" button to the phone (`tel:`) or the shop's store; in `parts/this-week.liquid` the pails keep their counter but the form and "Make a bunch of these" go.

### Delivery (`/delivery`)

"Do we deliver to you?" with the ZIP field and its answer over the zones table, the day's runs in four steps, pickup, the holidays' cutoffs and questions by topic.

#### How are the zones told apart?

- **By ZIP code, with the check** (as built).
- **By neighborhood only**: for a town too small for ZIP codes to help. Remove the form from `parts/zip-check.liquid` (its title stays over the table), `zips` from `data/zones/` and the codes' line from the table, and delete `scripts/zip-check.js`.
- **One flat fee within a distance**: one record in `data/zones/` ("Within 10 miles of the shop", $15); remove the form and the table from `parts/zip-check.liquid` for a paragraph saying so, delete `scripts/zip-check.js`, and make the home page's zones (`parts/zones-band.liquid`) that one line.

When removed: delete `pages/delivery.liquid`, `parts/zip-check.liquid`, `parts/pickup.liquid`, `parts/holidays.liquid`, `parts/faq-by-topic.liquid`, `data/delivery-steps/`, `data/delivery-notices/`, `data/delivery-faq/`, `scripts/zip-check.js` and the `delivery` navigation record; the home page's zones and the order-by line stay, and every link to `/delivery#zip` ("Do we deliver to you?" in the header, "Check your ZIP code", "Which zone are you in?") points to the home page's zones, `/#zones`.

### Standing orders (`/subscriptions`)

The plans as rows (every week, every other week, once a month, the front desk), how it works in four steps, the request form and a band to order a single bunch.

#### How do customers start one?

- **A request, set up by phone** (as built): the form, then the shop calls to set the day and take a card.
- **On the shop's own subscription page**: ask for its address. Each plan's `href` in `data/plans/` links there; remove `{% render 'standing-form' %}` and delete `parts/standing-form.liquid`, `data/standing-orders/` and `fragments/standing-orders-thanks.liquid`; `data/standing-steps/` says how it works there.

When removed: delete `pages/subscriptions.liquid`, `parts/plans.liquid`, `parts/standing-form.liquid`, `data/plans/`, `data/standing-steps/`, `data/standing-orders/`, `fragments/standing-orders-thanks.liquid` and the `subscriptions` navigation record; delete the home page's doors `data/home-doors/standing-orders.md` and `office-flowers.md`.

### Weddings & events (`/weddings`)

Full service and market pails side by side, the wedding book (four weddings with their stems as swatches, each opening on its page with its story and photos), how a wedding is planned, the consultation form and questions.

#### What do you offer couples?

- **Full service and market pails** (as built).
- **Full service only**: remove the market pails panel from `parts/two-ways.liquid` (the full-service panel takes the width) and its choice from `parts/consultation-form.liquid` and `data/consultations/_datasource.yaml`; "or market pails… from $450" leaves `parts/weddings-band.liquid` and `data/home-doors/weddings-and-events.md`.
- **Market pails only**: for a flower farm or a shop that does not set up. Remove the full-service panel and its choice, the step `data/wedding-steps/the-day.md` and the questions on setup; `parts/weddings-band.liquid` says "Wedding flowers by the pail".

#### A page for each wedding?

- **Yes** (as built): each wedding opens on its page with its stems, story and photos.
- **The book only**: in `parts/wedding-book.liquid` the rows keep their swatches but their photo and "See this wedding" are no longer links; delete `pages/weddings/[weddings].liquid`.

When removed: delete `pages/weddings/`, `parts/two-ways.liquid`, `parts/wedding-book.liquid`, `parts/wedding-steps.liquid`, `parts/consultation-form.liquid`, `parts/faq-two-columns.liquid`, `data/weddings/`, `data/wedding-steps/`, `data/weddings-faq/`, `data/consultations/`, `fragments/consultations-thanks.liquid` and the `weddings` navigation record; on the home page replace `{% render 'weddings-band' %}` with a band to `/flowers`, delete `data/home-doors/weddings-and-events.md`, and remove the season page's `blush-band`.

### The season (`/season`)

The year in stems: twelve months, each with a line and its stems as swatches, grown nearby or brought in, the current month marked "Now"; how to look after the flowers; and a band to the weddings. It has no choice of its own: its stems are the pails' records.

When removed: delete `pages/season.liquid`, `parts/year.liquid`, `parts/care-tips.liquid`, `data/months/`, `data/care-tips/` and the `season` navigation record; remove "What's in all year" from `parts/this-week.liquid`, the "What's in on your date?" panel from `parts/consultation-form.liquid`, and the links of the wedding pages' swatches (render `stem-chips` without `month`); `months` stays on the stems for a later page.

### Workshops (`/workshops`)

Four dated workshops in the locker room, the form to save a seat, and private workshops in one line.

#### How do people save a seat?

- **A request, paid at the door** (as built).
- **On an outside ticket page**: each workshop's `booking` in `data/workshops/` leads there and its button says "Book a seat"; remove `{% render 'workshop-form' %}` and delete `parts/workshop-form.liquid`, `data/workshop-requests/` and `fragments/workshops-thanks.liquid`; `scripts/prefill.js` no longer needs its `workshop` line.
- **By email**: each workshop's `booking` becomes a `mailto:` with the workshop's title as its subject (`mailto:…?subject=Dahlia%20night`); the form goes as above.

When removed: delete `pages/workshops.liquid`, `parts/workshop-list.liquid`, `parts/workshop-form.liquid`, `parts/private-workshops.liquid`, `data/workshops/`, `data/workshop-requests/`, `fragments/workshops-thanks.liquid` and the `workshops` navigation record; delete `data/home-doors/workshops.md`.

### About (`/about`)

The shop's story beside a photo of its window, who grows the flowers, the people, the week's hours with the address, and how to get there.

#### Who appears on the page?

- **The people by name** (as built): four square portraits, or initials on blush until the maker sends photos (`photo` in `data/team/`).
- **The founders only**: one or two people shown large with a few words each, adapted from the gallery's `about-founder-note` in place of `{% render 'people' %}`; `data/team/` keeps only them.
- **Nobody by name**: remove `{% render 'people' %}` and delete `parts/people.liquid` and `data/team/`; `parts/story.liquid` speaks of "we".

#### Where do your flowers come from?

- **Growers nearby, named** (as built): the growers' list and the plates' "38 miles".
- **Mostly from wholesalers**: replace `{% render 'growers' %}` with one paragraph on where the shop buys and how it chooses; delete `data/growers/`; in `parts/pail.liquid` and `parts/by-the-stem.liquid` the line keeps only the vase life, and `grower`, `distance` and `from` go from the stems (and the marks from `parts/year.liquid`).

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/growers.liquid`, `parts/people.liquid`, `parts/visit.liquid`, `parts/finding-us.liquid`, `data/growers/`, `data/team/` and the `about` navigation record; the footer keeps the address and the hours.
