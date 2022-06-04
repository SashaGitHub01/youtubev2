import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import PopularVideos from './PopularVideos';

interface HomeProps {
   popVideos: IVideo[]
}

const Home: React.FC<PropsWithChildren<HomeProps>> = ({ popVideos }) => {
   return (
      <div className="">
         {popVideos.length > 0
            ? <PopularVideos popVideos={popVideos} />
            : <div className='text-center py-3 text-lg text-gray-600'>
               <p>This channel doesn't have videos</p>
            </div>}
      </div>
   )
}

export default Home;