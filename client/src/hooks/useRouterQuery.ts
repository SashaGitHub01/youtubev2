import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export const useRouterQuery = () => {
   const { pathname, query, push, replace, isReady } = useRouter()
   const [q, setQ] = useState<{ [q: string]: any }>(query)

   useEffect(() => {
      if (Object.keys(q).length === 0 || !isReady) return;
      push({ pathname, query: q, }, undefined, { shallow: true })
   }, [q, isReady])

   const changeQuery = (qr: { [q: string]: string }) => {
      setQ(prev => {
         return {
            ...prev,
            ...qr
         }
      })
   }

   return { query, changeQuery }
}