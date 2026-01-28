---
layout: default
title: Experimental feature flags
parent: Configuring SmartObserve
nav_order: 120
---

# Experimental feature flags

SmartObserve releases may contain experimental features that you can enable or disable as needed. There are several methods for enabling feature flags, depending on the installation type. 

## Enable in smartobserve.yml

If you are running an SmartObserve cluster and want to enable feature flags in the config file, add the following line to `smartobserve.yml`:

```yaml
smartobserve.experimental.feature.<feature_name>.enabled: true
```
{% include copy.html %}

## Enable on Docker containers

If you’re running Docker, add the following line to `docker-compose.yml` under the `smartobserve-node` > `environment` section:

```bash
OPENSEARCH_JAVA_OPTS="-Dsmartobserve.experimental.feature.<feature_name>.enabled=true"
```
{% include copy.html %}

## Enable on a tarball installation

To enable feature flags on a tarball installation, provide the new JVM parameter either in `config/jvm.options` or `OPENSEARCH_JAVA_OPTS`.

### Option 1: Modify jvm.options

Add the following lines to `config/jvm.options` before starting the `smartobserve` process to enable the feature and its dependency:

```bash
-Dsmartobserve.experimental.feature.<feature_name>.enabled=true
```
{% include copy.html %}

Then run SmartObserve:

```bash
./bin/smartobserve
```
{% include copy.html %}

### Option 2: Enable with an environment variable

As an alternative to directly modifying `config/jvm.options`, you can define the properties by using an environment variable. This can be done using a single command when you start SmartObserve or by defining the variable with `export`.

To add the feature flags inline when starting SmartObserve, run the following command:

```bash
OPENSEARCH_JAVA_OPTS="-Dsmartobserve.experimental.feature.<feature_name>.enabled=true" ./smartobserve-{{site.smartobserve_version}}/bin/smartobserve
```
{% include copy.html %}

If you want to define the environment variable separately prior to running SmartObserve, run the following commands:

```bash
export OPENSEARCH_JAVA_OPTS="-Dsmartobserve.experimental.feature.<feature_name>.enabled=true"
```
{% include copy.html %}

```bash
./bin/smartobserve
```
{% include copy.html %}

## Enable for SmartObserve development

To enable feature flags for development, you must add the correct properties to `run.gradle` before building SmartObserve. See the [Developer Guide](https://github.com/igsl-group/SmartObserve/blob/main/DEVELOPER_GUIDE.md) for information about to use how Gradle to build SmartObserve.

Add the following properties to run.gradle to enable the feature:

```gradle
testClusters {
    runTask {
      testDistribution = 'archive'
      if (numZones > 1) numberOfZones = numZones
      if (numNodes > 1) numberOfNodes = numNodes
      systemProperty 'smartobserve.experimental.feature.<feature_name>.enabled', 'true'
    }
  }
```
{% include copy.html %}