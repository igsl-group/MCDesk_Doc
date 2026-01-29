---
layout: default
title: RPM
parent: Installing MCdesk
redirect_from:
- /mcdesk/install/rpm/
nav_order: 51
---

{% comment %}
The following liquid syntax declares a variable, major_version_mask, which is transformed into "N.x" where "N" is the major version number. This is required for proper versioning references to the Yum repo.
{% endcomment %}
{% assign version_parts = site.mcdesk_major_minor_version | split: "." %}
{% assign major_version_mask = version_parts[0] | append: ".x" %}

# RPM

Installing MCdesk using RPM Package Manager (RPM) simplifies the process considerably compared to the [Tarball]({{site.url}}{{site.baseurl}}/mcdesk/install/tar/) method. Several technical considerations, such as the installation path, location of configuration files, and creation of a service managed by `systemd`, as examples, are handled automatically by the package manager.

Generally speaking, installing MCdesk from the RPM distribution can be broken down into a few steps:

1. **Download and install MCdesk.**
   - Install manually from an RPM package or from a YUM repository.
1. **(Optional) Test MCdesk.**
   - Confirm that MCdesk is able to run before you apply any custom configuration.
   - This can be done without any security (no password, no certificates) or with a demo security configuration that can be applied by a packaged script.
1. **Configure MCdesk for your environment.**
   -  Apply basic settings to MCdesk and start using it in your environment.

The RPM distribution provides everything you need to run MCdesk inside Red Hat or Red Hat–based Linux Distributions. For a list of supported operating systems, see [Operating system compatibility]({{site.url}}{{site.baseurl}}/install-and-configure/os-comp/).

This guide assumes that you are comfortable working from the Linux command line interface (CLI). You should understand how to input commands, navigate between directories, and edit text files. Some example commands reference the `vi` text editor, but you may use any text editor available.
{:.note}

## Step 1: Download and install MCdesk

### Install MCdesk from a package

1. Download the RPM package for the desired version directly from the [MCdesk downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}. The RPM package can be downloaded for both **x64** and **arm64** architectures.
1. Import the public GNU Privacy Guard (GPG) key. This key verifies that your MCdesk instance is signed.
   
    ```bash
    sudo rpm --import https://artifacts.magiccreative.io/publickeys/mcdesk-release.pgp
    ```
    {% include copy.html %}
   
1. From the CLI, you can install the package with `rpm` or `yum`.
   
   For new installations of MCdesk 2.12 and later, you must define a custom admin password in order to set up a demo security configuration. Use one of the following commands to define a custom admin password, following the [password requirements]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/docker/#password-requirements):

   ```bash
   ## Install the x64 package using yum.
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> yum install mcdesk-{{site.mcdesk_version}}-linux-x64.rpm
   
   ## Install the x64 package using rpm.
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> rpm -ivh mcdesk-{{site.mcdesk_version}}-linux-x64.rpm
   
   ## Install the arm64 package using yum.
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> yum install mcdesk-{{site.mcdesk_version}}-linux-arm64.rpm
   
   ## Install the arm64 package using rpm.
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> rpm -ivh mcdesk-{{site.mcdesk_version}}-linux-arm64.rpm
   ```
   
   Use the following command for MCdesk versions 2.11 and earlier:
   
   ```bash
   ## Install the x64 package using yum.
   sudo yum install mcdesk-<version>-linux-x64.rpm

   ## Install the x64 package using rpm.
   sudo rpm -ivh mcdesk-<version>-linux-x64.rpm

   ## Install the arm64 package using yum.
   sudo yum install mcdesk-<version>-linux-arm64.rpm

   ## Install the arm64 package using rpm.
   sudo rpm -ivh mcdesk-<version>-linux-arm64.rpm
   ```

1. After the installation succeeds, enable MCdesk as a service.

   ```bash
   sudo systemctl enable mcdesk
   ```
   {% include copy.html %}

1. Start MCdesk.

   ```bash
   sudo systemctl start mcdesk
   ```
   {% include copy.html %}

1. Verify that MCdesk launched correctly:

   ```bash
   sudo systemctl status mcdesk
   ```
   {% include copy.html %}

### Install MCdesk from a YUM repository

YUM, the primary package management tool for Red Hat–based operating systems, allows you to download and install the RPM package from the YUM repository. 

1. Create a local repository file for MCdesk:
   ```bash
   sudo curl -SL https://artifacts.magiccreative.io/releases/bundle/mcdesk/{{major_version_mask}}/mcdesk-{{major_version_mask}}.repo -o /etc/yum.repos.d/mcdesk-{{major_version_mask}}.repo
   ```
   {% include copy.html %}

1. Clean your YUM cache to ensure a smooth installation:
   ```bash
   sudo yum clean all
   ```
   {% include copy.html %}

1. Verify that the repository was created successfully.
    ```bash
    sudo yum repolist
    ```
    {% include copy.html %}

1. With the repository file downloaded, list all available versions of MCdesk:
   ```bash
   sudo yum list mcdesk --showduplicates
   ```
   {% include copy.html %}

1. Choose the version of MCdesk you want to install:
   - Unless otherwise indicated, the latest available version of MCdesk is installed.

   ```bash
   # For MCdesk versions 2.12 and later, a custom admin password is required in order to set up a demo security configuration for a new installation.
   # To set a custom admin password, use the following commands:
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> yum install mcdesk

   # Use the following command for MCdesk versions 2.11 and earlier:
   sudo yum install mcdesk
   ```
   {% include copy.html %}

   - To install a specific version of MCdesk:

   ```bash
   # For MCdesk versions 2.12 and later, a custom admin password is required in order to set up a demo security configuration for a new installation.
   # To set a custom admin password, use the following commands:
   sudo env OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password> yum install 'mcdesk-{{site.mcdesk_version}}'

   # Use the following command for MCdesk versions 2.11 and earlier:
   sudo yum install 'mcdesk-2.11.0'
   ```
   {% include copy.html %}

1. During installation, the installer will present you with the GPG key fingerprint. Verify that the information matches the following:
   ```bash
   Fingerprint: A8B2 D9E0 4CD5 1FEF 6AA2 DB53 BA81 D999 8119 1457
   ```
   {% include copy.html %}

    - If correct, enter `yes` or `y`. The MCdesk installation continues.
1. Once complete, you can run MCdesk.
    ```bash
    sudo systemctl start mcdesk
    ```
    {% include copy.html %}

1. Verify that MCdesk launched correctly.
    ```bash
    sudo systemctl status mcdesk
    ```
    {% include copy.html %}

## Step 2: (Optional) Test MCdesk

Before proceeding with any configuration, you should test your installation of MCdesk. Otherwise, it can be difficult to determine whether future problems are due to installation issues or custom settings you applied after installation.

When MCdesk is installed using the RPM package, some demo security settings are automatically applied. This includes self-signed TLS certificates and several users and roles. If you would like to configure these yourself, see [Set up MCdesk in your environment](#step-3-set-up-mcdesk-in-your-environment).

An MCdesk node in its default configuration (with demo certificates and users with default passwords) is not suitable for a production environment. If you plan to use the node in a production environment, you should, at a minimum, replace the demo TLS certificates with your own TLS certificates and [update the list of internal users and passwords]({{site.url}}{{site.baseurl}}/security/configuration/yaml). See [Security configuration]({{site.url}}{{site.baseurl}}/security/configuration/index/) for additional guidance to ensure that your nodes are configured according to your security requirements.
{: .warning}

1. Send requests to the server to verify that MCdesk is running. Note the use of the `--insecure` flag, which is required because the TLS certificates are self-signed.
   - Send a request to port 9200:
      ```bash
      curl -X GET https://localhost:9200 -u 'admin:<custom-admin-password>' --insecure
      ```
      {% include copy.html %}

      You should get a response that looks like this:
      ```bash
      {
         "name" : "hostname",
         "cluster_name" : "mcdesk",
         "cluster_uuid" : "6XNc9m2gTUSIoKDqJit0PA",
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
      ```bash
      curl -X GET https://localhost:9200/_cat/plugins?v -u 'admin:<custom-admin-password>' --insecure
      ```
      {% include copy.html %}

      The response should look like this:
      ```bash
      name     component                            version
      hostname mcdesk-alerting                  {{site.mcdesk_version}}
      hostname mcdesk-anomaly-detection         {{site.mcdesk_version}}
      hostname mcdesk-asynchronous-search       {{site.mcdesk_version}}
      hostname mcdesk-cross-cluster-replication {{site.mcdesk_version}}
      hostname mcdesk-index-management          {{site.mcdesk_version}}
      hostname mcdesk-job-scheduler             {{site.mcdesk_version}}
      hostname mcdesk-knn                       {{site.mcdesk_version}}
      hostname mcdesk-ml                        {{site.mcdesk_version}}
      hostname mcdesk-notifications             {{site.mcdesk_version}}
      hostname mcdesk-notifications-core        {{site.mcdesk_version}}
      hostname mcdesk-observability             {{site.mcdesk_version}}
      hostname mcdesk-performance-analyzer      {{site.mcdesk_version}}
      hostname mcdesk-reports-scheduler         {{site.mcdesk_version}}
      hostname mcdesk-security                  {{site.mcdesk_version}}
      hostname mcdesk-sql                       {{site.mcdesk_version}}
      ```

## Step 3: Set up MCdesk in your environment

Users who do not have prior experience with MCdesk may want a list of recommended settings in order to get started with the service. By default, MCdesk is not bound to a network interface and cannot be reached by external hosts. Additionally, security settings are populated by default user names and passwords. The following recommendations will enable a user to bind MCdesk to a network interface, create and sign TLS certificates, and configure basic authentication.

The following recommended settings will allow you to:

- Bind MCdesk to an IP or network interface on the host.
- Set initial and maximum JVM heap sizes.
- Define an environment variable that points to the bundled JDK.
- Configure your own TLS certificates—no third-party certificate authority (CA) is required.
- Create an admin user with a custom password.

If you ran the security demo script, then you will need to manually reconfigure settings that were modified. Refer to [Security configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/) for guidance before proceeding.
{:.note}

Before modifying any configuration files, it's always a good idea to save a backup copy before making changes. The backup file can be used to mitigate any issues caused by a bad configuration.
{:.tip}

1. Open `mcdesk.yml`.
   ```bash
   sudo vi /etc/mcdesk/mcdesk.yml
   ```
   {% include copy.html %}

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
   1.  Open `jvm.options`.
         ```bash
         vi /etc/mcdesk/jvm.options
         ```
         {% include copy.html %}

   1. Modify the values for initial and maximum heap sizes. As a starting point, you should set these values to half of the available system memory. For dedicated hosts this value can be increased based on your workflow requirements.
      -  As an example, if the host machine has 8 GB of memory, then you might want to set the initial and maximum heap sizes to 4 GB:
         ```bash
         -Xms4g
         -Xmx4g
         ```
         {% include copy.html %}

   1. Save your changes and close the file.

### Configure TLS

TLS certificates provide additional security for your cluster by allowing clients to confirm the identity of hosts and encrypt traffic between the client and host. For more information, refer to [Configure TLS Certificates]({{site.url}}{{site.baseurl}}/security/configuration/tls/) and [Generate Certificates]({{site.url}}{{site.baseurl}}/security/configuration/generate-certificates/), which are included in the [Security plugin]({{site.url}}{{site.baseurl}}/security/index/) documentation. For work performed in a development environment, self-signed certificates are usually adequate. This section will guide you through the basic steps required to generate your own TLS certificates and apply them to your MCdesk host.

1. Navigate to the directory where the certificates will be stored.
   ```bash
   cd /etc/mcdesk
   ```
   {% include copy.html %}

1. Delete the demo certificates.
   ```bash
   sudo rm -f *pem
   ```
   {% include copy.html %}

1. Generate a root certificate. This is what you will use to sign your other certificates.
   ```bash
   # Create a private key for the root certificate
   sudo openssl genrsa -out root-ca-key.pem 2048
   
   # Use the private key to create a self-signed root certificate. Be sure to
   # replace the arguments passed to -subj so they reflect your specific host.
   sudo openssl req -new -x509 -sha256 -key root-ca-key.pem -subj "/C=CA/ST=ONTARIO/L=TORONTO/O=ORG/OU=UNIT/CN=ROOT" -out root-ca.pem -days 730
   ```
1. Next, create the admin certificate. This certificate is used to gain elevated rights for performing administrative tasks relating to the Security plugin.
   ```bash
   # Create a private key for the admin certificate.
   sudo openssl genrsa -out admin-key-temp.pem 2048

   # Convert the private key to PKCS#8.
   sudo openssl pkcs8 -inform PEM -outform PEM -in admin-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out admin-key.pem
   
   # Create the certficiate signing request (CSR). A common name (CN) of "A" is acceptable because this certificate is
   # used for authenticating elevated access and is not tied to a host.
   sudo openssl req -new -key admin-key.pem -subj "/C=CA/ST=ONTARIO/L=TORONTO/O=ORG/OU=UNIT/CN=A" -out admin.csr
   
   # Sign the admin certificate with the root certificate and private key you created earlier.
   sudo openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out admin.pem -days 730
   ```
1. Create a certificate for the node being configured.
   ```bash
   # Create a private key for the node certificate.
   sudo openssl genrsa -out node1-key-temp.pem 2048
   
   # Convert the private key to PKCS#8.
   sudo openssl pkcs8 -inform PEM -outform PEM -in node1-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out node1-key.pem
   
   # Create the CSR and replace the arguments passed to -subj so they reflect your specific host.
   # The CN should match a DNS A record for the host-do not use the hostname.
   sudo openssl req -new -key node1-key.pem -subj "/C=CA/ST=ONTARIO/L=TORONTO/O=ORG/OU=UNIT/CN=node1.dns.a-record" -out node1.csr
   
   # Create an extension file that defines a SAN DNS name for the host. This
   # should match the DNS A record of the host.
   sudo sh -c 'echo subjectAltName=DNS:node1.dns.a-record > node1.ext'

   # Sign the node certificate with the root certificate and private key that you created earlier.
   sudo openssl x509 -req -in node1.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out node1.pem -days 730 -extfile node1.ext
   ```
1. Remove temporary files that are no longer required.
   ```bash
   sudo rm -f *temp.pem *csr *ext
   ```
   {% include copy.html %}

1. Make sure the remaining certificates are owned by the mcdesk user.
   ```bash
   sudo chown mcdesk:mcdesk admin-key.pem admin.pem node1-key.pem node1.pem root-ca-key.pem root-ca.pem root-ca.srl
   ```
   {% include copy.html %}

1. Add these certificates to `mcdesk.yml` as described in [Generate Certificates]({{site.url}}{{site.baseurl}}/security/configuration/generate-certificates/#add-distinguished-names-to-mcdeskyml). Advanced users might also choose to append the settings using a script:
   ```bash
   #! /bin/bash

   # Before running this script, make sure to replace the CN in the 
   # node's distinguished name with a real DNS A record.

   echo "plugins.security.ssl.transport.pemcert_filepath: /etc/mcdesk/node1.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.transport.pemkey_filepath: /etc/mcdesk/node1-key.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/mcdesk/root-ca.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.http.enabled: true" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.http.pemcert_filepath: /etc/mcdesk/node1.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.http.pemkey_filepath: /etc/mcdesk/node1-key.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.ssl.http.pemtrustedcas_filepath: /etc/mcdesk/root-ca.pem" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.allow_default_init_securityindex: true" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.authcz.admin_dn:" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "  - 'CN=A,OU=UNIT,O=ORG,L=TORONTO,ST=ONTARIO,C=CA'" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.nodes_dn:" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "  - 'CN=node1.dns.a-record,OU=UNIT,O=ORG,L=TORONTO,ST=ONTARIO,C=CA'" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.audit.type: internal_mcdesk" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.enable_snapshot_restore_privilege: true" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.check_snapshot_restore_write_privileges: true" | sudo tee -a /etc/mcdesk/mcdesk.yml
   echo "plugins.security.restapi.roles_enabled: [\"all_access\", \"security_rest_api_access\"]" | sudo tee -a /etc/mcdesk/mcdesk.yml
   ```
   {% include copy.html %}

1. (Optional) Add trust for the self-signed root certificate.
   ```bash
   # Copy the root certificate to the correct directory
   sudo cp /etc/mcdesk/root-ca.pem /etc/pki/ca-trust/source/anchors/

   # Add trust
   sudo update-ca-trust
   ```

### Configure a user

Users are defined and authenticated by MCdesk in a variety of ways. One method that does not require additional backend infrastructure is to manually configure users in `internal_users.yml`. See [YAML files]({{site.url}}{{site.baseurl}}/security/configuration/yaml/) for more information about configuring users. The following steps explain how to remove all demo users except for the `admin` user and how to replace the `admin` default password using a script.

1. Navigate to the Security plugins tools directory.
   ```bash
   cd /usr/share/mcdesk/plugins/mcdesk-security/tools
   ```
   {% include copy.html %}

1. Run `hash.sh` to generate a new password.
   - This script will fail if a path to the JDK has not been defined.
      ```bash
      # Example output if a JDK isn't found...
      $ ./hash.sh
      **************************************************************************
      ** This tool will be deprecated in the next major release of MCdesk **
      ** https://github.com/igsl-group/security/issues/1755           **
      **************************************************************************
      which: no java in (/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/user/.local/bin:/home/user/bin)
      WARNING: nor OPENSEARCH_JAVA_HOME nor JAVA_HOME is set, will use 
      ./hash.sh: line 35: java: command not found
      ```
   - Declare an environment variable when you invoke the script in order to avoid issues:
      ```bash
      OPENSEARCH_JAVA_HOME=/usr/share/mcdesk/jdk ./hash.sh
      ```
      {% include copy.html %}

   - Enter the desired password at the prompt and make a note of the output hash.
1. Open `internal_users.yml`.
   ```bash
   sudo vi /etc/mcdesk/mcdesk-security/internal_users.yml
   ```
   {% include copy.html %}

1. Remove all demo users except for `admin` and replace the hash with the output provided by `hash.sh` in a previous step. The file should look similar to the following example:
   ```bash
   ---
   # This is the internal user database
   # The hash value is a bcrypt hash and can be generated with plugin/tools/hash.sh

   _meta:
      type: "internalusers"
      config_version: 2

   # Define your internal users here

   admin:
      hash: "$2y$1EXAMPLEQqwS8TUcoEXAMPLEeZ3lEHvkEXAMPLERqjyh1icEXAMPLE."
      reserved: true
      backend_roles:
      - "admin"
      description: "Admin user"
   ```
   {% include copy.html %}

### Apply changes

Now that TLS certificates are installed and demo users were removed or assigned new passwords, the last step is to apply the configuration changes. This last configuration step requires invoking `securityadmin.sh` while MCdesk is running on the host.

1. MCdesk must be running for `securityadmin.sh` to apply changes. If you made changes to `mcdesk.yml`, restart MCdesk.
   ```bash
   sudo systemctl restart mcdesk
   ```

1. Open a separate terminal session with the host and navigate to the directory containing `securityadmin.sh`.
   ```bash
   # Change to the correct directory
   cd /usr/share/mcdesk/plugins/mcdesk-security/tools
   ```

1. Invoke the script. See [Apply changes using securityadmin.sh]({{site.url}}{{site.baseurl}}/security/configuration/security-admin/) for definitions of the arguments you must pass.
   ```bash
   # You can omit the environment variable if you declared this in your $PATH.
   OPENSEARCH_JAVA_HOME=/usr/share/mcdesk/jdk ./securityadmin.sh -cd /etc/mcdesk/mcdesk-security/ -cacert /etc/mcdesk/root-ca.pem -cert /etc/mcdesk/admin.pem -key /etc/mcdesk/admin-key.pem -icl -nhnv
   ```

### Verify that the service is running

MCdesk is now running on your host with custom TLS certificates and a secure user for basic authentication. You can verify external connectivity by sending an API request to your MCdesk node from another host.

During the previous test you directed requests to `localhost`. Now that TLS certificates have been applied and the new certificates reference your host's actual DNS record, requests to `localhost` will fail the CN check and the certificate will be considered invalid. Instead, requests should be sent to the address you specified while generating the certificate.

You should add trust for the root certificate to your client before sending requests. If you do not add trust, then you must use the `-k` option so that cURL ignores CN and root certificate validation.
{:.tip}

```bash
$ curl https://your.host.address:9200 -u admin:yournewpassword -k
{
  "name" : "hostname-here",
  "cluster_name" : "mcdesk",
  "cluster_uuid" : "efC0ANNMQlGQ5TbhNflVPg",
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

## Upgrade to a newer version

MCdesk instances installed using RPM or YUM can be easily upgraded to a newer version. We recommend updating with YUM, but you can also upgrade using RPM.


### Manual upgrade with RPM 

Download the RPM package for the desired upgrade version directly from the [MCdesk Project downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

Navigate to the directory containing the distribution and run the following command:
```bash
rpm -Uvh mcdesk-{{site.mcdesk_version}}-linux-x64.rpm
```
{% include copy.html %}

### YUM

To upgrade to the latest version of MCdesk using YUM:
```bash
sudo yum update mcdesk
```
{% include copy.html %}

 You can also upgrade to a specific MCdesk version:
 ```bash
 sudo yum update mcdesk-<version-number>
 ```
 {% include copy.html %}

### Automatically restart the service after a package upgrade

The MCdesk RPM package does not currently support automatically restarting the service after a package upgrade.

## Related links

- [MCdesk configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/)
- [Install and configure MCdesk Dashboards]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/index/)
- [MCdesk plugin installation]({{site.url}}{{site.baseurl}}/mcdesk/install/plugins/)
- [About the Security plugin]({{site.url}}{{site.baseurl}}/security/index/)
