import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { toastError } from '@shared/utils/helper/helper.util';
import { CreateTodoSchema, createTodoSchema } from '@todo/api/todo.schema';
import { getTodosCollection } from '@todo/utils/todos.util';
import { addDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useBeforeUnload } from 'react-router-dom';
import { useFirestore, useUser } from 'reactfire';

export default function TodosCreate() {
  useCheckAuthFirebase();
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const { LL } = useI18nContext();
  const user = useUser();
  const firestore = useFirestore();
  const todosCollection = getTodosCollection(firestore);

  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      todo: '',
      userId: '',
      completed: false,
    },
  });

  // #region HANDLERS
  const onSubmitTodo: SubmitHandler<CreateTodoSchema> = async (data) => {
    const payload: CreateTodoSchema = {
      ...data,
      userId: user.data?.uid ?? 'unknown-user-id',
    };

    try {
      const result = await addDoc(todosCollection, payload);

      showNotification({
        color: 'green',
        title: 'Mutation Success',
        message: `Todo created with id: ${result.id}`,
      });
    } catch (err) {
      toastError(err);
    } finally {
      // reset input
      form.setValue('todo', '');
    }
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

  return (
    <>
      <form
        data-testid="TodosCreate"
        className="mb-3 flex w-full flex-col gap-3 duration-300 lg:flex-row"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmitTodo)}
      >
        <TextInput
          w="100%"
          aria-label="Input todo"
          placeholder={LL.forms.todoPlaceholder()}
          {...form.register('todo', { required: true, minLength: 3 })}
        />

        <Button
          miw="10rem"
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
        >
          {LL.common.create()}
        </Button>
      </form>

      <Modal.Root centered opened={isModalOpen} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Unsaved Changes</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>{LL.common.unsavedChanges()}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
