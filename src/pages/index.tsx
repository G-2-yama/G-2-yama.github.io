import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Greeting from '@site/src/pages/greeting.md';

import styles from './index.module.css';


// サークル基本情報
const CIRCLE_INFO = {
  description: "山梨大学 一次創作サークル",
  logo: "https://github.com/g-2-yama.png",
};

// 統計・特徴データ
const STATS = [
  { label: 'サークル設立', value: '2013年' },
  { label: 'メンバー', value: '22名' },
  { label: '制作作品', value: '15作以上' },
  { label: '会費', value: '0円' },
];

// 外部リンクデータ
const SOCIAL_LINKS = [
  { title: 'GitHub', url: 'https://github.com/G-2-yama', description: 'ソースコード・開発' },
  { title: 'X (旧Twitter)', url: 'https://x.com/g2_yama', description: '最新情報・お知らせ' },
  { title: 'YouTube', url: 'https://youtube.com/@g_2827?si=D_OfNFhzohP-Wq9M', description: '作品紹介・動画' },
  { title: 'Booth', url: 'https://g2yama.booth.pm/', description: 'ゲーム頒布・販売' },
  { title: 'Pixiv', url: 'https://www.pixiv.net/users/10944402', description: 'イラスト・宣伝' },
];


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img 
          src={CIRCLE_INFO.logo} 
          alt='Logo' 
          className={styles.logoImage}
        />
        <p className={styles.heroSubtitle}>
          {CIRCLE_INFO.description}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/greeting">
             G^2を知る
          </Link>
          <Link
            className="button button--outline button--danger button--lg"
            to="https://g2yama.booth.pm/"
            target='_blank'
            rel='noopener noreferrer'
          >
            購入する (Booth)
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Information</h2>
        <div className="row">
          {STATS.map((props, idx) => (
            <div key={idx} className={clsx('col col--3')}>
              <div className="text--center padding-horiz--md">
                <h3>{props.label}</h3>
                <h2 style={{ color: 'var(--ifm-color-primary)', fontSize: '2.3rem', marginBottom: '0.5rem' }}>
                  {props.value}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLinksSection() {
  return (
    <section className={styles.socialLinks}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Links</h2>
        <div className="row">
          {SOCIAL_LINKS.map((link, idx) => (
            <div key={idx} className="col col--4 margin-bottom--md">
              <Link
                to={link.url}
                className={styles.linkCard}
                target='_blank'
                rel='noopener noreferrer'
              >
                <h3>{link.title}</h3>
                <p className="text--center margin-top--sm">{link.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title=""
      description="山梨大学のゲーム制作サークルG^2の公式サイト">
      <main>
        <HomepageHeader />
        <StatsSection />
        <SocialLinksSection />
        <div className={styles.container}><Greeting /></div>
      </main>
    </Layout>
  );
}
