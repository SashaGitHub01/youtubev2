import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { CheckIcon, DotsIcon } from '../../assets/icons'
import { IUser } from '../../types/user.types'
import { formatSubs } from '../../utils/formatSubs'

interface ChannelItemProps extends IUser { }

const ChannelItem: React.FC<PropsWithChildren<ChannelItemProps>> = ({ name, isVerified, subscribersCount, _id, avatar }) => {
   return (
      <div className="rounded-md border border-solid border-gray-200 p-3 max-w-[250px] w-full gap-2 flex overflow-hidden">
         <Link href={`/channel/${_id}`}>
            <div className="rounded-[50%] w-[50px] h-[50px] overflow-hidden shrink-0 shadow-sm cursor-pointer">
               <img src={avatar} alt={name} />
            </div>
         </Link>
         <div className="pt-1 flex-auto overflow-hidden">
            <div className="flex items-center gap-2">
               <Link href={`/channel/${_id}`}>
                  <h3 className="font-medium block cursor-pointer truncate">
                     {name}
                  </h3>
               </Link>
               {isVerified
                  && <div className="bg-green-600 flex items-center rounded-[50%] justify-center w-[14px] h-[14px]">
                     <CheckIcon className="text-white text-md" />
                  </div>}
            </div>
            <div className="text-gray1 font-light typo_sm leading-5">
               <span>
                  {formatSubs(subscribersCount)}
               </span>
               <span className='pl-1'>
                  subscribers
               </span>
            </div>
         </div>
         <div className="shrink-0 basis-7 flex items-center justify-center">
            <DotsIcon className='text-icon text-gray1 cursor-pointer' />
         </div>
      </div>
   )
}

export default ChannelItem   