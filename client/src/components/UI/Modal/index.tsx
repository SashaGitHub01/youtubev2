import React, { MutableRefObject, PropsWithChildren } from 'react'
import { CloseIcon } from '../../../assets/icons';


interface ModalProps {
   onClose: () => void,
   title?: string,
   refs: MutableRefObject<any>
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, title, onClose, refs }) => {
   return (
      <div className={`z-[100] bg-[#000000e8] fixed left-0 top-0 w-screen h-screen flex items-center 
      justify-center`}
      >
         <div
            className={`max-w-[440px] z-40 w-full rounded-sm relative bg-white animate-scale`}
            ref={refs}
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
         </div>
      </div>
   )
}

export default Modal;