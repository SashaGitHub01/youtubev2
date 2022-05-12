import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'

const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
         retry: 2
      },

      mutations: {
         retry: 2
      }
   }
})

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <QueryClientProvider client={client}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </QueryClientProvider>
   )
}

export default MyApp
