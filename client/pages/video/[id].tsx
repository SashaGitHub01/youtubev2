import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React, { PropsWithChildren } from 'react'
import { VideoApi } from '../../src/API/VideoApi'
import Loader from '../../src/components/Loader'
import Comments from '../../src/components/VideoPage/Comments'
import VideoInfo from '../../src/components/VideoPage/VideoInfo'
import VideoPlayer from '../../src/components/VideoPage/VideoPlayer'
import { IVideo } from '../../src/types/video.types'

interface VideoPageProps {
   video: IVideo
}

const VideoPage: React.FC<PropsWithChildren<VideoPageProps>> = ({ video }) => {

   return (
      <div className="">
         {video._id
            ? <>
               <div className="">
                  <VideoPlayer video={video} />
               </div>
               <div className="px-content pb-5">
                  <VideoInfo video={video} channel={video.user} />
                  <Comments video={video} />
               </div>
            </>
            : <Loader />}
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
