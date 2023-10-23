import HomeClock from '@home/components/HomeClock/HomeClock.component';
import { Container, Text } from '@mantine/core';
import useHomePageVM from './Home.vm';

export default function HomePage() {
  const { LL } = useHomePageVM();

  return (
    <Container pt="md">
      <Text component="h1" size="xl">
        {LL.home.title()}
      </Text>

      <HomeClock />
    </Container>
  );
}
