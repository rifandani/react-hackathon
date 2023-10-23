import { Icon } from '@iconify/react';
import {
  Alert,
  Anchor,
  Breadcrumbs,
  Button,
  Code,
  Container,
  Text,
  TextInput,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import useTodoPageVM from './Todo.vm';

export default function TodoPage() {
  const { LL, crumbs, user, fetcher, todoQuery, form, onSubmit } =
    useTodoPageVM();

  return (
    <Container pt="md">
      <section className="mb-5 flex w-full flex-col space-y-2">
        <Breadcrumbs>
          {crumbs.map((crumb) => (
            <Anchor
              component={Link}
              key={crumb.to}
              to={crumb.to}
              className="hover:skew-x-12"
            >
              {crumb.label}
            </Anchor>
          ))}
        </Breadcrumbs>

        <Text component="h1" size="xl">
          {LL.common.xDetail({ feature: 'Todo' })}
        </Text>
      </section>

      {todoQuery.isError && (
        <Alert
          data-testid="todo-error"
          variant="light"
          color="red"
          title="Todo query error"
          icon={<Icon icon="lucide:badge-x" />}
        >
          <Code block>{JSON.stringify(todoQuery.error, null, 2)}</Code>
        </Alert>
      )}

      {todoQuery.data && (
        <form
          className="flex items-center gap-3"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextInput
            w="100%"
            aria-label="Input todo"
            {...form.register('todo', { required: true })}
          />

          {user?.id === todoQuery.data.userId && (
            <Button
              miw="10rem"
              type="submit"
              loading={fetcher.state === 'submitting'}
            >
              {LL.common.update({ icon: '🖋' })}
            </Button>
          )}
        </form>
      )}
    </Container>
  );
}
