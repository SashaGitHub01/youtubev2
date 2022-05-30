import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../types/video.types';
import VideoSkelet from '../Skeletons/VideoSkelet';
import VideoItem from '../VideoItem';

interface VideosListProps {
   videos: IVideo[],
   isFetching?: boolean
}

const VideosList: React.FC<PropsWithChildren<VideosListProps>> = ({ videos, isFetching }) => {
   return (
      <div className="py-4 grid grid-cols-auto gap-2">
         {isFetching
            ? new Array(12).fill('str', 0, 12).map((s, i) => <VideoSkelet key={i} />)
            : videos
               ? videos.map((video) => <VideoItem key={video._id} {...video} />)
               : null}
      </div>
   )
}

export default VideosList;   