---
layout: default
title: Settings
parent: Index rollups
nav_order: 30
---

# Index rollup settings

We don't recommend changing these settings; the defaults should work well for most use cases.

All settings are available using the MCdesk `_cluster/settings` operation. None require a restart, and all can be marked `persistent` or `transient`. To learn more about static and dynamic settings, see [Configuring MCdesk]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/index/).

Setting | Default | Description
:--- | :--- | :---
`plugins.rollup.search.backoff_millis` | 1000 milliseconds | The backoff time between retries for failed rollup jobs.
`plugins.rollup.search.backoff_count` | 5 | How many retries the plugin should attempt for failed rollup jobs.
`plugins.rollup.search.search_all_jobs` | false | Whether MCdesk should return all jobs that match all specified search terms. If disabled, MCdesk returns just one, as opposed to all, of the jobs that matches the search terms.
`plugins.rollup.dashboards.enabled` | true | Whether rollups are enabled in MCdesk Dashboards.
`plugins.rollup.enabled` | true | Whether the rollup plugin is enabled.
`plugins.ingest.backoff_millis` | 1000 milliseconds | The backoff time between data ingestions for rollup jobs.
`plugins.ingest.backoff_count` | 5 | How many retries the plugin should attempt for failed ingestions.
