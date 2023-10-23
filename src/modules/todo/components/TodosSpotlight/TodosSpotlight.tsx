import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import { Spotlight, SpotlightProps } from '@mantine/spotlight';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todosSpotlight, todosStore } from './store';
import { useTodosSpotlight } from './useTodosSpotlight';

export default function TodosSpotlight() {
  const todosQuery = useTodosSpotlight({ limit: 100 });
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const actions: SpotlightProps['actions'] = todosQuery.isSuccess
    ? todosQuery.data.todos.map(({ id, todo, userId, completed }) => ({
        id: id.toString(),
        label: todo,
        description: `by ${userId}`,
        rightSection: completed ? (
          <Icon icon="lucide:check-circle" />
        ) : undefined,
        onClick: () => {
          navigate(id.toString());
        },
      }))
    : [];

  return (
    <>
      <Button
        variant="gradient"
        leftSection={<Icon icon="lucide:party-popper" />}
        loading={todosQuery.isFetching}
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
