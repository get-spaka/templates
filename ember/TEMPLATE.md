# Ember

A website for an evening restaurant and wine bar, seen by candlelight. It was written for a wine bar and wood-fire kitchen; it suits a cocktail bar, a steakhouse, a tasting-menu dining room, an izakaya, a jazz bar, a wine shop with a bar or a hotel's restaurant. Rewrite the dishes, the wines, the rooms and the evening, and keep the dark, the one warm light and the slow pace.

## How it is made

- `/` (`pages/index.liquid`): the hero (the name and the open tonight line), the house's statement, the evening from the first pour to the last glass, the menu card, the wines by the glass, the Cellar Room, what's on and what the press said.
- `/menu`: the page title, the courses with their dishes, then the tasting menu.
- `/wine`: the sommelier's title, the glass list, the cellar's bottles and the wine dinners.
- `/private-dining`: the page title, the two rooms, what's on and the enquiry form.
- `/story`: the page title, three chapters (the warehouse, the hearth, the cellar), the team and the suppliers.
- `/visit`: the reservation form, the hours, how to find the place, gift cards and questions.
- `/events/<id>`: each event's page, with its date, its details and a button to request seats, then the other events.
- The header and the footer are on every page; the footer holds the address, the hours, the monthly letter's form and the navigation.

The lists: `menu` (the menu page's courses and the home page's menu card), `menu-tasting` (the menu page), `wines` (the home page's glass list and the wine page), `home-evening` and `home-press` (the home page), `events` (what's on, the wine dinners and the event pages), `private-rooms` (the private dining page), `team` and `story-suppliers` (the story page), `hours` (the visit page and the footer), `visit-faq` (the visit page) and `navigation` (the header and the footer); `reservations`, `enquiries` and `newsletter` collect the answers of the visit page's, the private dining page's and the footer's forms. The design notes explain how each works.

## When adapting

- The name is in the header, the hero, the footer's wordmark and every `<title>`; the address in the footer, the visit page and the event pages.
- Opening hours, prices, minimum spends, corkage and the kitchen's last orders are the owner's: ask for them or leave them out rather than guess.

## Before building

### How do guests book a table?

- **Online, with the form** (as built): the reservation form stays; requests arrive in Upstart's Content tab. Keep `parts/reserve.liquid` on the visit page and the `reservations` datasource; its times follow the `hours`.
- **By phone**: A call button and the number in place of the form. Replace the form in `parts/reserve.liquid` by the phone number set large (`display`) and a `btn btn-primary tag` call button (`href="tel:…"`); point every booking link (`/visit#reserve`) to it; delete `data/reservations/`.
- **Walk-ins only**: the booking buttons and form go; the visit page says how it works. The reserve section says how the evening works without booking (first come, the bar while you wait); remove the booking buttons from the header and the hero, and `data/reservations/`.

### Private dining and events?

- **Both** (as built): the private dining page with its rooms, and the events, each with its page. Keep them.
- **Events only**: the private dining page goes. Delete `pages/private-dining.liquid`, `parts/cellar-room.liquid` where it is rendered, `data/private-rooms/`, `data/enquiries/` and its navigation record. Point what led to it elsewhere: the event pages' back link to the home page, their "Request seats" button to the booking (`/visit#reserve`, or the phone), and the visit page's "Eight or more" line to the phone alone.
- **Private dining only**: the events go. Delete `pages/events/`, `data/events/`, `parts/whats-on.liquid` and `parts/wine-dinners.liquid` where they are rendered.
- **Neither**: both go; the menu, the cellar and the visit page stay. Do both of the above; the home page keeps its rhythm: one scene per screen, one oxblood band.
