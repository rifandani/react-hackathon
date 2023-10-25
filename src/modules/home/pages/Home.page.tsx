import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import HomeClock from '@home/components/HomeClock/HomeClock.component';
import { useI18nContext } from '@i18n/i18n-react';
import { Container, Text } from '@mantine/core';

export default function HomePage() {
  useCheckAuthFirebase();
  const { LL } = useI18nContext();

  return (
    <Container pt="md">
      <Text component="h1" size="xl">
        {LL.home.title()}
      </Text>

      <HomeClock />
    </Container>
  );
}
