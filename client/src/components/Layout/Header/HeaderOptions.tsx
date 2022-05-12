import React, { PropsWithChildren, useEffect, useState } from 'react'
import { UserIcon } from '../../../assets/icons';
import { useOutside } from '../../../hooks/useOutside';
import Button from '../../UI/Button';
import HeaderModal from './HeaderModal';

interface HeaderOptionsProps { }

const HeaderOptions: React.FC<PropsWithChildren<HeaderOptionsProps>> = ({ }) => {
   const { isVisible, setIsVisible, ref } = useOutside(false)

   const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      setIsVisible(true)
   }

   const handleClose = () => setIsVisible(false)

   return (
      <div className="">
         {false
            ? <div className="">
               <div className="rounded-[50%] bg-pink-300 w-[36px] h-[36px] cursor-pointer" >

               </div>
            </div>
            : <>
               <Button color='blue' Icon={UserIcon} onClick={handleClick}>
                  SIGN IN
               </Button>
               {isVisible
                  && <HeaderModal handleClose={handleClose} refs={ref} />}
            </>}
      </div>
   )
}

export default HeaderOptions;