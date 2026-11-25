# Ember

A website for an evening restaurant and wine bar, seen by candlelight. It was written for a wine bar and wood-fire kitchen; it suits a cocktail bar, a steakhouse, a tasting-menu dining room, an izakaya, a jazz bar, a wine shop with a bar or a hotel's restaurant. Rewrite the dishes, the wines, the rooms and the evening, and keep the dark, the one warm light and the slow pace.

## How it is made

- The header and the footer are on every page; the footer holds the address, the hours, the monthly letter's form and the navigation.
- The lists: `menu` (the menu page's courses and the home page's menu card), `menu-tasting` (the menu page), `wines` (the home page's glass list and the wine page), `home-evening` and `home-press` (the home page), `events` (what's on, the wine dinners and the event pages), `private-rooms` (the private dining page), `team` and `story-suppliers` (the story page), `hours` (the visit page and the footer), `visit-faq` (the visit page) and `navigation` (the header and the footer); `reservations`, `enquiries` and `newsletter` collect the answers of the visit page's, the private dining page's and the footer's forms. The design notes explain how each works.

## When adapting

- The name is in the header, the hero, the footer's wordmark and every `<title>`; the address in the footer, the visit page and the event pages.
- Opening hours, prices, minimum spends, corkage and the kitchen's last orders are the owner's: ask for them or leave them out rather than guess.

## Pages

### Home (`/`)

The hero (the name and the open tonight line), the house's statement, the evening from the first pour to the last glass, the menu card, the wines by the glass, the Cellar Room, what's on and what the press said.

When a page type goes, the home page keeps its rhythm: one scene per screen, one oxblood band.

#### How do guests book a table?

- **Online, with the form** (as built): the reservation form stays; requests arrive in Spaka's Content tab. Keep the booking links (`/visit#reserve`); the visit page keeps its form.
- **By phone**: a call button and the number in place of the form. Point every booking link (`/visit#reserve`) in the header, the hero and the other parts to the phone (`href="tel:…"`); the visit page's form gives way to the number in its turn.
- **Walk-ins only**: the booking buttons and form go; the visit page says how it works. Remove the booking buttons from the header and the hero; the visit page says how the evening works in its turn.

### Visit (`/visit`)

The reservation form, the hours, how to find the place, gift cards and questions.

Its reserve section (`parts/reserve.liquid`) follows how guests book, chosen with the home page:
- online, with the form: keep it and the `reservations` datasource; its times follow the `hours`;
- by phone: replace the form by the phone number set large (`display`) and a `btn btn-primary tag` call button (`href="tel:…"`); delete `data/reservations/`;
- walk-ins only: the section says how the evening works without booking (first come, the bar while you wait); delete `data/reservations/`.

When removed: delete `pages/visit.liquid`, `parts/reserve.liquid`, `parts/find-us.liquid`, `parts/gift-cards.liquid`, `data/visit-faq/`, `data/reservations/` and its navigation record; point the booking links to the phone. The footer keeps the address and the hours.

### Menu (`/menu`)

The page title, the courses with their dishes, then the tasting menu.

When removed: delete `pages/menu.liquid`, `parts/courses.liquid`, `parts/tasting.liquid`, `data/menu-tasting/` and its navigation record. The home page's menu card keeps `menu`; its link to the menu goes.

### Wine (`/wine`)

The sommelier's title, the glass list, the cellar's bottles and the wine dinners.

When removed: delete `pages/wine.liquid`, `parts/sommelier.liquid`, `parts/by-the-glass.liquid`, `parts/cellar.liquid`, `parts/wine-dinners.liquid` and its navigation record. The home page's glass list keeps `wines`; its link to the wine page goes.

### Events (`/events`)

Each event's page, with its date, its details and a button to request seats, then the other events. The `events` records also make what's on (the home and private dining pages) and the wine dinners (the wine page).

When removed: delete `pages/events/`, `data/events/`, and `parts/whats-on.liquid` and `parts/wine-dinners.liquid` where they are rendered.

### Private dining (`/private-dining`)

The page title, the two rooms, what's on and the enquiry form.

When removed: delete `pages/private-dining.liquid`, `parts/gather-title.liquid`, `parts/rooms.liquid`, `parts/enquire.liquid`, `parts/cellar-room.liquid` where it is rendered, `data/private-rooms/`, `data/enquiries/` and its navigation record. Point what led to it elsewhere: the event pages' back link to the home page, their "Request seats" button to the booking (`/visit#reserve`, or the phone), and the visit page's "Eight or more" line to the phone alone.

### Story (`/story`)

The page title, three chapters (the warehouse, the hearth, the cellar), the team and the suppliers.

When removed: delete `pages/story.liquid`, `parts/page-title.liquid` unless another page renders it, `parts/chapters.liquid`, `parts/team.liquid`, `parts/suppliers.liquid`, `data/team/`, `data/story-suppliers/` and its navigation record.
