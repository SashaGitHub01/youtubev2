import Router, { useRouter } from 'next/router';
import React, { PropsWithChildren, useState } from 'react'
import { useQuery, } from 'react-query';
import { VideoApi } from '../../../../API/VideoApi';
import { IVideo } from '../../../../types/video.types';
import Loader from '../../../Loader';
import Modal from '../../../UI/Modal';
import UploadForm from './UploadForm';
import VideoCol from './VideoCol';

interface UploadModalProps {
   onClose: () => void,
   isOpen: boolean
}

const UploadModal: React.FC<PropsWithChildren<UploadModalProps>> = ({ onClose, isOpen }) => {
   const { query } = useRouter()
   const [video, setVideo] = useState<IVideo>()

   return (
      <Modal
         onClose={onClose}
         isOpen={true}
         title={video?.name || 'Video upload'}
         width='lg'
         height='full'
      >
         <div className="relative h-full flex-col flex">
            <div className="flex-auto flex gap-5">
               <UploadForm
                  video={video}
                  setVideo={setVideo}
               />
               {!!video?._id
                  && <VideoCol video={video} />}
            </div>
         </div>
      </Modal>
   )
}

export default UploadModal;