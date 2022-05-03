import React, { useCallback } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { logout } from '../../../redux/reducer/authReducer';

import stylesRoot from '../AdminTools.module.scss';
import styles from './LogoutUser.module.scss';

export const LogoutUser = () => {
  const dispatch = useDispatch();

  const showRoutes = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <li className={cn(stylesRoot.item, styles.root)} onClick={showRoutes}>
      Logout me
    </li>
  );
};
