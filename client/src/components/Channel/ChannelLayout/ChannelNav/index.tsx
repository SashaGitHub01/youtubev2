import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

interface ChannelNavProps {
   _id: string
}

const ChannelNav: React.FC<PropsWithChildren<ChannelNavProps>> = ({ _id }) => {

   return (
      <nav className="sticky left-0 top-header bg-gray_lighter px-content -translate-y-[2px] z-30 mb-6">
         <ul className="flex items-center  container_center">
            <li className="px-4 relative hover:bg-gray_light cursor-pointer">
               <Link href={`/channel/${_id}/home`}>
                  <a className='uppercase leading-10 typo_md'>
                     Home
                  </a>
               </Link>
               <div className="w-full absolute left-0 bottom-0 bg-red1 h-[2px]" />
            </li>
            <li className="px-4 cursor-pointer hover:bg-gray_light ">
               <Link href={`/channel/${_id}/videos`}>
                  <a className='uppercase leading-10 typo_md'>
                     Videos
                  </a>
               </Link>
            </li>
            <li className="px-4 cursor-pointer hover:bg-gray_light ">
               <Link href={`/channel/${_id}/about`}>
                  <a className='uppercase leading-10 typo_md'>
                     About
                  </a>
               </Link>
            </li>
         </ul>
      </nav>
   )
}

export default ChannelNav;