# Chalk

Chalk is the website of a climbing gym drawn like one of its walls: chalk-white pages and birch-ply panels with bolt holes, chunky holds in the circuit colors, a line that climbs down each page from START to TOP as the visitor scrolls, and the walls drawn in section at their real angles. It was written for Holdfast Bouldering, a bouldering gym in a 1912 stove foundry on Chattanooga's Southside; it suits a bouldering or rope climbing gym, a gym with several locations, a ninja or parkour gym, a strength or CrossFit gym, a martial arts or boxing club, or a yoga or dance studio that lives by its timetable. Keep the structure and rewrite the walls (as rooms or areas), the set, the classes, the prices and the programs.

## How it is made

- Every page shares the header (a strip of news on top, the wordmark, the links and a "First visit" pill) and the footer, where the page's line tops out, with the set list's sign-up, the hours drawn day by day with their busy hours, the address and the links.
- Every page's `<body>` carries `data-line`, and each section a stop beside its heading: the design notes say how to give a new section one.
- The home page's sections are parts of their own in `parts/`. Shared with other pages: `parts/circuits.liquid` (first visit, walls), `parts/quiet-hours.liquid` (first visit), `parts/week.liquid` (classes), `parts/prices-board.liquid` (prices), `parts/setters.liquid` and `parts/coaches.liquid`, and `parts/clock.liquid`, which prints 24-hour times as "6:30 pm".
- The lists: `walls` (the home page's walls in section, the walls page and its reset calendar), `problems` (the home page's fresh set and the walls page's set), `circuits`, `sessions` (the timetable, the home page's class times, each class's page), `classes` (a page each), `plans` (the home page's board and the prices page), `programs`, `events` (a page each), `team`, `hours`, the section lists `home-steps`, `first-visit-steps`, `prices-perks`, `groups-steps` and the four `*-faq`, and `navigation`. The forms collect `first-visits`, `class-requests`, `memberships`, `group-inquiries`, `event-signups` and `newsletter`.

## When adapting

- The name appears in the header's wordmark (HOLDFAST, uppercase), the footer and every page's title; the address (1450 Ironside Street) in the footer and the first-visit page's "Finding us", each with a "Get directions" link; the phone in the footer, the forms' asides and the fragments; the hours in `hours`, the prices page's aside and the hero's "Open today" line.
- The header's strip ("New on Friday: 24 problems on the Prow") names the latest set: rewrite it from the maker's walls, or with what is new at the gym.
- The walls' angles draw the sections: ask for each wall's angle (90 is vertical, a slab is about 75, a steep cave 130 to 145) or estimate it from the maker's photos, never leave Holdfast's.
- Facts to ask rather than guess: the prices, the hours and the busy hours, the set day, the grades and circuit colors, the class times, the setters' and coaches' names. The busy hours are the gym's own estimate: never present them as live.
- The waiver: the first step's button points to the gym's waiver page in its own software (`#` until the maker gives its address). Never make the waiver a form or a checkbox.
- Nothing is paid on the site: keep the thank-you fragments saying where and when people pay.
- Photos of climbers show them from behind or at a distance; portraits only of the gym's own team, which shows initials on a hold until then.

## Pages

### Home (`/`)

The hero (FIND YOUR LINE., a sentence on the gym, two buttons, a climber in a volume frame and the holds bolted around it), the newest problems as hold tags, the walls drawn in section, the first visit in four steps along a short route, the featured classes as rows, the price board on graphite, the kids and groups doors on mint, the next three events, the café, and the footer where the line tops out.

#### How do newcomers start?

- **They book an intro** (as built): the header's "First visit" pill, the hero's button and the home page's steps lead to the booking form on the first-visit page; requests arrive in the Content tab and the gym confirms by email. Keep `parts/first-visit-form.liquid`, `data/first-visits/` and `fragments/first-visit-thanks.liquid`.
- **They just walk in**: no booking. Point the pill and the buttons (`/first-visit#book`) to `/first-visit#steps`; the steps gain "Come any time we're open; intros start on the hour" (in `data/home-steps/` and `data/first-visit-steps/`), and the booking form goes from the first-visit page in its turn (`parts/first-visit-form.liquid`, `data/first-visits/`, `fragments/first-visit-thanks.liquid`).
- **They book on your own booking system**: point the pill and every "Book a first visit" button to the gym's booking page (ask its address, or `#` until given); the form goes as above.

#### Bouldering only, or ropes too?

- **Bouldering only** (as built).
- **Bouldering and ropes**: add a `kind` field to `walls` (boulder, top rope, lead) with heights of 30 to 50 feet, so the rope walls draw taller (set `--tall` on `.wall-bay` to the tallest height); the first visit gains a belay check step, "Learn to Belay" joins `classes`, and `plans` gains harness rental. The walls, classes, first-visit and prices pages follow in their turns.

#### Which grades?

- **The V-scale** (as built): VB to V10 on the circuits and the hold tags.
- **The Font scale**: 4 to 8A for a gym in Europe, with the same circuits: rewrite `grades` in `circuits`, `grade` in `problems` and the classes' `level`.
- **Circuits only**: no grades. Empty each problem's `grade` and show its circuit's name on the hold instead; the circuits' `grades` become words ("first steps", "getting there", "strong").

### First visit (`/first-visit`)

Never climbed? Good.: the title with shoes and chalk in a volume, the $29 intro offer on ply, the five steps along a route of their own, the booking form, the circuits, the quiet hours as day bars, finding the foundry, and questions.

Its booking section follows how newcomers start, chosen with the home page.

#### How do climbers sign the waiver?

- **Online, on your waiver page** (as built): the first step's button (`link` in `data/first-visit-steps/sign-the-waiver-online.md`) links to the gym's waiver page in its own software; ask its address, or keep `#` until given.
- **At the desk**: the step says it takes three minutes at the desk; remove its `link` and `link_label`, and the waiver line from `fragments/first-visit-thanks.liquid`.

When removed: delete `pages/first-visit.liquid`, `parts/first-visit-route.liquid`, `parts/first-visit-form.liquid`, `data/first-visits/`, `data/first-visit-steps/`, `data/first-visit-faq/`, `fragments/first-visit-thanks.liquid` and the `first-visit` navigation record. Point the header's pill and the hero's first button to `/prices#board`, or to the phone (`tel:`); the home page's steps (`parts/home-route.liquid`) keep their price line without the booking button. `parts/quiet-hours.liquid` and `parts/circuits.liquid` stay for the walls page or go with it.

### Walls (`/walls`)

Six walls, 180 problems, one new set a week: each wall drawn in section beside its photo with its angle, height, problems and dates; every current problem as a hold tag with a filter by circuit; the reset calendar; the circuits; the setters.

#### How do you reset?

- **One wall a week** (as built): each wall has its `next_reset`, the calendar lists them in date order, and the header's strip names the new set.
- **A whole new set every few weeks**: give every wall the same `next_reset`; the calendar becomes one line ("Everything comes down on Fri Dec 4") in `pages/walls.liquid`, and the walls drop their "Comes down" lines; the strip names the next reset day.
- **No fixed rhythm**: remove the reset calendar section and the "Comes down" lines (`parts/wall-sections.liquid`, `pages/walls.liquid`); each wall keeps when it was last set, and the `next_reset` field goes.

#### Name the setters?

- **Yes** (as built): each problem names its setter, and the setters' section stays.
- **No**: remove `setter` from `problems` and from the tags (`parts/fresh-set.liquid`, `pages/walls.liquid`), remove `{% render 'setters' %}` and `parts/setters.liquid`, and the setters from `team`.

When removed: delete `pages/walls.liquid`, `parts/setters.liquid` and the `walls` navigation record, and the setters from `team`. The home page keeps the fresh set and the walls in section, without their "All the walls" and "See every wall" links; the header's strip points to the home page's fresh set (`/#fresh`). `parts/circuits.liquid` stays on the first-visit page.

### Classes (`/classes`)

Learn to move, then move better: the whole week as seven columns colored by level (a day picker on a phone), the six classes with their photos and facts, the coaches and questions; each class has its own page with its facts, its text, its sessions in the week, a form to request a spot and the other classes.

#### How do people book a class?

- **Request a spot with the form** (as built): requests arrive in the Content tab, the gym confirms by email, and the class is paid at the desk. Keep the form in `pages/classes/[classes].liquid`, `data/class-requests/` and `fragments/spot-thanks.liquid`.
- **On your booking system**: add a `link` field to `classes` with each class's page there; the class page's "Request a spot" section becomes a button to it, and `data/class-requests/` and `fragments/spot-thanks.liquid` go.
- **Drop in, no booking**: remove the request section from `pages/classes/[classes].liquid` (and its `#request` mentions), say "Turn up ten minutes early" in its place, and delete `data/class-requests/` and `fragments/spot-thanks.liquid`.

When removed: delete `pages/classes.liquid`, `pages/classes/`, `parts/week.liquid`, `parts/coaches.liquid`, `data/classes/`, `data/sessions/`, `data/class-requests/`, `data/classes-faq/`, `fragments/spot-thanks.liquid` and the `classes` navigation record, and the coaches from `team`. Remove the home page's "Every week" section (`{% render 'every-week' %}` and `parts/every-week.liquid`).

### Prices (`/prices`)

No joining fee. Shoes included for members.: the memberships as giant numerals on graphite and the passes with dotted leaders, what members get, a form to start a membership beside the desk's hours, and questions.

#### How do people become members?

- **They ask with the form, and you finish at the desk** (as built): keep the "Start a membership" section, `data/memberships/` and `fragments/membership-thanks.liquid`.
- **Online, on your member system**: add a `link` field to `plans`; each membership in `parts/prices-board.liquid` gains a button to it, and the form section, `data/memberships/` and `fragments/membership-thanks.liquid` go.
- **At the desk only**: remove the form, keep the section's aside as a short text ("Come in with an ID; it takes five minutes"), and delete `data/memberships/` and `fragments/membership-thanks.liquid`.

When removed: delete `pages/prices.liquid`, `parts/prices-board.liquid`, `data/memberships/`, `data/prices-perks/`, `data/prices-faq/`, `fragments/membership-thanks.liquid` and the `prices` navigation record. The home page's price board (`parts/price-board.liquid`) keeps `plans` without its "All prices" button.

### Kids & groups (`/groups`)

Bring the crew, on mint: the five programs with their photos, ages, times and prices, how a party goes on orange, a form to ask about a group, and the rules for kids.

#### Who do you welcome?

- **Kids' programs, parties and groups** (as built).
- **Parties and groups only**: remove the kids' club and the youth team from `programs` and their sessions from `sessions`; the home page's first door (`parts/doors.liquid`) becomes schools.
- **Kids' programs only**: remove the birthday parties, schools and team events from `programs`, the party steps section and `data/groups-steps/`; the form asks to join a program (its `kind` choices become the programs) and the home page's doors follow.

When removed: delete `pages/groups.liquid`, `data/programs/`, `data/group-inquiries/`, `data/groups-steps/`, `data/groups-faq/`, `fragments/group-thanks.liquid` and the `groups` navigation record. Remove the home page's doors (`{% render 'doors' %}` and `parts/doors.liquid`) and the youth team and kids' club from `sessions`.

### Events (`/events`)

Comps, trips and nights at the wall: the next event large with its date on a hold, then the others as tiles; each event has its own page with its date, time and price, its text, a sign-up form and the other events.

#### How do people sign up?

- **With the form on each event's page** (as built): keep the sign-up section of `pages/events/[events].liquid`, `data/event-signups/` and `fragments/signup-thanks.liquid`.
- **On another site**: add a `link` field to `events` (a comp's registration platform, a ticketing page); the event page's "Sign up" buttons go to it, the form section goes, and so do `data/event-signups/` and `fragments/signup-thanks.liquid`.
- **No sign-up, just come**: remove the sign-up section and its "Sign up" button from `pages/events/[events].liquid`, and delete `data/event-signups/` and `fragments/signup-thanks.liquid`.

When removed: delete `pages/events.liquid`, `pages/events/`, `data/events/`, `data/event-signups/`, `fragments/signup-thanks.liquid` and the `events` navigation record. Remove the home page's "Coming up" (`{% render 'coming-up' %}` and `parts/coming-up.liquid`); the walls page's reset calendar no longer links to reset nights (remove its loop over `data.events`).
