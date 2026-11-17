---
name: earshot-design
description: The Earshot template's design notes — read before changing this site's pages, sections, styles, episodes, quotes, hosts or forms.
---

# Earshot

A podcast's site you can almost hear. Quotes are not set as quotes but as captions that play word by word at the pace of the voice; every episode has a sound print of its own; section titles sit on dark subtitle boxes; a small on-air lamp lights on release day. It is a studio at its brightest: white walls, ink, an on-air red and a caption yellow, round shapes like a video call's tiles. It never plays sound.

## Type

- **Parkinsans** (the heading font) at 700 for titles, 800 for the poster (`class="poster"`: the show's name, the episode numbers, the price, the phone number), sentence case. A page title `text-[clamp(3rem,7.5vw,6.5rem)]`, a section title `text-[clamp(2.25rem,4.5vw,3.75rem)]`, a row's title `text-[1.75rem]`. Episode numbers `poster tone-number`, 5 to 7 rem in lists, up to 12 rem for the latest one.
- **Atkinson Hyperlegible Next** (the body font) at 400 for text, `leading-relaxed text-base-content/80`, at most 65 characters a line; at 700 with `class="caption-text"` for anything read as a caption (the read-alongs, the conversations, answered questions); buttons and links at 700.
- **Atkinson Hyperlegible Mono** with `class="mono"`: 0.8125rem, uppercase, spaced: timecodes, "Ep. 142 · 44 min", speakers' names, topics, labels over a section. `mono ipa` keeps lowercase (the phonetic line).
- A long text written in Markdown (an episode's notes, its transcript) goes in `class="notes"`; the transcript adds `transcript`, which sets each paragraph's first bold word (`**MARISOL:**`) in the mono.

## Color and shape

- Studio white (`bg-base-100`) for most sections; foam (`bg-base-200`) for one band at a time (start here, the question band, the Party Line); studio night (`bg-neutral`) for the overheard quotes, the hero's frame and the footer only.
- On-air red (`primary`): buttons, the lamp, the question mark, the voicemail number. Caption yellow (`secondary`): the read-along's marker, links on studio night, the footer's sign-up. Broadcast blue (`accent`): the rings around portraits. Never red text on studio night.
- **Caption boxes**: a title's text inside `<span class="caption-box">`, in a heading with `class="caption-title"`: each line sits on its own dark box (light on a `bg-neutral` band). One box per line you choose to break (`<br>` between two spans), or one span that wraps by itself. Every section title is one.
- Corners are round (`--theme-radius: 1.25rem`), buttons and fields are pills, borders are hairlines, there are no shadows but the Listen menu's.
- The photos share one treatment: `data-studio` on each `<img>` (a little more contrast, a little less color). They show the studio, its microphones, the switchboard room's past and the live room, never stock smiles; the hosts' own portraits go in their round frames.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: every word of every caption is lit, the rings are still, the sound prints stand at full height and the lamp shows its usual line.

- **The read-along** (`scripts/readalong.js`): `data-readalong` on a quote's text. As it comes into view, its words light up one after another at the pace of speech, a yellow marker sliding under the word being spoken; it plays once, and again when pointed at or focused. Put the speaker's label in the same `<figure>` with `<span data-level aria-hidden="true"><i></i><i></i><i></i></span>`: its three bars move while the quote plays. Keep the text plain (no links inside).
- **The conversation**: `data-conversation` on a container, `data-turn="<speaker>"` on each line holding a `data-readalong`, and `data-voice="<speaker>"` on each portrait. Lines play one after another; the speaking portrait's ring pulses and the other dims. `{% render 'conversation', lines: data["home-conversation"], team: data.team %}` writes one from a list of `speaker`/`line` records, a portrait for each speaker (their `team` record's `photo`, or their initials on a tone).
- **Sound prints**: `{% render 'soundprint', n: <episode number>, tone: <tone>, class: "h-14" %}` draws an episode's waveform from its number (64 bars; `to: 39` for a small one; `class` sets its height, `print-large` keeps 40 bars on a phone). Never draw one by hand. `data-ripple` on the row or card that holds it makes its bars ripple under the pointer; `reveal: true` (or `data-reveal-bars` on a container) grows its bars into view. On an episode's page, `{% render 'chapters', ep: record %}` cuts it into the chapters, each segment as wide as its chapter, lit from the list and back with `:has()` (up to eight chapters).
- **Episode tones**: `data-tone="{{ ep.tone }}"` (primary, secondary, accent or neutral) on an episode's element gives `--tone` and `--tone-content`: `tone-number` colors its number, `tone-text` its print, `tone-fill` fills a card. Never build a class name from the tone.
- **The on-air lamp** (`scripts/on-air.js`): `data-on-air="tuesday"` (the release day) on an element holding `<span class="lamp">`, a `data-air="usual"` line and a `data-air="live"` line. On that day, in the visitor's time, the lamp lights and glows and the live line shows. The script never writes a text.
- **The archive's chips** (`parts/archive.liquid`): radios (`chip-input`, `data-n` the topic's place from 1, 0 for All) each followed by its `<label class="chip">`; each row carries `data-topic`, its topic's place. CSS only, up to eight topics.
- `data-reveal` on a section's main element rises it into view; `data-reveal="stagger"` on a list rises its children one after another. Put them on every new section.
- Smooth scrolling (Lenis, light) on every page. No page transitions, nothing pinned, no sound.

## Lists

- `episodes`: newest first by `number`. `tone` gives its color; `chapters` are "04:12 · Where yinz came from" (the timecode, a middle dot between spaces, the title); `listen` holds the episode's own links, the first being the main one (empty: the show's `platforms` are used); `starter` puts it in "Start here" with its `starter_note`; `transcript` is Markdown, a bold speaker opening each paragraph; the notes are the record's text. An episode with no `guest` shows an envelope (the Mailbag).
- `quotes`: `episode` is the episode's id (its address's last part), `at` the minute ("18:42"). The first three show on the home page, the first one large.
- `team`: `role` host or producer; `voice` is the name the conversations use; `line` is "Ask her about: …".
- `platforms`: the record whose id is `rss` gives the feed's address on the Listen page.
- `home-conversation`, `about-conversation`: `speaker` is a `team` record's `voice`.
- `ask-answered`: `episode` is an episode's id. `reviews`, `tapings`, `about-steps`, `ask-faq`, `listen-perks`, `listen-faq` and `navigation` (`place`: both, header, footer or social).
- `questions`, `inquiries` and `newsletter` collect the forms.

## Rules for the site's whole life

- No `<audio>`, `<video>` or `<iframe>` from another site in the template's files: episodes play on the platforms (or in the host's player, only through an episode's own `player` address).
- Every section title is a caption box; every quote is a read-along, never set in quotation marks.
- One dark band between two light ones, never two dark bands in a row (the footer is one).
- Keep the episode numbers, minutes and dates true to the show: they are facts, not decoration.
- No colors of the site's own: everything comes from the theme, so the Theme tab restyles it all, episodes' tones included.
