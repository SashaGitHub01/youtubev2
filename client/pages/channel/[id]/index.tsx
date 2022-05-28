import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';
import { UserApi } from '../../../src/API/UserApi';
import { VideoApi } from '../../../src/API/VideoApi';
import { getLayout } from '../../../src/components/Channel/ChannelLayout';
import PopularVideos from '../../../src/components/Channel/PopularVideos';
import { IUser } from '../../../src/types/user.types';
import { IVideo } from '../../../src/types/video.types';
import { NextPageWithLayout } from '../../_app';

interface ChannelProps {
   channel: IUser,
   popVideos: IVideo[]
}

const Channel: NextPageWithLayout<ChannelProps> = ({ channel, popVideos, }) => {
   const { query } = useRouter()
   
   return (
      <div className="container_center px-content">
         <PopularVideos popVideos={popVideos} />
      </div>
   )
}

export default Channel;

Channel.getLayout = getLayout


export const getStaticPaths: GetStaticPaths = async () => {
   try {
      const users = await UserApi.fetchUsers()
      const paths = users.map(u => ({
         params: { id: u._id }
      }))

      return {
         paths: paths,
         fallback: 'blocking'
      }
   } catch (err) {
      return {
         paths: [],
         fallback: false
      }
   }
}

export const getStaticProps: GetStaticProps<any> = async ({ params }: GetStaticPropsContext) => {
   try {
      const id = params?.id
      if (!id) throw Error('error')

      const popVideos = await VideoApi.fetchVideosByUser(id as string, 'views')
      const channel = await UserApi.fetchUser(id as string)

      return {
         props: {
            channel,
            popVideos
         },

         revalidate: 60
      }
   } catch (err) {
      return {
         props: {
            channel: {},
            popVideos: []
         }
      }
   }
}