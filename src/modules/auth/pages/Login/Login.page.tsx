import reactjs from '@assets/images/reactjs.svg';
import LoginForm from '@auth/components/LoginForm/LoginForm.component';
import { homePath } from '@home/routes/home.route';
import { Icon } from '@iconify/react';
import { ActionIcon, Anchor, Image } from '@mantine/core';
import { WrapTranslation } from '@shared/components/atoms/WrapTranslation/WrapTranslation';
import { Link } from 'react-router-dom';
import useLoginPageVM from './Login.vm';

export default function LoginPage() {
  const { LL } = useLoginPageVM();

  return (
    <main className="h-screen">
      <div className="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
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

            <LoginForm />

            <p className="py-12 text-center">
              <WrapTranslation
                message={LL.auth.registerHere()}
                Component={(infix) => (
                  <Anchor
                    aria-label="link-register"
                    component={Link}
                    to="/register"
                  >
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
            <Image src={reactjs} alt="login page cover" loading="lazy" />
          </span>
        </section>
      </div>
    </main>
  );
}
