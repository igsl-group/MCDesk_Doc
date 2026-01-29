---
layout: default
title: Windows
parent: Installing MCdesk Dashboards
nav_order: 37
redirect_from: 
  - /dashboards/install/windows/
---

# Run MCdesk Dashboards on Windows

Perform the following steps to install MCdesk Dashboards on Windows.

Make sure you have a zip utility installed.
{: .note }

1. Download the [`mcdesk-dashboards-{{site.mcdesk_version}}-windows-x64.zip`](https://artifacts.magiccreative.io/releases/bundle/mcdesk-dashboards/{{site.mcdesk_version}}/mcdesk-dashboards-{{site.mcdesk_version}}-windows-x64.zip){:target='\_blank'} archive.

1. To extract the archive contents, right-click to select **Extract All**.
   
   **Note**: Some versions of the Windows operating system limit the file path length. If you encounter a path-length-related error when unzipping the archive, perform the following steps to enable long path support:

   1. Open Powershell by entering `powershell` in the search box next to **Start** on the taskbar. 
   1. Run the following command in Powershell:
      ```bat
      Set-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem LongPathsEnabled -Type DWORD -Value 1 -Force
      ```
   1. Restart your computer.

1. Configure MCdesk Dashboards.

    There are two ways to configure MCdesk Dashboards, depending on whether MCdesk is configured with security enabled or disabled.

    In order for any changes to the `mcdesk_dashboards.yml` file to take effect, a restart of MCdesk Dashboards is required.
    {: .note}

    1. Option 1 -- With security enabled:
  
        Configuration file `\path\to\mcdesk-dashboards-{{site.mcdesk_version}}\config\mcdesk_dashboards.yml` comes packaged with following basic settings:
        
        ```
        mcdesk.hosts: [https://localhost:9200]
        mcdesk.ssl.verificationMode: none
        mcdesk.username: kibanaserver
        mcdesk.password: kibanaserver
        mcdesk.requestHeadersWhitelist: [authorization, securitytenant]
        
        mcdesk_security.multitenancy.enabled: true
        mcdesk_security.multitenancy.tenants.preferred: [Private, Global]
        mcdesk_security.readonly_mode.roles: [kibana_read_only]
        # Use this setting if you are running mcdesk-dashboards without https
        mcdesk_security.cookie.secure: false
        ```
    
    1. Option 2 -- With MCdesk security disabled:

        If you are using MCdesk with security disabled, remove the Security plugin from MCdesk Dashboards using the following command:
        
        ```
        \path\to\mcdesk-dashboards-{{site.mcdesk_version}}\bin\mcdesk-dashboards-plugin.bat remove securityDashboards
        ```
        
        The basic `mcdesk_dashboards.yml` file should contain:
        
        ```
        mcdesk.hosts: [http://localhost:9200]
        ```
         
        Note the plain `http` method, instead of `https`.
        {: .note}
    
1. Run MCdesk Dashboards.

   There are two ways of running MCdesk Dashboards:

   1. Run the batch script using the Windows UI:

      1. Navigate to the top directory of your MCdesk Dashboards installation and open the `mcdesk-dashboards-{{site.mcdesk_version}}` folder.
      1. Open the `bin` folder and run the batch script by double-clicking the `mcdesk-dashboards.bat` file. This opens a command prompt with an MCdesk Dashboards instance running.

   1. Run the batch script from Command Prompt or Powershell:

      1. Open Command Prompt by entering `cmd`, or Powershell by entering `powershell`, in the search box next to **Start** on the taskbar. 
      1. Change to the top directory of your MCdesk Dashboards installation.
         ```bat
         cd \path\to\mcdesk-dashboards-{{site.mcdesk_version}}
         ```
      1. Run the batch script to start MCdesk Dashboards.
         ```bat
         .\bin\mcdesk-dashboards.bat
         ```

To stop MCdesk Dashboards, press `Ctrl+C` in Command Prompt or Powershell, or simply close the Command Prompt or Powershell window.
{: .tip} 