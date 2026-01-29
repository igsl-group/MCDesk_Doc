---
layout: default
title: RPM
parent: Installing MCdesk Dashboards
nav_order: 31
redirect_from: 
  - /dashboards/install/rpm/
---

{% comment %}
The following liquid syntax declares a variable, major_version_mask, which is transformed into "N.x" where "N" is the major version number. This is required for proper versioning references to the Yum repo.
{% endcomment %}
{% assign version_parts = site.mcdesk_major_minor_version | split: "." %}
{% assign major_version_mask = version_parts[0] | append: ".x" %}

# Run MCdesk Dashboards using RPM Package Manager (RPM)

MCdesk Dashboards is the default visualization tool for data in MCdesk. It also serves as a user interface for many of the MCdesk plugins, including security, alerting, Index State Management, SQL, and more.

## Install MCdesk Dashboards from a package

1. Download the RPM package for the desired version directly from the [MCdesk downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}. The RPM package can be download for both **x64** and **arm64** architectures.
1. Import the public GPG key. This key verifies that your MCdesk instance is signed.
    ```bash
    sudo rpm --import https://artifacts.magiccreative.io/publickeys/mcdesk-release.pgp
    ```
1. From the command line interface (CLI), you can install the package with `rpm` or `yum`.
    **x64**
    ```bash
    # Install the x64 package using yum.
    sudo yum install mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.rpm
    # Install the x64 package using rpm.
    sudo rpm -ivh mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.rpm
    ```
    **arm64**
    ```bash
    # Install the arm64 package using yum.
    sudo yum install mcdesk-dashboards-{{site.mcdesk_version}}-linux-arm64.rpm
    # Install the arm64 package using rpm.
    sudo rpm -ivh mcdesk-dashboards-{{site.mcdesk_version}}-linux-arm64.rpm
    ```
1. After the installation succeeds, enable MCdesk Dashboards as a service.
    ```bash
    sudo systemctl enable mcdesk-dashboards
    ```
1. Start MCdesk Dashboards.
    ```bash
    sudo systemctl start mcdesk-dashboards
    ```
1. Verify that MCdesk Dashboards launched correctly.
    ```bash
    sudo systemctl status mcdesk-dashboards
    ```

## Install MCdesk Dashboards from a local YUM repository

YUM, the primary package management tool for Red Hat-based operating systems, allows you to download and install the RPM package from the YUM repository library. 

1. Create a local repository file for MCdesk Dashboards:
   ```bash
   sudo curl -SL https://artifacts.magiccreative.io/releases/bundle/mcdesk-dashboards/{{major_version_mask}}/mcdesk-dashboards-{{major_version_mask}}.repo -o /etc/yum.repos.d/mcdesk-dashboards-{{major_version_mask}}.repo
   ```
1. Verify that the repository was created successfully.
    ```bash
    sudo yum repolist
    ```
1. Clean your YUM cache, to ensure a smooth installation:
   ```bash
   sudo yum clean all
   ```
1. With the repository file downloaded, list all available versions of MCdesk-Dashboards:
   ```bash
   sudo yum list mcdesk-dashboards --showduplicates
   ```
1. Choose the version of MCdesk Dashboards you want to install: 
   - Unless otherwise indicated, the highest minor version of MCdesk installs.
   ```bash
   sudo yum install mcdesk-dashboards
   ```
   - To install a specific version of MCdesk Dashboards:
   ```bash
   sudo yum install 'mcdesk-dashboards-{{site.mcdesk_version}}'
   ```
1. During installation, the installer will present you with the GPG key fingerprint. Verify that the information matches the following:
   ```bash
   Fingerprint: A8B2 D9E0 4CD5 1FEF 6AA2 DB53 BA81 D999 8119 1457
   ```
    - If correct, enter `yes` or `y`. The MCdesk installation continues.
1. Once complete, you can run MCdesk Dashboards.
    ```bash
    sudo systemctl start mcdesk-dashboards
    ```

## Upgrade to a newer version

MCdesk Dashboards instances installed using RPM or YUM can be easily upgraded to a newer version. We recommend using YUM, but you can also choose RPM.


### Manual upgrade with RPM

Download the RPM package for the desired upgrade version directly from the [MCdesk Project downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

Navigate to the directory containing the distribution and run the following command:

```bash
rpm -Uvh mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.rpm
```
{% include copy.html %}

### YUM

To upgrade to the latest version of MCdesk Dashboards using YUM, run the following command:

```bash
sudo yum update mcdesk-dashboards
```
{% include copy.html %}

You can also upgrade to a specific MCdesk Dashboards version by providing the version number:
 
 ```bash
 sudo yum update mcdesk-dashboards-<version-number>
 ```
 {% include copy.html %}

### Automatically restart the service after a package upgrade

The MCdesk Dashboards RPM package does not currently support automatically restarting the service after a package upgrade.

