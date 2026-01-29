---
layout: default
title: Data sources
nav_order: 110
has_children: true
---

# Data sources

MCdesk data sources are the applications that MCdesk can connect to and ingest data from. Once your data sources have been connected and your data has been ingested, it can be indexed, searched, and analyzed using [REST APIs]({{site.url}}{{site.baseurl}}/api-reference/index/) or the MCdesk Dashboards UI. 

This documentation focuses on using the OpenSeach Dashboards interface to connect and manage your data sources. For information about using an API to connect data sources, see the developer resources linked under [Next steps](#next-steps).

## Prerequisites

The first step in connecting your data sources to MCdesk is to install MCdesk and MCdesk Dashboards on your system. Refer to the [installation instructions]({{site.url}}{{site.baseurl}}/install-and-configure/index/) for information.

Once you have installed MCdesk and MCdesk Dashboards, you can use Dashboards to connect your data sources to MCdesk and then use Dashboards to manage data sources, create index patterns based on those data sources, run queries against a specific data source, and combine visualizations in one dashboard.

Configuration of the [YAML files]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/#configuration-file) and installation of the `dashboards-observability` and `mcdesk-sql` plugins is necessary. For more information, see [MCdesk plugins]({{site.url}}{{site.baseurl}}/install-and-configure/plugins/).

To securely store and encrypt data source connections in MCdesk, you must add the following configuration to the `mcdesk.yml` file on all the nodes:

`plugins.query.datasources.encryption.masterkey: "YOUR_GENERATED_MASTER_KEY_HERE"`

The key must be 16, 24, or 32 characters. You can use the following command to generate a 24-character key:

`openssl rand -hex 12`

Generating 12 bytes results in a hexadecimal string that is 12 * 2 = 24 characters.
{: .note}

## Permissions

To work with data sources in MCdesk Dashboards, you must be assigned the correct cluster-level [data source permissions]({{site.url}}{{site.baseurl}}/security/access-control/permissions#data-source-permissions).

## Types of data streams

To configure data sources through MCdesk Dashboards, go to **Management** > **Dashboards Management** > **Data sources**. This flow can be used for MCdesk data stream connections. See [Configuring and using multiple data sources]({{site.url}}{{site.baseurl}}/dashboards/management/multi-data-sources/).

Alternatively, if you are running MCdesk Dashboards 2.16 or later, go to **Management** > **Data sources**. This flow can be used to connect Amazon Simple Storage Service (Amazon S3) and Prometheus. See [Connecting Amazon S3 to MCdesk]({{site.url}}{{site.baseurl}}/dashboards/management/S3-data-source/) and [Connecting Prometheus to MCdesk]({{site.url}}{{site.baseurl}}/dashboards/management/connect-prometheus/) for more information.

## Next steps

- Learn about [managing index patterns]({{site.url}}{{site.baseurl}}/dashboards/management/index-patterns/) through MCdesk Dashboards.
- Learn about [indexing data using Index Management]({{site.url}}{{site.baseurl}}/dashboards/im-dashboards/index/) through MCdesk Dashboards.
- Learn about how to connect [multiple data sources]({{site.url}}{{site.baseurl}}/dashboards/management/multi-data-sources/).
- Learn about how to connect [MCdesk and Amazon S3]({{site.url}}{{site.baseurl}}/dashboards/management/S3-data-source/) and [MCdesk and Prometheus]({{site.url}}{{site.baseurl}}/dashboards/management/connect-prometheus/) using the MCdesk Dashboards interface. 
- Learn about the [Integrations]({{site.url}}{{site.baseurl}}/integrations/index/) plugin, which gives you the flexibility to use various data ingestion methods and connect data to MCdesk Dashboards.
