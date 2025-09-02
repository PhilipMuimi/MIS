<h1 class='text-xl font-bold'>Register</h1>

<script lang="ts">
  import { goto } from '$app/navigation';
  let name = '';
  let email = '';
  let username = '';
  let password = '';
  let confirmPassword = '';
  let showPassword = false;
  let error = '';
  import { register } from '$lib/api/auth';
  let success = '';

  // Client-side validation errors
  let errors = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  function validateEmail(email: string) {
    return /^[^\s@]+@[^^\s@]+\.[^\s@]+$/.test(email);
  }
  function validateUsername(username: string) {
    // PocketBase: 3-100 chars, alphanumeric, dashes, underscores
    return /^[a-zA-Z0-9_-]{3,100}$/.test(username);
  }
  function validateForm() {
    let valid = true;
    errors = { name: '', email: '', username: '', password: '', confirmPassword: '' };
    if (!name) {
      errors.name = 'Name is required.';
      valid = false;
    }
    if (!email) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!username) {
      errors.username = 'Username is required.';
      valid = false;
    } else if (!validateUsername(username)) {
      errors.username = 'Username must be 3-100 characters, only letters, numbers, dashes, or underscores.';
      valid = false;
    }
    if (!password) {
      errors.password = 'Password is required.';
      valid = false;
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
      valid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }
    return valid;
  }

  async function handleRegister(e: Event) {
    e.preventDefault();
    error = '';
    success = '';
    if (!validateForm()) {
      return;
    }
    try {
      await register({ email, password, passwordConfirm: confirmPassword, name, username });
      success = 'Registration successful! You can now log in.';
      setTimeout(() => goto('/auth/login'), 1200);
    } catch (err: any) {
      if (err?.data && typeof err.data === 'object') {
        error = Object.entries(err.data)
          .map(([field, val]) => {
            if (typeof val === 'object') {
              return `${field}: ${JSON.stringify(val)}`;
            }
            return `${field}: ${val}`;
          })
          .join(' | ');
      } else {
        error = err?.message || 'Registration failed.';
      }
    }
  }
</script>

<div class="auth-container">
  <form class="auth-form" on:submit|preventDefault={handleRegister}>
    {#if error}
      <div class="auth-error">{error}</div>
    {/if}
    {#if success}
      <div class="auth-success">{success}</div>
    {/if}
    <label for="name">Name</label>
    <input id="name" type="text" bind:value={name} placeholder="Enter your name" required class="auth-input" />
    {#if errors.name}
      <div class="text-red-500 text-xs mt-1">{errors.name}</div>
    {/if}
    <label for="username">Username</label>
    <input id="username" type="text" bind:value={username} placeholder="Choose a username" required class="auth-input" />
    {#if errors.username}
      <div class="text-red-500 text-xs mt-1">{errors.username}</div>
    {/if}
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} placeholder="Enter your email" required class="auth-input" />
    {#if errors.email}
      <div class="text-red-500 text-xs mt-1">{errors.email}</div>
    {/if}
    <label for="password">Password</label>
    <div class="auth-password-row">
      <input id="password" type={showPassword ? 'text' : 'password'} bind:value={password} placeholder="Create a password" required class="auth-input" />
      <button type="button" class="show-btn" on:click={() => showPassword = !showPassword} aria-label="Show/hide password">{showPassword ? '🙈' : '👁️'}</button>
    </div>
    {#if errors.password}
      <div class="text-red-500 text-xs mt-1">{errors.password}</div>
    {/if}
    <label for="confirmPassword">Confirm Password</label>
    <input id="confirmPassword" type={showPassword ? 'text' : 'password'} bind:value={confirmPassword} placeholder="Confirm your password" required class="auth-input" />
    {#if errors.confirmPassword}
      <div class="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>
    {/if}
    <button type="submit" class="auth-btn">Register</button>
    <div class="auth-link-row">
      <span>Already have an account?</span>
      <a href="/auth/login" class="auth-link">Login</a>
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
  font-size: 1.25rem;
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
.auth-success {
  background: #d1fae5;
  color: #059669;
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
</style>
