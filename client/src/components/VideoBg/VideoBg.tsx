import React from 'react';

import styles from './VideoBg.module.scss';

export const VideoBg = () => {
  return (
    <video className={styles.root} autoPlay muted loop id="myVideo">
      <source src="/videos/video-bg.mp4" type="video/mp4" />
    </video>
  );
};
