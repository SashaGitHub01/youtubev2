import React, { useRef, useState, useEffect, SetStateAction, Dispatch, MutableRefObject } from "react";

interface OutsideData {
   isVisible: boolean,
   setIsVisible: Dispatch<SetStateAction<boolean>>,
   ref: MutableRefObject<any>
}

export const useOutside = (initState: boolean): OutsideData => {
   const [isVisible, setIsVisible] = useState(initState)
   const ref = useRef<any>()

   const handleClick = (e: MouseEvent) => {
      if (ref.current && !(ref.current.contains(e.target))) {
         console.log(ref.current, e.target)
         setIsVisible(false)
      }
   }

   useEffect(() => {
      document.addEventListener('click', handleClick)

      return () => document.removeEventListener('click', handleClick)
   }, [isVisible])

   return { isVisible, setIsVisible, ref }
}