import { LoginSchema, loginSchema } from '@auth/api/auth.schema';
import { loginFormDefaultValues } from '@auth/constants/login.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18nContext } from '@i18n/i18n-react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';

export default function useLoginForm() {
  const { LL } = useI18nContext();
  const fetcher = useFetcher();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
    mode: 'onChange',
  });

  return { LL, fetcher, form };
}
