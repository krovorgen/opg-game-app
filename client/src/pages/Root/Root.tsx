import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../../helpers/routes';
import { useAppSelector } from '../../redux/hooks';

import styles from './Root.module.scss';

export const Root = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.user);

  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.Login} />;
  }
  return <div className={styles.root}>Root</div>;
};
