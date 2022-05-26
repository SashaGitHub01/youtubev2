import React, { MutableRefObject, PropsWithChildren, useEffect } from 'react'
import { CloseIcon } from '../../../assets/icons';
import ReactModal from 'react-modal'
import cn from 'classnames';

ReactModal.setAppElement('#__next')

interface ModalProps {
   onClose: () => void,
   title?: string,
   isOpen: boolean,
   width?: 'sm' | 'md' | 'lg',
   height?: 'full' | 'default'
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, title, height, onClose, isOpen, width }) => {

   useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
   }, [isOpen])

   return (
      <ReactModal
         isOpen={isOpen}
         onRequestClose={onClose}
         className={`max-w-[440px] flex flex-col mx-4 z-40 w-full rounded-sm relative bg-white animate-scale ${cn({
            'max-w-[440px]': width === 'sm' || !width,
            'max-w-[640px]': width === 'md',
            'max-w-[840px]': width === 'lg',
            'max-h-[85%] h-full': height === 'full'
         })}`}
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
         <div className="pt-7 pb-4 px-5 flex-auto">
            {children}
         </div>
      </ReactModal>
   )
}

export default Modal;