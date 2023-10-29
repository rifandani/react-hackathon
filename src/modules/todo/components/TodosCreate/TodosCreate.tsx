import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import TextInputForm from '@shared/components/smart/TextInputForm/TextInputForm';
import { toastError } from '@shared/utils/helper/helper.util';
import { CreateTodoSchema, createTodoSchema } from '@todo/api/todo.schema';
import { getTodosCollection } from '@todo/utils/todos.util';
import { addDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useBeforeUnload } from 'react-router-dom';
import { useFirestore, useUser } from 'reactfire';

export default function TodosCreate() {
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const { LL } = useI18nContext();
  const user = useUser();
  const firestore = useFirestore();

  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    values: {
      userId: user.data?.uid ?? 'unknown-user-id',
      todo: '',
      completed: false,
    },
  });

  const onSubmitTodo: FormSubmitHandler<CreateTodoSchema> = async (values) => {
    try {
      const todosCollection = getTodosCollection(firestore);
      const result = await addDoc(todosCollection, values.data);

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
      <Form
        className="mb-3 flex w-full flex-col gap-3 duration-300 lg:flex-row"
        control={form.control}
        onSubmit={onSubmitTodo}
      >
        <TextInputForm
          control={form.control}
          name="todo"
          w="100%"
          aria-label="Input todo"
          placeholder={LL.forms.todoPlaceholder()}
        />

        <Button
          miw="10rem"
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
        >
          {LL.common.create()}
        </Button>
      </Form>

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
