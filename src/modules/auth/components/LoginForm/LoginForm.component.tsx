import { Icon } from '@iconify/react';
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import useLoginForm from './useLoginForm.hook';

export default function LoginForm() {
  const { LL, fetcher, form } = useLoginForm();

  return (
    <fetcher.Form
      data-testid="LoginForm"
      className="flex flex-col pt-3 md:pt-8"
      method="POST"
    >
      {/* username */}
      <TextInput
        className="pt-4"
        label={LL.forms.username()}
        placeholder={LL.forms.usernamePlaceholder()}
        error={
          form.formState.errors.username?.message
            ? LL.error.minLength({ field: 'username', length: 3 })
            : undefined
        }
        {...form.register('username', { required: true, minLength: 3 })}
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

      {fetcher.data && (
        <Alert
          className="mt-4"
          variant="light"
          color="red"
          title="Error"
          icon={<Icon icon="lucide:badge-x" />}
        >
          {(fetcher.data as ErrorApiResponseSchema).message}
        </Alert>
      )}

      <Button
        type="submit"
        className="mt-4"
        loading={fetcher.state === 'submitting'}
        disabled={!form.formState.isValid}
      >
        {LL.forms[fetcher.state === 'submitting' ? 'loginLoading' : 'login']()}{' '}
        (0lelplR)
      </Button>
    </fetcher.Form>
  );
}
