import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import VideoItemRow from '../../VideoItemRow';

interface HeaderListProps {
   videos?: IVideo[]
}

const HeaderList: React.FC<PropsWithChildren<HeaderListProps>> = ({ videos }) => {
   return (
      <div
         className={`shadow-md absolute left-[50%] bottom-0 max-w-[600px] w-full bg-gray_lighter
       translate-y-[100%] -translate-x-[50%] py-2 max-h-[50vh] overflow-auto`}
      >
         {videos && videos?.length > 0
            ? <div className="">
               {videos.map((v) => <VideoItemRow key={v._id} {...v} />)}
            </div>
            : <div className="text-center typo_md text-gray1">
               Not found
            </div>}
      </div>
   )
}

export default HeaderList;