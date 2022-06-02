import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { VideoApi } from '../../../../API/VideoApi'
import { LikeOutlineIcon, DislikeOutlineIcon, LikeIcon, DislikeIcon } from '../../../../assets/icons'
import { useAuth } from '../../../../context/authCtx'
import { IVideo } from '../../../../types/video.types'

interface VideoReactionsProps {
   video: IVideo
}

const VideoReactions: React.FC<PropsWithChildren<VideoReactionsProps>> = ({ video }) => {
   const [isReacted, setIsReacted] = useState<'like' | 'dislike' | null>(null)
   const [likesCount, setLikesCount] = useState<number>(video.likes)
   const [dislikesCount, setDislikesCount] = useState<number>(video.dislikes)

   const { user } = useAuth()
   const { mutateAsync: mutateLike, isLoading: likeProcessing } = useMutation(async () => {
      if (!user?._id) return;
      return await VideoApi.updateLike(video._id)
   }, {
      onSuccess: () => {
         setIsReacted(prev => {
            if (prev === 'like') {
               setLikesCount(pr => pr - 1)
               return null
            } else {
               setLikesCount(pr => pr + 1)
               return 'like'
            }
         })
      }
   })

   const { mutateAsync: mutateDislike, isLoading: dislikeProcessing } = useMutation(async () => {
      if (!user?._id) return;
      return await VideoApi.updateDislike(video._id)
   }, {
      onSuccess: () => {
         setIsReacted(prev => {
            if (prev === 'dislike') {
               setDislikesCount(pr => pr - 1)
               return null
            } else {
               setDislikesCount(pr => pr + 1)
               return 'dislike'
            }
         })
      }
   })

   useEffect(() => {
      if (!user) return;

      const like = user.likes?.find((l) => {
         return l === video._id
      })
      if (like) return setIsReacted('like')

      const dis = user.dislikes?.find((ds) => {
         return ds === video._id
      })
      if (dis) return setIsReacted('dislike')

   }, [user?.likes, user?.dislikes])

   const like = async () => {
      await mutateLike()
   }

   const dislike = async () => {
      await mutateDislike()
   }

   return (
      <div className="">
         <div className="flex items-center gap-3">
            <button
               className="cursor-pointer flex items-center gap-1"
               onClick={like}
               disabled={likeProcessing}
            >
               {isReacted === 'like'
                  ? <LikeIcon className='text-xl' />
                  : <LikeOutlineIcon className='text-xl' />}
               <span className="">
                  {likesCount}
               </span>
            </button>
            <button
               className="cursor-pointer flex items-center gap-1"
               onClick={dislike}
               disabled={dislikeProcessing}
            >
               {isReacted === 'dislike'
                  ? <DislikeIcon className='text-xl' />
                  : <DislikeOutlineIcon className='text-xl' />}
               <span className="">
                  {dislikesCount}
               </span>
            </button>
         </div>
      </div>
   )
}

export default VideoReactions;