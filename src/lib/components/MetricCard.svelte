<script lang="ts">
  export let title: string;
  export let value: string | number;
  export let change: string = '';
  export let trend: 'up' | 'down' | 'neutral' = 'neutral';
  export let color: 'primary' | 'success' | 'danger' | 'info' = 'primary';
  
  const colorClasses = {
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    danger: 'bg-red-50 border-red-200',
    info: 'bg-gray-50 border-gray-200'
  };
  
  const textColorClasses = {
    primary: 'text-brand-primary',
    success: 'text-green-600', 
    danger: 'text-red-600',
    info: 'text-gray-700'
  };
</script>

<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
  <h3 class="text-sm font-medium text-gray-500 mb-3">{title}</h3>
  <div class="flex items-end justify-between">
    <div>
      <p class="text-3xl font-bold {textColorClasses[color]} mb-1">{value}</p>
      {#if change}
        <p class="text-sm flex items-center">
          {#if trend === 'up'}
            <span class="text-green-600 mr-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          {:else if trend === 'down'}
            <span class="text-red-600 mr-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          {:else}
            <span class="text-gray-500 mr-1">→</span>
          {/if}
          <span class="text-gray-600">{change}</span>
        </p>
      {/if}
    </div>
  </div>
</div>
