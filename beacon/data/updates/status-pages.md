---
title: "Status pages"
version: "0.9"
date: 2026-10-28
tag: "New"
summary: "Every workspace now has a public status page. Incidents appear on it as they open, in words you can change before they are published."
cover: "/media/radio-dish.jpg"
---
The second most common request in the beta, after a mobile app: a page your customers can check before they write to you.

Each workspace now has one at `status.nightjar.dev/your-name`. Choose which monitors it shows and what they are called there. When an incident opens, Nightjar writes a first line for it ("Checkout is slow for some customers") and waits two minutes for you to change it before it goes out. Updates you post in the incident appear on the page, with their time.

Custom domains, subscriptions by email and a page per component come before 1.0.

## Fixed

- An incident closed from the phone is now closed on the desktop without a reload.
- Monitor names longer than sixty characters no longer push the uptime bars off the screen.
