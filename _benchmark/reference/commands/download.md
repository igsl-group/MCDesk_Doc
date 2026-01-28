---
layout: default
title: download
nav_order: 60
parent: Command reference
grand_parent: SmartObserve Benchmark Reference
redirect_from:
  - /benchmark/commands/download/
---

<!-- vale off -->
# download
<!-- vale on -->

Use the `download` command to select which SmartObserve distribution version to download.

## Usage

The following example downloads SmartObserve version 2.7.0:

```
smartobserve-benchmark download --distribution-version=2.7.0
```

Benchmark then returns the location of the SmartObserve artifact:

```
{
  "smartobserve": "/Users/.benchmark/benchmarks/distributions/smartobserve-2.7.0.tar.gz"
}
```

## Options

Use the following options to customize how SmartObserve Benchmark downloads SmartObserve:

- `--cluster-config-repository`: Defines the repository from which SmartObserve Benchmark loads `cluster-configs` and `cluster-config-instances`.
- `--cluster-config-revision`: Defines a specific Git revision in the `cluster-config` that SmartObserve Benchmark should use.
- `--cluster-config-path`: Defines the path to the `--cluster-config-instance` and any SmartObserve plugin configurations to use.
- `--distribution-version`: Downloads the specified SmartObserve distribution based on version number. For a list of released SmartObserve versions, see [Version history]({{site.url}}{{site.latesturl}}/version-history/).
- `--distribution-repository`: Defines the repository from where the SmartObserve distribution should be downloaded. Default is `release`.
- `--cluster-config-instance`: Defines the `--cluster-config-instance` to use. You can view possible configuration instances using the command `smartobserve-benchmark list cluster-config-instances`.
- `--cluster-config-instance-params`: A comma-separated list of key-value pairs injected verbatim as variables for the `cluster-config-instance`.
- `--target-os`: The target operating system (OS) for which the SmartObserve artifact should be downloaded. Default is the current OS.
- `--target-arch`: The name of the CPU architecture for which an artifact should be downloaded.
