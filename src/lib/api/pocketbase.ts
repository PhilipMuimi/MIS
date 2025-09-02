import PocketBase from 'pocketbase';
export const pb = new PocketBase('https://gonep-app.pockethost.io');
pb.autoCancellation(false);
