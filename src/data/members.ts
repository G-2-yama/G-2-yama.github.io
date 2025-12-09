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
    position: '部員',
    bio: 
`美術班
だけどプログラムとかシナリオとか
全てをやっている`,
    twitterUrl: 'https://x.com/nh7cs', 
    githubUrl: 'https://github.com/nnna1224',   
    youtubeUrl: 'https://www.youtube.com/@nh7cs',
    pixivUrl: 'https://www.pixiv.net/users/100585348',
    homepageUrl: 'https://lww.kki.yamanashi.ac.jp/~t22cs040/',
    imageUrl: 'https://github.com/nnna1224.png',
  },
  {
    name: 'スラリン',
    position: '部員',
    bio: 
`某アイドル研究部スパイ
プログラム班という体で在席

生きがいはアルバイトと学マス
人間って何だろう`,
    twitterUrl: 'https://x.com/Surarin_dasu', 
    githubUrl: 'https://github.com/surarinko8',   
    imageUrl: '/img/user_icon/surarin.jpg',
  },
];

export default members;
