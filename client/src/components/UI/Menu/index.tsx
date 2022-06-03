import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { usePopover } from '../../../hooks/usePopover'
import s from './Menu.module.scss'

interface MenuProps {
   anchor: any,
   onClose: () => void,
   position?: string,
   isOpen: boolean
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ anchor, onClose, isOpen, children }) => {
   const { coords, ref } = usePopover(isOpen, anchor, onClose)

   return (
      <>
         {isOpen
            ? <div
               ref={ref}
               className={s.menu}
               style={{
                  left: coords.left + 'px',
                  top: coords.top + 'px'
               }}
            >
               {children}
            </div>
            : null}
      </>
   )
}

export default Menu;