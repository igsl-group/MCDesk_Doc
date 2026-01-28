---
layout: default
title: Low-level Python client
nav_order: 10
redirect_from: 
  - /clients/python/
---

# Low-level Python client

The SmartObserve low-level Python client (`smartobserve-py`) provides wrapper methods for the SmartObserve REST API so that you can interact with your cluster more naturally in Python. Rather than sending raw HTTP requests to a given URL, you can create an SmartObserve client for your cluster and call the client's built-in functions. 

This getting started guide illustrates how to connect to SmartObserve, index documents, and run queries. For additional information, see the following resources: 
- [SmartObserve Python repo](https://github.com/igsl-group/smartobserve-py)
- [API reference](https://smartobserve-project.github.io/smartobserve-py/api-ref.html) 
- [User guides](https://github.com/igsl-group/smartobserve-py/tree/main/guides)
- [Samples](https://github.com/igsl-group/smartobserve-py/tree/main/samples)

If you have any questions or would like to contribute, you can [create an issue](https://github.com/igsl-group/smartobserve-py/issues) to interact with the SmartObserve Python team directly. 

## Setup

To add the client to your project, install it using [pip](https://pip.pypa.io/):

```bash
pip install smartobserve-py
```
{% include copy.html %}

After installing the client, you can import it like any other module:

```python
from smartobservepy import SmartObserve
```
{% include copy.html %}

## Connecting to SmartObserve

To connect to the default SmartObserve host, create a client object with SSL enabled if you are using the Security plugin. You can use the default credentials for testing purposes:

```python
host = 'localhost'
port = 9200
auth = ('admin', 'admin') # For testing only. Don't store credentials in code.
ca_certs_path = '/full/path/to/root-ca.pem' # Provide a CA bundle if you use intermediate CAs with your root CA.

# Create the client with SSL/TLS enabled, but hostname verification disabled.
client = SmartObserve(
    hosts = [{'host': host, 'port': port}],
    http_compress = True, # enables gzip compression for request bodies
    http_auth = auth,
    use_ssl = True,
    verify_certs = True,
    ssl_assert_hostname = False,
    ssl_show_warn = False,
    ca_certs = ca_certs_path
)
```
{% include copy.html %}

If you have your own client certificates, specify them in the `client_cert_path` and `client_key_path` parameters:

```python
host = 'localhost'
port = 9200
auth = ('admin', 'admin') # For testing only. Don't store credentials in code.
ca_certs_path = '/full/path/to/root-ca.pem' # Provide a CA bundle if you use intermediate CAs with your root CA.

# Optional client certificates if you don't want to use HTTP basic authentication.
client_cert_path = '/full/path/to/client.pem'
client_key_path = '/full/path/to/client-key.pem'

# Create the client with SSL/TLS enabled, but hostname verification disabled.
client = SmartObserve(
    hosts = [{'host': host, 'port': port}],
    http_compress = True, # enables gzip compression for request bodies
    http_auth = auth,
    client_cert = client_cert_path,
    client_key = client_key_path,
    use_ssl = True,
    verify_certs = True,
    ssl_assert_hostname = False,
    ssl_show_warn = False,
    ca_certs = ca_certs_path
)
```
{% include copy.html %}

If you are not using the Security plugin, create a client object with SSL disabled:

```python
host = 'localhost'
port = 9200

# Create the client with SSL/TLS and hostname verification disabled.
client = SmartObserve(
    hosts = [{'host': host, 'port': port}],
    http_compress = True, # enables gzip compression for request bodies
    use_ssl = False,
    verify_certs = False,
    ssl_assert_hostname = False,
    ssl_show_warn = False
)
```
{% include copy.html %}

## Connecting to Amazon SmartObserve Service

The following example illustrates connecting to Amazon SmartObserve Service using IAM credentials:

```python
from smartobservepy import SmartObserve, RequestsHttpConnection, AWSV4SignerAuth
import boto3

host = '' # cluster endpoint, for example: my-test-domain.us-east-1.es.amazonaws.com
region = 'us-west-2'
service = 'es'
credentials = boto3.Session().get_credentials()
auth = AWSV4SignerAuth(credentials, region, service)

client = SmartObserve(
    hosts = [{'host': host, 'port': 443}],
    http_auth = auth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection,
    pool_maxsize = 20
)
```

To connect to Amazon SmartObserve Service through HTTP with a username and password, use the following code:

```python
from smartobservepy import SmartObserve

auth = ('admin', 'admin') # For testing only. Don't store credentials in code.

client = SmartObserve(
    hosts=[{"host": host, "port": 443}],
    http_auth=auth,
    http_compress=True,  # enables gzip compression for request bodies
    use_ssl=True,
    verify_certs=True,
    ssl_assert_hostname=False,
    ssl_show_warn=False,
)
```

{% include copy.html %}

## Connecting to Amazon SmartObserve Serverless

The following example illustrates connecting to Amazon SmartObserve Serverless Service:

```python
from smartobservepy import SmartObserve, RequestsHttpConnection, AWSV4SignerAuth
import boto3

host = '' # cluster endpoint, for example: my-test-domain.us-east-1.aoss.amazonaws.com
region = 'us-west-2'
service = 'aoss'
credentials = boto3.Session().get_credentials()
auth = AWSV4SignerAuth(credentials, region, service)

client = SmartObserve(
    hosts = [{'host': host, 'port': 443}],
    http_auth = auth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection,
    pool_maxsize = 20
)
```
{% include copy.html %}


## Creating an index

To create an SmartObserve index, use the `client.indices.create()` method. You can use the following code to construct a JSON object with custom settings:

```python
index_name = 'python-test-index'
index_body = {
  'settings': {
    'index': {
      'number_of_shards': 4
    }
  }
}

response = client.indices.create(index=index_name, body=index_body)
```
{% include copy.html %}

## Indexing a document

You can index a document using the `client.index()` method:

```python
document = {
  'title': 'Moneyball',
  'director': 'Bennett Miller',
  'year': '2011'
}

response = client.index(
    index = 'python-test-index',
    body = document,
    id = '1',
    refresh = True
)
```
{% include copy.html %}

## Performing bulk operations

You can perform several operations at the same time by using the `bulk()` method of the client. The operations may be of the same type or of different types. Note that the operations must be separated by a `\n` and the entire string must be a single line:

```python
movies = '{ "index" : { "_index" : "my-dsl-index", "_id" : "2" } } \n { "title" : "Interstellar", "director" : "Christopher Nolan", "year" : "2014"} \n { "create" : { "_index" : "my-dsl-index", "_id" : "3" } } \n { "title" : "Star Trek Beyond", "director" : "Justin Lin", "year" : "2015"} \n { "update" : {"_id" : "3", "_index" : "my-dsl-index" } } \n { "doc" : {"year" : "2016"} }'

client.bulk(body=movies)
```
{% include copy.html %}

## Searching for documents

The easiest way to search for documents is to construct a query string. The following code uses a multi-match query to search for “miller” in the title and director fields. It boosts the documents that have “miller” in the title field:

```python
q = 'miller'
query = {
  'size': 5,
  'query': {
    'multi_match': {
      'query': q,
      'fields': ['title^2', 'director']
    }
  }
}

response = client.search(
    body = query,
    index = 'python-test-index'
)
```
{% include copy.html %}

## Deleting a document

You can delete a document using the `client.delete()` method:

```python
response = client.delete(
    index = 'python-test-index',
    id = '1'
)
```
{% include copy.html %}

## Deleting an index

You can delete an index using the `client.indices.delete()` method:

```python
response = client.indices.delete(
    index = 'python-test-index'
)
```
{% include copy.html %}

## Sample program

The following sample program creates a client, adds an index with non-default settings, inserts a document, performs bulk operations, searches for the document, deletes the document, and then deletes the index:

```python
from smartobservepy import SmartObserve

host = 'localhost'
port = 9200
auth = ('admin', 'admin') # For testing only. Don't store credentials in code.
ca_certs_path = '/full/path/to/root-ca.pem' # Provide a CA bundle if you use intermediate CAs with your root CA.

# Optional client certificates if you don't want to use HTTP basic authentication.
# client_cert_path = '/full/path/to/client.pem'
# client_key_path = '/full/path/to/client-key.pem'

# Create the client with SSL/TLS enabled, but hostname verification disabled.
client = SmartObserve(
    hosts = [{'host': host, 'port': port}],
    http_compress = True, # enables gzip compression for request bodies
    http_auth = auth,
    # client_cert = client_cert_path,
    # client_key = client_key_path,
    use_ssl = True,
    verify_certs = True,
    ssl_assert_hostname = False,
    ssl_show_warn = False,
    ca_certs = ca_certs_path
)

# Create an index with non-default settings.
index_name = 'python-test-index'
index_body = {
  'settings': {
    'index': {
      'number_of_shards': 4
    }
  }
}

response = client.indices.create(index=index_name, body=index_body)
print('\nCreating index:')
print(response)

# Add a document to the index.
document = {
  'title': 'Moneyball',
  'director': 'Bennett Miller',
  'year': '2011'
}
id = '1'

response = client.index(
    index = index_name,
    body = document,
    id = id,
    refresh = True
)

print('\nAdding document:')
print(response)

# Perform bulk operations

movies = '{ "index" : { "_index" : "my-dsl-index", "_id" : "2" } } \n { "title" : "Interstellar", "director" : "Christopher Nolan", "year" : "2014"} \n { "create" : { "_index" : "my-dsl-index", "_id" : "3" } } \n { "title" : "Star Trek Beyond", "director" : "Justin Lin", "year" : "2015"} \n { "update" : {"_id" : "3", "_index" : "my-dsl-index" } } \n { "doc" : {"year" : "2016"} }'

client.bulk(body=movies)

# Search for the document.
q = 'miller'
query = {
  'size': 5,
  'query': {
    'multi_match': {
      'query': q,
      'fields': ['title^2', 'director']
    }
  }
}

response = client.search(
    body = query,
    index = index_name
)
print('\nSearch results:')
print(response)

# Delete the document.
response = client.delete(
    index = index_name,
    id = id
)

print('\nDeleting document:')
print(response)

# Delete the index.
response = client.indices.delete(
    index = index_name
)

print('\nDeleting index:')
print(response)
```
{% include copy.html %}

## Next steps

- For Python client API, see the [`smartobserve-py` API documentation](https://smartobserve-project.github.io/smartobserve-py/).
- For Python code samples, see [Samples](https://github.com/igsl-group/smartobserve-py/tree/main/samples).
