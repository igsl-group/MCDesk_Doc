---
layout: default
title: Create a Baseline Service Request Workflow
parent: Workflow
nav_order: 1
---

# Create a Baseline Service Request Workflow

This procedure creates a baseline workflow for service requests: when a user submits a request, the workflow runs and routes it (e.g. to an approval step).

## Steps

1. Click on **[Dashboard]** from the menu.

   ![Dashboard menu]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig26.png)

2. Go to **[Workflow]** > **[All]**, then click **[New]** on the top-right corner to create a new workflow.

   ![Workflow > All > New]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig27.png)

3. Enter the mandatory fields as required by your configuration (e.g. **Flow name**, **Stage name**).

   ![Workflow – Flow name and Stage name]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig28.png)

4. Select **"Request"** for **Flow table**.

   ![Workflow – Flow table]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig29.png)

5. Select **"Run if no other workflows matched"** in **Flow match condition**.

   ![Workflow – Flow match condition]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig30.png)

6. Click **[+ Parameter]** in **Flow conditions** and set the flow condition.

   ![Workflow – Flow conditions]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig31.png)

7. **Workflow Chart** – Build the flow:
   - Click **[Workflow Chart]** and drag the **Begin** node into the chart, then click **[Submit]**.

   ![Workflow Chart – Begin node]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig32.png)

   - Drag the **Approval User** node into the chart and select a group in the **Groups** field, then click **[Submit]**.

   ![Workflow Chart – Approval User node]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig33.png)

   - Link the **Begin** node and **Approval User** node.

   ![Workflow Chart – Link Begin and Approval User]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig34.png)

   - Drag a **Set Values** node into the chart, change the Name to **"Set Request state to Approved"**, click **[+ Add]** and set the condition to **"Request state = Approved"**, then click **[Submit]**.

   ![Workflow Chart – Set Values (Approved)]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig35.png)

   - Link the **Approval User** node and this **Set Values** node.

   ![Workflow Chart – Link Approval User and Set Values]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig36.png)

   - Drag another **Set Values** node, change the Name to **"Set Request state to Rejected"**, click **[+ Add]** and set the condition to **"Request state = Rejected"**, then click **[Submit]**.

   ![Workflow Chart – Set Values (Rejected)]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig37.png)

   - Link the **Approval User** node and this **Set Values** node.

   ![Workflow Chart – Link Approval User and Set Values (Rejected)]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig38.png)

   - Drag the **End** node into the chart and link the **Set Values** nodes to the **End** node.

   ![Workflow Chart – End node]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig39.png)

8. Click **[Save]** on the top right corner.

   ![Workflow – Save]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig40.png)

9. Click **[Publish]** on the top right corner.

   ![Workflow – Publish]({{site.url}}{{site.baseurl}}/images/admin-guide/sr-fig41.png)

After publishing, the workflow runs when a service request is submitted and no other workflow matches.
