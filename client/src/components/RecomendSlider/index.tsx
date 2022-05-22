import React, { PropsWithChildren, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IVideo } from '../../types/video.types'
import VideoItem from '../VideoItem'
import { Navigation } from "swiper";
import SwiperCore from 'swiper';
SwiperCore.use([Navigation]);

interface RecomendSliderProps {
   videos: IVideo[],
   next: string,
   prev: string,
   dis: string
}

const RecomendSlider: React.FC<PropsWithChildren<RecomendSliderProps>> = ({ videos, next, prev, dis }) => {
   const itemWidth = 225;
   const [size, setSize] = useState<number>(0)

   return (
      <div className="py-3">
         <Swiper
            modules={[Navigation]}
            navigation={{
               prevEl: '.' + prev,
               nextEl: '.' + next,
               disabledClass: dis
            }}
            onInit={(sw) => {
               if ((sw as any)?.size) {
                  setSize((sw as any)?.size)
               }
            }}
            onAfterInit={(sw) => sw.activeIndex = 0}
            initialSlide={0}
            slidesPerView={size / itemWidth}
            spaceBetween={5}
         >
            {videos.map((v) => (
               <SwiperSlide
                  style={{
                     height: 'auto'
                  }}
                  key={v._id}
               >
                  <VideoItem {...v} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default RecomendSlider;