import { Button, Checkbox } from '@mantine/core';
import { TodoSchema } from '@todo/api/todo.schema';
import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import useTodosItem from './useTodosItem.hook';

// #region INTERFACES
interface Props {
  todo: TodoSchema;
}
// #endregion

export default function TodosItem({ todo }: Props) {
  const { LL, user, handleUpdateTodo, onSubmit } = useTodosItem();

  return (
    <form
      data-testid={`TodosItem-${todo.id}`}
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      onSubmit={onSubmit(todo)}
    >
      <input
        data-testid="TodosItem-input-todoId"
        type="hidden"
        name="todoId"
        value={todo.id}
      />

      <Checkbox
        name={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => {
          handleUpdateTodo(todo);
        }}
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

      {todo.userId === user?.id && (
        <Button type="submit" color="red" variant="outline">
          {LL.forms.remove({ icon: '💥' })}
        </Button>
      )}
    </form>
  );
}
