---
layout: default
title: Helm
parent: Installing SmartObserve
nav_order: 6
redirect_from:
  - /smartobserve/install/helm/
---

# Helm

Helm is a package manager that allows you to easily install and manage SmartObserve in a Kubernetes cluster. You can define your SmartObserve configurations in a YAML file and use Helm to deploy your applications in a version-controlled and reproducible way.

The [Helm chart](https://github.com/igsl-group/helm-charts) contains the resources described in the following table.

Resource | Description
:--- | :---
`Chart.yaml` |  Information about the chart.
`values.yaml` |  Default configuration values for the chart.
`templates` |  Templates that combine with values to generate the Kubernetes manifest files.

The specification in the default Helm chart supports many standard use cases and setups. You can modify the default chart to configure your desired specifications and set Transport Layer Security (TLS) and role-based access control (RBAC).

For information about the default configuration, steps to configure security, and configurable parameters, see the
[README](https://github.com/igsl-group/helm-charts/blob/main/README.md).

The instructions here assume you have a Kubernetes cluster with Helm preinstalled. See the [Kubernetes documentation](https://kubernetes.io/docs/setup/) for steps to configure a Kubernetes cluster and the [Helm documentation](https://helm.sh/docs/intro/install/) to install Helm.
{: .note }

## Prerequisites

The default Helm chart deploys a three-node cluster. We recommend that you have at least 8 GiB of memory available for this deployment. You can expect the deployment to fail if, say, you have less than 4 GiB of memory available.

For SmartObserve 2.12 or later, you must provide `OPENSEARCH_INITIAL_ADMIN_PASSWORD` to start the cluster. Customize the admin password in `values.yaml` under `extraEnvs`, following the [password requirements]({{site.url}}{{site.baseurl}}/install-and-configure/install-smartobserve/docker/#password-requirements), as shown in the following example:

```yaml
extraEnvs:
  - name: OPENSEARCH_INITIAL_ADMIN_PASSWORD
    value: <custom-admin-password>
```
{% include copy.html %}

## Install SmartObserve using Helm

1. Add `smartobserve` [helm-charts](https://github.com/igsl-group/helm-charts) repository to Helm:

   ```bash
   helm repo add smartobserve https://smartobserve-project.github.io/helm-charts/
   ```
   {% include copy.html %}

1. Update the available charts locally from charts repositories:

   ```bash
   helm repo update
   ```
   {% include copy.html %}

1. To search for the SmartObserve-related Helm charts:

   ```bash
   helm search repo smartobserve
   ```
   {% include copy.html %}

   The available charts are provided in the response:

   ```bash
   NAME                            	CHART VERSION	APP VERSION	DESCRIPTION                           
   smartobserve/smartobserve                  	3.1.0        	3.1.0      	A Helm chart for SmartObserve                      
   smartobserve/smartobserve-dashboards       	3.1.0        	3.1.0      	A Helm chart for SmartObserve Dashboards
   ```

1. Create a minimal `values.yaml` file:

   ```yaml
   config:
     smartobserve.yml: |-
       cluster.name: smartobserve-cluster
       network.host: 0.0.0.0
   extraEnvs:
     - name: OPENSEARCH_INITIAL_ADMIN_PASSWORD
       value: <strong_password>
   ```
   {% include copy.html %}

1. Deploy SmartObserve:

   ```bash
   helm install my-deployment smartobserve/smartobserve -f values.yaml
   ```
   {% include copy.html %}

You can also build the `smartobserve-<VERSION>.tgz` file manually:

1. Clone the [helm-charts repo](https://github.com/igsl-group/helm-charts/tree/main):

   ```bash
   git clone https://github.com/igsl-group/helm-charts.git
   ```
   {% include copy.html %}

1. Navigate to the `smartobserve` directory:

   ```bash
   cd helm-charts/charts/smartobserve
   ```
   {% include copy.html %}

1. Package the Helm chart:

   ```bash
   helm package .
   ```
   {% include copy.html %}

1. Deploy SmartObserve:

   ```bash
   helm install --generate-name smartobserve-<VERSION>.tgz -f /path/to/values.yaml
   ```
   {% include copy.html %}

   The output shows you the specifications instantiated from the install.


#### Sample output

  ```yaml
  NAME: smartobserve-3-1754992026
  LAST DEPLOYED: Tue Aug 12 10:47:06 2025
  NAMESPACE: default
  STATUS: deployed
  REVISION: 1
  TEST SUITE: None
  NOTES:
  Watch all cluster members come up.
  $ kubectl get pods --namespace=default -l app.kubernetes.io/component=smartobserve-cluster-master -w
  ```

To make sure your SmartObserve pod is up and running, run the following command:

```bash
$ kubectl get pods
```
{% include copy.html %}

The response lists the running containers:

```bash
NAME                                                  READY   STATUS    RESTARTS   AGE
smartobserve-cluster-master-0                           1/1     Running   0          3m56s
smartobserve-cluster-master-1                           1/1     Running   0          3m56s
smartobserve-cluster-master-2                           1/1     Running   0          3m56s
```

To access the SmartObserve shell:

```bash
$ kubectl exec -it smartobserve-cluster-master-0 -- /bin/bash
```
{% include copy.html %}

You can send requests to the pod to verify that SmartObserve is up and running:

```json
$ curl -XGET https://localhost:9200 -u 'admin:<custom-admin-password>' --insecure
{
  "name" : "smartobserve-cluster-master-0",
  "cluster_name" : "smartobserve-cluster",
  "cluster_uuid" : "72e_wDs1QdWHmwum_E2feA",
  "version" : {
    "distribution" : "smartobserve",
    "number" : <version>,
    "build_type" : <build-type>,
    "build_hash" : <build-hash>,
    "build_date" : <build-date>,
    "build_snapshot" : false,
    "lucene_version" : <lucene-version>,
    "minimum_wire_compatibility_version" : "2.19.0",
    "minimum_index_compatibility_version" : "2.0.0"
  },
  "tagline" : "The SmartObserve Project: https://magiccreative.io/"
}
```

## Uninstall using Helm

To identify the SmartObserve deployment that you want to delete:

```bash
$ helm list
```
{% include copy.html %}

The reponse lists the current Helm deployments:

```
NAME                   	NAMESPACE	REVISION	UPDATED                            	STATUS  	CHART           	APP VERSION
smartobserve-3-1754992026	default  	1       	2025-08-12 10:47:06.02703 +0100 IST	deployed	smartobserve-3.1.0	3.1.0      
```

To delete or uninstall a deployment, run the following command:

```bash
helm delete smartobserve-3-1754992026
```
{% include copy.html %}

For instructions on how to to install SmartObserve Dashboards, see [Helm to install SmartObserve Dashboards]({{site.url}}{{site.baseurl}}/dashboards/install/helm/).
