import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import VideosTable from '../../src/components/Studio/VideosTable'
import { useAuth } from '../../src/context/authCtx'

interface StudioProps {
   refetch: any
}

const Studio: React.FC<PropsWithChildren<StudioProps>> = ({ }) => {
   const { user, isAuthorizing } = useAuth()
   const { query, push, pathname } = useRouter()

   useEffect(() => {
      if (!!user?._id && user._id !== query?.userId) {
         push({
            pathname, query: { userId: user._id }
         })
      }

      if (!user && !isAuthorizing) {
         push('/')
      }
   }, [query, user?._id])

   return (
      <>
         <Head>
            <title>
               YouTube Studio
            </title>
         </Head>
         <div className="flex-auto">
            <div className="">
               <div className="p-content pb-5">
                  <b className='font-medium text-xl'>
                     Your content
                  </b>
               </div>
               <VideosTable user={user} />
            </div>
         </div>
      </>
   )
}

export default Studio;