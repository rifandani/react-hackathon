import RouteErrorBoundary from '@shared/components/smart/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

export const authId = {
  root: undefined,
  login: 'auth:login',
  register: 'auth:register',
} as const;

export const authPath = {
  root: undefined,
  login: '/login',
  register: '/register',
} as const;

export const loginRoute = {
  id: authId.login,
  path: authPath.login,
  lazy: async () => {
    const { default: LoginPage } = await import('../pages/Login/Login.page');

    return {
      element: <LoginPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

export const registerRoute = {
  id: authId.register,
  path: authPath.register,
  lazy: async () => {
    const { default: RegisterPage } = await import(
      '../pages/Register/Register.page'
    );

    return {
      element: <RegisterPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

/**
 * should be last route
 */
export const notFoundRoute = {
  id: 'notFound',
  path: '*',
  lazy: async () => {
    const { default: NotFoundPage } = await import(
      '../pages/NotFound/NotFound.page'
    );

    return { element: <NotFoundPage /> };
  },
} as const satisfies RouteObject;
