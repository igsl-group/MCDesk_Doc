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
2. Go to **[Workflow]** > **[All]**, then click **[New]** on the top-right corner to create a new workflow.
3. Enter the mandatory fields as required by your configuration.
4. Select **"Request"** for Flow table.
5. Select **"Run if no other workflows matched"** in Flow match condition.
6. Click **[+ Parameter]** in Flow conditions and set the flow condition.
7. **Workflow Chart** – Build the flow:
   - Click **[Workflow Chart]** and drag the **Begin** node into the chart, then click **[Submit]**.
   - Drag the **Approval User** node into the chart and select a group in the **Groups** field, then click **[Submit]**.
   - Link the **Begin** node and **Approval User** node.
   - Drag a **Set Values** node into the chart, change the Name to **"Set Request state to Approved"**, click **[+ Add]** and set the condition to **"Request state = Approved"**, then click **[Submit]**.
   - Link the **Approval User** node and this **Set Values** node.
   - Drag another **Set Values** node, change the Name to **"Set Request state to Rejected"**, click **[+ Add]** and set the condition to **"Request state = Rejected"**, then click **[Submit]**.
   - Link the **Approval User** node and this **Set Values** node.
   - Drag the **End** node into the chart and link the **Set Values** nodes to the **End** node.
8. Click **[Save]** on the top right corner.
9. Click **[Publish]** on the top right corner.

After publishing, the workflow runs when a service request is submitted and no other workflow matches.
