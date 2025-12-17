import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FUTEIKEI Tools',
  description: 'VRChat向けUnity拡張ツール - FUTEIKEI',
  lang: 'ja-JP',

  srcExclude: [
    '_jekyll_backup/**',
    'Pictures/**',
    'node_modules/**',
  ],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'ホーム', link: '/' },
      {
        text: 'ツール',
        items: [
          { text: 'BoneSelector', link: '/boneselector/' },
          { text: 'PBReplacer', link: '/pbreplacer/' },
          { text: 'FXCreator', link: '/fxcreator/' },
          { text: 'LipSyncSetter', link: '/lipsyncsetter/' },
        ]
      },
    ],

    sidebar: {
      '/boneselector/': [
        {
          text: 'BoneSelector',
          items: [
            { text: '概要', link: '/boneselector/' },
            { text: '導入方法', link: '/boneselector/getting-started' },
            { text: '使い方', link: '/boneselector/usage' },
            { text: '詳細設定', link: '/boneselector/details' },
            { text: '更新履歴', link: '/boneselector/changelog' },
          ]
        }
      ],
      '/pbreplacer/': [
        {
          text: 'PBReplacer',
          items: [
            { text: '概要', link: '/pbreplacer/' },
            { text: '導入方法', link: '/pbreplacer/getting-started' },
            { text: '使い方', link: '/pbreplacer/usage' },
            { text: '詳細設定', link: '/pbreplacer/details' },
            { text: '更新履歴', link: '/pbreplacer/changelog' },
          ]
        }
      ],
      '/fxcreator/': [
        {
          text: 'FXCreator',
          items: [
            { text: '概要', link: '/fxcreator/' },
            { text: '導入方法', link: '/fxcreator/getting-started' },
            { text: '更新履歴', link: '/fxcreator/changelog' },
          ]
        },
        {
          text: 'ツール',
          items: [
            { text: 'EyeJigglingGenerator', link: '/fxcreator/eye-jiggling' },
            { text: 'VRCExpressionParameters', link: '/fxcreator/expression-params' },
            { text: 'ClipGenerator', link: '/fxcreator/clip-generator' },
          ]
        }
      ],
      '/lipsyncsetter/': [
        {
          text: 'LipSyncSetter',
          items: [
            { text: '概要', link: '/lipsyncsetter/' },
            { text: '導入方法', link: '/lipsyncsetter/getting-started' },
            { text: '使い方', link: '/lipsyncsetter/usage' },
            { text: '詳細設定', link: '/lipsyncsetter/details' },
            { text: '更新履歴', link: '/lipsyncsetter/changelog' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/c-colloid' },
    ],

    footer: {
      message: 'VRChat向けUnity拡張ツール',
      copyright: '© 2024 c-colloid / FUTEIKEI',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '検索',
            buttonAriaLabel: '検索',
          },
          modal: {
            noResultsText: '結果が見つかりませんでした',
            resetButtonTitle: 'クリア',
            footer: {
              selectText: '選択',
              navigateText: '移動',
              closeText: '閉じる',
            },
          },
        },
      },
    },

    outline: {
      label: '目次',
    },

    docFooter: {
      prev: '前のページ',
      next: '次のページ',
    },

    lastUpdated: {
      text: '最終更新',
    },

    editLink: {
      pattern: 'https://github.com/c-colloid/c-colloid.github.io/edit/main/:path',
      text: 'このページを編集',
    },
  },
})
