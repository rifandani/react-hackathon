import { homePath } from '@home/routes/home.route';
import { showNotification } from '@mantine/notifications';
import { checkAuthUser } from '@shared/utils/checker/checker.util';
import { LoaderFunction, redirect } from 'react-router-dom';

export const loginLoader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect auth user to home
  if (authed) {
    showNotification({
      title: 'Info',
      message: 'Already Logged In',
      color: 'blue',
    });
    return redirect(homePath.root);
  }

  return null;
};
