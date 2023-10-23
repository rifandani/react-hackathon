import { Icon } from '@iconify/react';
import { Alert, Code } from '@mantine/core';
import For from '@shared/components/atoms/For/For.atom';
import TodosItem from '@todo/components/TodosItem/TodosItem.component';
import useTodosList from './useTodosList.hook';

export default function TodosList() {
  const { LL, todosQuery, mantineTheme } = useTodosList();

  if (todosQuery.isLoading) {
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

  if (todosQuery.isError) {
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
      {todosQuery.isSuccess && (
        <For
          each={todosQuery.data.todos}
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
