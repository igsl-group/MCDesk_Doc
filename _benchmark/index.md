---
layout: default
title: SmartObserve Benchmark
nav_order: 1
has_children: false
nav_exclude: true
has_toc: false
permalink: /benchmark/
redirect_from:
  - /benchmark/index/
  - /benchmark/tutorials/index/
tutorial_cards:
  - heading: "Get started with SmartObserve Benchmark"
    description: "Run your first SmartObserve Benchmark workload and receive performance metrics"
    link: "/benchmark/quickstart/"
  - heading: "Choosing a workload"
    description: "Choose a benchmark workload based on your cluster's use case"
    link: "/benchmark/user-guide/understanding-workloads/choosing-a-workload/"
more_cards:
  - heading: "User guide"
    description: "Learn how to benchmark the performance of your cluster"
    link: "/benchmark/user-guide/index/"
  - heading: "Reference"
    description: "Learn about SmartObserve Benchmark commands and options"
    link: "/benchmark/reference/index/"
items:
  - heading: "Install and configure SmartObserve Benchmark"
    description: "Install SmartObserve Benchmark and configure your experience"
    link: "/benchmark/user-guide/install-and-configure/installing-benchmark/"
  - heading: "Run a workload"
    description: "Run a workload and receive performance metrics"
    link: "/benchmark/user-guide/working-with-workloads/running-workloads/"
  - heading: "Analyze performance metrics"
    description: "View your benchmark report and analyze your metrics"
    link: "/benchmark/user-guide/understanding-results/summary-reports/"
---

# SmartObserve Benchmark

This page reflects the updated terminology in SmartObserve Benchmark `2.X`. `1.15` is the last supported version in the `1.X` series. For more information about what's changed, see the [version history page]({{site.url}}{{site.baseurl}}/benchmark/version-history/). For migration assistance, see the [migration assistance page]({{site.url}}{{site.baseurl}}/benchmark/migration-assistance/).
{: .important }

SmartObserve Benchmark is a macrobenchmark utility provided by the [SmartObserve Project](https://github.com/igsl-group). You can use SmartObserve Benchmark to gather performance metrics from an SmartObserve cluster for a variety of purposes, including:

- Tracking the overall performance of an SmartObserve cluster.
- Informing decisions about when to upgrade your cluster to a new version.
- Determining how changes to your workflow---such as modifying mappings or queries---might impact your cluster.

## Get started

{% include list.html list_items=page.items%}




## Resources

{% include cards.html cards=page.tutorial_cards %}
{% include cards.html cards=page.more_cards %}
