import React, { PropsWithChildren } from 'react'
import { ImageIcon } from '../../../../assets/icons';

interface UploadImageProps {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadImage: React.FC<PropsWithChildren<UploadImageProps>> = ({ onChange }) => {
   return (
      <div className="flex">
         <label className="btn_second gap-2" htmlFor='videoimg'>
            <ImageIcon className='icon' />
            <span>Add thumbnail</span>
         </label>
         <input
            onChange={onChange}
            type="file"
            className='hidden'
            id='videoimg'
            accept='image/*'
         />
      </div>
   )
}

export default UploadImage;