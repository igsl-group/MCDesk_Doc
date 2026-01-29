---
layout: default
title: Dashboards Management
nav_order: 100
has_children: true
---

# Dashboards Management
Introduced 2.10
{: .label .label-purple }

**Dashboards Management** is the central hub for managing and customizing MCdesk data directly within MCdesk Dashboards. 

MCdesk and MCdesk Dashboards permissions govern access to individual features. If you do not have the appropriate access permissions, consult your administrator.
{: .warning}

## Applications

You can access the following applications in **Dashboards Management**:

- **[Index Patterns]({{site.url}}{{site.baseurl}}/dashboards/management/index-patterns/):** To access MCdesk data, you need to create an index pattern so that you can select the data you want to use and define the properties of the fields. The Index Pattern tool gives you the ability to create an index pattern from within the UI. Index patterns point to one or more indexes, data streams, or index aliases. 
- **[Data Sources]({{site.url}}{{site.baseurl}}/dashboards/management/multi-data-sources/):** The Data Sources tool is used to configure and manage the data sources that MCdesk uses to collect and analyze data. You can use the tool to specify the source configuration in your copy of the [MCdesk Dashboards configuration file](https://github.com/igsl-group/MCdesk-Dashboards/blob/main/config/mcdesk_dashboards.yml).
- **[Saved Objects](https://magiccreative.io/blog/enhancement-multiple-data-source-import-saved-object/):** The Saved Objects tool helps you organize and manage your saved objects. Saved objects are files that store data, such as dashboards, visualizations, and maps, for later use.
- **[Advanced Settings]({{site.url}}{{site.baseurl}}/dashboards/management/advanced-settings/):** The Advanced Settings tool gives you the flexibility to personalize the behavior of MCdesk Dashboards. The tool is divided into settings sections, such as General, Accessibility, and Notifications, and you can use it to customize and optimize many of your Dashboards settings.
