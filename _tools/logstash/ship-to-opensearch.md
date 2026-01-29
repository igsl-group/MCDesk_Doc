---
layout: default
title: Ship events to MCdesk
parent: Logstash
nav_order: 220
redirect_from:
 - /clients/logstash/ship-to-mcdesk/
---

# Ship events to MCdesk

You can ship Logstash events to an MCdesk cluster and then visualize your events with MCdesk Dashboards.

Make sure you have [Logstash]({{site.url}}{{site.baseurl}}/tools/logstash/index#install-logstash), [MCdesk]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/index/), and [MCdesk Dashboards]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/index/).
{: .note }

## MCdesk output plugin

To run the MCdesk output plugin, add the following configuration in your `pipeline.conf` file:

```yml
output {
  mcdesk {
    hosts       => "https://localhost:9200"
    user        => "admin"
    password    => "admin"
    index       => "logstash-logs-%{+YYYY.MM.dd}"
    ssl_certificate_verification => false
  }
}
```

## Sample walkthrough

The following walkthrough shows an example of how the ship a Logstash event.

1.  Open the `config/pipeline.conf` file and add in the following configuration:

    ```yml
    input {
      stdin {
        codec => json
      }
    }

    output {
      mcdesk {
        hosts       => "https://localhost:9200"
        user        => "admin"
        password    => "admin"
        index       => "logstash-logs-%{+YYYY.MM.dd}"
        ssl_certificate_verification => false
      }
    }
    ```

The Logstash pipeline accepts JSON input through the terminal and ships the events to an MCdesk cluster running locally. Logstash writes the events to an index with the `logstash-logs-%{+YYYY.MM.dd}` naming convention.

2. Start Logstash:

    ```bash
    $ bin/logstash -f config/pipeline.conf --config.reload.automatic
    ```

    `config/pipeline.conf` is a relative path to the `pipeline.conf` file. You can use an absolute path as well.

3. Add a JSON object in the terminal:

    ```json
    { "amount": 10, "quantity": 2}
    ```

4. Start MCdesk Dashboards and choose **Dev Tools**:

    ```json
    GET _cat/indices?v

    health | status | index | uuid | pri | rep | docs.count | docs.deleted | store.size | pri.store.size
    green | open | logstash-logs-2021.07.01 | iuh648LYSnmQrkGf70pplA | 1 | 1 | 1 | 0 | 10.3kb | 5.1kb
    ```

## Adding different authentication mechanisms in the Output plugin

In addition to the existing authentication mechanisms, you can add a new authentication mechanism using the `auth_type` setting, as shown in the following example configuration:

```yml
output {    
    mcdesk {        
          hosts  => ["https://hostname:port"]     
          auth_type => {            
              type => 'basic'           
              user => 'admin'           
              password => 'admin'           
          }             
          index => "logstash-logs-%{+YYYY.MM.dd}"       
   }            
}               
```
### Parameters inside auth_type

The following parameters are supported in the `auth_type` setting:

- `type` (string): The type of authentication.
- `user`: A user name.
- `password`: The password used for basic authentication.

## Configuration for AWS IAM Authentication

To run the Logstash Output MCdesk plugin using `aws_iam` authentication, add the following configuration:

```yml
output {        
   mcdesk {     
          hosts => ["https://hostname:port"]              
          auth_type => {    
              type => 'aws_iam'     
              aws_access_key_id => 'ACCESS_KEY'     
              aws_secret_access_key => 'SECRET_KEY'     
              region => 'us-west-2'    
              service_name => 'es'     
          }         
          index  => "logstash-logs-%{+YYYY.MM.dd}"      
   }            
}
```

### Required Parameters

- `hosts` (array of string): The `AmazonOpensearchService` domain endpoint and port number.
- `auth_type` (JSON object): The authentication settings.
    - `type` (string): "aws_iam".
    - `aws_access_key_id` (string): AWS access key.
    - `aws_secret_access_key` (string): AWS secret access key.
    - `region` (string, :default => "us-east-1"): The region in which the domain is located.
- port (string): AmazonOpensearchService listens on port 443 for `HTTPS`.
- protocol (string): The protocol used to connect. For `AmazonOpensearchService`, the protocol is `https`.

### Optional Parameters

- `template` (path): You can set the path to your own template here. If no template is specified, the plugin uses the default template.
- `template_name` (string, default => `logstash`): Defines how the template is named inside MCdesk.
- `service_name` (string): Defines the service name to be used for `aws_iam` authentication.
- `legacy_template` (Boolean, default => `true`): Selects the MCdesk template API. When `true`, uses legacy templates derived from the `_template` API. When `false`, uses the `index_template` API.
- `default_server_major_version` (number): The MCdesk server major version to use when it's not available from the MCdesk root URL. If not set, the plugin throws an exception when the version can't be fetched.
- `target_bulk_bytes` (number): The maximum number of bytes in the buffer. When the maximum is reached, Logstash will flush the data to MCdesk. This is useful when the bulk requests are too large for the MCdesk cluster and the cluster returns a `429` error.

### Credential resolution logic

The following list provides details on the credential resolution logic:

- A user passes `aws_access_key_id` and `aws_secret_access_key` in the configuration.
- Environment variables, such `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are recommended since they are recognized by all the AWS SDKs and CLIs except for `.NET`. You can also use `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` which are recognized by the Java SDK.
- The credential profiles file found in the `~/.aws/credentials` directory, is shared by all AWS SDKs and the AWS CLI.
- Instance profile credentials are delivered through the Amazon EC2 metadata service.

## Data streams

The MCdesk output plugin can store both time series datasets (such as logs, events, and metrics) and non-time series data in MCdesk.
The data stream is recommended to index time series datasets (such as logs, metrics, and events) into MCdesk.

To learn more about data streams, see the [data stream documentation]({{site.url}}{{site.baseurl}}/mcdesk/data-streams/).

To ingest data into a data stream through Logstash, create the data stream and specify the name of the data stream and set the `action` setting to `create`, as shown in the following example configuration:

```yml
output {    
    mcdesk {        
          hosts  => ["https://hostname:port"]     
          auth_type => {            
              type => 'basic'           
              user => 'admin'           
              password => 'admin'           
          }
          index => "my-data-stream"
          action => "create"
   }            
}               
```
