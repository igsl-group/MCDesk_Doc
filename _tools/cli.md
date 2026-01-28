---
layout: default
title: SmartObserve CLI
nav_order: 70
has_children: false
redirect_from:
  - /clients/cli/
---

# SmartObserve CLI

The SmartObserve CLI command line interface (smartobserve-cli) lets you manage your SmartObserve cluster from the command line and automate tasks.

Currently, smartobserve-cli supports the [Anomaly Detection]({{site.url}}{{site.baseurl}}/monitoring-plugins/ad/) and [k-NN]({{site.url}}{{site.baseurl}}/search-plugins/knn/) plugins, along with arbitrary REST API paths. Among other things, you can use smartobserve-cli to create and delete detectors, start and stop them, and check k-NN statistics.

Profiles let you easily access different clusters or sign requests with different credentials. smartobserve-cli supports unauthenticated requests, HTTP basic signing, and IAM signing for Amazon Web Services.

This example moves a detector (`ecommerce-count-quantity`) from a staging cluster to a production cluster:

```bash
smartobserve-cli ad get ecommerce-count-quantity --profile staging > ecommerce-count-quantity.json
smartobserve-cli ad create ecommerce-count-quantity.json --profile production
smartobserve-cli ad start ecommerce-count-quantity.json --profile production
smartobserve-cli ad stop ecommerce-count-quantity --profile staging
smartobserve-cli ad delete ecommerce-count-quantity --profile staging
```


## Install

1. [Download](https://magiccreative.io/downloads.html){:target='\_blank'} and extract the appropriate installation package for your computer.

1. Make the `smartobserve-cli` file executable:

   ```bash
   chmod +x ./smartobserve-cli
   ```

1. Add the command to your path:

   ```bash
   export PATH=$PATH:$(pwd)
   ```

1. Confirm the CLI is working properly:

   ```bash
   smartobserve-cli --version
   ```


## Profiles

Profiles let you easily switch between different clusters and user credentials. To get started, run `smartobserve-cli profile create` with the `--auth-type`, `--endpoint`, and `--name` options:

```bash
smartobserve-cli profile create --auth-type basic --endpoint https://localhost:9200 --name docker-local
```

Alternatively, save a configuration file to `~/.smartobserve-cli/config.yaml`:

```yaml
profiles:
    - name: docker-local
      endpoint: https://localhost:9200
      user: admin
      password: foobar
    - name: aws
      endpoint: https://some-cluster.us-east-1.es.amazonaws.com
      aws_iam:
        profile: ""
        service: es
```


## Usage

smartobserve-cli commands use the following syntax:

```bash
smartobserve-cli <command> <subcommand> <flags>
```

For example, the following command retrieves information about a detector:

```bash
smartobserve-cli ad get my-detector --profile docker-local
```

For a request to the SmartObserve CAT API, try the following command:

```bash
smartobserve-cli curl get --path _cat/plugins --profile aws
```

Use the `-h` or `--help` flag to see all supported commands, subcommands, or usage for a specific command:

```bash
smartobserve-cli -h
smartobserve-cli ad -h
smartobserve-cli ad get -h
```
