import { useEffect, useRef, useState } from "react"


interface ElemCoords {
   top: number,
   left: number
}

export const usePopover = (isOpen: boolean, anchor: any, onClose: () => void,) => {
   const ref = useRef<HTMLDivElement>(null)
   const [anchorCoords, setAnchorCoords] = useState<DOMRect>((anchor as HTMLElement).getBoundingClientRect())
   const [coords, setCoords] = useState<ElemCoords>({
      top: 0,
      left: 0
   })


   const clickOutside = (e: any) => {
      if (e.which === 1 && e.target !== ref.current) {
         onClose()
      }
   }

   useEffect(() => {
      if (isOpen) {
         (anchor as HTMLElement).style.pointerEvents = 'none'
         let top = anchorCoords.bottom - 1;
         let left = anchorCoords.left

         setCoords({
            top: top,
            left: left,
         })

         document.addEventListener('click', clickOutside,)
      }

      return () => {
         document.removeEventListener('click', clickOutside,);
         (anchor as HTMLElement).style.pointerEvents = 'auto'
         setCoords({
            left: 0,
            top: 0,
         })
      }
   }, [isOpen])

   useEffect(() => {
      if (!!ref.current) {
         const menu = ref.current
         const menuCoords = menu.getBoundingClientRect()

         if (menuCoords.right - document.documentElement.clientWidth > (-30)) {
            setCoords(prev => ({
               ...prev,
               left: prev.left - Math.floor(menuCoords.width) + Math.floor(anchorCoords.width / 2)
            }))
         }
      }
   }, [ref.current])

   return { ref, coords }
}