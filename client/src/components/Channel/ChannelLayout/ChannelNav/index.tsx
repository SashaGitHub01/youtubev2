import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

interface ChannelNavProps {
   _id: string
}

interface ActiveLinkProps {
   href: string,
}

const ActiveLink: React.FC<PropsWithChildren<ActiveLinkProps>> = ({ children, href }) => {
   const { asPath } = useRouter();
   const slug = asPath.split('/').slice(0, 4).join('/')
   const isRoot = href.split('/').includes('home') && slug === href.split('/').slice(0, 3).join('/')

   return (
      <>
         <Link href={href}>
            <a className={`uppercase leading-10 typo_md h-full block px-4 overflow-hidden`}>
               {children}
            </a>
         </Link>
         {(slug === href || isRoot)
            && <div className="w-full absolute left-0 bottom-0 bg-red1 h-[2px] animate-line" />}
      </>
   );
};

const ChannelNav: React.FC<PropsWithChildren<ChannelNavProps>> = ({ _id }) => {

   return (
      <nav className="sticky left-0 top-header bg-gray_lighter px-content -translate-y-[2px] z-30 mb-6">
         <ul className="flex items-center  container_center">
            <li className="relative hover:bg-gray_light cursor-pointer">
               <ActiveLink href={`/channel/${_id}/home`}>
                  Home
               </ActiveLink>
            </li>
            <li className="cursor-pointer hover:bg-gray_light relative">
               <ActiveLink href={`/channel/${_id}/videos`}>
                  Videos
               </ActiveLink>
            </li>
            <li className="cursor-pointer hover:bg-gray_light relative">
               <ActiveLink href={`/channel/${_id}/about`}>
                  About
               </ActiveLink>
            </li>
         </ul>
      </nav>
   )
}

export default ChannelNav;