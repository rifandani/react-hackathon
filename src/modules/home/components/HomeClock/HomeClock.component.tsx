import { Button, Card, SimpleGrid, Stack, Text } from '@mantine/core';
import useHomeClock from './useHomeClock.hook';

export default function HomeClock() {
  const {
    LL,
    parentRef,
    showClock,
    seconds,
    minutes,
    hours,
    buttons,
    onClickMapper,
  } = useHomeClock();

  return (
    <>
      {showClock && (
        <Card data-testid="home-clock-show" mt="md" shadow="md">
          <Card.Section pt="md" px="md">
            <Stack>
              <Text>{LL.home.clock()}:</Text>

              <Text fw={700} size="xl">
                {hours}h : {minutes}m : {seconds}s
              </Text>
            </Stack>
          </Card.Section>

          <Text fw={500} size="lg" mt="md">
            {LL.home.clickToggleClock()}
          </Text>
        </Card>
      )}

      <SimpleGrid
        ref={parentRef}
        mt="md"
        spacing="md"
        cols={{ base: 1, sm: 2, lg: 4 }}
      >
        {buttons.map((btn) => (
          <Button
            data-testid={`home-clock-button-${btn.id}`}
            key={btn.id}
            variant={btn.variant}
            onClick={() => {
              onClickMapper(btn.id);
            }}
          >
            {LL.home[btn.text]()}
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
}
