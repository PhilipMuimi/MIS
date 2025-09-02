<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { goto } from '$app/navigation';

  // Transaction form data
  interface TransactionForm {
    type: 'income' | 'expenditure';
    amount: string;
    description: string;
    category: string;
    department: string;
    date: string;
    supportingDocument: File | null;
  }

  let transactionForm: TransactionForm = {
    type: 'income',
    amount: '',
    description: '',
    category: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    supportingDocument: null
  };

  // Categories based on transaction type
  const categories = {
    income: [
      'Sales Income',
      'Investment Returns', 
      'Grants',
      'Licensing Revenue',
      'Partnership Income',
      'Other Income'
    ],
    expenditure: [
      'Salaries',
      'Supplies',
      'Equipment',
      'Marketing',
      'Utilities',
      'Travel',
      'Research Costs',
      'Legal Fees',
      'Insurance',
      'Other Expenses'
    ]
  };

  const departments = [
    'Finance',
    'HR',
    'R&D',
    'Sales',
    'Marketing',
    'Operations',
    'Administration',
    'Legal'
  ];

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  // Form validation
  function validateForm(): boolean {
    errors = {};
    
    if (!transactionForm.amount || parseFloat(transactionForm.amount) <= 0) {
      errors.amount = 'Please enter a valid amount greater than 0';
    }
    
    if (!transactionForm.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!transactionForm.category) {
      errors.category = 'Please select a category';
    }
    
    if (!transactionForm.date) {
      errors.date = 'Date is required';
    }

    return Object.keys(errors).length === 0;
  }

  // Handle file upload
  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;
    transactionForm.supportingDocument = file;
  }

  import { getFinanceTransactions, createFinanceTransaction, updateFinanceTransaction, deleteFinanceTransaction } from '$lib/api/finance_transactions';

  import { onMount } from 'svelte';

  let transactions: any[] = [];
  let loadingTransactions = false;
  let editId: string | null = null;
  let editForm: TransactionForm | null = null;

  async function loadTransactions() {
    loadingTransactions = true;
    try {
      let data = await getFinanceTransactions();
      // Normalize type to 'Income' or 'Expense' for consistency
      transactions = data.map(t => ({
        ...t,
        type: t.type === 'income' ? 'Income' : t.type === 'expenditure' ? 'Expense' : t.type
      }));
      console.log('Loaded transactions:', transactions);
    } catch (e) {
      // handle error
      console.error('Error loading transactions:', e);
    }
    loadingTransactions = false;
  }

  onMount(() => {
    loadTransactions();
  });

  // Handle form submission
  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;

    try {
      const formData = new FormData();
      formData.append('type', transactionForm.type);
      formData.append('amount', transactionForm.amount);
      formData.append('description', transactionForm.description);
      formData.append('category', transactionForm.category);
      formData.append('department', transactionForm.department);
      formData.append('date', transactionForm.date);
      if (transactionForm.supportingDocument) {
        formData.append('supportingDocument', transactionForm.supportingDocument);
      }
      if (editId) {
        await updateFinanceTransaction(editId, formData);
        alert('Transaction updated successfully!');
      } else {
        await createFinanceTransaction(formData);
        alert('Transaction saved successfully!');
      }
      await loadTransactions();
      resetForm();
      editId = null;
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error saving transaction. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function startEdit(tx: any) {
    editId = tx.id;
    transactionForm = {
      type: tx.type,
      amount: tx.amount,
      description: tx.description,
      category: tx.category,
      department: tx.department,
      date: tx.date,
      supportingDocument: null // File editing not supported in this UI
    };
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await deleteFinanceTransaction(id);
      await loadTransactions();
    }
  }

  // Reset form
  function resetForm() {
    transactionForm = {
      type: 'income',
      amount: '',
      description: '',
      category: '',
      department: '',
      date: new Date().toISOString().split('T')[0],
      supportingDocument: null
    };
    errors = {};
    editId = null;
  }
</script>

<Layout>
  <svelte:fragment slot="title">{editId ? 'Edit Transaction' : 'Add Transaction'}</svelte:fragment>
  <svelte:fragment slot="subtitle">{editId ? 'Update an existing financial transaction' : 'Record a new financial transaction'}</svelte:fragment>

  <div class="max-w-2xl">
    <!-- List Transactions -->
    <div class="card" style="margin-bottom:2rem;">
      <div class="card-header">
        <h2 class="card-title">All Transactions</h2>
      </div>
      {#if loadingTransactions}
        <div style="padding:1rem;">Loading...</div>
      {:else if transactions.length === 0}
        <div style="padding:1rem;">No transactions found.</div>
      {:else}
        <table class="table w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Department</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each transactions as tx}
              <tr>
                <td>{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>
                <td>{tx.department}</td>
                <td>{tx.date}</td>
                <td>
                  <button class="btn btn-xs btn-outline" on:click={() => startEdit(tx)}>Edit</button>
                  <button class="btn btn-xs btn-outline" on:click={() => handleDelete(tx.id)} style="margin-left:0.5rem;">Delete</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>

    <!-- Form Card -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Transaction Details</h2>
        <p style="font-size: 0.875rem; color: #6b7280;">
          Fill out the form below to {editId ? 'update' : 'record'} a financial transaction.
        </p>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="card-body">
        <!-- Transaction Type -->
        <div class="form-group">
          <label for="type" class="form-label">Transaction Type *</label>
          <select 
            id="type"
            bind:value={transactionForm.type}
            class="form-select"
            required
          >
            <option value="income">Income (Money In)</option>
            <option value="expenditure">Expenditure (Money Out)</option>
          </select>
        </div>

        <!-- Amount -->
        <div class="form-group">
          <label for="amount" class="form-label">Amount (USD) *</label>
          <div style="position: relative;">
            <span class="dollar-sign">$</span>
            <input 
              id="amount"
              type="number"
              step="0.01"
              min="0"
              bind:value={transactionForm.amount}
              class="form-input amount-input"
              class:error={errors.amount}
              placeholder="0.00"
              required
            />
          </div>
          {#if errors.amount}
            <p class="text-error text-sm mt-1">{errors.amount}</p>
          {/if}
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description" class="form-label">Description *</label>
          <input 
            id="description"
            type="text"
            bind:value={transactionForm.description}
            class="form-input"
            class:error={errors.description}
            placeholder="Brief description of the transaction"
            required
          />
          {#if errors.description}
            <p class="text-error text-sm mt-1">{errors.description}</p>
          {/if}
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="category" class="form-label">Category *</label>
          <select 
            id="category"
            bind:value={transactionForm.category}
            class="form-select"
            class:error={errors.category}
            required
          >
            <option value="">Select a category</option>
            {#each categories[transactionForm.type] as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
          {#if errors.category}
            <p class="text-error text-sm mt-1">{errors.category}</p>
          {/if}
        </div>

        <!-- Department -->
        <div class="form-group">
          <label for="department" class="form-label">Associated Department</label>
          <select 
            id="department"
            bind:value={transactionForm.department}
            class="form-select"
          >
            <option value="">No specific department</option>
            {#each departments as dept}
              <option value={dept}>{dept}</option>
            {/each}
          </select>
        </div>

        <!-- Date -->
        <div class="form-group">
          <label for="date" class="form-label">Transaction Date *</label>
          <input 
            id="date"
            type="date"
            bind:value={transactionForm.date}
            class="form-input"
            class:error={errors.date}
            required
          />
          {#if errors.date}
            <p class="text-error text-sm mt-1">{errors.date}</p>
          {/if}
        </div>

        <!-- Supporting Document -->
        <div class="form-group">
          <label for="document" class="form-label">Supporting Document</label>
          <div class="file-upload-area">
            <input 
              id="document"
              type="file"
              on:change={handleFileUpload}
              style="display: none;"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
            />
            <label for="document" class="file-upload-label">
              <div style="text-align: center; padding: 1rem 0;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📄</div>
                <div style="font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">
                  Click to upload a document
                </div>
                <div style="font-size: 0.75rem; color: #6b7280;">
                  PDF, DOC, XLS, or image files
                </div>
                {#if transactionForm.supportingDocument}
                  <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #059669;">
                    ✓ {transactionForm.supportingDocument.name}
                  </div>
                {/if}
              </div>
            </label>
          </div>
        </div>

        <!-- Form Actions -->
        <div style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border);">
          <button 
            type="submit" 
            class="btn btn-primary"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading"></span>
              <span>Saving...</span>
            {:else}
              <span>💾</span>
              <span>Save Transaction</span>
            {/if}
          </button>
          
          <button 
            type="button" 
            class="btn btn-secondary"
            on:click={resetForm}
            disabled={isSubmitting}
          >
            <span>🔄</span>
            <span>Reset</span>
          </button>
          
          <a href="/finance" class="btn btn-outline">
            <span>❌</span>
            <span>Cancel</span>
          </a>
        </div>
      </form>
    </div>
  </div>
</Layout>

<style>
  .max-w-2xl {
    max-width: 42rem;
  }
  
  .dollar-sign {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
  }
  
  .amount-input {
    padding-left: 2rem;
  }
  
  .file-upload-area {
    border: 2px dashed var(--color-border);
    border-radius: 8px;
    background: var(--color-background);
    transition: border-color 0.2s ease;
  }
  
  .file-upload-area:hover {
    border-color: var(--color-primary);
  }
  
  .file-upload-label {
    display: block;
    cursor: pointer;
    padding: 1rem;
  }
</style>
