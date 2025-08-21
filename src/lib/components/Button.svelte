<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  
  const variantClasses = {
    primary: 'bg-brand-primary hover:bg-brand-secondary text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    success: 'bg-brand-accent hover:bg-green-600 text-white shadow-lg hover:shadow-xl',
    danger: 'bg-brand-danger hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  $: baseClasses = `rounded-xl font-semibold transition-all duration-200 inline-block text-center ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
</script>

{#if href}
  <a
    {href}
    class={baseClasses}
    aria-disabled={disabled}
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={baseClasses}
    on:click
  >
    <slot />
  </button>
{/if}
