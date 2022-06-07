import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import React, { PropsWithChildren, useEffect } from 'react'
import { useMutation } from 'react-query'
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
   const { mutate } = useMutation(() => {
      return VideoApi.updateViews(video._id)
   })

   useEffect(() => {
      if (window === undefined) return;
      mutate()
   }, [])

   return (
      <>
         <Head>
            <title>
               {video.name}
            </title>
         </Head>
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
      </>
   )
}

export default VideoPage;

export const getServerSideProps: GetServerSideProps<any> = async ({ params }: GetServerSidePropsContext) => {
   try {
      const id = params?.videoId
      if (!id) throw Error('Error')

      const video = await VideoApi.fetchVideo(id as string)

      return {
         props: {
            video
         },
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


// export const getStaticPaths: GetStaticPaths = async () => {
//    try {
//       const videos = await VideoApi.fetchVideos({})
//       const paths = videos.data.map(v => ({
//          params: { videoId: v._id }
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
//       const id = params?.videoId
//       if (!id) throw Error('Error')

//       const video = await VideoApi.fetchVideo(id as string)

//       return {
//          props: {
//             video
//          },

//          revalidate: 60
//       }
//    } catch (err) {
//       return {
//          props: {
//             video: null
//          },

//          notFound: true
//       }
//    }
// }
