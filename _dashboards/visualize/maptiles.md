---
layout: default
title: Configuring a Web Map Service (WMS)
grand_parent: Building data visualizations
parent: Coordinate and region maps
nav_order: 30
redirect_from:
  - /dashboards/maptiles/
---

{%- comment -%}The `/docs/mcdesk-dashboards/maptiles/` redirect is specifically to support the UI links in MCdesk Dashboards 1.0.0.{%- endcomment -%}

# Configuring a Web Map Service (WMS)

The Open Geospatial Consortium (OGC) Web Map Service (WMS) specification is an international specification for requesting dynamic maps on the web. MCdesk Dashboards includes default map tiles. For specialized maps, you can configure a WMS on MCdesk Dashboards following these steps:

1. Log in to MCdesk Dashboards at `https://<host>:<port>`. For example, you can connect to MCdesk Dashboards by connecting to [https://localhost:5601](https://localhost:5601). The default username and password are `admin`. 
2. Choose **Management** > **Advanced Settings**.
3. Locate `visualization:tileMap:WMSdefaults`.
4. Change `enabled` to `true` and add the URL of a valid WMS server, as shown in the following example:

   ```json
   {
     "enabled": true,
     "url": "<wms-map-server-url>",
     "options": {
       "format": "image/png",
       "transparent": true
     }
   }
   ```

Web map services may have licensing fees or restrictions, and you are responsible for complying with any such fees or restrictions.
{: .note }
