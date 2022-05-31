import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import PopularVideos from './PopularVideos';

interface HomeProps {
   popVideos: IVideo[]
}

const Home: React.FC<PropsWithChildren<HomeProps>> = ({ popVideos }) => {
   return (
      <div className="">
         <PopularVideos popVideos={popVideos} />
      </div>
   )
}

export default Home;