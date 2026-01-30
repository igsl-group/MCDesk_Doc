---
layout: default
title: Create SLA Definition
parent: SLA Definition
nav_order: 2
---

# Create SLA Definition

SLA definitions define when an SLA starts, pauses, stops, and resets. Configure them after creating a [Time Sheet]({{site.url}}{{site.baseurl}}/admin-guide/sla-definition/create-time-sheet/).

## Steps

1. Click on **[System Setting]** from the menu.

   ![System Setting menu]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig4.png)

2. Go to **[Service Management]** > **[SLA Definition]**, then click **[New]** on the top-right corner to create a new SLA definition.

   ![Service Management > SLA Definition]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig20.png)

3. Enter the mandatory fields as required by your configuration (e.g. **Related table**).

   ![SLA Definition – Related table]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig21.png)

4. **Start condition** – Click **[+ Parameter]** in Start condition and set the condition.

   ![SLA Definition – Start condition]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig22.png)

5. **Pause condition** – Click **[Pause condition]** tab, click **[+ Parameter]** in Pause condition and Resume condition, then set both conditions.

   ![SLA Definition – Pause condition]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig23.png)

6. **Stop condition** – Click **[Stop condition]** tab, click **[+ Parameter]** in Stop condition and set the condition.

   ![SLA Definition – Stop condition]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig24.png)

7. Set **[Active]** to **"True"** so the SLA definition is in effect.

   ![SLA Definition – Active]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig25.png)

Save and publish the SLA definition so it can be used by the relevant tables (e.g. requests, incidents).
