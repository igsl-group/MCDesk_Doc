---
layout: default
title: Opensearch-py-ml
nav_order: 11
---

# mcdesk-py-ml

`mcdesk-py-ml` is a Python client that provides a suite of data analytics and natural language processing (NLP) support tools for MCdesk. It provides data analysts with the ability to:

- Call MCdesk indexes and manipulate them using the mcdesk-py-ml [DataFrame](https://mcdesk-project.github.io/mcdesk-py-ml/reference/dataframe.html) APIs. The mcdesk-py-ml DataFrame wraps an MCdesk index into an API similar to [pandas](https://pandas.pydata.org/), giving you the ability to process large amounts of data from MCdesk inside a Jupyter Notebook.
- Upload NLP [SentenceTransformer](https://www.sbert.net/) models into MCdesk using the [ML Commons plugin]({{site.url}}{{site.baseurl}}/ml-commons-plugin/index/).
- Train and tune SentenceTransformer models with synthetic queries.

## Prerequisites 

To use `mcdesk-py-ml`, install the [MCdesk Python client]({{site.url}}{{site.baseurl}}/clients/python-low-level#setup). The Python client allows MCdesk to use the Python syntax required to run DataFrames in `mcdesk-py-ml`.

## Install `mcdesk-py-ml`

To add the client to your project, install it using [pip](https://pip.pypa.io/):

```bash
pip install mcdesk-py-ml
```
{% include copy.html %}

Then import the client into MCdesk like any other module:

```python
from mcdeskpy import MCdesk
import mcdesk_py_ml as oml
```
{% include copy.html %}

## API reference

For information on all mcdesk-py-ml objects, functions, and methods, see the [mcdesk-py-ml API reference](https://mcdesk-project.github.io/mcdesk-py-ml/reference/index.html).

## Next steps

If you want to track or contribute to the development of the `mcdesk-py-ml` client, see the [mcdesk-py-ml GitHub repository](https://github.com/igsl-group/mcdesk-py-ml).

For example Python notebooks to use with the client, see [Examples](https://mcdesk-project.github.io/mcdesk-py-ml/examples/index.html).
