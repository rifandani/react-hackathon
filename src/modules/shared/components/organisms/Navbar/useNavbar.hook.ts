import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { authPath } from '@auth/routes/auth.route';
import { useI18nContext } from '@i18n/i18n-react';
import { MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export default function useNavbar() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();
  const colorScheme = useMantineColorScheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // #region HANDLERS
  const onClickLogout = () => {
    clearUser(); // clear user store
    navigate(authPath.login); // back to login page
  };
  const onClickChangeTheme = (theme: MantineColorScheme) => {
    colorScheme.setColorScheme(theme);
  };
  // #endregion

  return {
    LL,
    user,
    colorScheme,
    drawerOpened,
    toggleDrawer,
    closeDrawer,
    onClickLogout,
    onClickChangeTheme,
  };
}
