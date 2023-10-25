import { Button, Code, Container, Title } from '@mantine/core';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn&apos;t exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren&apos;t authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }

    // the response json is automatically parsed to `error.data`, we also have access to the status
    return (
      <Container>
        <Title>Something went wrong</Title>

        <Button
          variant="filled"
          onClick={() => {
            window.location.assign(window.location.href);
          }}
        >
          Reload Page
        </Button>

        <Code block>{JSON.stringify(error, null, 2)}</Code>
      </Container>
    );
  }

  // rethrow to let the parent error boundary handle it when it's not a special case for this route
  throw error;
}
