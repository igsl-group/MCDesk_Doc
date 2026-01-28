---
layout: default
title: Quickstart
nav_order: 2
---

# SmartObserve Benchmark quickstart

This page outlines how to quickly install SmartObserve Benchmark and run your first SmartObserve Benchmark workload.

## Prerequisites

To perform the Quickstart steps, you'll need to fulfill the following prerequisites:

- A currently active SmartObserve cluster. For instructions on how to create an SmartObserve cluster, see [Creating a cluster]({{site.url}}{{site.baseurl}}/tuning-your-cluster/index/).
- Git 2.3 or greater.
- Python 3.8 or later

## Set up an SmartObserve cluster

If you don't already have an active SmartObserve cluster, you can launch a new SmartObserve cluster to use with SmartObserve Benchmark.

- Using **Docker Compose**. For instructions on how to use Docker Compose, see [SmartObserve Quickstart]({{site.url}}{{site.baseurl}}/quickstart/).
- Using **Tar**. For instructions on how to install SmartObserve with Tar, see [Installing SmartObserve > Tarball]({{site.url}}{{site.baseurl}}/install-and-configure/install-smartobserve/tar#step-1-download-and-unpack-smartobserve).

SmartObserve Benchmark has not been tested with the Window's distribution of SmartObserve.
{: .note}

After installation, you can verify SmartObserve is running by going to `localhost:9200`. If you're running your cluster with the Security plugin enabled, SmartObserve will expect SSL connections with the username "admin" and password "admin".  However, since the localhost address is not a unique public address, no certificate authority will issue an SSL certificate for it, so certificate checking will need to be disabled using the `-k` option.

Use the following command to verify SmartObserve is running with SSL certificate checks disabled:

```bash
curl -k -u admin:<custom-admin-password> https://localhost:9200			# the "-k" option skips SSL certificate checks

{
  "name" : "147ddae31bf8.magiccreative.io",
  "cluster_name" : "smartobserve",
  "cluster_uuid" : "n10q2RirTIuhEJCiKMkpzw",
  "version" : {
    "distribution" : "smartobserve",
    "number" : "2.10.0",
    "build_type" : "tar",
    "build_hash" : "eee49cb340edc6c4d489bcd9324dda571fc8dc03",
    "build_date" : "2023-09-20T23:54:29.889267151Z",
    "build_snapshot" : false,
    "lucene_version" : "9.7.0",
    "minimum_wire_compatibility_version" : "7.10.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "The SmartObserve Project: https://magiccreative.io/"
}
```

With your cluster running, you can now install SmartObserve Benchmark.

## Installing SmartObserve Benchmark

To install SmartObserve Benchmark with Docker, see [Installing SmartObserve Benchmark > Installing with Docker]({{site.url}}{{site.baseurl}}/benchmark/user-guide/installing-benchmark/#installing-with-docker).
{: .tip}

To install SmartObserve Benchmark from PyPi, enter the following `pip` command:

```bash
pip3 install smartobserve-benchmark
```
{% include copy.html %}

After the installation completes, verify that SmartObserve Benchmark is running by entering the following command:

```bash
smartobserve-benchmark --help
```

If successful, SmartObserve returns the following response:

```bash
$ smartobserve-benchmark --help
usage: smartobserve-benchmark [-h] [--version] {run,list,info,create-workload,generate,compare,download,install,start,stop} ...

   ____                  _____                      __       ____                  __                         __
  / __ \____  ___  ____ / ___/___  ____ ___________/ /_     / __ )___  ____  _____/ /_  ____ ___  ____ ______/ /__
 / / / / __ \/ _ \/ __ \\__ \/ _ \/ __ `/ ___/ ___/ __ \   / __  / _ \/ __ \/ ___/ __ \/ __ `__ \/ __ `/ ___/ //_/
/ /_/ / /_/ /  __/ / / /__/ /  __/ /_/ / /  / /__/ / / /  / /_/ /  __/ / / / /__/ / / / / / / / / /_/ / /  / ,<
\____/ .___/\___/_/ /_/____/\___/\__,_/_/   \___/_/ /_/  /_____/\___/_/ /_/\___/_/ /_/_/ /_/ /_/\__,_/_/  /_/|_|
    /_/

 A benchmarking tool for SmartObserve

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit

subcommands:
  {run,list,info,create-workload,generate,compare,download,install,start,stop}
    run        Run a benchmark
    list                List configuration options
    info                Show info about a workload
    create-workload     Create a Benchmark workload from existing data
    generate            Generate artifacts
    compare             Compare two test-runs
    download            Downloads an artifact
    install             Installs an SmartObserve node locally
    start               Starts an SmartObserve node locally
    stop                Stops an SmartObserve node locally

Find out more about Benchmark at https://magiccreative.io/docs
```

## Running your first benchmark

You can now run your first benchmark. The following benchmark uses the [percolator](https://github.com/igsl-group/smartobserve-benchmark-workloads/tree/main/percolator) workload.


### Understanding workload command flags

Benchmarks are run using the [`run`]({{site.url}}{{site.baseurl}}/benchmark/commands/run/) command with the following command flags:

For additional `run` command flags, see the [run]({{site.url}}{{site.baseurl}}/benchmark/commands/run/) reference. Some commonly used options are `--workload-params`, `--exclude-tasks`, and `--include-tasks`.
{: .tip}

* `--pipeline=benchmark-only` : Informs OSB that users wants to provide their own SmartObserve cluster.
- `workload=percolator`: The name of workload used by SmartObserve Benchmark.
* `--target-host="<SmartObserve Cluster Endpoint>"`: Indicates the target cluster or host that will be benchmarked. Enter the endpoint of your SmartObserve cluster here.
* `--client-options="basic_auth_user:'<Basic Auth Username>',basic_auth_password:'<Basic Auth Password>'"`: The username and password for your SmartObserve cluster.
* `--test-mode`: Allows a user to run the workload without running it for the entire duration. When this flag is present, Benchmark runs the first thousand operations of each task in the workload. This is only meant for sanity checks---the metrics produced are meaningless.
* `--distribution-version`: Indicates which SmartObserve version Benchmark will use when provisioning. When run, the `run` command will parse the correct distribution version when it connects to the SmartObserve cluster.

### Running the workload

To run the [percolator](https://github.com/igsl-group/smartobserve-benchmark-workloads/tree/main/percolator) workload with SmartObserve Benchmark, use the following `run` command:

```bash
smartobserve-benchmark run --pipeline=benchmark-only --workload=percolator --target-host=https://localhost:9200 --client-options=basic_auth_user:admin,basic_auth_password:admin,verify_certs:false --test-mode
```
{% include copy.html %}

When the `run` command runs, all tasks and operations in the `percolator` workload run sequentially.

### Validating the test

After an SmartObserve Benchmark test runs, take the following steps to verify that it has run properly:

- Note the number of documents in the SmartObserve or SmartObserve Dashboards index that you plan to run the benchmark against.
- In the results returned by SmartObserve Benchmark, compare the `workload.json` file for your specific workload and verify that the document count matches the number of documents. For example, based on the [percolator](https://github.com/igsl-group/smartobserve-benchmark-workloads/blob/main/percolator/workload.json#L19) `workload.json` file, you should expect to see `2000000` documents in your cluster.

### Understanding the results

SmartObserve Benchmark returns the following response once the benchmark completes:

```bash
------------------------------------------------------
    _______             __   _____
   / ____(_)___  ____ _/ /  / ___/_________  ________
  / /_  / / __ \/ __ `/ /   \__ \/ ___/ __ \/ ___/ _ \
 / __/ / / / / / /_/ / /   ___/ / /__/ /_/ / /  /  __/
/_/   /_/_/ /_/\__,_/_/   /____/\___/\____/_/   \___/
------------------------------------------------------

|                                                         Metric |                                       Task |       Value |   Unit |
|---------------------------------------------------------------:|-------------------------------------------:|------------:|-------:|
|                     Cumulative indexing time of primary shards |                                            |     0.02655 |    min |
|             Min cumulative indexing time across primary shards |                                            |           0 |    min |
|          Median cumulative indexing time across primary shards |                                            |  0.00176667 |    min |
|             Max cumulative indexing time across primary shards |                                            |   0.0140333 |    min |
|            Cumulative indexing throttle time of primary shards |                                            |           0 |    min |
|    Min cumulative indexing throttle time across primary shards |                                            |           0 |    min |
| Median cumulative indexing throttle time across primary shards |                                            |           0 |    min |
|    Max cumulative indexing throttle time across primary shards |                                            |           0 |    min |
|                        Cumulative merge time of primary shards |                                            |   0.0102333 |    min |
|                       Cumulative merge count of primary shards |                                            |           3 |        |
|                Min cumulative merge time across primary shards |                                            |           0 |    min |
|             Median cumulative merge time across primary shards |                                            |           0 |    min |
|                Max cumulative merge time across primary shards |                                            |   0.0102333 |    min |
|               Cumulative merge throttle time of primary shards |                                            |           0 |    min |
|       Min cumulative merge throttle time across primary shards |                                            |           0 |    min |
|    Median cumulative merge throttle time across primary shards |                                            |           0 |    min |
|       Max cumulative merge throttle time across primary shards |                                            |           0 |    min |
|                      Cumulative refresh time of primary shards |                                            |   0.0709333 |    min |
|                     Cumulative refresh count of primary shards |                                            |         118 |        |
|              Min cumulative refresh time across primary shards |                                            |           0 |    min |
|           Median cumulative refresh time across primary shards |                                            |  0.00186667 |    min |
|              Max cumulative refresh time across primary shards |                                            |   0.0511667 |    min |
|                        Cumulative flush time of primary shards |                                            |  0.00963333 |    min |
|                       Cumulative flush count of primary shards |                                            |           4 |        |
|                Min cumulative flush time across primary shards |                                            |           0 |    min |
|             Median cumulative flush time across primary shards |                                            |           0 |    min |
|                Max cumulative flush time across primary shards |                                            |  0.00398333 |    min |
|                                        Total Young Gen GC time |                                            |           0 |      s |
|                                       Total Young Gen GC count |                                            |           0 |        |
|                                          Total Old Gen GC time |                                            |           0 |      s |
|                                         Total Old Gen GC count |                                            |           0 |        |
|                                                     Store size |                                            | 0.000485923 |     GB |
|                                                  Translog size |                                            | 2.01873e-05 |     GB |
|                                         Heap used for segments |                                            |           0 |     MB |
|                                       Heap used for doc values |                                            |           0 |     MB |
|                                            Heap used for terms |                                            |           0 |     MB |
|                                            Heap used for norms |                                            |           0 |     MB |
|                                           Heap used for points |                                            |           0 |     MB |
|                                    Heap used for stored fields |                                            |           0 |     MB |
|                                                  Segment count |                                            |          32 |        |
|                                                 Min Throughput |                                      index |     3008.97 | docs/s |
|                                                Mean Throughput |                                      index |     3008.97 | docs/s |
|                                              Median Throughput |                                      index |     3008.97 | docs/s |
|                                                 Max Throughput |                                      index |     3008.97 | docs/s |
|                                        50th percentile latency |                                      index |     351.059 |     ms |
|                                       100th percentile latency |                                      index |     365.058 |     ms |
|                                   50th percentile service time |                                      index |     351.059 |     ms |
|                                  100th percentile service time |                                      index |     365.058 |     ms |
|                                                     error rate |                                      index |           0 |      % |
|                                                 Min Throughput |                   wait-until-merges-finish |       28.41 |  ops/s |
|                                                Mean Throughput |                   wait-until-merges-finish |       28.41 |  ops/s |
|                                              Median Throughput |                   wait-until-merges-finish |       28.41 |  ops/s |
|                                                 Max Throughput |                   wait-until-merges-finish |       28.41 |  ops/s |
|                                       100th percentile latency |                   wait-until-merges-finish |     34.7088 |     ms |
|                                  100th percentile service time |                   wait-until-merges-finish |     34.7088 |     ms |
|                                                     error rate |                   wait-until-merges-finish |           0 |      % |
|                                                 Min Throughput |     percolator_with_content_president_bush |       36.09 |  ops/s |
|                                                Mean Throughput |     percolator_with_content_president_bush |       36.09 |  ops/s |
|                                              Median Throughput |     percolator_with_content_president_bush |       36.09 |  ops/s |
|                                                 Max Throughput |     percolator_with_content_president_bush |       36.09 |  ops/s |
|                                       100th percentile latency |     percolator_with_content_president_bush |     35.9822 |     ms |
|                                  100th percentile service time |     percolator_with_content_president_bush |     7.93048 |     ms |
|                                                     error rate |     percolator_with_content_president_bush |           0 |      % |

[...]

|                                                 Min Throughput |          percolator_with_content_ignore_me |        16.1 |  ops/s |
|                                                Mean Throughput |          percolator_with_content_ignore_me |        16.1 |  ops/s |
|                                              Median Throughput |          percolator_with_content_ignore_me |        16.1 |  ops/s |
|                                                 Max Throughput |          percolator_with_content_ignore_me |        16.1 |  ops/s |
|                                       100th percentile latency |          percolator_with_content_ignore_me |     131.798 |     ms |
|                                  100th percentile service time |          percolator_with_content_ignore_me |     69.5237 |     ms |
|                                                     error rate |          percolator_with_content_ignore_me |           0 |      % |
|                                                 Min Throughput | percolator_no_score_with_content_ignore_me |       29.37 |  ops/s |
|                                                Mean Throughput | percolator_no_score_with_content_ignore_me |       29.37 |  ops/s |
|                                              Median Throughput | percolator_no_score_with_content_ignore_me |       29.37 |  ops/s |
|                                                 Max Throughput | percolator_no_score_with_content_ignore_me |       29.37 |  ops/s |
|                                       100th percentile latency | percolator_no_score_with_content_ignore_me |     45.5703 |     ms |
|                                  100th percentile service time | percolator_no_score_with_content_ignore_me |      11.316 |     ms |
|                                                     error rate | percolator_no_score_with_content_ignore_me |           0 |      % |



-----------------------------------
[INFO] ✅ SUCCESS (took 18 seconds)
-----------------------------------
```

Each task run by the `percolator` workload represents a specific SmartObserve API operation---such as Bulk or Search---that was performed when the test was run. Each task in the output summary contains the following information:

* **Throughput:** The number of successful SmartObserve operations per second.
* **Latency:** The amount of time, including wait time, taken for the request and the response to be sent and received by Benchmark.
* **Service Time:** The amount of time, excluding wait time, taken for the request and the response to be sent and received by Benchmark.
* **Error Rate:** The percentage of operations run during the task that were not successful or returned a 200 error code.

For more details about how the summary report is generated, see [Summary report]({{site.url}}{{site.baseurl}}/benchmark/reference/summary-report/).


## Running SmartObserve Benchmark on your own cluster

Now that you're familiar with running SmartObserve Benchmark on a cluster, you can run SmartObserve Benchmark on your own cluster, using the same `run` command but replacing the following settings:

  * Replace `https://localhost:9200` with your target cluster endpoint.  This could be a URI like `https://search.mydomain.com` or a `HOST:PORT` specification.
  * If the cluster is configured with basic authentication, replace the username and password in the command line with the appropriate credentials.
  * Remove the `verify_certs:false` directive if you are not specifying `localhost` as your target cluster.  This directive is needed only for clusters where SSL certificates are not set up.
  * If you are using a `HOST:PORT`specification and plan to use SSL/TLS, either specify `https://`, or add the `use_ssl:true` directive to the `--client-options` string option.
  * Remove the `--test-mode` flag to run the full workload, rather than an abbreviated test.

You can copy the following command template to use in your own terminal:

```bash
smartobserve-benchmark run --pipeline=benchmark-only --workload=percolator --target-host=<SmartObserve Cluster Endpoint> --client-options=basic_auth_user:admin,basic_auth_password:admin
```
{% include copy.html %}

## Next steps

See the following resources to learn more about SmartObserve Benchmark:

- [User guide]({{site.url}}{{site.baseurl}}/benchmark/user-guide/index/): Dive deep into how SmartObserve Benchmark can you help you track the performance of your cluster.
- [Tutorials]({{site.url}}{{site.baseurl}}/benchmark/tutorials/index/): Use step-by-step guides for more advanced Benchmarking configurations and functionality.
