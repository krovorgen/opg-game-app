import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import { Typography } from '@alfalab/core-components/typography';
import { PasswordInput } from '@alfalab/core-components/password-input';

import { AppRoutes } from '../../helpers/routes';
import { useAppSelector } from '../../redux/hooks';
import { catchHandler } from '../../helpers/catchHandler';
import { apiAuth } from '../../api/auth';

import styles from './SetNewPassword.module.scss';

export const SetNewPassword = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { recoveryCode } = useParams();

  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitLogin = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingStatusBtn(true);

      const { password } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        password: { value: string };
      };

      try {
        await apiAuth.setNewPassword(recoveryCode as string, password.value);
        setStep(2);
      } catch ({ response }) {
        catchHandler(response);
      }

      setLoadingStatusBtn(false);
    },
    [recoveryCode],
  );

  if (user) {
    return <Navigate to={AppRoutes.Root} />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        {step === 1 && (
          <>
            <Typography.Title className={styles.title} tag="h1" view="small">
              Укажите новый пароль
            </Typography.Title>
            <form className={styles.form} onSubmit={submitLogin}>
              <PasswordInput
                className={styles.input}
                label="Пароль"
                name="password"
                size="s"
                block
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
                Восстановить
              </Button>
            </form>
            <Link to={AppRoutes.Login}>
              <Button Component="span" size="s" block>
                Войти
              </Button>
            </Link>
          </>
        )}
        {step === 2 && (
          <>
            <Typography.Title className={styles.title} tag="h1" view="small">
              Пароль успешно восстановлен
            </Typography.Title>
            <Typography.Text className={styles.text} tag="p">
              Для продолжения необходимо войти
            </Typography.Text>
            <Link to={AppRoutes.Login}>
              <Button Component="span" size="s" block>
                Войти
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
