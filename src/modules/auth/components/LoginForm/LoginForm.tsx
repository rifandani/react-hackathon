import { loginFormSchema, type LoginFormSchema } from '@auth/api/auth.schema';
import { loginFormDefaultValues } from '@auth/constants/login.constant';
import { homePath } from '@home/routes/home.route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import PasswordInputForm from '@shared/components/smart/PasswordInputForm/PasswordInputForm';
import TextInputForm from '@shared/components/smart/TextInputForm/TextInputForm';
import { toastError } from '@shared/utils/helper/helper.util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, useForm, type FormSubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';

export default function LoginForm() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const form = useForm<LoginFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });
  const auth = useAuth();

  const onSubmitLogin: FormSubmitHandler<LoginFormSchema> = async (values) => {
    try {
      // sign in user
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.data.email,
        values.data.password,
      );

      // on success
      navigate(homePath.root);
      showNotification({
        title: 'Login Success',
        message: `Welcome back, ${user.displayName ?? user.email}`,
        color: 'green',
      });
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <Form
      className="flex flex-col"
      control={form.control}
      onSubmit={onSubmitLogin}
    >
      {/* email */}
      <TextInputForm
        control={form.control}
        name="email"
        type="email"
        className="pt-4"
        label={LL.forms.email()}
        placeholder={LL.forms.emailPlaceholder()}
      />

      {/* password */}
      <PasswordInputForm
        control={form.control}
        name="password"
        className="pt-4"
        label={LL.forms.password()}
        placeholder={LL.forms.passwordPlaceholder()}
      />

      <Button
        type="submit"
        className="mt-4"
        loading={form.formState.isSubmitting}
        disabled={!form.formState.isValid}
      >
        {LL.forms[form.formState.isSubmitting ? 'loginLoading' : 'login']()}{' '}
      </Button>
    </Form>
  );
}
