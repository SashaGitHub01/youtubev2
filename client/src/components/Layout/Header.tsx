import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import Button from '../UI/Button';

interface HeaderProps {

}

const Header: React.FC<PropsWithChildren<HeaderProps>> = ({ }) => {
   return (
      <header className="fixed left-0 top-0 bg-white opacity-95 z-50 w-full h-header flex items-center px-3 border-b border-solid border-opacity-5 border-b-black">
         <div className="flex items-center justify-between w-full">
            <div className="">
               <Link href={'/'}>
                  <div className="max-w-[120px] cursor-pointer block">
                     <Image src={logo} alt="youtube logo" />
                  </div>
               </Link>
            </div>
            <div className="">
               <Button color='blue'>
                  SIGN IN
               </Button>
            </div>
         </div>
      </header>
   )
}

export default Header;  