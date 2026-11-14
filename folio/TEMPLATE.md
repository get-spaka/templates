# Folio

Folio is a quiet, editorial portfolio: the work first, the person close behind. It was written for Noor Haddad, an architecture and interiors photographer in Lisbon; it suits a photographer, an architect, an interior or product designer, or a small studio that shows its work project by project.

## How it is made

- `/`: the name at poster size with a line on the work and the availability line, the strip of images, the index of selected projects, a short about, the clients, the contact band.
- `/work`: the title, the category buttons and the index of every project, then the contact band.
- `/work/<id>` (`pages/work/[projects].liquid`): a project's page, with its facts and its text, its images, then the next project.
- `/info`: the title, the initials' square beside a portrait in words, the lists (services, recognition, representation), the clients, then the `#enquire` section with its form.
- Every page shares the header and the footer; the home page's sections are parts of their own in `parts/`.
- The lists: `projects` (the index on the home and work pages, and the project pages), `home-strip` (the home page's strip), `clients` (the home and info pages), `recognition` (the info page's lists), `navigation` (the header, the footer and the contact band's social links), and `enquiries`, which collects the info page's form. The design notes say how they work.

## When adapting

- The person's name is in the header, the hero, the footer and every page's `<title>`; their email in the contact band and the info page; their city in the header's clock and the hero's line.
- The availability line ("Booking commissions from March 2027") and the reply time ("within two working days") are the site's promises: ask for them or leave them out rather than guess.

## Before building

### Are you taking commissions?

- **Yes** (as built): the availability line and the enquiry form stay. Keep the availability line in `parts/hero.liquid`, with the maker's date (ask it, or leave the line out), and the info page's enquiry form posting to `enquiries`.
- **Not now**: the availability line goes; an email link replaces the form. Remove the availability line from `parts/hero.liquid`; on the info page, replace the form by the email set large as a `mailto:` link; delete `data/enquiries/`.

### A page for each project?

- **Yes, a page each** (as built): each project opens on its own page, with its pictures and story. Keep `pages/work/[projects].liquid`.
- **The index only**: the numbered index with its pictures, and no project pages. Delete `pages/work/[projects].liquid`; the index's rows are no longer links (keep the pictures following the cursor), and a project's text goes in its row's short line.
