<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import MetricCard from '$lib/components/MetricCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  const projects = [
    {
      id: 1,
      name: 'New Antibiotic Research',
      status: 'In Progress',
      completion: 65,
      lead: 'Dr. Sarah Johnson',
      deadline: '2025-12-15'
    },
    {
      id: 2,
      name: 'Vaccine Development Phase II',
      status: 'Testing',
      completion: 40,
      lead: 'Dr. Mike Chen',
      deadline: '2026-03-20'
    },
    {
      id: 3,
      name: 'Pain Relief Formula',
      status: 'Completed',
      completion: 100,
      lead: 'Dr. Lisa Wong',
      deadline: '2025-07-30'
    }
  ];
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
        value="12"
        change="+2 this quarter"
        trend="up"
        color="primary"
      />
      <MetricCard
        title="Completed Projects"
        value="8"
        change="This year"
        trend="neutral"
        color="success"
      />
      <MetricCard
        title="Budget Utilization"
        value="78%"
        change="Of allocated budget"
        trend="neutral"
        color="info"
      />
      <MetricCard
        title="Team Members"
        value="25"
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
      <div class="rnd-projects-list">
        {#each projects as project}
          <div class="rnd-project-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="flex: 1;">
                <h3 class="rnd-project-title">{project.name}</h3>
                <p class="rnd-project-lead">Lead: {project.lead}</p>
                <p class="rnd-project-deadline">Deadline: {project.deadline}</p>
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
                        stroke-dashoffset="{2 * Math.PI * 40 * (1 - project.completion / 100)}"
                        stroke-linecap="round"
                      />
                    </svg>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary);">{project.completion}%</span>
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
