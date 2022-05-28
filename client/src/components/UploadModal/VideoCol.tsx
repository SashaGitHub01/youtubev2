import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../types/video.types';

interface VideoColProps {
   video: IVideo,
   preview: string
}

const VideoCol: React.FC<PropsWithChildren<VideoColProps>> = ({ video, preview }) => {
   return (
      <div className="max-w-[225px] shrink w-full overflow-clip">
         <div className="bg-gray_lighter">
            <div className="bg-gray_light h-[115px]">
               <img src={preview} alt="" />
            </div>
            <div className="py-3 px-2 flex flex-col gap-2">
               <div className="">
                  <div className="typo_sm">
                     Video link:
                  </div>
                  <Link href={`/video/${video._id}`}>
                     <div className='text-blue1  cursor-pointer truncate'>
                        {process.env.SERVER}/video/{video._id}
                     </div>
                  </Link>
               </div>
               <div className="">
                  <div className="typo_sm">
                     Video name:
                  </div>
                  <div className='font-medium truncate'>
                     {video.name}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VideoCol;