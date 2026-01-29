---
layout: default
title: Experimental feature flags
parent: Configuring MCdesk
nav_order: 120
---

# Experimental feature flags

MCdesk releases may contain experimental features that you can enable or disable as needed. There are several methods for enabling feature flags, depending on the installation type. 

## Enable in mcdesk.yml

If you are running an MCdesk cluster and want to enable feature flags in the config file, add the following line to `mcdesk.yml`:

```yaml
mcdesk.experimental.feature.<feature_name>.enabled: true
```
{% include copy.html %}

## Enable on Docker containers

If you’re running Docker, add the following line to `docker-compose.yml` under the `mcdesk-node` > `environment` section:

```bash
OPENSEARCH_JAVA_OPTS="-Dmcdesk.experimental.feature.<feature_name>.enabled=true"
```
{% include copy.html %}

## Enable on a tarball installation

To enable feature flags on a tarball installation, provide the new JVM parameter either in `config/jvm.options` or `OPENSEARCH_JAVA_OPTS`.

### Option 1: Modify jvm.options

Add the following lines to `config/jvm.options` before starting the `mcdesk` process to enable the feature and its dependency:

```bash
-Dmcdesk.experimental.feature.<feature_name>.enabled=true
```
{% include copy.html %}

Then run MCdesk:

```bash
./bin/mcdesk
```
{% include copy.html %}

### Option 2: Enable with an environment variable

As an alternative to directly modifying `config/jvm.options`, you can define the properties by using an environment variable. This can be done using a single command when you start MCdesk or by defining the variable with `export`.

To add the feature flags inline when starting MCdesk, run the following command:

```bash
OPENSEARCH_JAVA_OPTS="-Dmcdesk.experimental.feature.<feature_name>.enabled=true" ./mcdesk-{{site.mcdesk_version}}/bin/mcdesk
```
{% include copy.html %}

If you want to define the environment variable separately prior to running MCdesk, run the following commands:

```bash
export OPENSEARCH_JAVA_OPTS="-Dmcdesk.experimental.feature.<feature_name>.enabled=true"
```
{% include copy.html %}

```bash
./bin/mcdesk
```
{% include copy.html %}

## Enable for MCdesk development

To enable feature flags for development, you must add the correct properties to `run.gradle` before building MCdesk. See the [Developer Guide](https://github.com/igsl-group/MCdesk/blob/main/DEVELOPER_GUIDE.md) for information about to use how Gradle to build MCdesk.

Add the following properties to run.gradle to enable the feature:

```gradle
testClusters {
    runTask {
      testDistribution = 'archive'
      if (numZones > 1) numberOfZones = numZones
      if (numNodes > 1) numberOfNodes = numNodes
      systemProperty 'mcdesk.experimental.feature.<feature_name>.enabled', 'true'
    }
  }
```
{% include copy.html %}