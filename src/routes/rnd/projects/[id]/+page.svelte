<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import ChartJS from 'chart.js/auto';

  // Simulated project data (replace with real fetch as needed)
  let project = {
    id: 1,
    name: 'Antibiotic Research',
    lead: 'Dr. Sarah Johnson',
    status: 'In Progress',
    deadline: '2025-12-15',
    stages: [
      { name: 'Planning', progress: 100 },
      { name: 'Research', progress: 80 },
      { name: 'Testing', progress: 40 },
      { name: 'Approval', progress: 0 }
    ]
  };

  import type { Chart as ChartJSInstance } from 'chart.js';
  let chart: ChartJSInstance | null = null;
  let chartCanvas: HTMLCanvasElement | null = null;
  onMount(() => {
    if (chart) chart.destroy();
    if (chartCanvas) {
      chart = new ChartJS(chartCanvas, {
        type: 'bar',
        data: {
          labels: project.stages.map(s => s.name),
          datasets: [
            {
              label: 'Stage Progress (%)',
              data: project.stages.map(s => s.progress),
              backgroundColor: [
                '#2563eb', '#38bdf8', '#fbbf24', '#22c55e'
              ],
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    }
    return () => chart && chart.destroy();
  });
</script>

<div class="rnd-dashboard-bg">
  <div class="rnd-dashboard-header">
    <div>
      <h1 class="rnd-dashboard-title">{project.name}</h1>
      <p class="rnd-dashboard-subtitle">Lead: {project.lead} &mdash; Status: {project.status} &mdash; Deadline: {project.deadline}</p>
    </div>
    <Button variant="secondary" href="/rnd/projects">Back to Projects</Button>
  </div>

  <div class="rnd-projects-card" style="max-width: 700px; margin: 0 auto;">
    <div class="rnd-projects-header">
      <h2 class="text-lg font-semibold text-brand-dark">Project Stages Progress</h2>
    </div>
    <div style="padding: 2rem;">
      <canvas bind:this={chartCanvas} style="max-width: 100%; height: 320px;"></canvas>
    </div>
  </div>
</div>
