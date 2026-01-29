---
layout: default
title: Configuring MCdesk
nav_order: 10
has_children: true
redirect_from:
  - /mcdesk/configuration/
  - /install-and-configure/configuring-mcdesk/
---

# Configuring MCdesk

There are two types of MCdesk settings: [dynamic](#dynamic-settings) and [static](#static-settings).

## Dynamic settings

Dynamic index settings are settings that you can update at any time. You can configure dynamic MCdesk settings through the Cluster Settings API. For details, see [Update cluster settings using the API](#updating-cluster-settings-using-the-api).

Whenever possible, use the Cluster Settings API; `mcdesk.yml` is local to each node, whereas the API applies the setting to all nodes in the cluster. 
{: .tip}

## Static settings

Certain operations are static and require you to modify the `mcdesk.yml` [configuration file](#configuration-file) and restart the cluster. In general, these settings relate to networking, cluster formation, and the local file system. To learn more, see [Cluster formation]({{site.url}}{{site.baseurl}}/mcdesk/cluster/).

## Specifying configuration settings at startup

You can specify configuration settings in the following ways.

### Flags at startup

You can pass the configuration directly to the JVM process at startup using the `-E` flag when launching MCdesk:

```bash
./mcdesk -Ecluster.name=mcdesk-cluster -Enode.name=mcdesk-node1 -Ehttp.host=0.0.0.0 -Ediscovery.type=single-node
```
{% include copy.html %}

### Directly in the shell environment

You can configure the environment variables directly in a shell environment before starting MCdesk, as shown in the following example:

```bash
export OPENSEARCH_JAVA_OPTS="-Xms2g -Xmx2g"
export OPENSEARCH_PATH_CONF="/etc/mcdesk"
./mcdesk
```
{% include copy.html %}

### Systemd service file

When running MCdesk as a service managed by `systemd`, you can specify environment variables in the service file, as shown in the following example:

```bash
# /etc/systemd/system/mcdesk.service.d/override.conf
[Service]
Environment="OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g"
Environment="OPENSEARCH_PATH_CONF=/etc/mcdesk"
```
After creating or modifying the file, reload the systemd configuration and restart the service using the following command:

```bash
sudo systemctl daemon-reload
sudo systemctl restart mcdesk
```
{% include copy.html %}

### Docker environment variables

When running MCdesk in Docker, you can specify environment variables using the `-e` option with `docker run` command, as shown in the following command:

```bash
docker run -e "OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g" -e "OPENSEARCH_PATH_CONF=/usr/share/mcdesk/config" mcdeskproject/mcdesk:latest
```
{% include copy.html %}


## Updating cluster settings using the API

The first step in changing a setting is to view the current settings by sending the following request:

```json
GET _cluster/settings?include_defaults=true
```
{% include copy-curl.html %}

For a more concise summary of non-default settings, send the following request:

```json
GET _cluster/settings
```
{% include copy-curl.html %}

Three categories of setting exist in the cluster settings API: persistent, transient, and default. Persistent settings, well, persist after a cluster restart. After a restart, MCdesk clears transient settings.

If you specify the same setting in multiple places, MCdesk uses the following precedence:

1. Transient settings
2. Persistent settings
3. Settings from `mcdesk.yml`
4. Default settings

To change a setting, use the [Cluster Settings API]({{site.url}}{{site.baseurl}}/api-reference/cluster-api/cluster-settings/) and specify the new value as either persistent or transient. This example shows the flat settings form:

```json
PUT _cluster/settings
{
  "persistent" : {
    "action.auto_create_index" : false
  }
}
```
{% include copy-curl.html %}

You can also use the expanded form, which lets you copy and paste from the GET response and change existing values:

```json
PUT _cluster/settings
{
  "persistent": {
    "action": {
      "auto_create_index": false
    }
  }
}
```
{% include copy-curl.html %}

---

## Configuration file

You can find `mcdesk.yml` in `/usr/share/mcdesk/config/mcdesk.yml` (Docker) or `/etc/mcdesk/mcdesk.yml` (most Linux distributions) on each node.

You can edit the `OPENSEARCH_PATH_CONF=/etc/mcdesk` to change the config directory location. This variable is sourced from `/etc/default/mcdesk`(Debian package) and `/etc/sysconfig/mcdesk`(RPM package).

If you set your customized `OPENSEARCH_PATH_CONF` variable, be aware that other default environment variables will not be loaded.

You don't mark settings in `mcdesk.yml` as persistent or transient, and settings use the flat form:

```yml
cluster.name: my-application
action.auto_create_index: true
compatibility.override_main_response_version: true
```

The demo configuration includes a number of [settings for the Security plugin]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/security-settings/) that you should modify before using MCdesk for a production workload. To learn more, see [Security]({{site.url}}{{site.baseurl}}/security/).

### (Optional) CORS header configuration

If you are working on a client application running against an MCdesk cluster on a different domain, you can configure headers in `mcdesk.yml` to allow for developing a local application on the same machine. Use [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) so that your application can make calls to the MCdesk API running locally. Add the following lines in your `custom-mcdesk.yml` file:

```yml
http.host: 0.0.0.0
http.port: 9200
http.cors.allow-origin: "http://localhost"
http.cors.enabled: true
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
```
