import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React, { PropsWithChildren } from 'react'
import { VideoApi } from '../../src/API/VideoApi'
import VideoPlayer from '../../src/components/VideoPage/VideoPlayer'
import { IVideo } from '../../src/types/video.types'

interface VideoPageProps {
   video: IVideo
}

const VideoPage: React.FC<PropsWithChildren<VideoPageProps>> = ({ video }) => {
   return (
      <div className="">
         <div className="">
            <VideoPlayer video={video} />
         </div>
      </div>
   )
}

export default VideoPage;

export const getStaticPaths: GetStaticPaths = async () => {
   try {
      const videos = await VideoApi.fetchVideos()
      const paths = videos.map(v => ({
         params: { id: v._id }
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
      if (!id) throw Error('Error')

      const video = await VideoApi.fetchVideo(id as string)

      return {
         props: {
            video
         },

         revalidate: 60
      }
   } catch (err) {
      return {
         props: {
            video: null
         },

         notFound: true
      }
   }
}
