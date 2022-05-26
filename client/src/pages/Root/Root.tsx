import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../../helpers/routes';
import { useAppSelector } from '../../redux/hooks';
import { Chat } from '../../components/Chat';

import styles from './Root.module.scss';

export const Root = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={AppRoutes.Login} />;
  }

  const rows = [];
  for (let key in user) {
    rows.push({ key, value: (user as any)[key] });
  }
  return (
    <div className={styles.root}>
      <div className={styles.element}>
        <table>
          <tbody>
            {rows.map((item) => (
              <tr key={Math.random()}>
                <td>{item.key}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Chat addClass={styles.element} />
    </div>
  );
};
