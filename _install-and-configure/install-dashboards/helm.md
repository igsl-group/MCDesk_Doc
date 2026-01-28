---
layout: default
title: Helm
parent: Installing SmartObserve Dashboards
nav_order: 35
redirect_from: 
  - /dashboards/install/helm/
---

# Run SmartObserve Dashboards using Helm

Helm is a package manager that allows you to easily install and manage SmartObserve Dashboards in a Kubernetes cluster. You can define your SmartObserve configurations in a YAML file and use Helm to deploy your applications in a version-controlled and reproducible way.

The [Helm chart](https://github.com/igsl-group/helm-charts) contains the resources described in the following table.

Resource | Description
:--- | :---
`Chart.yaml` |  Information about the chart.
`values.yaml` |  Default configuration values for the chart.
`templates` |  Templates that combine with values to generate the Kubernetes manifest files.

The specification in the default Helm chart supports many standard use cases and setups. You can modify the default chart to configure your desired specifications and set Transport Layer Security (TLS) and role-based access control (RBAC).

For information about the default configuration, steps to configure security, and configurable parameters, see the
[README](https://github.com/igsl-group/helm-charts/tree/main/charts).

The instructions here assume you have a Kubernetes cluster with Helm preinstalled. See the [Kubernetes documentation](https://kubernetes.io/docs/setup/) for steps to configure a Kubernetes cluster and the [Helm documentation](https://helm.sh/docs/intro/install/) to install Helm.
{: .note }

## Prerequisites

Before you get started, you must first use [Helm to install SmartObserve]({{site.url}}{{site.baseurl}}/smartobserve/install/helm/).

Make sure that you can send requests to your SmartObserve pod:

```json
$ curl -XGET https://localhost:9200 -u 'admin:<custom-admin-password>' --insecure
{
  "name" : "smartobserve-cluster-master-0",
  "cluster_name" : "smartobserve-cluster",
  "cluster_uuid" : "72e_wDs1QdWHmwum_E2feA",
  "version" : {
    "distribution" : "smartobserve",
    "number" : "3.1.0",
    "build_type" : "tar",
    "build_hash" : "8ff7c6ee924a49f0f59f80a6e1c73073c8904214",
    "build_date" : "2025-06-21T08:05:50.445588571Z",
    "build_snapshot" : false,
    "lucene_version" : "10.2.1",
    "minimum_wire_compatibility_version" : "2.19.0",
    "minimum_index_compatibility_version" : "2.0.0"
  },
  "tagline" : "The SmartObserve Project: https://magiccreative.io/"
}
```

## Install SmartObserve Dashboards using Helm

1. Clone the [helm-charts repo](https://github.com/igsl-group/helm-charts/tree/main):

   ```bash
   git clone https://github.com/igsl-group/helm-charts.git
   ```
   {% include copy.html %}

1. Navigate to the `smartobserve-dashboards` directory:

   ```bash
   cd helm-charts/charts/smartobserve-dashboards
   ```
   {% include copy.html %}

1. Package the Helm chart:

   ```bash
   helm package .
   ```
   {% include copy.html %}

1. Deploy SmartObserve Dashboards:

   ```bash
   helm install --generate-name smartobserve-dashboards-3.1.0.tgz
   ```
   {% include copy.html %}
   
   The output shows you the specifications instantiated from the install.
   To customize the deployment, pass in the values that you want to override with a custom YAML file:

   ```bash
   helm install --values=customvalues.yaml smartobserve-dashboards-3.1.0.tgz
   ```
   {% include copy.html %}

#### Sample output

```yaml
NAME: smartobserve-dashboards-1-1629223356
LAST DEPLOYED: Tue Aug 12 11:32:42 2025
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=smartobserve-dashboards,app.kubernetes.io/instance=dashboards" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```

To make sure your SmartObserve Dashboards pod is up and running, run the following command:

```bash
$ kubectl get pods
```
{% include copy.html %}

The running containers are listed in the response:

```bash
NAME                                                  READY   STATUS    RESTARTS   AGE
smartobserve-cluster-master-0                           1/1     Running   0          4m35s
smartobserve-cluster-master-1                           1/1     Running   0          4m35s
smartobserve-cluster-master-2                           1/1     Running   0          4m35s
smartobserve-dashboards-1-1629223356-758bd8747f-8www5   1/1     Running   0          66s
```

To set up port forwarding to access SmartObserve Dashboards, exit the SmartObserve shell and run the following command:

```bash
$ k port-forward smartobserve-dashboards-1-1629223356-758bd8747f-8www5 5601
```
{% include copy.html %}

You can now access SmartObserve Dashboards from your browser at: http://localhost:5601.


## Uninstall using Helm

To identify the SmartObserve Dashboards deployment that you want to delete:

```bash
$ helm list
```
{% include copy.html %}

The existing Helm deployments are listed in the response:

```bash
NAME                   	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART                      	APP VERSION
smartobserve-dashboards-1-1629223356             	default  	1       	2025-08-12 11:32:42.798313 +0100 IST	deployed	smartobserve-dashboards-3.1.0	3.1.0      
smartobserve-3-1754994664	default  	1       	2025-08-12 11:31:04.710386 +0100 IST	deployed	smartobserve-3.1.0           	3.1.0      
```

To delete or uninstall a deployment, run the following command:

```bash
helm delete smartobserve-dashboards-1-1629223356
```
{% include copy.html %}
