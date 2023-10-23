import { Button, Modal, TextInput } from '@mantine/core';
import useTodosCreate from './useTodosCreate.hook';

export default function TodosCreate() {
  const { LL, isModalOpen, form, onSubmit, close } = useTodosCreate();

  return (
    <>
      <form
        data-testid="TodosCreate"
        className="mb-3 flex w-full flex-col gap-3 duration-300 lg:flex-row"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
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
