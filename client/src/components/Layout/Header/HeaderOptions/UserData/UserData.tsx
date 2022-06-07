import Link from 'next/link';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { UserApi } from '../../../../../API/UserApi';
import s from './UserData.module.scss'
import { ExitIcon, StudioIcon, UserIcon } from '../../../../../assets/icons';
import { useAuth } from '../../../../../context/authCtx';
import { IUser } from '../../../../../types/user.types';
import Menu from '../../../../UI/Menu';
import { useQueryClient, } from 'react-query'
import { usePopper } from 'react-popper';
import classNames from 'classnames';



interface UserDataProps {
   user: IUser
}

const UserData: React.FC<PropsWithChildren<UserDataProps>> = ({ user }) => {
   const queryClient = useQueryClient()
   const { fetchLogout } = useAuth()
   const [isOpen, setIsOpen] = useState(false)
   const triggerRef = useRef<any>(null)

   const handleClose = () => {
      setIsOpen(false)
   }

   const handleOpen = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsOpen(true)
   }

   const handleLogout = async () => {
      await UserApi.logout()
      queryClient.clear()
      fetchLogout()
   }

   return (
      <div className="flex gap-2 items-center">
         <button
            disabled={isOpen}
            onClick={handleOpen}
            ref={triggerRef}
            className="rounded-[50%] block w-[36px] h-[36px] overflow-hidden cursor-pointer"
         >
            <img src={user.avatar} alt={user.name} />
         </button>
         {<Menu
            isOpen={isOpen}
            anchor={triggerRef.current}
            onClose={handleClose}
            strategy='fixed'
            placement='bottom-end'
         >
            <ul className="">
               <li
                  className="bg-white cursor-pointer hover:bg-slate-50 border-y border-solid border-gray_light"
               >
                  <Link href={`/channel/${user._id}`}>
                     <a className="flex gap-2 py-2 px-3">
                        <UserIcon className='text-lg' />
                        <span className="">
                           Channel
                        </span>
                     </a>
                  </Link>
               </li>
               <li
                  className="bg-white cursor-pointer hover:bg-slate-50 border-y border-solid border-gray_light"
               >
                  <Link href={`/studio/${user._id}`}>
                     <a className="flex gap-2 py-2 px-3">
                        <StudioIcon className='text-lg' />
                        <span className="">
                           Studio
                        </span>
                     </a>
                  </Link>
               </li>
               <li
                  onClick={handleLogout}
                  className="cursor-pointer border-b border-solid border-gray_light bg-white hover:bg-slate-50"
               >
                  <a className="flex gap-2 py-2 px-3">
                     <ExitIcon className='text-lg' />
                     <span className="">
                        Logout
                     </span>
                  </a>
               </li>
            </ul>
         </Menu>}
      </div>
   )
}

export default UserData;