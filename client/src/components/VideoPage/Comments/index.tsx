import React, { PropsWithChildren, useState } from 'react'
import { useQuery } from 'react-query';
import { CommentApi } from '../../../API/CommentApi';
import { useAuth } from '../../../context/authCtx';
import { IVideo } from '../../../types/video.types';
import Loader from '../../Loader';
import CommentItem from './CommentItem';
import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

interface CommentsProps {
   video: IVideo
}

const Comments: React.FC<PropsWithChildren<CommentsProps>> = ({ video }) => {
   const { user } = useAuth()
   const [commentsCount, setCommentsCount] = useState<number>(video.commentsCount || 0)
   const { data, isLoading, refetch } = useQuery(['comments', video._id], async () => {
      return await CommentApi.fetchByVideo(video._id)
   })

   const myRefetch = async () => {
      setCommentsCount(prev => prev + 1)
      await refetch()
   }

   const myRefetchDel = async () => {
      setCommentsCount(prev => prev - 1)
      await refetch()
   }

   return (
      <div className="">
         <div className="">
            <div className="py-3">
               <p className="font-medium typo_md">
                  {commentsCount} Comments
               </p>
            </div>
            <CommentsForm id={video._id} refetch={myRefetchDel} />
         </div>
         {isLoading
            ? <Loader />
            : data && data?.length > 0
            && <CommentsList
               comments={data}
               user={user}
               refetch={myRefetch}
            />}
      </div>
   )
}

export default Comments;