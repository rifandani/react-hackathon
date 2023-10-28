import {
  Affix,
  Button,
  Paper,
  Transition,
  VisuallyHidden,
} from '@mantine/core';
import { useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPromptSW() {
  // replaced dynamically
  const buildDate = '__DATE__';
  // replaced dynamically
  const reloadSW = '__RELOAD_SW__';

  const onRegisteredSW = useCallback(
    (_swUrl: string, registration: ServiceWorkerRegistration | undefined) => {
      // @ts-expect-error just ignore
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (reloadSW === 'true' && registration) {
        setInterval(() => {
          // eslint-disable-next-line no-console
          console.log('🔵 Checking for Service Worker updates...');
          void registration.update();
        }, 20_000 /* 20s for testing purposes */);
      }
    },
    [],
  );

  const onRegisterError = useCallback((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('🛑 Service Worker registration error', error);
  }, []);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW,
    onRegisterError,
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const reloadAndUpdateSW = () => {
    void updateServiceWorker(true);
  };

  return (
    <Affix id="ReloadPromptSW" position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={offlineReady || needRefresh}>
        {(transitionStyles) => (
          <Paper
            className="block min-w-[20rem] max-w-[20rem] overflow-hidden p-3 shadow-lg"
            style={transitionStyles}
          >
            <h3 className="line-clamp-3 whitespace-pre-wrap break-words pb-3">
              {offlineReady
                ? 'App ready to work offline'
                : 'New content available, click on reload button to update'}
            </h3>

            <section className="flex justify-between space-x-3">
              <Button
                className="w-full"
                type="button"
                variant="subtle"
                onClick={close}
              >
                Close
              </Button>

              {needRefresh && (
                <Button
                  className="w-full"
                  type="button"
                  onClick={reloadAndUpdateSW}
                >
                  Reload
                </Button>
              )}
            </section>
          </Paper>
        )}
      </Transition>

      <VisuallyHidden>{buildDate}</VisuallyHidden>
    </Affix>
  );
}
