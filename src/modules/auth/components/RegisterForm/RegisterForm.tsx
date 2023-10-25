import { LoginSchema, loginSchema } from '@auth/api/auth.schema';
import { loginFormDefaultValues } from '@auth/constants/login.constant';
import { homePath } from '@home/routes/home.route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { toastError } from '@shared/utils/helper/helper.util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';

export default function RegisterForm() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
    mode: 'onChange',
  });
  const auth = useAuth();

  const createUserWithEmailPassword: SubmitHandler<LoginSchema> = async (
    values,
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      // on success
      navigate(homePath.root);
      showNotification({
        title: 'Register Success',
        message: `Welcome, ${user.displayName ?? user.email}`,
        color: 'green',
      });
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <form
      data-testid="RegisterForm"
      className="flex flex-col"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={form.handleSubmit(createUserWithEmailPassword)}
    >
      {/* email */}
      <TextInput
        className="pt-4"
        type="email"
        label={LL.forms.email()}
        placeholder={LL.forms.emailPlaceholder()}
        error={
          form.formState.errors.email?.message
            ? LL.error.minLength({ field: 'email', length: 3 })
            : undefined
        }
        {...form.register('email', { required: true, minLength: 3 })}
      />

      {/* password */}
      <PasswordInput
        className="pt-4"
        label={LL.forms.password()}
        placeholder={LL.forms.passwordPlaceholder()}
        error={
          form.formState.errors.password?.message
            ? LL.error.minLength({ field: 'password', length: 6 })
            : undefined
        }
        {...form.register('password', { required: true, minLength: 6 })}
      />

      <Button
        type="submit"
        className="mt-4"
        loading={form.formState.isSubmitting}
        disabled={!form.formState.isValid}
      >
        {LL.forms[
          form.formState.isSubmitting ? 'registerLoading' : 'register'
        ]()}{' '}
      </Button>
    </form>
  );
}
