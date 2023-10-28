import { homePath } from '@home/routes/home.route';
import { Icon } from '@iconify/react';
import { ActionIcon, Divider, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';

export default function LoginProvider() {
  const navigate = useNavigate();
  const auth = useAuth();

  const signInWithGoogle = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      // This makes it easy for a user signing in to specify whether their session should be remembered or not.
      await auth.setPersistence(browserLocalPersistence);

      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const { user } = await signInWithPopup(auth, provider);

      // on success
      navigate(homePath.root);
      showNotification({
        title: 'Login Success',
        message: `Welcome back, ${user.displayName}`,
        color: 'green',
      });
    } catch (err) {
      // on error
      showNotification({
        title: 'Login Error',
        message: 'Failed to sign in with Google',
        color: 'red',
      });
    }
  };

  return (
    <form
      className="flex flex-col"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={signInWithGoogle}
    >
      <Text mt="md" ta="center" size="sm">
        Login using:
      </Text>

      <ActionIcon
        type="submit"
        radius="xl"
        variant="transparent"
        mt="md"
        mx="auto"
      >
        <Icon icon="logos:google-icon" height="1.5em" />
      </ActionIcon>

      <Divider label="Or continue with email" labelPosition="center" my="md" />
    </form>
  );
}
