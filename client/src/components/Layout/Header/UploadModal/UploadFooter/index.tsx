import cn from 'classnames';
import React, { PropsWithChildren } from 'react'
import { UploadIcon } from '../../../../../assets/icons';
import Button from '../../../../UI/Button';
import s from './UploadFooter.module.scss'

interface UploadFooterProps {
   disabled: boolean,
   progress: number,
   haveVideo?: boolean
}

const UploadFooter: React.FC<PropsWithChildren<UploadFooterProps>> = ({ disabled, progress, haveVideo }) => {
   return (
      <div className="flex items-center justify-between pt-7 w-full absolute bottom-0 left-0">
         <div className="flex items-center gap-3">
            <UploadIcon className={`${s.icon} ${cn({
               [s.icon_completed]: haveVideo
            })}`} />
            <div className="">
               {!haveVideo
                  && <span className="pr-2 font-medium">
                     {progress}%
                  </span>}
               <span className='font-light'>
                  {haveVideo ? 'Upload is completed' : 'Video is loading...'}
               </span>
            </div>
         </div>
         <Button type='submit' disabled={disabled}>
            SAVE
         </Button>
      </div>
   )
}

export default UploadFooter;