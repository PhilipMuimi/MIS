import { pb } from './pocketbase';

export async function getProjects() {
  return await pb.collection('projects').getFullList();
}

export async function getProject(id: string) {
  return await pb.collection('projects').getOne(id);
}

export async function createProject(data: any) {
  return await pb.collection('projects').create(data);
}

export async function updateProject(id: string, data: any) {
  return await pb.collection('projects').update(id, data);
}

export async function deleteProject(id: string) {
  return await pb.collection('projects').delete(id);
}
