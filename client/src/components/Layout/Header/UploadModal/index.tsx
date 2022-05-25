import Router, { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react'
import Modal from '../../../UI/Modal';
import UploadForm from './UploadForm';
import VideoCol from './VideoCol';

interface UploadModalProps {
   onClose: () => void,
   isOpen: boolean
}

const UploadModal: React.FC<PropsWithChildren<UploadModalProps>> = ({ onClose, isOpen }) => {
   const router = useRouter()
   console.log(router.query);
   return (
      <Modal
         onClose={onClose}
         isOpen={true}
         title='Video upload'
         width='lg'
         height='full'
      >
         <div className="relative h-full flex-col flex">
            <div className="flex-auto flex gap-5">
               <UploadForm />
               {!!1 && <VideoCol />}
            </div>
         </div>
      </Modal>
   )
}

export default UploadModal;