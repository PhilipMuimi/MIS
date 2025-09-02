import { pb } from './pocketbase';

// Login user
export async function login(email: string, password: string) {
  return await pb.collection('users').authWithPassword(email, password);
}

// Register user
export async function register(data: any) {
  // Ensure passwordConfirm is camelCase for PocketBase
  if (data.passwordConfirm === undefined && data.password_confirm !== undefined) {
    data.passwordConfirm = data.password_confirm;
    delete data.password_confirm;
  }
  return await pb.collection('users').create(data);
}

// Logout user
export function logout() {
  pb.authStore.clear();
}

// Get current user
export function getCurrentUser() {
  return pb.authStore.model;
}

// Check if user is authenticated
export function isAuthenticated() {
  return pb.authStore.isValid;
}
