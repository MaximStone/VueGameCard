import {defineConfig} from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Vue 3D CSS Card',
  description: 'The most important thing in your web project',
  base: '/',
  outDir: '../docs',
  themeConfig: {
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
