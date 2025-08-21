<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  const campaigns = [
    {
      id: 1,
      name: 'Summer Health Campaign',
      status: 'Active',
      budget: 25000,
      spent: 18000,
      leads: 450,
      conversions: 89
    },
    {
      id: 2,
      name: 'Back to School Vitamins',
      status: 'Planning',
      budget: 15000,
      spent: 2000,
      leads: 120,
      conversions: 15
    },
    {
      id: 3,
      name: 'Winter Immunity Boost',
      status: 'Completed',
      budget: 20000,
      spent: 19500,
      leads: 680,
      conversions: 156
    }
  ];
</script>

<Layout>
  <div class="p-8 sales-marketing-bg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold" style="color: var(--color-primary);">Sales & Marketing</h1>
        <p class="mt-2" style="color: var(--color-text-secondary);">Sales performance and marketing campaigns</p>
      </div>
      <Button variant="primary" href="/sales/campaigns">
        + New Campaign
      </Button>
    </div>

    <!-- Sales Metrics -->
    <div class="sales-metrics-chart">
      <div class="metrics-cards">
        <MetricCard
          title="Monthly Sales"
          value="$125,000"
          change="+15% from last month"
          trend="up"
          color="success"
        />
        <MetricCard
          title="Active Leads"
          value="1,250"
          change="+8% this week"
          trend="up"
          color="primary"
        />
        <MetricCard
          title="Conversion Rate"
          value="18.5%"
          change="+2.3% improvement"
          trend="up"
          color="success"
        />
        <MetricCard
          title="Campaign ROI"
          value="285%"
          change="Average return"
          trend="neutral"
          color="info"
        />
      </div>
    </div>
<style>
.sales-marketing-bg {
  background: linear-gradient(120deg, #f0f4ff 0%, #f9fafb 100%);
  min-height: 100vh;
}
.sales-metrics-chart {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  align-items: flex-start;
}
.metrics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.2rem;
  flex: 2;
}
@media (max-width: 900px) {
  .sales-metrics-chart {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>

    <!-- Campaigns List -->
    <div class="rounded-lg shadow-card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
      <div class="p-6" style="border-bottom: 1px solid var(--color-border);">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold" style="color: var(--color-primary);">Marketing Campaigns</h2>
          <Button variant="secondary" size="sm" href="/sales/reports">
            View Reports
          </Button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full" style="background: var(--color-background); color: var(--color-text-primary);">
          <thead style="background: var(--color-primary-bg, #eff6ff); color: var(--color-primary);">
            <tr style="border-bottom: 1px solid var(--color-border);">
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Campaign</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Status</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Budget</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Spent</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Leads</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Conversions</th>
              <th class="text-left py-3 px-6 font-medium" style="color: var(--color-text-secondary);">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each campaigns as campaign}
              <tr
                tabindex="0"
                style="border-bottom: 1px solid var(--color-border); transition: background 0.2s;"
                on:mouseover={e => e.currentTarget.style.background = 'var(--color-background-alt, #f3f4f6)'}
                on:mouseout={e => e.currentTarget.style.background = 'var(--color-background)'}
                on:focus={e => e.currentTarget.style.background = 'var(--color-background-alt, #f3f4f6)'}
                on:blur={e => e.currentTarget.style.background = 'var(--color-background)'}
              >
                <td class="py-4 px-6 font-medium" style="color: var(--color-primary);">{campaign.name}</td>
                <td class="py-4 px-6">
                  <span class="px-2 py-1 rounded-full text-xs font-medium" style="
                    background: {campaign.status === 'Active' ? 'var(--color-success-bg, #d1fae5)' : campaign.status === 'Planning' ? 'var(--color-warning-bg, #fef9c3)' : 'var(--color-background-alt, #f3f4f6)'};
                    color: {campaign.status === 'Active' ? 'var(--color-success)' : campaign.status === 'Planning' ? 'var(--color-warning)' : 'var(--color-text-secondary)'};">
                    {campaign.status}
                  </span>
                </td>
                <td class="py-4 px-6" style="color: var(--color-text-secondary);">${campaign.budget.toLocaleString()}</td>
                <td class="py-4 px-6" style="color: var(--color-text-secondary);">${campaign.spent.toLocaleString()}</td>
                <td class="py-4 px-6" style="color: var(--color-text-secondary);">{campaign.leads}</td>
                <td class="py-4 px-6" style="color: var(--color-text-secondary);">{campaign.conversions}</td>
                <td class="py-4 px-6">
                  <Button variant="secondary" size="sm" href={`/sales/campaigns/${campaign.id}`}>
                    View Details
                  </Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</Layout>
