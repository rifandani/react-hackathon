import { Icon } from '@iconify/react';
import {
  ActionIcon,
  Tabs,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

export default function Playground() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const isLightMode = computedColorScheme === 'light';

  const onClickToggleTheme = () => {
    setColorScheme(isLightMode ? 'dark' : 'light');
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
      <ActionIcon aria-label="Toggle color scheme" onClick={onClickToggleTheme}>
        <Icon icon={isLightMode ? 'lucide:moon' : 'lucide:sun'} />
      </ActionIcon>

      <Tabs defaultValue="designer" className="w-full">
        <Tabs.List
          aria-label="Playground"
          className="mx-auto my-5 flex w-fit justify-center"
        >
          <Tabs.Tab value="demo">Demo</Tabs.Tab>

          <Tabs.Tab value="playground">Playground</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="demo" className="h-full w-full">
          Demo
        </Tabs.Panel>

        <Tabs.Panel value="playground" className="h-full w-full">
          Playground
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}
