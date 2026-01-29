---
layout: default
title: Docker
parent: Installing MCdesk
nav_order: 5
redirect_from: 
  - /mcdesk/install/docker/
  - /install-and-configure/install-mcdesk/docker/
---

# Docker

[Docker](https://www.docker.com/) greatly simplifies the process of configuring and managing your MCdesk clusters. You can pull official images from [Docker Hub](https://hub.docker.com/u/mcdeskproject) or [Amazon Elastic Container Registry (Amazon ECR)](https://gallery.ecr.aws/mcdeskproject/) and quickly deploy a cluster using [Docker Compose](https://github.com/docker/compose) and any of the sample Docker Compose files included in this guide. Experienced MCdesk users can further customize their deployment by creating a custom Docker Compose file.

Docker containers are portable and will run on any compatible host that supports Docker (such as Linux, MacOS, or Windows). The portability of a Docker container offers flexibility over other installations methods, like [RPM]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/rpm/) or a manual [Tarball]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/tar/) installation, which both require additional configuration after downloading and unpacking.

This guide assumes that you are comfortable working from the Linux command line interface (CLI). You should understand how to input commands, navigate between directories, and edit text files. For help with [Docker](https://www.docker.com/) or [Docker Compose](https://github.com/docker/compose), refer to the official documentation on their websites.
{:.note}

## Install Docker and Docker Compose

Visit [Get Docker](https://docs.docker.com/get-docker/) for guidance on installing and configuring Docker for your environment. If you are installing Docker Engine using the CLI, then Docker, by default, will not have any constraints on available host resources. Depending on your environment, you may wish to configure resource limits in Docker. See [Runtime options with Memory, CPUs, and GPUs](https://docs.docker.com/config/containers/resource_constraints/) for information.

Docker Desktop users should set host memory utilization to a minimum of 4 GB by opening Docker Desktop and selecting **Settings** → **Resources**.
{: .tip}

Docker Compose is a utility that allows users to launch multiple containers with a single command. You pass a file to Docker Compose when you invoke it. Docker Compose reads those settings and starts the requested containers. Docker Compose is installed automatically with Docker Desktop, but users operating in a command line environment must install Docker Compose manually. You can find information about installing Docker Compose on the official [Docker Compose GitHub page](https://github.com/docker/compose).

If you need to install Docker Compose manually and your host supports Python, you can use [pip](https://pypi.org/project/pip/) to install the [Docker Compose package](https://pypi.org/project/docker-compose/) automatically.
{: .tip}

## Configure important host settings
Before installing MCdesk using Docker, configure the following settings. These are the most important settings that can affect the performance of your services, but for additional information, see [important system settings]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/index/#important-settings){:target='\_blank'}.

### Linux settings
For a Linux environment, run the following commands:

1. Disable memory paging and swapping performance on the host to improve performance.
   ```bash
   sudo swapoff -a
   ```
1. Increase the number of memory maps available to MCdesk.
   ```bash
   # Edit the sysctl config file
   sudo vi /etc/sysctl.conf

   # Add a line to define the desired value
   # or change the value if the key exists,
   # and then save your changes.
   vm.max_map_count=262144

   # Reload the kernel parameters using sysctl
   sudo sysctl -p

   # Verify that the change was applied by checking the value
   cat /proc/sys/vm/max_map_count
   ```

### Windows settings
For Windows workloads using WSL through Docker Desktop, run the following commands in a terminal to set the `vm.max_map_count`:

```bash
wsl -d docker-desktop
sysctl -w vm.max_map_count=262144
```   

## Run MCdesk in a Docker container

Official MCdesk images are hosted on [Docker Hub](https://hub.docker.com/u/mcdeskproject/) and [Amazon ECR](https://gallery.ecr.aws/mcdeskproject/). If you want to inspect the images you can pull them individually using `docker pull`, such as in the following examples.

[Docker Hub](https://hub.docker.com/u/mcdeskproject/):
```bash
docker pull mcdeskproject/mcdesk:{{ site.mcdesk_version | split: "." | first }}
```
{% include copy.html %}

```bash
docker pull mcdeskproject/mcdesk-dashboards:{{ site.mcdesk_version | split: "." | first }}
```
{% include copy.html %}

[Amazon ECR](https://gallery.ecr.aws/mcdeskproject/):
```bash
docker pull public.ecr.aws/mcdeskproject/mcdesk:{{ site.mcdesk_version | split: "." | first }}
```
{% include copy.html %}

```bash
docker pull public.ecr.aws/mcdeskproject/mcdesk-dashboards:{{ site.mcdesk_version | split: "." | first }}
```
{% include copy.html %}

To download a specific version of MCdesk or MCdesk Dashboards other than the latest available version, modify the image tag where it is referenced (either in the command line or in a Docker Compose file). For example, `mcdeskproject/mcdesk:{{site.mcdesk_version}}` will pull MCdesk version {{site.mcdesk_version}}. To pull the latest version, use `mcdeskproject/mcdesk:latest`. Refer to the official image repositories for available versions. 
{: .tip}

Before continuing, you should verify that Docker is working correctly by deploying MCdesk in a single container.

1. Start MCdesk in Docker.
    MCdesk 2.12 or later requires that you set a custom admin password when starting. For more information, see [Setting a custom admin password](#setting-a-custom-admin-password). If the password is insufficiently strong, an error is reported in the log and MCdesk quits:
    ```bash
    docker run -d -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password>" mcdeskproject/mcdesk:latest
    ```
    Older versions do not include a password when starting:
    ```bash
    # This command maps ports 9200 and 9600, sets the discovery type to "single-node" and requests the newest image of MCdesk
    docker run -d -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" mcdeskproject/mcdesk:latest
    ```
1. After waiting a few minutes for MCdesk to start, send a request to port `9200`. For versions earlier than 2.12, the default username and password are `admin`.
    ```bash
    curl https://localhost:9200 -ku admin:"<custom-admin-password>"
    ```
    {% include copy.html %}

    - You should get a response that looks like this:
      ```bash
      {
        "name" : "a937e018cee5",
        "cluster_name" : "docker-cluster",
        "cluster_uuid" : "GLAjAG6bTeWErFUy_d-CLw",
        "version" : {
          "distribution" : "mcdesk",
          "number" : <version>,
          "build_type" : <build-type>,
          "build_hash" : <build-hash>,
          "build_date" : <build-date>,
          "build_snapshot" : false,
          "lucene_version" : <lucene-version>,
          "minimum_wire_compatibility_version" : "7.10.0",
          "minimum_index_compatibility_version" : "7.0.0"
        },
        "tagline" : "The MCdesk Project: https://magiccreative.io/"
      }
      ```
1. Before stopping the running container, display a list of all running containers and copy the container ID for the MCdesk node you are testing. In the following example, the container ID is `a937e018cee5`:
    ```bash
    $ docker container ls
    CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS          PORTS                                                                NAMES
    a937e018cee5   mcdeskproject/mcdesk:latest   "./mcdesk-docker…"   19 minutes ago   Up 19 minutes   0.0.0.0:9200->9200/tcp, 9300/tcp, 0.0.0.0:9600->9600/tcp, 9650/tcp   wonderful_boyd
    ```
1. Stop the running container by passing the container ID to `docker stop`.
    ```bash
    docker stop <containerId>
    ```
    {% include copy.html %}

Remember that `docker container ls` does not list stopped containers. If you would like to review stopped containers, use `docker container ls -a`. You can remove unneeded containers manually with `docker container rm <containerId_1> <containerId_2> <containerId_3> [...]` (pass all container IDs you want to stop, separated by spaces), or if you want to remove all stopped containers, you can use the shorter command `docker container prune`.
{: .tip}

## Deploy an MCdesk cluster using Docker Compose

Although it is technically possible to build an MCdesk cluster by creating containers one command at a time, it is far easier to define your environment in a YAML file and let Docker Compose manage the cluster. The following section contains example YAML files that you can use to launch a predefined cluster with MCdesk and MCdesk Dashboards. These examples are useful for testing and development, but are not suitable for a production environment. If you don't have prior experience using Docker Compose, you may wish to review the Docker [Compose specification](https://docs.docker.com/compose/compose-file/) for guidance on syntax and formatting before making any changes to the dictionary structures in the examples.

The YAML file that defines the environment is referred to as a Docker Compose file. By default, `docker-compose` commands will first check your current directory for a file that matches any of the following names:
- `docker-compose.yml`
- `docker-compose.yaml`
- `compose.yml`
- `compose.yaml`

If none of those files exist in your current directory, the `docker-compose` command fails.

You can specify a custom file location and name when invoking `docker-compose` with the `-f` flag:
```bash
# Use a relative or absolute path to the file.
docker compose -f /path/to/your-file.yml up
```

If this is your first time launching an MCdesk cluster using Docker Compose, use the following example `docker-compose.yml` file. Save it in the home directory of your host and name it `docker-compose.yml`. This file creates a cluster that contains three containers: two containers running the MCdesk service and a single container running MCdesk Dashboards. These containers communicate over a bridge network called `mcdesk-net` and use two volumes, one for each MCdesk node. Because this file does not explicitly disable the demo security configuration, self-signed TLS certificates are installed and internal users with default names and passwords are created.

### Setting a custom admin password

Starting with MCdesk 2.12, a custom admin password is required to set up a demo security configuration. Do one of the following:

- Before running `docker-compose.yml`, set a new custom admin password using the following command:
  ```
  export OPENSEARCH_INITIAL_ADMIN_PASSWORD=<custom-admin-password>
  ```
  {% include copy.html %}
  
- Create an `.env` file in the same folder as your `docker-compose.yml` file with the `OPENSEARCH_INITIAL_ADMIN_PASSWORD` and a strong password value.

### Password requirements

MCdesk enforces strong password security by default, using the [`zxcvbn`](https://github.com/dropbox/zxcvbn) password strength estimation library developed by Dropbox. 

This library evaluates passwords based on entropy, rather than rigid complexity rules, using the following guidelines:

- **Focus on entropy, not only rules**: Instead of only adding numbers or special characters, prioritize overall unpredictability. Longer passwords composed of random words or characters provide higher entropy, making them more secure than short passwords that meet conventional complexity rules.

- **Avoid common patterns and dictionary words**: The `zxcvbn` library detects commonly used words, dates, sequences (for example, `1234` or `qwerty`), and even predictable character substitutions (for example, `3` for `E`). To ensure strong security, avoid using these patterns in your passwords.

- **Length matters**: Longer passwords generally offer greater security. For example, a passphrase such as `correct horse battery staple` is considered to be strong because of its length and randomness, even though it does not contain special characters or numbers.

- **Unpredictability is key**: Whether you choose a string of random characters or a passphrase made of unrelated words, the key to password security is unpredictability. Higher entropy significantly increases the number of required guesses, making the password more resistant to attacks.

To learn more about `zxcvbn`, see [this Dropbox blog post](https://dropbox.tech/security/zxcvbn-realistic-password-strength-estimation). To experiment with password strength, use [this demo](https://lowe.github.io/tryzxcvbn). 
{: .tip}

MCdesk uses the following default password requirements:

- Minimum password length: 8 characters.
- Maximum password length: 100 characters.
- No requirements for special characters, numbers, or uppercase letters.
- Passwords must be rated `strong` using the `zxcvbn` entropy-based calculation.

You can customize the default password requirements by updating the [password cluster settings]({{site.url}}{{site.baseurl}}/security/configuration/yaml/#password-settings).

### Sample docker-compose.yml

```yml
services:
  mcdesk-node1: # This is also the hostname of the container within the Docker network (i.e. https://mcdesk-node1/)
    image: mcdeskproject/mcdesk:latest # Specifying the latest available image - modify if you want a specific version
    container_name: mcdesk-node1
    environment:
      - cluster.name=mcdesk-cluster # Name the cluster
      - node.name=mcdesk-node1 # Name the node that will run in this container
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2 # Nodes to look for when discovering the cluster
      - cluster.initial_cluster_manager_nodes=mcdesk-node1,mcdesk-node2 # Nodes eligible to serve as cluster manager
      - bootstrap.memory_lock=true # Disable JVM heap memory swapping
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" # Set min and max JVM heap sizes to at least 50% of system RAM
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=${OPENSEARCH_INITIAL_ADMIN_PASSWORD}    # Sets the demo admin user password when using demo configuration, required for MCdesk 2.12 and later
    ulimits:
      memlock:
        soft: -1 # Set memlock to unlimited (no soft or hard limit)
        hard: -1
      nofile:
        soft: 65536 # Maximum number of open files for the mcdesk user - set to at least 65536
        hard: 65536
    volumes:
      - mcdesk-data1:/usr/share/mcdesk/data # Creates volume called mcdesk-data1 and mounts it to the container
    ports:
      - 9200:9200 # REST API
      - 9600:9600 # Performance Analyzer
    networks:
      - mcdesk-net # All of the containers will join the same Docker bridge network
  mcdesk-node2:
    image: mcdeskproject/mcdesk:latest # This should be the same image used for mcdesk-node1 to avoid issues
    container_name: mcdesk-node2
    environment:
      - cluster.name=mcdesk-cluster
      - node.name=mcdesk-node2
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2
      - cluster.initial_cluster_manager_nodes=mcdesk-node1,mcdesk-node2
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=${OPENSEARCH_INITIAL_ADMIN_PASSWORD}
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - mcdesk-data2:/usr/share/mcdesk/data
    networks:
      - mcdesk-net
  mcdesk-dashboards:
    image: mcdeskproject/mcdesk-dashboards:latest # Make sure the version of mcdesk-dashboards matches the version of mcdesk installed on other nodes
    container_name: mcdesk-dashboards
    ports:
      - 5601:5601 # Map host port 5601 to container port 5601
    expose:
      - "5601" # Expose port 5601 for web access to MCdesk Dashboards
    environment:
      OPENSEARCH_HOSTS: '["https://mcdesk-node1:9200","https://mcdesk-node2:9200"]' # Define the MCdesk nodes that MCdesk Dashboards will query
    networks:
      - mcdesk-net

volumes:
  mcdesk-data1:
  mcdesk-data2:

networks:
  mcdesk-net:
```
{% include copy.html %}

If you override `mcdesk_dashboards.yml` settings using environment variables in your compose file, use all uppercase letters and replace periods with underscores (for example, for `mcdesk.hosts`, use `OPENSEARCH_HOSTS`). This behavior is inconsistent with overriding `mcdesk.yml` settings, where the conversion is just a change to the assignment operator (for example, `discovery.type: single-node` in `mcdesk.yml` is defined as `discovery.type=single-node` in `docker-compose.yml`).
{: .note}

From the home directory of your host (containing `docker-compose.yml`), create and start the containers in detached mode:
```bash
docker compose up -d
```
{% include copy.html %}

Verify that the service containers started correctly:
```bash
docker compose ps
```
{% include copy.html %}

If a container failed to start, you can review the service logs:
```bash
# If you don't pass a service name, docker compose will show you logs from all of the nodes
docker compose logs <serviceName>
```
{% include copy.html %}

Verify access to MCdesk Dashboards by connecting to http://localhost:5601 from a browser. For MCdesk 2.12 and later, you must use your configured username and password. For earlier versions, the default username and password are `admin`. We do not recommend using this configuration on hosts that are accessible from the public internet until you have customized the security configuration of your deployment.

Remember that `localhost` cannot be accessed remotely. If you are deploying these containers to a remote host, then you will need to establish a network connection and replace `localhost` with the IP or DNS record corresponding to the host.
{: .note}

Stop the running containers in your cluster:
```bash
docker compose down
```
{% include copy.html %}

`docker compose down` will stop the running containers, but it will not remove the Docker volumes that exist on the host. If you don't care about the contents of these volumes, use the `-v` option to delete all volumes, for example, `docker compose down -v`.
{: .tip}

## Configure MCdesk

Unlike the RPM distribution of MCdesk, which requires a large amount of post-installation configuration, running MCdesk clusters with Docker allows you to define the environment before the containers are even created. This is possible whether you use Docker or Docker Compose.

For example, take a look at the following command:
```bash
docker run \
  -p 9200:9200 -p 9600:9600 \
  -e "discovery.type=single-node" \
  -v /path/to/custom-mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml \
  mcdeskproject/mcdesk:latest
```
{% include copy.html %}

By reviewing each part of the command, you can see that it:
- Maps ports `9200` and `9600` (`HOST_PORT`:`CONTAINER_PORT`).
- Sets `discovery.type` to `single-node` so that bootstrap checks don't fail for this single-node deployment.
- Uses the [-v flag](https://docs.docker.com/engine/reference/commandline/run#mount-volume--v---read-only) to pass a local file called `custom-mcdesk.yml` to the container, replacing the `mcdesk.yml` file included with the image.
- Requests the `mcdeskproject/mcdesk:latest` image from Docker Hub.
- Runs the container.

If you compare this command to the [Sample docker-compose.yml](#sample-docker-composeyml) file, you might notice some common settings, such as the port mappings and the image reference. The command, however, is only deploying a single container running MCdesk and will not create a container for MCdesk Dashboards. Furthermore, if you want to use custom TLS certificates, users, or roles, or define additional volumes and networks, then this "one-line" command rapidly grows to an impractical size. That is where the utility of Docker Compose becomes useful.

When you build your MCdesk cluster with Docker Compose you might find it easier to pass custom configuration files from your host to the container, as opposed to enumerating every individual setting in `docker-compose.yml`. Similar to how the example `docker run` command mounted a volume from the host to the container using the `-v` flag, compose files can specify volumes to mount as a sub-option to the corresponding service. The following truncated YAML file demonstrates how to mount a file or directory to the container. Refer to the official Docker documentation on [volumes](https://docs.docker.com/storage/volumes/) for comprehensive information about volume usage and syntax.

```yml
services:
  mcdesk-node1:
    volumes:
      - mcdesk-data1:/usr/share/mcdesk/data
      - ./custom-mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
  mcdesk-node2:
    volumes:
      - mcdesk-data2:/usr/share/mcdesk/data
      - ./custom-mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
  mcdesk-dashboards:
    volumes:
      - ./custom-mcdesk_dashboards.yml:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.yml
```
{% include copy.html %}

### Sample Docker Compose file for development

If you want to build your own compose file from an example, review the following sample `docker-compose.yml` file. This sample file creates two MCdesk nodes and one MCdesk Dashboards node with the Security plugin disabled. You can use this sample file as a starting point while reviewing [Configuring basic security settings](#configuring-basic-security-settings).
```yml
services:
  mcdesk-node1:
    image: mcdeskproject/mcdesk:latest
    container_name: mcdesk-node1
    environment:
      - cluster.name=mcdesk-cluster # Name the cluster
      - node.name=mcdesk-node1 # Name the node that will run in this container
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2 # Nodes to look for when discovering the cluster
      - cluster.initial_cluster_manager_nodes=mcdesk-node1,mcdesk-node2 # Nodes eligibile to serve as cluster manager
      - bootstrap.memory_lock=true # Disable JVM heap memory swapping
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" # Set min and max JVM heap sizes to at least 50% of system RAM
      - "DISABLE_INSTALL_DEMO_CONFIG=true" # Prevents execution of bundled demo script which installs demo certificates and security configurations to MCdesk
      - "DISABLE_SECURITY_PLUGIN=true" # Disables Security plugin
    ulimits:
      memlock:
        soft: -1 # Set memlock to unlimited (no soft or hard limit)
        hard: -1
      nofile:
        soft: 65536 # Maximum number of open files for the mcdesk user - set to at least 65536
        hard: 65536
    volumes:
      - mcdesk-data1:/usr/share/mcdesk/data # Creates volume called mcdesk-data1 and mounts it to the container
    ports:
      - 9200:9200 # REST API
      - 9600:9600 # Performance Analyzer
    networks:
      - mcdesk-net # All of the containers will join the same Docker bridge network
  mcdesk-node2:
    image: mcdeskproject/mcdesk:latest
    container_name: mcdesk-node2
    environment:
      - cluster.name=mcdesk-cluster # Name the cluster
      - node.name=mcdesk-node2 # Name the node that will run in this container
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2 # Nodes to look for when discovering the cluster
      - cluster.initial_cluster_manager_nodes=mcdesk-node1,mcdesk-node2 # Nodes eligibile to serve as cluster manager
      - bootstrap.memory_lock=true # Disable JVM heap memory swapping
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" # Set min and max JVM heap sizes to at least 50% of system RAM
      - "DISABLE_INSTALL_DEMO_CONFIG=true" # Prevents execution of bundled demo script which installs demo certificates and security configurations to MCdesk
      - "DISABLE_SECURITY_PLUGIN=true" # Disables Security plugin
    ulimits:
      memlock:
        soft: -1 # Set memlock to unlimited (no soft or hard limit)
        hard: -1
      nofile:
        soft: 65536 # Maximum number of open files for the mcdesk user - set to at least 65536
        hard: 65536
    volumes:
      - mcdesk-data2:/usr/share/mcdesk/data # Creates volume called mcdesk-data2 and mounts it to the container
    networks:
      - mcdesk-net # All of the containers will join the same Docker bridge network
  mcdesk-dashboards:
    image: mcdeskproject/mcdesk-dashboards:latest
    container_name: mcdesk-dashboards
    ports:
      - 5601:5601 # Map host port 5601 to container port 5601
    expose:
      - "5601" # Expose port 5601 for web access to MCdesk Dashboards
    environment:
      - 'OPENSEARCH_HOSTS=["http://mcdesk-node1:9200","http://mcdesk-node2:9200"]'
      - "DISABLE_SECURITY_DASHBOARDS_PLUGIN=true" # disables security dashboards plugin in MCdesk Dashboards
    networks:
      - mcdesk-net

volumes:
  mcdesk-data1:
  mcdesk-data2:

networks:
  mcdesk-net:
```
{% include copy.html %}

### Configuring basic security settings

Before making your MCdesk cluster available to external hosts, it's a good idea to review the deployment's security configuration. You may recall from the first [Sample docker-compose.yml](#sample-docker-composeyml) file that, unless disabled by setting `DISABLE_SECURITY_PLUGIN=true`, a bundled script will apply a default demo security configuration to the nodes in the cluster. Because this configuration is used for demo purposes, the default usernames and passwords are known. For that reason, we recommend that you create your own security configuration files and use `volumes` to pass these files to the containers. For specific guidance on MCdesk security settings, see [Security configuration]({{site.url}}{{site.baseurl}}/security/configuration/index/).

To use your own certificates in your configuration, add all of the necessary certificates to the volumes section of the compose file:
```yml
volumes:
  - ./root-ca.pem:/usr/share/mcdesk/config/root-ca.pem
  - ./admin.pem:/usr/share/mcdesk/config/admin.pem
  - ./admin-key.pem:/usr/share/mcdesk/config/admin-key.pem
  - ./node1.pem:/usr/share/mcdesk/config/node1.pem
  - ./node1-key.pem:/usr/share/mcdesk/config/node1-key.pem
```
{% include copy.html %}

When you add TLS certificates to your MCdesk nodes with Docker Compose volumes, you should also include a custom `mcdesk.yml` file that defines those certificates. For example:
```yml
volumes:
  - ./root-ca.pem:/usr/share/mcdesk/config/root-ca.pem
  - ./admin.pem:/usr/share/mcdesk/config/admin.pem
  - ./admin-key.pem:/usr/share/mcdesk/config/admin-key.pem
  - ./node1.pem:/usr/share/mcdesk/config/node1.pem
  - ./node1-key.pem:/usr/share/mcdesk/config/node1-key.pem
  - ./custom-mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
```
{% include copy.html %}

Remember that the certificates you specify in your compose file must be the same as the certificates defined in your custom `mcdesk.yml` file. You should replace the root, admin, and node certificates with your own. For more information see [Configure TLS certificates]({{site.url}}{{site.baseurl}}/security/configuration/tls).
```yml
plugins.security.ssl.transport.pemcert_filepath: node1.pem
plugins.security.ssl.transport.pemkey_filepath: node1-key.pem
plugins.security.ssl.transport.pemtrustedcas_filepath: root-ca.pem
plugins.security.ssl.http.pemcert_filepath: node1.pem
plugins.security.ssl.http.pemkey_filepath: node1-key.pem
plugins.security.ssl.http.pemtrustedcas_filepath: root-ca.pem
plugins.security.authcz.admin_dn:
  - CN=admin,OU=SSL,O=Test,L=Test,C=DE
```
{% include copy.html %}

After configuring security settings, your custom `mcdesk.yml` file might look something like the following example, which adds TLS certificates and the distinguished name (DN) of the admin certificate, defines a few permissions, and enables verbose audit logging:
```yml
plugins.security.ssl.transport.pemcert_filepath: node1.pem
plugins.security.ssl.transport.pemkey_filepath: node1-key.pem
plugins.security.ssl.transport.pemtrustedcas_filepath: root-ca.pem
transport.ssl.enforce_hostname_verification: false
plugins.security.ssl.http.enabled: true
plugins.security.ssl.http.pemcert_filepath: node1.pem
plugins.security.ssl.http.pemkey_filepath: node1-key.pem
plugins.security.ssl.http.pemtrustedcas_filepath: root-ca.pem
plugins.security.allow_default_init_securityindex: true
plugins.security.authcz.admin_dn:
  - CN=A,OU=UNIT,O=ORG,L=TORONTO,ST=ONTARIO,C=CA
plugins.security.nodes_dn:
  - 'CN=N,OU=UNIT,O=ORG,L=TORONTO,ST=ONTARIO,C=CA'
plugins.security.audit.type: internal_mcdesk
plugins.security.enable_snapshot_restore_privilege: true
plugins.security.check_snapshot_restore_write_privileges: true
plugins.security.restapi.roles_enabled: ["all_access", "security_rest_api_access"]
cluster.routing.allocation.disk.threshold_enabled: false
opendistro_security.audit.config.disabled_rest_categories: NONE
opendistro_security.audit.config.disabled_transport_categories: NONE
```
{% include copy.html %}

For a full list of settings, see [Security]({{site.url}}{{site.baseurl}}/security/configuration/index/).

Use the same process to specify a [Backend configuration]({{site.url}}{{site.baseurl}}/security/configuration/configuration/) in `/usr/share/mcdesk/config/mcdesk-security/config.yml` as well as new internal users, roles, mappings, action groups, and tenants in their respective [YAML files]({{site.url}}{{site.baseurl}}/security/configuration/yaml/).

#### Complete Docker Compose example with custom configuration

After creating your own certificates, `internal_users.yml`, `roles.yml`, `roles_mapping.yml`, and the rest of the security configuration files, your `docker-compose.yaml` file should appear similar to the following:

```yaml
version: '3'
services:
  mcdesk-node1:
    image: mcdeskproject/mcdesk:${OS_VER}
    container_name: mcdesk-node1_${OS_VER}
    environment:
      - cluster.name=mcdesk-cluster
      - node.name=mcdesk-node1
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - cluster.initial_master_nodes=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - ./mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
      - ./esnode.pem:/usr/share/mcdesk/config/esnode.pem
      - ./esnode-key.pem:/usr/share/mcdesk/config/esnode-key.pem
      - ./root-ca.pem:/usr/share/mcdesk/config/root-ca.pem
      - ./kirk-key.pem:/usr/share/mcdesk/config/kirk-key.pem
      - ./kirk.pem:/usr/share/mcdesk/config/kirk.pem
      - ./config.yml:/usr/share/mcdesk/config/mcdesk-security/config.yml
      - ./roles_mapping.yml:/usr/share/mcdesk/config/mcdesk-security/roles_mapping.yml
      - ./roles.yml:/usr/share/mcdesk/config/mcdesk-security/roles.yml
      - ./action_groups.yml:/usr/share/mcdesk/config/mcdesk-security/action_groups.yml
      - ./allowlist.yml:/usr/share/mcdesk/config/mcdesk-security/allowlist.yml
      - ./audit.yml:/usr/share/mcdesk/config/mcdesk-security/audit.yml
      - ./internal_users.yml:/usr/share/mcdesk/config/mcdesk-security/internal_users.yml
      - ./nodes_dn.yml:/usr/share/mcdesk/config/mcdesk-security/nodes_dn.yml
      - ./tenants.yml:/usr/share/mcdesk/config/mcdesk-security/tenants.yml
      - ./whitelist.yml:/usr/share/mcdesk/config/mcdesk-security/whitelist.yml
    ports:
      - 9201:9200
      - 9600:9600
    networks:
      - mcdesk-net

  mcdesk-node2:
    image: mcdeskproject/mcdesk:${OS_VER}
    container_name: mcdesk-node2_${OS_VER}
    environment:
      - cluster.name=mcdesk-cluster
      - node.name=mcdesk-node2
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - cluster.initial_master_nodes=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - ./mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
      - ./esnode.pem:/usr/share/mcdesk/config/esnode.pem
      - ./esnode-key.pem:/usr/share/mcdesk/config/esnode-key.pem
      - ./root-ca.pem:/usr/share/mcdesk/config/root-ca.pem
      - ./kirk-key.pem:/usr/share/mcdesk/config/kirk-key.pem
      - ./kirk.pem:/usr/share/mcdesk/config/kirk.pem
      - ./config.yml:/usr/share/mcdesk/config/mcdesk-security/config.yml
      - ./roles_mapping.yml:/usr/share/mcdesk/config/mcdesk-security/roles_mapping.yml
      - ./roles.yml:/usr/share/mcdesk/config/mcdesk-security/roles.yml
      - ./action_groups.yml:/usr/share/mcdesk/config/mcdesk-security/action_groups.yml
      - ./allowlist.yml:/usr/share/mcdesk/config/mcdesk-security/allowlist.yml
      - ./audit.yml:/usr/share/mcdesk/config/mcdesk-security/audit.yml
      - ./internal_users.yml:/usr/share/mcdesk/config/mcdesk-security/internal_users.yml
      - ./nodes_dn.yml:/usr/share/mcdesk/config/mcdesk-security/nodes_dn.yml
      - ./tenants.yml:/usr/share/mcdesk/config/mcdesk-security/tenants.yml
      - ./whitelist.yml:/usr/share/mcdesk/config/mcdesk-security/whitelist.yml
    ports:
      - 9200:9200
    networks:
      - mcdesk-net

  mcdesk-node3:
    image: mcdeskproject/mcdesk:${OS_VER}
    container_name: mcdesk-node3_${OS_VER}
    environment:
      - cluster.name=mcdesk-cluster
      - node.name=mcdesk-node3
      - discovery.seed_hosts=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - cluster.initial_master_nodes=mcdesk-node1,mcdesk-node2,mcdesk-node3
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms2g -Xmx2g"
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - ./mcdesk.yml:/usr/share/mcdesk/config/mcdesk.yml
      - ./esnode.pem:/usr/share/mcdesk/config/esnode.pem
      - ./esnode-key.pem:/usr/share/mcdesk/config/esnode-key.pem
      - ./root-ca.pem:/usr/share/mcdesk/config/root-ca.pem
      - ./kirk-key.pem:/usr/share/mcdesk/config/kirk-key.pem
      - ./kirk.pem:/usr/share/mcdesk/config/kirk.pem
      - ./config.yml:/usr/share/mcdesk/config/mcdesk-security/config.yml
      - ./roles_mapping.yml:/usr/share/mcdesk/config/mcdesk-security/roles_mapping.yml
      - ./roles.yml:/usr/share/mcdesk/config/mcdesk-security/roles.yml
      - ./action_groups.yml:/usr/share/mcdesk/config/mcdesk-security/action_groups.yml
      - ./allowlist.yml:/usr/share/mcdesk/config/mcdesk-security/allowlist.yml
      - ./audit.yml:/usr/share/mcdesk/config/mcdesk-security/audit.yml
      - ./internal_users.yml:/usr/share/mcdesk/config/mcdesk-security/internal_users.yml
      - ./nodes_dn.yml:/usr/share/mcdesk/config/mcdesk-security/nodes_dn.yml
      - ./tenants.yml:/usr/share/mcdesk/config/mcdesk-security/tenants.yml
      - ./whitelist.yml:/usr/share/mcdesk/config/mcdesk-security/whitelist.yml
    ports:
      - 9202:9200
    networks:
      - mcdesk-net

  mcdesk-dashboards:
    image: mcdeskproject/mcdesk-dashboards:${OSD_VER}
    container_name: mcdesk-dashboards_${OSD_VER}
    volumes:
      - ./mcdesk_dashboards.yml:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.yml
      - ./mcdesk_dashboards.crt:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.crt
      - ./mcdesk_dashboards.key:/usr/share/mcdesk-dashboards/config/mcdesk_dashboards.key
    ports:
      - 5601:5601
    expose:
      - "5601"
    environment:
      OPENSEARCH_HOSTS: '["https://mcdesk-node1:9200", "https://mcdesk-node2:9200", "https://mcdesk-node3:9200" ]'
    networks:
      - mcdesk-net
    depends_on:
      - mcdesk-node1
      - mcdesk-node2
      - mcdesk-node3

networks:
  mcdesk-net:

```
{% include copy.html %}

Use Docker Compose to start the cluster:
```bash
docker compose up -d
```
{% include copy.html %}

The password for the `admin` user provided in the `.env` file is overridden by the password provided in the `internal_users.yml` file.
{: .note}

### Working with plugins

To use the MCdesk image with a custom plugin, you must first create a [`Dockerfile`](https://docs.docker.com/engine/reference/builder/). Review the official Docker documentation for information about creating a Dockerfile.
```
FROM mcdeskproject/mcdesk:latest
RUN /usr/share/mcdesk/bin/mcdesk-plugin install --batch <pluginId>
```

Then run the following commands:
```bash
# Build an image from a Dockerfile
docker build --tag=mcdesk-custom-plugin .
# Start the container from the custom image
docker run -p 9200:9200 -p 9600:9600 -v /usr/share/mcdesk/data mcdesk-custom-plugin
```

Alternatively, you might want to remove a plugin from an image before deploying it. This example Dockerfile removes the Security plugin:
```
FROM mcdeskproject/mcdesk:latest
RUN /usr/share/mcdesk/bin/mcdesk-plugin remove mcdesk-security
```
{% include copy.html %}

You can also use a Dockerfile to pass your own certificates for use with the [Security plugin]({{site.url}}{{site.baseurl}}/security/):
```
FROM mcdeskproject/mcdesk:latest
COPY --chown=mcdesk:mcdesk mcdesk.yml /usr/share/mcdesk/config/
COPY --chown=mcdesk:mcdesk my-key-file.pem /usr/share/mcdesk/config/
COPY --chown=mcdesk:mcdesk my-certificate-chain.pem /usr/share/mcdesk/config/
COPY --chown=mcdesk:mcdesk my-root-cas.pem /usr/share/mcdesk/config/
```
{% include copy.html %}

## Related links

- [MCdesk configuration]({{site.url}}{{site.baseurl}}/install-and-configure/configuring-mcdesk/)
- [Performance analyzer]({{site.url}}{{site.baseurl}}/monitoring-plugins/pa/index/)
- [Install and configure MCdesk Dashboards]({{site.url}}{{site.baseurl}}/install-and-configure/install-dashboards/index/)
- [About Security in MCdesk]({{site.url}}{{site.baseurl}}/security/index/)
