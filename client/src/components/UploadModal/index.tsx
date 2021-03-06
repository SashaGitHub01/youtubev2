import { useRouter } from 'next/router';
import React, { PropsWithChildren, useState } from 'react'
import { useQuery } from 'react-query';
import { VideoApi } from '../../API/VideoApi';
import { IVideo } from '../../types/video.types';
import Loader from '../Loader';
import Modal from '../UI/Modal';
import UploadForm from './UploadForm';
import VideoCol from './VideoCol';
import s from './UploadModal.module.scss'

interface UploadModalProps {
   onClose: () => void,
   isOpen: boolean,
}

const UploadModal: React.FC<PropsWithChildren<UploadModalProps>> = ({ onClose, isOpen }) => {
   const { query } = useRouter()
   const [video, setVideo] = useState<IVideo | undefined>()
   const [preview, setPreview] = useState(video?.preview || '')
   const { isFetching } = useQuery(['video secure', query?.id], async () => {
      return await VideoApi.fetchSecureVideo(query?.id as string)
   }, {
      enabled: !!query?.id && isOpen && (video?._id !== query.id || !video?._id),
      initialData: video,
      cacheTime: 0,

      onSuccess: (v) => {
         if (!v) return;
         setVideo(v)
         setPreview(v.preview)
      }
   })

   const changePreview = (url: string) => {
      setPreview(url)
   }

   const handleClose = async () => {
      setVideo(undefined)
      setPreview('')
      onClose()
   }

   return (
      <Modal
         onClose={handleClose}
         isOpen={isOpen}
         title={video?.name || 'Video upload'}
         width='lg'
         height='full'
      >
         <div className={`h-full flex-col flex ${s.scrollbar}`}>
            <div className="flex-auto flex gap-5 h-full overflow-auto mb-[6.5rem]">
               {isFetching
                  ? <Loader />
                  : <>
                     <UploadForm
                        setPreview={changePreview}
                        video={video}
                        setVideo={setVideo}
                        onClose={onClose}
                     />
                     {!!video?._id
                        && <VideoCol
                           video={video}
                           preview={preview}
                        />}
                  </>
               }
            </div>
         </div>
      </Modal>
   )
}

export default UploadModal;