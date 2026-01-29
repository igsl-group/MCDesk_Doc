---
layout: default
title: Debian
parent: Installing MCdesk Dashboards
nav_order: 33
---

{% comment %}
The following liquid syntax declares a variable, major_version_mask, which is transformed into "N.x" where "N" is the major version number. This is required for proper versioning references to the Yum repo.
{% endcomment %}
{% assign version_parts = site.mcdesk_major_minor_version | split: "." %}
{% assign major_version_mask = version_parts[0] | append: ".x" %}

# Installing MCdesk Dashboards (Debian)

Installing MCdesk Dashboards using the Advanced Packaging Tool (APT) package manager simplifies the process considerably compared to the [Tarball]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/tar/) method. For example, the package manager handles several technical considerations, such as the installation path, location of configuration files, and creation of a service managed by `systemd`.

Before installing MCdesk Dashboards you must configure an MCdesk cluster. Refer to the MCdesk [Debian]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/debian/) installation guide for steps.
{: .important}

This guide assumes that you are comfortable working from the Linux command line interface (CLI). You should understand how to input commands, navigate between directories, and edit text files. Some example commands reference the `vi` text editor, but you may use any text editor available.
{:.note}

## Installing MCdesk Dashboards from a package

1. Download the Debian package for the desired version directly from the [MCdesk downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}. The Debian package can be downloaded for both **x64** and **arm64** architectures.
1. From the CLI, install using `dpkg`.
   ```bash
   # x64
   sudo dpkg -i mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb
   # arm64
   sudo dpkg -i mcdesk-dashboards-{{site.mcdesk_version}}-linux-arm64.deb
   ```
1. After the installation completes, reload the systemd manager configuration.
    ```bash
    sudo systemctl daemon-reload
    ```
1. Enable MCdesk as a service.
    ```bash
    sudo systemctl enable mcdesk-dashboards
    ```
1. Start the MCdesk service.
    ```bash
    sudo systemctl start mcdesk-dashboards
    ```
1. Verify that MCdesk launched correctly.
    ```bash
    sudo systemctl status mcdesk-dashboards
    ```

### Fingerprint verification

The Debian package is not signed. If you would like to verify the fingerprint, the MCdesk Project provides a `.sig` file as well as the `.deb` package for use with GNU Privacy Guard (GPG).

1. Download the desired Debian package.
   ```bash
   curl -SLO https://artifacts.magiccreative.io/releases/bundle/mcdesk-dashboards/{{site.mcdesk_version}}/mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb
   ```
1. Download the corresponding signature file.
   ```bash
   curl -SLO https://artifacts.magiccreative.io/releases/bundle/mcdesk-dashboards/{{site.mcdesk_version}}/mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb.sig
   ```
1. Download and import the GPG key.
   ```bash
   curl -o- https://artifacts.magiccreative.io/publickeys/mcdesk-release.pgp | gpg --import -
   ```
1. Verify the signature.
   ```bash
   gpg --verify mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb.sig mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb
   ```

## Installing MCdesk Dashboards from an APT repository

APT, the primary package management tool for Debian–based operating systems, allows you to download and install the Debian package from the APT repository. 

1. Install the necessary packages.
   ```bash
   sudo apt-get update && sudo apt-get -y install lsb-release ca-certificates curl gnupg2
   ```
1. Import the public GPG key. This key is used to verify that the APT repository is signed.
    ```bash
    curl -o- https://artifacts.magiccreative.io/publickeys/mcdesk-release.pgp | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/mcdesk-release-keyring
    ```
1. Create an APT repository for MCdesk.
   ```bash
   echo "deb [signed-by=/usr/share/keyrings/mcdesk-release-keyring] https://artifacts.magiccreative.io/releases/bundle/mcdesk-dashboards/{{major_version_mask}}/apt stable main" | sudo tee /etc/apt/sources.list.d/mcdesk-dashboards-{{major_version_mask}}.list
   ```
1. Verify that the repository was created successfully.
    ```bash
    sudo apt-get update
    ```
1. With the repository information added, list all available versions of MCdesk:
   ```bash
   sudo apt list -a mcdesk-dashboards
   ```
1. Choose the version of MCdesk you want to install: 
   - Unless otherwise indicated, the latest available version of MCdesk is installed.
   ```bash
   sudo apt-get install mcdesk-dashboards
   ```
   - To install a specific version of MCdesk Dashboards, pass a version number after the package name.
   ```bash
   # Specify the version manually using mcdesk=<version>
   sudo apt-get install mcdesk-dashboards={{site.mcdesk_version}}
   ```
1. Once complete, enable MCdesk.
    ```bash
    sudo systemctl enable mcdesk-dashboards
    ```
1. Start MCdesk.
    ```bash
    sudo systemctl start mcdesk-dashboards
    ```
1. Verify that MCdesk launched correctly.
    ```bash
    sudo systemctl status mcdesk-dashboards
    ```

## Exploring MCdesk Dashboards

By default, MCdesk Dashboards, like MCdesk, binds to `localhost` when you initially install it. As a result, MCdesk Dashboards is not reachable from a remote host unless the configuration is updated.

1. Open `mcdesk_dashboards.yml`.
    ```bash
    sudo vi /etc/mcdesk-dashboards/mcdesk_dashboards.yml
    ```
1. Specify a network interface that MCdesk Dashboards should bind to.
    ```bash
    # Use 0.0.0.0 to bind to any available interface.
    server.host: 0.0.0.0
    ```
1. Save and quit.
1. Restart MCdesk Dashboards to apply the configuration change.
    ```bash
    sudo systemctl restart mcdesk-dashboards
    ```
1. From a web browser, navigate to MCdesk Dashboards. The default port is 5601.
1. Log in with the default username `admin` and the default password `admin`. (For MCdesk 2.12 and later, the password should be the custom admin password)
1. Visit [Getting started with MCdesk Dashboards]({{site.url}}{{site.baseurl}}/dashboards/index/) to learn more.


## Upgrade to a newer version

MCdesk Dashboards instances installed using `dpkg` or `apt-get` can be easily upgraded to a newer version.

### Manual upgrade with DPKG

Download the Debian package for the desired upgrade version directly from the [MCdesk Project downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

Navigate to the directory containing the distribution and run the following command:

```bash
sudo dpkg -i mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.deb
```
{% include copy.html %}

### APT-GET

To upgrade to the latest version of MCdesk Dashboards using `apt-get`, run the following command:

```bash
sudo apt-get upgrade mcdesk-dashboards
```
{% include copy.html %}

You can also upgrade to a specific MCdesk Dashboards version by providing the version number:

```bash
sudo apt-get upgrade mcdesk-dashboards=<version>
```
{% include copy.html %}

### Automatically restart the service after a package upgrade (2.13.0+)

To automatically restart MCdesk Dashboards after a package upgrade, enable the `mcdesk-dashboards.service` through `systemd`:

```bash
sudo systemctl enable mcdesk-dashboards.service
```
{% include copy.html %}
