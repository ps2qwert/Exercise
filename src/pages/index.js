/*
 * @Author: PengKang
 * @Date: 2019-08-19 11:23:50
 * @LastEditors: PengKang
 * @LastEditTime: 2020-08-11 16:08:04
 * @FilePath: \exercise\src\pages\index.js
 */
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.{' '}
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
      </ul>
    </div>
  );
}
