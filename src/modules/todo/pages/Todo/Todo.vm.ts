import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import {
  TodoDetailApiResponseSchema,
  UpdateTodoSchema,
  updateTodoSchema,
} from '@todo/api/todo.schema';
import { useTodo } from '@todo/hooks/useTodo/useTodo.hook';
import { todosPath } from '@todo/routes/todos.route';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetcher, useLoaderData, useParams } from 'react-router-dom';

export default function useTodoPageVM() {
  const { LL } = useI18nContext();
  const { id } = useParams();
  const fetcher = useFetcher();
  const initialData = useLoaderData() as TodoDetailApiResponseSchema;
  const { user } = useUserStore();
  const todoQuery = useTodo(Number(id), { initialData });

  const crumbs = [
    { label: 'Todo List', to: todosPath.root },
    {
      label: todoQuery.isSuccess ? todoQuery.data.id : LL.common.loading(),
      to: '',
    },
  ];

  const form = useForm<UpdateTodoSchema>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      id: initialData.id,
      completed: initialData.completed,
      todo: initialData.todo,
    },
  });

  // #region HANDLERS
  const onSubmit: SubmitHandler<UpdateTodoSchema> = (values) => {
    fetcher.submit(values, { method: 'PUT', encType: 'application/json' });
  };
  // #endregion

  return { LL, crumbs, user, fetcher, todoQuery, form, onSubmit };
}
