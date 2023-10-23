import {
  ErrorApiResponseSchema,
  ResourceParamsSchema,
} from '@shared/api/api.schema';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { Except } from 'type-fest';

/**
 * fetch todos for spotlight
 */
export const useTodosSpotlight = (
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
