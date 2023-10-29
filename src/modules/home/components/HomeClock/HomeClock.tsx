import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useI18nContext } from '@i18n/i18n-react';
import { loadLocale } from '@i18n/i18n-util.sync';
import {
  Button,
  Card,
  SimpleGrid,
  Stack,
  Text,
  Transition,
} from '@mantine/core';
import { shuffle } from '@rifandani/nxact-yutiriti';
import useDatesConfig from '@shared/hooks/useDatesConfig/useDatesConfig.hook';
import { useLocalesStorage } from '@shared/hooks/useLocalesStorage/useLocalesStorage.hook';
import { useRafInterval } from '@shared/hooks/useRafInterval/useRafInterval.hook';
import { todosPath } from '@todo/routes/todos.route';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeClock() {
  const navigate = useNavigate();
  const { LL, locale, setLocale } = useI18nContext();
  const [, setLocalesStorage] = useLocalesStorage();
  const [parentRef] = useAutoAnimate();
  const [, datesActions] = useDatesConfig();

  const [showClock, setShowClock] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [buttons, setButtons] = useState([
    {
      id: 'sort',
      variant: 'filled',
      text: 'sortBtn',
    },
    {
      id: 'clock',
      variant: 'gradient',
      text: 'toggleClock',
    },
    {
      id: 'language',
      variant: 'outline',
      text: 'changeLang',
    },
    {
      id: 'start',
      variant: 'subtle',
      text: 'getStarted',
    },
  ] as const);

  const onClickMapper = (btnId: 'sort' | 'clock' | 'language' | 'start') => {
    const mapper: Record<typeof btnId, () => void> = {
      sort: () => {
        setButtons((prev) => shuffle(prev) as unknown as typeof prev);
      },
      clock: () => {
        if (!showClock) setSeconds(0);
        setShowClock((prev) => !prev);
      },
      language: () => {
        // set i18n locale
        const newLocale = locale === 'en' ? 'id' : 'en';
        setLocalesStorage(newLocale);
        loadLocale(newLocale);
        setLocale(newLocale);

        // set dayjs locale globally
        dayjs.locale(newLocale);
        // set dates locale
        datesActions.changeProps({ locale: newLocale });
      },
      start: () => {
        navigate(todosPath.root);
      },
    };

    mapper[btnId]();
  };

  // recalculate `seconds` every 100 ms
  useRafInterval(
    () => {
      if (showClock) setSeconds(+(seconds + 0.1).toFixed(2));
      else setSeconds(0);
    },
    100,
    { immediate: true },
  );

  // recalculate `minutes` when `seconds` changes
  useEffect(() => {
    setMinutes(seconds > 0 ? (seconds % 2 === 0 ? minutes + 1 : minutes) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // recalculate `hours` when `minutes` changes
  useEffect(() => {
    setHours(minutes > 0 ? (minutes % 2 === 0 ? hours + 1 : hours) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  return (
    <>
      <Transition
        mounted={showClock}
        transition="scale"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <Card mt="md" shadow="md" style={styles}>
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
      </Transition>

      <SimpleGrid
        ref={parentRef}
        mt="md"
        spacing="md"
        cols={{ base: 1, sm: 2, lg: 4 }}
      >
        {buttons.map((btn) => (
          <Button
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
