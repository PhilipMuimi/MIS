<script lang="ts">
  export let type: 'info' | 'warning' | 'error' | 'success' = 'info';
  export let title: string;
  export let message: string;
  export let action: string = '';
  export let href: string = '';
  
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };
  
  const iconClasses = {
    info: '🔵',
    warning: '⚠️',
    error: '🔴',
    success: '✅'
  };
</script>

<div class="border rounded-xl p-5 {typeClasses[type]} transition-all duration-200 hover:shadow-md">
  <div class="flex items-start">
    <span class="mr-4 text-xl">{iconClasses[type]}</span>
    <div class="flex-1">
      <h4 class="font-semibold text-sm mb-1">{title}</h4>
      <p class="text-sm opacity-90 mb-3">{message}</p>
      {#if action && href}
        <a href={href} class="text-sm font-medium underline hover:no-underline transition-all duration-200">
          {action}
        </a>
      {/if}
    </div>
  </div>
</div>
