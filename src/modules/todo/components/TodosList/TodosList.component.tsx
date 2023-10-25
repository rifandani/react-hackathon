import { useI18nContext } from '@i18n/i18n-react';
import { Icon } from '@iconify/react';
import { Alert, Code, useMantineTheme } from '@mantine/core';
import For from '@shared/components/atoms/For/For.atom';
import { TodoSchema } from '@todo/api/todo.schema';
import {
  useTodosFirestore,
  useTodosParams,
} from '@todo/hooks/useTodos/useTodos.hook';
import TodosItem from '../TodosItem/TodosItem.component';

export default function TodosList() {
  const { LL } = useI18nContext();
  const params = useTodosParams();
  const todosQuery = useTodosFirestore(params);
  const mantineTheme = useMantineTheme();

  if (todosQuery.status === 'loading') {
    return (
      <div
        data-testid="list-loading"
        className="flex items-center justify-center py-5"
      >
        <Icon
          icon="svg-spinners:3-dots-fade"
          height="5em"
          color={mantineTheme.colors.blue[5]}
        />
      </div>
    );
  }

  if (todosQuery.error) {
    return (
      <Alert
        data-testid="list-error"
        variant="light"
        color="red"
        title="Todo list query error"
        icon={<Icon icon="lucide:badge-x" />}
      >
        <Code block>{JSON.stringify(todosQuery.error, null, 2)}</Code>
      </Alert>
    );
  }

  return (
    <>
      {todosQuery.status === 'success' && (
        <For
          each={todosQuery.data as TodoSchema[]}
          fallback={
            <div
              data-testid="list-empty"
              className="flex items-center justify-center py-5"
            >
              {LL.common.empty()}
            </div>
          }
        >
          {(todo) => <TodosItem key={todo.id} todo={todo} />}
        </For>
      )}
    </>
  );
}
