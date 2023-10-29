import { LoginFormSchema, loginFormSchema } from '@auth/api/auth.schema';
import { loginFormDefaultValues } from '@auth/constants/login.constant';
import { homePath } from '@home/routes/home.route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import PasswordInputForm from '@shared/components/smart/PasswordInputForm/PasswordInputForm';
import TextInputForm from '@shared/components/smart/TextInputForm/TextInputForm';
import {
  recursivelyNullifyUndefinedValues,
  toastError,
} from '@shared/utils/helper/helper.util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { getUserDocument } from 'modules/user/utils/user.util';
import { Form, FormSubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFirestore } from 'reactfire';
import { UnknownRecord } from 'type-fest';

export default function RegisterForm() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const form = useForm<LoginFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });
  const auth = useAuth();
  const firestore = useFirestore();

  const onSubmitLogin: FormSubmitHandler<LoginFormSchema> = async (values) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.data.email,
        values.data.password,
      );

      // create user document
      const userDoc = getUserDocument(firestore, user.uid); // the id will be based on user.uid
      await setDoc(
        userDoc,
        recursivelyNullifyUndefinedValues(user.toJSON() as UnknownRecord),
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
        {LL.forms[
          form.formState.isSubmitting ? 'registerLoading' : 'register'
        ]()}{' '}
      </Button>
    </Form>
  );
}
