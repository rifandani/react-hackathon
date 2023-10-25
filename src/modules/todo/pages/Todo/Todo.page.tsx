import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
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
import { showNotification } from '@mantine/notifications';
import { toastError } from '@shared/utils/helper/helper.util';
import {
  TodoSchema,
  UpdateTodoSchema,
  updateTodoSchema,
} from '@todo/api/todo.schema';
import { useTodoFirestore } from '@todo/hooks/useTodo/useTodo.hook';
import { todosPath } from '@todo/routes/todos.route';
import { getTodoDocument } from '@todo/utils/todos.util';
import { updateDoc } from 'firebase/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFirestore, useUser } from 'reactfire';

export default function TodoPage() {
  useCheckAuthFirebase();
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { LL } = useI18nContext();
  const firestore = useFirestore();
  const todoQuery = useTodoFirestore(id ?? 'unknown-id');
  const form = useForm<UpdateTodoSchema>({
    resolver: zodResolver(updateTodoSchema),
    values: {
      todo:
        todoQuery.status === 'success'
          ? (todoQuery.data as TodoSchema).todo
          : '',
      completed: false, // we never use this in this page
    },
  });

  const crumbs = [
    { label: 'Todo List', to: todosPath.root },
    {
      label: id,
      to: '',
    },
  ];

  // #region HANDLERS
  const onSubmitUpdate: SubmitHandler<UpdateTodoSchema> = async (values) => {
    const todoId = (todoQuery.data as TodoSchema).id;

    // reference to the todo document in todos collection
    const todoDoc = getTodoDocument(firestore, todoId);

    try {
      // update todo document
      await updateDoc(todoDoc, { todo: values.todo });

      navigate(todosPath.root);
      showNotification({
        color: 'green',
        title: 'Mutation Success',
        message: `Todo with id: ${todoId} deleted`,
      });
    } catch (err) {
      toastError(err);
    }
  };
  // #endregion

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

      {todoQuery.status === 'error' && (
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

      {todoQuery.status === 'success' && (
        <form
          data-testid={`Todo-${(todoQuery.data as TodoSchema).id}`}
          className="flex items-center gap-3"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmitUpdate)}
        >
          <TextInput w="100%" {...form.register('todo', { required: true })} />

          {user.data?.uid === (todoQuery.data as TodoSchema).userId && (
            <Button
              miw="10rem"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              {LL.common.update({ icon: '🖋' })}
            </Button>
          )}
        </form>
      )}
    </Container>
  );
}
