import React, { PropsWithChildren } from 'react'
import { DotsIcon } from '../../../../assets/icons';
import { IComment } from '../../../../types/comment.types';
import { timeAgo } from '../../../../utils/moment'

interface CommentItemProps extends IComment {

}

const CommentItem: React.FC<PropsWithChildren<CommentItemProps>> = ({ user, _id, text, createdAt }) => {

   return (
      <div className="flex gap-3">
         <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden shrink-0">
            <img src={user.avatar} alt={user.name} />
         </div>
         <div className="flex-auto">
            <div className="flex items-center gap-2">
               <b className="typo_sm font-bold">
                  {user.name}
               </b>
               <span className="typo_sm font-light text-gray1">
                  {timeAgo(createdAt, true)}
               </span>
            </div>
            <div className="">
               <pre className="typo_main leading-5">
                  {text}
               </pre>
            </div>
         </div>
         <div className="">
            <DotsIcon className='text-xl cursor-pointer' />
         </div>
      </div>
   )
}

export default CommentItem;