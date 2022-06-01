import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import logo from '../../../assets/logo.svg'
import Image from 'next/image'
import HeaderOptions from './HeaderOptions';
import HeaderInput from './HeaderInput';

interface HeaderProps {

}

const Header: React.FC<PropsWithChildren<HeaderProps>> = ({ }) => {
   return (
      <header className="fixed left-0 top-0 bg-[rgba(255,255,255,1)] z-[777] w-full h-header flex items-center pl-3 pr-6 border-b border-solid border-opacity-5 border-b-black">
         <div className="flex items-center justify-between w-full gap-6">
            <div className="">
               <Link href={'/'}>
                  <div className="max-w-[120px] cursor-pointer block">
                     <Image src={logo} alt="youtube logo" />
                  </div>
               </Link>
            </div>
            <HeaderInput />
            <HeaderOptions />
         </div>
      </header>
   )
}

export default Header;  