import type {ReactNode} from 'react';
import Layout from '@theme/Layout';

import Greeting from '@site/src/pages/greeting.md';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout title="">
      <main>
        <div className={styles.container}><Greeting /></div>
      </main>
    </Layout>
  );
}
