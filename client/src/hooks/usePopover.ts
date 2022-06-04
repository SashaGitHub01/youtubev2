import { Placement } from "@popperjs/core"
import { useEffect, useRef, useState } from "react"
import { usePopper } from "react-popper"


interface ElemCoords {
   top: number,
   left: number
}

export const usePopover = (
   isOpen: boolean, anchor: any, strategy: 'fixed' | 'absolute', placement: Placement, onClose: () => void,
) => {
   const popRef = useRef<any>(null)
   const { styles, attributes, ...popper } = usePopper(anchor, popRef.current, {
      placement: placement,
      strategy: strategy,
      modifiers: [
         {
            name: "preventOverflow",
            phase: 'write',
            enabled: true,
            options: {

            },
         },
      ],

   })
   const clickOutside = (e: any) => {
      onClose()
   }


   useEffect(() => {
      if (isOpen) {
         document.addEventListener('click', clickOutside,)
      }

      return () => {
         document.removeEventListener('click', clickOutside,);
      }
   }, [isOpen])

   return { popRef, styles, attributes }
}