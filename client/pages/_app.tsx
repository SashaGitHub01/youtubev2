import 'swiper/scss';
import '../styles/globals.scss'
import 'swiper/scss/navigation'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import AuthProvider from '../src/context/authCtx'

const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 2,
      },

      mutations: {
         retry: 2
      }
   },

})

function MyApp({ Component, pageProps }: AppProps) {

   return (
      <QueryClientProvider client={client}>
         <AuthProvider>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </AuthProvider>
      </QueryClientProvider>
   )
}

export default MyApp