import { Icon, IconProps } from '@iconify/react';
import { useMantineTheme } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

interface Props {
  root?: ComponentPropsWithoutRef<'div'>;
  icon?: IconProps;
}

export default function LoadingBar({ root, icon }: Props) {
  const mantineTheme = useMantineTheme();

  return (
    <div className="flex items-center justify-center py-5" {...root}>
      <Icon
        icon="svg-spinners:3-dots-fade"
        height="5em"
        color={mantineTheme.colors.blue[5]}
        {...icon}
      />
    </div>
  );
}
