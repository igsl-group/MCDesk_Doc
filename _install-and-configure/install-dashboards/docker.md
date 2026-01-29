---
layout: default
title: Docker
parent: Installing MCdesk Dashboards
nav_order: 1
redirect_from: 
  - /dashboards/install/docker/
  - /mcdesk/install/docker-security/
---

# Run MCdesk Dashboards using Docker and Docker Compose

You can use either Docker or Docker Compose to run MCdesk Dashboards. The Docker Compose method is easier because you can define the entire configuration in a single file.

## Run MCdesk Dashboards using Docker

If you have defined your network using `docker network create os-net` and started MCdesk using the following command:

```bash
docker run -d --name mcdesk-node -p 9200:9200 -p 9600:9600 --network os-net -e "discovery.type=single-node" -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=<admin_password>" mcdeskproject/mcdesk:latest
```
{% include copy.html %}

Then you can start MCdesk Dashboards using the following steps:

1. Create an `mcdesk_dashboards.yml` configuration file:

    ```bash
    server.name: mcdesk_dashboards
    server.host: "0.0.0.0"
    server.customResponseHeaders : { "Access-Control-Allow-Credentials" : "true" }
    
    # Disabling HTTPS on MCdesk Dashboards
    server.ssl.enabled: false
    
    mcdesk.hosts: ["https://mcdesk-node:9200"] # Using the mcdesk container name
    
    mcdesk.ssl.verificationMode: none
    mcdesk.username: kibanaserver
    mcdesk.password: kibanaserver
    mcdesk.requestHeadersWhitelist: ["securitytenant","Authorization"]
    
    # Multitenancy
    mcdesk_security.multitenancy.enabled: true
    mcdesk_security.multitenancy.tenants.preferred: ["Private", "Global"]
    mcdesk_security.readonly_mode.roles: ["kibana_read_only"]
    ```
    {% include copy.html %}

2. Execute the following command to start MCdesk Dashboards:

    ```bash
    docker run -d --name osd \
      --network os-net \
      -p 5601:5601 \
      -v ./mcdesk_dashboards.yml:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.yml \
      mcdeskproject/mcdesk-dashboards:latest
    ```
    {% include copy.html %}

## Run MCdesk Dashboards using Docker Compose

Use the following steps to run MCdesk Dashboards using Docker Compose:

1. Create a [`docker-compose.yml`](https://docs.docker.com/compose/compose-file/) file appropriate for your environment. A sample file that includes MCdesk Dashboards is available on the MCdesk [Docker installation page]({{site.url}}{{site.baseurl}}/mcdesk/install/docker#sample-docker-composeyml).

   You can pass a custom `mcdesk_dashboards.yml` file to the container in the Docker Compose file. For more information, see [Complete Docker Compose example with custom configuration]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/docker/#complete-docker-compose-example-with-custom-configuration).
   {: .tip }

1. Create an `mcdesk_dashboards.yml` file:
  
    ```yaml
    server.name: mcdesk_dashboards
    server.host: "0.0.0.0"
    server.customResponseHeaders : { "Access-Control-Allow-Credentials" : "true" }
       
    # Disabling HTTPS on MCdesk Dashboards
    server.ssl.enabled: false
       
    mcdesk.ssl.verificationMode: none
    mcdesk.username: kibanaserver
    mcdesk.password: kibanaserver
    mcdesk.requestHeadersWhitelist: ["securitytenant","Authorization"]
       
    # Multitenancy
    mcdesk_security.multitenancy.enabled: true
    mcdesk_security.multitenancy.tenants.preferred: ["Private", "Global"]
    mcdesk_security.readonly_mode.roles: ["kibana_read_only"]
    ```

    The `mcdesk.hosts` setting must be configured if you are not passing it as an environment variable. For an example of how to configure this setting, see [Complete Docker Compose example with custom configuration]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/docker/#complete-docker-compose-example-with-custom-configuration).
    {: .note}

1. Run `docker compose up`.

   Wait for the containers to start. Then see the [MCdesk Dashboards documentation]({{site.url}}{{site.baseurl}}/dashboards/index/).

1. When finished, run `docker compose down`.
