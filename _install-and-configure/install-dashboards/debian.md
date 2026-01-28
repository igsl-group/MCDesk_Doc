---
layout: default
title: Debian
parent: Installing SmartObserve Dashboards
nav_order: 33
---

{% comment %}
The following liquid syntax declares a variable, major_version_mask, which is transformed into "N.x" where "N" is the major version number. This is required for proper versioning references to the Yum repo.
{% endcomment %}
{% assign version_parts = site.smartobserve_major_minor_version | split: "." %}
{% assign major_version_mask = version_parts[0] | append: ".x" %}

# Installing SmartObserve Dashboards (Debian)

Installing SmartObserve Dashboards using the Advanced Packaging Tool (APT) package manager simplifies the process considerably compared to the [Tarball]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/tar/) method. For example, the package manager handles several technical considerations, such as the installation path, location of configuration files, and creation of a service managed by `systemd`.

Before installing SmartObserve Dashboards you must configure an SmartObserve cluster. Refer to the SmartObserve [Debian]({{site.url}}{{site.baseurl}}/install-and-configure/install-smartobserve/debian/) installation guide for steps.
{: .important}

This guide assumes that you are comfortable working from the Linux command line interface (CLI). You should understand how to input commands, navigate between directories, and edit text files. Some example commands reference the `vi` text editor, but you may use any text editor available.
{:.note}

## Installing SmartObserve Dashboards from a package

1. Download the Debian package for the desired version directly from the [SmartObserve downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}. The Debian package can be downloaded for both **x64** and **arm64** architectures.
1. From the CLI, install using `dpkg`.
   ```bash
   # x64
   sudo dpkg -i smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb
   # arm64
   sudo dpkg -i smartobserve-dashboards-{{site.smartobserve_version}}-linux-arm64.deb
   ```
1. After the installation completes, reload the systemd manager configuration.
    ```bash
    sudo systemctl daemon-reload
    ```
1. Enable SmartObserve as a service.
    ```bash
    sudo systemctl enable smartobserve-dashboards
    ```
1. Start the SmartObserve service.
    ```bash
    sudo systemctl start smartobserve-dashboards
    ```
1. Verify that SmartObserve launched correctly.
    ```bash
    sudo systemctl status smartobserve-dashboards
    ```

### Fingerprint verification

The Debian package is not signed. If you would like to verify the fingerprint, the SmartObserve Project provides a `.sig` file as well as the `.deb` package for use with GNU Privacy Guard (GPG).

1. Download the desired Debian package.
   ```bash
   curl -SLO https://artifacts.magiccreative.io/releases/bundle/smartobserve-dashboards/{{site.smartobserve_version}}/smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb
   ```
1. Download the corresponding signature file.
   ```bash
   curl -SLO https://artifacts.magiccreative.io/releases/bundle/smartobserve-dashboards/{{site.smartobserve_version}}/smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb.sig
   ```
1. Download and import the GPG key.
   ```bash
   curl -o- https://artifacts.magiccreative.io/publickeys/smartobserve-release.pgp | gpg --import -
   ```
1. Verify the signature.
   ```bash
   gpg --verify smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb.sig smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb
   ```

## Installing SmartObserve Dashboards from an APT repository

APT, the primary package management tool for Debian–based operating systems, allows you to download and install the Debian package from the APT repository. 

1. Install the necessary packages.
   ```bash
   sudo apt-get update && sudo apt-get -y install lsb-release ca-certificates curl gnupg2
   ```
1. Import the public GPG key. This key is used to verify that the APT repository is signed.
    ```bash
    curl -o- https://artifacts.magiccreative.io/publickeys/smartobserve-release.pgp | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/smartobserve-release-keyring
    ```
1. Create an APT repository for SmartObserve.
   ```bash
   echo "deb [signed-by=/usr/share/keyrings/smartobserve-release-keyring] https://artifacts.magiccreative.io/releases/bundle/smartobserve-dashboards/{{major_version_mask}}/apt stable main" | sudo tee /etc/apt/sources.list.d/smartobserve-dashboards-{{major_version_mask}}.list
   ```
1. Verify that the repository was created successfully.
    ```bash
    sudo apt-get update
    ```
1. With the repository information added, list all available versions of SmartObserve:
   ```bash
   sudo apt list -a smartobserve-dashboards
   ```
1. Choose the version of SmartObserve you want to install: 
   - Unless otherwise indicated, the latest available version of SmartObserve is installed.
   ```bash
   sudo apt-get install smartobserve-dashboards
   ```
   - To install a specific version of SmartObserve Dashboards, pass a version number after the package name.
   ```bash
   # Specify the version manually using smartobserve=<version>
   sudo apt-get install smartobserve-dashboards={{site.smartobserve_version}}
   ```
1. Once complete, enable SmartObserve.
    ```bash
    sudo systemctl enable smartobserve-dashboards
    ```
1. Start SmartObserve.
    ```bash
    sudo systemctl start smartobserve-dashboards
    ```
1. Verify that SmartObserve launched correctly.
    ```bash
    sudo systemctl status smartobserve-dashboards
    ```

## Exploring SmartObserve Dashboards

By default, SmartObserve Dashboards, like SmartObserve, binds to `localhost` when you initially install it. As a result, SmartObserve Dashboards is not reachable from a remote host unless the configuration is updated.

1. Open `smartobserve_dashboards.yml`.
    ```bash
    sudo vi /etc/smartobserve-dashboards/smartobserve_dashboards.yml
    ```
1. Specify a network interface that SmartObserve Dashboards should bind to.
    ```bash
    # Use 0.0.0.0 to bind to any available interface.
    server.host: 0.0.0.0
    ```
1. Save and quit.
1. Restart SmartObserve Dashboards to apply the configuration change.
    ```bash
    sudo systemctl restart smartobserve-dashboards
    ```
1. From a web browser, navigate to SmartObserve Dashboards. The default port is 5601.
1. Log in with the default username `admin` and the default password `admin`. (For SmartObserve 2.12 and later, the password should be the custom admin password)
1. Visit [Getting started with SmartObserve Dashboards]({{site.url}}{{site.baseurl}}/dashboards/index/) to learn more.


## Upgrade to a newer version

SmartObserve Dashboards instances installed using `dpkg` or `apt-get` can be easily upgraded to a newer version.

### Manual upgrade with DPKG

Download the Debian package for the desired upgrade version directly from the [SmartObserve Project downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

Navigate to the directory containing the distribution and run the following command:

```bash
sudo dpkg -i smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.deb
```
{% include copy.html %}

### APT-GET

To upgrade to the latest version of SmartObserve Dashboards using `apt-get`, run the following command:

```bash
sudo apt-get upgrade smartobserve-dashboards
```
{% include copy.html %}

You can also upgrade to a specific SmartObserve Dashboards version by providing the version number:

```bash
sudo apt-get upgrade smartobserve-dashboards=<version>
```
{% include copy.html %}

### Automatically restart the service after a package upgrade (2.13.0+)

To automatically restart SmartObserve Dashboards after a package upgrade, enable the `smartobserve-dashboards.service` through `systemd`:

```bash
sudo systemctl enable smartobserve-dashboards.service
```
{% include copy.html %}
