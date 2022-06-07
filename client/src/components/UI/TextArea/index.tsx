import React, { PropsWithChildren } from 'react'
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

const TextArea: React.FC<PropsWithChildren<TextAreaProps>> = React.forwardRef(function TextArea({ error, type, label, placeholder, minRows, maxRows, ...props }, ref: any) {

   return (
      <div className="relative w-full">
         <label className={`block relative ${cn({
            'input-fill': !type || type === 'contained',
            'input': type === 'outlined',
            [s.withErr]: !!error,
            [s.withErr2]: !!error,
            'border-red-500': !!error,
         })} p-0`}
         >
            {!!label
               && <div className={`text-gray1 left-0 w-full text-[12px] absolute top-0  bg-white ${cn({
                  'text-red-500': !!error
               })}`}>
                  <span className="pl-2">
                     {label}
                  </span>
               </div>}
            <TextareaAutosize
               className={`resize-none border h-full w-full px-2 ${cn({
                  'pt-4': !!label
               })}`}
               maxRows={maxRows}
               minRows={minRows}
               placeholder={placeholder}
               {...props}
            />
         </label>
         {!!error
            && <div className="text-sm text-red-500 absolute left-0 bottom-0 translate-y-[100%]">
               {error}
            </div>}
      </div>
   )
})

export default TextArea;