import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { CheckIcon } from '../../../assets/icons';
import { IUser } from '../../../types/user.types';
import { formatSubs } from '../../../utils/formatSubs';
import Button from '../../UI/Button';
import HeadNav from './HeadNav';

interface ChannelHeadProps extends IUser {
}

const ChannelHead: React.FC<PropsWithChildren<ChannelHeadProps>> = ({ avatar, _id, name, isVerified, subscribersCount, viewsCount, videosCount }) => {

   return (
      <header className="bg-gray_light mb-5 p-content pb-0">
         <div className="container_center">
            <div className="flex justify-between items-center">
               <div className="flex gap-3">
                  <div className="basis-[56px] h-[56px] rounded-[50%] overflow-hidden shrink-0">
                     <img src={avatar} alt={name} />
                  </div>
                  <div className="py-1">
                     <div className="flex items-center gap-2">
                        <b className="typo_lg font-medium">
                           {name}
                        </b>
                        {isVerified
                           && <div className="bg-green-600 flex items-center rounded-[50%] justify-center w-[14px] h-[14px]">
                              <CheckIcon className="text-white text-md" />
                           </div>}
                     </div>
                     <div className="g">
                        <p className="text-gray-500 leading-6">
                           {formatSubs(subscribersCount)} subscribers
                        </p>
                     </div>
                  </div>
               </div>
               <div className="g">
                  <Button color='red'>
                     SUBSCRIBE
                  </Button>
               </div>
            </div>
            <HeadNav _id={_id} />
         </div>
      </header>
   )
}

export default ChannelHead;