import {
  ErrorApiResponseSchema,
  ResourceParamsSchema,
} from '@shared/api/api.schema';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { defaultLimit } from '@todo/constants/todos.constant';
import { collection, limit, query, startAfter } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Except, SetRequired } from 'type-fest';

/**
 * todos search params in object
 */
export const useTodosParams = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const limits = Number(searchParamsObj?.limit ?? defaultLimit);
  const params: SetRequired<ResourceParamsSchema, 'limit'> = {
    ...searchParamsObj,
    limit: limits,
  };

  return params;
};

/**
 * fetch todos based on input params
 */
export const useTodos = (
  params: ResourceParamsSchema,
  options?: Except<
    QueryOptions<TodoListApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryKey = todoKeys.list(params);
  const queryFn = () => todoApi.list(params);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};

/**
 * fetch todos based on search params
 */
export const useTodosFromSearchParams = (
  options?: Except<
    QueryOptions<TodoListApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const params = useTodosParams();
  const queryKey = todoKeys.list(params);
  const queryFn = () => todoApi.list(params);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};

/**
 * fetch todos collection from firestore based on input params
 */
export const useTodosFirestore = (params: ResourceParamsSchema) => {
  const firestore = useFirestore();

  const getFilteredTodos = () => {
    const todosCollection = collection(firestore, 'todos');
    let result = query(todosCollection);

    if (params.limit) {
      const constraint = limit(params.limit);
      result = query(result, constraint);
    }
    if (params.skip) {
      const constraint = startAfter(params.skip);
      result = query(result, constraint);
    }

    return result;
  };

  return useFirestoreCollectionData(getFilteredTodos(), { idField: 'id' });
};
