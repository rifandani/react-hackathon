import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useI18nContext } from '@i18n/i18n-react';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  MantineColorScheme,
  Menu,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { productsPath } from '@product/routes/products.route';
import SvgIcon from '@shared/components/dumb/SvgIcon/SvgIcon';
import { todosPath } from '@todo/routes/todos.route';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import classes from './Navbar.module.css';

export default function Navbar() {
  const { LL } = useI18nContext();
  const navigate = useNavigate();
  const colorScheme = useMantineColorScheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const auth = useAuth();
  const { data } = useUser();

  // #region HANDLERS
  const onClickLogout = async () => {
    await auth.signOut(); // clear user store
    navigate(authPath.login); // back to login page
  };
  const onClickChangeTheme = (theme: MantineColorScheme) => () => {
    colorScheme.setColorScheme(theme);
  };
  // #endregion

  return (
    <Box>
      <header className={classes.header}>
        <Group h="100%" justify="space-between">
          <Group h="100%" gap="md">
            <SvgIcon id="reactjs" className="h-6 w-6" />
            <Text>{LL.common.appName()}</Text>
          </Group>

          <Group h="100%" wrap="nowrap" gap={0} visibleFrom="sm">
            <NavLink to={homePath.root} className={classes.link}>
              Home
            </NavLink>

            <NavLink to={todosPath.root} className={classes.link}>
              Todos
            </NavLink>

            <NavLink to={productsPath.root} className={classes.link}>
              Products
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
            <Menu transitionProps={{ transition: 'pop' }}>
              <Menu.Target>
                <Button
                  leftSection={
                    <Icon
                      icon={
                        colorScheme.colorScheme === 'auto'
                          ? 'lucide:computer'
                          : colorScheme.colorScheme === 'light'
                          ? 'lucide:sun'
                          : 'lucide:moon'
                      }
                    />
                  }
                >
                  {LL.common.theme()}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Theme</Menu.Label>
                <Menu.Item
                  component="button"
                  className="min-w-[8rem]"
                  leftSection={<Icon icon="lucide:computer" />}
                  rightSection={
                    colorScheme.colorScheme === 'auto' ? (
                      <Icon icon="lucide:check" />
                    ) : undefined
                  }
                  onClick={onClickChangeTheme('auto')}
                >
                  {LL.common.system()}
                </Menu.Item>
                <Menu.Item
                  component="button"
                  className="min-w-[8rem]"
                  leftSection={<Icon icon="lucide:sun" />}
                  rightSection={
                    colorScheme.colorScheme === 'light' ? (
                      <Icon icon="lucide:check" />
                    ) : undefined
                  }
                  onClick={onClickChangeTheme('light')}
                >
                  {LL.common.light()}
                </Menu.Item>
                <Menu.Item
                  component="button"
                  className="min-w-[8rem]"
                  leftSection={<Icon icon="lucide:moon" />}
                  rightSection={
                    colorScheme.colorScheme === 'dark' ? (
                      <Icon icon="lucide:check" />
                    ) : undefined
                  }
                  onClick={onClickChangeTheme('dark')}
                >
                  {LL.common.dark()}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {!!data && (
              <Menu
                position="bottom-end"
                transitionProps={{ transition: 'pop' }}
              >
                <Menu.Target>
                  <Avatar className="cursor-pointer">
                    {(data.displayName ?? data.email ?? 'Unknown').slice(0, 2)}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>User</Menu.Label>
                  <Menu.Item
                    component="button"
                    color="red"
                    leftSection={<Icon icon="lucide:log-out" />}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={onClickLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>

          <Burger
            hiddenFrom="sm"
            opened={drawerOpened}
            onClick={toggleDrawer}
          />
        </Group>
      </header>

      <Drawer.Root
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1_000}
        opened={drawerOpened}
        onClose={closeDrawer}
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>
            <Group>
              <SvgIcon id="reactjs" className="h-6 w-6" />
              <Drawer.Title>{LL.common.appName()}</Drawer.Title>
            </Group>

            <Drawer.CloseButton />
          </Drawer.Header>

          <Drawer.Body className="flex h-full flex-col p-0">
            <Divider my="sm" />

            <NavLink to={homePath.root} className={classes.link}>
              Home
            </NavLink>
            <NavLink to={todosPath.root} className={classes.link}>
              Todos
            </NavLink>
            <NavLink to={productsPath.root} className={classes.link}>
              Products
            </NavLink>

            <Divider my="sm" />

            <Button
              className="mx-3"
              variant="light"
              color="red"
              leftSection={<Icon icon="lucide:log-out" />}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onClickLogout}
            >
              Logout
            </Button>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Box>
  );
}
