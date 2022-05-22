import React, { PropsWithChildren } from 'react'
import { UserIcon } from '../../../assets/icons';
import { useAuth } from '../../../context/authCtx';
import { useOutside } from '../../../hooks/useOutside';
import AvatarSkelet from '../../Skeletons/AvatarSkelet';
import Button from '../../UI/Button';
import HeaderModal from './HeaderModal';

interface HeaderOptionsProps { }

const HeaderOptions: React.FC<PropsWithChildren<HeaderOptionsProps>> = ({ }) => {
   const { isVisible, setIsVisible, ref } = useOutside(false)
   const { user, isAuthorizing } = useAuth()

   const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      setIsVisible(true)
   }

   const handleClose = () => setIsVisible(false)

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
                  {isVisible
                     && <HeaderModal handleClose={handleClose} refs={ref} />}
               </>}
      </div>
   )
}

export default HeaderOptions;
