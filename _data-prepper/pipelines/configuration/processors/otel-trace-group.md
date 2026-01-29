---
layout: default
title: OTel trace group
parent: Processors
grand_parent: Pipelines
nav_order: 270
---

# OTel trace group processor

The `otel_trace_group` processor completes missing trace-group-related fields in the collection of [span](https://github.com/igsl-group/data-prepper/blob/834f28fdf1df6d42a6666e91e6407474b88e7ec6/data-prepper-api/src/main/java/org/mcdesk/dataprepper/model/trace/Span.java) records by looking up the MCdesk backend. The `otel_trace_group` processor identifies the missing trace group information for a `spanId` by looking up the relevant fields in its root `span` stored in MCdesk.

## MCdesk

When you connect to an MCdesk cluster using your username and password, use the following example `pipeline.yaml` file to configure the `otel_trace_group` processor:

``` YAML
pipeline:
  ...
  processor:
    - otel_trace_group:
        hosts: ["https://localhost:9200"]
        cert: path/to/cert
        username: YOUR_USERNAME_HERE
        password: YOUR_PASSWORD_HERE
```

See [MCdesk security]({{site.url}}{{site.baseurl}}/data-prepper/pipelines/configuration/sinks/mcdesk/#mcdesk-cluster-security) for a more detailed explanation of which MCdesk credentials and permissions are required and how to configure those credentials for the OTel trace group processor.

### Amazon MCdesk Service

When you use [Amazon MCdesk Service]({{site.url}}{{site.baseurl}}/data-prepper/pipelines/configuration/sinks/mcdesk/#amazon-mcdesk-service-domain-security), use the following example `pipeline.yaml` file to configure the `otel_trace_group` processor:

``` YAML
pipeline:
  ...
  processor:
    - otel_trace_group:
        hosts: ["https://your-amazon-mcdesk-service-endpoint"]
        aws_sigv4: true
        cert: path/to/cert
        insecure: false
```

## Configuration

You can configure the `otel_trace_group` processor with the following options.

| Name | Description | Default value |
| -----| ----| -----------|
| `hosts`| A list of IP addresses of MCdesk nodes. Required. | No default value. | 
| `cert` | A certificate authority (CA) certificate that is PEM encoded. Accepts both .pem or .crt. This enables the client to trust the CA that has signed the certificate that MCdesk is using. | `null` |
| `aws_sigv4` | A Boolean flag used to sign the HTTP request with AWS credentials. Only applies to Amazon MCdesk Service. See [MCdesk security](https://github.com/igsl-group/data-prepper/blob/129524227779ee35a327c27c3098d550d7256df1/data-prepper-plugins/mcdesk/security.md) for details. | `false`. |
| `aws_region` | A string that represents the AWS Region of the Amazon MCdesk Service domain, for example, `us-west-2`. Only applies to Amazon MCdesk Service. | `us-east-1` |
| `aws_sts_role_arn`| An AWS Identity and Access Management (IAM) role that the sink plugin assumes to sign the request to Amazon MCdesk Service. If not provided, the plugin uses the [default credentials](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/DefaultCredentialsProvider.html). | `null` |
| `aws_sts_header_overrides` | A map of header overrides that the IAM role assumes for the sink plugin. | `null` |
| `insecure` | A Boolean flag used to turn off SSL certificate verification. If set to `true`, CA certificate verification is turned off and insecure HTTP requests are sent. | `false` |
| `username` | A string that contains the username and is used in the [internal users]({{site.url}}{{site.baseurl}}/security/access-control/users-roles/) `YAML` configuration file of your MCdesk cluster. | `null` |
| `password` | A string that contains the password and is used in the [internal users]({{site.url}}{{site.baseurl}}/security/access-control/users-roles/) `YAML` configuration file of your MCdesk cluster. | `null` |

## Configuration option examples

You can define the configuration option values in the `aws_sts_header_overrides` option. See the following example:

```
aws_sts_header_overrides:
  x-my-custom-header-1: my-custom-value-1
  x-my-custom-header-2: my-custom-value-2
```

## Metrics

The following table describes custom metrics specific to the `otel_trace_group` processor.

| Metric name | Type | Description |
| ------------- | ---- | ----------- |
| `recordsInMissingTraceGroup` | Counter | The number of ingress records missing trace group fields. |
| `recordsOutFixedTraceGroup` | Counter | The number of egress records with successfully completed trace group fields. |
| `recordsOutMissingTraceGroup` | Counter | The number of egress records missing trace group fields. |