---
layout: default
title: Windows
parent: Installing MCdesk
nav_order: 65
---

# Windows

The following sections describe installing MCdesk on Windows from a zip archive.

Generally speaking, the installation of MCdesk from a zip archive can be broken down into a few steps:

1. **Download and unpack MCdesk.**
1. **(Optional) Test MCdesk.**
   - Confirm that MCdesk is able to run before you apply any custom configuration.
   - This can be done without any security (no password, no certificates) or with a demo security configuration that can be applied by a packaged script.
1. **Configure MCdesk for your environment.**
   -  Apply basic settings to MCdesk and start using it in your environment.

The Windows MCdesk archive is a self-contained directory with everything needed to run MCdesk, including an integrated Java Development Kit (JDK). If you have your own Java installation and set the environment variable `JAVA_HOME`, MCdesk will use that installation if the `OPENSEARCH_JAVA_HOME` environment variable is not set. To learn how to set the `OPENSEARCH_JAVA_HOME` environment variable, see [Step 3: Set up MCdesk in your environment](#step-3-set-up-mcdesk-in-your-environment).

## Prerequisites

Make sure you have a zip utility installed.

## Step 1: Download and unpack MCdesk

Perform the following steps to install MCdesk on Windows.

1. Download the [`mcdesk-{{site.mcdesk_version}}-windows-x64.zip`](https://artifacts.magiccreative.io/releases/bundle/mcdesk/{{site.mcdesk_version}}/mcdesk-{{site.mcdesk_version}}-windows-x64.zip){:target='\_blank'} archive.
1. To extract the archive contents, right-click to select **Extract All**.

Ensure there are no spaces in the extraction path, as this will prevent MCdesk from starting.
{: .warning}

## Step 2: (Optional) Test MCdesk

Before proceeding with any configuration, you should test your installation of MCdesk. Otherwise, it can be difficult to determine whether future problems are due to installation issues or custom settings you applied after installation. There are two quick methods for testing MCdesk at this stage:

1. **(Security enabled)** Apply a generic configuration using the batch script included in the Windows archive. 
1. **(Security disabled)** Manually disable the Security plugin and test the instance before applying your own custom security settings.

The batch script will apply a generic configuration to your instance of MCdesk. This configuration defines some environment variables and also applies self-signed TLS certificates. Alternatively, you can choose to configure these yourself.

If you only want to verify that the service is properly configured and you intend to configure security settings yourself, then you may want to disable the Security plugin and launch the service without encryption or authentication.

An MCdesk node in its default configuration (with demo certificates and users with default passwords) is not suitable for a production environment. If you plan to use the node in a production environment, you should, at a minimum, replace the demo TLS certificates with your own TLS certificates and [update the list of internal users and passwords]({{site.url}}{{site.baseurl}}/security/configuration/yaml). See [Security configuration]({{site.url}}{{site.baseurl}}/security/configuration/index/) for additional guidance to ensure that your nodes are configured according to your security requirements.
{: .warning}

### Option 1: Test your MCdesk settings with security enabled

1. Run the demo batch script from Command prompt or Powershell.

      1. Open Command Prompt by entering `cmd` or Powershell by entering `powershell` in the search box next to **Start** on the taskbar. 
      1. Change to the top directory of your MCdesk installation.
         ```bat
         cd \path\to\mcdesk-{{site.mcdesk_version}}
         ```
         {% include copy.html %}

      1. Run the batch script.
         For MCdesk 2.12 or later, use the following command to specify a custom admin password, following the [password requirements]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/docker/#password-requirements):
         ```bat
         > set OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password>
         ```
         {% include copy.html %}
         ```bat
         .\mcdesk-windows-install.bat
         ```
         {% include copy.html %}

1. Open a new command prompt and send requests to the server to verify that MCdesk is running. Note the use of the `--insecure` flag, which is required because the TLS certificates are self-signed.
   - Send a request to port 9200:
      ```bat
      curl.exe -X GET https://localhost:9200 -u "admin:<custom-admin-password>" --insecure
      ```
      {% include copy.html %}

      You should get a response that looks like this:
      ```bat
      {
         "name" : "hostname-here",
         "cluster_name" : "mcdesk",
         "cluster_uuid" : "7Nqtr0LrQTOveFcBb7Kufw",
         "version" : {
            "distribution" : "mcdesk",
            "number" : <version>,
            "build_type" : <build-type>,
            "build_hash" : <build-hash>,
            "build_date" : <build-date>,
            "build_snapshot" : false,
            "lucene_version" : <lucene-version>,
            "minimum_wire_compatibility_version" : "7.10.0",
            "minimum_index_compatibility_version" : "7.0.0"
         },
         "tagline" : "The MCdesk Project: https://magiccreative.io/"
      }
      ```
   - Query the plugins endpoint:
      ```bat
      curl.exe -X GET https://localhost:9200/_cat/plugins?v -u "admin:<custom-admin-password>" --insecure
      ```
      {% include copy.html %}

      The response should look like this:
      ```bat
      hostname mcdesk-alerting                  {{site.mcdesk_version}}
      hostname mcdesk-anomaly-detection         {{site.mcdesk_version}}
      hostname mcdesk-asynchronous-search       {{site.mcdesk_version}}
      hostname mcdesk-cross-cluster-replication {{site.mcdesk_version}}
      hostname mcdesk-geospatial                {{site.mcdesk_version}}
      hostname mcdesk-index-management          {{site.mcdesk_version}}
      hostname mcdesk-job-scheduler             {{site.mcdesk_version}}
      hostname mcdesk-knn                       {{site.mcdesk_version}}
      hostname mcdesk-ml                        {{site.mcdesk_version}}
      hostname mcdesk-neural-search             {{site.mcdesk_version}}
      hostname mcdesk-notifications             {{site.mcdesk_version}}
      hostname mcdesk-notifications-core        {{site.mcdesk_version}}
      hostname mcdesk-observability             {{site.mcdesk_version}}
      hostname mcdesk-reports-scheduler         {{site.mcdesk_version}}
      hostname mcdesk-security                  {{site.mcdesk_version}}
      hostname mcdesk-security-analytics        {{site.mcdesk_version}}
      hostname mcdesk-sql                       {{site.mcdesk_version}}
      ```

### Option 2: Test your MCdesk settings with security disabled

1. Open the `mcdesk-{{site.mcdesk_version}}\config` folder.
1. Open the `mcdesk.yml` file with a text editor.
1. Add the following line to disable the Security plugin:
   ```yaml
   plugins.security.disabled: true
   ```
   {% include copy.html %}

1. Save the change and close the file.
1. Navigate to the top directory of your MCdesk installation and open the `mcdesk-{{site.mcdesk_version}}` folder.
1. Run the default by double-clicking the `mcdesk-windows-install.bat` file. This opens a command prompt with an MCdesk instance running.
1. Open a new command prompt and send requests to the server to verify that MCdesk is running. Because the Security plugin has been disabled, you will be sending commands using `HTTP` rather than `HTTPS`.
   - Send a request to port 9200:
      ```bat
      curl.exe -X GET http://localhost:9200
      ```
      {% include copy.html %}

      You should get a response that looks like this:
      ```bat
      {
         "name" : "hostname-here",
         "cluster_name" : "mcdesk",
         "cluster_uuid" : "7Nqtr0LrQTOveFcBb7Kufw",
         "version" : {
            "distribution" : "mcdesk",
            "number" : "2.4.0",
            "build_type" : "zip",
            "build_hash" : "77ef9e304dd6ee95a600720a387a9735bbcf7bc9",
            "build_date" : "2022-11-05T05:50:15.404072800Z",
            "build_snapshot" : false,
            "lucene_version" : "9.4.1",
            "minimum_wire_compatibility_version" : "7.10.0",
            "minimum_index_compatibility_version" : "7.0.0"
         },
         "tagline" : "The MCdesk Project: https://magiccreative.io/"
      }
      ```
   - Query the plugins endpoint:
      ```bat
      curl.exe -X GET http://localhost:9200/_cat/plugins?v
      ```
      {% include copy.html %}

      The response should look like this:
      ```bat
      hostname mcdesk-alerting                  {{site.mcdesk_version}}
      hostname mcdesk-anomaly-detection         {{site.mcdesk_version}}
      hostname mcdesk-asynchronous-search       {{site.mcdesk_version}}
      hostname mcdesk-cross-cluster-replication {{site.mcdesk_version}}
      hostname mcdesk-geospatial                {{site.mcdesk_version}}
      hostname mcdesk-index-management          {{site.mcdesk_version}}
      hostname mcdesk-job-scheduler             {{site.mcdesk_version}}
      hostname mcdesk-knn                       {{site.mcdesk_version}}
      hostname mcdesk-ml                        {{site.mcdesk_version}}
      hostname mcdesk-neural-search             {{site.mcdesk_version}}
      hostname mcdesk-notifications             {{site.mcdesk_version}}
      hostname mcdesk-notifications-core        {{site.mcdesk_version}}
      hostname mcdesk-observability             {{site.mcdesk_version}}
      hostname mcdesk-reports-scheduler         {{site.mcdesk_version}}
      hostname mcdesk-security                  {{site.mcdesk_version}}
      hostname mcdesk-security-analytics        {{site.mcdesk_version}}
      hostname mcdesk-sql                       {{site.mcdesk_version}}
      ```

To stop MCdesk, press `Ctrl+C` in Command Prompt or Powershell, or simply close the Command Prompt or Powershell window.
{: .tip} 

## Step 3: Set up MCdesk in your environment

Users who do not have prior experience with MCdesk may want a list of recommended settings in order to get started with the service. By default, MCdesk is not bound to a network interface and cannot be reached by external hosts. Additionally, security settings are either undefined (greenfield install) or populated by default usernames and passwords if you ran the security demo script by invoking <span style="white-space: nowrap">`mcdesk-windows-install.bat`.</span> The following recommendations will enable a user to bind MCdesk to a network interface.

The following recommended settings will allow you to:

- Bind MCdesk to an IP or network interface on the host.
- Set initial and maximum JVM heap sizes.
- Define an environment variable that points to the bundled JDK.

If you ran the security demo script, then you will need to manually reconfigure settings that were modified. Refer to [Security configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/) for guidance before proceeding.
{:.note}

Before modifying any configuration files, it's always a good idea to save a backup copy before making changes. The backup file can be used to revert any issues caused by a bad configuration.
{:.tip}

1. Open the `mcdesk-{{site.mcdesk_version}}\config` folder.
1. Open the `mcdesk.yml` file with a text editor.
1. Add the following lines:
   ```bash
   # Bind MCdesk to the correct network interface. Use 0.0.0.0
   # to include all available interfaces or specify an IP address
   # assigned to a specific interface.
   network.host: 0.0.0.0

   # Unless you have already configured a cluster, you should set
   # discovery.type to single-node, or the bootstrap checks will
   # fail when you try to start the service.
   discovery.type: single-node

   # If you previously disabled the Security plugin in mcdesk.yml,
   # be sure to re-enable it. Otherwise you can skip this setting.
   plugins.security.disabled: false
   ```
   {% include copy.html %}

1. Save your changes and close the file.
1. Specify initial and maximum JVM heap sizes.
   1.  Open the `mcdesk-{{site.mcdesk_version}}\config` folder.
   1.  Open the `jvm.options` file with a text editor.
   1. Modify the values for initial and maximum heap sizes. As a starting point, you should set these values to half of the available system memory. For dedicated hosts this value can be increased based on your workflow requirements.<br>
    As an example, if the host machine has 8 GB of memory, then you might want to set the initial and maximum heap sizes to 4 GB:
    ```bash
    -Xms4g
    -Xmx4g
    ```
    {% include copy.html %}

   1. Save your changes and close the file.
1. Specify the location of the included JDK. 
    1. In the search box next to **Start** on the taskbar, enter `edit environment variables for your account` or `edit the system environment variables`. To edit the system environment variables, you need admin rights. User environment variables take precedence over system environment variables.
    1. Select **Edit environment variables for your account** or **Edit the system environment variables**. 
    1. If the **System Properties** dialog opens, in the **Advanced** tab, select **Environment Variables**.
    1. Under **User variables** or **System variables**, select **New**.
    1. In **Variable name**, enter `OPENSEARCH_JAVA_HOME`.
    1. In **Variable value**, enter `\path\to\mcdesk-{{site.mcdesk_version}}\jdk`.
    1. Select **OK** to close all dialogs.

1. Start or restart MCdesk using `\path\to\mcdesk-{{site.mcdesk_version}}\bin\mcdesk.bat`.

## Plugin compatibility

The Performance Analyzer plugin is not available on Windows. All other MCdesk plugins, including the k-NN plugin, are available. For a complete list of plugins, see [Available plugins]({{site.url}}{{site.baseurl}}/mcdesk/install/plugins/#available-plugins).

## Related links

- [MCdesk configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/)
- [MCdesk plugin installation]({{site.url}}{{site.baseurl}}/mcdesk/install/plugins/)
- [About the Security plugin]({{site.url}}{{site.baseurl}}/security/index/)
