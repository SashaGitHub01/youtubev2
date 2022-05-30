import React, { PropsWithChildren } from 'react'
import { GetLayoutType } from '../../../../pages/_app';
import { IUser } from '../../../types/user.types';
import ChannelHead from './ChannelHead';
import ChannelNav from './ChannelNav';

interface ChannelLayoutProps {
   channel: IUser
}

const ChannelLayout: React.FC<PropsWithChildren<ChannelLayoutProps>> = ({ channel, children }) => {
   return (
      <section className="bg-gray_light flex-auto">
         <ChannelHead {...channel} />
         <div className="">
            <ChannelNav _id={channel._id} />
            {children}
         </div>
      </section>
   )
}

export const getLayout: GetLayoutType<ChannelLayoutProps> = function (page) {

   return (
      <ChannelLayout channel={page.props.channel}>
         {page}
      </ChannelLayout>
   )
}

export default ChannelLayout;