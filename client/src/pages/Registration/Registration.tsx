import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';

import { validateEmail } from '../../helpers/validateEmail';
import { AppRoutes } from '../../helpers/routes';
import { SexType } from '../../api/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registrationUserTC } from '../../redux/reducer/authReducer';
import { Select } from '@alfalab/core-components/select';

import styles from './Registration.module.scss';

export const Registration = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loadingStatusBtn, setLoadingStatusBtn] = useState(false);

  const options = useMemo(
    () => [
      { key: '1', content: 'Мужской', value: SexType.male },
      { key: '2', content: 'Женский', value: SexType.woman },
    ],
    [],
  );

  const changeVisibilityPassword = useCallback(() => {
    setPasswordVisible((v) => !v);
  }, []);

  const [selected, setSelected] = useState([options[0]]);
  const handleChange = useCallback(({ selectedMultiple }: any) => {
    setSelected(selectedMultiple);
  }, []);

  const submitRegistration = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingStatusBtn(true);

      const { email, password, nickname, sex } = e.currentTarget
        .elements as typeof e.currentTarget.elements & {
        email: { value: string };
        password: { value: string };
        nickname: { value: string };
        sex: { value: string };
      };

      if (!validateEmail(email.value)) {
        toast.error('Некорректно указана почта');
        setLoadingStatusBtn(false);
        return;
      }

      await dispatch(
        registrationUserTC({
          email: email.value,
          password: password.value,
          nickname: nickname.value,
          sex: options[+sex.value - 1].value,
        }),
      );

      setLoadingStatusBtn(false);
    },
    [dispatch, options],
  );

  if (user) {
    return <Navigate to={AppRoutes.Root} />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <Typography.Title className={styles.title} tag="h1" view="small">
          Регистрация
        </Typography.Title>
        <form className={styles.form} onSubmit={submitRegistration}>
          <Input className={styles.input} label="Почта" name="email" size="s" block />
          <Input
            className={styles.input}
            label="Имя в игре"
            name="nickname"
            size="s"
            block
            maxLength={30}
            defaultValue={`Игрок ${+new Date()}`}
          />
          <PasswordInput
            className={styles.input}
            label="Пароль"
            name="password"
            size="s"
            block
            maxLength={50}
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={changeVisibilityPassword}
          />
          <Select
            className={styles.input}
            options={options}
            onChange={handleChange}
            selected={selected}
            name="sex"
            block
            placeholder="Пол"
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

        <Link to={AppRoutes.Login}>
          <Button Component="span" size="s" block>
            Войти в аккаунт
          </Button>
        </Link>
      </div>
    </div>
  );
};
