<script lang="ts">
  import { goto } from '$app/navigation';
  let email = '';
  let password = '';
  let showPassword = false;
  let error = '';
  import { login } from '$lib/api/auth';
  async function handleLogin(e: Event) {
    e.preventDefault();
    error = '';
    if (!email || !password) {
      error = 'Please enter both email and password.';
      return;
    }
    try {
      await login(email, password);
      goto('/');
    } catch (err: any) {
      error = err?.message || 'Invalid credentials.';
    }
  }
</script>

<div class="auth-container">
  <a href="/" class="back-arrow-link" aria-label="Back to Home" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.2rem; font-size: 1.1rem; color: var(--color-primary, #2563eb); text-decoration: none; font-weight: 500;">
    <span style="font-size: 1.3em;">&#8592;</span> Back
  </a>
  <form class="auth-form" on:submit|preventDefault={handleLogin}>
    <img src="/logo.png" alt="Logo" class="auth-logo" />
    <h1 class="auth-title">Sign in to GONEP IMS</h1>
    {#if error}
      <div class="auth-error">{error}</div>
    {/if}
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} placeholder="Enter your email" required class="auth-input" />
    <label for="password">Password</label>
    <div class="auth-password-row">
      <input id="password" type={showPassword ? 'text' : 'password'} bind:value={password} placeholder="Enter your password" required class="auth-input" />
      <button type="button" class="show-btn" on:click={() => showPassword = !showPassword} aria-label="Show/hide password">{showPassword ? '🙈' : '👁️'}</button>
    </div>
    <button type="submit" class="auth-btn">Login</button>
    <div class="auth-link-row">
      <span>Don't have an account?</span>
      <a href="/auth/register" class="auth-link">Register</a>
    </div>
  </form>
</div>

<style>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
}
.auth-form {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}
.auth-logo {
  width: 56px;
  height: 56px;
  margin: 0 auto 0.5rem auto;
  border-radius: 0.5rem;
  object-fit: contain;
  background: #f1f5f9;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.04);
}
.auth-title {
  text-align: center;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-primary, #2563eb);
  margin-bottom: 0.5rem;
}
.auth-error {
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.98rem;
  text-align: center;
}
.auth-input {
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
  margin-bottom: 0.1rem;
}
.auth-input:focus {
  outline: 2px solid var(--color-primary, #2563eb);
  border-color: var(--color-primary, #2563eb);
}
.auth-btn {
  background: var(--color-primary, #2563eb);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.7rem 0;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.15s;
}
.auth-btn:hover {
  background: #174ea6;
}
.auth-link-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.98rem;
  margin-top: 0.5rem;
}
.auth-link {
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}
.auth-link:hover {
  color: #174ea6;
  text-decoration: underline;
}
.auth-password-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.show-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #888;
  padding: 0 0.3rem;
  margin-left: -2.2rem;
  margin-top: 0.1rem;
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
