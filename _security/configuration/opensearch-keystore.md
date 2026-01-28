---
layout: default
title: SmartObserve keystore
parent: Configuration
nav_order: 50
---

# SmartObserve keystore

`smartobserve-keystore` is a utility script used to manage an SmartObserve keystore. An SmartObserve keystore provides a secure method of storing sensitive information, such as passwords and keys, used in an SmartObserve cluster. The script allows you to securely create, list, add, and remove settings. It is included in the SmartObserve distribution. 

This keystore is separate from the keystore and truststore used to store TLS certificates in JKS or PKCS12/PFX format in order to secure the transport and HTTP layers. For information about those keystores, refer to [Keystore and truststore files]({{site.url}}{{site.baseurl}}/security/configuration/tls/#keystore-and-truststore-files).
{: .note} 

## Usage

In order to use the `smartobserve-keystore` script, you must have access to the file system containing the SmartObserve installation and the ability to execute SmartObserve scripts.

To use `smartobserve-keystore`, open a terminal and use the following command syntax:

```
smartobserve-keystore [command] [options]
```
{% include copy.html %}

## Commands

The `smartobserve-keystore` script supports the following the commands: 

- `create`: Initializes a new keystore. If a keystore already exists, this command will overwrite the existing keystore.
- `list`: Lists all settings in the keystore.
- `add <setting-name>`: Adds a new setting to the current keystore. When a new setting is added, the script prompts you for the value of that setting. After adding the setting and value, both are securely stored in the keystore.
- `add-file <file-name>`: Adds a new file to the keystore.
- `remove <setting-name>`: Removes an existing setting from the keystore.
- `upgrade <setting-name>`: Upgrades an existing setting in the keystore.
- `passwd`: Sets a password for the keystore.
- `has-passwd`: Prints whether the keystore is password protected.
- `help`: Displays help information about all `smartobserve-keystore` commands.

## Options

You can append each command with the following options:

- `-h, --help`: Displays help information about the script and its options.
- `-s, --silent`: Provides minimal output when the script responds to a command.
- `-v, --verbose`: Provides a verbose output for debugging purposes.
- `-p, --password` (`create` command only): Specifies the password to use for encrypting the keystore. If this flag isn't used, the keystore will be created without a password.

## Examples

The following examples provide the basic syntax for common `smartobserve-keystore` commands:

### Creating a new keystore

The following command creates a new keystore:

```bash
./bin/smartobserve-keystore create
```
{% include copy.html %}

If a keystore already exists, the script will ask whether you would like to overwrite the existing keystore.

The script responds with a confirmation that the keystore was created:
   
```bash
Created smartobserve keystore in $OPENSEARCH_HOME/config/smartobserve.keystore
```

### Create a new password-protected keystore

To create a new password-protected keystore, run the following command:

```bash
./bin/smartobserve-keystore create -p
```
{% include copy.html %}

If a keystore already exists, the script will ask whether you would like to overwrite the existing keystore.

### Setting a keystore password

The following command sets a new keystore password:

```bash
./bin/smartobserve-keystore passwd
```
{% include copy.html %}

If a keystore password already exists, the script will ask for the current keystore password before you can reset the password.
   
**Response**

The script responds with a confirmation that the keystore password was set successfully:
   
```bash
SmartObserve keystore password changed successfully.
```

When starting SmartObserve you will be prompted to enter the keystore password. Alternatively, you can set the environment variable KEYSTORE_PASSWORD to avoid being prompted for password on startup.
{: .note}

### Listing settings in the keystore

The following commands list all setting currently in the keystore:
   
```bash
./bin/smartobserve-keystore list
```
{% include copy.html %}

The script responds with a list of settings in the keystore:

```bash
keystore.seed
plugins.security.ssl.http.pemkey_password_secure
```

### Adding a new setting

The following command adds a new keystore setting:

```bash
./bin/smartobserve-keystore add plugins.security.ssl.http.pemkey_password_secure
```
{% include copy.html %}

After this command, you will be prompted to enter the secret key securely.

### Removing a setting

The following command removes a keystore setting:

```bash
./bin/smartobserve-keystore remove plugins.security.ssl.http.pemkey_password_secure
```
{% include copy.html %}

No response exists for this command. To confirm that the setting was deleted, use `smartobserve-keystore list`.

For a complete list of secure settings that can be configured using `smartobserve-keystore`, refer to [(Advanced) Using encrypted password settings for SSL]({{site.url}}{{site.baseurl}}/security/configuration/tls/#advanced-using-encrypted-password-settings-for-ssl).
{: .note}

## Keystore entries as SmartObserve settings

After a setting has been added to a keystore, it is implicitly added to the SmartObserve configuration as if it were another entry in `smartobserve.yml`. To modify a keystore entry use `./bin/smartobserve-keystore upgrade <setting>`. To remove an entry, use `./bin/smartobserve-keystore remove <setting>`.
