import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { AppRoutes } from '../../../helpers/routes';

import stylesRoot from '../AdminTools.module.scss';
import styles from './ViewRoutes.module.scss';

export const ViewRoutes = () => {
  const [visibleRoutes, setVisibleRoutes] = useState(false);

  const showRoutes = useCallback(() => {
    setVisibleRoutes(true);
  }, []);

  return (
    <li className={cn(stylesRoot.item, styles.root)} onClick={showRoutes}>
      <span>View route</span>
      {visibleRoutes && (
        <ul className={styles.items}>
          {Object.entries(JSON.parse(JSON.stringify(AppRoutes))).map(([key, value]) => (
            <li key={key} className={styles.item}>
              <NavLink
                to={value as string}
                className={(props) =>
                  `${cn({ [styles.linkActive]: props.isActive })} ${styles.link}`
                }>
                {key as string} : {value as string}
              </NavLink>
            </li>
          ))}
          <li className={styles.item}></li>
        </ul>
      )}
    </li>
  );
};
