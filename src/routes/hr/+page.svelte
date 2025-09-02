<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Button from '$lib/components/Button.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  
  interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    hire_date: string;
    status: string;
  }
  
  let selectedEmployee: Employee | null = null;
  let showEmployeeForm = false;
  let searchTerm = '';
  import { onMount } from 'svelte';
  import { getEmployees, createEmployee } from '$lib/api/employees';

  let employees: Employee[] = [];
  let loading = false;

  async function loadEmployees() {
    loading = true;
    try {
      employees = await getEmployees();
    } catch (e) {
      formError = 'Failed to load employees.';
    }
    loading = false;
  }

  onMount(() => {
    loadEmployees();
  });

  // Add employee form state
  let newEmp = {
    name: '', position: '', department: '', email: '', phone: '', hire_date: '', status: 'Active'
  };
  let formError = '';
  let formSuccess = '';
  let nameInput: HTMLInputElement | null = null;

  function openEmployeeForm() {
    showEmployeeForm = true;
    formError = '';
    formSuccess = '';
    setTimeout(() => nameInput && nameInput.focus(), 50);
  }

  async function addEmployee() {
    formError = '';
    formSuccess = '';
    if (!newEmp.name || !newEmp.position || !newEmp.department || !newEmp.email || !newEmp.phone || !newEmp.hire_date || !newEmp.status) {
      formError = 'All fields are required.';
      return;
    }
    try {
      await createEmployee({ ...newEmp });
      formSuccess = 'Employee added successfully!';
      await loadEmployees();
      setTimeout(() => {
        showEmployeeForm = false;
        formSuccess = '';
        newEmp = { name: '', position: '', department: '', email: '', phone: '', hire_date: '', status: 'Active' };
      }, 1200);
    } catch (e) {
      formError = 'Failed to add employee.';
      // Log error details for debugging
      console.error('Add employee error:', e);
      if (e?.data && typeof e.data === 'object') {
        formError += ' ' + JSON.stringify(e.data);
      } else if (e?.message) {
        formError += ' ' + e.message;
      }
    }
  }

  $: filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (e.position && e.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  $: totalEmployees = employees.length;
  $: newHires = employees.filter(e => {
    // Consider new hires as those hired in the last 30 days
    if (!e.hire_date) return false;
    const hireDate = new Date(e.hire_date);
    const now = new Date();
    const diffDays = (now.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;
  $: activeRecruitment = employees.filter(e => e.status && e.status.toLowerCase() === 'recruiting').length;
  $: pendingLeaves = employees.filter(e => e.status && e.status.toLowerCase() === 'on leave').length;
  
  function viewEmployee(employee: Employee) {
    selectedEmployee = employee;
  }
  
  function closeEmployeeProfile() {
    selectedEmployee = null;
  }
</script>

<Layout>
  <div class="rnd-dashboard-bg">
    <!-- HR Sub-navigation -->
    <nav class="hr-subnav" style="margin-bottom: 1.5rem; display: flex; gap: 1.5rem; align-items: center;">
      <a href="/hr/employees" class="hr-subnav-link">Employees</a>
      <a href="/hr/recruitment" class="hr-subnav-link">Recruitment</a>
    </nav>
    <!-- HR Metrics Header -->
    <div class="rnd-dashboard-header">
      <div>
        <h1 class="rnd-dashboard-title">Human Resources</h1>
        <p class="rnd-dashboard-subtitle">Manage employees, recruitment, and HR analytics</p>
      </div>
  <Button variant="primary" on:click={openEmployeeForm}>+ Add Employee</Button>
    </div>
<style>
  .hr-subnav {
    font-size: 1.08rem;
    font-weight: 500;
  }
  .hr-subnav-link {
    color: var(--color-primary, #2563eb);
    text-decoration: none;
    padding: 0.3rem 0.7rem;
    border-radius: 0.4rem;
    transition: background 0.13s, color 0.13s;
  }
  .hr-subnav-link:hover {
    background: var(--color-primary-bg, #eff6ff);
    color: var(--color-primary, #174ea6);
    text-decoration: underline;
  }
</style>

    <div class="rnd-metrics-grid">
      <MetricCard title="Total Employees" value={totalEmployees} color="primary" />
      <MetricCard title="New Hires" value={newHires} color="success" />
      <MetricCard title="Active Recruitment" value={activeRecruitment} color="info" />
  <MetricCard title="Pending Leaves" value={pendingLeaves} color="danger" />
    </div>

    <div class="dashboard-row" style="align-items: flex-start;">
      <!-- Employee List -->
  <div style="background: var(--color-background); border-radius: 1.25rem; box-shadow: 0 4px 24px rgba(16,30,54,0.08); padding: 2rem; min-width: 320px; border: 1px solid var(--color-border); color: var(--color-text-primary);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h2 class="text-lg font-semibold" style="color: var(--color-primary);">Employees</h2>
          <input class="form-input" placeholder="Search..." style="max-width: 140px;" bind:value={searchTerm} />
        </div>
        <div style="overflow-x: auto;">
          <table class="employee-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--color-primary-bg, #f3f6fa);">
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Name</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Position</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Department</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Email</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Phone</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Hire Date</th>
                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: var(--color-primary);">Status</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredEmployees as emp}
                <tr class="employee-row" style="border-bottom: 1px solid var(--color-border); cursor: pointer;" on:click={() => viewEmployee(emp)}>
                  <td style="padding: 0.7rem 0.75rem;">{emp.name}</td>
                  <td style="padding: 0.7rem 0.75rem;">{emp.position}</td>
                  <td style="padding: 0.7rem 0.75rem;">{emp.department}</td>
                  <td style="padding: 0.7rem 0.75rem;">{emp.email}</td>
                  <td style="padding: 0.7rem 0.75rem;">{emp.phone}</td>
                  <td style="padding: 0.7rem 0.75rem;">{emp.hire_date}</td>
                  <td style="padding: 0.7rem 0.75rem;">
                    <span class="badge" style="background: {emp.status === 'Active' ? 'var(--color-success-bg, #d1fae5)' : 'var(--color-warning-bg, #fef9c3)'}; color: {emp.status === 'Active' ? 'var(--color-success)' : 'var(--color-warning)'}; padding: 0.3em 0.8em; border-radius: 0.7em; font-size: 0.95em; font-weight: 500;">{emp.status}</span>
                  </td>
                </tr>
              {/each}
              {#if filteredEmployees.length === 0}
                <tr>
                  <td colspan="7" style="text-align: center; color: var(--color-text-secondary); padding: 1.5rem;">No employees found.</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Employee Profile -->
      {#if selectedEmployee}
        <div class="rnd-projects-card" style="max-width: 500px; margin-left: 2rem; background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border); border-radius: 1.25rem;">
          <div class="rnd-projects-header">
            <h2 class="text-lg font-semibold" style="color: var(--color-primary);">Employee Profile</h2>
            <Button variant="secondary" size="sm" on:click={closeEmployeeProfile}>Close</Button>
          </div>
          <div style="padding: 2rem;">
            <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
              <!-- Avatar removed -->
              <div>
                <div class="font-bold text-xl" style="color: var(--color-primary);">{selectedEmployee.name}</div>
                <div class="text-sm" style="color: var(--color-text-secondary);">{selectedEmployee.position} &mdash; {selectedEmployee.department}</div>
                <span class="badge" style="background: {selectedEmployee.status === 'Active' ? 'var(--color-success-bg, #d1fae5)' : 'var(--color-warning-bg, #fef9c3)'}; color: {selectedEmployee.status === 'Active' ? 'var(--color-success)' : 'var(--color-warning)'};">{selectedEmployee.status}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <dt class="font-semibold">Email</dt>
                <span>{selectedEmployee.email}</span>
              </div>
              <div>
                <dt class="font-semibold">Phone</dt>
                <span>{selectedEmployee.phone}</span>
              </div>
              <div>
                <dt class="font-semibold">Hire Date</dt>
                <span>{selectedEmployee.hire_date}</span>
              </div>
              <div>
                <dt class="font-semibold">Department</dt>
                <span>{selectedEmployee.department}</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Add Employee Modal -->
    {#if showEmployeeForm}
      <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 50; display: flex; align-items: center; justify-content: center; padding: 2rem;">
        <div style="background: var(--color-background); border-radius: 1rem; box-shadow: 0 4px 16px rgba(16,30,54,0.12); width: 100%; max-width: 400px; min-width: 320px; padding: 1.25rem 1.5rem 2.5rem 1.5rem; position: relative; border: 1px solid var(--color-border); color: var(--color-text-primary);">
          <h2 class="text-lg font-semibold mb-3" style="color: var(--color-primary);">Add Employee</h2>
          <form on:submit|preventDefault={addEmployee}>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-name">Name</label>
              <input id="emp-name" class="form-input" placeholder="Full name" bind:value={newEmp.name} bind:this={nameInput} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-position">Position</label>
              <input id="emp-position" class="form-input" placeholder="Position" bind:value={newEmp.position} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-dept">Department</label>
              <select id="emp-dept" class="form-select" bind:value={newEmp.department}>
    <option value="">Select department</option>
    <option value="HR">HR</option>
    <option value="Finance">Finance</option>
    <option value="R&D">R&amp;D</option>
    <option value="Sales">Sales</option>
    <option value="IT">IT</option>
    <option value="Admin">Admin</option>
    <!-- Add more as needed -->
  </select>
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-email">Email</label>
              <input id="emp-email" class="form-input" type="email" placeholder="Email" bind:value={newEmp.email} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-phone">Phone</label>
              <input id="emp-phone" class="form-input" placeholder="Phone" bind:value={newEmp.phone} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-hiredate">Hire Date</label>
              <input id="emp-hiredate" class="form-input" type="date" bind:value={newEmp.hire_date} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-status">Status</label>
              <select id="emp-status" class="form-select" bind:value={newEmp.status}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <!-- Avatar field removed -->
            {#if formError}
              <div class="text-sm mb-2" style="color: var(--color-error);">{formError}</div>
            {/if}
            {#if formSuccess}
              <div class="text-sm mb-2" style="color: var(--color-success);">{formSuccess}</div>
            {/if}
            <div class="flex items-center justify-end gap-2 mt-4">
              <Button variant="secondary" type="button" size="sm" on:click={() => { showEmployeeForm = false; formError = ''; formSuccess = ''; }}>Cancel</Button>
              <Button variant="primary" type="submit" size="sm">Add</Button>
            </div>
          </form>
          <button on:click={() => { showEmployeeForm = false; formError = ''; formSuccess = ''; }} style="position: absolute; top: 0.75rem; right: 1rem; background: none; border: none; font-size: 1.25rem; color: var(--color-border); cursor: pointer;" aria-label="Close">&times;</button>
        </div>
      </div>
    {/if}
  </div>
</Layout>
