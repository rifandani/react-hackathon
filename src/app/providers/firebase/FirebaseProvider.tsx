import { PropsWithChildren } from 'react';
import { FirebaseAppProvider } from 'reactfire';
import FirebaseServiceProvider from './FirebaseServiceProvider';
import { firebaseConfig } from './config';

export default function AppFirebaseProvider({ children }: PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseServiceProvider>{children}</FirebaseServiceProvider>
    </FirebaseAppProvider>
  );
}
