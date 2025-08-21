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

  // Handle form submission
  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Transaction submitted:', {
        ...transactionForm,
        amount: parseFloat(transactionForm.amount)
      });

      // Show success message and redirect
      alert('Transaction saved successfully!');
      goto('/finance');
      
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error saving transaction. Please try again.');
    } finally {
      isSubmitting = false;
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
  }
</script>

<Layout>
  <svelte:fragment slot="title">Add Transaction</svelte:fragment>
  <svelte:fragment slot="subtitle">Record a new financial transaction</svelte:fragment>

  <div class="max-w-2xl">
    <!-- Form Card -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Transaction Details</h2>
        <p style="font-size: 0.875rem; color: #6b7280;">
          Fill out the form below to record a new financial transaction.
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
