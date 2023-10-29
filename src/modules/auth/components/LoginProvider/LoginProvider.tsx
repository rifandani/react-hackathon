import { homePath } from '@home/routes/home.route';
import { Icon } from '@iconify/react';
import { ActionIcon, Divider, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { recursivelyNullifyUndefinedValues } from '@shared/utils/helper/helper.util';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';
import { getUserDocument } from 'modules/user/utils/user.util';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFirestore } from 'reactfire';
import { UnknownRecord } from 'type-fest';

export default function LoginProvider() {
  const navigate = useNavigate();
  const auth = useAuth();
  const firestore = useFirestore();

  const signInWithGoogle = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const { user } = await signInWithPopup(auth, provider);

      // get user doc and check if it NOT exists then create new user doc
      const userDocSnap = await getDoc(getUserDocument(firestore, user.uid)); // the id will be based on user.uid
      if (!userDocSnap.exists()) {
        await setDoc(
          userDocSnap.ref,
          recursivelyNullifyUndefinedValues(user.toJSON() as UnknownRecord),
        );
      }

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
