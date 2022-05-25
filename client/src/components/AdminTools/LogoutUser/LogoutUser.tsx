import React, { useCallback } from 'react';
import cn from 'classnames';

import { logout } from '../../../redux/reducer/authReducer';
import { useAppDispatch } from '../../../redux/hooks';

import stylesRoot from '../AdminTools.module.scss';
import styles from './LogoutUser.module.scss';

export const LogoutUser = () => {
  const dispatch = useAppDispatch();

  const showRoutes = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <li className={cn(stylesRoot.item, styles.root)} onClick={showRoutes}>
      Logout me
    </li>
  );
};
