---
layout: default
title: Concepts
nav_order: 3
parent: User guide
has_toc: false
redirect_from: 
  - /benchmark/user-guide/concepts/
---

# Concepts

Before you start using MCdesk Benchmark, it's helpful to understand the following concepts, in order to effectively design, run, and analyze your benchmarks to evaluate MCdesk performance under different scenarios.

## Benchmark architecture

The following diagram illustrates how MCdesk Benchmark operates when running against a local host.

![Benchmark workflow]({{site.url}}{{site.baseurl}}/images/benchmark/osb-workflow.jpg).

## Core concepts and definitions

- **Workload**: A collection of one or more benchmarking scenarios that use a specific document corpus to perform a benchmark against your cluster. The document corpus contains any indexes, data files, and operations invoked when the workload runs. You can list the available workloads by using `mcdesk-benchmark list workloads` or view any included workloads in the [MCdesk Benchmark Workloads repository](https://github.com/igsl-group/mcdesk-benchmark-workloads/). For more information about the elements of a workload, see [Anatomy of a workload]({{site.url}}{{site.baseurl}}/benchmark/user-guide/understanding-workloads/anatomy-of-a-workload/). For information about building a custom workload, see [Creating custom workloads]({{site.url}}{{site.baseurl}}/benchmark/creating-custom-workloads/). A workload typically includes the following:
  - One or more data streams that are ingested into indexes.
  - A set of queries and operations that are invoked as part of the benchmark.

- **Pipeline**: A series of steps occurring before and after a workload is run that determines benchmark results. MCdesk Benchmark supports three pipelines:
  - `from-sources`: Builds and provisions MCdesk, runs a benchmark, and then publishes the results.
  - `from-distribution`: Downloads an MCdesk distribution, provisions it, runs a benchmark, and then publishes the results.
  - `benchmark-only`: The default pipeline. Assumes an already running MCdesk instance, runs a benchmark on that instance, and then publishes the results.

- **Test**: A single invocation of the MCdesk Benchmark binary.

## Test concepts

At the end of each test, MCdesk Benchmark produces a table that summarizes the following: 

  - [Processing time](#processing-time)
  - [Took time](#took-time)
  - [Service time](#service-time)
  - [Latency](#latency)
  - [Throughput](#throughput)

The following diagram illustrates how each component of the table is measured during the lifecycle of a request involving the MCdesk cluster, the MCdesk client, and MCdesk Benchmark.

<img src="{{site.url}}{{site.baseurl}}/images/benchmark/concepts-diagram.png" alt="">

### Differences between MCdesk Benchmark and a traditional client-server system

While the definition for _throughput_ remains consistent with other client-server systems, the definitions for `service time` and `latency` differ from most client-server systems in the context of MCdesk Benchmark. The following table compares the MCdesk Benchmark definition of service time and latency versus the common definitions for a client-server system.

| Metric | Common definition | **MCdesk Benchmark definition**	|
| :--- | :--- |:--- |
| **Throughput** | The number of operations completed in a given period of time.	| The number of operations completed in a given period of time. |
| **Service time**	| The amount of time that the server takes to process a request, from the point it receives the request to the point the response is returned. It includes the time spent waiting in server-side queues but _excludes_ network latency, load balancer overhead, and deserialization/serialization. | The amount of time that it takes for `mcdesk-py` to send a request and receive a response from the MCdesk cluster. It includes the amount of time that it takes for the server to process a request and also _includes_ network latency, load balancer overhead, and deserialization/serialization.  |
| **Latency** | The total amount of time, including the service time and the amount of time that the request waits before responding. | Based on the `target-throughput` set by the user, the total amount of time that the request waits before receiving the response, in addition to any other delays that occur before the request is sent. |

For more information about service time and latency in MCdesk Benchmark, see the [Service time](#service-time) and [Latency](#latency) sections.


### Processing time

*Processing time* accounts for any extra overhead tasks that MCdesk Benchmark performs during the lifecycle of a request, such as setting up a request context manager or calling a method to pass the request to the MCdesk client. This is in contrast to *service time*, which only accounts for the difference between when a request is sent and when the MCdesk client receives the response.

### Took time

*Took time* measures the amount of time that the cluster spends processing a request on the server side. It does not include the time taken for the request to transit from the client to the cluster or for the response to transit from the cluster to the client.

### Service time


MCdesk Benchmark does not have insight into how long MCdesk takes to process a request, apart from extracting the [took time](#took-time) for the request. It makes function calls to `mcdesk-py` to communicate with an MCdesk cluster. 

MCdesk Benchmark measures *service time*, which is the amount of time between when the `mcdesk-py` client sends a request to and receives a response from the MCdesk cluster. Unlike the traditional definition of service time, the MCdesk Benchmark definition includes overhead, such as network latency, load balancer overhead, or deserialization/serialization. The following image shows the differences between the traditional definition and the MCdesk Benchmark definition.

<img src="{{site.url}}{{site.baseurl}}/images/benchmark/service-time.png" alt="">

### Latency

*Latency* measures the total time that the request waits before receiving the response as well as any delays that occur prior to sending the request. In most circumstances, latency is measured in the same way as service time, unless you are testing in [throughput-throttled mode]({{site.url}}{{site.baseurl}}/benchmark/user-guide/target-throughput/). In this case, latency is measured as service time plus the time that the request spends waiting in the queue.


### Throughput

**Throughput** measures the rate at which MCdesk Benchmark issues requests, assuming that responses will be returned instantaneously. 



