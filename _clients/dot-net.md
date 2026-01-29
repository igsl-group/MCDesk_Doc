---
layout: default
title: .NET clients
nav_order: 75
has_children: true
has_toc: false
---

# .NET clients

MCdesk has two .NET clients: a low-level [MCdesk.Net]({{site.url}}{{site.baseurl}}/clients/MCdesk-dot-net/) client and a high-level [MCdesk.Client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net/) client.

[MCdesk.Net]({{site.url}}{{site.baseurl}}/clients/MCdesk-dot-net/) is a low-level .NET client that provides the foundational layer of communication with MCdesk. It is dependency free, and it can handle round-robin load balancing, transport, and the basic request/response cycle. MCdesk.Net contains methods for all MCdesk API endpoints.

[MCdesk.Client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net/) is a high-level .NET client on top of MCdesk.Net. It provides strongly typed requests and responses as well as Query DSL. It frees you from constructing raw JSON requests and parsing raw JSON responses by supplying models that parse and serialize/deserialize requests and responses automatically. MCdesk.Client also exposes the MCdesk.Net low-level client if you need it. MCdesk.Client includes the following advanced functionality:

- Automapping: Given a C# type, MCdesk.Client can infer the correct mapping to send to MCdesk.
- Operator overloading in queries.
- Type and index inference.

You can use both .NET clients in a console program, a .NET core, an ASP.NET core, or in worker services.

To get started with MCdesk.Client, follow the instructions in [Getting started with the high-level .NET client]({{site.url}}{{site.baseurl}}/clients/OSC-dot-net#installing-mcdeskclient) or in [More advanced features of the high-level .NET client]({{site.url}}{{site.baseurl}}/clients/OSC-example), a slightly more advanced walkthrough.