import { Firestore, collection, doc } from 'firebase/firestore';

export const getProductsCollection = (_firestore: Firestore) =>
  collection(_firestore, 'products');

export const getProductDocument = (_firestore: Firestore, productId: string) =>
  doc(_firestore, 'products', productId);
