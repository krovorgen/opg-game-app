import React, { SyntheticEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppRoutes } from '../../helpers/routes';
import { validateEmail } from '../../helpers/validateEmail';
import { useAppSelector } from '../../redux/hooks';
import { loginUserTC } from '../../redux/reducer/authReducer';

import styles from './Login.module.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const submitLogin = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
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

    await dispatch(loginUserTC({ email: email.value, password: password.value }));
    setLoadingStatusBtn(false);
  }, []);

  if (isLoggedIn) {
    return <Navigate to={AppRoutes.Root} />;
  }
  return (
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
  );
};
