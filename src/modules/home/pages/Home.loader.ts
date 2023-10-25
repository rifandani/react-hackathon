import { authPath } from '@auth/routes/auth.route';
import { showNotification } from '@mantine/notifications';
import { checkAuthUserFirebase } from '@shared/utils/checker/checker.util';
import { LoaderFunction, redirect } from 'react-router-dom';

export const homeLoader: LoaderFunction = () => {
  const authed = checkAuthUserFirebase();

  // redirect NOT authed user to login
  if (!authed) {
    showNotification({
      title: 'Auth Error',
      message: 'Unauthorized. Please login first.',
      color: 'red',
    });
    return redirect(authPath.login);
  }

  return null;
};
