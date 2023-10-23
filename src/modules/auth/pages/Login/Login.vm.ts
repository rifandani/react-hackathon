import { useI18nContext } from '@i18n/i18n-react';

export default function useLoginPageVM() {
  const { LL } = useI18nContext();

  return { LL };
}
