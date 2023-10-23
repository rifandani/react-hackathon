import TypesafeI18n from '@i18n/i18n-react';
import { detectLocale } from '@i18n/i18n-util';
import { loadLocaleAsync } from '@i18n/i18n-util.async';
import { PropsWithChildren, useEffect, useState } from 'react';
import { localStorageDetector } from 'typesafe-i18n/detectors';

const detectedLocale = detectLocale(localStorageDetector);

export default function AppI18nProvider({ children }: PropsWithChildren) {
  const [localeLoaded, setLocaleLoaded] = useState(false);

  // sync & load locale
  useEffect(() => {
    loadLocaleAsync(detectedLocale)
      .then(() => {
        setLocaleLoaded(true);
      })
      .catch(() => {});
  }, [localeLoaded]);

  if (!localeLoaded) return null;

  return <TypesafeI18n locale={detectedLocale}>{children}</TypesafeI18n>;
}
