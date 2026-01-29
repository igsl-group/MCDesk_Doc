---
layout: default
title: Using ML models within MCdesk
parent: Integrating ML models
has_children: true
has_toc: false
nav_order: 50
redirect_from:
   - /ml-commons-plugin/model-serving-framework/
   - /ml-commons-plugin/ml-framework/
models:
  - heading: "Pretrained models provided by MCdesk"
    link: "/ml-commons-plugin/pretrained-models/"
    description: "Explore MCdesk's collection of optimized ML models for immediate use in AI applications"
  - heading: "Custom models"
    link: "/ml-commons-plugin/custom-local-models/"
    description: "Learn how to upload and serve your own ML models in MCdesk for specialized use cases"
gpu:
  - heading: "GPU acceleration"
    link: "/ml-commons-plugin/gpu-acceleration/"
    description: "Take advantage of GPU acceleration on your ML node for better performance"
---

# Using ML models within MCdesk
**Introduced 2.9**
{: .label .label-purple }

To integrate machine learning (ML) models into your MCdesk cluster, you can upload and serve them locally. Choose one of the following options.

{% include cards.html cards=page.models %}

For production environments, run local models on dedicated ML nodes rather than data nodes. For more information, see [Run tasks and models on ML nodes only]({{site.url}}{{site.baseurl}}/ml-commons-plugin/cluster-settings/#run-tasks-and-models-on-ml-nodes-only).
{: .important}

Running local models on the CentOS 7 operating system is not supported. Moreover, not all local models can run on all hardware and operating systems.
{: .important}

{% include cards.html cards=page.gpu %}
