import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

interface VideoColProps { }

const VideoCol: React.FC<PropsWithChildren<VideoColProps>> = ({ }) => {
   return (
      <div className="basis-[225px] shrink">
         <div className="bg-gray_lighter">
            <div className="bg-gray_light h-[115px]">
               <img src="" alt="" />
            </div>
            <div className="py-3 px-2 flex flex-col gap-2">
               <div className="">
                  <div className="typo_sm">
                     Video link:
                  </div>
                  <Link href={`/video/${0}`}>
                     <div className='text-blue1  truncate cursor-pointer'>
                        https://youtube
                     </div>
                  </Link>
               </div>
               <div className="">
                  <div className="typo_sm">
                     Video name:
                  </div>
                  <Link href={`/video/${0}`}>
                     <div className='font-medium truncate cursor-pointer'>
                        Video 125164
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VideoCol;