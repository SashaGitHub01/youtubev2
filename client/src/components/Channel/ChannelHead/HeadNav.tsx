import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react'

interface HeadNavProps {
   _id: string
}

const HeadNav: React.FC<PropsWithChildren<HeadNavProps>> = ({ _id }) => {
   const { asPath, pathname } = useRouter()

   return (
      <nav className="pt-6">
         <ul className="flex items-center">
            <li className="px-4 relative hover:bg-gray_lighter cursor-pointer">
               <Link href={{ pathname: asPath + "/videos", }}>
                  <a className='uppercase leading-10 typo_md'>
                     Home
                  </a>
               </Link>
               <div className="w-full absolute left-0 bottom-0 bg-red1 h-[2px]" />
            </li>
            <li className="px-4 cursor-pointer hover:bg-gray_lighter ">
               <Link href={`/channel/${_id}`}>
                  <a className='uppercase leading-10 typo_md'>
                     Videos
                  </a>
               </Link>
            </li>
            <li className="px-4 cursor-pointer hover:bg-gray_lighter ">
               <Link href={`/channel/${_id}`}>
                  <a className='uppercase leading-10 typo_md'>
                     About
                  </a>
               </Link>
            </li>
         </ul>
      </nav>
   )
}

export default HeadNav;