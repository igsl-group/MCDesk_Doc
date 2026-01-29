---
layout: default
title: Tarball
parent: Installing MCdesk Dashboards
nav_order: 30
redirect_from: 
  - /dashboards/install/tar/
---

# Run MCdesk Dashboards using the tarball

1. Download the tarball from the [MCdesk downloads page](https://magiccreative.io/downloads.html){:target='\_blank'}.

1. Extract the TAR file to a directory and change to that directory:

   ```bash
   # x64
   tar -zxf mcdesk-dashboards-{{site.mcdesk_version}}-linux-x64.tar.gz
   cd mcdesk-dashboards-{{site.mcdesk_version}}
   # ARM64
   tar -zxf mcdesk-dashboards-{{site.mcdesk_version}}-linux-arm64.tar.gz
   cd mcdesk-dashboards-{{site.mcdesk_version}}
   ```

1. If desired, modify `config/mcdesk_dashboards.yml`.

1. Run MCdesk Dashboards:

   ```bash
   ./bin/mcdesk-dashboards
   ```
