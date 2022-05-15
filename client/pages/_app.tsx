import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import AuthProvider from '../src/context/authCtx'

const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 2
      },

      mutations: {
         retry: 2
      }
   }
})

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthProvider>
         <QueryClientProvider client={client}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </QueryClientProvider>
      </AuthProvider>
   )
}

export default MyApp
