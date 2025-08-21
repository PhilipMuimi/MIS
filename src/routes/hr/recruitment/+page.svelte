<script lang="ts">
  let jobs = [
    { id: 1, title: 'Software Engineer', department: 'IT', status: 'Open', applicants: 5 },
    { id: 2, title: 'Accountant', department: 'Finance', status: 'Closed', applicants: 2 },
    { id: 3, title: 'HR Assistant', department: 'HR', status: 'Open', applicants: 3 }
  ];
  let candidates = [
    { id: 1, name: 'Emily Clark', job: 'Software Engineer', status: 'Interview', email: 'emily.clark@email.com' },
    { id: 2, name: 'Michael Lee', job: 'Accountant', status: 'Rejected', email: 'michael.lee@email.com' },
    { id: 3, name: 'Sarah Kim', job: 'HR Assistant', status: 'Offer', email: 'sarah.kim@email.com' }
  ];
  let showJobForm = false;
  let showCandidateForm = false;
  let newJob = { title: '', department: '', status: 'Open' };
  let newCandidate = { name: '', job: '', status: 'Applied', email: '' };
  let jobFormError = '';
  let candidateFormError = '';
  function openJobForm() { showJobForm = true; jobFormError = ''; }
  function openCandidateForm() { showCandidateForm = true; candidateFormError = ''; }
  function addJob() {
    if (!newJob.title || !newJob.department) { jobFormError = 'All fields required.'; return; }
    jobs = [...jobs, { id: Math.max(0, ...jobs.map(j => j.id)) + 1, ...newJob, applicants: 0 }];
    showJobForm = false; newJob = { title: '', department: '', status: 'Open' };
  }
  function addCandidate() {
    if (!newCandidate.name || !newCandidate.job || !newCandidate.email) { candidateFormError = 'All fields required.'; return; }
    candidates = [...candidates, { id: Math.max(0, ...candidates.map(c => c.id)) + 1, ...newCandidate }];
    showCandidateForm = false; newCandidate = { name: '', job: '', status: 'Applied', email: '' };
  }
</script>

<div class="recruitment-page-container">
  <a href="/hr" class="back-arrow-link" aria-label="Back to HR" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.2rem; font-size: 1.1rem; color: var(--color-primary, #2563eb); text-decoration: none; font-weight: 500;">
    <span style="font-size: 1.3em;">&#8592;</span> Back
  </a>
  <div class="recruitment-header-row">
    <h1 class="recruitment-title">Recruitment</h1>
    <button class="recruitment-add-btn" on:click={openJobForm}>+ Add Job</button>
    <button class="recruitment-add-btn" on:click={openCandidateForm}>+ Add Candidate</button>
  </div>
  <div class="recruitment-section">
    <h2>Job Openings</h2>
    <div class="recruitment-job-list">
      {#each jobs as job}
        <div class="recruitment-job-card">
          <div class="recruitment-job-title">{job.title}</div>
          <div class="recruitment-job-meta">{job.department} &mdash; <span class="recruitment-job-status {job.status.toLowerCase()}">{job.status}</span></div>
          <div class="recruitment-job-applicants">Applicants: {job.applicants}</div>
        </div>
      {/each}
      {#if jobs.length === 0}
        <div class="recruitment-empty">No job openings.</div>
      {/if}
    </div>
  </div>
  <div class="recruitment-section">
    <h2>Candidates</h2>
    <div class="recruitment-candidate-list">
      {#each candidates as c}
        <div class="recruitment-candidate-card">
          <div class="recruitment-candidate-name">{c.name}</div>
          <div class="recruitment-candidate-meta">{c.job} &mdash; <span class="recruitment-candidate-status {c.status.toLowerCase()}">{c.status}</span></div>
          <div class="recruitment-candidate-email">{c.email}</div>
        </div>
      {/each}
      {#if candidates.length === 0}
        <div class="recruitment-empty">No candidates.</div>
      {/if}
    </div>
  </div>
  {#if showJobForm}
    <div class="recruitment-modal">
      <div class="recruitment-modal-card">
        <h2>Add Job</h2>
        <form on:submit|preventDefault={addJob}>
          <input class="recruitment-form-input" placeholder="Job Title" bind:value={newJob.title} />
          <input class="recruitment-form-input" placeholder="Department" bind:value={newJob.department} />
          <select class="recruitment-form-input" bind:value={newJob.status}>
            <option>Open</option>
            <option>Closed</option>
          </select>
          {#if jobFormError}
            <div class="recruitment-form-error">{jobFormError}</div>
          {/if}
          <div class="recruitment-form-actions">
            <button type="button" on:click={() => showJobForm = false}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
        <button class="recruitment-close-btn" on:click={() => showJobForm = false} aria-label="Close">&times;</button>
      </div>
    </div>
  {/if}
  {#if showCandidateForm}
    <div class="recruitment-modal">
      <div class="recruitment-modal-card">
        <h2>Add Candidate</h2>
        <form on:submit|preventDefault={addCandidate}>
          <input class="recruitment-form-input" placeholder="Name" bind:value={newCandidate.name} />
          <input class="recruitment-form-input" placeholder="Job" bind:value={newCandidate.job} />
          <input class="recruitment-form-input" placeholder="Email" bind:value={newCandidate.email} />
          <select class="recruitment-form-input" bind:value={newCandidate.status}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          {#if candidateFormError}
            <div class="recruitment-form-error">{candidateFormError}</div>
          {/if}
          <div class="recruitment-form-actions">
            <button type="button" on:click={() => showCandidateForm = false}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
        <button class="recruitment-close-btn" on:click={() => showCandidateForm = false} aria-label="Close">&times;</button>
      </div>
    </div>
  {/if}
</div>

<style>
.recruitment-page-container {
  max-width: 900px;
  margin: 2.5rem auto;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
}
.recruitment-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.recruitment-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #2563eb);
  flex: 1;
}
.recruitment-add-btn {
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
.recruitment-add-btn:hover {
  background: #174ea6;
}
.recruitment-section {
  margin-bottom: 2.5rem;
}
.recruitment-job-list, .recruitment-candidate-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}
.recruitment-job-card, .recruitment-candidate-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem 1.2rem;
  min-width: 220px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.recruitment-job-title, .recruitment-candidate-name {
  font-weight: 600;
  color: var(--color-primary, #2563eb);
  font-size: 1.1rem;
}
.recruitment-job-meta, .recruitment-candidate-meta {
  font-size: 0.98rem;
  color: #666;
}
.recruitment-job-status.open {
  background: #d1fae5;
  color: #059669;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-job-status.closed {
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-job-applicants {
  font-size: 0.97rem;
  color: #444;
}
.recruitment-candidate-status.applied {
  background: #e0eaff;
  color: #2563eb;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-candidate-status.interview {
  background: #fef9c3;
  color: #b45309;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-candidate-status.offer {
  background: #d1fae5;
  color: #059669;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-candidate-status.rejected {
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 0.5rem;
  padding: 0.1rem 0.6rem;
  margin-left: 0.5rem;
}
.recruitment-candidate-email {
  font-size: 0.97rem;
  color: #444;
}
.recruitment-empty {
  text-align: center;
  color: #888;
  padding: 2rem 0;
}
.recruitment-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.recruitment-modal-card {
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
.recruitment-form-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
  margin-bottom: 0.7rem;
}
.recruitment-form-error {
  color: #b91c1c;
  background: #fee2e2;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
}
.recruitment-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 0.5rem;
}
.recruitment-close-btn {
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #bbb;
  cursor: pointer;
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
