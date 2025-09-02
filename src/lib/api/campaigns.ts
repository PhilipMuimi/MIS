import { pb } from './pocketbase';

export async function getCampaigns() {
  return await pb.collection('campaigns').getFullList();
}

export async function getCampaign(id: string) {
  return await pb.collection('campaigns').getOne(id);
}

export async function createCampaign(data: any) {
  return await pb.collection('campaigns').create(data);
}

export async function updateCampaign(id: string, data: any) {
  return await pb.collection('campaigns').update(id, data);
}

export async function deleteCampaign(id: string) {
  return await pb.collection('campaigns').delete(id);
}
