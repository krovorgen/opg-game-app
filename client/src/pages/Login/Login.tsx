import React, { SyntheticEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography/modern';
import { Input } from '@alfalab/core-components/input/modern';
import { Button } from '@alfalab/core-components/button/modern';
import { PasswordInput } from '@alfalab/core-components/password-input/modern';
import { Link as LinkUI } from '@alfalab/core-components/link/modern';

import { AppRoutes } from '../../helpers/routes';
import { validateEmail } from '../../helpers/validateEmail';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser } from '../../redux/reducer/authReducer';
import { VideoBg } from '../../components/VideoBg';

import styles from './Login.module.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitLogin = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingStatusBtn(true);

      const { email, password } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        email: { value: string };
        password: { value: string };
      };

      if (!validateEmail(email.value)) {
        toast.error('Некорректно указана почта');
        setLoadingStatusBtn(false);
        return;
      }

      await dispatch(loginUser({ email: email.value, password: password.value }));
      setLoadingStatusBtn(false);
    },
    [dispatch],
  );

  if (user) return <Navigate to={AppRoutes.Root} />;

  return (
    <>
      <VideoBg />
      <div className={styles.root}>
        <div className={styles.box}>
          <Typography.Title className={styles.title} tag="h1" view="small">
            Аутентификация
          </Typography.Title>
          <form className={styles.form} onSubmit={submitLogin}>
            <Input className={styles.input} label="Почта" name="email" size="s" block />
            <PasswordInput
              className={styles.input}
              label="Пароль"
              name="password"
              size="s"
              autoComplete="on"
              block
              passwordVisible={passwordVisible}
              onPasswordVisibleChange={changeVisibilityPassword}
            />
            <Link to={AppRoutes.PasswordRecovery} className={styles.recovery}>
              <LinkUI view="default" Component="span">
                Восстановить пароль
              </LinkUI>
            </Link>
            <Button
              className={styles.submit}
              type="submit"
              size="s"
              block
              view="primary"
              loading={loadingStatusBtn}>
              Войти
            </Button>
          </form>
          <Link to={AppRoutes.Registration}>
            <Button Component="span" size="s" block>
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
