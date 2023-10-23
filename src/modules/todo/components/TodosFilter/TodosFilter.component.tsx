import { Select } from '@mantine/core';
import { limits } from '@todo/constants/todos.constant';
import useTodosFilter from './useTodosFilter.hook';

export default function TodosFilter() {
  const { LL, selectedOption, handleChangeLimit } = useTodosFilter();

  return (
    <form data-testid="TodosFilter" className="mb-3 flex w-full flex-col">
      <Select
        classNames={{
          wrapper: 'w-fit',
        }}
        name="limit"
        label={LL.forms.limit()}
        checkIconPosition="right"
        data={limits}
        value={selectedOption}
        onChange={handleChangeLimit}
      />
    </form>
  );
}
