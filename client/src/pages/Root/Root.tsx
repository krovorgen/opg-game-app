import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../../helpers/routes';
import { useAppSelector } from '../../redux/hooks';
import { Chat } from '../../components/Chat';
import { TableUser } from './TableUser';

import styles from './Root.module.scss';

export const Root = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to={AppRoutes.Login} />;

  return (
    <div className={styles.root}>
      <div className={styles.element}>
        <TableUser user={user} />
      </div>
      <Chat addClass={styles.element} />
    </div>
  );
};
