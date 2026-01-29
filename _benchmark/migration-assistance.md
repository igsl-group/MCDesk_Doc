---
layout: default
title: Migration assistance
nav_order: 102
---

# Migrating from 1.X to 2.X

For users who already have systems that integrate with MCdesk Benchmark, we recommend performing the following steps for a smooth transition to MCdesk Benchmark 2.0.

## Update Benchmark.ini
MCdesk Benchmark relies on `benchmark.ini`, which by default can be found in the `~/.benchmark` directory. This configuration file provides configurations related to where metrics are reported, how workloads are fetched, and much more. MCdesk Benchmark 2.0 renames `[results_publishing]` to `[reporting]`.

The configuration file should appear as follows:
```ini
[reporting]
datastore.type = in-memory
datastore.host = <host-url>
datastore.port = <host-port>
datastore.secure = False
datastore.ssl.verification_mode = <ssl-verification-details>
datastore.user = <username>
datastore.password = <password>
...
```

For information about how to configure MCdesk Benchmark, see [Configuring MCdesk Benchmark]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/).

## Update external metrics data store

Many users use an external metrics data store to store results and metrics from previous test runs.

MCdesk Benchmark `1.X` stored test details in indexes with the `benchmark-test-executions-*` index pattern. However, in `2.X`, it stores them in indexes with the `benchmark-test-runs-*` index patttern. We recommend adding this new index pattern in your metrics data store as well as updating dashboards that might still be using the old index pattern.

Old index pattern | New index pattern |
:--- | :--- |
benchmark-test-executions-* | benchmark-test-runs-* |

## Update scripts

Some users wrap MCdesk Benchmark with custom scripts to run nightly performance tests. These scripts may rely on some terminology that has been deprecated in `2.X`.

**Please see the following terms and adjust your scripts accordingly.**

1.X term | 2.X term |
:--- | :--- |
execute-test, test-execution-id, TestExecution | run, test-run, TestRun |
results_publishing, results_publisher | reporting, publisher |
provision-configs, provision-config-instances | cluster-configs, cluster-config-instances
load-worker-coordinator-hosts | worker-ips |

If you encounter any issues when migrating MCdesk Benchmark from `1.X` to `2.X`, reach out to the MCdesk Benchmark maintainers through any of the following ways:
- [Post a question in the MCdesk Benchmark Slack channel](https://mcdesk.slack.com/archives/C082PLA3VPW).
- [Attend the Community Meeting, Office Hours, and Issue Triage](https://www.meetup.com/mcdesk/events/309982456/?eventOrigin=group_upcoming_events).
- [Create an issue in the MCdesk Benchmark Github repository](https://github.com/igsl-group/mcdesk-benchmark/issues).