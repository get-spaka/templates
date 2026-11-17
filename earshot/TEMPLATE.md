# Earshot

A website for a podcast that you can almost hear: its quotes are played as captions, word by word at the pace of the voice that said them, each episode has a sound print of its own drawn from its number, section titles sit on dark subtitle boxes, and an on-air lamp in the header lights up on release day. Where to listen is one tap away on every episode. It was written for Say Again?, a weekly podcast about how people talk, made by a sociolinguist and a former radio producer in Pittsburgh; it suits an interview show on any subject (business, design, science, food, sports), a narrative or documentary series in seasons, a company's or a nonprofit's podcast, a church's weekly sermons, a local radio show, a book club, an audio drama, or a talk show that lives on YouTube. Rewrite the episodes, the topics, the hosts, the quotes and the ways to listen; keep the captions, the sound prints, the caption boxes and the studio's white, ink, red and yellow.

## How it is made

- The header (the name with its red question mark, the on-air lamp and its line, the links, a red Listen pill that opens the list of platforms) and the footer (the platforms as large links, the newsletter, the voicemail line, the links) are on every page.
- The lists: `episodes` (the hero's latest episode, the latest episode, the recent rows, start here, the archive, a page each, the quotes' and answered questions' links), `quotes` (overheard on the home page, each episode's page), `team` (the hosts on the home page, the people on About, the portraits of the conversations), `platforms` (the header's Listen pill, the footer, the Listen page, the play buttons when an episode has no links of its own), `reviews` (home and About), `tapings` (Listen), `home-conversation` and `about-conversation` (the exchanges that play line by line), `about-steps`, `ask-answered`, `ask-faq`, `listen-perks`, `listen-faq` and `navigation`. `questions`, `inquiries` and `newsletter` collect the forms.
- The datasources are not linked to each other: a quote and an answered question name their episode by its id (the end of its address), and a conversation's line names its speaker by the `voice` of a `team` record. When you rename an episode's file or a person's voice, change them there too.

## When adapting

- The show's name is in the header (with its question mark in `text-primary`; drop the span if the name has none), the hero's poster title and its phonetic line, the footer, every `<title>` and description. The hero's phonetic line (`/seɪ əˈɡɛn/ · a podcast about how people talk`) becomes the new name's pronunciation, or only the tagline.
- The release day is in three places: `data-on-air="tuesday"` in `parts/header.liquid` and `parts/hero.liquid` (the day in English, lowercase; several days space-separated), their lines "New episodes every Tuesday" / "New every Tuesday", and the header's menu, the recent episodes' and Listen's mono lines ("Every Tuesday at 6 am"). `shoot.clock` is not copied into the site.
- The voicemail number is in `parts/ask-band.liquid`, `pages/ask.liquid` and the footer; the membership's address (`https://example.com/party-line`) in `parts/party-line.liquid` and `pages/listen.liquid`; the RSS feed's address in `platforms`. Ask for them, or keep the example and say so.
- Episodes are the maker's own: ask for their latest episodes (title, number, date, running time, guest) rather than inventing a show's history. Keep the six records only as examples until they give theirs, and say so. The hero's two caption lines, the conversations and the quotes are lines from the show: write them from what the maker says about it, short, in the hosts' voices, and never put invented words in a real person's mouth.
- Reviews and listener numbers are copied from the apps by the maker: keep the examples only until they give theirs, and never invent a ranking or a chart position.
- The hosts are shown as initials in round frames until the maker gives their portraits (`team`'s `photo`). The hero's photo is `media/hosts-at-the-mics.jpg`: replace it with the maker's own studio, or remove the `<img>` and the frame shows the latest episode's sound print.
- Upstart serves no audio: never add an `<audio>`, `<video>` or `<iframe>` from another site. Episodes are played on the platforms; a host's player is embedded only through the choice below.

## Pages

### Home (`/`)

The show's name at poster size over a dark frame where two lines of captions play as a conversation, the latest episode with its sound print and listen row, five recent episodes as numbered rows, three to start with, overheard quotes as captions, the hosts' conversation, the question band with the voicemail line, three reviews and the Party Line.

#### How do visitors play an episode?

- **On the platforms** (as built): each Play button opens the episode on its main platform (the first of the episode's `listen` links, or the first of `platforms` when it has none), and the listen row gives the others. Nothing plays on the site.
- **With your host's player on each episode's page**: the maker's podcast host gives an embeddable player for each episode. Add a `player` link field to `data/episodes/_datasource.yaml` (ask for each episode's address, or leave it empty until given); in `pages/episodes/[episodes].liquid`, under the head, show `{% if record.player %}<iframe src="{{ record.player }}" class="aspect-[16/5] w-full rounded-box" loading="lazy"></iframe>{% endif %}`; in `parts/hero.liquid` and `parts/latest.liquid` the Play buttons lead to `/episodes/<id>`.
- **Video first, on YouTube**: add a `video` link field to `episodes`; each episode's `cover` is the video's picture. "Play" becomes "Watch" in `parts/hero.liquid`, `parts/latest.liquid` and the episode's page, leading to `video`; the hero's frame shows the latest episode's cover in place of `media/hosts-at-the-mics.jpg`, its corner reads "Watch · 44 min"; put YouTube first in `platforms`.

#### Who is on the mic?

- **Two hosts** (as built): the conversations alternate between them and the hero's captions are an exchange.
- **One host**: one `team` record with `role: host`; `home-conversation` and `about-conversation` become the host's lines, or a host and the latest guest (the guest's portrait shows as initials unless they are in `team`); the hero's captions are one line in `parts/hero.liquid`; "Two voices, one question a week" in `parts/hosts.liquid` becomes the host's own heading; "we" becomes "I" through the site.
- **A panel of three or four**: one `team` record each with its `voice`; the conversations go round them (the portraits sit in a row by themselves); About lists them all.

#### How does the show pay for itself?

- **Members** (as built): the Party Line on the home page (`parts/party-line.liquid`), the Listen page and the header's links, leading to the membership page (ask for its address).
- **Sponsors**: delete `parts/party-line.liquid`, `parts/party-strip.liquid` and their renders, the Party Line section of `pages/listen.liquid`, `data/listen-perks/` and the `party-line` navigation record; add `sponsor` (text) and `sponsor_link` (link) fields to `episodes`, shown as "Supported by…" at the end of the notes on the episode's page; "Sponsor the show" becomes the first reason in `parts/work-with-us.liquid` and in `data/inquiries/_datasource.yaml`.
- **Neither**: delete the same membership sections, files and navigation record, and the membership questions of `listen-faq`.

### Episodes (`/episodes`)

Every episode since the start: the three to start with, then the archive as numbered rows filtered by topic, the Party Line's strip, and a page for each episode with its sound print cut into chapters, its notes, its quotes, its transcript and the episodes around it.

#### What kind of show is it?

- **A guest each episode** (as built): each episode names its `guest` and `guest_role`, shown in the rows, the latest episode and its page.
- **A series in seasons**: add a `season` number to `episodes`; in `parts/episode-row.liquid` and the episode's page show "S2 · E4" in the mono before the title; in `parts/archive.liquid` the chips become the seasons (each row's `data-topic` its season's place); delete `guest` and `guest_role` from the definition, the records and the templates.
- **The hosts alone**: delete `guest` and `guest_role`; in `parts/episode-row.liquid` the line under the title shows the episode's `summary` cut short (`{{ ep.summary | truncatewords: 14 }}`) instead.

#### Transcripts?

- **On each episode's page** (as built): the `transcript` field, folded under "Read the transcript", each speaker in bold at the start of their paragraph (`**MARISOL:** …`).
- **Elsewhere**: replace the `transcript` field with a `transcript_link` link field; the section of `pages/episodes/[episodes].liquid` becomes a "Read the transcript" button to it.
- **None**: delete the field and the section.

The archive's chips are the topics of `episodes`' `topic` choices, written again in `parts/archive.liquid`, in the same order: change both together (up to eight).

When removed: delete `pages/episodes/`, `parts/archive.liquid`, `parts/chapters.liquid`, `parts/party-strip.liquid` and the `episodes` navigation record. The home page keeps its latest episode and recent rows: in `parts/episode-row.liquid`, `parts/latest.liquid`, `parts/start-here.liquid`, `parts/overheard.liquid` and `pages/ask.liquid`, every `/episodes/…` link points to the episode's main platform (`{{ ep.listen.first.href | default: data.platforms.first.url }}`), and "All 142 episodes" in `parts/recent.liquid` goes to the show on the main platform.

### About (`/about`)

The studio in a wide frame, how the show started with an exchange that plays line by line, the people with their portraits in rings, how an episode gets made in five steps, six reviews and a form for guests, sponsors and press.

#### How do guests, sponsors and press reach you?

- **One form with a reason** (as built): messages arrive in the Content tab, in `inquiries`.
- **By email**: replace the form in `parts/work-with-us.liquid` with three addresses by purpose (guests, sponsors, press) as `mailto:` links; delete `data/inquiries/` and `fragments/inquiry-thanks.liquid`.
- **Guest suggestions only**: the reason chips go from `parts/work-with-us.liquid` and `reason` from `data/inquiries/_datasource.yaml`; the form asks who to invite, why, and how to reach them (`organization` becomes `who`).

When removed: delete `pages/about.liquid`, `parts/people.liquid`, `parts/making-steps.liquid`, `parts/work-with-us.liquid`, `data/inquiries/`, `data/about-steps/`, `data/about-conversation/`, `fragments/inquiry-thanks.liquid` and the `about` navigation record. The home page's hosts keep their portraits and conversation without the "About the show" button (`parts/hosts.liquid`); the producer leaves `team`.

### Ask us (`/ask`)

How listeners take part: the voicemail number at poster size with one voicemail that made it on air, the question form, five questions answered on air with their episodes, and questions about questions.

#### How do listeners send their questions?

- **The form and a voicemail line** (as built).
- **The form only**: the voicemail section of `pages/ask.liquid`, the number in `parts/ask-band.liquid` and the footer's "Leave a voicemail" go.
- **Voicemail only**: the form goes from `pages/ask.liquid` and `parts/ask-band.liquid` (its column then holds the voicemail that made it on air), with `parts/question-form.liquid`, `data/questions/` and `fragments/question-thanks.liquid`; the number stays large, with "Up to two minutes".

When removed: delete `pages/ask.liquid`, `parts/question-form.liquid`, `data/questions/`, `data/ask-answered/`, `data/ask-faq/`, `fragments/question-thanks.liquid` and the `ask-us` navigation record; delete `parts/ask-band.liquid` and its render on the home page, and the footer's voicemail column. The Mailbag's rows keep their envelope.

### Listen (`/listen`)

Every platform as a large row with "Open", the RSS feed's address to copy, the Party Line in full (monthly and yearly, what members get), the next live tapings, the newsletter and questions about listening.

Its Party Line follows how the show pays for itself, chosen with the home page.

#### Do you tape live?

- **Yes, a few times a year** (as built): "Hear it live" lists `tapings`, each with a ticket link.
- **No**: delete the section from `pages/listen.liquid` and `data/tapings/`; the perk "First tickets to the live tapings" leaves `listen-perks` and `parts/party-line.liquid`'s line.

When removed: delete `pages/listen.liquid`, `parts/platforms.liquid`, `parts/faq.liquid` (unless Ask us keeps it), `data/tapings/`, `data/listen-perks/`, `data/listen-faq/` and the `listen` navigation record. The header's Listen pill keeps its list of platforms without "All the ways to listen"; every other `/listen` link ("All the ways to listen", "More apps", the Party Line's `/listen#party-line`) goes to the main platform or to the membership page; the footer keeps the platforms and the newsletter.
