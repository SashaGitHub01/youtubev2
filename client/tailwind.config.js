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
         },

         fontSize: {
            primary: ['0.875rem', { lineHeight: '1.125rem' }],
            sm: ["0.75rem", { lineHeight: '1rem' }],
            tn: ["0.625rem", { lineHeight: '1rem' }],
            md: ['1rem', { lineHeight: '1.25rem', }],
            lg: ['1.125rem', { lineHeight: '1.325rem' }],
            xl: ['1.3125rem', { lineHeight: '1.5rem' }],
            icon: '1.75rem'
         }
      },
   },
   plugins: [
      require('@tailwindcss/line-clamp'),
   ],

   preflight: false
}
