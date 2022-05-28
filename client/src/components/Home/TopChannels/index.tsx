import React, { PropsWithChildren } from 'react'
import { IUser } from '../../../types/user.types';
import ChannelsSlider from './ChannelsSlider';
import s from './TopChannels.module.scss'

interface TopChannelsProps {
   topChannels: IUser[]
}

const TopChannels: React.FC<PropsWithChildren<TopChannelsProps>> = ({ topChannels }) => {
   return (
      <section className=''>
         <div className="line  flex justify-between align-center">
            <span className="typo_xl font-medium">
               Popular channels on YouTube
            </span>
            <div className="flex flex-center gap-4 px-2">
               <div className={`${s.btn_prev}`}
               />
               <div className={`${s.btn_next}`}
               />
            </div>
         </div>
         <ChannelsSlider
            channels={topChannels}
            next={s.btn_next}
            prev={s.btn_prev}
            dis={s.btn_disabled}
         />
      </section>
   )
}

export default TopChannels;   