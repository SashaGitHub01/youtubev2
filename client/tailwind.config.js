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
            video: '0 0 0 4px rgb(243, 244, 246)'
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

            scale: {
               '0%': {
                  'transform': 'scale(0)',
                  'opacity': '0.3'
               },

               '100%': {
                  'transform': 'scale(1)',
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
         },

         animation: {
            skeleton: 'skeleton 0.9s linear infinite alternate',
            scale: 'scale 0.3s ease',
            fade: 'fade 0.3s ease-in'
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
