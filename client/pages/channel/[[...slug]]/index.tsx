import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { UserApi } from '../../../src/API/UserApi';
import { VideoApi } from '../../../src/API/VideoApi';
import About from '../../../src/components/Channel/About';
import ChannelLayout from '../../../src/components/Channel/ChannelLayout';
import Home from '../../../src/components/Channel/Home';
import Videos from '../../../src/components/Channel/Videos';
import { IUser } from '../../../src/types/user.types';
import { IVideo } from '../../../src/types/video.types';

interface ChannelProps {
   channel: IUser,
   popVideos: IVideo[]
}

type TabRoutes = 'home' | 'about' | 'videos'

const Channel: NextPage<ChannelProps> = ({ channel, popVideos, }) => {
   const [active, setActive] = useState<TabRoutes>('home')
   const router = useRouter()

   useEffect(() => {
      if (!router.query.slug || !router.isReady) return;

      const slug = router.query.slug?.slice(1);

      if (slug[0] === 'home' || !slug[0]) {
         return setActive('home')
      } else if (slug[0] === 'about') {
         return setActive('about')
      } else if (slug[0] === 'videos') {
         return setActive('videos')
      }
   }, [router.query, router.isReady])

   return (
      <>
         <Head>
            <title>
               {channel.name}
            </title>
         </Head>
         <ChannelLayout channel={channel}>
            <div className="container_center px-content">
               {active === 'home'
                  ? <Home popVideos={popVideos} />
                  : active === 'about'
                     ? <About channel={channel} />
                     : active === 'videos'
                        ? <Videos id={channel._id} />
                        : null}
            </div>
         </ChannelLayout>
      </>
   )
}

export default Channel;


export const getServerSideProps: GetServerSideProps<any> = async ({ params }: GetServerSidePropsContext) => {
   try {
      const id = params?.slug?.[0]
      if (!id) throw Error('Error')

      const popVideos = (await VideoApi.fetchVideosByUser({ id, sort: 'views', limit: 12 })).data
      const channel = await UserApi.fetchUser(id as string)

      return {
         props: {
            channel,
            popVideos
         },
      }
   } catch (err) {
      return {
         props: {
            channel: {},
            popVideos: []
         },

         notFound: true
      }
   }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//    try {
//       const users = await UserApi.fetchUsers()
//       const paths = users.map(u => ({
//          params: { slug: [u._id] }
//       }))

//       return {
//          paths: paths,
//          fallback: 'blocking'
//       }
//    } catch (err) {
//       return {
//          paths: [],
//          fallback: false
//       }
//    }
// }

// export const getStaticProps: GetStaticProps<any> = async ({ params }: GetStaticPropsContext) => {
//    try {
//       const id = params?.slug?.[0]
//       if (!id) throw Error('SSG Error')

//       const popVideos = (await VideoApi.fetchVideosByUser({ id, sort: 'views', limit: 12 })).data
//       const channel = await UserApi.fetchUser(id as string)

//       return {
//          props: {
//             channel,
//             popVideos
//          },

//          revalidate: 30
//       }
//    } catch (err) {
//       return {
//          props: {
//             channel: {},
//             popVideos: []
//          },

//          notFound: true
//       }
//    }
// }