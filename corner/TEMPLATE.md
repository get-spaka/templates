# Corner

Corner is a neighborhood shop's website that reads like its shopfront: poster-sized type on warm paper, one strong color, the day's hours always in sight. It was written for Marlow Street Bakery, a sourdough bakery and café; it suits a café, a deli, a cheese or wine shop, a florist, an ice-cream parlor or a small restaurant. For a business other than a bakery, keep the structure and rename: the counter is what it sells, the ribbon its products or services, the order card its booking or order.

## How it is made

- Every page shares the header and the footer; the home page's sections are parts of their own in `parts/`.
- The lists: `menu` (the menu page, and the home page's counter), `hours` (the hours section on the home, menu and visit pages, and the open-now lines), `home-ribbon` (the ribbon), `kitchen-photos` (the home page's kitchen), `team` (the story page), `navigation` (the header and the footer), and `contact`, which collects the visit page's form. The design notes say how they work.

## When adapting

- The hero's headline, the stamp's words, the footer's huge wordmark (`Marlow St.`), the footer's short hours line and the phone and address in `parts/hours.liquid` and `parts/footer.liquid` are written in the parts: change them all with the business.

## Pages

### Home (`/`)

The hero (headline, arched photo, stamp), the ribbon, the counter of what is baked today, the story, the hours, the kitchen's photos, the order card.

#### Do customers order ahead?

- **Yes, orders ahead** (as built): the order card and its form stay, for what is made or set aside to order. Keep `parts/order.liquid` and the visit page's `#order` section; rename what is ordered for the business (a cake, a bouquet, a table).
- **No, they just come by**: the order card and buttons go; the hours lead. Remove `{% render 'order' %}` from the pages and the header's and the hours' order buttons (the header keeps its links); the flipped hours section is then the home page's one call. The visit page's `#order` section changes in its turn.

#### Show prices on the menu?

- **Yes** (as built): each item with its price. Keep `price` on each `menu` record, set in mono.
- **No**: names and descriptions only. Remove the price from `parts/counter.liquid`, and the `price` field from `data/menu/_datasource.yaml`; the menu page drops it in its turn.

### Menu (`/menu`)

The title, a section for each category of the menu, then the hours.

Without prices (chosen with the home page), remove the price from the page and from the `menu` records.

When removed: delete `pages/menu.liquid` and its navigation record. The home page's counter keeps `menu`; its link to the menu goes.

### Visit (`/visit`)

The title, the hours, how to get there, then the `#order` section with its form.

Its `#order` section follows whether customers order ahead, chosen with the home page: as built, the form posting to `contact`, renamed for what is ordered; if they just come by, the section stays for messages only: its texts say nothing of ordering, its form loses the `wanted_for` field, and `contact` is named "Messages".

When removed: delete `pages/visit.liquid`, `data/contact/`, `fragments/contact-thanks.liquid` and its navigation record; the order buttons (`/visit#order`) call the shop instead (`href="tel:…"`). The address and the hours stay in the footer and the home page's hours.

### Story (`/story`)

The title, the story in three dated steps beside arched photos, the team, three words on how the bakery works, the order card.

When removed: delete `pages/story.liquid`, `data/team/` and its navigation record; the home page's story section no longer links to it.
