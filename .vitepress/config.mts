import { defineConfig } from 'vitepress'

const url = 'https://vitepress.dev/guide/what-is-vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dokoumenation",
  description: "Dockmentations side",
  themeConfig: {
    logo: '/public/images/logotype/inspot_dark.png',
    nav: [
      { text: 'Hem', link: '/' },
      { text: 'Om Inspot dokumentation', link: '/docs-landing' },
      { text: 'Vitepress guide', link: 'https://vitepress.dev/guide/what-is-vitepress', target: '_blank' }
    ],


    sidebar: [
      {
        text: 'Kategorier',
        items: [
          {
            text: 'inspot docs',
            collapsed: true,
            items: [{
              text: 'ACF blocks', 
              collapsed: true,
              items: [
                { text: 'Meny',  
                  collapsed: true,
                  items: [
                    {text: 'Sidomeny', link: '/inspot-docs/blocks/block'},
                    {text: 'Hamburgermeny', link: '/inspot-docs/blocks/block'},
                    {text: 'Popup dialog', link: '/inspot-docs/blocks/block'},
                    ]},
                { text: 'Karusell',  
                  collapsed: true,
                  items: [
                    {text: 'Bilder', link: '/inspot-docs/blocks/block'},
                    {text: 'Texter', link: '/inspot-docs/blocks/block'},
                    {text: 'Infinnity loop', link: '/inspot-docs/blocks/block'},
                    {text: 'Klick', link: '/inspot-docs/blocks/block'},
                    {text: 'Skroll', link: '/inspot-docs/blocks/block'},
                    ]},
                { text: 'Banner',  
                  collapsed: true,
                  items: [
                    {text: 'Call to action', link: '/inspot-docs/blocks/block'},
                    {text: 'Profil', link: '/inspot-docs/blocks/block'},
                    {text: 'Reklam', link: '/inspot-docs/blocks/block'},
                    {text: 'Skroll', link: '/inspot-docs/blocks/block'},
                    ]},
              ]
            },
            {
              text: 'Funktioner', 
              collapsed: true,
                items: [
                  { text: 'Wordpress',  
                    collapsed: true,
                    items: [
                      {text: 'Tillåt SVG', link: '/docs-pages/docs-functions/enable-svg'},
                      {text: 'Brödsmulor', link: '/docs-pages/docs-functions/breadcrumbs'},
                      {text: 'Hot reload', link: '/inspot-docs/blocks/block'},
                      ]},
                  { text: 'Optimering',  
                    collapsed: true,
                    items: [
                      {text: 'Bilder kvalitét', link: '/inspot-docs/blocks/block'},
                      {text: 'Caching', link: '/inspot-docs/blocks/block'},
                      ]},
              ]
            },
            {
              text: 'Styleguide', 
              collapsed: true,
                items: [
                  {text: 'Knappar', link: '/docs-pages/docs-styleguide/buttons'},
                  {text: 'Skuggor', link: '/inspot-docs/blocks/block'},
                  {text: 'Kort', link: '/inspot-docs/blocks/block'},
              ]
            },
            {
              text: 'Animations', 
              collapsed: true,
                items: [
                  {text: 'Studs', link: '/inspot-docs/blocks/block'},
                  {text: 'Slide', link: '/inspot-docs/blocks/block'},
                  {text: 'Fade', link: '/inspot-docs/blocks/block'},
              ]
            }]
          },
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
        { text: 'Om inspot dokumenation', link: '/docs-landing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
