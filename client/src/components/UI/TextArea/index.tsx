import React, { PropsWithChildren, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import s from './TextArea.module.scss'

interface TextAreaProps {
   error?: string,
   minRows: number,
   maxRows: number,
   placeholder?: string,
   label?: string,
   type?: 'contained' | 'outlined'
   [k: string]: any,
}

const TextArea: React.FC<PropsWithChildren<TextAreaProps>> = React.forwardRef(({ error, type, label, placeholder, minRows, maxRows, ...props }, ref: any) => {

   return (
      <div className="relative flex">
         <div className={`${cn({
            'input-fill': !type || type === 'contained',
            'input': type === 'outlined',
            [s.withErr]: !!error,
            [s.withErr2]: !!error
         })} p-0`}
         >
            {!!label
               && <div className={`text-gray1 left-2 text-[12px] absolute top-0 -translate-y-[50%] z-10 bg-white ${cn({
                  'text-red-500': !!error
               })}`}>
                  {label}
               </div>}
            <TextareaAutosize
               className={`resize-none border h-full w-full p-2`}
               maxRows={maxRows}
               minRows={minRows}
               placeholder={placeholder}
               {...props}
            />
         </div>
         {!!error
            && <div className="text-sm text-red-500 absolute left-0 bottom-0 translate-y-[100%]">
               {error}
            </div>}
      </div>
   )
})

export default TextArea;