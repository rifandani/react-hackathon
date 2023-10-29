import { Firestore, collection, doc } from 'firebase/firestore';

export const getUsersCollection = (_firestore: Firestore) =>
  collection(_firestore, 'users');

export const getUserDocument = (_firestore: Firestore, userId: string) =>
  doc(_firestore, 'users', userId);
