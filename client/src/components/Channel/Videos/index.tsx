import React, { PropsWithChildren } from 'react'
import { useQuery } from 'react-query';
import { VideoApi } from '../../../API/VideoApi';
import VideosList from '../../VideosList';
import ChannelVideos from './ChannelVideos';

interface VideosProps {
   id: string
}

const Videos: React.FC<PropsWithChildren<VideosProps>> = ({ id }) => {

   return (
      <section className="">
         <div className="line flex justify-between align-center">
            <span className="typo_xl font-medium">
               Videos
            </span>
         </div>
         {<ChannelVideos id={id} />}
      </section>
   )
}

export default Videos;