import React, { PropsWithChildren } from 'react'
import { IUser } from '../../../types/user.types';
import ChannelItem from '../../ChannelItem';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';

interface ChannelsSliderProps {
   channels: IUser[],
   next: string,
   prev: string,
   dis: string
}

const ChannelsSlider: React.FC<PropsWithChildren<ChannelsSliderProps>> = ({ channels, prev, next, dis }) => {
   return (
      <div className="py-4">
         <Swiper
            modules={[Navigation]}
            navigation={{
               prevEl: '.' + prev,
               nextEl: '.' + next,
               disabledClass: dis
            }}
            spaceBetween={10}
            breakpoints={{
               640: {
                  slidesPerView: 2,
               },
               788: {
                  slidesPerView: 3,
               },
               1024: {
                  slidesPerView: 3,
               },
               1280: {
                  slidesPerView: 4,
               }
            }}
         >
            {channels.map((ch) => (
               <SwiperSlide key={ch._id}>
                  <ChannelItem {...ch} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default ChannelsSlider;