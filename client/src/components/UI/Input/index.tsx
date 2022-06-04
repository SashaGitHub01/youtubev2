import React, { PropsWithChildren } from 'react'
import cn from 'classnames'
import s from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   error?: string,
   variant?: 'contained' | 'outlined',
   label?: string
   [k: string]: any
}

const Input: React.FC<PropsWithChildren<InputProps>> = React.forwardRef(({ error, label, variant, ...props }, ref: any) => {

   return (
      <div className="w-full relative">
         <label className={`relative block ${cn({
            'border-red-500': !!error,
            'input': !variant || variant === 'outlined',
            'input-fill': variant === 'contained',
            [s.withErr]: !!error
         })}`}>
            {!!label
               && <div className={`text-gray1 left-0 text-[12px] absolute top-0 w-full z-10 bg-white ${cn({
                  'text-red-500': !!error
               })}`}>
                  <span className='px-2'>
                     {label}
                  </span>
               </div>}
            <input
               className={`h-full w-full ${cn({
                  'pt-2': !!label
               })}`}
               {...props}
               ref={ref}
            />
         </label>
         {!!error
            && <div className="text-sm text-red-500 absolute left-0 bottom-0 translate-y-[105%]">
               {error}
            </div>}
      </div>
   )
})

export default Input;   