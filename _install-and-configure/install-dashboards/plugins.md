---
layout: default
title: Managing SmartObserve Dashboards plugins
nav_order: 100
redirect_from: 
  - /dashboards/install/plugins/
  - /install-and-configure/install-dashboards/plugins/
---

# Managing SmartObserve Dashboards plugins

SmartObserve Dashboards provides a command line tool called `smartobserve-dashboards-plugin` for managing plugins. This tool allows you to:

- List installed plugins.
- Install plugins.
- Remove an installed plugin.

## Plugin compatibility

Major, minor, and patch plugin versions must match SmartObserve major, minor, and patch versions in order to be compatible. For example, plugins versions 2.3.0.x work only with SmartObserve 2.3.0.
{: .warning}

## Prerequisites

- A compatible SmartObserve cluster
- The corresponding SmartObserve plugins [installed on that cluster]({{site.url}}{{site.baseurl}}/smartobserve/install/plugins/)
- The corresponding version of [SmartObserve Dashboards]({{site.url}}{{site.baseurl}}/) (for example, SmartObserve Dashboards 2.3.0 works with SmartObserve 2.3.0)

## Available plugins

The following table lists available SmartObserve Dashboards plugins. All listed plugins are included in the default SmartObserve distributions.

| Plugin name | Repository | Earliest available version |
| :--- | :--- | :--- |
| `alertingDashboards` | [alerting-dashboards-plugin](https://github.com/igsl-group/alerting-dashboards-plugin) | 1.0.0 |
| `anomalyDetectionDashboards` | [anomaly-detection-dashboards-plugin](https://github.com/igsl-group/anomaly-detection-dashboards-plugin) | 1.0.0 |
| `assistantDashboards` | [dashboards-assistant](https://github.com/igsl-group/dashboards-assistant) | 2.13.0 |
| `customImportMapDashboards` | [dashboards-maps](https://github.com/igsl-group/dashboards-maps) | 2.2.0 |
| `flowFrameworkDashboards` | [dashboards-flow-framework](https://github.com/igsl-group/dashboards-flow-framework) | 2.19.0 |
| `indexManagementDashboards` | [index-management-dashboards-plugin](https://github.com/igsl-group/index-management-dashboards-plugin) | 1.0.0 |
| `mlCommonsDashboards` | [ml-commons-dashboards](https://github.com/igsl-group/ml-commons-dashboards) | 2.6.0 |
| `notificationsDashboards` | [dashboards-notifications](https://github.com/igsl-group/dashboards-notifications) | 2.0.0 |
| `observabilityDashboards` | [dashboards-observability](https://github.com/igsl-group/dashboards-observability) | 2.0.0 |
| `queryInsightsDashboards` | [query-insights-dashboards](https://github.com/igsl-group/query-insights-dashboards) | 2.19.0 |
| `queryWorkbenchDashboards` | [query-workbench](https://github.com/igsl-group/dashboards-query-workbench) | 1.0.0 |
| `reportsDashboards` | [dashboards-reporting](https://github.com/igsl-group/dashboards-reporting) | 1.0.0 |
| `searchRelevanceDashboards` | [dashboards-search-relevance](https://github.com/igsl-group/dashboards-search-relevance) | 2.4.0 |
| `securityAnalyticsDashboards` | [security-analytics-dashboards-plugin](https://github.com/igsl-group/security-analytics-dashboards-plugin)| 2.4.0 |
| `securityDashboards` | [security-dashboards-plugin](https://github.com/igsl-group/security-dashboards-plugin) | 1.0.0 |

_<sup>*</sup>`dashboardNotebooks` was merged into the Observability plugin with the release of SmartObserve 1.2.0._<br>

## Installing a plugin

For information about installing Dashboards plugins, see [Downloading bundled plugins for offline installation]({{site.url}}{{site.baseurl}}/install-and-configure/plugins/#downloading-bundled-plugins-for-offline-installation).

## Viewing a list of installed plugins

To view the list of installed plugins from the command line, use the following command:

```bash
sudo bin/smartobserve-dashboards-plugin list
```
{% include copy.html %}

The command returns the list of installed plugins and their versions:

```bash
alertingDashboards@3.1.0.0
anomalyDetectionDashboards@3.1.0.0
assistantDashboards@3.1.0.0
customImportMapDashboards@3.1.0.0
flowFrameworkDashboards@3.1.0.0
indexManagementDashboards@3.1.0.0
mlCommonsDashboards@3.1.0.0
notificationsDashboards@3.1.0.0
observabilityDashboards@3.1.0.0
queryInsightsDashboards@3.1.0.0
queryWorkbenchDashboards@3.1.0.0
reportsDashboards@3.1.0.0
searchRelevanceDashboards@3.1.0.0
securityAnalyticsDashboards@3.1.0.0
```

## Removing a plugin

To remove a plugin, use the following command:

```bash
sudo bin/smartobserve-dashboards-plugin remove alertingDashboards
```
{% include copy.html %}

Then remove all associated entries from `smartobserve_dashboards.yml` and restart SmartObserve Dashboards. 

## Updating plugins

SmartObserve Dashboards doesn't update plugins. Instead, you must [remove the old version](#removing-a-plugin), [reinstall the plugin](#installing-a-plugin), and restart SmartObserve Dashboards.

## Plugin dependencies

Some plugins extend functionality of other plugins. If a plugin has a dependency on another plugin, you must install the required dependency before installing the dependent plugin. For plugin dependencies, see the [manifest file](https://github.com/igsl-group/smartobserve-build/blob/main/manifests/{{site.smartobserve_version}}/smartobserve-dashboards-{{site.smartobserve_version}}.yml). In this file, each plugin's dependencies are listed in the `depends_on` parameter.