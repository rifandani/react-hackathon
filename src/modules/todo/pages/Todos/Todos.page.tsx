import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import { useI18nContext } from '@i18n/i18n-react';
import { Card, Container, Flex, Text } from '@mantine/core';
import TodosCreate from '@todo/components/TodosCreate/TodosCreate';
import TodosFilter from '@todo/components/TodosFilter/TodosFilter';
import TodosList from '@todo/components/TodosList/TodosList';
import TodosSpotlight from '@todo/components/TodosSpotlight/TodosSpotlight';

export default function TodosPage() {
  useCheckAuthFirebase();
  const { LL } = useI18nContext();

  return (
    <Container pt="md" className="flex flex-col">
      <Flex align="center" justify="space-between">
        <Text component="h1" size="xl">
          {LL.common.list('Todo')}
        </Text>

        <TodosSpotlight />
      </Flex>

      <Card withBorder w="100%" p="md" mt="md">
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </Card>
    </Container>
  );
}
