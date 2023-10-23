import { Locales } from '@i18n/i18n-types';
import { useLocalStorage } from '@mantine/hooks';
import {
  DEFAULT_LANGUAGE_STORAGE_VALUE,
  LANGUAGE_STORAGE_KEY,
} from '@shared/constants/storage.constant';

export function useLocalesStorage() {
  return useLocalStorage<Locales>({
    key: LANGUAGE_STORAGE_KEY,
    defaultValue: DEFAULT_LANGUAGE_STORAGE_VALUE,
  });
}
