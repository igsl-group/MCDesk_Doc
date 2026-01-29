---
layout: default
title: Installing
nav_order: 5
grand_parent: User guide
parent: Install and configure MCdesk Benchmark
redirect_from:
  - /benchmark/installing-benchmark/
  - /benchmark/user-guide/installing-benchmark/
---

# Installing MCdesk Benchmark

You can install MCdesk Benchmark directly on a host running Linux or macOS, or you can run MCdesk Benchmark in a Docker container on any compatible host. This page provides general considerations for your MCdesk Benchmark host as well as instructions for installing MCdesk Benchmark.


## Choosing appropriate hardware

MCdesk Benchmark can be used to provision MCdesk nodes for testing. If you intend to use MCdesk Benchmark to provision nodes in your environment, then install MCdesk Benchmark directly on each host in the cluster. Additionally, you must configure each host in the cluster for MCdesk. See [Installing MCdesk]({{site.url}}{{site.baseurl}}/install-and-configure/install-mcdesk/index/) for guidance on important host settings.

Remember that MCdesk Benchmark cannot be used to provision MCdesk nodes when you run MCdesk Benchmark in a Docker container. If you want to use MCdesk Benchmark to provision nodes, or if you want to distribute the benchmark workload with the MCdesk Benchmark daemon, then you must install MCdesk Benchmark directly on each host using Python and pip.
{: .important}

When you select a host, you should also think about which workloads you want to run. To see a list of default benchmark workloads, visit the [mcdesk-benchmark-workloads](https://github.com/igsl-group/mcdesk-benchmark-workloads) repository on GitHub. As a general rule, make sure that the MCdesk Benchmark host has enough free storage space to store the compressed data and the fully decompressed data corpus once MCdesk Benchmark is installed.

If you want to benchmark with a default workload, then use the following table to determine the approximate minimum amount of required free space needed by adding the compressed size with the uncompressed size.

| Workload name | Document count | Compressed size | Uncompressed size |
| :----: | :----: | :----: | :----: |
| eventdata | 20,000,000 | 756.0 MB | 15.3 GB |
| geonames | 11,396,503 | 252.9 MB | 3.3 GB |
| geopoint | 60,844,404 | 482.1 MB | 2.3 GB |
| geopointshape | 60,844,404 | 470.8 MB | 2.6 GB |
| geoshape | 60,523,283 | 13.4 GB | 45.4 GB |
| http_logs | 247,249,096 | 1.2 GB | 31.1 GB |
| nested | 11,203,029 | 663.3 MB | 3.4 GB |
| noaa | 33,659,481 | 949.4 MB | 9.0 GB |
| nyc_taxis | 165,346,692 | 4.5 GB | 74.3 GB |
| percolator | 2,000,000 | 121.1 kB | 104.9 MB |
| pmc | 574,199 | 5.5 GB | 21.7 GB |
| so | 36,062,278 | 8.9 GB | 33.1 GB |

Your MCdesk Benchmark host should use solid-state drives (SSDs) for storage because they perform read and write operations significantly faster than traditional spinning-disk hard drives. Spinning-disk hard drives can introduce performance bottlenecks, which can make benchmark results unreliable and inconsistent.
{: .tip}

## Installing on Linux and macOS

If you want to run MCdesk Benchmark in a Docker container, see [Installing with Docker](#installing-with-docker). The MCdesk Benchmark Docker image includes all of the required software, so there are no additional steps required.
{: .important}

To install MCdesk Benchmark directly on a UNIX host, such as Linux or macOS, make sure you have **Python 3.8 or later** installed.

If you need help installing Python, refer to the official [Python Setup and Usage](https://docs.python.org/3/using/index.html) documentation.

### Checking software dependencies

Before you begin installing MCdesk Benchmark, check the following software dependencies.

Use [pyenv](https://github.com/pyenv/pyenv) to manage multiple versions of Python on your host. This is especially useful if your "system" version of Python is earlier than version 3.8.
{: .tip}

- Check that Python 3.8 or later is installed:

  ```bash
  python3 --version
  ```
  {% include copy.html %}

- Check that `pip` is installed and functional:

  ```bash
  pip --version
  ```
  {% include copy.html %}

- _Optional_: Check that your installed version of `git` is **Git 1.9 or later** using the following command. `git` is not required for MCdesk Benchmark installation, but it is required in order to fetch benchmark workload resources from a repository when you want to perform tests. See the official Git [documentation](https://git-scm.com/doc) for help installing Git.

  ```bash
  git --version
  ```
  {% include copy.html %}

### Completing the installation

After the required software is installed, you can install MCdesk Benchmark using the following command:

```bash
pip install mcdesk-benchmark
```
{% include copy.html %}

After the installation completes, you can use the following command to display help information:

```bash
mcdesk-benchmark -h
```
{% include copy.html %}


Now that MCdesk Benchmark is installed on your host, you can learn about [Configuring MCdesk Benchmark]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/).

## Installing with Docker

You can find the official Docker images for MCdesk Benchmark on [Docker Hub](https://hub.docker.com/r/mcdeskproject/mcdesk-benchmark) or on the [Amazon ECR Public Gallery](https://gallery.ecr.aws/mcdeskproject/mcdesk-benchmark).


### Docker limitations

Some MCdesk Benchmark functionality is unavailable when you run MCdesk Benchmark in a Docker container. Specifically, the following restrictions apply:

- MCdesk Benchmark cannot distribute load from multiple hosts, such as load worker coordinator hosts.
- MCdesk Benchmark cannot provision MCdesk nodes and can only run tests on previously existing clusters. You can only invoke MCdesk Benchmark commands using the `benchmark-only` pipeline.

### Pulling the Docker images

To pull the image from Docker Hub, run the following command:

```bash
docker pull mcdeskproject/mcdesk-benchmark:latest
```
{% include copy.html %}

To pull the image from Amazon Elastic Container Registry (Amazon ECR):

```bash
docker pull public.ecr.aws/mcdeskproject/mcdesk-benchmark:latest
```
{% include copy.html %}

### Running MCdesk Benchmark with Docker

To run MCdesk Benchmark, use `docker run` to launch a container. MCdesk Benchmark subcommands are passed as arguments when you start the container. MCdesk Benchmark then processes the command and stops the container after the requested operation completes.

For example, the following command prints the help text for MCdesk Benchmark to the command line and then stops the container:

```bash
docker run mcdeskproject/mcdesk-benchmark -h
```
{% include copy.html %}

### Establishing volume persistence in a Docker container

To ensure that your benchmark data and logs persist after your Docker container stops, you must mount a local directory as a volume when running MCdesk Benchmark in Docker.

Use the `-v` option to specify a local directory to mount and a directory in the container where the volume is attached.

The following example mounts a volume from the user's home directory to the MCdesk Benchmark container's default benchmark data path at `/mcdesk-benchmark/.benchmark` and then runs a test benchmark using the `geonames` workload:

```bash
docker run -v $HOME/benchmarks:/mcdesk-benchmark/.benchmark mcdeskproject/mcdesk-benchmark run --target-hosts https://198.51.100.25:9200 --pipeline benchmark-only --workload geonames --client-options basic_auth_user:admin,basic_auth_password:admin,verify_certs:false --test-mode
```
{% include copy.html %}

By default, the MCdesk Benchmark container runs as the `benchmark` user with a home directory of `/mcdesk-benchmark`, so `$HOME/.benchmark` resolves to `/mcdesk-benchmark/.benchmark`.
{: .note}

#### Running MCdesk Benchmark as the root user

If you run the container as the `root` user, then the effective home directory becomes `/root`, and the benchmark path becomes `/root/.benchmark`. In this case, specify the volume mount accordingly:

```bash
docker run -v $HOME/benchmarks:/root/.benchmark mcdeskproject/mcdesk-benchmark run --target-hosts https://198.51.100.25:9200 --pipeline benchmark-only --workload geonames --client-options basic_auth_user:admin,basic_auth_password:admin,verify_certs:false --test-mode
```
{% include copy.html %}

To learn more about the files and subdirectories located in `/mcdesk-benchmark/.benchmark`, see [Configuring MCdesk Benchmark]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/).

## Provisioning an MCdesk cluster with a test

MCdesk Benchmark is compatible with JDK versions 17, 16, 15, 14, 13, 12, 11, and 8.
{: .note}

If you installed MCdesk with PyPi, you can also provision a new MCdesk cluster by specifying a `distribution-version` in the `run` command.

If you plan on having Benchmark provision a cluster, you'll need to inform Benchmark of the location of the `JAVA_HOME` path for the Benchmark cluster. To set the `JAVA_HOME` path and provision a cluster:

1. Find the `JAVA_HOME` path you're currently using. Open a terminal and enter `/usr/libexec/java_home`.

2. Set your corresponding JDK version environment variable by entering the path from the previous step. Enter `export JAVA17_HOME=<Java Path>`.

3. Run the `run` command and indicate the distribution version of MCdesk you want to use:

  ```bash
  mcdesk-benchmark run --distribution-version=2.3.0 --workload=geonames --test-mode
  ```

## Directory structure

After running MCdesk Benchmark for the first time, you can search through all related files, including configuration files, in the `~/.benchmark` directory. The directory includes the following file tree:

```
# ~/.benchmark Tree
.
├── benchmark.ini
├── benchmarks
│   ├── data
│   │   └── geonames
│   ├── distributions
│   │   ├── mcdesk-1.0.0-linux-x64.tar.gz
│   │   └── mcdesk-2.3.0-linux-x64.tar.gz
│   ├── test-runs
│   │   ├── 0279b13b-1e54-49c7-b1a7-cde0b303a797
│   │   └── 0279c542-a856-4e88-9cc8-04306378cd38
│   └── workloads
│       └── default
│           └── geonames
├── logging.json
├── logs
│   └── benchmark.log
```

* `benchmark.ini`: Contains any adjustable configurations for tests. For information about how to configure MCdesk Benchmark, see [Configuring MCdesk Benchmark]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/).
* `data`: Contains all the data corpora and documents related to MCdesk Benchmark's [official workloads](https://github.com/igsl-group/mcdesk-benchmark-workloads/tree/main/geonames).
* `distributions`: Contains all the MCdesk distributions downloaded from [MCdesk.org](http://magiccreative.io/) and used to provision clusters.
* `test-runs`: Contains every test `execution_id` from previous runs of MCdesk Benchmark.
* `workloads`: Contains all files related to workloads, except for the data corpora.
* `logging.json`: Contains all of the configuration options related to how logging is performed within MCdesk Benchmark.
* `logs`: Contains all the logs from MCdesk Benchmark runs. This can be helpful when you've encountered errors during runs.


## Next steps

- [Configuring MCdesk Benchmark]({{site.url}}{{site.baseurl}}/benchmark/configuring-benchmark/)
- [Creating custom workloads]({{site.url}}{{site.baseurl}}/benchmark/creating-custom-workloads/)
