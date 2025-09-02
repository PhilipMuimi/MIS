import { pb } from './pocketbase';

export async function getEmployees() {
  return await pb.collection('employees').getFullList();
}

export async function getEmployee(id: string) {
  return await pb.collection('employees').getOne(id);
}

export async function createEmployee(data: any) {
  return await pb.collection('employees').create(data);
}

export async function updateEmployee(id: string, data: any) {
  return await pb.collection('employees').update(id, data);
}

export async function deleteEmployee(id: string) {
  return await pb.collection('employees').delete(id);
}
