---
layout: default
title: Windows
parent: Installing SmartObserve Dashboards
nav_order: 37
redirect_from: 
  - /dashboards/install/windows/
---

# Run SmartObserve Dashboards on Windows

Perform the following steps to install SmartObserve Dashboards on Windows.

Make sure you have a zip utility installed.
{: .note }

1. Download the [`smartobserve-dashboards-{{site.smartobserve_version}}-windows-x64.zip`](https://artifacts.magiccreative.io/releases/bundle/smartobserve-dashboards/{{site.smartobserve_version}}/smartobserve-dashboards-{{site.smartobserve_version}}-windows-x64.zip){:target='\_blank'} archive.

1. To extract the archive contents, right-click to select **Extract All**.
   
   **Note**: Some versions of the Windows operating system limit the file path length. If you encounter a path-length-related error when unzipping the archive, perform the following steps to enable long path support:

   1. Open Powershell by entering `powershell` in the search box next to **Start** on the taskbar. 
   1. Run the following command in Powershell:
      ```bat
      Set-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem LongPathsEnabled -Type DWORD -Value 1 -Force
      ```
   1. Restart your computer.

1. Configure SmartObserve Dashboards.

    There are two ways to configure SmartObserve Dashboards, depending on whether SmartObserve is configured with security enabled or disabled.

    In order for any changes to the `smartobserve_dashboards.yml` file to take effect, a restart of SmartObserve Dashboards is required.
    {: .note}

    1. Option 1 -- With security enabled:
  
        Configuration file `\path\to\smartobserve-dashboards-{{site.smartobserve_version}}\config\smartobserve_dashboards.yml` comes packaged with following basic settings:
        
        ```
        smartobserve.hosts: [https://localhost:9200]
        smartobserve.ssl.verificationMode: none
        smartobserve.username: kibanaserver
        smartobserve.password: kibanaserver
        smartobserve.requestHeadersWhitelist: [authorization, securitytenant]
        
        smartobserve_security.multitenancy.enabled: true
        smartobserve_security.multitenancy.tenants.preferred: [Private, Global]
        smartobserve_security.readonly_mode.roles: [kibana_read_only]
        # Use this setting if you are running smartobserve-dashboards without https
        smartobserve_security.cookie.secure: false
        ```
    
    1. Option 2 -- With SmartObserve security disabled:

        If you are using SmartObserve with security disabled, remove the Security plugin from SmartObserve Dashboards using the following command:
        
        ```
        \path\to\smartobserve-dashboards-{{site.smartobserve_version}}\bin\smartobserve-dashboards-plugin.bat remove securityDashboards
        ```
        
        The basic `smartobserve_dashboards.yml` file should contain:
        
        ```
        smartobserve.hosts: [http://localhost:9200]
        ```
         
        Note the plain `http` method, instead of `https`.
        {: .note}
    
1. Run SmartObserve Dashboards.

   There are two ways of running SmartObserve Dashboards:

   1. Run the batch script using the Windows UI:

      1. Navigate to the top directory of your SmartObserve Dashboards installation and open the `smartobserve-dashboards-{{site.smartobserve_version}}` folder.
      1. Open the `bin` folder and run the batch script by double-clicking the `smartobserve-dashboards.bat` file. This opens a command prompt with an SmartObserve Dashboards instance running.

   1. Run the batch script from Command Prompt or Powershell:

      1. Open Command Prompt by entering `cmd`, or Powershell by entering `powershell`, in the search box next to **Start** on the taskbar. 
      1. Change to the top directory of your SmartObserve Dashboards installation.
         ```bat
         cd \path\to\smartobserve-dashboards-{{site.smartobserve_version}}
         ```
      1. Run the batch script to start SmartObserve Dashboards.
         ```bat
         .\bin\smartobserve-dashboards.bat
         ```

To stop SmartObserve Dashboards, press `Ctrl+C` in Command Prompt or Powershell, or simply close the Command Prompt or Powershell window.
{: .tip} 