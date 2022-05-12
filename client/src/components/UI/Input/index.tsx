import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   error?: string,
   [k: string]: any
}

const Input: React.FC<PropsWithChildren<InputProps>> = React.forwardRef(({ error, ...props }, ref: any) => {

   return (
      <div className="w-full relative">
         <input
            className={`border-b bg-transparent border-solid border-gray1 text-primary w-full p-1 focus:border-black ${cn({
               'border-red-500': !!error
            })}`}
            {...props}
            ref={ref}
         />
         {!!error
            && <div className="text-sm text-red-500 absolute left-0 bottom-0 translate-y-[105%]">
               {error}
            </div>}
      </div>
   )
})

export default Input;   