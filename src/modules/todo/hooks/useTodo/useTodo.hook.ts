import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoDetailApiResponseSchema, TodoSchema } from '@todo/api/todo.schema';
import { getTodoDocument } from '@todo/utils/todos.util';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Except } from 'type-fest';

/**
 * fetch todo
 *
 * @param {string} id - todo id
 */
export const useTodo = (
  id: TodoSchema['id'],
  options?: Except<
    QueryOptions<TodoDetailApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryKey = todoKeys.detail(id);
  const queryFn = () => todoApi.detail(id);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};

/**
 * fetch todo document from firestore
 *
 * @param {string} id - todo id
 */
export const useTodoFirestore = (id: TodoSchema['id']) => {
  const firestore = useFirestore();
  const todoDoc = getTodoDocument(firestore, id);

  return useFirestoreDocData(todoDoc, { idField: 'id' });
};
