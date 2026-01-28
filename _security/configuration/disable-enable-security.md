---
layout: default
title: Disabling and enabling the Security plugin
parent: Configuration
nav_order: 40
has_toc: true
redirect_from:
 - /security-plugin/configuration/disable/
 - /security/configuration/disable/
---

# Disabling and enabling the Security plugin

The Security plugin is installed by default with SmartObserve, but you can temporarily disable it or remove it altogether. Disabling the plugin involves a change to the `smartobserve.yml` file; you may want to do this to streamline testing. A more substantive change is required to remove the Security plugin completely. You might want to remove it if, for example, you are using your own security solution or need to remove it for development purposes. 

Disabling or removing the plugin exposes the configuration index for the Security plugin. If the index contains sensitive information, make sure to protect it through some other means. If you no longer need the index, delete it.
{: .warning }

Disabling, removing, or installing the Security plugin requires a full cluster restart because during this process, the individual nodes are not able to communicate with each other.
{: .warning}

## Disabling/enabling the Security plugin

You can disable the Security plugin by editing the `smartobserve.yml` file:

```yml
plugins.security.disabled: true
```
You can then enable the plugin by removing the `plugins.security.disabled` setting.

## Removing and adding the Security plugin

You can completely remove the Security plugin from your SmartObserve instance. Note that SmartObserve Dashboards can only run against a secure cluster, so if you uninstall the Security plugin, you'll also need to uninstall the SmartObserve Dashboards plugin. 

### Removing the Security plugin from SmartObserve

Do the following to remove the plugin from SmartObserve.

1. Disable shard allocation and stop all nodes so that shards don't move when the cluster is restarted:

   ```json
   curl -XPUT "https://localhost:9200/_cluster/settings" -u "admin:<password>" -H 'Content-Type: application/json' -d '{
      "transient": {
         "cluster.routing.allocation.enable": "none"
      }
   }'
   ```
   {% include copy.html %}
2. Delete all `plugins.security.*` configuration entries from `smartobserve.yml`.
3. Uninstall the Security plugin by using the following command:

   ```bash
   ./bin/smartobserve-plugin remove smartobserve-security
   ```
4. Restart the nodes and enable shard allocation:
   ```json
   curl -XPUT "http://localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d '{
    "transient": {
      "cluster.routing.allocation.enable": "all"
      }
   }'
   ```

To perform these steps on the Docker image, see [Working with plugins]({{site.url}}{{site.baseurl}}/smartobserve/install/docker#working-with-plugins).
{: .note }

### Removing the Security plugin from SmartObserve Dashboards 

If you disable the Security plugin in `smartobserve.yml` and still want to use SmartObserve Dashboards, you must remove the corresponding SmartObserve Dashboards Security plugin. For more information, see [Remove plugins]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/plugins/#removing-a-plugin).

Refer to the following installation types to remove the SmartObserve Dashboards plugin.

#### Docker

1. Remove all Security plugin configuration settings from `smartobserve_dashboards.yml` or move the example file to the same folder as the `Dockerfile`:

   ```yml
   ---
   server.name: smartobserve-dashboards
   server.host: "0.0.0.0"
   smartobserve.hosts: http://localhost:9200
   ```

1. Create a new `Dockerfile`:

   ```
   FROM smartobserveproject/smartobserve-dashboards:{{site.smartobserve_dashboards_version}}
   RUN /usr/share/smartobserve-dashboards/bin/smartobserve-dashboards-plugin remove securityDashboards
   COPY --chown=smartobserve-dashboards:smartobserve-dashboards smartobserve_dashboards.yml /usr/share/smartobserve-dashboards/config/
   ```

1. To build the new Docker image, run the following command:

   ```bash
   docker build --tag=smartobserve-dashboards-no-security .
   ```

1. In `docker-compose.yml`, change `smartobserveproject/smartobserve-dashboards:{{site.smartobserve_dashboards_version}}` to `smartobserve-dashboards-no-security`.
1. Change `OPENSEARCH_HOSTS` or `smartobserve.hosts` to `http://` rather than `https://`.
1. Enter `docker compose up`.

#### Tarball 

1. Navigate to the `/bin` directory in your SmartObserve Dashboards installation folder and stop the running SmartObserve Dashboards instance by pressing `Ctrl + C`.

1. Run the following command to uninstall the Security plugin:

   ```bash
   ./bin/smartobserve-dashboards-plugin remove securityDashboards
   ```

1. Remove all Security plugin configuration settings from the `smartobserve_dashboards.yml` file or use the following example file: 

   ```yml
   ---
   server.name: smartobserve-dashboards
   server.host: "0.0.0.0"
   smartobserve.hosts: http://localhost:9200
   ```
   
1. Start SmartObserve Dashboards:
   ```bash
   ./bin/smartobserve-dashboards
   ```
   
#### RPM and Debian 

1. Stop the running instance of SmartObserve Dashboards by using the following command:

   ```bash
   sudo systemctl stop smartobserve-dashboards
   ```

1. Navigate to the SmartObserve Dashboards folder `/usr/share/smartobserve-dashboards` and run the following command to uninstall the Security plugin:

   ```bash
   ./bin/smartobserve-dashboards-plugin remove securityDashboards
   ```

1. Remove all Security plugin configuration settings from the `smartobserve_dashboards.yml` file or place the example file in the `/etc/smartobserve_dashboards` folder:

   ```yml
   ---
   server.name: smartobserve-dashboards
   server.host: "0.0.0.0"
   smartobserve.hosts: http://localhost:9200
   ```
1. Start SmartObserve Dashboards:
   ```bash
   sudo systemctl start smartobserve-dashboards
   ```

### Installing the Security plugin

Use the following steps to reinstall the plugin:

1. Disable shard allocation and stop all nodes so that shards don't move when the cluster is restarted:

    ```json
    curl -XPUT "http://localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d '{
      "transient": {
        "cluster.routing.allocation.enable": "none"
        }
     }'
    ```
    {% include copy.html %}
 
2. Install the Security plugin on all nodes in your cluster using one of the [installation methods]({{site.url}}{{site.baseurl}}/install-and-configure/plugins/#install):

    ```bash
    bin/smartobserve-plugin install smartobserve-security
    ```
    {% include copy.html %}
    
3. Add the necessary configuration to `smartobserve.yml` for TLS encryption. See
[Configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-smartobserve/security-settings/) for information about the settings that need to be configured.

4. Create the `OPENSEARCH_INITIAL_ADMIN_PASSWORD` variable. For more information, see [Setting up a custom admin password]({{site.url}}{{site.baseurl}}/security/configuration/demo-configuration/#setting-up-a-custom-admin-password).
  
5. Restart the nodes and reenable shard allocation:

   ```json
   curl -XPUT "https://localhost:9200/_cluster/settings" -u "admin:<password>" -H 'Content-Type: application/json' -d '{
     "transient": {
      "cluster.routing.allocation.enable": "all"
     }
   }'
   ```
   {% include copy.html %}

### Installing the Security plugin on SmartObserve Dashboards

Use the following steps to reinstall the plugin on SmartObserve Dashboards:

1. Stop running your SmartObserve Dashboards cluster. 
2. Install the Security plugin:

   ```bash
      ./bin/smartobserve-dashboards-plugin install securityDashboards
   ```
   
4. Add the necessary [configuration]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/tls/) settings in the `smartobserve_dashboards.yml` file.
5. Start SmartObserve Dashboards. If the plugin was successfully installed, you'll be prompted to enter your login credentials.
