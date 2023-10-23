import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import useNotFoundPageVM from './NotFound.vm';

export default function NotFoundPage() {
  const { userStore, LL } = useNotFoundPageVM();

  return (
    <main className="bg-base-100 flex h-screen flex-col items-center justify-center space-y-3">
      <Text className="text-3xl font-bold italic" variant="gradient">
        {LL.auth.notFound404()}
      </Text>
      <p className="mb-5">{LL.auth.gone()}</p>

      <Anchor
        component={Link}
        to={userStore.user ? homePath.root : authPath.login}
      >
        {LL.auth.backTo({ isLoggedIn: userStore.user ? 'true' : 'false' })}
      </Anchor>
    </main>
  );
}
