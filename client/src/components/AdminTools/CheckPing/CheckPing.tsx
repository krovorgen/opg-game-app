import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '@alfalab/core-components/loader';

import { apiHelpers } from '../../../api/helpers';

import stylesRoot from '../AdminTools.module.scss';
import styles from './CheckPing.module.scss';

export const CheckPing = () => {
  const [pingValue, setPingValue] = useState<null | number>(null);

  useEffect(() => {
    const getPingValue = async () => {
      const ping = await apiHelpers.checkPing();
      setPingValue(+ping.data.ping);
    };
    getPingValue();
  }, []);

  return (
    <li className={stylesRoot.item}>
      Check ping{' '}
      {pingValue !== null && (
        <mark
          className={cn(styles.ping, {
            [styles.low]: pingValue >= 0 && pingValue <= 50,
            [styles.medium]: pingValue >= 51 && pingValue <= 130,
            [styles.high]: pingValue >= 131,
          })}>
          {!pingValue ? <Loader /> : pingValue}
        </mark>
      )}
    </li>
  );
};
