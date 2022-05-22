import React, { MutableRefObject, PropsWithChildren } from 'react'
import { CloseIcon } from '../../../assets/icons';
import ReactModal from 'react-modal'

ReactModal.setAppElement('#__next')

interface ModalProps {
   onClose: () => void,
   title?: string,
   refs: MutableRefObject<any>,
   isOpen: boolean
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, title, onClose, refs, isOpen }) => {

   return (
      <ReactModal
         isOpen={isOpen}
         onRequestClose={onClose}
         className={`max-w-[440px] z-40 w-full rounded-sm relative bg-white animate-scale`}
         overlayClassName={`z-[100] bg-[#00000089] fixed left-0 top-0 w-screen h-screen flex items-center
      justify-center`}
      >
         <button className=' absolute right-2 top-2' onClick={onClose}>
            <CloseIcon className='text-[26px]' />
         </button>
         {title
            && <div className="px-3 py-5 border-b border-solid border-black">
               <span className='font-medium text-lg'>
                  {title}
               </span>
            </div>}
         <div className="pt-7 pb-5 px-5">
            {children}
         </div>
      </ReactModal>
   )
}

export default Modal;