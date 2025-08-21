<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Button from '$lib/components/Button.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  
  interface Employee {
    id: number;
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    hireDate: string;
    status: string;
    avatar: string;
  }
  
  let selectedEmployee: Employee | null = null;
  let showEmployeeForm = false;
  let searchTerm = '';
  let employees: Employee[] = [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'Software Engineer',
      department: 'Finance',
      email: 'jane.smith@gonep.com',
      phone: '+1 (555) 123-4567',
      hireDate: '2021-05-01',
      status: 'Active',
      avatar: '👩‍💻'
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'HR Manager',
      department: 'HR',
      email: 'john.doe@gonep.com',
      phone: '+1 (555) 987-6543',
      hireDate: '2019-03-15',
      status: 'Active',
      avatar: '🧑‍💼'
    },
    {
      id: 3,
      name: 'Alice Brown',
      role: 'Recruiter',
      department: 'HR',
      email: 'alice.brown@gonep.com',
      phone: '+1 (555) 222-3333',
      hireDate: '2022-08-10',
      status: 'Active',
      avatar: '👩‍🎓'
    },
    {
      id: 4,
      name: 'Bob Lee',
      role: 'Accountant',
      department: 'Finance',
      email: 'bob.lee@gonep.com',
      phone: '+1 (555) 444-5555',
      hireDate: '2020-11-20',
      status: 'Inactive',
      avatar: '🧑‍💻'
    }
  ];

  // Add employee form state
  let newEmp = {
    name: '', role: '', department: '', email: '', phone: '', hireDate: '', status: 'Active'
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

  function addEmployee() {
    formError = '';
    formSuccess = '';
    if (!newEmp.name || !newEmp.role || !newEmp.department || !newEmp.email || !newEmp.phone || !newEmp.hireDate) {
      formError = 'All fields are required.';
      return;
    }
    if (employees.some(e => e.email === newEmp.email)) {
      formError = 'An employee with this email already exists.';
      return;
    }
    employees = [
      ...employees,
      {
        id: Math.max(0, ...employees.map(e => e.id)) + 1,
        ...newEmp,
        avatar: '👤' // fallback default
      }
    ];
    formSuccess = 'Employee added successfully!';
    setTimeout(() => {
      showEmployeeForm = false;
      formSuccess = '';
      newEmp = { name: '', role: '', department: '', email: '', phone: '', hireDate: '', status: 'Active' };
    }, 1200);
  }

  $: filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const hrMetrics = {
    totalEmployees: '45',
    newHires: '3',
    activeRecruitment: '5',
    pendingLeaves: '2'
  };
  
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
      <MetricCard title="Total Employees" value={hrMetrics.totalEmployees} color="primary" />
      <MetricCard title="New Hires" value={hrMetrics.newHires} color="success" />
      <MetricCard title="Active Recruitment" value={hrMetrics.activeRecruitment} color="info" />
  <MetricCard title="Pending Leaves" value={hrMetrics.pendingLeaves} color="danger" />
    </div>

    <div class="dashboard-row" style="align-items: flex-start;">
      <!-- Employee List -->
  <div style="background: var(--color-background); border-radius: 1.25rem; box-shadow: 0 4px 24px rgba(16,30,54,0.08); padding: 2rem; min-width: 320px; border: 1px solid var(--color-border); color: var(--color-text-primary);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h2 class="text-lg font-semibold" style="color: var(--color-primary);">Employees</h2>
          <input class="form-input" placeholder="Search..." style="max-width: 140px;" bind:value={searchTerm} />
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          {#each filteredEmployees as emp}
            <button type="button" class="flex items-center gap-4 p-3 rounded-lg cursor-pointer shadow-sm w-full text-left" style="background: var(--color-background); border: 1px solid var(--color-border);" on:click={() => viewEmployee(emp)} aria-label={`View profile for ${emp.name}`}> 
              <div class="employee-avatar" style="font-size: 2rem; background: var(--color-primary); color: #fff; border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
                {emp.avatar}
              </div>
              <div style="flex: 1;">
                <div class="font-semibold" style="color: var(--color-primary);">{emp.name}</div>
                <div class="text-sm" style="color: var(--color-text-secondary);">{emp.role} &mdash; {emp.department}</div>
              </div>
              <span class="badge" style="background: {emp.status === 'Active' ? 'var(--color-success-bg, #d1fae5)' : 'var(--color-warning-bg, #fef9c3)'}; color: {emp.status === 'Active' ? 'var(--color-success)' : 'var(--color-warning)'};">{emp.status}</span>
            </button>
          {/each}
          {#if filteredEmployees.length === 0}
            <div class="text-center py-6" style="color: var(--color-text-secondary);">No employees found.</div>
          {/if}
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
              <div class="employee-avatar" style="font-size: 2.5rem; background: var(--color-primary); color: #fff; border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center;">
                {selectedEmployee.avatar}
              </div>
              <div>
                <div class="font-bold text-xl" style="color: var(--color-primary);">{selectedEmployee.name}</div>
                <div class="text-sm" style="color: var(--color-text-secondary);">{selectedEmployee.role} &mdash; {selectedEmployee.department}</div>
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
                <span>{selectedEmployee.hireDate}</span>
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
        <div style="background: var(--color-background); border-radius: 1rem; box-shadow: 0 4px 16px rgba(16,30,54,0.12); width: 100%; max-width: 340px; padding: 1.25rem 1.5rem; position: relative; border: 1px solid var(--color-border); color: var(--color-text-primary);">
          <h2 class="text-lg font-semibold mb-3" style="color: var(--color-primary);">Add Employee</h2>
          <form on:submit|preventDefault={addEmployee}>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-name">Name</label>
              <input id="emp-name" class="form-input" placeholder="Full name" bind:value={newEmp.name} bind:this={nameInput} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-role">Role</label>
              <input id="emp-role" class="form-input" placeholder="Role" bind:value={newEmp.role} />
            </div>
            <div class="form-group mb-2">
              <label class="form-label" for="emp-dept">Department</label>
              <input id="emp-dept" class="form-input" placeholder="Department" bind:value={newEmp.department} />
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
              <input id="emp-hiredate" class="form-input" type="date" bind:value={newEmp.hireDate} />
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
