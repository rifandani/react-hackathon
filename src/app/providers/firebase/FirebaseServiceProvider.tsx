import { useMount } from '@shared/hooks/useMount/useMount.hook';
import { toastError } from '@shared/utils/helper/helper.util';
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getRemoteConfig } from 'firebase/remote-config';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { PropsWithChildren } from 'react';
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  RemoteConfigProvider,
  StorageProvider,
  useFirebaseApp,
  useInitPerformance,
} from 'reactfire';

export default function FirebaseServiceProvider({
  children,
}: PropsWithChildren) {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);
  const storageInstance = getStorage(app);
  const databaseInstance = getDatabase(app);
  const remoteConfigInstance = getRemoteConfig(app);
  const authInstance = getAuth(app);

  if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('🟨 Connecting to firebase emulators...');

    // Set up emulators
    connectFirestoreEmulator(firestoreInstance, '127.0.0.1', 8080);
    connectStorageEmulator(storageInstance, '127.0.0.1', 9199);
    connectDatabaseEmulator(databaseInstance, '127.0.0.1', 9000);
    connectAuthEmulator(authInstance, 'http://127.0.0.1:9099', {
      disableWarnings: true,
    });

    // eslint-disable-next-line no-console
    console.log('🟩 Firebase emulators connected');
  }

  // to prevent hitting the API and spoil the production dashboard while in development
  if (process.env.NODE_ENV === 'production' || import.meta.env.PROD) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInitPerformance(async (firebaseApp) => {
      const { getPerformance } = await import('firebase/performance');
      return getPerformance(firebaseApp);
    });
  }

  // persist auth user data to localStorage
  useMount(() => {
    authInstance.setPersistence(browserLocalPersistence).catch((err) => {
      toastError(err);
    });
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <StorageProvider sdk={storageInstance}>
        <DatabaseProvider sdk={databaseInstance}>
          <RemoteConfigProvider sdk={remoteConfigInstance}>
            <AuthProvider sdk={authInstance}>{children}</AuthProvider>
          </RemoteConfigProvider>
        </DatabaseProvider>
      </StorageProvider>
    </FirestoreProvider>
  );
}
