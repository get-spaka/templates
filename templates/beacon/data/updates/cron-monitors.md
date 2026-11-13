---
title: "Cron monitors"
version: "0.7"
date: 2026-08-12
tag: "New"
summary: "Scheduled jobs can now check in. If a backup, an import or a queue worker is late, missing or slower than usual, Nightjar says so."
cover: "/media/antenna-star-trails.jpg"
---
Some of the worst outages make no noise at all: a backup that stopped running in June, an import that has been failing every night since a key expired.

A cron monitor gives each job a URL to call when it finishes. Tell Nightjar how often to expect it (`0 3 * * *`, or every fifteen minutes) and how long it usually takes. If the call is late, never comes, or the job took three times longer than usual, the monitor goes down like any other.

Add `curl -fsS https://ping.nightjar.dev/your-key` at the end of the job, and that is all.

## Fixed

- Monitors created by the API now appear in the list without a reload.
