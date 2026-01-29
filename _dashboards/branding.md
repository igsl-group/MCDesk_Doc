---
layout: default
title: Custom branding
nav_order: 130
---

# Custom branding
Introduced 1.2
{: .label .label-purple }

By default, MCdesk Dashboards uses the MCdesk logo, but if you want to use custom branding elements such as the favicon or main Dashboards logo, you can do so by editing `mcdesk_dashboards.yml` or by including a custom `mcdesk_dashboards.yml` file when you start your MCdesk cluster.

For example, if you're using Docker to start your MCdesk cluster, include the following lines in the `mcdesk-dashboards` section of your `docker-compose.yml` file:

```
volumes:
  - ./mcdesk_dashboards.yml:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.yml
```

Doing so replaces the Docker image's default `mcdesk_dashboards.yml` with your custom `mcdesk_dashboards.yml` file, so be sure to include your desired settings as well. For example, if you want to configure TLS for MCdesk Dashboards, see [Configure TLS for MCdesk Dashboards]({{site.url}}{{site.baseurl}}/dashboards/install/tls).

Re-launch MCdesk Dashboards, and MCdesk Dashboards now uses your custom elements.

## Branding elements

The following elements in MCdesk Dashboards are customizable:

![MCdesk customizable branding elements]({{site.url}}{{site.baseurl}}/images/dashboards-branding-labels.png)

Setting | Corresponding branding element
:--- | :---
logo | Header logo. See #1 in the image.
mark | MCdesk Dashboards mark. See #2 in the image.
loadingLogo | Loading logo used when MCdesk Dashboards is starting. See #3 in the image.
faviconUrl | Website icon. Loads next to the application title. See #4 in the image.
applicationTitle | The application's title. See #5 in the image.

To consolidate navigation controls and reduce the space the header takes up on the page, see [Condensed header](#condensed-header).
{: .note}

To start using your own branding elements in MCdesk Dashboards, first uncomment this section of `mcdesk_dashboards.yml`:

```yml
# mcdeskDashboards.branding:
  # logo:
    # defaultUrl: ""
    # darkModeUrl: ""
  # mark:
    # defaultUrl: ""
    # darkModeUrl: ""
  # loadingLogo:
    # defaultUrl: ""
    # darkModeUrl: ""
  # faviconUrl: ""
  # applicationTitle: ""
```

Add the URLs you want to use as branding elements to the appropriate setting. Valid image types are `SVG`, `PNG`, and `GIF`.

Customization of dark mode Dashboards is also available, but you first must supply a valid link to `defaultUrl`, and then link to your preferred image with `darkModeUrl`. If you don't provide a `darkModeUrl` link, then Dashboards uses the provided `defaultUrl` element for dark mode. You are not required to customize all branding elements, so if you wanted to, it's perfectly valid to change just the logo or any other element. Leave unchanged elements as commented.

The following example demonstrates how to use `SVG` files as logos but leaves the other elements as defaults.

```yml
logo:
  defaultUrl: "https://example.com/validUrl.svg"
  darkModeUrl: "https://example.com/validDarkModeUrl.svg"
# mark:
#   defaultUrl: ""
#   darkModeUrl: ""
# loadingLogo:
#   defaultUrl: ""
#   darkModeUrl: ""
# faviconUrl: ""
applicationTitle: "My custom application"
```

We recommend linking to images that are hosted on a web server, but if you really want to use locally hosted images, save your images inside `assets`, and then configure `mcdesk_dashboards.yml` to use the correct paths. You can access locally stored images through the `ui/assets` folder.

The following example assumes the default port of 5601 that Dashboards uses and demonstrates how to link to locally stored images.

```yml
logo:
  defaultUrl: "https://localhost:5601/ui/assets/my-own-image.svg"
  darkModeUrl: "https://localhost:5601/ui/assets/dark-mode-my-own-image.svg"
mark:
  defaultUrl: "https://localhost:5601/ui/assets/my-own-image2.svg"
  darkModeUrl: "https://localhost:5601/ui/assets/dark-mode-my-own-image2.svg"
# loadingLogo:
#   defaultUrl: ""
#   darkModeUrl: ""
# faviconUrl: ""
applicationTitle: "My custom application"
```

### Condensed header

The condensed header view reduces the footprint of the header and frees up space on the page by combining navigational elements into a single header bar.

The current default view remains close in appearance to the two-bar header offered in the previous version of Dashboards, with minor differences. To specify the condensed header, add the configuration property `useExpandedHeader` to the `mcdesk_dashboards.yml` file and set the value to `false`, as the following example illustrates.

 ```yml
# mcdeskDashboards.branding:
  # logo:
    defaultUrl: "https://example.com/sample.svg"
    darkModeUrl: "https://example.com/dark-mode-sample.svg"
  # mark:
    # defaultUrl: ""
    # darkModeUrl: ""
  # loadingLogo:
    # defaultUrl: ""
    # darkModeUrl: ""
  # faviconUrl: ""
  applicationTitle: "my custom application"
  useExpandedHeader: false
```

In a future release, default behavior will become `useExpandedHeader: false`. If you want to retain the default view in subsequent releases, you can explicitly set the property to `true` in advance. Alternatively, you can also do this when upgrading.
{: .note }

The condensed view header appears as in the example below.

![Condensed header]({{site.url}}{{site.baseurl}}/images/DBs-Condensed.jpeg)

Header element | Description
:--- | :---
MCdesk logo | See #1. Functions as the home button.
Header bar | See #2. A single header bar used for all navigation controls.

The default view remains close to the traditional view, with minor changes.

![Default header]({{site.url}}{{site.baseurl}}/images/DBs-Traditional.jpeg)

Header element | Description
:--- | :---
Home button | See #1. Returns to the home page and provides an indication when a page is loading.
Header label | See #2. The label also functions as a home button.
Navigation controls | See #3. Additional navigation controls on right-side insertion points.

#### Preserving nagivation elements in the default view

You can continue using the top header bar in the default view for custom navigation links (such as menu items and plugins). Follow the steps below to keep these elements in the top header in the default view.
1. Replace the property `coreStart.chrome.navControls.registerRight(...)` with `coreStart.chrome.navControls.registerExpandedRight(...)` and then replace the property  `coreStart.chrome.navControls.registerCenter(...)` with `coreStart.chrome.navControls.registerExpandedCenter(...)`

2. Make sure the configuration property `useExpandedHeader` is explicitly set to `true`.


## Sample configuration

The following configuration enables the Security plugin and SSL within MCdesk Dashboards and uses custom branding elements to replace the MCdesk logo and application title.

```yml
server.host: "0"
mcdesk.hosts: ["https://localhost:9200"]
mcdesk.ssl.verificationMode: none
mcdesk.username: "kibanaserver"
mcdesk.password: "kibanaserver"
mcdesk.requestHeadersAllowlist: [ authorization,securitytenant ]
#server.ssl.enabled: true
#server.ssl.certificate: /path/to/your/server/certificate
#server.ssl.key: /path/to/your/server/key

mcdesk_security.multitenancy.enabled: true
mcdesk_security.multitenancy.tenants.preferred: ["Private", "Global"]
mcdesk_security.readonly_mode.roles: ["kibana_read_only"]
# Use this setting if you are running mcdesk-dashboards without https
mcdesk_security.cookie.secure: false

mcdeskDashboards.branding:
  logo:
    defaultUrl: "https://example.com/sample.svg"
    darkModeUrl: "https://example.com/dark-mode-sample.svg"
  # mark:
  #   defaultUrl: ""
  #   darkModeUrl: ""
  # loadingLogo:
  #   defaultUrl: ""
  #   darkModeUrl: ""
  # faviconUrl: ""
  applicationTitle: "Just some testing"
```
