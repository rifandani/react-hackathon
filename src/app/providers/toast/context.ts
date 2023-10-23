import { NotificationsProps } from '@mantine/notifications';
import { useResetState } from 'ahooks';
import { createContext } from 'react';

export type ToastContextInterface = ReturnType<typeof createToastContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export const createToastContext = () => {
  // all of this is the default values
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [props, setProps, resetProps] = useResetState<NotificationsProps>({
    autoClose: 4_000,
    containerWidth: 440,
    limit: 5,
    notificationMaxHeight: 200,
    position: 'bottom-right',
    transitionDuration: 250,
    withinPortal: true,
    zIndex: 400,
  });

  const actions = {
    resetProps,
    changeProps: (theme: NotificationsProps) => {
      setProps((prev) => ({ ...prev, theme }));
    },
  };

  return [props, actions] as const;
};

export const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
);
