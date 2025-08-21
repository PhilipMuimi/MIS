<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let navOpen = false;
  let menuOpen = false;

  const navigationSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', href: '/', icon: '📊', description: 'Company-wide metrics and overview' }
      ]
    },
    {
      title: 'Departments',
      items: [
        { label: 'Finance', href: '/finance', icon: '💰', description: 'Financial transactions and reports' },
        { label: 'HR Management', href: '/hr', icon: '👥', description: 'Employee records and recruitment' },
        { label: 'Sales & Marketing', href: '/sales', icon: '📈', description: 'Campaigns and sales reports' }
      ]
    },
    {
      title: 'Management',
      items: [
        { label: 'Documents', href: '/documents', icon: '📁', description: 'Document management system' }
      ]
    }
  ];

  function isActiveRoute(href: string): boolean {
    if (href === '/') return $page.url.pathname === '/';
    return $page.url.pathname.startsWith(href);
  }

  function toggleNav() {
    navOpen = !navOpen;
  }

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navOpen = false;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<!-- Top Navigation Layout -->
<div class="app-layout">
  <!-- Top NavBar -->
  <header class="top-navbar">
    <div class="brand-logo">
  <div class="brand-icon"><img src="/logo.png" alt="GONEP Logo" style="height: 32px; width: 32px; object-fit: contain; border-radius: 0.25rem; background: transparent;" /></div>
      <div class="brand-name">GONEP</div>
    </div>

    <button class="mobile-toggle" on:click={toggleNav}>☰</button>

    <nav class:open={navOpen}>
      {#each navigationSections as section}
        {#each section.items as item}
          <a 
            href={item.href} 
            class="nav-link"
            class:active={isActiveRoute(item.href)}
            title={item.description}
          >
            <span class="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        {/each}
      {/each}
    </nav>

    <!-- Custom Menu Button -->
    <div class="menu-wrapper">
      <button class="menu-btn" aria-label="Open menu" on:click={() => menuOpen = !menuOpen}>
        <span class="menu-lines"></span>
        <span class="menu-lines"></span>
        <span class="menu-lines"></span>
      </button>
      {#if menuOpen}
        <div class="menu-dropdown">
          <a href="/auth/login" class="menu-link">Login</a>
          <a href="/auth/register" class="menu-link">Register</a>
          <a href="/settings" class="menu-link">Settings</a>
          <a href="/rnd" class="menu-link">R&amp;D</a>
        </div>
      {/if}
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content">
    <div class="page-header">
      <h1 class="page-title">
        <slot name="title"></slot>
      </h1>
      <p class="page-subtitle">
        <slot name="subtitle"></slot>
      </p>
    </div>

    <div class="content-body">
      <slot />
    </div>
  </main>

  <footer class="static-footer">
    <div class="footer-content">
      <span>&copy; {new Date().getFullYear()} Gonep IMS. All rights reserved.</span>
      <span class="footer-links">
        <a href="/" class="footer-link">Home</a>
        <a href="/settings" class="footer-link">Settings</a>
        <a href="/documents" class="footer-link">Documents</a>
      </span>
    </div>
  </footer>
</div>

<style>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .top-navbar {
    display: flex;
    align-items: center;
    background: #2d3748;
    color: white;
    padding: 0.5rem 1rem;
    gap: 1rem;
  }
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  .brand-icon {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  .nav-link {
    color: white;
    text-decoration: none;
    margin: 0 0.5rem;
    cursor: pointer;
  }
  .nav-link.active {
    border-bottom: 2px solid white;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
    position: relative;
    z-index: 10;
  }
  .menu-wrapper {
    position: relative;
    margin-left: 1rem;
  }
  .menu-btn {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    cursor: pointer;
    padding: 0.5rem;
    align-items: center;
    justify-content: center;
  }
  .menu-lines {
    width: 28px;
    height: 3px;
    background: #fff;
    border-radius: 2px;
    display: block;
  }
  .menu-dropdown {
    position: absolute;
    right: 0;
    top: 120%;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
    z-index: 100;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }
  .menu-link {
    color: #222;
    text-decoration: none;
    font-size: 1.05rem;
    padding: 0.7rem 1.2rem;
    border: none;
    background: none;
    text-align: left;
    transition: background 0.15s, color 0.15s;
    border-bottom: 1px solid #f1f1f1;
  }
  .menu-link:last-child {
    border-bottom: none;
  }
  .menu-link:hover {
    background: var(--color-primary-bg, #eff6ff);
    color: var(--color-primary, #2563eb);
  }
  .main-content {
    flex: 1;
    padding: 2rem 1rem;
    background: #f7fafc;
    overflow-y: auto;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .static-footer {
    width: 100vw;
    background: var(--color-background, #f9fafb);
    color: var(--color-text-secondary, #666);
    border-top: 1px solid var(--color-border, #e5e7eb);
    padding: 1.1rem 0;
    font-size: 1rem;
    margin-top: auto;
  }
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 1.5rem;
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-link {
    color: var(--color-primary, #2563eb);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }
  .footer-link:hover {
    color: #174ea6;
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    .footer-content {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
      padding: 0 0.75rem;
    }
    .footer-links {
      gap: 1rem;
    }
  }
  @media (max-width: 768px) {
    nav {
      display: none;
      flex-direction: column;
      background: #2d3748;
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 20;
    }
    nav.open {
      display: flex;
    }
    .mobile-toggle {
      display: block;
    }
  }
  @media (min-width: 769px) {
    nav {
      display: flex !important;
      position: static;
      background: none;
    }
    .mobile-toggle {
      display: none;
    }
  }
</style>
