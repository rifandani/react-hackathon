import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useI18nContext } from '@i18n/i18n-react';
import { showNotification } from '@mantine/notifications';
import { useMount } from '@shared/hooks/useMount/useMount.hook';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useCheckAuth()
 * ```
 */
export default function useCheckAuth() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  useMount(() => {
    if (!user && location.pathname.includes('login')) return;

    if (!user) {
      navigate(authPath.login, { replace: true });
      showNotification({
        title: 'Error',
        message: LL.common.unauthorized(),
        color: 'red',
      });
      return;
    }

    if (location.pathname.includes('login')) {
      navigate(homePath.root);
      showNotification({
        title: 'Info',
        message: LL.common.authorized(),
        color: 'blue',
      });
    }
  });
}
