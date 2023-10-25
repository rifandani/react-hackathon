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

  const isLoginPath = location.pathname.includes('login');
  const isRegisterPath = location.pathname.includes('register');

  useMount(() => {
    if ((!user && isLoginPath) || (!user && isRegisterPath)) return;

    if (!user) {
      navigate(authPath.login, { replace: true });
      showNotification({
        title: 'Auth Error',
        message: LL.common.unauthorized(),
        color: 'red',
      });
      return;
    }

    if (isLoginPath || isRegisterPath) {
      navigate(homePath.root);
      showNotification({
        title: 'Auth Info',
        message: LL.common.authorized(),
        color: 'blue',
      });
    }
  });
}
