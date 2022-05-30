import Head from 'next/head';
import React, { PropsWithChildren } from 'react'

interface TrandsProps { }

const Trands: React.FC<PropsWithChildren<TrandsProps>> = ({ }) => {
   return (
      <>
         <Head>
            <title>YouTube 2022</title>
         </Head>
         <div>
            trands
         </div>
      </>
   )
}

export default Trands;