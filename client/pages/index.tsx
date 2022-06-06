import type { NextPage, GetStaticProps } from 'next'
import { VideoApi } from '../src/API/VideoApi';
import VideosList from '../src/components/VideosList';
import { IVideo } from '../src/types/video.types'
import { IUser } from '../src/types/user.types'
import { UserApi } from '../src/API/UserApi';
import TopChannels from '../src/components/Home/TopChannels';
import RecommendVideos from '../src/components/Home/RecommendVideos';
import Head from 'next/head';
import VideosInfinite from '../src/components/VideosInfinite';

interface HomeProps {
   popVideos: IVideo[],
   latestVideos: IVideo[],
   topChannels: IUser[]
}

const Home: NextPage<HomeProps> = ({ popVideos, latestVideos, topChannels }) => {

   return (
      <>
         <Head>
            <title>YouTube 2022</title>
         </Head>
         <div className="p-content">
            <RecommendVideos popVideos={popVideos} />
            <div className="">
               <div className="line">
                  <span className="typo_xl font-medium">
                     Latest videos
                  </span>
               </div>
               <VideosInfinite videos={latestVideos} />
            </div>
            <div className="">
               <TopChannels topChannels={topChannels} />
            </div>
         </div>
      </>
   )
}

export default Home

export const getStaticProps: GetStaticProps = async (ctx) => {
   let popVideos: IVideo[] = []
   let latestVideos: IVideo[] = []
   let topChannels: IUser[] = []

   try {
      popVideos = await VideoApi.fetchPopVideos()
      popVideos.sort(() => Math.random() * 10 - 5)

      latestVideos = (await VideoApi.fetchVideos({ limit: 12 })).data

      topChannels = await UserApi.fetchPopUsers()
   } catch (err) {
      console.log(err);
   }

   return {
      revalidate: 30,
      props: {
         popVideos,
         topChannels,
         latestVideos
      }
   }
}