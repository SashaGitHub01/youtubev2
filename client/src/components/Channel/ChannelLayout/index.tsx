import React, { PropsWithChildren, ReactNode } from 'react'
import { GetLayoutType } from '../../../../pages/_app';
import { IUser } from '../../../types/user.types';
import ChannelHead from '../ChannelHead';

interface ChannelLayoutProps {
   channel: IUser
}

const ChannelLayout: React.FC<PropsWithChildren<ChannelLayoutProps>> = ({ channel, children }) => {
   return (
      <section className="">
         <ChannelHead {...channel} />
         <div className="p-content container_center">
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