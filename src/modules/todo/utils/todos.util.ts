import { Firestore, collection, doc } from 'firebase/firestore';

export const getTodosCollection = (_firestore: Firestore) =>
  collection(_firestore, 'todos');

export const getTodoDocument = (_firestore: Firestore, todoId: string) =>
  doc(_firestore, 'todos', todoId);
