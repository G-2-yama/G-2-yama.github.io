import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'G^2',
  tagline: 'G^2公式サイト',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://G-2-yama.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'G-2-yama', // Usually your GitHub org/user name.
  projectName: 'G-2-yama.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.dev/G-2-yama/G-2-yama.github.io/blob/main/',
          remarkPlugins: [
            remarkBreaks, remarkGfm, remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
          ],
        },
        blog: {
          blogTitle: 'blog',
          blogSidebarTitle: '🦐 日記 🦀',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.dev/G-2-yama/G-2-yama.github.io/blob/main/',
          // Useful options to enforce blogging best practices
          remarkPlugins: [
            remarkBreaks, remarkGfm, remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
          ],
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          remarkPlugins: [
            remarkBreaks, remarkGfm, remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'news',
        routeBasePath: 'news',
        path: './news',
        blogTitle: 'ニュース',
        blogSidebarTitle: '📰 ニュース ',
        blogSidebarCount: 'ALL',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl:
          'https://github.dev/G-2-yama/G-2-yama.github.io/blob/main/',
        // Useful options to enforce blogging best practices
        remarkPlugins: [
          remarkBreaks, remarkGfm, remarkMath,
        ],
        rehypePlugins: [
          rehypeKatex,
        ],
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      }
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["ja"],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: ["/docs"],
        blogRouteBasePath: ["/blog", "/news"],
        highlightSearchTermsOnTargetPage: true,
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social_card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'G^2 Logo',
        src: 'img/logo_black.png',
        srcDark: 'img/logo_white.png',
      },
      items: [
        {to: '/news', label: 'ニュース', position: 'left'},
        {to: '/members', label: 'メンバー', position: 'left'},
        {to: '/blog', label: '日記', position: 'left'},
        {to: '/docs', label: '資料', position: 'left'},
        {type: 'search', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '関連',
          items: [
            {
              label: '旧ホームページ',
              href: 'http://g2yamanashi.web.fc2.com/index.html',
            },
          ]
        },
        {
          title: '販売',
          items: [
            {
              label: 'Booth',
              href: 'https://g2yama.booth.pm/',
            },
          ],
        },
        {
          title: '広報',
          items: [
            {
              label: 'X',
              href: 'https://x.com/g2_yama',
            },
            {
              label: 'YouTube',
              href: 'https://youtube.com/@g_2827?si=D_OfNFhzohP-Wq9M',
            },
            {
              label: 'pixiv',
              href: 'https://www.pixiv.net/users/10944402',
            },
          ],
        },
        {
          title: '開発',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/G-2-yama',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} G^2.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    zoom: {
      selector: '.markdown img',
      config: {
        scrollOffset: 0,
      }
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
