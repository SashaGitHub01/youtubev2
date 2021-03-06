import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { ChartIcon, HomeIcon, StudioIcon, SubsIcon, UserIcon } from '../../../assets/icons'
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/authCtx';

interface NavListProps { }

const NavList: React.FC<PropsWithChildren<NavListProps>> = ({ }) => {
   const { user } = useAuth()
   const { asPath, pathname } = useRouter()

   return (
      <nav className="pt-4">
         <ul className="pb-4 relative">
            <li className="hover:bg-gray_hover cursor-pointer">
               <Link href='/'>
                  <a
                     className={`flex items-center py-2 px-3 h-full gap-2 text-gray1 ${cn({
                        'text-red1': asPath === '/'
                     })}`}
                  >
                     <HomeIcon className='text-icon' />
                     <span className='text-md'>
                        Home
                     </span>
                  </a>
               </Link>
            </li>
            <li className="hover:bg-gray_hover cursor-pointer">
               <Link href='/trands'>
                  <a
                     className={`flex items-center py-2 px-3  gap-2 text-gray1 ${cn({
                        'text-red1': asPath === '/trands'
                     })}`}
                  >
                     <ChartIcon className='text-icon' />
                     <span className='text-md'>
                        Trands
                     </span>
                  </a>
               </Link>
            </li>
            <li className="hover:bg-gray_hover  cursor-pointer">
               <Link href='/subscriptions'>
                  <a
                     className={`flex items-center py-2 px-3 gap-2 text-gray1 ${cn({
                        'text-red1': asPath === '/subscriptions'
                     })}`}
                  >
                     <SubsIcon className='text-icon' />
                     <span className='text-md'>
                        Subscriptions
                     </span>
                  </a>
               </Link>
            </li>
            <div className="h-[1px] bg-gray-300 w-[86%] absolute bottom-0 left-[50%] -translate-x-1/2" />
         </ul>
         {user?._id
            && <ul className="pt-2">
               <li className="hover:bg-gray_hover  cursor-pointer">
                  <Link href={`/channel/${user._id}`}>
                     <a
                        className={`flex items-center py-2 px-3 gap-2 text-gray1`}
                     >
                        <UserIcon className='text-icon' />
                        <span className='text-md'>
                           My Channel
                        </span>
                     </a>
                  </Link>
               </li>
               <li className="hover:bg-gray_hover  cursor-pointer">
                  <Link href={`/studio/${user._id}`}>
                     <a
                        className={`flex items-center py-2 px-3 gap-2 text-gray1 ${cn({
                           'text-red1': pathname === '/studio/[userId]'
                        })}`}
                     >
                        <StudioIcon className='text-icon' />
                        <span className='text-md'>
                           My Studio
                        </span>
                     </a>
                  </Link>
               </li>
            </ul>}
      </nav>
   )
}

export default NavList;