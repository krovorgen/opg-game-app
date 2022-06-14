import React, { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import { Input } from '@alfalab/core-components/input/modern';
import { Button } from '@alfalab/core-components/button/modern';
import { Typography } from '@alfalab/core-components/typography/modern';
import { Link as LinkUI } from '@alfalab/core-components/link/modern';

import { AppRoutes } from '../../helpers/routes';
import { validateEmail } from '../../helpers/validateEmail';
import { useAppSelector } from '../../redux/hooks';
import { catchHandler } from '../../helpers/catchHandler';
import { apiAuth } from '../../api/auth';
import { VideoBg } from '../../components/VideoBg';

import styles from './PasswordRecovery.module.scss';

export const PasswordRecovery = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');

  const changeEmailValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const submitLogin = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingStatusBtn(true);

      if (!validateEmail(email)) {
        toast.error('Некорректно указана почта');
        setLoadingStatusBtn(false);
        return;
      }
      try {
        await apiAuth.passwordRecovery(email);
        setStep(2);
      } catch ({ response }) {
        catchHandler(response);
        setStep(3);
      }

      setLoadingStatusBtn(false);
    },
    [email],
  );

  if (user) return <Navigate to={AppRoutes.Root} />;

  return (
    <>
      <VideoBg />
      <div className={styles.root}>
        <div className={styles.box}>
          {step === 1 && (
            <>
              <Typography.Title className={styles.title} tag="h1" view="small">
                Забыли пароль?
              </Typography.Title>
              <form className={styles.form} onSubmit={submitLogin}>
                <Input
                  className={styles.input}
                  value={email}
                  onChange={changeEmailValue}
                  label="Почта"
                  name="email"
                  size="s"
                  block
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
                Проверьте почту
              </Typography.Title>
              <Typography.Text className={styles.text} tag="p">
                В течение 15 минут вы получите письмо на почту{' '}
                <LinkUI view="primary" Component="span">
                  {email}
                </LinkUI>
                . Когда письмо придёт, откройте его и перейдите по ссылке.
              </Typography.Text>
              <Link to={AppRoutes.Login}>
                <Button Component="span" size="s" block>
                  Войти
                </Button>
              </Link>
            </>
          )}
          {step === 3 && (
            <>
              <Typography.Title className={styles.title} tag="h1" view="small">
                Аккаунт не найден
              </Typography.Title>
              <Typography.Text className={styles.text} tag="p">
                Такого аккаунта нет.{' '}
                <LinkUI view="default" Component="span" onClick={() => setStep(1)}>
                  Повторить попытку?
                </LinkUI>
              </Typography.Text>
              <Link to={AppRoutes.Registration}>
                <Button Component="span" size="s" block>
                  Зарегистрироваться
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
