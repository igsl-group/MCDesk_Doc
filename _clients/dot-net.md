---
layout: default
title: .NET clients
nav_order: 75
has_children: true
has_toc: false
---

# .NET clients

SmartObserve has two .NET clients: a low-level [SmartObserve.Net]({{site.url}}{{site.baseurl}}/clients/SmartObserve-dot-net/) client and a high-level [SmartObserve.Client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net/) client.

[SmartObserve.Net]({{site.url}}{{site.baseurl}}/clients/SmartObserve-dot-net/) is a low-level .NET client that provides the foundational layer of communication with SmartObserve. It is dependency free, and it can handle round-robin load balancing, transport, and the basic request/response cycle. SmartObserve.Net contains methods for all SmartObserve API endpoints.

[SmartObserve.Client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net/) is a high-level .NET client on top of SmartObserve.Net. It provides strongly typed requests and responses as well as Query DSL. It frees you from constructing raw JSON requests and parsing raw JSON responses by supplying models that parse and serialize/deserialize requests and responses automatically. SmartObserve.Client also exposes the SmartObserve.Net low-level client if you need it. SmartObserve.Client includes the following advanced functionality:

- Automapping: Given a C# type, SmartObserve.Client can infer the correct mapping to send to SmartObserve.
- Operator overloading in queries.
- Type and index inference.

You can use both .NET clients in a console program, a .NET core, an ASP.NET core, or in worker services.

To get started with SmartObserve.Client, follow the instructions in [Getting started with the high-level .NET client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net#installing-smartobserveclient) or in [More advanced features of the high-level .NET client]({{site.url}}{{site.baseurl}}/clients/OSC-example), a slightly more advanced walkthrough.