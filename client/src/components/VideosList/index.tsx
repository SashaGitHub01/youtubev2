import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../types/video.types';
import VideoItem from '../VideoItem';

interface VideosListProps {
   videos: IVideo[]
}

const VideosList: React.FC<PropsWithChildren<VideosListProps>> = ({ videos }) => {
   return (
      <div className="py-4 grid grid-cols-auto gap-2">
         {videos.map((video) => <VideoItem key={video._id} {...video} />)}
      </div>
   )
}

export default VideosList;   