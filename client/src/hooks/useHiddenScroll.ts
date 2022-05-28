import { useEffect } from "react"


export const useHiddenScroll = (deps)=> {
   useEffect(() => {
      document.body.style.overflow = isOpen || isOpen1 ? 'hidden' : 'auto'
   }, deps)
}