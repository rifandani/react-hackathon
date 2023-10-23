import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { useI18nContext } from '@i18n/i18n-react';

export default function useNotFoundPageVM() {
  const userStore = useUserStore();
  const { LL } = useI18nContext();

  return { userStore, LL };
}
