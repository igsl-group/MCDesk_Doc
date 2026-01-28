---
layout: default
title: Read from SmartObserve
parent: Logstash
nav_order: 220
redirect_from:
  - /clients/logstash/read-from-smartobserve/
  - /clients/logstash/ship-to-smartobserve/
---

# Read from SmartObserve

As we ship Logstash events to an SmartObserve cluster using the [SmartObserve output plugin](https://github.com/igsl-group/logstash-output-smartobserve), we can also perform read operations on an SmartObserve cluster and load data into Logstash using the [SmartObserve input plugin](https://github.com/igsl-group/logstash-input-smartobserve).

The SmartObserve input plugin reads the search query results performed on an SmartObserve cluster and loads them into Logstash. This lets you replay test logs, reindex, and perform other operations based on the loaded data. You can schedule ingestions to run periodically by using 
[cron expressions]({{site.url}}{{site.baseurl}}/monitoring-plugins/alerting/cron/), or manually load data into Logstash by running the query once.



## SmartObserve input plugin

To run the SmartObserve input plugin, add the configuration to the `pipeline.conf` file within your Logstash's `config` folder. The example below runs the `match_all` query filter and loads in data once.

```yml
input {
  smartobserve {
    hosts       => "https://hostname:port"
    user        => "admin"
    password    => "admin"
    index       => "logstash-logs-%{+YYYY.MM.dd}"
    query       => '{ "query": { "match_all": {}} }'
  }
}

filter {
}

output {
}
```

To ingest data according to a schedule, use a cron expression that specifies the schedule you want. For example, to load in data every minute, add `schedule => "* * * * *"` to the input section of your `pipeline.conf` file.

Like the output plugin, after adding your configuration to the `pipeline.conf` file, start Logstash by providing the path to this file:

 ```bash
 $ bin/logstash -f config/pipeline.conf --config.reload.automatic
 ```

`config/pipeline.conf` is a relative path to the `pipeline.conf` file. You can use an absolute path as well.

Adding `stdout{}` to the `output{}` section of your `pipeline.conf` file prints the query results to the console. 

To reindex the data into an SmartObserve domain, add the destination domain configuration in the `output{}` section like shown [here]({{site.url}}{{site.baseurl}}/tools/logstash/index/).
