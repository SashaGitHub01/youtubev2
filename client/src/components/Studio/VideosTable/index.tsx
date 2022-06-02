import { useRouter } from 'next/router'
import React, { PropsWithChildren, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { VideoApi } from '../../../API/VideoApi'
import { IUser } from '../../../types/user.types'
import { IVideo } from '../../../types/video.types'
import Modal from '../../UI/Modal'
import UploadModal from '../../UploadModal'
import TableItem from './TableItem'
import s from './VideosTable.module.scss'

interface VideosTableProps {
   user: IUser | null
}

const VideosTable: React.FC<PropsWithChildren<VideosTableProps>> = ({ user }) => {
   const { push, pathname, query } = useRouter()
   const [isOpen, setIsOpen] = useState(false)
   const { data, isLoading, refetch } = useQuery(['studio videos', user?._id], async () => {
      return await VideoApi.fetchStudioVideos()
   }, {
      enabled: !!user?._id
   })

   const { mutateAsync, isLoading: isRemoving } = useMutation(async (id: string) => {
      return await VideoApi.deleteVideo(id)
   }, {
      onSuccess: () => refetch()
   })

   const onClose = () => {
      const { id, ...rest } = query
      push({
         pathname, query: { ...rest }
      })
      setIsOpen(false)
      refetch()
   }

   const onOpen = (id: string) => {
      push({
         pathname, query: { ...query, id }
      })
      setIsOpen(true)
   }

   return (
      <div className="bg-white container_center border-y border-solid border-gray1">
         <div className={`${s.table}`}>
            <div className={`${s.table_head} ${s.table_head_vid}`}>
               <span>Video</span>
            </div>
            <div className={s.table_right}>
               <div className={s.table_head}>
                  <span>Access params</span>
               </div>
               <div className={s.table_head}>
                  <span>Date</span>
               </div>
               <div className={s.table_head}>
                  <span>Views</span>
               </div>
            </div>
         </div>
         {Array.isArray(data)
            && data.map((v) => <TableItem
               {...v}
               key={v._id}
               deleteFunc={mutateAsync}
               isRemoving={isRemoving}
               onOpen={onOpen}
            />)}
         <UploadModal
            isOpen={isOpen}
            onClose={onClose}
         >
            <div className="g">

            </div>
         </UploadModal>
      </div>
   )
}

export default VideosTable