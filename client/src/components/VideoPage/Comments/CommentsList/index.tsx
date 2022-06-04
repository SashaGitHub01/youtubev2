import React, { PropsWithChildren, useRef, useState } from 'react'
import { useMutation } from 'react-query';
import { CommentApi } from '../../../../API/CommentApi';
import { DeleteIcon } from '../../../../assets/icons';
import { IComment } from '../../../../types/comment.types';
import { IUser } from '../../../../types/user.types';
import Menu from '../../../UI/Menu';
import CommentItem from '../CommentItem';
import { useQueryClient } from 'react-query'

interface CommentsListProps {
   comments: IComment[],
   user: IUser | null,
   refetch: () => Promise<void>
}

const CommentsList: React.FC<PropsWithChildren<CommentsListProps>> = ({ comments, user, refetch }) => {
   const { mutateAsync, isLoading } = useMutation(async (id: string) => {
      return await CommentApi.delete(id)
   }, {
      onSuccess: async () => {
         await refetch()
      }
   })
   const [isOpen, setIsOpen] = useState(false)
   const [anchor, setAnchor] = useState<any>(null)
   const [anchorId, setAnchorId] = useState<string | null>(null)

   const handleClose = () => {
      setIsOpen(false)
      setAnchor(null)
      setAnchorId(null)
   }

   const hanldeOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setAnchor(e.target)
      setIsOpen(true)
   }

   const handleDelete = async () => {
      if (!anchorId) return;
      try {
         await mutateAsync(anchorId)
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <>
         <div className="flex flex-col gap-5">
            {comments.map(com => <CommentItem
               {...com}
               isOpen={isOpen}
               openMenu={hanldeOpen}
               key={com._id}
               auth={user}
               setId={setAnchorId}
            />)}
         </div>
         {<Menu
            isOpen={isOpen}
            anchor={anchor}
            placement='bottom-end'
            onClose={handleClose}
         >
            <div className="px-2">
               <button
                  className="cursor-pointer flex items-center gap-2"
                  onClick={handleDelete}
                  disabled={isLoading}
               >
                  <DeleteIcon className='text-lg text-red-500' />
                  <span>Delete</span>
               </button>
            </div>
         </Menu>}
      </>
   )
}

export default CommentsList;