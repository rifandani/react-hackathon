import NavbarWrapper from '@shared/components/dumb/NavbarWrapper/NavbarWrapper';
import RouteErrorBoundary from '@shared/components/smart/RouteErrorBoundary/RouteErrorBoundary';
import { RouteObject } from 'react-router-dom';

export const productsId = {
  root: 'products',
  index: 'products:index',
  detail: 'products:detail',
} as const;

export const productsPath = {
  root: '/products',
  index: undefined,
  detail: ':id',
} as const;

// const productsDetailRoute = {
//   id: productsId.detail,
//   path: productsPath.detail,
//   lazy: async () => {
//     const { default: ProductPage } = await import(
//       '../pages/Product/Product.page'
//     );

//     return {
//       element: <ProductPage />,
//       errorElement: <RouteErrorBoundary />,
//     };
//   },
// } satisfies RouteObject;

const productsIndexRoute = {
  id: productsId.index,
  index: true,
  lazy: async () => {
    const { default: ProductsPage } = await import(
      '../pages/Products/Products.page'
    );

    return {
      element: <ProductsPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

export const productsRoute = {
  id: productsId.root,
  path: productsPath.root,
  element: <NavbarWrapper />,
  children: [productsIndexRoute], // productsDetailRoute
} satisfies RouteObject;
