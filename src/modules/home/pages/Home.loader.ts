import { authPath } from '@auth/routes/auth.route';
import { showNotification } from '@mantine/notifications';
import { checkAuthUser } from '@shared/utils/checker/checker.util';
import { LoaderFunction, redirect } from 'react-router-dom';

export const homeLoader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect NOT authed user to login
  if (!authed) {
    showNotification({
      title: 'Error',
      message: 'Unauthorized',
      color: 'red',
    });
    return redirect(authPath.login);
  }

  return null;
};
