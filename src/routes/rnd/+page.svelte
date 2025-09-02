<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  import { onMount } from 'svelte';
  import { getProjects } from '$lib/api/projects';
  import { getEmployees } from '$lib/api/employees';
  let projects: any[] = [];
  let employees: any[] = [];
  let loading = false;
  let activeProjects = 0;
  let completedProjects = 0;
  let budgetUtilization = 0;
  let teamMembers = 0;
  let projectsThisQuarter = 0;
  let completedThisYear = 0;

  onMount(async () => {
    loading = true;
    try {
      projects = await getProjects();
      console.log('Loaded projects:', projects);
      employees = await getEmployees();
      // Metrics
      activeProjects = projects.filter(p => p.status === 'In Progress' || p.status === 'Testing').length;
      completedProjects = projects.filter(p => p.status === 'Completed').length;
      // Budget Utilization: use a field if available, else simulate
      budgetUtilization = projects.reduce((sum, p) => sum + (p.budget_utilization || 0), 0);
      if (projects.length > 0) budgetUtilization = Math.round(budgetUtilization / projects.length);
      teamMembers = employees.length;
      // Projects started this quarter
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3);
      projectsThisQuarter = projects.filter(p => {
        const d = p.start_date ? new Date(p.start_date) : null;
        return d && d.getFullYear() === now.getFullYear() && Math.floor(d.getMonth() / 3) === quarter;
      }).length;
      // Completed this year
      completedThisYear = projects.filter(p => {
        const d = p.end_date ? new Date(p.end_date) : null;
        return p.status === 'Completed' && d && d.getFullYear() === now.getFullYear();
      }).length;
    } catch (e) {
      console.error('Error loading R&D dashboard:', e);
    }
    loading = false;
  });
  let error = '';
  function getField(obj, ...fields) {
    for (const f of fields) if (obj && obj[f] !== undefined && obj[f] !== null) return obj[f];
    return '';
  }
</script>

<Layout>
  <div class="rnd-dashboard-bg">
    <a href="/" class="back-arrow-link" aria-label="Back to Home" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.2rem; font-size: 1.1rem; color: var(--color-primary, #2563eb); text-decoration: none; font-weight: 500;">
      <span style="font-size: 1.3em;">&#8592;</span> Back
    </a>

    <!-- R&D Metrics -->
    <div class="rnd-metrics-grid">
      <MetricCard
        title="Active Projects"
        value={activeProjects}
        change={`+${projectsThisQuarter} this quarter`}
        trend="up"
        color="primary"
      />
      <MetricCard
        title="Completed Projects"
        value={completedProjects}
        change={`${completedThisYear} this year`}
        trend="neutral"
        color="success"
      />
      <MetricCard
        title="Budget Utilization"
        value={budgetUtilization + '%'}
        change="Of allocated budget"
        trend="neutral"
        color="info"
      />
      <MetricCard
        title="Team Members"
        value={teamMembers}
        change="Researchers & Scientists"
        trend="neutral"
        color="info"
      />
    </div>

    <!-- Projects List -->
    <div class="rnd-projects-card" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border); border-radius: 1.25rem;">
      <div class="rnd-projects-header">
        <h2 class="text-xl font-semibold" style="color: var(--color-primary);">Current Projects</h2>
  <span class="text-sm" style="color: var(--color-text-secondary);">{projects.length} total</span>
      </div>
      {#if loading}
        <div style="padding:2rem; text-align:center; color:var(--color-text-secondary);">Loading projects...</div>
      {:else if error}
        <div style="padding:2rem; text-align:center; color:var(--color-error);">{error}</div>
      {:else if projects.length === 0}
        <div style="padding:2rem; text-align:center; color:var(--color-text-secondary);">No projects found.</div>
      {:else}
      <div class="rnd-projects-list">
        {#each projects as project}
          <div class="rnd-project-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="flex: 1;">
                <h3 class="rnd-project-title">{project.name}</h3>
                <p class="rnd-project-lead">Lead: {project.lead || project.project_lead || 'N/A'}</p>
                <p class="rnd-project-deadline">Deadline: {project.deadline || project.end_date || 'N/A'}</p>
              </div>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="text-align: center;">
                  <div style="width: 4rem; height: 4rem; position: relative;">
                    <svg style="width: 4rem; height: 4rem; transform: rotate(-90deg);" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--color-border)"
                        stroke-width="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--color-primary)"
                        stroke-width="8"
                        fill="transparent"
                        stroke-dasharray="{2 * Math.PI * 40}"
                        stroke-dashoffset="{2 * Math.PI * 40 * (1 - (project.completion || project.progress || 0) / 100)}"
                        stroke-linecap="round"
                      />
                    </svg>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary);">{project.completion || project.progress || 0}%</span>
                    </div>
                  </div>
                </div>
                <span class="rnd-status-badge" style="
                  background: {project.status === 'Completed' ? 'var(--color-success-bg, #d1fae5)' : project.status === 'In Progress' ? 'var(--color-warning-bg, #fef9c3)' : 'var(--color-info-bg, #e0f2fe)'};
                  color: {project.status === 'Completed' ? 'var(--color-success)' : project.status === 'In Progress' ? 'var(--color-warning)' : 'var(--color-info)'};
                  padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.95rem; font-weight: 600;">
                  {project.status}
                </span>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
      {/if}
    </div>
  </div>
</Layout>

<style>
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
