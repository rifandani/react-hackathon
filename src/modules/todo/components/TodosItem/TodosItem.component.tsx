import { useI18nContext } from '@i18n/i18n-react';
import { Button, Checkbox } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { toastError } from '@shared/utils/helper/helper.util';
import { TodoSchema } from '@todo/api/todo.schema';
import { getTodoDocument } from '@todo/utils/todos.util';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore, useUser } from 'reactfire';
import { twJoin } from 'tailwind-merge';

// #region INTERFACES
interface Props {
  todo: TodoSchema;
}
// #endregion

export default function TodosItem({ todo }: Props) {
  const user = useUser();
  const { LL } = useI18nContext();
  const firestore = useFirestore();

  // #region HANDLERS
  const onUpdateTodo = (_todo: TodoSchema) => async () => {
    // only allow user who belongs the todo
    if (_todo.userId !== user.data?.uid) {
      showNotification({
        color: 'red',
        title: 'Mutation Failed',
        message: "You are not authorized to update other's todo",
      });
      return;
    }

    // reference to the todo document in todos collection
    const todoDoc = getTodoDocument(firestore, _todo.id);

    try {
      // update todo document
      await updateDoc(todoDoc, { completed: !_todo.completed });

      showNotification({
        color: 'green',
        title: 'Mutation Success',
        message: `Todo with id: ${_todo.id} deleted`,
      });
    } catch (err) {
      toastError(err);
    }
  };

  const onSubmitDeleteTodo =
    (_todo: TodoSchema) => async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      // only allow user who belongs the todo
      if (_todo.userId !== user.data?.uid) return;

      try {
        // reference to the todo document in todos collection
        const todoDoc = getTodoDocument(firestore, _todo.id);

        // delete todo document
        await deleteDoc(todoDoc);

        showNotification({
          color: 'green',
          title: 'Mutation Success',
          message: `Todo with id: ${_todo.id} deleted`,
        });
      } catch (err) {
        toastError(err);
      }
    };
  // #endregion

  return (
    <form
      data-testid={`TodosItem-${todo.id}`}
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmitDeleteTodo(todo)}
    >
      <input
        data-testid={`TodosItem-${todo.id}-todoId`}
        type="hidden"
        name="todoId"
        value={todo.id}
      />

      <Checkbox
        name={`todo-${todo.id}`}
        checked={todo.completed}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onChange={onUpdateTodo(todo)}
      />

      <Link
        className={twJoin(
          'ml-5 w-full text-left text-lg hover:font-bold',
          todo.completed && 'line-through',
        )}
        to={todo.id.toString()}
      >
        {todo.todo}
      </Link>

      {todo.userId === user.data?.uid && (
        <Button type="submit" color="red" variant="subtle">
          {LL.forms.remove({ icon: '💥' })}
        </Button>
      )}
    </form>
  );
}
