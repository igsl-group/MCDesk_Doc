---
layout: default
title: Metrics reference
nav_order: 25
has_children: true
parent: MCdesk Benchmark Reference
redirect_from:
  - /benchmark/metrics/index/
  - /benchmark/reference/metrics/
---

# Metrics

After a workload completes, MCdesk Benchmark stores all metric records within its metrics store. These metrics can be kept in memory or in an MCdesk cluster.

## Storing metrics

You can specify whether metrics are stored in memory or in a metrics store while running the benchmark by setting the [`datastore.type`]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/#reporting) parameter in your `benchmark.ini` file.

### In memory

If you want to store metrics in memory while running the benchmark, provide the following settings in the `reporting` section of `benchmark.ini`:

```ini
[reporting]
datastore.type = in-memory
datastore.host = <host-url>
datastore.port = <host-port>
datastore.secure = False
datastore.ssl.verification_mode = <ssl-verification-details>
datastore.user = <username>
datastore.password = <password>
```

### MCdesk

If you want to store metrics in an external MCdesk memory store while running the benchmark, provide the following settings in the `reporting` section of `benchmark.ini`:

```ini
[reporting]
datastore.type = mcdesk
datastore.host = <mcdesk endpoint>
datastore.port = 443
datastore.secure = true
datastore.ssl.verification_mode = none
datastore.user = <mcdesk basic auth username>
datastore.password = <mcdesk basic auth password>
datastore.number_of_replicas =
datastore.number_of_shards =
```
When neither `datastore.number_of_replicas` nor `datastore.number_of_shards` is provided, MCdesk uses the default values: `0` for the number of replicas and `1` for the number of shards. If these settings are changed after the data store cluster is created, the new replica and shard settings will only apply when new result indexes are created at the end of the month.

After you run MCdesk Benchmark configured to use MCdesk as a data store, MCdesk Benchmark creates three indexes:

- `benchmark-metrics-YYYY-MM`: Holds granular metric and telemetry data.
- `benchmark-results-YYYY-MM`: Holds data based on final results.
- `benchmark-test-executions-YYYY-MM`: Holds data about `execution-ids`.

You can visualize data inside these indexes in MCdesk Dashboards.


## Next steps

- For more information about how to design a metrics store, see [Metric records]({{site.url}}{{site.baseurl}}/benchmark/metrics/metric-records/).
- For more information about what metrics are stored, see [Metric keys]({{site.url}}{{site.baseurl}}/benchmark/metrics/metric-keys/).
