---
layout: default
title: SmartObserve Kubernetes Operator
parent: Installing SmartObserve
nav_order: 55
redirect_from:
  - /clients/k8s-operator/
  - /tools/k8s-operator/
---

# SmartObserve Kubernetes Operator

The SmartObserve Kubernetes Operator is an open-source kubernetes operator that helps automate the deployment and provisioning of SmartObserve and SmartObserve Dashboards in a containerized environment. The operator can manage multiple SmartObserve clusters that can be scaled up and down depending on your needs. 


## Installation 

There are two ways to get started with the operator:

- [Use a Helm chart](#use-a-helm-chart).
- [Use a local installation](#use-a-local-installation).

### Use a Helm chart

If you use Helm to manage your Kubernetes cluster, you can use the SmartObserve Kubernetes Operator's Cloud Native Computing Foundation (CNCF) project stored in Artifact Hub, a web-based application for finding, installing, and publishing CNCF packages. 

To begin, log in to your Kubernetes cluster and add the Helm repository (repo) from [Artifact Hub](https://artifacthub.io/packages/helm/smartobserve-operator/smartobserve-operator/). 

```
helm repo add smartobserve-operator https://smartobserve-project.github.io/smartobserve-k8s-operator/
```

Make sure that the repo is included in your Kubernetes cluster. 

```
helm repo list | grep smartobserve
```

Both the `smartobserve` and `smartobserve-operator` repos appear in the list of repos.


Install the manager that operates all of the SmartObserve Kubernetes Operator's actions. 

```
helm install smartobserve-operator smartobserve-operator/smartobserve-operator
```

After the installation completes, the operator returns information on the deployment with `STATUS: deployed`. Then you can configure and start your [SmartObserve cluster](#deploy-a-new-smartobserve-cluster).

### Use a local installation

If you want to create a new Kubernetes cluster on your existing machine, use a local installation. 

If this is your first time running Kubernetes and you intend to run through these instructions on your laptop, make sure that you have the following installed: 

- [Kubernetes](https://kubernetes.io/docs/tasks/tools/) 
- [Docker](https://docs.docker.com/engine/install/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)

Before running through the installation steps, make sure that you have a Kubernetes environment running locally. When using minikube, open a new terminal window and enter `minikube start`. Kubernetes will now use a containerized minikube cluster with a namespace called `default`.

To enable SmartObserve to start, run the following command:

```bash
minikube ssh 'sudo sysctl -w vm.max_map_count=262144'
```
{% include copy.html %}

Then install the SmartObserve Kubernetes Operator using the following steps:

You must have `go` installed locally in order to install SmartObserve Kubernetes Operator on your local machine.
{: .note}

1. In your preferred directory, clone the [SmartObserve Kubernetes Operator repo](https://github.com/Opster/smartobserve-k8s-operator). Navigate into repo's directory using `cd`.
2. Go to the `smartobserve-operator` folder.
3. Enter `GOTOOLCHAIN=go1.24.4 make build manifests`.
4. Start a Kubernetes cluster. When using minikube, open a new terminal window and enter `minikube start`. Kubernetes will now use a containerized minikube cluster with a namespace called `default`. Make sure that `~/.kube/config` points to the cluster.

  ```yml
  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority: /Users/naarcha/.minikube/ca.crt
      extensions:
      - extension:
          last-update: Mon, 29 Aug 2022 10:11:47 CDT
          provider: minikube.sigs.k8s.io
          version: v1.26.1
        name: cluster_info
      server: https://127.0.0.1:61661
    name: minikube
  contexts:
  - context:
      cluster: minikube
      extensions:
      - extension:
          last-update: Mon, 29 Aug 2022 10:11:47 CDT
          provider: minikube.sigs.k8s.io
          version: v1.26.1
        name: context_info
      namespace: default
      user: minikube
    name: minikube
  current-context: minikube
  kind: Config
  preferences: {}
  users:
  - name: minikube
    user:
      client-certificate: /Users/naarcha/.minikube/profiles/minikube/client.crt
      client-key: /Users/naarcha/.minikube/profiles/minikube/client.key
  ```    
   
5. Enter `make install` to create the CustomResourceDefinition that runs in your Kubernetes cluster. 
6. Start the SmartObserve Kubernetes Operator. Enter `make run`. 

## Verify operator deployment

If the operator was installed using [local installation](#use-a-local-installation), the operator is not deployed in a pod. However, you can examine the available Custom Resource Definitions (CRDs) using the following command:

```bash
kubectl get crds | grep smartobserve
```
{% include copy.html %}

If you deployed the operator using [Helm charts](#use-a-helm-chart), to ensure that Kubernetes recognizes the SmartObserve Kubernetes Operator as a namespace, enter `k get ns | grep smartobserve`. Both `smartobserve` and `smartobserve-operator-system` should appear as `Active`.

With the operator active, use `k get pod -n smartobserve-operator-system` to make sure that the operator's pods are running. 

```
NAME                                              READY   STATUS   RESTARTS   AGE
smartobserve-operator-controller-manager-<pod-id>   2/2     Running  0          25m
```

With the Kubernetes cluster running, you can now run SmartObserve inside the cluster.

## Deploy a new SmartObserve cluster

From your cloned SmartObserve Kubernetes Operator repo, navigate to the `smartobserve-operator/examples` directory. There you'll find the `smartobserve-cluster.yaml` file, which can be customized to the needs of your cluster, including the `clusterName` that acts as the namespace in which your new SmartObserve cluster will reside.

With your cluster configured, run the `kubectl apply` command.

```
kubectl apply -f smartobserve-cluster.yaml
```

The operator creates several pods, including a bootstrap pod, three SmartObserve cluster pods, and one Dashboards pod. To connect to your cluster, use the `port-forward` command.

```
kubectl port-forward svc/my-cluster-dashboards 5601
```

Open http://localhost:5601 in your preferred browser and log in with the default demo credentials `admin / admin`. You can also run curl commands against the SmartObserve REST API by forwarding to port 9200.

```
kubectl port-forward svc/my-cluster 9200
```

In order to delete the SmartObserve cluster, delete the cluster resources. The following command deletes the cluster namespace and all its resources.

```
kubectl delete -f smartobserve-cluster.yaml
```

## Next steps

To learn more about how to customize your Kubernetes SmartObserve cluster, including data persistence, authentication methods, and scaling, see the [SmartObserve Kubernetes Operator User Guide](https://github.com/Opster/smartobserve-k8s-operator/blob/main/docs/userguide/main.md). 

If you want to contribute to the development of the SmartObserve Kubernetes Operator, see the repo [design documents](https://github.com/Opster/smartobserve-k8s-operator/blob/main/docs/designs/high-level.md).
