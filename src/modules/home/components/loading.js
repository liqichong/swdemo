import React from 'react';
import styles from './loading.scss';

export default () => (
  <div className={styles.mask}>
    <div className={styles.spinner}>
      <div className={styles['double-bounce1']}></div>
      <div className={styles['double-bounce2']}></div>
    </div>
  </div>
);
