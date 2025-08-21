<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<div class="settings-center-container">
  <div class="settings-header-row">
    <h1 class="settings-title">Settings</h1>
    <a href="/" class="back-arrow-link" aria-label="Back to Main Page">
      <span class="back-arrow">&#8592;</span> Back
    </a>
  </div>
  <p class="settings-subtitle">Manage your account, preferences, and security</p>

  <div class="settings-sections">
    <!-- Profile Section -->
    <section class="settings-section">
      <h2 class="settings-section-title">Profile</h2>
      <div class="settings-row">
        <div class="settings-avatar">
          <img src="/logo.png" alt="User Avatar" />
        </div>
        <div>
          <div class="settings-label">Name</div>
          <input class="settings-input" type="text" value="Admin User" />
          <div class="settings-label">Email</div>
          <input class="settings-input" type="email" value="admin@gonepharm.com" />
        </div>
      </div>
      <div class="settings-btn-row"><Button variant="primary">Save Profile</Button></div>
    </section>

    <!-- Preferences Section -->
    <section class="settings-section">
      <h2 class="settings-section-title">Preferences</h2>
      <div class="settings-row">
        <div>
          <div class="settings-label">Theme</div>
          <select class="settings-input">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
        <div>
          <div class="settings-label">Language</div>
          <select class="settings-input">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
      <div class="settings-btn-row"><Button variant="primary">Save Preferences</Button></div>
    </section>

    <!-- Notifications Section -->
    <section class="settings-section">
      <h2 class="settings-section-title">Notifications</h2>
      <div class="settings-row settings-checkbox-row">
        <label><input type="checkbox" checked /> Email Alerts</label>
        <label><input type="checkbox" /> SMS Alerts</label>
        <label><input type="checkbox" checked /> Push Notifications</label>
      </div>
      <div class="settings-btn-row"><Button variant="primary">Save Notifications</Button></div>
    </section>

    <!-- Security Section -->
    <section class="settings-section">
      <h2 class="settings-section-title">Security</h2>
      <div class="settings-row">
        <div>
          <div class="settings-label">Change Password</div>
          <input class="settings-input" type="password" placeholder="New Password" />
        </div>
        <div>
          <div class="settings-label">Two-Factor Auth</div>
          <select class="settings-input">
            <option>Disabled</option>
            <option>Enabled</option>
          </select>
        </div>
      </div>
      <div class="settings-btn-row"><Button variant="primary">Update Security</Button></div>
    </section>
  </div>
</div>

<style>
.settings-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary, #2563eb);
  margin-bottom: 0.25rem;
}
.settings-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.settings-center-container {
  max-width: 950px;
  margin: 2.5rem auto 0 auto;
  padding: 0 1.5rem 3rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
}
.settings-sections {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 0 2vw 3rem 2vw;
  box-sizing: border-box;
}
.settings-section {
  background: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  border: 1px solid var(--color-border, #e5e7eb);
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  width: 100%;
  min-width: 0;
}
@media (max-width: 900px) {
  .settings-section {
    padding: 1.25rem 0.75rem 1rem 0.75rem;
  }
}
.settings-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary, #2563eb);
  margin-bottom: 0.5rem;
}
.settings-row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}
.settings-checkbox-row {
  gap: 1.5rem;
}
.settings-avatar img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid var(--color-border, #e5e7eb);
}
.settings-label {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 0.25rem;
  font-weight: 500;
}
.settings-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border, #e5e7eb);
  background: #fff;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
.settings-input:focus {
  outline: 2px solid var(--color-primary, #2563eb);
  border-color: var(--color-primary, #2563eb);
}
.back-arrow-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.25rem;
  transition: color 0.15s;
}
.back-arrow-link:hover {
  color: #174ea6;
  text-decoration: underline;
}
.back-arrow {
  font-size: 1.25rem;
  line-height: 1;
}
.settings-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.settings-btn-row {
  margin-top: 1rem;
}
</style>
