const plugin = require('tailwindcss/plugin')

module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         spacing: {
            header: '70px',
            aside: '190px',
         },

         padding: {
            'content': '0.75rem',
         },

         container: {
            center: true,
         },

         colors: {
            red1: '#f53131',
            gray1: '#909090',
            gray_light: '#eceff1',
            gray_lighter: 'rgb(250,250,250)',
            gray_hover: '#eceff1',
            blue1: '#0371d1',
            black: 'rgb(3, 3, 3)',
            skelet_2: 'rgb(218, 218, 218)',
            skelet_1: 'rgb(245, 245, 245)',
         },

         fontSize: {
            primary: ['0.875rem', { lineHeight: '1.125rem' }],
            sm: ["0.688rem", { lineHeight: '1rem' }],
            tn: ["0.625rem", { lineHeight: '1rem' }],
            md: ['1rem', { lineHeight: '1.25rem', }],
            lg: ['1.125rem', { lineHeight: '1.325rem' }],
            xl: ['1.3125rem', { lineHeight: '1.5rem' }],
            icon: '1.75rem'
         },

         boxShadow: {
            video: '0 0 0 4px rgb(243, 244, 246)',
            shine: '0 0 20px 30px #f1f1f1a6'
         },

         gridTemplateColumns: {
            auto: 'repeat(auto-fill, minmax(225px, 1fr))'
         },

         keyframes: {
            skeleton: {
               '0%': {
                  'background-color': 'rgb(218, 218, 218)'
               },

               '100%': {
                  'background-color': 'rgb(245, 245, 245)'
               }
            },

            line: {
               '0%': {
                  'transform': 'scaleX(0)',
                  'opacity': '0.3'
               },

               '100%': {
                  'transform': 'scaleX(1)',
                  'opacity': '1'
               }
            },

            scale: {
               '0%': {
                  'width': '0',
                  'opacity': '0.3'
               },

               '100%': {
                  'width': '100%',
                  'opacity': '1'
               }
            },

            fade: {
               '0%': {
                  'opacity': '0.2'
               },

               '100%': {
                  'opacity': '1'
               }
            },

            shine: {
               '0%': {
                  'transform': 'translateX(-45px)'
               },

               '50%': {
                  'transform': 'translateX(150px)'
               },

               '100%': {
                  'transform': 'translateX(300px)'
               }
            },
         },

         animation: {
            skeleton: 'skeleton 0.9s linear infinite alternate',
            scale: 'scale 0.3s ease',
            fade: 'fade 0.3s ease-in',
            line: 'line 0.3s ease',
            shine: 'shine 0.8s linear infinite',
         }
      },
   },

   plugins: [
      require('@tailwindcss/line-clamp'),

      plugin(function ({ addUtilities }) {
         const newUtilities = {
            '.btn-next': {
               'border-right': '4px solid #0371d1',
               'border-top': '4px solid #0371d1',
               'height': '16px',
               'width': '16px',
               'transform': 'rotate(45deg)',
               '&:hover': {
                  'border-color': 'rgb(37 99 235)'
               },
               'cursor': 'pointer',
            },

            '.btn-prev': {
               'border-right': '4px solid #0371d1',
               'border-top': '4px solid #0371d1',
               'height': '16px',
               'width': '16px',
               'transform': 'rotate(-135deg)',
               '&:hover': {
                  'border-color': 'rgb(37 99 235)'
               },
               'cursor': 'pointer',
            },

            '.btn-dis': {
               'opacity': '0.4',
               'pointer-events': 'none'
            }
         }

         addUtilities(newUtilities)
      })
   ],

   preflight: false
}
