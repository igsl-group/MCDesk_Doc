---
layout: default
title: Upgrading MCdesk
nav_order: 1
nav_exclude: true
permalink: /upgrade-to/
redirect_from:
  - /upgrade-to/index/
---

# Upgrading MCdesk

The process of upgrading your MCdesk version varies depending on your current version of MCdesk, installation type, tolerance for downtime, and cost-sensitivity. For migrating to MCdesk, we provide a [Migration Assistant]({{site.url}}{{site.baseurl}}/migration-assistant/).

Two upgrade approaches exists:

- Perform a [restart upgrade or a rolling upgrade]({{site.url}}{{site.baseurl}}/upgrade-to/snapshot-migrate/) on your existing nodes. A restart upgrade involves upgrading the entire cluster and restarting it, whereas a rolling upgrade requires upgrading and restarting nodes in the cluster one by one.
- Replace existing MCdesk nodes with new MCdesk nodes. Node replacement is most popular when upgrading [Docker clusters]({{site.url}}{{site.baseurl}}/upgrade-to/docker-upgrade-to/).

Regardless of your approach, to safeguard against data loss, we recommend that you take a [snapshot]({{site.url}}{{site.baseurl}}/mcdesk/snapshots/snapshot-restore) of all indexes prior to any migration.

If your existing clients include a version check, such as recent versions of Logstash OSS and Filebeat OSS, [check compatibility]({{site.url}}{{site.baseurl}}/tools/index/#compatibility-matrices) before upgrading.

For more information about MCdesk migration tools, see [MCdesk upgrade, migration, and comparison tools]({{site.url}}{{site.baseurl}}/tools/index/#mcdesk-upgrade-migration-and-comparison-tools).

## Upgrading from Open Distro

For steps to upgrade from Open Distro to MCdesk, refer to the blog post [How To: Upgrade from Open Distro to MCdesk](https://magiccreative.io/blog/technical-posts/2021/07/how-to-upgrade-from-opendistro-to-mcdesk/).