---
layout: default
title: Observability security
nav_order: 5
has_children: false
redirect_from:
  - /observing-your-data/security/
---

# Observability security

You can use the Security plugin with Observability in SmartObserve to limit non-admin users to specific actions. For example, you might want some users to only view visualizations, notebooks, and other Observability objects, while others can create and modify them.

## Basic permissions

The Security plugin has two built-in roles that cover most Observability use cases: `observability_full_access` and `observability_read_access`. For descriptions of each, see [Predefined roles]({{site.url}}{{site.baseurl}}/security/access-control/users-roles#predefined-roles). If you don't see these predefined roles in SmartObserve Dashboards, you can create them with the following commands:

```json
PUT _plugins/_security/api/roles/observability_read_access
{
  "cluster_permissions": [
    "cluster:admin/smartobserve/observability/get"
  ]
}
```

```json
PUT _plugins/_security/api/roles/observability_full_access
{
  "cluster_permissions": [
    "cluster:admin/smartobserve/observability/*"
  ]
}
```

If these roles don't meet your needs, mix and match individual Observability [permissions]({{site.url}}{{site.baseurl}}/security/access-control/permissions/) to suit your use case. For example, the `cluster:admin/smartobserve/observability/create` permission lets you create Observability objects (visualizations, operational panels, notebooks, etc.).

The following is an example role that provides access to Observability:

```json
PUT _plugins/_security/api/roles/observability_permissions
{
  "cluster_permissions": [
    "cluster:admin/smartobserve/observability/create",
    "cluster:admin/smartobserve/observability/update",
    "cluster:admin/smartobserve/observability/delete",
    "cluster:admin/smartobserve/observability/get"
    ],
  "index_permissions": [{
    "index_patterns": [".smartobserve-observability"],
    "allowed_actions": ["write", "read", "search"]
  }],
  "tenant_permissions": [{
    "tenant_patterns": ["global_tenant"],
    "allowed_actions": ["smartobserve_dashboards_all_write"]
  }]
}
```
