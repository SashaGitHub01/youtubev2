import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import React from 'react'
import { UserApi } from '../../../src/API/UserApi';
import { VideoApi } from '../../../src/API/VideoApi';
import ChannelLayout from '../../../src/components/Channel/ChannelLayout';
import { IUser } from '../../../src/types/user.types';
import { IVideo } from '../../../src/types/video.types';
import { NextPageWithLayout } from '../../_app';

interface ChannelProps {
   channel: IUser,
   popVideos: IVideo[]
}

const Channel: NextPageWithLayout<ChannelProps> = ({ channel, popVideos, }) => {

   return (
      <div className="g">
         haaha
      </div>
   )
}

export default Channel;

Channel.getLayout = function (page) {
   return (
      <ChannelLayout channel={page.props.channel}>
         {page}
      </ChannelLayout>
   )
}

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