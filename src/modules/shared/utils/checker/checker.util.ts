import {
  UserStoreLocalStorage,
  userStoreLocalStorageSchema,
  userStoreName,
} from '@auth/hooks/useUserStore/useUserStore.hook';
import { getAuth } from 'firebase/auth';

/**
 * check if user is authenticated or not by checking localStorage and parse the schema
 */
export function checkAuthUser() {
  const appUser = localStorage.getItem(userStoreName) ?? '{}';
  const parsedAppUser = JSON.parse(appUser) as UserStoreLocalStorage;
  const parsed = userStoreLocalStorageSchema.safeParse(parsedAppUser);

  return parsed.success && parsed.data.state.user;
}

/**
 * check if user is authenticated or not by checking the firebase auth
 */
export function checkAuthUserFirebase() {
  const auth = getAuth();

  return !!auth.currentUser;
}
