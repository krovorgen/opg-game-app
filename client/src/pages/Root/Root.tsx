import React from 'react';

import styles from './Root.module.scss';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../helpers/routes';
import { useAppSelector } from '../../redux/hooks';

export const Root = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.Login} />;
  }
  return <div className={styles.root}>Root</div>;
};
