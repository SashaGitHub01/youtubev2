/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      SERVER: process.env.SERVER
   },

   async rewrites() {
      return [
         {
            source: '/uploads/:path*',
            destination: `${process.env.SERVER}/:path*`
         }
      ]
   }
}

module.exports = nextConfig
