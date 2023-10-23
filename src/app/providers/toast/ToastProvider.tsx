import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { PropsWithChildren } from 'react';
import { ToastContext, createToastContext } from './context';

export default function AppToastProvider({ children }: PropsWithChildren) {
  const value = createToastContext();

  return (
    <ToastContext.Provider value={value}>
      <Notifications {...value[0]} />

      {children}
    </ToastContext.Provider>
  );
}
