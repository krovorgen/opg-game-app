import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';
import { toast } from 'react-toastify';

import styles from './Registration.module.scss';

export const Registration = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitRegistration = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Submit');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <Typography.Title className={styles.title} tag="h1" view="small">
          Registration
        </Typography.Title>
        <form onSubmit={submitRegistration}>
          <Input className={styles.input} label="email" name="email" size="s" block />
          <Input
            className={styles.input}
            label="nickname"
            name="nickname"
            size="s"
            block
            defaultValue={`Игрок ${+new Date()}`}
          />
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
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};
