import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { random } from '@rifandani/nxact-yutiriti';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { useQueryClient } from '@tanstack/react-query';
import { todoKeys } from '@todo/api/todo.api';
import {
  CreateTodoApiResponseSchema,
  TodoSchema,
  todoSchema,
} from '@todo/api/todo.schema';
import { useTodoCreate } from '@todo/hooks/useTodoCreate/useTodoCreate.hook';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useBeforeUnload, useFetcher } from 'react-router-dom';

export default function useTodosCreate() {
  const queryClient = useQueryClient();
  const fetcher = useFetcher<
    CreateTodoApiResponseSchema | ErrorApiResponseSchema
  >();
  const { LL } = useI18nContext();
  const { user } = useUserStore();
  const params = useTodosParams();
  const todoCreateMutation = useTodoCreate();
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: 1, // we override it later on `onSubmit`
      todo: '',
      userId: 1,
      completed: false,
    },
  });

  // #region HANDLERS
  const onSubmit: SubmitHandler<TodoSchema> = (data) => {
    const payload = {
      ...data,
      userId: user?.id ?? 1,
      id: random(11, 999_999), // generate different id everytime
    };

    todoCreateMutation.mutate(payload, {
      onSettled: (_newTodo, error, _variables, context) => {
        // reset form
        form.reset();

        showNotification({
          title: error ? 'Error' : 'Success',
          message: LL.common[error ? 'xCreateError' : 'xCreateSuccess']({
            feature: 'Todo',
          }),
          color: error ? 'red' : 'green',
        });

        // If the mutation fails, use the context returned from `onMutate` to roll back
        if (error) {
          queryClient.setQueryData(
            todoKeys.list(params),
            context?.previousTodosQueryResponse,
          );
        }
      },
    });
  };
  // #endregion

  useBeforeUnload(
    useCallback(
      (evt) => {
        if (!evt.defaultPrevented && !!form.getValues().todo) {
          // preventDefault to block immediately and prompt user async
          evt.preventDefault();
          // eslint-disable-next-line no-param-reassign
          evt.returnValue = '';

          // open modal
          open();
        }
      },
      [form, open],
    ),
  );

  return { isModalOpen, fetcher, LL, form, onSubmit, close };
}
