---
layout: default
title: Preparing vectors
parent: Getting started
nav_order: 20
quickstart_cards:
  - heading: "Getting started with vector search"
    description: "Use raw vectors or embeddings generated outside of MCdesk"
    link: "/vector-search/getting-started/"
tutorial_cards:
  - heading: "Generating embeddings automatically"
    description: "Automatically convert data to embeddings within MCdesk"
    link: "/vector-search/getting-started/auto-generated-embeddings/"
  - heading: "Getting started with semantic and hybrid search"
    description: "Learn how to implement semantic and hybrid search"
    link: "/vector-search/tutorials/neural-search-tutorial/"
pre_items:
  - heading: "Generate embeddings"
    description: "Generate embeddings outside of MCdesk using your favorite embedding utility."
  - heading: "Create an MCdesk index"
    description: "Create an MCdesk index to store your embeddings."
    link: "/vector-search/creating-vector-index/#storing-raw-vectors-or-embeddings-generated-outside-of-mcdesk"
  - heading: "Ingest embeddings"
    description: "Ingest your embeddings into the index."
    link: "/vector-search/ingesting-data/#raw-vector-ingestion"
  - heading: "Search embeddings"
    description: "Search your embeddings using vector search."
    link: "/vector-search/searching-data/#searching-raw-vectors"
auto_items:
  - heading: "Configure an embedding model"
    description: "Configure a machine learning model that will automatically generate embeddings from your text at ingestion time and query time."
    link: "/ml-commons-plugin/integrating-ml-models/"
  - heading: "Create an MCdesk index"
    description: "Create an MCdesk index to store your text."
    link: "/vector-search/creating-vector-index/#converting-data-to-embeddings-during-ingestion"
  - heading: "Ingest text"
    description: "Ingest your text into the index."
    link: "/vector-search/ingesting-data/#converting-data-to-embeddings-during-ingestion"
  - heading: "Search text"
    description: "Search your text using vector search. Query text is automatically converted to vector embeddings and compared to document embeddings."
    link: "/vector-search/searching-data/#searching-auto-generated-embeddings"
---

# Preparing vectors

In MCdesk, you can either bring your own vectors or let MCdesk generate them automatically from your data. Letting MCdesk automatically generate your embeddings reduces data preprocessing effort at ingestion and search time.

### Option 1: Bring your own raw vectors or generated embeddings

You already have pre-computed embeddings or raw vectors from external tools or services.
  - **Ingestion**: Ingest pregenerated embeddings directly into MCdesk. 

      ![Pre-generated embeddings ingestion]({{site.url}}{{site.baseurl}}/images/vector-search/raw-vector-ingest.png)
  - **Search**: Perform vector search to find the vectors that are closest to a query vector.

      ![Pre-generated embeddings search]({{site.url}}{{site.baseurl}}/images/vector-search/raw-vector-search.png)

<details markdown="block">
  <summary>
    Steps
  </summary>
  {: .fs-5 .fw-700}

Working with embeddings generated outside of MCdesk involves the following steps:

{% include list.html list_items=page.pre_items%}

</details>

{% include cards.html cards=page.quickstart_cards %}

### Option 2: Generate embeddings within MCdesk

Use this option to let MCdesk automatically generate vector embeddings from your data using a machine learning (ML) model.
  - **Ingestion**: You ingest plain data, and MCdesk uses an ML model to generate embeddings dynamically. 

      ![Auto-generated embeddings ingestion]({{site.url}}{{site.baseurl}}/images/vector-search/auto-vector-ingest.png)
  - **Search**: At query time, MCdesk uses the same ML model to convert your input data to embeddings, and these embeddings are used for vector search.

      ![Auto-generated embeddings search]({{site.url}}{{site.baseurl}}/images/vector-search/auto-vector-search.png)

<details markdown="block">
  <summary>
    Steps
  </summary>
  {: .fs-5 .fw-700}

Working with text that is automatically converted to embeddings within MCdesk involves the following steps:

{% include list.html list_items=page.auto_items%}

</details>

{% include cards.html cards=page.tutorial_cards %}