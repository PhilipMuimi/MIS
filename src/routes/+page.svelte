<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { onMount } from 'svelte';

  // Dashboard data structure
  interface DashboardMetrics {
    financialOverview: {
      totalIncome: number;
      totalExpenditure: number;
      netProfit: number;
      cashFlow: number;
      monthlyGrowth: number;
    };
    departmentActivity: {
      documentsUploaded: number;
      recordsCreated: number;
      activeProjects: number;
      pendingTasks: number;
    };
    systemAlerts: Array<{
      id: string;
      type: 'warning' | 'info' | 'success' | 'error';
      message: string;
      timestamp: Date;
      department?: string;
    }>;
  }

  import { getFinanceTransactions } from '$lib/api/finance_transactions';
  let dashboardData: DashboardMetrics = {
    financialOverview: {
      totalIncome: 0,
      totalExpenditure: 0,
      netProfit: 0,
      cashFlow: 0,
      monthlyGrowth: 0
    },
    departmentActivity: {
      documentsUploaded: 0,
      recordsCreated: 0,
      activeProjects: 0,
      pendingTasks: 0
    },
    systemAlerts: []
  };

  let transactions: any[] = [];
  let prevMonthIncome = 0;
  let prevMonthExpenditure = 0;

  onMount(async () => {
    try {
      let data = await getFinanceTransactions();
      // Normalize type for consistency
      transactions = data.map(t => ({
        ...t,
        type: t.type === 'income' ? 'Income' : t.type === 'expenditure' ? 'Expense' : t.type
      }));
      // Financial Overview
      dashboardData.financialOverview.totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      dashboardData.financialOverview.totalExpenditure = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      dashboardData.financialOverview.netProfit = dashboardData.financialOverview.totalIncome - dashboardData.financialOverview.totalExpenditure;
      // Cash flow = income - expenditure (current month)
      const now = new Date();
      const thisMonthIncome = transactions.filter(t => {
        const d = t.date ? new Date(t.date) : null;
        return t.type === 'Income' && d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      const thisMonthExpenditure = transactions.filter(t => {
        const d = t.date ? new Date(t.date) : null;
        return t.type === 'Expense' && d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      dashboardData.financialOverview.cashFlow = thisMonthIncome - thisMonthExpenditure;
      // Monthly growth (compare to previous month)
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      prevMonthIncome = transactions.filter(t => {
        const d = t.date ? new Date(t.date) : null;
        return t.type === 'Income' && d && d.getMonth() === prevMonth.getMonth() && d.getFullYear() === prevMonth.getFullYear();
      }).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      dashboardData.financialOverview.monthlyGrowth = prevMonthIncome > 0 ? ((thisMonthIncome - prevMonthIncome) / prevMonthIncome) * 100 : 0;
      // TODO: Fetch department activity and system alerts from backend if available
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    }
  });

  // Format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  }

  // Format percentage
  function formatPercentage(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  }

  // Get alert icon
  function getAlertIcon(type: string): string {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  }

  onMount(() => {
    console.log('Dashboard loaded');
  });
</script>

<Layout>
  <svelte:fragment slot="title">Dashboard</svelte:fragment>
  <svelte:fragment slot="subtitle">Welcome to GONEP Pharmaceuticals Management System</svelte:fragment>

  <!-- Financial Overview Section -->
  <section class="mb-6">
    <h2 class="section-title">Financial Overview</h2>
    <div class="dashboard-grid">
      <!-- Total Income -->
      <div class="metric-card">
        <div class="metric-label">Total Income (YTD)</div>
        <div class="metric-value">{formatCurrency(dashboardData.financialOverview.totalIncome)}</div>
        <div class="metric-change positive">
          <span>📈</span>
          <span>{formatPercentage(dashboardData.financialOverview.monthlyGrowth)}</span>
        </div>
      </div>

      <!-- Total Expenditure -->
      <div class="card">
        <div class="metric-label">Total Expenditure (YTD)</div>
        <div class="metric-value">{formatCurrency(dashboardData.financialOverview.totalExpenditure)}</div>
        <div class="metric-change">
          <span>📊</span>
          <span>Within budget</span>
        </div>
      </div>

      <!-- Net Profit -->
      <div class="metric-card">
        <div class="metric-label">Net Profit</div>
        <div class="metric-value text-success">{formatCurrency(dashboardData.financialOverview.netProfit)}</div>
        <div class="metric-change positive">
          <span>💰</span>
          <span>Strong performance</span>
        </div>
      </div>

      <!-- Cash Flow -->
      <div class="card">
        <div class="metric-label">Available Cash Flow</div>
        <div class="metric-value">{formatCurrency(dashboardData.financialOverview.cashFlow)}</div>
        <div class="metric-change positive">
          <span>💳</span>
          <span>Healthy liquidity</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Dashboard Row: Department Activity & Alerts -->
  <div class="dashboard-row">
    <!-- Department Activity -->
    <section>
      <h2 class="section-title">Department Activity</h2>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Current Month Summary</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="metric-value text-primary">{dashboardData.departmentActivity.documentsUploaded}</div>
              <div class="metric-label">Documents Uploaded</div>
            </div>
            <div class="text-center">
              <div class="metric-value text-primary">{dashboardData.departmentActivity.recordsCreated}</div>
              <div class="metric-label">Records Created</div>
            </div>
            <div class="text-center">
              <div class="metric-value text-success">{dashboardData.departmentActivity.activeProjects}</div>
              <div class="metric-label">Active Projects</div>
            </div>
            <div class="text-center">
              <div class="metric-value text-warning">{dashboardData.departmentActivity.pendingTasks}</div>
              <div class="metric-label">Pending Tasks</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- System Alerts -->
    <section>
      <h2 class="section-title">System Alerts & Notifications</h2>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Recent Alerts</h3>
          <span class="badge badge-info">{dashboardData.systemAlerts.length} Active</span>
        </div>
        <div class="card-body">
          <div class="space-y-3">
            {#each dashboardData.systemAlerts as alert}
              <div class="alert alert-{alert.type}">
                <span class="text-lg">{getAlertIcon(alert.type)}</span>
                <div class="flex-1">
                  <div class="font-medium">{alert.message}</div>
                  {#if alert.department}
                    <div class="text-xs opacity-75">Department: {alert.department}</div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Additional Dashboard Section (from dashboard/+page.svelte) -->
  <section class="mt-12">
    <h2 class="section-title">Legacy Dashboard Overview</h2>
    <div class="dashboard-row">
      <!-- Left Column - Financial Metrics and Chart -->
      <div class="space-y-6">
        <!-- Financial Metrics Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Total Income Card -->
          <div class="metric-card">
            <div class="metric-card-title">Total Income</div>
            <div class="metric-card-value">${dashboardData.financialOverview.totalIncome.toLocaleString()}</div>
          </div>
          <!-- Net Profit Card -->
          <div class="card">
            <div class="metric-card-title">Net Profit</div>
            <div class="metric-card-profit">${dashboardData.financialOverview.netProfit.toLocaleString()}</div>
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
      </div>
    </div-->
    </div>
  </section>
</Layout>
