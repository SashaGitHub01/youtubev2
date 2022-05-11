import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

interface ButtonProps {
   color?: 'red' | 'blue',
   onClick?: () => void
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, color }) => {
   return (
      <button className={cn({
         btn: color === 'red' || !color,
         btn_second: color === 'blue'
      })}>
         {children}
      </button>
   )
}

export default Button;