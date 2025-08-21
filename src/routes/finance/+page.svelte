<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
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
        Department: t.department || '',
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
    department?: string;
    documents: string[];
  }

  interface FinancialSummary {
    totalIncome: number;
    totalExpenditure: number;
    netProfit: number;
    monthlyIncome: number;
    monthlyExpenditure: number;
    budgetUtilization: number;
  }

  // Sample financial data
  let financialSummary: FinancialSummary = {
    totalIncome: 2450000,
    totalExpenditure: 1890000,
    netProfit: 560000,
    monthlyIncome: 245000,
    monthlyExpenditure: 189000,
    budgetUtilization: 77.2
  };

  let recentTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-12-15',
      amount: 125000,
      description: 'Pharmaceutical Sales - Q4',
      category: 'Sales Income',
      type: 'income',
      department: 'Sales',
      documents: ['invoice_Q4_2024.pdf']
    },
    {
      id: '2',
      date: '2024-12-14',
      amount: 45000,
      description: 'Employee Salaries - December',
      category: 'Salaries',
      type: 'expenditure',
      department: 'HR',
      documents: ['payroll_dec_2024.pdf']
    },
    {
      id: '3',
      date: '2024-12-13',
      amount: 15000,
      description: 'Laboratory Equipment',
      category: 'Supplies',
      type: 'expenditure',
      department: 'R&D',
      documents: ['equipment_receipt.pdf']
    },
    {
      id: '4',
      date: '2024-12-12',
      amount: 32000,
      description: 'Marketing Campaign Revenue',
      category: 'Marketing Income',
      type: 'income',
      department: 'Sales',
      documents: ['campaign_report.pdf']
    },
    {
      id: '5',
      date: '2024-12-11',
      amount: 8500,
      description: 'Office Supplies',
      category: 'Supplies',
      type: 'expenditure',
      department: 'Administration',
      documents: []
    }
  ];

  // Filter states
  let selectedPeriod = 'current-month';
  let selectedType = 'all';
  let selectedDepartment = 'all';

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
  function getFilteredTransactions(): Transaction[] {
    return recentTransactions.filter(transaction => {
      if (selectedType !== 'all' && transaction.type !== selectedType) return false;
      if (selectedDepartment !== 'all' && transaction.department !== selectedDepartment) return false;
      return true;
    });
  }

  $: filteredTransactions = getFilteredTransactions();
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
        <div class="metric-value" style="color: var(--color-success);">{formatCurrency(financialSummary.totalIncome)}</div>
        <div class="metric-change positive">
          <span></span>
          <span>Monthly: {formatCurrency(financialSummary.monthlyIncome)}</span>
        </div>
      </div>

      <!-- Total Expenditure -->
      <div class="card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Total Expenditure (YTD)</div>
        <div class="metric-value" style="color: var(--color-error);">{formatCurrency(financialSummary.totalExpenditure)}</div>
        <div class="metric-change">
          <span></span>
          <span>Monthly: {formatCurrency(financialSummary.monthlyExpenditure)}</span>
        </div>
      </div>

      <!-- Net Profit -->
      <div class="metric-card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Net Profit</div>
        <div class="metric-value" style="color: var(--color-success);">{formatCurrency(financialSummary.netProfit)}</div>
        <div class="metric-change positive">
          <span></span>
          <span>Profit Margin: {((financialSummary.netProfit / financialSummary.totalIncome) * 100).toFixed(1)}%</span>
        </div>
      </div>

      <!-- Budget Utilization -->
      <div class="card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);">
        <div class="metric-label">Budget Utilization</div>
        <div class="metric-value">{financialSummary.budgetUtilization.toFixed(1)}%</div>
        <div class="metric-change">
          <span></span>
          <span>Within limits</span>
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
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expenditure">Expenditure</option>
          </select>
          
          <select bind:value={selectedDepartment} class="form-select">
            <option value="all">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="R&D">R&D</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
      </div>

      <table class="table" style="background: var(--color-background); color: var(--color-text-primary);">
        <thead style="background: var(--color-primary-bg, #eff6ff); color: var(--color-primary);">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Department</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredTransactions as transaction}
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td>{formatDate(transaction.date)}</td>
              <td>
                <div class="font-medium">{transaction.description}</div>
              </td>
              <td>
                <span class="badge" style="background: var(--color-info-bg, #e0f2fe); color: var(--color-info);">{transaction.category}</span>
              </td>
              <td>{transaction.department || 'N/A'}</td>
              <td>
                <span class="badge" style="background: {transaction.type === 'income' ? 'var(--color-success-bg, #d1fae5)' : 'var(--color-warning-bg, #fef9c3)'}; color: {transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-warning)'};">
                  {transaction.type === 'income' ? '↗️ Income' : '↙️ Expenditure'}
                </span>
              </td>
              <td style="color: {transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-error)'}; font-weight: bold;">
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </td>
              <td>
                {#if transaction.documents.length > 0}
                  <div class="flex gap-1">
                    {#each transaction.documents as doc}
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
        </tbody>
      </table>

      {#if filteredTransactions.length === 0}
        <div class="p-8 text-center" style="color: var(--color-text-secondary);">
          <div class="text-4xl mb-4">📊</div>
          <div class="text-lg font-medium mb-2">No transactions found</div>
          <div class="text-sm">Try adjusting your filters or add a new transaction.</div>
        </div>
      {/if}
    </div>
  </section>
</Layout>
