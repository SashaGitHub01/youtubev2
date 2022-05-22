import React, { PropsWithChildren, useEffect, useState } from 'react'
import { UserIcon } from '../../../assets/icons';
import { useAuth } from '../../../context/authCtx';
import { useOutside } from '../../../hooks/useOutside';
import AvatarSkelet from '../../Skeletons/AvatarSkelet';
import Button from '../../UI/Button';
import HeaderModal from './HeaderModal';

interface HeaderOptionsProps { }

const HeaderOptions: React.FC<PropsWithChildren<HeaderOptionsProps>> = ({ }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const { isVisible, setIsVisible, ref } = useOutside(false)
   const { user, isAuthorizing } = useAuth()

   const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      setIsOpen(true)
   }

   const handleClose = () => setIsOpen(false)

   useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
   }, [isOpen])

   return (
      <div className="">
         {isAuthorizing
            ? <AvatarSkelet />
            : user
               ? <div className="flex gap-2 items-center">
                  <div className="rounded-[50%] bg-pink-300 w-[36px] h-[36px] cursor-pointer" >
                  </div>
                  <div className="">
                     <span>
                        {user.name}
                     </span>
                  </div>
               </div>
               : <>
                  <Button color='blue' Icon={UserIcon} onClick={handleClick}>
                     SIGN IN
                  </Button>
                  <HeaderModal
                     handleClose={handleClose}
                     isOpen={isOpen}
                  />
               </>}
      </div>
   )
}

export default HeaderOptions;
