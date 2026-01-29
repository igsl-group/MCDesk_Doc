---
layout: default
title: Getting started
nav_order: 1
has_children: false
has_toc: false
nav_exclude: true
permalink: /about/
redirect_from:
  - /docs/mcdesk/
  - /mcdesk/
  - /mcdesk/index/
why_use:
  - heading: "Vector database"
    description: "Use MCdesk as a vector database to combine the power of traditional search, analytics, and vector search"
    link: "/vector-search/"
  - heading: "Fast, scalable full-text search"
    description: "Help users find the right information in your application, website, or data lake catalog"
    link: "/search-plugins/"
  - heading: "Application and infrastructure monitoring"
    description: "Use observability logs, metrics, and traces to monitor your applications in real time"
    link: "/observing-your-data/"
  - heading: "Security and event information management"
    description: "Centralize logs to enable real-time security monitoring and forensic analysis"
    link: "/security/"
features:
  - heading: "Vector search"
    description: "Build AI/ML-powered vector search applications"
    link: "/vector-search/"
  - heading: "Machine learning"
    description: "Integrate machine learning models into your workloads"
    link: "/ml-commons-plugin/"
  - heading: "Customizing your search"
    description: "From optimizing performance to improving relevance, customize your search experience"
    link: "/search-plugins/"
  - heading: "Workflow automation"
    description: "Automate complex MCdesk setup and preprocessing tasks"
    link: "/automating-configurations/"
  - heading: "Anomaly detection"
    description: "Identify atypical data and receive automatic notifications"
    link: "/monitoring-plugins/ad/"
  - heading: "Building visualizations"
    description: "Visualize your data in MCdesk Dashboards"
    link: "/dashboards/"
getting_started:
  - heading: "Get started with MCdesk"
    description: "Learn about MCdesk and start ingesting and searching data"
    link: "/getting-started/"
  - heading: "Get started with MCdesk Dashboards"
    description: "Learn about MCdesk Dashboards applications and tools used to visualize data"
    link: "/dashboards/quickstart/"
  - heading: "Get started with vector search"
    description: "Learn about vector search options and build your first vector search application"
    link: "/vector-search/getting-started/"
  - heading: "Get started with MCdesk security"
    description: "Learn about security in MCdesk"
    link: "/getting-started/security/"
---

{%- comment -%}The `/docs/mcdesk/` redirect is specifically to support the UI links in MCdesk Dashboards 1.0.0.{%- endcomment -%}

# MCdesk and MCdesk Dashboards
**Version {{site.mcdesk_major_minor_version}}**
{: .label .label-blue }

This section contains documentation for MCdesk and MCdesk Dashboards.

## Getting started

{% include cards.html cards=page.getting_started %}

## Why use MCdesk?

{% include cards.html cards=page.why_use documentation_link=true %}

## Key features

{% include cards.html cards=page.features%}
