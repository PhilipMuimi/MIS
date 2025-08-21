<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  let showModal = false;
  let projects = [
    { id: 1, name: 'Antibiotic Research', status: 'In Progress', lead: 'Dr. Sarah Johnson', deadline: '2025-12-15' },
    { id: 2, name: 'Vaccine Phase II', status: 'Testing', lead: 'Dr. Mike Chen', deadline: '2026-03-20' },
    { id: 3, name: 'Pain Relief Formula', status: 'Completed', lead: 'Dr. Lisa Wong', deadline: '2025-07-30' }
  ];

  // Form state
  let form = { name: '', status: 'In Progress', lead: '', deadline: '' };
  let errors = { name: '', lead: '', deadline: '' };

  function openModal() {
    form = { name: '', status: 'In Progress', lead: '', deadline: '' };
    errors = { name: '', lead: '', deadline: '' };
    showModal = true;
  }
  function closeModal() {
    showModal = false;
  }
  function validate() {
    errors = { name: '', lead: '', deadline: '' };
    if (!form.name.trim()) errors.name = 'Project name is required.';
    if (!form.lead.trim()) errors.lead = 'Project lead is required.';
    if (!form.deadline.trim()) errors.deadline = 'Deadline is required.';
    return !errors.name && !errors.lead && !errors.deadline;
  }
  function addProject() {
    if (!validate()) return;
    projects = [
      ...projects,
      {
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
        name: form.name,
        status: form.status,
        lead: form.lead,
        deadline: form.deadline
      }
    ];
    closeModal();
  }
</script>

<div class="rnd-dashboard-bg">
  <div class="rnd-dashboard-header">
    <div>
      <h1 class="rnd-dashboard-title">Projects</h1>
      <p class="rnd-dashboard-subtitle">All R&D projects and their current status</p>
    </div>
    <Button variant="primary" on:click={openModal}>+ New Project</Button>
  {#if showModal}
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 50; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 1rem; box-shadow: 0 8px 32px rgba(16,30,54,0.18); width: 100%; max-width: 420px; padding: 2rem; position: relative;">
        <h2 class="text-xl font-semibold mb-4">Create New Project</h2>
        <form on:submit|preventDefault={addProject}>
          <div class="form-group">
            <label class="form-label" for="project-name">Project Name</label>
            <input id="project-name" class="form-input" bind:value={form.name} placeholder="Enter project name" />
            {#if errors.name}<div class="text-error text-sm mt-1">{errors.name}</div>{/if}
          </div>
          <div class="form-group">
            <label class="form-label" for="project-status">Status</label>
            <select id="project-status" class="form-select" bind:value={form.status}>
              <option>In Progress</option>
              <option>Testing</option>
              <option>Completed</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="project-lead">Lead</label>
            <input id="project-lead" class="form-input" bind:value={form.lead} placeholder="Project lead name" />
            {#if errors.lead}<div class="text-error text-sm mt-1">{errors.lead}</div>{/if}
          </div>
          <div class="form-group">
            <label class="form-label" for="project-deadline">Deadline</label>
            <input id="project-deadline" class="form-input" type="date" bind:value={form.deadline} />
            {#if errors.deadline}<div class="text-error text-sm mt-1">{errors.deadline}</div>{/if}
          </div>
          <div class="flex items-center justify-end gap-4 mt-6">
            <Button variant="secondary" type="button" on:click={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit">Create</Button>
          </div>
        </form>
        <button on:click={closeModal} style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer;" aria-label="Close">&times;</button>
      </div>
    </div>
  {/if}
  </div>

  <div class="rnd-projects-card">
    <div class="rnd-projects-header">
      <h2 class="text-xl font-semibold text-brand-dark">Project List</h2>
      <span class="text-sm text-gray-400">{projects.length} total</span>
    </div>
    <div>
      {#each projects as project}
        <div class="rnd-project-card">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="flex: 1;">
              <h3 class="rnd-project-title">{project.name}</h3>
              <p class="rnd-project-lead">Lead: {project.lead}</p>
              <p class="rnd-project-deadline">Deadline: {project.deadline}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span class="rnd-status-badge {
                project.status === 'Completed' ? 'rnd-status-completed' :
                project.status === 'In Progress' ? 'rnd-status-inprogress' :
                project.status === 'Testing' ? 'rnd-status-testing' : ''
              }">
                {project.status}
              </span>
              <Button variant="secondary" size="sm" href={`/rnd/projects/${project.id}`}>View</Button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
