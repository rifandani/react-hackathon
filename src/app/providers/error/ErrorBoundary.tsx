import { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-3">
      <h1 className="">Error Boundary</h1>

      <button
        className="rounded-md border px-3 py-1 focus:ring focus:ring-blue-500"
        type="button"
        onClick={resetErrorBoundary}
      >
        Reload Page
      </button>

      <pre>{JSON.stringify(error, null, 2)}</pre>
    </main>
  );
}

export default function AppErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
      onError={() => {
        // Do something with the error, e.g. log to an external API
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
