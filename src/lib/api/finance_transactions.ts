import { pb } from './pocketbase';

export async function getFinanceTransactions() {
  return await pb.collection('finance_transactions').getFullList();
}

export async function getFinanceTransaction(id: string) {
  return await pb.collection('finance_transactions').getOne(id);
}

export async function createFinanceTransaction(data: any) {
  return await pb.collection('finance_transactions').create(data);
}

export async function updateFinanceTransaction(id: string, data: any) {
  return await pb.collection('finance_transactions').update(id, data);
}

export async function deleteFinanceTransaction(id: string) {
  return await pb.collection('finance_transactions').delete(id);
}
