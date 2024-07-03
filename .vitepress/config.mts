import { defineConfig } from 'vitepress'
import { sidebar } from './theme/components/sidebar'

const url = 'https://vitepress.dev/guide/what-is-vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Inspot docs",
  description: "Inspot dokmentations sida",
  head: [['link', { rel: 'icon', href: '../../public/images/logotype/inspot_favicon.svg' }]],
  themeConfig: {
    logo: {
      light: '/public/images/logotype/inspot_dark.png',
      dark: '/public/images/logotype/inspot_white.png'
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
