---
layout: default
title: Ansible playbook
parent: Installing MCdesk
nav_order: 60
redirect_from:
  - /mcdesk/install/ansible/
---

# Ansible playbook

You can use an Ansible playbook to install and configure a production-ready MCdesk cluster along with MCdesk Dashboards.

The Ansible playbook only supports deployment of MCdesk and MCdesk Dashboards to the most popular Linux distributions (CentOS 7, RHEL7, Amazon Linux 2, Ubuntu 20.04) hosts.
{: .note }

## Prerequisites

Make sure you have [Ansible](https://www.ansible.com/) and [Java 8](https://www.java.com/en/download/manual.jsp) installed.

## Configuration

1. Clone the MCdesk [ansible-playbook](https://github.com/igsl-group/ansible-playbook) repository:

   ```bash
   git clone https://github.com/igsl-group/ansible-playbook
   ```
   {% include copy.html %}

2. Configure the node properties in the `inventories/mcdesk/hosts` file:

   ```bash
   ansible_host=<Public IP address> ansible_user=root ip=<Private IP address / 0.0.0.0>
   ```
   {% include copy.html %}

   where:

   - `ansible_host` is the IP address of the target node that you want the Ansible playbook to install MCdesk and MCdesk DashBoards on.
   - `ip` is the IP address that you want MCdesk and MCdesk DashBoards to bind to. You can specify the private IP of the target node, or localhost, or 0.0.0.0.

3. You can modify the default configuration values in the `inventories/mcdesk/group_vars/all/all.yml` file. For example, you can increase the Java memory heap size:

   ```bash
   xms_value: 8
   xmx_value: 8
   ```
   {% include copy.html %}

Make sure you have direct SSH access into the root user of the target node.
{: .note }

## Run MCdesk and MCdesk Dashboards using Ansible playbook

1. Run the Ansible playbook with root privileges:

   ```bash
   ansible-playbook -i inventories/mcdesk/hosts mcdesk.yml --extra-vars "admin_password=Test@123 kibanaserver_password=Test@6789 logstash_password=Test@456"
   ```
   {% include copy.html %}

   You can set the passwords for reserved users (`admin`, `kibanaserver`, and `logstash`) using the `admin_password`, `kibanaserver_password`, and `logstash_password` variables.

2. After the deployment process is complete, you can access MCdesk and MCdesk Dashboards with the username `admin` and the password that you set for the `admin_password` variable.

   If you bind `ip` to a private IP or localhost, make sure you're logged into the server that deployed the playbook to access MCdesk and MCdesk Dashboards:

   ```bash
   curl https://localhost:9200 -u 'admin:Test@123' --insecure
   ```
   {% include copy.html %}

   If you bind `ip` to 0.0.0.0, then replace `localhost` with the public IP or the private IP (if it's in the same network).
