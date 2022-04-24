import React, { FC, useCallback, useState } from 'react';

import { CheckPing } from './CheckPing';
import { ViewRoutes } from './ViewRoutes';

import styles from './AdminTools.module.scss';

export const AdminTools: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const changeVisibleMenu = useCallback(() => {
    setShowMenu((v) => !v);
  }, []);
  return (
    <>
      {showMenu && (
        <ul className={styles.items}>
          <CheckPing />
          <ViewRoutes />
        </ul>
      )}
      <button className={styles.root} onClick={changeVisibleMenu}>
        A
      </button>
    </>
  );
};
