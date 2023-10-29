import { DatesProvider } from '@mantine/dates';
import '@mantine/dates/styles.css';
import 'dayjs/locale/id'; // indonesian
import 'dayjs/locale/ja'; // japanese
import { PropsWithChildren } from 'react';
import { DatesContext, createDatesContext } from './context';

export default function AppDatesProvider({ children }: PropsWithChildren) {
  const value = createDatesContext();

  return (
    <DatesContext.Provider value={value}>
      <DatesProvider settings={value[0]}>{children}</DatesProvider>;
    </DatesContext.Provider>
  );
}
