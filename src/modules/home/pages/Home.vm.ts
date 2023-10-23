import { useI18nContext } from '@i18n/i18n-react';

export default function useHomePageVM() {
  const { LL } = useI18nContext();

  return { LL };
}
