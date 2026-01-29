---
layout: default
title: MCdesk CLI
nav_order: 70
has_children: false
redirect_from:
  - /clients/cli/
---

# MCdesk CLI

The MCdesk CLI command line interface (mcdesk-cli) lets you manage your MCdesk cluster from the command line and automate tasks.

Currently, mcdesk-cli supports the [Anomaly Detection]({{site.url}}{{site.baseurl}}/monitoring-plugins/ad/) and [k-NN]({{site.url}}{{site.baseurl}}/search-plugins/knn/) plugins, along with arbitrary REST API paths. Among other things, you can use mcdesk-cli to create and delete detectors, start and stop them, and check k-NN statistics.

Profiles let you easily access different clusters or sign requests with different credentials. mcdesk-cli supports unauthenticated requests, HTTP basic signing, and IAM signing for Amazon Web Services.

This example moves a detector (`ecommerce-count-quantity`) from a staging cluster to a production cluster:

```bash
mcdesk-cli ad get ecommerce-count-quantity --profile staging > ecommerce-count-quantity.json
mcdesk-cli ad create ecommerce-count-quantity.json --profile production
mcdesk-cli ad start ecommerce-count-quantity.json --profile production
mcdesk-cli ad stop ecommerce-count-quantity --profile staging
mcdesk-cli ad delete ecommerce-count-quantity --profile staging
```


## Install

1. [Download](https://magiccreative.io/downloads.html){:target='\_blank'} and extract the appropriate installation package for your computer.

1. Make the `mcdesk-cli` file executable:

   ```bash
   chmod +x ./mcdesk-cli
   ```

1. Add the command to your path:

   ```bash
   export PATH=$PATH:$(pwd)
   ```

1. Confirm the CLI is working properly:

   ```bash
   mcdesk-cli --version
   ```


## Profiles

Profiles let you easily switch between different clusters and user credentials. To get started, run `mcdesk-cli profile create` with the `--auth-type`, `--endpoint`, and `--name` options:

```bash
mcdesk-cli profile create --auth-type basic --endpoint https://localhost:9200 --name docker-local
```

Alternatively, save a configuration file to `~/.mcdesk-cli/config.yaml`:

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

mcdesk-cli commands use the following syntax:

```bash
mcdesk-cli <command> <subcommand> <flags>
```

For example, the following command retrieves information about a detector:

```bash
mcdesk-cli ad get my-detector --profile docker-local
```

For a request to the MCdesk CAT API, try the following command:

```bash
mcdesk-cli curl get --path _cat/plugins --profile aws
```

Use the `-h` or `--help` flag to see all supported commands, subcommands, or usage for a specific command:

```bash
mcdesk-cli -h
mcdesk-cli ad -h
mcdesk-cli ad get -h
```
