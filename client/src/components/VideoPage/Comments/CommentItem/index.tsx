import React, { PropsWithChildren } from 'react'
import { UseMutateAsyncFunction } from 'react-query';
import { DotsIcon } from '../../../../assets/icons';
import { IComment } from '../../../../types/comment.types';
import { IUser } from '../../../../types/user.types';
import { timeAgo } from '../../../../utils/moment'

interface CommentItemProps extends IComment {
   auth?: IUser | null,
   isOpen: boolean,
   openMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
   setId: React.Dispatch<React.SetStateAction<string | null>>
}

const CommentItem: React.FC<PropsWithChildren<CommentItemProps>> = ({
   user, auth, isOpen, _id, openMenu, text, createdAt, setId
}) => {

   const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      openMenu(e)
      setId(_id)
   }

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
         <div className="px-2 pt-1">
            {!!auth && auth?._id === user._id
               && <button onClick={handleOpen} disabled={isOpen} className='cursor-pointer'>
                  <DotsIcon className='text-xl' />
               </button>}
         </div>
      </div>
   )
}

export default CommentItem;