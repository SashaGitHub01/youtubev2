import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export const useRouterQuery = () => {
   const { pathname, query, push, replace } = useRouter()
   const [q, setQ] = useState<{ [q: string]: any }>(query)

   useEffect(() => {
      if (!q) return;
      push({ pathname, query: q, }, undefined, { shallow: true })
   }, [q])

   const changeQuery = (qr: { [q: string]: string }) => {
      setQ(prev => {
         return {
            ...prev,
            ...qr
         }
      })
   }

   const removeQueryFields = (arr: string[]) => {
      const newQuery = { ...query }

      arr.forEach(str => delete newQuery[str])
      console.log(newQuery)
      replace({ pathname: pathname, query: newQuery }, undefined, { shallow: true })
   }

   return { query, changeQuery, removeQueryFields }
}