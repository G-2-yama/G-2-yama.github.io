/**
 * 部員情報のインタフェース
 * @export
 * @interface Member
 */
export interface Member {
  name: string; // 名前（日本語）
  position?: string; // 役職（例: '部長', '会計', 'メンバー' など）
  bio: string; // 自己紹介やコメント

  twitterUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  pixivUrl?: string;
  homepageUrl?: string;

  imageUrl: string;
}

/**
 * 部員情報の設定
 * @export
 * @const members
 * @type {Member[]}
 */
const members: Member[] = [
  {
    name: 'nnna',
    position: '2024年度部長',
    bio: 
`美術班．だがプログラムもシナリオも全てやる．

私のホームページは梨大生限定です．`,
    twitterUrl: 'https://x.com/nh7cs', 
    githubUrl: 'https://github.com/nnna1224',   
    youtubeUrl: 'https://www.youtube.com/@nh7cs',
    pixivUrl: 'https://www.pixiv.net/users/100585348',
    homepageUrl: 'https://lww.kki.yamanashi.ac.jp/~t22cs040/',
    imageUrl: 'https://github.com/nnna1224.png',
  },
];

export default members;