import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';
import { toast } from 'react-toastify';

import { validateEmail } from '../../helpers/validateEmail';

import styles from './Registration.module.scss';
import { apiAuth } from '../../api/auth';
import { catchHandler } from '../../helpers/catchHandler';

export const Registration = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitRegistration = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingStatusBtn(true);

    const { email, password, nickname } = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      email: { value: string };
      password: { value: string };
      nickname: { value: string };
    };

    if (!validateEmail(email.value)) {
      toast.error('Некорректно указан e-mail');
      setLoadingStatusBtn(false);
      return;
    }
    try {
      await apiAuth.registration(email.value, password.value, nickname.value);
      toast.success('Благодарим Вас за регистрацию!');
    } catch ({ response }) {
      catchHandler(response);
    } finally {
      setLoadingStatusBtn(false);
    }
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
            maxLength={30}
            defaultValue={`Игрок ${+new Date()}`}
          />
          <PasswordInput
            className={styles.input}
            label="password"
            name="password"
            size="s"
            block
            maxLength={50}
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={changeVisibilityPassword}
          />
          <Button
            className={styles.submit}
            type="submit"
            size="s"
            block
            view="primary"
            loading={loadingStatusBtn}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};
