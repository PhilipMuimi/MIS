<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  let campaignId: string = '';
  let campaign: any = null;
  // Example campaigns data (should be replaced with real data source)
  const campaigns = [
    { id: 1, name: 'Summer Health Campaign', status: 'Active', budget: 25000, spent: 18000, leads: 450, conversions: 89 },
    { id: 2, name: 'Back to School Vitamins', status: 'Planning', budget: 15000, spent: 2000, leads: 120, conversions: 15 },
    { id: 3, name: 'Winter Immunity Boost', status: 'Completed', budget: 20000, spent: 19500, leads: 680, conversions: 156 }
  ];
  $: campaignId = $page.params.id ?? '';
  $: campaign = campaigns.find(c => c.id.toString() === campaignId);
</script>

<Layout>
  <div class="p-8" style="background: var(--color-background); color: var(--color-text-primary); min-height: 80vh;">
    {#if campaign}
      <h1 class="text-2xl font-bold mb-4" style="color: var(--color-primary);">{campaign.name}</h1>
      <div class="mb-6">
        <span class="px-3 py-1 rounded-full text-xs font-semibold" style="background: {campaign.status === 'Active' ? 'var(--color-success-bg, #d1fae5)' : campaign.status === 'Planning' ? 'var(--color-warning-bg, #fef9c3)' : 'var(--color-background-alt, #f3f4f6)'}; color: {campaign.status === 'Active' ? 'var(--color-success)' : campaign.status === 'Planning' ? 'var(--color-warning)' : 'var(--color-text-secondary)'};">
          {campaign.status}
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="rounded-lg bg-white p-6 border border-gray-200">
          <div class="mb-2 font-semibold">Budget</div>
          <div class="text-lg">${campaign.budget.toLocaleString()}</div>
        </div>
        <div class="rounded-lg bg-white p-6 border border-gray-200">
          <div class="mb-2 font-semibold">Spent</div>
          <div class="text-lg">${campaign.spent.toLocaleString()}</div>
        </div>
        <div class="rounded-lg bg-white p-6 border border-gray-200">
          <div class="mb-2 font-semibold">Leads</div>
          <div class="text-lg">{campaign.leads}</div>
        </div>
        <div class="rounded-lg bg-white p-6 border border-gray-200">
          <div class="mb-2 font-semibold">Conversions</div>
          <div class="text-lg">{campaign.conversions}</div>
        </div>
      </div>
      <div class="rounded-lg bg-white p-6 border border-gray-200">
        <h2 class="text-lg font-semibold mb-2" style="color: var(--color-primary);">Campaign Details</h2>
        <p>More analytics and campaign details will be available here soon.</p>
      </div>
    {:else}
      <h1 class="text-2xl font-bold mb-4" style="color: var(--color-primary);">Campaign Not Found</h1>
      <p>The campaign you are looking for does not exist.</p>
    {/if}
  </div>
</Layout>
