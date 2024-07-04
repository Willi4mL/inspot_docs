export const sidebar = [
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
                    {text: 'Meny 1', link: '/'},
                    {text: 'Meny 2', link: '/'},
                    {text: 'Meny 3', link: '/'},
                    ]},
                { text: 'Karusell',  
                  collapsed: true,
                  items: [
                    {text: 'Karusell 1', link: '/'},
                    {text: 'Karusell 2', link: '/'},
                    {text: 'Karusell 3', link: '/'},
                    ]},
                { text: 'Banner',  
                  collapsed: true,
                  items: [
                    {text: 'Banner 1', link: '/'},
                    {text: 'Banner 2', link: '/'},
                    {text: 'Banner 3', link: '/'},
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
                      {text: 'Wordpress 1', link: '/'},
                      ]},
                  { text: 'Optimering',  
                    collapsed: true,
                    items: [
                      {text: 'Optimering 1', link: '/'},
                      {text: 'Optimering 2', link: '/'},
                      {text: 'Optimering 3', link: '/'},
                      ]},
              ]
            },
            {
              text: 'Element', 
              collapsed: true,
                items: [
                  {text: 'Knappar', link: '/docs-pages/docs-elements/buttons'},
                  {text: 'Element 1', link: '/'},
                  {text: 'Element 2', link: '/'},
              ]
            },
            {
              text: 'Styleguide', 
              collapsed: true,
                items: [
                  {text: 'Styleguide 1', link: '/'},
                  {text: 'Styleguide 2', link: '/'},
                  {text: 'Styleguide 3', link: '/'},
              ]
            },
            {
              text: 'Animations', 
              collapsed: true,
                items: [
                  {text: 'Animation 1', link: '/'},
                  {text: 'Animation 2', link: '/'},
                  {text: 'Animation 3', link: '/'},
              ]
            }]
          },
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
        { text: 'Om inspot dokumenation', link: '/docs-landing' }
        ]
      }
]