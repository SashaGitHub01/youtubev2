import React, { PropsWithChildren, useState } from 'react'
import s from './Toggler.module.scss'
import cn from 'classnames'

interface TogglerProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
   isActive: boolean,
   toggle: () => void,
   [k: string]: any
}

const Toggler: React.FC<PropsWithChildren<TogglerProps>> = ({ isActive, toggle, ...props }) => {
   return (
      <label
         htmlFor='check'
         tabIndex={0}
         className={`${s.toggler} border-gray-200 border-solid border rounded-full flex items-center cursor-pointer 
         focus:border focus:border-solid focus:border-blue-200 relative bg-gray-200 w-[48px] h-[24px] px-[3px]
          ${cn({
            'bg-red1': isActive
         })}`}
      >
         <input
            className='hidden w-0 h-0 absolute'
            type={'checkbox'}
            onChange={toggle}
            id='check'
            {...props}
         />
         <div
            className={`${s.circle} transition-transform relative z-10 rounded-[50%] border-gray-300 bg-white w-[18px] h-[18px] ${cn({
               'translate-x-[22px]': isActive
            })}`}
         />
      </label>
   )
}

export default Toggler;