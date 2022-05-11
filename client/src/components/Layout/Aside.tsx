import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import { ChartIcon, HomeIcon, SubsIcon } from '../../assets/icons'
import { useRouter } from 'next/router'
import cn from 'classnames';

interface AsideProps { }

const Aside: React.FC<PropsWithChildren<AsideProps>> = ({ }) => {
   const { asPath } = useRouter()

   return (
      <aside className="fixed z-40 left-0 top-0 bg-gray_lighter min-h-screen w-aside pt-header flex flex-col">
         <div className="flex-auto">
            <nav className="pt-4">
               <ul className="pb-4 relative">
                  <li className="hover:bg-gray_hover py-2 px-3 cursor-pointer">
                     <Link href='/'>
                        <a
                           className={`flex items-center gap-2 text-gray1 ${cn({
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
                  <li className="hover:bg-gray_hover py-2 px-3 cursor-pointer">
                     <Link href='/trands'>
                        <a
                           className={`flex items-center gap-2 text-gray1 ${cn({
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
                  <li className="hover:bg-gray_hover py-2 px-3 cursor-pointer">
                     <Link href='/subscriptions'>
                        <a
                           className={`flex items-center gap-2 text-gray1 ${cn({
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
            </nav>
         </div>
         <footer className='typo_sm p-2 text-gray-500 text-center'>
            Developer - SashaGitHub01, 2022
         </footer>
      </aside>
   )
}

export default Aside;
