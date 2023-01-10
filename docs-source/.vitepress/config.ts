import {defineConfig} from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  appearance: false,
  title: 'Vue 3D CSS Card',
  description: 'The most important thing in your web project',
  base: '/VueGameCard/',
  outDir: '../docs',
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      }
    ],
    // Type is `DefaultTheme.Config`
    nav: [
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Configs', link: '/configs' },
      { text: 'Changelog', link: 'https://github.com/...' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Maxim Kosterin'
    }
  },

})
