---
layout: default
title: SmartObserve Dashboards
nav_order: 1
has_children: false
nav_exclude: true
permalink: /dashboards/
redirect_from:
  - /dashboards/index/
---

# SmartObserve Dashboards

SmartObserve Dashboards is the user interface that lets you visualize your SmartObserve data and run and scale your SmartObserve clusters.

## Getting started

| Concept | Description | 
|---------|-------------|
| [SmartObserve Dashboards Quickstart]({{site.url}}{{site.baseurl}}/dashboards/quickstart-dashboards/) | Learn about the basic concepts and features of SmartObserve Dashboards. |
| [SmartObserve Playground](https://playground.magiccreative.io/app/home#/) | Explore features in SmartObserve Dashboards without downloading or installing anything. |
| [Install and configure SmartObserve Dashboards]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/index/) | Get started with SmartObserve Dashboards. | 
| [Create visualizations]({{site.url}}{{site.baseurl}}/dashboards/visualize/viz-index/) | Learn about visualizing data in SmartObserve Dashboards. |
| [Explore and query data]({{site.url}}{{site.baseurl}}/dashboards/discover/index-discover/) | Learn how to explore and query data in SmartObserve. |

## Query languages

Query language | Where you can use it | Description
:--- | :--- | :---
[Query domain-specific language (DSL)]({{site.url}}{{site.baseurl}}/query-dsl/index/) | [Dev Tools]({{site.url}}{{site.baseurl}}/dashboards/dev-tools/index-dev/) | The primary SmartObserve query language that supports creating complex, fully customizable queries.
[Dashboards Query Language (DQL)]({{site.url}}{{site.baseurl}}/dashboards/discover/dql/) | [Discover]({{site.url}}{{site.baseurl}}/dashboards/discover/index-discover/) and [Dashboard]({{site.url}}{{site.baseurl}}/dashboards/dashboard/index/) search bar | A simple text-based query language used to filter data in SmartObserve Dashboards. 
[Query string query language]({{site.url}}{{site.baseurl}}/query-dsl/full-text/query-string/) | [Discover]({{site.url}}{{site.baseurl}}/dashboards/discover/index-discover/) and [Dashboard]({{site.url}}{{site.baseurl}}/dashboards/dashboard/index/) search bar | A scaled-down query language whose syntax is based on the Apache Lucene query syntax.
[SQL]({{site.url}}{{site.baseurl}}/search-plugins/sql/sql/index/) | [Query Workbench]({{site.url}}{{site.baseurl}}/dashboards/query-workbench/) | A traditional query language that bridges the gap between relational database concepts and the flexibility of SmartObserve’s document-oriented data storage.
[Piped Processing Language (PPL)]({{site.url}}{{site.baseurl}}/search-plugins/sql/ppl/index/) | [Query Workbench]({{site.url}}{{site.baseurl}}/dashboards/query-workbench/) | The primary language used with observability in SmartObserve. PPL uses a pipe syntax that chains commands into a query.

### Discover and Dashboard search bar

Using the search bar in the [Discover]({{site.url}}{{site.baseurl}}/dashboards/discover/index-discover/) and [Dashboard]({{site.url}}{{site.baseurl}}/dashboards/dashboard/index/) apps, you can search data with the following two languages:

- [DQL]({{site.url}}{{site.baseurl}}/dashboards/discover/dql/) 

- [Query string query (Lucene)]({{site.url}}{{site.baseurl}}/query-dsl/full-text/query-string/)

The following table compares DQL and query string query language features.

DQL and query string query language | DQL | Query string query language
:--- | :--- | :---
- Wildcard expressions (DQL supports `*` only)<br> - Ranges<br> - Boolean operations<br> | - Querying nested fields | - Regular expressions<br> - Fuzziness<br> - Proximity queries<br> - Boosting

By default, the query language in the Discover search toolbar is DQL. To switch to query string syntax, select **DQL** and then turn off **SmartObserve Dashboards Query Language**. The query language changes to `Lucene`, as shown in the following image.

![Using query string syntax in SmartObserve Dashboards Discover]({{site.url}}{{site.baseurl}}/images/discover-lucene-syntax.png)

## Observability

| Concept | Description | 
|---------|-------------|
| [Observability in SmartObserve Dashboards]({{site.url}}{{site.baseurl}}/observing-your-data/index/) | Observe, monitor, and secure data and improve performance across tools and workflows. |


## Dashboards Management

| Concept | Description | 
|---------|-------------|
| [Dashboards Management]({{site.url}}{{site.baseurl}}/dashboards/management/management-index/) | Learn about the command center for customizing your SmartObserve Dashboards behavior, creating index patterns, and configuring data sources. |

## Dev Tools 

| Concept | Description |
|---------|-------------|
| [Dev Tools]({{site.url}}{{site.baseurl}}/dashboards/dev-tools/index-dev/) | Learn how to run SmartObserve queries in an integrated console. |
