import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import VideosSlider from '../../VideosSlider';
import s from './PopularVideos.module.scss'

interface PopularVideosProps {
   popVideos: IVideo[]
}

const PopularVideos: React.FC<PropsWithChildren<PopularVideosProps>> = ({ popVideos }) => {
   return (
      <section className="">
         <div className="line flex justify-between align-center">
            <span className="typo_xl font-medium">
               Popular videos
            </span>
            <div className="flex flex-center gap-4 px-2">
               <div className={`${s.btn_prev}`} />
               <div className={`${s.btn_next}`} />
            </div>
         </div>
         <VideosSlider
            videos={popVideos}
            next={s.btn_next}
            prev={s.btn_prev}
            dis={s.btn_disabled}
         />
      </section>
   )
}

export default PopularVideos;