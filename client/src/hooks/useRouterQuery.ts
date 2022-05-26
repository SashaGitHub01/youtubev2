import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export const useRouterQuery = () => {
   const { pathname, query, push } = useRouter()
   const [q, setQ] = useState<{ [q: string]: any }>(query)

   useEffect(() => {
      if (!q) return;
      push({ pathname, query: q, }, undefined, { shallow: true })
   }, [q])

   const changeQuery = (query: { [q: string]: string }) => {
      setQ(prev => {
         return {
            ...prev,
            ...query
         }
      })
   }

   return { query, changeQuery }
}