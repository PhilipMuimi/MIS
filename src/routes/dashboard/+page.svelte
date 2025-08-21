<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import AlertCard from '$lib/components/AlertCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  // Sample data - this would come from your API/database
  const financialMetrics = {
    totalIncome: 120000,
    totalExpenses: 80000,
    netProfit: 40000,
    cashFlow: [
      { month: 'Jan', value: 15000 },
      { month: 'Feb', value: 18000 },
      { month: 'Mar', value: 22000 },
      { month: 'Apr', value: 19000 },
      { month: 'May', value: 25000 },
      { month: 'Jun', value: 28000 }
    ]
  };
  
  const alerts = [
    {
      type: 'warning' as const,
      title: 'Budget limits exceeded in',
      message: 'R&D Department',
      action: 'View Details',
      href: '/rnd'
    },
    {
      type: 'info' as const,
      title: 'Overdue reports in Sales & Marketing',
      message: 'Include Marketing campaigns review',
      action: 'No Action',
      href: '/sales'
    }
  ];
  
  const departmentStats = [
    { name: 'Finance', documents: 25, records: 120, activity: 'high' },
    { name: 'HR', documents: 18, records: 85, activity: 'medium' },
    { name: 'R&D', documents: 32, records: 95, activity: 'high' },
    { name: 'Sales', documents: 15, records: 60, activity: 'low' }
  ];
</script>

<Layout>
  <div class="main-content">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
    </div>

    <div class="dashboard-row">
      <!-- Left Column - Financial Metrics and Chart -->
      <div class="space-y-6">
        <!-- Financial Metrics Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Total Income Card -->
          <div class="metric-card">
            <div class="metric-card-title">Total Income</div>
            <div class="metric-card-value">$2,450,000</div>
          </div>
          
          <!-- Net Profit Card -->
          <div class="card">
            <div class="metric-card-title">Net Profit</div>
            <div class="metric-card-profit">560,000</div>
          </div>
        </div>

        <!-- Cash Flow Chart -->
        <div class="card">
          <div class="card-title">Cash Flow</div>
          <div class="chart-container bg-gray-50 rounded flex items-center justify-center">
            <svg viewBox="0 0 400 120" class="w-full h-full">
              <polyline 
                fill="none" 
                stroke="#3B82F6" 
                stroke-width="2"
                points="20,80 80,70 140,50 200,65 260,40 320,30 380,35"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Right Column - Alerts -->
      <!--div class="card">
        <div class="card-title">Alerts</div>
        <div class="alert-list">
          <div class="alert-item">
            <div class="alert-icon warning"></div>
            <div class="alert-text">
              Budget limits exceeded in <span class="alert-link">R&D Department</span>
            </div>
          </div>
          <div class="alert-item">
            <div class="alert-icon success"></div>
            <div class="alert-text">
              Overdue reports in Sales & Marketing - <span class="alert-link">No Action</span>
            </div>
          </div>
        </div>
      </div-->
    </div>
  </div>
</Layout>
