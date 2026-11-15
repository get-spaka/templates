# Reel

A loud studio site where the work moves sideways, with a page per case and a real brief to send. It was written for Halfvolt, a brand, motion and film studio in Rotterdam. It suits a branding or design agency, a motion or animation studio, a film production company, an architecture collective, or a freelancer who wants to look bigger: rewrite the cases, the services, the people and the lists, and keep the shapes.

## How it is made

- The header and the footer are on every page; every page but the contact page ends on the footer's "Got a brief?" band.
- The lists: `cases` (the home page's reel, the Work page and the case pages), `services` (the home and studio pages), `clients` (the home, Work and studio pages), `testimonials` and `home-figures` (the home page), `studio-figures`, `studio-principles`, `team`, `awards` and `jobs` (the studio page), `briefs` (what the contact form collects) and `navigation` (the header and the footer). The design notes explain how each works.

## When adapting

- The studio's name is in the header, the footer and every `<title>`; the address, email and phone in the footer and the contact page; the new-business lead in the footer band, the contact page and the thank-you fragment.
- "Now booking spring 2027" in the header and the contact page is a date: update it or remove it.
- Awards, figures and results are the business's own: ask for them or leave them out rather than invent them.

## Pages

### Home (`/`)

The hero (the kinetic headline over the acid smoke, a tilted still and the chartreuse slab), the statement, the reel of featured cases, the services, the clients, the quotes and the figures.

### Work (`/work`)

Every case as a tile, with the filter by discipline, then the clients; each case has its page, in its tone: its title and facts, the cover, the summary and the body, the results, its four images in a reel, the credits, then the next case.

When removed: delete `pages/work.liquid`, `pages/work/` and its navigation record; the home page's reel keeps `cases`, its cases no longer links.

### Studio (`/studio`)

The title with the studio's photo, the statement, the principles, the services, the team, the figures, the awards, the clients and the jobs.

#### Are you hiring?

- **No open roles**: the jobs list goes from the studio page. Remove `{% render 'jobs' %}` from the studio page and delete `data/jobs/`.
- **Yes** (as built): the jobs list stays, with the maker's roles. Keep `{% render 'jobs' %}` on the studio page and `data/jobs/`, its records rewritten as the maker's roles (ask them, or leave the section out rather than invent them).

When removed: delete `pages/studio.liquid`, `parts/principles.liquid`, `parts/team.liquid`, `parts/awards.liquid`, `parts/jobs.liquid`, `data/studio-figures/`, `data/studio-principles/`, `data/team/`, `data/awards/`, `data/jobs/` and its navigation record.

### Contact (`/contact`)

"Got a brief?" and the brief form, with the email, phone and address beside it.

#### How do clients get in touch?

- **The brief form** (as built): the form asks for needs, budget and timing; briefs arrive in Upstart's Content tab. Keep `parts/brief-form.liquid` on the contact page and `briefs`, its choices rewritten for the business.
- **Email and phone**: the form goes; the contact page gives the address, email and phone. Replace the form on the contact page by the email and phone set in the display face, as links; "Got a brief?" stays as the question; delete `data/briefs/` and `fragments/brief-thanks.liquid`.

When removed: delete `pages/contact.liquid`, `parts/brief-form.liquid`, `fragments/brief-thanks.liquid`, `data/briefs/` and its navigation record; the footer's "Got a brief?" band and the header's contact link go to the email (`mailto:`).
