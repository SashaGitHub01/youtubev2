import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { CheckIcon } from '../../assets/icons';
import { IVideo } from '../../types/video.types';
import { formatViews } from '../../utils/formatViews';
import { timeAgo } from '../../utils/moment';

interface VideoItemRowProps extends IVideo {
   simple?: boolean
}

const VideoItemRow: React.FC<PropsWithChildren<VideoItemRowProps>> = ({ _id, name, views, user, preview, createdAt, simple = false }) => {
   return (
      <Link href={`/video/${_id}`}>
         <div className={`relative cursor-pointer rounded-sm hover:bg-gray-100 py-2 
          border-0 active:shadow-video overflow-hidden flex gap-4`}
         >
            <div className="max-w-[120px]">
               <img src={preview} alt={name} />
            </div>
            <div className="pt-3 flex gap-2 justify-between">
               <div className="overflow-hidden" title={name}>
                  <Link href={`/channel/${user._id}`}>
                     <h3 className="line-clamp-2 typo_main font-medium">
                        {name}
                     </h3>
                  </Link>
                  <div className=" typo_sm font-light text-gray1 pt-1 flex items-center gap-1">
                     <div className="flex items-center gap-[2px]">
                        <span>{user.name}</span>
                        <CheckIcon />
                     </div>
                     <div className="w-[3px] h-[3px] bg-gray-500 rounded-[50%]" />
                     <div className="flex items-center gap-1 overflow-hidden">
                        <span className="">
                           {formatViews(views)} views
                        </span>
                        <div className="w-[3px] h-[3px] bg-gray-500 rounded-[50%]" />
                        <span className="">
                           {timeAgo(createdAt)}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default VideoItemRow;