import { defineConfig } from 'vitepress'
import { sidebar } from './theme/components/sidebar'

const logoLight = '/images/logotype/inspot_white.png'
const logoDark = '/images/logotype/inspot_dark.png'
const favicon = '/images/logotype/inspot_favicon.ico'

const url = 'https://vitepress.dev/guide/what-is-vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dokomentation",
  description: "Inspot dokmentations sida",
  base: '/inspot_docs/',
  head: [ 
    ['link', { rel: 'icon', href: favicon, type: 'image/x-icon' }],
    ['link', { rel: 'icon', href: '/images/logotype/inspot_favicon.svg', type: 'image/png', sizes: '32x32' }],
  ],
  themeConfig: {
    logo: {
      light: logoDark,
      dark: logoLight
    },
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.title)
            return md.render(`# ${env.frontmatter.title}`) + html
          return html
        },
      },
    },
    nav: [
      { text: 'Hem', link: '/' },
      { text: 'Om Inspot dokumentation', link: '/docs-landing' },
      { text: 'Vitepress guide', link: 'https://vitepress.dev/guide/what-is-vitepress', target: '_blank' },
    ],

    sidebar,
  
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
