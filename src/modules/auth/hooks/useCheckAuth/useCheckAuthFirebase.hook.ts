import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';

/**
 * Hooks to authenticate your firebase user, whether they're logged in or not
 *
 * @description currently it is not possible to get user auth in RRD loader, because user data initially null
 *
 * @example
 *
 * ```tsx
 * useCheckAuthFirebase()
 * ```
 */
export default function useCheckAuthFirebase() {
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
      return;
    }

    if (isLoginPath || isRegisterPath) {
      navigate(homePath.root);
    }

    // don't listen to eslint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, status, user]);
}
