---
layout: default
title: download
nav_order: 60
parent: Command reference
grand_parent: MCdesk Benchmark Reference
redirect_from:
  - /benchmark/commands/download/
---

<!-- vale off -->
# download
<!-- vale on -->

Use the `download` command to select which MCdesk distribution version to download.

## Usage

The following example downloads MCdesk version 2.7.0:

```
mcdesk-benchmark download --distribution-version=2.7.0
```

Benchmark then returns the location of the MCdesk artifact:

```
{
  "mcdesk": "/Users/.benchmark/benchmarks/distributions/mcdesk-2.7.0.tar.gz"
}
```

## Options

Use the following options to customize how MCdesk Benchmark downloads MCdesk:

- `--cluster-config-repository`: Defines the repository from which MCdesk Benchmark loads `cluster-configs` and `cluster-config-instances`.
- `--cluster-config-revision`: Defines a specific Git revision in the `cluster-config` that MCdesk Benchmark should use.
- `--cluster-config-path`: Defines the path to the `--cluster-config-instance` and any MCdesk plugin configurations to use.
- `--distribution-version`: Downloads the specified MCdesk distribution based on version number. For a list of released MCdesk versions, see [Version history]({{site.url}}{{site.latesturl}}/version-history/).
- `--distribution-repository`: Defines the repository from where the MCdesk distribution should be downloaded. Default is `release`.
- `--cluster-config-instance`: Defines the `--cluster-config-instance` to use. You can view possible configuration instances using the command `mcdesk-benchmark list cluster-config-instances`.
- `--cluster-config-instance-params`: A comma-separated list of key-value pairs injected verbatim as variables for the `cluster-config-instance`.
- `--target-os`: The target operating system (OS) for which the MCdesk artifact should be downloaded. Default is the current OS.
- `--target-arch`: The name of the CPU architecture for which an artifact should be downloaded.
