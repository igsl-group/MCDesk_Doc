---
layout: default
title: Migrating from Kibana OSS to MCdesk Dashboards
nav_order: 50
---

# Migrating from Kibana OSS to MCdesk Dashboards

Kibana OSS stores its visualizations and dashboards in one or more indexes (`.kibana*`) on the Elasticsearch OSS cluster. As such, the most important step is to leave those indexes intact as you migrate from Elasticsearch OSS to MCdesk.

Consider exporting all Kibana objects prior to starting the migration. In Kibana, choose **Stack Management**, **Saved Objects**, **Export objects**.
{: .tip }

1. After you migrate your Elasticsearch OSS cluster to MCdesk, stop Kibana.

1. For safety, make a backup copy of `<kibana-dir>/config/kibana.yml`.

1. Extract the MCdesk Dashboards tarball to a new directory.

1. Port your settings from `<kibana-dir>/config/kibana.yml` to `<dashboards-dir>/config/mcdesk_dashboards.yml`.

   In general, settings with `elasticsearch` in their names map to `mcdesk` (for example, `elasticsearch.shardTimeout` and `mcdesk.shardTimeout`) and settings with `kibana` in their names map to `mcdeskDashboards` (for example, `kibana.defaultAppId` and `mcdeskDashboards.defaultAppId`). Most other settings use the same names.

   For a full list of MCdesk Dashboards settings, see [mcdesk_dashboards.yml](https://github.com/igsl-group/MCdesk-Dashboards/blob/main/config/mcdesk_dashboards.yml){:target='\_blank'}.

1. If your MCdesk cluster uses the Security plugin, preserve and modify the default settings in `mcdesk_dashboards.yml`, particularly `mcdesk.username` and `mcdesk.password`.

   If you disabled the Security plugin on your MCdesk cluster, remove or comment out all `mcdesk_security` settings. Then run `rm -rf plugins/security-dashboards/` to remove the Security plugin.

1. Start MCdesk Dashboards:

   ```
   ./bin/mcdesk-dashboards
   ```

1. Log in, and verify that your saved searches, visualizations, and dashboards are present.
