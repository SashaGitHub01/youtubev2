import React, { PropsWithChildren, useState } from 'react'
import { IUser } from '../../../../../types/user.types';
import Button from '../../../../UI/Button';
import Modal from '../../../../UI/Modal';
import EditForm from '../../EditForm';

interface ChannelButtonsProps {
   auth: IUser | null,
   channel: IUser
}

const ChannelButtons: React.FC<PropsWithChildren<ChannelButtonsProps>> = ({ auth, channel }) => {
   const [isOpen, setIsOpen] = useState(false)

   const onOpen = () => {
      setIsOpen(true)
   }

   const onClose = () => {
      setIsOpen(false)
   }

   return (
      <>
         <div className="flex">
            {auth?._id === channel._id
               ? <Button color='blue' onClick={onOpen}>
                  <span className='whitespace-nowrap'>
                     EDIT PROFILE
                  </span>
               </Button>
               : <Button color='red'>
                  SUBSCRIBE
               </Button>}
         </div>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Channel editor'
            width='lg'
         >
            <EditForm channel={channel} onClose={onClose} />
         </Modal>
      </>
   )
}

export default ChannelButtons;