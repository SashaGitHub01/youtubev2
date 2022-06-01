import React, { PropsWithChildren } from 'react'
import { LikeOutlineIcon, DislikeOutlineIcon } from '../../../../assets/icons'
import { IVideo } from '../../../../types/video.types'

interface VideoReactionsProps {
   video: IVideo
}

const VideoReactions: React.FC<PropsWithChildren<VideoReactionsProps>> = ({ video }) => {
   return (
      <div className="">
         <div className="flex items-center gap-3">
            <button className="cursor-pointer flex items-center gap-1">
               <LikeOutlineIcon className='text-xl' />
               <span className="">
                  {video.likes}
               </span>
            </button>
            <button className="cursor-pointer flex items-center gap-1">
               <DislikeOutlineIcon className='text-xl' />
               <span className="">
                  {video.likes}
               </span>
            </button>
         </div>
      </div>
   )
}

export default VideoReactions;