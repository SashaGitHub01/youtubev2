import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import { IconType } from 'react-icons/lib'
import s from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   color?: 'red' | 'blue',
   onClick?: (e: any) => void,
   Icon?: IconType,
   [k: string]: any
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, onClick, color, Icon, ...props }) => {
   return (
      <button
         {...props}
         onClick={onClick}
         className={cn({
            [s.btn_first]: color === 'red' || !color,
            [s.btn_second]: color === 'blue'
         })}
      >
         {Icon
            && <Icon className='icon' />}
         <span className="">
            {children}
         </span>
      </button>
   )
}

export default Button;