import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import { useI18nContext } from '@i18n/i18n-react';
import { Card, Container, Flex, Text } from '@mantine/core';
import ProductsCreate from '@product/components/ProductsCreate/ProductsCreate';
import ProductsList from '@product/components/ProductsList/ProductsList';

export default function ProductsPage() {
  useCheckAuthFirebase();
  const { LL } = useI18nContext();

  return (
    <Container pt="md" className="flex flex-col">
      <Flex align="center" justify="space-between">
        <Text component="h1" size="xl">
          {LL.common.list('Product')}
        </Text>
      </Flex>

      <Card withBorder w="100%" p="md" my="md">
        <ProductsCreate />
      </Card>

      <ProductsList />
    </Container>
  );
}
