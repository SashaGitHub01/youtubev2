import React, { PropsWithChildren } from 'react'
import { UploadIcon } from '../../../../assets/icons';

interface UploadFIleProps {
   onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadFIle: React.FC<PropsWithChildren<UploadFIleProps>> = ({ onSelect }) => {
   return (
      <div className='absolute top-[50%] w-full -translate-y-1/2  flex flex-col items-center justify-center gap-5'>
         <label className="cursor-pointer" htmlFor='videoInput'>
            <UploadIcon className='text-[4rem] text-gray1 hover:text-gray-400' />
         </label>
         <input
            onChange={onSelect}
            id='videoInput'
            type="file"
            accept='video/mp4'
            className="hidden"
         />
         <label htmlFor="videoInput" className='btn_second'>
            Select a file
         </label>
      </div>
   )
}

export default UploadFIle; 