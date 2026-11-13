---
title: "Quieter retries"
version: "0.9.2"
date: 2026-11-11
tag: "Improved"
summary: "A failed check is now retried from a second and a third region before anyone is told. Beta teams got 41% fewer alerts last week, and missed none that mattered."
cover: "/media/harbor-cranes.jpg"
---
Until now, a check that failed was retried once, from the same region. That was enough to rule out a dropped packet, not a bad route between one data center and your server. Most of the alerts beta teams marked "not useful" in October were exactly that.

From 0.9.2, a failed check is retried from the two regions nearest to the one that saw it fail, within ten seconds. Only when two of the three agree does the monitor go down and the incident open. The median time to alert went from 34 to 38 seconds; the number of alerts went down by 41%.

You can turn it off per monitor, under **Checks → Confirm from other regions**, for the few endpoints that only one region can reach.

## Fixed

- Monitors paused during a maintenance window no longer show as down on the status page.
- The response-time chart no longer skips a day when the clocks change.
- Phone calls to numbers in Ireland now come from an Irish number.
