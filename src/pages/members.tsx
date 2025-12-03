import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import members, { Member } from '../data/members'; 
import styles from './members.module.css'; 
import { IconWrapper, IconPaths } from '../components/socialIcon';

// SNSアイコンコンポーネントの型定義
interface SocialIconProps {
  type: 'twitter' | 'github' | 'youtube' | 'pixiv' | 'homepage' ;
  username: string; // リンクの表示名や説明
  url: string; // 実際のリンク先URL
  iconKey: keyof typeof IconPaths; // 表示するアイコン文字
}

const SocialIcon: React.FC<SocialIconProps> = ({ url, iconKey, username }) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title={username}>
      <IconWrapper name={iconKey} className={styles.socialIconSvg} />
    </Link>
  );
};

// 部員カードコンポーネントの型定義
interface MemberCardProps {
  member: Member; 
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  // SNSリンクのデータを構造化
  const socialLinks: SocialIconProps[] = [];
  
  if (member.twitterUrl) {
      socialLinks.push({
          type: 'twitter',
          username: 'X',
          url: member.twitterUrl,
          iconKey: 'twitter'
      });
  }
  if (member.githubUrl) {
      socialLinks.push({
          type: 'github',
          username: 'GitHub',
          url: member.githubUrl,
          iconKey: 'github'
      });
  }
  if (member.youtubeUrl) {
      socialLinks.push({
          type: 'youtube',
          username: 'YouTube',
          url: member.youtubeUrl,
          iconKey: 'youtube'
      });
  }
  if (member.pixivUrl) {
      socialLinks.push({
          type: 'pixiv',
          username: 'pixiv',
          url: member.pixivUrl,
          iconKey: 'pixiv'
      });
  }
  if (member.homepageUrl) {
      socialLinks.push({
          type: 'homepage',
          username: 'homepage',
          url: member.homepageUrl,
          iconKey: 'homepage'
      });
  }

  return (
    <div className={styles.memberCard}> 
      
      {/* 画像 (上部) */}
      <img 
        src={member.imageUrl} 
        alt={member.name} 
        className={styles.memberImage} 
      />

      {/* テキストコンテンツ (下部) */}
      <div className={styles.memberContent}>
        {/* 名前 */}
        <h3 className={styles.memberName}>{member.name}</h3>

        {/* 自己紹介 */}
        <p className={styles.memberBio}>
          {member.bio}
        </p>

        {/* SNSアイコンリンク */}
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};


// ページのメインコンポーネント
const MembersPage: React.FC = () => {
  return (
    <Layout
      title="メンバー"
      description="G^2のメンバー紹介"
    >
      
      <main className="container margin-bottom--lg">
        <div className={`container ${styles.pageTitle}`}>
          <h1>メンバー</h1>
        </div>
        <div className={styles.membersGrid}>
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

export default MembersPage;