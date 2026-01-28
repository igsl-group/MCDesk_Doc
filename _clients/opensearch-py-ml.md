---
layout: default
title: Opensearch-py-ml
nav_order: 11
---

# smartobserve-py-ml

`smartobserve-py-ml` is a Python client that provides a suite of data analytics and natural language processing (NLP) support tools for SmartObserve. It provides data analysts with the ability to:

- Call SmartObserve indexes and manipulate them using the smartobserve-py-ml [DataFrame](https://smartobserve-project.github.io/smartobserve-py-ml/reference/dataframe.html) APIs. The smartobserve-py-ml DataFrame wraps an SmartObserve index into an API similar to [pandas](https://pandas.pydata.org/), giving you the ability to process large amounts of data from SmartObserve inside a Jupyter Notebook.
- Upload NLP [SentenceTransformer](https://www.sbert.net/) models into SmartObserve using the [ML Commons plugin]({{site.url}}{{site.baseurl}}/ml-commons-plugin/index/).
- Train and tune SentenceTransformer models with synthetic queries.

## Prerequisites 

To use `smartobserve-py-ml`, install the [SmartObserve Python client]({{site.url}}{{site.baseurl}}/clients/python-low-level#setup). The Python client allows SmartObserve to use the Python syntax required to run DataFrames in `smartobserve-py-ml`.

## Install `smartobserve-py-ml`

To add the client to your project, install it using [pip](https://pip.pypa.io/):

```bash
pip install smartobserve-py-ml
```
{% include copy.html %}

Then import the client into SmartObserve like any other module:

```python
from smartobservepy import SmartObserve
import smartobserve_py_ml as oml
```
{% include copy.html %}

## API reference

For information on all smartobserve-py-ml objects, functions, and methods, see the [smartobserve-py-ml API reference](https://smartobserve-project.github.io/smartobserve-py-ml/reference/index.html).

## Next steps

If you want to track or contribute to the development of the `smartobserve-py-ml` client, see the [smartobserve-py-ml GitHub repository](https://github.com/igsl-group/smartobserve-py-ml).

For example Python notebooks to use with the client, see [Examples](https://smartobserve-project.github.io/smartobserve-py-ml/examples/index.html).
