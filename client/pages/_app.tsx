import 'swiper/scss';
import '../styles/globals.scss'
import '../styles/range.scss';
import 'swiper/scss/navigation'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import AuthProvider from '../src/context/authCtx'
import { NextPage } from 'next';
import React from 'react';

export type GetLayoutType<T> = (page: React.ReactElement<T>) => React.ReactNode


export type NextPageWithLayout<T> = NextPage<T> & { getLayout: GetLayoutType<T> }

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout<any>
}

const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0,
      },

      mutations: {
         retry: 0
      }
   },

})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

   const getLayout = Component.getLayout ?? ((page) => page)

   return (
      <QueryClientProvider client={client}>
         <AuthProvider>
            <Layout>
               {getLayout(<Component {...pageProps} />)}
            </Layout>
         </AuthProvider>
      </QueryClientProvider>
   )
}

export default MyApp