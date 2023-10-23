import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useI18nContext } from '@i18n/i18n-react';
import { loadLocale } from '@i18n/i18n-util.sync';
import { shuffle } from '@rifandani/nxact-yutiriti';
import { useLocalesStorage } from '@shared/hooks/useLocalesStorage/useLocalesStorage.hook';
import { todosPath } from '@todo/routes/todos.route';
import { useRafInterval } from 'ahooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useHomeClock() {
  const navigate = useNavigate();
  const { LL, locale, setLocale } = useI18nContext();
  const [, setLocalesStorage] = useLocalesStorage();
  const [parentRef] = useAutoAnimate();

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
        const newLocale = locale === 'en' ? 'id' : 'en';
        setLocalesStorage(newLocale);
        loadLocale(newLocale);
        setLocale(newLocale);
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

  return {
    LL,
    parentRef,
    seconds,
    minutes,
    hours,
    showClock,
    buttons,
    onClickMapper,
  };
}
