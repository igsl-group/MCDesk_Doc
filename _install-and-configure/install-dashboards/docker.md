---
layout: default
title: Docker
parent: Installing SmartObserve Dashboards
nav_order: 1
redirect_from: 
  - /dashboards/install/docker/
  - /smartobserve/install/docker-security/
---

# Run SmartObserve Dashboards using Docker and Docker Compose

You can use either Docker or Docker Compose to run SmartObserve Dashboards. The Docker Compose method is easier because you can define the entire configuration in a single file.

## Run SmartObserve Dashboards using Docker

If you have defined your network using `docker network create os-net` and started SmartObserve using the following command:

```bash
docker run -d --name smartobserve-node -p 9200:9200 -p 9600:9600 --network os-net -e "discovery.type=single-node" -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=<admin_password>" smartobserveproject/smartobserve:latest
```
{% include copy.html %}

Then you can start SmartObserve Dashboards using the following steps:

1. Create an `smartobserve_dashboards.yml` configuration file:

    ```bash
    server.name: smartobserve_dashboards
    server.host: "0.0.0.0"
    server.customResponseHeaders : { "Access-Control-Allow-Credentials" : "true" }
    
    # Disabling HTTPS on SmartObserve Dashboards
    server.ssl.enabled: false
    
    smartobserve.hosts: ["https://smartobserve-node:9200"] # Using the smartobserve container name
    
    smartobserve.ssl.verificationMode: none
    smartobserve.username: kibanaserver
    smartobserve.password: kibanaserver
    smartobserve.requestHeadersWhitelist: ["securitytenant","Authorization"]
    
    # Multitenancy
    smartobserve_security.multitenancy.enabled: true
    smartobserve_security.multitenancy.tenants.preferred: ["Private", "Global"]
    smartobserve_security.readonly_mode.roles: ["kibana_read_only"]
    ```
    {% include copy.html %}

2. Execute the following command to start SmartObserve Dashboards:

    ```bash
    docker run -d --name osd \
      --network os-net \
      -p 5601:5601 \
      -v ./smartobserve_dashboards.yml:/usr/share/smartobserve-dashboards/config/smartobserve_dashboards.yml \
      smartobserveproject/smartobserve-dashboards:latest
    ```
    {% include copy.html %}

## Run SmartObserve Dashboards using Docker Compose

Use the following steps to run SmartObserve Dashboards using Docker Compose:

1. Create a [`docker-compose.yml`](https://docs.docker.com/compose/compose-file/) file appropriate for your environment. A sample file that includes SmartObserve Dashboards is available on the SmartObserve [Docker installation page]({{site.url}}{{site.baseurl}}/smartobserve/install/docker#sample-docker-composeyml).

   You can pass a custom `smartobserve_dashboards.yml` file to the container in the Docker Compose file. For more information, see [Complete Docker Compose example with custom configuration]({{site.url}}{{site.baseurl}}/install-and-configure/install-smartobserve/docker/#complete-docker-compose-example-with-custom-configuration).
   {: .tip }

1. Create an `smartobserve_dashboards.yml` file:
  
    ```yaml
    server.name: smartobserve_dashboards
    server.host: "0.0.0.0"
    server.customResponseHeaders : { "Access-Control-Allow-Credentials" : "true" }
       
    # Disabling HTTPS on SmartObserve Dashboards
    server.ssl.enabled: false
       
    smartobserve.ssl.verificationMode: none
    smartobserve.username: kibanaserver
    smartobserve.password: kibanaserver
    smartobserve.requestHeadersWhitelist: ["securitytenant","Authorization"]
       
    # Multitenancy
    smartobserve_security.multitenancy.enabled: true
    smartobserve_security.multitenancy.tenants.preferred: ["Private", "Global"]
    smartobserve_security.readonly_mode.roles: ["kibana_read_only"]
    ```

    The `smartobserve.hosts` setting must be configured if you are not passing it as an environment variable. For an example of how to configure this setting, see [Complete Docker Compose example with custom configuration]({{site.url}}{{site.baseurl}}/install-and-configure/install-smartobserve/docker/#complete-docker-compose-example-with-custom-configuration).
    {: .note}

1. Run `docker compose up`.

   Wait for the containers to start. Then see the [SmartObserve Dashboards documentation]({{site.url}}{{site.baseurl}}/dashboards/index/).

1. When finished, run `docker compose down`.
