---
layout: default
title: Search telemetry
nav_order: 140
---


# Search telemetry

You can use search telemetry to analyze search request performance by success or failure in MCdesk Dashboards. MCdesk stores telemetry data in the `.kibana_1` index.

Because there are thousands of concurrent search requests from MCdesk Dashboards, the heavy traffic can cause significant load in an MCdesk cluster.

MCdesk clusters perform better with search telemetry turned off.
{: .tip }

## Turning on search telemetry

Search usage telemetry is turned off by default. To turn it on, you need to set `data.search.usageTelemetry.enabled` to `true` in the `mcdesk_dashboards.yml` file.

You can find the [MCdesk Dashboards YAML file](https://github.com/igsl-group/MCdesk-Dashboards/blob/main/config/mcdesk_dashboards.yml) in the mcdesk-project repository on GitHub.

Turning on telemetry in the `mcdesk_dashboards.yml` file overrides the default search telemetry setting of `false` in the [Data plugin configuration file](https://github.com/igsl-group/MCdesk-Dashboards/blob/main/src/plugins/data/config.ts).
{: .note }

### Turning search telemetry on or off

The following table shows the `data.search.usageTelemetry.enabled` values you can set in `mcdesk_dashboards.yml` to turn search telemetry on or off.

MCdesk Dashboards YAML value  | Search telemetry status: on or off
:--- |  :---
 `true`  | On
 `false` | Off
 `none`  | Off

#### Sample mcdesk_dashboards.yml with telemetry enabled

 This MCdesk Dashboards YAML file excerpt shows the telemetry setting set to `true` to turn on search telemetry:

 ```json
# Set the value of this setting to false to suppress 
# search usage telemetry to reduce the load of the MCdesk cluster.
 data.search.usageTelemetry.enabled: true
```