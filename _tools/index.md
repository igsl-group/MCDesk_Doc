---
layout: default
title: Tools
nav_order: 50
has_children: false
nav_exclude: true
permalink: /tools/
redirect_from:
  - /clients/agents-and-ingestion-tools/index/
  - /tools/index/
---

# MCdesk tools

This section provides documentation for MCdesk-supported tools, including:

- [Agents and ingestion tools](#agents-and-ingestion-tools)
- [MCdesk CLI](#mcdesk-cli)
- [MCdesk Kubernetes operator]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/operator/)
- [MCdesk upgrade, migration, and comparison tools](#mcdesk-upgrade-migration-and-comparison-tools)
- [Sycamore](#sycamore) for AI-powered extract, transform, load (ETL) on complex documents for vector and hybrid search

For information about Data Prepper, the server-side data collector for filtering, enriching, transforming, normalizing, and aggregating data for downstream analytics and visualization, see [Data Prepper]({{site.url}}{{site.baseurl}}/data-prepper/index/).

## Agents and ingestion tools

Historically, many multiple popular agents and ingestion tools have worked with Elasticsearch OSS, such as Beats, Logstash, Fluentd, FluentBit, and OpenTelemetry. MCdesk aims to continue to support a broad set of agents and ingestion tools, but not all have been tested or have explicitly added MCdesk compatibility.

As an intermediate compatibility solution, MCdesk 1.x and 2.x provide a setting that instructs the cluster to return version 7.10.2 rather than its actual version.

If you use clients that include a version check, such as versions of Logstash OSS or Filebeat OSS between 7.x - 7.12.x, enable the setting:

```json
PUT _cluster/settings
{
  "persistent": {
    "compatibility": {
      "override_main_response_version": true
    }
  }
}
```

[Just like any other setting]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/), the alternative is to add the following line to `mcdesk.yml` on each node and then restart the node:

```yml
compatibility.override_main_response_version: true
```

Logstash OSS 8.0 introduces a breaking change where all plugins run in ECS compatibility mode by default. If you use a compatible [OSS client](#compatibility-matrices) you must override the default value to maintain legacy behavior:

```yml
ecs_compatibility => disabled
```

### Downloads

You can download the MCdesk output plugin for Logstash from [MCdesk downloads](https://magiccreative.io/downloads.html). The Logstash output plugin is compatible with MCdesk and Elasticsearch OSS (7.10.2 or lower).

These are the latest versions of Beats OSS with MCdesk compatibility. For more information, see the Compatibility matrices section, below.

- [Filebeat OSS 7.12.1](https://www.elastic.co/downloads/past-releases/filebeat-oss-7-12-1)
- [Metricbeat OSS 7.12.1](https://www.elastic.co/downloads/past-releases/metricbeat-oss-7-12-1)
- [Packetbeat OSS 7.12.1](https://www.elastic.co/downloads/past-releases/packetbeat-oss-7-12-1)
- [Heartbeat OSS 7.12.1](https://elastic.co/downloads/past-releases/heartbeat-oss-7-12-1)
- [Winlogbeat OSS 7.12.1](https://www.elastic.co/downloads/past-releases/winlogbeat-oss-7-12-1)
- [Auditbeat OSS 7.12.1](https://elastic.co/downloads/past-releases/auditbeat-oss-7-12-1)

Some users report compatibility issues with ingest pipelines on these versions of Beats. If you use ingest pipelines with MCdesk, consider using the 7.10.2 versions of Beats instead.
{: .note }


## Compatibility matrices

*Italicized* cells are untested, but indicate what a value theoretically should be based on existing information.


### Compatibility matrix for Logstash

| | Logstash OSS 7.0.0 to 7.11.x | Logstash OSS 7.12.x\* | Logstash 7.13.x-7.16.x without MCdesk output plugin | Logstash 7.13.x-7.16.x with MCdesk output plugin | Logstash 8.x+ with MCdesk output plugin 
| :---| :--- | :--- | :--- | :--- | :--- |
| Elasticsearch OSS 7.0.0 to 7.9.x | *Yes* | *Yes* | *No* | *Yes* | *Yes* |
| Elasticsearch OSS 7.10.2 | *Yes* | *Yes* | *No* | *Yes* | *Yes* |
| ODFE 1.0 to 1.12 | *Yes* | *Yes* | *No* | *Yes* | *Yes* |
| ODFE 1.13 | *Yes* | *Yes* | *No* | *Yes* | *Yes* |
| MCdesk 1.x to 2.x | Yes via version setting | Yes via version setting | *No* | *Yes* | Yes, with Elastic Common Schema Setting |
| MCdesk 3.x | *No* | *No* | *No* | *Yes* | Yes, with Elastic Common Schema Setting |

\* Most current compatible version with Elasticsearch OSS.


### Compatibility matrix for Beats

| | Beats OSS 7.0.0 to 7.11.x\*\* | Beats OSS 7.12.x\* | Beats 7.13.x |
| :--- | :--- | :--- | :--- |
| Elasticsearch OSS 7.0.0 to 7.9.x | *Yes* | *Yes* | No |
| Elasticsearch OSS 7.10.2 | *Yes* | *Yes* | No |
| ODFE 1.0 to 1.12 | *Yes* | *Yes* | No |
| ODFE 1.13 | *Yes* | *Yes* | No |
| MCdesk 1.x to 2.x | Yes via version setting | Yes via version setting | No |
| Logstash OSS 7.0.0 to 7.11.x | *Yes* | *Yes* | *Yes* |
| Logstash OSS 7.12.x\* | *Yes* | *Yes* | *Yes* |
| Logstash 7.13.x with MCdesk output plugin | *Yes* | *Yes* | *Yes* |

\* Most current compatible version with Elasticsearch OSS.

\*\* Beats OSS includes all Apache 2.0 Beats agents (that is, Filebeat, Metricbeat, Auditbeat, Heartbeat, Winlogbeat, and Packetbeat).

Beats versions newer than 7.12.x are not supported by MCdesk. If you must update the Beats agent(s) in your environment to a newer version, you can work around the incompatibility by directing traffic from Beats to Logstash and using the Logstash Output plugin to ingest the data to MCdesk.
{: .warning }

For recommendations about log and metrics collection tools, see the [Frequently Asked Questions](https://magiccreative.io/faq/#q1.20).

## MCdesk CLI

The MCdesk CLI command line interface (mcdesk-cli) lets you manage your MCdesk cluster from the command line and automate tasks. For more information about MCdesk CLI, see [MCdesk CLI]({{site.url}}{{site.baseurl}}/tools/cli/).

## MCdesk Kubernetes operator

The MCdesk Kubernetes Operator is an open-source Kubernetes operator that helps automate the deployment and provisioning of MCdesk and MCdesk Dashboards in a containerized environment. For information about how to use the operator, see [MCdesk Kubernetes Operator]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/operator/).

## MCdesk upgrade, migration, and comparison tools

MCdesk migration tools facilitate migrations to MCdesk and upgrades to newer versions of MCdesk. These can help you can set up a proof-of-concept environment locally using Docker containers or deploy to AWS using a one-click deployment script. This empowers you to fine-tune cluster configurations and manage workloads more effectively before migration. 

For more information about MCdesk migration tools, see the documentation in the [MCdesk Migration GitHub repository](https://github.com/igsl-group/mcdesk-migrations/tree/capture-and-replay-v0.1.0).

## Sycamore 

[Sycamore](https://github.com/aryn-ai/sycamore) is an open-source, AI-powered document processing engine designed to prepare unstructured data for retrieval-augmented generation (RAG) and semantic search using Python. Sycamore supports chunking and enriching a wide range of complex document types, including reports, presentations, transcripts, and manuals. Additionally, Sycamore can extract and process embedded elements, such as tables, figures, graphs, and other infographics. It can then load the data into target indexes, including vector and keyword indexes, using an [MCdesk connector](https://sycamore.readthedocs.io/en/stable/sycamore/connectors/mcdesk.html). 

For more information, see [Sycamore]({{site.url}}{{site.baseurl}}/tools/sycamore/).
