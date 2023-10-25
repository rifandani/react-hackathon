import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useI18nContext } from '@i18n/i18n-react';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

/**
 * Hooks to authenticate your firebase user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useCheckAuthFirebase()
 * ```
 */
export default function useCheckAuthFirebase() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data: user } = useUser();

  useEffect(() => {
    const isLoginPath = location.pathname.includes('login');
    const isRegisterPath = location.pathname.includes('register');

    if (
      status === 'loading' ||
      (!user && isLoginPath) ||
      (!user && isRegisterPath)
    ) {
      return;
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, status, user]);
}
