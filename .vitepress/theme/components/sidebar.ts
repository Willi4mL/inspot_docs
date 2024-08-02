export const sidebar = [
  {
    text: 'Kategorier',
    items: [
      {
        text: 'ACF blocks',
        collapsed: true,
        items: [
          { text: 'Test', link: '/' },
        ]
      },
      {
        text: 'Funktioner',
        collapsed: true,
        items: [
          {
            text: 'Wordpress',
            collapsed: true,
            items: [
              { text: 'Tillåt SVG', link: '/docs-pages/docs-functions/enable-svg' },
              { text: 'Brödsmulor', link: '/docs-pages/docs-functions/breadcrumbs' },
              { text: 'Wordpress 1', link: '/' },
            ]
          },
          {
            text: 'PHP',
            collapsed: true,
            items: [
              { text: 'Fixa teckenkodning', link: '/docs-pages/docs-functions/teckenkodning-för-svenska-tecken' },
            ]
          },
          {
            text: 'Javascript',
            collapsed: true,
            items: [
              { text: 'Cookie', link: '/docs-pages/docs-functions/cookie-js' },
            ]
          },
        ]
      },
      {
        text: 'Element',
        collapsed: true,
        items: [
          { text: 'Knappar', link: '/docs-pages/docs-elements/buttons' },
          { text: 'Popup', link: '/docs-pages/docs-elements/popup' },
          { text: 'Element 2', link: '/' },
        ]
      },
      {
        text: 'Verktyg',
        collapsed: true,
        items: [
          { text: 'WCAG', link: '/docs-pages/docs-tools/colors' },
          { text: 'Komprimera bildfil', link: '/docs-pages/docs-tools/compress-image' },
        ]
      },
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Runtime API Examples', link: '/api-examples' },
      { text: 'Om inspot dokumenation', link: '/docs-landing' }
    ]
  }
]