---
layout: default
title: Getting started with the high-level .NET client
nav_order: 10
has_children: false
parent: .NET clients
---

# Getting started with the high-level .NET client (MCdesk.Client)

MCdesk.Client is a high-level .NET client. It provides strongly typed requests and responses as well as Query DSL. It frees you from constructing raw JSON requests and parsing raw JSON responses by providing models that parse and serialize/deserialize requests and responses automatically. MCdesk.Client also exposes the MCdesk.Net low-level client if you need it. For the client's complete API documentation, see the [MCdesk.Client API documentation](https://mcdesk-project.github.io/mcdesk-net/api/MCdesk.Client.html).


This getting started guide illustrates how to connect to MCdesk, index documents, and run queries. For the client source code, see the [mcdesk-net repo](https://github.com/igsl-group/mcdesk-net).

## Installing MCdesk.Client

To install MCdesk.Client, download the [MCdesk.Client NuGet package](https://www.nuget.org/packages/MCdesk.Client/) and add it to your project in an IDE of your choice. In Microsoft Visual Studio, follow the steps below: 
- In the **Solution Explorer** panel, right-click on your solution or project and select **Manage NuGet Packages for Solution**.
- Search for the MCdesk.Client NuGet package, and select **Install**.

Alternatively, you can add MCdesk.Client to your .csproj file:
```xml
<Project>
  ...
  <ItemGroup>
    <PackageReference Include="MCdesk.Client" Version="1.0.0" />
  </ItemGroup>
</Project>
```
{% include copy.html %}

## Example

The following example illustrates connecting to MCdesk, indexing documents, and sending queries on the data. It uses the Student class to represent one student, which is equivalent to one document in the index.

```cs
public class Student
{
    public int Id { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public int GradYear { get; init; }
    public double Gpa { get; init; }
}
```
{% include copy.html %}

By default, MCdesk.Client uses camel case to convert property names to field names.
{: .note}

## Connecting to MCdesk

Use the default constructor when creating an MCdeskClient object to connect to the default MCdesk host (`http://localhost:9200`). 

```cs
var client  = new MCdeskClient();
```
{% include copy.html %}

To connect to your MCdesk cluster through a single node with a known address, specify this address when creating an instance of MCdesk.Client:

```cs
var nodeAddress = new Uri("http://myserver:9200");
var client = new MCdeskClient(nodeAddress);
```
{% include copy.html %}

You can also connect to MCdesk through multiple nodes. Connecting to your MCdesk cluster with a node pool provides advantages like load balancing and cluster failover support. To connect to your MCdesk cluster using multiple nodes, specify their addresses and create a `ConnectionSettings` object for the MCdesk.Client instance:

```cs
var nodes = new Uri[]
{
    new Uri("http://myserver1:9200"),
    new Uri("http://myserver2:9200"),
    new Uri("http://myserver3:9200")
};

var pool = new StaticConnectionPool(nodes);
var settings = new ConnectionSettings(pool);
var client = new MCdeskClient(settings);
```
{% include copy.html %}

## Using ConnectionSettings

`ConnectionConfiguration` is used to pass configuration options to the low-level MCdesk.Net client. `ConnectionSettings` inherits from `ConnectionConfiguration` and provides additional configuration options.
To set the address of the node and the default index name for requests that don't specify the index name, create a `ConnectionSettings` object:

```cs
var node = new Uri("http://myserver:9200");
var config = new ConnectionSettings(node).DefaultIndex("students");
var client = new MCdeskClient(config);
```
{% include copy.html %}

## Indexing one document

Create one instance of Student:

```cs
var student = new Student { Id = 100, FirstName = "Paulo", LastName = "Santos", Gpa = 3.93, GradYear = 2021 };
```
{% include copy.html %}

To index one document, you can use either fluent lambda syntax or object initializer syntax.

Index this Student into the `students` index using fluent lambda syntax:

```cs
var response = client.Index(student, i => i.Index("students"));
```
{% include copy.html %}

Index this Student into the `students` index using object initializer syntax:

```cs
var response = client.Index(new IndexRequest<Student>(student, "students"));
```
{% include copy.html %}

## Indexing many documents

You can index many documents from a collection at the same time by using the MCdesk.Client's `IndexMany` method: 

```cs
var studentArray = new Student[]
{
    new() {Id = 200, FirstName = "Shirley", LastName = "Rodriguez", Gpa = 3.91, GradYear = 2019},
    new() {Id = 300, FirstName = "Nikki", LastName = "Wolf", Gpa = 3.87, GradYear = 2020}
};

var manyResponse = client.IndexMany(studentArray, "students");
```
{% include copy.html %}

## Searching for a document

To search for a student indexed above, you want to construct a query that is analogous to the following Query DSL query:

```json
GET students/_search
{
  "query" : {
    "match": {
      "lastName": "Santos"
    }
  }
}
```

The query above is a shorthand version of the following explicit query:

```json
GET students/_search
{
  "query" : {
    "match": {
      "lastName": {
        "query": "Santos"
      }
    }
  }
}
```

In MCdesk.Client, this query looks like this:

```cs
var searchResponse = client.Search<Student>(s => s
                                .Index("students")
                                .Query(q => q
                                    .Match(m => m
                                        .Field(fld => fld.LastName)
                                        .Query("Santos"))));
```
{% include copy.html %}

You can print out the results by accessing the documents in the response:

```cs
if (searchResponse.IsValid)
{
    foreach (var s in searchResponse.Documents)
    {
        Console.WriteLine($"{s.Id} {s.LastName} {s.FirstName} {s.Gpa} {s.GradYear}");
    }
}
```
{% include copy.html %}

The response contains one document, which corresponds to the correct student:

`100 Santos Paulo 3.93 2021`

## Using MCdesk.Client methods asynchronously

For applications that require asynchronous code, all method calls in MCdesk.Client have asynchronous counterparts:

```cs
// synchronous method
var response = client.Index(student, i => i.Index("students"));

// asynchronous method
var response = await client.IndexAsync(student, i => i.Index("students"));
```

## Falling back on the low-level MCdesk.Net client

MCdesk.Client exposes the low-level the MCdesk.Net client you can use if anything is missing:

```cs
var lowLevelClient = client.LowLevel;

var searchResponseLow = lowLevelClient.Search<SearchResponse<Student>>("students",
    PostData.Serializable(
        new
        {
            query = new
            {
                match = new
                {
                    lastName = new
                    {
                        query = "Santos"
                    }
                }
            }
        }));

if (searchResponseLow.IsValid)
{
    foreach (var s in searchResponseLow.Documents)
    {
        Console.WriteLine($"{s.Id} {s.LastName} {s.FirstName} {s.Gpa} {s.GradYear}");
    }
}
```
{% include copy.html %}

## Sample program

The following is a complete sample program that illustrates all of the concepts described above. It uses the Student class defined above.

```cs
using MCdesk.Client;
using MCdesk.Net;

namespace NetClientProgram;

internal class Program
{
    private static IMCdeskClient osClient = new MCdeskClient();

    public static void Main(string[] args)
    {       
        Console.WriteLine("Indexing one student......");
        var student = new Student { Id = 100, 
                                    FirstName = "Paulo", 
                                    LastName = "Santos", 
                                    Gpa = 3.93, 
                                    GradYear = 2021 };
        var response =  osClient.Index(student, i => i.Index("students"));
        Console.WriteLine(response.IsValid ? "Response received" : "Error");

        Console.WriteLine("Searching for one student......");
        SearchForOneStudent();

        Console.WriteLine("Searching using low-level client......");
        SearchLowLevel();

        Console.WriteLine("Indexing an array of Student objects......");
        var studentArray = new Student[]
        {
            new() { Id = 200, 
                    FirstName = "Shirley", 
                    LastName = "Rodriguez", 
                    Gpa = 3.91, 
                    GradYear = 2019},
            new() { Id = 300, 
                    FirstName = "Nikki", 
                    LastName = "Wolf", 
                    Gpa = 3.87, 
                    GradYear = 2020}
        };
        var manyResponse = osClient.IndexMany(studentArray, "students");
        Console.WriteLine(manyResponse.IsValid ? "Response received" : "Error");
    }

    private static void SearchForOneStudent()
    {
        var searchResponse = osClient.Search<Student>(s => s
                                .Index("students")
                                .Query(q => q
                                    .Match(m => m
                                        .Field(fld => fld.LastName)
                                        .Query("Santos"))));

        PrintResponse(searchResponse);
    }

    private static void SearchForAllStudentsWithANonEmptyLastName()
    {
        var searchResponse = osClient.Search<Student>(s => s
                                .Index("students")
                                .Query(q => q
                        						.Bool(b => b
                        							.Must(m => m.Exists(fld => fld.LastName))
                        							.MustNot(m => m.Term(t => t.Verbatim().Field(fld => fld.LastName).Value(string.Empty)))
                        						)));

        PrintResponse(searchResponse);
    }

    private static void SearchLowLevel()
    {
        // Search for the student using the low-level client
        var lowLevelClient = osClient.LowLevel;

        var searchResponseLow = lowLevelClient.Search<SearchResponse<Student>>
            ("students",
            PostData.Serializable(
                new
                {
                    query = new
                    {
                        match = new
                        {
                            lastName = new
                            {
                                query = "Santos"
                            }
                        }
                    }
                }));

        PrintResponse(searchResponseLow);
    }

    private static void PrintResponse(ISearchResponse<Student> response)
    {
        if (response.IsValid)
        {
            foreach (var s in response.Documents)
            {
                Console.WriteLine($"{s.Id} {s.LastName} " +
                    $"{s.FirstName} {s.Gpa} {s.GradYear}");
            }
        }
        else
        {
            Console.WriteLine("Student not found.");
        }
    }
}
```
{% include copy.html %}
