import React, { PropsWithChildren } from 'react'
import { useQuery } from 'react-query';
import { VideoApi } from '../../../API/VideoApi';
import VideosList from '../../VideosList';

interface VideosProps {
   id: string
}

const Videos: React.FC<PropsWithChildren<VideosProps>> = ({ id }) => {
   const { data, isFetching, isLoading } = useQuery(
      ['user videos', id],
      async () => await VideoApi.fetchVideosByUser(id, 'date', 20)
   )

   return (
      <section className="">
         <div className="line flex justify-between align-center">
            <span className="typo_xl font-medium">
               Videos
            </span>
         </div>
         {<VideosList videos={data} isFetching={isFetching} />}
      </section>
   )
}

export default Videos;