# Folio

Folio is a quiet, editorial portfolio: the work first, the person close behind. It was written for Noor Haddad, an architecture and interiors photographer in Lisbon; it suits a photographer, an architect, an interior or product designer, or a small studio that shows its work project by project.

## How it is made

- Every page shares the header and the footer; the home page's sections are parts of their own in `parts/`.
- The lists: `projects` (the index on the home and work pages, and the project pages), `home-strip` (the home page's strip), `clients` (the home and info pages), `recognition` (the info page's lists), `navigation` (the header, the footer and the contact band's social links), and `enquiries`, which collects the info page's form. The design notes say how they work.

## When adapting

- The person's name is in the header, the hero, the footer and every page's `<title>`; their email in the contact band and the info page; their city in the header's clock and the hero's line.
- The availability line ("Booking commissions from March 2027") and the reply time ("within two working days") are the site's promises: ask for them or leave them out rather than guess.

## Pages

### Home (`/`)

The name at poster size with a line on the work and the availability line, the strip of images, the index of selected projects, a short about, the clients, the contact band.

#### Are you taking commissions?

- **Yes** (as built): the availability line and the enquiry form stay. Keep the availability line in `parts/hero.liquid`, with the maker's date (ask it, or leave the line out); the info page keeps its form.
- **Not now**: the availability line goes; an email link replaces the form. Remove the availability line from `parts/hero.liquid`; the info page's form gives way to the email in its turn.

### Work (`/work`)

The title, the category buttons and the index of every project, then the contact band; each project opens on its own page, with its facts and its text, its images, then the next project.

#### A page for each project?

- **Yes, a page each** (as built): each project opens on its own page, with its pictures and story. Keep `pages/work/[projects].liquid`.
- **The index only**: the numbered index with its pictures, and no project pages. Delete `pages/work/[projects].liquid`; the index's rows are no longer links (keep the pictures following the cursor), and a project's text goes in its row's short line.

When removed: delete `pages/work.liquid`, `pages/work/` and its navigation record. The home page's index keeps `projects`; its rows are no longer links.

### Info (`/info`)

The title, the initials' square beside a portrait in words, the lists (services, recognition, representation), the clients, then the `#enquire` section with its form.

Its `#enquire` section follows whether the maker takes commissions, chosen with the home page: as built, the form posting to `enquiries`; not now, the email set large as a `mailto:` link in place of the form, and `data/enquiries/` and `fragments/enquiry-thanks.liquid` deleted.

When removed: delete `pages/info.liquid`, `parts/lists.liquid`, `data/recognition/`, `data/enquiries/`, `fragments/enquiry-thanks.liquid` and its navigation record; the contact band's link to the enquiry form becomes the email (`mailto:`).
