import React, { PropsWithChildren } from 'react'
import { ImageIcon } from '../../../../../assets/icons';

interface UploadAvatarProps {
   avatar: string,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
   disabled: boolean
}

const UploadAvatar: React.FC<PropsWithChildren<UploadAvatarProps>> = ({ avatar, onChange, disabled }) => {
   return (
      <div className="flex flex-col items-center flex-auto">
         <div className="rounded-[50%] shadow-md border-solid border border-gray-200 w-[78px] h-[78px] overflow-hidden">
            <img src={avatar} alt="user avatar" />
         </div>
         <div className="py-3">
            <label className='btn_second whitespace-pre'>
               <input
                  disabled={disabled}
                  onChange={onChange}
                  name='avatar'
                  type={'file'}
                  accept='image/*'
                  className='opacity-0 absolute translate-x-[-10000px] translate-y-[-10000px]'
               />
               <ImageIcon />
               <span>
                  Select image
               </span>
            </label>
         </div>
      </div>
   )
}

export default UploadAvatar;