<script lang="ts">
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
  let employees: Employee[] = [
    { id: 1, name: 'Jane Smith', role: 'Software Engineer', department: 'Finance', email: 'jane.smith@gonep.com', phone: '+1 (555) 123-4567', hireDate: '2021-05-01', status: 'Active', avatar: '👩‍💻' },
    { id: 2, name: 'John Doe', role: 'HR Manager', department: 'HR', email: 'john.doe@gonep.com', phone: '+1 (555) 987-6543', hireDate: '2019-03-15', status: 'Active', avatar: '🧑‍💼' },
    { id: 3, name: 'Alice Brown', role: 'Recruiter', department: 'HR', email: 'alice.brown@gonep.com', phone: '+1 (555) 222-3333', hireDate: '2022-08-10', status: 'Active', avatar: '👩‍🎓' },
    { id: 4, name: 'Bob Lee', role: 'Accountant', department: 'Finance', email: 'bob.lee@gonep.com', phone: '+1 (555) 444-5555', hireDate: '2020-11-20', status: 'Inactive', avatar: '🧑‍💻' }
  ];
  let searchTerm = '';
  let selectedEmployee: Employee | null = null;
  let showEmployeeForm = false;
  let newEmp = { name: '', role: '', department: '', email: '', phone: '', hireDate: '', status: 'Active' };
  let formError = '';
  let formSuccess = '';
  let nameInput: HTMLInputElement | null = null;
  $: filteredEmployees = employees.filter((e: Employee) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
    if (employees.some((e: Employee) => e.email === newEmp.email)) {
      formError = 'An employee with this email already exists.';
      return;
    }
    employees = [
      ...employees,
      { id: Math.max(0, ...employees.map((e: Employee) => e.id)) + 1, ...newEmp, avatar: '👤' }
    ];
    formSuccess = 'Employee added successfully!';
    setTimeout(() => {
      showEmployeeForm = false;
      formSuccess = '';
      newEmp = { name: '', role: '', department: '', email: '', phone: '', hireDate: '', status: 'Active' };
    }, 1200);
  }
  function viewEmployee(emp: Employee) { selectedEmployee = emp; }
  function closeEmployeeProfile() { selectedEmployee = null; }
</script>
<div class="employee-page-container">
  <a href="/hr" class="back-arrow-link" aria-label="Back to HR" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.2rem; font-size: 1.1rem; color: var(--color-primary, #2563eb); text-decoration: none; font-weight: 500;">
    <span style="font-size: 1.3em;">&#8592;</span> Back
  </a>
  <div class="employee-header-row">
    <h1 class="employee-title">Employees</h1>
    <button class="employee-add-btn" on:click={openEmployeeForm}>+ Add Employee</button>
  </div>
  <div class="employee-search-row">
    <input class="employee-search-input" placeholder="Search..." bind:value={searchTerm} />
  </div>
  <div class="employee-list">
    {#each filteredEmployees as emp}
      <button type="button" class="employee-list-item" on:click={() => viewEmployee(emp)} aria-label={`View profile for ${emp.name}`}> 
        <span class="employee-avatar">{emp.avatar}</span>
        <span class="employee-info">
          <span class="employee-name">{emp.name}</span>
          <span class="employee-role">{emp.role} &mdash; {emp.department}</span>
        </span>
        <span class="employee-status {emp.status.toLowerCase()}">{emp.status}</span>
      </button>
    {/each}
    {#if filteredEmployees.length === 0}
      <div class="employee-empty">No employees found.</div>
    {/if}
  </div>
  {#if selectedEmployee}
    <div class="employee-profile-modal">
      <div class="employee-profile-card">
        <div class="employee-profile-header">
          <span class="employee-avatar-lg">{selectedEmployee?.avatar}</span>
          <span class="employee-profile-name">{selectedEmployee?.name}</span>
          <span class="employee-profile-role">{selectedEmployee?.role} &mdash; {selectedEmployee?.department}</span>
          <span class="employee-status {selectedEmployee?.status.toLowerCase()}">{selectedEmployee?.status}</span>
        </div>
        <div class="employee-profile-details">
          <div><b>Email:</b> {selectedEmployee?.email}</div>
          <div><b>Phone:</b> {selectedEmployee?.phone}</div>
          <div><b>Hire Date:</b> {selectedEmployee?.hireDate}</div>
        </div>
        <button class="employee-close-btn" on:click={closeEmployeeProfile} aria-label="Close">&times;</button>
      </div>
    </div>
  {/if}
  {#if showEmployeeForm}
    <div class="employee-form-modal">
      <div class="employee-form-card">
        <h2>Add Employee</h2>
        <form on:submit|preventDefault={addEmployee}>
          <input class="employee-form-input" placeholder="Full name" bind:value={newEmp.name} bind:this={nameInput} />
          <input class="employee-form-input" placeholder="Role" bind:value={newEmp.role} />
          <input class="employee-form-input" placeholder="Department" bind:value={newEmp.department} />
          <input class="employee-form-input" type="email" placeholder="Email" bind:value={newEmp.email} />
          <input class="employee-form-input" placeholder="Phone" bind:value={newEmp.phone} />
          <input class="employee-form-input" type="date" placeholder="Hire Date" bind:value={newEmp.hireDate} />
          <select class="employee-form-input" bind:value={newEmp.status}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          {#if formError}
            <div class="employee-form-error">{formError}</div>
          {/if}
          {#if formSuccess}
            <div class="employee-form-success">{formSuccess}</div>
          {/if}
          <div class="employee-form-actions">
            <button type="button" on:click={() => { showEmployeeForm = false; formError = ''; formSuccess = ''; }}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
        <button class="employee-close-btn" on:click={() => { showEmployeeForm = false; formError = ''; formSuccess = ''; }} aria-label="Close">&times;</button>
      </div>
    </div>
  {/if}
</div>
<style>
.employee-page-container {
  max-width: 800px;
  margin: 2.5rem auto;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
}
.employee-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.employee-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #2563eb);
}
.employee-add-btn {
  background: var(--color-primary, #2563eb);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.employee-add-btn:hover {
  background: #174ea6;
}
.employee-search-row {
  margin-bottom: 1.5rem;
}
.employee-search-input {
  width: 100%;
  max-width: 320px;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
}
.employee-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.employee-list-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition: background 0.13s, border 0.13s;
  text-align: left;
}
.employee-list-item:hover {
  background: #e0eaff;
  border-color: var(--color-primary, #2563eb);
}
.employee-avatar {
  font-size: 2rem;
  background: var(--color-primary, #2563eb);
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.employee-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.employee-name {
  font-weight: 600;
  color: var(--color-primary, #2563eb);
}
.employee-role {
  font-size: 0.98rem;
  color: #666;
}
.employee-status {
  font-size: 0.98rem;
  font-weight: 500;
  padding: 0.2rem 0.7rem;
  border-radius: 0.5rem;
  background: #e5e7eb;
  color: #444;
}
.employee-status.active {
  background: #d1fae5;
  color: #059669;
}
.employee-status.inactive {
  background: #fef9c3;
  color: #b45309;
}
.employee-empty {
  text-align: center;
  color: #888;
  padding: 2rem 0;
}
.employee-profile-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.employee-profile-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(16,30,54,0.12);
  width: 100%;
  max-width: 340px;
  padding: 1.25rem 1.5rem;
  position: relative;
  border: 1px solid #e5e7eb;
  color: #222;
}
.employee-profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}
.employee-avatar-lg {
  font-size: 2.5rem;
  background: var(--color-primary, #2563eb);
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.employee-profile-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary, #2563eb);
}
.employee-profile-role {
  font-size: 1rem;
  color: #666;
}
.employee-profile-details {
  margin-bottom: 1.2rem;
  font-size: 0.98rem;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.employee-close-btn {
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #bbb;
  cursor: pointer;
}
.employee-form-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  max-height: 100vh;
}
@media (max-width: 600px) {
  .employee-form-modal {
    padding: 0.5rem;
  }
  .employee-form-card {
    max-width: 98vw;
    min-width: 0;
  }
}
.employee-form-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(16,30,54,0.12);
  width: 100%;
  max-width: 340px;
  min-width: 0;
  padding: 1.25rem 1.5rem;
  position: relative;
  border: 1px solid #e5e7eb;
  color: #222;
  max-height: 90vh;
  overflow-y: auto;
}
.employee-form-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
  margin-bottom: 0.7rem;
}
.employee-form-error {
  color: #b91c1c;
  background: #fee2e2;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
}
.employee-form-success {
  color: #059669;
  background: #d1fae5;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
}
.employee-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 0.5rem;
}
.back-arrow-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  font-weight: 500;
}
.back-arrow-link:hover {
  text-decoration: underline;
  color: #174ea6;
}
</style>
