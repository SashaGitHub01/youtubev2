import { Placement } from '@popperjs/core'
import classNames from 'classnames'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { usePopover } from '../../../hooks/usePopover'
import s from './Menu.module.scss'

interface MenuProps {
   anchor: any,
   onClose: () => void,
   position?: string,
   isOpen: boolean,
   strategy?: 'fixed' | 'absolute'
   placement?: Placement
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({
   anchor, onClose, isOpen, children, placement = 'bottom', strategy = 'absolute', position
}) => {
   const { popRef, styles, attributes } = usePopover(isOpen, anchor, strategy, placement, onClose)

   return (
      <>
         {<div
            className={`${s.menu} ${classNames({
               [s.menu_active]: isOpen
            })}`}
            ref={popRef}
            style={styles.popper}
            {...attributes.popper}
         >
            {children}
         </div>}
      </>
   )
}

export default Menu;