import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import AppDatesProvider from './providers/dates/DatesProvider';
import AppErrorBoundary from './providers/error/ErrorBoundary';
import AppFirebaseProvider from './providers/firebase/FirebaseProvider';
import AppI18nProvider from './providers/i18n/I18nProvider';
import AppMantineProvider from './providers/mantine/MantineProvider';
import AppQueryProvider from './providers/query/QueryProvider';
import AppRouterProvider from './providers/router/RouterProvider';
import AppToastProvider from './providers/toast/ToastProvider';
import ReloadPromptSW from './pwa/ReloadPromptSW';

export default function App() {
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppQueryProvider>
          <AppI18nProvider>
            <AppMantineProvider>
              <AppDatesProvider>
                <AppToastProvider>
                  <AppFirebaseProvider>
                    {/* router entry point */}
                    <AppRouterProvider />
                  </AppFirebaseProvider>

                  {/* PWA */}
                  <ReloadPromptSW />

                  {/* react query devtools */}
                  <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-left"
                  />
                </AppToastProvider>
              </AppDatesProvider>
            </AppMantineProvider>
          </AppI18nProvider>
        </AppQueryProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}
