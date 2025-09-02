import { pb } from './pocketbase';

export async function getDocuments() {
  return await pb.collection('documents').getFullList();
}

export async function getDocument(id: string) {
  return await pb.collection('documents').getOne(id);
}

export async function createDocument(data: any) {
  return await pb.collection('documents').create(data);
}

export async function updateDocument(id: string, data: any) {
  return await pb.collection('documents').update(id, data);
}

export async function deleteDocument(id: string) {
  return await pb.collection('documents').delete(id);
}
