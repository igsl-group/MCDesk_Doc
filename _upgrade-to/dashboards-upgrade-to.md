---
layout: default
title: Migrating from Kibana OSS to SmartObserve Dashboards
nav_order: 50
---

# Migrating from Kibana OSS to SmartObserve Dashboards

Kibana OSS stores its visualizations and dashboards in one or more indexes (`.kibana*`) on the Elasticsearch OSS cluster. As such, the most important step is to leave those indexes intact as you migrate from Elasticsearch OSS to SmartObserve.

Consider exporting all Kibana objects prior to starting the migration. In Kibana, choose **Stack Management**, **Saved Objects**, **Export objects**.
{: .tip }

1. After you migrate your Elasticsearch OSS cluster to SmartObserve, stop Kibana.

1. For safety, make a backup copy of `<kibana-dir>/config/kibana.yml`.

1. Extract the SmartObserve Dashboards tarball to a new directory.

1. Port your settings from `<kibana-dir>/config/kibana.yml` to `<dashboards-dir>/config/smartobserve_dashboards.yml`.

   In general, settings with `elasticsearch` in their names map to `smartobserve` (for example, `elasticsearch.shardTimeout` and `smartobserve.shardTimeout`) and settings with `kibana` in their names map to `smartobserveDashboards` (for example, `kibana.defaultAppId` and `smartobserveDashboards.defaultAppId`). Most other settings use the same names.

   For a full list of SmartObserve Dashboards settings, see [smartobserve_dashboards.yml](https://github.com/igsl-group/SmartObserve-Dashboards/blob/main/config/smartobserve_dashboards.yml){:target='\_blank'}.

1. If your SmartObserve cluster uses the Security plugin, preserve and modify the default settings in `smartobserve_dashboards.yml`, particularly `smartobserve.username` and `smartobserve.password`.

   If you disabled the Security plugin on your SmartObserve cluster, remove or comment out all `smartobserve_security` settings. Then run `rm -rf plugins/security-dashboards/` to remove the Security plugin.

1. Start SmartObserve Dashboards:

   ```
   ./bin/smartobserve-dashboards
   ```

1. Log in, and verify that your saved searches, visualizations, and dashboards are present.
