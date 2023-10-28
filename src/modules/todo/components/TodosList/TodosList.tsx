import { useI18nContext } from '@i18n/i18n-react';
import ErrorDisplay from '@shared/components/dumb/ErrorDisplay/ErrorDisplay';
import For from '@shared/components/dumb/For/For';
import LoadingBar from '@shared/components/dumb/LoadingBar/LoadingBar';
import { TodoSchema } from '@todo/api/todo.schema';
import {
  useTodosFirestore,
  useTodosParams,
} from '@todo/hooks/useTodos/useTodos.hook';
import TodosItem from '../TodosItem/TodosItem';

export default function TodosList() {
  const { LL } = useI18nContext();
  const params = useTodosParams();
  const todosQuery = useTodosFirestore(params);

  if (todosQuery.status === 'loading') {
    return <LoadingBar />;
  }

  if (todosQuery.error) {
    return (
      <ErrorDisplay
        error={todosQuery.error}
        alert={{ title: 'Todo list query error' }}
      />
    );
  }

  return (
    <>
      {todosQuery.status === 'success' && (
        <For
          each={todosQuery.data as TodoSchema[]}
          fallback={
            <div className="flex items-center justify-center py-5">
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
