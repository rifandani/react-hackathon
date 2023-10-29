import { DatesContext } from '@app/providers/dates/context';
import { useContext } from 'react';

export default function useDatesConfig() {
  const context = useContext(DatesContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useDatesConfig: cannot find the DatesContext');
  }

  return context;
}
