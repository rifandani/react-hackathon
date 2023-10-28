import {
  loginRoute,
  notFoundRoute,
  registerRoute,
} from '@auth/routes/auth.route';
import { homeRoute } from '@home/routes/home.route';
import { playgroundRoute } from '@playground/routes/playground.route';
import { productsRoute } from '@product/routes/products.route';
import { todosRoute } from '@todo/routes/todos.route';
import { createBrowserRouter } from 'react-router-dom';

// router singleton
export const router = createBrowserRouter(
  [
    homeRoute,
    todosRoute,
    productsRoute,
    playgroundRoute,
    loginRoute,
    registerRoute,
    notFoundRoute,
  ],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  },
);
