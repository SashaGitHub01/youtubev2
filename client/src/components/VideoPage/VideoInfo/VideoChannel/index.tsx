import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { CheckIcon } from '../../../../assets/icons';
import { IUser } from '../../../../types/user.types';
import { formatSubs } from '../../../../utils/formatSubs';
import Button from '../../../UI/Button';

interface VideoChannelProps {
   channel: IUser
}

const VideoChannel: React.FC<PropsWithChildren<VideoChannelProps>> = ({ channel }) => {

   return (
      <div className="py-3 flex items-center justify-between line">
         <div className="">
            <div className="flex gap-2">
               <Link href={`/channel/${channel._id}`}>
                  <div className="rounded-[50%] w-[50px] h-[50px] overflow-hidden shrink-0 shadow-md cursor-pointer">
                     <img src={channel.avatar} alt={channel.name} />
                  </div>
               </Link>
               <div className="pt-1 flex-auto overflow-hidden">
                  <div className="flex items-center gap-2">
                     <Link href={`/channel/${channel._id}`}>
                        <b className="font-medium block cursor-pointer">
                           {channel.name}
                        </b>
                     </Link>
                     {channel.isVerified
                        && <div className="bg-green-600 flex items-center rounded-[50%] justify-center w-[14px] h-[14px]">
                           <CheckIcon className="text-white text-md" />
                        </div>}
                  </div>
                  <div className="text-gray1 font-light typo_sm leading-5">
                     <span>
                        {formatSubs(channel.subscribersCount)}
                     </span>
                     <span className='pl-1'>
                        subscribers
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <div className="">
            <Button>
               SUBSCRIBE
            </Button>
         </div>
      </div>
   )
}

export default VideoChannel;