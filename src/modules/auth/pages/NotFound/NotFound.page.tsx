import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import SvgIcon from '@shared/components/atoms/SvgIcon/SvgIcon.atom';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';
import useNotFoundPageVM from './NotFound.vm';

export default function NotFoundPage() {
  const { userStore, LL } = useNotFoundPageVM();

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
              to={userStore.user ? homePath.root : authPath.login}
            >
              {LL.auth.backTo({
                isLoggedIn: userStore.user ? 'true' : 'false',
              })}
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
