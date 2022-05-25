import React, { PropsWithChildren } from 'react'
import { IVideo } from '../../../types/video.types';
import RecomendSlider from '../RecomendSlider';
import s from './RecommendVideos.module.scss'

interface RecommendVideosProps {
   popVideos: IVideo[]
}

const RecommendVideos: React.FC<PropsWithChildren<RecommendVideosProps>> = ({ popVideos }) => {
   return (
      <section className="">
         <div className="line flex justify-between align-center">
            <span className="typo_xl font-medium">
               Popular channels on YouTube
            </span>
            <div className="flex flex-center gap-4 px-2">
               <div className={`${s.btn_prev}`} />
               <div className={`${s.btn_next}`} />
            </div>
         </div>
         <RecomendSlider
            videos={popVideos}
            next={s.btn_next}
            prev={s.btn_prev}
            dis={s.btn_disabled}
         />
      </section>
   )
}

export default RecommendVideos;   