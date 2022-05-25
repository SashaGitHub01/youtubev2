import React, { PropsWithChildren, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'

interface TextAreaProps {
   error?: string,
   minRows: number,
   maxRows: number,
   placeholder?: string,
   label?: string,
   [k: string]: any,
}

const TextArea: React.FC<PropsWithChildren<TextAreaProps>> = React.forwardRef(({ error, label, placeholder, minRows, maxRows, ...props }, ref: any) => {

   return (
      <div className="relative flex">
         <div className={`input-fill ${cn({
            'border-red-500': !!error
         })}`}
         >
            <div className={`text-gray1 text-[12px] absolute top-0 -translate-y-[50%] z-10 bg-white ${cn({
               'text-red-500': !!error
            })}`}>
               {label}
            </div>
            <TextareaAutosize
               className={`resize-none border h-full w-full`}
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