import React, { FC, useCallback, useState } from 'react';

import { CheckPing } from './CheckPing';

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
          <li className={styles.item}>View route</li>
        </ul>
      )}
      <button className={styles.root} onClick={changeVisibleMenu}>
        A
      </button>
    </>
  );
};
