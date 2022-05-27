import React, { PropsWithChildren, useEffect, useState } from 'react'
import Popper from '../../UI/Popper';
import { UserIcon, VideoIcon } from '../../../assets/icons';
import { useAuth } from '../../../context/authCtx';
import AvatarSkelet from '../../Skeletons/AvatarSkelet';
import Button from '../../UI/Button';
import HeaderModal from './HeaderModal';
import UploadModal from '../../UploadModal';
import { useRouterQuery } from '../../../hooks/useRouterQuery';

interface HeaderOptionsProps { }

const HeaderOptions: React.FC<PropsWithChildren<HeaderOptionsProps>> = ({ }) => {
   const { removeQueryFields } = useRouterQuery()
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const [isOpen1, setIsOpen1] = useState<boolean>(false)
   const { user, isAuthorizing } = useAuth()

   useEffect(() => {
      document.body.style.overflow = isOpen || isOpen1 ? 'hidden' : 'auto'
   }, [isOpen, isOpen1])

   const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      setIsOpen(true)
   }

   const handleClose = () => {
      setIsOpen(false)
   }

   const handleOpen1 = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsOpen1(true)
   }

   const handleClose1 = () => {
      removeQueryFields(['id', 'video'])
      setIsOpen1(false)
   }

   return (
      <div className="">
         {isAuthorizing
            ? <AvatarSkelet />
            : user
               ? <div className="flex items-center gap-3">
                  <Popper
                     message='New video'
                  >
                     <div className="" onClick={handleOpen1}>
                        <VideoIcon className='text-icon text-gray1 cursor-pointer' />
                     </div>
                  </Popper>
                  <div className="flex gap-2 items-center">
                     <div className="rounded-[50%] bg-pink-300 w-[36px] h-[36px] cursor-pointer" >
                     </div>
                     <div className="">
                        <span>
                           {user.name}
                        </span>
                     </div>
                  </div>
                  <UploadModal
                     onClose={handleClose1}
                     isOpen={isOpen1}
                  />
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
