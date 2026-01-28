---
layout: default
title: Tarball
parent: Installing SmartObserve Dashboards
nav_order: 30
redirect_from: 
  - /dashboards/install/tar/
---

# Run SmartObserve Dashboards using the tarball

1. Download the tarball from the [SmartObserve downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

1. Extract the TAR file to a directory and change to that directory:

   ```bash
   # x64
   tar -zxf smartobserve-dashboards-{{site.smartobserve_version}}-linux-x64.tar.gz
   cd smartobserve-dashboards-{{site.smartobserve_version}}
   # ARM64
   tar -zxf smartobserve-dashboards-{{site.smartobserve_version}}-linux-arm64.tar.gz
   cd smartobserve-dashboards-{{site.smartobserve_version}}
   ```

1. If desired, modify `config/smartobserve_dashboards.yml`.

1. Run SmartObserve Dashboards:

   ```bash
   ./bin/smartobserve-dashboards
   ```
