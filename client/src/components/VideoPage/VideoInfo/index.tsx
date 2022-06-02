import React, { PropsWithChildren } from 'react'
import { IUser } from '../../../types/user.types';
import { IVideo } from '../../../types/video.types';
import { formatViewsWithSpace } from '../../../utils/formatViews';
import { joinDate } from '../../../utils/moment'
import VideoChannel from './VideoChannel';
import VideoReactions from './VideoReactions';

interface VideoInfoProps {
   video: IVideo,
   channel: IUser
}

const VideoInfo: React.FC<PropsWithChildren<VideoInfoProps>> = ({ channel, video }) => {
   return (
      <div className="py-3">
         <div className="">
            <div className="">
               <div className="typo_sm text-gray1 font-light">
                  <p>
                     {joinDate(video.createdAt)}
                  </p>
               </div>
               <h2 className="typo_xl font-md">
                  {video.name}
               </h2>
            </div>
            <div className="pt-4 pb-2 line flex items-center justify-between">
               <div className="typo_main text-gray1">
                  {formatViewsWithSpace(video.views)} views
               </div>
               <VideoReactions video={video} />
            </div>
            <VideoChannel channel={channel} />
            <div className="py-3 line">
               <b className="font-medium block typo_md pb-3">
                  Description
               </b>
               <pre className='typo_main leading-5'>
                  {video.description}
               </pre>
            </div>
         </div>
      </div>
   )
}

export default VideoInfo;