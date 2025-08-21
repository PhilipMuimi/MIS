<script lang="ts">
  import { onMount } from 'svelte';
  let chartEl: HTMLCanvasElement;
  let chart: any;
  export let data: number[] = [12000, 15000, 18000, 20000, 25000, 22000, 125000];
  export let labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  onMount(() => {
    let destroyed = false;
    (async () => {
      const Chart = (await import('chart.js/auto')).default;
      if (destroyed) return;
      chart = new Chart(chartEl, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Monthly Sales',
            data,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.08)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#2563eb',
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { color: '#666' } },
            x: { ticks: { color: '#666' } }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    })();
    return () => {
      destroyed = true;
      chart?.destroy();
    };
  });
</script>
<div style="height: 260px; width: 100%;">
  <canvas bind:this={chartEl} aria-label="Sales chart"></canvas>
</div>
