<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import AlertCard from '$lib/components/AlertCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  import { onMount } from 'svelte';
  import { getFinanceTransactions } from '$lib/api/finance_transactions';
  let transactions = [];
  let loading = false;
  let totalIncome = 0;
  let totalExpenses = 0;
  let netProfit = 0;
  let cashFlow = [];
  let availableCash = 0;
  // Fetch and compute metrics
  onMount(async () => {
    loading = true;
    try {
      let data = await getFinanceTransactions();
      // Normalize type for consistency
      transactions = data.map(t => ({
        ...t,
        type: t.type === 'income' ? 'Income' : t.type === 'expenditure' ? 'Expense' : t.type
      }));
      // Compute totals
      totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      netProfit = totalIncome - totalExpenses;
      // Cash flow by month (current year)
      const now = new Date();
      const months = Array.from({length: 12}, (_, i) => i);
      cashFlow = months.map(m => {
        const monthIncome = transactions.filter(t => {
          const d = t.date ? new Date(t.date) : null;
          return t.type === 'Income' && d && d.getMonth() === m && d.getFullYear() === now.getFullYear();
        }).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const monthExpense = transactions.filter(t => {
          const d = t.date ? new Date(t.date) : null;
          return t.type === 'Expense' && d && d.getMonth() === m && d.getFullYear() === now.getFullYear();
        }).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        return { month: m, value: monthIncome - monthExpense };
      });
      // Available cash (sum of all income minus expenses)
      availableCash = totalIncome - totalExpenses;
    } catch (e) {
      console.error('Error loading dashboard metrics:', e);
    }
    loading = false;
  });
  
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
  
  // Remove all simulated departmentStats and legacy dashboard values. Only real-time data is shown below.
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
            <div class="metric-card-value">${totalIncome.toLocaleString()}</div>
          </div>
          
          <!-- Net Profit Card -->
          <div class="card">
            <div class="metric-card-title">Net Profit</div>
            <div class="metric-card-profit">{netProfit.toLocaleString()}</div>
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
                points={cashFlow.map((cf, i) => `${20 + i * 30},${100 - Math.max(0, Math.min(90, cf.value / 10000))}`).join(' ')}
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
