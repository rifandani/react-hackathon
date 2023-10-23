import { useI18nContext } from '@i18n/i18n-react';
import { Card, Container, Text } from '@mantine/core';
import TodosCreate from '@todo/components/TodosCreate/TodosCreate.component';
import TodosFilter from '@todo/components/TodosFilter/TodosFilter.component';
import TodosList from '@todo/components/TodosList/TodosList.component';

export default function TodosPage() {
  const { LL } = useI18nContext();

  return (
    <Container pt="md">
      <Text component="h1" size="xl">
        {LL.common.list('Todo')}
      </Text>

      <Card shadow="lg" w="100%" p="md" mt="md">
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </Card>
    </Container>
  );
}
