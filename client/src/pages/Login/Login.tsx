import React, { SyntheticEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { PasswordInput } from '@alfalab/core-components/password-input';

import styles from './Login.module.scss';

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitLogin = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success('Submit');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <Typography.Title className={styles.title} tag="h1" view="small">
          Login
        </Typography.Title>
        <form onSubmit={submitLogin}>
          <Input className={styles.input} label="email" name="email" size="s" block />
          <PasswordInput
            className={styles.input}
            label="password"
            name="password"
            size="s"
            block
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={changeVisibilityPassword}
          />
          <Button className={styles.submit} type="submit" size="s" block view="primary">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};
