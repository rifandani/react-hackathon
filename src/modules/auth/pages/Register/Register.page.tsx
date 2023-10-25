import reactjs from '@assets/images/reactjs.svg';
import LoginProvider from '@auth/components/LoginProvider/LoginProvider';
import RegisterForm from '@auth/components/RegisterForm/RegisterForm';
import useCheckAuthFirebase from '@auth/hooks/useCheckAuth/useCheckAuthFirebase.hook';
import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useI18nContext } from '@i18n/i18n-react';
import { Icon } from '@iconify/react';
import { ActionIcon, Anchor, Image } from '@mantine/core';
import { WrapTranslation } from '@shared/components/atoms/WrapTranslation/WrapTranslation';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  useCheckAuthFirebase();
  const { LL } = useI18nContext();

  return (
    <main className="h-screen">
      <div className="flex w-full flex-wrap">
        {/* <!-- Register Section --> */}
        <section className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <ActionIcon
              variant="outline"
              aria-label="Link to home"
              component={Link}
              to={homePath.root}
            >
              <Icon icon="lucide:home" height="1em" />
            </ActionIcon>
          </div>

          <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <h1 className="text-primary text-center text-3xl">
              {LL.auth.welcome()}
            </h1>

            <LoginProvider />

            <RegisterForm />

            <p className="py-12 text-center">
              <WrapTranslation
                message={LL.auth.loginHere()}
                Component={(infix) => (
                  <Anchor component={Link} to={authPath.login}>
                    {' '}
                    {infix}
                  </Anchor>
                )}
              />
            </p>
          </div>
        </section>

        {/* <!-- Image Section --> */}
        <section className="w-1/2 shadow-2xl">
          <span className="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
            <Image src={reactjs} alt="Register page cover" loading="lazy" />
          </span>
        </section>
      </div>
    </main>
  );
}
