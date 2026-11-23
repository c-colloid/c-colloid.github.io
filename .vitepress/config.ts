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
    logo: 'logo.png',

    nav: [
      { text: 'ホーム', link: '/'},
      
      { text: 'BoneSelector', link: '/boneselector/', activeMatch: '/boneselector/'},
      { text: 'PBReplacer', link: '/pbreplacer/', activeMatch: '/pbreplacer/'},
      { text: 'FXCreator', link: '/fxcreator/', activeMatch: '/fxcreator/' },
      { text: 'LipSyncSetter', link: '/lipsyncsetter/', activeMatch: '/lipsyncsetter/' },
      { text: 'NDMFDeform', link: '/ndmfdeform/', activeMatch: '/ndmfdeform/' },
      { text: 'UITK Font Fix', link: '/uitk-font-fix/', activeMatch: '/uitk-font-fix/' },
      { text: 'Agent Panel', link: '/agentpanel/', activeMatch: '/agentpanel/' },
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
            { text: 'PBRemap', link: '/pbreplacer/pbremap' },
            { text: '詳細設定', link: '/pbreplacer/details' },
            { text: '困ったとき', link: '/pbreplacer/troubleshooting' },
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
      '/ndmfdeform/': [
        {
          text: 'NDMFDeform',
          items: [
            { text: '概要', link: '/ndmfdeform/' },
            { text: '導入方法', link: '/ndmfdeform/getting-started' },
            { text: '使い方', link: '/ndmfdeform/usage' },
            { text: '詳細', link: '/ndmfdeform/details' },
            { text: '更新履歴', link: '/ndmfdeform/changelog' },
          ]
        }
      ],
      '/uitk-font-fix/': [
        {
          text: 'UITK Font Fix',
          items: [
            { text: '概要', link: '/uitk-font-fix/' },
            { text: '導入方法', link: '/uitk-font-fix/getting-started' },
            { text: '使い方', link: '/uitk-font-fix/usage' },
            { text: '詳細', link: '/uitk-font-fix/details' },
            { text: '更新履歴', link: '/uitk-font-fix/changelog' },
          ]
        }
      ],
      '/agentpanel/': [
        {
          text: 'Agent Panel for Unity',
          items: [
            { text: '概要', link: '/agentpanel/' },
            { text: '導入方法', link: '/agentpanel/getting-started' },
            { text: '使い方', link: '/agentpanel/usage' },
            { text: '詳細設定', link: '/agentpanel/details' },
            { text: 'Pro機能', link: '/agentpanel/pro' },
            { text: '更新履歴', link: '/agentpanel/changelog' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/c-colloid' },
    ],

    footer: {
      message: 'VRChat向けUnity拡張ツール',
      copyright: '© 2024-2026 c-colloid / FUTEIKEI',
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
