import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../types/video.types';
import Image from 'next/image'
import { formatViews } from '../../utils/formatViews';
import { timeAgo } from '../../utils/moment';
import Link from 'next/link';

interface VideoItemProps extends IVideo {

}

const VideoItem: React.FC<PropsWithChildren<VideoItemProps>> = ({ _id, name, views, user, preview, createdAt }) => {
   return (
      <Link href={`/video/${_id}`}>
         <div className={`max-w-[225px] relative block h-full cursor-pointer rounded-sm active:bg-gray-100 py-2 
          border-0 active:shadow-video overflow-hidden`}
         >
            <div className="min-w-[225px] h-full bg-gray-200 max-h-[120px]">
               <img src={preview} alt={name} />
            </div>
            <div className="pt-3 flex gap-2">
               <Link href={`/channel/${user._id}`}>
                  <a className="h-7 w-7 rounded-[50%] bg-skelet_1 shrink-0 overflow-hidden" >
                     <img src={user.avatar} alt={user.name} className='' />
                  </a>
               </Link>
               <div className="overflow-hidden" title={name}>
                  <h3 className="line-clamp-2 typo_main font-medium">
                     {name}
                  </h3>
                  <div className=" typo_sm font-light text-gray1 pt-1">
                     <div className="">
                        {user.name}
                     </div>
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

export default VideoItem;   