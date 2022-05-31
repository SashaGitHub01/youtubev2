import React, { PropsWithChildren } from 'react'
import { IUser } from '../../../types/user.types';
import { joinDate } from '../../../utils/moment';
import { formatViewsWithSpace } from '../../../utils/formatViews';


interface AboutProps {
   channel: IUser
}

const About: React.FC<PropsWithChildren<AboutProps>> = ({ channel }) => {
   return (
      <div className="">
         <div className="flex gap-10">
            <div className="flex flex-col gap-5 basis-[70%]">
               {channel?.status
                  && <div className="line border-gray-300 pb-3">
                     <b className="block typo_md font-medium pb-4">
                        Description
                     </b>
                     <p className="typo_main">
                        {channel?.status}
                     </p>
                  </div>}
               {channel.location
                  && <div className="line border-gray-300 pb-3">
                     <b className="block typo_md font-medium pb-3">
                        Other
                     </b>
                     <div className="flex items-center gap-4 font-light text-gray1">
                        <span className="">
                           Location:
                        </span>
                        <span className="">
                           {channel.location}
                        </span>
                     </div>
                  </div>}
            </div>
            <div className="flex flex-col flex-auto">
               <div className="line border-gray-300">
                  <b className="block typo_md font-medium pb-3">
                     Statistics
                  </b>
               </div>
               <div className="line border-gray-300 typo_main leading-8">
                  <span className="">
                     Join date:
                  </span>
                  <span className="pl-2">
                     {joinDate(channel.createdAt)}
                  </span>
               </div>
               <div className="line border-gray-300 typo_main leading-8">
                  {channel.viewsCount
                     && <span className="">
                        {formatViewsWithSpace(channel.viewsCount)} views
                     </span>}
               </div>
            </div>
         </div>
      </div>
   )
}

export default About;