import NavbarWrapper from '@shared/components/dumb/NavbarWrapper/NavbarWrapper.template';
import RouteErrorBoundary from '@shared/components/smart/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

export const homeId = {
  root: 'home',
  index: 'home:index',
} as const;

export const homePath = {
  root: '/',
  index: undefined,
} as const;

const homeIndexRoute = {
  id: homeId.index,
  index: true,
  lazy: async () => {
    const { default: HomePage } = await import('../pages/Home.page');

    return {
      // loader: homeLoader, // we use firebase authentication instead of this
      element: <HomePage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

export const homeRoute = {
  id: homeId.root,
  path: homePath.root,
  element: <NavbarWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject;
