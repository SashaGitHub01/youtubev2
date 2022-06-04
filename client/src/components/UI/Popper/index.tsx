import classNames from 'classnames'
import React, { PropsWithChildren, useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { usePopper } from 'react-popper'
import s from './Popper.module.scss'

interface PopperProps {
   message: string
}

const Popper: React.FC<PropsWithChildren<PopperProps>> = ({ children, message }) => {
   const [triggereEl, setTriggerEl] = useState<HTMLElement | null>(null)
   const [popEl, setPopEl] = useState<HTMLElement | null>(null)

   const triggerRef = useRef<any>(null)
   const popRef = useRef<any>(null)

   const { styles, attributes } = usePopper(triggereEl, popEl, {
      placement: 'bottom',
   })

   useEffect(() => {
      if (triggerRef.current) setTriggerEl(triggerRef.current)
      if (popRef.current) setPopEl(popRef.current)
   }, [triggerRef.current, popRef.current])

   return (
      <div className='relative'>
         <div className={s.ref} ref={triggerRef}>
            {children}
         </div>
         <div
            className={`shadow-md bg-gray-500 bg-opacity-70 rounded-sm typo_sm px-2 py-1 text-white 
            min-w-[70px] max-w-[170px] whitespace-nowrap mt-1 ${s.popper}`}
            role='tooltip'
            ref={popRef}
            style={styles.popper}
            {...attributes.popper}
         >
            <div className="text-center">
               {message}
            </div>
         </div>
      </div>
   )
}

export default Popper;   