import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import { Spotlight, SpotlightProps } from '@mantine/spotlight';
import { TodoSchema } from '@todo/api/todo.schema';
import { useTodosFirestore } from '@todo/hooks/useTodos/useTodos.hook';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todosSpotlight, todosStore } from './store';

export default function TodosSpotlight() {
  const todosQuery = useTodosFirestore({ limit: 100 });
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const actions: SpotlightProps['actions'] =
    todosQuery.status === 'success'
      ? (todosQuery.data as TodoSchema[]).map(
          ({ id, todo, userId, completed }) => ({
            id: id.toString(),
            label: todo,
            description: `by ${userId}`,
            rightSection: completed ? (
              <Icon icon="lucide:check-circle" />
            ) : undefined,
            onClick: () => {
              navigate(id.toString());
            },
          }),
        )
      : [];

  return (
    <>
      <Button
        variant="gradient"
        leftSection={<Icon icon="lucide:party-popper" />}
        loading={todosQuery.status === 'loading'}
        onClick={todosSpotlight.open}
      >
        Spotlight
      </Button>

      <Spotlight
        actions={actions}
        shortcut={['mod + K', '/']}
        limit={10}
        highlightQuery
        store={todosStore}
        query={query}
        onQueryChange={setQuery}
        searchProps={{
          leftSection: <Icon icon="lucide:search" />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
