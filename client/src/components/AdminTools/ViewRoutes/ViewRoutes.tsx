import React, { useCallback, useState } from 'react';
import cn from 'classnames';

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
      <ul className={styles.items}>
        {visibleRoutes &&
          Object.entries(JSON.parse(JSON.stringify(AppRoutes))).map(([key, value]) => (
            <li key={key} className={styles.item}>
              {key as string} : {value as string}
            </li>
          ))}
        <li className={styles.item}></li>
      </ul>
    </li>
  );
};
