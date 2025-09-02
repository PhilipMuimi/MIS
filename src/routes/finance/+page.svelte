<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { onMount } from 'svelte';
  import { getFinanceTransactions } from '$lib/api/finance_transactions';
  let excelExporting = false;
  let excelExportError = '';
  let showBudgetModal = false;
  let budgetAmount = '';
  let budgetNote = '';
  let budgetSuccess = '';
  let lastPlannedBudget: { amount: string; note: string } | null = null;
  function saveBudget() {
    budgetSuccess = `Budget of $${budgetAmount} planned successfully.`;
    lastPlannedBudget = { amount: budgetAmount, note: budgetNote };
    showBudgetModal = false;
    budgetAmount = '';
    budgetNote = '';
    setTimeout(() => budgetSuccess = '', 4000);
  }
  async function exportTransactionsToExcel() {
    excelExportError = '';
    excelExporting = true;
    try {
      let XLSX;
      try {
        XLSX = await import('xlsx/xlsx.mjs');
      } catch (esmErr) {
        try {
          XLSX = await import('xlsx');
        } catch (cjsErr) {
          excelExportError = 'Failed to load Excel module (both ESM and CJS).';
          excelExporting = false;
          console.error('Excel module import errors:', esmErr, cjsErr);
          return;
        }
      }
      const ws = XLSX.utils.json_to_sheet(recentTransactions.map(t => ({
        Date: t.date,
        Description: t.description,
        Category: t.category,
        Type: t.type,
        Amount: t.amount,
        Documents: t.documents.join(', ')
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
      XLSX.writeFile(wb, `all_transactions_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch (err) {
      excelExportError = 'Failed to export transactions to Excel.';
      console.error('Excel export error:', err);
    } finally {
      excelExporting = false;
    }
  }

  // Types for financial data
  interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expenditure';
    documents: string[];
  }

  let recentTransactions: any[] = [];
  let loadingTransactions = false;

  // Real-time computed metrics
  $: totalIncomeYTD = recentTransactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  $: totalExpenditureYTD = recentTransactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  $: netProfit = totalIncomeYTD - totalExpenditureYTD;
  $: profitMargin = totalIncomeYTD > 0 ? (netProfit / totalIncomeYTD) * 100 : 0;
  $: monthlyIncome = recentTransactions.filter(t => t.type === 'Income' && t.date && new Date(t.date).getMonth() === new Date().getMonth() && new Date(t.date).getFullYear() === new Date().getFullYear()).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  $: monthlyExpenditure = recentTransactions.filter(t => t.type === 'Expense' && t.date && new Date(t.date).getMonth() === new Date().getMonth() && new Date(t.date).getFullYear() === new Date().getFullYear()).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  $: budgetUtilization = totalIncomeYTD > 0 ? (totalExpenditureYTD / totalIncomeYTD) * 100 : 0;

  async function loadTransactions() {
    loadingTransactions = true;
    try {
      let data = await getFinanceTransactions();
      // Normalize type to 'Income' or 'Expense' for filtering and display
      recentTransactions = data.map(t => ({
        ...t,
        type: t.type === 'income' ? 'Income' : t.type === 'expenditure' ? 'Expense' : t.type
      }));
      console.log('Loaded finance transactions:', recentTransactions);
      // Debug: show all transaction dates and types
      recentTransactions.forEach(t => {
        console.log(`Transaction: id=${t.id}, date=${t.date}, type=${t.type}, amount=${t.amount}`);
      });
    } catch (e) {
      // handle error
      console.error('Error loading finance transactions:', e);
    }
    loadingTransactions = false;
  }

  onMount(() => {
    loadTransactions();
  });

  // Filter states
  let selectedPeriod = 'current-month';
  let selectedType = 'All';

  // Filtered transactions for current month and type
  // Filtered transactions for selected period and type (case-sensitive, matches DB)
  $: filteredTransactions = recentTransactions.filter(t => {
    const txDate = t.date ? new Date(t.date) : null;
    const now = new Date();
    let isPeriod = false;
    if (selectedPeriod === 'current-month') {
      isPeriod = txDate && txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    } else if (selectedPeriod === 'last-month') {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      isPeriod = txDate && txDate.getMonth() === lastMonth.getMonth() && txDate.getFullYear() === lastMonth.getFullYear();
    } else if (selectedPeriod === 'quarter') {
      const quarter = Math.floor(now.getMonth() / 3);
      isPeriod = txDate && txDate.getFullYear() === now.getFullYear() && Math.floor(txDate.getMonth() / 3) === quarter;
    } else if (selectedPeriod === 'year') {
      isPeriod = txDate && txDate.getFullYear() === now.getFullYear();
    }
    const typeMatch = selectedType === 'All' || t.type === selectedType;
    return isPeriod && typeMatch;
  });
  // Debug: log filtered transactions
  console.log('Filtered transactions:', filteredTransactions);

  // Format currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  }

  // Format date
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Get transaction type badge class
  function getTransactionBadgeClass(type: string): string {
    return type === 'income' ? 'badge-success' : 'badge-warning';
  }

  // Get filtered transactions

</script>

<Layout>
  <svelte:fragment slot="title">Finance Department</svelte:fragment>
  <svelte:fragment slot="subtitle">Financial management, transactions, and reporting</svelte:fragment>

  <!-- Financial Summary Cards -->
  <section class="mb-6">
    <h2 class="section-title" style="color: var(--color-primary);">Financial Overview</h2>
    <div class="dashboard-grid">
      <!-- Total Income -->
      <div class="metric-card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Total Income (YTD)</div>
        <div class="metric-value" style="color: var(--color-success);">${totalIncomeYTD.toLocaleString()}</div>
        <div class="metric-change positive">
          <span></span>
          <span>Monthly: ${monthlyIncome.toLocaleString()}</span>
        </div>
      </div>

      <!-- Total Expenditure -->
      <div class="card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Total Expenditure (YTD)</div>
        <div class="metric-value" style="color: var(--color-error);">${totalExpenditureYTD.toLocaleString()}</div>
        <div class="metric-change">
          <span></span>
          <span>Monthly: ${monthlyExpenditure.toLocaleString()}</span>
        </div>
      </div>

      <!-- Net Profit -->
      <div class="metric-card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Net Profit</div>
        <div class="metric-value" style="color: var(--color-success);">${netProfit.toLocaleString()}</div>
        <div class="metric-change positive">
          <span></span>
          <span>Profit Margin: {profitMargin.toFixed(1)}%</span>
        </div>
      </div>

      <!-- Budget Utilization -->
      <div class="card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Budget Utilization</div>
        <div class="metric-value">{budgetUtilization.toFixed(1)}%</div>
        <div class="metric-change">
          <span></span>
          <span>{budgetUtilization < 100 ? 'Within limits' : 'Over budget'}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Actions -->
  <section class="mb-6">
    <h2 class="section-title">Quick Actions</h2>
    <div class="flex gap-4 flex-wrap">
      <a href="/finance/transaction" class="btn btn-primary" style="background: var(--color-primary); color: #fff;">
        <span></span>
        <span>Add Transaction</span>
      </a>
      <a href="/finance/reports" class="btn btn-outline" style="background: var(--color-background); color: var(--color-primary); border: 1px solid var(--color-primary);">
        <span></span>
        <span>Generate Report</span>
      </a>
      <button class="btn btn-secondary" on:click={exportTransactionsToExcel} disabled={excelExporting} style="background: var(--color-secondary); color: #fff;">
        <span></span>
        {#if excelExporting}
          <span class="loading"></span>
          <span>Exporting...</span>
        {:else}
          <span>Export Data</span>
        {/if}
      </button>
      <button class="btn btn-outline" on:click={() => showBudgetModal = true} style="background: var(--color-background); color: var(--color-primary); border: 1px solid var(--color-primary);">
        <span></span>
        <span>Budget Planning</span>
      </button>
    </div>
    {#if excelExportError}
      <div class="text-sm mt-2" style="color: var(--color-error);">{excelExportError}</div>
    {/if}
    <!-- Budget Planning Modal -->
    {#if showBudgetModal}
      <div class="fixed inset-0 flex items-center justify-center z-50" style="background: rgba(0,0,0,0.4);">
        <div class="rounded-lg shadow-lg p-6 w-full max-w-md relative" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
          <button class="absolute top-2 right-2 text-xl" style="color: var(--color-border);" on:click={() => showBudgetModal = false} aria-label="Close">&times;</button>
          <h3 class="text-lg font-semibold mb-4" style="color: var(--color-primary);">Budget Planning</h3>
          <form on:submit|preventDefault={saveBudget}>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1" for="budgetAmount">Budget Amount</label>
              <input id="budgetAmount" type="number" class="form-input w-full" bind:value={budgetAmount} required min="0" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);" />
            </div>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1" for="budgetNote">Notes</label>
              <textarea id="budgetNote" class="form-input w-full" rows="3" bind:value={budgetNote} style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);"></textarea>
            </div>
            <div class="flex justify-end gap-2 mt-4">
              <button type="button" class="btn btn-outline" style="background: var(--color-background); color: var(--color-primary); border: 1px solid var(--color-primary);" on:click={() => showBudgetModal = false}>Cancel</button>
              <button type="submit" class="btn btn-primary" style="background: var(--color-primary); color: #fff;">Save</button>
            </div>
          </form>
        </div>
      </div>
    {/if}
    {#if budgetSuccess}
      <div class="fixed top-6 right-6 px-4 py-2 rounded shadow z-50" style="background: var(--color-success-bg, #d1fae5); color: var(--color-success);">{budgetSuccess}</div>
    {/if}
  </section>

  <!-- Transactions Table -->
  <section>
    <div class="table-container">
      <div class="table-header">
        <h3 class="card-title">Recent Transactions</h3>
        
        <!-- Filters -->
        <div class="flex gap-3">
          <select bind:value={selectedPeriod} class="form-select">
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <select bind:value={selectedType} class="form-select">
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <!-- Recent Transactions Filters -->
      <div class="flex gap-4 mb-2">
        <div>
          <label for="typeFilter" class="form-label">Type:</label>
          <select id="typeFilter" class="form-select" bind:value={selectedType}>
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>
      <!-- Recent Transactions Table (current month, filtered by type) -->
      <table class="table w-full" style="background: var(--color-background); color: var(--color-text-primary);">
        <thead style="background: var(--color-primary-bg, #eff6ff); color: var(--color-primary);">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredTransactions as t}
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td>{formatDate(t.date)}</td>
              <td>
                <div class="font-medium">{t.description}</div>
              </td>
              <td>
                <span class="badge" style="background: var(--color-info-bg, #e0f2fe); color: var(--color-info);">{t.category}</span>
              </td>
              <td>
                <span class="badge" style="background: {t.type === 'Income' ? 'var(--color-success-bg, #d1fae5)' : 'var(--color-warning-bg, #fef9c3)'}; color: {t.type === 'Income' ? 'var(--color-success)' : 'var(--color-warning)'};">
                  {t.type === 'Income' ? '↗️ Income' : '↙️ Expense'}
                </span>
              </td>
              <td style="color: {t.type === 'income' ? 'var(--color-success)' : 'var(--color-error)'}; font-weight: bold;">
                {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
              </td>
              <td>
                {#if t.documents.length > 0}
                  <div class="flex gap-1">
                    {#each t.documents as doc}
                      <button class="text-xs px-2 py-1 rounded" style="background: var(--color-background-alt, #f3f4f6); color: var(--color-text-primary); border: 1px solid var(--color-border);" title="View {doc}">
                         {doc.substring(0, 10)}...
                      </button>
                    {/each}
                  </div>
                {:else}
                  <span class="text-sm" style="color: var(--color-text-secondary);">No documents</span>
                {/if}
              </td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn-outline text-xs" style="background: var(--color-background); color: var(--color-primary); border: 1px solid var(--color-primary);">Edit</button>
                  <button class="btn btn-outline text-xs" style="background: var(--color-background); color: var(--color-primary); border: 1px solid var(--color-primary);">View</button>
                </div>
              </td>
            </tr>
          {/each}
          {#if filteredTransactions.length === 0}
            <tr>
              <td colspan="7" style="text-align: center; color: var(--color-text-secondary); padding: 1.5rem;">No transactions found</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </section>
</Layout>
