import { DatesProviderSettings } from '@mantine/dates';
import { useResetState } from '@shared/hooks/useResetState/useResetState.hook';
import { createContext } from 'react';

export type DatesContextInterface = ReturnType<typeof createDatesContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export const createDatesContext = () => {
  // all of this is the default values, or we can import DATES_PROVIDER_DEFAULT_SETTINGS
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [props, setProps, resetProps] = useResetState<DatesProviderSettings>({
    locale: 'en',
    timezone: null,
    firstDayOfWeek: 1,
    weekendDays: [0, 6],
    labelSeparator: '-',
  });

  const actions = {
    resetProps,
    changeProps: (settings: DatesProviderSettings) => {
      setProps((prev) => ({ ...prev, ...settings }));
    },
  };

  return [props, actions] as const;
};

export const DatesContext = createContext<DatesContextInterface>(
  {} as DatesContextInterface,
);
