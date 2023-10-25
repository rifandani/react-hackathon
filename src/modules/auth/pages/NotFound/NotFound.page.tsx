import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { useI18nContext } from '@i18n/i18n-react';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import SvgIcon from '@shared/components/atoms/SvgIcon/SvgIcon.atom';
import { Link } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import classes from './NotFound.module.css';

export default function NotFoundPage() {
  const { LL } = useI18nContext();
  const { data } = useSigninCheck();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <SvgIcon
          id="403"
          width="75vw"
          height="40vh"
          className={classes.image}
        />

        <div className={classes.content}>
          <Title className={classes.title}>{LL.auth.notFound404()}</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            {LL.auth.gone()}
          </Text>

          <Group justify="center">
            <Button
              size="md"
              component={Link}
              to={data.signedIn ? homePath.root : authPath.login}
            >
              {LL.auth.backTo({
                isLoggedIn: data.signedIn ? 'true' : 'false',
              })}
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
