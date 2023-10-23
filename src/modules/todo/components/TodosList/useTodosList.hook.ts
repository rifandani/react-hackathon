import { useI18nContext } from '@i18n/i18n-react';
import { useMantineTheme } from '@mantine/core';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { useTodos } from '@todo/hooks/useTodos/useTodos.hook';
import { useLoaderData } from 'react-router-dom';

export default function useTodosList() {
  const initialData = useLoaderData() as TodoListApiResponseSchema;
  const { LL } = useI18nContext();
  const todosQuery = useTodos({ initialData });
  const mantineTheme = useMantineTheme();

  return { LL, todosQuery, mantineTheme };
}
